import type { NextApiRequest, NextApiResponse } from "next";
import { createBusinessInquiryEmail, createCustomerConfirmationEmail } from "@/emails/calculatorEmails";
import { applyRateLimit, getIdempotencyKey, isAllowedOrigin, isHoneypotTriggered } from "@/lib/apiProtection";
import {
  isCalculatorInquiryPayload,
  validateCalculatorInquiry,
} from "@/lib/calculatorInquiry";
import { assertEmailSent, getLeadNotificationEmail, getMailerClient, getMailerFromAddress } from "@/lib/mailer";
import { calculatePaintingPrice } from "@/lib/pricing";

type ApiResponse = {
  ok: boolean;
  message: string;
};

export const config = {
  api: { bodyParser: { sizeLimit: "32kb" } },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ ok: false, message: "Neplatný původ požadavku." });
  }

  const rateLimit = applyRateLimit(req, res, { keyPrefix: "calculator-inquiry" });
  if (!rateLimit.ok) {
    return res.status(429).json({ ok: false, message: "Odesíláte požadavky příliš rychle. Zkuste to prosím za chvíli znovu." });
  }

  if (isHoneypotTriggered((req.body as { website?: unknown } | undefined)?.website)) {
    return res.status(200).json({ ok: true, message: "Poptávka byla odeslána." });
  }

  if (!isCalculatorInquiryPayload(req.body)) {
    return res.status(400).json({ ok: false, message: "Neplatná data formuláře." });
  }

  const validationError = validateCalculatorInquiry(req.body);
  if (validationError) {
    return res.status(400).json({ ok: false, message: validationError });
  }

  try {
    const mailer = getMailerClient();
    const from = getMailerFromAddress();
    const businessRecipient = getLeadNotificationEmail();

    const canonicalPayload = {
      ...req.body,
      name: req.body.name.replace(/[\r\n\t]+/g, " ").trim(),
      email: req.body.email.trim(),
      phone: req.body.phone.trim(),
      address: req.body.address.trim(),
      roomCount: req.body.roomCount.trim(),
      spaceType: req.body.spaceType.trim(),
      additionalInfo: req.body.additionalInfo.trim(),
      totalPrice: calculatePaintingPrice(req.body),
    };
    const idempotencyKey = getIdempotencyKey(req, "calculator-inquiry");
    const businessEmail = createBusinessInquiryEmail(canonicalPayload);
    const customerEmail = createCustomerConfirmationEmail(canonicalPayload);

    const businessResult = await mailer.emails.send({
      from,
      to: businessRecipient,
      replyTo: canonicalPayload.email,
      subject: businessEmail.subject,
      html: businessEmail.html,
      text: businessEmail.text,
    }, { idempotencyKey: `${idempotencyKey}-business` });
    assertEmailSent(businessResult, "Odeslání poptávky firmě selhalo");

    const customerResult = await mailer.emails.send({
      from,
      to: canonicalPayload.email,
      replyTo: businessRecipient,
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
    }, { idempotencyKey: `${idempotencyKey}-customer` });

    if (customerResult.error) {
      console.error("Calculator confirmation email failed", customerResult.error);
      return res.status(200).json({ ok: true, message: "Poptávka byla odeslána. Potvrzovací e-mail se nepodařilo doručit." });
    }

    return res.status(200).json({ ok: true, message: "Poptávka byla odeslána a potvrzení jsme poslali na váš e-mail." });
  } catch (error) {
    console.error("Calculator inquiry email failed", error);
    return res.status(500).json({ ok: false, message: "Odeslání se nepodařilo." });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { createBusinessContactEmail, createCustomerContactConfirmationEmail } from "@/emails/contactEmails";
import { applyRateLimit, getIdempotencyKey, isAllowedOrigin, isHoneypotTriggered } from "@/lib/apiProtection";
import { isContactInquiryPayload, validateContactInquiry } from "@/lib/contactInquiry";
import { assertEmailSent, getLeadNotificationEmail, getMailerClient, getMailerFromAddress } from "@/lib/mailer";

type ApiResponse = {
  ok: boolean;
  message: string;
};

export const config = {
  api: { bodyParser: { sizeLimit: "16kb" } },
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

  const rateLimit = applyRateLimit(req, res, { keyPrefix: "contact-inquiry" });
  if (!rateLimit.ok) {
    return res.status(429).json({ ok: false, message: "Odesíláte požadavky příliš rychle. Zkuste to prosím za chvíli znovu." });
  }

  if (isHoneypotTriggered((req.body as { website?: unknown } | undefined)?.website)) {
    return res.status(200).json({ ok: true, message: "Zpráva byla odeslána." });
  }

  if (!isContactInquiryPayload(req.body)) {
    return res.status(400).json({ ok: false, message: "Neplatná data formuláře." });
  }

  const validationError = validateContactInquiry(req.body);
  if (validationError) {
    return res.status(400).json({ ok: false, message: validationError });
  }

  try {
    const mailer = getMailerClient();
    const from = getMailerFromAddress();
    const businessRecipient = getLeadNotificationEmail();
    const idempotencyKey = getIdempotencyKey(req, "contact-inquiry");
    const canonicalPayload = {
      ...req.body,
      name: req.body.name.replace(/[\r\n\t]+/g, " ").trim(),
      email: req.body.email.trim(),
      phone: req.body.phone.trim(),
      message: req.body.message.trim(),
    };
    const businessEmail = createBusinessContactEmail(canonicalPayload);
    const customerEmail = createCustomerContactConfirmationEmail(canonicalPayload);

    const businessResult = await mailer.emails.send({
      from,
      to: businessRecipient,
      replyTo: canonicalPayload.email,
      subject: businessEmail.subject,
      html: businessEmail.html,
      text: businessEmail.text,
    }, { idempotencyKey: `${idempotencyKey}-business` });
    assertEmailSent(businessResult, "Odeslání kontaktní zprávy firmě selhalo");

    const customerResult = await mailer.emails.send({
      from,
      to: canonicalPayload.email,
      replyTo: businessRecipient,
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
    }, { idempotencyKey: `${idempotencyKey}-customer` });

    if (customerResult.error) {
      console.error("Contact confirmation email failed", customerResult.error);
      return res.status(200).json({ ok: true, message: "Zpráva byla odeslána. Potvrzovací e-mail se nepodařilo doručit." });
    }

    return res.status(200).json({ ok: true, message: "Zpráva byla odeslána a potvrzení jsme poslali na váš e-mail." });
  } catch (error) {
    console.error("Contact inquiry email failed", error);
    return res.status(500).json({ ok: false, message: "Odeslání se nepodařilo." });
  }
}

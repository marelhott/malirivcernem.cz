import type { NextApiRequest, NextApiResponse } from "next";
import { createBusinessInquiryEmail, createCustomerConfirmationEmail } from "@/emails/calculatorEmails";
import {
  isCalculatorInquiryPayload,
  validateCalculatorInquiry,
} from "@/lib/calculatorInquiry";
import { getLeadNotificationEmail, getMailerClient, getMailerFromAddress } from "@/lib/mailer";

type ApiResponse = {
  ok: boolean;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
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

    const businessEmail = createBusinessInquiryEmail(req.body);
    const customerEmail = createCustomerConfirmationEmail(req.body);

    await mailer.emails.send({
      from,
      to: businessRecipient,
      replyTo: req.body.email,
      subject: businessEmail.subject,
      html: businessEmail.html,
      text: businessEmail.text,
    });

    await mailer.emails.send({
      from,
      to: req.body.email,
      replyTo: businessRecipient,
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
    });

    return res.status(200).json({ ok: true, message: "Poptávka byla odeslána." });
  } catch (error) {
    console.error("Calculator inquiry email failed", error);
    return res.status(500).json({ ok: false, message: "Odeslání se nepodařilo." });
  }
}

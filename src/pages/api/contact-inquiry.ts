import type { NextApiRequest, NextApiResponse } from "next";
import { createBusinessContactEmail, createCustomerContactConfirmationEmail } from "@/emails/contactEmails";
import { isContactInquiryPayload, validateContactInquiry } from "@/lib/contactInquiry";
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
    const businessEmail = createBusinessContactEmail(req.body);
    const customerEmail = createCustomerContactConfirmationEmail(req.body);

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

    return res.status(200).json({ ok: true, message: "Zpráva byla odeslána." });
  } catch (error) {
    console.error("Contact inquiry email failed", error);
    return res.status(500).json({ ok: false, message: "Odeslání se nepodařilo." });
  }
}

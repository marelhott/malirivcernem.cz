import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getMailerClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Resend není nakonfigurovaný.");
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

export function getMailerFromAddress() {
  return process.env.RESEND_FROM || "Maliri v cernem <info@malirivcernem.cz>";
}

export function getLeadNotificationEmail() {
  return process.env.LEAD_NOTIFICATION_EMAIL || "info@malirivcernem.cz";
}

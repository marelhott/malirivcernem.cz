export interface ContactInquiryPayload {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

export const contactEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const contactPhoneRegex = /^$|^(\+420\s?)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/;

export function isContactInquiryPayload(value: unknown): value is ContactInquiryPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return ["name", "email", "phone", "type", "message"].every((field) => typeof payload[field] === "string");
}

export function validateContactInquiry(payload: ContactInquiryPayload): string | null {
  if (!payload.name.trim()) return "Chybí jméno.";
  if (!payload.email.trim() || !contactEmailRegex.test(payload.email)) return "Email není ve správném formátu.";
  if (!payload.message.trim()) return "Chybí zpráva.";
  if (payload.phone.trim() && !contactPhoneRegex.test(payload.phone)) return "Telefon není ve správném formátu.";
  return null;
}

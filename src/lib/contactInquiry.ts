export interface ContactInquiryPayload {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  website?: string;
}

export const contactEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const contactPhoneRegex = /^$|^(\+420\s?)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/;
const contactTypes = ["", "byt", "kancelar", "sterky", "svj", "jine"];

export function isContactInquiryPayload(value: unknown): value is ContactInquiryPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return ["name", "email", "phone", "type", "message"].every((field) => typeof payload[field] === "string");
}

export function validateContactInquiry(payload: ContactInquiryPayload): string | null {
  if (!payload.name.trim()) return "Chybí jméno.";
  if (!payload.email.trim() || !contactEmailRegex.test(payload.email.trim())) return "Email není ve správném formátu.";
  if (!payload.message.trim()) return "Chybí zpráva.";
  if (payload.phone.trim() && !contactPhoneRegex.test(payload.phone.trim())) return "Telefon není ve správném formátu.";
  if (payload.name.trim().length > 120) return "Jméno je příliš dlouhé.";
  if (payload.email.trim().length > 254) return "Email je příliš dlouhý.";
  if (payload.message.trim().length > 3000) return "Zpráva je příliš dlouhá.";
  if (!contactTypes.includes(payload.type)) return "Neplatný typ poptávky.";
  return null;
}

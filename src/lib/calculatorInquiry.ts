export type AreaType = "Půdorys" | "Stěna";
export type CeilingHeight = "250" | "350" | "450";
export type RepairType = "Malé" | "Střední" | "Velké" | "Žádné";
export type YesNo = "Ano" | "Ne";
export type CleaningType = "Potřebuji" | "Nepotřebuji";

export interface CalculatorInquiryPayload {
  selectedWork: AreaType;
  totalArea: string;
  ceilingHeightForPrice: CeilingHeight;
  repairType: RepairType;
  material: YesNo;
  furnitureMoving: YesNo;
  covering: YesNo;
  cleaning: CleaningType;
  emptySpace: YesNo;
  carpets: YesNo;
  roomCount: string;
  spaceType: string;
  additionalInfo: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  realizationDate: string;
  totalPrice: number;
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^(\+420\s?)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/;

export function isCalculatorInquiryPayload(value: unknown): value is CalculatorInquiryPayload {
  if (!value || typeof value !== "object") return false;

  const payload = value as Record<string, unknown>;
  const requiredStringFields = [
    "selectedWork",
    "totalArea",
    "ceilingHeightForPrice",
    "repairType",
    "material",
    "furnitureMoving",
    "covering",
    "cleaning",
    "emptySpace",
    "carpets",
    "roomCount",
    "spaceType",
    "additionalInfo",
    "name",
    "phone",
    "email",
    "address",
    "realizationDate",
  ];

  return requiredStringFields.every((field) => typeof payload[field] === "string") && typeof payload.totalPrice === "number";
}

export function validateCalculatorInquiry(payload: CalculatorInquiryPayload): string | null {
  const area = Number(payload.totalArea) || 0;
  if (!payload.name.trim()) return "Chybí jméno.";
  if (!payload.address.trim()) return "Chybí adresa.";
  if (!payload.realizationDate.trim()) return "Chybí termín realizace.";
  if (area <= 0) return "Plocha musí být větší než 0.";
  if (!payload.email.trim() || !emailRegex.test(payload.email)) return "Email není ve správném formátu.";
  if (!payload.phone.trim() || !phoneRegex.test(payload.phone)) return "Telefon není ve správném formátu.";
  if (!Number.isFinite(payload.totalPrice) || payload.totalPrice <= 0) return "Cena není platná.";
  return null;
}

export function formatCalculatorInquiry(payload: CalculatorInquiryPayload) {
  return {
    currentDate: new Date().toLocaleDateString("cs-CZ", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    creationTime: new Date().toLocaleString("cs-CZ"),
    customerName: payload.name || "Neuvedeno",
    customerEmail: payload.email,
    customerPhone: payload.phone,
    address: payload.address || "Neuvedeno",
    realizationDate: payload.realizationDate ? new Date(payload.realizationDate).toLocaleDateString("cs-CZ") : "Neuvedeno",
    totalArea: payload.totalArea || "0",
    areaType: payload.selectedWork === "Půdorys" ? "Podlahová plocha" : "Stěnová plocha",
    roomCount: payload.roomCount || "Neuvedeno",
    spaceType: payload.spaceType || "Neuvedeno",
    repairType: payload.repairType,
    ceilingHeight: payload.selectedWork === "Půdorys" ? `${payload.ceilingHeightForPrice} cm` : "Neovlivňuje cenu",
    materialProvider: payload.material === "Ano" ? "Malíř zajistí barvu" : "Zákazník má vlastní barvu",
    furnitureMoving: payload.furnitureMoving === "Ano" ? "Ano, potřebuje" : "Ne, vyřeší sám",
    covering: payload.covering === "Ano" ? "Ano, požaduje" : "Není potřeba",
    cleaningService: payload.cleaning === "Potřebuji" ? "Ano, požaduje úklid" : "Nepotřebuje úklid",
    spaceStatus: payload.emptySpace === "Ano" ? "Prázdný prostor" : "Zařízený prostor",
    carpets: payload.carpets === "Ano" ? "Jsou koberce" : "Holá podlaha",
    totalPrice: payload.totalPrice.toLocaleString("cs-CZ"),
    additionalInfo: payload.additionalInfo || "Žádné dodatečné informace",
  };
}

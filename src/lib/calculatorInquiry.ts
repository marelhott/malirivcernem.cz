export type AreaType = "Půdorys" | "Stěna";
export type CeilingHeight = "250" | "350" | "450";
export type RepairType = "Malé" | "Střední" | "Velké" | "Žádné";
export type YesNo = "Ano" | "Ne";
export type CleaningType = "Potřebuji" | "Nepotřebuji";
export type PaintType = "Bílá na bílou" | "Tónovaná barva na bílou" | "Bílá na tónovanou barvu";

export interface CalculatorInquiryPayload {
  selectedWork: AreaType;
  totalArea: string;
  ceilingHeightForPrice: CeilingHeight;
  repairType: RepairType;
  material: YesNo;
  paintType: PaintType;
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
  website?: string;
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^(\+420\s?)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/;

const allowedValues = {
  selectedWork: ["Půdorys", "Stěna"],
  ceilingHeightForPrice: ["250", "350", "450"],
  repairType: ["Malé", "Střední", "Velké", "Žádné"],
  yesNo: ["Ano", "Ne"],
  cleaning: ["Potřebuji", "Nepotřebuji"],
  paintType: ["Bílá na bílou", "Tónovaná barva na bílou", "Bílá na tónovanou barvu"],
} as const;

function isAllowed(value: string, options: readonly string[]) {
  return options.includes(value);
}

function exceeds(value: string, maxLength: number) {
  return value.trim().length > maxLength;
}

export function isCalculatorInquiryPayload(value: unknown): value is CalculatorInquiryPayload {
  if (!value || typeof value !== "object") return false;

  const payload = value as Record<string, unknown>;
  const requiredStringFields = [
    "selectedWork",
    "totalArea",
    "ceilingHeightForPrice",
    "repairType",
    "material",
    "paintType",
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
  if (area <= 0) return "Plocha musí být větší než 0.";
  if (area > 5000) return "Plocha je příliš vysoká. Pro velkou zakázku nás kontaktujte přímo.";
  if (!isAllowed(payload.selectedWork, allowedValues.selectedWork)) return "Neplatný typ plochy.";
  if (!isAllowed(payload.ceilingHeightForPrice, allowedValues.ceilingHeightForPrice)) return "Neplatná výška stropu.";
  if (!isAllowed(payload.repairType, allowedValues.repairType)) return "Neplatný typ opravy.";
  if (!isAllowed(payload.paintType, allowedValues.paintType)) return "Neplatný typ barvy.";
  if (![payload.material, payload.furnitureMoving, payload.covering, payload.emptySpace, payload.carpets].every((value) => isAllowed(value, allowedValues.yesNo))) {
    return "Neplatná hodnota některé z voleb.";
  }
  if (!isAllowed(payload.cleaning, allowedValues.cleaning)) return "Neplatná volba úklidu.";
  if (!payload.name.trim()) return "Chybí jméno.";
  if (!payload.email.trim() || !emailRegex.test(payload.email.trim())) return "Email není ve správném formátu.";
  if (!payload.phone.trim() || !phoneRegex.test(payload.phone.trim())) return "Telefon není ve správném formátu.";
  if (!payload.address.trim()) return "Chybí adresa realizace.";
  if (!payload.realizationDate.trim()) return "Chybí požadovaný termín.";
  if (exceeds(payload.name, 120)) return "Jméno je příliš dlouhé.";
  if (exceeds(payload.email, 254)) return "Email je příliš dlouhý.";
  if (exceeds(payload.address, 250)) return "Adresa je příliš dlouhá.";
  if (exceeds(payload.spaceType, 80)) return "Typ prostoru je příliš dlouhý.";
  if (exceeds(payload.roomCount, 20)) return "Počet místností je příliš dlouhý.";
  if (exceeds(payload.additionalInfo, 2000)) return "Doplňující informace jsou příliš dlouhé.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(payload.realizationDate)) return "Termín nemá platný formát.";
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
    paintType: payload.paintType,
    furnitureMoving: payload.furnitureMoving === "Ano" ? "Ano, potřebuje" : "Ne, vyřeší sám",
    covering: payload.covering === "Ano" ? "Ano, požaduje" : "Není potřeba",
    cleaningService: payload.cleaning === "Potřebuji" ? "Ano, požaduje úklid" : "Nepotřebuje úklid",
    spaceStatus: payload.emptySpace === "Ano" ? "Prázdný prostor" : "Zařízený prostor",
    carpets: payload.carpets === "Ano" ? "Jsou koberce" : "Holá podlaha",
    totalPrice: payload.totalPrice.toLocaleString("cs-CZ"),
    additionalInfo: payload.additionalInfo || "Žádné dodatečné informace",
  };
}

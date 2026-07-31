export type PricingInput = {
  selectedWork: string;
  totalArea: string;
  ceilingHeightForPrice: string;
  repairType: string;
  material: string;
  paintType: string;
  furnitureMoving: string;
  covering: string;
  cleaning: string;
};

const FLOOR_AREA_RATE = 10000 / 55;
const WALL_AREA_RATE = FLOOR_AREA_RATE / 3.5;
const MIN_PRICE = 3000;

export function calculatePaintingPrice(form: PricingInput): number {
  const area = Number(form.totalArea) || 0;
  if (area <= 0 || !Number.isFinite(area)) return 0;

  const basePrice = Math.max(
    form.selectedWork === "Půdorys" ? area * FLOOR_AREA_RATE : area * WALL_AREA_RATE,
    MIN_PRICE,
  );

  let total = basePrice;

  if (form.selectedWork === "Půdorys") {
    if (form.ceilingHeightForPrice === "350") total += basePrice * 0.1;
    else if (form.ceilingHeightForPrice === "450") total += basePrice * 0.2;
  }

  if (form.paintType === "Tónovaná barva na bílou") total += basePrice * 0.3;
  else if (form.paintType === "Bílá na tónovanou barvu") total += basePrice * 0.3;

  if (form.material === "Ano") total += basePrice * 0.2;
  if (form.furnitureMoving === "Ano") total += basePrice * 0.12;
  if (form.covering === "Ano") total += basePrice * 0.05;
  if (form.cleaning === "Potřebuji") total += basePrice * 0.1;

  if (form.repairType === "Malé") total += basePrice * 0.17;
  else if (form.repairType === "Střední") total += basePrice * 0.35;
  else if (form.repairType === "Velké") total += basePrice * 0.6;

  return Math.round(total);
}

import assert from "node:assert/strict";
import test from "node:test";
import { calculatePaintingPrice } from "./pricing.ts";

const baseInput = {
  selectedWork: "Půdorys",
  totalArea: "55",
  ceilingHeightForPrice: "250",
  repairType: "Žádné",
  material: "Ne",
  paintType: "Bílá na bílou",
  furnitureMoving: "Ne",
  covering: "Ne",
  cleaning: "Nepotřebuji",
};

test("spočítá základní cenu ze sdílené sazby", () => {
  assert.equal(calculatePaintingPrice(baseInput), 10000);
});

test("započítá zvolené služby konzistentně", () => {
  assert.equal(calculatePaintingPrice({
    ...baseInput,
    repairType: "Malé",
    material: "Ano",
    furnitureMoving: "Ano",
    covering: "Ano",
    cleaning: "Potřebuji",
  }), 16400);
});

test("nevrací cenu pro neplatnou plochu", () => {
  assert.equal(calculatePaintingPrice({ ...baseInput, totalArea: "0" }), 0);
  assert.equal(calculatePaintingPrice({ ...baseInput, totalArea: "neplatná" }), 0);
});

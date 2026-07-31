import assert from "node:assert/strict";
import test from "node:test";
import { validateCalculatorInquiry, type CalculatorInquiryPayload } from "./calculatorInquiry.ts";
import { validateContactInquiry } from "./contactInquiry.ts";
import { escapeHtml } from "./html.ts";
import { assertEmailSent } from "./mailer.ts";

const calculatorPayload: CalculatorInquiryPayload = {
  selectedWork: "Půdorys",
  totalArea: "55",
  ceilingHeightForPrice: "250",
  repairType: "Žádné",
  material: "Ne",
  paintType: "Bílá na bílou",
  furnitureMoving: "Ne",
  covering: "Ne",
  cleaning: "Nepotřebuji",
  emptySpace: "Ano",
  carpets: "Ne",
  roomCount: "2",
  spaceType: "Byt",
  additionalInfo: "",
  name: "Jan Novák",
  phone: "+420 123 456 789",
  email: "jan@example.cz",
  address: "Praha",
  realizationDate: "2026-08-10",
  totalPrice: 1,
};

test("validace kalkulačky odmítne hodnotu mimo povolené volby", () => {
  const tampered = { ...calculatorPayload, selectedWork: "Cokoliv" } as unknown as CalculatorInquiryPayload;
  assert.equal(validateCalculatorInquiry(tampered), "Neplatný typ plochy.");
});

test("validace kalkulačky odmítne extrémní plochu", () => {
  assert.match(validateCalculatorInquiry({ ...calculatorPayload, totalArea: "9000" }) || "", /příliš vysoká/i);
});

test("kontaktní formulář omezuje délku zprávy", () => {
  assert.match(validateContactInquiry({
    name: "Jan Novák",
    email: "jan@example.cz",
    phone: "",
    type: "byt",
    message: "x".repeat(3001),
  }) || "", /příliš dlouhá/i);
});

test("HTML escapování neutralizuje uživatelský obsah", () => {
  const html = escapeHtml("<script>alert('x')</script>");
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});

test("chyba poskytovatele e-mailu není vydána za úspěch", () => {
  assert.throws(
    () => assertEmailSent({ error: { message: "delivery failed" } }, "test"),
    /delivery failed/,
  );
  assert.doesNotThrow(() => assertEmailSent({ error: null }, "test"));
});

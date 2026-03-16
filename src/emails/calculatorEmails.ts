import { CalculatorInquiryPayload, formatCalculatorInquiry } from "@/lib/calculatorInquiry";

type EmailContent = {
  subject: string;
  html: string;
  text: string;
};

function wrapEmail(title: string, intro: string, sections: string[]) {
  return `
    <div style="margin:0;padding:32px;background:#f5f7fb;font-family:Arial,sans-serif;color:#0f172a;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#eff6ff,#eef2ff);border-bottom:1px solid #dbeafe;">
          <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#2563eb;font-weight:700;">Malíři v černém</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;color:#0f172a;">${title}</h1>
          <p style="margin:12px 0 0;font-size:15px;line-height:1.7;color:#475569;">${intro}</p>
        </div>
        <div style="padding:28px 32px;">
          ${sections.join("")}
        </div>
      </div>
    </div>
  `;
}

function renderSection(title: string, rows: Array<[string, string]>) {
  return `
    <section style="margin-bottom:24px;">
      <h2 style="margin:0 0 12px;font-size:16px;color:#0f172a;">${title}</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#64748b;font-size:14px;vertical-align:top;width:42%;">${label}</td>
                  <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#0f172a;font-size:14px;font-weight:600;">${value}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}

export function createBusinessInquiryEmail(payload: CalculatorInquiryPayload): EmailContent {
  const data = formatCalculatorInquiry(payload);
  const subject = `Nová poptávka malování - ${data.customerName}`;
  const html = wrapEmail(
    "Nová poptávka z kalkulačky",
    `Přišla nová poptávka s orientační cenou ${data.totalPrice} Kč.`,
    [
      renderSection("Zákazník", [
        ["Jméno", data.customerName],
        ["Email", data.customerEmail],
        ["Telefon", data.customerPhone],
        ["Adresa", data.address],
        ["Termín", data.realizationDate],
      ]),
      renderSection("Projekt", [
        ["Typ plochy", data.areaType],
        ["Celková plocha", `${data.totalArea} m²`],
        ["Výška stropu", data.ceilingHeight],
        ["Typ opravy", data.repairType],
        ["Barvu zajišťuje", data.materialProvider],
        ["Posunutí nábytku", data.furnitureMoving],
        ["Zakrývání", data.covering],
        ["Úklid", data.cleaningService],
        ["Počet místností", data.roomCount],
        ["Typ prostoru", data.spaceType],
        ["Prázdný prostor", data.spaceStatus],
        ["Koberce", data.carpets],
        ["Orientační cena", `${data.totalPrice} Kč`],
      ]),
      renderSection("Dodatečné informace", [["Poznámka", data.additionalInfo]]),
    ]
  );

  const text = `Nová poptávka z kalkulačky

ZÁKAZNÍK
Jméno: ${data.customerName}
Email: ${data.customerEmail}
Telefon: ${data.customerPhone}
Adresa: ${data.address}
Termín: ${data.realizationDate}

PROJEKT
Typ plochy: ${data.areaType}
Celková plocha: ${data.totalArea} m²
Výška stropu: ${data.ceilingHeight}
Typ opravy: ${data.repairType}
Barvu zajišťuje: ${data.materialProvider}
Posunutí nábytku: ${data.furnitureMoving}
Zakrývání: ${data.covering}
Úklid: ${data.cleaningService}
Počet místností: ${data.roomCount}
Typ prostoru: ${data.spaceType}
Prázdný prostor: ${data.spaceStatus}
Koberce: ${data.carpets}
Orientační cena: ${data.totalPrice} Kč

POZNÁMKA
${data.additionalInfo}

Odesláno: ${data.creationTime}`;

  return { subject, html, text };
}

export function createCustomerConfirmationEmail(payload: CalculatorInquiryPayload): EmailContent {
  const data = formatCalculatorInquiry(payload);
  const subject = "Potvrzení přijetí poptávky";
  const html = wrapEmail(
    "Poptávku jsme přijali",
    `Děkujeme, ${data.customerName}. Vaši poptávku jsme přijali a ozveme se vám nejpozději do 24 hodin.`,
    [
      renderSection("Shrnutí poptávky", [
        ["Typ plochy", data.areaType],
        ["Celková plocha", `${data.totalArea} m²`],
        ["Typ opravy", data.repairType],
        ["Posunutí nábytku", data.furnitureMoving],
        ["Zakrývání", data.covering],
        ["Úklid", data.cleaningService],
        ["Orientační cena", `${data.totalPrice} Kč`],
      ]),
      renderSection("Kontakt", [
        ["Email", "info@malirivcernem.cz"],
        ["Telefon", "+420 777 084 364"],
      ]),
    ]
  );

  const text = `Dobrý den ${data.customerName},

děkujeme za vaši poptávku. Přijali jsme ji a ozveme se vám nejpozději do 24 hodin.

SHRNUTÍ
Typ plochy: ${data.areaType}
Celková plocha: ${data.totalArea} m²
Typ opravy: ${data.repairType}
Posunutí nábytku: ${data.furnitureMoving}
Zakrývání: ${data.covering}
Úklid: ${data.cleaningService}
Orientační cena: ${data.totalPrice} Kč

Kontakt:
info@malirivcernem.cz
+420 777 084 364`;

  return { subject, html, text };
}

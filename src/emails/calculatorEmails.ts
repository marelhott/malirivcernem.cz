import { CalculatorInquiryPayload, formatCalculatorInquiry } from "@/lib/calculatorInquiry";

type EmailContent = {
  subject: string;
  html: string;
  text: string;
};

const logoLightUrl = "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F1033b565b9b2400284607f0fc2d667a4";

function createEmailShell(title: string, intro: string, body: string, variant: "business" | "customer") {
  const leftPanelBackground =
    variant === "business"
      ? "linear-gradient(180deg, #1d4ed8 0%, #1e3a8a 100%)"
      : "linear-gradient(180deg, #15803d 0%, #166534 100%)";

  return `
    <div style="margin:0;padding:32px 18px;background:#f3f5fa;font-family:Manrope,Arial,sans-serif;color:#101014;">
      <div style="max-width:900px;margin:0 auto;">
        <div style="background:#e9ecf2;border-radius:18px;padding:24px;box-sizing:border-box;">
          <div style="display:grid;grid-template-columns:minmax(0,1.05fr) minmax(320px,0.95fr);gap:28px;align-items:stretch;">
            <div style="background:${leftPanelBackground};border-radius:18px;padding:28px;color:#ffffff;min-height:320px;box-sizing:border-box;">
              <div style="display:flex;align-items:center;min-height:42px;">
                <img src="${logoLightUrl}" alt="Malíři v černém" style="display:block;height:38px;width:auto;max-width:260px;" />
              </div>
              <div style="margin-top:28px;">
                <div style="font-size:14px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.74);">Kalkulačka poptávky</div>
                <h1 style="margin:14px 0 0;font-size:42px;line-height:1.05;font-weight:600;letter-spacing:-0.04em;color:#ffffff;">${title}</h1>
                <p style="margin:18px 0 0;font-size:18px;line-height:1.55;color:rgba(255,255,255,0.9);max-width:28ch;">${intro}</p>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:18px;min-width:0;">
              ${body}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderInfoCard(label: string, value: string, options?: { large?: boolean; dark?: boolean }) {
  const large = options?.large ?? false;
  const dark = options?.dark ?? false;
  return `
    <div style="
      border-radius:16px;
      padding:${large ? "22px 24px" : "18px 20px"};
      background:${dark ? "#28282c" : "#ffffff"};
      color:${dark ? "#ffffff" : "#101014"};
      box-shadow:${dark ? "none" : "0 1px 0 rgba(16,16,20,0.04)"};
      box-sizing:border-box;
      width:100%;
    ">
      <div style="font-size:12px;line-height:1;text-transform:uppercase;letter-spacing:0.08em;color:${dark ? "rgba(255,255,255,0.62)" : "#6d6d78"};">${label}</div>
      <div style="margin-top:${large ? "10px" : "8px"};font-size:${large ? "36px" : "24px"};line-height:${large ? "1.02" : "1.15"};font-weight:${large ? "600" : "500"};letter-spacing:-0.04em;color:${dark ? "#ffffff" : "#101014"};word-break:break-word;overflow-wrap:anywhere;">${value}</div>
    </div>
  `;
}

function renderGridCard(title: string, rows: Array<[string, string]>) {
  return `
    <div style="background:#ffffff;border-radius:16px;padding:22px 24px;">
      <div style="font-size:14px;line-height:1;text-transform:uppercase;letter-spacing:0.08em;color:#6d6d78;margin-bottom:18px;">${title}</div>
      <table style="width:100%;border-collapse:collapse;">
        <tbody>
          ${rows
            .map(
              ([label, value], index) => `
                <tr>
                  <td style="padding:${index === 0 ? "0 0 12px" : "12px 0"};border-top:${index === 0 ? "0" : "1px solid #e7eaf0"};font-size:14px;line-height:1.45;color:#6d6d78;vertical-align:top;width:44%;">${label}</td>
                  <td style="padding:${index === 0 ? "0 0 12px" : "12px 0"};border-top:${index === 0 ? "0" : "1px solid #e7eaf0"};font-size:15px;line-height:1.45;color:#101014;font-weight:600;vertical-align:top;">${value}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderNoteCard(title: string, value: string) {
  return `
    <div style="background:#ffffff;border-radius:16px;padding:22px 24px;">
      <div style="font-size:14px;line-height:1;text-transform:uppercase;letter-spacing:0.08em;color:#6d6d78;margin-bottom:14px;">${title}</div>
      <div style="font-size:16px;line-height:1.65;color:#3d3d47;">${value}</div>
    </div>
  `;
}

export function createBusinessInquiryEmail(payload: CalculatorInquiryPayload): EmailContent {
  const data = formatCalculatorInquiry(payload);
  const subject = `Nová poptávka malování - ${data.customerName}`;

  const html = createEmailShell(
    "Nová poptávka z kalkulačky",
    "Přišla nová kalkulace. Nejdůležitější údaje máš hned nahoře, zbytek je níže v přehledu.",
    `
      ${renderInfoCard("Orientační cena", `${data.totalPrice} Kč`, { large: true, dark: true })}
      ${renderInfoCard("Telefon", data.customerPhone, { large: true })}
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${renderInfoCard("Plocha", `${data.totalArea} m²`)}
        ${renderInfoCard("Adresa", data.address)}
        ${renderInfoCard("Termín", data.realizationDate)}
      </div>
      ${renderGridCard("Kontakt zákazníka", [
        ["Jméno", data.customerName],
        ["E-mail", data.customerEmail],
        ["Typ plochy", data.areaType],
        ["Typ opravy", data.repairType],
      ])}
      ${renderGridCard("Detaily zakázky", [
        ["Výška stropu", data.ceilingHeight],
        ["Barvu zajišťuje", data.materialProvider],
        ["Posunutí nábytku", data.furnitureMoving],
        ["Zakrývání", data.covering],
        ["Úklid", data.cleaningService],
        ["Počet místností", data.roomCount],
        ["Typ prostoru", data.spaceType],
        ["Prázdný prostor", data.spaceStatus],
        ["Koberce", data.carpets],
        ["Odesláno", data.creationTime],
      ])}
      ${renderNoteCard("Dodatečné informace", data.additionalInfo)}
    `,
    "business"
  );

  const text = `Nová poptávka z kalkulačky

ORIENTAČNÍ CENA
${data.totalPrice} Kč

TELEFON
${data.customerPhone}

PLOCHA
${data.totalArea} m²

ADRESA
${data.address}

TERMÍN
${data.realizationDate}

KONTAKT ZÁKAZNÍKA
Jméno: ${data.customerName}
E-mail: ${data.customerEmail}
Typ plochy: ${data.areaType}
Typ opravy: ${data.repairType}

DETAILY ZAKÁZKY
Výška stropu: ${data.ceilingHeight}
Barvu zajišťuje: ${data.materialProvider}
Posunutí nábytku: ${data.furnitureMoving}
Zakrývání: ${data.covering}
Úklid: ${data.cleaningService}
Počet místností: ${data.roomCount}
Typ prostoru: ${data.spaceType}
Prázdný prostor: ${data.spaceStatus}
Koberce: ${data.carpets}
Odesláno: ${data.creationTime}

POZNÁMKA
${data.additionalInfo}`;

  return { subject, html, text };
}

export function createCustomerConfirmationEmail(payload: CalculatorInquiryPayload): EmailContent {
  const data = formatCalculatorInquiry(payload);
  const subject = "Potvrzení přijetí poptávky";

  const html = createEmailShell(
    "Poptávku jsme přijali",
    `Děkujeme, ${data.customerName}. Ozveme se vám nejpozději do 24 hodin a navážeme na orientační kalkulaci níže.`,
    `
      ${renderInfoCard("Orientační cena", `${data.totalPrice} Kč`, { large: true, dark: true })}
      ${renderInfoCard("Telefon", "+420 732 333 550", { large: true })}
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;">
        ${renderInfoCard("Plocha", `${data.totalArea} m²`)}
        ${renderInfoCard("Termín", data.realizationDate)}
      </div>
      ${renderGridCard("Shrnutí poptávky", [
        ["Typ plochy", data.areaType],
        ["Typ opravy", data.repairType],
        ["Posunutí nábytku", data.furnitureMoving],
        ["Zakrývání", data.covering],
        ["Úklid", data.cleaningService],
        ["Adresa", data.address],
      ])}
      ${renderGridCard("Kontakt na nás", [
        ["E-mail", "info@malirivcernem.cz"],
        ["Telefon", "+420 732 333 550"],
      ])}
    `,
    "customer"
  );

  const text = `Dobrý den ${data.customerName},

děkujeme za vaši poptávku. Přijali jsme ji a ozveme se vám nejpozději do 24 hodin.

ORIENTAČNÍ CENA
${data.totalPrice} Kč

TELEFON
+420 732 333 550

SHRNUTÍ
Typ plochy: ${data.areaType}
Plocha: ${data.totalArea} m²
Typ opravy: ${data.repairType}
Posunutí nábytku: ${data.furnitureMoving}
Zakrývání: ${data.covering}
Úklid: ${data.cleaningService}
Adresa: ${data.address}
Termín: ${data.realizationDate}

Kontakt:
info@malirivcernem.cz
+420 732 333 550`;

  return { subject, html, text };
}

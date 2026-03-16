import { ContactInquiryPayload } from "@/lib/contactInquiry";

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

function contactTypeLabel(type: string) {
  const labels: Record<string, string> = {
    byt: "Malování bytu",
    kancelar: "Malování kanceláří",
    sterky: "Dekorativní stěrky",
    svj: "SVJ / Developers",
    jine: "Jiné",
  };
  return labels[type] || "Neuvedeno";
}

export function createBusinessContactEmail(payload: ContactInquiryPayload): EmailContent {
  const type = contactTypeLabel(payload.type);
  const phone = payload.phone.trim() || "Neuvedeno";
  const subject = `Nová zpráva z kontakt formuláře - ${payload.name}`;
  const html = wrapEmail(
    "Nová zpráva z webového formuláře",
    "Přišla nová zpráva z kontaktní stránky webu.",
    [
      renderSection("Kontakt", [
        ["Jméno", payload.name],
        ["Email", payload.email],
        ["Telefon", phone],
        ["Typ poptávky", type],
      ]),
      renderSection("Zpráva", [["Obsah", payload.message.replace(/\n/g, "<br />")]]),
    ]
  );
  const text = `Nová zpráva z kontaktní stránky

Jméno: ${payload.name}
Email: ${payload.email}
Telefon: ${phone}
Typ poptávky: ${type}

Zpráva:
${payload.message}`;

  return { subject, html, text };
}

export function createCustomerContactConfirmationEmail(payload: ContactInquiryPayload): EmailContent {
  const type = contactTypeLabel(payload.type);
  const subject = "Potvrzení přijetí zprávy";
  const html = wrapEmail(
    "Děkujeme za zprávu",
    `Dobrý den ${payload.name}, vaši zprávu jsme přijali a ozveme se vám co nejdříve, obvykle do 2 hodin v pracovní dny.`,
    [
      renderSection("Shrnutí", [
        ["Typ poptávky", type],
        ["Email", payload.email],
        ["Telefon", payload.phone.trim() || "Neuvedeno"],
        ["Zpráva", payload.message.replace(/\n/g, "<br />")],
      ]),
      renderSection("Kontakt", [
        ["Email", "info@malirivcernem.cz"],
        ["Telefon", "+420 732 333 550"],
      ]),
    ]
  );
  const text = `Dobrý den ${payload.name},

děkujeme za vaši zprávu. Přijali jsme ji a ozveme se vám co nejdříve, obvykle do 2 hodin v pracovní dny.

Typ poptávky: ${type}
Email: ${payload.email}
Telefon: ${payload.phone.trim() || "Neuvedeno"}

Zpráva:
${payload.message}

Kontakt:
info@malirivcernem.cz
+420 732 333 550`;

  return { subject, html, text };
}

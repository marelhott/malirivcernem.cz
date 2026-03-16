import { useState, useRef, useMemo } from "react";
import React from "react";
import { motion, useInView } from "motion/react";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, PaperAirplaneIcon, CheckCircleIcon, ArrowRightIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { contactEmailRegex, contactPhoneRegex } from "@/lib/contactInquiry";

const getContactIcon = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{className?: string}>> = {
    phone: PhoneIcon,
    mail: EnvelopeIcon,
    mappin: MapPinIcon,
    clock: ClockIcon,
  };
  return icons[iconName.toLowerCase()] || null;
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const contactInfo = [
  { iconName: "phone", label: "Telefon", value: "+420 732 333 550", href: "tel:+420732333550", desc: "Po–Ne 7:00–22:00" },
  { iconName: "mail", label: "E-mail", value: "info@malirivcernem.cz", href: "mailto:info@malirivcernem.cz", desc: "Odpovíme do 2 hodin" },
  { iconName: "mappin", label: "Adresa", value: "Praha, Česká republika", href: "#", desc: "Působíme dle velikosti zakázky v celé české republice" },
  { iconName: "clock", label: "Pracovní doba", value: "Po–Ne: 7:00 – 22:00", href: "#", desc: "Víkendové termíny po domluvě" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.message.trim() !== "" &&
      contactEmailRegex.test(formData.email.trim()) &&
      contactPhoneRegex.test(formData.phone.trim())
    );
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !isFormValid) return;

    setSubmitting(true);
    setSubmitMsg(null);

    try {
      const response = await fetch("/api/contact-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Odeslání se nepodařilo.");
      }

      setSubmitted(true);
      setSubmitMsg({ text: "Zpráva byla úspěšně odeslána. Potvrzení jsme poslali i na váš email.", type: "success" });
    } catch {
      setSubmitMsg({ text: "Zprávu se nepodařilo odeslat. Napište nám prosím přímo na info@malirivcernem.cz.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border font-sans transition-all duration-300 focus:outline-none focus:ring-1";
  const inputStyle = {
    background: "#fafafa",
    borderColor: "#e5e5e5",
    color: "#1a1a1a",
    fontSize: "14px",
    boxShadow: "none",
  } as const;

  return (
    <>
      <section className="relative pt-32 pb-20 noise-overlay overflow-hidden" style={{ background: "linear-gradient(160deg, #ffffff 0%, #f4f8ff 50%, #ffffff 100%)" }}>
        <div className="absolute inset-0 z-0 opacity-[0.06]">
          <ImageWithFallback src="https://images.unsplash.com/photo-1698637644147-54099497b214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQcmFndWUlMjBvbGQlMjB0b3duJTIwYWVyaWFsJTIwcGFub3JhbWElMjBldmVuaW5nfGVufDF8fHx8MTc3MTMyOTY1Mnww&ixlib=rb-4.1.0&q=80&w=1080" alt="Praha a okolí - lokalita malířských služeb Malíři v černém" className="w-full h-full object-cover" />
        </div>
        <div className="absolute w-[600px] h-[600px] -top-[200px] -right-[100px] rounded-full blur-[200px] pointer-events-none z-[2]" style={{ background: "rgba(37,99,235,0.10)" }} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-6 block" style={{ fontSize: "12px", fontWeight: 600 }}>Kontakt</span>
            <h1 className="font-[family-name:var(--font-display)] text-foreground mb-6" style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, lineHeight: 1.2 }}>
              Ozvěte se <span className="bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">nám</span>
            </h1>
            <p className="font-sans max-w-xl" style={{ fontSize: "17px", lineHeight: 1.75, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>Máte dotaz, chcete nezávaznou nabídku nebo se prostě jen potřebujete poradit? Pomáháme s malováním bytů, pokojů, kanceláří, SVJ i dekorativních stěrek v Praze a okolí.</p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {contactInfo.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <a href={c.href} className="group block p-6 rounded-[12px] transition-all duration-500 hover:-translate-y-1 flex flex-col" style={{ background: "#e9ecf2", border: "1px solid #d8dceb", minHeight: "180px" }}>
                  <div className="mb-4">{getContactIcon(c.iconName) && React.createElement(getContactIcon(c.iconName)!, { className: "w-6 h-6 text-[#2563eb]" })}</div>
                  <span className="block mb-1" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7b8794", fontFamily: "'Manrope', var(--font-sans)" }}>{c.label}</span>
                  <span className="block mb-1" style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a1a", fontFamily: "'Manrope', var(--font-sans)" }}>{c.value}</span>
                  <span className="font-sans mt-auto" style={{ fontSize: "12px", color: "#6b7785", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 600 }}>{c.desc}</span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="rounded-[12px] p-8 md:p-10 mb-8" style={{ background: "#e9ecf2", border: "1px solid #d8dceb" }}>
              <h2 className="font-[family-name:var(--font-display)] text-foreground mb-5" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.08 }}>
                Kontakt pro malování bytů, kanceláří a SVJ v Praze
              </h2>
              <p className="font-sans mb-4" style={{ fontSize: "16px", lineHeight: 1.75, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>
                Kontaktní formulář slouží pro rychlou poptávku malování bytu, pokoje, kanceláře nebo společných prostor domu. Pokud už víte základní rozměry a rozsah prací, doporučujeme nejdřív navštívit <a href="/kalkulacka" className="text-accent underline underline-offset-4">kalkulačku malování</a>, kde si spočítáte orientační cenu.
              </p>
              <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>
                U větších realizací pro kanceláře, SVJ, restaurace nebo developery nám stačí stručný popis zakázky a kontakt. Ozveme se zpět a navrhneme další postup, termín i přesnější rozpočet.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <Reveal>
                <div className="p-8 md:p-10 rounded-[12px]" style={{ background: "#e9ecf2", border: "1px solid #d8dceb" }}>
                  {submitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                      <CheckCircleIcon className="w-12 h-12 text-[#2563eb] mx-auto mb-6" />
                      <h3 className="font-[family-name:var(--font-display)] text-foreground mb-3" style={{ fontSize: "24px", fontWeight: 600 }}>Děkujeme za zprávu!</h3>
                      <p className="font-sans max-w-md mx-auto" style={{ fontSize: "15px", lineHeight: 1.72, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>Ozveme se vám do 2 hodin v pracovní dny. Potvrzení jsme poslali i na váš email.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <h3 className="font-[family-name:var(--font-display)] text-foreground mb-2" style={{ fontSize: "22px", fontWeight: 600 }}>Napište nám</h3>
                      <p className="font-sans mb-8" style={{ fontSize: "14px", color: "#6b7785", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 600 }}>Odpovíme do 2 hodin v pracovní dny.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-foreground/50 font-[family-name:var(--font-display)] mb-2" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Jméno *</label>
                          <input type="text" required placeholder="Vaše jméno" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} style={inputStyle} />
                        </div>
                        <div>
                          <label className="block text-foreground/50 font-[family-name:var(--font-display)] mb-2" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>E-mail *</label>
                          <input type="email" required placeholder="vas@email.cz" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} style={inputStyle} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-foreground/50 font-[family-name:var(--font-display)] mb-2" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Telefon</label>
                          <input type="tel" placeholder="+420 ..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} style={inputStyle} />
                        </div>
                        <div>
                          <label className="block text-foreground/50 font-[family-name:var(--font-display)] mb-2" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Typ poptávky</label>
                          <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`} style={inputStyle}>
                            <option value="">Vyberte...</option>
                            <option value="byt">Malování bytu</option>
                            <option value="kancelar">Malování kanceláří</option>
                            <option value="sterky">Dekorativní stěrky</option>
                            <option value="svj">SVJ / Developers</option>
                            <option value="jine">Jiné</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-8">
                        <label className="block text-foreground/50 font-[family-name:var(--font-display)] mb-2" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Zpráva *</label>
                        <textarea required rows={5} placeholder="Popište váš projekt..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputClass} resize-none`} style={inputStyle} />
                      </div>
                      {submitMsg && (
                        <div
                          className="mb-6 flex items-start gap-3 rounded-xl border px-4 py-3"
                          style={{
                            borderColor: submitMsg.type === "success" ? "rgba(37,99,235,0.18)" : "rgba(239,68,68,0.2)",
                            background: submitMsg.type === "success" ? "rgba(37,99,235,0.06)" : "rgba(239,68,68,0.06)",
                          }}
                        >
                          {submitMsg.type === "success" ? (
                            <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2563eb]" />
                          ) : (
                            <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                          )}
                          <p className="font-sans" style={{ fontSize: "13px", lineHeight: 1.6, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 600 }}>
                            {submitMsg.text}
                          </p>
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={!isFormValid || submitting}
                        className="group w-full inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-white transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        style={{ background: "#2563eb", fontSize: "14px", fontWeight: 600 }}
                      >
                        <PaperAirplaneIcon className="w-4 h-4" /> {submitting ? "Odesílám..." : "Odeslat zprávu"} <ArrowRightIcon className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-[96px]">
                <Reveal delay={0.15}>
                  <div className="p-8 rounded-[12px] mb-5" style={{ background: "#e9ecf2", border: "1px solid #d8dceb" }}>
                    <h4 className="font-[family-name:var(--font-display)] text-foreground mb-4" style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em" }}>Proč nás kontaktovat?</h4>
                    <div className="flex flex-col gap-3">
                      {["Bezplatná konzultace a prohlídka", "Přesná kalkulace do 24 hodin", "Pojištění odpovědnosti do 5 mil. Kč", "Reference od 1 000+ klientů"].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0"><CheckCircleIcon className="w-2.5 h-2.5 text-accent" strokeWidth={3} /></div>
                          <span className="font-sans" style={{ fontSize: "13px", color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 600 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.25}>
                  <div className="p-8 rounded-[12px] overflow-hidden relative" style={{ background: "#e9ecf2", border: "1px solid #d8dceb" }}>
                    <div className="relative z-10">
                      <h4 className="mb-3" style={{ fontSize: "18px", fontWeight: 600 }}>Rychlá kalkulace</h4>
                      <p className="font-sans mb-6" style={{ fontSize: "14px", lineHeight: 1.68, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>Spočítejte si orientační cenu online ihned.</p>
                      <a href="/kalkulacka" className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all duration-300 hover:opacity-90" style={{ background: "#2563eb", fontSize: "13px", fontWeight: 700, fontFamily: "'Manrope', var(--font-sans)", letterSpacing: "0.03em" }}>
                        Online kalkulačka <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

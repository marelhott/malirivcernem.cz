import { useRef } from "react";
import { useParams, Link, Navigate } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, ArrowLeft, Check, Phone, Send, Calculator, Paintbrush, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { serviceSeoContent } from "../data/serviceSeoContent";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const servicesData: Record<string, { title: string; tag: string; image: string; heroDesc: string; features: string[]; process: { step: string; desc: string; icon: typeof Send }[]; priceHint: string; cta: string }> = {
  "malovani-bytu": { title: "Malování bytů", tag: "Rezidenční", image: "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Fccb0003eea4f4419ae5d6485d2222ae5", heroDesc: "Kompletní malířské služby pro byty a rodinné domy. Od jednopokojových bytů po luxusní rezidence – každý prostor si zaslouží precizní péči.", features: ["Kompletní zakrytí nábytku a podlah fóliemi", "Příprava povrchů — tmelení, broušení, penetrace", "Malování stěn a stropů prémiovými barvami", "Dekorativní lemy, bordury a barevné kombinace", "Finální kontrola kvality a úklid", "Poradenství při výběru barev zdarma"], process: [{ step: "Prohlídka", desc: "Bezplatná návštěva a posouzení stavu", icon: Send }, { step: "Kalkulace", desc: "Detailní cenová nabídka do 24 hodin", icon: Calculator }, { step: "Realizace", desc: "Precizní provedení v dohodnutém termínu", icon: Paintbrush }, { step: "Předání", desc: "Kontrola, úklid a spokojenost", icon: CheckCircle2 }], priceHint: "Od 85 Kč/m²", cta: "Poptat malování bytu" },
  "malovani-pred-prodejem": { title: "Malování před prodejem nebo pronájmem", tag: "Osobní", image: "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F6f785ac818cd4504aa3ddbdcc553358c", heroDesc: "Rychlé a efektivní malování, které připraví váš byt či dům na prodej nebo nový pronájem. Vytvořenímu neutální atmosféry a zvýšíme atraktivitu nemovitosti.", features: ["Neutralizace těch intenzivních barev", "Příprava zdí na vysoké standardy", "Opravy a zatmelení vnitřních nedostatků", "Čisté a svěží prostředí pro prohlídky", "Rychlá realizace — 1–2 dny", "Zvýšíme cenu pronájmu nebo prodeje"], process: [{ step: "Obhlídka", desc: "Posouzení stavu a potřeb", icon: Send }, { step: "Strategie", desc: "Doporučení barev a časový plán", icon: Calculator }, { step: "Realizace", desc: "Rychlé a efektivní provedení", icon: Paintbrush }, { step: "Kontrola", desc: "Finální příprava na prodej/pronájem", icon: CheckCircle2 }], priceHint: "Od 80 Kč/m²", cta: "Poptat malování na prodej" },
  "malovani-kancelari": { title: "Malování kanceláří", tag: "Komerční", image: "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F3026d95741854f52aaaf83680e170c34", heroDesc: "Profesionální malování komerčních prostor s minimálním narušením provozu. Pracujeme o víkendech i v noci.", features: ["Realizace mimo pracovní dobu", "Zero-disruption záruka", "Antigraffiti a odolné nátěry", "Korporátní barvy podle CI", "Výšková práce do 12 m", "Pojištění do 5 mil. Kč"], process: [{ step: "Konzultace", desc: "Posouzení prostor a požadavků", icon: Send }, { step: "Plán", desc: "Harmonogram s ohledem na provoz", icon: Calculator }, { step: "Realizace", desc: "Efektivní provedení", icon: Paintbrush }, { step: "Kontrola", desc: "Inspekce a dokumentace", icon: CheckCircle2 }], priceHint: "Od 75 Kč/m²", cta: "Poptat malování kanceláří" },
  "malovani-svj": { title: "Malování společných prostor domů (SVJ)", tag: "SVJ / Developers", image: "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2Fb9f6d6ba78a64aac8ceef99230e436ae", heroDesc: "Společné prostory jsou tváří každého domu. Jsme odborníci na malování chodeb, schodišť a dalších prostor spravovaných SVJ a bytovými družstvy.", features: ["Etapová realizace v obydlených domech", "Bezpečnostní opatření během práce", "Hromadné slevy pro SVJ", "Koordinace s výborem SVJ", "Kompletní fotodokumentace", "Minimální hluk a prach"], process: [{ step: "Obhlídka", desc: "Bezplatná prohlídka všech prostor", icon: Send }, { step: "Nabídka", desc: "Detailní rozpočet a harmonogram", icon: Calculator }, { step: "Koordinace", desc: "Komunikace s SVJ a majiteli", icon: Paintbrush }, { step: "Realizace", desc: "Etapové provedení s minimem obtíží", icon: CheckCircle2 }], priceHint: "Individuální kalkulace", cta: "Poptat pro SVJ" },
  "dekorativni-sterky": { title: "Dekorativní úprava zdí", tag: "Speciální", image: "https://images.unsplash.com/photo-1719194981461-fa0ec450999e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwY29uY3JldGUlMjBtaWNyb2NlbWVudCUyMHdhbGwlMjB0ZXh0dXJlfGVufDF8fHx8MTc3MTMyNzE1OXww&ixlib=rb-4.1.0&q=80&w=1080", heroDesc: "Vytvořte unikátní interiér. Microcement, benátský štuk a desítky moderních povrchových úprav.", features: ["Microcement (stěny, podlahy, koupelny)", "Benátský štuk — Stucco Veneziano", "Betonový efekt — Beton Ciré", "Metalické a perleťové povrchy", "Voděodolné úpravy pro wellness", "Vzorky a vizualizace zdarma"], process: [{ step: "Inspirace", desc: "Výběr materiálu a vzorování", icon: Send }, { step: "Příprava", desc: "Profesionální podkladové vrstvy", icon: Calculator }, { step: "Aplikace", desc: "Ruční nanášení ve 2–4 vrstvách", icon: Paintbrush }, { step: "Finalizace", desc: "Ochranné vrstvy a zapečetění", icon: CheckCircle2 }], priceHint: "Od 850 Kč/m²", cta: "Poptat dekorativní úpravu zdí" },
  "komercni-objekty": { title: "Komerční objekty", tag: "SVJ / Developers", image: "https://images.unsplash.com/photo-1768270181430-3e3672a32283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBsb2JieSUyMGludGVyaW9yfGVufDF8fHx8MTc3MTMyNzE1OXww&ixlib=rb-4.1.0&q=80&w=1080", heroDesc: "Velkoplošné projekty pro SVJ, bytové domy a developery.", features: ["Malování společných prostor", "Fasádní nátěry a opravy", "Koordinace v obydlených objektech", "Etapová realizace", "Hromadné slevy pro SVJ", "Kompletní fotodokumentace"], process: [{ step: "Obhlídka", desc: "Bezplatná prohlídka objektu", icon: Send }, { step: "Nabídka", desc: "Detailní rozpočet", icon: Calculator }, { step: "Koordinace", desc: "Komunikace s SVJ", icon: Paintbrush }, { step: "Realizace", desc: "Etapové provedení", icon: CheckCircle2 }], priceHint: "Individuální kalkulace", cta: "Poptat pro SVJ / developer" },
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;
  const seoContent = slug ? serviceSeoContent[slug] : null;
  if (!service) return <Navigate to="/sluzby" replace />;

  return (
    <>
      <section className="relative pt-32 pb-20 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 100%)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative z-10">
          <div className="relative rounded-[10px] overflow-hidden" style={{ background: "#e9ecf2", padding: "40px 60px", marginLeft: "-30px" }}>
            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-[70px] items-center" style={{ marginLeft: "30px" }}>
              {/* Image */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                <div className="rounded-[16px] overflow-hidden">
                  <ImageWithFallback src={service.image} alt={service.title} className="w-full h-[400px] object-cover" />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-col gap-8">
                {/* Tag */}
                <div>
                  <span className="inline-block px-3 py-1.5 rounded-full bg-foreground/10 text-foreground font-sans" style={{ fontSize: "12px", fontWeight: 600 }}>
                    {service.tag}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="font-[family-name:var(--font-display)] text-foreground m-0" style={{ fontSize: "42px", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                    {service.title}
                  </h1>
                </div>

                {/* Description */}
                <p className="font-sans text-foreground m-0" style={{ fontSize: "18px", lineHeight: 1.5, color: "#3d3d47" }}>
                  {service.heroDesc}
                </p>

                {/* Quote */}
                <div className="flex items-start gap-5">
                  <span className="text-foreground flex-shrink-0 font-bold" style={{ fontSize: "56px", lineHeight: 0.8 }}>"</span>
                  <p className="font-sans text-foreground m-0" style={{ fontSize: "18px", lineHeight: 1.4, color: "#3d3d47" }}>
                    {service.tag === "Rezidenční" ? "Kompletně transformované byty naší týmem jsou tichou svědkyní naší péče o každý detail. Klienti si cení našeho profesionalismu a vstupu do jejich domovů s úctou." : "Naše služby jsou poskytovány s maximální profesionalitou a péčí o vaši spokojenost."}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <p className="font-sans text-foreground m-0" style={{ fontSize: "16px", fontWeight: 400, color: "#6b7785" }}>
                    {service.tag === "Rezidenční" ? "Spokojený klient" : "Tým profesionálů"}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          {seoContent ? (
            <Reveal>
              <div className="mb-12 rounded-[28px] p-8 md:p-10" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 18px 48px rgba(15,23,42,0.05)" }}>
                <h2 className="font-[family-name:var(--font-display)] text-foreground mb-5" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.1 }}>
                  {seoContent.heading}
                </h2>
                <p className="font-sans mb-4" style={{ fontSize: "16px", lineHeight: 1.75, color: "#526071", fontWeight: 500 }}>
                  {seoContent.intro}
                </p>
                <p className="font-sans" style={{ fontSize: "16px", lineHeight: 1.75, color: "#526071", fontWeight: 500 }}>
                  {seoContent.body}
                </p>
              </div>
            </Reveal>
          ) : null}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-foreground mb-8" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Co zahrnuje</h2>
                <div className="flex flex-col gap-4">
                  {service.features.map((f, i) => (
                    <motion.div key={f} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center mt-0.5"><Check size={12} className="text-accent" strokeWidth={2.5} /></div>
                      <span className="text-foreground/70 font-sans" style={{ fontSize: "15px", lineHeight: 1.6 }}>{f}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-foreground mb-8" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Jak postupujeme</h2>
                <div className="flex flex-col gap-6">
                  {service.process.map((p, i) => (
                    <motion.div key={p.step} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-foreground/8 to-foreground/3 flex items-center justify-center group-hover:from-accent/20 group-hover:to-accent/5 transition-all duration-300">
                        <p.icon size={16} className="text-accent" strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="block font-[family-name:var(--font-display)] text-foreground mb-0.5" style={{ fontSize: "16px", fontWeight: 600 }}>{p.step}</span>
                        <span className="text-foreground/40 font-sans" style={{ fontSize: "14px", lineHeight: 1.5 }}>{p.desc}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="relative rounded-[10px] overflow-hidden" style={{ background: "#e9ecf2", padding: "40px 60px", marginTop: "40px" }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[70px] items-center" style={{ marginLeft: "30px" }}>
                {/* Left side - Pricing info */}
                <div>
                  <div className="flex flex-col gap-6">
                    <div>
                      <span className="font-[family-name:var(--font-display)] text-foreground/50 block mb-2" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Orientační ceník</span>
                      <span className="text-foreground font-[family-name:var(--font-display)]" style={{ fontSize: "42px", fontWeight: 500, lineHeight: 1.1 }}>
                        {service.priceHint}
                      </span>
                    </div>
                    <p className="font-sans text-foreground" style={{ fontSize: "16px", lineHeight: 1.6, color: "#3d3d47" }}>
                      Finální cenu upřesníme po osobní prohlídce prostor a detailního seznámení se všemi požadavky.
                    </p>
                  </div>
                </div>

                {/* Right side - CTA buttons */}
                <div className="flex flex-col gap-4">
                  <Link to="/kalkulacka" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-white transition-all duration-300 hover:shadow-lg" style={{ background: "#1a1a1a", fontSize: "15px", fontWeight: 600 }}>
                    {service.cta} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="tel:+420732333550" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-foreground border transition-all duration-300 hover:bg-white/80" style={{ fontSize: "15px", fontWeight: 600, borderColor: "#d0d0d0", backgroundColor: "#ffffff", color: "#0f172a" }}>
                    <Phone size={16} /> Zavolat
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {seoContent ? (
            <Reveal delay={0.25}>
              <div className="mt-10 rounded-[28px] p-8 md:p-10" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 18px 48px rgba(15,23,42,0.05)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-foreground mb-6" style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 700, lineHeight: 1.1 }}>
                      Časté dotazy k této službě
                    </h2>
                    <div className="grid gap-4">
                      {seoContent.faq.map((item) => (
                        <article key={item.q} className="rounded-2xl p-5" style={{ background: "rgba(15,23,42,0.04)" }}>
                          <h3 className="mb-2" style={{ fontFamily: "'Sora', sans-serif", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.03em", color: "#0f172a" }}>
                            {item.q}
                          </h3>
                          <p className="m-0 font-sans" style={{ fontSize: "15px", lineHeight: 1.7, color: "#526071", fontWeight: 500 }}>
                            {item.a}
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 min-w-[220px]">
                    <Link to="/sluzby" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-all duration-300" style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(15,23,42,0.08)", color: "#334155", fontSize: "14px", fontWeight: 700 }}>
                      Všechny služby
                    </Link>
                    <Link to="/realizace" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-all duration-300" style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(15,23,42,0.08)", color: "#334155", fontSize: "14px", fontWeight: 700 }}>
                      Ukázky realizací
                    </Link>
                    <Link to="/kontakt" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-all duration-300" style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(15,23,42,0.08)", color: "#334155", fontSize: "14px", fontWeight: 700 }}>
                      Nezávazná poptávka
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>
    </>
  );
}

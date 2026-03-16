import React, { useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  HomeIcon,
  BuildingLibraryIcon,
  PaintBrushIcon,
  WrenchIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const faqItems = [
  {
    q: "Jak vybrat správnou službu, když si nejsem jistý?",
    a: "Pokud si nejste jistí, využijte online kalkulačku nebo nás kontaktujte. Doporučíme vhodný postup podle typu prostoru a stavu povrchů.",
  },
  {
    q: "Děláte i komerční zakázky a SVJ?",
    a: "Ano. Realizujeme kanceláře, společné prostory, komerční objekty i zakázky pro SVJ a developery včetně etapového postupu.",
  },
  {
    q: "Je možné domluvit prohlídku a přesnější nacenění?",
    a: "Ano, po úvodní poptávce domluvíme prohlídku nebo upřesnění podkladů a připravíme konkrétní nabídku.",
  },
];

/* ─── Icon helper ─── */
const getServiceIcon = (iconName: string) => {
  const icons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    home: HomeIcon,
    building: BuildingLibraryIcon,
    palette: PaintBrushIcon,
    wrench: WrenchIcon,
    store: BuildingStorefrontIcon,
    users: UserGroupIcon,
  };
  return icons[iconName.toLowerCase()] || null;
};

/* ─── Reveal helper ─── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Services data ─── */
const allServices = [
  {
    title: "Malování bytů a domů",
    slug: "malovani-bytu",
    tag: "Rezidenční",
    iconName: "home",
    desc: "Váš domov si zaslouží to nejlepší – a my vám to rádi dopřejeme díky dokonalé výmalbě vašich osobních prostor. Od garsoniéry po rodinný dům.",
    features: [
      "Kompletní zakrytí nábytku a podlah",
      "Prémiové barvy Dulux / Caparol",
      "Poradenství při výběru barev zdarma",
    ],
    price: "Od 85 Kč/m²",
    color: "#c9982d",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F5e3db085be04449fb327c79b0ec47e1b",
  },
  {
    title: "Malování před prodejem nebo pronájmem",
    slug: "malovani-pred-prodejem",
    tag: "Osobní",
    iconName: "home",
    desc: "Příprava nemovitosti na prodej nebo pronájem vyžaduje čisté a neutrální prostředí. Zvýšíme atraktivitu vašeho bytu či domu rychlým a efektivním malováním.",
    features: [
      "Neutralizace intenzivních barev",
      "Rychlá realizace — 1–2 dny",
      "Zvýšíme atraktivitu na trhu",
    ],
    price: "Od 80 Kč/m²",
    color: "#4f9fb8",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F6f785ac818cd4504aa3ddbdcc553358c",
  },
  {
    title: "Malování kanceláří a komerčních prostor",
    slug: "malovani-kancelari",
    tag: "Komerční",
    iconName: "building",
    desc: "Reprezentativní prostředí je vizitkou každé úspěšné firmy či ordinace – a my vám ho pomůžeme vytvořit. Pracujeme mimo pracovní dobu, o víkendech i v noci.",
    features: [
      "Zero-disruption – mimo pracovní dobu",
      "Korporátní barvy dle CI",
      "Pojištění do 5 mil. Kč",
    ],
    price: "Od 75 Kč/m²",
    color: "#6b8f71",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F3026d95741854f52aaaf83680e170c34",
  },
  {
    title: "Malování pensionů, restaurací a menších hotelů",
    slug: "komercni-objekty",
    tag: "Hospitality",
    iconName: "store",
    desc: "Každý obchod, kavárna či penzion má svůj příběh – a my ho podtrhneme dokonalým vzhledem. Malujeme v termínech, které vám vyhovují.",
    features: [
      "Flexibilní termíny bez příplatků",
      "Odolné a omyvatelné nátěry",
      "Kompletní fotodokumentace",
    ],
    price: "Od 80 Kč/m²",
    color: "#c9982d",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F813e356566e0424cbba8f945a4b5a0bc",
  },
  {
    title: "Malování společných prostorů domu (SVJ)",
    slug: "malovani-svj",
    tag: "SVJ / Developers",
    iconName: "users",
    desc: "Společné prostory jsou tváří každého domu. Jsme odborníci na malování chodeb, schodišť a dalších prostor spravovaných SVJ a bytovými družstvy.",
    features: [
      "Etapová realizace v obydlených domech",
      "Hromadné slevy pro SVJ",
      "Koordinace s výborem SVJ",
    ],
    price: "Individuální",
    color: "#6b8f71",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Ffe0d5ae8e8b3454e951a42634b8be26d",
  },
  {
    title: "Dekorativní úprava zdí",
    slug: "dekorativni-sterky",
    tag: "Speciální",
    iconName: "palette",
    desc: "Microcement, benátský štuk, betonový efekt a desítky dalších moderních povrchových úprav. Unikátní interiéry s precizním řemeslem a důrazem na jedinečnost.",
    features: [
      "Microcement a benátský štuk",
      "Vzorky a vizualizace zdarma",
      "Voděodolné úpravy pro wellness",
    ],
    price: "Od 850 Kč/m²",
    color: "#b8a88a",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Fc56ff688f14e45aabf5bbee2d3fe87bc",
  },
];

/* ─── Page ─── */
export default function ServicesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative pt-32 pb-20 noise-overlay overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #ffffff 0%, #f4f8ff 46%, #ffffff 100%)",
        }}
      >
        <div
          className="absolute w-[600px] h-[600px] -top-[200px] -right-[100px] rounded-full blur-[200px] animate-float-slow pointer-events-none"
          style={{ background: "rgba(37,99,235,0.12)" }}
        />
        <div
          className="absolute w-[400px] h-[400px] bottom-0 -left-[100px] rounded-full blur-[150px] animate-float-reverse pointer-events-none"
          style={{ background: "rgba(124,58,237,0.08)" }}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-6 block"
              style={{ fontSize: "12px", fontWeight: 600 }}
            >
              Naše služby
            </span>
            <h1
              className="font-[family-name:var(--font-display)] text-foreground mb-6"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: 700,
                lineHeight: 1.0,
              }}
            >
              Kompletní malířské
              <br />
              <span className="bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
                služby
              </span>
            </h1>
            <p
              className="font-sans max-w-xl"
              style={{ fontSize: "17px", lineHeight: 1.75, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}
            >
              Od klasického malování bytů přes komerční prostory a SVJ po
              speciální dekorativní techniky. Vždy precizně, čistě, v termínu a
              za předem dohodnutou cenu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section
        className="relative py-20 noise-overlay"
        style={{
          background:
            "linear-gradient(180deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="flex flex-col gap-8">
            {allServices.map((s, i) => (
              <Reveal key={`${s.slug}-${i}`} delay={i * 0.06}>
                <Link to={`/sluzby/${s.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-[30px] transition-all duration-500 hover:shadow-[0_24px_70px_rgba(37,99,235,0.08)]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(244,248,255,0.96) 100%)", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 18px 48px rgba(15,23,42,0.05)" }}>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div
                        className={`aspect-[4/3] lg:aspect-[4/3] overflow-hidden relative ${
                          i % 2 === 1 ? "lg:order-2" : ""
                        }`}
                      >
                        <ImageWithFallback
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-none" />
                        <div
                          className="absolute bottom-0 left-0 right-0 h-1 lg:hidden"
                          style={{ background: s.color }}
                        />
                      </div>

                      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                        <div className="mb-8">
                          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full" style={{ background: "#1a1a1a" }}>
                            {React.createElement(getServiceIcon(s.iconName)!, {
                              className: "w-5 h-5",
                              style: { color: "#ffffff" },
                            })}
                            <span className="font-sans text-white" style={{ fontSize: "12px", fontWeight: 600 }}>
                              {s.tag}
                            </span>
                          </div>
                        </div>

                        <h2
                          className="mb-6"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "32px",
                            fontWeight: 500,
                            lineHeight: 1.2,
                            letterSpacing: "-0.03em",
                            color: "#0f172a",
                          }}
                        >
                          {s.title}
                        </h2>

                        <p
                          className="font-sans mb-8"
                          style={{ fontSize: "15px", lineHeight: 1.6, color: "#3d3d47" }}
                        >
                          {s.desc}
                        </p>

                        <div className="flex flex-col gap-3 mb-8">
                          {s.features.map((f) => (
                            <div key={f} className="flex items-start gap-2">
                              <span className="text-foreground flex-shrink-0" style={{ fontSize: "14px" }}>•</span>
                              <span
                                className="font-sans"
                                style={{ fontSize: "14px", color: "#3d3d47", lineHeight: 1.5 }}
                              >
                                {f}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-end justify-between pt-6" style={{ borderTop: "1px solid rgba(15,23,42,0.08)" }}>
                          <div>
                            <span
                              className="font-sans block"
                              style={{
                                fontSize: "11px",
                                letterSpacing: "0.08em",
                                color: "#7b8794",
                                fontWeight: 700,
                                marginBottom: "4px",
                              }}
                            >
                              ORIENTAČNÍ CENA
                            </span>
                            <span
                              style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 500, color: "#0f172a", letterSpacing: "-0.02em" }}
                            >
                              {s.price}
                            </span>
                          </div>
                          <div className="px-6 py-3 rounded-full transition-all duration-300" style={{ background: "#2563eb" }}>
                            <span
                              className="text-white font-sans"
                              style={{ fontSize: "13px", fontWeight: 600 }}
                            >
                              Detail služby
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section
        className="relative py-20 noise-overlay"
        style={{
          background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 text-center">
          <Reveal>
            <h2
              className="font-[family-name:var(--font-display)] text-foreground mb-6"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
              }}
            >
              Nevíte, jakou službu potřebujete?
            </h2>
            <p
              className="text-foreground/50 font-sans mb-10 max-w-lg mx-auto"
              style={{ fontSize: "16px", lineHeight: 1.7 }}
            >
              Použijte naši online kalkulačku a spočítejte si cenu předem — nebo
              nám zavolejte a poradíme.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/kalkulacka"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Online kalkulačka{" "}
                <ArrowRightIcon
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                to="/kontakt"
                className="inline-flex items-center px-8 py-4 rounded-full transition-all duration-300" style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(15,23,42,0.08)", color: "#334155", fontSize: "15px", fontWeight: 700, fontFamily: "'Manrope', var(--font-sans)" }}
              >
                Kontaktovat nás
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="relative py-16 noise-overlay"
        style={{ background: "linear-gradient(180deg, var(--s2) 0%, var(--s1) 100%)" }}
      >
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <div className="text-center mb-10">
              <span
                className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-4 block"
                style={{ fontSize: "12px", fontWeight: 600 }}
              >
                FAQ
              </span>
              <h2
                className="font-[family-name:var(--font-display)] text-foreground"
                style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700 }}
              >
                Časté dotazy ke službám
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-4">
            {faqItems.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <article className="rounded-[24px] p-6" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 14px 36px rgba(15,23,42,0.04)" }}>
                  <h3 className="mb-3" style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.035em", color: "#0f172a" }}>
                    {item.q}
                  </h3>
                  <p className="font-sans" style={{ fontSize: "15px", lineHeight: 1.74, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>
                    {item.a}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

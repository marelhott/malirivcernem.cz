import React, { useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import {
  ArrowRightIcon,
  CheckIcon,
  HomeIcon,
  BuildingLibraryIcon,
  PaintBrushIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const faqItems = [
  {
    q: "Jak vybrat správnou službu, když si nejsem jistý?",
    a: "Když váháte, začněte kalkulačkou nebo nám pošlete poptávku. Podle prostoru, stavu zdí a termínu vám doporučíme nejvhodnější řešení.",
  },
  {
    q: "Děláte i komerční zakázky a SVJ?",
    a: "Ano. Realizujeme kanceláře, společné prostory, komerční objekty i zakázky pro SVJ a developery včetně etapového postupu.",
  },
  {
    q: "Je možné domluvit prohlídku a přesnější nacenění?",
    a: "Ano. U větších nebo specifických zakázek si domluvíme prohlídku, upřesníme rozsah prací a připravíme konkrétní nabídku.",
  },
];

/* ─── Icon helper ─── */
const getServiceIcon = (iconName: string) => {
  const icons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    home: HomeIcon,
    building: BuildingLibraryIcon,
    palette: PaintBrushIcon,
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
    eyebrow: "Nejčastější volba pro domácnosti",
    desc: "Ideální, když chcete čistě a rychle vymalovat byt nebo dům bez starostí s přípravou a úklidem.",
    features: [
      "Kompletní zakrytí nábytku a podlah",
      "Prémiové barvy Dulux / Caparol",
      "Poradenství při výběru barev zdarma",
    ],
    price: "Od 85 Kč/m²",
    priceNote: "podle stavu zdí a rozsahu přípravy",
    cta: "Zjistit cenu",
    featured: true,
    color: "#2563eb",
    image:
      "/YuSeW8kAj7srJw931dYFVht6BY.avif",
  },
  {
    title: "Malování před prodejem nebo pronájmem",
    slug: "malovani-pred-prodejem",
    tag: "Osobní",
    iconName: "home",
    eyebrow: "Když potřebujete byt rychle připravit",
    desc: "Rychlé osvěžení interiéru před focením, prodejem nebo novým nájemníkem. Cíl je čistý, neutrální a dobře prezentovatelný prostor.",
    features: [
      "Neutralizace intenzivních barev",
      "Rychlá realizace — 1–2 dny",
      "Zvýšíme atraktivitu na trhu",
    ],
    price: "Od 80 Kč/m²",
    priceNote: "u standardně připravených ploch",
    cta: "Chci tuto službu",
    color: "#4f9fb8",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F6f785ac818cd4504aa3ddbdcc553358c",
  },
  {
    title: "Malování kanceláří a komerčních prostor",
    slug: "malovani-kancelari",
    tag: "Komerční",
    iconName: "building",
    eyebrow: "Pro firmy, které nechtějí brzdit provoz",
    desc: "Malování kanceláří, ordinací a provozoven v časech, které co nejméně omezí váš běžný chod.",
    features: [
      "Realizace mimo pracovní dobu",
      "Korporátní barvy dle CI",
      "Pojištění do 5 mil. Kč",
    ],
    price: "Od 75 Kč/m²",
    priceNote: "podle rozsahu a režimu prací",
    cta: "Nechat nacenit",
    featured: true,
    color: "#6b8f71",
    image:
      "/1773914926989-vygeneruj-mi-normln-kancel-v-karln-bez-lid.jpg",
  },
  {
    title: "Malování penzionů, restaurací a menších hotelů",
    slug: "komercni-objekty",
    tag: "Provozovny",
    iconName: "store",
    eyebrow: "Když je důležitý vzhled i termín",
    desc: "Pomůžeme vám upravit interiér tak, aby působil čistě na hosty i zákazníky a zároveň zbytečně neomezil provoz.",
    features: [
      "Flexibilní termíny bez příplatků",
      "Odolné a omyvatelné nátěry",
      "Kompletní fotodokumentace",
    ],
    price: "Od 80 Kč/m²",
    priceNote: "u běžných provozních prostor",
    cta: "Zjistit možnosti",
    color: "#c9982d",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F813e356566e0424cbba8f945a4b5a0bc",
  },
  {
    title: "Společné prostory (SVJ)",
    slug: "malovani-svj",
    tag: "SVJ a domy",
    iconName: "users",
    eyebrow: "Pro SVJ a správce domů",
    desc: "Chodby a schodiště řešíme tak, aby práce fungovala i v obydleném domě a komunikace byla jednoduchá.",
    features: [
      "Etapová realizace v domě",
      "Hromadné slevy pro SVJ",
      "Koordinace s výborem SVJ",
    ],
    price: "Individuální",
    priceNote: "podle velikosti domu",
    cta: "Nechat si poradit",
    featured: true,
    color: "#6b8f71",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Ffe0d5ae8e8b3454e951a42634b8be26d",
  },
  {
    title: "Dekorativní úprava zdí",
    slug: "dekorativni-sterky",
    tag: "Speciální",
    iconName: "palette",
    eyebrow: "Když chcete výraznější výsledek než klasickou výmalbu",
    desc: "Stěrky, dekorativní techniky a autorské úpravy pro interiéry, které mají působit originálně a reprezentativně.",
    features: [
      "Microcement a benátský štuk",
      "Vzorky a vizualizace zdarma",
      "Voděodolné úpravy pro wellness",
    ],
    price: "Od 850 Kč/m²",
    priceNote: "podle typu techniky a podkladu",
    cta: "Chci návrh",
    color: "#b8a88a",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Fc56ff688f14e45aabf5bbee2d3fe87bc",
  },
];

const quickLinks = [
  { label: "Byty a domy", slug: "malovani-bytu" },
  { label: "Před prodejem", slug: "malovani-pred-prodejem" },
  { label: "Kanceláře", slug: "malovani-kancelari" },
  { label: "Penziony a restaurace", slug: "komercni-objekty" },
  { label: "SVJ a domy", slug: "malovani-svj" },
  { label: "Dekorativní stěny", slug: "dekorativni-sterky" },
];

/* ─── Page ─── */
export default function ServicesPage() {
  const heroTitleStyle = {
    fontSize: "clamp(32px, 4vw, 56px)",
    fontWeight: 600,
    lineHeight: 1.2,
    fontFamily: "'Sora', sans-serif",
    letterSpacing: "-0.045em",
  } as const;

  const heroAccentStyle = {
    display: "block",
    marginTop: "8px",
    color: "#2563eb",
    fontFamily: "'Sora', sans-serif",
    fontWeight: 400,
    fontStyle: "italic",
    fontSize: "clamp(28px, 3.5vw, 36px)",
    lineHeight: 1.3,
    letterSpacing: "-0.045em",
  } as const;

  const sectionTitleStyle = {
    fontFamily: "'Sora', sans-serif",
    fontSize: "clamp(32px, 5vw, 52px)",
    fontWeight: 700,
    lineHeight: 1.02,
    letterSpacing: "-0.045em",
    color: "#0f172a",
  } as const;

  const compactSectionTitleStyle = {
    fontFamily: "'Sora', sans-serif",
    fontSize: "clamp(24px, 3.3vw, 40px)",
    fontWeight: 700,
    lineHeight: 1.04,
    letterSpacing: "-0.04em",
    color: "#0f172a",
  } as const;

  const orientationLeadStyle = {
    fontFamily: "'Sora', sans-serif",
    fontSize: "clamp(22px, 2.8vw, 36px)",
    fontWeight: 700,
    lineHeight: 1.03,
    letterSpacing: "-0.045em",
    color: "#0f172a",
  } as const;

  const orientationAccentStyle = {
    display: "block",
    marginTop: "10px",
    fontFamily: "'Sora', sans-serif",
    fontSize: "clamp(18px, 2.2vw, 24px)",
    fontWeight: 400,
    fontStyle: "italic",
    lineHeight: 1.22,
    letterSpacing: "-0.04em",
    color: "#2563eb",
  } as const;

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
              className="text-[#09090b] mb-6"
              style={heroTitleStyle}
            >
              Vyberte si službu
              <br />
              <span style={heroAccentStyle}>
                podle typu zakázky
              </span>
            </h1>
            <p
              className="font-sans max-w-xl"
              style={{ fontSize: "17px", lineHeight: 1.75, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}
            >
              Ať řešíte běžné malování bytu, přípravu nemovitosti před prodejem,
              kanceláře nebo společné prostory domu, tady rychle poznáte, co je
              pro vás nejvhodnější a s jakou cenou zhruba počítat.
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
                <Link to={`/sluzby/${s.slug}`} className="group block" id={s.slug}>
                  {(() => {
                    const isTallImageCard = s.slug === "malovani-svj";
                    return (
                  <div
                    className="relative overflow-hidden rounded-[30px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(37,99,235,0.08)]"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(244,248,255,0.96) 100%)",
                      border: s.featured ? "1px solid rgba(37,99,235,0.16)" : "1px solid rgba(15,23,42,0.08)",
                      boxShadow: s.featured ? "0 20px 52px rgba(37,99,235,0.08)" : "0 18px 48px rgba(15,23,42,0.05)",
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                      <div
                        className={`aspect-[4/3] lg:aspect-auto ${isTallImageCard ? "lg:h-[540px]" : "lg:h-full"} overflow-hidden relative self-stretch ${
                          i % 2 === 1 ? "lg:order-2" : ""
                        }`}
                      >
                        <ImageWithFallback
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          style={isTallImageCard ? { objectPosition: "center 42%" } : undefined}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-none" />
                        <div
                          className="absolute bottom-0 left-0 right-0 h-1 lg:hidden"
                          style={{ background: s.color }}
                        />
                      </div>

                      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                        <div className="mb-8 flex flex-wrap items-center gap-3">
                          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full" style={{ background: "#1a1a1a" }}>
                            {React.createElement(getServiceIcon(s.iconName)!, {
                              className: "w-5 h-5",
                              style: { color: "#ffffff" },
                            })}
                            <span className="font-sans text-white" style={{ fontSize: "12px", fontWeight: 600 }}>
                              {s.tag}
                            </span>
                          </div>
                          {s.featured && (
                            <div className="inline-flex rounded-full border border-[#2563eb]/15 bg-[#2563eb]/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                              Doporučeno
                            </div>
                          )}
                        </div>

                        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                          {s.eyebrow}
                        </p>
                        <h2
                          className="mb-6"
                          style={compactSectionTitleStyle}
                        >
                          {s.title}
                        </h2>

                        <p
                          className="font-sans mb-8"
                          style={{ fontSize: "15px", lineHeight: 1.72, color: "#3d3d47", maxWidth: "52ch" }}
                        >
                          {s.desc}
                        </p>

                        <div className="flex flex-col gap-3 mb-8">
                          {s.features.map((f) => (
                            <div key={f} className="flex items-start gap-3">
                              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                                <CheckIcon className="h-3.5 w-3.5" />
                              </span>
                              <span
                                className="font-sans"
                                style={{ fontSize: "14px", color: "#3d3d47", lineHeight: 1.55 }}
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
                            <span className="mt-2 block text-sm font-medium text-slate-500">
                              {s.priceNote}
                            </span>
                          </div>
                          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300" style={{ background: "#2563eb" }}>
                            <span
                              className="text-white font-sans"
                              style={{ fontSize: "13px", fontWeight: 600 }}
                            >
                              {s.cta}
                            </span>
                            <ArrowRightIcon className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    );
                  })()}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section
        className="relative py-14 noise-overlay"
        style={{
          background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <div
              className="grid gap-4 rounded-[28px] border border-slate-200/70 bg-white/78 p-5 shadow-[0_18px_44px_rgba(15,23,42,0.04)] backdrop-blur-sm md:grid-cols-[1.02fr_0.98fr] md:p-6"
            >
              <div className="flex flex-col justify-center">
                <span
                  className="mb-3 inline-flex w-fit rounded-full bg-slate-950 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white"
                >
                  Další krok
                </span>
                <h2
                  className="text-foreground mb-5"
                  style={compactSectionTitleStyle}
                >
                  Nevíte, kterou službu zvolit?
                </h2>
                <p
                  className="max-w-[58ch] font-sans text-slate-600"
                  style={{ fontSize: "14px", lineHeight: 1.68, fontWeight: 500 }}
                >
                  Když už víte typ prostoru, spočítejte si orientační cenu.
                  Pokud je zakázka specifičtější nebo potřebujete potvrdit postup,
                  ozvěte se a navrhneme nejlepší řešení.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-1">
                <Link
                  to="/kalkulacka"
                  className="group flex min-h-[126px] flex-col justify-between rounded-[22px] border border-[#2563eb]/10 bg-[linear-gradient(145deg,#2449a5_0%,#3264ea_68%,#5a4df0_100%)] p-4 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(37,99,235,0.18)]"
                >
                  <div>
                    <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70">
                      Doporučeno
                    </div>
                    <div style={{ ...compactSectionTitleStyle, color: "#ffffff", fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.02 }}>
                      Spočítat orientační cenu
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-white/84">
                      Vyplníte pár údajů a hned víte, od čeho se odpíchnout.
                    </span>
                    <ArrowRightIcon className="h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
                <Link
                  to="/kontakt"
                  className="group flex min-h-[126px] flex-col justify-between rounded-[22px] border border-slate-200 bg-white p-4 text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_42px_rgba(15,23,42,0.06)]"
                >
                  <div>
                    <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Osobní konzultace
                    </div>
                    <div style={{ ...compactSectionTitleStyle, fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.02 }}>
                      Chci poradit s výběrem
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-slate-600">
                      Pro složitější prostory, SVJ nebo když chcete přesnější nabídku.
                    </span>
                    <ArrowRightIcon className="h-5 w-5 flex-shrink-0 text-slate-700 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
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
                className="text-foreground"
                style={sectionTitleStyle}
              >
                Časté dotazy ke službám
              </h2>
              <p
                className="mx-auto mt-4 max-w-2xl font-sans text-slate-600"
                style={{ fontSize: "15px", lineHeight: 1.75, fontWeight: 500 }}
              >
                To hlavní, co lidé řeší ještě před odesláním poptávky nebo před prvním telefonátem.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-4">
            {faqItems.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <article className="rounded-[24px] p-6 md:p-7" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 14px 36px rgba(15,23,42,0.04)" }}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="mb-3" style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.03em", color: "#0f172a", lineHeight: 1.15 }}>
                        {item.q}
                      </h3>
                      <p className="font-sans" style={{ fontSize: "15px", lineHeight: 1.74, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

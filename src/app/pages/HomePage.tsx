import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ArrowRightIcon, ArrowDownIcon, ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon,
  CalendarIcon, CheckIcon, CheckCircleIcon, EyeIcon, ChatBubbleLeftIcon, PhoneIcon, PaintBrushIcon, ShieldCheckIcon, ClockIcon,
  WrenchIcon, HomeIcon, SparklesIcon, BuildingLibraryIcon, BoltIcon, CalculatorIcon, SwatchIcon
} from "@heroicons/react/24/outline";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const heroPhoto = "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Fde4c3a59dfe7452abff728cfc029c559?format=webp&width=2400&height=3600";

const IMG = {
  apartment: "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2Fabc211a34f1e4518bec3c79251d04fee",
  office: "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F747e3375b3e84ca38e9af5aff4e9bee8",
  microcement: "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Fac74bb287f214990a9342caddd066a63",
  roller: "https://images.unsplash.com/photo-1589307693556-7286ae38293c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHdhbGwlMjBwYWludCUyMHJvbGxlciUyMGZyZXNoJTIwY29hdHxlbnwxfHx8fDE3NzEzMjcxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  commercial: "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2Fb9f6d6ba78a64aac8ceef99230e436ae",
  before: "https://images.unsplash.com/photo-1566503732592-748f40a6e997?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHJvb20lMjBiZWZvcmUlMjByZW5vdmF0aW9uJTIwd2FsbHN8ZW58MXx8fHwxNzcxMzI3MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  after: "https://images.unsplash.com/photo-1741105820091-3d150a451cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGVhbiUyMHdoaXRlJTIwcm9vbSUyMGFmdGVyJTIwcmVub3ZhdGlvbnxlbnwxfHx8fDE3NzEzMjcxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  howStep1: "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Fe13cc55ca0b340e681ebe2d6bb1cc47a",
  howStep2: "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F52d4aa0b37b24f659f721d9267457b33",
  howStep3: "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F5e136471cb4b4d218ea326f9855b60aa",
  decoArt1: "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2F2a3232c9a8fd4bbd98ad49cd2837db64",
  decoArt2: "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Ff79c6da27b1d444ba0b154fb40a7321d",
  decoArt3: "https://cdn.builder.io/api/v1/image/assets%2Fa5554564c4f74e77865d4ed815b30c3c%2Fbad5f6bc0f8b40218b9f946ea125ad93",
  decoArt4: "https://images.unsplash.com/photo-1767277680127-dc94441d576c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXIlMjByZXN0YXVyYW50JTIwbW9vZHklMjBhbWJpZW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxMzQwODk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  decoArt5: "https://images.unsplash.com/photo-1748075823969-0f3b0870912a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcm5hbWVudGFsJTIwd2FsbCUyMHBhaW50aW5nJTIwY2xhc3NpY2FsJTIwYXJ0JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxMzQwODk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function GradientMesh({ variant = "hero" }: { variant?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {variant === "hero" && (
        <>
          <div className="absolute w-[700px] h-[700px] -top-[200px] -right-[200px] rounded-full blur-[200px] animate-float-slow" style={{ background: "var(--orb-navy)" }} />
          <div className="absolute w-[500px] h-[500px] top-[40%] -left-[150px] rounded-full blur-[180px] animate-float-reverse" style={{ background: "var(--orb-accent)" }} />
          <div className="absolute w-[400px] h-[400px] bottom-0 right-[30%] rounded-full blur-[160px] animate-pulse-glow" style={{ background: "var(--orb-olive)" }} />
          <div className="absolute w-[300px] h-[300px] top-[20%] left-[40%] rounded-full blur-[140px] animate-float-slow" style={{ background: "var(--orb-copper)" }} />
        </>
      )}
      {variant === "dark" && (
        <>
          <div className="absolute w-[600px] h-[400px] top-0 left-1/4 rounded-full blur-[200px] animate-float-slow" style={{ background: "var(--orb-accent)" }} />
          <div className="absolute w-[400px] h-[300px] bottom-0 right-0 rounded-full blur-[150px] animate-float-reverse" style={{ background: "var(--orb-navy)" }} />
        </>
      )}
    </div>
  );
}

/* ───────── HERO (Light bg, text left, photo right – Paintly style) ───────── */
function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden bg-background pb-8 md:pb-20" style={{ paddingTop: "92px", minHeight: "100vh" }}>
      <div className="absolute top-[18%] left-[6%] w-[360px] h-[360px] bg-[#2563eb]/[0.08] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-[6%] left-[28%] w-[260px] h-[260px] bg-[#ec4899]/[0.06] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[14%] right-[20%] w-[240px] h-[240px] bg-[#14b8a6]/[0.05] rounded-full blur-[120px] pointer-events-none" />

      {/* Photo – full width, full height, centered */}
      <div className="absolute top-0 right-0 bottom-0 left-0 w-full hidden lg:block z-0">
        <img
          src={heroPhoto}
          alt="Profesionální malování bytu v Praze - malířka při práci v interiéru"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
          style={{ objectPosition: "center 58%" }}
        />
        <div className="absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-white via-white/92 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.36)_0%,rgba(255,255,255,0)_18%,rgba(255,255,255,0.04)_100%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-4 md:pt-16 pb-8 md:pb-32">
        <div className="max-w-xl lg:max-w-[52%]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <h1
              className="tracking-[-0.045em] text-[#09090b]"
              style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 600, lineHeight: 1.2, fontFamily: "'Sora', sans-serif" }}
            >
              Malujeme interiéry v Praze a okolí – rychle, čistě a bez starostí. Postaráme se o vše, od zakrytí nábytku až po finální úklid.
              <br />
              <span style={{ color: "#2563eb", fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(28px, 3.5vw, 48px)" }}>Váš byt můžeme vymalovat už za jeden den.</span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-16">
            <Link
              to="/kalkulacka"
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#c9982d]/30 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 58%, #2563eb 100%)", fontSize: "15px", fontWeight: 700, boxShadow: "0 18px 38px rgba(37,99,235,.18)" }}
            >
              Spočítat cenu
              <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-12 flex items-center gap-2 flex-wrap">
            <span className="text-foreground/55 font-sans" style={{ fontSize: "12px", fontFamily: "'Manrope', var(--font-sans)" }}>
              nebo nás kontaktujte přímo:
            </span>
            <a
              href="tel:+420732333550"
              className="inline-flex items-center gap-2 text-foreground font-[family-name:var(--font-display)] hover:text-accent transition-colors duration-300"
              style={{ fontSize: "17px", fontWeight: 700, fontFamily: "'Manrope', var(--font-sans)" }}
            >
              <PhoneIcon className="w-4 h-4 text-accent" />
              +420 732 333 550
            </a>
          </motion.div>
        </div>

        {/* Mobile hero image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 lg:hidden rounded-2xl overflow-hidden shadow-xl"
        >
          <img src={heroPhoto} alt="Profesionální malování bytu v Praze - malířka při práci v interiéru" className="w-full h-auto object-cover aspect-[4/3]" loading="eager" decoding="async" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2 text-foreground/30">
          <span className="font-[family-name:var(--font-display)] tracking-widest uppercase" style={{ fontSize: "10px" }}>Scroll</span>
          <ArrowDownIcon className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───────── TRUST — 3 feature cards (Figma-style) ───────── */
// Helper to get Heroicon component by name
const getHeroIcon = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{className?: string}>> = {
    paintbrush: PaintBrushIcon,
    shield: ShieldCheckIcon,
    clock: ClockIcon,
  };
  return icons[iconName.toLowerCase()] || null;
};

const featureCards = [
  {
    iconName: "paintbrush",
    title: "Naše specializace jsou interiéry",
    desc: "Malujeme byty, rodinné domy, schodiště a chodby bytových dom. Stejně tak ale zrealizujeme výmalbu komerčních prostor jako je kavárna, restaurace, kancelář, menší hotel nebo penzion.",
    color: "#2563eb",
  },
  {
    iconName: "shield",
    title: "Nezávazná kalkulace",
    desc: "Stačí nám pár základních informací o bytě a připravíme orientační cenu výmalby.\nPokud bude potřeba, rádi se přijedeme na byt podívat a vše s vámi probereme osobně.",
    color: "#7c3aed",
  },
  {
    iconName: "clock",
    title: "Expres a víkendové termíny",
    desc: "Potřebujete váš domov vymalovat co nejrychleji? Nechcete přerušovat provoz restaurace, kanceláře, recepce? Určete si sami termín a čas realizace BEZ PŘÍPLATKŮ.",
    color: "#0f766e",
  },
];

function TrustSection() {
  return (
    <section className="relative py-20 md:py-28 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)" }}>
      <GradientMesh variant="dark" />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {featureCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.1}>
              <div className="group relative p-8 md:p-9 rounded-lg overflow-hidden transition-all duration-500 h-full flex flex-col text-left" style={{ background: "#ffffff", border: "1px solid rgba(15,23,42,0.08)" }}>
                <div className="mb-6 h-6">
                  {getHeroIcon(card.iconName) && React.createElement(getHeroIcon(card.iconName)!, { className: "w-6 h-6 text-[#9ca3af]" })}
                </div>
                <h3 className="mb-6 min-h-[60px]" style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 500, lineHeight: 1.2, color: "#0f172a", letterSpacing: "-0.02em" }}>
                  {card.title}
                </h3>
                <p className="font-sans text-[#3d3d47] flex-grow" style={{ fontSize: "15px", lineHeight: 1.6, color: "#3d3d47" }}>
                  {card.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── STATS COUNTERS ───────── */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(target);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      if (progress < 1) {
        setCount(Math.floor(target * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return { count, ref };
}

const statsData = [
  { label: "let zkušeností", target: 30, suffix: "+" },
  { label: "hotových projektů", target: 1000, suffix: "+" },
  { label: "spokojených klientů", target: 98, suffix: "%" },
  { label: "oceněných služeb", target: 300, suffix: "+" },
];

function StatCounter({ stat }: { stat: typeof statsData[0] }) {
  const { count, ref } = useCounter(stat.target);
  return (
    <div ref={ref} className="text-center">
      <div className="font-[family-name:var(--font-display)]" style={{ fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 400, color: "var(--accent)", lineHeight: 1.0, fontFamily: "'Sora', sans-serif" }}>
        {count}{stat.suffix}
      </div>
      <p className="text-foreground/60 font-sans mt-2" style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.02em" }}>{stat.label}</p>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="relative py-8 md:py-12 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s2) 0%, var(--s1) 100%)" }}>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-[200px] pointer-events-none" style={{ background: "var(--orb-accent)" }} />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {statsData.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <StatCounter stat={stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── HOW IT WORKS ───────── */
const howItWorksSteps = [
  {
    title: "Kalkulačka a objednávka",
    desc: "Zde na webu si sami spočítáte cenu, zadáte parametry a termín a provedete jedním kliknutím objednávku. Cena za realizaci je tak předem jasně daná a vyhneme se obě strany nepříjemnému smlouvání. Objednávku okamžitě zpracujeme a reagujeme telefonátem nebo emailem. Nejpozději do 24 hodin.",
    image: IMG.howStep1,
  },
  {
    title: "Příprava a realizace",
    desc: "Po dohodnutí termínu a podrobností zakázky přijedeme na místo a provedeme přípravné práce, vše pečlivě zakryjeme, opavíme zdi a vymalujeme předem domluvenou barvou a postupem. Následně po sobě pečlivě uklidíme a byt odevzdáme v perfektním stavu klientovi jako nový…",
    image: IMG.howStep2,
  },
  {
    title: "Kontrola a fakturace",
    desc: "Klient zkontroluje provedení zakázky, pokud není vše jak má být, okamžitě – již bezplatně – opravíme eventuální nedostatky. Následně práci klient převezme a předem domluvenou částku zaplatí, následně vystavíme fakturu. Zbývá jenom poděkovat za skvělou spolupráci:)",
    image: IMG.howStep3,
  },
];

function HowItWorksSection() {
  return (
    <section className="relative py-24 md:py-32 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)" }}>
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full blur-[200px] pointer-events-none" style={{ background: "var(--orb-olive)" }} />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-4 block" style={{ fontSize: "12px", fontWeight: 600 }}>Proces</span>
            <h2 className="font-[family-name:var(--font-display)] text-foreground" style={{ fontSize: "clamp(34px, 4.6vw, 58px)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.04em" }}>
              Jak to <em style={{ fontFamily: "'Instrument Serif', serif", fontWeight: "normal", fontStyle: "italic", color: "#2563eb" }}>funguje?</em>
            </h2>
            <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "#1a1a1a" }} />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorksSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.12}>
              <div className="group overflow-hidden rounded-[16px] transition-all duration-500 hover:shadow-lg h-full flex flex-col" style={{ background: "rgba(10, 15, 25, 0.95)", backdropFilter: "blur(12px)", border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
                <div className="aspect-[4/3] overflow-hidden relative">
                  <ImageWithFallback src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6 md:p-7 flex flex-col flex-1 text-center">
                  <h3 className="mb-5 text-white" style={{ fontFamily: "Manrope, sans-serif", fontSize: "clamp(20px, 1.5vw, 28px)", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.03em" }}>{step.title}</h3>
                  <p className="font-sans flex-1 text-slate-300" style={{ fontSize: "14px", lineHeight: 1.6, fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── SERVICE PREVIEW ───────── */
const services = [
  { title: "Malování bytů a domů", desc: "Kompletní malování bytů a rodinných domů – rychle, čistě a bez starostí.", image: IMG.apartment, slug: "malovani-bytu", tag: "Rezidenční" },
  { title: "Malování před prodejem nebo pronájmem", desc: "Rychlé malování, které pomůže byt či dům připravit na prodej nebo nový pronájem.", image: "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F6f785ac818cd4504aa3ddbdcc553358c", slug: "malovani-pred-prodejem", tag: "Osobní" },
  { title: "Malování kanceláří a komerčních prostor", desc: "Profesionální malování kanceláří a dalších pracovních prostor, i mimo pracovní dobu.", image: IMG.office, slug: "malovani-kancelari", tag: "Komerční" },
  { title: "Malování restaurací, penzionů a menších hotelů", desc: "Malování pokojů i společných prostor s minimálním omezením provozu.", image: "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F777a96af1fb9479da463a4976a62771f", slug: "komercni-objekty", tag: "Komerční" },
  { title: "Malování společných prostor domů (SVJ)", desc: "Chodby, schodiště a další prostory bytových domů – od přípravy zdí až po finální úklid.", image: IMG.commercial, slug: "malovani-svj", tag: "Odborné" },
  { title: "Dekorativní úprava zdí", desc: "Microcement, benátský štuk, betonový efekt a desítky dalších moderních povrchových úprav. Vytvoříme zajímavé a unikátní prostředí dle vašich představ.", image: "https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2Fef84eec608ae45b68efe710c13fa7d1a", slug: "dekorativni-sterky", tag: "Design" },
];

function ServicePreview() {
  return (
    <section className="relative py-12 md:py-20 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)" }}>
      <GradientMesh variant="dark" />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <Reveal>
          <div className="text-center mb-16 pt-8 md:pt-12">
            <span className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-4 block" style={{ fontSize: "12px", fontWeight: 600 }}>Služby</span>
            <h2 className="font-[family-name:var(--font-display)] text-foreground" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.05 }}>
              Co pro vás{" "}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontWeight: "normal", fontStyle: "italic", color: "#2563eb" }}>můžeme udělat</em>
            </h2>
            <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "#1a1a1a" }} />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <Link to={`/sluzby/${s.slug}`} className="group block h-full no-underline">
                <div
                  className="relative overflow-hidden rounded-[10px] transition-all duration-500 hover:shadow-lg flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12 h-full"
                  style={{
                    background: "#e9ecf2",
                    padding: "24px",
                    fontFamily: "Manrope, sans-serif",
                    textDecoration: "none",
                  }}
                >
                  {/* Image */}
                  <div className="w-full lg:w-auto flex-shrink-0">
                    <ImageWithFallback
                      src={s.image}
                      alt={s.title}
                      className="w-full lg:w-[300px] h-[250px] lg:h-[300px] object-cover rounded-[12px] transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col gap-6 flex-1 min-w-0">
                    {/* Tag */}
                    <span
                      className="w-fit px-3 py-1.5 rounded-full"
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "white",
                        background: "#2563eb"
                      }}
                    >
                      {s.tag}
                    </span>

                    <div className="flex flex-col gap-4">
                      <h3
                        className="m-0"
                        style={{
                          fontSize: "32px",
                          fontWeight: 600,
                          letterSpacing: "-0.03em",
                          color: "#101014",
                          lineHeight: 1.1
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="m-0"
                        style={{
                          fontSize: "16px",
                          lineHeight: 1.6,
                          color: "#3d3d47"
                        }}
                      >
                        {s.desc}
                      </p>
                    </div>

                    {/* More link */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white transition-all duration-300 hover:shadow-lg w-fit" style={{ background: "#334155" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600 }}>Více info</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── FAQ (Frequently Asked Questions) ───────── */
const serviceAreaGroups = [
  "Praha 1, Praha 2, Praha 3 a Praha 4",
  "Praha 5, Praha 6, Praha 7 a Praha 8",
  "Praha 9, Praha 10, Praha-západ a Praha-východ",
];

const faqItems: Array<{ title: string; desc: React.ReactNode }> = [
  { title: "Musím před malováním vystěhovat nábytek?", desc: "Nábytek většinou přesuneme doprostřed místnosti a vše pečlivě zakryjeme. Prosíme ale, aby před naším příjezdem byly z polic, skříněk a stěn uklizené osobní věci a dekorace. Díky tomu můžeme s přípravou prostoru začít hned a práce proběhne rychleji." },
  { title: "Jak dlouho trvá výmalba bytu?", desc: "Většinu bytů zvládneme vymalovat během jednoho až dvou dnů. Záleží na rozsahu zakázky. Rádi se přijedeme na byt podívat a vše s vámi probereme osobně." },
  { title: "Jak rychle můžete nastoupit na zakázku?", desc: "Termín závisí na aktuální vytíženosti, ale často dokážeme nabídnout i expresní termín." },
  {
    title: "Co a kde nejčastěji malujeme?",
    desc: (
      <>
        <p style={{ margin: 0 }}>
          Nejčastěji realizujeme{" "}
          <Link to="/sluzby/malovani-bytu" className="text-accent underline underline-offset-4">
            malování bytů a pokojů
          </Link>
          ,{" "}
          <Link to="/sluzby/malovani-kancelari" className="text-accent underline underline-offset-4">
            malování kanceláří
          </Link>
          , zakázky pro{" "}
          <Link to="/sluzby/malovani-svj" className="text-accent underline underline-offset-4">
            SVJ a bytové domy
          </Link>{" "}
          i{" "}
          <Link to="/sluzby/dekorativni-sterky" className="text-accent underline underline-offset-4">
            dekorativní stěrky
          </Link>
          . Pokud hledáte orientační{" "}
          <Link to="/kalkulacka" className="text-accent underline underline-offset-4">
            cenu malování bytu v Praze
          </Link>
          , využijte naši kalkulačku a projděte si i{" "}
          <Link to="/realizace" className="text-accent underline underline-offset-4">
            ukázky realizací
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {serviceAreaGroups.map((area) => (
            <span
              key={area}
              className="rounded-full px-3 py-1.5 font-sans"
              style={{
                background: "rgba(15,23,42,0.04)",
                color: "#526071",
                fontSize: "12px",
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              {area}
            </span>
          ))}
        </div>
      </>
    ),
  },
  { title: "Používáte vlastní barvy?", desc: "Ano, používáme kvalitní osvědčené barvy. Pokud máte vlastní preferenci, rádi se přizpůsobíme." },
  { title: "Pomůžete mi s výběrem barev?", desc: "Ano. Rádi vám pomůžeme vybrat vhodný odstín tak, aby v interiéru dobře fungoval. V případě zájmu dokážeme připravit také jednoduchou vizualizaci." },
];

function WhyUsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <span className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-4 block" style={{ fontSize: "12px", fontWeight: 600 }}>Otázky & Odpovědi</span>
            <h2 className="font-[family-name:var(--font-display)] text-foreground" style={{ fontSize: "clamp(40px, 5vw, 58px)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
              Často se nás <em style={{ fontFamily: "'Instrument Serif', serif", fontWeight: "normal", fontStyle: "italic", color: "#2563eb" }}>ptáte?</em>
            </h2>
            <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "#1a1a1a" }} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[60px]" style={{ alignItems: "start", fontFamily: "Manrope, sans-serif", maxWidth: "1280px", margin: "0 auto" }}>
            <div className="hidden md:block" style={{ width: "100%", height: "570px", overflow: "hidden", borderRadius: "10px" }}>
              <ImageWithFallback
                src="https://cdn.builder.io/api/v1/image/assets%2Fac4f22b6755541c6871d8f6adda59355%2F9c2ece810aa148b88d5fdc4f6340d995"
                alt="Často se nás ptáte"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div style={{ width: "100%" }} className="md:col-span-1 col-span-1">
              {faqItems.map((item, index) => (
                <article
                  key={index}
                  style={{
                    borderBottom: "1px solid #dbdad9",
                  }}
                >
                  <button
                    onClick={() => setActiveIndex((currentIndex) => (currentIndex === index ? null : index))}
                    style={{
                      width: "100%",
                      minHeight: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "20px",
                      border: "none",
                      background: "none",
                      padding: "20px 0",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <h3 style={{ margin: 0, color: "#0f172a", fontSize: "20px", lineHeight: "28px", fontWeight: 700, letterSpacing: "-0.03em", flex: 1 }}>
                      {item.title}
                    </h3>
                    {/* Toggle */}
                    <span
                      style={{
                        position: "relative",
                        width: "12px",
                        height: "12px",
                        flex: "0 0 auto",
                        display: "block",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        {activeIndex === index ? (
                          <>
                            <line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round" />
                          </>
                        ) : (
                          <>
                            <line x1="12" y1="2" x2="12" y2="22" strokeLinecap="round" />
                            <line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round" />
                          </>
                        )}
                      </svg>
                    </span>
                  </button>

                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {typeof item.desc === "string" ? (
                        <p style={{ width: "100%", margin: 0, paddingBottom: "30px", color: "#3d3d47", fontSize: "15px", lineHeight: 1.6, letterSpacing: "-0.02em" }}>
                          {item.desc}
                        </p>
                      ) : (
                        <div style={{ width: "100%", paddingBottom: "30px", color: "#526071", fontSize: "15px", lineHeight: 1.75, letterSpacing: "-0.02em", fontWeight: 500 }}>
                          {item.desc}
                        </div>
                      )}
                    </motion.div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── PRICING SECTION ───────── */
const priceItems = [
  { title: "1+kk", price: "od 5500 Kč", icon: "home" },
  { title: "2+kk", price: "od 8500 Kč", icon: "home" },
  { title: "3+kk / 3+1", price: "od 12000 Kč", icon: "home" },
  { title: "4+kk a větší", price: "individuální kalkulace", icon: "home" },
];

function PricingSection() {
  const getPriceIcon = (iconType: string) => {
    return <HomeIcon className="w-10 h-10" />;
  };

  return (
    <section className="relative py-24 md:py-32 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <Reveal>
          <div className="text-center mb-24">
            <span className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-4 block" style={{ fontSize: "12px", fontWeight: 600 }}>Cena</span>
            <h2 className="font-[family-name:var(--font-display)] text-foreground" style={{ fontSize: "clamp(40px, 5vw, 58px)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
              Kolik stojí <em style={{ fontFamily: "'Instrument Serif', serif", fontWeight: "normal", fontStyle: "italic", color: "#2563eb" }}>malování?</em>
            </h2>
            <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "#1a1a1a" }} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[60px]" style={{ alignItems: "start", fontFamily: "Manrope, sans-serif", maxWidth: "1280px", margin: "0 auto" }}>
            <div className="hidden md:block" style={{ width: "100%", height: "570px", overflow: "hidden", borderRadius: "10px" }}>
              <ImageWithFallback
                src="https://images.pexels.com/photos/8296981/pexels-photo-8296981.jpeg"
                alt="Online kalkulačka ceny malování bytu a pokoje v Praze"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div style={{ width: "100%", display: "flex", flexDirection: "column", minHeight: "auto", justifyContent: "space-between" }} className="md:h-[570px]">
              <div>
                <p style={{ fontSize: "16px", lineHeight: 1.72, color: "#3d3d47", fontWeight: 500, marginBottom: "30px" }}>
                  Cena malování závisí na velikosti bytu, stavu zdí a rozsahu přípravných prací. Pro představu uvádíme orientační ceny běžných zakázek.
                </p>

                {priceItems.map((item, index) => (
                  <article
                    key={index}
                    style={{
                      borderBottom: "1px solid #dbdad9",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "80px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "20px",
                        padding: "0",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "20px", minWidth: 0, flex: 1 }}>
                        <span style={{ width: "40px", height: "40px", flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", color: "#101014" }}>
                          {getPriceIcon(item.icon)}
                        </span>
                        <div>
                          <h3 style={{ margin: 0, color: "#101014", fontSize: "18px", lineHeight: "26px", fontWeight: 500, letterSpacing: "-0.2px" }}>
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      {/* Price */}
                      <span style={{ fontSize: "16px", fontWeight: 500, color: "#2563eb", flex: "0 0 auto" }}>
                        {item.price}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "16px", lineHeight: 1.6, color: "#3d3d47", marginBottom: "15px" }}>
                  Přesnou cenu sami snadno spočítáte podle velikosti bytu a stavu zdí.
                </p>
                <Link to="/kalkulacka" className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent/20" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 58%, #2563eb 100%)", fontSize: "15px", fontWeight: 700 }}>
                  Spočítat cenu <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── DECORATIVE ART SECTION ───────── */
const decoImages = [IMG.decoArt1, IMG.decoArt2, IMG.decoArt3, IMG.decoArt4];

function DecorativeArtSection() {
  return (
    <section className="relative py-6 md:py-8 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)" }}>
      <div className="absolute top-1/2 left-0 w-[500px] h-[400px] rounded-full blur-[200px] pointer-events-none" style={{ background: "var(--orb-navy)" }} />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <Reveal>
          <div className="text-center mb-10">
            <span className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-4 block" style={{ fontSize: "12px", fontWeight: 600 }}>Speciální služby</span>
            <h2 className="font-[family-name:var(--font-display)] text-foreground" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.1 }}>
              Dekorativní a umělecká{" "}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontWeight: "normal", fontStyle: "italic", color: "#2563eb" }}>úprava stěn</em>
            </h2>
            <p className="font-sans max-w-2xl mx-auto mt-4" style={{ fontSize: "15px", lineHeight: 1.72, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}>
              Zde malá ochutnávka z realizací naší přidružené firmy, která se rozšířila i do oblasti klasického řemesla. Jedná se o dekorativní, uměleckou malbu na zakázku s důrazem na jedinečnost a řemeslnou dokonalost různých exkluzivních malířských technik.
            </p>
            <Link to="/sluzby/dekorativni-sterky" className="group inline-flex items-center gap-2 mt-6 px-7 py-3 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent/20" style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)", fontSize: "14px", fontWeight: 700, fontFamily: "'Manrope', var(--font-sans)" }}>
              Chci vědět víc <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-12">
            {decoImages.map((img, i) => (
              <div key={i} className={`overflow-hidden rounded-xl ${i === 0 ? "row-span-2" : ""}`}>
                <ImageWithFallback
                  src={img}
                  alt={`Dekorativní stěrka a umělecká úprava stěny ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  style={{ minHeight: i === 0 ? "320px" : "160px" }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── BEFORE / AFTER ───────── */
/* ───────── TESTIMONIALS ───────── */
const testimonials = [
  { quote: "Profesionální přístup od začátku do konce. Precizně dodrželi termín a po sobě uklidili.", author: "Ing. Martin Krejčí", role: "Předseda SVJ, Praha 7", initials: "MK" },
  { quote: "Hledali jsme spolehlivou firmu pro celou kancelář. Skvělá práce – rychle, čistě a za férovou cenu.", author: "Petra Novotná", role: "Office Manager, Tech startup", initials: "PN" },
  { quote: "Dekorativní stěrka v obýváku předčila naše očekávání. Výsledek vypadá jako z designového časopisu.", author: "Tomáš a Lucie Dvořákovi", role: "Rezidenční klient, Praha 5", initials: "TD" },
  { quote: "Spolupracujeme opakovaně. Vždy precizní práce, dodržení harmonogramu a perfektní komunikace.", author: "Jakub Horák", role: "Project Manager, Development s.r.o.", initials: "JH" },
];

function TestimonialsSection() {
  return (
    <section className="relative py-20 md:py-28 noise-overlay" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f6f9ff 50%, #ffffff 100%)" }}>
      <div className="absolute top-24 left-[12%] w-[360px] h-[240px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(37,99,235,0.10)" }} />
      <div className="absolute bottom-12 right-[10%] w-[320px] h-[220px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(124,58,237,0.08)" }} />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-accent font-[family-name:var(--font-display)] tracking-[0.18em] uppercase mb-4 block" style={{ fontSize: "12px", fontWeight: 700 }}>Reference</span>
            <h2 className="font-[family-name:var(--font-display)] text-foreground" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.045em" }}>
              Co říkají <em style={{ fontFamily: "'Instrument Serif', serif", fontWeight: "normal", fontStyle: "italic", color: "#2563eb" }}>naši klienti</em>
            </h2>
            <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "#1a1a1a" }} />
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="p-6 md:p-7 rounded-lg" style={{ background: "#ffffff", border: "1px solid rgba(15,23,42,0.08)" }}>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{ fontSize: "18px", color: "#2563eb" }}>★</span>
                  ))}
                </div>
                {/* Quote */}
                <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#3d3d47", marginBottom: "20px" }}>
                  {t.quote}
                </p>
                {/* Author */}
                <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(15,23,42,0.08)", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#e9ecf2" }}>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>{t.initials}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>{t.author}</div>
                    <div style={{ fontSize: "12px", color: "#7b8794" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <StatsSection />
      <HowItWorksSection />
      <ServicePreview />
      <PricingSection />
      <DecorativeArtSection />
      <WhyUsSection />
      <TestimonialsSection />
    </>
  );
}

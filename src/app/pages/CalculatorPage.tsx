import { ComponentType, SVGProps, useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  CalculatorIcon, HomeIcon, Cog6ToothIcon, CheckBadgeIcon, ChatBubbleLeftIcon,
  UserIcon, CheckIcon, XMarkIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, CalendarIcon,
  PaperAirplaneIcon, SparklesIcon, CheckCircleIcon, ExclamationTriangleIcon, ArrowTopRightOnSquareIcon,
  Square3Stack3DIcon, PaintBrushIcon, BuildingLibraryIcon, ShieldCheckIcon, TrashIcon
} from "@heroicons/react/24/outline";
import { emailRegex, phoneRegex, type AreaType, type CeilingHeight, type RepairType, type YesNo, type CleaningType } from "@/lib/calculatorInquiry";

interface FormState {
  selectedWork: AreaType;
  totalArea: string;
  ceilingHeightForPrice: CeilingHeight;
  repairType: RepairType;
  material: YesNo;
  furnitureMoving: YesNo;
  covering: YesNo;
  cleaning: CleaningType;
  emptySpace: YesNo;
  carpets: YesNo;
  roomCount: string;
  spaceType: string;
  additionalInfo: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  realizationDate: string;
}

const faqItems = [
  {
    q: "Je cena z kalkulačky finální?",
    a: "Ne. Kalkulačka slouží pro orientační nacenění. Přesnou cenu potvrzujeme po upřesnění detailů zakázky a stavu povrchů.",
  },
  {
    q: "Za jak dlouho dostanu odpověď na poptávku?",
    a: "Poptávky zpracováváme průběžně a ve většině případů reagujeme nejpozději do 24 hodin telefonicky nebo emailem.",
  },
  {
    q: "Co když se formulář nepodaří odeslat?",
    a: "Na stránce se zobrazí záložní kontakt. Můžete ihned zavolat nebo poslat email s předvyplněnou poptávkou.",
  },
];

/* ─── HELPERS ─── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const start = display;
    const diff = value - start;
    if (diff === 0) return;
    const duration = 500;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(start + diff * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <><b>{display.toLocaleString("cs-CZ")}</b></>;
}

/* ─── SUB-COMPONENTS ─── */

function RadioCard({
  selected,
  onClick,
  label,
  descriptions,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  descriptions?: string[];
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full flex items-center gap-4 p-5 rounded-xl border text-left transition-all duration-300 ${
        selected
          ? "border-accent/30 bg-accent/8 shadow-lg shadow-accent/8"
          : "border-foreground/8 bg-foreground/[0.02] hover:border-foreground/10 hover:bg-foreground/[0.04]"
      }`}
    >
      <div
        className={`flex-shrink-0 w-5 h-5 rounded-full transition-all duration-300 ${
          selected ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" : "border border-foreground/20"
        }`}
      />
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {children}
          <span className="text-foreground font-sans" style={{ fontSize: "15px", fontWeight: 400 }}>
            {label}
          </span>
        </div>
        {descriptions && descriptions.length > 0 && (
          <>
            <div className="hidden sm:block w-px h-9 bg-foreground/8 flex-shrink-0" />
            <div className="flex flex-col gap-0.5 flex-1 pl-5 sm:pl-0">
              {descriptions.map((d) => (
                <span key={d} className="text-foreground/35 font-sans" style={{ fontSize: "12px", lineHeight: 1.3 }}>
                  {d}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </button>
  );
}

function ServiceToggle({
  selected,
  onClick,
  label,
  isPositive,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  isPositive: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-300 ${
        selected
          ? "border-accent/30 bg-accent/8 shadow-lg shadow-accent/8"
          : "border-foreground/8 bg-foreground/[0.02] hover:border-foreground/10"
      }`}
    >
      <div
        className={`flex-shrink-0 w-2 h-2 rounded-full transition-all duration-300 ${
          selected ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" : "border border-foreground/20"
        }`}
      />
      <div className="flex items-center gap-2.5 flex-1">
        {isPositive ? (
          <CheckIcon className={`w-4 h-4 flex-shrink-0 transition-colors ${selected ? "text-blue-500" : "text-foreground/30"}`} />
        ) : (
          <XMarkIcon className={`w-4 h-4 flex-shrink-0 transition-colors ${selected ? "text-red-400" : "text-foreground/30"}`} />
        )}
        <span className="text-foreground font-sans" style={{ fontSize: "14px", fontWeight: 400 }}>
          {label}
        </span>
      </div>
    </button>
  );
}

function CeilingOption({
  selected,
  onClick,
  value,
  desc,
}: {
  selected: boolean;
  onClick: () => void;
  value: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
        selected
          ? "border-accent/30 bg-accent/8 shadow-lg shadow-accent/8"
          : "border-foreground/8 bg-foreground/[0.02] hover:border-foreground/10"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          selected ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" : "border border-foreground/20"
        }`}
      />
      <span className="text-foreground font-[family-name:var(--font-display)]" style={{ fontSize: "16px", fontWeight: 600 }}>
        {value}
      </span>
      <span className="text-foreground/35 font-sans" style={{ fontSize: "12px" }}>
        {desc}
      </span>
    </button>
  );
}

function SectionCard({
  icon: Icon,
  title,
  subtitle,
  children,
  delay = 0,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="p-7 md:p-8 rounded-[28px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 18px 48px rgba(15,23,42,0.05)" }}>
        <div className="flex items-center gap-3 mb-7">
          <Icon className="w-5 h-5 text-foreground flex-shrink-0" strokeWidth={1.5} />
          <div>
            <h2 className="text-foreground font-[family-name:var(--font-display)]" style={{ fontSize: "20px", fontWeight: 600 }}>
              {title}
            </h2>
            {subtitle && (
              <span className="text-foreground/35 font-sans" style={{ fontSize: "13px", color: "#6b7785", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 700 }}>
                {subtitle}
              </span>
            )}
          </div>
        </div>
        {children}
      </div>
    </Reveal>
  );
}

/* ─── PRICING LOGIC (exactly matching the HTML version) ─── */
function calculatePrice(form: FormState): number {
  const area = Number(form.totalArea) || 0;
  if (area <= 0) return 0;

  const FLOOR_AREA_RATE = 10000 / 55;
  const WALL_AREA_RATE = FLOOR_AREA_RATE / 3.5;
  const MIN_PRICE = 3000;

  const basePrice = Math.max(
    form.selectedWork === "Půdorys" ? area * FLOOR_AREA_RATE : area * WALL_AREA_RATE,
    MIN_PRICE
  );

  let total = basePrice;

  // Ceiling height (only for floor area)
  if (form.selectedWork === "Půdorys") {
    if (form.ceilingHeightForPrice === "350") total += basePrice * 0.1;
    else if (form.ceilingHeightForPrice === "450") total += basePrice * 0.2;
  }

  // Repair type
  if (form.repairType === "Malé") total += basePrice * 0.17;
  else if (form.repairType === "Střední") total += basePrice * 0.35;
  else if (form.repairType === "Velké") total += basePrice * 0.6;

  // Services
  if (form.material === "Ano") total += basePrice * 0.2;
  if (form.furnitureMoving === "Ano") total += basePrice * 0.12;
  if (form.covering === "Ano") total += basePrice * 0.05;
  if (form.cleaning === "Potřebuji") total += basePrice * 0.1;

  return Math.round(total);
}

/* ─── MAIN COMPONENT ─── */
export default function CalculatorPage() {
  const [form, setForm] = useState<FormState>({
    selectedWork: "Půdorys",
    totalArea: "",
    ceilingHeightForPrice: "250",
    repairType: "Malé",
    material: "Ano",
    furnitureMoving: "Ano",
    covering: "Ano",
    cleaning: "Potřebuji",
    emptySpace: "Ano",
    carpets: "Ne",
    roomCount: "",
    spaceType: "Pokoj",
    additionalInfo: "",
    name: "",
    phone: "+420 ",
    email: "",
    address: "",
    realizationDate: "",
  });

  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  const set = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((prev) => ({ ...prev, [key]: value })),
    []
  );

  const totalPrice = useMemo(() => calculatePrice(form), [form]);

  const isFormValid = useMemo(() => {
    const n = form.name.trim();
    const a = form.address.trim();
    const e = form.email.trim();
    const p = form.phone.trim();
    const d = form.realizationDate.trim();
    const area = Number(form.totalArea) || 0;
    return n !== "" && a !== "" && d !== "" && area > 0 && e !== "" && p !== "" && p !== "+420" && emailRegex.test(e) && phoneRegex.test(p);
  }, [form.name, form.address, form.realizationDate, form.totalArea, form.email, form.phone]);

  const validateEmail = useCallback(
    (val: string) => {
      set("email", val);
      setEmailErr(val.length > 0 && !emailRegex.test(val));
    },
    [set]
  );

  const validatePhone = useCallback(
    (val: string) => {
      set("phone", val);
      setPhoneErr(val.length > 0 && val !== "+420 " && !phoneRegex.test(val));
    },
    [set]
  );

  /* ─── MAILTO FALLBACK ─── */
  const createMailtoLink = useCallback(() => {
    const subject = encodeURIComponent(`Poptávka malířských prací - ${form.name || "Nový zákazník"}`);
    const body = encodeURIComponent(
      `Nová poptávka malířských prací\n\nZÁKAZNÍK:\nJméno: ${form.name || "Neuvedeno"}\nEmail: ${form.email}\nTelefon: ${form.phone}\nAdresa: ${form.address || "Neuvedeno"}\nTermín: ${form.realizationDate ? new Date(form.realizationDate).toLocaleDateString("cs-CZ") : "Neuvedeno"}\n\nPROJEKT:\nTyp plochy: ${form.selectedWork === "Půdorys" ? "Podlahová plocha" : "Stěnová plocha"}\nCelková plocha: ${form.totalArea || "0"} m²\n${form.selectedWork === "Půdorys" ? `Výška stropu: ${form.ceilingHeightForPrice} cm\n` : ""}Typ opravy: ${form.repairType}\nBarva: ${form.material === "Ano" ? "Malíř zajistí" : "Vlastní"}\nPosunutí nábytku: ${form.furnitureMoving}\nZakrývání: ${form.covering}\nÚklid: ${form.cleaning}\nPočet místností: ${form.roomCount || "Neuvedeno"}\nTyp prostoru: ${form.spaceType}\nPrázdný prostor: ${form.emptySpace}\nKoberce: ${form.carpets}\n\nPŘIBLIŽNÁ CENA: ${totalPrice.toLocaleString("cs-CZ")} Kč\n\nDODATEČNÉ INFO:\n${form.additionalInfo || "Žádné"}\n\n---\nOdesláno z kalkulačky\nDatum: ${new Date().toLocaleString("cs-CZ")}`
    );
    return `mailto:info@malirivcernem.cz?subject=${subject}&body=${body}`;
  }, [form, totalPrice]);

  /* ─── SUBMIT ─── */
  const handleSubmit = useCallback(async () => {
    if (!isFormValid || submitting || submitted) return;

    setSubmitting(true);
    setSubmitMsg(null);
    setShowFallback(false);

    try {
      const response = await fetch("/api/calculator-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          totalPrice,
        }),
      });

      const data = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Odeslání se nepodařilo.");
      }

      setSubmitted(true);
      setSubmitMsg({ text: "Poptávka byla úspěšně odeslána! Ozveme se vám do 24 hodin.", type: "success" });
    } catch {
      setSubmitMsg({ text: "Automatické odesílání není momentálně dostupné. Použijte prosím přímý kontakt:", type: "error" });
      setShowFallback(true);
    } finally {
      setSubmitting(false);
    }
  }, [form, totalPrice, isFormValid, submitting, submitted]);

  /* ─── INPUT STYLE ─── */
  const inputCls = "w-full px-4 py-3.5 rounded-xl border bg-foreground/[0.02] text-foreground font-sans transition-all duration-300 focus:outline-none focus:shadow-lg placeholder:text-foreground/20";
  const inputNormal = `${inputCls} border-foreground/8 focus:border-accent/50 focus:bg-foreground/[0.04] focus:shadow-accent/5`;
  const inputGreen = `${inputCls} border-slate-400/50 border-2 focus:border-slate-400 focus:bg-foreground/[0.04] focus:shadow-slate-400/10`;
  const inputError = `${inputCls} border-red-400 bg-red-400/5 focus:border-red-400 focus:shadow-red-400/10`;

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        className="relative pt-32 pb-12 noise-overlay overflow-hidden"
        style={{ background: "linear-gradient(160deg, var(--s1) 0%, var(--s3) 40%, var(--s1) 100%)" }}
      >
        <div className="absolute w-[600px] h-[600px] -top-[200px] left-1/3 rounded-full blur-[200px] pointer-events-none" style={{ background: "var(--orb-accent)" }} />
        <div className="absolute w-[400px] h-[400px] bottom-0 -right-[100px] rounded-full blur-[150px] pointer-events-none" style={{ background: "var(--orb-navy)" }} />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <CalculatorIcon className="w-6 h-6 text-foreground" />
              <h1 className="font-[family-name:var(--font-display)] text-foreground" style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 300, letterSpacing: "-0.02em" }}>
                <b>Kalkulačka </b><span className="bg-gradient-to-r from-[#2563eb] to-[#4f46e5] bg-clip-text text-transparent" style={{ fontWeight: 700 }}>| Poptávka</span>
              </h1>
            </div>
            <p className="text-foreground/50 font-sans max-w-2xl mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
              Online kalkulačka malování v Praze slouží pro rychlé orientační nacenění malování bytu, pokoje, kanceláře nebo společných prostor domu.
            </p>
            <p className="text-foreground/30 font-sans max-w-2xl mx-auto mt-3 italic" style={{ fontSize: "13px", lineHeight: 1.6 }}>
              Ceny jsou přibližné. Přesnou cenu upřesníme vždy až osobně na místě. Pokud jste s orientační cenou spokojeni, vyplňte prosím povinné údaje a klikněte na odeslat.
              <br />
              Ozveme se vám nejpozději do 24 hodin a domluvíme podrobnosti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="relative py-8 md:py-12 noise-overlay" style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* ─── LEFT COLUMN ─── */}
            <div className="flex flex-col gap-7">
              {/* CARD 1: Typ plochy */}
              <SectionCard icon={HomeIcon} title="Typ plochy" delay={0}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  <RadioCard
                    selected={form.selectedWork === "Půdorys"}
                    onClick={() => set("selectedWork", "Půdorys")}
                    label="Podlahová plocha"
                    descriptions={["rozměr podlahy —", "např. 5×4m = 20 m²"]}
                  />
                  <RadioCard
                    selected={form.selectedWork === "Stěna"}
                    onClick={() => set("selectedWork", "Stěna")}
                    label="Stěnová plocha"
                    descriptions={["každá stěna i strop", "počítána a sečtena"]}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-foreground font-[family-name:var(--font-display)] mb-3" style={{ fontSize: "14px", fontWeight: 600 }}>
                    Celková plocha (m²)
                  </label>
                  <input
                    type="number"
                    placeholder="Zadejte plochu v m²"
                    value={form.totalArea}
                    onChange={(e) => set("totalArea", e.target.value)}
                    className={inputGreen}
                    style={{ fontSize: "15px" }}
                    min="0"
                    required
                  />
                </div>

                <AnimatePresence>
                  {form.selectedWork === "Půdorys" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 rounded-xl bg-foreground/[0.02] border border-foreground/5">
                        <label className="block text-foreground font-[family-name:var(--font-display)] mb-4" style={{ fontSize: "14px", fontWeight: 600 }}>
                          Výška stropu <span className="text-foreground/30 font-sans" style={{ fontSize: "12px", fontWeight: 400 }}>(ovlivňuje cenu)</span>
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <CeilingOption selected={form.ceilingHeightForPrice === "250"} onClick={() => set("ceilingHeightForPrice", "250")} value="250 cm" desc="standardní" />
                          <CeilingOption selected={form.ceilingHeightForPrice === "350"} onClick={() => set("ceilingHeightForPrice", "350")} value="350 cm" desc="vyšší" />
                          <CeilingOption selected={form.ceilingHeightForPrice === "450"} onClick={() => set("ceilingHeightForPrice", "450")} value="450 cm" desc="velmi vysoký" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SectionCard>

              {/* CARD 2: Typ opravy */}
              <SectionCard icon={Cog6ToothIcon} title="Typ opravy" delay={0.05}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <RadioCard
                    selected={form.repairType === "Malé"}
                    onClick={() => set("repairType", "Malé")}
                    label="Malé opravy"
                    descriptions={["malé dírky, vyplnění otvorů", "a opravu drobných trhlin"]}
                  />
                  <RadioCard
                    selected={form.repairType === "Střední"}
                    onClick={() => set("repairType", "Střední")}
                    label="Střední opravy"
                    descriptions={["lokální škrábání menších", "ploch, rozsáhlejší trhliny"]}
                  />
                  <RadioCard
                    selected={form.repairType === "Velké"}
                    onClick={() => set("repairType", "Velké")}
                    label="Velké opravy"
                    descriptions={["rozsáhlejší škrábání", "a opravy na větších plochách"]}
                  />
                  <RadioCard
                    selected={form.repairType === "Žádné"}
                    onClick={() => set("repairType", "Žádné")}
                    label="Žádné opravy"
                    descriptions={["pouze malování", "bez přípravných prací"]}
                  />
                </div>
              </SectionCard>

              {/* CARD 3: Služby */}
              <SectionCard icon={Square3Stack3DIcon} title="Služby" subtitle="ovlivňující cenu" delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Material */}
                  <div>
                    <h3 className="text-foreground font-[family-name:var(--font-display)] mb-3" style={{ fontSize: "15px", fontWeight: 500 }}>
                      <PaintBrushIcon className="w-3.5 h-3.5 inline mr-2 text-[#2563eb]" />
                      Barvu zajistí malíř?
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <ServiceToggle selected={form.material === "Ano"} onClick={() => set("material", "Ano")} label="Ano, malíř zajistí" isPositive />
                      <ServiceToggle selected={form.material === "Ne"} onClick={() => set("material", "Ne")} label="Ne, mám vlastní" isPositive={false} />
                    </div>
                  </div>
                  {/* Furniture */}
                  <div>
                    <h3 className="text-foreground font-[family-name:var(--font-display)] mb-3" style={{ fontSize: "15px", fontWeight: 500 }}>
                      <BuildingLibraryIcon className="w-3.5 h-3.5 inline mr-2 text-[#2563eb]" />
                      Posunutí nábytku?
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <ServiceToggle selected={form.furnitureMoving === "Ano"} onClick={() => set("furnitureMoving", "Ano")} label="Ano, potřebuji" isPositive />
                      <ServiceToggle selected={form.furnitureMoving === "Ne"} onClick={() => set("furnitureMoving", "Ne")} label="Ne, vyřeším sám" isPositive={false} />
                    </div>
                  </div>
                  {/* Covering */}
                  <div>
                    <h3 className="text-foreground font-[family-name:var(--font-display)] mb-3" style={{ fontSize: "15px", fontWeight: 500 }}>
                      <ShieldCheckIcon className="w-3.5 h-3.5 inline mr-2 text-[#2563eb]" />
                      Zakrývání, oblepování?
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <ServiceToggle selected={form.covering === "Ano"} onClick={() => set("covering", "Ano")} label="Ano, chci" isPositive />
                      <ServiceToggle selected={form.covering === "Ne"} onClick={() => set("covering", "Ne")} label="Není potřeba" isPositive={false} />
                    </div>
                  </div>
                  {/* Cleaning */}
                  <div>
                    <h3 className="text-foreground font-[family-name:var(--font-display)] mb-3" style={{ fontSize: "15px", fontWeight: 500 }}>
                      <SparklesIcon className="w-3.5 h-3.5 inline mr-2 text-[#2563eb]" />
                      Úklid po práci?
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <ServiceToggle selected={form.cleaning === "Potřebuji"} onClick={() => set("cleaning", "Potřebuji")} label="Potřebuji" isPositive />
                      <ServiceToggle selected={form.cleaning === "Nepotřebuji"} onClick={() => set("cleaning", "Nepotřebuji")} label="Nepotřebuji" isPositive={false} />
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* CARD 4: Další údaje */}
              <SectionCard icon={Cog6ToothIcon} title="Další údaje" delay={0.15}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Empty space */}
                  <div>
                    <h3 className="text-foreground font-[family-name:var(--font-display)] mb-3" style={{ fontSize: "15px", fontWeight: 500 }}>
                      Prázdný prostor?
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <ServiceToggle selected={form.emptySpace === "Ano"} onClick={() => set("emptySpace", "Ano")} label="Ano, prázdný" isPositive />
                      <ServiceToggle selected={form.emptySpace === "Ne"} onClick={() => set("emptySpace", "Ne")} label="Ne, zařízený" isPositive={false} />
                    </div>
                  </div>
                  {/* Carpets */}
                  <div>
                    <h3 className="text-foreground font-[family-name:var(--font-display)] mb-3" style={{ fontSize: "15px", fontWeight: 500 }}>
                      Koberce na podlaze?
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <ServiceToggle selected={form.carpets === "Ano"} onClick={() => set("carpets", "Ano")} label="Ano, jsou koberce" isPositive />
                      <ServiceToggle selected={form.carpets === "Ne"} onClick={() => set("carpets", "Ne")} label="Ne, holá podlaha" isPositive={false} />
                    </div>
                  </div>
                  {/* Room count */}
                  <div>
                    <h3 className="text-foreground font-[family-name:var(--font-display)] mb-3" style={{ fontSize: "15px", fontWeight: 500 }}>
                      Počet místností
                    </h3>
                    <input
                      type="number"
                      placeholder="Např. 3"
                      value={form.roomCount}
                      onChange={(e) => set("roomCount", e.target.value)}
                      className={inputNormal}
                      style={{ fontSize: "15px", borderColor: "var(--accent)" }}
                      min="1"
                    />
                  </div>
                  {/* Space type */}
                  <div>
                    <h3 className="text-foreground font-[family-name:var(--font-display)] mb-3" style={{ fontSize: "15px", fontWeight: 500 }}>
                      Typ prostoru
                    </h3>
                    <select
                      value={form.spaceType}
                      onChange={(e) => set("spaceType", e.target.value)}
                      className={`${inputNormal} cursor-pointer appearance-none`}
                      style={{ fontSize: "15px" }}
                    >
                      <option value="Pokoj">Pokoj</option>
                      <option value="Byt">Byt</option>
                      <option value="Dům">Dům</option>
                      <option value="Společné prostory">Společné prostory</option>
                      <option value="Obchod">Obchod</option>
                      <option value="Pension">Pension</option>
                      <option value="Kancelář">Kancelář</option>
                    </select>
                  </div>
                </div>
              </SectionCard>

              {/* CARD 5: Doplňující informace */}
              <SectionCard icon={ChatBubbleLeftIcon} title="Doplňující informace" delay={0.2}>
                <textarea
                  placeholder="Zde můžete napsat jakékoli dodatečné informace o práci..."
                  value={form.additionalInfo}
                  onChange={(e) => set("additionalInfo", e.target.value)}
                  className={`${inputNormal} resize-vertical min-h-[120px]`}
                  style={{ fontSize: "15px" }}
                  rows={5}
                />
              </SectionCard>
            </div>

            {/* ─── RIGHT COLUMN (SIDEBAR) ─── */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-[88px] lg:self-start">
              {/* Price Card */}
              <Reveal delay={0.1}>
                <div
                  className="relative rounded-2xl p-8 text-center overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #111827, #1f2937, #374151)" }}
                >
                  {/* Decorative overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-5" style={{
                    backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.5) 8px, rgba(255,255,255,0.5) 8.5px)",
                  }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(184,168,138,0.06), rgba(192,128,80,0.06))" }} />

                  <div className="relative z-10">
                    <p className="text-white/50 font-sans mb-4" style={{ fontSize: "15px", fontWeight: 300 }}>Přibližná cena</p>
                    <div className="font-[family-name:var(--font-display)] text-white mb-3" style={{ fontSize: "clamp(48px, 8vw, 72px)", fontWeight: 300, letterSpacing: "-0.02em" }}>
                      <AnimatedPrice value={totalPrice} />
                    </div>
                    <p style={{ fontSize: "28px", fontWeight: 300, color: "var(--accent)" }}>Kč</p>
                  </div>
                </div>
              </Reveal>

              {/* Contact Form */}
              <Reveal delay={0.15}>
                <div className="p-7 rounded-[28px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 18px 48px rgba(15,23,42,0.05)" }}>
                  <div className="flex items-center gap-3 mb-6">
                    <UserIcon className="w-5 h-5 text-foreground flex-shrink-0" />
                    <h2 className="text-foreground font-[family-name:var(--font-display)]" style={{ fontSize: "18px", fontWeight: 600 }}>
                      Kontaktní údaje
                    </h2>
                  </div>

                  <div className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                      <label className="block font-sans mb-2" style={{ fontSize: "13px", color: "#6b7785", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 700 }}>Jméno</label>
                      <input
                        type="text"
                        placeholder="Vaše jméno"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={inputNormal}
                        style={{ fontSize: "14px" }}
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block font-sans mb-2" style={{ fontSize: "13px", color: "#6b7785", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 700 }}>
                        Telefon <span className="text-red-400 italic" style={{ fontSize: "11px" }}>nutné vyplnit</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+420 123 456 789"
                        value={form.phone}
                        onChange={(e) => validatePhone(e.target.value)}
                        className={phoneErr ? inputError : inputNormal}
                        style={{ fontSize: "14px" }}
                        required
                      />
                      {phoneErr && (
                        <div className="flex items-center gap-2 mt-2 text-red-400" style={{ fontSize: "12px" }}>
                          <ExclamationTriangleIcon className="w-3.5 h-3.5" />
                          <span>Neplatný formát (použijte: +420 123 456 789)</span>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-sans mb-2" style={{ fontSize: "13px", color: "#6b7785", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 700 }}>
                        E-mail <span className="text-red-400 italic" style={{ fontSize: "11px" }}>nutné vyplnit</span>
                      </label>
                      <input
                        type="email"
                        placeholder="vas@email.cz"
                        value={form.email}
                        onChange={(e) => validateEmail(e.target.value)}
                        className={emailErr ? inputError : inputNormal}
                        style={{ fontSize: "14px" }}
                        required
                      />
                      {emailErr && (
                        <div className="flex items-center gap-2 mt-2 text-red-400" style={{ fontSize: "12px" }}>
                          <ExclamationTriangleIcon className="w-3.5 h-3.5" />
                          <span>Neplatný formát emailu</span>
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block font-sans mb-2" style={{ fontSize: "13px", color: "#6b7785", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 700 }}>Adresa výmalby</label>
                      <input
                        type="text"
                        placeholder="Ulice, město"
                        value={form.address}
                        onChange={(e) => set("address", e.target.value)}
                        className={inputNormal}
                        style={{ fontSize: "14px" }}
                        required
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-foreground font-[family-name:var(--font-display)] mb-2" style={{ fontSize: "13px", fontWeight: 600 }}>
                        Termín realizace
                      </label>
                      <input
                        type="date"
                        value={form.realizationDate}
                        onChange={(e) => set("realizationDate", e.target.value)}
                        className={inputGreen}
                        style={{ fontSize: "14px" }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Mobile price (visible on mobile only before submit button) */}
              <div className="lg:hidden">
                <div
                  className="relative rounded-xl p-6 text-center overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #1f2937, #111827, #374151)" }}
                >
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(184,168,138,0.06), rgba(192,128,80,0.06))" }} />
                  <div className="relative z-10">
                    <p className="text-white/50 font-sans mb-2" style={{ fontSize: "14px" }}>Přibližná cena</p>
                    <div className="font-[family-name:var(--font-display)] text-white" style={{ fontSize: "48px", fontWeight: 300 }}>
                      <AnimatedPrice value={totalPrice} />
                    </div>
                    <p style={{ fontSize: "24px", fontWeight: 300, color: "var(--accent)" }}>Kč</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Reveal delay={0.2}>
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || submitting || submitted}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-[family-name:var(--font-display)] transition-all duration-300 ${
                    submitted
                      ? "bg-emerald-600 text-white cursor-default"
                      : submitting
                        ? "bg-foreground/30 text-foreground/50 cursor-not-allowed"
                        : isFormValid
                          ? "text-white shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30 hover:scale-[1.01] active:scale-[0.99]"
                          : "bg-foreground/10 text-foreground/25 cursor-not-allowed"
                  }`}
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    ...(isFormValid && !submitting && !submitted ? { background: "linear-gradient(135deg, var(--accent), var(--copper))" } : {}),
                  }}
                >
                  {submitted ? (
                    <>
                      <CheckCircleIcon className="w-5.5 h-5.5" />
                      ODESLÁNO
                    </>
                  ) : submitting ? (
                    <>
                      <SparklesIcon className="w-5.5 h-5.5 animate-spin" />
                      ODESÍLÁM...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      ODESLAT POPTÁVKU
                    </>
                  )}
                </button>
              </Reveal>

              {/* Submit message */}
              <AnimatePresence>
                {submitMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl text-center font-sans ${
                      submitMsg.type === "success"
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                        : "bg-red-400/10 border border-red-400/20 text-red-400"
                    }`}
                    style={{ fontSize: "14px", fontWeight: 500 }}
                  >
                    {submitMsg.text}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Fallback contact */}
              <AnimatePresence>
                {showFallback && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 rounded-xl bg-blue-500/8 border border-blue-400/15">
                      <p className="text-blue-400 font-sans text-center mb-4" style={{ fontSize: "14px", fontWeight: 500 }}>
                        Přímý kontakt s poptávkou:
                      </p>
                      <div className="flex flex-col gap-3">
                        <a
                          href={createMailtoLink()}
                          className="flex items-center gap-3 p-4 rounded-xl bg-foreground/[0.03] border border-foreground/8 hover:bg-foreground/[0.06] transition-all duration-300"
                        >
                          <EnvelopeIcon className="w-4.5 h-4.5 text-accent flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-foreground font-sans" style={{ fontSize: "14px", fontWeight: 500 }}>Odeslat poptávku emailem</p>
                            <p className="text-accent font-sans" style={{ fontSize: "13px", color: "#6b7785", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 700 }}>info@malirivcernem.cz</p>
                          </div>
                          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 text-foreground/30 flex-shrink-0" />
                        </a>
                        <a
                          href="tel:+420732333550"
                          className="flex items-center gap-3 p-4 rounded-xl bg-foreground/[0.03] border border-foreground/8 hover:bg-foreground/[0.06] transition-all duration-300"
                        >
                          <PhoneIcon className="w-4.5 h-4.5 text-accent flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-foreground font-sans" style={{ fontSize: "14px", fontWeight: 500 }}>Zavolat</p>
                            <p className="text-accent font-sans" style={{ fontSize: "13px", color: "#6b7785", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 700 }}>+420 732 333 550</p>
                          </div>
                          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 text-foreground/30 flex-shrink-0" />
                        </a>
                      </div>
                      <p className="text-foreground/25 font-sans text-center mt-4" style={{ fontSize: "11px" }}>
                        Kliknutím na email se otevře emailový klient s předvyplněnou poptávkou
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Info card */}
              <Reveal delay={0.25}>
                <div className="p-6 rounded-[24px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 14px 36px rgba(15,23,42,0.05)" }}>
                  <div className="flex flex-col gap-3 text-foreground/35 font-sans" style={{ fontSize: "12px", lineHeight: 1.6 }}>
                    <p className="text-foreground/60" style={{ fontWeight: 500 }}>Důležité informace:</p>
                    <p>• Podkladová penetrace není součástí kalkulace a bude zaceněna jen v případě, že bude potřeba (zjistíme až na místě)</p>
                    <p>• V ceně každé zakázky při potvrzení nákupu barvy je v ceně Primalex Plus, všechny ostatní barvy (tónované, plně omyvatelné, disperzní apod.) budou zaceněny navíc dle domluvy.</p>
                    <p>• Tónované barvy a jejich výmalba je součástí kalkulace až na místě s klientem.</p>
                    <p>• Doprava po Praze je v ceně, okolí Prahy bude zpoplatněno dle vzdálenosti.</p>
                    <p>• Speciální opravy (strhávání tapet, odstraňování skvrn, celoplošný štuk, stěrkování) jsou naceňovány navíc až na místě.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.28}>
                <div className="p-6 rounded-[24px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,248,255,0.96))", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 14px 36px rgba(15,23,42,0.05)" }}>
                  <div className="text-center mb-6">
                    <span className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase block mb-3" style={{ fontSize: "11px", fontWeight: 600 }}>
                      FAQ
                    </span>
                    <h2 className="text-foreground font-[family-name:var(--font-display)]" style={{ fontSize: "22px", fontWeight: 700 }}>
                      Časté dotazy ke kalkulačce
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4">
                    {faqItems.map((item) => (
                      <article key={item.q} className="rounded-xl border border-foreground/8 bg-foreground/[0.02] p-4">
                        <h3 className="text-foreground mb-2 font-[family-name:var(--font-display)]" style={{ fontSize: "16px", fontWeight: 600 }}>
                          {item.q}
                        </h3>
                        <p className="text-foreground/50 font-sans" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                          {item.a}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

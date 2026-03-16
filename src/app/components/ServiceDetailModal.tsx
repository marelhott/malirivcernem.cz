import { motion, AnimatePresence } from "motion/react";
import { X, Check, ArrowRight, Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect } from "react";

export interface ServiceDetail {
  title: string;
  tag: string;
  image: string;
  heroDesc: string;
  features: string[];
  process: { step: string; desc: string }[];
  priceHint: string;
  cta: string;
}

export const serviceDetails: ServiceDetail[] = [
  {
    title: "Malování bytů",
    tag: "Rezidenční",
    image:
      "https://images.unsplash.com/photo-1758548157747-285c7012db5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwYXBhcnRtZW50JTIwaW50ZXJpb3IlMjB3aGl0ZXxlbnwxfHx8fDE3NzEzMjcxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    heroDesc:
      "Kompletní malířské služby pro byty a rodinné domy. Od jednopokojových bytů po luxusní rezidence – každý prostor si zaslouží precizní péči a profesionální přístup.",
    features: [
      "Kompletní zakrytí nábytku a podlah ochrannými fóliemi",
      "Příprava povrchů — tmelení, broušení, penetrace",
      "Malování stěn a stropů prémiovými barvami (Dulux, Caparol)",
      "Dekorativní lemy, bordury a barevné kombinace",
      "Finální kontrola kvality a úklid po dokončení",
      "Poradenství při výběru barev a odstínů zdarma",
    ],
    process: [
      { step: "Prohlídka", desc: "Bezplatná návštěva a posouzení stavu povrchů" },
      { step: "Kalkulace", desc: "Detailní cenová nabídka do 24 hodin" },
      { step: "Realizace", desc: "Precizní provedení v dohodnutém termínu" },
      { step: "Předání", desc: "Kontrola, úklid a spokojenost" },
    ],
    priceHint: "Od 85 Kč/m² — závisí na stavu povrchů a typu barvy",
    cta: "Poptat malování bytu",
  },
  {
    title: "Malování kanceláří",
    tag: "Komerční",
    image:
      "https://images.unsplash.com/photo-1764410481612-7544525b2991?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvZmZpY2UlMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NzEzMjcxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    heroDesc:
      "Profesionální malování komerčních prostor s minimálním narušením provozu. Pracujeme o víkendech i v noci, aby váš business mohl pokračovat bez přerušení.",
    features: [
      "Realizace mimo pracovní dobu — víkendy, noci, svátky",
      "Zero-disruption záruka pro vaše zaměstnance",
      "Antigraffiti a speciální odolné nátěry",
      "Korporátní barvy podle CI manuálu firmy",
      "Práce s výškovým vybavením do 12 m",
      "Pojištění odpovědnosti za škodu do 5 mil. Kč",
    ],
    process: [
      { step: "Konzultace", desc: "Posouzení prostor a požadavků" },
      { step: "Plán", desc: "Harmonogram s ohledem na provoz firmy" },
      { step: "Realizace", desc: "Efektivní provedení v dohodnutém okně" },
      { step: "Kontrola", desc: "Inspekce a dokumentace kvality" },
    ],
    priceHint: "Od 75 Kč/m² — zvýhodněné ceny pro větší plochy",
    cta: "Poptat malování kanceláří",
  },
  {
    title: "Dekorativní stěrky",
    tag: "Speciální",
    image:
      "https://images.unsplash.com/photo-1719194981461-fa0ec450999e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwY29uY3JldGUlMjBtaWNyb2NlbWVudCUyMHdhbGwlMjB0ZXh0dXJlfGVufDF8fHx8MTc3MTMyNzE1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    heroDesc:
      "Vytvořte z vašeho interiéru unikátní prostor. Microcement, benátský štuk, betonový efekt a desítky dalších moderních povrchových úprav – vše s precizním řemeslným zpracováním.",
    features: [
      "Microcement (stěny, podlahy, koupelny, kuchyně)",
      "Benátský štuk — Stucco Veneziano, Marmorino",
      "Betonový efekt — Beton Ciré, Industrial look",
      "Metalické a perleťové povrchy",
      "Voděodolné úpravy pro koupelny a wellness",
      "Vzorky a vizualizace před realizací zdarma",
    ],
    process: [
      { step: "Inspirace", desc: "Výběr materiálu a vzorování" },
      { step: "Příprava", desc: "Profesionální podkladové vrstvy" },
      { step: "Aplikace", desc: "Ruční nanášení ve 2–4 vrstvách" },
      { step: "Finalizace", desc: "Ochranné vrstvy a zapečetění" },
    ],
    priceHint: "Od 850 Kč/m² — závisí na typu techniky a složitosti",
    cta: "Poptat dekorativní stěrky",
  },
  {
    title: "Opravy a příprava",
    tag: "Příprava",
    image:
      "https://images.unsplash.com/photo-1589307693556-7286ae38293c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHdhbGwlMjBwYWludCUyMHJvbGxlciUyMGZyZXNoJTIwY29hdHxlbnwxfHx8fDE3NzEzMjcxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    heroDesc:
      "Kvalitní malba začíná perfektní přípravou povrchů. Nabízíme kompletní servis od opravy prasklin a tmelení po broušení a penetraci – základ, na kterém staví dokonalý výsledek.",
    features: [
      "Oprava prasklin, děr a poškozených omítek",
      "Profesionální tmelení disperzními a akrylovými tmely",
      "Strojní a ruční broušení povrchů",
      "Penetrační nátěry pro optimální přilnavost",
      "Odstranění starých nátěrů a tapet",
      "Sanace vlhkých a plesnivých stěn",
    ],
    process: [
      { step: "Diagnostika", desc: "Posouzení stavu stěn a podkladu" },
      { step: "Plán oprav", desc: "Specifikace materiálů a postupu" },
      { step: "Realizace", desc: "Systematická oprava a příprava" },
      { step: "Kontrola", desc: "Ověření rovinnosti a kvality povrchu" },
    ],
    priceHint: "Od 45 Kč/m² — kalkulace podle rozsahu oprav",
    cta: "Poptat opravu povrchů",
  },
  {
    title: "Komerční objekty",
    tag: "SVJ / Developers",
    image:
      "https://images.unsplash.com/photo-1768270181430-3e3672a32283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBsb2JieSUyMGludGVyaW9yfGVufDF8fHx8MTc3MTMyNzE1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    heroDesc:
      "Specializujeme se na velkoplošné projekty pro SVJ, bytové domy, developery a správcovské společnosti. Profesionální plánování, koordinace a realizace s minimálním dopadem na obyvatele.",
    features: [
      "Malování společných prostor — chodby, schodiště, lobby",
      "Fasádní nátěry a opravy bytových domů",
      "Koordinace prací v obydlených objektech",
      "Etapová realizace s ohledem na obyvatele",
      "Hromadné slevy pro SVJ a správcovské firmy",
      "Kompletní fotodokumentace a předávací protokol",
    ],
    process: [
      { step: "Obhlídka", desc: "Bezplatná prohlídka celého objektu" },
      { step: "Nabídka", desc: "Detailní rozpočet a harmonogram" },
      { step: "Koordinace", desc: "Komunikace s SVJ a správcem" },
      { step: "Realizace", desc: "Etapové provedení bez narušení" },
    ],
    priceHint: "Individuální kalkulace — kontaktujte nás pro nabídku",
    cta: "Poptat pro SVJ / developer",
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serviceIndex: number | null;
}

export function ServiceDetailModal({ isOpen, onClose, serviceIndex }: Props) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (serviceIndex === null) return null;
  const service = serviceDetails[serviceIndex];
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-[201] bg-card rounded-2xl md:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center hover:bg-background transition-colors duration-300 border border-border/50"
              data-cursor-hover
            >
              <X size={18} className="text-foreground" />
            </button>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Hero image with gradient overlay */}
              <div className="relative h-[280px] md:h-[360px] overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-transparent" />

                {/* Tag */}
                <div className="absolute top-6 left-6">
                  <span
                    className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 font-sans"
                    style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em" }}
                  >
                    {service.tag}
                  </span>
                </div>

                {/* Title overlapping */}
                <div className="absolute bottom-0 left-0 right-0 px-8 md:px-12 pb-6">
                  <h2
                    className="font-serif text-foreground"
                    style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, lineHeight: 1.1 }}
                  >
                    {service.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 md:px-12 py-8 md:py-12">
                {/* Description */}
                <p
                  className="text-muted-foreground font-sans max-w-2xl mb-12"
                  style={{ fontSize: "16px", lineHeight: 1.8 }}
                >
                  {service.heroDesc}
                </p>

                {/* Features + Process grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                  {/* Features */}
                  <div>
                    <h3
                      className="font-sans text-foreground mb-6"
                      style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Co zahrnuje
                    </h3>
                    <div className="flex flex-col gap-4">
                      {service.features.map((feature, i) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center mt-0.5">
                            <Check size={12} className="text-accent" strokeWidth={2.5} />
                          </div>
                          <span
                            className="text-foreground/80 font-sans"
                            style={{ fontSize: "14px", lineHeight: 1.6 }}
                          >
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Process */}
                  <div>
                    <h3
                      className="font-sans text-foreground mb-6"
                      style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Jak postupujeme
                    </h3>
                    <div className="flex flex-col gap-5">
                      {service.process.map((p, i) => (
                        <motion.div
                          key={p.step}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.08 }}
                          className="flex items-start gap-4"
                        >
                          <div
                            className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center"
                          >
                            <span
                              className="font-sans text-foreground/60"
                              style={{ fontSize: "12px", fontWeight: 700 }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <div>
                            <span
                              className="block font-sans text-foreground mb-0.5"
                              style={{ fontSize: "15px", fontWeight: 600 }}
                            >
                              {p.step}
                            </span>
                            <span
                              className="font-sans text-muted-foreground"
                              style={{ fontSize: "13px", lineHeight: 1.5 }}
                            >
                              {p.desc}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price hint */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-accent/8 via-accent/5 to-transparent border border-accent/15 mb-10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <span
                        className="font-sans text-accent block mb-1"
                        style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
                      >
                        Orientační ceník
                      </span>
                      <span
                        className="font-sans text-foreground"
                        style={{ fontSize: "16px", fontWeight: 500 }}
                      >
                        {service.priceHint}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#kalkulacka"
                    onClick={onClose}
                    data-cursor-hover
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-foreground to-foreground/90 text-background rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-foreground/10 hover:gap-3"
                    style={{ fontSize: "15px", fontWeight: 500 }}
                  >
                    {service.cta}
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href="tel:+420732333550"
                    data-cursor-hover
                    className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground rounded-full transition-all duration-300 hover:bg-foreground/5 hover:border-foreground/30"
                    style={{ fontSize: "15px", fontWeight: 500 }}
                  >
                    <Phone size={15} />
                    Zavolat nám
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Profesionální přístup od začátku do konce. Přesně dodrželi termín, práce byla perfektní a po sobě uklidili. Doporučuji bez výhrad.",
    author: "Ing. Martin Krejčí",
    role: "Předseda SVJ, Praha 7",
    initials: "MK",
  },
  {
    quote:
      "Hledali jsme spolehlivou firmu pro malování celé kanceláře. Malíři v černém odvedli skvělou práci – rychle, čistě a za férovou cenu.",
    author: "Petra Novotná",
    role: "Office Manager, Tech startup",
    initials: "PN",
  },
  {
    quote:
      "Dekorativní stěrka v obýváku předčila naše očekávání. Výsledek vypadá jako z designového časopisu. Děkujeme!",
    author: "Tomáš a Lucie Dvořákovi",
    role: "Rezidenční klient, Praha 5",
    initials: "TD",
  },
  {
    quote:
      "Spolupracujeme opakovaně na developerských projektech. Vždy precizní práce, dodržení harmonogramu a perfektní komunikace.",
    author: "Jakub Horák",
    role: "Project Manager, Development s.r.o.",
    initials: "JH",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="py-24 md:py-32 relative">
      {/* Subtle gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span
              className="text-accent font-sans tracking-widest uppercase mb-4 block"
              style={{ fontSize: "12px", fontWeight: 600 }}
            >
              Reference
            </span>
            <h2
              className="font-serif text-foreground"
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Co říkají{" "}
              <span className="italic text-foreground/60">naši klienti</span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="max-w-3xl mx-auto">
            <div className="relative min-h-[280px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <div className="text-center">
                    <Quote
                      size={32}
                      className="text-accent/30 mx-auto mb-6"
                      strokeWidth={1}
                    />
                    <p
                      className="text-foreground font-serif mb-8"
                      style={{
                        fontSize: "clamp(20px, 3vw, 28px)",
                        lineHeight: 1.5,
                        fontWeight: 400,
                        fontStyle: "italic",
                      }}
                    >
                      &ldquo;{testimonials[current].quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                        <span
                          className="font-sans text-foreground"
                          style={{ fontSize: "13px", fontWeight: 600 }}
                        >
                          {testimonials[current].initials}
                        </span>
                      </div>
                      <div className="text-left">
                        <div
                          className="text-foreground font-sans"
                          style={{ fontSize: "15px", fontWeight: 600 }}
                        >
                          {testimonials[current].author}
                        </div>
                        <div
                          className="text-muted-foreground font-sans"
                          style={{ fontSize: "13px" }}
                        >
                          {testimonials[current].role}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                data-cursor-hover
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    data-cursor-hover
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-accent w-6"
                        : "bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                data-cursor-hover
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
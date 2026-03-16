import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import { Send, Calculator, Paintbrush, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Send,
    number: "01",
    title: "Poptávka",
    desc: "Vyplníte jednoduchý formulář nebo nám zavoláte. Ozveme se do 2 hodin.",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: Calculator,
    number: "02",
    title: "Kalkulace",
    desc: "Připravíme přesnou cenovou nabídku. Transparentně a bez skrytých poplatků.",
    color: "from-accent/25 to-accent/5",
  },
  {
    icon: Paintbrush,
    number: "03",
    title: "Realizace",
    desc: "Profesionální provedení v dohodnutém termínu s důrazem na kvalitu.",
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    icon: CheckCircle2,
    number: "04",
    title: "Předání",
    desc: "Kontrola kvality, úklid a spokojenost. Teprve potom je to hotové.",
    color: "from-violet-500/20 to-violet-500/5",
  },
];

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="proces" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary/30 to-secondary/50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-20">
            <span
              className="text-accent font-sans tracking-widest uppercase mb-4 block"
              style={{ fontSize: "12px", fontWeight: 600 }}
            >
              Proces
            </span>
            <h2
              className="font-serif text-foreground"
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Jak <span className="italic text-foreground/60">pracujeme</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="relative">
          {/* Progress line */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-[1px] bg-border">
            <motion.div
              className="h-full origin-left"
              style={{ background: "linear-gradient(90deg, var(--accent), #8a9a7a)" }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group"
              >
                <div className="relative z-10 mb-8">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color} border-2 border-accent/40 flex items-center justify-center mx-auto lg:mx-0 transition-all duration-300 group-hover:scale-110 group-hover:border-accent`}>
                    <step.icon size={16} className="text-accent" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <span
                    className="font-sans text-accent block mb-2"
                    style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em" }}
                  >
                    {step.number}
                  </span>
                  <h3
                    className="text-foreground font-sans mb-3"
                    style={{ fontSize: "20px", fontWeight: 600 }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-muted-foreground font-sans"
                    style={{ fontSize: "14px", lineHeight: 1.6 }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

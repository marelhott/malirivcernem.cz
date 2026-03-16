import { AnimatedSection } from "./AnimatedSection";
import { Clock, Sparkles, Shield, Handshake, MessageCircle } from "lucide-react";

const reasons = [
  {
    icon: Clock,
    title: "Dochvilnost",
    desc: "Přijdeme přesně v domluvený čas. Vždy.",
    iconBg: "from-blue-500/15 to-blue-500/5",
  },
  {
    icon: Sparkles,
    title: "Čistá práce",
    desc: "Po nás zůstane jen krásný výsledek. Žádný nepořádek.",
    iconBg: "from-amber-500/15 to-amber-500/5",
  },
  {
    icon: Shield,
    title: "Zakrytí a ochrana",
    desc: "Pečlivě zakryjeme a ochráníme veškerý nábytek i podlahy.",
    iconBg: "from-emerald-500/15 to-emerald-500/5",
  },
  {
    icon: Handshake,
    title: "Férové jednání",
    desc: "Transparentní ceny bez skrytých poplatků a dodatků.",
    iconBg: "from-violet-500/15 to-violet-500/5",
  },
  {
    icon: MessageCircle,
    title: "Rychlá komunikace",
    desc: "Na vaši poptávku odpovíme do 2 hodin v pracovní dny.",
    iconBg: "from-accent/20 to-accent/5",
  },
];

export function WhyUs() {
  return (
    <section id="proc-my" className="py-24 md:py-32 relative">
      {/* Subtle gradient decoration */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <AnimatedSection>
            <div className="lg:sticky lg:top-32">
              <span
                className="text-accent font-sans tracking-widest uppercase mb-4 block"
                style={{ fontSize: "12px", fontWeight: 600 }}
              >
                Proč my
              </span>
              <h2
                className="font-serif text-foreground mb-6"
                style={{
                  fontSize: "clamp(32px, 5vw, 52px)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                Nejsme jen
                <br />
                <span
                  className="italic"
                  style={{
                    background: "linear-gradient(135deg, var(--foreground) 0%, var(--accent) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  malíři.
                </span>
              </h2>
              <p
                className="text-muted-foreground font-sans max-w-md"
                style={{ fontSize: "16px", lineHeight: 1.7 }}
              >
                Jsme tým profesionálů, kteří přistupují ke každé zakázce s
                respektem, precizností a smyslem pro detail. Protože váš
                prostor si to zaslouží.
              </p>
            </div>
          </AnimatedSection>

          <div className="flex flex-col gap-6">
            {reasons.map((reason, i) => (
              <AnimatedSection key={reason.title} delay={i * 0.1}>
                <div className="group flex gap-5 p-6 rounded-2xl border border-transparent hover:border-border hover:bg-card/80 backdrop-blur-sm transition-all duration-500">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${reason.iconBg} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                    <reason.icon
                      size={20}
                      className="text-foreground/70"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-foreground font-sans mb-1"
                      style={{ fontSize: "17px", fontWeight: 600 }}
                    >
                      {reason.title}
                    </h3>
                    <p
                      className="text-muted-foreground font-sans"
                      style={{ fontSize: "14px", lineHeight: 1.6 }}
                    >
                      {reason.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

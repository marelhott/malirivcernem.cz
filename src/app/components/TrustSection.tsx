import { AnimatedSection } from "./AnimatedSection";
import { Calendar, CheckCircle, Calculator, Eye } from "lucide-react";

const trustItems = [
  {
    icon: Calendar,
    number: "15+",
    label: "let zkušeností",
    desc: "Na trhu od roku 2011",
    gradient: "from-accent/15 to-accent/5",
  },
  {
    icon: CheckCircle,
    number: "1 000+",
    label: "realizací",
    desc: "Byty, kanceláře, SVJ",
    gradient: "from-emerald-500/10 to-emerald-500/3",
  },
  {
    icon: Calculator,
    number: "Online",
    label: "kalkulačka",
    desc: "Cenu zjistíte ihned",
    gradient: "from-blue-500/10 to-blue-500/3",
  },
  {
    icon: Eye,
    number: "100%",
    label: "transparentní cenotvorba",
    desc: "Žádné skryté poplatky",
    gradient: "from-violet-500/10 to-violet-500/3",
  },
];

export function TrustSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.1}>
              <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 overflow-hidden">
                {/* Subtle gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  <item.icon
                    size={20}
                    className="text-accent mb-6 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                  <div
                    className="font-serif text-foreground mb-1"
                    style={{ fontSize: "32px", fontWeight: 500 }}
                  >
                    {item.number}
                  </div>
                  <div
                    className="text-foreground mb-2 font-sans"
                    style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.02em" }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-muted-foreground font-sans"
                    style={{ fontSize: "13px", fontWeight: 400 }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

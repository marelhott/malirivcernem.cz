import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const filters = ["Vše", "Byty", "Komerční", "SVJ", "Developers"];

const projects = [
  {
    title: "Rezidence Vinohrady",
    category: "Byty",
    area: "320 m²",
    image:
      "https://images.unsplash.com/photo-1758548157747-285c7012db5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwYXBhcnRtZW50JTIwaW50ZXJpb3IlMjB3aGl0ZXxlbnwxfHx8fDE3NzEzMjcxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Kancelář Karlín Tech Hub",
    category: "Komerční",
    area: "850 m²",
    image:
      "https://images.unsplash.com/photo-1764410481612-7544525b2991?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvZmZpY2UlMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NzEzMjcxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Bytový dům Holešovice",
    category: "SVJ",
    area: "2 400 m²",
    image:
      "https://images.unsplash.com/photo-1740686170590-40fc6deeae2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzaW5nJTIwYXNzb2NpYXRpb24lMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwZmFjYWRlfGVufDF8fHx8MTc3MTMyNzE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Projekt Nová Libeň",
    category: "Developers",
    area: "5 000 m²",
    image:
      "https://images.unsplash.com/photo-1742042512883-3bdc4e156866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQcmFndWUlMjBhcmNoaXRlY3R1cmUlMjBtb2Rlcm4lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzEzMjcxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Penthouse Smíchov",
    category: "Byty",
    area: "180 m²",
    image:
      "https://images.unsplash.com/photo-1759150712360-6d48015e4f86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjByZW5vdmF0aW9uJTIwbW9kZXJuJTIwZGVzaWdufGVufDF8fHx8MTc3MTMyNzE2MHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Lobby Anděl Business Park",
    category: "Komerční",
    area: "400 m²",
    image:
      "https://images.unsplash.com/photo-1768270181430-3e3672a32283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBsb2JieSUyMGludGVyaW9yfGVufDF8fHx8MTc3MTMyNzE1OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState("Vše");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProjects =
    activeFilter === "Vše"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="realizace"
      className="py-24 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-blue-900/20 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span
                className="text-accent font-sans tracking-widest uppercase mb-4 block"
                style={{ fontSize: "12px", fontWeight: 600 }}
              >
                Portfolio
              </span>
              <h2
                className="font-serif text-foreground"
                style={{
                  fontSize: "clamp(32px, 5vw, 52px)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                Vybrané
                <br />
                <span className="italic text-foreground/60">realizace</span>
              </h2>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                data-cursor-hover
                className={`px-5 py-2 rounded-full transition-all duration-300 font-sans ${
                  activeFilter === filter
                    ? "bg-foreground text-background"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
                style={{ fontSize: "13px", fontWeight: 500 }}
              >
                {filter}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="space-y-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden rounded-[16px] flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 p-6 md:p-10 transition-all duration-500 hover:shadow-lg"
              style={{
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(148, 163, 184, 0.2)"
              }}
              data-cursor-hover
            >
              {/* Image */}
              <div className="w-full lg:w-[350px] flex-shrink-0">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[250px] lg:h-[300px] object-cover transition-transform duration-700 group-hover:scale-105 rounded-[12px]"
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-6 flex-1 min-w-0">
                <div>
                  <span
                    className="text-slate-400 font-sans mb-3 block"
                    style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}
                  >
                    {project.category} · {project.area}
                  </span>
                  <h3
                    className="text-white font-sans mb-3"
                    style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 600, lineHeight: 1.1 }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-slate-300 font-sans" style={{ fontSize: "16px", lineHeight: 1.6, fontFamily: "Manrope, sans-serif" }}>
                    Profesionální malářské práce se zaměřením na kvalitu a detail. Kompletní řešení od přípravy povrchu až po finální nátěr. Spokojení klienti a bezchybná provedení.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 rounded-full text-white text-sm font-semibold" style={{ background: "#2563eb" }}>
                    Zobrazit projekt
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

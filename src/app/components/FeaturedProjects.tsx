import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { AnimatedSection } from "./AnimatedSection";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { portfolioProjects } from "../data/portfolioProjects";

const filters = ["Vše", "Byty", "Komerční", "SVJ", "Speciální"] as const;

function getProjectFilter(project: (typeof portfolioProjects)[number]) {
  if (project.tag === "SVJ") return "SVJ";
  if (project.tag === "Komerční" || project.tag === "Hospitality") return "Komerční";
  if (project.tag === "Speciální") return "Speciální";
  return "Byty";
}

export function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Vše");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = useMemo(
    () =>
      portfolioProjects.slice(0, 6).map((project) => ({
        ...project,
        filter: getProjectFilter(project),
      })),
    [],
  );

  const filteredProjects =
    activeFilter === "Vše"
      ? featuredProjects
      : featuredProjects.filter((project) => project.filter === activeFilter);

  return (
    <section
      id="realizace"
      className="relative overflow-hidden py-24 md:py-32"
      ref={ref}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[500px] rounded-full bg-blue-900/20 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        <AnimatedSection>
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span
                className="mb-4 block font-sans uppercase tracking-widest text-accent"
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
          <div className="mb-12 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                data-cursor-hover
                className={`rounded-full px-5 py-2 font-sans transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-foreground text-background"
                    : "border border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
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
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden rounded-[16px] p-6 transition-all duration-500 hover:shadow-lg md:p-10 lg:flex lg:items-center lg:gap-12"
              style={{
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
              }}
              data-cursor-hover
            >
              <div className="w-full flex-shrink-0 lg:w-[350px]">
                <ImageWithFallback
                  src={project.cover}
                  alt={`${project.title} - ${project.location}`}
                  className="h-[250px] w-full rounded-[12px] object-cover transition-transform duration-700 group-hover:scale-105 lg:h-[300px]"
                  loading="lazy"
                />
              </div>

              <div className="mt-6 flex min-w-0 flex-1 flex-col gap-6 lg:mt-0">
                <div>
                  <span
                    className="mb-3 block font-sans uppercase tracking-[0.05em] text-slate-400"
                    style={{ fontSize: "13px", fontWeight: 600 }}
                  >
                    {project.filter} · {project.area} · {project.location}
                  </span>
                  <h3
                    className="mb-3 font-sans text-white"
                    style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 600, lineHeight: 1.1 }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="font-sans text-slate-300"
                    style={{ fontSize: "16px", lineHeight: 1.6, fontFamily: "Manrope, sans-serif" }}
                  >
                    {project.desc}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    to={`/realizace/${project.slug}`}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                    style={{ background: "#2563eb" }}
                  >
                    Zobrazit projekt
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

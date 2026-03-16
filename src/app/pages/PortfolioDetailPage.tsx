import { Link } from "react-router";
import { MapPin, Banknote, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import type { PortfolioProject } from "../data/portfolioProjects";

export default function PortfolioDetailPage({
  project,
}: {
  project: PortfolioProject;
}) {
  const gallery = [project.cover, ...project.gallery];

  return (
    <>
      <section
        className="relative pt-32 pb-12 noise-overlay overflow-hidden"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #f7f8fb 100%)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative z-10">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500">
            <Link to="/realizace" className="hover:text-[#2563eb] transition-colors">
              Realizace
            </Link>
            <span>/</span>
            <span className="text-slate-900">{project.title}</span>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-[400px_minmax(0,1fr)] gap-10 lg:gap-[70px] items-center rounded-[10px] p-6 md:p-8 lg:p-[30px]"
            style={{ background: "#e9ecf2" }}
          >
            <div className="overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={project.cover}
                alt={`${project.title} - hlavní fotografie realizace ${project.location}`}
                className="w-full h-full object-cover aspect-[4/5] lg:h-[500px]"
              />
            </div>

            <div className="min-w-0">
              <div className="flex flex-col gap-5">
                <div>
                  <h1
                    className="font-[family-name:var(--font-display)] text-foreground mb-4"
                    style={{ fontSize: "clamp(34px, 5vw, 42px)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.03em" }}
                  >
                    {project.title}
                  </h1>
                  <p
                    className="font-sans"
                    style={{ fontSize: "18px", lineHeight: 1.55, color: "#3d3d47", maxWidth: "760px" }}
                  >
                    {project.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  {[project.tag, project.area, project.duration].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center justify-center rounded-2xl px-3 py-1.5"
                      style={{ background: "#28282c", color: "#fff", fontSize: "14px", lineHeight: 1 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <blockquote className="flex items-start gap-5 m-0">
                  <span
                    style={{ color: "#101014", fontSize: "56px", lineHeight: 0.8, fontWeight: 700, transform: "translateY(-4px)" }}
                  >
                    “
                  </span>
                  <p
                    className="m-0 font-sans"
                    style={{ fontSize: "20px", lineHeight: 1.45, color: "#3d3d47", maxWidth: "760px" }}
                  >
                    {project.longDesc}
                  </p>
                </blockquote>

                <div className="flex flex-wrap gap-4 pt-2">
                  {[
                    { icon: MapPin, label: "Lokalita", value: project.location },
                    { icon: Banknote, label: "Cena", value: project.price },
                    { icon: Calendar, label: "Termín", value: project.date },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                        <item.icon size={18} className="text-[#101014]" />
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: "16px", color: "#101014", fontWeight: 600 }}>
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative py-16 noise-overlay"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #f7f8fb 100%)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8">
            <div>
              <div
                className="rounded-[12px] p-8 md:p-10 mb-8"
                style={{ background: "#e9ecf2", border: "1px solid #d8dceb" }}
              >
                <h2
                  className="font-[family-name:var(--font-display)] text-foreground mb-5"
                  style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 500, lineHeight: 1.08 }}
                >
                  Jak realizace probíhala
                </h2>
                <p
                  className="font-sans"
                  style={{ fontSize: "16px", lineHeight: 1.8, color: "#526071", fontWeight: 500 }}
                >
                  {project.longDesc}
                </p>
              </div>

              <div
                className="rounded-[12px] p-8 md:p-10"
                style={{ background: "#e9ecf2", border: "1px solid #d8dceb" }}
              >
                <h2
                  className="font-[family-name:var(--font-display)] text-foreground mb-5"
                  style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 500, lineHeight: 1.1 }}
                >
                  Rozsah provedených prací
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.tasks.map((task) => (
                    <div key={task} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#2563eb]/10">
                        <CheckCircle2 size={12} className="text-[#2563eb]" />
                      </div>
                      <span
                        className="font-sans"
                        style={{ fontSize: "14px", lineHeight: 1.7, color: "#526071", fontWeight: 600 }}
                      >
                        {task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-[96px]">
              <div
                className="rounded-[12px] p-8 md:p-10 mb-8"
                style={{ background: "#e9ecf2", border: "1px solid #d8dceb" }}
              >
                <h2
                  className="font-[family-name:var(--font-display)] text-foreground mb-5"
                  style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 500, lineHeight: 1.1 }}
                >
                  Související služba
                </h2>
                <p
                  className="font-sans mb-6"
                  style={{ fontSize: "15px", lineHeight: 1.75, color: "#526071", fontWeight: 500 }}
                >
                  Tato reference nejlépe odpovídá službě{" "}
                  <strong>{project.relatedServiceLabel}</strong>. Pokud řešíte
                  podobný typ prostoru, najdete tam další informace, průběh i
                  návaznost na kalkulaci.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    to={`/sluzby/${project.relatedServiceSlug}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white transition-all duration-300 hover:opacity-90"
                    style={{ background: "#2563eb", fontSize: "14px", fontWeight: 700 }}
                  >
                    Detail služby
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    to="/kalkulacka"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.86)", border: "1px solid rgba(15,23,42,0.08)", color: "#334155", fontSize: "14px", fontWeight: 700 }}
                  >
                    Spočítat cenu
                  </Link>
                  <Link
                    to="/realizace"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(15,23,42,0.08)", color: "#334155", fontSize: "14px", fontWeight: 700 }}
                  >
                    Všechny reference
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {gallery.map((image, index) => (
                  <div key={`${image}-${index}`} className="overflow-hidden rounded-2xl">
                    <ImageWithFallback
                      src={image}
                      alt={`${project.title} - fotografie realizace ${index + 1}`}
                      className="w-full h-full object-cover aspect-[4/3]"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

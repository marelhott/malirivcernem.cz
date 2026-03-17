import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { portfolioProjects } from "../data/portfolioProjects";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const featuredSlugs = [
  "byt-3kk-vinohrady",
  "kancelare-it-firmy-karlin",
  "svj-biskupcova-18",
];

export default function PortfolioPage() {
  const heroTitleStyle = {
    fontSize: "clamp(32px, 4vw, 56px)",
    fontWeight: 600,
    lineHeight: 1.2,
    fontFamily: "'Sora', sans-serif",
    letterSpacing: "-0.045em",
  } as const;

  const heroAccentStyle = {
    display: "block",
    marginTop: "8px",
    color: "#2563eb",
    fontFamily: "'Sora', sans-serif",
    fontWeight: 400,
    fontStyle: "italic",
    fontSize: "clamp(28px, 3.5vw, 36px)",
    lineHeight: 1.3,
    letterSpacing: "-0.045em",
  } as const;

  const sectionTitleStyle = {
    fontFamily: "'Sora', sans-serif",
    fontSize: "clamp(28px, 4.2vw, 42px)",
    fontWeight: 700,
    lineHeight: 1.04,
    letterSpacing: "-0.045em",
    color: "#0f172a",
  } as const;

  const compactSectionTitleStyle = {
    fontFamily: "'Sora', sans-serif",
    fontSize: "clamp(24px, 3.3vw, 40px)",
    fontWeight: 700,
    lineHeight: 1.04,
    letterSpacing: "-0.04em",
    color: "#0f172a",
  } as const;

  const orientationLeadStyle = {
    fontFamily: "'Sora', sans-serif",
    fontSize: "clamp(22px, 2.8vw, 36px)",
    fontWeight: 700,
    lineHeight: 1.03,
    letterSpacing: "-0.045em",
    color: "#0f172a",
  } as const;

  const orientationAccentStyle = {
    display: "block",
    marginTop: "4px",
    fontFamily: "'Sora', sans-serif",
    fontSize: "clamp(18px, 2.2vw, 24px)",
    fontWeight: 400,
    fontStyle: "italic",
    lineHeight: 1.16,
    letterSpacing: "-0.04em",
    color: "#2563eb",
  } as const;

  const filtered = portfolioProjects;

  const featuredProjects = portfolioProjects.filter((project) =>
    featuredSlugs.includes(project.slug),
  );

  return (
    <>
      <section
        className="relative pt-32 pb-16 noise-overlay overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #ffffff 0%, #f4f8ff 48%, #ffffff 100%)",
        }}
      >
        <div
          className="absolute w-[600px] h-[600px] -top-[200px] right-0 rounded-full blur-[200px] pointer-events-none"
          style={{ background: "rgba(37,99,235,0.10)" }}
        />
        <div
          className="absolute w-[400px] h-[400px] bottom-0 -left-[100px] rounded-full blur-[150px] pointer-events-none"
          style={{ background: "rgba(124,58,237,0.08)" }}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-6 block"
              style={{ fontSize: "12px", fontWeight: 600 }}
            >
              Portfolio
            </span>
            <h1
              className="text-[#09090b] mb-6"
              style={heroTitleStyle}
            >
              Vyberte si reference
              <br />
              <span style={heroAccentStyle}>
                podle typu zakázky
              </span>
            </h1>
            <p
              className="font-sans max-w-xl mb-12"
              style={{ fontSize: "17px", lineHeight: 1.75, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}
            >
              Projděte si skutečné realizace podle typu prostoru, lokality a
              rozsahu. Rychle si uděláte představu, jak podobná zakázka může
              vypadat časově, cenově i výsledkem.
            </p>
          </motion.div>

        </div>
      </section>

      <section
        className="relative pb-10 noise-overlay"
        style={{
          background:
            "linear-gradient(180deg, var(--s1) 0%, var(--s2) 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <span className="mb-3 inline-flex rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Výběr realizací
                </span>
                <h2
                  style={{
                    ...compactSectionTitleStyle,
                    fontSize: "clamp(21px, 2.1vw, 33px)",
                    lineHeight: 1.04,
                  }}
                >
                  Tři typy zakázek, podle kterých se lidé rozhodují nejčastěji
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <Link
                  to={`/realizace/${project.slug}`}
                  className="group block overflow-hidden rounded-[26px] border border-slate-200/70 bg-white/86 shadow-[0_18px_48px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={project.cover}
                      alt={`${project.title} - reference malování ${project.location}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/8 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/14 bg-black/24 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
                      {project.tag}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 style={{ ...compactSectionTitleStyle, fontSize: "24px", lineHeight: 1.1, color: "#ffffff" }}>
                        {project.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-1.5 text-white/70">
                        <MapPin size={12} strokeWidth={1.6} />
                        <span className="text-[12px] font-medium">{project.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="mb-4 max-w-[44ch] text-[14px] leading-6 text-slate-600">
                      {project.desc}
                    </p>
                    <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-4">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Plocha</div>
                        <div className="mt-1 text-[13px] font-semibold text-slate-800">{project.area}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Doba</div>
                        <div className="mt-1 text-[13px] font-semibold text-slate-800">{project.duration}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Cena</div>
                        <div className="mt-1 text-[13px] font-semibold text-[#2563eb]">{project.price}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative py-16 noise-overlay"
        style={{
          background:
            "linear-gradient(180deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <span className="mb-3 inline-flex rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Všechny reference
                </span>
                <h2 style={sectionTitleStyle}>
                  Kompletní přehled realizací
                </h2>
              </div>
              <div className="hidden text-right md:block">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Počet referencí</div>
                <div className="mt-1 text-[30px] font-bold tracking-[-0.04em] text-slate-900">{filtered.length}</div>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05}>
                <Link
                  to={`/realizace/${project.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-[18px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(37,99,235,0.08)]" style={{ background: "#eef2f8", border: "1px solid #d8dceb" }}>
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <ImageWithFallback
                        src={project.cover}
                        alt={`${project.title} - reference malování ${project.location}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span
                          className="px-3 py-1 rounded-full backdrop-blur-sm border"
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            color: "rgba(255,255,255,0.92)",
                            background: "rgba(15,23,42,0.26)",
                            borderColor: "rgba(255,255,255,0.14)",
                            fontFamily: "'Manrope', var(--font-sans)",
                          }}
                        >
                          {project.tag}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                        <ArrowUpRight size={14} className="text-white" />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3
                          className="text-white"
                          style={{
                            fontFamily: "'Sora', sans-serif",
                            fontSize: "20px",
                            fontWeight: 700,
                            letterSpacing: "-0.03em",
                            lineHeight: 1.2,
                          }}
                        >
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <MapPin
                            size={11}
                            className="text-white/60"
                            strokeWidth={1.5}
                          />
                          <span
                            className="text-white/60 font-sans"
                            style={{ fontSize: "12px" }}
                          >
                            {project.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                        <span>{project.date}</span>
                        <span>{project.relatedServiceLabel}</span>
                      </div>
                      <p
                        className="text-foreground/50 font-sans mb-4 line-clamp-2"
                        style={{ fontSize: "13px", lineHeight: 1.6 }}
                      >
                        {project.desc}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <div>
                            <span
                              className="text-foreground/30 block font-sans"
                              style={{ fontSize: "10px" }}
                            >
                              PLOCHA
                            </span>
                            <span
                              className="text-foreground font-[family-name:var(--font-display)]"
                              style={{ fontSize: "13px", fontWeight: 600 }}
                            >
                              {project.area}
                            </span>
                          </div>
                          <div>
                            <span
                              className="text-foreground/30 block font-sans"
                              style={{ fontSize: "10px" }}
                            >
                              DOBA
                            </span>
                            <span
                              className="text-foreground font-[family-name:var(--font-display)]"
                              style={{ fontSize: "13px", fontWeight: 600 }}
                            >
                              {project.duration}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className="text-foreground/30 block font-sans"
                            style={{ fontSize: "10px" }}
                          >
                            CENA
                          </span>
                          <span
                            className="text-accent font-[family-name:var(--font-display)]"
                            style={{ fontSize: "14px", fontWeight: 700 }}
                          >
                            {project.price}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-foreground/5 flex items-center justify-between gap-3 text-accent">
                        <span
                          className="font-[family-name:var(--font-display)]"
                          style={{ fontSize: "12px", fontWeight: 600 }}
                        >
                          Zobrazit detail realizace
                        </span>
                        <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p
                className="text-foreground/30 font-sans"
                style={{ fontSize: "16px" }}
              >
                V této kategorii zatím nemáme realizace.
              </p>
            </div>
          )}
        </div>
      </section>

      <section
        className="relative py-16 noise-overlay"
        style={{
          background:
            "linear-gradient(180deg, var(--s1) 0%, var(--s2) 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <div className="mb-8 text-center">
              <span className="mb-3 inline-flex rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                V číslech
              </span>
              <h2 style={{ ...sectionTitleStyle, fontSize: "clamp(24px, 3.4vw, 36px)", lineHeight: 1.05 }}>
                Co se opakuje napříč našimi realizacemi
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "1 200+", label: "Dokončených projektů" },
                { value: "98 %", label: "Spokojených klientů" },
                { value: "15+", label: "Let zkušeností" },
                { value: "85 000+", label: "Natřených m²" },
              ].map((item) => (
                <div key={item.label} className="text-center p-6 rounded-[12px]" style={{ background: "#e9ecf2", border: "1px solid #d8dceb" }}>
                  <span
                    className="block font-[family-name:var(--font-display)] text-accent mb-2"
                    style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700 }}
                  >
                    {item.value}
                  </span>
                  <span
                    className="font-sans"
                    style={{ fontSize: "13px", color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 600 }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="relative pt-0 pb-12 noise-overlay"
        style={{
          background:
            "linear-gradient(180deg, var(--s2) 0%, var(--s1) 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <Reveal>
            <div
              className="rounded-[24px] px-5 py-5 md:px-6 md:py-6"
              style={{
                background: "rgba(244,248,255,0.96)",
                border: "1px solid #d8dceb",
                boxShadow: "0 16px 40px rgba(15,23,42,0.04)",
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
                <div className="min-w-0">
                  <h2
                    className="text-foreground mb-2"
                    style={{ ...compactSectionTitleStyle, fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.08 }}
                  >
                    Chcete podobný výsledek u své zakázky?
                  </h2>
                  <p
                    className="font-sans"
                    style={{ margin: 0, fontSize: "13px", lineHeight: 1.7, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}
                  >
                    Vyberte si odpovídající službu nebo si rovnou spočítejte orientační cenu. Pro srovnání si můžete projít také{" "}
                    <Link to="/sluzby/malovani-bytu" className="text-accent underline underline-offset-4">
                      malování bytů
                    </Link>
                    ,{" "}
                    <Link to="/sluzby/malovani-kancelari" className="text-accent underline underline-offset-4">
                      malování kanceláří
                    </Link>
                    ,{" "}
                    <Link to="/sluzby/malovani-svj" className="text-accent underline underline-offset-4">
                      malování SVJ
                    </Link>{" "}
                    a{" "}
                    <Link to="/sluzby/dekorativni-sterky" className="text-accent underline underline-offset-4">
                      dekorativní stěrky
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:justify-end">
                  <Link
                    to="/sluzby"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                    style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)", fontSize: "13px", fontWeight: 700 }}
                  >
                    Zobrazit služby
                  </Link>
                  <Link
                    to="/kalkulacka"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(15,23,42,0.08)", color: "#334155", fontSize: "13px", fontWeight: 700 }}
                  >
                    Spočítat cenu
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import { useState, useRef } from "react";
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

const filters = [
  "Vše",
  "Byty",
  "Domy",
  "Kanceláře",
  "Chodby a schodiště",
  "Stěrky",
  "Hotel",
  "Kavárna",
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("Vše");

  const filtered =
    filter === "Vše"
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === filter);

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
              className="font-[family-name:var(--font-display)] text-foreground mb-6"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: 700,
                lineHeight: 1.0,
              }}
            >
              Dokončené
              <br />
              <span className="bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
                realizace
              </span>
            </h1>
            <p
              className="font-sans max-w-xl mb-12"
              style={{ fontSize: "17px", lineHeight: 1.75, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}
            >
              Každý projekt je jiný. Projděte si naše realizace od menších
              bytů až po rozsáhlejší komerční zakázky a společné prostory domů.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-5 py-2 rounded-full transition-all duration-300 font-[family-name:var(--font-display)] ${
                  filter === item
                    ? "text-white shadow-lg shadow-accent/20"
                    : "text-[#5b6877] hover:text-[#0f172a]"
                }`}
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  ...(filter === item
                    ? {
                        background:
                          "linear-gradient(135deg, #2563eb, #4f46e5)",
                      }
                    : {}),
                }}
              >
                {item}
              </button>
            ))}
          </motion.div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05}>
                <Link
                  to={`/realizace/${project.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-[12px] transition-all duration-500 hover:shadow-[0_24px_70px_rgba(37,99,235,0.08)]" style={{ background: "#e9ecf2", border: "1px solid #d8dceb" }}>
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

                      <div className="mt-4 pt-4 border-t border-foreground/5 flex items-center justify-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span
                          className="font-[family-name:var(--font-display)]"
                          style={{ fontSize: "12px", fontWeight: 600 }}
                        >
                          Zobrazit detail realizace
                        </span>
                        <ArrowUpRight size={13} />
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
              className="rounded-[12px] px-5 py-4 md:px-6 md:py-5"
              style={{
                background: "rgba(233,236,242,0.92)",
                border: "1px solid #d8dceb",
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
                <div className="min-w-0">
                  <h2
                    className="font-[family-name:var(--font-display)] text-foreground mb-2"
                    style={{ fontSize: "clamp(18px, 2.4vw, 24px)", fontWeight: 700, lineHeight: 1.1 }}
                  >
                    Reference malování bytů, kanceláří a SVJ v Praze
                  </h2>
                  <p
                    className="font-sans"
                    style={{ margin: 0, fontSize: "13px", lineHeight: 1.7, color: "#526071", fontFamily: "'Manrope', var(--font-sans)", fontWeight: 500 }}
                  >
                    Přehled našich realizací v Praze a okolí. Pro srovnání se službami si projděte{" "}
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

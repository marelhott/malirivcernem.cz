import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center px-6 py-24 noise-overlay"
      style={{ background: "linear-gradient(180deg, var(--s1) 0%, var(--s2) 100%)" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-accent font-[family-name:var(--font-display)] tracking-widest uppercase mb-4" style={{ fontSize: "12px", fontWeight: 600 }}>
          404
        </p>
        <h1
          className="font-[family-name:var(--font-display)] text-foreground mb-5"
          style={{ fontSize: "clamp(34px, 6vw, 64px)", fontWeight: 700, lineHeight: 1.05 }}
        >
          Stránka nebyla nalezena
        </h1>
        <p className="text-foreground/50 font-sans mb-8" style={{ fontSize: "16px", lineHeight: 1.7 }}>
          Tato adresa neexistuje nebo byla přesunuta. Pokračujte na hlavní stránku nebo nás kontaktujte.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 rounded-full text-white"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--copper))", fontSize: "14px", fontWeight: 600 }}
          >
            Zpět na domů
          </Link>
          <Link
            to="/kontakt"
            className="inline-flex items-center px-6 py-3 rounded-full border border-foreground/10 text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            Kontakt
          </Link>
        </div>
      </div>
    </section>
  );
}


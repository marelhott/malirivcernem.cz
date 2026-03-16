import React, { useState, useEffect } from "react";
import { logoDarkUrl, logoLightUrl } from "../Logo";
import { Outlet, Link, useLocation } from "react-router";
import { motion, AnimatePresence, useSpring } from "motion/react";
import {
  Bars3Icon, XMarkIcon, SunIcon, MoonIcon, ArrowTopRightOnSquareIcon, PhoneIcon, EnvelopeIcon, MapPinIcon,
  ClockIcon, ChevronRightIcon
} from "@heroicons/react/24/outline";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { SITE } from "../../seo/site";

const navLinks = [
  { label: "Domů", href: "/" },
  { label: "Služby", href: "/sluzby" },
  { label: "Realizace", href: "/realizace" },
  { label: "Kalkulačka", href: "/kalkulacka" },
  { label: "O nás", href: "/o-nas" },
  { label: "Kontakt", href: "/kontakt" },
];

const footerServices = [
  { label: "Malování bytů", href: "/sluzby/malovani-bytu" },
  { label: "Malování kanceláří", href: "/sluzby/malovani-kancelari" },
  { label: "Dekorativní stěrky", href: "/sluzby/dekorativni-sterky" },
  { label: "Malování před prodejem", href: "/sluzby/malovani-pred-prodejem" },
  { label: "Komerční objekty", href: "/sluzby/komercni-objekty" },
];

function ScrollProgress() {
  const scaleX = useSpring(0, { stiffness: 100, damping: 30 });
  useEffect(() => {
    const handleScroll = () => {
      const t = document.documentElement.scrollHeight - window.innerHeight;
      scaleX.set(t > 0 ? window.scrollY / t : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scaleX]);
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg, #b8a88a, #8a9a7a, #c08050)" }}
    />
  );
}

function Navbar({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong shadow-lg shadow-black/5" : "bg-transparent"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-[72px] pt-6">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={isDark ? logoLightUrl : logoDarkUrl}
              alt="Malíři v černém"
              className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-5 py-2.5 rounded-full transition-all duration-300 ${isActive(link.href)
                    ? "bg-black text-white"
                    : "text-foreground/70 hover:text-foreground hover:bg-black/5"
                  }`}
                style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "-0.01em", fontFamily: "'Manrope', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-foreground/5 transition-colors duration-300"
            >
              {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            </button>

            <Link
              to="/kalkulacka"
              className="hidden md:inline-flex items-center gap-2 px-5 h-9 rounded-full text-background transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:scale-[1.02]"
              style={{
                fontSize: "13px", fontWeight: 500,
                background: "linear-gradient(135deg, var(--foreground) 0%, #1a1a2e 100%)",
              }}
            >
              Online kalkulace
              <ArrowTopRightOnSquareIcon className="w-3 h-3" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-foreground/5 rounded-full transition-colors"
            >
              {mobileOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 lg:hidden"
            style={{ background: "linear-gradient(180deg, var(--background) 0%, var(--card) 100%)", zIndex: 49, pointerEvents: "auto" }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 pt-[72px] pb-20" onClick={(e) => e.stopPropagation()} style={{ pointerEvents: "auto" }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => {
                      setTimeout(() => setMobileOpen(false), 0);
                    }}
                    className="font-[family-name:var(--font-display)] text-foreground"
                    style={{ fontSize: "36px", fontWeight: 600 }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <Link
                  to="/kalkulacka"
                  onClick={() => {
                    setTimeout(() => setMobileOpen(false), 0);
                  }}
                  className="px-8 py-3 rounded-full text-background"
                  style={{
                    fontSize: "16px", fontWeight: 500,
                    background: "linear-gradient(135deg, var(--foreground) 0%, #1a1a2e 100%)",
                  }}
                >
                  Online kalkulace
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer({ isDark }: { isDark: boolean }) {
  return (
    <footer className="relative overflow-hidden noise-overlay" style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #0f0f18 50%, #111120 100%)" }}>
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-accent/6 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-navy/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 pt-20 pb-8 text-white/90">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <img src={logoLightUrl} alt="Malíři v černém" className="h-10 w-auto opacity-90 mb-6" />
            <p className="opacity-40 font-sans mb-6" style={{ fontSize: "14px", lineHeight: 1.7 }}>
              Malování bytů, pokojů, kanceláří a dekorativních stěrek v Praze a okolí. Precizní realizace, čistá práce a férová komunikace.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <Icon size={14} className="opacity-60" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-display)] mb-6 opacity-40 tracking-widest uppercase" style={{ fontSize: "11px", fontWeight: 600 }}>
              Služby
            </h4>
            <div className="flex flex-col gap-3">
              {footerServices.map((s) => (
                <Link
                  key={s.href}
                  to={s.href}
                  className="opacity-50 hover:opacity-100 hover:text-accent transition-all duration-300 font-sans flex items-center gap-1 group"
                  style={{ fontSize: "14px" }}
                >
                  {s.label}
                  <ChevronRightIcon className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-display)] mb-6 opacity-40 tracking-widest uppercase" style={{ fontSize: "11px", fontWeight: 600 }}>
              Kontakt
            </h4>
            <div className="flex flex-col gap-4">
              <a href={`tel:${SITE.phoneE164}`} className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300">
                <PhoneIcon className="w-3.5 h-3.5" />
                <span className="font-sans" style={{ fontSize: "14px" }}>{SITE.phoneDisplay}</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300">
                <EnvelopeIcon className="w-3.5 h-3.5" />
                <span className="font-sans" style={{ fontSize: "14px" }}>{SITE.email}</span>
              </a>
              <div className="flex items-center gap-3 opacity-50">
                <MapPinIcon className="w-3.5 h-3.5" />
                <span className="font-sans" style={{ fontSize: "14px" }}>Praha, Česká republika</span>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <ClockIcon className="w-3.5 h-3.5" />
                <span className="font-sans" style={{ fontSize: "14px" }}>Po–Pá: 7:00 – 18:00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-display)] mb-6 opacity-40 tracking-widest uppercase" style={{ fontSize: "11px", fontWeight: 600 }}>
              Rychlé odkazy
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Portfolio realizací", href: "/realizace" },
                { label: "Online kalkulačka", href: "/kalkulacka" },
                { label: "O společnosti", href: "/o-nas" },
                { label: "Kariéra", href: "/kontakt" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300 font-sans"
                  style={{ fontSize: "14px" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="opacity-30 font-sans" style={{ fontSize: "13px" }}>
            © 2026 Malíři v černém. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="opacity-30 hover:opacity-60 transition-opacity duration-300 font-sans" style={{ fontSize: "13px" }}>
              Ochrana osobních údajů
            </a>
            <a href="#" className="opacity-30 hover:opacity-60 transition-opacity duration-300 font-sans" style={{ fontSize: "13px" }}>
              Obchodní podmínky
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("dark");
    }
    return false;
  });
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleTheme = () => setIsDark((p) => !p);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <ScrollProgress />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        {children ?? <Outlet />}
      </main>
      <Footer isDark={isDark} />

    </div>
  );
}

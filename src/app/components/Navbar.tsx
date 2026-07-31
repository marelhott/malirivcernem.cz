import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { logoDarkUrl as logoDark, logoLightUrl as logoLight } from "./Logo";
import { Link } from "react-router";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const navLinks = [
  { label: "Služby", href: "/sluzby" },
  { label: "Realizace", href: "/realizace" },
  { label: "Proč my", href: "/o-nas" },
  { label: "Proces", href: "/o-nas" },
  { label: "Kalkulačka", href: "/kalkulacka" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-[80px]">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-cursor-hover
          >
            <img
              src={isDark ? logoLight : logoDark}
              alt="Malíři v černém"
              className="h-7 md:h-8 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-cursor-hover
                className="text-foreground/70 hover:text-foreground transition-colors duration-300 relative group"
                style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.02em" }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              data-cursor-hover
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-foreground/5 transition-colors duration-300"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link
              to="/kalkulacka"
              data-cursor-hover
              className="hidden md:flex items-center justify-center px-5 h-9 rounded-full bg-gradient-to-r from-foreground to-foreground/90 text-background transition-all duration-300 hover:shadow-md hover:shadow-foreground/10"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              Nezávazná kalkulace
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center"
              data-cursor-hover
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl pt-[72px] lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-foreground font-serif"
                    style={{ fontSize: "32px" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/kalkulacka"
                  onClick={() => setMobileOpen(false)}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-foreground to-foreground/90 text-background"
                  style={{ fontSize: "16px", fontWeight: 500 }}
                >
                  Nezávazná kalkulace
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

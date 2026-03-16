import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

const heroPhoto = "https://images.unsplash.com/photo-1761476329283-4e457422306e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBhaW50aW5nJTIwd2FsbCUyMG9yYW5nZSUyMHBhaW50JTIwcm9sbGVyJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxNDA1ODU3fDA&ixlib=rb-4.1.0&q=80&w=1080";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-width background photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPhoto}
          alt="Malířka s válečkem"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Subtle accent glow */}
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[180px] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-32 pb-20">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="inline-block text-amber-300/90 mb-6 font-sans tracking-widest uppercase"
              style={{ fontSize: "12px", fontWeight: 600 }}
            >
              Praha & okolí
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-white leading-[0.95] tracking-[-0.03em] mb-8 drop-shadow-lg"
            style={{ fontSize: "clamp(40px, 8vw, 96px)", fontWeight: 400 }}
          >
            Profesionální
            <br />
            malířské práce
            <br />
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #c08050 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              v Praze.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/70 max-w-lg mb-12 font-sans drop-shadow-md"
            style={{ fontSize: "clamp(16px, 1.5vw, 20px)", lineHeight: 1.6, fontWeight: 400 }}
          >
            Precizní realizace. Čistota. Dochvilnost.
            <br />
            Bez kompromisů.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#kalkulacka"
              data-cursor-hover
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:scale-[1.02]"
              style={{ fontSize: "15px", fontWeight: 500 }}
            >
              Nezávazná kalkulace
            </a>
            <a
              href="#realizace"
              data-cursor-hover
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
              style={{ fontSize: "15px", fontWeight: 500 }}
            >
              Naše realizace
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/50"
          >
            <span
              className="font-sans tracking-widest uppercase"
              style={{ fontSize: "10px", fontWeight: 500 }}
            >
              Scroll
            </span>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

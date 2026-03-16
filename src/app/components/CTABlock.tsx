import { AnimatedSection } from "./AnimatedSection";
import { ArrowRight } from "lucide-react";
import { logoLightUrl as logoLight } from "./Logo";

export function CTABlock() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-foreground text-background px-8 md:px-16 py-16 md:py-24">
            {/* Gradient decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-accent/15 via-accent/5 to-transparent rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent/10 via-transparent to-transparent rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[150px]" />

            {/* Watermark logo */}
            <div className="absolute top-8 right-8 opacity-[0.06] pointer-events-none hidden md:block">
              <img src={logoLight} alt="" className="h-24 w-auto" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <h2
                className="font-serif mb-6"
                style={{
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                Potřebujete
                <br />
                spolehlivé{" "}
                <span className="italic" style={{ color: "var(--accent)" }}>
                  malíře?
                </span>
              </h2>
              <p
                className="opacity-60 font-sans mb-10 max-w-lg"
                style={{ fontSize: "16px", lineHeight: 1.7 }}
              >
                Spočítejte si orientační cenu online nebo nám rovnou napište.
                Odpovíme do 2 hodin.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#kalkulacka"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-background to-background/95 text-foreground rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-background/20 hover:gap-3"
                  style={{ fontSize: "15px", fontWeight: 500 }}
                >
                  Spočítat cenu online
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#kontakt"
                  data-cursor-hover
                  className="inline-flex items-center px-8 py-4 border border-background/20 rounded-full transition-all duration-300 hover:bg-background/10 hover:border-background/40"
                  style={{ fontSize: "15px", fontWeight: 500 }}
                >
                  Kontaktovat nás
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
import { useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ServiceDetailModal, serviceDetails } from "./ServiceDetailModal";

export function ServicesGrid() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <>
      <section id="sluzby" className="py-24 md:py-32 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <span
                  className="text-accent font-sans tracking-widest uppercase mb-4 block"
                  style={{ fontSize: "12px", fontWeight: 600 }}
                >
                  Služby
                </span>
                <h2
                  className="font-serif text-foreground"
                  style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.1 }}
                >
                  Co pro vás
                  <br />
                  <span className="italic text-foreground/60">můžeme udělat</span>
                </h2>
              </div>
              <p
                className="text-muted-foreground max-w-md font-sans"
                style={{ fontSize: "15px", lineHeight: 1.7 }}
              >
                Nabízíme kompletní malířské služby od klasického malování po
                speciální dekorativní techniky. Klikněte pro detail.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceDetails.map((service, i) => (
              <AnimatedSection
                key={service.title}
                delay={i * 0.08}
                className={i >= 3 ? "lg:col-span-1" : ""}
              >
                <div
                  onClick={() => setActiveService(i)}
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20"
                  data-cursor-hover
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1] pointer-events-none rounded-2xl" />

                  <div className="aspect-[4/3] overflow-hidden relative">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Image gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6 relative z-[2]">
                    <span
                      className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-secondary to-secondary/70 text-muted-foreground mb-4 font-sans"
                      style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em" }}
                    >
                      {service.tag}
                    </span>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className="text-foreground font-sans mb-2"
                          style={{ fontSize: "18px", fontWeight: 600 }}
                        >
                          {service.title}
                        </h3>
                        <p
                          className="text-muted-foreground font-sans"
                          style={{ fontSize: "14px", lineHeight: 1.6 }}
                        >
                          {service.heroDesc.slice(0, 100)}…
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent/80 group-hover:text-background group-hover:border-accent group-hover:scale-110">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                    {/* "Zjistit více" label */}
                    <div className="mt-4 flex items-center gap-1.5 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="font-sans" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em" }}>
                        ZJISTIT VÍCE
                      </span>
                      <ArrowUpRight size={12} />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ServiceDetailModal
        isOpen={activeService !== null}
        onClose={() => setActiveService(null)}
        serviceIndex={activeService}
      />
    </>
  );
}

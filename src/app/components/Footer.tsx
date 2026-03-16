import { AnimatedSection } from "./AnimatedSection";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { logoLightUrl as logoLight } from "./Logo";

const serviceAreas = [
  "Praha 1–10",
  "Praha-západ",
  "Praha-východ",
  "Beroun",
  "Kladno",
  "Kolín",
];

const services = [
  { label: "Malování bytů", href: "/sluzby/malovani-bytu" },
  { label: "Malování kanceláří", href: "/sluzby/malovani-kancelari" },
  { label: "Dekorativní stěrky", href: "/sluzby/dekorativni-sterky" },
  { label: "Malování před prodejem", href: "/sluzby/malovani-pred-prodejem" },
  { label: "Komerční objekty", href: "/sluzby/komercni-objekty" },
  { label: "SVJ a bytové domy", href: "/sluzby/malovani-svj" },
];

export function Footer() {
  return (
    <footer id="kontakt" className="relative bg-foreground text-background pt-20 pb-8 overflow-hidden">
      {/* Gradient decorations */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-accent/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div>
              <div className="mb-6">
                <img
                  src={logoLight}
                  alt="Malíři v černém"
                  className="h-10 w-auto opacity-90"
                />
              </div>
              <p
                className="opacity-50 font-sans mb-6"
                style={{ fontSize: "14px", lineHeight: 1.7 }}
              >
                Profesionální malířské práce v Praze a okolí. Precizní realizace
                bez kompromisů.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="font-sans mb-6 opacity-40 tracking-widest uppercase"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                Kontakt
              </h4>
              <div className="flex flex-col gap-4">
                <a
                  href="tel:+420732333550"
                  className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  data-cursor-hover
                >
                  <Phone size={14} strokeWidth={1.5} />
                  <span className="font-sans" style={{ fontSize: "14px" }}>
                    +420 732 333 550
                  </span>
                </a>
                <a
                  href="mailto:info@malirivcernem.cz"
                  className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  data-cursor-hover
                >
                  <Mail size={14} strokeWidth={1.5} />
                  <span className="font-sans" style={{ fontSize: "14px" }}>
                    info@malirivcernem.cz
                  </span>
                </a>
                <div className="flex items-center gap-3 opacity-70">
                  <MapPin size={14} strokeWidth={1.5} />
                  <span className="font-sans" style={{ fontSize: "14px" }}>
                    Praha, Česká republika
                  </span>
                </div>
                <div className="flex items-center gap-3 opacity-70">
                  <Clock size={14} strokeWidth={1.5} />
                  <span className="font-sans" style={{ fontSize: "14px" }}>
                    Po–Pá: 7:00 – 18:00
                  </span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4
                className="font-sans mb-6 opacity-40 tracking-widest uppercase"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                Služby
              </h4>
              <div className="flex flex-col gap-3">
                {services.map((service) => (
                  <a
                    key={`${service.label}-${service.href}`}
                    href={service.href}
                    className="opacity-70 hover:opacity-100 hover:text-accent transition-all duration-300 font-sans"
                    style={{ fontSize: "14px" }}
                    data-cursor-hover
                  >
                    {service.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Service Areas */}
            <div>
              <h4
                className="font-sans mb-6 opacity-40 tracking-widest uppercase"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                Oblast působení
              </h4>
              <div className="flex flex-col gap-3">
                {serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="opacity-70 font-sans"
                    style={{ fontSize: "14px" }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="opacity-40 font-sans"
            style={{ fontSize: "13px" }}
          >
            © 2026 Malíři v černém. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/ochrana-osobnich-udaju"
              className="opacity-40 hover:opacity-70 transition-opacity duration-300 font-sans"
              style={{ fontSize: "13px" }}
              data-cursor-hover
            >
              Ochrana osobních údajů
            </a>
            <a
              href="/obchodni-podminky"
              className="opacity-40 hover:opacity-70 transition-opacity duration-300 font-sans"
              style={{ fontSize: "13px" }}
              data-cursor-hover
            >
              Obchodní podmínky
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

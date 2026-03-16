import { useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { motion } from "motion/react";
import { Calculator, ArrowRight } from "lucide-react";

const roomTypes = [
  { label: "Byt 1+kk", area: 35, basePrice: 8500 },
  { label: "Byt 2+kk", area: 55, basePrice: 12500 },
  { label: "Byt 3+kk", area: 75, basePrice: 16500 },
  { label: "Byt 4+kk", area: 100, basePrice: 22000 },
  { label: "Kancelář", area: 120, basePrice: 25000 },
  { label: "Komerční prostor", area: 200, basePrice: 38000 },
];

const extras = [
  { label: "Stropní malba", price: 3500, id: "ceiling" },
  { label: "Tmelení a opravy zdí", price: 2500, id: "repair" },
  { label: "Dekorativní stěrka", price: 8000, id: "decorative" },
  { label: "Expresní realizace", price: 4000, id: "express" },
];

export function PriceCalculator() {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [rooms, setRooms] = useState(1);

  const basePrice = roomTypes[selectedRoom].basePrice * rooms;
  const extrasPrice = selectedExtras.reduce((sum, id) => {
    const extra = extras.find((e) => e.id === id);
    return sum + (extra ? extra.price * rooms : 0);
  }, 0);
  const totalPrice = basePrice + extrasPrice;

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <section id="kalkulacka" className="py-24 md:py-32 relative">
      {/* Subtle gradient */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span
              className="text-accent font-sans tracking-widest uppercase mb-4 block"
              style={{ fontSize: "12px", fontWeight: 600 }}
            >
              Kalkulačka
            </span>
            <h2
              className="font-serif text-foreground"
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Orientační{" "}
              <span className="italic text-foreground/60">kalkulace</span>
            </h2>
            <p
              className="text-muted-foreground font-sans mt-4 max-w-lg mx-auto"
              style={{ fontSize: "15px", lineHeight: 1.7 }}
            >
              Zjistěte přibližnou cenu během pár sekund. Přesnou kalkulaci
              připravíme po prohlídce.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm relative overflow-hidden">
              {/* Card gradient accent */}
              <div className="absolute top-0 right-0 w-[300px] h-[200px] bg-gradient-to-bl from-accent/8 to-transparent pointer-events-none rounded-2xl" />

              <div className="relative z-10">
                {/* Room type selection */}
                <div className="mb-8">
                  <label
                    className="block text-foreground font-sans mb-4"
                    style={{ fontSize: "14px", fontWeight: 600 }}
                  >
                    Typ prostoru
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {roomTypes.map((room, i) => (
                      <button
                        key={room.label}
                        onClick={() => setSelectedRoom(i)}
                        data-cursor-hover
                        className={`px-4 py-3 rounded-xl border text-left transition-all duration-300 ${
                          selectedRoom === i
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                        }`}
                      >
                        <span
                          className="block font-sans"
                          style={{ fontSize: "14px", fontWeight: 600 }}
                        >
                          {room.label}
                        </span>
                        <span
                          className="block font-sans mt-1"
                          style={{ fontSize: "12px", fontWeight: 400 }}
                        >
                          ~{room.area} m²
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of rooms */}
                <div className="mb-8">
                  <label
                    className="block text-foreground font-sans mb-4"
                    style={{ fontSize: "14px", fontWeight: 600 }}
                  >
                    Počet místností: {rooms}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-full appearance-none cursor-pointer accent-accent"
                    style={{ accentColor: "#b8a88a" }}
                  />
                  <div className="flex justify-between mt-2">
                    <span
                      className="text-muted-foreground font-sans"
                      style={{ fontSize: "12px" }}
                    >
                      1
                    </span>
                    <span
                      className="text-muted-foreground font-sans"
                      style={{ fontSize: "12px" }}
                    >
                      10
                    </span>
                  </div>
                </div>

                {/* Extras */}
                <div className="mb-10">
                  <label
                    className="block text-foreground font-sans mb-4"
                    style={{ fontSize: "14px", fontWeight: 600 }}
                  >
                    Doplňkové služby
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {extras.map((extra) => (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        data-cursor-hover
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 ${
                          selectedExtras.includes(extra.id)
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-foreground/20"
                        }`}
                      >
                        <span
                          className="font-sans text-foreground"
                          style={{ fontSize: "14px", fontWeight: 500 }}
                        >
                          {extra.label}
                        </span>
                        <span
                          className="font-sans text-muted-foreground"
                          style={{ fontSize: "13px" }}
                        >
                          +{extra.price.toLocaleString("cs-CZ")} Kč
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-border pt-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <span
                        className="text-muted-foreground font-sans block mb-1"
                        style={{ fontSize: "13px" }}
                      >
                        Orientační cena
                      </span>
                      <motion.div
                        key={totalPrice}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-foreground flex items-baseline gap-2"
                      >
                        <span style={{ fontSize: "40px", fontWeight: 500 }}>
                          {totalPrice.toLocaleString("cs-CZ")}
                        </span>
                        <span
                          className="text-muted-foreground font-sans"
                          style={{ fontSize: "16px" }}
                        >
                          Kč
                        </span>
                      </motion.div>
                    </div>
                    <a
                      href="#kontakt"
                      data-cursor-hover
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-foreground to-foreground/90 text-background rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-foreground/10 hover:gap-3"
                      style={{ fontSize: "15px", fontWeight: 500 }}
                    >
                      <Calculator size={16} />
                      Nezávazná poptávka
                      <ArrowRight size={16} />
                    </a>
                  </div>
                  <p
                    className="text-muted-foreground font-sans mt-4"
                    style={{ fontSize: "12px" }}
                  >
                    * Konečná cena závisí na aktuálním stavu povrchů a specifických
                    požadavcích. Kalkulace je orientační.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
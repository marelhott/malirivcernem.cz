import { useState, useRef } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const beforeImage =
  "https://images.unsplash.com/photo-1566503732592-748f40a6e997?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHJvb20lMjBiZWZvcmUlMjByZW5vdmF0aW9uJTIwd2FsbHN8ZW58MXx8fHwxNzcxMzI3MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const afterImage =
  "https://images.unsplash.com/photo-1741105820091-3d150a451cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGVhbiUyMHdoaXRlJTIwcm9vbSUyMGFmdGVyJTIwcmVub3ZhdGlvbnxlbnwxfHx8fDE3NzEzMjcxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(Math.max((x / rect.width) * 100, 2), 98);
    setSliderPos(pct);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    isDragging.current = true;
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary/30 to-secondary/50 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span
              className="text-accent font-sans tracking-widest uppercase mb-4 block"
              style={{ fontSize: "12px", fontWeight: 600 }}
            >
              Transformace
            </span>
            <h2
              className="font-serif text-foreground"
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Před &{" "}
              <span className="italic text-foreground/60">Po</span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div
            ref={containerRef}
            className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden aspect-[16/10] select-none cursor-col-resize"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* After image (background) */}
            <ImageWithFallback
              src={afterImage}
              alt="Po malování"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />

            {/* Before image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <ImageWithFallback
                src={beforeImage}
                alt="Před malováním"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  width: containerRef.current
                    ? `${containerRef.current.offsetWidth}px`
                    : "100vw",
                  maxWidth: "none",
                }}
                loading="lazy"
              />
            </div>

            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white/80 z-10"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div className="flex items-center gap-[2px]">
                  <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-r-[6px] border-transparent border-r-[#0f0f0f]" />
                  <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-l-[6px] border-transparent border-l-[#0f0f0f]" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div
              className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white font-sans"
              style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em" }}
            >
              PŘED
            </div>
            <div
              className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-black font-sans"
              style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em" }}
            >
              PO
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
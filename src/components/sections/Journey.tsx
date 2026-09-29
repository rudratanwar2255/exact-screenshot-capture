import { useCallback, useEffect, useRef } from "react";
import { content } from "@/content";
import { Reveal, Section, SectionTitle } from "@/components/Section";
import { SmartImage } from "@/components/SmartImage";
import { useReducedMotion } from "@/lib/motion-prefs";

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const mid = track.scrollLeft + track.clientWidth / 2;
    Array.from(track.children).forEach((node) => {
      const el = node as HTMLElement;
      const center = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.max(-1, Math.min(1, (center - mid) / track.clientWidth));
      el.style.transform = reduced
        ? "none"
        : `perspective(1000px) rotateY(${-d * 28}deg) translateZ(${-Math.abs(d) * 90}px) scale(${1 - Math.abs(d) * 0.12})`;
      el.style.opacity = `${1 - Math.abs(d) * 0.45}`;
    });
  }, [reduced]);

  useEffect(() => {
    update();
    const track = trackRef.current;
    track?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return (
    <Section>
      <SectionTitle>{content.journey.title}</SectionTitle>
      <Reveal>
        <p className="mb-8 font-body text-sm text-cream/60">
          {content.journey.subtitle}
        </p>
      </Reveal>

      <div
        ref={trackRef}
        className="flex w-screen snap-x snap-mandatory gap-5 overflow-x-auto px-[calc(50vw-7.5rem)] pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {content.journey.photos.map((p, i) => (
          <div
            key={p.src}
            className="glass-card shrink-0 snap-center rounded-3xl p-3 transition-[opacity] duration-200"
            style={{ width: "15rem" }}
          >
            <SmartImage
              name={p.src}
              alt={`Us, moment ${i + 1}`}
              className="h-72 w-full rounded-2xl object-cover"
            />
            <p className="mt-3 text-center font-script text-xl text-blush">
              {p.caption}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

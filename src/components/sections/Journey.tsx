import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { content } from "@/content";
import { usePhotoModal } from "@/components/PhotoModal";
import { Maximize2, Sparkles } from "lucide-react";
import { useReducedMotion } from "@/lib/motion-prefs";

export function Journey() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDistance, setMaxDistance] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const { openPhoto } = usePhotoModal();
  const reduced = useReducedMotion();
  const photos = content.journey.photos;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Calculate the exact horizontal translation needed so card 1 starts in view and the last card stops in view (no loop)
  useEffect(() => {
    const updateDistance = () => {
      if (trackRef.current) {
        const trackScrollWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        // Travel distance brings the last card perfectly into view with right padding
        const paddingRight = windowWidth < 640 ? 32 : 80;
        const dist = Math.max(0, trackScrollWidth - windowWidth + paddingRight);
        setMaxDistance(dist);
      }
    };

    updateDistance();
    const timeout = setTimeout(updateDistance, 300);
    window.addEventListener("resize", updateDistance);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateDistance);
    };
  }, [photos]);

  // Update active photo index based on scroll progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const idx = Math.min(
        photos.length - 1,
        Math.max(0, Math.round(latest * (photos.length - 1)))
      );
      setCurrentIdx(idx);
    });
    return () => unsubscribe();
  }, [smoothProgress, photos.length]);

  const x = useTransform(smoothProgress, [0, 1], [0, -maxDistance]);

  const handleOpenPhoto = (index: number) => {
    const photo = photos[index];
    if (!photo) return;
    openPhoto({
      src: photo.src,
      alt: photo.caption,
      title: `Our Journey — Moment ${index + 1}`,
      caption: photo.caption,
      badge: `Photo ${index + 1} of ${photos.length}`,
    });
  };

  return (
    <section
      ref={targetRef}
      className="relative h-[320vh] w-full bg-midnight/30"
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden py-8 sm:py-10">
        {/* Background Ambient Glow */}
        <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(251,164,184,0.18)_0%,rgba(240,181,166,0.06)_50%,transparent_75%)] blur-3xl" />

        {/* Section Header */}
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blush/30 bg-blush/10 px-3.5 py-1 text-xs font-medium text-blush shadow-[0_0_20px_rgba(251,164,184,0.2)] mb-3">
            <Sparkles className="size-3.5 animate-pulse text-rosegold" />
            <span>Our Unforgettable Memories</span>
          </div>

          <h2 className="gold-text font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {content.journey.title}
          </h2>
          <p className="mt-2 font-body text-xs sm:text-sm text-cream/70">
            {content.journey.subtitle}
          </p>
        </div>

        {/* Horizontal Scrolling Card Track */}
        <div className="relative z-10 my-auto flex w-full items-center overflow-visible">
          <motion.div
            ref={trackRef}
            style={{ x: reduced ? 0 : x }}
            className="flex gap-6 sm:gap-8 px-6 sm:px-16 md:px-24"
          >
            {photos.map((photo, i) => {
              const isCurrent = i === currentIdx;
              const photoSrc = photo.src.startsWith("/")
                ? photo.src
                : `/images/${photo.src}`;

              return (
                <motion.div
                  key={i}
                  onClick={() => handleOpenPhoto(i)}
                  className="group relative flex-shrink-0 cursor-pointer"
                  whileHover={{ scale: 1.025, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`glass-card relative h-[360px] w-[260px] sm:h-[420px] sm:w-[310px] md:h-[450px] md:w-[330px] overflow-hidden rounded-3xl p-3 sm:p-3.5 transition-all duration-500 ${
                      isCurrent
                        ? "border-2 border-blush/80 shadow-[0_15px_50px_rgba(251,164,184,0.35)] ring-2 ring-blush/50"
                        : "border border-rosegold/30 shadow-[0_10px_35px_rgba(13,6,20,0.8)] opacity-90 group-hover:opacity-100 group-hover:border-blush/60"
                    }`}
                  >
                    {/* Inner Image Container */}
                    <div className="relative size-full overflow-hidden rounded-2xl bg-black/40">
                      <img
                        src={photoSrc}
                        alt={photo.caption}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Top Counter Badge */}
                      <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-midnight/75 px-3 py-1 text-[11px] font-semibold tracking-wider text-rosegold backdrop-blur-md">
                        {String(i + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                      </div>

                      {/* Expand Button in top-right */}
                      <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full border border-white/20 bg-midnight/75 text-cream/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Maximize2 className="size-3.5 text-blush" />
                      </div>

                      {/* Bottom Vignette & Caption */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/95 via-midnight/60 to-transparent p-4 sm:p-5 pt-12">
                        <p className="font-display text-sm sm:text-base font-medium leading-snug text-cream drop-shadow-md">
                          {photo.caption}
                        </p>
                        <p className="mt-2 flex items-center gap-1 font-body text-[10px] sm:text-[11px] font-semibold tracking-widest text-rosegold/80 uppercase">
                          <span>Tap to view full photo</span>
                          <span>✨</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Footer Progress & Indicator Bar */}
        <div className="relative z-10 mx-auto w-full max-w-md px-6 text-center">
          {/* Progress bar line */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10 border border-white/10">
            <motion.div
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
              className="h-full w-full rounded-full bg-gradient-to-r from-blush via-rosegold to-blush shadow-[0_0_12px_rgba(251,164,184,0.8)]"
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] tracking-wider text-cream/60">
            <span>Scroll vertically to travel</span>
            <span className="font-medium text-rosegold">
              Moment {currentIdx + 1} of {photos.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/content";
import { Reveal, Section, SectionTitle } from "@/components/Section";
import { CircularCarousel } from "@/components/CircularCarousel";

export function Journey() {
  const [activeIndex, setActiveIndex] = useState(0);
  const photos = content.journey.photos;

  const carouselItems = photos.map((p) => ({
    image: p.src,
    caption: p.caption,
    alt: p.caption,
  }));

  const activePhoto = photos[activeIndex] || photos[0];

  return (
    <Section>
      <SectionTitle>{content.journey.title}</SectionTitle>
      <Reveal>
        <p className="mb-6 font-body text-sm text-cream/70 text-center px-4">
          {content.journey.subtitle}
        </p>
      </Reveal>

      {/* React Bits Circular Carousel in 3D */}
      <div className="w-full flex justify-center items-center py-2">
        <CircularCarousel
          items={carouselItems}
          bend={0.35}
          depthFade={0.7}
          fadeColor="rgba(0,0,0,0.7)"
          innerShade={0.35}
          tilt={-2}
          perspective={1000}
          radius={250}
          itemWidth={190}
          itemHeight={270}
          onFocus={(idx) => setActiveIndex(idx)}
          className="max-w-md"
        />
      </div>

      {/* Active Photo Caption */}
      <div className="mt-4 min-h-16 max-w-sm px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <p className="font-script text-2xl sm:text-3xl text-blush text-glow">
              {activePhoto.caption}
            </p>
            <p className="mt-1 font-body text-[11px] tracking-[0.25em] text-rosegold/70 uppercase">
              Moment {activeIndex + 1} of {photos.length} · Tap or drag to explore
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

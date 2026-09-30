import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/content";
import { Reveal, Section, SectionTitle } from "@/components/Section";
import { CircularCarousel } from "@/components/CircularCarousel";
import { usePhotoModal } from "@/components/PhotoModal";
import { Maximize2 } from "lucide-react";

export function Journey() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { openPhoto } = usePhotoModal();
  const photos = content.journey.photos;

  const carouselItems = photos.map((p) => ({
    image: p.src,
    caption: p.caption,
    alt: p.caption,
  }));

  const activePhoto = photos[activeIndex] || photos[0];

  const handleOpenActive = (index: number = activeIndex) => {
    const photo = photos[index] || photos[0];
    openPhoto({
      src: photo.src,
      alt: photo.caption,
      title: `Our Journey — Moment ${index + 1}`,
      caption: photo.caption,
      badge: `Photo ${index + 1} of ${photos.length}`,
    });
  };

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
          bend={0.88}
          depthFade={0.6}
          fadeColor="rgba(0,0,0,0.7)"
          innerShade={0.25}
          tilt={-4}
          perspective={1300}
          radius={340}
          itemWidth={230}
          itemHeight={330}
          onFocus={(idx) => setActiveIndex(idx)}
          onItemClick={(_item, idx) => handleOpenActive(idx)}
          className="w-full max-w-5xl"
        />
      </div>

      {/* Active Photo Caption & Fullscreen Trigger */}
      <div className="mt-4 min-h-16 max-w-sm px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            onClick={() => handleOpenActive(activeIndex)}
            className="cursor-pointer group"
          >
            <p className="font-script text-2xl sm:text-3xl text-blush text-glow group-hover:scale-105 transition-transform duration-200">
              {activePhoto.caption}
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 font-body text-[11px] tracking-[0.2em] text-rosegold/80 uppercase group-hover:text-blush transition-colors">
              <Maximize2 className="size-3 text-blush" />
              Moment {activeIndex + 1} of {photos.length} · Tap to expand
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

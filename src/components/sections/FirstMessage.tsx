import { motion } from "framer-motion";
import { content } from "@/content";
import { Reveal, Section, SectionTitle } from "@/components/Section";
import { SmartImage } from "@/components/SmartImage";
import { Clock, Sparkles } from "lucide-react";
import { usePhotoModal } from "@/components/PhotoModal";

export function FirstMessage() {
  const c = content.firstMessageSection;
  const { openPhoto } = usePhotoModal();

  const handleOpenScreenshot = () => {
    openPhoto({
      src: c.image,
      alt: "Where it all began — 12:38 AM",
      title: "Where it all began",
      caption: c.caption,
      badge: c.timestamp,
    });
  };

  return (
    <Section>
      <SectionTitle>{c.title}</SectionTitle>

      {/* Desktop Split Layout & Mobile Stacked Layout */}
      <div className="mt-4 grid w-full max-w-4xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:gap-12">
        {/* Left Side: Screenshot Glass Card */}
        <motion.div
          initial={{ opacity: 0, rotateX: 16, rotateZ: -3, y: 30 }}
          whileInView={{ opacity: 1, rotateX: 0, rotateZ: 0, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <div
            onClick={handleOpenScreenshot}
            className="glass-card relative w-full max-w-sm overflow-hidden rounded-3xl p-3.5 shadow-[0_15px_50px_rgba(13,6,20,0.85)] border border-blush/30 hover:border-blush/70 transition-all duration-300 cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-2xl bg-black/40">
              <SmartImage
                name={c.image}
                alt="Our first message at 12:38 AM"
                modalTitle="Where it all began — 12:38 AM"
                modalCaption={c.caption}
                modalBadge={c.timestamp}
                className="h-80 sm:h-96 w-full object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
            </div>

            {/* Timestamp Badge below image */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-blush text-sm">✨</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rosegold/30 bg-rosegold/10 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-rosegold uppercase">
                <Clock className="size-3 text-blush" />
                {c.timestamp}
              </span>
              <span className="text-blush text-sm">✨</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Formatted Glass Card with Timestamp Badge & Gujarati Caption */}
        <Reveal delay={0.2} className="flex flex-col justify-center">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-rosegold/30 shadow-[0_10px_40px_rgba(13,6,20,0.7)] backdrop-blur-xl">
            {/* Timestamp Header Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blush/40 bg-blush/10 px-3.5 py-1 text-xs font-medium text-blush">
              <Sparkles className="size-3.5 animate-pulse text-rosegold" />
              <span>12:38 AM · The Beginning</span>
            </div>

            {/* Exact Gujarati Caption in formatted glass card */}
            <div className="font-display text-base sm:text-lg leading-relaxed text-cream font-medium whitespace-pre-line space-y-2">
              {c.caption}
            </div>

            {/* English sentimental note */}
            <p className="mt-5 font-script text-2xl sm:text-3xl text-blush text-glow">
              "{c.fromMe}"
            </p>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-rosegold/70">
              <span className="font-body tracking-wider uppercase">Parthi's Birthday</span>
              <span className="font-body tracking-widest">3 DEC 2025</span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

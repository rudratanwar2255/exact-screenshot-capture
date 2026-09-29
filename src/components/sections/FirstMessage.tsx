import { motion } from "framer-motion";
import { content } from "@/content";
import { Reveal, Section, SectionTitle } from "@/components/Section";
import { SmartImage } from "@/components/SmartImage";

export function FirstMessage() {
  const c = content.firstMessageSection;

  return (
    <Section>
      <SectionTitle>{c.title}</SectionTitle>

      <motion.div
        initial={{ opacity: 0, rotateX: 18, rotateZ: -4, y: 40 }}
        whileInView={{ opacity: 1, rotateX: 6, rotateZ: -2, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 900 }}
        className="glass-card w-full max-w-xs rounded-3xl p-3.5 shadow-[0_15px_50px_rgba(13,6,20,0.8)] border border-blush/30"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <SmartImage
            name={c.image}
            alt="Our first message"
            className="h-80 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent pointer-events-none" />
        </div>

        <motion.div
          animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.02, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="mt-3 flex items-center justify-center gap-2"
        >
          <span className="text-blush text-sm">✨</span>
          <p className="text-glow font-body text-xs tracking-[0.2em] text-rosegold font-semibold uppercase">
            {c.timestamp}
          </p>
          <span className="text-blush text-sm">✨</span>
        </motion.div>
      </motion.div>

      <Reveal delay={0.25} className="mt-8 max-w-sm px-4 text-center">
        <p className="font-display text-lg sm:text-xl leading-relaxed text-cream/95">
          {c.caption}
        </p>
        <p className="mt-4 font-script text-2xl sm:text-3xl text-blush text-glow">
          "{c.fromMe}"
        </p>
      </Reveal>
    </Section>
  );
}

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
        initial={{ opacity: 0, rotateX: 18, rotateZ: -6, y: 40 }}
        whileInView={{ opacity: 1, rotateX: 8, rotateZ: -3, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 900 }}
        className="glass-card w-full max-w-xs rounded-3xl p-3"
      >
        <SmartImage
          name={c.image}
          alt="Our first message"
          className="h-72 w-full rounded-2xl object-cover"
        />
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="text-glow mt-3 text-center font-body text-xs tracking-[0.18em] text-rosegold uppercase"
        >
          {c.timestamp}
        </motion.p>
      </motion.div>

      <Reveal delay={0.25} className="mt-8 max-w-sm text-center">
        <p className="font-display text-lg leading-relaxed text-cream/90">
          {c.caption}
        </p>
        <p className="mt-4 font-script text-2xl text-blush">{c.fromMe}</p>
      </Reveal>
    </Section>
  );
}

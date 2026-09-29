import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { content } from "@/content";
import { Section, SectionTitle } from "@/components/Section";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section>
      <SectionTitle>{content.timeline.title}</SectionTitle>

      <div ref={ref} className="relative w-full max-w-sm pl-12">
        <div className="absolute top-2 bottom-2 left-[22px] w-px bg-cream/15" />
        <motion.div
          style={{ height }}
          className="absolute top-2 left-[22px] w-px bg-gradient-to-b from-blush to-rosegold shadow-[0_0_14px_2px_rgba(243,198,165,0.55)]"
        />

        {content.timeline.stars.map((star, i) => (
          <motion.div
            key={star.date}
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="relative mb-14 last:mb-0"
          >
            <motion.span
              animate={{ scale: [1, 1.25, 1], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
              className="absolute top-0 -left-[38px] text-xl"
              style={{ filter: "drop-shadow(0 0 10px rgba(243,198,165,0.8))" }}
            >
              ✦
            </motion.span>
            <p className="font-body text-xs tracking-[0.22em] text-rosegold uppercase">
              {star.date}
            </p>
            <p className="mt-1 font-display text-xl text-cream">{star.label}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

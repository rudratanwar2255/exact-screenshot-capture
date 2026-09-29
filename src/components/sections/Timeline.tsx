import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { content } from "@/content";
import { Section, SectionTitle } from "@/components/Section";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 45%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section>
      <SectionTitle>{content.timeline.title}</SectionTitle>

      <div ref={ref} className="relative w-full max-w-sm px-4 pl-12 sm:pl-16">
        {/* Background track */}
        <div className="absolute top-3 bottom-3 left-[22px] sm:left-[30px] w-[2px] bg-cream/10 rounded-full" />
        
        {/* Glowing animated scroll line */}
        <motion.div
          style={{ height }}
          className="absolute top-3 left-[22px] sm:left-[30px] w-[2px] bg-gradient-to-b from-blush via-rosegold to-cream shadow-[0_0_16px_3px_rgba(251,164,184,0.7)] rounded-full"
        />

        {content.timeline.stars.map((star, i) => (
          <motion.div
            key={star.date}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="relative mb-14 last:mb-0"
          >
            {/* Glowing Star Icon */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
              className="absolute top-0 -left-[38px] sm:-left-[46px] flex items-center justify-center size-8 rounded-full bg-midnight/90 border border-blush/40 text-rosegold text-base"
              style={{ filter: "drop-shadow(0 0 10px rgba(251,164,184,0.7))" }}
            >
              ✦
            </motion.div>

            {/* Content */}
            <div className="glass-card rounded-2xl p-4 transition-all duration-300 hover:border-blush/40">
              <p className="font-body text-xs tracking-[0.22em] text-rosegold font-semibold uppercase">
                {star.date}
              </p>
              <p className="mt-1 font-display text-xl text-cream font-medium">
                {star.label}
              </p>
              {star.sub && (
                <p className="mt-1 font-body text-xs text-muted-foreground">
                  {star.sub}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

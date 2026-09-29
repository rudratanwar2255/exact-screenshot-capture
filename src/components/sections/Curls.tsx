import { motion } from "framer-motion";
import { content } from "@/content";
import { Reveal, Section, SectionTitle } from "@/components/Section";
import { SmartImage } from "@/components/SmartImage";

const SPIRAL =
  "M160 40 C 100 40, 70 90, 110 120 C 150 150, 60 170, 90 210 C 120 250, 210 230, 200 190";

export function Curls() {
  return (
    <Section>
      <SectionTitle>{content.curls.title}</SectionTitle>

      <div className="relative">
        <svg viewBox="0 0 300 280" className="h-56 w-64">
          <motion.path
            d={SPIRAL}
            fill="none"
            stroke="oklch(0.85 0.08 190)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.2 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 8px rgba(247,185,200,0.7))" }}
          />
        </svg>

        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            style={{ left: `${18 + i * 22}%`, top: `${20 + (i % 2) * 45}%` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1, y: [-4, -18, -4] }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              delay: 2 + i * 0.25,
              duration: 1,
              y: { duration: 3, repeat: Infinity, delay: 2.4 + i * 0.25 },
            }}
          >
            💗
          </motion.span>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-6 max-w-sm text-center">
        <p className="font-display text-lg leading-relaxed text-cream/90">
          {content.curls.text}
        </p>
      </Reveal>

      <Reveal delay={0.35}>
        <div className="glass-card mt-8 rounded-3xl p-2.5">
          <SmartImage
            name={content.curls.image}
            alt="Anup"
            className="size-40 rounded-2xl object-cover"
          />
        </div>
      </Reveal>
    </Section>
  );
}

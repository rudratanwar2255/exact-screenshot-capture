import { motion } from "framer-motion";
import { content } from "@/content";
import { Section, SectionTitle } from "@/components/Section";
import { SmartImage } from "@/components/SmartImage";
import { useReducedMotion } from "@/lib/motion-prefs";

export function Bracelet() {
  const reduced = useReducedMotion();

  return (
    <Section>
      <div className="pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.85_0.08_48_/_22%),transparent_70%)] blur-2xl" />

      <SectionTitle>{content.bracelet.title}</SectionTitle>

      <div className="relative" style={{ perspective: 1000 }}>
        <motion.div
          animate={reduced ? {} : { rotateY: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="glass-card size-56 overflow-hidden rounded-full p-2"
          style={{ transformStyle: "preserve-3d" }}
        >
          <SmartImage
            name={content.bracelet.image}
            alt="The bracelet"
            className="size-full rounded-full object-cover"
          />
        </motion.div>

        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-rosegold"
            style={{
              left: `${50 + 46 * Math.cos((i / 8) * Math.PI * 2)}%`,
              top: `${50 + 46 * Math.sin((i / 8) * Math.PI * 2)}%`,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
          >
            ✧
          </motion.span>
        ))}
      </div>

      <div className="mt-12 max-w-sm space-y-4 text-center">
        {content.bracelet.story.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: i * 0.45 }}
            className="font-display text-lg leading-relaxed text-cream/90"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </Section>
  );
}

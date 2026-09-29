import { motion } from "framer-motion";
import { content } from "@/content";
import { Section, SectionTitle } from "@/components/Section";
import { SmartImage } from "@/components/SmartImage";
import { useReducedMotion } from "@/lib/motion-prefs";

export function Bracelet() {
  const reduced = useReducedMotion();

  return (
    <Section>
      {/* Ambient Spotlight */}
      <div className="pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(251,164,184,0.25)_0%,rgba(240,181,166,0.1)_45%,transparent_70%)] blur-3xl" />

      <SectionTitle>{content.bracelet.title}</SectionTitle>

      {/* 3D Spotlight Pedestal */}
      <div className="relative mt-2 flex flex-col items-center" style={{ perspective: 1000 }}>
        {/* Sparkles orbiting */}
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-rosegold text-base pointer-events-none z-20"
            style={{
              left: `${50 + 44 * Math.cos((i / 8) * Math.PI * 2)}%`,
              top: `${42 + 40 * Math.sin((i / 8) * Math.PI * 2)}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.6, 1.3, 0.6],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              delay: i * 0.35,
              ease: "easeInOut",
            }}
          >
            ✧
          </motion.span>
        ))}

        {/* Floating rotating bracelet disc */}
        <motion.div
          animate={
            reduced
              ? {}
              : {
                  rotateY: [0, 360],
                  y: [0, -8, 0],
                }
          }
          transition={{
            rotateY: { duration: 18, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="glass-card relative z-10 size-60 sm:size-64 overflow-hidden rounded-full p-3 border-2 border-blush/40 shadow-[0_0_40px_rgba(251,164,184,0.35)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <SmartImage
            name={content.bracelet.image}
            alt="The bracelet charm"
            className="size-full rounded-full object-cover"
          />
        </motion.div>

        {/* Glowing Pedestal Base */}
        <div className="mt-4 h-5 w-44 rounded-[100%] bg-gradient-to-r from-transparent via-blush/40 to-transparent blur-[2px] shadow-[0_0_25px_rgba(251,164,184,0.6)]" />
      </div>

      {/* Line-by-line story reveal */}
      <div className="mt-10 max-w-sm space-y-4 px-4 text-center">
        {content.bracelet.story.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.85, delay: i * 0.4 }}
            className="font-display text-lg sm:text-xl leading-relaxed text-cream/95"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </Section>
  );
}

import { motion } from "framer-motion";
import { content } from "@/content";
import { Reveal, Section, SectionTitle } from "@/components/Section";
import { SmartImage } from "@/components/SmartImage";

const CURL_PATH =
  "M150,20 C190,40 210,90 170,120 C130,150 90,120 80,170 C70,220 130,240 180,210 C230,180 220,130 190,160 C160,190 170,230 200,240";

export function Curls() {
  return (
    <Section>
      <SectionTitle>{content.curls.title}</SectionTitle>

      {/* SVG Curl Path that draws itself and blooms into floating hearts */}
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 300 270" className="h-56 w-64 overflow-visible">
          <motion.path
            d={CURL_PATH}
            fill="none"
            stroke="oklch(0.85 0.1 350)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.3 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 2.8, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 12px rgba(251,164,184,0.8))" }}
          />
        </svg>

        {/* Blooming Hearts */}
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute text-2xl select-none pointer-events-none"
            style={{
              left: `${22 + i * 20}%`,
              top: `${25 + (i % 2) * 35}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1, y: [-4, -16, -4] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              delay: 2.2 + i * 0.25,
              duration: 0.9,
              y: { duration: 3, repeat: Infinity, delay: 2.6 + i * 0.25 },
            }}
          >
            💖
          </motion.span>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-4 max-w-sm px-4 text-center">
        <p className="font-display text-lg sm:text-xl leading-relaxed text-cream/95">
          {content.curls.text}
        </p>
      </Reveal>

      {/* Anup's photo with sparkle effect */}
      <Reveal delay={0.35}>
        <div className="relative mt-8">
          <div className="glass-card relative z-10 rounded-3xl p-3 shadow-[0_10px_35px_rgba(13,6,20,0.7)] border border-blush/30">
            <SmartImage
              name={content.curls.image}
              alt="Anup's curls"
              className="size-44 sm:size-48 rounded-2xl object-cover"
            />
          </div>

          {/* Sparkles around photo */}
          {[-1, 1].map((dir, idx) => (
            <motion.span
              key={idx}
              animate={{ opacity: [0, 1, 0], scale: [0.7, 1.3, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.8 }}
              className="absolute text-rosegold text-xl pointer-events-none"
              style={{
                top: idx === 0 ? "-10px" : "auto",
                bottom: idx === 1 ? "-10px" : "auto",
                left: dir === -1 ? "-10px" : "auto",
                right: dir === 1 ? "-10px" : "auto",
                filter: "drop-shadow(0 0 8px rgba(240,181,166,0.8))",
              }}
            >
              ✨
            </motion.span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

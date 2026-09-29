import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { content } from "@/content";
import { Section, SectionTitle } from "@/components/Section";
import { useReducedMotion } from "@/lib/motion-prefs";

function FloatingHeartsBlast() {
  const pieces = ["💖", "💕", "✨", "💗", "🌸", "💘", "🌹", "💌"];
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {[...Array(35)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl sm:text-3xl"
          initial={{
            x: "50vw",
            y: "75vh",
            opacity: 1,
            scale: 0.3,
          }}
          animate={{
            x: `${10 + Math.random() * 80}vw`,
            y: `${-10 + Math.random() * 45}vh`,
            opacity: [1, 1, 0],
            scale: [0.3, 1.4, 1],
            rotate: Math.random() * 360 - 180,
          }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            ease: "easeOut",
          }}
        >
          {pieces[i % pieces.length]}
        </motion.span>
      ))}
    </div>
  );
}

export function Letter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState("");
  const [boom, setBoom] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setTyped(content.letter.body);
      return;
    }
    let i = 0;
    const body = content.letter.body;
    const id = setInterval(() => {
      i += 1;
      setTyped(body.slice(0, i));
      if (i >= body.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [inView, reduced]);

  const triggerExplosion = () => {
    setBoom(true);

    // Trigger canvas confetti in romantic rose gold / pink palette
    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.75 },
        colors: ["#fba4b8", "#f0b5a6", "#ffffff", "#ffd1dc", "#e5a9a9"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 80,
          origin: { x: 0.1, y: 0.7 },
          colors: ["#fba4b8", "#f0b5a6", "#ffffff"],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 80,
          origin: { x: 0.9, y: 0.7 },
          colors: ["#fba4b8", "#f0b5a6", "#ffffff"],
        });
      }, 250);
    } catch {
      // Fallback handled by FloatingHeartsBlast
    }
  };

  return (
    <Section>
      <SectionTitle>{content.letter.title}</SectionTitle>

      {/* Love letter card with parchment styling and typewriter effect */}
      <div
        ref={ref}
        className="glass-card w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-[0_15px_50px_rgba(13,6,20,0.85)] border border-blush/30"
      >
        <p className="min-h-52 font-display text-base sm:text-lg leading-relaxed whitespace-pre-line text-cream/95">
          {typed}
          {!reduced && typed.length < content.letter.body.length && (
            <span className="animate-pulse text-blush font-bold ml-0.5">|</span>
          )}
        </p>
      </div>

      {/* Button to trigger celebration */}
      <button
        onClick={triggerExplosion}
        className="glass-card mt-10 rounded-full px-8 py-3.5 font-body text-sm tracking-[0.2em] text-cream uppercase font-semibold transition-all duration-300 hover:scale-105 active:scale-95 border-blush/40 hover:border-blush shadow-[0_0_25px_rgba(251,164,184,0.35)] cursor-pointer"
      >
        {content.letter.button}
      </button>

      {boom && <FloatingHeartsBlast />}

      {/* Final line reveal */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: boom ? 1 : 0, y: boom ? 0 : 15 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="text-glow mt-10 max-w-sm px-4 text-center font-script text-3xl sm:text-4xl text-blush"
      >
        {content.letter.finale}
      </motion.p>
    </Section>
  );
}

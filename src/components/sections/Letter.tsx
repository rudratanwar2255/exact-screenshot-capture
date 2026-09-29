import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { content } from "@/content";
import { Section, SectionTitle } from "@/components/Section";
import { useReducedMotion } from "@/lib/motion-prefs";

function Confetti() {
  const pieces = ["💖", "💕", "✨", "💗", "🌸", "💘"];
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {[...Array(40)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl"
          initial={{ x: "50vw", y: "60vh", opacity: 1, scale: 0.4 }}
          animate={{
            x: `${Math.random() * 100}vw`,
            y: `${-10 + Math.random() * 30}vh`,
            opacity: 0,
            scale: 1.2,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 2.2 + Math.random() * 1.4, ease: "easeOut" }}
        >
          {pieces[i % pieces.length]}
        </motion.span>
      ))}
    </div>
  );
}

export function Letter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
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
    const id = setInterval(() => {
      i += 1;
      setTyped(content.letter.body.slice(0, i));
      if (i >= content.letter.body.length) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, [inView, reduced]);

  useEffect(() => {
    if (!boom) return;
    const id = setTimeout(() => setBoom(false), 4000);
    return () => clearTimeout(id);
  }, [boom]);

  return (
    <Section>
      <SectionTitle>{content.letter.title}</SectionTitle>

      <div ref={ref} className="glass-card w-full max-w-md rounded-3xl p-6">
        <p className="min-h-40 font-display text-base leading-relaxed whitespace-pre-line text-cream/92">
          {typed}
          {!reduced && typed.length < content.letter.body.length && (
            <span className="animate-pulse">|</span>
          )}
        </p>
      </div>

      <button
        onClick={() => setBoom(true)}
        className="glass-card mt-10 rounded-full px-8 py-3 font-body text-sm tracking-[0.18em] text-cream uppercase transition-transform active:scale-95"
      >
        {content.letter.button}
      </button>

      {boom && <Confetti />}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: boom ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="text-glow mt-10 max-w-sm text-center font-script text-3xl text-blush"
      >
        {content.letter.finale}
      </motion.p>
    </Section>
  );
}

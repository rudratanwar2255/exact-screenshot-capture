import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { content } from "@/content";
import { Section, SectionTitle } from "@/components/Section";
import { X, Sparkles, Heart } from "lucide-react";

function FloatingHeartsBlast() {
  const pieces = ["💖", "💕", "✨", "💗", "🌸", "💘", "🌹", "💌", "💋", "🫶🏻", "🧿", "♾️"];
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {[...Array(40)].map((_, i) => (
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
            duration: 2.8 + Math.random() * 1.5,
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
  const [modalOpen, setModalOpen] = useState(false);
  const [boom, setBoom] = useState(false);

  const openLetterModal = () => {
    setModalOpen(true);
    setBoom(true);

    try {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
        colors: ["#fba4b8", "#f0b5a6", "#ffffff", "#ffd1dc", "#e5a9a9"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 80,
          origin: { x: 0.1, y: 0.6 },
          colors: ["#fba4b8", "#f0b5a6", "#ffffff"],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 80,
          origin: { x: 0.9, y: 0.6 },
          colors: ["#fba4b8", "#f0b5a6", "#ffffff"],
        });
      }, 300);
    } catch {
      // Confetti fallback
    }
  };

  const closeLetterModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLetterModal();
    };
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  return (
    <Section>
      <SectionTitle>{content.letter.title}</SectionTitle>

      {/* Love Letter Envelope Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card relative w-full max-w-md rounded-3xl p-6 sm:p-8 text-center shadow-[0_15px_50px_rgba(13,6,20,0.85)] border border-blush/30"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-blush/15 border border-blush/40 shadow-[0_0_25px_rgba(251,164,184,0.4)] mb-4 animate-bounce">
          <span className="text-3xl">💌</span>
        </div>

        <h3 className="font-display text-2xl font-bold text-cream">
          A Letter For Parthi
        </h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-cream/80">
          {content.letter.teaser || "Every little feeling, memory, and confession from the very start to today…"}
        </p>

        {/* Click here button */}
        <button
          onClick={openLetterModal}
          className="glass-card mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-body text-sm tracking-[0.2em] text-cream uppercase font-semibold transition-all duration-300 hover:scale-105 active:scale-95 border-blush/50 hover:border-blush shadow-[0_0_30px_rgba(251,164,184,0.45)] cursor-pointer bg-gradient-to-r from-blush/20 to-rosegold/20"
        >
          <Sparkles className="size-4 text-blush animate-pulse" />
          <span>{content.letter.button}</span>
          <Heart className="size-4 text-blush fill-blush animate-pulse" />
        </button>
      </motion.div>

      {boom && <FloatingHeartsBlast />}

      {/* Full Letter Modal with Lighter, Bright Background Photo */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl"
            onClick={closeLetterModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border-2 border-rosegold/70 bg-black/50 shadow-[0_0_80px_rgba(240,181,166,0.4)]"
            >
              {/* Couple Background Photo - Clear & Bright */}
              <div className="pointer-events-none absolute inset-0 z-0">
                <img
                  src="/images/letter-bg.jpg"
                  alt="Anup & Parthi"
                  className="size-full object-cover object-[center_15%] opacity-95 filter brightness-105"
                />
                {/* Ultra light soft tint only for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50" />
              </div>

              {/* Close Button */}
              <button
                onClick={closeLetterModal}
                aria-label="Close letter"
                className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-white/30 hover:text-white active:scale-95 border border-white/30 cursor-pointer shadow-xl"
              >
                <X className="size-5 text-rosegold" />
              </button>

              {/* Modal Header */}
              <div className="relative z-10 border-b border-white/20 p-5 sm:p-6 pb-4 text-center backdrop-blur-xs bg-black/20">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-rosegold/40 bg-black/40 px-3.5 py-1 text-[11px] font-semibold tracking-[0.2em] text-rosegold uppercase mb-2 shadow-md">
                  <Sparkles className="size-3 text-blush" />
                  Our Complete Love Story
                  <Sparkles className="size-3 text-blush" />
                </span>
                <h2 className="font-script text-4xl sm:text-5xl text-blush text-glow drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  PARTHI ♡
                </h2>
              </div>

              {/* Scrollable Letter Content with Light Frosted Backdrop */}
              <div className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-6 py-4 scrollbar-thin scrollbar-thumb-blush/70 scrollbar-track-transparent">
                <div className="rounded-2xl bg-black/30 backdrop-blur-[3px] p-5 sm:p-7 border border-white/15 shadow-xl space-y-4 font-display text-base sm:text-lg leading-relaxed text-white font-medium whitespace-pre-line text-left drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                  {content.letter.body}
                </div>

                <div className="mt-6 pt-4 pb-3 text-center">
                  <div className="inline-block rounded-full bg-black/40 backdrop-blur-md px-6 py-2 border border-rosegold/40 shadow-lg">
                    <p className="font-script text-3xl sm:text-4xl text-blush text-glow drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {content.letter.finale}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom finale note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-glow mt-10 max-w-sm px-4 text-center font-script text-3xl sm:text-4xl text-blush"
      >
        {content.letter.finale}
      </motion.p>
    </Section>
  );
}

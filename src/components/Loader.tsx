import { motion } from "framer-motion";
import { content } from "@/content";
import { Sparkles } from "lucide-react";

export function TulipSvg({ className = "w-32 h-32", glowing = true }: { className?: string; glowing?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glowing && (
        <div className="absolute inset-0 rounded-full bg-blush/25 blur-xl pointer-events-none scale-125" />
      )}
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_18px_rgba(251,164,184,0.65)]"
      >
        <defs>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>
          <linearGradient id="petalBack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="50%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#fda4af" />
          </linearGradient>
          <linearGradient id="petalCenter" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="40%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
          <linearGradient id="petalFrontL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fecdd3" />
            <stop offset="60%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <linearGradient id="petalFrontR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe4e6" />
            <stop offset="60%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
        </defs>

        {/* Stem */}
        <path
          d="M 100 130 Q 98 180 102 230"
          stroke="url(#stemGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Left Leaf */}
        <path
          d="M 100 190 Q 60 170 65 135 Q 85 160 100 175 Z"
          fill="url(#leafGrad)"
          opacity="0.9"
        />

        {/* Right Leaf */}
        <path
          d="M 101 175 Q 140 155 135 120 Q 115 145 101 165 Z"
          fill="url(#leafGrad)"
          opacity="0.9"
        />

        {/* Tulip Petals */}
        {/* Back Petal / Center Core */}
        <path
          d="M 100 35 C 75 40 70 85 100 130 C 130 85 125 40 100 35 Z"
          fill="url(#petalBack)"
        />

        {/* Left Petal */}
        <path
          d="M 100 130 C 65 120 45 75 70 45 C 85 55 95 90 100 130 Z"
          fill="url(#petalFrontL)"
          opacity="0.96"
        />

        {/* Right Petal */}
        <path
          d="M 100 130 C 135 120 155 75 130 45 C 115 55 105 90 100 130 Z"
          fill="url(#petalFrontR)"
          opacity="0.96"
        />

        {/* Front Center Petal Highlight */}
        <path
          d="M 100 60 C 88 75 88 115 100 130 C 112 115 112 75 100 60 Z"
          fill="url(#petalCenter)"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: [1, 1, 0],
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], times: [0, 0.7, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0d0614]"
    >
      {/* Expanding Floral Veil Background on Exit */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        exit={{
          scale: [0.8, 35],
          opacity: [0.5, 1, 0],
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(251,164,184,0.95)_0%,rgba(240,181,166,0.85)_40%,rgba(13,6,20,0.95)_75%)] blur-2xl"
      />

      {/* Floating Sparkles around Flower */}
      <div className="relative flex flex-col items-center justify-center">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-rosegold text-sm pointer-events-none z-10"
            style={{
              left: `${50 + 42 * Math.cos((i / 6) * Math.PI * 2)}%`,
              top: `${40 + 38 * Math.sin((i / 6) * Math.PI * 2)}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.6, 1.3, 0.6],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: i * 0.35,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.span>
        ))}

        {/* Medium-sized Tulip Flower Blooming & Scaling to cover screen on exit */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 15 }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: [1, 32],
            opacity: [1, 1, 0],
            rotate: [0, -6],
          }}
          transition={{
            scale: {
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            exit: {
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="relative z-20 flex size-32 items-center justify-center"
        >
          <TulipSvg className="size-full" glowing={true} />
        </motion.div>

        {/* Glowing Pedestal under tulip */}
        <motion.div
          animate={{
            opacity: [0.4, 0.9, 0.4],
            scale: [0.9, 1.15, 0.9],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-2 h-4 w-28 rounded-[100%] bg-gradient-to-r from-transparent via-blush/60 to-transparent blur-[3px] shadow-[0_0_30px_rgba(251,164,184,0.8)]"
        />
      </div>

      {/* Romantic Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mt-8 flex flex-col items-center gap-2 text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-blush/30 bg-blush/10 px-4 py-1 text-xs font-medium text-blush shadow-[0_0_20px_rgba(251,164,184,0.2)]">
          <Sparkles className="size-3.5 animate-pulse text-rosegold" />
          <span>A story blooming for Parthi 🌷</span>
        </div>

        <p className="font-display text-sm tracking-[0.25em] text-cream/80 uppercase font-medium">
          {content.loading}
        </p>
      </motion.div>
    </motion.div>
  );
}

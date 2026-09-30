import { motion } from "framer-motion";
import { content } from "@/content";
import { Sparkles } from "lucide-react";

export function TulipSvg({
  className = "w-24 h-32",
  glowing = true,
}: {
  className?: string;
  glowing?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible`}
      style={
        glowing
          ? {
              filter:
                "drop-shadow(0 0 20px rgba(251, 164, 184, 0.65)) drop-shadow(0 0 40px rgba(240, 181, 166, 0.4))",
            }
          : undefined
      }
    >
      <defs>
        <linearGradient id="loaderTulipMain" x1="50" y1="10" x2="50" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffd1dc" />
          <stop offset="40%" stopColor="#fba4b8" />
          <stop offset="100%" stopColor="#e57399" />
        </linearGradient>

        <linearGradient id="loaderTulipLeft" x1="25" y1="15" x2="45" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffe4ea" />
          <stop offset="50%" stopColor="#f89cb1" />
          <stop offset="100%" stopColor="#d95d85" />
        </linearGradient>

        <linearGradient id="loaderTulipRight" x1="75" y1="15" x2="55" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffe4ea" />
          <stop offset="50%" stopColor="#f89cb1" />
          <stop offset="100%" stopColor="#c74d75" />
        </linearGradient>

        <linearGradient id="loaderTulipStem" x1="50" y1="65" x2="50" y2="125" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#88c0a0" />
          <stop offset="60%" stopColor="#629e7c" />
          <stop offset="100%" stopColor="#437759" />
        </linearGradient>

        <linearGradient id="loaderTulipLeaf" x1="30" y1="80" x2="15" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9dd4b5" />
          <stop offset="70%" stopColor="#629e7c" />
          <stop offset="100%" stopColor="#3d6c50" />
        </linearGradient>
      </defs>

      {/* Stem */}
      <path
        d="M50 68 C 50 85, 48 105, 50 125"
        stroke="url(#loaderTulipStem)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Left Leaf */}
      <path
        d="M49 98 C 30 92, 18 80, 16 65 C 22 78, 36 94, 49 104"
        fill="url(#loaderTulipLeaf)"
        opacity="0.92"
      />

      {/* Right Leaf */}
      <path
        d="M51 110 C 68 102, 80 88, 84 72 C 78 88, 64 105, 51 116"
        fill="url(#loaderTulipLeaf)"
        opacity="0.92"
      />

      {/* Back Core */}
      <ellipse cx="50" cy="38" rx="14" ry="24" fill="#d95d85" opacity="0.6" />

      {/* Left Petal */}
      <path
        d="M50 68 C 34 68, 22 52, 24 32 C 26 18, 38 12, 44 24 C 48 32, 50 50, 50 68 Z"
        fill="url(#loaderTulipLeft)"
      />

      {/* Right Petal */}
      <path
        d="M50 68 C 66 68, 78 52, 76 32 C 74 18, 62 12, 56 24 C 52 32, 50 50, 50 68 Z"
        fill="url(#loaderTulipRight)"
      />

      {/* Center Front Petal */}
      <path
        d="M50 70 C 37 70, 32 50, 36 30 C 40 14, 50 8, 50 8 C 50 8, 60 14, 64 30 C 68 50, 63 70, 50 70 Z"
        fill="url(#loaderTulipMain)"
      />
    </svg>
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

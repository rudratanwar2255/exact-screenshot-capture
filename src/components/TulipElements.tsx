import { motion } from "framer-motion";

/**
 * Detailed, romantic SVG Tulip Flower with layered petals, stem, and glowing gradients.
 */
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
        {/* Tulip Petal Gradients */}
        <linearGradient id="tulipMain" x1="50" y1="10" x2="50" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffd1dc" />
          <stop offset="40%" stopColor="#fba4b8" />
          <stop offset="100%" stopColor="#e57399" />
        </linearGradient>

        <linearGradient id="tulipLeft" x1="25" y1="15" x2="45" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffe4ea" />
          <stop offset="50%" stopColor="#f89cb1" />
          <stop offset="100%" stopColor="#d95d85" />
        </linearGradient>

        <linearGradient id="tulipRight" x1="75" y1="15" x2="55" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffe4ea" />
          <stop offset="50%" stopColor="#f89cb1" />
          <stop offset="100%" stopColor="#c74d75" />
        </linearGradient>

        <linearGradient id="tulipStem" x1="50" y1="65" x2="50" y2="125" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#88c0a0" />
          <stop offset="60%" stopColor="#629e7c" />
          <stop offset="100%" stopColor="#437759" />
        </linearGradient>

        <linearGradient id="tulipLeaf" x1="30" y1="80" x2="15" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9dd4b5" />
          <stop offset="70%" stopColor="#629e7c" />
          <stop offset="100%" stopColor="#3d6c50" />
        </linearGradient>

        <linearGradient id="tulipGlow" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fba4b8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Stem */}
      <path
        d="M50 68 C 50 85, 48 105, 50 125"
        stroke="url(#tulipStem)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Left Leaf */}
      <path
        d="M49 98 C 30 92, 18 80, 16 65 C 22 78, 36 94, 49 104"
        fill="url(#tulipLeaf)"
        opacity="0.92"
      />

      {/* Right Leaf */}
      <path
        d="M51 110 C 68 102, 80 88, 84 72 C 78 88, 64 105, 51 116"
        fill="url(#tulipLeaf)"
        opacity="0.92"
      />

      {/* Back Inner Petal / Core */}
      <ellipse cx="50" cy="38" rx="14" ry="24" fill="#d95d85" opacity="0.6" />

      {/* Left Petal */}
      <path
        d="M50 68 C 34 68, 22 52, 24 32 C 26 18, 38 12, 44 24 C 48 32, 50 50, 50 68 Z"
        fill="url(#tulipLeft)"
      />

      {/* Right Petal */}
      <path
        d="M50 68 C 66 68, 78 52, 76 32 C 74 18, 62 12, 56 24 C 52 32, 50 50, 50 68 Z"
        fill="url(#tulipRight)"
      />

      {/* Center Front Petal */}
      <path
        d="M50 70 C 37 70, 32 50, 36 30 C 40 14, 50 8, 50 8 C 50 8, 60 14, 64 30 C 68 50, 63 70, 50 70 Z"
        fill="url(#tulipMain)"
      />

      {/* Soft Specular Highlight on Center Petal */}
      <path
        d="M48 18 C 45 28, 44 45, 48 60 C 47 45, 48 28, 50 18 C 49 18, 48 18, 48 18 Z"
        fill="url(#tulipGlow)"
        opacity="0.75"
      />
    </svg>
  );
}

/**
 * Ambient floating tulip petals & blossoms drifting gently across background.
 */
export function FloatingTulipPetals({ count = 10 }: { count?: number }) {
  const petals = [
    { size: 24, delay: 0, x: "12vw", duration: 18, rotate: 25 },
    { size: 30, delay: 3, x: "82vw", duration: 22, rotate: -35 },
    { size: 20, delay: 6, x: "28vw", duration: 20, rotate: 45 },
    { size: 26, delay: 9, x: "68vw", duration: 24, rotate: -20 },
    { size: 32, delay: 4, x: "45vw", duration: 21, rotate: 15 },
    { size: 22, delay: 8, x: "92vw", duration: 19, rotate: -40 },
    { size: 28, delay: 11, x: "6vw", duration: 23, rotate: 30 },
    { size: 20, delay: 14, x: "55vw", duration: 25, rotate: -15 },
    { size: 25, delay: 2, x: "74vw", duration: 20, rotate: 50 },
    { size: 29, delay: 7, x: "36vw", duration: 22, rotate: -30 },
  ].slice(0, count);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: p.x, top: "-10vh" }}
          animate={{
            y: ["0vh", "115vh"],
            x: [
              "0vw",
              i % 2 === 0 ? "4vw" : "-4vw",
              i % 2 === 0 ? "-2vw" : "3vw",
              "0vw",
            ],
            rotate: [p.rotate, p.rotate + 180, p.rotate + 360],
            opacity: [0, 0.75, 0.85, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          {i % 3 === 0 ? (
            <TulipSvg className="w-6 h-8 opacity-65 drop-shadow-[0_0_10px_rgba(251,164,184,0.5)]" glowing={false} />
          ) : (
            <svg
              width={p.size}
              height={p.size * 1.3}
              viewBox="0 0 30 40"
              fill="none"
              className="drop-shadow-[0_0_8px_rgba(251,164,184,0.5)] opacity-70"
            >
              <path
                d="M15 2 C 5 12, 2 24, 6 34 C 12 38, 20 38, 26 32 C 29 22, 24 10, 15 2 Z"
                fill="#fba4b8"
                opacity="0.8"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

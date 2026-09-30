import { motion } from "framer-motion";

export function AmbientDesktopDecorations() {
  const petals = [
    { size: 24, delay: 0, x: "12vw", duration: 18, rotate: 25 },
    { size: 30, delay: 3, x: "82vw", duration: 22, rotate: -35 },
    { size: 20, delay: 6, x: "28vw", duration: 20, rotate: 45 },
    { size: 26, delay: 9, x: "68vw", duration: 24, rotate: -20 },
    { size: 32, delay: 4, x: "45vw", duration: 21, rotate: 15 },
    { size: 22, delay: 8, x: "92vw", duration: 19, rotate: -40 },
    { size: 28, delay: 11, x: "6vw", duration: 23, rotate: 30 },
    { size: 20, delay: 14, x: "55vw", duration: 25, rotate: -15 },
  ];

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
        </motion.div>
      ))}
    </div>
  );
}

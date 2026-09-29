import { motion } from "framer-motion";
import { content } from "@/content";

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight"
    >
      <motion.svg
        viewBox="0 0 24 24"
        animate={{ scale: [1, 1.22, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        className="h-16 w-16"
        style={{ filter: "drop-shadow(0 0 25px rgba(251,164,184,0.7))" }}
        fill="oklch(0.85 0.1 350)"
        aria-hidden
      >
        <path d="M12 21s-7.5-4.9-10-9.5C.5 8 2.5 4.5 6 4.5c2.2 0 3.7 1.2 4.5 2.6.8-1.4 2.3-2.6 4.5-2.6 3.5 0 5.5 3.5 4 7-2.5 4.6-10 9.5-10 9.5z" />
      </motion.svg>
      <p className="mt-6 font-display text-lg tracking-widest text-cream/90 font-medium">
        {content.loading}
      </p>
    </motion.div>
  );
}

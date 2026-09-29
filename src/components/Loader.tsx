import { motion } from "framer-motion";
import { content } from "@/content";

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight"
    >
      <motion.div
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        className="text-6xl"
        style={{ filter: "drop-shadow(0 0 22px rgba(247,185,200,0.6))" }}
      >
        💗
      </motion.div>
      <p className="mt-6 font-display text-lg tracking-wide text-cream/80">
        {content.loading}
      </p>
    </motion.div>
  );
}

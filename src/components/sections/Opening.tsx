import { motion } from "framer-motion";
import { content } from "@/content";

export function Opening({ onBegin, started }: { onBegin: () => void; started: boolean }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.6, delay: 0.3 }}
        className="text-glow max-w-md font-script text-4xl leading-snug text-blush sm:text-5xl"
      >
        {content.opening.line}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: started ? 0 : 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        onClick={onBegin}
        disabled={started}
        className="glass-card mt-12 rounded-full px-8 py-3 font-body text-sm tracking-[0.18em] text-cream uppercase transition-transform active:scale-95"
      >
        {content.opening.button}
      </motion.button>

      <motion.div
        animate={{ y: [0, 10, 0], opacity: started ? 1 : 0 }}
        transition={{ y: { duration: 2, repeat: Infinity }, opacity: { duration: 1 } }}
        className="absolute bottom-10 font-body text-xs tracking-[0.3em] text-cream/50 uppercase"
      >
        scroll
      </motion.div>
    </section>
  );
}

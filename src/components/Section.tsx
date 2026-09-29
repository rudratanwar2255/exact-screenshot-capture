import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative flex min-h-[100svh] w-full flex-col items-center justify-center px-5 py-24 ${className}`}
    >
      {children}
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <h2 className="gold-text mb-8 text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {children}
      </h2>
    </Reveal>
  );
}

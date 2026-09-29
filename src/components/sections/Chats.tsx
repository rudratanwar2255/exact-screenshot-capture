import { motion } from "framer-motion";
import { content } from "@/content";
import { Reveal, Section, SectionTitle } from "@/components/Section";
import { SmartImage } from "@/components/SmartImage";

export function Chats() {
  return (
    <Section className="!min-h-0">
      <SectionTitle>{content.chats.title}</SectionTitle>

      <div className="flex w-full max-w-md flex-col gap-10">
        {content.chats.images.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, x: i % 2 ? 50 : -50, rotate: i % 2 ? 4 : -4 }}
            whileInView={{ opacity: 1, x: 0, rotate: i % 2 ? 2 : -2 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`glass-card w-[78%] rounded-3xl p-2.5 ${i % 2 ? "self-end" : "self-start"}`}
          >
            <SmartImage
              name={src}
              alt={`A little conversation ${i + 1}`}
              className="h-56 w-full rounded-2xl object-cover"
            />
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-12 max-w-sm text-center font-display text-lg leading-relaxed text-cream/85">
          {content.chats.caption}
        </p>
      </Reveal>
    </Section>
  );
}

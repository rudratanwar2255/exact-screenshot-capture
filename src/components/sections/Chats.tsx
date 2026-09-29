import { motion } from "framer-motion";
import { content } from "@/content";
import { Reveal, Section, SectionTitle } from "@/components/Section";
import { SmartImage } from "@/components/SmartImage";
import { usePhotoModal } from "@/components/PhotoModal";

export function Chats() {
  const { openPhoto } = usePhotoModal();

  const handleOpenChat = (src: string, index: number) => {
    openPhoto({
      src,
      alt: `Cute chat moment ${index + 1}`,
      title: `Cute Chat Moment #${index + 1}`,
      caption: content.chats.caption,
      badge: "WhatsApp Memory 💬",
    });
  };

  return (
    <Section className="!min-h-0">
      <SectionTitle>{content.chats.title}</SectionTitle>

      <div className="flex w-full max-w-md flex-col gap-8 px-2">
        {content.chats.images.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, x: i % 2 ? 40 : -40, rotate: i % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: i % 2 ? 1.5 : -1.5 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => handleOpenChat(src, i)}
            className={`glass-card w-[88%] sm:w-[80%] rounded-3xl p-2.5 shadow-[0_12px_40px_rgba(13,6,20,0.75)] border border-blush/20 hover:border-blush/80 transition-all duration-300 cursor-pointer group ${
              i % 2 ? "self-end" : "self-start"
            }`}
          >
            <div className="overflow-hidden rounded-2xl">
              <SmartImage
                name={src}
                alt={`A sweet conversation ${i + 1}`}
                modalTitle={`Cute Chat Moment #${i + 1}`}
                modalCaption={content.chats.caption}
                modalBadge="WhatsApp Memory 💬"
                className="h-64 sm:h-72 w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-sm px-4 text-center font-display text-lg sm:text-xl leading-relaxed text-cream/90">
          {content.chats.caption}
        </p>
      </Reveal>
    </Section>
  );
}

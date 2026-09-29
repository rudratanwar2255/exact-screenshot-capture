import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { content } from "@/content";
import { Loader } from "@/components/Loader";
import { Starfield } from "@/components/Starfield";
import { Opening } from "@/components/sections/Opening";
import { FirstMessage } from "@/components/sections/FirstMessage";
import { Timeline } from "@/components/sections/Timeline";
import { Journey } from "@/components/sections/Journey";
import { Chats } from "@/components/sections/Chats";
import { Bracelet } from "@/components/sections/Bracelet";
import { Curls } from "@/components/sections/Curls";
import { Months } from "@/components/sections/Months";
import { Letter } from "@/components/sections/Letter";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Parthi & Anup — 5 Months" },
      {
        name: "description",
        content:
          "A little story for Parthi: five months of us, told in stars, photos and words. From Anup.",
      },
      { property: "og:title", content: "Parthi & Anup — 5 Months" },
      {
        property: "og:description",
        content:
          "A little story for Parthi: five months of us, told in stars, photos and words. From Anup.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Story,
});

function Story() {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(id);
  }, []);

  const begin = () => {
    setStarted(true);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.35;
      audio.play().catch(() => {});
    }
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <main className="relative">
      <Starfield />
      <audio ref={audioRef} src={content.music} loop preload="none" />

      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

      {started && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={toggleMute}
          aria-label={muted ? "Unmute music" : "Mute music"}
          className="glass-card fixed top-4 right-4 z-30 size-10 rounded-full text-sm"
        >
          {muted ? "🔇" : "🎵"}
        </motion.button>
      )}

      <Opening onBegin={begin} started={started} />
      <FirstMessage />
      <Timeline />
      <Journey />
      <Chats />
      <Bracelet />
      <Curls />
      <Months />
      <Letter />

      <footer className="pb-12 text-center font-script text-xl text-cream/45">
        for Parthi, always — Anup
      </footer>
    </main>
  );
}

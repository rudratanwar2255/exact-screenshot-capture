import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { content } from "@/content";
import { Loader } from "@/components/Loader";
import { Starfield } from "@/components/Starfield";
import { AmbientDesktopDecorations } from "@/components/AmbientDesktopDecorations";
import { AudioController, AudioControllerHandle } from "@/components/AudioController";
import { PhotoModalProvider } from "@/components/PhotoModal";
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
      { title: "Parthi & Anup — 5 Months Together" },
      {
        name: "description",
        content:
          "A romantic journey for Parthi: 5 months of us, told in stars, memories and words. From Anup.",
      },
      { property: "og:title", content: "Parthi & Anup — 5 Months Together" },
      {
        property: "og:description",
        content:
          "A romantic journey for Parthi: 5 months of us, told in stars, memories and words. From Anup.",
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
  const audioHandleRef = useRef<AudioControllerHandle | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(id);
  }, []);

  const begin = () => {
    setStarted(true);
    if (audioHandleRef.current) {
      audioHandleRef.current.play();
    }
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const toggleMute = () => {
    if (audioHandleRef.current) {
      const isMutedNow = audioHandleRef.current.toggleMute();
      setMuted(isMutedNow);
    }
  };

  return (
    <PhotoModalProvider>
      <main className="relative min-h-screen overflow-x-hidden text-cream selection:bg-blush/30 selection:text-cream">
        <Starfield />
        <AmbientDesktopDecorations />
        <AudioController ref={audioHandleRef} src={content.music} />

        <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

        {/* Floating Mute/Unmute Control */}
        {started && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={toggleMute}
            aria-label={muted ? "Unmute music" : "Mute music"}
            className="glass-card fixed top-5 right-5 z-40 flex size-11 items-center justify-center rounded-full text-base border-blush/30 hover:border-blush shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
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

        <footer className="py-16 text-center font-script text-2xl sm:text-3xl text-rosegold/70">
          for Parthi, always & forever — Anup ✨
        </footer>
      </main>
    </PhotoModalProvider>
  );
}

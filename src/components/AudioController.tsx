import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";

export interface AudioControllerHandle {
  play: () => void;
  toggleMute: () => boolean;
  isMuted: boolean;
}

export const AudioController = forwardRef<
  AudioControllerHandle,
  { src: string }
>(({ src }, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const synthActive = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  const startRomanticSynth = () => {
    if (synthActive.current) return;
    synthActive.current = true;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Romantic warm chords arpeggio: Cmaj9, Am9, Fmaj7, Gsus4
      // Frequencies in Hz
      const notes = [
        [261.63, 329.63, 392.0, 493.88, 587.33], // C, E, G, B, D
        [220.0, 261.63, 329.63, 392.0, 493.88],  // A, C, E, G, B
        [174.61, 220.0, 261.63, 329.63, 392.0],  // F, A, C, E, G
        [196.0, 246.94, 293.66, 392.0, 440.0],   // G, B, D, G, A
      ];

      let chordIdx = 0;
      let noteStep = 0;

      const playTone = (freq: number) => {
        if (ctx.state === "suspended") ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Soft attack & long dreamy decay
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 3.0);
      };

      synthIntervalRef.current = window.setInterval(() => {
        const chord = notes[chordIdx];
        const freq = chord[noteStep % chord.length];
        playTone(freq);

        noteStep++;
        if (noteStep % 4 === 0) {
          chordIdx = (chordIdx + 1) % notes.length;
        }
      }, 750);
    } catch {
      // AudioContext unavailable
    }
  };

  const playMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.4;
      audio
        .play()
        .then(() => {
          // mp3 started successfully
        })
        .catch(() => {
          // If mp3 is blocked or not found, fall back to Web Audio ambient synthesizer
          startRomanticSynth();
        });
    } else {
      startRomanticSynth();
    }
  };

  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);

    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }

    if (audioCtxRef.current) {
      if (newMuted) {
        audioCtxRef.current.suspend();
      } else {
        audioCtxRef.current.resume();
      }
    }
    return newMuted;
  };

  useImperativeHandle(ref, () => ({
    play: playMusic,
    toggleMute,
    isMuted: muted,
  }));

  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return <audio ref={audioRef} src={src} loop preload="none" />;
});

AudioController.displayName = "AudioController";

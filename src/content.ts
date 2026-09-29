/**
 * ────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE
 *  All the words, dates and photo names live in this one file.
 * ────────────────────────────────────────────────
 */

export const content = {
  her: "Parthi",
  me: "Anup",

  // Key dates
  firstMessage: "2025-12-03T00:38:00", // 3 Dec 2025, 12:38 AM
  coupleDate: "2026-05-01T00:00:00", // 1 May 2026 (the day you became a couple)
  milestone: "2026-10-01T00:00:00", // 1 Oct 2026 (5 months together)
  milestoneLabel: "5 months",

  loading: "Loading our story…",

  opening: {
    line: "Parthi, something special is waiting for you…",
    button: "Tap to begin",
  },

  firstMessageSection: {
    title: "Where it all began",
    image: "first-message.jpg",
    timestamp: "12:38 AM · 3 December 2025",
    caption:
      "12:38 AM. The first minute of your birthday, and the beginning of everything.",
    fromMe:
      "Heart racing, rewriting the message ten times hoping to make you smile... and that one birthday wish changed my whole world.",
  },

  timeline: {
    title: "Our timeline",
    stars: [
      {
        date: "3 Dec 2025",
        label: "The first message",
        sub: "12:38 AM on your birthday",
      },
      {
        date: "1 May 2026",
        label: "The day we became us",
        sub: "Where forever began",
      },
      {
        date: "1 Oct 2026",
        label: "5 months together",
        sub: "Our sweetest milestone",
      },
    ],
  },

  journey: {
    title: "Our journey",
    subtitle: "Swipe through the moments that mean the world to me.",
    photos: [
      {
        src: "photo-1.jpg",
        caption: "Us, laughter, and nowhere else I'd rather be.",
      },
      {
        src: "photo-2.jpg",
        caption: "My favourite view: your smile glowing right next to mine.",
      },
      {
        src: "photo-3.jpg",
        caption: "Every little moment feels like magic with you.",
      },
      {
        src: "photo-4.jpg",
        caption: "Holding on to you and every sweet memory we share.",
      },
    ],
  },

  chats: {
    title: "Cute chats",
    caption:
      "The little conversations that became my favorite part of every day.",
    images: ["chat-1.jpg", "chat-2.jpg", "chat-3.jpg"],
  },

  bracelet: {
    title: "The bracelet",
    image: "bracelet.jpg",
    story: [
      "A delicate handmade charm, threaded with all my love in every bead.",
      "A butterfly for your light, soft flowers for your sweet smile.",
      "A keepsake meant to stay close to you wherever you go, just as I'll always stay by your side.",
    ],
  },

  curls: {
    title: "The curls",
    image: "anup.jpg",
    text: "Parthi, I don't know how, but my hair started curling after you came into my life. Maybe you're magic.",
  },

  months: {
    title: "5 months together",
    smiles: "countless smiles",
    countdownLabel: "until 1 October 2026",
    celebrate: "Happy 5 Months, my love 💖",
  },

  letter: {
    title: "A letter for you",
    body: `Dear Parthi,

Looking back at these 5 months, every single day with you has felt like the sweetest blessing. From that midnight birthday text at 12:38 AM to all our late-night talks, your little voice notes, your playful temper, and every warm smile — you have brought so much peace, laughter, and pure happiness into my life.

Thank you for understanding me, caring for me, and making every ordinary moment feel special. You are my comfort, my peace, and my favorite person in the entire universe.

I fall more in love with you with every passing day.`,
    button: "Click here 💌",
    finale: "Here's to many more months, Parthi. — Anup",
  },

  // Audio track (with synthesized harmonic ambient fallback if audio file isn't present)
  music: "/audio/song.mp3",
};

export type Content = typeof content;

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
  coupleDate: "2026-05-01T00:00:00", // the day you became a couple
  milestone: "2026-10-01T00:00:00", // 5 months together
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
    // ✍️ Replace with your own words
    fromMe: "[HOW IT FELT TO SEND THAT FIRST MESSAGE]",
  },

  timeline: {
    title: "Our timeline",
    stars: [
      { date: "3 Dec 2025", label: "The first message" },
      { date: "1 May 2026", label: "The day we became us" },
      { date: "1 Oct 2026", label: "5 months together" },
    ],
  },

  journey: {
    title: "Our journey",
    subtitle: "Swipe through us.",
    // photo file names live in /public/images/
    photos: Array.from({ length: 12 }, (_, i) => ({
      src: `photo-${i + 1}.jpg`,
      caption: `[CAPTION ${i + 1}]`,
    })),
  },

  chats: {
    title: "Cute chats",
    caption:
      "The little conversations that became my favorite part of every day.",
    images: Array.from({ length: 12 }, (_, i) => `chat-${i + 1}.jpg`),
  },

  bracelet: {
    title: "The bracelet",
    image: "bracelet.jpg",
    // ✍️ One line per line of the story — they reveal one by one
    story: [
      "[BRACELET STORY LINE 1]",
      "[BRACELET STORY LINE 2]",
      "[BRACELET STORY LINE 3]",
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
    // ✍️ Your message — it types out slowly
    body: "[WRITE YOUR MESSAGE HERE]",
    button: "Click here 💌",
    finale: "Here's to many more months, Parthi. — Anup",
  },

  // Background music file: put your mp3 at /public/audio/our-song.mp3
  music: "/audio/our-song.mp3",
};

export type Content = typeof content;

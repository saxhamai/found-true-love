// Question bank for the Found True Love quiz.
// Kept separate from UI so this can later be swapped for a GET /api/questions call
// without touching any component code (see src/utils — services call this module only).
//
// Each question has a stable numeric `id`, a `category` used by the result engine
// (see src/utils/scoring.js), an `image` path (served from /public/images/questions/),
// `alt` text for accessibility, and localized `text`.
//
// category:
//   "attachment"  -> signals about the user's OWN feelings/preoccupation
//   "reciprocity" -> signals about initiative taken / vulnerability shared with the other person
// This split powers the modular "unrequited love" detector in scoring.js.

export const questions = [
  {
    id: 1,
    category: "attachment",
    image: "/images/questions/q1-waiting-text.svg",
    alt: "Illustration of a phone glowing with a heart notification",
    text: {
      en: "Do you find yourself waiting for that person's text?",
    },
  },
  {
    id: 2,
    category: "reciprocity",
    image: "/images/questions/q2-private-plan.svg",
    alt: "Illustration of two silhouettes meeting quietly",
    text: {
      en: "Have you ever made a private plan to meet this person?",
    },
  },
  {
    id: 3,
    category: "attachment",
    image: "/images/questions/q3-nickname.svg",
    alt: "Illustration of a phone contact card with a heart nickname",
    text: {
      en: "Is this person's number saved in your phone with a special nickname?",
    },
  },
  {
    id: 4,
    category: "attachment",
    image: "/images/questions/q4-cant-stop-thinking.svg",
    alt: "Illustration of a thought bubble with a heart inside",
    text: {
      en: "You can't help but think about this person even when you try not to.",
    },
  },
  {
    id: 5,
    category: "attachment",
    image: "/images/questions/q5-smile.svg",
    alt: "Illustration of two faces smiling at each other",
    text: {
      en: "Do you automatically smile when you see this person smile?",
    },
  },
  {
    id: 6,
    category: "attachment",
    image: "/images/questions/q6-online-status.svg",
    alt: "Illustration of a phone showing an online status dot",
    text: {
      en: "Do you secretly check whether this person is online or has seen your message?",
    },
  },
  {
    id: 7,
    category: "reciprocity",
    image: "/images/questions/q7-jealousy.svg",
    alt: "Illustration of a figure looking away, feeling left out",
    text: {
      en: "Would you feel jealous if you saw this person getting close to someone else?",
    },
  },
  {
    id: 8,
    category: "attachment",
    image: "/images/questions/q8-small-details.svg",
    alt: "Illustration of a sparkle highlighting a small remembered detail",
    text: {
      en: "Do you remember small things about this person that other people don't notice?",
    },
  },
  {
    id: 9,
    category: "reciprocity",
    image: "/images/questions/q9-would-hurt.svg",
    alt: "Illustration of an empty chair beside a full one",
    text: {
      en: "If this person suddenly stopped talking to you, would it genuinely hurt?",
    },
  },
  {
    id: 10,
    category: "reciprocity",
    image: "/images/questions/q10-spend-time.svg",
    alt: "Illustration of two figures sitting together under stars",
    text: {
      en: "If you got the chance, would you want to spend more time alone with this person?",
    },
  },
];

// Answer point values — kept as a named export so scoring.js and any future
// admin/config screen share a single source of truth.
export const ANSWER_POINTS = {
  yes: 2,
  maybe: 1,
  no: 0,
};

export const MAX_SCORE = questions.length * ANSWER_POINTS.yes; // 20

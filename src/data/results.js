// Result type definitions for the Found True Love quiz.
// Only structure lives here (score ranges, ids, emoji, accent color). The actual
// copy (title/message/advice) is looked up from src/data/translations.js by `id`,
// so every locale stays in one place. This mirrors the eventual
// POST /api/test/result contract: the API would return a result `id`, and the
// client would still resolve display copy from the translation table.

export const RESULT_TYPES = {
  FALLEN: "fallenForThem",
  CRUSH: "definiteCrush",
  SOMETHING_MORE: "somethingMore",
  CATCHING_FEELINGS: "catchingFeelings",
  NOT_YET: "notYet",
  UNREQUITED: "unrequited",
};

// Ordered from highest score to lowest — scoring.js walks this list top-down.
export const resultRanges = [
  { id: RESULT_TYPES.FALLEN, min: 16, max: 20, emoji: "❤️" },
  { id: RESULT_TYPES.CRUSH, min: 11, max: 15, emoji: "💗" },
  { id: RESULT_TYPES.SOMETHING_MORE, min: 7, max: 10, emoji: "❤️" },
  { id: RESULT_TYPES.CATCHING_FEELINGS, min: 3, max: 6, emoji: "🤔" },
  { id: RESULT_TYPES.NOT_YET, min: 0, max: 2, emoji: "🙂" },
];

// The unrequited result isn't tied to a score band — it's a modular overlay
// rule evaluated separately in scoring.js and can override a high-attachment
// result when the reciprocity signal is low. Kept here so its emoji/id
// definition lives alongside the rest of the result catalogue.
export const unrequitedResult = { id: RESULT_TYPES.UNREQUITED, emoji: "💔" };

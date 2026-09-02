// Scoring engine for the Found True Love quiz.
// This module is the one boundary that would change if `calculateResult()` is
// later replaced with a POST /api/test/result call — everything in pages/
// and components/ only ever talks to the functions exported here.

import { questions, ANSWER_POINTS } from "../data/questions";
import { resultRanges, unrequitedResult, RESULT_TYPES } from "../data/results";
import { results as resultCopy, ui } from "../data/translations";

/**
 * Calculate the total score (0-20) from an answers map.
 * @param {Record<number, 'yes'|'maybe'|'no'>} answers - keyed by question id
 */
export function calculateScore(answers) {
  return questions.reduce((total, q) => {
    const answer = answers[q.id];
    return total + (answer ? ANSWER_POINTS[answer] : 0);
  }, 0);
}

/**
 * Sum points for questions belonging to a given category.
 */
function scoreByCategory(answers, category) {
  return questions
    .filter((q) => q.category === category)
    .reduce((total, q) => {
      const answer = answers[q.id];
      return total + (answer ? ANSWER_POINTS[answer] : 0);
    }, 0);
}

/**
 * Modular "unrequited love" overlay rule.
 *
 * Pattern: high personal attachment (the user is clearly preoccupied with this
 * person) combined with low reciprocity/initiative signals (little sign of
 * pursuing closeness or being sure it's returned) — i.e. giving more than
 * receiving. This is intentionally simple for the MVP and isolated in its own
 * function so the rule can be replaced or extended later without touching the
 * rest of the scoring flow.
 */
function matchesUnrequitedPattern(answers, totalScore) {
  const attachmentMax = questions.filter((q) => q.category === "attachment").length * ANSWER_POINTS.yes;
  const reciprocityMax = questions.filter((q) => q.category === "reciprocity").length * ANSWER_POINTS.yes;

  const attachmentScore = scoreByCategory(answers, "attachment");
  const reciprocityScore = scoreByCategory(answers, "reciprocity");

  const highAttachment = attachmentScore / attachmentMax >= 0.75; // strong preoccupation
  const lowReciprocity = reciprocityScore / reciprocityMax <= 0.25; // little initiative/certainty signal
  const overallCrushOrAbove = totalScore >= 11; // only surface this for meaningfully invested users

  return highAttachment && lowReciprocity && overallCrushOrAbove;
}

/**
 * Resolve the result id for a completed set of answers.
 * @returns {string} one of RESULT_TYPES
 */
export function resolveResultId(answers) {
  const totalScore = calculateScore(answers);

  if (matchesUnrequitedPattern(answers, totalScore)) {
    return unrequitedResult.id;
  }

  const match = resultRanges.find((range) => totalScore >= range.min && totalScore <= range.max);
  return match ? match.id : RESULT_TYPES.NOT_YET;
}

/**
 * Get the emoji associated with a result id.
 */
export function getResultEmoji(resultId) {
  if (resultId === unrequitedResult.id) return unrequitedResult.emoji;
  const match = resultRanges.find((r) => r.id === resultId);
  return match ? match.emoji : "❤️";
}

/**
 * Look up localized result copy, falling back to English for any missing
 * language so the UI never renders a blank string.
 */
export function getResultText(resultId, langCode) {
  const entry = resultCopy[resultId];
  if (!entry) return resultCopy[RESULT_TYPES.NOT_YET].en;
  return entry[langCode] || entry.en;
}

/**
 * Look up a UI string (currently English-only; extend the same way as
 * `results` in translations.js if more locales are added for app chrome).
 */
export function getUiText(key, langCode = "en") {
  const table = ui[langCode] || ui.en;
  return table[key] ?? ui.en[key] ?? "";
}

// localStorage helpers for Found True Love.
// Only ever stores: current quiz progress (answers + question index) and the
// selected result language. Never store names, phone numbers, emails, or any
// other personal identifier — see section 18/31 of the product brief.

const STORAGE_KEY = "ftl_quiz_state_v1";
const LANGUAGE_KEY = "ftl_language_v1";

/**
 * Persist in-progress quiz state (answers + current question index).
 * Wrapped in try/catch since localStorage can throw in private-browsing /
 * storage-restricted contexts — a failed save should never crash the quiz.
 */
export function saveQuizState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable — the quiz still works in-memory for this session.
  }
}

export function loadQuizState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearQuizState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do — state simply won't persist across reloads.
  }
}

export function saveLanguage(langCode) {
  try {
    window.localStorage.setItem(LANGUAGE_KEY, langCode);
  } catch {
    // Non-fatal — language selector just won't remember the choice.
  }
}

export function loadLanguage() {
  try {
    return window.localStorage.getItem(LANGUAGE_KEY);
  } catch {
    return null;
  }
}

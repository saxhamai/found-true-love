// Sharing helpers for the result page. Every function fails gracefully —
// this module never throws into the UI; callers get a boolean/promise they
// can branch on.

export const SITE_URL = "https://foundtruelove.in";

/**
 * Build the shareable text block for a result.
 */
export function buildShareText({ resultTitle }) {
  return [
    "❤️ I just took the Found True Love test!",
    "",
    `My result: ${resultTitle}`,
    "",
    "What would your result be? Take the test yourself!",
    SITE_URL,
  ].join("\n");
}

/**
 * Open WhatsApp's share intent with the given text. Works on mobile (app
 * deep link) and desktop (web.whatsapp.com) alike via the wa.me endpoint.
 */
export function shareToWhatsApp(text) {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Copy text to the clipboard. Returns a promise resolving to true/false so
 * the caller can show a confirmation or a manual-copy fallback.
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for browsers without the async Clipboard API.
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const succeeded = document.execCommand("copy");
    document.body.removeChild(textarea);
    return succeeded;
  } catch {
    return false;
  }
}

/**
 * Use the native Web Share API when available. Returns true if a share sheet
 * was shown, false if the API is unsupported (caller should fall back to
 * copyToClipboard) or the user cancelled.
 */
export async function nativeShare({ title, text }) {
  if (!navigator.share) return false;
  try {
    await navigator.share({ title, text, url: SITE_URL });
    return true;
  } catch {
    // AbortError when the user cancels the share sheet — not a real failure.
    return false;
  }
}

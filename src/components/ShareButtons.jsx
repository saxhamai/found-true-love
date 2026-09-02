import { useState } from "react";
import { MessageCircle, Copy, Share2, Check } from "lucide-react";
import { getUiText } from "../utils/scoring";
import { buildShareText, shareToWhatsApp, copyToClipboard, nativeShare } from "../utils/sharing";

export default function ShareButtons({ resultTitle }) {
  const [copied, setCopied] = useState(false);
  // Read once at init — Web Share API support doesn't change during a session,
  // so this avoids an extra render pass from an effect just to mirror it into state.
  const [canNativeShare] = useState(() => typeof navigator !== "undefined" && !!navigator.share);

  const shareText = buildShareText({ resultTitle });

  async function handleCopy() {
    const ok = await copyToClipboard(shareText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function handleNativeShare() {
    const shared = await nativeShare({ title: "Found True Love", text: shareText });
    if (!shared) {
      // Unsupported or cancelled — fall back to copy so the action never dead-ends.
      handleCopy();
    }
  }

  return (
    <div className="share-buttons">
      <h3 className="share-buttons__heading">{getUiText("shareHeading")} ❤️</h3>
      <div className="share-buttons__grid">
        <button
          type="button"
          className="btn btn-primary share-buttons__whatsapp"
          onClick={() => shareToWhatsApp(shareText)}
        >
          <MessageCircle size={18} aria-hidden="true" />
          {getUiText("whatsapp")}
        </button>

        <button type="button" className="btn btn-secondary" onClick={handleCopy}>
          {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
          {copied ? getUiText("copied") : getUiText("copyResult")}
        </button>

        {canNativeShare && (
          <button type="button" className="btn btn-secondary" onClick={handleNativeShare}>
            <Share2 size={18} aria-hidden="true" />
            {getUiText("share")}
          </button>
        )}
      </div>
    </div>
  );
}

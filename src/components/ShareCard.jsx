// Visual "result card" used for social sharing. For the MVP this is a styled
// in-app preview; the markup is isolated in its own component with a stable
// root id so a future pass can point html-to-image (or similar) at
// `#share-card-capture` to export it as a downloadable PNG without any
// further refactor.

export default function ShareCard({ emoji, title }) {
  return (
    <div className="share-card" id="share-card-capture">
      <p className="share-card__brand">❤️ FOUND TRUE LOVE</p>
      <div className="share-card__emoji" aria-hidden="true">
        {emoji}
      </div>
      <p className="share-card__title">{title}</p>
      <p className="share-card__url">foundtruelove.in</p>
    </div>
  );
}

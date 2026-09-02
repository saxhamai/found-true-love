import { getUiText } from "../utils/scoring";
import { whatThisMeansCopy } from "../data/translations";

export default function ResultCard({ emoji, title, message, advice }) {
  return (
    <div className="card result-card">
      <p className="result-card__eyebrow">✨ {getUiText("yourResult")} ✨</p>
      <div className="result-card__emoji" aria-hidden="true">
        {emoji}
      </div>
      <h1 className="result-card__title">{title}</h1>
      <p className="result-card__message">{message}</p>
      <p className="result-card__advice">{advice}</p>

      <div className="result-card__meaning">
        <h3 className="result-card__meaning-heading">{getUiText("whatDoesThisMean")}</h3>
        <p className="result-card__meaning-text">{whatThisMeansCopy.en}</p>
      </div>
    </div>
  );
}

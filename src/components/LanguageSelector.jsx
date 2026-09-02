import { languages } from "../data/translations";
import { getUiText } from "../utils/scoring";

export default function LanguageSelector({ selected, onSelect }) {
  return (
    <div className="language-selector">
      <h3 className="language-selector__heading">{getUiText("selectLanguagePrompt")}</h3>
      <div className="language-selector__grid" role="group" aria-label="Choose a language">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            className={`language-chip ${selected === lang.code ? "language-chip--selected" : ""}`}
            onClick={() => onSelect(lang.code)}
            aria-pressed={selected === lang.code}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}

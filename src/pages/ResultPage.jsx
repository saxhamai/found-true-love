import { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ResultCard from "../components/ResultCard";
import LanguageSelector from "../components/LanguageSelector";
import ShareCard from "../components/ShareCard";
import ShareButtons from "../components/ShareButtons";
import { resolveResultId, getResultEmoji, getResultText, getUiText } from "../utils/scoring";
import { loadLanguage, saveLanguage } from "../utils/storage";

export default function ResultPage({ answers, onRestart }) {
  const [language, setLanguage] = useState(() => loadLanguage() || "en");

  // Recomputed from the answers map every render (see utils/scoring.js) —
  // never mutated in place, so this stays correct regardless of how the
  // user navigated to get here.
  const resultId = useMemo(() => resolveResultId(answers), [answers]);
  const emoji = getResultEmoji(resultId);
  const text = getResultText(resultId, language);

  function handleLanguageSelect(code) {
    setLanguage(code);
    saveLanguage(code);
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <div className="stage result-page">
          <ResultCard emoji={emoji} title={text.title} message={text.message} advice={text.advice} />

          <LanguageSelector selected={language} onSelect={handleLanguageSelect} />

          <ShareCard emoji={emoji} title={text.title} />

          <ShareButtons resultTitle={text.title} />

          <button type="button" className="btn btn-secondary btn-block result-page__retake" onClick={onRestart}>
            {getUiText("retake")}
          </button>

          <p className="result-page__privacy">{getUiText("privacyNote")}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

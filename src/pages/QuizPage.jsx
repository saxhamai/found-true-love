import { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import { questions } from "../data/questions";
import { saveQuizState, loadQuizState } from "../utils/storage";

const ADVANCE_DELAY_MS = 380;

export default function QuizPage({ onComplete }) {
  // Restore any in-progress attempt (e.g. accidental reload) via lazy init —
  // never restores personal data, only answers keyed by question id + index.
  const [answers, setAnswers] = useState(() => loadQuizState()?.answers ?? {});
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = loadQuizState();
    if (saved && typeof saved.currentIndex === "number") {
      return Math.min(saved.currentIndex, questions.length - 1);
    }
    return 0;
  });
  const advanceTimer = useRef(null);

  useEffect(() => {
    saveQuizState({ answers, currentIndex });
  }, [answers, currentIndex]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  function handleAnswer(value) {
    // Score is always recalculated from this answers map (see utils/scoring.js),
    // so re-answering a question here never double-counts points.
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(nextAnswers);

    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      if (isLast) {
        onComplete(nextAnswers);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    }, ADVANCE_DELAY_MS);
  }

  function handleBack() {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setCurrentIndex((i) => Math.max(0, i - 1));
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <div className="stage quiz-page">
          <div className="quiz-page__top">
            <button
              type="button"
              className={`btn btn-ghost quiz-page__back ${currentIndex === 0 ? "quiz-page__back--hidden" : ""}`}
              onClick={handleBack}
              disabled={currentIndex === 0}
              aria-label="Go back to previous question"
            >
              <ChevronLeft size={18} aria-hidden="true" /> Back
            </button>
            <ProgressBar current={currentIndex + 1} total={questions.length} />
          </div>

          <QuestionCard
            key={currentQuestion.id}
            animKey={currentQuestion.id}
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion.id]}
            onAnswer={handleAnswer}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

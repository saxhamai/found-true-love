import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import { clearQuizState } from "./utils/storage";

// The product is a strictly linear flow (landing -> quiz -> result), so a
// simple view switch is used instead of React Router — see brief section 2
// ("React Router only if actually required").
const VIEWS = { LANDING: "landing", QUIZ: "quiz", RESULT: "result" };

export default function App() {
  const [view, setView] = useState(VIEWS.LANDING);
  const [answers, setAnswers] = useState(null);
  const [quizKey, setQuizKey] = useState(0);

  function handleStart() {
    setView(VIEWS.QUIZ);
  }

  function handleQuizComplete(finalAnswers) {
    setAnswers(finalAnswers);
    setView(VIEWS.RESULT);
  }

  function handleRestart() {
    clearQuizState();
    setAnswers(null);
    setQuizKey((k) => k + 1); // remount QuizPage so its internal state resets cleanly
    setView(VIEWS.QUIZ);
  }

  if (view === VIEWS.QUIZ) {
    return <QuizPage key={quizKey} onComplete={handleQuizComplete} />;
  }

  if (view === VIEWS.RESULT && answers) {
    return <ResultPage answers={answers} onRestart={handleRestart} />;
  }

  return <LandingPage onStart={handleStart} />;
}

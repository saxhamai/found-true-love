import AnswerButton from "./AnswerButton";
import { getUiText } from "../utils/scoring";

export default function QuestionCard({ question, selectedAnswer, onAnswer, animKey }) {
  return (
    <div className="card question-card" key={animKey}>
      <div className="question-card__image-wrap">
        <img
          className="question-card__image"
          src={question.image}
          alt={question.alt}
          loading="eager"
          onError={(e) => {
            // Graceful fallback if a question image is ever missing.
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <h2 className="question-card__text">{question.text.en}</h2>
      <div className="answer-group" role="group" aria-label="Answer options">
        <AnswerButton
          value="yes"
          label={getUiText("yes")}
          selected={selectedAnswer === "yes"}
          onSelect={onAnswer}
        />
        <AnswerButton
          value="maybe"
          label={getUiText("maybe")}
          selected={selectedAnswer === "maybe"}
          onSelect={onAnswer}
        />
        <AnswerButton
          value="no"
          label={getUiText("no")}
          selected={selectedAnswer === "no"}
          onSelect={onAnswer}
        />
      </div>
    </div>
  );
}

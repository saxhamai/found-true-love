const VARIANT_CLASS = {
  yes: "answer-btn--yes",
  maybe: "answer-btn--maybe",
  no: "answer-btn--no",
};

const ICON = {
  yes: "❤️",
  maybe: "🤔",
  no: "✕",
};

export default function AnswerButton({ value, label, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`answer-btn ${VARIANT_CLASS[value]} ${selected ? "answer-btn--selected" : ""}`}
      onClick={() => onSelect(value)}
      aria-pressed={selected}
    >
      <span className="answer-btn__icon" aria-hidden="true">
        {ICON[value]}
      </span>
      <span>{label}</span>
    </button>
  );
}

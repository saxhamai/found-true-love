// Signature visual for the quiz: instead of a plain bar, progress is drawn as
// a heartbeat/ECG pulse line that fills in as the user answers — a small,
// on-brief nod to "reading the shape of your feelings" that stays out of the
// way everywhere else in the UI.

const PULSE_PATH =
  "M0 30 H60 L75 30 L85 8 L100 52 L112 30 L122 18 L132 30 H400";

export default function ProgressBar({ current, total }) {
  const percent = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="progress" aria-hidden="false">
      <div className="progress__pulse">
        <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="progress__svg">
          <path
            d={PULSE_PATH}
            className="progress__track"
            pathLength="100"
          />
          <path
            d={PULSE_PATH}
            className="progress__fill"
            pathLength="100"
            style={{ strokeDasharray: 100, strokeDashoffset: 100 - percent }}
          />
        </svg>
        <span
          className="progress__heart"
          style={{ left: `${percent}%` }}
          aria-hidden="true"
        >
          ❤️
        </span>
      </div>
      <p className="progress__label">
        Question {current} of {total}
      </p>
    </div>
  );
}

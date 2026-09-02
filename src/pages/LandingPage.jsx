import Footer from "../components/Footer";
import { getUiText } from "../utils/scoring";

export default function LandingPage({ onStart }) {
  return (
    <div className="app-shell">
      <main className="app-main landing">
        <div className="stage landing__stage">
          <div className="landing__hero">
            <div className="landing__mark" aria-hidden="true">
              ❤️
            </div>
            <h1 className="landing__brand">{getUiText("brand")}</h1>
            <p className="landing__tagline">{getUiText("tagline")}</p>
            <p className="landing__subtext">{getUiText("subtext")}</p>
          </div>

          <div className="landing__cta">
            <button type="button" className="btn btn-primary" onClick={onStart}>
              {getUiText("startButton")} ❤️
            </button>
            <p className="landing__note">{getUiText("noLoginNote")}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

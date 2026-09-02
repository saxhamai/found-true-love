# Found True Love ❤️

A fun, emotional, psychological-style love quiz for Indian users. Built as a
client-side React + Vite MVP — no backend, no login, no data collection.

**Flow:** Landing → 10 questions (one at a time, auto-advancing) → Result →
choose your language → share.

---

## 1. What's included

```
found-true-love/
├── public/
│   ├── images/
│   │   ├── questions/       10 custom SVG illustrations (one per question)
│   │   └── logo/            heart-mark.svg (brand mark, used in header + share card)
│   ├── privacy/  terms/  contact/   simple placeholder pages
│   └── favicon.svg
│
├── src/
│   ├── components/          Header, Footer, ProgressBar, QuestionCard,
│   │                        AnswerButton, ResultCard, LanguageSelector,
│   │                        ShareCard, ShareButtons
│   ├── pages/                LandingPage, QuizPage, ResultPage
│   ├── data/
│   │   ├── questions.js      the 10 questions, images, scoring category
│   │   ├── results.js        score ranges → result ids
│   │   └── translations.js   all UI strings + all 6 results in 10 languages
│   ├── utils/
│   │   ├── scoring.js         score calculation + result-resolution engine
│   │   ├── sharing.js         WhatsApp / clipboard / native share helpers
│   │   └── storage.js         localStorage helpers (progress + language only)
│   ├── styles/                shared.css, landing.css, quiz.css, result.css
│   ├── App.jsx                view state machine (landing/quiz/result)
│   ├── main.jsx
│   └── index.css              design tokens, reset, base type
│
├── index.html                 SEO metadata (OG/Twitter tags, canonical, fonts)
├── package.json
└── vite.config.js
```

No backend, no database, no auth. Answers never leave the browser.

---

## 2. Install & run

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build     # outputs to dist/
npm run preview   # serve the production build locally to sanity-check it
```

To lint:

```bash
npm run lint
```

---

## 3. How to change the quiz questions

Edit `src/data/questions.js`. Each entry looks like:

```js
{
  id: 11,
  category: "attachment", // "attachment" or "reciprocity" — powers the
                           // unrequited-love detector, see scoring.js
  image: "/images/questions/q11-your-image.svg",
  alt: "Accessible description of the image",
  text: { en: "Your new question here?" },
}
```

Add/remove entries freely — `MAX_SCORE` and the progress bar both derive from
`questions.length` automatically. Just make sure `id` is unique.

---

## 4. How to change the result messages

Edit `src/data/results.js` for score ranges, and `src/data/translations.js`
under the `results` export for the actual copy. Each result id
(`fallenForThem`, `definiteCrush`, `somethingMore`, `catchingFeelings`,
`notYet`, `unrequited`) has a `title` / `message` / `advice` per language
code. If a language is missing a key, the app falls back to English
automatically (see `getResultText()` in `utils/scoring.js`), so it will
never show a blank string.

The **unrequited love** result is a modular overlay rule in
`utils/scoring.js` → `matchesUnrequitedPattern()`. It currently fires when
attachment-category answers are high and reciprocity-category answers are
low, on top of an overall "crush or above" score. Tune the thresholds there,
or swap in a completely different rule — nothing else in the app needs to
change.

---

## 5. How to add another language

1. Add the language to the `languages` array in `src/data/translations.js`
   (code + native-script label).
2. Add a matching key under each of the 6 entries in `results`, with
   `title` / `message` / `advice`.

That's it — the `LanguageSelector` component reads `languages` directly, so
a new chip appears automatically.

---

## 6. How to replace question images

Drop your own image (JPG/PNG/SVG) into `public/images/questions/` and point
`image` at it in `questions.js`. If an image ever fails to load, the app
hides the broken image gracefully instead of showing a broken-image icon
(see the `onError` handler in `QuestionCard.jsx`) — nothing crashes.

---

## 7. How to deploy

This is a static site after `npm run build` — the `dist/` folder can be
deployed to any static host:

- **Vercel / Netlify:** connect the repo, build command `npm run build`,
  output directory `dist`.
- **Any static host (S3, Cloudflare Pages, GitHub Pages, etc.):** upload the
  contents of `dist/` after building.

Update the canonical/OG URLs in `index.html` and `SITE_URL` in
`src/utils/sharing.js` if the production domain differs from
`foundtruelove.in`.

---

## 8. Connecting a future backend (FastAPI/PostgreSQL)

The app is already structured around two service-style boundaries so a
backend can be introduced without touching any component:

- **`getQuestions()`** — today, components import `questions` directly from
  `src/data/questions.js`. To go dynamic, wrap that import in a function
  (e.g. `src/services/questions.js`) that either returns the static array or
  calls `GET /api/questions`, and update the two importers (`QuestionCard`
  via `QuizPage`, and nowhere else) to call it instead.
- **`calculateResult()`** — `src/utils/scoring.js` is the single place that
  turns `answers` into a `resultId`. Swap its internals for a
  `POST /api/test/result` call (sending the answers map, receiving a result
  id back) and every page that calls `resolveResultId()` keeps working
  unchanged.

Because `questions.js`, `results.js`, and `translations.js` are already
pure data (no component logic mixed in), a FastAPI backend could serve the
exact same shapes from PostgreSQL later with minimal translation work.

---

## 9. Notes on the MVP scope

- The quiz itself (questions, Yes/Maybe/No buttons) runs in English;
  language selection is offered once you reach your **result**, matching the
  product spec.
- No personal data is ever requested or stored. Only quiz progress and a
  language preference live in `localStorage`, and "Take the Test Again"
  clears both.
- `prefers-reduced-motion` is respected globally (see `src/index.css`).
- The share card component (`ShareCard.jsx`) has a stable `#share-card-capture`
  root id, ready for a future PNG-export pass (e.g. with `html-to-image`)
  without any further refactor.

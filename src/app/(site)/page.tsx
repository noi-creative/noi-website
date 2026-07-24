import common from '@/content/locales/es/common.json';
import home from '@/content/locales/es/home.json';

/**
 * Home page placeholder. C05 only ships the static architecture; the
 * actual home page composition is implemented in P01.
 *
 * The placeholder uses the locales to prove the JSON content flow
 * works end-to-end and respects the `dynamic = "error"` guardrail on
 * the `(site)` layout.
 */
export default function Home() {
  return (
    <main>
      <h1>
        {home.hero.headline.primary}{' '}
        <span className="font-serif-italic">{home.hero.headline.accent}</span>
      </h1>
      <p>{home.hero.lede}</p>
      <p>
        <small>
          {common.brand.shortTitle} — {home.placeholder.pending}
        </small>
      </p>
    </main>
  );
}

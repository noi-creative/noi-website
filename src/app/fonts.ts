import localFont from 'next/font/local';
import { Playfair_Display } from 'next/font/google';

/**
 * Font loading for the NOI Creative website.
 *
 * Satoshi is loaded as a local font (4 weights: 400, 500, 700, 900 — the
 * .otf files staged in `public/fonts/Satoshi/`). Each weight is wired
 * explicitly so that the CSS variable `--font-satoshi` only includes the
 * weights we actually use.
 *
 * Playfair Display is loaded from Google Fonts. Per the C03 audit
 * (`docs/design/FIGMA_AUDIT.md` §4.1), the editorial use cases cover the
 * 400, 500 and 700 weights in both normal and italic. 600 is intentionally
 * not loaded because no approved frame uses it.
 *
 * Panel Sans is loaded as a local font (3 weights: 400, 700, 900).
 * The CSS variable `--font-panel-sans` is set here; the design token
 * `--font-display-accent` already references it with a Satoshi fallback.
 */

export const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-satoshi',
  fallback: ['system-ui', 'sans-serif'],
});

export const panelSans = localFont({
  src: [
    {
      path: '../../public/fonts/PanelSans/PanelSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PanelSans/PanelSans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PanelSans/PanelSans-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-panel-sans',
  fallback: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
});

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  fallback: ['Georgia', 'serif'],
});

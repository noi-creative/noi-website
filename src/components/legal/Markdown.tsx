import ReactMarkdown from 'react-markdown';
import styles from './Markdown.module.scss';

type MarkdownProps = {
  readonly children: string;
};

/**
 * Server-side Markdown renderer for the legal pages.
 *
 * - React Server Component (no `"use client"`).
 * - Uses `react-markdown` with the default config: no raw HTML, no GFM.
 * - The Markdown source is read from disk in the page component and passed
 *   in as `children`. No runtime Markdown parsing on the client.
 *
 * Per ADR-003, this is the only Markdown renderer in the project. Future
 * Markdown use (blog, etc.) should reuse this component.
 */
export function Markdown({ children }: MarkdownProps) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}

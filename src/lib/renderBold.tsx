import type { ReactNode } from 'react';

export type TextSegment = {
  text: string;
  type: 'plain' | 'bold' | 'italic' | 'bold-italic' | 'accent';
};

/**
 * Parses the lightweight emphasis markers used in localized copy:
 * `**bold**`, `*italic*`, `***bold italic***`, and `__accent__`.
 *
 * This is intentionally not a Markdown parser: markers cannot be nested or
 * escaped, and unmatched markers remain plain text. Use this function when a
 * component needs custom rendering for a segment, especially `accent`.
 */
export function parseMarkers(text: string): TextSegment[] {
  const parts = text.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__)/);
  return parts.filter(Boolean).map((part) => {
    if (part.startsWith('***') && part.endsWith('***')) {
      return { text: part.slice(3, -3), type: 'bold-italic' };
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return { text: part.slice(2, -2), type: 'bold' };
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return { text: part.slice(1, -1), type: 'italic' };
    }
    if (part.startsWith('__') && part.endsWith('__')) {
      return { text: part.slice(2, -2), type: 'accent' };
    }
    return { text: part, type: 'plain' };
  });
}

/**
 * Renders localized marker copy with semantic emphasis elements. Bold,
 * italic, and bold-italic segments become `<strong>`, `<em>`, or both.
 * Accent segments remain unstyled spans; use `parseMarkers` directly when an
 * accent needs component-specific styling.
 */
export function renderBold(text: string): ReactNode {
  return parseMarkers(text).map((s, i) => {
    switch (s.type) {
      case 'bold':
        return <strong key={i}>{s.text}</strong>;
      case 'italic':
        return <em key={i}>{s.text}</em>;
      case 'bold-italic':
        return (
          <strong key={i}>
            <em>{s.text}</em>
          </strong>
        );
      default:
        return <span key={i}>{s.text}</span>;
    }
  });
}

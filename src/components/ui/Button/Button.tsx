import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant =
  | 'primary-yellow'
  | 'primary-burgundy'
  | 'primary-orange'
  | 'outline-on-dark'
  | 'outline-on-light'
  | 'text-link';

export type ButtonSize = 'md' | 'lg';

type CommonProps = {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly withArrow?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'className'> & {
    readonly href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'className' | 'href'> & {
    readonly href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Button primitive. Polymorphic between `<button>` and `<a>` based on the
 * presence of `href`. Six variants are confirmed by the C03 audit:
 *
 *   - `primary-yellow`     — pill, yellow background, ink text
 *   - `primary-burgundy`   — pill, burgundy background, cream text
 *   - `primary-orange`     — pill, orange background, cream text
 *   - `outline-on-dark`    — pill, transparent bg, cream border + text
 *   - `outline-on-light`   — pill, transparent bg, ink border + text
 *   - `text-link`          — inline text link, no background, underline
 *
 * `withArrow` appends a small right-arrow glyph used by the marketing
 * CTAs ("Hablemos", "Agenda tu llamada"). The arrow is an inline SVG
 * (no external icon package per `AGENTS.md` §4).
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary-orange', size = 'md', withArrow = false, children, className } = props;

  const classNames = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span>{children}</span>
      {withArrow ? <ArrowGlyph /> : null}
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const { variant: _v, size: _s, withArrow: _w, className: _c, children: _ch, ...rest } = props;
    void _v;
    void _s;
    void _w;
    void _c;
    void _ch;
    return (
      <a {...rest} href={props.href} className={classNames}>
        {content}
      </a>
    );
  }

  const {
    variant: _v,
    size: _s,
    withArrow: _w,
    className: _c,
    children: _ch,
    ...rest
  } = props as ButtonAsButton;
  void _v;
  void _s;
  void _w;
  void _c;
  void _ch;
  return (
    <button {...rest} className={classNames}>
      {content}
    </button>
  );
}

function ArrowGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="1em" height="1em" className={styles.arrow}>
      <path
        d="M3 8h9.5M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

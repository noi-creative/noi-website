import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './TextField.module.scss';

export type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'className' | 'children'
> & {
  readonly label?: ReactNode;
  readonly ariaLabel?: string;
  readonly helpText?: ReactNode;
  readonly errorText?: ReactNode;
  readonly containerClassName?: string;
};

/**
 * Single-line text input with an associated label, optional help text and
 * optional error text. RHF-compatible: forwards every standard input
 * prop (name, defaultValue, onChange, value, etc.) so it can be wired
 * to React Hook Form in C10 without breaking changes.
 *
 * Pass either a `label` (visible text associated with the input via
 * `htmlFor`/`id`) or an `ariaLabel` (an accessible name only — useful
 * when a visible heading already labels the form, like the newsletter).
 */
export function TextField({
  label,
  ariaLabel,
  helpText,
  errorText,
  containerClassName,
  required,
  ...inputProps
}: TextFieldProps) {
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const helpId = `${baseId}-help`;
  const errorId = `${baseId}-error`;

  const describedBy = [helpText ? helpId : null, errorText ? errorId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={[styles.field, errorText ? styles.invalid : '', containerClassName]
        .filter(Boolean)
        .join(' ')}
    >
      {label ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </label>
      ) : null}
      <input
        {...inputProps}
        id={inputId}
        required={required}
        aria-label={ariaLabel}
        aria-invalid={errorText ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={styles.input}
      />
      {helpText ? (
        <p id={helpId} className={styles.help}>
          {helpText}
        </p>
      ) : null}
      {errorText ? (
        <p id={errorId} className={styles.error} role="alert">
          {errorText}
        </p>
      ) : null}
    </div>
  );
}

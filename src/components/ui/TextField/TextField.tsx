import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './TextField.module.scss';

export type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'className' | 'children'
> & {
  readonly label: ReactNode;
  readonly helpText?: ReactNode;
  readonly errorText?: ReactNode;
  readonly containerClassName?: string;
};

/**
 * Single-line text input with an associated label, optional help text and
 * optional error text. RHF-compatible: forwards every standard input
 * prop (name, defaultValue, onChange, value, etc.) so it can be wired
 * to React Hook Form in C10 without breaking changes.
 */
export function TextField({
  label,
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
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        {...inputProps}
        id={inputId}
        required={required}
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

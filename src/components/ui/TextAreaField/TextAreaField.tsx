import { useId } from 'react';
import type { ReactNode, TextareaHTMLAttributes } from 'react';
import styles from './TextAreaField.module.scss';

export type TextAreaFieldProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'id' | 'className' | 'children'
> & {
  readonly label: ReactNode;
  readonly helpText?: ReactNode;
  readonly errorText?: ReactNode;
  readonly containerClassName?: string;
};

/**
 * Multi-line text input with an associated label, optional help text and
 * optional error text. RHF-compatible.
 */
export function TextAreaField({
  label,
  helpText,
  errorText,
  required,
  containerClassName,
  ...textareaProps
}: TextAreaFieldProps) {
  const baseId = useId();
  const textareaId = `${baseId}-textarea`;
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
      <label htmlFor={textareaId} className={styles.label}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <textarea
        {...textareaProps}
        id={textareaId}
        required={required}
        aria-invalid={errorText ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={styles.textarea}
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

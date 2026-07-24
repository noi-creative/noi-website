import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './CheckboxField.module.scss';

export type CheckboxFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'className' | 'children' | 'type'
> & {
  readonly label: ReactNode;
  readonly helpText?: ReactNode;
  readonly errorText?: ReactNode;
  readonly containerClassName?: string;
};

/**
 * Checkbox with an associated label, optional help text and optional
 * error text. Used by the contact form's privacy-consent checkbox.
 */
export function CheckboxField({
  label,
  helpText,
  errorText,
  required,
  containerClassName,
  ...checkboxProps
}: CheckboxFieldProps) {
  const baseId = useId();
  const checkboxId = `${baseId}-checkbox`;
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
      <label htmlFor={checkboxId} className={styles.label}>
        <input
          {...checkboxProps}
          type="checkbox"
          id={checkboxId}
          required={required}
          aria-invalid={errorText ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={styles.checkbox}
        />
        <span className={styles.text}>
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </span>
      </label>
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

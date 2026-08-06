import { useId } from 'react';
import type { ReactNode, SelectHTMLAttributes } from 'react';
import styles from './SelectField.module.scss';

export type SelectFieldProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'id' | 'className' | 'children'
> & {
  readonly label: ReactNode;
  readonly helpText?: ReactNode;
  readonly errorText?: ReactNode;
  readonly options: readonly string[];
  readonly placeholder?: string;
  readonly containerClassName?: string;
};

/**
 * Select input with an associated label, optional help text and optional
 * error text. RHF-compatible: forwards every standard select prop.
 *
 * The contact form's service and investment selects use this primitive.
 */
export function SelectField({
  label,
  helpText,
  errorText,
  options,
  placeholder,
  required,
  containerClassName,
  ...selectProps
}: SelectFieldProps) {
  const baseId = useId();
  const selectId = `${baseId}-select`;
  const helpId = `${baseId}-help`;
  const errorId = `${baseId}-error`;

  // Controlled consumers (e.g. RHF Controller) pass `value`; React forbids
  // combining it with `defaultValue`. Uncontrolled usage keeps the empty
  // default so the disabled placeholder option is shown initially.
  const isControlled = selectProps.value !== undefined && selectProps.value !== null;

  const describedBy = [helpText ? helpId : null, errorText ? errorId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={[styles.field, errorText ? styles.invalid : '', containerClassName]
        .filter(Boolean)
        .join(' ')}
    >
      <label htmlFor={selectId} className={styles.label}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <div className={styles.wrapper}>
        <select
          {...selectProps}
          id={selectId}
          required={required}
          aria-invalid={errorText ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={styles.select}
          {...(!isControlled ? { defaultValue: '' } : {})}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className={styles.chevron}>
          ▾
        </span>
      </div>
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

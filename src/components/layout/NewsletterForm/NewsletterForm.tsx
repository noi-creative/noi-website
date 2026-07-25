'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterSchema, type NewsletterInput } from '@/lib/schemas/newsletter';
import common from '@/content/locales/es/common.json';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { FormMessage } from '@/components/ui/FormMessage';
import styles from './NewsletterForm.module.scss';

type ServerResponse =
  | {
      status: 'ok';
    }
  | {
      status: 'error';
      code: 'validation_error' | 'rate_limited' | 'server_error';
      message: string;
      fieldErrors?: { email?: string };
    };

/**
 * Newsletter signup form. Posts to `/api/newsletter`. Uses React Hook
 * Form + Zod (the shared schema in `src/lib/schemas/newsletter`) so the
 * client validation matches the server-side validation.
 *
 * UX states:
 *   - idle        — initial state
 *   - submitting  — `formState.isSubmitting` is true; the submit button
 *                   is disabled
 *   - success     — the form resets and an inline `FormMessage` (success)
 *                   appears below the input
 *   - error       — a controlled server error message appears below the
 *                   input. User input is preserved
 *
 * The form is fully self-contained: it owns its state, the submit
 * transition and the inline feedback. The honeypot and Captcha do not
 * apply (this is a single-field form).
 */
export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = (await response.json().catch(() => null)) as ServerResponse | null;

    if (response.ok && data?.status === 'ok') {
      reset();
      return;
    }

    if (data?.status === 'error' && data.code === 'validation_error' && data.fieldErrors?.email) {
      setError('email', { type: 'server', message: data.fieldErrors.email });
      return;
    }

    setError('root.serverError', {
      type: 'server',
      message: data && data.status === 'error' ? data.message : common.errors.generic,
    });
  });

  const serverError = errors.root?.serverError?.message;
  const success = isSubmitSuccessful && !serverError;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email" className={styles.label}>
        {common.footer.newsletterHeading}
      </label>
      <div className={styles.row}>
        <TextField
          type="email"
          autoComplete="email"
          placeholder={common.footer.newsletterPlaceholder}
          required
          disabled={true}
          errorText={errors.email?.message}
          containerClassName={styles.input}
          {...register('email')}
        />
        <Button type="submit" variant="primary-orange" disabled={true}>
          {isSubmitting ? '…' : common.footer.subscribeLabel}
        </Button>
      </div>
      {success ? (
        <FormMessage id="newsletter-status" tone="success">
          Gracias. Te has suscrito al newsletter de NOI Creative.
        </FormMessage>
      ) : null}
      {serverError ? (
        <FormMessage id="newsletter-status" tone="error">
          {serverError}
        </FormMessage>
      ) : null}
    </form>
  );
}

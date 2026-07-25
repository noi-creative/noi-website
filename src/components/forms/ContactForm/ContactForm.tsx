'use client';

import { useId } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactSchema,
  contactServiceOptions,
  contactInvestmentOptions,
  type ContactInput,
} from '@/lib/schemas/contact';
import contacto from '@/content/locales/es/contacto.json';
import { site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { SelectField } from '@/components/ui/SelectField';
import { TextAreaField } from '@/components/ui/TextAreaField';
import { CheckboxField } from '@/components/ui/CheckboxField';
import { FormMessage } from '@/components/ui/FormMessage';
import styles from './ContactForm.module.scss';

type ServerResponse =
  | {
      status: 'ok';
    }
  | {
      status: 'error';
      code: 'validation_error' | 'rate_limited' | 'server_error';
      message: string;
      fieldErrors?: Partial<Record<keyof ContactInput, string>>;
    };

/**
 * Contact form. RHF + Zod (shared schema in `src/lib/schemas/contact`).
 *
 * Each field uses the `Controller` pattern because the C06 form
 * primitives do not forward refs. Controller provides `value` and
 * `onChange` to the primitive via `field`; `errorText` is wired from
 * `fieldState.error?.message`.
 *
 * UX states (per PRD §16):
 *   - idle        — initial state
 *   - submitting  — `formState.isSubmitting` is true; all fields and the
 *                   submit button are disabled
 *   - success     — the form resets and an inline success message is
 *                   shown above the submit
 *   - error       — a controlled server error message is shown; user
 *                   input is preserved. Field-level server errors are
 *                   shown next to the relevant field via `setError`
 *
 * The honeypot field (`website`) is a real input that is hidden from
 * sighted users via the `visuallyHidden` mixin and from the tab order
 * via `tabIndex={-1}`. If a bot fills it, the server silently returns
 * 200 and discards the submission.
 */
export function ContactForm() {
  const fallbackId = useId();
  const copy = contacto;
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: '',
      name: '',
      service: undefined as unknown as ContactInput['service'],
      investment: undefined as unknown as ContactInput['investment'],
      social: '',
      comments: '',
      privacy: false as unknown as true,
      website: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<ContactInput> = async (values) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = (await response.json().catch(() => null)) as ServerResponse | null;

    if (response.ok && data?.status === 'ok') {
      reset();
      return;
    }

    if (data?.status === 'error' && data.code === 'validation_error' && data.fieldErrors) {
      for (const [name, message] of Object.entries(data.fieldErrors)) {
        if (message) {
          setError(name as keyof ContactInput, { type: 'server', message });
        }
      }
      return;
    }

    setError('root.serverError', {
      type: 'server',
      message: data && data.status === 'error' ? data.message : copy.form.error,
    });
  };

  const serverError = errors.root?.serverError?.message;
  const success = isSubmitSuccessful && !serverError;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {success ? <FormMessage tone="success">{copy.form.success}</FormMessage> : null}
      {serverError ? <FormMessage tone="error">{serverError}</FormMessage> : null}

      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            value={(field.value as string | undefined) ?? ''}
            label={copy.form.fields.name}
            autoComplete="name"
            required
            disabled={isSubmitting}
            errorText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            value={(field.value as string | undefined) ?? ''}
            type="email"
            label={copy.form.fields.email}
            autoComplete="email"
            required
            disabled={isSubmitting}
            errorText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="service"
        control={control}
        render={({ field, fieldState }) => (
          <SelectField
            {...field}
            value={(field.value as string | undefined) ?? ''}
            label={copy.form.fields.service}
            options={contactServiceOptions}
            placeholder={copy.form.fields.service}
            required
            disabled={isSubmitting}
            errorText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="investment"
        control={control}
        render={({ field, fieldState }) => (
          <SelectField
            {...field}
            value={(field.value as string | undefined) ?? ''}
            label={copy.form.fields.investment}
            options={contactInvestmentOptions}
            placeholder={copy.form.fields.investment}
            required
            disabled={isSubmitting}
            errorText={fieldState.error?.message}
          />
        )}
      />

      <div className={styles.fullWidth}>
        <Controller
          name="social"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={(field.value as string | undefined) ?? ''}
              label={copy.form.fields.social}
              placeholder={copy.form.fields.socialPlaceholder}
              autoComplete="off"
              required
              disabled={isSubmitting}
              errorText={fieldState.error?.message}
            />
          )}
        />
      </div>

      <div className={styles.fullWidth}>
        <Controller
          name="comments"
          control={control}
          render={({ field, fieldState }) => (
            <TextAreaField
              {...field}
              value={(field.value as string | undefined) ?? ''}
              label={copy.form.fields.comments}
              placeholder={copy.form.fields.commentsPlaceholder}
              rows={5}
              required
              disabled={isSubmitting}
              errorText={fieldState.error?.message}
            />
          )}
        />
      </div>

      <div className={styles.fullWidth}>
        <Controller
          name="privacy"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxField
              name={field.name}
              onChange={field.onChange}
              onBlur={field.onBlur}
              checked={Boolean(field.value)}
              label={
                <>
                  {copy.form.privacy}{' '}
                  <a href={site.routes.privacidad} target="_blank" rel="noopener noreferrer">
                    Política de Privacidad
                  </a>
                  .
                </>
              }
              required
              disabled={isSubmitting}
              errorText={fieldState.error?.message}
            />
          )}
        />
      </div>

      {/* Honeypot. Visually hidden, removed from the tab order. Real bots
          will fill it; humans never see it. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${fallbackId}-website`}>Sitio web</label>
        <Controller
          name="website"
          control={control}
          render={({ field }) => (
            <input
              id={`${fallbackId}-website`}
              type="text"
              name={field.name}
              value={(field.value as string | undefined) ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              tabIndex={-1}
              autoComplete="off"
            />
          )}
        />
      </div>

      <div className={styles.submitRow}>
        <Button type="submit" variant="primary-orange" size="lg" disabled={isSubmitting}>
          {isSubmitting ? copy.form.submitting : copy.form.submit}
        </Button>
      </div>
    </form>
  );
}

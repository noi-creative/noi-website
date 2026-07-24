'use client';

import { useState, useTransition } from 'react';
import common from '@/content/locales/es/common.json';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import styles from './NewsletterForm.module.scss';

type NewsletterStatus = 'idle' | 'submitting' | 'success' | 'not-implemented' | 'error';

type NewsletterResponse = { ok: true } | { ok: false; error: string };

/**
 * Newsletter signup form. Posts to `/api/newsletter`. C10 will replace
 * the placeholder handler with the real Google Sheets integration; the
 * form's UX (success / not-implemented / error) does not need to change.
 *
 * The form is fully self-contained: it owns its own state, the submit
 * transition and the inline feedback. The 501 placeholder response is
 * surfaced as a distinct `not-implemented` status so the user understands
 * the feature is wired but the backend is not yet connected.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<NewsletterStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setMessage(null);
    startTransition(async () => {
      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (response.status === 501) {
          setStatus('not-implemented');
          setMessage(
            'El newsletter aún no está conectado. Vuelve pronto — lo activaremos en breve.',
          );
          return;
        }

        const data = (await response.json().catch(() => null)) as NewsletterResponse | null;

        if (response.ok && data?.ok !== false) {
          setStatus('success');
          setMessage('Gracias. Te has suscrito al newsletter de NOI Creative.');
          setEmail('');
          return;
        }

        setStatus('error');
        setMessage(data && 'error' in data ? data.error : common.errors.generic);
      } catch {
        setStatus('error');
        setMessage(common.errors.generic);
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="newsletter-email" className={styles.label}>
        {common.footer.newsletterHeading}
      </label>
      <div className={styles.row}>
        <TextField
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={common.footer.newsletterPlaceholder}
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          ariaLabel="Correo electrónico"
          aria-describedby="newsletter-status"
          containerClassName={styles.input}
        />
        <Button type="submit" variant="primary-orange" disabled={isPending}>
          {isPending ? '…' : common.footer.subscribeLabel}
        </Button>
      </div>
      <p
        id="newsletter-status"
        className={[
          styles.status,
          status === 'success' ? styles.success : '',
          status === 'error' ? styles.error : '',
          status === 'not-implemented' ? styles.notImplemented : '',
        ]
          .filter(Boolean)
          .join(' ')}
        role={status === 'error' ? 'alert' : 'status'}
      >
        {message ?? ' '}
      </p>
    </form>
  );
}

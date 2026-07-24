import { describe, it, expect } from 'vitest';
import {
  buildContactInternalEmail,
  buildContactConfirmationEmail,
} from '@/lib/services/email-templates';
import type { ContactPayload } from '@/lib/schemas/contact';

const fixture: ContactPayload = {
  email: 'alice@example.com',
  name: 'Alice',
  service: 'Diseño web',
  investment: 'USD 1.000–2.000',
  social: '@alicebrand',
  comments: 'Quiero una web nueva.',
  privacy: true,
  website: '',
};

describe('email templates', () => {
  describe('buildContactInternalEmail', () => {
    const { subject, html, text } = buildContactInternalEmail(fixture);

    it('subject contains the submitter name', () => {
      expect(subject).toContain('Alice');
    });

    it('html contains the brand name', () => {
      expect(html).toContain('NOI Creative');
    });

    it('html contains the submitter email as a mailto link', () => {
      expect(html).toContain('mailto:alice@example.com');
    });

    it('html contains the service label', () => {
      expect(html).toContain('Diseño web');
    });

    it('html contains the investment label', () => {
      expect(html).toContain('USD 1.000–2.000');
    });

    it('html contains the social handle', () => {
      expect(html).toContain('@alicebrand');
    });

    it('html contains the comments verbatim', () => {
      expect(html).toContain('Quiero una web nueva.');
    });

    it('text contains the submitter name and email', () => {
      expect(text).toContain('Alice');
      expect(text).toContain('alice@example.com');
    });

    it('text contains the comments', () => {
      expect(text).toContain('Quiero una web nueva.');
    });
  });

  describe('buildContactConfirmationEmail', () => {
    const { subject, html, text } = buildContactConfirmationEmail(fixture);

    it('subject is the confirmation subject', () => {
      expect(subject).toBe('Recibimos tu mensaje — NOI Creative');
    });

    it('html greets the submitter by name', () => {
      expect(html).toContain('Alice');
    });

    it('html contains the brand name', () => {
      expect(html).toContain('NOI Creative');
    });

    it('html contains the service (lowercased)', () => {
      expect(html).toContain('diseño web');
    });

    it('html contains the comments', () => {
      expect(html).toContain('Quiero una web nueva.');
    });

    it('text contains the submitter name and confirmation copy', () => {
      expect(text).toContain('Alice');
      expect(text).toContain('48 horas');
    });
  });

  describe('XSS escaping', () => {
    it('escapes <script> in the comments (internal email)', () => {
      const payload: ContactPayload = {
        ...fixture,
        comments: '<script>alert("xss")</script>',
      };
      const { html } = buildContactInternalEmail(payload);
      expect(html).not.toContain('<script>alert("xss")</script>');
      expect(html).toContain('&lt;script&gt;');
    });

    it('escapes <script> in the comments (confirmation email)', () => {
      const payload: ContactPayload = {
        ...fixture,
        comments: '<script>alert("xss")</script>',
      };
      const { html } = buildContactConfirmationEmail(payload);
      expect(html).not.toContain('<script>alert("xss")</script>');
      expect(html).toContain('&lt;script&gt;');
    });

    it('escapes < and > in the name', () => {
      const payload: ContactPayload = { ...fixture, name: '<Alice>' };
      const { html } = buildContactInternalEmail(payload);
      expect(html).toContain('&lt;Alice&gt;');
      expect(html).not.toContain('<Alice>');
    });

    it('escapes " and & in the social handle', () => {
      const payload: ContactPayload = { ...fixture, social: 'A&B "C"' };
      const { html } = buildContactInternalEmail(payload);
      expect(html).toContain('A&amp;B &quot;C&quot;');
    });
  });
});

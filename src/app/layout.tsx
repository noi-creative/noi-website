import type { Metadata, Viewport } from 'next';
import './globals.scss';
import { playfairDisplay, satoshi } from './fonts';
import { site } from '@/config/site';

const defaultDescription =
  'NOI Creative — estudio de branding y diseño en Orlando, Florida. Estrategia, identidad y producción visual para marcas que buscan crecer.';

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: site.shortTitle,
    template: `%s — ${site.shortTitle}`,
  },
  description: defaultDescription,
  applicationName: site.brand,
  authors: [{ name: site.brand }],
  generator: 'Next.js',
  keywords: [
    'branding',
    'diseño',
    'identidad visual',
    'estrategia de marca',
    'Orlando',
    'Florida',
    'NOI Creative',
  ],
  referrer: 'origin-when-cross-origin',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: site.siteUrl,
    siteName: site.brand,
    title: site.shortTitle,
    description: defaultDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.shortTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/icon',
    apple: '/icon',
  },
};

export const viewport: Viewport = {
  themeColor: '#00385C',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.brand,
  url: site.siteUrl,
  logo: `${site.siteUrl.replace(/\/+$/, '')}/images/shared/logo/noi-blanco.svg`,
  email: site.contactEmail,
  description: defaultDescription,
  sameAs: [site.social.instagram.url, site.social.linkedin.url, site.social.tiktok.url].filter(
    (value) => !value.startsWith('TODO'),
  ),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${satoshi.variable} ${playfairDisplay.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

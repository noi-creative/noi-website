import type { Metadata } from 'next';
import './globals.scss';
import { playfairDisplay, satoshi } from './fonts';

export const metadata: Metadata = {
  title: 'NOI: creative',
  description: 'TODO metadata description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${satoshi.variable} ${playfairDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}

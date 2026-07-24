import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NOI: creative',
  description: 'TODO metadata description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

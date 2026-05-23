import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.utilixi.com'),
  title: {
    default: 'Utilixi — Free Online Tools',
    template: '%s | Utilixi',
  },
  description: 'Free online calculators and tools — mortgage, BMI, currency converter and more.',
};

const LOCALES = ['en', 'ru', 'uk', 'fr', 'lt'];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = cookieLocale && LOCALES.includes(cookieLocale) ? cookieLocale : 'en';

  return (
    <html lang={locale} className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

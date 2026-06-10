import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

const SUPPORTED = ['en', 'ru', 'uk', 'fr', 'lt'] as const;
type Locale = typeof SUPPORTED[number];

function detectLocale(acceptLanguage: string): Locale {
  if (!acceptLanguage) return 'en';
  const langs = acceptLanguage
    .split(',')
    .map((part) => {
      const [lang, q] = part.trim().split(';q=');
      return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1.0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of langs) {
    if ((SUPPORTED as readonly string[]).includes(lang)) return lang as Locale;
    const prefix = lang.split('-')[0];
    if ((SUPPORTED as readonly string[]).includes(prefix)) return prefix as Locale;
  }
  return 'en';
}

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') ?? '';
  const locale = detectLocale(acceptLanguage);
  redirect(`/${locale}`);
}

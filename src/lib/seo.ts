export const BASE_URL = 'https://www.utilixi.com';
export const LOCALES = ['en', 'ru', 'uk', 'fr', 'lt'] as const;

export function buildAlternates(locale: string, path: string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}${path}`;
  }
  languages['x-default'] = `${BASE_URL}/en${path}`;
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages,
  };
}

export function buildMetadata(locale: string, path: string, meta: { title: string; description: string }) {
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}${path}`,
      siteName: 'Utilixi',
      type: 'website' as const,
    },
    twitter: {
      card: 'summary' as const,
      title: meta.title,
      description: meta.description,
    },
  };
}

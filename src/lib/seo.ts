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

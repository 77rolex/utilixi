'use client';

import { usePathname, useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';
import styles from './LanguageSwitcher.module.scss';

const LOCALE_LABELS: Record<string, string> = {
  en: 'EN',
  ru: 'RU',
  uk: 'UK',
  fr: 'FR',
  lt: 'LT',
};

type Props = {
  currentLocale: string;
};

export default function LanguageSwitcher({ currentLocale }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    // Replace current locale segment in pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  }

  return (
    <div className={styles['lang-switcher']}>
      <select
        className={styles['lang-switcher__select']}
        value={currentLocale}
        onChange={handleChange}
        aria-label="Select language"
      >
        {routing.locales.map((locale) => (
          <option key={locale} value={locale}>
            {LOCALE_LABELS[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}

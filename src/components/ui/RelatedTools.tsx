import Link from 'next/link';
import styles from './RelatedTools.module.scss';

type Tool = { href: string; label: string };

const TITLE: Record<string, string> = {
  en: 'Also useful',
  ru: 'Также полезно',
  uk: 'Також корисно',
  fr: 'Également utile',
  lt: 'Taip pat naudinga',
};

export default function RelatedTools({ locale, tools }: { locale: string; tools: Tool[] }) {
  const title = TITLE[locale] || TITLE.en;
  return (
    <section className={styles['related-tools']}>
      <p className={styles['related-tools__title']}>{title}</p>
      <div className={styles['related-tools__list']}>
        {tools.map((tool) => (
          <Link key={tool.href} href={`/${locale}${tool.href}`} className={styles['related-tools__item']}>
            {tool.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

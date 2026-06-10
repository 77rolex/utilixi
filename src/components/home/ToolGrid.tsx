'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './ToolGrid.module.scss';

export type ToolCategory = 'finance' | 'crypto' | 'health' | 'utility' | 'legal' | 'measure' | 'realestate' | 'esoteric';

export type ToolItem = {
  href: string;
  icon: string;
  title: string;
  desc: string;
  category: ToolCategory;
};

type FilterCategory = 'all' | ToolCategory;

const CATEGORY_LABELS: Record<string, Record<FilterCategory, string>> = {
  en: { all: 'All', finance: 'Finance', crypto: 'Crypto', health: 'Health', utility: 'Utilities', legal: 'Legal', measure: 'Measurements', realestate: 'Real Estate', esoteric: 'Esoteric' },
  ru: { all: 'Все', finance: 'Финансы', crypto: 'Криптовалюта', health: 'Здоровье', utility: 'Утилиты', legal: 'Юридические', measure: 'Измерения', realestate: 'Недвижимость', esoteric: 'Эзотерика' },
  uk: { all: 'Усі', finance: 'Фінанси', crypto: 'Криптовалюта', health: 'Здоров\'я', utility: 'Утиліти', legal: 'Юридичні', measure: 'Вимірювання', realestate: 'Нерухомість', esoteric: 'Езотерика' },
  fr: { all: 'Tout', finance: 'Finance', crypto: 'Crypto', health: 'Santé', utility: 'Utilitaires', legal: 'Juridique', measure: 'Mesures', realestate: 'Immobilier', esoteric: 'Ésotérique' },
  lt: { all: 'Visi', finance: 'Finansai', crypto: 'Kripto', health: 'Sveikata', utility: 'Priemonės', legal: 'Teisiniai', measure: 'Matavimai', realestate: 'Nekilnojamasis turtas', esoteric: 'Ezoterika' },
};

const SEARCH_PLACEHOLDER: Record<string, string> = {
  en: 'Search tools...',
  ru: 'Поиск инструментов...',
  uk: 'Пошук інструментів...',
  fr: 'Rechercher des outils...',
  lt: 'Ieškoti įrankių...',
};

const NO_RESULTS: Record<string, string> = {
  en: 'No tools found',
  ru: 'Ничего не найдено',
  uk: 'Нічого не знайдено',
  fr: 'Aucun outil trouvé',
  lt: 'Įrankių nerasta',
};

const FILTER_ORDER: FilterCategory[] = ['all', 'finance', 'crypto', 'health', 'utility', 'legal', 'measure', 'realestate', 'esoteric'];

type Props = {
  locale: string;
  tools: ToolItem[];
  initialCategory?: string;
};

export default function ToolGrid({ locale, tools, initialCategory }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const resolveCategory = (cat?: string): FilterCategory => {
    if (cat && FILTER_ORDER.includes(cat as FilterCategory)) return cat as FilterCategory;
    return 'finance';
  };

  const [active, setActive] = useState<FilterCategory>(resolveCategory(initialCategory));
  const [search, setSearch] = useState('');

  const labels = CATEGORY_LABELS[locale] || CATEGORY_LABELS.en;
  const placeholder = SEARCH_PLACEHOLDER[locale] || SEARCH_PLACEHOLDER.en;
  const noResults = NO_RESULTS[locale] || NO_RESULTS.en;

  const handleCategoryChange = (cat: FilterCategory) => {
    setActive(cat);
    router.replace(`${pathname}?category=${cat}`, { scroll: false });
  };

  const q = search.trim().toLowerCase();
  const filtered = tools.filter((t) => {
    const matchesCategory = q !== '' || active === 'all' || t.category === active;
    const matchesSearch = q === '' || t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (q.length < 2) return;
    const resultsCount = filtered.length;
    const timer = setTimeout(() => {
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof gtag === 'function') {
        gtag('event', 'tool_search', {
          search_term: q,
          results_count: resultsCount,
          locale,
        });
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={styles['tool-search']}>
        <svg className={styles['tool-search__icon']} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          className={styles['tool-search__input']}
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label={placeholder}
        />
      </div>
      <div className={styles['tool-filter']}>
        {FILTER_ORDER.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`${styles['tool-filter__btn']}${active === cat ? ` ${styles['tool-filter__btn--active']}` : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {labels[cat]}
          </button>
        ))}
      </div>
      <div className={styles['tool-grid']}>
        {filtered.length === 0 ? (
          <p className={styles['tool-grid__empty']}>{noResults}</p>
        ) : filtered.map((tool) => (
          <Link key={tool.href} href={`/${locale}${tool.href}`} className={styles['tool-card']}>
            <span className={styles['tool-card__icon']}>{tool.icon}</span>
            <h2 className={styles['tool-card__title']}>{tool.title}</h2>
            <p className={styles['tool-card__desc']}>{tool.desc}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

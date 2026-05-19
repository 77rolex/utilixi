'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './ToolGrid.module.scss';

export type ToolCategory = 'finance' | 'crypto' | 'health' | 'utility';

export type ToolItem = {
  href: string;
  icon: string;
  title: string;
  desc: string;
  category: ToolCategory;
};

type FilterCategory = 'all' | ToolCategory;

const CATEGORY_LABELS: Record<string, Record<FilterCategory, string>> = {
  en: { all: 'All', finance: 'Finance', crypto: 'Crypto', health: 'Health', utility: 'Utilities' },
  ru: { all: 'Все', finance: 'Финансы', crypto: 'Криптовалюта', health: 'Здоровье', utility: 'Утилиты' },
  uk: { all: 'Усі', finance: 'Фінанси', crypto: 'Криптовалюта', health: 'Здоров\'я', utility: 'Утиліти' },
  fr: { all: 'Tout', finance: 'Finance', crypto: 'Crypto', health: 'Santé', utility: 'Utilitaires' },
  lt: { all: 'Visi', finance: 'Finansai', crypto: 'Kripto', health: 'Sveikata', utility: 'Priemonės' },
};

const FILTER_ORDER: FilterCategory[] = ['all', 'finance', 'crypto', 'health', 'utility'];

export default function ToolGrid({ locale, tools }: { locale: string; tools: ToolItem[] }) {
  const [active, setActive] = useState<FilterCategory>('all');
  const labels = CATEGORY_LABELS[locale] || CATEGORY_LABELS.en;
  const filtered = active === 'all' ? tools : tools.filter((t) => t.category === active);

  return (
    <>
      <div className={styles['tool-filter']}>
        {FILTER_ORDER.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`${styles['tool-filter__btn']}${active === cat ? ` ${styles['tool-filter__btn--active']}` : ''}`}
            onClick={() => setActive(cat)}
          >
            {labels[cat]}
          </button>
        ))}
      </div>
      <div className={styles['tool-grid']}>
        {filtered.map((tool) => (
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

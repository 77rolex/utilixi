'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getFavorites, toggleFavorite } from '@/lib/favorites';
import styles from './ToolGrid.module.scss';

export type ToolCategory = 'finance' | 'crypto' | 'health' | 'utility' | 'travel' | 'lifestyle' | 'legal' | 'measure' | 'realestate' | 'esoteric';

export type ToolItem = {
  href: string;
  icon: string;
  title: string;
  desc: string;
  category: ToolCategory;
};

type FilterCategory = 'favorites' | 'all' | ToolCategory;

const CATEGORY_LABELS: Record<string, Record<FilterCategory, string>> = {
  en: { favorites: 'Favorites', all: 'All', finance: 'Finance', crypto: 'Crypto', health: 'Health', utility: 'Utilities', travel: 'Travel', lifestyle: 'Lifestyle', legal: 'Legal', measure: 'Measurements', realestate: 'Real Estate', esoteric: 'Esoteric' },
  ru: { favorites: 'Избранное', all: 'Все', finance: 'Финансы', crypto: 'Криптовалюта', health: 'Здоровье', utility: 'Утилиты', travel: 'Путешествия', lifestyle: 'Быт и досуг', legal: 'Юридические', measure: 'Измерения', realestate: 'Недвижимость', esoteric: 'Эзотерика' },
  uk: { favorites: 'Вибране', all: 'Усі', finance: 'Фінанси', crypto: 'Криптовалюта', health: 'Здоров\'я', utility: 'Утиліти', travel: 'Подорожі', lifestyle: 'Побут і дозвілля', legal: 'Юридичні', measure: 'Вимірювання', realestate: 'Нерухомість', esoteric: 'Езотерика' },
  fr: { favorites: 'Favoris', all: 'Tout', finance: 'Finance', crypto: 'Crypto', health: 'Santé', utility: 'Utilitaires', travel: 'Voyage', lifestyle: 'Lifestyle', legal: 'Juridique', measure: 'Mesures', realestate: 'Immobilier', esoteric: 'Ésotérique' },
  lt: { favorites: 'Mėgstamiausi', all: 'Visi', finance: 'Finansai', crypto: 'Kripto', health: 'Sveikata', utility: 'Priemonės', travel: 'Kelionės', lifestyle: 'Gyvenimo būdas', legal: 'Teisiniai', measure: 'Matavimai', realestate: 'Nekilnojamasis turtas', esoteric: 'Ezoterika' },
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

const NO_FAVORITES: Record<string, string> = {
  en: 'No favorites yet. Click ⭐ on any tool card to save it here.',
  ru: 'Избранных пока нет. Нажмите ⭐ на любой карточке инструмента, чтобы добавить его сюда.',
  uk: 'Вибраних поки немає. Натисніть ⭐ на будь-якій картці інструменту, щоб додати його сюди.',
  fr: 'Aucun favori pour l\'instant. Cliquez sur ⭐ sur une carte d\'outil pour l\'enregistrer ici.',
  lt: 'Kol kas mėgstamiausių nėra. Spustelėkite ⭐ ant bet kurios įrankio kortelės, kad ją išsaugotumėte.',
};

const FAV_ADD: Record<string, string> = {
  en: 'Add to favorites',
  ru: 'Добавить в избранное',
  uk: 'Додати до вибраного',
  fr: 'Ajouter aux favoris',
  lt: 'Pridėti prie mėgstamiausių',
};

const FAV_REMOVE: Record<string, string> = {
  en: 'Remove from favorites',
  ru: 'Убрать из избранного',
  uk: 'Видалити з вибраного',
  fr: 'Retirer des favoris',
  lt: 'Pašalinti iš mėgstamiausių',
};

const FAVORITES_TIP: Record<string, string> = {
  en: 'Tip: Bookmark this page in your browser (Ctrl+D) so your Favorites don\'t disappear after clearing cache.',
  ru: 'Совет: добавьте страницу в закладки браузера (Ctrl+D) — иначе «Избранное» очистится при очистке кеша.',
  uk: 'Порада: додайте сторінку до закладок браузера (Ctrl+D) — інакше «Вибране» очиститься при очищенні кешу.',
  fr: 'Conseil : ajoutez cette page à vos favoris (Ctrl+D) pour ne pas perdre vos Favoris après avoir vidé le cache.',
  lt: 'Patarimas: pridėkite puslapį prie naršyklės žymių (Ctrl+D), kad „Mėgstamiausi" nedingtų po talpyklos išvalymo.',
};

const FILTER_ORDER: FilterCategory[] = ['all', 'finance', 'crypto', 'health', 'utility', 'travel', 'lifestyle', 'legal', 'measure', 'realestate', 'esoteric'];

type Props = {
  locale: string;
  tools: ToolItem[];
  initialCategory?: string;
};

export default function ToolGrid({ locale, tools, initialCategory }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const resolveCategory = (cat?: string): FilterCategory => {
    if (cat === 'favorites') return 'favorites';
    if (cat && FILTER_ORDER.includes(cat as FilterCategory)) return cat as FilterCategory;
    return 'finance';
  };

  const [active, setActive] = useState<FilterCategory>(resolveCategory(initialCategory));
  const [search, setSearch] = useState('');
  const [favPaths, setFavPaths] = useState<string[]>([]);

  useEffect(() => {
    setFavPaths(getFavorites());
  }, [active]); // обновляем при смене категории (пользователь мог добавить на другой странице)

  const labels = CATEGORY_LABELS[locale] || CATEGORY_LABELS.en;
  const placeholder = SEARCH_PLACEHOLDER[locale] || SEARCH_PLACEHOLDER.en;
  const noResults = NO_RESULTS[locale] || NO_RESULTS.en;

  const handleCategoryChange = (cat: FilterCategory) => {
    setActive(cat);
    router.replace(`${pathname}?category=${cat}`, { scroll: false });
  };

  const q = search.trim().toLowerCase();

  const filtered = tools.filter((t) => {
    if (active === 'favorites') return favPaths.includes(t.href);
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
        <button
          type="button"
          className={`${styles['tool-filter__btn']} ${styles['tool-filter__btn--fav']}${active === 'favorites' ? ` ${styles['tool-filter__btn--active']}` : ''}`}
          onClick={() => handleCategoryChange('favorites')}
          aria-label={labels.favorites}
          title={labels.favorites}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill={active === 'favorites' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>

        <div className={styles['tool-filter__divider']} aria-hidden="true" />

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

      {active === 'favorites' && (
        <p className={styles['tool-filter__tip']}>
          {FAVORITES_TIP[locale] || FAVORITES_TIP.en}
        </p>
      )}

      <div className={styles['tool-grid']}>
        {active === 'favorites' && filtered.length === 0 ? (
          <p className={styles['tool-grid__empty']}>{NO_FAVORITES[locale] || NO_FAVORITES.en}</p>
        ) : filtered.length === 0 ? (
          <p className={styles['tool-grid__empty']}>{noResults}</p>
        ) : filtered.map((tool) => {
          const isFav = favPaths.includes(tool.href);
          return (
            <div key={tool.href} className={styles['tool-card-wrap']}>
              <Link href={`/${locale}${tool.href}`} className={styles['tool-card']}>
                <span className={styles['tool-card__icon']}>{tool.icon}</span>
                <h2 className={styles['tool-card__title']}>{tool.title}</h2>
                <p className={styles['tool-card__desc']}>{tool.desc}</p>
              </Link>
              <button
                type="button"
                className={`${styles['tool-card__fav']}${isFav ? ` ${styles['tool-card__fav--active']}` : ''}`}
                onClick={() => { toggleFavorite(tool.href); setFavPaths(getFavorites()); }}
                aria-label={isFav ? (FAV_REMOVE[locale] || FAV_REMOVE.en) : (FAV_ADD[locale] || FAV_ADD.en)}
                title={isFav ? (FAV_REMOVE[locale] || FAV_REMOVE.en) : (FAV_ADD[locale] || FAV_ADD.en)}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

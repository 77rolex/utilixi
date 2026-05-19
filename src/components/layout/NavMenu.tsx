'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './NavMenu.module.scss';

type NavTool = { href: string; labels: Record<string, string> };
type NavCategory = { key: string; labelsByLocale: Record<string, string>; tools: NavTool[] };

const NAV_CATEGORIES: NavCategory[] = [
  {
    key: 'finance',
    labelsByLocale: { en: 'Finance', ru: 'Финансы', uk: 'Фінанси', fr: 'Finance', lt: 'Finansai' },
    tools: [
      { href: '/calculator/mortgage', labels: { en: 'Mortgage Calculator', ru: 'Ипотечный калькулятор', uk: 'Іпотечний калькулятор', fr: 'Calculatrice de prêt immobilier', lt: 'Hipotekos skaičiuotuvas' } },
      { href: '/calculator/loan', labels: { en: 'Loan Calculator', ru: 'Калькулятор кредита', uk: 'Калькулятор кредиту', fr: 'Calculatrice de prêt', lt: 'Paskolos skaičiuotuvas' } },
      { href: '/calculator/deposit', labels: { en: 'Deposit Calculator', ru: 'Калькулятор депозита', uk: 'Калькулятор депозиту', fr: 'Calculatrice de dépôt', lt: 'Indėlio skaičiuotuvas' } },
      { href: '/calculator/roi', labels: { en: 'ROI Calculator', ru: 'Калькулятор ROI', uk: 'Калькулятор ROI', fr: 'Calculatrice ROI', lt: 'RI skaičiuotuvas' } },
      { href: '/calculator/pension', labels: { en: 'Pension Calculator', ru: 'Пенсионный калькулятор', uk: 'Пенсійний калькулятор', fr: 'Calculatrice Retraite', lt: 'Pensijų skaičiuotuvas' } },
      { href: '/calculator/rent-vs-buy', labels: { en: 'Rent vs Buy', ru: 'Аренда vs Покупка', uk: 'Оренда vs Купівля', fr: 'Louer vs Acheter', lt: 'Nuoma vs Pirkimas' } },
      { href: '/currency', labels: { en: 'Currency Converter', ru: 'Конвертер валют', uk: 'Конвертер валют', fr: 'Convertisseur de devises', lt: 'Valiutų keitiklis' } },
    ],
  },
  {
    key: 'crypto',
    labelsByLocale: { en: 'Crypto', ru: 'Криптовалюта', uk: 'Криптовалюта', fr: 'Crypto', lt: 'Kripto' },
    tools: [
      { href: '/crypto', labels: { en: 'Crypto Rates', ru: 'Курс криптовалют', uk: 'Курс криптовалют', fr: 'Cours des cryptos', lt: 'Kriptovaliutų kursai' } },
      { href: '/crypto/converter', labels: { en: 'Crypto Converter', ru: 'Конвертер криптовалют', uk: 'Конвертер криптовалют', fr: 'Convertisseur crypto', lt: 'Kriptovaliutų keitiklis' } },
    ],
  },
  {
    key: 'legal',
    labelsByLocale: { en: 'Legal', ru: 'Юридические', uk: 'Юридичні', fr: 'Juridique', lt: 'Teisiniai' },
    tools: [
      { href: '/calculator/alimony', labels: { en: 'Alimony Calculator', ru: 'Калькулятор алиментов', uk: 'Калькулятор аліментів', fr: 'Calculatrice de pension alimentaire', lt: 'Alimentų skaičiuotuvas' } },
    ],
  },
  {
    key: 'utilities',
    labelsByLocale: { en: 'Utilities', ru: 'Утилиты', uk: 'Утиліти', fr: 'Utilitaires', lt: 'Priemonės' },
    tools: [
      { href: '/weather', labels: { en: 'Weather Forecast', ru: 'Прогноз погоды', uk: 'Прогноз погоди', fr: 'Météo', lt: 'Oro prognozė' } },
      { href: '/tools/password-generator', labels: { en: 'Password Generator', ru: 'Генератор паролей', uk: 'Генератор паролів', fr: 'Générateur de mot de passe', lt: 'Slaptažodžių generatorius' } },
    ],
  },
  {
    key: 'health',
    labelsByLocale: { en: 'Health', ru: 'Здоровье', uk: 'Здоров\'я', fr: 'Santé', lt: 'Sveikata' },
    tools: [
      { href: '/calculator/bmi', labels: { en: 'BMI Calculator', ru: 'Калькулятор ИМТ', uk: 'Калькулятор ІМТ', fr: 'Calculatrice IMC', lt: 'KMI skaičiuotuvas' } },
      { href: '/calculator/calories', labels: { en: 'Calorie Calculator', ru: 'Калькулятор калорий', uk: 'Калькулятор калорій', fr: 'Calculatrice de calories', lt: 'Kalorijų skaičiuotuvas' } },
      { href: '/calculator/pregnancy', labels: { en: 'Pregnancy Calculator', ru: 'Калькулятор беременности', uk: 'Калькулятор вагітності', fr: 'Calculatrice de grossesse', lt: 'Nėštumo skaičiuotuvas' } },
      { href: '/calculator/ideal-weight', labels: { en: 'Ideal Weight Calculator', ru: 'Калькулятор идеального веса', uk: 'Калькулятор ідеальної ваги', fr: 'Poids Idéal', lt: 'Idealaus svorio skaičiuotuvas' } },
    ],
  },
];

const TRIGGER_LABEL: Record<string, string> = {
  en: 'Tools', ru: 'Инструменты', uk: 'Інструменти', fr: 'Outils', lt: 'Įrankiai',
};

const SIDEBAR_HOME_LABEL: Record<string, string> = {
  en: 'All Tools', ru: 'Все инструменты', uk: 'Всі інструменти', fr: 'Tous les outils', lt: 'Visi įrankiai',
};

export default function NavMenu({ locale }: { locale: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Desktop: keep open while hovering trigger OR dropdown
  const openDesktop = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setDesktopOpen(true);
  };
  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => setDesktopOpen(false), 150);
  };
  const closeDesktop = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setDesktopOpen(false);
  };

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const closeSidebar = () => {
    setSidebarOpen(false);
    setOpenSection(null);
  };

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const triggerLabel = TRIGGER_LABEL[locale] || TRIGGER_LABEL.en;
  const sidebarHomeLabel = SIDEBAR_HOME_LABEL[locale] || SIDEBAR_HOME_LABEL.en;

  return (
    <>
      {/* Desktop mega menu — hidden on mobile */}
      <nav
        className={styles.nav}
        onMouseEnter={openDesktop}
        onMouseLeave={scheduleClose}
        aria-label={triggerLabel}
      >
        <button
          type="button"
          className={`${styles.nav__trigger}${desktopOpen ? ` ${styles['nav__trigger--open']}` : ''}`}
          aria-haspopup="true"
          aria-expanded={desktopOpen}
        >
          {triggerLabel}
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
            <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          className={`${styles.nav__dropdown}${desktopOpen ? ` ${styles['nav__dropdown--open']}` : ''}`}
          role="menu"
          onMouseEnter={openDesktop}
          onMouseLeave={scheduleClose}
        >
          <div className={styles['nav__dropdown-inner']}>
            {NAV_CATEGORIES.map((cat) => (
              <div key={cat.key} className={styles.nav__category}>
                <p className={styles['nav__category-title']}>
                  {cat.labelsByLocale[locale] || cat.labelsByLocale.en}
                </p>
                <ul className={styles['nav__tool-list']}>
                  {cat.tools.map((tool) => (
                    <li key={tool.href}>
                      <Link
                        href={`/${locale}${tool.href}`}
                        className={styles['nav__tool-link']}
                        role="menuitem"
                        onClick={closeDesktop}
                      >
                        {tool.labels[locale] || tool.labels.en}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Burger button — mobile only */}
      <button
        type="button"
        className={styles.burger}
        onClick={() => setSidebarOpen(true)}
        aria-label={triggerLabel}
        aria-expanded={sidebarOpen}
      >
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
          <rect x="0" y="0" width="22" height="2" rx="1" fill="currentColor" />
          <rect x="0" y="7" width="22" height="2" rx="1" fill="currentColor" />
          <rect x="0" y="14" width="22" height="2" rx="1" fill="currentColor" />
        </svg>
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar}${sidebarOpen ? ` ${styles['sidebar--open']}` : ''}`}
        aria-label={sidebarHomeLabel}
      >
        <div className={styles.sidebar__header}>
          <Link href={`/${locale}`} className={styles.sidebar__home} onClick={closeSidebar}>
            {sidebarHomeLabel}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <button
            type="button"
            className={styles.sidebar__close}
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {NAV_CATEGORIES.map((cat) => {
          const isOpen = openSection === cat.key;
          return (
            <div key={cat.key} className={styles.sidebar__section}>
              <button
                type="button"
                className={styles['sidebar__section-btn']}
                onClick={() => toggleSection(cat.key)}
                aria-expanded={isOpen}
              >
                <span>{cat.labelsByLocale[locale] || cat.labelsByLocale.en}</span>
                <svg
                  className={`${styles['sidebar__section-arrow']}${isOpen ? ` ${styles['sidebar__section-arrow--open']}` : ''}`}
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isOpen && (
                <ul className={styles['sidebar__tool-list']}>
                  {cat.tools.map((tool) => (
                    <li key={tool.href}>
                      <Link
                        href={`/${locale}${tool.href}`}
                        className={styles['sidebar__tool-link']}
                        onClick={closeSidebar}
                      >
                        {tool.labels[locale] || tool.labels.en}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </aside>
    </>
  );
}

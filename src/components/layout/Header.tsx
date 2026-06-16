import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import NavMenu from './NavMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';
import styles from './Header.module.scss';

type Props = {
  locale: string;
};

function LogoSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 178 40" width="142" height="32" aria-hidden="true">
      <rect x="0" y="0" width="40" height="40" rx="8" fill="#1565C0" />
      <rect x="6" y="8" width="22" height="3.5" rx="1.75" fill="white" />
      <rect x="6" y="17" width="15" height="3.5" rx="1.75" fill="white" />
      <rect x="6" y="26" width="11" height="3.5" rx="1.75" fill="white" />
      <text x="29" y="33" textAnchor="middle" fontSize="16" fontWeight="700" fill="white" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif">U</text>
      <text x="50" y="28" fontSize="22" fontWeight="600" fill="currentColor" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif" letterSpacing="-0.3">Utilixi</text>
    </svg>
  );
}

export default function Header({ locale }: Props) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__inner}`}>
        <Link href={`/${locale}`} className={styles.header__logo} aria-label="Utilixi — free online calculators">
          <span className={styles.header__logo_wrap}>
            <LogoSvg />
          </span>
        </Link>
        <div className={styles.header__right}>
          <ThemeToggle locale={locale} />
          <LanguageSwitcher currentLocale={locale} />
          <NavMenu locale={locale} />
        </div>
      </div>
    </header>
  );
}

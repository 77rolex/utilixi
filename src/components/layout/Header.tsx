import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './Header.module.scss';

type Props = {
  locale: string;
};

export default function Header({ locale }: Props) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__inner}`}>
        <Link href={`/${locale}`} className={styles.header__logo}>
          <span className={styles['header__logo-text']}>Utilixi</span>
        </Link>
        <LanguageSwitcher currentLocale={locale} />
      </div>
    </header>
  );
}

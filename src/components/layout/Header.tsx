import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import NavMenu from './NavMenu';
import styles from './Header.module.scss';

type Props = {
  locale: string;
};

export default function Header({ locale }: Props) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__inner}`}>
        <Link href={`/${locale}`} className={styles.header__logo}>
          <Image
            src="/logo.svg"
            alt="Utilixi — free online calculators"
            width={142}
            height={32}
            priority
          />
        </Link>
        <div className={styles.header__right}>
          <NavMenu locale={locale} />
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  );
}

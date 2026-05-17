import Link from 'next/link';
import styles from './AdPlaceholder.module.scss';

type Size = 'sidebar' | 'banner';

type Props = {
  locale: string;
  size?: Size;
};

const T: Record<string, { label: string; title: string; cta: string }> = {
  en: { label: 'Advertisement', title: 'Your ad could be here', cta: 'Contact us' },
  ru: { label: 'Реклама', title: 'Здесь может быть ваша реклама', cta: 'Связаться с нами' },
  uk: { label: 'Реклама', title: 'Тут може бути ваша реклама', cta: 'Зв\'язатися з нами' },
  fr: { label: 'Publicité', title: 'Votre publicité ici', cta: 'Nous contacter' },
  lt: { label: 'Reklama', title: 'Čia gali būti jūsų reklama', cta: 'Susisiekite' },
};

export default function AdPlaceholder({ locale, size = 'sidebar' }: Props) {
  const t = T[locale] || T.en;

  return (
    <div className={`${styles['ad-placeholder']} ${styles[`ad-placeholder--${size}`]}`}>
      <div className={styles['ad-placeholder__inner']}>
        <span className={styles['ad-placeholder__label']}>{t.label}</span>
        <div className={styles['ad-placeholder__icon']} aria-hidden="true">
          <span className={styles['ad-placeholder__icon-bar']} />
          <span className={styles['ad-placeholder__icon-bar']} />
          <span className={styles['ad-placeholder__icon-bar']} />
        </div>
        <p className={styles['ad-placeholder__title']}>{t.title}</p>
        <Link
          href={`/${locale}/contact`}
          className={styles['ad-placeholder__btn']}
        >
          {t.cta}
        </Link>
      </div>
    </div>
  );
}

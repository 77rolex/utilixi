'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CookieBanner.module.scss';

type Props = {
  locale: string;
};

const T: Record<string, {
  title: string;
  text: string;
  learnMore: string;
  accept: string;
  decline: string;
}> = {
  en: {
    title: 'We use cookies',
    text: 'We use cookies to improve your experience and analyse site traffic. By clicking "Accept", you consent to the use of cookies.',
    learnMore: 'Privacy Policy',
    accept: 'Accept',
    decline: 'Decline',
  },
  ru: {
    title: 'Мы используем файлы cookie',
    text: 'Мы используем cookie для улучшения работы сайта и анализа трафика. Нажимая «Принять», вы соглашаетесь с их использованием.',
    learnMore: 'Политика конфиденциальности',
    accept: 'Принять',
    decline: 'Отклонить',
  },
  uk: {
    title: 'Ми використовуємо cookie',
    text: 'Ми використовуємо cookie для покращення роботи сайту та аналізу трафіку. Натискаючи «Прийняти», ви погоджуєтесь з їх використанням.',
    learnMore: 'Політика конфіденційності',
    accept: 'Прийняти',
    decline: 'Відхилити',
  },
  fr: {
    title: 'Nous utilisons des cookies',
    text: 'Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic. En cliquant sur « Accepter », vous consentez à leur utilisation.',
    learnMore: 'Politique de confidentialité',
    accept: 'Accepter',
    decline: 'Refuser',
  },
  lt: {
    title: 'Naudojame slapukus',
    text: 'Naudojame slapukus, kad pagerintume naudojimosi patirtį ir analizuotume srautą. Spustelėdami „Sutinku", sutinkate su jų naudojimu.',
    learnMore: 'Privatumo politika',
    accept: 'Sutinku',
    decline: 'Atsisakyti',
  },
};

const STORAGE_KEY = 'utilixi_cookie_consent';

export default function CookieBanner({ locale }: Props) {
  const t = T[locale] || T.en;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles['cookie-banner']} role="dialog" aria-modal="false" aria-label={t.title}>
      <div className={styles['cookie-banner__inner']}>
        <div className={styles['cookie-banner__icon']} aria-hidden="true">🍪</div>
        <div className={styles['cookie-banner__body']}>
          <p className={styles['cookie-banner__title']}>{t.title}</p>
          <p className={styles['cookie-banner__text']}>
            {t.text}{' '}
            <Link href={`/${locale}/privacy-policy`} className={styles['cookie-banner__link']}>
              {t.learnMore}
            </Link>
          </p>
        </div>
        <div className={styles['cookie-banner__actions']}>
          <button
            className={`${styles['cookie-banner__btn']} ${styles['cookie-banner__btn--accept']}`}
            onClick={handleAccept}
            type="button"
          >
            {t.accept}
          </button>
          <button
            className={`${styles['cookie-banner__btn']} ${styles['cookie-banner__btn--decline']}`}
            onClick={handleDecline}
            type="button"
          >
            {t.decline}
          </button>
        </div>
      </div>
    </div>
  );
}

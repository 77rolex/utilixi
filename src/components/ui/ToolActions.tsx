'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { isFavorite, toggleFavorite } from '@/lib/favorites';
import styles from './ToolActions.module.scss';

const LOCALES = ['en', 'ru', 'uk', 'fr', 'lt'];

const T: Record<string, {
  addFav: string;
  removeFav: string;
  share: string;
  copied: string;
}> = {
  en: { addFav: 'Add to Favorites', removeFav: 'Remove from Favorites', share: 'Share', copied: 'Copied!' },
  ru: { addFav: 'В избранное', removeFav: 'Убрать из избранного', share: 'Поделиться', copied: 'Скопировано!' },
  uk: { addFav: 'До вибраного', removeFav: 'Видалити з вибраного', share: 'Поділитися', copied: 'Скопійовано!' },
  fr: { addFav: 'Ajouter aux favoris', removeFav: 'Retirer des favoris', share: 'Partager', copied: 'Copié !' },
  lt: { addFav: 'Pridėti prie mėgstamiausių', removeFav: 'Pašalinti iš mėgstamiausių', share: 'Dalintis', copied: 'Nukopijuota!' },
};

export default function ToolActions() {
  const pathname = usePathname();
  const [fav, setFav] = useState(false);
  const [copied, setCopied] = useState(false);

  const segments = pathname.split('/').filter(Boolean);
  const isLocale = segments.length > 0 && LOCALES.includes(segments[0]);
  const locale = isLocale ? segments[0] : 'en';
  const toolPath = isLocale ? '/' + segments.slice(1).join('/') : '/' + segments.join('/');
  const isTool = /^\/(calculator|tools|converter|currency|crypto|weather)/.test(toolPath);

  useEffect(() => {
    if (isTool) setFav(isFavorite(toolPath));
  }, [toolPath, isTool]);

  if (!isTool) return null;

  const t = T[locale] ?? T.en;

  const handleFavorite = () => {
    const added = toggleFavorite(toolPath);
    setFav(added);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ url });
        return;
      }
    } catch {
      // пользователь отменил share или браузер не поддерживает
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard недоступен
    }
  };

  return (
    <div className={styles['tool-actions']}>
      <button
        type="button"
        className={`${styles['tool-actions__btn']} ${styles['tool-actions__btn--star']} ${fav ? styles['tool-actions__btn--fav'] : ''}`}
        onClick={handleFavorite}
        aria-label={fav ? t.removeFav : t.addFav}
        title={fav ? t.removeFav : t.addFav}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>

      <button
        type="button"
        className={`${styles['tool-actions__btn']} ${copied ? styles['tool-actions__btn--copied'] : ''}`}
        onClick={handleShare}
        aria-label={t.share}
        title={t.share}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <span>{copied ? t.copied : t.share}</span>
      </button>
    </div>
  );
}

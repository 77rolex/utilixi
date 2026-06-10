'use client';

import { useEffect, useState } from 'react';
import styles from './MercuryRetrogradeCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  loading: string;
  activeTitle: string; activeEnds: string;
  nextTitle: string; nextStarts: string; daysAway: string;
  upcomingTitle: string;
  whatToAvoid: string; whatToAvoidText: string;
  periods: string; start: string; end: string;
}> = {
  en: {
    loading: 'Checking current status…',
    activeTitle: '⚠️ Mercury is currently Retrograde!',
    activeEnds: 'Ends on',
    nextTitle: '✅ Mercury is NOT in Retrograde',
    nextStarts: 'Next retrograde starts',
    daysAway: 'days away',
    upcomingTitle: 'Upcoming Mercury Retrograde periods',
    whatToAvoid: 'What to watch out for',
    whatToAvoidText: 'During Mercury retrograde: avoid signing contracts, launching major projects, making big purchases, or starting important conversations. Back up data, allow extra time for travel, and double-check all communications.',
    periods: 'Period', start: 'Start', end: 'End',
  },
  ru: {
    loading: 'Проверяю текущий статус…',
    activeTitle: '⚠️ Меркурий сейчас ретроградный!',
    activeEnds: 'Завершается',
    nextTitle: '✅ Меркурий НЕ ретроградный',
    nextStarts: 'Следующий ретроград начнётся',
    daysAway: 'дней',
    upcomingTitle: 'Предстоящие периоды Меркурия ретроградного',
    whatToAvoid: 'На что обратить внимание',
    whatToAvoidText: 'Во время ретроградного Меркурия: избегайте подписания контрактов, запуска крупных проектов, крупных покупок. Делайте резервные копии данных, выделяйте больше времени на дорогу, перепроверяйте всю переписку.',
    periods: 'Период', start: 'Начало', end: 'Конец',
  },
  uk: {
    loading: 'Перевіряю поточний статус…',
    activeTitle: '⚠️ Меркурій зараз ретроградний!',
    activeEnds: 'Завершується',
    nextTitle: '✅ Меркурій НЕ ретроградний',
    nextStarts: 'Наступний ретроград почнеться',
    daysAway: 'днів',
    upcomingTitle: 'Наступні періоди ретроградного Меркурія',
    whatToAvoid: 'На що звернути увагу',
    whatToAvoidText: 'Під час ретроградного Меркурія: уникайте підписання контрактів, запуску великих проектів, великих покупок. Робіть резервні копії даних, виділяйте більше часу на дорогу, перевіряйте всі повідомлення.',
    periods: 'Період', start: 'Початок', end: 'Кінець',
  },
  fr: {
    loading: 'Vérification du statut actuel…',
    activeTitle: '⚠️ Mercure est actuellement rétrograde !',
    activeEnds: 'Se termine le',
    nextTitle: '✅ Mercure N\'est PAS rétrograde',
    nextStarts: 'Prochain rétrograde le',
    daysAway: 'jours restants',
    upcomingTitle: 'Prochaines périodes de Mercure rétrograde',
    whatToAvoid: 'Ce qu\'il faut éviter',
    whatToAvoidText: 'Pendant Mercure rétrograde : évitez de signer des contrats, lancer de grands projets ou faire de gros achats. Sauvegardez vos données, prévoyez plus de temps pour les déplacements et vérifiez toutes vos communications.',
    periods: 'Période', start: 'Début', end: 'Fin',
  },
  lt: {
    loading: 'Tikrinama dabartinė būklė…',
    activeTitle: '⚠️ Merkurijus šiuo metu yra retrogradinis!',
    activeEnds: 'Baigiasi',
    nextTitle: '✅ Merkurijus NĖRA retrogradinis',
    nextStarts: 'Kitas retrogradas prasideda',
    daysAway: 'dienų',
    upcomingTitle: 'Artimiausi Merkurijaus retrogrado laikotarpiai',
    whatToAvoid: 'Ko reikia saugotis',
    whatToAvoidText: 'Merkurijaus retrogrado metu: venkite pasirašyti sutartis, pradėti didelius projektus ar daryti didelius pirkinius. Kurkite atsargines kopijas, skirkite daugiau laiko kelionėms ir dar kartą patikrinkite visus ryšius.',
    periods: 'Laikotarpis', start: 'Pradžia', end: 'Pabaiga',
  },
};

const RETRO_PERIODS: { start: string; end: string }[] = [
  { start: '2024-04-01', end: '2024-04-25' },
  { start: '2024-08-05', end: '2024-08-28' },
  { start: '2024-11-25', end: '2024-12-15' },
  { start: '2025-03-15', end: '2025-04-07' },
  { start: '2025-07-17', end: '2025-08-11' },
  { start: '2025-11-09', end: '2025-11-29' },
  { start: '2026-02-25', end: '2026-03-20' },
  { start: '2026-06-29', end: '2026-07-23' },
  { start: '2026-10-24', end: '2026-11-13' },
  { start: '2027-02-09', end: '2027-03-04' },
  { start: '2027-06-10', end: '2027-07-04' },
  { start: '2027-10-07', end: '2027-10-27' },
  { start: '2028-01-24', end: '2028-02-14' },
  { start: '2028-05-22', end: '2028-06-14' },
  { start: '2028-09-17', end: '2028-10-10' },
  { start: '2029-01-07', end: '2029-01-26' },
  { start: '2029-05-03', end: '2029-05-26' },
  { start: '2029-09-01', end: '2029-09-24' },
];

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString(locale === 'ru' || locale === 'uk' ? 'ru-RU' : locale === 'fr' ? 'fr-FR' : locale === 'lt' ? 'lt-LT' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function MercuryRetrogradeCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [status, setStatus] = useState<null | {
    active: boolean;
    endDate?: string;
    nextStart?: string;
    daysUntil?: number;
    upcoming: { start: string; end: string }[];
  }>(null);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    let active = false;
    let endDate: string | undefined;
    let nextStart: string | undefined;
    let daysUntil: number | undefined;

    for (const p of RETRO_PERIODS) {
      if (todayStr >= p.start && todayStr <= p.end) {
        active = true;
        endDate = p.end;
        break;
      }
    }

    if (!active) {
      for (const p of RETRO_PERIODS) {
        if (p.start > todayStr) {
          nextStart = p.start;
          const next = new Date(p.start + 'T12:00:00');
          daysUntil = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          break;
        }
      }
    }

    const upcoming = RETRO_PERIODS.filter(p => p.end >= todayStr).slice(0, 6);
    setStatus({ active, endDate, nextStart, daysUntil, upcoming });
  }, []);

  if (!status) return <div className={styles.calc}><p className={styles.calc__loading}>{t.loading}</p></div>;

  return (
    <div className={styles.calc}>
      <div className={`${styles.calc__status} ${status.active ? styles['calc__status--active'] : styles['calc__status--ok']}`}>
        <div className={styles.calc__status_title}>
          {status.active ? t.activeTitle : t.nextTitle}
        </div>
        {status.active && status.endDate && (
          <div className={styles.calc__status_sub}>{t.activeEnds}: <strong>{formatDate(status.endDate, locale)}</strong></div>
        )}
        {!status.active && status.nextStart && (
          <div className={styles.calc__status_sub}>
            {t.nextStarts}: <strong>{formatDate(status.nextStart, locale)}</strong>
            {status.daysUntil !== undefined && ` (${status.daysUntil} ${t.daysAway})`}
          </div>
        )}
      </div>

      <div className={styles.calc__avoid}>
        <h3 className={styles.calc__avoid_title}>{t.whatToAvoid}</h3>
        <p className={styles.calc__avoid_text}>{t.whatToAvoidText}</p>
      </div>

      <div className={styles.calc__upcoming}>
        <h3 className={styles.calc__upcoming_title}>{t.upcomingTitle}</h3>
        <div className={styles.calc__list}>
          {status.upcoming.map((p, i) => {
            const today = new Date().toISOString().split('T')[0];
            const isCurrent = today >= p.start && today <= p.end;
            return (
              <div key={i} className={`${styles.calc__item}${isCurrent ? ' ' + styles['calc__item--current'] : ''}`}>
                <span className={styles.calc__item_start}>{formatDate(p.start, locale)}</span>
                <span className={styles.calc__item_sep}>→</span>
                <span className={styles.calc__item_end}>{formatDate(p.end, locale)}</span>
                {isCurrent && <span className={styles.calc__item_badge}>NOW</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

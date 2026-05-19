'use client';

import { useState } from 'react';
import styles from './HeartRateCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  age: string; restingHr: string; restingHrOptional: string;
  methodBasic: string; methodKarvonen: string;
  calculate: string; reset: string;
  maxHr: string; hrReserve: string;
  zone: string; bpm: string; purpose: string;
  z1: string; z2: string; z3: string; z4: string; z5: string;
  z1name: string; z2name: string; z3name: string; z4name: string; z5name: string;
  errAge: string; errAgeRange: string; errHr: string;
  disclaimer: string;
}> = {
  en: {
    age: 'Age (years)', restingHr: 'Resting heart rate (bpm)', restingHrOptional: 'Resting HR — optional, enables Karvonen formula',
    methodBasic: '220 − age', methodKarvonen: 'Karvonen (with resting HR)',
    calculate: 'Calculate', reset: 'Reset',
    maxHr: 'Max heart rate', hrReserve: 'Heart rate reserve',
    zone: 'Zone', bpm: 'BPM range', purpose: 'Purpose',
    z1: 'Zone 1', z2: 'Zone 2', z3: 'Zone 3', z4: 'Zone 4', z5: 'Zone 5',
    z1name: 'Warm-up / Recovery', z2name: 'Fat burning / Base endurance', z3name: 'Aerobic / Cardio', z4name: 'Anaerobic threshold', z5name: 'Maximum effort',
    errAge: 'Enter your age.', errAgeRange: 'Age must be between 10 and 100.', errHr: 'Resting HR must be between 30 and 120 bpm.',
    disclaimer: 'These are estimated zones based on the standard 220−age formula. For precise training zones, consult a sports physician or use a lab-based VO2max test.',
  },
  ru: {
    age: 'Возраст (лет)', restingHr: 'Пульс в покое (уд/мин)', restingHrOptional: 'Пульс в покое — необязательно, включает формулу Карвонена',
    methodBasic: '220 − возраст', methodKarvonen: 'Карвонена (с пульсом покоя)',
    calculate: 'Рассчитать', reset: 'Сбросить',
    maxHr: 'Максимальный пульс', hrReserve: 'Резерв пульса',
    zone: 'Зона', bpm: 'Диапазон (уд/мин)', purpose: 'Цель тренировки',
    z1: 'Зона 1', z2: 'Зона 2', z3: 'Зона 3', z4: 'Зона 4', z5: 'Зона 5',
    z1name: 'Разминка / Восстановление', z2name: 'Сжигание жира / Базовая выносливость', z3name: 'Аэробная / Кардио', z4name: 'Анаэробный порог', z5name: 'Максимальные усилия',
    errAge: 'Введите возраст.', errAgeRange: 'Возраст должен быть от 10 до 100 лет.', errHr: 'Пульс в покое должен быть от 30 до 120 уд/мин.',
    disclaimer: 'Зоны рассчитаны по стандартной формуле 220−возраст. Для точных тренировочных зон обратитесь к спортивному врачу или пройдите тест VO2max в лаборатории.',
  },
  uk: {
    age: 'Вік (років)', restingHr: 'Пульс у спокої (уд/хв)', restingHrOptional: 'Пульс у спокої — необов\'язково, вмикає формулу Карвонена',
    methodBasic: '220 − вік', methodKarvonen: 'Карвонена (з пульсом спокою)',
    calculate: 'Розрахувати', reset: 'Скинути',
    maxHr: 'Максимальний пульс', hrReserve: 'Резерв пульсу',
    zone: 'Зона', bpm: 'Діапазон (уд/хв)', purpose: 'Мета тренування',
    z1: 'Зона 1', z2: 'Зона 2', z3: 'Зона 3', z4: 'Зона 4', z5: 'Зона 5',
    z1name: 'Розминка / Відновлення', z2name: 'Спалювання жиру / Базова витривалість', z3name: 'Аеробна / Кардіо', z4name: 'Анаеробний поріг', z5name: 'Максимальні зусилля',
    errAge: 'Введіть вік.', errAgeRange: 'Вік має бути від 10 до 100 років.', errHr: 'Пульс у спокої має бути від 30 до 120 уд/хв.',
    disclaimer: 'Зони розраховані за стандартною формулою 220−вік. Для точних тренувальних зон зверніться до спортивного лікаря або пройдіть тест VO2max.',
  },
  fr: {
    age: 'Âge (ans)', restingHr: 'FC de repos (bpm)', restingHrOptional: 'FC repos — facultatif, active la formule de Karvonen',
    methodBasic: '220 − âge', methodKarvonen: 'Karvonen (avec FC repos)',
    calculate: 'Calculer', reset: 'Réinitialiser',
    maxHr: 'FC maximale', hrReserve: 'Réserve de FC',
    zone: 'Zone', bpm: 'Plage (bpm)', purpose: 'Objectif d\'entraînement',
    z1: 'Zone 1', z2: 'Zone 2', z3: 'Zone 3', z4: 'Zone 4', z5: 'Zone 5',
    z1name: 'Échauffement / Récupération', z2name: 'Combustion des graisses / Endurance de base', z3name: 'Aérobie / Cardio', z4name: 'Seuil anaérobie', z5name: 'Effort maximal',
    errAge: 'Entrez votre âge.', errAgeRange: 'L\'âge doit être entre 10 et 100 ans.', errHr: 'La FC de repos doit être entre 30 et 120 bpm.',
    disclaimer: 'Ces zones sont estimées selon la formule standard 220−âge. Pour des zones précises, consultez un médecin du sport ou effectuez un test VO2max en laboratoire.',
  },
  lt: {
    age: 'Amžius (metai)', restingHr: 'Ramybės pulsas (k/min)', restingHrOptional: 'Ramybės pulsas — neprivaloma, įjungia Karvonenų formulę',
    methodBasic: '220 − amžius', methodKarvonen: 'Karvonenų (su ramybės pulsu)',
    calculate: 'Skaičiuoti', reset: 'Išvalyti',
    maxHr: 'Maksimalus pulsas', hrReserve: 'Pulso rezervas',
    zone: 'Zona', bpm: 'Diapazonas (k/min)', purpose: 'Treniruotės tikslas',
    z1: '1 zona', z2: '2 zona', z3: '3 zona', z4: '4 zona', z5: '5 zona',
    z1name: 'Atšilimas / Atsigavimas', z2name: 'Riebalų deginimas / Bazinė ištvermė', z3name: 'Aerobinė / Kardiо', z4name: 'Anaerobinis slenkstis', z5name: 'Maksimalios pastangos',
    errAge: 'Įveskite amžių.', errAgeRange: 'Amžius turi būti nuo 10 iki 100 metų.', errHr: 'Ramybės pulsas turi būti nuo 30 iki 120 k/min.',
    disclaimer: 'Zonos apskaičiuotos pagal standartinę 220−amžius formulę. Tikslioms treniruočių zonoms kreipkitės į sporto gydytoją arba atlikite VO2max testą laboratorijoje.',
  },
};

const ZONE_PERCENTS = [
  { min: 0.50, max: 0.60 },
  { min: 0.60, max: 0.70 },
  { min: 0.70, max: 0.80 },
  { min: 0.80, max: 0.90 },
  { min: 0.90, max: 1.00 },
];

const ZONE_COLORS = ['#34d399', '#60a5fa', '#facc15', '#fb923c', '#f87171'];

type ZoneRow = { name: string; low: number; high: number; purpose: string; color: string };

function calcZones(maxHr: number, restingHr: number, useKarvonen: boolean, t: typeof T['en']): ZoneRow[] {
  const names = [t.z1name, t.z2name, t.z3name, t.z4name, t.z5name];
  return ZONE_PERCENTS.map(({ min, max }, i) => {
    let low: number, high: number;
    if (useKarvonen) {
      const hrr = maxHr - restingHr;
      low = Math.round(hrr * min + restingHr);
      high = Math.round(hrr * max + restingHr);
    } else {
      low = Math.round(maxHr * min);
      high = Math.round(maxHr * max);
    }
    return { name: [t.z1, t.z2, t.z3, t.z4, t.z5][i], low, high, purpose: names[i], color: ZONE_COLORS[i] };
  });
}

export default function HeartRateCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [age, setAge] = useState('30');
  const [restingHr, setRestingHr] = useState('');
  const [zones, setZones] = useState<ZoneRow[] | null>(null);
  const [maxHr, setMaxHr] = useState(0);
  const [hrReserve, setHrReserve] = useState(0);
  const [error, setError] = useState('');

  const calculate = () => {
    const a = parseInt(age);
    const rhr = restingHr !== '' ? parseInt(restingHr) : null;
    if (isNaN(a) || age === '') { setError(t.errAge); return; }
    if (a < 10 || a > 100) { setError(t.errAgeRange); return; }
    if (rhr !== null && (isNaN(rhr) || rhr < 30 || rhr > 120)) { setError(t.errHr); return; }
    setError('');
    const mhr = 220 - a;
    const useKarvo = rhr !== null;
    setMaxHr(mhr);
    setHrReserve(useKarvo ? mhr - rhr! : 0);
    setZones(calcZones(mhr, rhr ?? 0, useKarvo, t));
  };

  const reset = () => { setAge('30'); setRestingHr(''); setZones(null); setError(''); setMaxHr(0); setHrReserve(0); };

  const useKarvo = restingHr !== '';

  return (
    <div className={styles['hr-calc']}>
      <div className={styles['hr-calc__form']}>
        <div className={styles['hr-calc__field']}>
          <label className={styles['hr-calc__label']}>{t.age}</label>
          <input type="number" className={styles['hr-calc__input']} value={age}
            onChange={e => { setAge(e.target.value); setError(''); setZones(null); }}
            onKeyDown={e => e.key === 'Enter' && calculate()}
            min="10" max="100" placeholder="30" />
        </div>

        <div className={styles['hr-calc__field']}>
          <label className={styles['hr-calc__label']}>{t.restingHr}</label>
          <input type="number" className={styles['hr-calc__input']} value={restingHr}
            onChange={e => { setRestingHr(e.target.value); setError(''); setZones(null); }}
            onKeyDown={e => e.key === 'Enter' && calculate()}
            min="30" max="120" placeholder="60" />
          <span className={styles['hr-calc__hint']}>{t.restingHrOptional}</span>
        </div>

        {error && <p className={styles['hr-calc__error']}>{error}</p>}

        <div className={styles['hr-calc__actions']}>
          <button type="button" className={styles['hr-calc__btn']} onClick={calculate}>{t.calculate}</button>
          <button type="button" className={styles['hr-calc__btn--reset']} onClick={reset}>{t.reset}</button>
        </div>
      </div>

      {zones && (
        <div className={styles['hr-calc__result']}>
          <div className={styles['hr-calc__summary']}>
            <div className={styles['hr-calc__summary-item']}>
              <span className={styles['hr-calc__summary-label']}>{t.maxHr}</span>
              <span className={styles['hr-calc__summary-value']}>{maxHr} <small>bpm</small></span>
            </div>
            {useKarvo && (
              <div className={styles['hr-calc__summary-item']}>
                <span className={styles['hr-calc__summary-label']}>{t.hrReserve}</span>
                <span className={styles['hr-calc__summary-value']}>{hrReserve} <small>bpm</small></span>
              </div>
            )}
          </div>

          <div className={styles['hr-calc__zones']}>
            {zones.map((z, i) => (
              <div key={i} className={styles['hr-calc__zone']} style={{ '--zone-color': z.color } as React.CSSProperties}>
                <div className={styles['hr-calc__zone-bar']} />
                <div className={styles['hr-calc__zone-info']}>
                  <span className={styles['hr-calc__zone-name']}>{z.name}</span>
                  <span className={styles['hr-calc__zone-purpose']}>{z.purpose}</span>
                </div>
                <span className={styles['hr-calc__zone-bpm']}>{z.low}–{z.high}</span>
              </div>
            ))}
          </div>

          <p className={styles['hr-calc__disclaimer']}>{t.disclaimer}</p>
        </div>
      )}
    </div>
  );
}

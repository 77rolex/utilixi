'use client';

import { useState, useMemo } from 'react';
import styles from './PregnancyCalculator.module.scss';

type Props = { locale: string };
type Mode = 'lmp' | 'conception';

const LOCALE_MAP: Record<string, string> = {
  en: 'en-GB', ru: 'ru-RU', uk: 'uk-UA', fr: 'fr-FR', lt: 'lt-LT',
};

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date: Date, locale: string): string {
  return date.toLocaleDateString(LOCALE_MAP[locale] || 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

const T: Record<string, {
  modeLmp: string;
  modeConception: string;
  labelLmp: string;
  labelConception: string;
  calculate: string;
  resultDueDate: string;
  resultAge: string;
  weeksShort: string;
  daysShort: string;
  trimester1: string;
  trimester2: string;
  trimester3: string;
  milestonesTitle: string;
  milestone1: string;
  milestone2: string;
  milestoneDue: string;
  duePassed: string;
  disclaimer: string;
  errorEmpty: string;
  errorFuture: string;
  errorTooEarly: string;
}> = {
  en: {
    modeLmp: 'Last Period',
    modeConception: 'Conception Date',
    labelLmp: 'Date of Last Menstrual Period',
    labelConception: 'Date of Conception',
    calculate: 'Calculate Due Date',
    resultDueDate: 'Estimated Due Date',
    resultAge: 'Gestational Age',
    weeksShort: 'wk',
    daysShort: 'd',
    trimester1: '1st trimester',
    trimester2: '2nd trimester',
    trimester3: '3rd trimester',
    milestonesTitle: 'Key Dates',
    milestone1: 'End of 1st trimester',
    milestone2: 'End of 2nd trimester',
    milestoneDue: 'Estimated due date',
    duePassed: 'The estimated due date has passed',
    disclaimer: 'For informational purposes only. Your actual due date is determined by your doctor.',
    errorEmpty: 'Please enter a date.',
    errorFuture: 'Date cannot be in the future.',
    errorTooEarly: 'Date is too far in the past (more than 42 weeks).',
  },
  ru: {
    modeLmp: 'Последняя менструация',
    modeConception: 'Дата зачатия',
    labelLmp: 'Дата последней менструации',
    labelConception: 'Дата зачатия',
    calculate: 'Рассчитать дату родов',
    resultDueDate: 'Предполагаемая дата родов',
    resultAge: 'Срок беременности',
    weeksShort: 'нед.',
    daysShort: 'дн.',
    trimester1: '1-й триместр',
    trimester2: '2-й триместр',
    trimester3: '3-й триместр',
    milestonesTitle: 'Ключевые даты',
    milestone1: 'Конец 1-го триместра',
    milestone2: 'Конец 2-го триместра',
    milestoneDue: 'Предполагаемые роды',
    duePassed: 'Предполагаемая дата родов прошла',
    disclaimer: 'Носит информационный характер. Точную дату родов определяет врач.',
    errorEmpty: 'Введите дату.',
    errorFuture: 'Дата не может быть в будущем.',
    errorTooEarly: 'Слишком давняя дата (более 42 недель).',
  },
  uk: {
    modeLmp: 'Остання менструація',
    modeConception: 'Дата зачаття',
    labelLmp: 'Дата останньої менструації',
    labelConception: 'Дата зачаття',
    calculate: 'Розрахувати дату пологів',
    resultDueDate: 'Очікувана дата пологів',
    resultAge: 'Термін вагітності',
    weeksShort: 'тиж.',
    daysShort: 'дн.',
    trimester1: '1-й триместр',
    trimester2: '2-й триместр',
    trimester3: '3-й триместр',
    milestonesTitle: 'Ключові дати',
    milestone1: 'Кінець 1-го триместру',
    milestone2: 'Кінець 2-го триместру',
    milestoneDue: 'Очікувані пологи',
    duePassed: 'Очікувана дата пологів минула',
    disclaimer: 'Має інформаційний характер. Точну дату пологів визначає лікар.',
    errorEmpty: 'Введіть дату.',
    errorFuture: 'Дата не може бути в майбутньому.',
    errorTooEarly: 'Надто давня дата (більше 42 тижнів).',
  },
  fr: {
    modeLmp: 'Dernières règles',
    modeConception: 'Conception',
    labelLmp: 'Date des dernières règles',
    labelConception: 'Date de conception',
    calculate: "Calculer la date d'accouchement",
    resultDueDate: "Date d'accouchement prévue",
    resultAge: 'Âge gestationnel',
    weeksShort: 'sem.',
    daysShort: 'j',
    trimester1: '1er trimestre',
    trimester2: '2e trimestre',
    trimester3: '3e trimestre',
    milestonesTitle: 'Dates clés',
    milestone1: 'Fin du 1er trimestre',
    milestone2: 'Fin du 2e trimestre',
    milestoneDue: "Date d'accouchement prévue",
    duePassed: "La date d'accouchement prévue est passée",
    disclaimer: "À titre informatif uniquement. La date exacte d'accouchement est déterminée par votre médecin.",
    errorEmpty: 'Veuillez entrer une date.',
    errorFuture: 'La date ne peut pas être dans le futur.',
    errorTooEarly: 'Date trop ancienne (plus de 42 semaines).',
  },
  lt: {
    modeLmp: 'Paskutinės mėnesinės',
    modeConception: 'Pastojimo data',
    labelLmp: 'Paskutinių mėnesinių data',
    labelConception: 'Pastojimo data',
    calculate: 'Skaičiuoti gimdymo datą',
    resultDueDate: 'Numatoma gimdymo data',
    resultAge: 'Nėštumo trukmė',
    weeksShort: 'sav.',
    daysShort: 'd.',
    trimester1: '1-asis trimestras',
    trimester2: '2-asis trimestras',
    trimester3: '3-asis trimestras',
    milestonesTitle: 'Pagrindinės datos',
    milestone1: '1-ojo trimestro pabaiga',
    milestone2: '2-ojo trimestro pabaiga',
    milestoneDue: 'Numatoma gimdymo data',
    duePassed: 'Numatoma gimdymo data praėjo',
    disclaimer: 'Tik informaciniais tikslais. Tikslią gimdymo datą nustato gydytojas.',
    errorEmpty: 'Įveskite datą.',
    errorFuture: 'Data negali būti ateityje.',
    errorTooEarly: 'Data per sena (daugiau nei 42 savaitės).',
  },
};

type Result = {
  dueDate: Date;
  gestDays: number;
  lmpDate: Date;
};

export default function PregnancyCalculator({ locale }: Props) {
  const t = T[locale] || T.en;
  const [mode, setMode] = useState<Mode>('lmp');
  const [dateValue, setDateValue] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const maxDate = today.toISOString().split('T')[0];

  const handleModeChange = (m: Mode) => {
    setMode(m);
    setResult(null);
    setError('');
    setDateValue('');
  };

  const calculate = () => {
    if (!dateValue) {
      setError(t.errorEmpty);
      setResult(null);
      return;
    }

    const inputDate = new Date(dateValue + 'T00:00:00');

    if (inputDate > today) {
      setError(t.errorFuture);
      setResult(null);
      return;
    }

    let lmpDate: Date;
    let dueDate: Date;

    if (mode === 'lmp') {
      lmpDate = inputDate;
      dueDate = addDays(inputDate, 280);
    } else {
      // Conception ≈ LMP + 14 days → LMP = conception − 14
      lmpDate = addDays(inputDate, -14);
      dueDate = addDays(inputDate, 266);
    }

    const gestDays = Math.floor(
      (today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (gestDays > 294) {
      setError(t.errorTooEarly);
      setResult(null);
      return;
    }

    setError('');
    setResult({ dueDate, gestDays, lmpDate });
  };

  const trimesterNum: 1 | 2 | 3 = result
    ? result.gestDays < 91 ? 1 : result.gestDays < 182 ? 2 : 3
    : 1;

  const progressPct = result
    ? Math.min(100, Math.max(0, (result.gestDays / 280) * 100))
    : 0;

  const duePassed = result ? result.dueDate < today : false;

  const milestones = result
    ? [
        { label: t.milestone1, date: addDays(result.lmpDate, 91) },
        { label: t.milestone2, date: addDays(result.lmpDate, 182) },
        { label: t.milestoneDue, date: result.dueDate },
      ]
    : [];

  const trimesterLabels: Record<1 | 2 | 3, string> = {
    1: t.trimester1,
    2: t.trimester2,
    3: t.trimester3,
  };

  return (
    <div className={styles['pregnancy-widget']}>
      <div className={styles['pregnancy-widget__form']}>

        {/* Mode toggle */}
        <div className={styles['pregnancy-widget__toggle']} role="group">
          {(['lmp', 'conception'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              className={`${styles['pregnancy-widget__toggle-btn']}${mode === m ? ` ${styles['pregnancy-widget__toggle-btn--active']}` : ''}`}
              onClick={() => handleModeChange(m)}
            >
              {m === 'lmp' ? t.modeLmp : t.modeConception}
            </button>
          ))}
        </div>

        {/* Date input */}
        <div className={styles['pregnancy-widget__field']}>
          <label className={styles['pregnancy-widget__label']} htmlFor="preg-date">
            {mode === 'lmp' ? t.labelLmp : t.labelConception}
          </label>
          <input
            id="preg-date"
            type="date"
            className={styles['pregnancy-widget__input']}
            value={dateValue}
            max={maxDate}
            onChange={(e) => {
              setDateValue(e.target.value);
              setError('');
              setResult(null);
            }}
          />
        </div>

        {error && <p className={styles['pregnancy-widget__error']}>{error}</p>}

        <button
          type="button"
          className={styles['pregnancy-widget__btn']}
          onClick={calculate}
        >
          {t.calculate}
        </button>
      </div>

      {result && (
        <div className={styles['pregnancy-widget__results']}>

          {/* Due date */}
          <div className={styles['pregnancy-widget__due']}>
            <span className={styles['pregnancy-widget__due-label']}>{t.resultDueDate}</span>
            <span className={styles['pregnancy-widget__due-value']}>
              {formatDate(result.dueDate, locale)}
            </span>
          </div>

          {/* Gestational age + trimester badge */}
          {!duePassed ? (
            <div className={styles['pregnancy-widget__meta']}>
              <div className={styles['pregnancy-widget__age']}>
                <span className={styles['pregnancy-widget__age-label']}>{t.resultAge}</span>
                <span className={styles['pregnancy-widget__age-value']}>
                  {Math.floor(result.gestDays / 7)}&nbsp;{t.weeksShort}&nbsp;{result.gestDays % 7}&nbsp;{t.daysShort}
                </span>
              </div>
              <span
                className={`${styles['pregnancy-widget__trimester-badge']} ${styles[`pregnancy-widget__trimester-badge--${trimesterNum}`]}`}
              >
                {trimesterLabels[trimesterNum]}
              </span>
            </div>
          ) : (
            <p className={styles['pregnancy-widget__due-passed']}>{t.duePassed}</p>
          )}

          {/* Progress timeline */}
          <div className={styles['pregnancy-widget__timeline']}>
            <div className={styles['pregnancy-widget__timeline-track']}>
              <div
                className={styles['pregnancy-widget__timeline-fill']}
                style={{ width: `${progressPct}%` }}
              />
              {[32.5, 65, 100].map((pct) => (
                <div
                  key={pct}
                  className={styles['pregnancy-widget__timeline-tick']}
                  style={{ left: `${pct}%` }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className={styles['pregnancy-widget__timeline-labels']} aria-hidden="true">
              {[
                { pct: 32.5, label: `13 ${t.weeksShort}` },
                { pct: 65, label: `26 ${t.weeksShort}` },
                { pct: 100, label: `40 ${t.weeksShort}` },
              ].map(({ pct, label }, i, arr) => (
                <span
                  key={pct}
                  className={styles['pregnancy-widget__timeline-label']}
                  style={{
                    left: `${pct}%`,
                    transform: i === arr.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Key milestone dates */}
          <div className={styles['pregnancy-widget__milestones']}>
            <p className={styles['pregnancy-widget__milestones-title']}>{t.milestonesTitle}</p>
            {milestones.map(({ label, date }) => {
              const isPast = date <= today;
              return (
                <div key={label} className={styles['pregnancy-widget__milestone']}>
                  <span
                    className={`${styles['pregnancy-widget__milestone-dot']}${isPast ? ` ${styles['pregnancy-widget__milestone-dot--done']}` : ''}`}
                    aria-hidden="true"
                  />
                  <span className={styles['pregnancy-widget__milestone-label']}>{label}</span>
                  <span className={styles['pregnancy-widget__milestone-date']}>{formatDate(date, locale)}</span>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <p className={styles['pregnancy-widget__disclaimer']}>{t.disclaimer}</p>
        </div>
      )}
    </div>
  );
}

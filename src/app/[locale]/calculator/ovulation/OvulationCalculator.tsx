'use client';

import { useState, useCallback } from 'react';
import styles from './OvulationCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const INTL_LOCALE: Record<LangKey, string> = {
  en: 'en-GB', ru: 'ru-RU', uk: 'uk-UA', fr: 'fr-FR', lt: 'lt-LT',
};

const T: Record<LangKey, {
  lmpLabel: string;
  cycleLabel: string;
  cycleDays: string;
  calculate: string;
  ovulationDate: string;
  fertileWindow: string;
  nextPeriod: string;
  dueDate: string;
  errorDate: string;
  errorCycle: string;
  disclaimer: string;
}> = {
  en: {
    lmpLabel: 'First day of last menstrual period',
    cycleLabel: 'Cycle length',
    cycleDays: 'days',
    calculate: 'Calculate',
    ovulationDate: 'Ovulation date',
    fertileWindow: 'Fertile window',
    nextPeriod: 'Next period',
    dueDate: 'Due date (if pregnant)',
    errorDate: 'Please enter a valid date.',
    errorCycle: 'Cycle length must be between 21 and 35 days.',
    disclaimer: 'For informational purposes only. Cycle lengths vary. This calculator does not replace medical advice. Consult a healthcare provider for fertility guidance.',
  },
  ru: {
    lmpLabel: 'Первый день последней менструации',
    cycleLabel: 'Длина цикла',
    cycleDays: 'дней',
    calculate: 'Рассчитать',
    ovulationDate: 'Дата овуляции',
    fertileWindow: 'Фертильное окно',
    nextPeriod: 'Следующая менструация',
    dueDate: 'Предполагаемая дата родов',
    errorDate: 'Введите корректную дату.',
    errorCycle: 'Длина цикла должна быть от 21 до 35 дней.',
    disclaimer: 'Только для информационных целей. Циклы у всех разные. Этот калькулятор не заменяет медицинскую консультацию. Для планирования беременности обратитесь к врачу.',
  },
  uk: {
    lmpLabel: 'Перший день останньої менструації',
    cycleLabel: 'Тривалість циклу',
    cycleDays: 'днів',
    calculate: 'Розрахувати',
    ovulationDate: 'Дата овуляції',
    fertileWindow: 'Фертильне вікно',
    nextPeriod: 'Наступна менструація',
    dueDate: 'Передбачувана дата пологів',
    errorDate: 'Введіть коректну дату.',
    errorCycle: 'Тривалість циклу має бути від 21 до 35 днів.',
    disclaimer: 'Лише для інформаційних цілей. Цикли у всіх різні. Цей калькулятор не замінює медичну консультацію. Для планування вагітності зверніться до лікаря.',
  },
  fr: {
    lmpLabel: 'Premier jour des dernières règles',
    cycleLabel: 'Durée du cycle',
    cycleDays: 'jours',
    calculate: 'Calculer',
    ovulationDate: 'Date d\'ovulation',
    fertileWindow: 'Fenêtre fertile',
    nextPeriod: 'Prochaines règles',
    dueDate: 'Date prévue d\'accouchement',
    errorDate: 'Veuillez entrer une date valide.',
    errorCycle: 'La durée du cycle doit être comprise entre 21 et 35 jours.',
    disclaimer: 'À titre informatif uniquement. Les cycles varient. Cette calculatrice ne remplace pas un avis médical. Consultez un professionnel de santé pour des conseils en fertilité.',
  },
  lt: {
    lmpLabel: 'Paskutinių mėnesinių pirma diena',
    cycleLabel: 'Ciklo trukmė',
    cycleDays: 'dienos',
    calculate: 'Skaičiuoti',
    ovulationDate: 'Ovuliacijos data',
    fertileWindow: 'Vaisingasis langas',
    nextPeriod: 'Kitos mėnesinės',
    dueDate: 'Numatoma gimdymo data',
    errorDate: 'Įveskite tinkamą datą.',
    errorCycle: 'Ciklo trukmė turi būti nuo 21 iki 35 dienų.',
    disclaimer: 'Tik informaciniais tikslais. Ciklai skiriasi. Ši skaičiuoklė nepakeičia medicininės konsultacijos. Dėl vaisingumo konsultuokitės su gydytoju.',
  },
};

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date: Date, locale: string): string {
  const loc = INTL_LOCALE[locale as LangKey] ?? 'en-GB';
  return new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

export default function OvulationCalculator({ locale }: { locale: string }) {
  const t = T[locale as LangKey] ?? T.en;

  const [lmp, setLmp] = useState('');
  const [cycle, setCycle] = useState('28');
  const [result, setResult] = useState<{
    ovulation: Date;
    fertileStart: Date;
    fertileEnd: Date;
    nextPeriod: Date;
    dueDate: Date;
  } | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = useCallback(() => {
    const cycleLen = parseInt(cycle, 10);
    if (isNaN(cycleLen) || cycleLen < 21 || cycleLen > 35) {
      setError(t.errorCycle);
      setResult(null);
      return;
    }

    const lmpDate = new Date(lmp);
    if (!lmp || isNaN(lmpDate.getTime())) {
      setError(t.errorDate);
      setResult(null);
      return;
    }

    const ovulation = addDays(lmpDate, cycleLen - 14);
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);
    const nextPeriod = addDays(lmpDate, cycleLen);
    const dueDate = addDays(lmpDate, 280);

    setError('');
    setResult({ ovulation, fertileStart, fertileEnd, nextPeriod, dueDate });
  }, [lmp, cycle, t]);

  return (
    <div className={styles['ovulation-widget']}>
      <div className={styles['ovulation-widget__form']}>

        <div className={styles['ovulation-widget__field']}>
          <label className={styles['ovulation-widget__label']} htmlFor="ov-lmp">
            {t.lmpLabel}
          </label>
          <input
            id="ov-lmp"
            className={styles['ovulation-widget__input']}
            type="date"
            value={lmp}
            onChange={(e) => setLmp(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className={styles['ovulation-widget__field']}>
          <label className={styles['ovulation-widget__label']} htmlFor="ov-cycle">
            {t.cycleLabel}
          </label>
          <div className={styles['ovulation-widget__input-wrap']}>
            <input
              id="ov-cycle"
              className={`${styles['ovulation-widget__input']} ${styles['ovulation-widget__input--number']}`}
              type="number"
              min="21"
              max="35"
              step="1"
              value={cycle}
              onChange={(e) => setCycle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              aria-label={`${t.cycleLabel} (${t.cycleDays})`}
            />
            <span className={styles['ovulation-widget__suffix']}>{t.cycleDays}</span>
          </div>
          <span className={styles['ovulation-widget__hint']}>21–35</span>
        </div>

        {error && <p className={styles['ovulation-widget__error']}>{error}</p>}

        <button className={styles['ovulation-widget__btn']} type="button" onClick={handleCalculate}>
          {t.calculate}
        </button>
      </div>

      {result && (
        <div className={styles['ovulation-widget__results']}>
          <div className={styles['ovulation-widget__cards']}>
            <div className={`${styles['ovulation-widget__card']} ${styles['ovulation-widget__card--ovulation']}`}>
              <span className={styles['ovulation-widget__card-icon']}>🌸</span>
              <span className={styles['ovulation-widget__card-label']}>{t.ovulationDate}</span>
              <span className={styles['ovulation-widget__card-value']}>{formatDate(result.ovulation, locale)}</span>
            </div>
            <div className={`${styles['ovulation-widget__card']} ${styles['ovulation-widget__card--fertile']}`}>
              <span className={styles['ovulation-widget__card-icon']}>✨</span>
              <span className={styles['ovulation-widget__card-label']}>{t.fertileWindow}</span>
              <span className={styles['ovulation-widget__card-value']}>
                {formatDate(result.fertileStart, locale)} – {formatDate(result.fertileEnd, locale)}
              </span>
            </div>
            <div className={styles['ovulation-widget__card']}>
              <span className={styles['ovulation-widget__card-icon']}>📅</span>
              <span className={styles['ovulation-widget__card-label']}>{t.nextPeriod}</span>
              <span className={styles['ovulation-widget__card-value']}>{formatDate(result.nextPeriod, locale)}</span>
            </div>
            <div className={styles['ovulation-widget__card']}>
              <span className={styles['ovulation-widget__card-icon']}>👶</span>
              <span className={styles['ovulation-widget__card-label']}>{t.dueDate}</span>
              <span className={styles['ovulation-widget__card-value']}>{formatDate(result.dueDate, locale)}</span>
            </div>
          </div>
          <p className={styles['ovulation-widget__disclaimer']}>{t.disclaimer}</p>
        </div>
      )}
    </div>
  );
}

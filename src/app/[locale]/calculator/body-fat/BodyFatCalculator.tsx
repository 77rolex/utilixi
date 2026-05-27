'use client';

import { useState, useCallback } from 'react';
import styles from './BodyFatCalculator.module.scss';

type Unit = 'metric' | 'imperial';
type Gender = 'male' | 'female';
type Category = 'essential' | 'athletes' | 'fitness' | 'acceptable' | 'obese';

const T: Record<string, {
  metric: string;
  imperial: string;
  male: string;
  female: string;
  gender: string;
  height: string;
  neck: string;
  waist: string;
  hip: string;
  cm: string;
  inches: string;
  calculate: string;
  yourBf: string;
  catEssential: string;
  catAthletes: string;
  catFitness: string;
  catAcceptable: string;
  catObese: string;
  errorInvalid: string;
  errorRange: string;
  tipIdeal: string;
  disclaimer: string;
}> = {
  en: {
    metric: 'Metric',
    imperial: 'Imperial',
    male: 'Male',
    female: 'Female',
    gender: 'Sex',
    height: 'Height',
    neck: 'Neck circumference',
    waist: 'Waist circumference',
    hip: 'Hip circumference (women)',
    cm: 'cm',
    inches: 'in',
    calculate: 'Calculate Body Fat',
    yourBf: 'Body Fat',
    catEssential: 'Essential fat',
    catAthletes: 'Athletes',
    catFitness: 'Fitness',
    catAcceptable: 'Acceptable',
    catObese: 'Obese',
    errorInvalid: 'Please enter valid positive numbers in all fields.',
    errorRange: 'Please check your measurements — values seem outside a normal range.',
    tipIdeal: 'Ideal range for your sex',
    disclaimer: 'US Navy method. For screening purposes only — not a medical diagnosis.',
  },
  ru: {
    metric: 'Метрическая',
    imperial: 'Имперская',
    male: 'Мужской',
    female: 'Женский',
    gender: 'Пол',
    height: 'Рост',
    neck: 'Обхват шеи',
    waist: 'Обхват талии',
    hip: 'Обхват бёдер (для женщин)',
    cm: 'см',
    inches: 'дюйм',
    calculate: 'Рассчитать % жира',
    yourBf: '% жира',
    catEssential: 'Необходимый',
    catAthletes: 'Атлет',
    catFitness: 'Фитнес',
    catAcceptable: 'Допустимый',
    catObese: 'Ожирение',
    errorInvalid: 'Введите корректные положительные числа во все поля.',
    errorRange: 'Проверьте значения — они выходят за пределы нормы.',
    tipIdeal: 'Рекомендуемый диапазон для вашего пола',
    disclaimer: 'Метод ВМС США. Только для ориентировочной оценки — не является медицинским диагнозом.',
  },
  uk: {
    metric: 'Метрична',
    imperial: 'Імперська',
    male: 'Чоловічий',
    female: 'Жіночий',
    gender: 'Стать',
    height: 'Зріст',
    neck: 'Обхват шиї',
    waist: 'Обхват талії',
    hip: 'Обхват стегон (для жінок)',
    cm: 'см',
    inches: 'дюйм',
    calculate: 'Розрахувати % жиру',
    yourBf: '% жиру',
    catEssential: 'Необхідний',
    catAthletes: 'Атлет',
    catFitness: 'Фітнес',
    catAcceptable: 'Допустимий',
    catObese: 'Ожиріння',
    errorInvalid: 'Введіть коректні додатні числа у всі поля.',
    errorRange: 'Перевірте значення — вони виходять за межі норми.',
    tipIdeal: 'Рекомендований діапазон для вашої статі',
    disclaimer: 'Метод ВМС США. Лише для орієнтовної оцінки — не є медичним діагнозом.',
  },
  fr: {
    metric: 'Métrique',
    imperial: 'Impérial',
    male: 'Homme',
    female: 'Femme',
    gender: 'Sexe',
    height: 'Taille',
    neck: 'Tour de cou',
    waist: 'Tour de taille',
    hip: 'Tour de hanches (femmes)',
    cm: 'cm',
    inches: 'po',
    calculate: 'Calculer le % de graisse',
    yourBf: '% de graisse',
    catEssential: 'Graisse essentielle',
    catAthletes: 'Athlète',
    catFitness: 'Fitness',
    catAcceptable: 'Acceptable',
    catObese: 'Obésité',
    errorInvalid: 'Veuillez entrer des nombres positifs valides dans tous les champs.',
    errorRange: 'Vérifiez vos mesures — les valeurs semblent hors de la plage normale.',
    tipIdeal: 'Plage idéale pour votre sexe',
    disclaimer: 'Méthode US Navy. À titre indicatif uniquement — pas un diagnostic médical.',
  },
  lt: {
    metric: 'Metrinė',
    imperial: 'Imperinė',
    male: 'Vyras',
    female: 'Moteris',
    gender: 'Lytis',
    height: 'Ūgis',
    neck: 'Kaklo apimtis',
    waist: 'Juosmens apimtis',
    hip: 'Klubų apimtis (moterims)',
    cm: 'cm',
    inches: 'col.',
    calculate: 'Skaičiuoti riebalų %',
    yourBf: 'Riebalų %',
    catEssential: 'Esminiai riebalai',
    catAthletes: 'Sportininkai',
    catFitness: 'Fitnesas',
    catAcceptable: 'Priimtina',
    catObese: 'Nutukimas',
    errorInvalid: 'Įveskite teigiamus skaičius visuose laukuose.',
    errorRange: 'Patikrinkite matavimus — reikšmės atrodo už normos ribų.',
    tipIdeal: 'Rekomenduojamas diapazonas jūsų lyčiai',
    disclaimer: 'JAV karinio jūrų laivyno metodas. Tik orientaciniam vertinimui — nėra medicininė diagnozė.',
  },
};

const IDEAL: Record<Gender, { low: number; high: number }> = {
  male: { low: 14, high: 20 },
  female: { low: 21, high: 28 },
};

// US Navy method — all measurements in cm
function calcBodyFat(gender: Gender, heightCm: number, neckCm: number, waistCm: number, hipCm: number): number {
  if (gender === 'male') {
    const val = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    return Math.round(val * 10) / 10;
  }
  const val = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
  return Math.round(val * 10) / 10;
}

function getCategory(bf: number, gender: Gender): Category {
  if (gender === 'male') {
    if (bf < 6) return 'essential';
    if (bf < 14) return 'athletes';
    if (bf < 18) return 'fitness';
    if (bf < 25) return 'acceptable';
    return 'obese';
  }
  if (bf < 14) return 'essential';
  if (bf < 21) return 'athletes';
  if (bf < 25) return 'fitness';
  if (bf < 32) return 'acceptable';
  return 'obese';
}

// Scale 0–50%. Returns 0–100%.
function scalePercent(bf: number): number {
  return Math.min(100, Math.max(0, (bf / 50) * 100));
}

export default function BodyFatCalculator({ locale }: { locale: string }) {
  const t = T[locale] || T.en;

  const [unit, setUnit] = useState<Unit>('metric');
  const [gender, setGender] = useState<Gender>('male');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const toInches = (v: string) => parseFloat(v.replace(',', '.')) * 2.54;
  const parse = (v: string) => parseFloat(v.replace(',', '.'));

  const handleCalculate = useCallback(() => {
    const h = unit === 'metric' ? parse(height) : parse(height) * 2.54;
    const n = unit === 'metric' ? parse(neck) : toInches(neck);
    const w = unit === 'metric' ? parse(waist) : toInches(waist);
    const hi = gender === 'female' ? (unit === 'metric' ? parse(hip) : toInches(hip)) : 0;

    if (isNaN(h) || h <= 0 || isNaN(n) || n <= 0 || isNaN(w) || w <= 0 || (gender === 'female' && (isNaN(hi) || hi <= 0))) {
      setError(t.errorInvalid);
      setResult(null);
      return;
    }
    if (h < 100 || h > 250 || n < 20 || n > 60 || w < 40 || w > 200 || (gender === 'female' && (hi < 50 || hi > 200))) {
      setError(t.errorRange);
      setResult(null);
      return;
    }
    if (gender === 'male' && w <= n) {
      setError(t.errorRange);
      setResult(null);
      return;
    }
    if (gender === 'female' && (w + hi) <= n) {
      setError(t.errorRange);
      setResult(null);
      return;
    }

    const bf = calcBodyFat(gender, h, n, w, hi);
    if (isNaN(bf) || bf < 0 || bf > 70) {
      setError(t.errorRange);
      setResult(null);
      return;
    }
    setError('');
    setResult(bf);
  }, [unit, gender, height, neck, waist, hip, t]);

  const category = result !== null ? getCategory(result, gender) : null;
  const catLabel = category ? t[`cat${category.charAt(0).toUpperCase()}${category.slice(1)}` as keyof typeof t] as string : '';

  const suffix = unit === 'metric' ? t.cm : t.inches;

  // Scale segments: male: essential 2-5 (3), athletes 5-14 (9), fitness 14-18 (4), acceptable 18-25 (7), obese 25-50 (25) → total 48
  // Simplified fixed widths
  const segments: { key: Category; width: string }[] = [
    { key: 'essential',  width: '10%' },
    { key: 'athletes',   width: '20%' },
    { key: 'fitness',    width: '12%' },
    { key: 'acceptable', width: '18%' },
    { key: 'obese',      width: '40%' },
  ];

  return (
    <div className={styles['bf-widget']}>
      <div className={styles['bf-widget__form']}>

        {/* Unit toggle */}
        <div className={styles['bf-widget__toggle']} role="group" aria-label={t.metric}>
          {(['metric', 'imperial'] as Unit[]).map((u) => (
            <button
              key={u}
              type="button"
              className={`${styles['bf-widget__toggle-btn']} ${unit === u ? styles['bf-widget__toggle-btn--active'] : ''}`}
              onClick={() => { setUnit(u); setResult(null); setError(''); }}
            >
              {u === 'metric' ? t.metric : t.imperial}
            </button>
          ))}
        </div>

        {/* Gender toggle */}
        <div className={styles['bf-widget__field']}>
          <span className={styles['bf-widget__label']}>{t.gender}</span>
          <div className={styles['bf-widget__toggle']} role="group">
            {(['male', 'female'] as Gender[]).map((g) => (
              <button
                key={g}
                type="button"
                className={`${styles['bf-widget__toggle-btn']} ${gender === g ? styles['bf-widget__toggle-btn--active'] : ''}`}
                onClick={() => { setGender(g); setResult(null); setError(''); }}
              >
                {g === 'male' ? t.male : t.female}
              </button>
            ))}
          </div>
        </div>

        {/* Height */}
        <div className={styles['bf-widget__field']}>
          <label className={styles['bf-widget__label']} htmlFor="bf-height">
            {t.height}
          </label>
          <div className={styles['bf-widget__input-wrap']}>
            <input
              id="bf-height"
              className={styles['bf-widget__input']}
              type="number"
              min="100"
              max="250"
              step="0.1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={unit === 'metric' ? '175' : '69'}
              aria-label={`${t.height} (${suffix})`}
            />
            <span className={styles['bf-widget__suffix']}>{suffix}</span>
          </div>
        </div>

        {/* Neck */}
        <div className={styles['bf-widget__field']}>
          <label className={styles['bf-widget__label']} htmlFor="bf-neck">
            {t.neck}
          </label>
          <div className={styles['bf-widget__input-wrap']}>
            <input
              id="bf-neck"
              className={styles['bf-widget__input']}
              type="number"
              min="20"
              max="60"
              step="0.1"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={unit === 'metric' ? '37' : '14.5'}
              aria-label={`${t.neck} (${suffix})`}
            />
            <span className={styles['bf-widget__suffix']}>{suffix}</span>
          </div>
        </div>

        {/* Waist */}
        <div className={styles['bf-widget__field']}>
          <label className={styles['bf-widget__label']} htmlFor="bf-waist">
            {t.waist}
          </label>
          <div className={styles['bf-widget__input-wrap']}>
            <input
              id="bf-waist"
              className={styles['bf-widget__input']}
              type="number"
              min="40"
              max="200"
              step="0.1"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={unit === 'metric' ? '85' : '33.5'}
              aria-label={`${t.waist} (${suffix})`}
            />
            <span className={styles['bf-widget__suffix']}>{suffix}</span>
          </div>
        </div>

        {/* Hip — women only */}
        {gender === 'female' && (
          <div className={styles['bf-widget__field']}>
            <label className={styles['bf-widget__label']} htmlFor="bf-hip">
              {t.hip}
            </label>
            <div className={styles['bf-widget__input-wrap']}>
              <input
                id="bf-hip"
                className={styles['bf-widget__input']}
                type="number"
                min="50"
                max="200"
                step="0.1"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                placeholder={unit === 'metric' ? '95' : '37.5'}
                aria-label={`${t.hip} (${suffix})`}
              />
              <span className={styles['bf-widget__suffix']}>{suffix}</span>
            </div>
          </div>
        )}

        {error && <p className={styles['bf-widget__error']}>{error}</p>}

        <button className={styles['bf-widget__btn']} type="button" onClick={handleCalculate}>
          {t.calculate}
        </button>
      </div>

      {result !== null && category && (
        <div className={styles['bf-widget__results']}>
          <div className={styles['bf-widget__result-main']}>
            <div className={styles['bf-widget__result-value-block']}>
              <span className={styles['bf-widget__result-label']}>{t.yourBf}</span>
              <span className={styles['bf-widget__result-value']}>{result.toFixed(1)}%</span>
            </div>
            <span className={`${styles['bf-widget__result-category']} ${styles[`bf-widget__result-category--${category}`]}`}>
              {catLabel}
            </span>
          </div>

          <div className={styles['bf-widget__scale']}>
            <div className={styles['bf-widget__scale-wrap']}>
              <div className={styles['bf-widget__scale-bar']}>
                {segments.map((s) => (
                  <div
                    key={s.key}
                    className={`${styles['bf-widget__scale-segment']} ${styles[`bf-widget__scale-segment--${s.key}`]}`}
                    style={{ width: s.width }}
                  />
                ))}
              </div>
              <div
                className={styles['bf-widget__scale-marker']}
                style={{ left: `${scalePercent(result)}%` }}
                aria-hidden="true"
              />
            </div>
          </div>

          <div className={styles['bf-widget__tip']}>
            {t.tipIdeal}: <strong>{IDEAL[gender].low}–{IDEAL[gender].high}%</strong>
            <br />
            <span style={{ fontSize: '12px' }}>{t.disclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
}

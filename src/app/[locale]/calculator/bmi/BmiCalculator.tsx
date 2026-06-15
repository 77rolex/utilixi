'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './BmiCalculator.module.scss';

type Props = {
  locale: string;
  initialUnit?: string;
  initialHeightCm?: string;
  initialHeightFt?: string;
  initialHeightIn?: string;
  initialWeight?: string;
};
type Unit = 'metric' | 'imperial';

const T: Record<string, {
  metric: string; imperial: string; height: string; heightCm: string; heightFt: string; heightIn: string;
  weight: string; weightKg: string; weightLbs: string; calculate: string; yourBmi: string;
  errorInvalid: string; errorHeight: string; errorWeight: string;
  catUnderweight: string; catNormal: string; catOverweight: string; catObese: string;
  tipTitle: string; copy: string; copied: string;
}> = {
  en: {
    metric: 'Metric', imperial: 'Imperial', height: 'Height', heightCm: 'cm', heightFt: 'ft', heightIn: 'in',
    weight: 'Weight', weightKg: 'kg', weightLbs: 'lbs', calculate: 'Calculate BMI', yourBmi: 'Your BMI',
    errorInvalid: 'Please fill all fields with valid positive numbers.',
    errorHeight: 'Height must be between 50 and 250 cm.',
    errorWeight: 'Weight must be between 10 and 300 kg.',
    catUnderweight: 'Underweight', catNormal: 'Normal weight', catOverweight: 'Overweight', catObese: 'Obese',
    tipTitle: 'Recommended weight for normal BMI (18.5–24.9):',
    copy: 'Copy result', copied: 'Copied!',
  },
  ru: {
    metric: 'Метрическая', imperial: 'Имперская', height: 'Рост', heightCm: 'см', heightFt: 'фут', heightIn: 'дюйм',
    weight: 'Вес', weightKg: 'кг', weightLbs: 'фунт', calculate: 'Рассчитать ИМТ', yourBmi: 'Ваш ИМТ',
    errorInvalid: 'Заполните все поля корректными положительными числами.',
    errorHeight: 'Рост должен быть от 50 до 250 см.',
    errorWeight: 'Вес должен быть от 10 до 300 кг.',
    catUnderweight: 'Недостаточный вес', catNormal: 'Нормальный вес', catOverweight: 'Избыточный вес', catObese: 'Ожирение',
    tipTitle: 'Рекомендуемый вес для нормального ИМТ (18.5–24.9):',
    copy: 'Скопировать', copied: 'Скопировано!',
  },
  uk: {
    metric: 'Метрична', imperial: 'Імперська', height: 'Зріст', heightCm: 'см', heightFt: 'фут', heightIn: 'дюйм',
    weight: 'Вага', weightKg: 'кг', weightLbs: 'фунт', calculate: 'Розрахувати ІМТ', yourBmi: 'Ваш ІМТ',
    errorInvalid: 'Заповніть усі поля коректними додатними числами.',
    errorHeight: 'Зріст має бути від 50 до 250 см.',
    errorWeight: 'Вага має бути від 10 до 300 кг.',
    catUnderweight: 'Недостатня вага', catNormal: 'Нормальна вага', catOverweight: 'Надмірна вага', catObese: 'Ожиріння',
    tipTitle: 'Рекомендована вага для нормального ІМТ (18.5–24.9):',
    copy: 'Копіювати', copied: 'Скопійовано!',
  },
  fr: {
    metric: 'Métrique', imperial: 'Impérial', height: 'Taille', heightCm: 'cm', heightFt: 'pi', heightIn: 'po',
    weight: 'Poids', weightKg: 'kg', weightLbs: 'lbs', calculate: 'Calculer l\'IMC', yourBmi: 'Votre IMC',
    errorInvalid: 'Veuillez remplir tous les champs avec des nombres positifs valides.',
    errorHeight: 'La taille doit être comprise entre 50 et 250 cm.',
    errorWeight: 'Le poids doit être compris entre 10 et 300 kg.',
    catUnderweight: 'Insuffisance pondérale', catNormal: 'Poids normal', catOverweight: 'Surpoids', catObese: 'Obésité',
    tipTitle: 'Poids recommandé pour un IMC normal (18,5–24,9) :',
    copy: 'Copier', copied: 'Copié !',
  },
  lt: {
    metric: 'Metrinė', imperial: 'Imperinė', height: 'Ūgis', heightCm: 'cm', heightFt: 'pėd.', heightIn: 'col.',
    weight: 'Svoris', weightKg: 'kg', weightLbs: 'svar.', calculate: 'Skaičiuoti KMI', yourBmi: 'Jūsų KMI',
    errorInvalid: 'Užpildykite visus laukus teigiamais skaičiais.',
    errorHeight: 'Ūgis turi būti nuo 50 iki 250 cm.',
    errorWeight: 'Svoris turi būti nuo 10 iki 300 kg.',
    catUnderweight: 'Nepakankamas svoris', catNormal: 'Normalus svoris', catOverweight: 'Antsvoris', catObese: 'Nutukimas',
    tipTitle: 'Rekomenduojamas svoris normaliam KMI (18,5–24,9):',
    copy: 'Kopijuoti', copied: 'Nukopijuota!',
  },
};

type Category = 'underweight' | 'normal' | 'overweight' | 'obese';

function getCategory(bmi: number): Category {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

function scalePercent(bmi: number): number {
  return Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));
}

function tryCalcBmi(unit: Unit, hCm: string, hFt: string, hIn: string, w: string): { bmi: number; heightM: number } | null {
  if (unit === 'metric') {
    const h = parseFloat(hCm);
    const wkg = parseFloat(w);
    if (isNaN(h) || h < 50 || h > 250 || isNaN(wkg) || wkg < 10 || wkg > 300) return null;
    const hM = h / 100;
    return { bmi: Math.round((wkg / (hM * hM)) * 10) / 10, heightM: hM };
  } else {
    const ft = parseFloat(hFt);
    const inches = parseFloat(hIn || '0');
    const wlbs = parseFloat(w);
    if (isNaN(ft) || ft <= 0 || isNaN(wlbs) || wlbs <= 0) return null;
    const totalInches = ft * 12 + (isNaN(inches) ? 0 : inches);
    const hM = totalInches * 0.0254;
    const wkg = wlbs * 0.453592;
    if (hM < 0.5 || hM > 2.5 || wkg < 10 || wkg > 300) return null;
    return { bmi: Math.round((wkg / (hM * hM)) * 10) / 10, heightM: hM };
  }
}

export default function BmiCalculator({ locale, initialUnit, initialHeightCm = '', initialHeightFt = '', initialHeightIn = '', initialWeight = '' }: Props) {
  const t = T[locale] || T.en;
  const router = useRouter();
  const pathname = usePathname();

  const [unit, setUnit] = useState<Unit>((initialUnit === 'imperial' ? 'imperial' : 'metric') as Unit);
  const [heightCm, setHeightCm] = useState(initialHeightCm);
  const [heightFt, setHeightFt] = useState(initialHeightFt);
  const [heightIn, setHeightIn] = useState(initialHeightIn);
  const [weight, setWeight] = useState(initialWeight);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const initUnit: Unit = initialUnit === 'imperial' ? 'imperial' : 'metric';
  const initCalc = tryCalcBmi(initUnit, initialHeightCm, initialHeightFt, initialHeightIn, initialWeight);

  const [bmi, setBmi] = useState<number | null>(initCalc?.bmi ?? null);
  const [heightM, setHeightM] = useState<number | null>(initCalc?.heightM ?? null);

  useEffect(() => {
    if (!initialUnit) {
      const saved = localStorage.getItem('utilixi_bmi_unit') as Unit | null;
      if (saved === 'metric' || saved === 'imperial') setUnit(saved);
    }
  }, []);

  const handleUnit = (u: Unit) => {
    setUnit(u);
    setBmi(null);
    setHeightM(null);
    setError('');
    localStorage.setItem('utilixi_bmi_unit', u);
  };

  const handleCalculate = useCallback(() => {
    const res = tryCalcBmi(unit, heightCm, heightFt, heightIn, weight);

    if (res === null) {
      if (unit === 'metric') {
        const h = parseFloat(heightCm);
        const w = parseFloat(weight);
        if (isNaN(h) || isNaN(w)) { setError(t.errorInvalid); setBmi(null); return; }
        if (h < 50 || h > 250) { setError(t.errorHeight); setBmi(null); return; }
        if (w < 10 || w > 300) { setError(t.errorWeight); setBmi(null); return; }
      }
      setError(t.errorInvalid);
      setBmi(null);
      return;
    }

    setError('');
    setBmi(res.bmi);
    setHeightM(res.heightM);

    const params: Record<string, string> = { unit };
    if (unit === 'metric') {
      params.heightCm = heightCm;
    } else {
      params.heightFt = heightFt;
      if (heightIn) params.heightIn = heightIn;
    }
    params.weight = weight;
    router.replace(`${pathname}?${new URLSearchParams(params)}`, { scroll: false });
  }, [unit, heightCm, heightFt, heightIn, weight, t, router, pathname]);

  const category = bmi !== null ? getCategory(bmi) : null;
  const categoryLabel = category ? t[`cat${category.charAt(0).toUpperCase() + category.slice(1)}` as keyof typeof t] : '';

  const handleCopy = useCallback(() => {
    if (bmi === null || !category) return;
    navigator.clipboard.writeText(`${t.yourBmi}: ${bmi.toFixed(1)} — ${categoryLabel}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [bmi, category, categoryLabel, t]);

  return (
    <div className={styles['bmi-widget']}>
      <div className={styles['bmi-widget__form']}>

        <div className={styles['bmi-widget__toggle']} role="group">
          <button
            type="button"
            className={`${styles['bmi-widget__toggle-btn']} ${unit === 'metric' ? styles['bmi-widget__toggle-btn--active'] : ''}`}
            onClick={() => handleUnit('metric')}
          >
            {t.metric}
          </button>
          <button
            type="button"
            className={`${styles['bmi-widget__toggle-btn']} ${unit === 'imperial' ? styles['bmi-widget__toggle-btn--active'] : ''}`}
            onClick={() => handleUnit('imperial')}
          >
            {t.imperial}
          </button>
        </div>

        <div className={styles['bmi-widget__field']}>
          <label className={styles['bmi-widget__label']}>{t.height}</label>
          {unit === 'metric' ? (
            <div className={styles['bmi-widget__input-wrap']}>
              <input
                id="bmi-height-cm"
                className={styles['bmi-widget__input']}
                type="number"
                min="50"
                max="250"
                step="1"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                placeholder="175"
                aria-label={`${t.height} (${t.heightCm})`}
              />
              <span className={styles['bmi-widget__suffix']}>{t.heightCm}</span>
            </div>
          ) : (
            <div className={styles['bmi-widget__input-row']}>
              <div className={styles['bmi-widget__input-wrap']}>
                <input
                  id="bmi-height-ft"
                  className={styles['bmi-widget__input']}
                  type="number"
                  min="1"
                  max="8"
                  step="1"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                  placeholder="5"
                  aria-label={`${t.height} (${t.heightFt})`}
                />
                <span className={styles['bmi-widget__suffix']}>{t.heightFt}</span>
              </div>
              <div className={styles['bmi-widget__input-wrap']}>
                <input
                  id="bmi-height-in"
                  className={styles['bmi-widget__input']}
                  type="number"
                  min="0"
                  max="11"
                  step="1"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                  placeholder="9"
                  aria-label={`${t.height} (${t.heightIn})`}
                />
                <span className={styles['bmi-widget__suffix']}>{t.heightIn}</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles['bmi-widget__field']}>
          <label className={styles['bmi-widget__label']} htmlFor="bmi-weight">
            {t.weight}
          </label>
          <div className={styles['bmi-widget__input-wrap']}>
            <input
              id="bmi-weight"
              className={styles['bmi-widget__input']}
              type="number"
              min="10"
              max="300"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={unit === 'metric' ? '70' : '154'}
              aria-label={`${t.weight} (${unit === 'metric' ? t.weightKg : t.weightLbs})`}
            />
            <span className={styles['bmi-widget__suffix']}>
              {unit === 'metric' ? t.weightKg : t.weightLbs}
            </span>
          </div>
        </div>

        {error && <p className={styles['bmi-widget__error']}>{error}</p>}

        <button className={styles['bmi-widget__btn']} onClick={handleCalculate} type="button">
          {t.calculate}
        </button>
      </div>

      {bmi !== null && category && (
        <div className={styles['bmi-widget__results']}>
          <div className={styles['bmi-widget__copy']}>
            <button
              type="button"
              className={`${styles['bmi-widget__copy-btn']}${copied ? ` ${styles['bmi-widget__copy-btn--copied']}` : ''}`}
              onClick={handleCopy}
              aria-label={t.copy}
            >
              {copied ? '✓' : '⎘'} {copied ? t.copied : t.copy}
            </button>
          </div>

          <div className={styles['bmi-widget__result-main']}>
            <div className={styles['bmi-widget__result-bmi']}>
              <span className={styles['bmi-widget__result-label']}>{t.yourBmi}</span>
              <span className={styles['bmi-widget__result-value']}>{bmi.toFixed(1)}</span>
            </div>
            <span className={`${styles['bmi-widget__result-category']} ${styles[`bmi-widget__result-category--${category}`]}`}>
              {categoryLabel}
            </span>
          </div>

          <div className={styles['bmi-widget__scale']}>
            <div className={styles['bmi-widget__scale-bar-wrap']}>
              <div className={styles['bmi-widget__scale-bar']}>
                <div className={`${styles['bmi-widget__scale-segment']} ${styles['bmi-widget__scale-segment--underweight']}`} />
                <div className={`${styles['bmi-widget__scale-segment']} ${styles['bmi-widget__scale-segment--normal']}`} />
                <div className={`${styles['bmi-widget__scale-segment']} ${styles['bmi-widget__scale-segment--overweight']}`} />
                <div className={`${styles['bmi-widget__scale-segment']} ${styles['bmi-widget__scale-segment--obese']}`} />
              </div>
              <div
                className={styles['bmi-widget__scale-marker']}
                style={{ left: `${scalePercent(bmi)}%` }}
                aria-hidden="true"
              />
            </div>
            <div className={styles['bmi-widget__scale-labels']} aria-hidden="true">
              <span className={styles['bmi-widget__scale-label']} style={{ left: '28.33%' }}>18.5</span>
              <span className={styles['bmi-widget__scale-label']} style={{ left: '50%' }}>25</span>
              <span className={styles['bmi-widget__scale-label']} style={{ left: '66.67%' }}>30</span>
            </div>
          </div>

          {category !== 'normal' && heightM !== null && (
            <div className={styles['bmi-widget__tip']}>
              <p className={styles['bmi-widget__tip-title']}>{t.tipTitle}</p>
              <p className={styles['bmi-widget__tip-range']}>
                {unit === 'metric'
                  ? `${(18.5 * heightM * heightM).toFixed(1)} – ${(24.9 * heightM * heightM).toFixed(1)} ${t.weightKg}`
                  : `${(18.5 * heightM * heightM / 0.453592).toFixed(1)} – ${(24.9 * heightM * heightM / 0.453592).toFixed(1)} ${t.weightLbs}`
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

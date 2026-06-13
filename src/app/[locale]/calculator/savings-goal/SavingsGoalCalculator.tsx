'use client';

import { useState, useCallback } from 'react';
import styles from './SavingsGoalCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  goal: string;
  currentSavings: string;
  monthly: string;
  rate: string;
  rateUnit: string;
  calculate: string;
  monthsLabel: string;
  monthsUnit: string;
  targetDate: string;
  contributions: string;
  interest: string;
  alreadyDone: string;
  unreachable: string;
  error: string;
  noInterest: string;
}> = {
  en: {
    goal: 'Savings goal',
    currentSavings: 'Current savings',
    monthly: 'Monthly contribution',
    rate: 'Annual interest rate',
    rateUnit: '% / year',
    calculate: 'Calculate',
    monthsLabel: 'Months to reach goal',
    monthsUnit: 'months',
    targetDate: 'Target date',
    contributions: 'Total contributions',
    interest: 'Interest earned',
    alreadyDone: 'You have already reached your goal!',
    unreachable: 'Goal is unreachable — increase your monthly contribution.',
    error: 'Please enter valid numbers. Goal and monthly contribution must be positive.',
    noInterest: 'No interest — simple calculation.',
  },
  ru: {
    goal: 'Цель накоплений',
    currentSavings: 'Текущие сбережения',
    monthly: 'Ежемесячный взнос',
    rate: 'Годовая процентная ставка',
    rateUnit: '% / год',
    calculate: 'Рассчитать',
    monthsLabel: 'Месяцев до цели',
    monthsUnit: 'мес.',
    targetDate: 'Дата достижения',
    contributions: 'Всего взносов',
    interest: 'Проценты',
    alreadyDone: 'Цель уже достигнута!',
    unreachable: 'Цель недостижима — увеличьте ежемесячный взнос.',
    error: 'Введите корректные числа. Цель и взнос должны быть положительными.',
    noInterest: 'Без процентов — простой расчёт.',
  },
  uk: {
    goal: 'Ціль накопичень',
    currentSavings: 'Поточні заощадження',
    monthly: 'Щомісячний внесок',
    rate: 'Річна процентна ставка',
    rateUnit: '% / рік',
    calculate: 'Розрахувати',
    monthsLabel: 'Місяців до цілі',
    monthsUnit: 'міс.',
    targetDate: 'Дата досягнення',
    contributions: 'Всього внесків',
    interest: 'Відсотки',
    alreadyDone: 'Ціль вже досягнута!',
    unreachable: 'Ціль недосяжна — збільшіть щомісячний внесок.',
    error: 'Введіть коректні числа. Ціль і внесок мають бути додатними.',
    noInterest: 'Без відсотків — простий розрахунок.',
  },
  fr: {
    goal: 'Objectif d\'épargne',
    currentSavings: 'Épargne actuelle',
    monthly: 'Versement mensuel',
    rate: 'Taux d\'intérêt annuel',
    rateUnit: '% / an',
    calculate: 'Calculer',
    monthsLabel: 'Mois pour atteindre l\'objectif',
    monthsUnit: 'mois',
    targetDate: 'Date cible',
    contributions: 'Total des versements',
    interest: 'Intérêts gagnés',
    alreadyDone: 'Vous avez déjà atteint votre objectif !',
    unreachable: 'Objectif inaccessible — augmentez votre versement mensuel.',
    error: 'Veuillez entrer des nombres valides. L\'objectif et le versement doivent être positifs.',
    noInterest: 'Sans intérêt — calcul simple.',
  },
  lt: {
    goal: 'Taupymo tikslas',
    currentSavings: 'Dabartinės santaupos',
    monthly: 'Mėnesinis įnašas',
    rate: 'Metinė palūkanų norma',
    rateUnit: '% / metus',
    calculate: 'Skaičiuoti',
    monthsLabel: 'Mėnesiai iki tikslo',
    monthsUnit: 'mėn.',
    targetDate: 'Tikslo data',
    contributions: 'Bendri įnašai',
    interest: 'Sukauptos palūkanos',
    alreadyDone: 'Tikslas jau pasiektas!',
    unreachable: 'Tikslas nepasiekiamas — padidinkite mėnesinį įnašą.',
    error: 'Įveskite teigiamus skaičius. Tikslas ir įnašas turi būti teigiami.',
    noInterest: 'Be palūkanų — paprastas skaičiavimas.',
  },
};

type Result = {
  months: number;
  targetDate: string;
  totalContributions: number;
  interestEarned: number;
};

function calcMonths(goal: number, current: number, monthly: number, annualRate: number): number | null {
  if (current >= goal) return 0;
  if (monthly <= 0) return null;
  if (annualRate === 0) {
    return Math.ceil((goal - current) / monthly);
  }
  const r = annualRate / 100 / 12;
  const numerator = goal * r + monthly;
  const denominator = current * r + monthly;
  if (denominator <= 0 || numerator / denominator <= 0) return null;
  return Math.ceil(Math.log(numerator / denominator) / Math.log(1 + r));
}

function getTargetDate(months: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

export default function SavingsGoalCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [goal, setGoal] = useState('');
  const [current, setCurrent] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [special, setSpecial] = useState<'done' | 'unreachable' | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = useCallback(() => {
    const g = parseFloat(goal.replace(',', '.'));
    const c = parseFloat((current || '0').replace(',', '.'));
    const m = parseFloat(monthly.replace(',', '.'));
    const r = parseFloat((rate || '0').replace(',', '.'));
    if (isNaN(g) || g <= 0 || isNaN(m) || m <= 0 || isNaN(c) || c < 0 || isNaN(r) || r < 0) {
      setError(t.error);
      setResult(null);
      setSpecial(null);
      return;
    }
    setError('');
    if (c >= g) { setSpecial('done'); setResult(null); return; }
    const months = calcMonths(g, c, m, r);
    if (months === null || months > 1200) { setSpecial('unreachable'); setResult(null); return; }
    setSpecial(null);
    const totalContrib = c + m * months;
    const interestEarned = Math.max(0, g - totalContrib);
    setResult({
      months,
      targetDate: getTargetDate(months),
      totalContributions: Math.round(totalContrib * 100) / 100,
      interestEarned: Math.round(interestEarned * 100) / 100,
    });
  }, [goal, current, monthly, rate, t]);

  return (
    <div className={styles.widget}>
      <div className={styles.widget__form}>
        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="sg-goal">{t.goal}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="sg-goal" className={styles.widget__input} type="number" min="0" step="100"
              value={goal} onChange={(e) => setGoal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder="10000"
              aria-label={t.goal}
            />
            <span className={styles.widget__suffix}>€</span>
          </div>
        </div>

        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="sg-current">{t.currentSavings}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="sg-current" className={styles.widget__input} type="number" min="0" step="100"
              value={current} onChange={(e) => setCurrent(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder="0"
              aria-label={t.currentSavings}
            />
            <span className={styles.widget__suffix}>€</span>
          </div>
        </div>

        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="sg-monthly">{t.monthly}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="sg-monthly" className={styles.widget__input} type="number" min="0" step="50"
              value={monthly} onChange={(e) => setMonthly(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder="300"
              aria-label={t.monthly}
            />
            <span className={styles.widget__suffix}>€</span>
          </div>
        </div>

        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="sg-rate">{t.rate}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="sg-rate" className={styles.widget__input} type="number" min="0" max="100" step="0.1"
              value={rate} onChange={(e) => setRate(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder="3.5"
              aria-label={`${t.rate} (${t.rateUnit})`}
            />
            <span className={styles.widget__suffix}>{t.rateUnit}</span>
          </div>
        </div>

        {error && <p className={styles.widget__error}>{error}</p>}

        <button className={styles.widget__btn} type="button" onClick={handleCalculate}>
          {t.calculate}
        </button>
      </div>

      {special === 'done' && (
        <div className={styles.widget__results}>
          <p className={styles.widget__info}>{t.alreadyDone}</p>
        </div>
      )}

      {special === 'unreachable' && (
        <div className={styles.widget__results}>
          <p className={styles.widget__info}>{t.unreachable}</p>
        </div>
      )}

      {result && (
        <div className={styles.widget__results}>
          <div className={styles['widget__result-hero']}>
            <div className={styles['widget__result-months']}>
              <span className={styles['widget__result-label']}>{t.monthsLabel}</span>
              <span className={styles['widget__result-value']}>{result.months} <small style={{ fontSize: '0.5em', fontWeight: 400 }}>{t.monthsUnit}</small></span>
            </div>
            <span className={styles['widget__result-date']}>{result.targetDate}</span>
          </div>
          <div className={styles['widget__result-grid']}>
            <div className={styles['widget__result-card']}>
              <span className={styles['widget__result-card-label']}>{t.contributions}</span>
              <span className={styles['widget__result-card-value']}>{result.totalContributions.toLocaleString()} €</span>
            </div>
            <div className={styles['widget__result-card']}>
              <span className={styles['widget__result-card-label']}>{t.interest}</span>
              <span className={styles['widget__result-card-value']}>{result.interestEarned.toLocaleString()} €</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

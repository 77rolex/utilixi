'use client';

import { useState } from 'react';
import styles from './FreelanceRateCalculator.module.scss';

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'PLN', symbol: 'zł', label: 'PLN (zł)' },
  { code: 'UAH', symbol: '₴', label: 'UAH (₴)' },
  { code: 'RUB', symbol: '₽', label: 'RUB (₽)' },
];

const L: Record<string, Record<string, string>> = {
  currency:     { en: 'Currency', ru: 'Валюта', uk: 'Валюта', fr: 'Devise', lt: 'Valiuta' },
  targetIncome: { en: 'Target Annual Net Income', ru: 'Желаемый годовой доход (чистыми)', uk: 'Бажаний річний дохід (чистими)', fr: 'Revenu net annuel cible', lt: 'Tikslinės metinės grynos pajamos' },
  expenses:     { en: 'Annual Business Expenses', ru: 'Годовые расходы на бизнес', uk: 'Річні витрати на бізнес', fr: 'Dépenses professionnelles annuelles', lt: 'Metinės verslo išlaidos' },
  taxRate:      { en: 'Tax Rate (%)', ru: 'Ставка налога (%)', uk: 'Ставка податку (%)', fr: 'Taux d\'imposition (%)', lt: 'Mokesčio norma (%)' },
  weeksOff:     { en: 'Weeks Off Per Year', ru: 'Недель отпуска в год', uk: 'Тижнів відпустки на рік', fr: 'Semaines de congés par an', lt: 'Atostogų savaitės per metus' },
  hoursPerWeek: { en: 'Billable Hours Per Week', ru: 'Оплачиваемых часов в неделю', uk: 'Оплачуваних годин на тиждень', fr: 'Heures facturables par semaine', lt: 'Apmokamų valandų per savaitę' },
  calculate:    { en: 'Calculate', ru: 'Рассчитать', uk: 'Розрахувати', fr: 'Calculer', lt: 'Skaičiuoti' },
  hourlyRate:   { en: 'Minimum Hourly Rate', ru: 'Минимальная ставка в час', uk: 'Мінімальна ставка на годину', fr: 'Taux horaire minimum', lt: 'Minimali valandinis tarifas' },
  daily:        { en: 'Daily Rate (8h)', ru: 'Дневная ставка (8ч)', uk: 'Денна ставка (8г)', fr: 'Tarif journalier (8h)', lt: 'Dienos tarifas (8val)' },
  weekly:       { en: 'Weekly Rate', ru: 'Недельная ставка', uk: 'Тижнева ставка', fr: 'Tarif hebdomadaire', lt: 'Savaitinis tarifas' },
  monthly:      { en: 'Monthly Rate', ru: 'Месячная ставка', uk: 'Місячна ставка', fr: 'Tarif mensuel', lt: 'Mėnesinis tarifas' },
  annual:       { en: 'Annual Revenue Needed', ru: 'Нужный годовой доход', uk: 'Потрібний річний дохід', fr: 'Revenus annuels nécessaires', lt: 'Reikalingos metinės pajamos' },
  billableHours:{ en: 'Billable Hours/Year', ru: 'Оплачиваемых часов в год', uk: 'Оплачуваних годин на рік', fr: 'Heures facturables/an', lt: 'Apmokamų valandų/metus' },
  summaryLabel: { en: 'Summary', ru: 'Итог', uk: 'Підсумок', fr: 'Résumé', lt: 'Santrauka' },
  hintExpenses: { en: 'Software, hardware, office, etc.', ru: 'ПО, оборудование, офис и т.д.', uk: 'ПЗ, обладнання, офіс тощо', fr: 'Logiciels, matériel, bureau, etc.', lt: 'Programinė įranga, įranga, biuras ir kt.' },
  hintTax:      { en: 'Income tax + social contributions', ru: 'НДФЛ + страховые взносы', uk: 'ПДФО + соціальні внески', fr: 'Impôt + cotisations sociales', lt: 'Pajamų mokestis + socialinis draudimas' },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

const SUMMARY: Record<string, (h: number, d: number, bh: number, sym: string) => string> = {
  en: (h, d, bh, sym) => `With ${bh} billable hours/year, you need to charge at least ${sym}${h.toFixed(2)}/hour or ${sym}${d.toFixed(2)}/day to reach your income goal after taxes and expenses.`,
  ru: (h, d, bh, sym) => `При ${bh} оплачиваемых часах в год вам нужно выставлять минимум ${sym}${h.toFixed(2)}/час или ${sym}${d.toFixed(2)}/день, чтобы достичь целевого дохода после налогов и расходов.`,
  uk: (h, d, bh, sym) => `При ${bh} оплачуваних годинах на рік вам потрібно виставляти мінімум ${sym}${h.toFixed(2)}/год або ${sym}${d.toFixed(2)}/день, щоб досягти цільового доходу після податків та витрат.`,
  fr: (h, d, bh, sym) => `Avec ${bh} heures facturables/an, vous devez facturer au minimum ${sym}${h.toFixed(2)}/heure ou ${sym}${d.toFixed(2)}/jour pour atteindre votre objectif après impôts et dépenses.`,
  lt: (h, d, bh, sym) => `Su ${bh} apmokamomis valandomis per metus turite skaičiuoti mažiausiai ${sym}${h.toFixed(2)}/val arba ${sym}${d.toFixed(2)}/dieną, kad pasiektumėte pajamų tikslą po mokesčių ir išlaidų.`,
};

type Result = {
  hourly: number; daily: number; weekly: number; monthly: number;
  annualRevenue: number; billableHours: number; symbol: string;
};

export default function FreelanceRateCalculator({ locale }: { locale: string }) {
  const [currency, setCurrency] = useState('USD');
  const [targetIncome, setTargetIncome] = useState('60000');
  const [expenses, setExpenses] = useState('5000');
  const [taxRate, setTaxRate] = useState('25');
  const [weeksOff, setWeeksOff] = useState('4');
  const [hoursPerWeek, setHoursPerWeek] = useState('30');
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const income = parseFloat(targetIncome) || 0;
    const exp = parseFloat(expenses) || 0;
    const tax = parseFloat(taxRate) / 100 || 0;
    const weeks = parseFloat(weeksOff) || 0;
    const hours = parseFloat(hoursPerWeek) || 0;

    const workingWeeks = 52 - weeks;
    const billableHours = workingWeeks * hours;
    if (billableHours <= 0) return;

    // Gross needed = (net target + expenses) / (1 - tax rate)
    const annualRevenue = (income + exp) / (1 - tax);
    const hourly = annualRevenue / billableHours;
    const daily = hourly * 8;
    const weekly = hourly * hours;
    const monthly = annualRevenue / 12;

    const sym = CURRENCIES.find(c => c.code === currency)?.symbol ?? '$';

    setResult({ hourly, daily, weekly, monthly, annualRevenue, billableHours, symbol: sym });
  }

  const fmt = (n: number, dec = 0) => n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const sym = CURRENCIES.find(c => c.code === currency)?.symbol ?? '$';

  return (
    <div className={styles['freelance-widget']}>
      <div className={styles['freelance-widget__form']}>
        <div className={styles['freelance-widget__row']}>
          <div className={styles['freelance-widget__field']}>
            <label className={styles['freelance-widget__label']}>{t('currency', locale)}</label>
            <select className={styles['freelance-widget__select']} value={currency} onChange={e => setCurrency(e.target.value)}>
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
            </select>
          </div>
          <div className={styles['freelance-widget__field']}>
            <label className={styles['freelance-widget__label']}>{t('targetIncome', locale)} ({sym})</label>
            <input
              type="number"
              className={styles['freelance-widget__input']}
              value={targetIncome}
              onChange={e => setTargetIncome(e.target.value)}
              min="0" step="1000"
            />
          </div>
        </div>

        <div className={styles['freelance-widget__row']}>
          <div className={styles['freelance-widget__field']}>
            <label className={styles['freelance-widget__label']}>{t('expenses', locale)} ({sym})</label>
            <span className={styles['freelance-widget__hint']}>{t('hintExpenses', locale)}</span>
            <input
              type="number"
              className={styles['freelance-widget__input']}
              value={expenses}
              onChange={e => setExpenses(e.target.value)}
              min="0" step="500"
            />
          </div>
          <div className={styles['freelance-widget__field']}>
            <label className={styles['freelance-widget__label']}>{t('taxRate', locale)}</label>
            <span className={styles['freelance-widget__hint']}>{t('hintTax', locale)}</span>
            <input
              type="number"
              className={styles['freelance-widget__input']}
              value={taxRate}
              onChange={e => setTaxRate(e.target.value)}
              min="0" max="70" step="1"
            />
          </div>
        </div>

        <div className={styles['freelance-widget__row']}>
          <div className={styles['freelance-widget__field']}>
            <label className={styles['freelance-widget__label']}>{t('weeksOff', locale)}</label>
            <input
              type="number"
              className={styles['freelance-widget__input']}
              value={weeksOff}
              onChange={e => setWeeksOff(e.target.value)}
              min="0" max="25"
            />
          </div>
          <div className={styles['freelance-widget__field']}>
            <label className={styles['freelance-widget__label']}>{t('hoursPerWeek', locale)}</label>
            <input
              type="number"
              className={styles['freelance-widget__input']}
              value={hoursPerWeek}
              onChange={e => setHoursPerWeek(e.target.value)}
              min="1" max="60"
            />
          </div>
        </div>

        <button type="button" className={styles['freelance-widget__btn']} onClick={calculate}>
          {t('calculate', locale)}
        </button>
      </div>

      {result && (
        <div className={styles['freelance-widget__results']}>
          <div className={styles['freelance-widget__result-main']}>
            <span className={styles['freelance-widget__result-main-label']}>{t('hourlyRate', locale)}</span>
            <span className={styles['freelance-widget__result-main-value']}>{result.symbol}{fmt(result.hourly, 2)}</span>
          </div>

          <div className={styles['freelance-widget__result-grid']}>
            <div className={styles['freelance-widget__result-item']}>
              <span className={styles['freelance-widget__result-label']}>{t('daily', locale)}</span>
              <span className={styles['freelance-widget__result-value']}>{result.symbol}{fmt(result.daily, 0)}</span>
            </div>
            <div className={styles['freelance-widget__result-item']}>
              <span className={styles['freelance-widget__result-label']}>{t('weekly', locale)}</span>
              <span className={styles['freelance-widget__result-value']}>{result.symbol}{fmt(result.weekly, 0)}</span>
            </div>
            <div className={styles['freelance-widget__result-item']}>
              <span className={styles['freelance-widget__result-label']}>{t('monthly', locale)}</span>
              <span className={styles['freelance-widget__result-value']}>{result.symbol}{fmt(result.monthly, 0)}</span>
            </div>
            <div className={styles['freelance-widget__result-item']}>
              <span className={styles['freelance-widget__result-label']}>{t('annual', locale)}</span>
              <span className={styles['freelance-widget__result-value']}>{result.symbol}{fmt(result.annualRevenue, 0)}</span>
            </div>
            <div className={styles['freelance-widget__result-item']}>
              <span className={styles['freelance-widget__result-label']}>{t('billableHours', locale)}</span>
              <span className={styles['freelance-widget__result-value']}>{fmt(result.billableHours, 0)}</span>
            </div>
          </div>

          <div className={styles['freelance-widget__summary']}>
            {(SUMMARY[locale] ?? SUMMARY.en)(result.hourly, result.daily, result.billableHours, result.symbol)}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import styles from './RentVsBuyCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  sectionBuy: string; sectionRent: string; sectionCommon: string;
  homePrice: string; downPayment: string; mortgageRate: string; mortgageTerm: string;
  propertyTax: string; maintenance: string; appreciation: string;
  monthlyRent: string; rentIncrease: string;
  years: string; investReturn: string;
  calculate: string;
  resultTitle: string; buyTotal: string; rentTotal: string;
  buyBetter: string; rentBetter: string; byAmount: string;
  breakEven: string; breakEvenYears: string; breakEvenNever: string;
  homeEquity: string; investedSavings: string;
  errRequired: string; errPositive: string;
  currency: string;
  yearsSuffix: string;
}> = {
  en: {
    sectionBuy: 'Buying', sectionRent: 'Renting', sectionCommon: 'Common parameters',
    homePrice: 'Home price', downPayment: 'Down payment (%)', mortgageRate: 'Mortgage rate (% /year)',
    mortgageTerm: 'Mortgage term (years)', propertyTax: 'Property tax (% /year)',
    maintenance: 'Maintenance (% /year)', appreciation: 'Home appreciation (% /year)',
    monthlyRent: 'Monthly rent', rentIncrease: 'Annual rent increase (%)',
    years: 'Horizon (years)', investReturn: 'Investment return (% /year)',
    calculate: 'Compare',
    resultTitle: 'Result over', buyTotal: 'Net cost to buy', rentTotal: 'Net cost to rent',
    buyBetter: '🏠 Buying is better', rentBetter: '🏘 Renting is better', byAmount: 'savings',
    breakEven: 'Break-even', breakEvenYears: 'year', breakEvenNever: 'never within horizon',
    homeEquity: 'Home equity', investedSavings: 'Invested savings',
    errRequired: 'Please fill in all fields.', errPositive: 'All values must be greater than zero.',
    currency: '$', yearsSuffix: 'years',
  },
  ru: {
    sectionBuy: 'Покупка', sectionRent: 'Аренда', sectionCommon: 'Общие параметры',
    homePrice: 'Стоимость жилья', downPayment: 'Первоначальный взнос (%)', mortgageRate: 'Ставка ипотеки (% /год)',
    mortgageTerm: 'Срок ипотеки (лет)', propertyTax: 'Налог на недвижимость (% /год)',
    maintenance: 'Обслуживание (% /год)', appreciation: 'Рост стоимости жилья (% /год)',
    monthlyRent: 'Ежемесячная аренда', rentIncrease: 'Рост аренды в год (%)',
    years: 'Горизонт (лет)', investReturn: 'Доходность инвестиций (% /год)',
    calculate: 'Сравнить',
    resultTitle: 'Результат за', buyTotal: 'Чистые расходы на покупку', rentTotal: 'Чистые расходы на аренду',
    buyBetter: '🏠 Покупка выгоднее', rentBetter: '🏘 Аренда выгоднее', byAmount: 'экономия',
    breakEven: 'Точка окупаемости', breakEvenYears: 'год', breakEvenNever: 'не достигается',
    homeEquity: 'Собственный капитал', investedSavings: 'Инвестированные сбережения',
    errRequired: 'Заполните все поля.', errPositive: 'Все значения должны быть больше нуля.',
    currency: '₽', yearsSuffix: 'лет',
  },
  uk: {
    sectionBuy: 'Купівля', sectionRent: 'Оренда', sectionCommon: 'Загальні параметри',
    homePrice: 'Вартість житла', downPayment: 'Перший внесок (%)', mortgageRate: 'Ставка іпотеки (% /рік)',
    mortgageTerm: 'Термін іпотеки (років)', propertyTax: 'Податок на нерухомість (% /рік)',
    maintenance: 'Обслуговування (% /рік)', appreciation: 'Зростання вартості житла (% /рік)',
    monthlyRent: 'Щомісячна оренда', rentIncrease: 'Зростання оренди на рік (%)',
    years: 'Горизонт (років)', investReturn: 'Дохідність інвестицій (% /рік)',
    calculate: 'Порівняти',
    resultTitle: 'Результат за', buyTotal: 'Чисті витрати на купівлю', rentTotal: 'Чисті витрати на оренду',
    buyBetter: '🏠 Купівля вигідніша', rentBetter: '🏘 Оренда вигідніша', byAmount: 'економія',
    breakEven: 'Точка беззбитковості', breakEvenYears: 'рік', breakEvenNever: 'не досягається',
    homeEquity: 'Власний капітал', investedSavings: 'Інвестовані заощадження',
    errRequired: 'Заповніть усі поля.', errPositive: 'Усі значення мають бути більше нуля.',
    currency: '₴', yearsSuffix: 'років',
  },
  fr: {
    sectionBuy: 'Achat', sectionRent: 'Location', sectionCommon: 'Paramètres communs',
    homePrice: 'Prix du bien', downPayment: 'Apport personnel (%)', mortgageRate: 'Taux hypothécaire (% /an)',
    mortgageTerm: 'Durée du prêt (années)', propertyTax: 'Taxe foncière (% /an)',
    maintenance: 'Entretien (% /an)', appreciation: 'Valorisation du bien (% /an)',
    monthlyRent: 'Loyer mensuel', rentIncrease: 'Hausse annuelle du loyer (%)',
    years: 'Horizon (années)', investReturn: 'Rendement investissement (% /an)',
    calculate: 'Comparer',
    resultTitle: 'Résultat sur', buyTotal: 'Coût net de l\'achat', rentTotal: 'Coût net de la location',
    buyBetter: '🏠 Acheter est plus avantageux', rentBetter: '🏘 Louer est plus avantageux', byAmount: 'd\'économie',
    breakEven: 'Seuil de rentabilité', breakEvenYears: 'an', breakEvenNever: 'non atteint',
    homeEquity: 'Capitaux propres', investedSavings: 'Épargne investie',
    errRequired: 'Veuillez remplir tous les champs.', errPositive: 'Toutes les valeurs doivent être positives.',
    currency: '€', yearsSuffix: 'ans',
  },
  lt: {
    sectionBuy: 'Pirkimas', sectionRent: 'Nuoma', sectionCommon: 'Bendrieji parametrai',
    homePrice: 'Būsto kaina', downPayment: 'Pradinis įnašas (%)', mortgageRate: 'Hipotekos palūkanos (% /m.)',
    mortgageTerm: 'Paskolos terminas (metai)', propertyTax: 'Nekilnojamojo turto mokestis (% /m.)',
    maintenance: 'Priežiūra (% /m.)', appreciation: 'Būsto vertės augimas (% /m.)',
    monthlyRent: 'Mėnesio nuoma', rentIncrease: 'Nuomos augimas per metus (%)',
    years: 'Horizontas (metai)', investReturn: 'Investicijų grąža (% /m.)',
    calculate: 'Palyginti',
    resultTitle: 'Rezultatas per', buyTotal: 'Grynos pirkimo išlaidos', rentTotal: 'Grynos nuomos išlaidos',
    buyBetter: '🏠 Pirkti naudingiau', rentBetter: '🏘 Nuomotis naudingiau', byAmount: 'sutaupoma',
    breakEven: 'Atsipirkimo taškas', breakEvenYears: 'metai', breakEvenNever: 'nepasiekiama',
    homeEquity: 'Nuosavybės kapitalas', investedSavings: 'Investuotos santaupos',
    errRequired: 'Užpildykite visus laukus.', errPositive: 'Visos reikšmės turi būti teigiamos.',
    currency: '€', yearsSuffix: 'metų',
  },
};

function pmt(rate: number, nper: number, pv: number): number {
  if (rate === 0) return pv / nper;
  return (pv * rate * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
}

function remainingBalance(rate: number, nper: number, pv: number, paymentsMade: number): number {
  if (rate === 0) return pv - (pv / nper) * paymentsMade;
  const p = pmt(rate, nper, pv);
  return pv * Math.pow(1 + rate, paymentsMade) - p * (Math.pow(1 + rate, paymentsMade) - 1) / rate;
}

interface CalcResult {
  buyNetCost: number;
  rentNetCost: number;
  homeEquity: number;
  investedSavings: number;
  breakEvenYear: number | null;
  years: number;
}

function fmt(n: number, currency: string): string {
  const abs = Math.abs(n);
  return (n < 0 ? '-' : '') + currency + abs.toLocaleString('en', { maximumFractionDigits: 0 });
}

export default function RentVsBuyCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [homePrice, setHomePrice] = useState('300000');
  const [downPct, setDownPct] = useState('20');
  const [mortgageRate, setMortgageRate] = useState('5');
  const [mortgageTerm, setMortgageTerm] = useState('20');
  const [propertyTax, setPropertyTax] = useState('1');
  const [maintenance, setMaintenance] = useState('1');
  const [appreciation, setAppreciation] = useState('3');
  const [monthlyRent, setMonthlyRent] = useState('1500');
  const [rentIncrease, setRentIncrease] = useState('3');
  const [years, setYears] = useState('10');
  const [investReturn, setInvestReturn] = useState('7');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const hp = parseFloat(homePrice), dp = parseFloat(downPct) / 100;
    const mr = parseFloat(mortgageRate) / 100 / 12, mt = parseFloat(mortgageTerm) * 12;
    const pt = parseFloat(propertyTax) / 100, maint = parseFloat(maintenance) / 100;
    const appr = parseFloat(appreciation) / 100;
    const rent0 = parseFloat(monthlyRent), ri = parseFloat(rentIncrease) / 100;
    const N = parseInt(years), ir = parseFloat(investReturn) / 100;

    const vals = [hp, dp, mr, mt / 12, pt, maint, appr, rent0, ri, N, ir];
    if (vals.some(isNaN)) { setError(t.errRequired); return; }
    if (vals.some((v) => v < 0) || hp <= 0 || rent0 <= 0 || N <= 0) { setError(t.errPositive); return; }
    setError('');

    const downAmt = hp * dp;
    const loanAmt = hp - downAmt;
    const monthlyMortgage = pmt(mr, mt, loanAmt);

    // Monthly buy costs
    const monthlyTax = (hp * pt) / 12;
    const monthlyMaint = (hp * maint) / 12;
    const monthlyBuy = monthlyMortgage + monthlyTax + monthlyMaint;

    // Accumulate buy vs rent year by year for break-even
    let cumulBuyCost = downAmt;
    let cumulRentCost = 0;
    let breakEvenYear: number | null = null;

    for (let y = 1; y <= N; y++) {
      // Buy: mortgage + tax + maintenance this year
      cumulBuyCost += monthlyBuy * 12;
      // Sell value at year y
      const homeVal = hp * Math.pow(1 + appr, y);
      const remLoan = y * 12 <= mt ? remainingBalance(mr, mt, loanAmt, y * 12) : 0;
      const equity = homeVal - remLoan;
      const buyNet = cumulBuyCost - equity;

      // Rent: this year's rent
      const yearRent = rent0 * 12 * Math.pow(1 + ri, y - 1);
      cumulRentCost += yearRent;
      // Down payment invested
      const investedDown = downAmt * Math.pow(1 + ir, y);
      // Monthly savings invested: difference (rent - buy) per month if rent < buy
      // Simplified: invest the down payment only
      const rentNet = cumulRentCost - (investedDown - downAmt);

      if (breakEvenYear === null && buyNet < rentNet) breakEvenYear = y;
    }

    // Final year values
    const homeValN = hp * Math.pow(1 + appr, N);
    const totalMortgageN = monthlyMortgage * Math.min(N * 12, mt);
    const totalTaxN = monthlyTax * N * 12;
    const totalMaintN = monthlyMaint * N * 12;
    const remLoanN = N * 12 <= mt ? remainingBalance(mr, mt, loanAmt, N * 12) : 0;
    const homeEquity = homeValN - remLoanN;
    const totalBuyOut = downAmt + totalMortgageN + totalTaxN + totalMaintN;
    const buyNetCost = totalBuyOut - homeEquity;

    let totalRent = 0;
    for (let y = 0; y < N; y++) totalRent += rent0 * 12 * Math.pow(1 + ri, y);
    const investedDown = downAmt * Math.pow(1 + ir, N);
    const investedSavings = investedDown - downAmt;
    const rentNetCost = totalRent - investedSavings;

    setResult({ buyNetCost, rentNetCost, homeEquity, investedSavings, breakEvenYear, years: N });
  };

  const field = (label: string, value: string, setter: (v: string) => void, placeholder?: string) => (
    <div className={styles['rvb-calc__field']}>
      <label className={styles['rvb-calc__label']}>{label}</label>
      <input
        type="number"
        className={styles['rvb-calc__input']}
        value={value}
        onChange={(e) => { setter(e.target.value); setResult(null); }}
        placeholder={placeholder}
        min="0"
      />
    </div>
  );

  return (
    <div className={styles['rvb-calc']}>
      <div className={styles['rvb-calc__grid']}>
        <section className={styles['rvb-calc__section']}>
          <h3 className={styles['rvb-calc__section-title']}>{t.sectionBuy}</h3>
          {field(t.homePrice, homePrice, setHomePrice, '300000')}
          {field(t.downPayment, downPct, setDownPct, '20')}
          {field(t.mortgageRate, mortgageRate, setMortgageRate, '5')}
          {field(t.mortgageTerm, mortgageTerm, setMortgageTerm, '20')}
          {field(t.propertyTax, propertyTax, setPropertyTax, '1')}
          {field(t.maintenance, maintenance, setMaintenance, '1')}
          {field(t.appreciation, appreciation, setAppreciation, '3')}
        </section>

        <section className={styles['rvb-calc__section']}>
          <h3 className={styles['rvb-calc__section-title']}>{t.sectionRent}</h3>
          {field(t.monthlyRent, monthlyRent, setMonthlyRent, '1500')}
          {field(t.rentIncrease, rentIncrease, setRentIncrease, '3')}

          <h3 className={`${styles['rvb-calc__section-title']} ${styles['rvb-calc__section-title--mt']}`}>{t.sectionCommon}</h3>
          {field(t.years, years, setYears, '10')}
          {field(t.investReturn, investReturn, setInvestReturn, '7')}
        </section>
      </div>

      {error && <p className={styles['rvb-calc__error']}>{error}</p>}

      <button type="button" className={styles['rvb-calc__btn']} onClick={calculate}>
        {t.calculate}
      </button>

      {result && (() => {
        const buyWins = result.buyNetCost < result.rentNetCost;
        const diff = Math.abs(result.rentNetCost - result.buyNetCost);
        return (
          <div className={styles['rvb-calc__result']}>
            <p className={styles['rvb-calc__result-title']}>{t.resultTitle} {result.years} {t.yearsSuffix}</p>
            <div className={`${styles['rvb-calc__winner']} ${buyWins ? styles['rvb-calc__winner--buy'] : styles['rvb-calc__winner--rent']}`}>
              <span className={styles['rvb-calc__winner-label']}>{buyWins ? t.buyBetter : t.rentBetter}</span>
              <span className={styles['rvb-calc__winner-diff']}>{fmt(diff, t.currency)} {t.byAmount}</span>
            </div>

            <div className={styles['rvb-calc__breakdown']}>
              <div className={styles['rvb-calc__breakdown-item']}>
                <span className={styles['rvb-calc__breakdown-label']}>{t.buyTotal}</span>
                <span className={`${styles['rvb-calc__breakdown-val']} ${buyWins ? styles['rvb-calc__breakdown-val--good'] : ''}`}>
                  {fmt(result.buyNetCost, t.currency)}
                </span>
              </div>
              <div className={styles['rvb-calc__breakdown-item']}>
                <span className={styles['rvb-calc__breakdown-label']}>{t.rentTotal}</span>
                <span className={`${styles['rvb-calc__breakdown-val']} ${!buyWins ? styles['rvb-calc__breakdown-val--good'] : ''}`}>
                  {fmt(result.rentNetCost, t.currency)}
                </span>
              </div>
              <div className={styles['rvb-calc__breakdown-item']}>
                <span className={styles['rvb-calc__breakdown-label']}>{t.homeEquity}</span>
                <span className={styles['rvb-calc__breakdown-val']}>{fmt(result.homeEquity, t.currency)}</span>
              </div>
              <div className={styles['rvb-calc__breakdown-item']}>
                <span className={styles['rvb-calc__breakdown-label']}>{t.investedSavings}</span>
                <span className={styles['rvb-calc__breakdown-val']}>{fmt(result.investedSavings, t.currency)}</span>
              </div>
              <div className={styles['rvb-calc__breakdown-item']}>
                <span className={styles['rvb-calc__breakdown-label']}>{t.breakEven}</span>
                <span className={styles['rvb-calc__breakdown-val']}>
                  {result.breakEvenYear !== null ? `${result.breakEvenYear} ${t.breakEvenYears}` : t.breakEvenNever}
                </span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

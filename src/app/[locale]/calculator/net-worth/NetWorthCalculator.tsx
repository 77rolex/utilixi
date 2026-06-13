'use client';

import { useState } from 'react';
import styles from './NetWorthCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  assetsTitle: string;
  liabilitiesTitle: string;
  cash: string;
  investments: string;
  realEstate: string;
  vehicles: string;
  otherAssets: string;
  mortgage: string;
  carLoans: string;
  studentLoans: string;
  creditCards: string;
  otherDebts: string;
  totalAssets: string;
  totalLiabilities: string;
  netWorth: string;
  positive: string;
  negative: string;
}> = {
  en: {
    assetsTitle: 'Assets',
    liabilitiesTitle: 'Liabilities',
    cash: 'Cash & Savings',
    investments: 'Investments',
    realEstate: 'Real Estate',
    vehicles: 'Vehicles',
    otherAssets: 'Other Assets',
    mortgage: 'Mortgage / Rent Debt',
    carLoans: 'Car Loans',
    studentLoans: 'Student Loans',
    creditCards: 'Credit Cards',
    otherDebts: 'Other Debts',
    totalAssets: 'Total Assets',
    totalLiabilities: 'Total Liabilities',
    netWorth: 'Net Worth',
    positive: 'Positive',
    negative: 'Negative',
  },
  ru: {
    assetsTitle: 'Активы',
    liabilitiesTitle: 'Обязательства',
    cash: 'Наличные и сбережения',
    investments: 'Инвестиции',
    realEstate: 'Недвижимость',
    vehicles: 'Транспорт',
    otherAssets: 'Прочие активы',
    mortgage: 'Ипотека / Долг по аренде',
    carLoans: 'Автокредит',
    studentLoans: 'Студенческий кредит',
    creditCards: 'Кредитные карты',
    otherDebts: 'Прочие долги',
    totalAssets: 'Итого активы',
    totalLiabilities: 'Итого обязательства',
    netWorth: 'Чистые активы',
    positive: 'Положительный',
    negative: 'Отрицательный',
  },
  uk: {
    assetsTitle: 'Активи',
    liabilitiesTitle: 'Зобов\'язання',
    cash: 'Готівка та заощадження',
    investments: 'Інвестиції',
    realEstate: 'Нерухомість',
    vehicles: 'Транспорт',
    otherAssets: 'Інші активи',
    mortgage: 'Іпотека / Борг з оренди',
    carLoans: 'Автокредит',
    studentLoans: 'Студентський кредит',
    creditCards: 'Кредитні картки',
    otherDebts: 'Інші борги',
    totalAssets: 'Разом активи',
    totalLiabilities: 'Разом зобов\'язання',
    netWorth: 'Чисті активи',
    positive: 'Позитивний',
    negative: 'Негативний',
  },
  fr: {
    assetsTitle: 'Actifs',
    liabilitiesTitle: 'Passifs',
    cash: 'Liquidités & Épargne',
    investments: 'Investissements',
    realEstate: 'Immobilier',
    vehicles: 'Véhicules',
    otherAssets: 'Autres actifs',
    mortgage: 'Prêt immobilier',
    carLoans: 'Prêt auto',
    studentLoans: 'Prêt étudiant',
    creditCards: 'Cartes de crédit',
    otherDebts: 'Autres dettes',
    totalAssets: 'Total actifs',
    totalLiabilities: 'Total passifs',
    netWorth: 'Valeur nette',
    positive: 'Positif',
    negative: 'Négatif',
  },
  lt: {
    assetsTitle: 'Turtas',
    liabilitiesTitle: 'Įsipareigojimai',
    cash: 'Grynieji ir santaupos',
    investments: 'Investicijos',
    realEstate: 'Nekilnojamasis turtas',
    vehicles: 'Transporto priemonės',
    otherAssets: 'Kitas turtas',
    mortgage: 'Hipoteka',
    carLoans: 'Automobilio paskola',
    studentLoans: 'Studijų paskola',
    creditCards: 'Kredito kortelės',
    otherDebts: 'Kita skola',
    totalAssets: 'Iš viso turto',
    totalLiabilities: 'Iš viso įsipareigojimų',
    netWorth: 'Grynoji vertė',
    positive: 'Teigiama',
    negative: 'Neigiama',
  },
};

function parseVal(v: string): number {
  const n = parseFloat(v.replace(',', '.'));
  return isNaN(n) || n < 0 ? 0 : n;
}

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export default function NetWorthCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;

  const [cash, setCash] = useState('');
  const [investments, setInvestments] = useState('');
  const [realEstate, setRealEstate] = useState('');
  const [vehicles, setVehicles] = useState('');
  const [otherAssets, setOtherAssets] = useState('');

  const [mortgage, setMortgage] = useState('');
  const [carLoans, setCarLoans] = useState('');
  const [studentLoans, setStudentLoans] = useState('');
  const [creditCards, setCreditCards] = useState('');
  const [otherDebts, setOtherDebts] = useState('');

  const totalAssets = parseVal(cash) + parseVal(investments) + parseVal(realEstate) + parseVal(vehicles) + parseVal(otherAssets);
  const totalLiabilities = parseVal(mortgage) + parseVal(carLoans) + parseVal(studentLoans) + parseVal(creditCards) + parseVal(otherDebts);
  const netWorth = totalAssets - totalLiabilities;

  const netClass = netWorth > 0
    ? styles['widget__result-val--positive']
    : netWorth < 0
    ? styles['widget__result-val--negative']
    : styles['widget__result-val--zero'];

  const assetFields = [
    { label: t.cash, value: cash, set: setCash },
    { label: t.investments, value: investments, set: setInvestments },
    { label: t.realEstate, value: realEstate, set: setRealEstate },
    { label: t.vehicles, value: vehicles, set: setVehicles },
    { label: t.otherAssets, value: otherAssets, set: setOtherAssets },
  ];

  const liabilityFields = [
    { label: t.mortgage, value: mortgage, set: setMortgage },
    { label: t.carLoans, value: carLoans, set: setCarLoans },
    { label: t.studentLoans, value: studentLoans, set: setStudentLoans },
    { label: t.creditCards, value: creditCards, set: setCreditCards },
    { label: t.otherDebts, value: otherDebts, set: setOtherDebts },
  ];

  return (
    <div className={styles.widget}>
      <div className={styles.widget__body}>
        {/* Assets */}
        <div>
          <p className={`${styles['widget__section-title']} ${styles['widget__section-title--assets']}`}>
            {t.assetsTitle}
            <span className={styles['widget__section-total']}>{fmt(totalAssets)} €</span>
          </p>
          <div className={styles.widget__fields}>
            {assetFields.map((f) => (
              <div key={f.label} className={styles.widget__field}>
                <label className={styles.widget__label}>{f.label}</label>
                <div className={styles['widget__input-wrap']}>
                  <span className={styles.widget__currency}>€</span>
                  <input
                    className={styles.widget__input}
                    type="number"
                    min="0"
                    step="1000"
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    placeholder="0"
                    aria-label={f.label}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Liabilities */}
        <div>
          <p className={`${styles['widget__section-title']} ${styles['widget__section-title--liabilities']}`}>
            {t.liabilitiesTitle}
            <span className={styles['widget__section-total']}>{fmt(totalLiabilities)} €</span>
          </p>
          <div className={styles.widget__fields}>
            {liabilityFields.map((f) => (
              <div key={f.label} className={styles.widget__field}>
                <label className={styles.widget__label}>{f.label}</label>
                <div className={styles['widget__input-wrap']}>
                  <span className={styles.widget__currency}>€</span>
                  <input
                    className={styles.widget__input}
                    type="number"
                    min="0"
                    step="1000"
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    placeholder="0"
                    aria-label={f.label}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.widget__results}>
        <div className={styles['widget__result-row']}>
          <span className={styles['widget__result-key']}>{t.totalAssets}</span>
          <span className={`${styles['widget__result-val']} ${styles['widget__result-val--assets']}`}>{fmt(totalAssets)} €</span>
        </div>
        <div className={styles['widget__result-row']}>
          <span className={styles['widget__result-key']}>{t.totalLiabilities}</span>
          <span className={`${styles['widget__result-val']} ${styles['widget__result-val--liabilities']}`}>−{fmt(totalLiabilities)} €</span>
        </div>
        <div className={styles['widget__result-net']}>
          <span>{t.netWorth}</span>
          <span className={netClass}>{netWorth >= 0 ? '' : '−'}{fmt(Math.abs(netWorth))} €</span>
        </div>
      </div>
    </div>
  );
}

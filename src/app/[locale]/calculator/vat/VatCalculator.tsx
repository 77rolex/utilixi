'use client';

import { useState } from 'react';
import styles from './VatCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  modeAdd: string; modeExtract: string;
  country: string; customRate: string;
  amount: string; amountPlaceholder: string;
  calculate: string; reset: string;
  excl: string; vatAmount: string; incl: string;
  errAmount: string; errPositive: string;
}> = {
  en: {
    modeAdd: 'Add VAT', modeExtract: 'Extract VAT',
    country: 'Country / VAT rate', customRate: 'Custom rate (%)',
    amount: 'Amount', amountPlaceholder: '1000',
    calculate: 'Calculate', reset: 'Reset',
    excl: 'Excl. VAT', vatAmount: 'VAT amount', incl: 'Incl. VAT',
    errAmount: 'Please enter an amount.', errPositive: 'Amount must be greater than zero.',
  },
  ru: {
    modeAdd: 'Добавить НДС', modeExtract: 'Выделить НДС',
    country: 'Страна / ставка НДС', customRate: 'Своя ставка (%)',
    amount: 'Сумма', amountPlaceholder: '1000',
    calculate: 'Рассчитать', reset: 'Сбросить',
    excl: 'Без НДС', vatAmount: 'Сумма НДС', incl: 'С НДС',
    errAmount: 'Введите сумму.', errPositive: 'Сумма должна быть больше нуля.',
  },
  uk: {
    modeAdd: 'Додати ПДВ', modeExtract: 'Виділити ПДВ',
    country: 'Країна / ставка ПДВ', customRate: 'Своя ставка (%)',
    amount: 'Сума', amountPlaceholder: '1000',
    calculate: 'Розрахувати', reset: 'Скинути',
    excl: 'Без ПДВ', vatAmount: 'Сума ПДВ', incl: 'З ПДВ',
    errAmount: 'Введіть суму.', errPositive: 'Сума має бути більше нуля.',
  },
  fr: {
    modeAdd: 'Ajouter TVA', modeExtract: 'Extraire TVA',
    country: 'Pays / taux TVA', customRate: 'Taux personnalisé (%)',
    amount: 'Montant', amountPlaceholder: '1000',
    calculate: 'Calculer', reset: 'Réinitialiser',
    excl: 'HT', vatAmount: 'Montant TVA', incl: 'TTC',
    errAmount: 'Veuillez entrer un montant.', errPositive: 'Le montant doit être supérieur à zéro.',
  },
  lt: {
    modeAdd: 'Pridėti PVM', modeExtract: 'Išskirti PVM',
    country: 'Šalis / PVM tarifas', customRate: 'Pasirinktinis tarifas (%)',
    amount: 'Suma', amountPlaceholder: '1000',
    calculate: 'Skaičiuoti', reset: 'Išvalyti',
    excl: 'Be PVM', vatAmount: 'PVM suma', incl: 'Su PVM',
    errAmount: 'Įveskite sumą.', errPositive: 'Suma turi būti didesnė už nulį.',
  },
};

type Country = { code: string; rate: number; name: Record<LangKey, string> };

const COUNTRIES: Country[] = [
  { code: 'RU', rate: 20, name: { en: 'Russia — 20%', ru: 'Россия — 20%', uk: 'Росія — 20%', fr: 'Russie — 20%', lt: 'Rusija — 20%' } },
  { code: 'UA', rate: 20, name: { en: 'Ukraine — 20%', ru: 'Украина — 20%', uk: 'Україна — 20%', fr: 'Ukraine — 20%', lt: 'Ukraina — 20%' } },
  { code: 'BY', rate: 20, name: { en: 'Belarus — 20%', ru: 'Беларусь — 20%', uk: 'Білорусь — 20%', fr: 'Biélorussie — 20%', lt: 'Baltarusija — 20%' } },
  { code: 'KZ', rate: 12, name: { en: 'Kazakhstan — 12%', ru: 'Казахстан — 12%', uk: 'Казахстан — 12%', fr: 'Kazakhstan — 12%', lt: 'Kazachstanas — 12%' } },
  { code: 'MD', rate: 20, name: { en: 'Moldova — 20%', ru: 'Молдова — 20%', uk: 'Молдова — 20%', fr: 'Moldavie — 20%', lt: 'Moldova — 20%' } },
  { code: 'FR', rate: 20, name: { en: 'France — 20%', ru: 'Франция — 20%', uk: 'Франція — 20%', fr: 'France — 20%', lt: 'Prancūzija — 20%' } },
  { code: 'DE', rate: 19, name: { en: 'Germany — 19%', ru: 'Германия — 19%', uk: 'Німеччина — 19%', fr: 'Allemagne — 19%', lt: 'Vokietija — 19%' } },
  { code: 'GB', rate: 20, name: { en: 'UK — 20%', ru: 'Великобритания — 20%', uk: 'Великобританія — 20%', fr: 'Royaume-Uni — 20%', lt: 'JK — 20%' } },
  { code: 'PL', rate: 23, name: { en: 'Poland — 23%', ru: 'Польша — 23%', uk: 'Польща — 23%', fr: 'Pologne — 23%', lt: 'Lenkija — 23%' } },
  { code: 'CZ', rate: 21, name: { en: 'Czech Rep. — 21%', ru: 'Чехия — 21%', uk: 'Чехія — 21%', fr: 'Tchéquie — 21%', lt: 'Čekija — 21%' } },
  { code: 'LT', rate: 21, name: { en: 'Lithuania — 21%', ru: 'Литва — 21%', uk: 'Литва — 21%', fr: 'Lituanie — 21%', lt: 'Lietuva — 21%' } },
  { code: 'LV', rate: 21, name: { en: 'Latvia — 21%', ru: 'Латвия — 21%', uk: 'Латвія — 21%', fr: 'Lettonie — 21%', lt: 'Latvija — 21%' } },
  { code: 'EE', rate: 22, name: { en: 'Estonia — 22%', ru: 'Эстония — 22%', uk: 'Естонія — 22%', fr: 'Estonie — 22%', lt: 'Estija — 22%' } },
  { code: 'IT', rate: 22, name: { en: 'Italy — 22%', ru: 'Италия — 22%', uk: 'Італія — 22%', fr: 'Italie — 22%', lt: 'Italija — 22%' } },
  { code: 'ES', rate: 21, name: { en: 'Spain — 21%', ru: 'Испания — 21%', uk: 'Іспанія — 21%', fr: 'Espagne — 21%', lt: 'Ispanija — 21%' } },
  { code: 'NL', rate: 21, name: { en: 'Netherlands — 21%', ru: 'Нидерланды — 21%', uk: 'Нідерланди — 21%', fr: 'Pays-Bas — 21%', lt: 'Nyderlandai — 21%' } },
  { code: 'BE', rate: 21, name: { en: 'Belgium — 21%', ru: 'Бельгия — 21%', uk: 'Бельгія — 21%', fr: 'Belgique — 21%', lt: 'Belgija — 21%' } },
  { code: 'AT', rate: 20, name: { en: 'Austria — 20%', ru: 'Австрия — 20%', uk: 'Австрія — 20%', fr: 'Autriche — 20%', lt: 'Austrija — 20%' } },
  { code: 'CH', rate: 8.1, name: { en: 'Switzerland — 8.1%', ru: 'Швейцария — 8.1%', uk: 'Швейцарія — 8.1%', fr: 'Suisse — 8.1%', lt: 'Šveicarija — 8,1%' } },
  { code: 'SE', rate: 25, name: { en: 'Sweden — 25%', ru: 'Швеция — 25%', uk: 'Швеція — 25%', fr: 'Suède — 25%', lt: 'Švedija — 25%' } },
  { code: 'DK', rate: 25, name: { en: 'Denmark — 25%', ru: 'Дания — 25%', uk: 'Данія — 25%', fr: 'Danemark — 25%', lt: 'Danija — 25%' } },
  { code: 'NO', rate: 25, name: { en: 'Norway — 25%', ru: 'Норвегия — 25%', uk: 'Норвегія — 25%', fr: 'Norvège — 25%', lt: 'Norvegija — 25%' } },
  { code: 'HU', rate: 27, name: { en: 'Hungary — 27%', ru: 'Венгрия — 27%', uk: 'Угорщина — 27%', fr: 'Hongrie — 27%', lt: 'Vengrija — 27%' } },
];

const DEFAULT_COUNTRY: Record<LangKey, string> = {
  ru: 'RU', uk: 'UA', en: 'GB', fr: 'FR', lt: 'LT',
};

function fmt(n: number): string {
  return n.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function VatCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [mode, setMode] = useState<'add' | 'extract'>('add');
  const [country, setCountry] = useState(DEFAULT_COUNTRY[lang]);
  const [customRate, setCustomRate] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<{ excl: number; vat: number; incl: number } | null>(null);
  const [error, setError] = useState('');

  const effectiveRate = (): number => {
    if (customRate !== '') return parseFloat(customRate.replace(',', '.'));
    return COUNTRIES.find((c) => c.code === country)?.rate ?? 20;
  };

  const calculate = () => {
    const val = parseFloat(amount.replace(',', '.'));
    if (isNaN(val)) { setError(t.errAmount); return; }
    if (val <= 0) { setError(t.errPositive); return; }
    setError('');
    const rate = effectiveRate() / 100;
    if (mode === 'add') {
      const vat = val * rate;
      setResult({ excl: val, vat, incl: val + vat });
    } else {
      const excl = val / (1 + rate);
      setResult({ excl, vat: val - excl, incl: val });
    }
  };

  const reset = () => { setAmount(''); setResult(null); setError(''); };

  return (
    <div className={styles['vat-calc']}>
      <div className={styles['vat-calc__tabs']}>
        <button type="button"
          className={`${styles['vat-calc__tab']} ${mode === 'add' ? styles['vat-calc__tab--active'] : ''}`}
          onClick={() => { setMode('add'); setResult(null); }}
        >{t.modeAdd}</button>
        <button type="button"
          className={`${styles['vat-calc__tab']} ${mode === 'extract' ? styles['vat-calc__tab--active'] : ''}`}
          onClick={() => { setMode('extract'); setResult(null); }}
        >{t.modeExtract}</button>
      </div>

      <div className={styles['vat-calc__form']}>
        <div className={styles['vat-calc__field']}>
          <label className={styles['vat-calc__label']}>{t.country}</label>
          <select
            className={styles['vat-calc__select']}
            value={country}
            onChange={(e) => { setCountry(e.target.value); setCustomRate(''); setResult(null); }}
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c.name[lang]}</option>
            ))}
          </select>
        </div>

        <div className={styles['vat-calc__field']}>
          <label className={styles['vat-calc__label']}>{t.customRate}</label>
          <input
            type="number" className={styles['vat-calc__input']}
            value={customRate} placeholder={String(effectiveRate())}
            min="0" max="100" step="0.1"
            onChange={(e) => { setCustomRate(e.target.value); setResult(null); }}
            onKeyDown={(e) => e.key === 'Enter' && calculate()}
          />
        </div>

        <div className={styles['vat-calc__field']}>
          <label className={styles['vat-calc__label']}>{t.amount}</label>
          <input
            type="number" className={styles['vat-calc__input']}
            value={amount} placeholder={t.amountPlaceholder}
            min="0"
            onChange={(e) => { setAmount(e.target.value); setError(''); setResult(null); }}
            onKeyDown={(e) => e.key === 'Enter' && calculate()}
          />
        </div>

        {error && <p className={styles['vat-calc__error']}>{error}</p>}

        <div className={styles['vat-calc__actions']}>
          <button type="button" className={styles['vat-calc__btn']} onClick={calculate}>{t.calculate}</button>
          <button type="button" className={styles['vat-calc__btn--reset']} onClick={reset}>{t.reset}</button>
        </div>
      </div>

      {result && (
        <div className={styles['vat-calc__result']}>
          <div className={`${styles['vat-calc__result-row']} ${mode === 'extract' ? styles['vat-calc__result-row--highlight'] : ''}`}>
            <span className={styles['vat-calc__result-label']}>{t.excl}</span>
            <span className={styles['vat-calc__result-value']}>{fmt(result.excl)}</span>
          </div>
          <div className={styles['vat-calc__result-row']}>
            <span className={styles['vat-calc__result-label']}>{t.vatAmount} ({effectiveRate()}%)</span>
            <span className={`${styles['vat-calc__result-value']} ${styles['vat-calc__result-value--accent']}`}>{fmt(result.vat)}</span>
          </div>
          <div className={`${styles['vat-calc__result-row']} ${mode === 'add' ? styles['vat-calc__result-row--highlight'] : ''}`}>
            <span className={styles['vat-calc__result-label']}>{t.incl}</span>
            <span className={styles['vat-calc__result-value']}>{fmt(result.incl)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

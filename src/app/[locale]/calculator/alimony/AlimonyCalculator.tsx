'use client';

import { useState, useEffect } from 'react';
import styles from './AlimonyCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

interface CountryConfig {
  rates: { 1: number; 2: number; 3: number };
  currency: string;
  basis: Record<LangKey, string>;
}

const COUNTRIES: Record<string, CountryConfig> = {
  RU: {
    rates: { 1: 0.25, 2: 0.33, 3: 0.50 },
    currency: '₽',
    basis: { en: 'Art. 81 Family Code of Russia', ru: 'Ст. 81 Семейного кодекса РФ', uk: 'Ст. 81 СК РФ', fr: 'Art. 81 Code de la famille (Russie)', lt: 'Rusijos šeimos kodekso 81 str.' },
  },
  UA: {
    rates: { 1: 0.25, 2: 0.33, 3: 0.50 },
    currency: '₴',
    basis: { en: 'Art. 183 Family Code of Ukraine', ru: 'Ст. 183 Семейного кодекса Украины', uk: 'Ст. 183 Сімейного кодексу України', fr: 'Art. 183 Code de la famille (Ukraine)', lt: 'Ukrainos šeimos kodekso 183 str.' },
  },
  BY: {
    rates: { 1: 0.25, 2: 0.33, 3: 0.50 },
    currency: 'Br',
    basis: { en: 'Art. 92 Marriage and Family Code of Belarus', ru: 'Ст. 92 Кодекса о браке и семье РБ', uk: 'Ст. 92 Кодексу про шлюб і сім\'ю РБ', fr: 'Art. 92 Code de la famille (Biélorussie)', lt: 'Baltarusijos šeimos kodekso 92 str.' },
  },
  KZ: {
    rates: { 1: 0.25, 2: 0.33, 3: 0.50 },
    currency: '₸',
    basis: { en: 'Art. 140 Marriage and Family Code of Kazakhstan', ru: 'Ст. 140 Кодекса о браке (Казахстан)', uk: 'Ст. 140 Кодексу про шлюб (Казахстан)', fr: 'Art. 140 Code de la famille (Kazakhstan)', lt: 'Kazachstano šeimos kodekso 140 str.' },
  },
  MD: {
    rates: { 1: 0.25, 2: 0.33, 3: 0.50 },
    currency: 'L',
    basis: { en: 'Family Code of Moldova', ru: 'Семейный кодекс Молдовы', uk: 'Сімейний кодекс Молдови', fr: 'Code de la famille (Moldavie)', lt: 'Moldovos šeimos kodeksas' },
  },
  US: {
    rates: { 1: 0.17, 2: 0.25, 3: 0.29 },
    currency: '$',
    basis: { en: 'Average state guidelines (varies by state)', ru: 'Среднее по штатам (варьируется)', uk: 'Середнє по штатах (варіюється)', fr: 'Moyennes par État (variable)', lt: 'Vidutiniai valstijų rodikliai (kintami)' },
  },
  UK: {
    rates: { 1: 0.12, 2: 0.16, 3: 0.19 },
    currency: '£',
    basis: { en: 'Child Maintenance Service (2012 scheme)', ru: 'Child Maintenance Service (схема 2012)', uk: 'Child Maintenance Service (схема 2012)', fr: 'Child Maintenance Service (schéma 2012)', lt: 'Child Maintenance Service (2012 schema)' },
  },
  CA: {
    rates: { 1: 0.14, 2: 0.21, 3: 0.26 },
    currency: 'C$',
    basis: { en: 'Federal Child Support Guidelines (simplified)', ru: 'Федеральные нормы поддержки детей (упрощённо)', uk: 'Федеральні норми підтримки дітей (спрощено)', fr: 'Lignes directrices fédérales (simplifié)', lt: 'Federalinės vaiko išlaikymo gairės (supaprastinta)' },
  },
  AU: {
    rates: { 1: 0.16, 2: 0.24, 3: 0.27 },
    currency: 'A$',
    basis: { en: 'Child Support Assessment (approximate)', ru: 'Child Support Assessment (приблизительно)', uk: 'Child Support Assessment (приблизно)', fr: 'Child Support Assessment (approximatif)', lt: 'Child Support Assessment (apytiksliai)' },
  },
  FR: {
    rates: { 1: 0.15, 2: 0.22, 3: 0.28 },
    currency: '€',
    basis: { en: 'Indicative scale, Ministry of Justice (France)', ru: 'Ориентировочная шкала Минюста Франции', uk: 'Орієнтовна шкала Міністерства юстиції Франції', fr: 'Barème indicatif du Ministère de la Justice', lt: 'Orientacinė Teisingumo ministerijos skalė (Prancūzija)' },
  },
  BE: {
    rates: { 1: 0.15, 2: 0.22, 3: 0.28 },
    currency: '€',
    basis: { en: 'Indicative amounts (Belgium)', ru: 'Ориентировочные суммы (Бельгия)', uk: 'Орієнтовні суми (Бельгія)', fr: 'Montants indicatifs (Belgique)', lt: 'Orientacinės sumos (Belgija)' },
  },
  CH: {
    rates: { 1: 0.16, 2: 0.22, 3: 0.28 },
    currency: 'Fr.',
    basis: { en: 'Cantonal guidelines (Switzerland, approximate)', ru: 'Кантональные нормы (Швейцария, приблизительно)', uk: 'Кантональні норми (Швейцарія, приблизно)', fr: 'Directives cantonales (Suisse, approximatif)', lt: 'Kantoninės gairės (Šveicarija, apytiksliai)' },
  },
  LT: {
    rates: { 1: 0.25, 2: 0.33, 3: 0.50 },
    currency: '€',
    basis: { en: 'Civil Code of Lithuania, Art. 3.196', ru: 'Гражданский кодекс Литвы, ст. 3.196', uk: 'Цивільний кодекс Литви, ст. 3.196', fr: 'Code civil lituanien, art. 3.196', lt: 'LR CK 3.196 str.' },
  },
  LV: {
    rates: { 1: 0.25, 2: 0.33, 3: 0.50 },
    currency: '€',
    basis: { en: 'Civil Law of Latvia (approximate)', ru: 'Гражданский закон Латвии (приблизительно)', uk: 'Цивільний закон Латвії (приблизно)', fr: 'Droit civil letton (approximatif)', lt: 'Latvijos civilinė teisė (apytiksliai)' },
  },
  EE: {
    rates: { 1: 0.25, 2: 0.33, 3: 0.50 },
    currency: '€',
    basis: { en: 'Family Law Act of Estonia (approximate)', ru: 'Закон о семье Эстонии (приблизительно)', uk: 'Закон про сім\'ю Естонії (приблизно)', fr: 'Loi sur la famille (Estonie, approximatif)', lt: 'Šeimos teisės įstatymas (Estija, apytiksliai)' },
  },
};

const COUNTRY_NAMES: Record<string, Record<LangKey, string>> = {
  RU: { en: 'Russia', ru: 'Россия', uk: 'Росія', fr: 'Russie', lt: 'Rusija' },
  UA: { en: 'Ukraine', ru: 'Украина', uk: 'Україна', fr: 'Ukraine', lt: 'Ukraina' },
  BY: { en: 'Belarus', ru: 'Беларусь', uk: 'Білорусь', fr: 'Biélorussie', lt: 'Baltarusija' },
  KZ: { en: 'Kazakhstan', ru: 'Казахстан', uk: 'Казахстан', fr: 'Kazakhstan', lt: 'Kazachstanas' },
  MD: { en: 'Moldova', ru: 'Молдова', uk: 'Молдова', fr: 'Moldavie', lt: 'Moldova' },
  US: { en: 'USA', ru: 'США', uk: 'США', fr: 'États-Unis', lt: 'JAV' },
  UK: { en: 'United Kingdom', ru: 'Великобритания', uk: 'Велика Британія', fr: 'Royaume-Uni', lt: 'Jungtinė Karalystė' },
  CA: { en: 'Canada', ru: 'Канада', uk: 'Канада', fr: 'Canada', lt: 'Kanada' },
  AU: { en: 'Australia', ru: 'Австралия', uk: 'Австралія', fr: 'Australie', lt: 'Australija' },
  FR: { en: 'France', ru: 'Франция', uk: 'Франція', fr: 'France', lt: 'Prancūzija' },
  BE: { en: 'Belgium', ru: 'Бельгия', uk: 'Бельгія', fr: 'Belgique', lt: 'Belgija' },
  CH: { en: 'Switzerland', ru: 'Швейцария', uk: 'Швейцарія', fr: 'Suisse', lt: 'Šveicarija' },
  LT: { en: 'Lithuania', ru: 'Литва', uk: 'Литва', fr: 'Lituanie', lt: 'Lietuva' },
  LV: { en: 'Latvia', ru: 'Латвия', uk: 'Латвія', fr: 'Lettonie', lt: 'Latvija' },
  EE: { en: 'Estonia', ru: 'Эстония', uk: 'Естонія', fr: 'Estonie', lt: 'Estija' },
};

const COUNTRY_LISTS: Record<LangKey, string[]> = {
  ru: ['RU', 'UA', 'BY', 'KZ', 'MD'],
  uk: ['UA', 'RU', 'BY', 'MD'],
  en: ['US', 'UK', 'CA', 'AU'],
  fr: ['FR', 'BE', 'CH', 'CA'],
  lt: ['LT', 'LV', 'EE'],
};

const T: Record<LangKey, {
  country: string; income: string; incomePlaceholder: string;
  children: string; child1: string; child2: string; child3: string;
  calculate: string; result: string; monthly: string;
  rate: string; basis: string; disclaimer: string; errIncome: string;
}> = {
  en: {
    country: 'Country', income: 'Monthly net income', incomePlaceholder: 'e.g. 3000',
    children: 'Number of children', child1: '1 child', child2: '2 children', child3: '3 or more',
    calculate: 'Calculate', result: 'Estimated child support', monthly: '/month',
    rate: 'Rate', basis: 'Legal basis',
    disclaimer: 'This is an approximate calculation for informational purposes only. Actual amounts depend on court decisions, local regulations, and individual circumstances.',
    errIncome: 'Please enter a valid income amount.',
  },
  ru: {
    country: 'Страна', income: 'Ежемесячный чистый доход', incomePlaceholder: 'например 50 000',
    children: 'Количество детей', child1: '1 ребёнок', child2: '2 детей', child3: '3 и более',
    calculate: 'Рассчитать', result: 'Ориентировочная сумма алиментов', monthly: '/месяц',
    rate: 'Ставка', basis: 'Правовая основа',
    disclaimer: 'Расчёт носит ориентировочный характер и предназначен исключительно для информационных целей. Реальные суммы зависят от решения суда, местного законодательства и индивидуальных обстоятельств.',
    errIncome: 'Пожалуйста, введите корректный доход.',
  },
  uk: {
    country: 'Країна', income: 'Щомісячний чистий дохід', incomePlaceholder: 'наприклад 30 000',
    children: 'Кількість дітей', child1: '1 дитина', child2: '2 дітей', child3: '3 і більше',
    calculate: 'Розрахувати', result: 'Орієнтовна сума аліментів', monthly: '/місяць',
    rate: 'Ставка', basis: 'Правова основа',
    disclaimer: 'Розрахунок є орієнтовним і призначений виключно для інформаційних цілей. Реальні суми залежать від рішення суду, місцевого законодавства та індивідуальних обставин.',
    errIncome: 'Будь ласка, введіть коректний дохід.',
  },
  fr: {
    country: 'Pays', income: 'Revenu net mensuel', incomePlaceholder: 'ex. 3000',
    children: 'Nombre d\'enfants', child1: '1 enfant', child2: '2 enfants', child3: '3 ou plus',
    calculate: 'Calculer', result: 'Pension alimentaire estimée', monthly: '/mois',
    rate: 'Taux', basis: 'Base légale',
    disclaimer: 'Ce calcul est approximatif et fourni à titre informatif uniquement. Les montants réels dépendent des décisions de justice, des réglementations locales et des circonstances individuelles.',
    errIncome: 'Veuillez entrer un montant de revenu valide.',
  },
  lt: {
    country: 'Šalis', income: 'Mėnesio grynosios pajamos', incomePlaceholder: 'pvz. 1500',
    children: 'Vaikų skaičius', child1: '1 vaikas', child2: '2 vaikai', child3: '3 ir daugiau',
    calculate: 'Skaičiuoti', result: 'Apytikslė alimentų suma', monthly: '/mėn.',
    rate: 'Norma', basis: 'Teisinis pagrindas',
    disclaimer: 'Šis skaičiavimas yra apytikslis ir skirtas tik informaciniais tikslais. Tikrosios sumos priklauso nuo teismo sprendimų, vietos teisės aktų ir individualių aplinkybių.',
    errIncome: 'Įveskite tinkamą pajamų sumą.',
  },
};

function fmt(n: number): string {
  return n.toLocaleString('en', { maximumFractionDigits: 0 });
}

export default function AlimonyCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];
  const countryList = COUNTRY_LISTS[lang];

  const [country, setCountry] = useState(countryList[0]);
  const [income, setIncome] = useState('');
  const [children, setChildren] = useState<1 | 2 | 3>(1);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('utilixi_alimony_country');
    if (saved && countryList.includes(saved)) setCountry(saved);
  }, []);

  function handleCountry(code: string) {
    setCountry(code);
    setResult(null);
    localStorage.setItem('utilixi_alimony_country', code);
  }

  const cfg = COUNTRIES[country];

  const calculate = () => {
    const inc = parseFloat(income.replace(/\s/g, '').replace(',', '.'));
    if (!inc || inc <= 0) { setError(t.errIncome); setResult(null); return; }
    setError('');
    setResult(inc * cfg.rates[children]);
  };

  const rate = cfg.rates[children];

  return (
    <div className={styles['alimony-calc']}>
      <div className={styles['alimony-calc__form']}>

        <div className={styles['alimony-calc__field']}>
          <label className={styles['alimony-calc__label']}>{t.country}</label>
          <select
            className={styles['alimony-calc__select']}
            value={country}
            onChange={(e) => handleCountry(e.target.value)}
          >
            {countryList.map((code) => (
              <option key={code} value={code}>{COUNTRY_NAMES[code][lang]}</option>
            ))}
          </select>
        </div>

        <div className={styles['alimony-calc__field']}>
          <label className={styles['alimony-calc__label']}>{t.income}</label>
          <div className={styles['alimony-calc__input-wrap']}>
            <input
              type="number"
              className={styles['alimony-calc__input']}
              value={income}
              onChange={(e) => { setIncome(e.target.value); setError(''); setResult(null); }}
              onKeyDown={(e) => e.key === 'Enter' && calculate()}
              placeholder={t.incomePlaceholder}
              min="0"
            />
            <span className={styles['alimony-calc__currency']}>{cfg.currency}</span>
          </div>
        </div>

        <div className={styles['alimony-calc__field']}>
          <label className={styles['alimony-calc__label']}>{t.children}</label>
          <div className={styles['alimony-calc__toggle']}>
            {([1, 2, 3] as const).map((n) => (
              <button
                key={n}
                type="button"
                className={`${styles['alimony-calc__toggle-btn']} ${children === n ? styles['alimony-calc__toggle-btn--active'] : ''}`}
                onClick={() => { setChildren(n); setResult(null); }}
              >
                {n === 1 ? t.child1 : n === 2 ? t.child2 : t.child3}
              </button>
            ))}
          </div>
        </div>

        {error && <p className={styles['alimony-calc__error']}>{error}</p>}

        <button type="button" className={styles['alimony-calc__btn']} onClick={calculate}>
          {t.calculate}
        </button>
      </div>

      {result !== null && (
        <div className={styles['alimony-calc__result']}>
          <p className={styles['alimony-calc__result-label']}>{t.result}</p>
          <p className={styles['alimony-calc__result-amount']}>
            {cfg.currency}{fmt(result)}
            <span className={styles['alimony-calc__result-period']}>{t.monthly}</span>
          </p>
          <div className={styles['alimony-calc__result-meta']}>
            <div className={styles['alimony-calc__meta-row']}>
              <span className={styles['alimony-calc__meta-key']}>{t.rate}</span>
              <span className={styles['alimony-calc__meta-val']}>{(rate * 100).toFixed(0)}%</span>
            </div>
            <div className={styles['alimony-calc__meta-row']}>
              <span className={styles['alimony-calc__meta-key']}>{t.basis}</span>
              <span className={styles['alimony-calc__meta-val']}>{cfg.basis[lang]}</span>
            </div>
          </div>
          <p className={styles['alimony-calc__disclaimer']}>{t.disclaimer}</p>
        </div>
      )}
    </div>
  );
}

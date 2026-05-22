'use client';

import { useState } from 'react';
import styles from './LifeInsuranceCalculator.module.scss';

type CountryConfig = {
  en: string; ru: string; uk: string; fr: string; lt: string;
  symbol: string;
  defaultCoverage: number;
};

const COUNTRIES: Record<string, CountryConfig> = {
  US: { en: 'USA',            ru: 'США',             uk: 'США',             fr: 'États-Unis',    lt: 'JAV',               symbol: '$',  defaultCoverage: 500000   },
  GB: { en: 'United Kingdom', ru: 'Великобритания',  uk: 'Великобританія',  fr: 'Royaume-Uni',   lt: 'Didžioji Britanija', symbol: '£',  defaultCoverage: 400000   },
  DE: { en: 'Germany',        ru: 'Германия',        uk: 'Німеччина',       fr: 'Allemagne',     lt: 'Vokietija',         symbol: '€',  defaultCoverage: 300000   },
  FR: { en: 'France',         ru: 'Франция',         uk: 'Франція',         fr: 'France',        lt: 'Prancūzija',        symbol: '€',  defaultCoverage: 250000   },
  PL: { en: 'Poland',         ru: 'Польша',          uk: 'Польща',          fr: 'Pologne',       lt: 'Lenkija',           symbol: 'zł', defaultCoverage: 400000   },
  LT: { en: 'Lithuania',      ru: 'Литва',           uk: 'Литва',           fr: 'Lituanie',      lt: 'Lietuva',           symbol: '€',  defaultCoverage: 150000   },
  UA: { en: 'Ukraine',        ru: 'Украина',         uk: 'Україна',         fr: 'Ukraine',       lt: 'Ukraina',           symbol: '₴',  defaultCoverage: 5000000  },
  RU: { en: 'Russia',         ru: 'Россия',          uk: 'Росія',           fr: 'Russie',        lt: 'Rusija',            symbol: '₽',  defaultCoverage: 10000000 },
};

const TERM_RATES: Record<number, number> = {
  10: 0.15,
  15: 0.21,
  20: 0.30,
  25: 0.42,
  30: 0.55,
};

const AGE_FACTORS: { max: number; factor: number }[] = [
  { max: 29, factor: 1.0 },
  { max: 39, factor: 1.6 },
  { max: 49, factor: 3.0 },
  { max: 59, factor: 5.5 },
  { max: 99, factor: 9.5 },
];

const L: Record<string, Record<string, string>> = {
  country:   { en: 'Country',              ru: 'Страна',                   uk: 'Країна',                  fr: 'Pays',                    lt: 'Šalis'                },
  age:       { en: 'Age',                  ru: 'Возраст',                  uk: 'Вік',                     fr: 'Âge',                     lt: 'Amžius'               },
  gender:    { en: 'Gender',               ru: 'Пол',                      uk: 'Стать',                   fr: 'Genre',                   lt: 'Lytis'                },
  male:      { en: 'Male',                 ru: 'Мужской',                  uk: 'Чоловіча',                fr: 'Homme',                   lt: 'Vyras'                },
  female:    { en: 'Female',               ru: 'Женский',                  uk: 'Жіноча',                  fr: 'Femme',                   lt: 'Moteris'              },
  coverage:  { en: 'Coverage Amount',      ru: 'Сумма страхования',        uk: 'Сума страхування',        fr: 'Montant assuré',          lt: 'Draudimo suma'        },
  term:      { en: 'Policy Term (years)',   ru: 'Срок полиса (лет)',        uk: 'Термін поліса (років)',   fr: 'Durée du contrat (ans)',  lt: 'Poliso terminas (metai)' },
  smoker:    { en: 'Smoker',               ru: 'Курение',                  uk: 'Куріння',                 fr: 'Fumeur',                  lt: 'Rūkymas'              },
  smokerNo:  { en: 'Non-smoker',           ru: 'Не курю',                  uk: 'Не курю',                 fr: 'Non-fumeur',              lt: 'Nerūkantis'           },
  smokerYes: { en: 'Smoker',               ru: 'Курю',                     uk: 'Курю',                    fr: 'Fumeur',                  lt: 'Rūkantis'             },
  health:    { en: 'Health Status',        ru: 'Состояние здоровья',       uk: "Стан здоров'я",           fr: 'État de santé',           lt: 'Sveikatos būklė'      },
  excellent: { en: 'Excellent',            ru: 'Отличное',                 uk: 'Відмінне',                fr: 'Excellent',               lt: 'Puiki'                },
  good:      { en: 'Good',                 ru: 'Хорошее',                  uk: 'Гарне',                   fr: 'Bon',                     lt: 'Gera'                 },
  average:   { en: 'Average',              ru: 'Среднее',                  uk: 'Середнє',                 fr: 'Moyen',                   lt: 'Vidutinė'             },
  poor:      { en: 'Poor',                 ru: 'Плохое',                   uk: 'Погане',                  fr: 'Mauvais',                 lt: 'Prasta'               },
  calculate: { en: 'Calculate',            ru: 'Рассчитать',               uk: 'Розрахувати',             fr: 'Calculer',                lt: 'Skaičiuoti'           },
  monthly:   { en: 'Monthly Premium',      ru: 'Ежемесячная премия',       uk: 'Щомісячна премія',        fr: 'Prime mensuelle',         lt: 'Mėnesinė įmoka'       },
  annual:    { en: 'Annual Premium',       ru: 'Годовая премия',           uk: 'Річна премія',            fr: 'Prime annuelle',          lt: 'Metinė įmoka'         },
  totalPaid: { en: 'Total Paid Over Term', ru: 'Итого за весь срок',       uk: 'Разом за весь термін',    fr: 'Total payé sur la durée', lt: 'Iš viso per terminą'  },
  disclaimer: {
    en: 'Approximate estimate based on typical market rates for the selected country. Actual premiums depend on the insurer and individual health profile.',
    ru: 'Приблизительная оценка на основе рыночных ставок выбранной страны. Реальная стоимость зависит от страховщика и состояния здоровья.',
    uk: "Приблизна оцінка на основі ринкових ставок обраної країни. Реальна вартість залежить від страховика та стану здоров'я.",
    fr: "Estimation approximative basée sur les taux du marché du pays sélectionné. Les primes réelles dépendent de l'assureur et du profil de santé.",
    lt: 'Apytikslis įvertinimas pagal pasirinktos šalies rinkos normas. Tikrosios įmokos priklauso nuo draudiko ir sveikatos būklės.',
  },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

type Result = { monthly: number; annual: number; total: number; symbol: string };

export default function LifeInsuranceCalculator({ locale }: { locale: string }) {
  const [country, setCountry] = useState('US');
  const [age, setAge] = useState('35');
  const [gender, setGender] = useState('male');
  const [coverage, setCoverage] = useState('500000');
  const [term, setTerm] = useState('20');
  const [smoker, setSmoker] = useState('no');
  const [health, setHealth] = useState('good');
  const [result, setResult] = useState<Result | null>(null);

  function handleCountryChange(code: string) {
    setCountry(code);
    setCoverage(String(COUNTRIES[code].defaultCoverage));
    setResult(null);
  }

  function calculate() {
    const ageNum = parseInt(age) || 35;
    const coverageNum = parseFloat(coverage) || 500000;
    const termNum = parseInt(term) || 20;
    const config = COUNTRIES[country];

    const termRate = TERM_RATES[termNum] ?? 0.30;
    const ageFactor = AGE_FACTORS.find(a => ageNum <= a.max)?.factor ?? 9.5;
    const healthFactor = health === 'excellent' ? 0.85 : health === 'good' ? 1.0 : health === 'average' ? 1.3 : 1.7;
    const smokerFactor = smoker === 'yes' ? 2.0 : 1.0;
    const genderFactor = gender === 'male' ? 1.1 : 1.0;

    const monthly = (coverageNum / 1000) * termRate * ageFactor * healthFactor * smokerFactor * genderFactor;

    setResult({
      monthly: Math.round(monthly * 100) / 100,
      annual:  Math.round(monthly * 12 * 100) / 100,
      total:   Math.round(monthly * 12 * termNum),
      symbol:  config.symbol,
    });
  }

  const fmt    = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtInt = (n: number) => n.toLocaleString('en-US');
  const config = COUNTRIES[country];

  return (
    <div className={styles['life-insurance-widget']}>
      <div className={styles['life-insurance-widget__form']}>
        <div className={styles['life-insurance-widget__row']}>
          <div className={styles['life-insurance-widget__field']}>
            <label className={styles['life-insurance-widget__label']}>{t('country', locale)}</label>
            <select
              className={styles['life-insurance-widget__select']}
              value={country}
              onChange={e => handleCountryChange(e.target.value)}
            >
              {Object.entries(COUNTRIES).map(([code, data]) => (
                <option key={code} value={code}>{data[locale as 'en'|'ru'|'uk'|'fr'|'lt'] || data.en}</option>
              ))}
            </select>
          </div>
          <div className={styles['life-insurance-widget__field']}>
            <label className={styles['life-insurance-widget__label']}>{t('coverage', locale)} ({config.symbol})</label>
            <input
              type="number"
              className={styles['life-insurance-widget__input']}
              value={coverage}
              onChange={e => setCoverage(e.target.value)}
              min="10000" step="10000"
            />
          </div>
        </div>

        <div className={styles['life-insurance-widget__row']}>
          <div className={styles['life-insurance-widget__field']}>
            <label className={styles['life-insurance-widget__label']}>{t('age', locale)}</label>
            <input
              type="number"
              className={styles['life-insurance-widget__input']}
              value={age}
              onChange={e => setAge(e.target.value)}
              min="18" max="70"
            />
          </div>
          <div className={styles['life-insurance-widget__field']}>
            <label className={styles['life-insurance-widget__label']}>{t('gender', locale)}</label>
            <div className={styles['life-insurance-widget__toggle']}>
              <button
                type="button"
                className={`${styles['life-insurance-widget__toggle-btn']}${gender === 'male' ? ` ${styles['life-insurance-widget__toggle-btn--active']}` : ''}`}
                onClick={() => setGender('male')}
              >
                {t('male', locale)}
              </button>
              <button
                type="button"
                className={`${styles['life-insurance-widget__toggle-btn']}${gender === 'female' ? ` ${styles['life-insurance-widget__toggle-btn--active']}` : ''}`}
                onClick={() => setGender('female')}
              >
                {t('female', locale)}
              </button>
            </div>
          </div>
        </div>

        <div className={styles['life-insurance-widget__row']}>
          <div className={styles['life-insurance-widget__field']}>
            <label className={styles['life-insurance-widget__label']}>{t('term', locale)}</label>
            <select className={styles['life-insurance-widget__select']} value={term} onChange={e => setTerm(e.target.value)}>
              {[10, 15, 20, 25, 30].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div className={styles['life-insurance-widget__field']}>
            <label className={styles['life-insurance-widget__label']}>{t('smoker', locale)}</label>
            <select className={styles['life-insurance-widget__select']} value={smoker} onChange={e => setSmoker(e.target.value)}>
              <option value="no">{t('smokerNo', locale)}</option>
              <option value="yes">{t('smokerYes', locale)}</option>
            </select>
          </div>
        </div>

        <div className={styles['life-insurance-widget__field']}>
          <label className={styles['life-insurance-widget__label']}>{t('health', locale)}</label>
          <select className={styles['life-insurance-widget__select']} value={health} onChange={e => setHealth(e.target.value)}>
            <option value="excellent">{t('excellent', locale)}</option>
            <option value="good">{t('good', locale)}</option>
            <option value="average">{t('average', locale)}</option>
            <option value="poor">{t('poor', locale)}</option>
          </select>
        </div>

        <button type="button" className={styles['life-insurance-widget__btn']} onClick={calculate}>
          {t('calculate', locale)}
        </button>
      </div>

      {result && (
        <div className={styles['life-insurance-widget__results']}>
          <div className={styles['life-insurance-widget__result-grid']}>
            <div className={styles['life-insurance-widget__result-item']}>
              <span className={styles['life-insurance-widget__result-label']}>{t('monthly', locale)}</span>
              <span className={styles['life-insurance-widget__result-value']}>{result.symbol}{fmt(result.monthly)}</span>
            </div>
            <div className={styles['life-insurance-widget__result-item']}>
              <span className={styles['life-insurance-widget__result-label']}>{t('annual', locale)}</span>
              <span className={styles['life-insurance-widget__result-value']}>{result.symbol}{fmt(result.annual)}</span>
            </div>
            <div className={styles['life-insurance-widget__result-item']}>
              <span className={styles['life-insurance-widget__result-label']}>{t('totalPaid', locale)}</span>
              <span className={styles['life-insurance-widget__result-value']}>{result.symbol}{fmtInt(result.total)}</span>
            </div>
          </div>
          <p className={styles['life-insurance-widget__disclaimer']}>{t('disclaimer', locale)}</p>
        </div>
      )}
    </div>
  );
}

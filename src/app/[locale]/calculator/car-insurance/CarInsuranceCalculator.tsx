'use client';

import { useState } from 'react';
import styles from './CarInsuranceCalculator.module.scss';

const COUNTRIES = {
  US: { en: 'USA', ru: 'США', uk: 'США', fr: 'États-Unis', lt: 'JAV', symbol: '$', rate: 0.048 },
  GB: { en: 'United Kingdom', ru: 'Великобритания', uk: 'Великобританія', fr: 'Royaume-Uni', lt: 'Didžioji Britanija', symbol: '£', rate: 0.055 },
  DE: { en: 'Germany', ru: 'Германия', uk: 'Німеччина', fr: 'Allemagne', lt: 'Vokietija', symbol: '€', rate: 0.040 },
  FR: { en: 'France', ru: 'Франция', uk: 'Франція', fr: 'France', lt: 'Prancūzija', symbol: '€', rate: 0.042 },
  PL: { en: 'Poland', ru: 'Польша', uk: 'Польща', fr: 'Pologne', lt: 'Lenkija', symbol: 'zł', rate: 0.038 },
  LT: { en: 'Lithuania', ru: 'Литва', uk: 'Литва', fr: 'Lituanie', lt: 'Lietuva', symbol: '€', rate: 0.039 },
  UA: { en: 'Ukraine', ru: 'Украина', uk: 'Україна', fr: 'Ukraine', lt: 'Ukraina', symbol: '₴', rate: 0.035 },
  RU: { en: 'Russia', ru: 'Россия', uk: 'Росія', fr: 'Russie', lt: 'Rusija', symbol: '₽', rate: 0.045 },
};

const L: Record<string, Record<string, string>> = {
  country:      { en: 'Country', ru: 'Страна', uk: 'Країна', fr: 'Pays', lt: 'Šalis' },
  vehicleValue: { en: 'Vehicle Value', ru: 'Стоимость автомобиля', uk: 'Вартість автомобіля', fr: 'Valeur du véhicule', lt: 'Automobilio vertė' },
  vehicleAge:   { en: 'Vehicle Age (years)', ru: 'Возраст авто (лет)', uk: 'Вік авто (років)', fr: 'Âge du véhicule (ans)', lt: 'Automobilio amžius (metai)' },
  driverAge:    { en: 'Driver Age', ru: 'Возраст водителя', uk: 'Вік водія', fr: 'Âge du conducteur', lt: 'Vairuotojo amžius' },
  experience:   { en: 'Driving Experience (years)', ru: 'Стаж вождения (лет)', uk: 'Стаж водіння (років)', fr: 'Expérience (ans)', lt: 'Patirtis (metai)' },
  accidents:    { en: 'Accidents in Last 3 Years', ru: 'ДТП за 3 года', uk: 'ДТП за 3 роки', fr: 'Accidents (3 ans)', lt: 'Avarijos (3 metai)' },
  coverage:     { en: 'Coverage Type', ru: 'Тип страховки', uk: 'Тип страховки', fr: 'Type de couverture', lt: 'Draudimo tipas' },
  liability:    { en: 'Liability only (MTPL)', ru: 'ОСАГО (гражданская)', uk: 'ОСЦПВ (цивільна)', fr: 'Responsabilité civile', lt: 'Civilinė atsakomybė' },
  comprehensive:{ en: 'Comprehensive (CASCO)', ru: 'КАСКО (полное)', uk: 'КАСКО (повне)', fr: 'Tous risques (CASCO)', lt: 'Visapusis (KASKO)' },
  none:         { en: 'None', ru: 'Нет', uk: 'Немає', fr: 'Aucun', lt: 'Nėra' },
  one:          { en: '1 accident', ru: '1 ДТП', uk: '1 ДТП', fr: '1 accident', lt: '1 avarija' },
  twoPlus:      { en: '2 or more', ru: '2 и более', uk: '2 і більше', fr: '2 ou plus', lt: '2 ar daugiau' },
  calculate:    { en: 'Calculate', ru: 'Рассчитать', uk: 'Розрахувати', fr: 'Calculer', lt: 'Skaičiuoti' },
  annualPremium:{ en: 'Annual Premium', ru: 'Годовая страховка', uk: 'Річна страховка', fr: 'Prime annuelle', lt: 'Metinė įmoka' },
  monthly:      { en: 'Monthly Payment', ru: 'Ежемесячный платёж', uk: 'Щомісячний платіж', fr: 'Paiement mensuel', lt: 'Mėnesinė įmoka' },
  range:        { en: 'Estimate Range', ru: 'Диапазон оценки', uk: 'Діапазон оцінки', fr: 'Fourchette estimée', lt: 'Įvertinimo diapazonas' },
  disclaimer:   {
    en: 'Approximate estimate based on typical market rates. Actual premiums depend on the specific insurer.',
    ru: 'Приблизительная оценка на основе рыночных ставок. Реальная стоимость зависит от страховщика.',
    uk: 'Приблизна оцінка на основі ринкових ставок. Реальна вартість залежить від страховика.',
    fr: 'Estimation approximative. Les primes réelles dépendent de l\'assureur.',
    lt: 'Apytikslis įvertinimas. Tikrosios įmokos priklauso nuo draudiko.',
  },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

type Result = { annual: number; monthly: number; min: number; max: number; symbol: string };

export default function CarInsuranceCalculator({ locale }: { locale: string }) {
  const [country, setCountry] = useState('US');
  const [vehicleValue, setVehicleValue] = useState('25000');
  const [vehicleAge, setVehicleAge] = useState('3');
  const [driverAge, setDriverAge] = useState('30');
  const [experience, setExperience] = useState('5');
  const [accidents, setAccidents] = useState('0');
  const [coverage, setCoverage] = useState('comprehensive');
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const value = parseFloat(vehicleValue);
    if (!value || value <= 0) return;

    const c = COUNTRIES[country as keyof typeof COUNTRIES];
    let premium = value * c.rate;

    if (coverage === 'liability') premium *= 0.28;

    const vAge = parseInt(vehicleAge) || 0;
    if (vAge <= 2) premium *= 1.2;
    else if (vAge <= 5) premium *= 1.0;
    else if (vAge <= 10) premium *= 0.85;
    else premium *= 0.70;

    const dAge = parseInt(driverAge) || 30;
    if (dAge < 25) premium *= 1.5;
    else if (dAge <= 35) premium *= 1.0;
    else if (dAge <= 55) premium *= 0.88;
    else premium *= 1.1;

    const exp = parseInt(experience) || 0;
    if (exp <= 1) premium *= 1.4;
    else if (exp <= 3) premium *= 1.2;
    else if (exp <= 10) premium *= 1.0;
    else premium *= 0.95;

    const acc = parseInt(accidents);
    if (acc === 1) premium *= 1.35;
    else if (acc >= 2) premium *= 1.7;

    setResult({
      annual: Math.round(premium),
      monthly: Math.round(premium / 12),
      min: Math.round(premium * 0.85),
      max: Math.round(premium * 1.15),
      symbol: c.symbol,
    });
  }

  const fmt = (n: number) => n.toLocaleString('en-US');
  const c = COUNTRIES[country as keyof typeof COUNTRIES];

  return (
    <div className={styles['car-insurance-widget']}>
      <div className={styles['car-insurance-widget__form']}>
        <div className={styles['car-insurance-widget__row']}>
          <div className={styles['car-insurance-widget__field']}>
            <label className={styles['car-insurance-widget__label']}>{t('country', locale)}</label>
            <select className={styles['car-insurance-widget__select']} value={country} onChange={e => setCountry(e.target.value)}>
              {Object.entries(COUNTRIES).map(([code, data]) => (
                <option key={code} value={code}>{data[locale as 'en'|'ru'|'uk'|'fr'|'lt'] || data.en}</option>
              ))}
            </select>
          </div>
          <div className={styles['car-insurance-widget__field']}>
            <label className={styles['car-insurance-widget__label']}>{t('vehicleValue', locale)} ({c.symbol})</label>
            <input
              type="number"
              className={styles['car-insurance-widget__input']}
              value={vehicleValue}
              onChange={e => setVehicleValue(e.target.value)}
              min="500"
              step="500"
            />
          </div>
        </div>

        <div className={styles['car-insurance-widget__row']}>
          <div className={styles['car-insurance-widget__field']}>
            <label className={styles['car-insurance-widget__label']}>{t('vehicleAge', locale)}</label>
            <input
              type="number"
              className={styles['car-insurance-widget__input']}
              value={vehicleAge}
              onChange={e => setVehicleAge(e.target.value)}
              min="0" max="30"
            />
          </div>
          <div className={styles['car-insurance-widget__field']}>
            <label className={styles['car-insurance-widget__label']}>{t('coverage', locale)}</label>
            <select className={styles['car-insurance-widget__select']} value={coverage} onChange={e => setCoverage(e.target.value)}>
              <option value="liability">{t('liability', locale)}</option>
              <option value="comprehensive">{t('comprehensive', locale)}</option>
            </select>
          </div>
        </div>

        <div className={styles['car-insurance-widget__row']}>
          <div className={styles['car-insurance-widget__field']}>
            <label className={styles['car-insurance-widget__label']}>{t('driverAge', locale)}</label>
            <input
              type="number"
              className={styles['car-insurance-widget__input']}
              value={driverAge}
              onChange={e => setDriverAge(e.target.value)}
              min="18" max="80"
            />
          </div>
          <div className={styles['car-insurance-widget__field']}>
            <label className={styles['car-insurance-widget__label']}>{t('experience', locale)}</label>
            <input
              type="number"
              className={styles['car-insurance-widget__input']}
              value={experience}
              onChange={e => setExperience(e.target.value)}
              min="0" max="60"
            />
          </div>
        </div>

        <div className={styles['car-insurance-widget__field']}>
          <label className={styles['car-insurance-widget__label']}>{t('accidents', locale)}</label>
          <select className={styles['car-insurance-widget__select']} value={accidents} onChange={e => setAccidents(e.target.value)}>
            <option value="0">{t('none', locale)}</option>
            <option value="1">{t('one', locale)}</option>
            <option value="2">{t('twoPlus', locale)}</option>
          </select>
        </div>

        <button type="button" className={styles['car-insurance-widget__btn']} onClick={calculate}>
          {t('calculate', locale)}
        </button>
      </div>

      {result && (
        <div className={styles['car-insurance-widget__results']}>
          <div className={styles['car-insurance-widget__result-grid']}>
            <div className={styles['car-insurance-widget__result-item']}>
              <span className={styles['car-insurance-widget__result-label']}>{t('annualPremium', locale)}</span>
              <span className={styles['car-insurance-widget__result-value']}>{result.symbol}{fmt(result.annual)}</span>
            </div>
            <div className={styles['car-insurance-widget__result-item']}>
              <span className={styles['car-insurance-widget__result-label']}>{t('monthly', locale)}</span>
              <span className={styles['car-insurance-widget__result-value']}>{result.symbol}{fmt(result.monthly)}</span>
            </div>
            <div className={styles['car-insurance-widget__result-item']}>
              <span className={styles['car-insurance-widget__result-label']}>{t('range', locale)}</span>
              <span className={styles['car-insurance-widget__result-value']}>{result.symbol}{fmt(result.min)} – {result.symbol}{fmt(result.max)}</span>
            </div>
          </div>
          <p className={styles['car-insurance-widget__disclaimer']}>{t('disclaimer', locale)}</p>
        </div>
      )}
    </div>
  );
}

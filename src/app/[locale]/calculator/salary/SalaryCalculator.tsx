'use client';

import { useState, useCallback } from 'react';
import styles from './SalaryCalculator.module.scss';

type Props = { locale: string };
type Period = 'monthly' | 'annual';
type LK = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LK, {
  country: string;
  period: string;
  monthly: string;
  annual: string;
  grossSalary: string;
  calculate: string;
  netMonthly: string;
  netAnnual: string;
  grossAnnual: string;
  grossMonthly: string;
  breakdown: string;
  total: string;
  effectiveRate: string;
  disclaimer: string;
  errorEmpty: string;
  errorInvalid: string;
}> = {
  en: {
    country: 'Country',
    period: 'Salary period',
    monthly: 'Monthly',
    annual: 'Annual',
    grossSalary: 'Gross salary',
    calculate: 'Calculate Net Salary',
    netMonthly: 'Net per month',
    netAnnual: 'Net per year',
    grossAnnual: 'Gross (annual)',
    grossMonthly: 'Gross (monthly)',
    breakdown: 'Deductions breakdown',
    total: 'Total deductions',
    effectiveRate: 'Effective deduction rate',
    disclaimer: '* Approximate calculation for a single employee with no special deductions. Regional/state taxes not included.',
    errorEmpty: 'Please enter your gross salary.',
    errorInvalid: 'Please enter a valid positive number.',
  },
  ru: {
    country: 'Страна',
    period: 'Период зарплаты',
    monthly: 'В месяц',
    annual: 'В год',
    grossSalary: 'Зарплата брутто',
    calculate: 'Рассчитать нетто',
    netMonthly: 'Нетто в месяц',
    netAnnual: 'Нетто в год',
    grossAnnual: 'Брутто (в год)',
    grossMonthly: 'Брутто (в месяц)',
    breakdown: 'Расшифровка вычетов',
    total: 'Итого вычеты',
    effectiveRate: 'Эффективная ставка вычетов',
    disclaimer: '* Приблизительный расчёт для работника без спецвычетов. Местные/региональные налоги не учитываются.',
    errorEmpty: 'Введите зарплату брутто.',
    errorInvalid: 'Введите корректное положительное число.',
  },
  uk: {
    country: 'Країна',
    period: 'Період зарплати',
    monthly: 'На місяць',
    annual: 'На рік',
    grossSalary: 'Зарплата брутто',
    calculate: 'Розрахувати нетто',
    netMonthly: 'Нетто на місяць',
    netAnnual: 'Нетто на рік',
    grossAnnual: 'Брутто (на рік)',
    grossMonthly: 'Брутто (на місяць)',
    breakdown: 'Розшифровка вирахувань',
    total: 'Всього вирахувань',
    effectiveRate: 'Ефективна ставка вирахувань',
    disclaimer: '* Приблизний розрахунок для найманого працівника без спецвирахувань. Місцеві/регіональні податки не враховуються.',
    errorEmpty: 'Введіть зарплату брутто.',
    errorInvalid: 'Введіть коректне додатне число.',
  },
  fr: {
    country: 'Pays',
    period: 'Période de salaire',
    monthly: 'Mensuel',
    annual: 'Annuel',
    grossSalary: 'Salaire brut',
    calculate: 'Calculer le salaire net',
    netMonthly: 'Net par mois',
    netAnnual: 'Net par an',
    grossAnnual: 'Brut (annuel)',
    grossMonthly: 'Brut (mensuel)',
    breakdown: 'Détail des prélèvements',
    total: 'Total des prélèvements',
    effectiveRate: 'Taux effectif de prélèvement',
    disclaimer: '* Calcul approximatif pour un salarié sans déductions particulières. Taxes locales/régionales non incluses.',
    errorEmpty: 'Veuillez saisir votre salaire brut.',
    errorInvalid: 'Veuillez saisir un nombre positif valide.',
  },
  lt: {
    country: 'Šalis',
    period: 'Atlyginimo laikotarpis',
    monthly: 'Mėnesinis',
    annual: 'Metinis',
    grossSalary: 'Bruto atlyginimas',
    calculate: 'Apskaičiuoti neto',
    netMonthly: 'Neto per mėnesį',
    netAnnual: 'Neto per metus',
    grossAnnual: 'Bruto (metinis)',
    grossMonthly: 'Bruto (mėnesinis)',
    breakdown: 'Išskaitymų sąrašas',
    total: 'Viso išskaitymų',
    effectiveRate: 'Efektyvus išskaitymų tarifas',
    disclaimer: '* Apytikslis skaičiavimas darbuotojui be specialių atskaitymų. Vietiniai/regioniniai mokesčiai neįtraukti.',
    errorEmpty: 'Įveskite savo bruto atlyginimą.',
    errorInvalid: 'Įveskite teigiamą skaičių.',
  },
};

const COUNTRY_NAMES: Record<string, Record<LK, string>> = {
  ua: { en: 'Ukraine', ru: 'Украина', uk: 'Україна', fr: 'Ukraine', lt: 'Ukraina' },
  ru: { en: 'Russia', ru: 'Россия', uk: 'Росія', fr: 'Russie', lt: 'Rusija' },
  by: { en: 'Belarus', ru: 'Беларусь', uk: 'Білорусь', fr: 'Biélorussie', lt: 'Baltarusija' },
  kz: { en: 'Kazakhstan', ru: 'Казахстан', uk: 'Казахстан', fr: 'Kazakhstan', lt: 'Kazachstanas' },
  az: { en: 'Azerbaijan', ru: 'Азербайджан', uk: 'Азербайджан', fr: 'Azerbaïdjan', lt: 'Azerbaidžanas' },
  ge: { en: 'Georgia', ru: 'Грузия', uk: 'Грузія', fr: 'Géorgie', lt: 'Gruzija' },
  am: { en: 'Armenia', ru: 'Армения', uk: 'Вірменія', fr: 'Arménie', lt: 'Armėnija' },
  md: { en: 'Moldova', ru: 'Молдова', uk: 'Молдова', fr: 'Moldavie', lt: 'Moldova' },
  uz: { en: 'Uzbekistan', ru: 'Узбекистан', uk: 'Узбекистан', fr: 'Ouzbékistan', lt: 'Uzbekistanas' },
  kg: { en: 'Kyrgyzstan', ru: 'Кыргызстан', uk: 'Киргизстан', fr: 'Kirghizistan', lt: 'Kirgizija' },
  de: { en: 'Germany', ru: 'Германия', uk: 'Німеччина', fr: 'Allemagne', lt: 'Vokietija' },
  fr: { en: 'France', ru: 'Франция', uk: 'Франція', fr: 'France', lt: 'Prancūzija' },
  be: { en: 'Belgium', ru: 'Бельгия', uk: 'Бельгія', fr: 'Belgique', lt: 'Belgija' },
  ch: { en: 'Switzerland (Zurich)', ru: 'Швейцария (Цюрих)', uk: 'Швейцарія (Цюрих)', fr: 'Suisse (Zurich)', lt: 'Šveicarija (Ciurichas)' },
  nl: { en: 'Netherlands', ru: 'Нидерланды', uk: 'Нідерланди', fr: 'Pays-Bas', lt: 'Nyderlandai' },
  pl: { en: 'Poland', ru: 'Польша', uk: 'Польща', fr: 'Pologne', lt: 'Lenkija' },
  cz: { en: 'Czech Republic', ru: 'Чехия', uk: 'Чехія', fr: 'Tchéquie', lt: 'Čekija' },
  lt: { en: 'Lithuania', ru: 'Литва', uk: 'Литва', fr: 'Lituanie', lt: 'Lietuva' },
  gb: { en: 'United Kingdom', ru: 'Великобритания', uk: 'Велика Британія', fr: 'Royaume-Uni', lt: 'Jungtinė Karalystė' },
  us: { en: 'USA', ru: 'США', uk: 'США', fr: 'États-Unis', lt: 'JAV' },
  ca: { en: 'Canada (Ontario)', ru: 'Канада (Онтарио)', uk: 'Канада (Онтаріо)', fr: 'Canada (Ontario)', lt: 'Kanada (Ontarijas)' },
  au: { en: 'Australia', ru: 'Австралия', uk: 'Австралія', fr: 'Australie', lt: 'Australija' },
  ie: { en: 'Ireland', ru: 'Ирландия', uk: 'Ірландія', fr: 'Irlande', lt: 'Airija' },
  nz: { en: 'New Zealand', ru: 'Новая Зеландия', uk: 'Нова Зеландія', fr: 'Nouvelle-Zélande', lt: 'Naujoji Zelandija' },
};

type CountryMeta = { code: string; flag: string; currency: string; fmtLocale: string };

const COUNTRIES: CountryMeta[] = [
  { code: 'ua', flag: '🇺🇦', currency: 'UAH', fmtLocale: 'uk-UA' },
  { code: 'ru', flag: '🇷🇺', currency: 'RUB', fmtLocale: 'ru-RU' },
  { code: 'by', flag: '🇧🇾', currency: 'BYN', fmtLocale: 'ru-BY' },
  { code: 'kz', flag: '🇰🇿', currency: 'KZT', fmtLocale: 'ru-KZ' },
  { code: 'az', flag: '🇦🇿', currency: 'AZN', fmtLocale: 'az-AZ' },
  { code: 'ge', flag: '🇬🇪', currency: 'GEL', fmtLocale: 'ka-GE' },
  { code: 'am', flag: '🇦🇲', currency: 'AMD', fmtLocale: 'hy-AM' },
  { code: 'md', flag: '🇲🇩', currency: 'MDL', fmtLocale: 'ro-MD' },
  { code: 'uz', flag: '🇺🇿', currency: 'UZS', fmtLocale: 'uz-UZ' },
  { code: 'kg', flag: '🇰🇬', currency: 'KGS', fmtLocale: 'ru-KG' },
  { code: 'de', flag: '🇩🇪', currency: 'EUR', fmtLocale: 'de-DE' },
  { code: 'fr', flag: '🇫🇷', currency: 'EUR', fmtLocale: 'fr-FR' },
  { code: 'be', flag: '🇧🇪', currency: 'EUR', fmtLocale: 'fr-BE' },
  { code: 'ch', flag: '🇨🇭', currency: 'CHF', fmtLocale: 'de-CH' },
  { code: 'nl', flag: '🇳🇱', currency: 'EUR', fmtLocale: 'nl-NL' },
  { code: 'pl', flag: '🇵🇱', currency: 'PLN', fmtLocale: 'pl-PL' },
  { code: 'cz', flag: '🇨🇿', currency: 'CZK', fmtLocale: 'cs-CZ' },
  { code: 'lt', flag: '🇱🇹', currency: 'EUR', fmtLocale: 'lt-LT' },
  { code: 'gb', flag: '🇬🇧', currency: 'GBP', fmtLocale: 'en-GB' },
  { code: 'us', flag: '🇺🇸', currency: 'USD', fmtLocale: 'en-US' },
  { code: 'ca', flag: '🇨🇦', currency: 'CAD', fmtLocale: 'en-CA' },
  { code: 'au', flag: '🇦🇺', currency: 'AUD', fmtLocale: 'en-AU' },
  { code: 'ie', flag: '🇮🇪', currency: 'EUR', fmtLocale: 'en-IE' },
  { code: 'nz', flag: '🇳🇿', currency: 'NZD', fmtLocale: 'en-NZ' },
];

interface BreakdownItem {
  label: string;
  amount: number;
  isCredit?: boolean;
}

interface CalcResult {
  grossAnnual: number;
  totalDeductions: number;
  netAnnual: number;
  breakdown: BreakdownItem[];
}

// ── Tax calculation functions ─────────────────────────────────────────────────

function calcUkraine(gross: number): CalcResult {
  const pdfo = gross * 0.18;
  const military = gross * 0.05;
  const total = pdfo + military;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'ПДФО (18%)', amount: pdfo },
      { label: 'Військовий збір (5%)', amount: military },
    ],
  };
}

function calcRussia(gross: number): CalcResult {
  const THRESHOLD = 5_000_000;
  const tax = gross <= THRESHOLD
    ? gross * 0.13
    : THRESHOLD * 0.13 + (gross - THRESHOLD) * 0.15;
  return {
    grossAnnual: gross,
    totalDeductions: tax,
    netAnnual: gross - tax,
    breakdown: [{ label: 'НДФЛ (13% / 15%)', amount: tax }],
  };
}

function calcBelarus(gross: number): CalcResult {
  const pension = gross * 0.01;
  const incomeTax = gross * 0.13;
  const total = pension + incomeTax;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Подоходный налог (13%)', amount: incomeTax },
      { label: 'Пенс. взнос (1%)', amount: pension },
    ],
  };
}

function calcKazakhstan(gross: number): CalcResult {
  const opv = gross * 0.10;
  const osms = gross * 0.02;
  // Standard deduction: 14 × MZP per month × 12 months (MZP 2024 = 85,000 KZT/month)
  const stdDeduction = 14 * 85_000 * 12;
  const iBase = Math.max(0, gross - opv - osms - stdDeduction);
  const ipn = iBase * 0.10;
  const total = opv + osms + ipn;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      ...(ipn > 0 ? [{ label: 'ИПН (10%)', amount: ipn }] : []),
      { label: 'ОПВ — пенсия (10%)', amount: opv },
      { label: 'ОСМС — медстрах (2%)', amount: osms },
    ],
  };
}

function calcAzerbaijan(gross: number): CalcResult {
  const THRESHOLD = 30_000; // 2,500 AZN/month × 12
  const pit = gross <= THRESHOLD
    ? gross * 0.14
    : THRESHOLD * 0.14 + (gross - THRESHOLD) * 0.25;
  const ssc = gross * 0.03;
  const total = pit + ssc;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Gəlir vergisi (14%/25%)', amount: pit },
      { label: 'DSMF — sosial sığorta (3%)', amount: ssc },
    ],
  };
}

function calcGeorgia(gross: number): CalcResult {
  const pit = gross * 0.20;
  const pension = gross * 0.02;
  const total = pit + pension;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'საშემოსავლო გადასახადი (20%)', amount: pit },
      { label: 'საპენსიო (2%)', amount: pension },
    ],
  };
}

function calcArmenia(gross: number): CalcResult {
  // Mandatory pension: 5% up to 6,000,000 AMD/year, 10% above
  const PENSION_CAP = 6_000_000;
  const pension = gross <= PENSION_CAP
    ? gross * 0.05
    : PENSION_CAP * 0.05 + (gross - PENSION_CAP) * 0.10;

  // Income tax on (gross - pension): 0% ≤1,800,000, 20% up to 24,000,000, 22% above
  const pitBase = Math.max(0, gross - pension);
  let pit = 0;
  if (pitBase > 24_000_000) {
    pit = (24_000_000 - 1_800_000) * 0.20 + (pitBase - 24_000_000) * 0.22;
  } else if (pitBase > 1_800_000) {
    pit = (pitBase - 1_800_000) * 0.20;
  }

  const total = pit + pension;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Եկամտային հարկ (20%/22%)', amount: pit },
      { label: 'Կուտ. կենս. — pension (5%/10%)', amount: pension },
    ],
  };
}

function calcMoldova(gross: number): CalcResult {
  const cas = gross * 0.09;
  const cnam = gross * 0.045;
  const pit = gross * 0.12;
  const total = pit + cas + cnam;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Impozit pe venit (12%)', amount: pit },
      { label: 'CAS — asigurări sociale (9%)', amount: cas },
      { label: 'CNAM — asigurări medicale (4.5%)', amount: cnam },
    ],
  };
}

function calcUzbekistan(gross: number): CalcResult {
  const inps = gross * 0.001;
  const pit = gross * 0.12;
  const total = pit + inps;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'JSHDS — daromad solig\'i (12%)', amount: pit },
      { label: 'INPS — pensiya (0.1%)', amount: inps },
    ],
  };
}

function calcKyrgyzstan(gross: number): CalcResult {
  const social = gross * 0.08;
  const pit = gross * 0.10;
  const total = pit + social;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Киреше салыгы (10%)', amount: pit },
      { label: 'Социалдык фонд (8%)', amount: social },
    ],
  };
}

function calcGermany(gross: number): CalcResult {
  const pension = gross * 0.093;
  const health = gross * 0.073;
  const ltCare = gross * 0.017;
  const unemp = gross * 0.013;
  const social = pension + health + ltCare + unemp;

  const zvE = Math.max(0, gross - social);
  let tax = 0;
  if (zvE > 277_825) {
    tax = 0.45 * zvE - 18_936;
  } else if (zvE > 66_760) {
    tax = 0.42 * zvE - 10_602;
  } else if (zvE > 17_005) {
    const z = (zvE - 17_005) / 10_000;
    tax = (192.59 * z + 2_397) * z + 966;
  } else if (zvE > 11_604) {
    const y = (zvE - 11_604) / 10_000;
    tax = (979.18 * y + 1_400) * y;
  }
  tax = Math.round(tax);
  const soli = tax > 18_130 ? Math.round(tax * 0.055) : 0;
  const total = tax + soli + social;

  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Einkommensteuer', amount: tax },
      ...(soli > 0 ? [{ label: 'Solidaritätszuschlag', amount: soli }] : []),
      { label: 'Rentenversicherung (9.3%)', amount: pension },
      { label: 'Krankenversicherung (7.3%)', amount: health },
      { label: 'Pflegeversicherung (1.7%)', amount: ltCare },
      { label: 'Arbeitslosenversicherung (1.3%)', amount: unemp },
    ],
  };
}

function calcFrance(gross: number): CalcResult {
  const social = gross * 0.22;
  const csgDed = gross * 0.9825 * 0.068;
  const abattement = Math.min(13_522, Math.max(448, (gross - csgDed) * 0.10));
  const taxBase = Math.max(0, gross - csgDed - abattement);

  const brackets = [
    { rate: 0, max: 10_777 },
    { rate: 0.11, max: 27_478 },
    { rate: 0.30, max: 78_570 },
    { rate: 0.41, max: 168_994 },
    { rate: 0.45, max: Infinity },
  ];

  let incomeTax = 0;
  let prev = 0;
  for (const b of brackets) {
    if (taxBase > prev) incomeTax += (Math.min(taxBase, b.max) - prev) * b.rate;
    prev = b.max;
  }

  const total = incomeTax + social;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Impôt sur le revenu', amount: incomeTax },
      { label: 'Cotisations salariales (~22%)', amount: social },
    ],
  };
}

function calcBelgium(gross: number): CalcResult {
  const onss = gross * 0.1307;
  const taxable = Math.max(0, gross - onss);
  const TAX_FREE = 10_570;
  const itBase = Math.max(0, taxable - TAX_FREE);

  const brackets = [
    { rate: 0.25, max: 15_820 },
    { rate: 0.40, max: 27_920 },
    { rate: 0.45, max: 48_320 },
    { rate: 0.50, max: Infinity },
  ];
  let it = 0;
  let prev = 0;
  for (const b of brackets) {
    if (itBase > prev) it += (Math.min(itBase, b.max) - prev) * b.rate;
    prev = b.max;
  }
  const municipal = it * 0.07;
  const total = onss + it + municipal;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'IPP / PB (25–50%) + taxe communale', amount: it + municipal },
      { label: 'ONSS / RSZ (13.07%)', amount: onss },
    ],
  };
}

function calcSwitzerland(gross: number): CalcResult {
  const ahv = gross * 0.053;
  const alv = Math.min(gross, 148_200) * 0.011;
  const bvg = gross * 0.07;
  const social = ahv + alv + bvg;

  // Combined federal + Zurich cantonal + municipal income tax (single taxpayer, approximate)
  const taxBase = Math.max(0, gross - ahv - alv);
  let it = 0;
  if (taxBase <= 31_600) {
    it = taxBase * 0.05;
  } else if (taxBase <= 78_100) {
    it = 31_600 * 0.05 + (taxBase - 31_600) * 0.18;
  } else if (taxBase <= 176_000) {
    it = 31_600 * 0.05 + (78_100 - 31_600) * 0.18 + (taxBase - 78_100) * 0.26;
  } else {
    it = 31_600 * 0.05 + (78_100 - 31_600) * 0.18 + (176_000 - 78_100) * 0.26 + (taxBase - 176_000) * 0.34;
  }

  const total = it + social;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Einkommensteuer (Bund + Zürich)', amount: it },
      { label: 'AHV/IV/EO (5.3%)', amount: ahv },
      { label: 'ALV — Arbeitslosenvers. (1.1%)', amount: alv },
      { label: 'BVG Pensionskasse (~7%)', amount: bvg },
    ],
  };
}

function calcNetherlands(gross: number): CalcResult {
  const B2 = 75_518;
  const grossTax = gross <= B2
    ? gross * 0.3697
    : B2 * 0.3697 + (gross - B2) * 0.495;

  let heffingskorting = 0;
  if (gross <= 22_660) heffingskorting = 3_362;
  else if (gross <= 73_031) heffingskorting = Math.max(0, 3_362 - (gross - 22_660) * 0.06095);

  let arbeidskorting = 0;
  if (gross >= 11_490 && gross < 24_820) arbeidskorting = Math.min(5_532, (gross - 11_490) * 0.29861);
  else if (gross >= 24_820 && gross <= 37_139) arbeidskorting = 5_532;
  else if (gross > 37_139 && gross < 123_362) arbeidskorting = Math.max(0, 5_532 - (gross - 37_139) * 0.0651);

  const credits = heffingskorting + arbeidskorting;
  const netTax = Math.max(0, grossTax - credits);

  return {
    grossAnnual: gross,
    totalDeductions: netTax,
    netAnnual: gross - netTax,
    breakdown: [
      { label: 'Loonheffing (incl. nationale verzekeringen)', amount: grossTax },
      { label: 'Heffingskortingen', amount: credits, isCredit: true },
    ],
  };
}

function calcPoland(gross: number): CalcResult {
  const zus = gross * (0.0976 + 0.015 + 0.0245);
  const health = (gross - zus) * 0.09;
  const taxBase = Math.max(0, gross - zus - 3_000);

  let incomeTax = 0;
  if (taxBase > 30_000) {
    incomeTax = taxBase <= 120_000
      ? (taxBase - 30_000) * 0.12
      : 90_000 * 0.12 + (taxBase - 120_000) * 0.32;
  }

  const total = incomeTax + zus + health;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Podatek dochodowy (12%/32%)', amount: incomeTax },
      { label: 'ZUS (13.71%)', amount: zus },
      { label: 'Ubezpieczenie zdrowotne (9%)', amount: health },
    ],
  };
}

function calcCzech(gross: number): CalcResult {
  const pension = gross * 0.065;
  const health = gross * 0.045;
  const social = pension + health;
  let incomeTax = gross <= 1_935_552
    ? gross * 0.15
    : 1_935_552 * 0.15 + (gross - 1_935_552) * 0.23;
  incomeTax = Math.max(0, incomeTax - 30_840);

  const total = incomeTax + social;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Daň z příjmu (15%/23%)', amount: incomeTax },
      { label: 'Důchodové pojištění (6.5%)', amount: pension },
      { label: 'Zdravotní pojištění (4.5%)', amount: health },
    ],
  };
}

function calcLithuania(gross: number): CalcResult {
  const social = gross * 0.195;
  const monthlyGross = gross / 12;
  let monthlyNPD: number;
  if (monthlyGross <= 730) {
    monthlyNPD = 625;
  } else if (monthlyGross < 2_117) {
    monthlyNPD = Math.max(0, 625 - 0.42 * (monthlyGross - 730));
  } else {
    monthlyNPD = 0;
  }
  const taxBase = Math.max(0, gross - social - monthlyNPD * 12);
  const incomeTax = taxBase <= 101_094
    ? taxBase * 0.20
    : 101_094 * 0.20 + (taxBase - 101_094) * 0.32;

  const total = incomeTax + social;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'GPM pajamų mokestis (20%/32%)', amount: incomeTax },
      { label: 'Sodra – socialinis draudimas (19.5%)', amount: social },
    ],
  };
}

function calcUK(gross: number): CalcResult {
  let pa = 12_570;
  if (gross > 100_000) pa = Math.max(0, pa - Math.floor((gross - 100_000) / 2));

  const taxable = Math.max(0, gross - pa);
  let incomeTax = 0;
  const band1 = 37_700;
  if (taxable <= band1) {
    incomeTax = taxable * 0.20;
  } else {
    const higher = Math.max(0, Math.min(taxable - band1, 125_140 - pa - band1));
    const additional = Math.max(0, taxable - band1 - higher);
    incomeTax = band1 * 0.20 + higher * 0.40 + additional * 0.45;
  }

  let ni = 0;
  if (gross > 12_570) {
    ni = (Math.min(gross, 50_270) - 12_570) * 0.08;
    if (gross > 50_270) ni += (gross - 50_270) * 0.02;
  }

  const total = incomeTax + ni;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Income Tax', amount: incomeTax },
      { label: 'National Insurance', amount: ni },
    ],
  };
}

function calcUSA(gross: number): CalcResult {
  const taxable = Math.max(0, gross - 14_600);
  const brackets = [
    { rate: 0.10, max: 11_600 },
    { rate: 0.12, max: 47_150 },
    { rate: 0.22, max: 100_525 },
    { rate: 0.24, max: 191_950 },
    { rate: 0.32, max: 243_725 },
    { rate: 0.35, max: 609_350 },
    { rate: 0.37, max: Infinity },
  ];

  let fedTax = 0;
  let prev = 0;
  for (const b of brackets) {
    if (taxable > prev) fedTax += (Math.min(taxable, b.max) - prev) * b.rate;
    prev = b.max;
  }

  const ss = Math.min(gross, 168_600) * 0.062;
  const medicare = gross * 0.0145 + (gross > 200_000 ? (gross - 200_000) * 0.009 : 0);
  const total = fedTax + ss + medicare;

  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Federal Income Tax', amount: fedTax },
      { label: 'Social Security (6.2%)', amount: ss },
      { label: 'Medicare (1.45%)', amount: medicare },
    ],
  };
}

function calcCanada(gross: number): CalcResult {
  const cpp = Math.max(0, Math.min(gross, 68_500) - 3_500) * 0.0595;
  const ei = Math.min(gross, 63_200) * 0.0166;

  const fedBPA = 15_705;
  const fedBase = Math.max(0, gross - fedBPA);
  const fedBrackets = [
    { rate: 0.15, max: 55_867 },
    { rate: 0.205, max: 111_733 },
    { rate: 0.26, max: 154_906 },
    { rate: 0.29, max: 220_000 },
    { rate: 0.33, max: Infinity },
  ];
  let fedTax = 0;
  let prev = 0;
  for (const b of fedBrackets) {
    if (fedBase > prev) fedTax += (Math.min(fedBase, b.max) - prev) * b.rate;
    prev = b.max;
  }

  const ontBPA = 11_865;
  const ontBase = Math.max(0, gross - ontBPA);
  const ontBrackets = [
    { rate: 0.0505, max: 51_446 },
    { rate: 0.0915, max: 102_894 },
    { rate: 0.1116, max: 150_000 },
    { rate: 0.1216, max: 220_000 },
    { rate: 0.1316, max: Infinity },
  ];
  let ontTax = 0;
  prev = 0;
  for (const b of ontBrackets) {
    if (ontBase > prev) ontTax += (Math.min(ontBase, b.max) - prev) * b.rate;
    prev = b.max;
  }

  const total = cpp + ei + fedTax + ontTax;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Federal Income Tax', amount: fedTax },
      { label: 'Ontario Provincial Tax', amount: ontTax },
      { label: 'CPP (5.95%)', amount: cpp },
      { label: 'EI (1.66%)', amount: ei },
    ],
  };
}

function calcAustralia(gross: number): CalcResult {
  // 2024-25 Stage 3 tax cuts
  let it = 0;
  if (gross <= 18_200) {
    it = 0;
  } else if (gross <= 45_000) {
    it = (gross - 18_200) * 0.16;
  } else if (gross <= 135_000) {
    it = (45_000 - 18_200) * 0.16 + (gross - 45_000) * 0.30;
  } else if (gross <= 190_000) {
    it = (45_000 - 18_200) * 0.16 + (135_000 - 45_000) * 0.30 + (gross - 135_000) * 0.37;
  } else {
    it = (45_000 - 18_200) * 0.16 + (135_000 - 45_000) * 0.30 + (190_000 - 135_000) * 0.37 + (gross - 190_000) * 0.45;
  }

  // LITO (Low Income Tax Offset)
  let lito = 0;
  if (gross <= 37_500) lito = 700;
  else if (gross <= 45_000) lito = 700 - (gross - 37_500) * 0.05;
  else if (gross <= 66_667) lito = Math.max(0, 325 - (gross - 45_000) * 0.015);
  it = Math.max(0, it - lito);

  const medicare = gross * 0.02;
  const total = it + medicare;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Income Tax (incl. LITO offset)', amount: it },
      { label: 'Medicare Levy (2%)', amount: medicare },
    ],
  };
}

function calcIreland(gross: number): CalcResult {
  const BAND1 = 42_000;
  const it = gross <= BAND1 ? gross * 0.20 : BAND1 * 0.20 + (gross - BAND1) * 0.40;
  const taxCredits = 3_750;
  const netIT = Math.max(0, it - taxCredits);

  let usc = 0;
  if (gross <= 12_012) {
    usc = gross * 0.005;
  } else if (gross <= 22_920) {
    usc = 12_012 * 0.005 + (gross - 12_012) * 0.02;
  } else if (gross <= 70_044) {
    usc = 12_012 * 0.005 + (22_920 - 12_012) * 0.02 + (gross - 22_920) * 0.04;
  } else {
    usc = 12_012 * 0.005 + (22_920 - 12_012) * 0.02 + (70_044 - 22_920) * 0.04 + (gross - 70_044) * 0.08;
  }

  const prsi = gross * 0.041;
  const total = netIT + usc + prsi;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Income Tax (20%/40%)', amount: netIT },
      { label: 'USC (Universal Social Charge)', amount: usc },
      { label: 'PRSI (4.1%)', amount: prsi },
    ],
  };
}

function calcNewZealand(gross: number): CalcResult {
  let it = 0;
  if (gross <= 14_000) {
    it = gross * 0.105;
  } else if (gross <= 48_000) {
    it = 14_000 * 0.105 + (gross - 14_000) * 0.175;
  } else if (gross <= 70_000) {
    it = 14_000 * 0.105 + (48_000 - 14_000) * 0.175 + (gross - 48_000) * 0.30;
  } else if (gross <= 180_000) {
    it = 14_000 * 0.105 + (48_000 - 14_000) * 0.175 + (70_000 - 48_000) * 0.30 + (gross - 70_000) * 0.33;
  } else {
    it = 14_000 * 0.105 + (48_000 - 14_000) * 0.175 + (70_000 - 48_000) * 0.30 + (180_000 - 70_000) * 0.33 + (gross - 180_000) * 0.39;
  }

  const acc = Math.min(gross, 139_384) * 0.0139;
  const total = it + acc;
  return {
    grossAnnual: gross,
    totalDeductions: total,
    netAnnual: gross - total,
    breakdown: [
      { label: 'Income Tax (10.5%–39%)', amount: it },
      { label: 'ACC Earner Levy (1.39%)', amount: acc },
    ],
  };
}

function calculate(countryCode: string, grossAnnual: number): CalcResult {
  switch (countryCode) {
    case 'ua': return calcUkraine(grossAnnual);
    case 'ru': return calcRussia(grossAnnual);
    case 'by': return calcBelarus(grossAnnual);
    case 'kz': return calcKazakhstan(grossAnnual);
    case 'az': return calcAzerbaijan(grossAnnual);
    case 'ge': return calcGeorgia(grossAnnual);
    case 'am': return calcArmenia(grossAnnual);
    case 'md': return calcMoldova(grossAnnual);
    case 'uz': return calcUzbekistan(grossAnnual);
    case 'kg': return calcKyrgyzstan(grossAnnual);
    case 'de': return calcGermany(grossAnnual);
    case 'fr': return calcFrance(grossAnnual);
    case 'be': return calcBelgium(grossAnnual);
    case 'ch': return calcSwitzerland(grossAnnual);
    case 'nl': return calcNetherlands(grossAnnual);
    case 'pl': return calcPoland(grossAnnual);
    case 'cz': return calcCzech(grossAnnual);
    case 'lt': return calcLithuania(grossAnnual);
    case 'gb': return calcUK(grossAnnual);
    case 'us': return calcUSA(grossAnnual);
    case 'ca': return calcCanada(grossAnnual);
    case 'au': return calcAustralia(grossAnnual);
    case 'ie': return calcIreland(grossAnnual);
    case 'nz': return calcNewZealand(grossAnnual);
    default: return calcUSA(grossAnnual);
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SalaryCalculator({ locale }: Props) {
  const t = T[locale as LK] ?? T.en;
  const l = (locale as LK) in T ? (locale as LK) : 'en';

  const [country, setCountry] = useState('ua');
  const [period, setPeriod] = useState<Period>('monthly');
  const [grossInput, setGrossInput] = useState('');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState('');

  const countryMeta = COUNTRIES.find(c => c.code === country)!;

  const handleCalculate = useCallback(() => {
    const raw = grossInput.replace(',', '.').replace(/\s/g, '');
    if (!raw) { setError(t.errorEmpty); setResult(null); return; }
    const val = parseFloat(raw);
    if (isNaN(val) || val <= 0) { setError(t.errorInvalid); setResult(null); return; }
    setError('');
    setResult(calculate(country, period === 'monthly' ? val * 12 : val));
  }, [grossInput, period, country, t]);

  const fmt = useCallback(
    (amount: number) =>
      new Intl.NumberFormat(countryMeta.fmtLocale, {
        style: 'currency',
        currency: countryMeta.currency,
        maximumFractionDigits: 0,
      }).format(Math.round(amount)),
    [countryMeta],
  );

  return (
    <div className={styles['salary-widget']}>
      <div className={styles['salary-widget__form']}>

        {/* Country + Period */}
        <div className={styles['salary-widget__row']}>
          <div className={styles['salary-widget__field']}>
            <label className={styles['salary-widget__label']}>{t.country}</label>
            <select
              className={styles['salary-widget__select']}
              value={country}
              onChange={e => { setCountry(e.target.value); setResult(null); setError(''); }}
            >
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {COUNTRY_NAMES[c.code][l]}
                </option>
              ))}
            </select>
          </div>

          <div className={styles['salary-widget__field']}>
            <label className={styles['salary-widget__label']}>{t.period}</label>
            <div className={styles['salary-widget__toggle']} role="group" aria-label={t.period}>
              <button
                type="button"
                className={`${styles['salary-widget__toggle-btn']} ${period === 'monthly' ? styles['salary-widget__toggle-btn--active'] : ''}`}
                onClick={() => { setPeriod('monthly'); setResult(null); }}
              >
                {t.monthly}
              </button>
              <button
                type="button"
                className={`${styles['salary-widget__toggle-btn']} ${period === 'annual' ? styles['salary-widget__toggle-btn--active'] : ''}`}
                onClick={() => { setPeriod('annual'); setResult(null); }}
              >
                {t.annual}
              </button>
            </div>
          </div>
        </div>

        {/* Gross salary */}
        <div className={styles['salary-widget__field']}>
          <label className={styles['salary-widget__label']} htmlFor="salary-gross">
            {t.grossSalary} ({period === 'monthly' ? t.monthly : t.annual})
          </label>
          <div className={styles['salary-widget__input-wrap']}>
            <input
              id="salary-gross"
              type="number"
              min="0"
              step="any"
              className={styles['salary-widget__input']}
              value={grossInput}
              onChange={e => setGrossInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCalculate()}
              placeholder={period === 'monthly' ? '50 000' : '600 000'}
            />
            <span className={styles['salary-widget__suffix']}>{countryMeta.currency}</span>
          </div>
        </div>

        {error && <p className={styles['salary-widget__error']} role="alert">{error}</p>}

        <button type="button" className={styles['salary-widget__btn']} onClick={handleCalculate}>
          {t.calculate}
        </button>
      </div>

      {result && (
        <div className={styles['salary-widget__results']}>

          {/* Net hero */}
          <div className={styles['salary-widget__net']}>
            <div className={styles['salary-widget__net-block']}>
              <span className={styles['salary-widget__net-label']}>{t.netMonthly}</span>
              <span className={styles['salary-widget__net-value']}>{fmt(result.netAnnual / 12)}</span>
            </div>
            <div className={styles['salary-widget__net-block']}>
              <span className={styles['salary-widget__net-label']}>{t.netAnnual}</span>
              <span className={styles['salary-widget__net-value']}>{fmt(result.netAnnual)}</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className={styles['salary-widget__breakdown']}>
            <p className={styles['salary-widget__breakdown-title']}>{t.breakdown}</p>

            <div className={`${styles['salary-widget__breakdown-row']} ${styles['salary-widget__breakdown-row--gross']}`}>
              <span>{t.grossAnnual}</span>
              <span>{fmt(result.grossAnnual)}</span>
            </div>

            {result.breakdown.map((item, i) => (
              <div
                key={i}
                className={`${styles['salary-widget__breakdown-row']} ${item.isCredit ? styles['salary-widget__breakdown-row--credit'] : styles['salary-widget__breakdown-row--deduction']}`}
              >
                <span>{item.label}</span>
                <span>{item.isCredit ? `+ ${fmt(item.amount)}` : `− ${fmt(item.amount)}`}</span>
              </div>
            ))}

            <div className={`${styles['salary-widget__breakdown-row']} ${styles['salary-widget__breakdown-row--total']}`}>
              <span>{t.total}</span>
              <span>{fmt(result.totalDeductions)}</span>
            </div>

            <div className={`${styles['salary-widget__breakdown-row']} ${styles['salary-widget__breakdown-row--net']}`}>
              <span>{t.netAnnual}</span>
              <span>{fmt(result.netAnnual)}</span>
            </div>
          </div>

          {/* Effective rate */}
          <div className={styles['salary-widget__rate']}>
            <span>{t.effectiveRate}</span>
            <strong>
              {result.grossAnnual > 0
                ? (result.totalDeductions / result.grossAnnual * 100).toFixed(1) + '%'
                : '0%'}
            </strong>
          </div>

          <p className={styles['salary-widget__disclaimer']}>{t.disclaimer}</p>
        </div>
      )}
    </div>
  );
}

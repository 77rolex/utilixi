'use client';

import { useState, useEffect } from 'react';
import styles from './UnitConverter.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  categories: Record<string, string>;
  from: string; to: string; swap: string; result: string; enterValue: string;
}> = {
  en: {
    categories: { length: 'Length', weight: 'Weight', temperature: 'Temperature', volume: 'Volume', area: 'Area', speed: 'Speed', digital: 'Digital' },
    from: 'From', to: 'To', swap: 'Swap', result: 'Result', enterValue: 'Enter value',
  },
  ru: {
    categories: { length: 'Длина', weight: 'Масса', temperature: 'Температура', volume: 'Объём', area: 'Площадь', speed: 'Скорость', digital: 'Данные' },
    from: 'Из', to: 'В', swap: 'Поменять', result: 'Результат', enterValue: 'Введите значение',
  },
  uk: {
    categories: { length: 'Довжина', weight: 'Маса', temperature: 'Температура', volume: 'Об\'єм', area: 'Площа', speed: 'Швидкість', digital: 'Дані' },
    from: 'З', to: 'В', swap: 'Поміняти', result: 'Результат', enterValue: 'Введіть значення',
  },
  fr: {
    categories: { length: 'Longueur', weight: 'Masse', temperature: 'Température', volume: 'Volume', area: 'Surface', speed: 'Vitesse', digital: 'Données' },
    from: 'De', to: 'En', swap: 'Inverser', result: 'Résultat', enterValue: 'Entrer une valeur',
  },
  lt: {
    categories: { length: 'Ilgis', weight: 'Masė', temperature: 'Temperatūra', volume: 'Tūris', area: 'Plotas', speed: 'Greitis', digital: 'Duomenys' },
    from: 'Iš', to: 'Į', swap: 'Sukeisti', result: 'Rezultatas', enterValue: 'Įveskite reikšmę',
  },
};

const UNIT_LABELS: Record<LangKey, Record<string, string>> = {
  en: {
    mm: 'Millimeter (mm)', cm: 'Centimeter (cm)', m: 'Meter (m)', km: 'Kilometer (km)',
    in: 'Inch (in)', ft: 'Foot (ft)', yd: 'Yard (yd)', mi: 'Mile (mi)', nmi: 'Nautical mile (nmi)',
    mg: 'Milligram (mg)', g: 'Gram (g)', kg: 'Kilogram (kg)', t: 'Tonne (t)',
    oz: 'Ounce (oz)', lb: 'Pound (lb)', st: 'Stone (st)',
    C: 'Celsius (°C)', F: 'Fahrenheit (°F)', K: 'Kelvin (K)',
    ml: 'Milliliter (ml)', cl: 'Centiliter (cl)', l: 'Liter (l)', m3: 'Cubic meter (m³)',
    floz: 'Fl. ounce (fl oz)', cup: 'Cup', pt: 'Pint (pt)', qt: 'Quart (qt)', gal: 'Gallon (gal)',
    mm2: 'mm²', cm2: 'cm²', m2: 'm²', km2: 'km²', in2: 'in²', ft2: 'ft²', ac: 'Acre (ac)', ha: 'Hectare (ha)',
    kmh: 'km/h', ms: 'm/s', mph: 'mph', kn: 'Knot (kn)', fts: 'ft/s',
    bit: 'Bit', B: 'Byte (B)', KB: 'Kilobyte (KB)', MB: 'Megabyte (MB)', GB: 'Gigabyte (GB)', TB: 'Terabyte (TB)',
    Kib: 'Kibibyte (KiB)', Mib: 'Mebibyte (MiB)', Gib: 'Gibibyte (GiB)',
  },
  ru: {
    mm: 'Миллиметр (мм)', cm: 'Сантиметр (см)', m: 'Метр (м)', km: 'Километр (км)',
    in: 'Дюйм', ft: 'Фут', yd: 'Ярд', mi: 'Миля', nmi: 'Морская миля',
    mg: 'Миллиграмм (мг)', g: 'Грамм (г)', kg: 'Килограмм (кг)', t: 'Тонна (т)',
    oz: 'Унция (унц)', lb: 'Фунт', st: 'Стоун',
    C: 'Цельсий (°C)', F: 'Фаренгейт (°F)', K: 'Кельвин (K)',
    ml: 'Миллилитр (мл)', cl: 'Сантилитр (сл)', l: 'Литр (л)', m3: 'Кубометр (м³)',
    floz: 'Жидкая унция', cup: 'Стакан', pt: 'Пинта', qt: 'Кварта', gal: 'Галлон',
    mm2: 'мм²', cm2: 'см²', m2: 'м²', km2: 'км²', in2: 'кв. дюйм', ft2: 'кв. фут', ac: 'Акр', ha: 'Гектар (га)',
    kmh: 'км/ч', ms: 'м/с', mph: 'миль/ч', kn: 'Узел', fts: 'фут/с',
    bit: 'Бит', B: 'Байт', KB: 'Килобайт (КБ)', MB: 'Мегабайт (МБ)', GB: 'Гигабайт (ГБ)', TB: 'Терабайт (ТБ)',
    Kib: 'Кибибайт (KiB)', Mib: 'Мебибайт (MiB)', Gib: 'Гибибайт (GiB)',
  },
  uk: {
    mm: 'Міліметр (мм)', cm: 'Сантиметр (см)', m: 'Метр (м)', km: 'Кілометр (км)',
    in: 'Дюйм', ft: 'Фут', yd: 'Ярд', mi: 'Миля', nmi: 'Морська миля',
    mg: 'Міліграм (мг)', g: 'Грам (г)', kg: 'Кілограм (кг)', t: 'Тонна (т)',
    oz: 'Унція (унц)', lb: 'Фунт', st: 'Стоун',
    C: 'Цельсій (°C)', F: 'Фаренгейт (°F)', K: 'Кельвін (K)',
    ml: 'Мілілітр (мл)', cl: 'Сантилітр (сл)', l: 'Літр (л)', m3: 'Кубометр (м³)',
    floz: 'Рідка унція', cup: 'Склянка', pt: 'Пінта', qt: 'Кварта', gal: 'Галон',
    mm2: 'мм²', cm2: 'см²', m2: 'м²', km2: 'км²', in2: 'кв. дюйм', ft2: 'кв. фут', ac: 'Акр', ha: 'Гектар (га)',
    kmh: 'км/год', ms: 'м/с', mph: 'миль/год', kn: 'Вузол', fts: 'фут/с',
    bit: 'Біт', B: 'Байт', KB: 'Кілобайт (КБ)', MB: 'Мегабайт (МБ)', GB: 'Гігабайт (ГБ)', TB: 'Терабайт (ТБ)',
    Kib: 'Кібібайт (KiB)', Mib: 'Мебібайт (MiB)', Gib: 'Гібібайт (GiB)',
  },
  fr: {
    mm: 'Millimètre (mm)', cm: 'Centimètre (cm)', m: 'Mètre (m)', km: 'Kilomètre (km)',
    in: 'Pouce (in)', ft: 'Pied (ft)', yd: 'Yard (yd)', mi: 'Mile (mi)', nmi: 'Mille nautique',
    mg: 'Milligramme (mg)', g: 'Gramme (g)', kg: 'Kilogramme (kg)', t: 'Tonne (t)',
    oz: 'Once (oz)', lb: 'Livre (lb)', st: 'Stone (st)',
    C: 'Celsius (°C)', F: 'Fahrenheit (°F)', K: 'Kelvin (K)',
    ml: 'Millilitre (ml)', cl: 'Centilitre (cl)', l: 'Litre (l)', m3: 'Mètre cube (m³)',
    floz: 'Once liquide', cup: 'Tasse', pt: 'Pinte (pt)', qt: 'Quart (qt)', gal: 'Gallon (gal)',
    mm2: 'mm²', cm2: 'cm²', m2: 'm²', km2: 'km²', in2: 'in²', ft2: 'ft²', ac: 'Acre (ac)', ha: 'Hectare (ha)',
    kmh: 'km/h', ms: 'm/s', mph: 'mph', kn: 'Nœud (kn)', fts: 'ft/s',
    bit: 'Bit', B: 'Octet (o)', KB: 'Kilooctet (Ko)', MB: 'Mégaoctet (Mo)', GB: 'Gigaoctet (Go)', TB: 'Téraoctet (To)',
    Kib: 'Kibioctet (Kio)', Mib: 'Mébioctet (Mio)', Gib: 'Gibioctet (Gio)',
  },
  lt: {
    mm: 'Milimetras (mm)', cm: 'Centimetras (cm)', m: 'Metras (m)', km: 'Kilometras (km)',
    in: 'Colis (in)', ft: 'Pėda (ft)', yd: 'Jardas (yd)', mi: 'Mylia (mi)', nmi: 'Jūrmylė',
    mg: 'Miligramas (mg)', g: 'Gramas (g)', kg: 'Kilogramas (kg)', t: 'Tona (t)',
    oz: 'Uncija (oz)', lb: 'Svaras (lb)', st: 'Stonas (st)',
    C: 'Celsijus (°C)', F: 'Farenheitas (°F)', K: 'Kelvinas (K)',
    ml: 'Mililitras (ml)', cl: 'Centilitras (cl)', l: 'Litras (l)', m3: 'Kubinis metras (m³)',
    floz: 'Skyst. uncija', cup: 'Puodelis', pt: 'Pinta (pt)', qt: 'Kvartas (qt)', gal: 'Galonas (gal)',
    mm2: 'mm²', cm2: 'cm²', m2: 'm²', km2: 'km²', in2: 'in²', ft2: 'ft²', ac: 'Akras (ac)', ha: 'Hektaras (ha)',
    kmh: 'km/val', ms: 'm/s', mph: 'myl/val', kn: 'Mazgas (kn)', fts: 'pėd/s',
    bit: 'Bitas', B: 'Baitas (B)', KB: 'Kilobaitas (KB)', MB: 'Megabaitas (MB)', GB: 'Gigabaitas (GB)', TB: 'Terabaitas (TB)',
    Kib: 'Kibibaitas (KiB)', Mib: 'Mebibaitas (MiB)', Gib: 'Gibibaitas (GiB)',
  },
};

type Unit = { key: string; label: string; toBase: (v: number) => number; fromBase: (v: number) => number };
type Category = { key: string; units: Unit[] };

const CATEGORIES: Category[] = [
  {
    key: 'length',
    units: [
      { key: 'mm',  label: 'Millimeter (mm)',  toBase: v => v / 1000,      fromBase: v => v * 1000 },
      { key: 'cm',  label: 'Centimeter (cm)',  toBase: v => v / 100,       fromBase: v => v * 100 },
      { key: 'm',   label: 'Meter (m)',         toBase: v => v,             fromBase: v => v },
      { key: 'km',  label: 'Kilometer (km)',    toBase: v => v * 1000,      fromBase: v => v / 1000 },
      { key: 'in',  label: 'Inch (in)',         toBase: v => v * 0.0254,    fromBase: v => v / 0.0254 },
      { key: 'ft',  label: 'Foot (ft)',         toBase: v => v * 0.3048,    fromBase: v => v / 0.3048 },
      { key: 'yd',  label: 'Yard (yd)',         toBase: v => v * 0.9144,    fromBase: v => v / 0.9144 },
      { key: 'mi',  label: 'Mile (mi)',         toBase: v => v * 1609.344,  fromBase: v => v / 1609.344 },
      { key: 'nmi', label: 'Nautical mile (nmi)', toBase: v => v * 1852,   fromBase: v => v / 1852 },
    ],
  },
  {
    key: 'weight',
    units: [
      { key: 'mg',  label: 'Milligram (mg)',   toBase: v => v / 1e6,       fromBase: v => v * 1e6 },
      { key: 'g',   label: 'Gram (g)',          toBase: v => v / 1000,      fromBase: v => v * 1000 },
      { key: 'kg',  label: 'Kilogram (kg)',     toBase: v => v,             fromBase: v => v },
      { key: 't',   label: 'Tonne (t)',         toBase: v => v * 1000,      fromBase: v => v / 1000 },
      { key: 'oz',  label: 'Ounce (oz)',        toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
      { key: 'lb',  label: 'Pound (lb)',        toBase: v => v * 0.453592,  fromBase: v => v / 0.453592 },
      { key: 'st',  label: 'Stone (st)',        toBase: v => v * 6.35029,   fromBase: v => v / 6.35029 },
    ],
  },
  {
    key: 'temperature',
    units: [
      { key: 'C', label: 'Celsius (°C)',    toBase: v => v,               fromBase: v => v },
      { key: 'F', label: 'Fahrenheit (°F)', toBase: v => (v - 32) * 5/9,  fromBase: v => v * 9/5 + 32 },
      { key: 'K', label: 'Kelvin (K)',      toBase: v => v - 273.15,       fromBase: v => v + 273.15 },
    ],
  },
  {
    key: 'volume',
    units: [
      { key: 'ml',    label: 'Milliliter (ml)',    toBase: v => v / 1000,      fromBase: v => v * 1000 },
      { key: 'cl',    label: 'Centiliter (cl)',    toBase: v => v / 100,       fromBase: v => v * 100 },
      { key: 'l',     label: 'Liter (l)',           toBase: v => v,             fromBase: v => v },
      { key: 'm3',    label: 'Cubic meter (m³)',    toBase: v => v * 1000,      fromBase: v => v / 1000 },
      { key: 'floz',  label: 'Fl. ounce (fl oz)',  toBase: v => v * 0.0295735, fromBase: v => v / 0.0295735 },
      { key: 'cup',   label: 'Cup (cup)',           toBase: v => v * 0.236588,  fromBase: v => v / 0.236588 },
      { key: 'pt',    label: 'Pint (pt)',           toBase: v => v * 0.473176,  fromBase: v => v / 0.473176 },
      { key: 'qt',    label: 'Quart (qt)',          toBase: v => v * 0.946353,  fromBase: v => v / 0.946353 },
      { key: 'gal',   label: 'Gallon (gal)',        toBase: v => v * 3.78541,   fromBase: v => v / 3.78541 },
    ],
  },
  {
    key: 'area',
    units: [
      { key: 'mm2', label: 'mm²',             toBase: v => v / 1e6,       fromBase: v => v * 1e6 },
      { key: 'cm2', label: 'cm²',             toBase: v => v / 1e4,       fromBase: v => v * 1e4 },
      { key: 'm2',  label: 'm²',              toBase: v => v,             fromBase: v => v },
      { key: 'km2', label: 'km²',             toBase: v => v * 1e6,       fromBase: v => v / 1e6 },
      { key: 'in2', label: 'in²',             toBase: v => v * 6.4516e-4, fromBase: v => v / 6.4516e-4 },
      { key: 'ft2', label: 'ft²',             toBase: v => v * 0.0929,    fromBase: v => v / 0.0929 },
      { key: 'ac',  label: 'Acre (ac)',        toBase: v => v * 4046.86,   fromBase: v => v / 4046.86 },
      { key: 'ha',  label: 'Hectare (ha)',     toBase: v => v * 10000,     fromBase: v => v / 10000 },
    ],
  },
  {
    key: 'speed',
    units: [
      { key: 'kmh', label: 'km/h',           toBase: v => v / 3.6,       fromBase: v => v * 3.6 },
      { key: 'ms',  label: 'm/s',            toBase: v => v,             fromBase: v => v },
      { key: 'mph', label: 'mph',            toBase: v => v * 0.44704,   fromBase: v => v / 0.44704 },
      { key: 'kn',  label: 'Knot (kn)',      toBase: v => v * 0.514444,  fromBase: v => v / 0.514444 },
      { key: 'fts', label: 'ft/s',           toBase: v => v * 0.3048,    fromBase: v => v / 0.3048 },
    ],
  },
  {
    key: 'digital',
    units: [
      { key: 'bit', label: 'Bit (bit)',        toBase: v => v,             fromBase: v => v },
      { key: 'B',   label: 'Byte (B)',         toBase: v => v * 8,         fromBase: v => v / 8 },
      { key: 'KB',  label: 'Kilobyte (KB)',    toBase: v => v * 8000,      fromBase: v => v / 8000 },
      { key: 'MB',  label: 'Megabyte (MB)',    toBase: v => v * 8e6,       fromBase: v => v / 8e6 },
      { key: 'GB',  label: 'Gigabyte (GB)',    toBase: v => v * 8e9,       fromBase: v => v / 8e9 },
      { key: 'TB',  label: 'Terabyte (TB)',    toBase: v => v * 8e12,      fromBase: v => v / 8e12 },
      { key: 'Kib', label: 'Kibibyte (KiB)',   toBase: v => v * 8192,      fromBase: v => v / 8192 },
      { key: 'Mib', label: 'Mebibyte (MiB)',   toBase: v => v * 8388608,   fromBase: v => v / 8388608 },
      { key: 'Gib', label: 'Gibibyte (GiB)',   toBase: v => v * 8589934592, fromBase: v => v / 8589934592 },
    ],
  },
];

function convert(value: number, fromUnit: Unit, toUnit: Unit): number {
  const base = fromUnit.toBase(value);
  return toUnit.fromBase(base);
}

function fmtResult(n: number): string {
  if (!isFinite(n)) return '—';
  if (Math.abs(n) >= 1e15 || (Math.abs(n) < 1e-6 && n !== 0)) {
    return n.toExponential(6);
  }
  const s = parseFloat(n.toPrecision(10)).toString();
  return s;
}

export default function UnitConverter({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [catKey, setCatKey] = useState('length');
  const cat = CATEGORIES.find(c => c.key === catKey)!;

  const [fromKey, setFromKey] = useState('m');
  const [toKey, setToKey] = useState('ft');
  const [inputValue, setInputValue] = useState('1');

  useEffect(() => {
    const savedCat = localStorage.getItem('utilixi_units_cat');
    if (savedCat) {
      const newCat = CATEGORIES.find(c => c.key === savedCat);
      if (newCat) {
        setCatKey(savedCat);
        setFromKey(newCat.units[0].key);
        setToKey(newCat.units[1]?.key ?? newCat.units[0].key);
      }
    }
  }, []);

  const handleCatChange = (key: string) => {
    const newCat = CATEGORIES.find(c => c.key === key)!;
    setCatKey(key);
    setFromKey(newCat.units[0].key);
    setToKey(newCat.units[1]?.key ?? newCat.units[0].key);
    setInputValue('1');
    localStorage.setItem('utilixi_units_cat', key);
  };

  const handleSwap = () => {
    setFromKey(toKey);
    setToKey(fromKey);
  };

  const fromUnit = cat.units.find(u => u.key === fromKey) ?? cat.units[0];
  const toUnit = cat.units.find(u => u.key === toKey) ?? cat.units[1];
  const numVal = parseFloat(inputValue.replace(',', '.'));
  const resultStr = inputValue !== '' && !isNaN(numVal)
    ? fmtResult(convert(numVal, fromUnit, toUnit))
    : '';

  const catKeys = CATEGORIES.map(c => c.key);

  return (
    <div className={styles['unit-conv']}>
      <div className={styles['unit-conv__cats']}>
        {catKeys.map(k => (
          <button
            key={k}
            type="button"
            className={`${styles['unit-conv__cat-btn']} ${catKey === k ? styles['unit-conv__cat-btn--active'] : ''}`}
            onClick={() => handleCatChange(k)}
          >
            {t.categories[k]}
          </button>
        ))}
      </div>

      <div className={styles['unit-conv__body']}>
        <div className={styles['unit-conv__row']}>
          <div className={styles['unit-conv__field']}>
            <label className={styles['unit-conv__label']}>{t.from}</label>
            <select
              className={styles['unit-conv__select']}
              value={fromKey}
              onChange={e => setFromKey(e.target.value)}
            >
              {cat.units.map(u => (
                <option key={u.key} value={u.key}>{UNIT_LABELS[lang][u.key] ?? u.label}</option>
              ))}
            </select>
            <input
              type="number"
              className={styles['unit-conv__input']}
              value={inputValue}
              placeholder={t.enterValue}
              onChange={e => setInputValue(e.target.value)}
            />
          </div>

          <button
            type="button"
            className={styles['unit-conv__swap']}
            onClick={handleSwap}
            title={t.swap}
            aria-label={t.swap}
          >
            ⇄
          </button>

          <div className={styles['unit-conv__field']}>
            <label className={styles['unit-conv__label']}>{t.to}</label>
            <select
              className={styles['unit-conv__select']}
              value={toKey}
              onChange={e => setToKey(e.target.value)}
            >
              {cat.units.map(u => (
                <option key={u.key} value={u.key}>{UNIT_LABELS[lang][u.key] ?? u.label}</option>
              ))}
            </select>
            <div className={styles['unit-conv__result-box']}>
              {resultStr !== '' ? (
                <span className={styles['unit-conv__result-value']}>{resultStr}</span>
              ) : (
                <span className={styles['unit-conv__result-placeholder']}>{t.enterValue}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

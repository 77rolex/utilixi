'use client';

import { useState } from 'react';
import styles from './RenovationCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  country: string; roomType: string; area: string; quality: string;
  calculate: string; reset: string; totalCost: string; perSqm: string;
  breakdown: string; notes: string; sqm: string; errFields: string;
  errArea: string; quality1: string; quality2: string; quality3: string;
  roomApart: string; roomBath: string; roomKitchen: string; roomLiving: string;
  roomBedroom: string; roomHouse: string; placeholder: string;
}> = {
  en: {
    country: 'Country', roomType: 'Room type', area: 'Area (m²)', quality: 'Finish quality',
    calculate: 'Estimate cost', reset: 'Reset',
    totalCost: 'Estimated total cost', perSqm: 'Cost per m²',
    breakdown: 'Cost breakdown', notes: 'Notes',
    sqm: 'm²', errFields: 'Please fill in all fields.', errArea: 'Area must be between 1 and 1000 m².',
    quality1: 'Economy', quality2: 'Standard', quality3: 'Premium',
    roomApart: 'Full apartment', roomBath: 'Bathroom / toilet', roomKitchen: 'Kitchen',
    roomLiving: 'Living room', roomBedroom: 'Bedroom', roomHouse: 'Whole house',
    placeholder: 'e.g. 50',
  },
  ru: {
    country: 'Страна', roomType: 'Тип помещения', area: 'Площадь (м²)', quality: 'Качество отделки',
    calculate: 'Рассчитать стоимость', reset: 'Сбросить',
    totalCost: 'Ориентировочная стоимость', perSqm: 'Стоимость за м²',
    breakdown: 'Разбивка по статьям', notes: 'Примечания',
    sqm: 'м²', errFields: 'Пожалуйста, заполните все поля.', errArea: 'Площадь должна быть от 1 до 1000 м².',
    quality1: 'Эконом', quality2: 'Стандарт', quality3: 'Премиум',
    roomApart: 'Квартира целиком', roomBath: 'Ванная / туалет', roomKitchen: 'Кухня',
    roomLiving: 'Гостиная', roomBedroom: 'Спальня', roomHouse: 'Дом целиком',
    placeholder: 'напр. 50',
  },
  uk: {
    country: 'Країна', roomType: 'Тип приміщення', area: 'Площа (м²)', quality: 'Якість оздоблення',
    calculate: 'Розрахувати вартість', reset: 'Скинути',
    totalCost: 'Орієнтовна вартість', perSqm: 'Вартість за м²',
    breakdown: 'Розбивка за статтями', notes: 'Примітки',
    sqm: 'м²', errFields: 'Будь ласка, заповніть всі поля.', errArea: 'Площа повинна бути від 1 до 1000 м².',
    quality1: 'Економ', quality2: 'Стандарт', quality3: 'Преміум',
    roomApart: 'Квартира повністю', roomBath: 'Ванна / туалет', roomKitchen: 'Кухня',
    roomLiving: 'Вітальня', roomBedroom: 'Спальня', roomHouse: 'Будинок повністю',
    placeholder: 'напр. 50',
  },
  fr: {
    country: 'Pays', roomType: 'Type de pièce', area: 'Surface (m²)', quality: 'Qualité des finitions',
    calculate: 'Estimer le coût', reset: 'Réinitialiser',
    totalCost: 'Coût total estimé', perSqm: 'Coût par m²',
    breakdown: 'Détail des coûts', notes: 'Remarques',
    sqm: 'm²', errFields: 'Veuillez remplir tous les champs.', errArea: 'La surface doit être comprise entre 1 et 1 000 m².',
    quality1: 'Économique', quality2: 'Standard', quality3: 'Premium',
    roomApart: 'Appartement entier', roomBath: 'Salle de bain / WC', roomKitchen: 'Cuisine',
    roomLiving: 'Salon', roomBedroom: 'Chambre', roomHouse: 'Maison entière',
    placeholder: 'ex. 50',
  },
  lt: {
    country: 'Šalis', roomType: 'Patalpos tipas', area: 'Plotas (m²)', quality: 'Apdailos kokybė',
    calculate: 'Apskaičiuoti kainą', reset: 'Atstatyti',
    totalCost: 'Apytikslė bendra kaina', perSqm: 'Kaina už m²',
    breakdown: 'Kainos struktūra', notes: 'Pastabos',
    sqm: 'm²', errFields: 'Užpildykite visus laukus.', errArea: 'Plotas turi būti nuo 1 iki 1000 m².',
    quality1: 'Ekonominė', quality2: 'Standartinė', quality3: 'Premium',
    roomApart: 'Visas butas', roomBath: 'Vonios kambarys / tualetas', roomKitchen: 'Virtuvė',
    roomLiving: 'Svetainė', roomBedroom: 'Miegamasis', roomHouse: 'Visas namas',
    placeholder: 'pvz. 50',
  },
};

type RoomType = 'apart' | 'bath' | 'kitchen' | 'living' | 'bedroom' | 'house';
type Quality = '1' | '2' | '3';

type CountryRates = {
  currency: string;
  symbol: string;
  rates: Record<Quality, Record<RoomType, number>>;
  notes: Record<LangKey, string>;
};

// Cost per m² by country, quality, room type
const COUNTRIES: Record<string, CountryRates> = {
  gb: {
    currency: 'GBP', symbol: '£',
    rates: {
      '1': { apart: 380, bath: 650, kitchen: 500, living: 300, bedroom: 270, house: 330 },
      '2': { apart: 800, bath: 1400, kitchen: 1100, living: 650, bedroom: 600, house: 700 },
      '3': { apart: 1700, bath: 2800, kitchen: 2300, living: 1400, bedroom: 1200, house: 1500 },
    },
    notes: {
      en: 'UK renovation costs include labour, materials, and VAT (20%). London and South East are 40–60% above the national average. Prices reflect 2024 market rates and do not include planning permission fees where required.',
      ru: 'Стоимость ремонта в Великобритании включает работу, материалы и НДС (20%). Лондон и Юго-Восток на 40–60% дороже среднего по стране. Средние цены 2024 года.',
      uk: 'Вартість ремонту у Великій Британії включає роботу, матеріали та ПДВ (20%). Лондон та Південний Схід на 40–60% дорожчі за середнє по країні. Середні ціни 2024 року.',
      fr: 'Les coûts de rénovation au Royaume-Uni incluent main-d\'œuvre, matériaux et TVA (20%). Londres et le South East sont 40 à 60% plus chers que la moyenne nationale. Prix 2024.',
      lt: 'JK remonto išlaidos apima darbą, medžiagas ir PVM (20%). Londonas ir Pietryčiai 40–60% brangesni už vidurkį. 2024 m. vidutinės kainos.',
    },
  },
  be: {
    currency: 'EUR', symbol: '€',
    rates: {
      '1': { apart: 380, bath: 650, kitchen: 480, living: 300, bedroom: 270, house: 330 },
      '2': { apart: 760, bath: 1300, kitchen: 950, living: 600, bedroom: 550, house: 650 },
      '3': { apart: 1500, bath: 2400, kitchen: 1900, living: 1200, bedroom: 1100, house: 1350 },
    },
    notes: {
      en: 'Belgian renovation costs include labour, materials, and VAT (21%). Brussels is 20–30% higher than other regions. Prices are averages for 2024. Renovation grants (RENoWALL, RENOLUTION) may offset part of the cost.',
      ru: 'Стоимость ремонта в Бельгии включает работу, материалы и НДС (21%). Брюссель на 20–30% дороже других регионов. Средние цены 2024 года.',
      uk: 'Вартість ремонту в Бельгії включає роботу, матеріали та ПДВ (21%). Брюссель на 20–30% дорожчий за інші регіони. Середні ціни 2024 року.',
      fr: 'Les coûts de rénovation en Belgique incluent main-d\'œuvre, matériaux et TVA (21%). Bruxelles est 20 à 30% plus chère que les autres régions. Les primes RENOLUTION peuvent réduire la facture.',
      lt: 'Belgijos remonto išlaidos apima darbą, medžiagas ir PVM (21%). Briuselis 20–30% brangesnis. 2024 m. vidutinės kainos.',
    },
  },
  de: {
    currency: 'EUR', symbol: '€',
    rates: {
      '1': { apart: 350, bath: 600, kitchen: 450, living: 280, bedroom: 250, house: 300 },
      '2': { apart: 700, bath: 1200, kitchen: 900, living: 550, bedroom: 500, house: 600 },
      '3': { apart: 1400, bath: 2200, kitchen: 1800, living: 1100, bedroom: 1000, house: 1200 },
    },
    notes: {
      en: 'German renovation costs include labour, materials, and VAT (19%). Prices are averages for 2024 and vary by region (Munich and Hamburg are 20–30% higher than rural areas).',
      ru: 'Стоимость ремонта в Германии включает работу, материалы и НДС (19%). Цены — средние по 2024 году. Мюнхен и Гамбург на 20–30% дороже сельских районов.',
      uk: 'Вартість ремонту в Німеччині включає роботу, матеріали та ПДВ (19%). Ціни — середні за 2024 рік. Мюнхен та Гамбург на 20–30% дорожчі за сільські райони.',
      fr: 'Les coûts de rénovation en Allemagne incluent main-d\'œuvre, matériaux et TVA (19%). Prix moyens 2024. Munich et Hambourg sont 20 à 30% plus chers que les zones rurales.',
      lt: 'Vokietijos remonto išlaidos apima darbą, medžiagas ir PVM (19%). 2024 m. vidutinės kainos. Miunchenas ir Hamburgas 20–30% brangesni nei kaimo vietovės.',
    },
  },
  fr: {
    currency: 'EUR', symbol: '€',
    rates: {
      '1': { apart: 400, bath: 700, kitchen: 500, living: 300, bedroom: 270, house: 350 },
      '2': { apart: 800, bath: 1400, kitchen: 1000, living: 650, bedroom: 600, house: 700 },
      '3': { apart: 1600, bath: 2500, kitchen: 2000, living: 1300, bedroom: 1200, house: 1400 },
    },
    notes: {
      en: 'French renovation costs include labour, materials, and VAT (20%). Prices are averages for 2024. Paris and Île-de-France are 30–40% higher than provincial rates.',
      ru: 'Стоимость включает работу, материалы и НДС (20%). Цены за 2024 год. Париж и Иль-де-Франс на 30–40% дороже провинции.',
      uk: 'Вартість включає роботу, матеріали та ПДВ (20%). Ціни за 2024 рік. Париж та Іль-де-Франс на 30–40% дорожчі за провінцію.',
      fr: 'Les coûts incluent main-d\'œuvre, matériaux et TVA (20%). Prix 2024. Paris et l\'Île-de-France sont 30 à 40% plus chers que la province.',
      lt: 'Kaina apima darbą, medžiagas ir PVM (20%). 2024 m. kainos. Paryžius ir Île-de-France 30–40% brangesni nei provincija.',
    },
  },
  pl: {
    currency: 'PLN', symbol: 'zł',
    rates: {
      '1': { apart: 1200, bath: 2000, kitchen: 1500, living: 900, bedroom: 800, house: 1000 },
      '2': { apart: 2500, bath: 4000, kitchen: 3000, living: 2000, bedroom: 1800, house: 2200 },
      '3': { apart: 5000, bath: 7500, kitchen: 6000, living: 4000, bedroom: 3500, house: 4500 },
    },
    notes: {
      en: 'Polish renovation costs include labour, materials, and VAT (23%). Warsaw and Kraków are 15–25% higher than other regions. Prices are averages for 2024.',
      ru: 'Стоимость включает работу, материалы и НДС (23%). Варшава и Краков на 15–25% дороже. Средние цены 2024 года.',
      uk: 'Вартість включає роботу, матеріали та ПДВ (23%). Варшава та Краків на 15–25% дорожчі. Середні ціни 2024 року.',
      fr: 'Les coûts incluent main-d\'œuvre, matériaux et TVA (23%). Varsovie et Cracovie sont 15 à 25% plus chers. Prix moyens 2024.',
      lt: 'Kaina apima darbą, medžiagas ir PVM (23%). Varšuva ir Krokuva 15–25% brangesni. 2024 m. vidutinės kainos.',
    },
  },
  lt: {
    currency: 'EUR', symbol: '€',
    rates: {
      '1': { apart: 300, bath: 500, kitchen: 400, living: 250, bedroom: 220, house: 280 },
      '2': { apart: 600, bath: 1000, kitchen: 800, living: 500, bedroom: 450, house: 550 },
      '3': { apart: 1200, bath: 2000, kitchen: 1600, living: 1000, bedroom: 900, house: 1100 },
    },
    notes: {
      en: 'Lithuanian renovation costs include labour, materials, and VAT (21%). Vilnius is 10–20% higher than other cities. Prices are averages for 2024.',
      ru: 'Стоимость включает работу, материалы и НДС (21%). Вильнюс на 10–20% дороже. Средние цены 2024 года.',
      uk: 'Вартість включає роботу, матеріали та ПДВ (21%). Вільнюс на 10–20% дорожчий. Середні ціни 2024 року.',
      fr: 'Les coûts incluent main-d\'œuvre, matériaux et TVA (21%). Vilnius est 10 à 20% plus cher. Prix moyens 2024.',
      lt: 'Kaina apima darbą, medžiagas ir PVM (21%). Vilnius 10–20% brangesnis. 2024 m. vidutinės kainos.',
    },
  },
  ua: {
    currency: 'UAH', symbol: '₴',
    rates: {
      '1': { apart: 6000, bath: 9000, kitchen: 7500, living: 5000, bedroom: 4500, house: 5500 },
      '2': { apart: 12000, bath: 18000, kitchen: 15000, living: 10000, bedroom: 9000, house: 11000 },
      '3': { apart: 25000, bath: 38000, kitchen: 30000, living: 20000, bedroom: 18000, house: 22000 },
    },
    notes: {
      en: 'Ukrainian renovation costs include labour and materials (VAT 20%). Kyiv prices are 20–30% higher than regional cities. Prices are averages for 2024.',
      ru: 'Стоимость включает работу и материалы (НДС 20%). Киев на 20–30% дороже. Средние цены 2024 года.',
      uk: 'Вартість включає роботу та матеріали (ПДВ 20%). Київ на 20–30% дорожчий за регіональні міста. Середні ціни 2024 року.',
      fr: 'Les coûts incluent main-d\'œuvre et matériaux (TVA 20%). Kiev est 20 à 30% plus cher. Prix moyens 2024.',
      lt: 'Kaina apima darbą ir medžiagas (PVM 20%). Kijevas 20–30% brangesnis. 2024 m. vidutinės kainos.',
    },
  },
  us: {
    currency: 'USD', symbol: '$',
    rates: {
      '1': { apart: 400, bath: 700, kitchen: 550, living: 320, bedroom: 290, house: 350 },
      '2': { apart: 900, bath: 1500, kitchen: 1200, living: 750, bedroom: 700, house: 800 },
      '3': { apart: 2000, bath: 3000, kitchen: 2500, living: 1600, bedroom: 1500, house: 1800 },
    },
    notes: {
      en: 'US renovation costs vary widely by state. New York, California, and Washington DC are 40–60% above the national average. Prices do not include architectural permits where required.',
      ru: 'Стоимость ремонта в США сильно варьируется по штатам. Нью-Йорк, Калифорния и Вашингтон DC на 40–60% выше среднего. Без архитектурных разрешений.',
      uk: 'Вартість ремонту в США суттєво різниться за штатами. Нью-Йорк, Каліфорнія та Вашингтон DC на 40–60% вищі за середній показник.',
      fr: 'Les coûts varient fortement selon l\'État. New York, Californie et Washington DC sont 40 à 60% au-dessus de la moyenne nationale. Hors permis architecturaux.',
      lt: 'JAV remonto išlaidos labai skiriasi pagal valstiją. Niujorkas, Kalifornija ir Vašingtonas DC 40–60% brangesni už vidurkį. Be architektūrinių leidimų.',
    },
  },
  ru: {
    currency: 'RUB', symbol: '₽',
    rates: {
      '1': { apart: 18000, bath: 30000, kitchen: 22000, living: 15000, bedroom: 13000, house: 16000 },
      '2': { apart: 45000, bath: 75000, kitchen: 60000, living: 38000, bedroom: 35000, house: 40000 },
      '3': { apart: 100000, bath: 160000, kitchen: 130000, living: 80000, bedroom: 75000, house: 90000 },
    },
    notes: {
      en: 'Russian renovation costs include labour and materials (VAT 20%). Moscow and St. Petersburg are 40–60% higher than regional averages. Prices are averages for 2024.',
      ru: 'Стоимость ремонта в России включает работу и материалы (НДС 20%). Москва и Санкт-Петербург на 40–60% дороже региональных городов. Средние цены 2024 года.',
      uk: 'Вартість ремонту в Росії включає роботу та матеріали (ПДВ 20%). Москва та Санкт-Петербург на 40–60% дорожчі за регіональні міста. Середні ціни 2024 року.',
      fr: 'Les coûts de rénovation en Russie incluent main-d\'œuvre et matériaux (TVA 20%). Moscou et Saint-Pétersbourg sont 40 à 60% plus chers. Prix moyens 2024.',
      lt: 'Rusijos remonto išlaidos apima darbą ir medžiagas (PVM 20%). Maskva ir Sankt Peterburgas 40–60% brangesni. 2024 m. vidutinės kainos.',
    },
  },
};

const COUNTRY_LABELS: Record<LangKey, Record<string, string>> = {
  en: { gb: 'United Kingdom', be: 'Belgium', de: 'Germany', fr: 'France', pl: 'Poland', lt: 'Lithuania', ua: 'Ukraine', us: 'USA', ru: 'Russia' },
  ru: { gb: 'Великобритания', be: 'Бельгия', de: 'Германия', fr: 'Франция', pl: 'Польша', lt: 'Литва', ua: 'Украина', us: 'США', ru: 'Россия' },
  uk: { gb: 'Велика Британія', be: 'Бельгія', de: 'Німеччина', fr: 'Франція', pl: 'Польща', lt: 'Литва', ua: 'Україна', us: 'США', ru: 'Росія' },
  fr: { gb: 'Royaume-Uni', be: 'Belgique', de: 'Allemagne', fr: 'France', pl: 'Pologne', lt: 'Lituanie', ua: 'Ukraine', us: 'États-Unis', ru: 'Russie' },
  lt: { gb: 'Jungtinė Karalystė', be: 'Belgija', de: 'Vokietija', fr: 'Prancūzija', pl: 'Lenkija', lt: 'Lietuva', ua: 'Ukraina', us: 'JAV', ru: 'Rusija' },
};

const BREAKDOWN_LABELS: Record<LangKey, { labour: string; materials: string; plumbing: string; electrical: string; finishing: string }> = {
  en: { labour: 'Labour', materials: 'Materials', plumbing: 'Plumbing / sanitary', electrical: 'Electrical work', finishing: 'Finishing & painting' },
  ru: { labour: 'Работа', materials: 'Материалы', plumbing: 'Сантехника', electrical: 'Электрика', finishing: 'Чистовая отделка' },
  uk: { labour: 'Робота', materials: 'Матеріали', plumbing: 'Сантехніка', electrical: 'Електрика', finishing: 'Чистове оздоблення' },
  fr: { labour: 'Main-d\'œuvre', materials: 'Matériaux', plumbing: 'Plomberie / sanitaire', electrical: 'Travaux électriques', finishing: 'Finitions & peinture' },
  lt: { labour: 'Darbas', materials: 'Medžiagos', plumbing: 'Santechnika / sanitariniai', electrical: 'Elektros darbai', finishing: 'Apdaila ir dažymas' },
};

// Approximate cost distribution by room type
const BREAKDOWN_SHARES: Record<RoomType, { labour: number; materials: number; plumbing: number; electrical: number; finishing: number }> = {
  apart:   { labour: 35, materials: 30, plumbing: 15, electrical: 10, finishing: 10 },
  bath:    { labour: 30, materials: 25, plumbing: 30, electrical: 10, finishing: 5 },
  kitchen: { labour: 30, materials: 25, plumbing: 20, electrical: 15, finishing: 10 },
  living:  { labour: 35, materials: 30, plumbing: 5,  electrical: 10, finishing: 20 },
  bedroom: { labour: 35, materials: 30, plumbing: 5,  electrical: 10, finishing: 20 },
  house:   { labour: 35, materials: 30, plumbing: 15, electrical: 10, finishing: 10 },
};

function fmt(val: number, symbol: string): string {
  return symbol + val.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export default function RenovationCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [country, setCountry] = useState('');
  const [roomType, setRoomType] = useState<RoomType | ''>('');
  const [area, setArea] = useState('');
  const [quality, setQuality] = useState<Quality | ''>('');
  const [result, setResult] = useState<{ total: number; perSqm: number; symbol: string; breakdown: Record<string, number>; notes: string } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!country || !roomType || !area || !quality) { setError(t.errFields); return; }
    const areaNum = parseFloat(area);
    if (isNaN(areaNum) || areaNum < 1 || areaNum > 1000) { setError(t.errArea); return; }
    setError('');

    const countryData = COUNTRIES[country];
    const perSqm = countryData.rates[quality][roomType];
    const total = Math.round(perSqm * areaNum);
    const shares = BREAKDOWN_SHARES[roomType];

    setResult({
      total,
      perSqm,
      symbol: countryData.symbol,
      breakdown: {
        labour: Math.round(total * shares.labour / 100),
        materials: Math.round(total * shares.materials / 100),
        plumbing: Math.round(total * shares.plumbing / 100),
        electrical: Math.round(total * shares.electrical / 100),
        finishing: Math.round(total * shares.finishing / 100),
      },
      notes: countryData.notes[lang],
    });
  };

  const reset = () => { setCountry(''); setRoomType(''); setArea(''); setQuality(''); setResult(null); setError(''); };

  const roomOptions: [RoomType, string][] = [
    ['apart', t.roomApart], ['house', t.roomHouse], ['bath', t.roomBath],
    ['kitchen', t.roomKitchen], ['living', t.roomLiving], ['bedroom', t.roomBedroom],
  ];

  const bl = BREAKDOWN_LABELS[lang];

  return (
    <div className={styles['ren-calc']}>
      <div className={styles['ren-calc__form']}>
        <div className={styles['ren-calc__field']}>
          <label className={styles['ren-calc__label']}>{t.country}</label>
          <select className={styles['ren-calc__select']} value={country} onChange={e => { setCountry(e.target.value); setResult(null); setError(''); }}>
            <option value="">—</option>
            {Object.keys(COUNTRIES).map(k => <option key={k} value={k}>{COUNTRY_LABELS[lang][k]}</option>)}
          </select>
        </div>

        <div className={styles['ren-calc__field']}>
          <label className={styles['ren-calc__label']}>{t.roomType}</label>
          <select className={styles['ren-calc__select']} value={roomType} onChange={e => { setRoomType(e.target.value as RoomType); setResult(null); setError(''); }}>
            <option value="">—</option>
            {roomOptions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        <div className={styles['ren-calc__field']}>
          <label className={styles['ren-calc__label']}>{t.area}</label>
          <input
            type="number"
            className={styles['ren-calc__input']}
            value={area}
            min={1} max={1000} step={1}
            placeholder={t.placeholder}
            onChange={e => { setArea(e.target.value); setResult(null); setError(''); }}
          />
        </div>

        <div className={styles['ren-calc__field']}>
          <label className={styles['ren-calc__label']}>{t.quality}</label>
          <select className={styles['ren-calc__select']} value={quality} onChange={e => { setQuality(e.target.value as Quality); setResult(null); setError(''); }}>
            <option value="">—</option>
            <option value="1">{t.quality1}</option>
            <option value="2">{t.quality2}</option>
            <option value="3">{t.quality3}</option>
          </select>
        </div>
      </div>

      {error && <p className={styles['ren-calc__error']}>{error}</p>}

      <div className={styles['ren-calc__actions']}>
        <button type="button" className={styles['ren-calc__btn']} onClick={calculate}>{t.calculate}</button>
        <button type="button" className={styles['ren-calc__btn--reset']} onClick={reset}>{t.reset}</button>
      </div>

      {result && (
        <div className={styles['ren-calc__result']}>
          <div className={styles['ren-calc__totals']}>
            <div className={styles['ren-calc__total-item']}>
              <span className={styles['ren-calc__total-label']}>{t.totalCost}</span>
              <span className={styles['ren-calc__total-value']}>{fmt(result.total, result.symbol)}</span>
            </div>
            <div className={styles['ren-calc__total-item']}>
              <span className={styles['ren-calc__total-label']}>{t.perSqm}</span>
              <span className={styles['ren-calc__total-value']}>{fmt(result.perSqm, result.symbol)}</span>
            </div>
          </div>

          <div className={styles['ren-calc__breakdown']}>
            <p className={styles['ren-calc__breakdown-title']}>{t.breakdown}:</p>
            <div className={styles['ren-calc__breakdown-grid']}>
              {[
                { key: 'labour', label: bl.labour },
                { key: 'materials', label: bl.materials },
                { key: 'plumbing', label: bl.plumbing },
                { key: 'electrical', label: bl.electrical },
                { key: 'finishing', label: bl.finishing },
              ].map(({ key, label }) => (
                <div key={key} className={styles['ren-calc__breakdown-item']}>
                  <span className={styles['ren-calc__breakdown-label']}>{label}</span>
                  <span className={styles['ren-calc__breakdown-value']}>{fmt(result.breakdown[key], result.symbol)}</span>
                </div>
              ))}
            </div>
          </div>

          <p className={styles['ren-calc__notes']}>{result.notes}</p>
        </div>
      )}
    </div>
  );
}

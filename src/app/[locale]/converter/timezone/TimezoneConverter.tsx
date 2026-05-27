'use client';

import { useState, useEffect, useMemo } from 'react';
import styles from './TimezoneConverter.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  dateLabel: string;
  timeLabel: string;
  sourceLabel: string;
  resultsTitle: string;
  sourceTag: string;
}> = {
  en: {
    dateLabel: 'Date',
    timeLabel: 'Time',
    sourceLabel: 'Source timezone',
    resultsTitle: 'Same moment in other timezones',
    sourceTag: 'source',
  },
  ru: {
    dateLabel: 'Дата',
    timeLabel: 'Время',
    sourceLabel: 'Исходный часовой пояс',
    resultsTitle: 'Тот же момент в других часовых поясах',
    sourceTag: 'источник',
  },
  uk: {
    dateLabel: 'Дата',
    timeLabel: 'Час',
    sourceLabel: 'Вихідний часовий пояс',
    resultsTitle: 'Той самий момент в інших часових поясах',
    sourceTag: 'джерело',
  },
  fr: {
    dateLabel: 'Date',
    timeLabel: 'Heure',
    sourceLabel: 'Fuseau horaire source',
    resultsTitle: 'Le même moment dans d\'autres fuseaux',
    sourceTag: 'source',
  },
  lt: {
    dateLabel: 'Data',
    timeLabel: 'Laikas',
    sourceLabel: 'Šaltinio laiko juosta',
    resultsTitle: 'Tas pats momentas kitose laiko juostose',
    sourceTag: 'šaltinis',
  },
};

type TzEntry = {
  tz: string;
  city: Record<LangKey, string>;
  region: Record<LangKey, string>;
};

const TIMEZONES: TzEntry[] = [
  {
    tz: 'UTC',
    city:   { en: 'UTC',        ru: 'UTC',        uk: 'UTC',        fr: 'UTC',       lt: 'UTC' },
    region: { en: 'Universal',  ru: 'Всемирное',  uk: 'Всесвітній', fr: 'Universel', lt: 'Universalus' },
  },

  // ── Americas ────────────────────────────────────────────────────────────────
  {
    tz: 'America/New_York',
    city:   { en: 'New York',    ru: 'Нью-Йорк',      uk: 'Нью-Йорк',      fr: 'New York',    lt: 'Niujorkas' },
    region: { en: 'USA — East',  ru: 'США — Восток',   uk: 'США — Схід',    fr: 'États-Unis — Est',   lt: 'JAV — Rytai' },
  },
  {
    tz: 'America/Chicago',
    city:   { en: 'Chicago',         ru: 'Чикаго',        uk: 'Чикаго',        fr: 'Chicago',           lt: 'Čikaga' },
    region: { en: 'USA — Central',   ru: 'США — Центр',   uk: 'США — Центр',   fr: 'États-Unis — Centre', lt: 'JAV — Centras' },
  },
  {
    tz: 'America/Denver',
    city:   { en: 'Denver',          ru: 'Денвер',        uk: 'Денвер',        fr: 'Denver',            lt: 'Denveris' },
    region: { en: 'USA — Mountain',  ru: 'США — Горы',    uk: 'США — Гори',    fr: 'États-Unis — Montagne', lt: 'JAV — Kalnai' },
  },
  {
    tz: 'America/Los_Angeles',
    city:   { en: 'Los Angeles',    ru: 'Лос-Анджелес',  uk: 'Лос-Анджелес',  fr: 'Los Angeles',       lt: 'Las Andželas' },
    region: { en: 'USA — West',     ru: 'США — Запад',   uk: 'США — Захід',   fr: 'États-Unis — Ouest', lt: 'JAV — Vakarai' },
  },
  {
    tz: 'America/Anchorage',
    city:   { en: 'Anchorage',      ru: 'Анкоридж',      uk: 'Анкоридж',      fr: 'Anchorage',         lt: 'Ankoridzas' },
    region: { en: 'USA — Alaska',   ru: 'США — Аляска',  uk: 'США — Аляска',  fr: 'États-Unis — Alaska', lt: 'JAV — Aliaska' },
  },
  {
    tz: 'Pacific/Honolulu',
    city:   { en: 'Honolulu',       ru: 'Гонолулу',      uk: 'Гонолулу',      fr: 'Honolulu',          lt: 'Honolulu' },
    region: { en: 'USA — Hawaii',   ru: 'США — Гавайи',  uk: 'США — Гаваї',   fr: 'États-Unis — Hawaï', lt: 'JAV — Havajus' },
  },
  {
    tz: 'America/Toronto',
    city:   { en: 'Toronto',        ru: 'Торонто',       uk: 'Торонто',       fr: 'Toronto',           lt: 'Torontas' },
    region: { en: 'Canada — East',  ru: 'Канада — Восток', uk: 'Канада — Схід', fr: 'Canada — Est',    lt: 'Kanada — Rytai' },
  },
  {
    tz: 'America/Vancouver',
    city:   { en: 'Vancouver',      ru: 'Ванкувер',      uk: 'Ванкувер',      fr: 'Vancouver',         lt: 'Vankuveris' },
    region: { en: 'Canada — West',  ru: 'Канада — Запад', uk: 'Канада — Захід', fr: 'Canada — Ouest',  lt: 'Kanada — Vakarai' },
  },
  {
    tz: 'America/Mexico_City',
    city:   { en: 'Mexico City',    ru: 'Мехико',        uk: 'Мехіко',        fr: 'Mexico',            lt: 'Meksiko miestas' },
    region: { en: 'Mexico',         ru: 'Мексика',       uk: 'Мексика',       fr: 'Mexique',           lt: 'Meksika' },
  },
  {
    tz: 'America/Bogota',
    city:   { en: 'Bogotá',         ru: 'Богота',        uk: 'Богота',        fr: 'Bogotá',            lt: 'Bogota' },
    region: { en: 'Colombia',       ru: 'Колумбия',      uk: 'Колумбія',      fr: 'Colombie',          lt: 'Kolumbija' },
  },
  {
    tz: 'America/Sao_Paulo',
    city:   { en: 'São Paulo',      ru: 'Сан-Паулу',     uk: 'Сан-Паулу',     fr: 'São Paulo',         lt: 'San Paulas' },
    region: { en: 'Brazil',         ru: 'Бразилия',      uk: 'Бразилія',      fr: 'Brésil',            lt: 'Brazilija' },
  },
  {
    tz: 'America/Argentina/Buenos_Aires',
    city:   { en: 'Buenos Aires',   ru: 'Буэнос-Айрес',  uk: 'Буенос-Айрес',  fr: 'Buenos Aires',      lt: 'Buenos Airesas' },
    region: { en: 'Argentina',      ru: 'Аргентина',     uk: 'Аргентина',     fr: 'Argentine',         lt: 'Argentina' },
  },

  // ── Europe ──────────────────────────────────────────────────────────────────
  {
    tz: 'Europe/London',
    city:   { en: 'London',         ru: 'Лондон',        uk: 'Лондон',        fr: 'Londres',           lt: 'Londonas' },
    region: { en: 'United Kingdom', ru: 'Великобритания', uk: 'Велика Британія', fr: 'Royaume-Uni',    lt: 'Jungtinė Karalystė' },
  },
  {
    tz: 'Europe/Lisbon',
    city:   { en: 'Lisbon',         ru: 'Лиссабон',      uk: 'Лісабон',       fr: 'Lisbonne',          lt: 'Lisabona' },
    region: { en: 'Portugal',       ru: 'Португалия',    uk: 'Португалія',    fr: 'Portugal',          lt: 'Portugalija' },
  },
  {
    tz: 'Europe/Paris',
    city:   { en: 'Paris',          ru: 'Париж',         uk: 'Париж',         fr: 'Paris',             lt: 'Paryžius' },
    region: { en: 'France',         ru: 'Франция',       uk: 'Франція',       fr: 'France',            lt: 'Prancūzija' },
  },
  {
    tz: 'Europe/Berlin',
    city:   { en: 'Berlin',         ru: 'Берлин',        uk: 'Берлін',        fr: 'Berlin',            lt: 'Berlynas' },
    region: { en: 'Germany',        ru: 'Германия',      uk: 'Німеччина',     fr: 'Allemagne',         lt: 'Vokietija' },
  },
  {
    tz: 'Europe/Madrid',
    city:   { en: 'Madrid',         ru: 'Мадрид',        uk: 'Мадрид',        fr: 'Madrid',            lt: 'Madridas' },
    region: { en: 'Spain',          ru: 'Испания',       uk: 'Іспанія',       fr: 'Espagne',           lt: 'Ispanija' },
  },
  {
    tz: 'Europe/Rome',
    city:   { en: 'Rome',           ru: 'Рим',           uk: 'Рим',           fr: 'Rome',              lt: 'Roma' },
    region: { en: 'Italy',          ru: 'Италия',        uk: 'Італія',        fr: 'Italie',            lt: 'Italija' },
  },
  {
    tz: 'Europe/Amsterdam',
    city:   { en: 'Amsterdam',      ru: 'Амстердам',     uk: 'Амстердам',     fr: 'Amsterdam',         lt: 'Amsterdamas' },
    region: { en: 'Netherlands',    ru: 'Нидерланды',    uk: 'Нідерланди',    fr: 'Pays-Bas',          lt: 'Nyderlandai' },
  },
  {
    tz: 'Europe/Warsaw',
    city:   { en: 'Warsaw',         ru: 'Варшава',       uk: 'Варшава',       fr: 'Varsovie',          lt: 'Varšuva' },
    region: { en: 'Poland',         ru: 'Польша',        uk: 'Польща',        fr: 'Pologne',           lt: 'Lenkija' },
  },
  {
    tz: 'Europe/Vilnius',
    city:   { en: 'Vilnius',        ru: 'Вильнюс',       uk: 'Вільнюс',       fr: 'Vilnius',           lt: 'Vilnius' },
    region: { en: 'Lithuania',      ru: 'Литва',         uk: 'Литва',         fr: 'Lituanie',          lt: 'Lietuva' },
  },
  {
    tz: 'Europe/Kiev',
    city:   { en: 'Kyiv',           ru: 'Киев',          uk: 'Київ',          fr: 'Kiev',              lt: 'Kyivas' },
    region: { en: 'Ukraine',        ru: 'Украина',       uk: 'Україна',       fr: 'Ukraine',           lt: 'Ukraina' },
  },
  {
    tz: 'Europe/Minsk',
    city:   { en: 'Minsk',          ru: 'Минск',         uk: 'Мінськ',        fr: 'Minsk',             lt: 'Minskas' },
    region: { en: 'Belarus',        ru: 'Беларусь',      uk: 'Білорусь',      fr: 'Biélorussie',       lt: 'Baltarusija' },
  },
  {
    tz: 'Europe/Helsinki',
    city:   { en: 'Helsinki',       ru: 'Хельсинки',     uk: 'Гельсінкі',     fr: 'Helsinki',          lt: 'Helsinkis' },
    region: { en: 'Finland',        ru: 'Финляндия',     uk: 'Фінляндія',     fr: 'Finlande',          lt: 'Suomija' },
  },
  {
    tz: 'Europe/Stockholm',
    city:   { en: 'Stockholm',      ru: 'Стокгольм',     uk: 'Стокгольм',     fr: 'Stockholm',         lt: 'Stokholmas' },
    region: { en: 'Sweden',         ru: 'Швеция',        uk: 'Швеція',        fr: 'Suède',             lt: 'Švedija' },
  },
  {
    tz: 'Europe/Bucharest',
    city:   { en: 'Bucharest',      ru: 'Бухарест',      uk: 'Бухарест',      fr: 'Bucarest',          lt: 'Bukareštas' },
    region: { en: 'Romania',        ru: 'Румыния',       uk: 'Румунія',       fr: 'Roumanie',          lt: 'Rumunija' },
  },
  {
    tz: 'Europe/Moscow',
    city:   { en: 'Moscow',         ru: 'Москва',        uk: 'Москва',        fr: 'Moscou',            lt: 'Maskva' },
    region: { en: 'Russia',         ru: 'Россия',        uk: 'Росія',         fr: 'Russie',            lt: 'Rusija' },
  },
  {
    tz: 'Asia/Yekaterinburg',
    city:   { en: 'Yekaterinburg',  ru: 'Екатеринбург',  uk: 'Єкатеринбург',  fr: 'Iekaterinbourg',    lt: 'Jekaterinburgas' },
    region: { en: 'Russia — Urals', ru: 'Россия — Урал', uk: 'Росія — Урал',  fr: 'Russie — Oural',   lt: 'Rusija — Uralas' },
  },
  {
    tz: 'Asia/Novosibirsk',
    city:   { en: 'Novosibirsk',    ru: 'Новосибирск',   uk: 'Новосибірськ',  fr: 'Novossibirsk',      lt: 'Novosibirskas' },
    region: { en: 'Russia — Siberia', ru: 'Россия — Сибирь', uk: 'Росія — Сибір', fr: 'Russie — Sibérie', lt: 'Rusija — Sibiras' },
  },
  {
    tz: 'Asia/Vladivostok',
    city:   { en: 'Vladivostok',    ru: 'Владивосток',   uk: 'Владивосток',   fr: 'Vladivostok',       lt: 'Vladivostokas' },
    region: { en: 'Russia — Far East', ru: 'Россия — Дальний Восток', uk: 'Росія — Далекий Схід', fr: 'Russie — Extrême-Orient', lt: 'Rusija — Tolimieji Rytai' },
  },
  {
    tz: 'Europe/Istanbul',
    city:   { en: 'Istanbul',       ru: 'Стамбул',       uk: 'Стамбул',       fr: 'Istanbul',          lt: 'Stambulas' },
    region: { en: 'Turkey',         ru: 'Турция',        uk: 'Туреччина',     fr: 'Turquie',           lt: 'Turkija' },
  },

  // ── Africa / Middle East ─────────────────────────────────────────────────────
  {
    tz: 'Africa/Cairo',
    city:   { en: 'Cairo',          ru: 'Каир',          uk: 'Каїр',          fr: 'Le Caire',          lt: 'Kairas' },
    region: { en: 'Egypt',          ru: 'Египет',        uk: 'Єгипет',        fr: 'Égypte',            lt: 'Egiptas' },
  },
  {
    tz: 'Africa/Nairobi',
    city:   { en: 'Nairobi',        ru: 'Найроби',       uk: 'Найробі',       fr: 'Nairobi',           lt: 'Nairobi' },
    region: { en: 'Kenya',          ru: 'Кения',         uk: 'Кенія',         fr: 'Kenya',             lt: 'Kenija' },
  },
  {
    tz: 'Africa/Johannesburg',
    city:   { en: 'Johannesburg',   ru: 'Йоханнесбург',  uk: 'Йоганнесбург',  fr: 'Johannesburg',      lt: 'Johanesburgas' },
    region: { en: 'South Africa',   ru: 'ЮАР',           uk: 'ПАР',           fr: 'Afrique du Sud',    lt: 'Pietų Afrika' },
  },
  {
    tz: 'Asia/Riyadh',
    city:   { en: 'Riyadh',         ru: 'Эр-Рияд',       uk: 'Ер-Ріяд',       fr: 'Riyad',             lt: 'Rijadas' },
    region: { en: 'Saudi Arabia',   ru: 'Саудовская Аравия', uk: 'Саудівська Аравія', fr: 'Arabie saoudite', lt: 'Saudo Arabija' },
  },
  {
    tz: 'Asia/Dubai',
    city:   { en: 'Dubai',          ru: 'Дубай',         uk: 'Дубай',         fr: 'Dubaï',             lt: 'Dubajus' },
    region: { en: 'UAE',            ru: 'ОАЭ',           uk: 'ОАЕ',           fr: 'Émirats arabes',    lt: 'JAE' },
  },

  // ── Asia ─────────────────────────────────────────────────────────────────────
  {
    tz: 'Asia/Karachi',
    city:   { en: 'Karachi',        ru: 'Карачи',        uk: 'Карачі',        fr: 'Karachi',           lt: 'Karačis' },
    region: { en: 'Pakistan',       ru: 'Пакистан',      uk: 'Пакистан',      fr: 'Pakistan',          lt: 'Pakistanas' },
  },
  {
    tz: 'Asia/Kolkata',
    city:   { en: 'Mumbai',         ru: 'Мумбаи',        uk: 'Мумбаї',        fr: 'Mumbai',            lt: 'Mumbajus' },
    region: { en: 'India',          ru: 'Индия',         uk: 'Індія',         fr: 'Inde',              lt: 'Indija' },
  },
  {
    tz: 'Asia/Dhaka',
    city:   { en: 'Dhaka',          ru: 'Дакка',         uk: 'Дакка',         fr: 'Dacca',             lt: 'Daka' },
    region: { en: 'Bangladesh',     ru: 'Бангладеш',     uk: 'Бангладеш',     fr: 'Bangladesh',        lt: 'Bangladešas' },
  },
  {
    tz: 'Asia/Bangkok',
    city:   { en: 'Bangkok',        ru: 'Бангкок',       uk: 'Бангкок',       fr: 'Bangkok',           lt: 'Bankokas' },
    region: { en: 'Thailand',       ru: 'Таиланд',       uk: 'Таїланд',       fr: 'Thaïlande',         lt: 'Tailandas' },
  },
  {
    tz: 'Asia/Jakarta',
    city:   { en: 'Jakarta',        ru: 'Джакарта',      uk: 'Джакарта',      fr: 'Djakarta',          lt: 'Džakarta' },
    region: { en: 'Indonesia',      ru: 'Индонезия',     uk: 'Індонезія',     fr: 'Indonésie',         lt: 'Indonezija' },
  },
  {
    tz: 'Asia/Singapore',
    city:   { en: 'Singapore',      ru: 'Сингапур',      uk: 'Сингапур',      fr: 'Singapour',         lt: 'Singapūras' },
    region: { en: 'Singapore',      ru: 'Сингапур',      uk: 'Сингапур',      fr: 'Singapour',         lt: 'Singapūras' },
  },
  {
    tz: 'Asia/Kuala_Lumpur',
    city:   { en: 'Kuala Lumpur',   ru: 'Куала-Лумпур',  uk: 'Куала-Лумпур',  fr: 'Kuala Lumpur',      lt: 'Kuala Lumpuras' },
    region: { en: 'Malaysia',       ru: 'Малайзия',      uk: 'Малайзія',      fr: 'Malaisie',          lt: 'Malaizija' },
  },
  {
    tz: 'Asia/Shanghai',
    city:   { en: 'Shanghai',       ru: 'Шанхай',        uk: 'Шанхай',        fr: 'Shanghai',          lt: 'Šanchajus' },
    region: { en: 'China',          ru: 'Китай',         uk: 'Китай',         fr: 'Chine',             lt: 'Kinija' },
  },
  {
    tz: 'Asia/Hong_Kong',
    city:   { en: 'Hong Kong',      ru: 'Гонконг',       uk: 'Гонконг',       fr: 'Hong Kong',         lt: 'Honkongas' },
    region: { en: 'Hong Kong',      ru: 'Гонконг',       uk: 'Гонконг',       fr: 'Hong Kong',         lt: 'Honkongas' },
  },
  {
    tz: 'Asia/Taipei',
    city:   { en: 'Taipei',         ru: 'Тайбэй',        uk: 'Тайбей',        fr: 'Taipei',            lt: 'Taipėjus' },
    region: { en: 'Taiwan',         ru: 'Тайвань',       uk: 'Тайвань',       fr: 'Taïwan',            lt: 'Taivanas' },
  },
  {
    tz: 'Asia/Tokyo',
    city:   { en: 'Tokyo',          ru: 'Токио',         uk: 'Токіо',         fr: 'Tokyo',             lt: 'Tokijas' },
    region: { en: 'Japan',          ru: 'Япония',        uk: 'Японія',        fr: 'Japon',             lt: 'Japonija' },
  },
  {
    tz: 'Asia/Seoul',
    city:   { en: 'Seoul',          ru: 'Сеул',          uk: 'Сеул',          fr: 'Séoul',             lt: 'Seulas' },
    region: { en: 'South Korea',    ru: 'Южная Корея',   uk: 'Південна Корея', fr: 'Corée du Sud',     lt: 'Pietų Korėja' },
  },

  // ── Oceania ──────────────────────────────────────────────────────────────────
  {
    tz: 'Australia/Perth',
    city:   { en: 'Perth',              ru: 'Перт',              uk: 'Перт',              fr: 'Perth',             lt: 'Pertas' },
    region: { en: 'Australia — West',   ru: 'Австралия — Запад', uk: 'Австралія — Захід', fr: 'Australie — Ouest', lt: 'Australija — Vakarai' },
  },
  {
    tz: 'Australia/Sydney',
    city:   { en: 'Sydney',             ru: 'Сидней',            uk: 'Сідней',            fr: 'Sydney',            lt: 'Sidnėjus' },
    region: { en: 'Australia — East',   ru: 'Австралия — Восток', uk: 'Австралія — Схід', fr: 'Australie — Est',   lt: 'Australija — Rytai' },
  },
  {
    tz: 'Australia/Melbourne',
    city:   { en: 'Melbourne',          ru: 'Мельбурн',          uk: 'Мельбурн',          fr: 'Melbourne',         lt: 'Melburnas' },
    region: { en: 'Australia — Victoria', ru: 'Австралия — Виктория', uk: 'Австралія — Вікторія', fr: 'Australie — Victoria', lt: 'Australija — Viktorija' },
  },
  {
    tz: 'Pacific/Auckland',
    city:   { en: 'Auckland',           ru: 'Окленд',            uk: 'Окленд',            fr: 'Auckland',          lt: 'Oklendas' },
    region: { en: 'New Zealand',        ru: 'Новая Зеландия',    uk: 'Нова Зеландія',     fr: 'Nouvelle-Zélande',  lt: 'Naujoji Zelandija' },
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────────

function getLocalTz(): string {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return 'UTC'; }
}

function findClosestTz(localTz: string): string {
  return TIMEZONES.find((e) => e.tz === localTz)?.tz ?? 'UTC';
}

function getOffset(tz: string, date: Date): string {
  try {
    const parts = new Intl.DateTimeFormat('en', {
      timeZone: tz,
      timeZoneName: 'shortOffset',
    }).formatToParts(date);
    return parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
  } catch {
    return '';
  }
}

function convertTime(isoDateTime: string, fromTz: string, toTz: string): { time: string; date: string } {
  try {
    const date = new Date(isoDateTime);
    if (isNaN(date.getTime())) return { time: '--:--', date: '' };

    const time = new Intl.DateTimeFormat('en', {
      timeZone: toTz, hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(date).replace('24:', '00:');

    const dateStr = new Intl.DateTimeFormat('en', {
      timeZone: toTz, month: 'short', day: 'numeric',
    }).format(date);

    return { time, date: dateStr };
  } catch {
    return { time: '--:--', date: '' };
  }
}

function buildIso(dateStr: string, timeStr: string, tz: string): string {
  if (!dateStr || !timeStr) return '';
  try {
    const [hour, minute] = timeStr.split(':').map(Number);
    const localStr = `${dateStr}T${timeStr}:00`;
    const approxDate = new Date(localStr);
    if (isNaN(approxDate.getTime())) return '';

    const fmt = new Intl.DateTimeFormat('en', {
      timeZone: tz,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false,
    });

    let utc = approxDate.getTime();
    for (let i = 0; i < 3; i++) {
      const parts = fmt.formatToParts(new Date(utc));
      const get = (t: string) => parseInt(parts.find((p) => p.type === t)?.value ?? '0', 10);
      const localHour = get('hour') === 24 ? 0 : get('hour');
      utc += ((hour - localHour) * 60 + (minute - get('minute'))) * 60_000;
    }
    return new Date(utc).toISOString();
  } catch {
    return '';
  }
}

// ── Component ────────────────────────────────────────────────────────────────────

export default function TimezoneConverter({ locale }: { locale: string }) {
  const t = T[locale as LangKey] ?? T.en;
  const l = (locale as LangKey) in T ? (locale as LangKey) : 'en';

  const today = new Date().toISOString().split('T')[0];
  const nowTime = new Date().toTimeString().slice(0, 5);

  const [date, setDate] = useState(today);
  const [time, setTime] = useState(nowTime);
  const [sourceTz, setSourceTz] = useState('UTC');

  useEffect(() => {
    setSourceTz(findClosestTz(getLocalTz()));
  }, []);

  const isoStr = buildIso(date, time, sourceTz);
  const refDate = isoStr ? new Date(isoStr) : new Date();

  const offsets = useMemo(() => {
    const map: Record<string, string> = {};
    for (const entry of TIMEZONES) {
      map[entry.tz] = getOffset(entry.tz, refDate);
    }
    return map;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isoStr]);

  return (
    <div className={styles['tz-widget']}>
      <div className={styles['tz-widget__form']}>

        <div className={styles['tz-widget__row']}>
          <div className={styles['tz-widget__field']}>
            <label className={styles['tz-widget__label']} htmlFor="tz-date">{t.dateLabel}</label>
            <input
              id="tz-date"
              className={styles['tz-widget__input']}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className={styles['tz-widget__field']}>
            <label className={styles['tz-widget__label']} htmlFor="tz-time">{t.timeLabel}</label>
            <input
              id="tz-time"
              className={styles['tz-widget__input']}
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div className={styles['tz-widget__field']}>
          <label className={styles['tz-widget__label']} htmlFor="tz-source">{t.sourceLabel}</label>
          <select
            id="tz-source"
            className={styles['tz-widget__select']}
            value={sourceTz}
            onChange={(e) => setSourceTz(e.target.value)}
          >
            {TIMEZONES.map((entry) => (
              <option key={entry.tz} value={entry.tz}>
                {entry.city[l]} — {entry.region[l]}
                {offsets[entry.tz] ? `  (${offsets[entry.tz]})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles['tz-widget__results']}>
        <p className={styles['tz-widget__results-title']}>{t.resultsTitle}</p>
        <div className={styles['tz-widget__list']}>
          {TIMEZONES.map((entry) => {
            const isSource = entry.tz === sourceTz;
            const converted = convertTime(isoStr || refDate.toISOString(), sourceTz, entry.tz);
            const offset = offsets[entry.tz] ?? '';
            return (
              <div
                key={entry.tz}
                className={`${styles['tz-widget__item']} ${isSource ? styles['tz-widget__item--source'] : ''}`}
              >
                <div className={styles['tz-widget__item-left']}>
                  <span className={styles['tz-widget__item-city']}>
                    {entry.city[l]}
                    {isSource && (
                      <span className={styles['tz-widget__item-source-tag']}>({t.sourceTag})</span>
                    )}
                  </span>
                  <span className={styles['tz-widget__item-meta']}>
                    {entry.region[l]}
                    {offset && <span className={styles['tz-widget__item-offset']}>{offset}</span>}
                  </span>
                </div>
                <div className={styles['tz-widget__item-right']}>
                  <span className={styles['tz-widget__item-time']}>{converted.time}</span>
                  <span className={styles['tz-widget__item-date']}>{converted.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

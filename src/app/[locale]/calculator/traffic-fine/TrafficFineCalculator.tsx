'use client';

import { useState } from 'react';
import styles from './TrafficFineCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';
type SuspKey = '1m' | '1_3m' | '3m' | '3_6m' | '3_12m' | '6m' | '6_24m' | '6_36m' | '1_2y' | '1h_2y' | '3y_pos' | 'possible';

const T: Record<LangKey, {
  country: string; violation: string;
  fineRange: string; points: string; suspension: string; note: string;
  pickCountry: string; pickViolation: string;
  currency: string; noPoints: string; noSuspension: string;
  disclaimer: string;
}> = {
  en: {
    country: 'Country', violation: 'Violation type',
    fineRange: 'Fine range', points: 'Penalty points', suspension: 'License suspension',
    note: 'Note', pickCountry: 'Select country', pickViolation: 'Select violation',
    currency: 'Currency', noPoints: 'No points', noSuspension: 'No',
    disclaimer: 'Fines shown are indicative ranges based on typical penalties. Actual fines may vary by region, prior offences, and court decisions. Always consult official sources.',
  },
  ru: {
    country: 'Страна', violation: 'Тип нарушения',
    fineRange: 'Размер штрафа', points: 'Штрафные баллы', suspension: 'Лишение прав',
    note: 'Примечание', pickCountry: 'Выберите страну', pickViolation: 'Выберите нарушение',
    currency: 'Валюта', noPoints: 'Нет', noSuspension: 'Нет',
    disclaimer: 'Указанные штрафы — ориентировочные диапазоны. Реальный размер зависит от региона, наличия предыдущих нарушений и решения суда. Уточняйте актуальные данные в официальных источниках.',
  },
  uk: {
    country: 'Країна', violation: 'Тип порушення',
    fineRange: 'Розмір штрафу', points: 'Штрафні бали', suspension: 'Позбавлення прав',
    note: 'Примітка', pickCountry: 'Оберіть країну', pickViolation: 'Оберіть порушення',
    currency: 'Валюта', noPoints: 'Немає', noSuspension: 'Ні',
    disclaimer: 'Вказані штрафи — орієнтовні діапазони. Реальний розмір залежить від регіону, попередніх порушень та рішення суду.',
  },
  fr: {
    country: 'Pays', violation: 'Type d\'infraction',
    fineRange: 'Montant de l\'amende', points: 'Points de pénalité', suspension: 'Suspension du permis',
    note: 'Note', pickCountry: 'Sélectionnez un pays', pickViolation: 'Sélectionnez une infraction',
    currency: 'Devise', noPoints: 'Aucun', noSuspension: 'Non',
    disclaimer: 'Les amendes indiquées sont des fourchettes indicatives basées sur les pénalités typiques. Les montants réels peuvent varier selon la région et les circonstances.',
  },
  lt: {
    country: 'Šalis', violation: 'Pažeidimo tipas',
    fineRange: 'Baudos dydis', points: 'Baudos taškai', suspension: 'Vairuotojo teisių atėmimas',
    note: 'Pastaba', pickCountry: 'Pasirinkite šalį', pickViolation: 'Pasirinkite pažeidimą',
    currency: 'Valiuta', noPoints: 'Nėra', noSuspension: 'Ne',
    disclaimer: 'Nurodytos baudos yra orientaciniai diapazonai. Tikrasis dydis gali skirtis priklausomai nuo regiono ir aplinkybių.',
  },
};

const SUSP: Record<LangKey, Record<SuspKey, string>> = {
  en: {
    '1m': '1 month', '1_3m': '1–3 months', '3m': '3 months', '3_6m': '3–6 months',
    '3_12m': '3–12 months', '6m': '6 months', '6_24m': '6–24 months', '6_36m': '6–36 months',
    '1_2y': '1–2 years', '1h_2y': '1.5–2 years', '3y_pos': 'Up to 3 years', 'possible': 'Possible',
  },
  ru: {
    '1m': '1 месяц', '1_3m': '1–3 месяца', '3m': '3 месяца', '3_6m': '3–6 месяцев',
    '3_12m': '3–12 месяцев', '6m': '6 месяцев', '6_24m': '6–24 месяца', '6_36m': '6–36 месяцев',
    '1_2y': '1–2 года', '1h_2y': '1,5–2 года', '3y_pos': 'До 3 лет', 'possible': 'Возможно',
  },
  uk: {
    '1m': '1 місяць', '1_3m': '1–3 місяці', '3m': '3 місяці', '3_6m': '3–6 місяців',
    '3_12m': '3–12 місяців', '6m': '6 місяців', '6_24m': '6–24 місяці', '6_36m': '6–36 місяців',
    '1_2y': '1–2 роки', '1h_2y': '1,5–2 роки', '3y_pos': 'До 3 років', 'possible': 'Можливо',
  },
  fr: {
    '1m': '1 mois', '1_3m': '1–3 mois', '3m': '3 mois', '3_6m': '3–6 mois',
    '3_12m': '3–12 mois', '6m': '6 mois', '6_24m': '6–24 mois', '6_36m': '6–36 mois',
    '1_2y': '1–2 ans', '1h_2y': '1,5–2 ans', '3y_pos': "Jusqu'à 3 ans", 'possible': 'Possible',
  },
  lt: {
    '1m': '1 mėnesis', '1_3m': '1–3 mėnesiai', '3m': '3 mėnesiai', '3_6m': '3–6 mėnesiai',
    '3_12m': '3–12 mėnesių', '6m': '6 mėnesiai', '6_24m': '6–24 mėnesiai', '6_36m': '6–36 mėnesių',
    '1_2y': '1–2 metai', '1h_2y': '1,5–2 metai', '3y_pos': 'Iki 3 metų', 'possible': 'Galima',
  },
};

type Violation = {
  key: string;
  labels: Record<LangKey, string>;
  fine: string;
  points: string | null;
  suspension: SuspKey | null;
  note: Record<LangKey, string> | null;
};

type Country = {
  code: string;
  labels: Record<LangKey, string>;
  currency: string;
  violations: Violation[];
};

const COUNTRIES: Country[] = [
  {
    code: 'de', labels: { en: 'Germany', ru: 'Германия', uk: 'Німеччина', fr: 'Allemagne', lt: 'Vokietija' }, currency: 'EUR',
    violations: [
      { key: 'speed_10', labels: { en: 'Speeding 1–10 km/h over limit', ru: 'Превышение на 1–10 км/ч', uk: 'Перевищення на 1–10 км/год', fr: 'Excès de vitesse 1–10 km/h', lt: 'Greičio viršijimas 1–10 km/h' }, fine: '10–30 €', points: null, suspension: null, note: null },
      { key: 'speed_20', labels: { en: 'Speeding 11–20 km/h over limit', ru: 'Превышение на 11–20 км/ч', uk: 'Перевищення на 11–20 км/год', fr: 'Excès de vitesse 11–20 km/h', lt: 'Greičio viršijimas 11–20 km/h' }, fine: '35–70 €', points: '1', suspension: null, note: null },
      { key: 'speed_30', labels: { en: 'Speeding 21–30 km/h over limit', ru: 'Превышение на 21–30 км/ч', uk: 'Перевищення на 21–30 км/год', fr: 'Excès de vitesse 21–30 km/h', lt: 'Greičio viršijimas 21–30 km/h' }, fine: '80–160 €', points: '1', suspension: null, note: null },
      { key: 'speed_40', labels: { en: 'Speeding 31–40 km/h over limit', ru: 'Превышение на 31–40 км/ч', uk: 'Перевищення на 31–40 км/год', fr: 'Excès de vitesse 31–40 km/h', lt: 'Greičio viršijimas 31–40 km/h' }, fine: '120–280 €', points: '2', suspension: '1m', note: null },
      { key: 'redlight', labels: { en: 'Running a red light', ru: 'Проезд на красный свет', uk: 'Проїзд на червоне світло', fr: 'Griller un feu rouge', lt: 'Važiavimas raudoną šviesą' }, fine: '90–200 €', points: '2', suspension: '1m', note: null },
      { key: 'phone', labels: { en: 'Using phone while driving', ru: 'Использование телефона за рулём', uk: 'Використання телефону за кермом', fr: 'Utilisation du téléphone au volant', lt: 'Telefono naudojimas vairuojant' }, fine: '100 €', points: '1', suspension: null, note: null },
      { key: 'seatbelt', labels: { en: 'No seatbelt', ru: 'Непристёгнутый ремень', uk: 'Незастебнутий ремінь', fr: 'Ceinture de sécurité non bouclée', lt: 'Nesegamas saugos diržas' }, fine: '30 €', points: null, suspension: null, note: null },
      { key: 'drunk', labels: { en: 'Drunk driving (0.5–1.09‰)', ru: 'Вождение в нетрезвом виде (0,5–1,09‰)', uk: 'Водіння в нетверезому стані (0,5–1,09‰)', fr: 'Conduite en état d\'ivresse (0,5–1,09‰)', lt: 'Vairavimas girtu (0,5–1,09‰)' }, fine: '500–1500 €', points: '3', suspension: '1_3m',
        note: { en: 'Criminal charges possible above 1.6‰', ru: 'При содержании выше 1,6‰ — уголовная ответственность', uk: 'При вмісті вище 1,6‰ — кримінальна відповідальність', fr: 'Des poursuites pénales sont possibles au-dessus de 1,6‰', lt: 'Esant daugiau nei 1,6‰ galimas baudžiamasis persekiojimas' } },
    ],
  },
  {
    code: 'fr', labels: { en: 'France', ru: 'Франция', uk: 'Франція', fr: 'France', lt: 'Prancūzija' }, currency: 'EUR',
    violations: [
      { key: 'speed_20', labels: { en: 'Speeding up to 20 km/h', ru: 'Превышение до 20 км/ч', uk: 'Перевищення до 20 км/год', fr: 'Excès de vitesse jusqu\'à 20 km/h', lt: 'Greičio viršijimas iki 20 km/h' }, fine: '68–135 €', points: '1', suspension: null, note: null },
      { key: 'speed_30', labels: { en: 'Speeding 20–30 km/h', ru: 'Превышение 20–30 км/ч', uk: 'Перевищення 20–30 км/год', fr: 'Excès de vitesse 20–30 km/h', lt: 'Greičio viršijimas 20–30 km/h' }, fine: '135 €', points: '2', suspension: null, note: null },
      { key: 'speed_50', labels: { en: 'Speeding 30–50 km/h', ru: 'Превышение 30–50 км/ч', uk: 'Перевищення 30–50 км/год', fr: 'Excès de vitesse 30–50 km/h', lt: 'Greičio viršijimas 30–50 km/h' }, fine: '135–375 €', points: '3–4', suspension: '3y_pos', note: null },
      { key: 'redlight', labels: { en: 'Running a red light', ru: 'Проезд на красный свет', uk: 'Проїзд на червоне світло', fr: 'Griller un feu rouge', lt: 'Važiavimas raudoną šviesą' }, fine: '135 €', points: '4', suspension: null, note: null },
      { key: 'phone', labels: { en: 'Using phone while driving', ru: 'Телефон за рулём', uk: 'Телефон за кермом', fr: 'Téléphone au volant', lt: 'Telefonas vairuojant' }, fine: '135 €', points: '3', suspension: null, note: null },
      { key: 'seatbelt', labels: { en: 'No seatbelt', ru: 'Ремень безопасности', uk: 'Ремінь безпеки', fr: 'Ceinture de sécurité', lt: 'Saugos diržas' }, fine: '135 €', points: '3', suspension: null, note: null },
      { key: 'drunk', labels: { en: 'Drunk driving (0.5–0.79‰)', ru: 'Алкоголь за рулём (0,5–0,79‰)', uk: 'Алкоголь за кермом (0,5–0,79‰)', fr: 'Alcool au volant (0,5–0,79‰)', lt: 'Alkoholis vairuojant (0,5–0,79‰)' }, fine: '135–750 €', points: '6', suspension: '3y_pos', note: null },
    ],
  },
  {
    code: 'pl', labels: { en: 'Poland', ru: 'Польша', uk: 'Польща', fr: 'Pologne', lt: 'Lenkija' }, currency: 'PLN',
    violations: [
      { key: 'speed_10', labels: { en: 'Speeding up to 10 km/h', ru: 'Превышение до 10 км/ч', uk: 'Перевищення до 10 км/год', fr: 'Excès de vitesse jusqu\'à 10 km/h', lt: 'Greičio viršijimas iki 10 km/h' }, fine: '50 PLN', points: null, suspension: null, note: null },
      { key: 'speed_30', labels: { en: 'Speeding 11–30 km/h', ru: 'Превышение 11–30 км/ч', uk: 'Перевищення 11–30 км/год', fr: 'Excès de vitesse 11–30 km/h', lt: 'Greičio viršijimas 11–30 km/h' }, fine: '100–200 PLN', points: '2–4', suspension: null, note: null },
      { key: 'speed_50', labels: { en: 'Speeding 31–50 km/h', ru: 'Превышение 31–50 км/ч', uk: 'Перевищення 31–50 км/год', fr: 'Excès de vitesse 31–50 km/h', lt: 'Greičio viršijimas 31–50 km/h' }, fine: '300–800 PLN', points: '6–8', suspension: null, note: null },
      { key: 'speed_50plus', labels: { en: 'Speeding 50+ km/h over limit', ru: 'Превышение 50+ км/ч', uk: 'Перевищення 50+ км/год', fr: 'Excès de vitesse 50+ km/h', lt: 'Greičio viršijimas 50+ km/h' }, fine: '1000–2500 PLN', points: '10–15', suspension: '3m', note: null },
      { key: 'redlight', labels: { en: 'Running a red light', ru: 'Проезд на красный', uk: 'Проїзд на червоне', fr: 'Feu rouge grillé', lt: 'Raudonas signalas' }, fine: '500 PLN', points: '6', suspension: null, note: null },
      { key: 'drunk', labels: { en: 'Drunk driving (≥0.2‰)', ru: 'Нетрезвое вождение (≥0,2‰)', uk: 'Нетверезе водіння (≥0,2‰)', fr: 'Alcool au volant (≥0,2‰)', lt: 'Neblaivus vairavimas (≥0,2‰)' }, fine: '2500–5000 PLN', points: '10', suspension: '6_36m', note: null },
    ],
  },
  {
    code: 'lt', labels: { en: 'Lithuania', ru: 'Литва', uk: 'Литва', fr: 'Lituanie', lt: 'Lietuva' }, currency: 'EUR',
    violations: [
      { key: 'speed_10', labels: { en: 'Speeding 1–10 km/h', ru: 'Превышение 1–10 км/ч', uk: 'Перевищення 1–10 км/год', fr: 'Excès de vitesse 1–10 km/h', lt: 'Greičio viršijimas 1–10 km/h' }, fine: '20–40 €', points: null, suspension: null, note: null },
      { key: 'speed_20', labels: { en: 'Speeding 11–20 km/h', ru: 'Превышение 11–20 км/ч', uk: 'Перевищення 11–20 км/год', fr: 'Excès de vitesse 11–20 km/h', lt: 'Greičio viršijimas 11–20 km/h' }, fine: '40–100 €', points: null, suspension: null, note: null },
      { key: 'speed_30', labels: { en: 'Speeding 21–30 km/h', ru: 'Превышение 21–30 км/ч', uk: 'Перевищення 21–30 км/год', fr: 'Excès de vitesse 21–30 km/h', lt: 'Greičio viršijimas 21–30 km/h' }, fine: '80–200 €', points: null, suspension: null, note: null },
      { key: 'speed_40plus', labels: { en: 'Speeding 30+ km/h over limit', ru: 'Превышение 30+ км/ч', uk: 'Перевищення 30+ км/год', fr: 'Excès de vitesse 30+ km/h', lt: 'Greičio viršijimas 30+ km/h' }, fine: '150–400 €', points: null, suspension: '3_12m', note: null },
      { key: 'redlight', labels: { en: 'Running a red light', ru: 'Красный свет', uk: 'Червоне світло', fr: 'Feu rouge', lt: 'Raudonas signalas' }, fine: '100–300 €', points: null, suspension: null, note: null },
      { key: 'phone', labels: { en: 'Phone while driving', ru: 'Телефон за рулём', uk: 'Телефон за кермом', fr: 'Téléphone au volant', lt: 'Telefonas vairuojant' }, fine: '50–100 €', points: null, suspension: null, note: null },
      { key: 'drunk', labels: { en: 'Drunk driving (≥0.4‰)', ru: 'Нетрезвое вождение (≥0,4‰)', uk: 'Нетверезе водіння (≥0,4‰)', fr: 'Alcool au volant (≥0,4‰)', lt: 'Neblaivus vairavimas (≥0,4‰)' }, fine: '300–700 €', points: null, suspension: '6_24m', note: null },
    ],
  },
  {
    code: 'ua', labels: { en: 'Ukraine', ru: 'Украина', uk: 'Україна', fr: 'Ukraine', lt: 'Ukraina' }, currency: 'UAH',
    violations: [
      { key: 'speed_20', labels: { en: 'Speeding up to 20 km/h', ru: 'Превышение до 20 км/ч', uk: 'Перевищення до 20 км/год', fr: 'Excès de vitesse jusqu\'à 20 km/h', lt: 'Greičio viršijimas iki 20 km/h' }, fine: '425–850 UAH', points: null, suspension: null, note: null },
      { key: 'speed_50', labels: { en: 'Speeding 21–50 km/h', ru: 'Превышение 21–50 км/ч', uk: 'Перевищення 21–50 км/год', fr: 'Excès de vitesse 21–50 km/h', lt: 'Greičio viršijimas 21–50 km/h' }, fine: '850–1700 UAH', points: null, suspension: null, note: null },
      { key: 'speed_50plus', labels: { en: 'Speeding 50+ km/h over limit', ru: 'Превышение 50+ км/ч', uk: 'Перевищення 50+ км/год', fr: 'Excès de vitesse 50+ km/h', lt: 'Greičio viršijimas 50+ km/h' }, fine: '1700–5100 UAH', points: null, suspension: '6m', note: null },
      { key: 'redlight', labels: { en: 'Running a red light', ru: 'Проезд на красный свет', uk: 'Проїзд на червоне світло', fr: 'Griller un feu rouge', lt: 'Raudonas signalas' }, fine: '850 UAH', points: null, suspension: null, note: null },
      { key: 'drunk', labels: { en: 'Drunk driving', ru: 'Нетрезвое вождение', uk: 'Нетверезе водіння', fr: 'Conduite en état d\'ivresse', lt: 'Neblaivus vairavimas' }, fine: '10200–17000 UAH', points: null, suspension: '1_2y',
        note: { en: 'Criminal liability for repeat offenders', ru: 'Повторное нарушение — уголовная ответственность', uk: 'Повторне порушення — кримінальна відповідальність', fr: 'Responsabilité pénale en cas de récidive', lt: 'Pakartotinis pažeidimas – baudžiamoji atsakomybė' } },
    ],
  },
  {
    code: 'ru', labels: { en: 'Russia', ru: 'Россия', uk: 'Росія', fr: 'Russie', lt: 'Rusija' }, currency: 'RUB',
    violations: [
      { key: 'speed_20', labels: { en: 'Speeding up to 20 km/h', ru: 'Превышение до 20 км/ч', uk: 'Перевищення до 20 км/год', fr: 'Excès jusqu\'à 20 km/h', lt: 'Greičio viršijimas iki 20 km/h' }, fine: '500 ₽', points: null, suspension: null,
        note: { en: 'Warning or 500 ₽ fine at officer\'s discretion', ru: 'Предупреждение или штраф 500 ₽ на усмотрение инспектора', uk: 'Попередження або штраф 500 ₽ на розсуд інспектора', fr: 'Avertissement ou amende 500 ₽ à la discrétion de l\'agent', lt: 'Įspėjimas arba 500 ₽ bauda pareigūno nuožiūra' } },
      { key: 'speed_40', labels: { en: 'Speeding 20–40 km/h', ru: 'Превышение 20–40 км/ч', uk: 'Перевищення 20–40 км/год', fr: 'Excès 20–40 km/h', lt: 'Greičio viršijimas 20–40 km/h' }, fine: '500–1000 ₽', points: null, suspension: null, note: null },
      { key: 'speed_60', labels: { en: 'Speeding 40–60 km/h', ru: 'Превышение 40–60 км/ч', uk: 'Перевищення 40–60 км/год', fr: 'Excès 40–60 km/h', lt: 'Greičio viršijimas 40–60 km/h' }, fine: '1000–2500 ₽', points: null, suspension: null, note: null },
      { key: 'speed_80', labels: { en: 'Speeding 60–80 km/h', ru: 'Превышение 60–80 км/ч', uk: 'Перевищення 60–80 км/год', fr: 'Excès 60–80 km/h', lt: 'Greičio viršijimas 60–80 km/h' }, fine: '2000–5000 ₽', points: null, suspension: '3_6m', note: null },
      { key: 'redlight', labels: { en: 'Running a red light', ru: 'Проезд на красный', uk: 'Проїзд на червоне', fr: 'Feu rouge grillé', lt: 'Raudonas signalas' }, fine: '1000 ₽', points: null, suspension: null, note: null },
      { key: 'drunk', labels: { en: 'Drunk driving', ru: 'Нетрезвое вождение', uk: 'Нетверезе водіння', fr: 'Ivresse au volant', lt: 'Neblaivus vairavimas' }, fine: '30000 ₽', points: null, suspension: '1h_2y', note: null },
    ],
  },
  {
    code: 'us', labels: { en: 'USA', ru: 'США', uk: 'США', fr: 'États-Unis', lt: 'JAV' }, currency: 'USD',
    violations: [
      { key: 'speed_10', labels: { en: 'Speeding 1–10 mph over limit', ru: 'Превышение на 1–10 миль/ч', uk: 'Перевищення на 1–10 миль/год', fr: 'Excès 1–10 mph', lt: 'Greičio viršijimas 1–10 mph' }, fine: '$100–150', points: '1–2', suspension: null, note: null },
      { key: 'speed_25', labels: { en: 'Speeding 11–25 mph over limit', ru: 'Превышение на 11–25 миль/ч', uk: 'Перевищення на 11–25 миль/год', fr: 'Excès 11–25 mph', lt: 'Greičio viršijimas 11–25 mph' }, fine: '$150–300', points: '2–4', suspension: null, note: null },
      { key: 'speed_25plus', labels: { en: 'Speeding 25+ mph over limit', ru: 'Превышение на 25+ миль/ч', uk: 'Перевищення на 25+ миль/год', fr: 'Excès 25+ mph', lt: 'Greičio viršijimas 25+ mph' }, fine: '$300–1000', points: '4–6', suspension: 'possible',
        note: { en: 'Reckless driving charge possible', ru: 'Возможно обвинение в опасном вождении', uk: 'Можливе звинувачення у небезпечному водінні', fr: 'Accusation possible de conduite imprudente', lt: 'Galimas kaltinimas pavojingu vairavimu' } },
      { key: 'redlight', labels: { en: 'Running a red light', ru: 'Проезд на красный свет', uk: 'Проїзд на червоне світло', fr: 'Feu rouge', lt: 'Raudonas signalas' }, fine: '$100–500', points: '1–3', suspension: null, note: null },
      { key: 'drunk', labels: { en: 'DUI (first offence)', ru: 'DUI (первое нарушение)', uk: 'DUI (перше порушення)', fr: 'Conduite sous influence (1ère infraction)', lt: 'DUI (pirmas pažeidimas)' }, fine: '$500–2000', points: null, suspension: '3_12m',
        note: { en: 'Varies greatly by state. May include jail time.', ru: 'Сильно варьируется по штатам. Возможное заключение.', uk: 'Суттєво відрізняється по штатах. Можливе ув\'язнення.', fr: 'Varie beaucoup selon l\'État. Emprisonnement possible.', lt: 'Labai skiriasi priklausomai nuo valstijos.' } },
    ],
  },
];

export default function TrafficFineCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [countryCode, setCountryCode] = useState('');
  const [violationKey, setViolationKey] = useState('');

  const country = COUNTRIES.find(c => c.code === countryCode) ?? null;
  const violation = country?.violations.find(v => v.key === violationKey) ?? null;

  const handleCountry = (code: string) => { setCountryCode(code); setViolationKey(''); };

  return (
    <div className={styles['tf-calc']}>
      <div className={styles['tf-calc__selects']}>
        <div className={styles['tf-calc__field']}>
          <label className={styles['tf-calc__label']}>{t.country}</label>
          <select className={styles['tf-calc__select']} value={countryCode} onChange={e => handleCountry(e.target.value)}>
            <option value="">{t.pickCountry}</option>
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.code}>{c.labels[lang]}</option>
            ))}
          </select>
        </div>

        <div className={styles['tf-calc__field']}>
          <label className={styles['tf-calc__label']}>{t.violation}</label>
          <select className={styles['tf-calc__select']} value={violationKey} onChange={e => setViolationKey(e.target.value)} disabled={!country}>
            <option value="">{t.pickViolation}</option>
            {country?.violations.map(v => (
              <option key={v.key} value={v.key}>{v.labels[lang]}</option>
            ))}
          </select>
        </div>
      </div>

      {violation && (
        <div className={styles['tf-calc__result']}>
          <div className={styles['tf-calc__result-grid']}>
            <div className={styles['tf-calc__result-item']}>
              <span className={styles['tf-calc__result-label']}>{t.fineRange}</span>
              <span className={styles['tf-calc__result-value']}>{violation.fine}</span>
            </div>
            <div className={styles['tf-calc__result-item']}>
              <span className={styles['tf-calc__result-label']}>{t.points}</span>
              <span className={styles['tf-calc__result-value']}>{violation.points ?? t.noPoints}</span>
            </div>
            <div className={styles['tf-calc__result-item']}>
              <span className={styles['tf-calc__result-label']}>{t.suspension}</span>
              <span className={styles['tf-calc__result-value']}>
                {violation.suspension ? SUSP[lang][violation.suspension] : t.noSuspension}
              </span>
            </div>
          </div>
          {violation.note && (
            <p className={styles['tf-calc__note']}>
              <strong>{t.note}:</strong> {violation.note[lang]}
            </p>
          )}
        </div>
      )}

      <p className={styles['tf-calc__disclaimer']}>{t.disclaimer}</p>
    </div>
  );
}

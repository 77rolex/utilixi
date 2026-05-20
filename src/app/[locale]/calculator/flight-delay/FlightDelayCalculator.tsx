'use client';

import { useState } from 'react';
import styles from './FlightDelayCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  routeType: string; delay: string; distance: string;
  calculate: string; reset: string;
  eligible: string; notEligible: string; compensation: string;
  basis: string; notes: string;
  routeEuEu: string; routeEuOut: string; routeOutEu: string; routeOutOut: string;
  delay2: string; delay3: string; delay4: string;
  distShort: string; distMedium: string; distLong: string;
  errSelect: string;
}> = {
  en: {
    routeType: 'Route type', delay: 'Delay duration', distance: 'Flight distance',
    calculate: 'Check compensation', reset: 'Reset',
    eligible: 'You may be eligible for compensation', notEligible: 'Not eligible under EU261',
    compensation: 'Compensation amount', basis: 'Legal basis', notes: 'Important notes',
    routeEuEu: 'Within EU (any airline)', routeEuOut: 'EU departure → outside EU (any airline)', routeOutEu: 'Outside EU → EU (EU airline only)', routeOutOut: 'Outside EU (non-EU airline)',
    delay2: '2–3 hours', delay3: '3–4 hours', delay4: '4+ hours or cancellation',
    distShort: 'Up to 1500 km', distMedium: '1500–3500 km', distLong: 'Over 3500 km',
    errSelect: 'Please fill in all fields.',
  },
  ru: {
    routeType: 'Тип маршрута', delay: 'Задержка рейса', distance: 'Дальность рейса',
    calculate: 'Проверить компенсацию', reset: 'Сбросить',
    eligible: 'Вы можете претендовать на компенсацию', notEligible: 'Компенсация по EU261 не применяется',
    compensation: 'Сумма компенсации', basis: 'Правовое основание', notes: 'Важные примечания',
    routeEuEu: 'Внутри ЕС (любая авиакомпания)', routeEuOut: 'Из ЕС за пределы (любая авиакомпания)', routeOutEu: 'Из-за пределов ЕС в ЕС (только авиакомпания ЕС)', routeOutOut: 'За пределами ЕС (не-ЕС авиакомпания)',
    delay2: '2–3 часа', delay3: '3–4 часа', delay4: '4+ часа или отмена',
    distShort: 'До 1500 км', distMedium: '1500–3500 км', distLong: 'Более 3500 км',
    errSelect: 'Пожалуйста, заполните все поля.',
  },
  uk: {
    routeType: 'Тип маршруту', delay: 'Затримка рейсу', distance: 'Дальність рейсу',
    calculate: 'Перевірити компенсацію', reset: 'Скинути',
    eligible: 'Ви можете претендувати на компенсацію', notEligible: 'Компенсація за EU261 не застосовується',
    compensation: 'Сума компенсації', basis: 'Правова підстава', notes: 'Важливі примітки',
    routeEuEu: 'Всередині ЄС (будь-яка авіакомпанія)', routeEuOut: 'З ЄС за межі (будь-яка авіакомпанія)', routeOutEu: 'З-за меж ЄС до ЄС (тільки авіакомпанія ЄС)', routeOutOut: 'За межами ЄС (не-ЄС авіакомпанія)',
    delay2: '2–3 години', delay3: '3–4 години', delay4: '4+ години або скасування',
    distShort: 'До 1500 км', distMedium: '1500–3500 км', distLong: 'Більше 3500 км',
    errSelect: 'Будь ласка, заповніть всі поля.',
  },
  fr: {
    routeType: 'Type de trajet', delay: 'Durée du retard', distance: 'Distance du vol',
    calculate: 'Vérifier l\'indemnisation', reset: 'Réinitialiser',
    eligible: 'Vous pouvez prétendre à une indemnisation', notEligible: 'Non éligible au titre du règlement EU261',
    compensation: 'Montant de l\'indemnisation', basis: 'Base juridique', notes: 'Remarques importantes',
    routeEuEu: 'Au sein de l\'UE (toute compagnie)', routeEuOut: 'Départ UE vers hors UE (toute compagnie)', routeOutEu: 'Hors UE vers UE (compagnie UE uniquement)', routeOutOut: 'Hors UE (compagnie non UE)',
    delay2: '2–3 heures', delay3: '3–4 heures', delay4: '4h+ ou annulation',
    distShort: 'Jusqu\'à 1500 km', distMedium: '1500–3500 km', distLong: 'Plus de 3500 km',
    errSelect: 'Veuillez remplir tous les champs.',
  },
  lt: {
    routeType: 'Maršruto tipas', delay: 'Vėlavimo trukmė', distance: 'Skrydžio atstumas',
    calculate: 'Patikrinti kompensaciją', reset: 'Atstatyti',
    eligible: 'Galite pretenduoti į kompensaciją', notEligible: 'EU261 kompensacija netaikoma',
    compensation: 'Kompensacijos suma', basis: 'Teisinis pagrindas', notes: 'Svarbios pastabos',
    routeEuEu: 'ES viduje (bet kuri aviakompanija)', routeEuOut: 'Iš ES į ne ES (bet kuri aviakompanija)', routeOutEu: 'Iš ne ES į ES (tik ES aviakompanija)', routeOutOut: 'Ne ES (ne ES aviakompanija)',
    delay2: '2–3 valandos', delay3: '3–4 valandos', delay4: '4+ valandos arba atšaukimas',
    distShort: 'Iki 1500 km', distMedium: '1500–3500 km', distLong: 'Daugiau nei 3500 km',
    errSelect: 'Užpildykite visus laukus.',
  },
};

type RouteType = 'eu-eu' | 'eu-out' | 'out-eu' | 'out-out';
type DelayType = '2h' | '3h' | '4h';
type DistType = 'short' | 'medium' | 'long';

type Result = {
  eligible: boolean;
  amount: string;
  basis: string;
  notes: Record<LangKey, string[]>;
};

function calcCompensation(route: RouteType, delay: DelayType, dist: DistType): Result {
  if (route === 'out-out') {
    return {
      eligible: false, amount: '—', basis: 'EU261/2004',
      notes: {
        en: ['EU Regulation 261/2004 does not apply to flights operated by non-EU airlines departing from outside the EU.', 'Check the airline\'s own conditions of carriage or your travel insurance.'],
        ru: ['Регламент ЕС 261/2004 не применяется к рейсам не-ЕС авиакомпаний, вылетающих из-за пределов ЕС.', 'Проверьте условия перевозки авиакомпании или вашу страховку.'],
        uk: ['Регламент ЄС 261/2004 не застосовується до рейсів не-ЄС авіакомпаній, що вилітають за межі ЄС.', 'Перевірте умови перевезення авіакомпанії або вашу страховку.'],
        fr: ['Le règlement UE 261/2004 ne s\'applique pas aux vols exploités par des compagnies non européennes au départ de pays hors UE.', 'Consultez les conditions de transport de la compagnie ou votre assurance voyage.'],
        lt: ['ES reglamentas 261/2004 netaikomas ne ES aviakompanijų skrydžiams, išvykstantiems iš ne ES šalių.', 'Patikrinkite aviakompanijos vežimo sąlygas arba savo kelionių draudimą.'],
      },
    };
  }

  if (delay === '2h') {
    return {
      eligible: false, amount: '—', basis: 'EU261/2004',
      notes: {
        en: ['For delays under 3 hours at destination, EU261 compensation does not apply.', 'The airline must provide care (meals/refreshments) for delays over 2 hours.'],
        ru: ['При задержке менее 3 часов в пункте назначения компенсация по EU261 не положена.', 'При задержке более 2 часов авиакомпания обязана предоставить питание и напитки.'],
        uk: ['При затримці менше 3 годин у пункті призначення компенсація за EU261 не передбачена.', 'При затримці більше 2 годин авіакомпанія зобов\'язана надати харчування.'],
        fr: ['Pour un retard de moins de 3 heures à destination, l\'indemnisation EU261 ne s\'applique pas.', 'La compagnie doit fournir des repas/rafraîchissements pour les retards de plus de 2 heures.'],
        lt: ['Kai vėlavimas paskirties vietoje yra mažiau nei 3 valandos, EU261 kompensacija netaikoma.', 'Jei vėlavimas viršija 2 valandas, aviakompanija privalo suteikti maistą ir gėrimus.'],
      },
    };
  }

  let amount = '';
  if (dist === 'short') amount = '€250';
  else if (dist === 'medium') amount = '€400';
  else {
    amount = (route === 'eu-eu') ? '€400' : '€600';
  }

  if (delay === '3h' && dist !== 'short') {
    amount += ' (may be reduced by 50% if arrival delay is 3–4h for long-haul)';
  }

  return {
    eligible: true, amount, basis: 'EU Regulation 261/2004',
    notes: {
      en: [
        'Compensation may be reduced by 50% if the carrier offers re-routing and your arrival is delayed by 2–4h (depending on distance).',
        'Extraordinary circumstances (severe weather, security risks, strikes) exempt the airline from paying compensation.',
        'You must claim within the airline\'s specified period (usually 6 years in the UK, varies in EU countries).',
      ],
      ru: [
        'Компенсация может быть снижена на 50%, если авиакомпания предложила альтернативный маршрут и задержка прибытия составила 2–4 часа.',
        'Чрезвычайные обстоятельства (сильный шторм, угроза безопасности, забастовки) освобождают авиакомпанию от выплаты.',
        'Срок подачи заявки — обычно до 3 лет (в странах ЕС срок варьируется).',
      ],
      uk: [
        'Компенсація може бути зменшена на 50%, якщо авіакомпанія запропонувала альтернативний маршрут і затримка прибуття склала 2–4 години.',
        'Надзвичайні обставини (шторм, загроза безпеці, страйки) звільняють авіакомпанію від виплати.',
        'Термін подачі заявки — зазвичай до 3 років (залежить від країни ЄС).',
      ],
      fr: [
        'L\'indemnisation peut être réduite de 50% si la compagnie propose un réacheminement et que votre retard à destination est de 2 à 4 heures.',
        'Les circonstances extraordinaires (météo extrême, risques sécuritaires, grèves) exonèrent la compagnie.',
        'Délai de réclamation : généralement 5 ans en France, variable selon les États membres.',
      ],
      lt: [
        'Kompensacija gali būti sumažinta 50%, jei vežėjas pasiūlė alternatyvų maršrutą ir atvykimo vėlavimas buvo 2–4 valandos.',
        'Ypatingos aplinkybės (audros, saugumo grėsmės, streikai) atleidžia aviakompaniją nuo mokėjimo.',
        'Paraiška turi būti pateikta paprastai per 3 metus (skiriasi ES šalių narių).',
      ],
    },
  };
}

export default function FlightDelayCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [route, setRoute] = useState<RouteType | ''>('');
  const [delay, setDelay] = useState<DelayType | ''>('');
  const [dist, setDist] = useState<DistType | ''>('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!route || !delay || !dist) { setError(t.errSelect); return; }
    setError('');
    setResult(calcCompensation(route as RouteType, delay as DelayType, dist as DistType));
  };

  const reset = () => { setRoute(''); setDelay(''); setDist(''); setResult(null); setError(''); };

  const routeOptions: [RouteType, string][] = [
    ['eu-eu', t.routeEuEu], ['eu-out', t.routeEuOut], ['out-eu', t.routeOutEu], ['out-out', t.routeOutOut],
  ];
  const delayOptions: [DelayType, string][] = [['2h', t.delay2], ['3h', t.delay3], ['4h', t.delay4]];
  const distOptions: [DistType, string][] = [['short', t.distShort], ['medium', t.distMedium], ['long', t.distLong]];

  return (
    <div className={styles['fd-calc']}>
      <div className={styles['fd-calc__form']}>
        {([
          { label: t.routeType, val: route, set: setRoute as (v: string) => void, opts: routeOptions },
          { label: t.delay, val: delay, set: setDelay as (v: string) => void, opts: delayOptions },
          { label: t.distance, val: dist, set: setDist as (v: string) => void, opts: distOptions },
        ] as { label: string; val: string; set: (v: string) => void; opts: [string, string][] }[]).map(({ label, val, set, opts }) => (
          <div key={label} className={styles['fd-calc__field']}>
            <label className={styles['fd-calc__label']}>{label}</label>
            <select className={styles['fd-calc__select']} value={val} onChange={e => { set(e.target.value); setError(''); setResult(null); }}>
              <option value="">—</option>
              {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        ))}
      </div>

      {error && <p className={styles['fd-calc__error']}>{error}</p>}

      <div className={styles['fd-calc__actions']}>
        <button type="button" className={styles['fd-calc__btn']} onClick={calculate}>{t.calculate}</button>
        <button type="button" className={styles['fd-calc__btn--reset']} onClick={reset}>{t.reset}</button>
      </div>

      {result && (
        <div className={`${styles['fd-calc__result']} ${result.eligible ? styles['fd-calc__result--eligible'] : styles['fd-calc__result--no']}`}>
          <p className={styles['fd-calc__verdict']}>{result.eligible ? t.eligible : t.notEligible}</p>

          {result.eligible && (
            <div className={styles['fd-calc__amount-row']}>
              <span className={styles['fd-calc__amount-label']}>{t.compensation}</span>
              <span className={styles['fd-calc__amount-value']}>{result.amount}</span>
            </div>
          )}

          <div className={styles['fd-calc__basis']}>
            <span className={styles['fd-calc__basis-label']}>{t.basis}:</span> {result.basis}
          </div>

          <div className={styles['fd-calc__notes']}>
            <p className={styles['fd-calc__notes-title']}>{t.notes}:</p>
            <ul className={styles['fd-calc__notes-list']}>
              {result.notes[lang].map((note, i) => <li key={i}>{note}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

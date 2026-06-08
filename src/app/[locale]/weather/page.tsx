import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import WeatherWidget from './WeatherWidget';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/tools/countdown', label: 'Countdown Timer' }, { href: '/calculator/date-diff', label: 'Date Difference Calculator' }, { href: '/calculator/age', label: 'Age Calculator' }, { href: '/converter/timezone', label: 'Timezone Converter' }, { href: '/converter/units', label: 'Unit Converter' }],
  ru: [{ href: '/tools/countdown', label: 'Таймер обратного отсчёта' }, { href: '/calculator/date-diff', label: 'Калькулятор разницы дат' }, { href: '/calculator/age', label: 'Калькулятор возраста' }, { href: '/converter/timezone', label: 'Конвертер часовых поясов' }, { href: '/converter/units', label: 'Конвертер единиц' }],
  uk: [{ href: '/tools/countdown', label: 'Таймер зворотного відліку' }, { href: '/calculator/date-diff', label: 'Калькулятор різниці дат' }, { href: '/calculator/age', label: 'Калькулятор віку' }, { href: '/converter/timezone', label: 'Конвертер часових поясів' }, { href: '/converter/units', label: 'Конвертер одиниць' }],
  fr: [{ href: '/tools/countdown', label: 'Compte à rebours' }, { href: '/calculator/date-diff', label: 'Calculatrice de différence de dates' }, { href: '/calculator/age', label: 'Calculatrice d\'âge' }, { href: '/converter/timezone', label: 'Convertisseur de fuseaux horaires' }, { href: '/converter/units', label: 'Convertisseur d\'unités' }],
  lt: [{ href: '/tools/countdown', label: 'Atgalinio skaičiavimo laikmatis' }, { href: '/calculator/date-diff', label: 'Datų skirtumo skaičiuotuvas' }, { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' }, { href: '/converter/timezone', label: 'Laiko juostų keitiklis' }, { href: '/converter/units', label: 'Vienetų keitiklis' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Weather Forecast — Current Weather & 7-Day Outlook',
    description: 'Free weather forecast for any city. Check current temperature, humidity, wind speed and a 7-day daily forecast. Powered by Open-Meteo — no registration required.',
    h1: 'Weather Forecast',
  },
  ru: {
    title: 'Погода — Прогноз погоды на сегодня и 7 дней',
    description: 'Бесплатный прогноз погоды для любого города. Текущая температура, влажность, скорость ветра и прогноз на 7 дней. На основе Open-Meteo, без регистрации.',
    h1: 'Прогноз погоды',
  },
  uk: {
    title: 'Погода — Прогноз погоди на сьогодні та 7 днів',
    description: 'Безкоштовний прогноз погоди для будь-якого міста. Поточна температура, вологість, швидкість вітру та прогноз на 7 днів. На основі Open-Meteo, без реєстрації.',
    h1: 'Прогноз погоди',
  },
  fr: {
    title: 'Météo — Prévisions Actuelles et sur 7 Jours',
    description: "Prévisions météo gratuites pour n'importe quelle ville. Température actuelle, humidité, vent et prévisions sur 7 jours. Propulsé par Open-Meteo, sans inscription.",
    h1: 'Prévisions Météo',
  },
  lt: {
    title: 'Orai — Dabartiniai Orai ir 7 Dienų Prognozė',
    description: 'Nemokama oro prognozė bet kuriam miestui. Dabartinė temperatūra, drėgnumas, vėjo greitis ir 7 dienų prognozė. Naudojamas Open-Meteo, registracija nereikalinga.',
    h1: 'Oro Prognozė',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our free weather tool shows current conditions and a 7-day forecast for any city in the world. Search by city name or allow location access to get weather for your current position. Data is provided by Open-Meteo — a free, open-source weather API with no registration or API key required.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'Where does the weather data come from?',
        a: 'Weather data is provided by Open-Meteo (open-meteo.com), a free open-source weather API that aggregates data from national weather services including DWD (Germany), ECMWF (Europe), NOAA (USA), and others. It is updated hourly.',
      },
      {
        q: 'How accurate is the 7-day forecast?',
        a: 'The 7-day forecast uses high-resolution numerical weather prediction models. The first 1–3 days are generally very accurate. Days 4–7 are less precise — weather prediction accuracy decreases significantly beyond 3 days for local details.',
      },
      {
        q: 'Why does the "Use my location" button not work?',
        a: 'The browser requires explicit permission to access your location. If the button does not work, check that location access is allowed for this site in your browser settings. On iOS Safari, location must be enabled per-site in Settings → Safari → Location.',
      },
      {
        q: 'What do the weather codes (WMO codes) mean?',
        a: 'Weather conditions are described using WMO (World Meteorological Organization) weather codes. They range from 0 (clear sky) to 99 (thunderstorm with heavy hail) and are the international standard for weather observations.',
      },
      {
        q: 'What is the difference between temperature and "feels like"?',
        a: '"Feels like" (apparent temperature) accounts for wind chill in cold conditions and humidity in hot conditions. It represents how the temperature feels to the human body, and can differ significantly from the actual air temperature.',
      },
    ],
  },
  ru: {
    description: 'Наш бесплатный сервис погоды показывает текущие условия и прогноз на 7 дней для любого города мира. Введите название города или разрешите доступ к местоположению, чтобы получить погоду для вашего текущего места. Данные предоставляет Open-Meteo — бесплатный открытый API без регистрации.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Откуда берутся данные о погоде?',
        a: 'Данные предоставляет Open-Meteo (open-meteo.com) — бесплатный API с открытым исходным кодом, агрегирующий информацию от национальных метеорологических служб: DWD (Германия), ECMWF (Европа), NOAA (США) и других. Данные обновляются каждый час.',
      },
      {
        q: 'Насколько точен прогноз на 7 дней?',
        a: 'Прогноз использует высокоточные модели численного прогнозирования погоды. Первые 1–3 дня, как правило, очень точны. Дни 4–7 менее надёжны — точность прогноза существенно снижается для деталей после 3 дней.',
      },
      {
        q: 'Почему кнопка «Моё местоположение» не работает?',
        a: 'Браузер требует явного разрешения на доступ к вашему местоположению. Если кнопка не работает, проверьте, что доступ к геолокации разрешён для этого сайта в настройках браузера.',
      },
      {
        q: 'Что такое коды погоды ВМО?',
        a: 'Погодные условия описываются кодами ВМО (Всемирная метеорологическая организация) — от 0 (ясное небо) до 99 (гроза с крупным градом). Это международный стандарт метеорологических наблюдений.',
      },
      {
        q: 'Чем отличается температура от «ощущается»?',
        a: 'Ощущаемая температура учитывает охлаждение ветром в холодную погоду и влажность в жаркую. Она отражает то, как человеческое тело воспринимает температуру воздуха, и может существенно отличаться от реальной температуры.',
      },
    ],
  },
  uk: {
    description: 'Наш безкоштовний сервіс погоди показує поточні умови та прогноз на 7 днів для будь-якого міста світу. Введіть назву міста або дозвольте доступ до місцезнаходження. Дані надає Open-Meteo — безкоштовний відкритий API без реєстрації.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Звідки беруться дані про погоду?',
        a: 'Дані надає Open-Meteo (open-meteo.com) — безкоштовний API з відкритим кодом, що агрегує інформацію від національних метеорологічних служб: DWD (Німеччина), ECMWF (Європа), NOAA (США) та інших. Дані оновлюються щогодини.',
      },
      {
        q: 'Наскільки точний прогноз на 7 днів?',
        a: 'Прогноз використовує високоточні моделі чисельного прогнозування погоди. Перші 1–3 дні, як правило, дуже точні. Дні 4–7 менш надійні — точність прогнозу суттєво знижується після 3 днів.',
      },
      {
        q: 'Чому кнопка «Моє місцезнаходження» не працює?',
        a: 'Браузер вимагає явного дозволу на доступ до вашого місцезнаходження. Якщо кнопка не працює, перевірте, що доступ до геолокації дозволено для цього сайту в налаштуваннях браузера.',
      },
      {
        q: 'Що таке коди погоди ВМО?',
        a: 'Погодні умови описуються кодами ВМО (Всесвітня метеорологічна організація) — від 0 (ясне небо) до 99 (гроза з великим градом). Це міжнародний стандарт метеорологічних спостережень.',
      },
      {
        q: 'Чим відрізняється температура від «відчувається»?',
        a: 'Відчувана температура враховує охолодження вітром у холодну погоду та вологість у спекотну. Вона відображає те, як людське тіло сприймає температуру повітря, і може суттєво відрізнятися від реальної.',
      },
    ],
  },
  fr: {
    description: "Notre outil météo gratuit affiche les conditions actuelles et des prévisions sur 7 jours pour n'importe quelle ville du monde. Recherchez par nom de ville ou autorisez la géolocalisation pour obtenir la météo de votre position actuelle. Données fournies par Open-Meteo — API météo gratuite et open source, sans inscription.",
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: "D'où proviennent les données météo ?",
        a: "Les données sont fournies par Open-Meteo (open-meteo.com), une API météo gratuite et open source qui agrège les données de services météorologiques nationaux : DWD (Allemagne), ECMWF (Europe), NOAA (États-Unis) et d'autres. Les données sont mises à jour toutes les heures.",
      },
      {
        q: 'Quelle est la précision des prévisions sur 7 jours ?',
        a: "Les prévisions utilisent des modèles de prédiction numérique haute résolution. Les 1 à 3 premiers jours sont généralement très précis. Les jours 4 à 7 sont moins fiables — la précision diminue considérablement au-delà de 3 jours pour les détails locaux.",
      },
      {
        q: "Pourquoi le bouton « Ma position » ne fonctionne-t-il pas ?",
        a: "Le navigateur requiert une autorisation explicite pour accéder à votre position. Si le bouton ne fonctionne pas, vérifiez que l'accès à la géolocalisation est autorisé pour ce site dans les paramètres de votre navigateur.",
      },
      {
        q: 'Que signifient les codes météo OMM ?',
        a: "Les conditions météorologiques sont décrites par les codes OMM (Organisation Météorologique Mondiale), allant de 0 (ciel dégagé) à 99 (orage avec forte grêle). Il s'agit du standard international pour les observations météorologiques.",
      },
      {
        q: 'Quelle est la différence entre température réelle et ressentie ?',
        a: "La température ressentie tient compte du refroidissement éolien par temps froid et de l'humidité par temps chaud. Elle représente la sensation thermique du corps humain et peut différer sensiblement de la température de l'air.",
      },
    ],
  },
  lt: {
    description: 'Mūsų nemokamas oro prognozės įrankis rodo dabartines sąlygas ir 7 dienų prognozę bet kuriam pasaulio miestui. Ieškokite pagal miesto pavadinimą arba leiskite prieigą prie vietos informacijos. Duomenis teikia Open-Meteo — nemokama atvirojo kodo oro API, registracija nereikalinga.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Iš kur gaunami oro duomenys?',
        a: 'Duomenis teikia Open-Meteo (open-meteo.com) — nemokama atvirojo kodo oro API, kuri agreguoja duomenis iš nacionalinių meteorologijos tarnybų: DWD (Vokietija), ECMWF (Europa), NOAA (JAV) ir kitų. Duomenys atnaujinami kas valandą.',
      },
      {
        q: 'Koks 7 dienų prognozės tikslumas?',
        a: 'Prognozė naudoja aukštos raiškos skaitinio orų prognozavimo modelius. Pirmosios 1–3 dienos paprastai yra labai tikslios. 4–7 dienos yra mažiau patikimos — prognozės tikslumas žymiai mažėja po 3 dienų.',
      },
      {
        q: 'Kodėl mygtukas „Mano vieta" neveikia?',
        a: 'Naršyklė reikalauja aiškaus leidimo pasiekti jūsų vietą. Jei mygtukas neveikia, patikrinkite, ar šiai svetainei leista naudoti geografinę vietą naršyklės nustatymuose.',
      },
      {
        q: 'Ką reiškia PPO oro kodai?',
        a: 'Oro sąlygos aprašomos PPO (Pasaulinė meteorologijos organizacija) kodais — nuo 0 (giedras dangus) iki 99 (perkūnija su stambia kruša). Tai tarptautinis meteorologinių stebėjimų standartas.',
      },
      {
        q: 'Koks skirtumas tarp temperatūros ir „jaučiasi"?',
        a: 'Jaučiama temperatūra atsižvelgia į vėjo aušinimą šaltomis sąlygomis ir drėgmę karštomis. Ji atspindi, kaip žmogaus kūnas suvokia oro temperatūrą, ir gali gerokai skirtis nuo tikrosios temperatūros.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/weather'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function WeatherPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/weather`,
    applicationCategory: 'WeatherApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <WeatherWidget locale={locale} />

        <AdInline locale={locale} />
        <div className={styles.page__content}>
          <p className={styles.page__description}>{content.description}</p>

          <RelatedTools locale={locale} tools={related} />
          <section className={styles.faq}>
            <h2 className={styles.faq__title}>{content.faqTitle}</h2>
            <div className={styles.faq__list}>
              {content.faqs.map((item, i) => (
                <div key={i} className={styles.faq__item}>
                  <h3 className={styles.faq__question}>{item.q}</h3>
                  <p className={styles.faq__answer}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

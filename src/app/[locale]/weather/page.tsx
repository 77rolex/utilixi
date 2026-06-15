import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import WeatherWidget from './WeatherWidget';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
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

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Weather Forecast — Current Weather & 7-Day Outlook',
    description: 'Free weather forecast for any city. Check current temperature, humidity, wind speed and a 7-day daily forecast. Powered by Open-Meteo — no registration required.',
    h1: 'Weather Forecast',
    subtitle: 'Get current conditions and a 7-day forecast for any city worldwide — temperature, humidity, and wind.',
  },
  ru: {
    title: 'Погода — Прогноз погоды на сегодня и 7 дней',
    description: 'Бесплатный прогноз погоды для любого города. Текущая температура, влажность, скорость ветра и прогноз на 7 дней. На основе Open-Meteo, без регистрации.',
    h1: 'Прогноз погоды',
    subtitle: 'Текущая погода и прогноз на 7 дней для любого города мира — температура, влажность и ветер.',
  },
  uk: {
    title: 'Погода — Прогноз погоди на сьогодні та 7 днів',
    description: 'Безкоштовний прогноз погоди для будь-якого міста. Поточна температура, вологість, швидкість вітру та прогноз на 7 днів. На основі Open-Meteo, без реєстрації.',
    h1: 'Прогноз погоди',
    subtitle: 'Поточна погода та прогноз на 7 днів для будь-якого міста світу — температура, вологість і вітер.',
  },
  fr: {
    title: 'Météo — Prévisions Actuelles et sur 7 Jours',
    description: "Prévisions météo gratuites pour n'importe quelle ville. Température actuelle, humidité, vent et prévisions sur 7 jours. Propulsé par Open-Meteo, sans inscription.",
    h1: 'Prévisions Météo',
    subtitle: 'Conditions actuelles et prévisions sur 7 jours pour n\'importe quelle ville — température, humidité et vent.',
  },
  lt: {
    title: 'Orai — Dabartiniai Orai ir 7 Dienų Prognozė',
    description: 'Nemokama oro prognozė bet kuriam miestui. Dabartinė temperatūra, drėgnumas, vėjo greitis ir 7 dienų prognozė. Naudojamas Open-Meteo, registracija nereikalinga.',
    h1: 'Oro Prognozė',
    subtitle: 'Dabartiniai orai ir 7 dienų prognozė bet kuriam pasaulio miestui — temperatūra, drėgnumas ir vėjas.',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our free weather tool shows current conditions and a 7-day forecast for any city in the world. Search by city name or allow location access to get weather for your current position. Data is provided by Open-Meteo — a free, open-source weather API with no registration or API key required.\n\nThe forecast includes temperature highs and lows, precipitation probability, wind speed, humidity, UV index, and weather condition icons for each day. All data is updated hourly so you always see the latest conditions.',
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
      {
        q: 'Can I check weather in Celsius and Fahrenheit?',
        a: 'The weather tool displays temperatures in Celsius by default. Open-Meteo provides data in Celsius, which is the standard used internationally. To convert: °F = °C × 9/5 + 32. For example, 20°C equals 68°F.',
      },
      {
        q: 'What does precipitation probability mean?',
        a: 'Precipitation probability (shown as a percentage) indicates the likelihood of measurable rain, drizzle, snow, or other precipitation occurring during that day. A 70% chance of rain means 7 out of 10 similar weather situations historically produced rain.',
      },
      {
        q: 'What wind speed units are used?',
        a: 'Wind speed is displayed in kilometres per hour (km/h). To convert: 1 km/h ≈ 0.28 m/s ≈ 0.62 mph. Beaufort scale reference: calm < 1 km/h, gentle breeze 12–19 km/h, strong breeze 39–49 km/h, storm 89–102 km/h.',
      },
      {
        q: 'How do I search for a city?',
        a: 'Type the city name in the search box and press Enter or click the search button. The tool uses the Nominatim geocoding service (OpenStreetMap) to find coordinates. For best results, use the city name in its local language or in English.',
      },
      {
        q: 'Why might the weather shown differ from my local forecast?',
        a: 'Weather models use grid-based calculations and may differ from hyper-local conditions. Urban heat islands, coastal effects, elevation, and microclimates can cause variations. The forecast is most accurate for regional conditions rather than street-level detail.',
      },
    ],
  },
  ru: {
    description: 'Наш бесплатный сервис погоды показывает текущие условия и прогноз на 7 дней для любого города мира. Введите название города или разрешите доступ к местоположению, чтобы получить погоду для вашего текущего места. Данные предоставляет Open-Meteo — бесплатный открытый API без регистрации.\n\nПрогноз включает максимальную и минимальную температуру, вероятность осадков, скорость ветра, влажность и состояние погоды по иконкам для каждого дня. Данные обновляются каждый час.',
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
      {
        q: 'В каких единицах отображается температура?',
        a: 'Температура отображается в градусах Цельсия — международный стандарт. Для перевода в Фаренгейт: °F = °C × 9/5 + 32. Например, 20°C = 68°F, 0°C = 32°F (точка замерзания воды).',
      },
      {
        q: 'Что означает вероятность осадков?',
        a: 'Вероятность осадков (в процентах) показывает, насколько вероятен дождь, снег или другие осадки в этот день. 70% означает, что в 7 из 10 подобных синоптических ситуаций исторически выпадали осадки.',
      },
      {
        q: 'В каких единицах измеряется скорость ветра?',
        a: 'Скорость ветра отображается в км/ч. Для перевода: 1 км/ч ≈ 0,28 м/с ≈ 0,62 миль/ч. Справка по шкале Бофора: штиль < 1 км/ч, лёгкий ветерок 6–11 км/ч, сильный ветер 39–49 км/ч, шторм 89–102 км/ч.',
      },
      {
        q: 'Как найти погоду в нужном городе?',
        a: 'Введите название города в строку поиска и нажмите Enter или кнопку поиска. Используется геокодирование Nominatim (OpenStreetMap). Для лучшего результата вводите название на местном языке или по-английски.',
      },
      {
        q: 'Почему прогноз отличается от других сервисов погоды?',
        a: 'Погодные модели работают с сеточными данными и могут не учитывать сверхлокальные условия: городской тепловой остров, прибрежные эффекты, высоту над уровнем моря. Для уличного уровня точность ниже, чем для городского/регионального.',
      },
    ],
  },
  uk: {
    description: 'Наш безкоштовний сервіс погоди показує поточні умови та прогноз на 7 днів для будь-якого міста світу. Введіть назву міста або дозвольте доступ до місцезнаходження. Дані надає Open-Meteo — безкоштовний відкритий API без реєстрації.\n\nПрогноз містить максимальну та мінімальну температуру, вірогідність опадів, швидкість вітру, вологість та іконки погодних умов для кожного дня. Дані оновлюються щогодини.',
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
      {
        q: 'В яких одиницях відображається температура?',
        a: 'Температура відображається у градусах Цельсія. Для переведення у Фаренгейт: °F = °C × 9/5 + 32. Наприклад, 20°C = 68°F, 0°C = 32°F (точка замерзання води).',
      },
      {
        q: 'Що означає вірогідність опадів?',
        a: 'Вірогідність опадів (у відсотках) показує, наскільки ймовірні дощ, сніг чи інші опади цього дня. 70% означає, що у 7 з 10 подібних синоптичних ситуацій опади випадали.',
      },
      {
        q: 'В яких одиницях вимірюється швидкість вітру?',
        a: 'Швидкість вітру відображається у км/год. Для переведення: 1 км/год ≈ 0,28 м/с ≈ 0,62 миль/год. Орієнтир за шкалою Бофора: штиль < 1 км/год, легкий вітер 6–11 км/год, шторм 89–102 км/год.',
      },
      {
        q: 'Як знайти погоду в потрібному місті?',
        a: 'Введіть назву міста у рядок пошуку та натисніть Enter або кнопку пошуку. Використовується геокодування Nominatim (OpenStreetMap). Для кращого результату вводьте назву місцевою мовою або англійською.',
      },
      {
        q: 'Чому прогноз відрізняється від інших сервісів погоди?',
        a: 'Погодні моделі працюють із сітчастими даними і можуть не враховувати надлокальні умови: міський тепловий острів, прибережні ефекти, висоту над рівнем моря. Точність вища для міського/регіонального рівня, ніж для вулиці.',
      },
    ],
  },
  fr: {
    description: "Notre outil météo gratuit affiche les conditions actuelles et des prévisions sur 7 jours pour n'importe quelle ville du monde. Recherchez par nom de ville ou autorisez la géolocalisation pour obtenir la météo de votre position actuelle. Données fournies par Open-Meteo — API météo gratuite et open source, sans inscription.\n\nLes prévisions incluent les températures maximales et minimales, la probabilité de précipitations, la vitesse du vent, l'humidité et les icônes météo pour chaque journée. Les données sont mises à jour toutes les heures.",
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
      {
        q: 'Les températures sont-elles en Celsius ou Fahrenheit ?',
        a: "Les températures sont affichées en degrés Celsius, standard international. Pour convertir en Fahrenheit : °F = °C × 9/5 + 32. Par exemple, 20°C = 68°F. En France, la météo utilise toujours le Celsius.",
      },
      {
        q: 'Que signifie la probabilité de précipitations ?',
        a: "La probabilité de précipitations (en pourcentage) indique la chance de pluie, neige ou autre précipitation durant la journée. 70% signifie que dans 7 situations météo similaires sur 10, des précipitations ont historiquement eu lieu.",
      },
      {
        q: 'Quelle unité est utilisée pour la vitesse du vent ?',
        a: "La vitesse du vent est affichée en km/h. Pour convertir : 1 km/h ≈ 0,28 m/s ≈ 0,62 mph. Référence échelle de Beaufort : calme < 1 km/h, brise légère 6–11 km/h, vent fort 39–49 km/h, tempête 89–102 km/h.",
      },
      {
        q: 'Comment rechercher une ville ?',
        a: "Tapez le nom de la ville dans la barre de recherche et appuyez sur Entrée. L'outil utilise le géocodage Nominatim (OpenStreetMap). Pour de meilleurs résultats, saisissez le nom en français ou en anglais.",
      },
      {
        q: "Pourquoi les prévisions diffèrent-elles d'autres services météo ?",
        a: "Les modèles météorologiques utilisent des calculs sur grille et peuvent ne pas capturer les conditions hyperlocales : îlot de chaleur urbain, effets côtiers, altitude. La précision est meilleure au niveau régional qu'à l'échelle de la rue.",
      },
    ],
  },
  lt: {
    description: 'Mūsų nemokamas oro prognozės įrankis rodo dabartines sąlygas ir 7 dienų prognozę bet kuriam pasaulio miestui. Ieškokite pagal miesto pavadinimą arba leiskite prieigą prie vietos informacijos. Duomenis teikia Open-Meteo — nemokama atvirojo kodo oro API, registracija nereikalinga.\n\nPrognozė apima maksimalią ir minimalią temperatūrą, kritulių tikimybę, vėjo greitį, drėgmę ir oro sąlygų piktogramas kiekvienai dienai. Duomenys atnaujinami kas valandą.',
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
      {
        q: 'Kokiais vienetais rodoma temperatūra?',
        a: 'Temperatūra rodoma Celsijaus laipsniais — tarptautinis standartas. Norint konvertuoti į Farenheitus: °F = °C × 9/5 + 32. Pavyzdžiui, 20°C = 68°F, 0°C = 32°F (vandens užšalimo taškas).',
      },
      {
        q: 'Ką reiškia kritulių tikimybė?',
        a: 'Kritulių tikimybė (procentais) rodo lietaus, sniego ar kitų kritulių galimybę tą dieną. 70% reiškia, kad 7 iš 10 panašių orų situacijų istoriškai buvo kritulių.',
      },
      {
        q: 'Kokiais vienetais matuojamas vėjo greitis?',
        a: 'Vėjo greitis rodomas km/h. Konvertavimui: 1 km/h ≈ 0,28 m/s ≈ 0,62 myl/h. Beauforto skalės orientyras: ramu < 1 km/h, lengvas vėjelis 6–11 km/h, stiprus vėjas 39–49 km/h, audra 89–102 km/h.',
      },
      {
        q: 'Kaip ieškoti miesto?',
        a: 'Paieškos laukelyje įveskite miesto pavadinimą ir paspauskite Enter arba paieškos mygtuką. Naudojamas Nominatim geokodavimas (OpenStreetMap). Geriausiems rezultatams įveskite pavadinimą lietuvių arba anglų kalba.',
      },
      {
        q: 'Kodėl prognozė skiriasi nuo kitų oro tarnybų?',
        a: 'Oro modeliai naudoja gardelės skaičiavimus ir gali neatspindėti vietinių sąlygų: miesto šilumos salos, pakrančių efektų, aukščio virš jūros lygio. Tikslumas didesnis regioniniu lygiu nei gatvės lygyje.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return buildMetadata(locale, '/weather', meta);
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
        {meta.subtitle && <p className={styles.page__subtitle}>{meta.subtitle}</p>}
        <RelatedTools locale={locale} tools={related} />
        <ToolActions />
        <WeatherWidget locale={locale} />

        <AdInline locale={locale} />
        <div className={styles.page__content}>
          <p className={styles.page__description}>{content.description}</p>

          <AdPlaceholder locale={locale} size="banner" />
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

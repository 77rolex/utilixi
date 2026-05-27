import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import ExchangeRatesTable from './ExchangeRatesTable';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Exchange Rates Today — Live Currency Rates Table',
    description: 'Live exchange rates for 160+ currencies. Sortable table with base currency selector. Powered by ExchangeRate-API, updated every 6 hours.',
    h1: 'Exchange Rates',
  },
  ru: {
    title: 'Курс валют сегодня — таблица всех валют онлайн',
    description: 'Актуальные курсы 160+ валют. Таблица с сортировкой и выбором базовой валюты. Данные от ExchangeRate-API, обновляются каждые 6 часов.',
    h1: 'Курс валют',
  },
  uk: {
    title: 'Курс валют сьогодні — таблиця всіх валют онлайн',
    description: 'Актуальні курси 160+ валют. Таблиця з сортуванням та вибором базової валюти. Дані від ExchangeRate-API, оновлюються кожні 6 годин.',
    h1: 'Курс валют',
  },
  fr: {
    title: 'Taux de Change Aujourd\'hui — Tableau des Devises en Direct',
    description: 'Taux de change en direct pour 160+ devises. Tableau triable avec sélecteur de devise de base. Données ExchangeRate-API, mises à jour toutes les 6 heures.',
    h1: 'Taux de Change',
  },
  lt: {
    title: 'Valiutų Kursai Šiandien — Visų Valiutų Lentelė',
    description: 'Realaus laiko 160+ valiutų kursai. Rūšiuojama lentelė su bazinės valiutos pasirinkimu. Duomenys iš ExchangeRate-API, atnaujinami kas 6 valandas.',
    h1: 'Valiutų Kursai',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Browse live exchange rates for over 160 world currencies. Select any base currency from the dropdown to see all rates relative to it. Click column headers to sort by currency code or rate. Use the search box to quickly find any currency by code or name.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How often are exchange rates updated?', a: 'Rates are fetched from ExchangeRate-API and cached for 6 hours. This ensures fast page loads while keeping data reasonably current for informational purposes.' },
      { q: 'How do I change the base currency?', a: 'Use the "Base currency" dropdown at the top of the table. The most common currencies for your language are listed. All rates in the table will recalculate relative to your chosen base.' },
      { q: 'How do I sort the table?', a: 'Click the "Currency" column header to sort alphabetically by currency code. Click the rate column header (e.g. "1 USD =") to sort by rate value. Click again to reverse the sort direction.' },
      { q: 'Are these rates suitable for transactions?', a: 'The rates are for informational purposes only and may differ from bank or exchange office rates. Always check with your financial institution before making currency transactions.' },
      { q: 'How many currencies are shown?', a: 'The table shows all currencies available from ExchangeRate-API — typically 160 or more, including major, minor, and exotic currencies from around the world.' },
    ],
  },
  ru: {
    description: 'Просматривайте актуальные курсы обмена более 160 мировых валют. Выберите базовую валюту в выпадающем списке, чтобы увидеть все курсы относительно неё. Нажмите на заголовок колонки для сортировки по коду валюты или курсу. Используйте поиск для быстрого нахождения нужной валюты.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как часто обновляются курсы?', a: 'Курсы получаются от ExchangeRate-API и кэшируются на 6 часов. Это обеспечивает быструю загрузку страниц при достаточной актуальности данных.' },
      { q: 'Как изменить базовую валюту?', a: 'Используйте выпадающий список "Базовая валюта" вверху таблицы. Там перечислены наиболее актуальные для вашего региона валюты. Все курсы в таблице пересчитаются относительно выбранной базовой.' },
      { q: 'Как сортировать таблицу?', a: 'Нажмите на заголовок колонки "Валюта" для сортировки по коду. Нажмите на заголовок колонки с курсом для сортировки по значению. Повторный клик меняет направление сортировки.' },
      { q: 'Подходят ли курсы для расчётов?', a: 'Курсы носят информационный характер и могут отличаться от банковских или обменных курсов. Для фактических операций уточняйте курсы в своём банке.' },
      { q: 'Сколько валют отображается?', a: 'Таблица показывает все валюты, доступные через ExchangeRate-API — как правило, 160 и более, включая основные, второстепенные и экзотические валюты со всего мира.' },
    ],
  },
  uk: {
    description: 'Переглядайте актуальні курси обміну понад 160 світових валют. Оберіть базову валюту у списку, щоб побачити всі курси відносно неї. Натискайте заголовки стовпців для сортування за кодом валюти або курсом. Використовуйте пошук для швидкого знаходження потрібної валюти.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як часто оновлюються курси?', a: 'Курси отримуються від ExchangeRate-API та кешуються на 6 годин. Це забезпечує швидке завантаження сторінок при достатній актуальності даних.' },
      { q: 'Як змінити базову валюту?', a: 'Використовуйте список "Базова валюта" вгорі таблиці. Там перелічені найактуальніші для вашого регіону валюти. Усі курси перерахуються відносно обраної базової.' },
      { q: 'Як сортувати таблицю?', a: 'Натисніть заголовок стовпця "Валюта" для сортування за кодом. Натисніть заголовок стовпця з курсом для сортування за значенням. Повторний клік змінює напрямок.' },
      { q: 'Чи підходять курси для розрахунків?', a: 'Курси мають інформаційний характер і можуть відрізнятися від банківських або обмінних курсів. Для фактичних операцій уточнюйте курси у своєму банку.' },
      { q: 'Скільки валют відображається?', a: 'Таблиця показує всі валюти, доступні через ExchangeRate-API — зазвичай 160 і більше, включаючи основні, другорядні та екзотичні валюти з усього світу.' },
    ],
  },
  fr: {
    description: 'Consultez les taux de change en direct de plus de 160 devises mondiales. Sélectionnez une devise de base dans la liste déroulante pour voir tous les taux par rapport à elle. Cliquez sur les en-têtes de colonnes pour trier. Utilisez la recherche pour trouver rapidement une devise.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'À quelle fréquence les taux sont-ils mis à jour ?', a: 'Les taux sont récupérés d\'ExchangeRate-API et mis en cache pendant 6 heures, offrant des chargements rapides tout en maintenant des données raisonnablement actuelles.' },
      { q: 'Comment changer la devise de base ?', a: 'Utilisez la liste déroulante "Devise de base" en haut du tableau. Les devises les plus courantes pour votre région sont listées. Tous les taux se recalculeront par rapport à votre choix.' },
      { q: 'Comment trier le tableau ?', a: 'Cliquez sur l\'en-tête "Devise" pour trier par code de devise. Cliquez sur l\'en-tête du taux pour trier par valeur. Cliquez à nouveau pour inverser le tri.' },
      { q: 'Ces taux conviennent-ils aux transactions ?', a: 'Les taux sont fournis à titre informatif et peuvent différer des taux bancaires ou des bureaux de change. Vérifiez toujours auprès de votre établissement financier.' },
      { q: 'Combien de devises sont affichées ?', a: 'Le tableau affiche toutes les devises disponibles via ExchangeRate-API — généralement 160 ou plus, incluant les devises majeures, mineures et exotiques du monde entier.' },
    ],
  },
  lt: {
    description: 'Peržiūrėkite daugiau nei 160 pasaulio valiutų realaus laiko kursus. Pasirinkite bazinę valiutą iš išskleidžiamojo sąrašo, kad matytumėte visus kursus jos atžvilgiu. Spustelėkite stulpelių antraštes rūšiavimui. Naudokite paiešką greitam valiutos radimui.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip dažnai atnaujinami kursai?', a: 'Kursai gaunami iš ExchangeRate-API ir talpinami 6 valandoms, užtikrinant greitą puslapio įkėlimą ir pakankamai aktualius duomenis.' },
      { q: 'Kaip pakeisti bazinę valiutą?', a: 'Naudokite "Bazinė valiuta" išskleidžiamąjį sąrašą lentelės viršuje. Ten išvardytos populiariausios jūsų regione valiutos. Visi kursai perskaičiuos pagal pasirinktą bazinę.' },
      { q: 'Kaip rūšiuoti lentelę?', a: 'Spustelėkite "Valiuta" stulpelio antraštę rūšiavimui pagal kodą. Spustelėkite kurso stulpelio antraštę rūšiavimui pagal vertę. Spustelėkite dar kartą, kad apverstumėte.' },
      { q: 'Ar kursai tinkami sandoriams?', a: 'Kursai teikiami tik informaciniais tikslais ir gali skirtis nuo bankų ar keityklų kursų. Prieš valiutos operacijas visada pasitikrinkite savo banke.' },
      { q: 'Kiek valiutų rodoma?', a: 'Lentelėje rodomos visos valiutos, pasiekiamos per ExchangeRate-API — paprastai 160 ar daugiau, įskaitant pagrindines, antrines ir egzotiškas visame pasaulyje.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/currency', label: 'Currency Converter' },
    { href: '/crypto', label: 'Crypto Rates' },
    { href: '/crypto/converter', label: 'Crypto Converter' },
  ],
  ru: [
    { href: '/currency', label: 'Конвертер валют' },
    { href: '/crypto', label: 'Курс криптовалют' },
    { href: '/crypto/converter', label: 'Конвертер криптовалют' },
  ],
  uk: [
    { href: '/currency', label: 'Конвертер валют' },
    { href: '/crypto', label: 'Курс криптовалют' },
    { href: '/crypto/converter', label: 'Конвертер криптовалют' },
  ],
  fr: [
    { href: '/currency', label: 'Convertisseur de devises' },
    { href: '/crypto', label: 'Cours des cryptos' },
    { href: '/crypto/converter', label: 'Convertisseur crypto' },
  ],
  lt: [
    { href: '/currency', label: 'Valiutų keitiklis' },
    { href: '/crypto', label: 'Kriptovaliutų kursai' },
    { href: '/crypto/converter', label: 'Kriptovaliutų keitiklis' },
  ],
};

async function getRates(): Promise<{ rates: Record<string, number>; updatedAt: string }> {
  const apiKey = process.env.EXCHANGERATE_API_KEY;
  if (!apiKey) return { rates: {}, updatedAt: '' };

  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`,
      { next: { revalidate: 21600 } }
    );
    if (!res.ok) return { rates: {}, updatedAt: '' };
    const data = await res.json();
    return {
      rates: data.conversion_rates ?? {},
      updatedAt: data.time_last_update_utc ?? '',
    };
  } catch {
    return { rates: {}, updatedAt: '' };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/currency/rates'),
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function CurrencyRatesPage({ params }: Props) {
  const { locale } = await params;
  const meta    = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;
  const { rates, updatedAt } = await getRates();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/currency/rates`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <ExchangeRatesTable locale={locale} rates={rates} updatedAt={updatedAt} />

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

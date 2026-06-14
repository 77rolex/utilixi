import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import ExchangeRatesTable from './ExchangeRatesTable';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Exchange Rates Today — Live Currency Rates Table',
    description: 'Live exchange rates for 160+ currencies. Sortable table with base currency selector. Powered by ExchangeRate-API, updated every 6 hours.',
    h1: 'Exchange Rates',
    subtitle: 'View live currency exchange rates online',
  },
  ru: {
    title: 'Курс валют сегодня — таблица всех валют онлайн',
    description: 'Актуальные курсы 160+ валют. Таблица с сортировкой и выбором базовой валюты. Данные от ExchangeRate-API, обновляются каждые 6 часов.',
    h1: 'Курс валют',
    subtitle: 'Смотрите актуальные курсы валют онлайн',
  },
  uk: {
    title: 'Курс валют сьогодні — таблиця всіх валют онлайн',
    description: 'Актуальні курси 160+ валют. Таблиця з сортуванням та вибором базової валюти. Дані від ExchangeRate-API, оновлюються кожні 6 годин.',
    h1: 'Курс валют',
    subtitle: 'Смотрите актуальные курсы валют онлайн',
  },
  fr: {
    title: 'Taux de Change Aujourd\'hui — Tableau des Devises en Direct',
    description: 'Taux de change en direct pour 160+ devises. Tableau triable avec sélecteur de devise de base. Données ExchangeRate-API, mises à jour toutes les 6 heures.',
    h1: 'Taux de Change',
    subtitle: 'Consultez les taux de change en temps réel',
  },
  lt: {
    title: 'Valiutų Kursai Šiandien — Visų Valiutų Lentelė',
    description: 'Realaus laiko 160+ valiutų kursai. Rūšiuojama lentelė su bazinės valiutos pasirinkimu. Duomenys iš ExchangeRate-API, atnaujinami kas 6 valandas.',
    h1: 'Valiutų Kursai',
    subtitle: 'Žiūrėkite valiutų kursus internetu realiuoju laiku',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Browse live exchange rates for over 160 world currencies. Select any base currency from the dropdown to see all rates relative to it. Click column headers to sort by currency code or rate. Use the search box to quickly find any currency by code or name.\n\nAll rates are updated every 6 hours from ExchangeRate-API and cover currencies from all continents — from major pairs like EUR/USD and GBP/USD to exotic currencies from the Pacific and Caribbean.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How often are exchange rates updated?', a: 'Rates are fetched from ExchangeRate-API and cached for 6 hours. This ensures fast page loads while keeping data reasonably current for informational purposes.' },
      { q: 'How do I change the base currency?', a: 'Use the "Base currency" dropdown at the top of the table. The most common currencies for your language are listed. All rates in the table will recalculate relative to your chosen base.' },
      { q: 'How do I sort the table?', a: 'Click the "Currency" column header to sort alphabetically by currency code. Click the rate column header (e.g. "1 USD =") to sort by rate value. Click again to reverse the sort direction.' },
      { q: 'Are these rates suitable for transactions?', a: 'The rates are for informational purposes only and may differ from bank or exchange office rates. Always check with your financial institution before making currency transactions.' },
      { q: 'How many currencies are shown?', a: 'The table shows all currencies available from ExchangeRate-API — typically 160 or more, including major, minor, and exotic currencies from around the world.' },
      { q: 'What is a pegged currency?', a: 'A pegged currency (fixed exchange rate) is officially tied to another currency at a set rate. Examples: HKD is pegged to USD at ~7.8, SAR to USD at 3.75, AED to USD at 3.67. Their rates in the table barely change day-to-day.' },
      { q: 'Why do some currencies have unusual rates (very high or very low)?', a: 'Some currencies have historically accumulated inflation, resulting in very large denominations. For example, 1 USD ≈ 16,000+ Indonesian Rupiah (IDR), ≈ 38,000 Vietnamese Dong (VND), or ≈ 32,000 Uzbekistani Som (UZS). This is normal and does not indicate weakness.' },
      { q: 'What are exotic currencies?', a: 'Exotic currencies are those from smaller or emerging economies with lower trading volume — such as the Mongolian Tugrik (MNT), Cambodian Riel (KHR), or Fijian Dollar (FJD). They may have wider spreads and less liquidity in actual trading.' },
      { q: 'How do I search for a currency by name?', a: 'Type the currency code (e.g. "EUR") or the full name (e.g. "Euro") in the search box above the table. The table filters in real time to show only matching results.' },
      { q: 'What is the difference between this table and the currency converter?', a: 'The exchange rates table shows all 160+ currencies at once relative to one base currency, making it ideal for comparisons. The currency converter lets you input a specific amount and convert between any two currencies, showing the exact result.' },
    ],
  },
  ru: {
    description: 'Просматривайте актуальные курсы обмена более 160 мировых валют. Выберите базовую валюту в выпадающем списке, чтобы увидеть все курсы относительно неё. Нажмите на заголовок колонки для сортировки по коду валюты или курсу. Используйте поиск для быстрого нахождения нужной валюты.\n\nВсе курсы обновляются каждые 6 часов от ExchangeRate-API и охватывают валюты всех континентов — от основных пар EUR/USD и GBP/USD до экзотических валют Тихоокеанского и Карибского регионов.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как часто обновляются курсы?', a: 'Курсы получаются от ExchangeRate-API и кэшируются на 6 часов. Это обеспечивает быструю загрузку страниц при достаточной актуальности данных.' },
      { q: 'Как изменить базовую валюту?', a: 'Используйте выпадающий список "Базовая валюта" вверху таблицы. Там перечислены наиболее актуальные для вашего региона валюты. Все курсы в таблице пересчитаются относительно выбранной базовой.' },
      { q: 'Как сортировать таблицу?', a: 'Нажмите на заголовок колонки "Валюта" для сортировки по коду. Нажмите на заголовок колонки с курсом для сортировки по значению. Повторный клик меняет направление сортировки.' },
      { q: 'Подходят ли курсы для расчётов?', a: 'Курсы носят информационный характер и могут отличаться от банковских или обменных курсов. Для фактических операций уточняйте курсы в своём банке.' },
      { q: 'Сколько валют отображается?', a: 'Таблица показывает все валюты, доступные через ExchangeRate-API — как правило, 160 и более, включая основные, второстепенные и экзотические валюты со всего мира.' },
      { q: 'Что такое привязанная валюта?', a: 'Привязанная валюта (фиксированный курс) официально привязана к другой валюте. Примеры: HKD привязан к USD на уровне ~7,8; SAR к USD = 3,75; AED к USD = 3,67. Их курсы в таблице практически не меняются.' },
      { q: 'Почему у некоторых валют очень высокие курсы?', a: 'Ряд валют исторически накопил инфляцию, что привело к большим номиналам. Например, 1 USD ≈ 16 000+ индонезийских рупий (IDR), ≈ 38 000 вьетнамских донгов (VND) или ≈ 32 000 узбекских сумов (UZS). Это нормально и не означает слабость валюты.' },
      { q: 'Что такое экзотические валюты?', a: 'Экзотические валюты — валюты небольших или развивающихся экономик с низким объёмом торгов: монгольский тугрик (MNT), камбоджийский риель (KHR), фиджийский доллар (FJD). В реальной торговле они могут иметь широкий спред.' },
      { q: 'Как найти валюту по названию?', a: 'Введите код валюты (например, "EUR") или её название (например, "Euro" или "Евро") в поле поиска над таблицей. Таблица фильтруется в реальном времени.' },
      { q: 'Чем таблица курсов отличается от конвертера?', a: 'Таблица показывает все 160+ валют одновременно относительно одной базовой — удобно для сравнения. Конвертер позволяет ввести конкретную сумму и пересчитать между любыми двумя валютами с точным результатом.' },
    ],
  },
  uk: {
    description: 'Переглядайте актуальні курси обміну понад 160 світових валют. Оберіть базову валюту у списку, щоб побачити всі курси відносно неї. Натискайте заголовки стовпців для сортування за кодом валюти або курсом. Використовуйте пошук для швидкого знаходження потрібної валюти.\n\nУсі курси оновлюються кожні 6 годин від ExchangeRate-API і охоплюють валюти всіх континентів — від основних пар EUR/USD і GBP/USD до екзотичних валют Тихоокеанського та Карибського регіонів.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як часто оновлюються курси?', a: 'Курси отримуються від ExchangeRate-API та кешуються на 6 годин. Це забезпечує швидке завантаження сторінок при достатній актуальності даних.' },
      { q: 'Як змінити базову валюту?', a: 'Використовуйте список "Базова валюта" вгорі таблиці. Там перелічені найактуальніші для вашого регіону валюти. Усі курси перерахуються відносно обраної базової.' },
      { q: 'Як сортувати таблицю?', a: 'Натисніть заголовок стовпця "Валюта" для сортування за кодом. Натисніть заголовок стовпця з курсом для сортування за значенням. Повторний клік змінює напрямок.' },
      { q: 'Чи підходять курси для розрахунків?', a: 'Курси мають інформаційний характер і можуть відрізнятися від банківських або обмінних курсів. Для фактичних операцій уточнюйте курси у своєму банку.' },
      { q: 'Скільки валют відображається?', a: 'Таблиця показує всі валюти, доступні через ExchangeRate-API — зазвичай 160 і більше, включаючи основні, другорядні та екзотичні валюти з усього світу.' },
      { q: "Що таке прив'язана валюта?", a: "Прив'язана валюта (фіксований курс) офіційно прив'язана до іншої валюти. Приклади: HKD прив'язаний до USD на рівні ~7,8; SAR до USD = 3,75; AED до USD = 3,67. Їх курси в таблиці майже не змінюються." },
      { q: "Чому у деяких валют дуже великі курси?", a: "Деякі валюти накопичили інфляцію, що призвело до великих номіналів. Наприклад, 1 USD ≈ 16 000+ індонезійських рупій (IDR), ≈ 38 000 в'єтнамських донгів (VND). Це нормально і не означає слабкість валюти." },
      { q: 'Що таке екзотичні валюти?', a: 'Екзотичні валюти — валюти невеликих або країн, що розвиваються, з низьким обсягом торгів: монгольський тугрик (MNT), камбоджійський рієль (KHR), фіджійський долар (FJD). У реальній торгівлі вони можуть мати широкий спред.' },
      { q: 'Як знайти валюту за назвою?', a: 'Введіть код валюти (наприклад, "EUR") або її назву (наприклад, "Euro" або "Євро") у поле пошуку над таблицею. Таблиця фільтрується в реальному часі.' },
      { q: 'Чим таблиця курсів відрізняється від конвертера?', a: 'Таблиця показує всі 160+ валют одночасно відносно однієї базової — зручно для порівняння. Конвертер дозволяє ввести конкретну суму та перерахувати між будь-якими двома валютами з точним результатом.' },
    ],
  },
  fr: {
    description: 'Consultez les taux de change en direct de plus de 160 devises mondiales. Sélectionnez une devise de base dans la liste déroulante pour voir tous les taux par rapport à elle. Cliquez sur les en-têtes de colonnes pour trier. Utilisez la recherche pour trouver rapidement une devise.\n\nTous les taux sont mis à jour toutes les 6 heures depuis ExchangeRate-API et couvrent les devises de tous les continents — des paires majeures EUR/USD et GBP/USD aux devises exotiques du Pacifique et des Caraïbes.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'À quelle fréquence les taux sont-ils mis à jour ?', a: 'Les taux sont récupérés d\'ExchangeRate-API et mis en cache pendant 6 heures, offrant des chargements rapides tout en maintenant des données raisonnablement actuelles.' },
      { q: 'Comment changer la devise de base ?', a: 'Utilisez la liste déroulante "Devise de base" en haut du tableau. Les devises les plus courantes pour votre région sont listées. Tous les taux se recalculeront par rapport à votre choix.' },
      { q: 'Comment trier le tableau ?', a: 'Cliquez sur l\'en-tête "Devise" pour trier par code de devise. Cliquez sur l\'en-tête du taux pour trier par valeur. Cliquez à nouveau pour inverser le tri.' },
      { q: 'Ces taux conviennent-ils aux transactions ?', a: 'Les taux sont fournis à titre informatif et peuvent différer des taux bancaires ou des bureaux de change. Vérifiez toujours auprès de votre établissement financier.' },
      { q: 'Combien de devises sont affichées ?', a: 'Le tableau affiche toutes les devises disponibles via ExchangeRate-API — généralement 160 ou plus, incluant les devises majeures, mineures et exotiques du monde entier.' },
      { q: 'Qu\'est-ce qu\'une devise ancrée (pegged) ?', a: 'Une devise ancrée est officiellement liée à une autre devise à un taux fixe. Exemples : HKD ancré à l\'USD à ~7,8 ; SAR à 3,75 ; AED à 3,67. Leurs taux dans le tableau varient très peu au quotidien.' },
      { q: 'Pourquoi certaines devises ont-elles des taux très élevés ?', a: 'Certaines devises ont accumulé de l\'inflation historiquement, entraînant de grands montants nominaux. Par exemple, 1 USD ≈ 16 000+ roupies indonésiennes (IDR) ou ≈ 38 000 dongs vietnamiens (VND). C\'est normal et ne reflète pas une faiblesse de la devise.' },
      { q: 'Qu\'est-ce qu\'une devise exotique ?', a: 'Les devises exotiques proviennent d\'économies plus petites ou émergentes avec un faible volume d\'échanges — comme le Tugrik mongol (MNT), le Riel cambodgien (KHR) ou le Dollar fidjien (FJD). Elles ont souvent des écarts plus larges en trading réel.' },
      { q: 'Comment rechercher une devise par nom ?', a: 'Tapez le code devise (ex. "EUR") ou le nom complet (ex. "Euro") dans la boîte de recherche au-dessus du tableau. Le tableau filtre en temps réel pour n\'afficher que les résultats correspondants.' },
      { q: 'Quelle est la différence entre ce tableau et le convertisseur ?', a: 'Le tableau affiche les 160+ devises simultanément par rapport à une devise de base — idéal pour comparer. Le convertisseur vous permet de saisir un montant précis et de convertir entre deux devises avec le résultat exact.' },
    ],
  },
  lt: {
    description: 'Peržiūrėkite daugiau nei 160 pasaulio valiutų realaus laiko kursus. Pasirinkite bazinę valiutą iš išskleidžiamojo sąrašo, kad matytumėte visus kursus jos atžvilgiu. Spustelėkite stulpelių antraštes rūšiavimui. Naudokite paiešką greitam valiutos radimui.\n\nVisi kursai atnaujinami kas 6 valandas iš ExchangeRate-API ir apima valiutas iš visų žemynų — nuo pagrindinių porų EUR/USD ir GBP/USD iki egzotiškų Ramiojo vandenyno ir Karibų valiutų.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip dažnai atnaujinami kursai?', a: 'Kursai gaunami iš ExchangeRate-API ir talpinami 6 valandoms, užtikrinant greitą puslapio įkėlimą ir pakankamai aktualius duomenis.' },
      { q: 'Kaip pakeisti bazinę valiutą?', a: 'Naudokite "Bazinė valiuta" išskleidžiamąjį sąrašą lentelės viršuje. Ten išvardytos populiariausios jūsų regione valiutos. Visi kursai perskaičiuos pagal pasirinktą bazinę.' },
      { q: 'Kaip rūšiuoti lentelę?', a: 'Spustelėkite "Valiuta" stulpelio antraštę rūšiavimui pagal kodą. Spustelėkite kurso stulpelio antraštę rūšiavimui pagal vertę. Spustelėkite dar kartą, kad apverstumėte.' },
      { q: 'Ar kursai tinkami sandoriams?', a: 'Kursai teikiami tik informaciniais tikslais ir gali skirtis nuo bankų ar keityklų kursų. Prieš valiutos operacijas visada pasitikrinkite savo banke.' },
      { q: 'Kiek valiutų rodoma?', a: 'Lentelėje rodomos visos valiutos, pasiekiamos per ExchangeRate-API — paprastai 160 ar daugiau, įskaitant pagrindines, antrines ir egzotiškas visame pasaulyje.' },
      { q: 'Kas yra fiksuoto kurso valiuta?', a: 'Fiksuoto kurso valiuta oficialiai susieta su kita valiuta nustatytu kursu. Pavyzdžiai: HKD susietas su USD ~7,8; SAR su USD = 3,75; AED su USD = 3,67. Jų kursai lentelėje beveik nesikeičia.' },
      { q: 'Kodėl kai kurių valiutų kursai labai dideli?', a: 'Kai kurios valiutos istoriškai sukaupė infliaciją, todėl nominalai dideli. Pvz., 1 USD ≈ 16 000+ Indonezijos rupijų (IDR), ≈ 38 000 Vietnamo dongų (VND). Tai normalu ir nereiškia valiutos silpnumo.' },
      { q: 'Kas yra egzotiškos valiutos?', a: 'Egzotiškos valiutos — mažesnių ar besivystančių ekonomikų valiutos su mažu prekybos apimtimi: Mongolijos tugrikai (MNT), Kambodžos rieliai (KHR), Fidžio doleriai (FJD). Jos gali turėti platesnį spread realioje prekyboje.' },
      { q: 'Kaip ieškoti valiutos pagal pavadinimą?', a: 'Paieškos laukelyje virš lentelės įveskite valiutos kodą (pvz., "EUR") arba pavadinimą (pvz., "Euro"). Lentelė filtruojama realiuoju laiku, rodant tik atitinkamus rezultatus.' },
      { q: 'Kuo ši lentelė skiriasi nuo valiutų keitiklio?', a: 'Lentelė vienu metu rodo visas 160+ valiutų vienos bazinės atžvilgiu — idealu palyginimui. Keitiklis leidžia įvesti konkrečią sumą ir konvertuoti tarp bet kurių dviejų valiutų su tiksliu rezultatu.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/currency', label: 'Currency Converter' }, { href: '/crypto', label: 'Crypto Rates' }, { href: '/crypto/converter', label: 'Crypto Converter' }, { href: '/calculator/compound-interest', label: 'Compound Interest Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }],
  ru: [{ href: '/currency', label: 'Конвертер валют' }, { href: '/crypto', label: 'Курс криптовалют' }, { href: '/crypto/converter', label: 'Конвертер криптовалют' }, { href: '/calculator/compound-interest', label: 'Сложные проценты' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }],
  uk: [{ href: '/currency', label: 'Конвертер валют' }, { href: '/crypto', label: 'Курс криптовалют' }, { href: '/crypto/converter', label: 'Конвертер криптовалют' }, { href: '/calculator/compound-interest', label: 'Складні відсотки' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }],
  fr: [{ href: '/currency', label: 'Convertisseur de devises' }, { href: '/crypto', label: 'Cours des cryptos' }, { href: '/crypto/converter', label: 'Convertisseur crypto' }, { href: '/calculator/compound-interest', label: 'Intérêts composés' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }],
  lt: [{ href: '/currency', label: 'Valiutų keitiklis' }, { href: '/crypto', label: 'Kriptovaliutų kursai' }, { href: '/crypto/converter', label: 'Kriptovaliutų keitiklis' }, { href: '/calculator/compound-interest', label: 'Sudėtinių palūkanų skaičiuotuvas' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }],
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

  return buildMetadata(locale, '/currency/rates', meta);
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
        <ToolActions />
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

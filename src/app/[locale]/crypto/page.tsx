import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import CryptoTable from './CryptoTable';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import { getCryptoRates } from './shared';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/crypto/converter', label: 'Crypto Converter' }, { href: '/currency', label: 'Currency Converter' }],
  ru: [{ href: '/crypto/converter', label: 'Конвертер криптовалют' }, { href: '/currency', label: 'Конвертер валют' }],
  uk: [{ href: '/crypto/converter', label: 'Конвертер криптовалют' }, { href: '/currency', label: 'Конвертер валют' }],
  fr: [{ href: '/crypto/converter', label: 'Convertisseur crypto' }, { href: '/currency', label: 'Convertisseur de devises' }],
  lt: [{ href: '/crypto/converter', label: 'Kriptovaliutų keitiklis' }, { href: '/currency', label: 'Valiutų keitiklis' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Cryptocurrency Prices — Live Bitcoin & Ethereum Rates',
    description: 'Live cryptocurrency prices for top 50 coins: Bitcoin (BTC), Ethereum (ETH), Solana (SOL) and more. Sortable table with 24h change and market cap. Updated every 5 minutes.',
    h1: 'Cryptocurrency Prices',
  },
  ru: {
    title: 'Курс криптовалют онлайн — Bitcoin, Ethereum и топ-50 монет',
    description: 'Актуальные курсы топ-50 криптовалют: Bitcoin (BTC), Ethereum (ETH), Solana (SOL) и другие. Таблица с сортировкой по цене, изменению и капитализации. Обновляется каждые 5 минут.',
    h1: 'Курс криптовалют',
  },
  uk: {
    title: 'Курс криптовалют онлайн — Bitcoin, Ethereum та обмін крипти',
    description: 'Актуальні курси топ-50 криптовалют: Bitcoin (BTC), Ethereum (ETH), Solana (SOL) та інші. Обмін крипти — конвертер доступний на окремій сторінці. Таблиця оновлюється кожні 5 хвилин.',
    h1: 'Курс криптовалют',
  },
  fr: {
    title: 'Prix des Cryptomonnaies — Bitcoin, Ethereum en direct',
    description: 'Prix en direct du top 50 des cryptomonnaies : Bitcoin (BTC), Ethereum (ETH), Solana (SOL) et plus. Tableau triable par prix, variation 24h et capitalisation. Mis à jour toutes les 5 minutes.',
    h1: 'Prix des Cryptomonnaies',
  },
  lt: {
    title: 'Kriptovaliutų Kursai — Bitcoin, Ethereum ir Top 50 Realiu Laiku',
    description: 'Realaus laiko top 50 kriptovaliutų kainų lentelė: Bitcoin, Ethereum, Solana ir kitos. Rūšiuojama pagal kainą, 24h pokytį ir kapitalizaciją. Atnaujinama kas 5 minutes.',
    h1: 'Kriptovaliutų Kursai',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Track live prices of the top 50 cryptocurrencies by market capitalization. Click any column header to sort by name, price, 24h change, or market cap. Use the search box to quickly find a specific coin by name or symbol. Prices are sourced from CoinGecko and refreshed every 5 minutes.\n\nTo convert any coin to your local currency (USD, EUR, GBP, RUB, UAH, etc.), use the Crypto Converter linked in related tools. The converter supports all 50 coins shown here and 14 fiat currencies.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How often are prices updated?', a: 'Prices are fetched from CoinGecko every 5 minutes. This provides near-real-time data suitable for monitoring market trends without exceeding the free API rate limits. For trading-grade real-time data (millisecond updates), use a dedicated exchange feed.' },
      { q: 'How do I sort the table?', a: 'Click any column header — Name, Price (USD), 24h Change, or Market Cap — to sort the table. Click the same header again to reverse the sort direction. Arrows next to the column name indicate the current sort order and direction.' },
      { q: 'Which coins are shown?', a: 'The table shows the top 50 cryptocurrencies by market capitalization. The list is dynamic and always reflects the current top 50 ranked by market cap. This typically includes Bitcoin (BTC), Ethereum (ETH), Tether (USDT), BNB, Solana (SOL), XRP, USDC, Cardano (ADA), Dogecoin (DOGE), and others.' },
      { q: 'What is market capitalization in crypto?', a: 'Market capitalization (market cap) is the total value of all coins in circulation: Market Cap = Current Price × Circulating Supply. Bitcoin\'s market cap of ~$1.3 trillion (at $65,000 per BTC with ~20M BTC in circulation) makes it the largest cryptocurrency. Market cap is a key indicator of a coin\'s relative size and liquidity — higher cap coins are generally less volatile.' },
      { q: 'What does the 24h change show?', a: 'The 24h change shows the percentage price movement over the last 24 hours. A green +5.2% means the coin is up 5.2% compared to the price 24 hours ago. A red -3.1% means it has fallen 3.1%. This is calculated from the exact price 24 hours before the current timestamp, not from the opening of a calendar day.' },
      { q: 'How do I convert crypto to fiat currency?', a: 'Use the Crypto Converter (linked in related tools above) to convert any coin to USD, EUR, GBP, RUB, UAH and 10 other currencies. Simply select the coin, enter the amount, and choose your target currency. Conversion rates use the same CoinGecko prices shown in this table, combined with fiat exchange rates updated every 6 hours.' },
      { q: 'Where can I buy cryptocurrency?', a: 'Cryptocurrencies can be bought on centralised exchanges (CEX) such as Binance, Coinbase, Kraken, OKX, or KuCoin, and on decentralised exchanges (DEX) such as Uniswap or PancakeSwap. For beginners, centralised exchanges are generally easier to use and offer fiat on-ramps (bank transfer, card). Always use regulated exchanges and enable two-factor authentication.' },
      { q: 'What is the difference between price and market cap?', a: 'Price is how much one coin costs in USD. Market cap is the total value of all coins in circulation. A coin with a low price but high supply can have a larger market cap than a high-priced coin with low supply. Example: if Coin A costs $0.01 with 10 trillion coins, its market cap is $100 billion. Coin B at $50,000 with 1 million coins also has a $50 billion market cap. Price alone doesn\'t tell you the true "size" of a crypto.' },
      { q: 'Are these prices suitable for trading?', a: 'The prices are indicative with up to 5 minutes of delay. They are not suitable for high-frequency or real-time trading decisions. For actual trades, always use the live orderbook price on the exchange where you are trading — spreads, depth, and fees all affect the final execution price.' },
      { q: 'Why is Bitcoin the largest cryptocurrency?', a: 'Bitcoin (BTC) was the first cryptocurrency, launched in 2009 by Satoshi Nakamoto. Its 15+ years of network history, fixed supply cap of 21 million BTC, decentralised mining network, and institutional adoption (ETFs, corporate treasuries) give it the highest market cap and brand recognition. Ethereum is the second largest, valued for its smart contract capabilities and developer ecosystem.' },
    ],
  },
  ru: {
    description: 'Отслеживайте актуальные цены топ-50 криптовалют по рыночной капитализации. Нажмите на заголовок любой колонки для сортировки по названию, цене, изменению за 24ч или капитализации. Используйте поиск для быстрого нахождения монеты по имени или символу. Данные от CoinGecko, обновляются каждые 5 минут.\n\nДля конвертации любой монеты в рубли, доллары, евро, гривны и другие валюты используйте Конвертер криптовалют из раздела «Похожие инструменты». Поддерживаются все 50 монет из таблицы и 14 фиатных валют.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как часто обновляются цены?', a: 'Цены получаются от CoinGecko каждые 5 минут. Это обеспечивает актуальность без превышения лимитов бесплатного API. Для торговли в реальном времени используйте данные торговой биржи.' },
      { q: 'Как сортировать таблицу?', a: 'Нажмите на заголовок колонки — Название, Цена (USD), Изменение 24ч или Капитализация — для сортировки. Повторный клик меняет направление. Стрелки рядом с названием показывают текущую сортировку.' },
      { q: 'Какие монеты отображаются?', a: 'Таблица показывает топ-50 криптовалют по рыночной капитализации: Bitcoin (BTC), Ethereum (ETH), Tether (USDT), BNB, Solana (SOL), XRP, Cardano, Dogecoin и другие. Список обновляется динамически.' },
      { q: 'Что такое рыночная капитализация в крипте?', a: 'Рыночная капитализация = Цена × Количество монет в обращении. Капитализация Bitcoin ~$1.3 трлн (при цене $65 000 × ~20 млн BTC) делает его крупнейшей криптовалютой. Капитализация — ключевой показатель размера и ликвидности: монеты с высокой капитализацией обычно менее волатильны.' },
      { q: 'Что показывает изменение за 24ч?', a: 'Изменение за 24ч — процентное движение цены за последние 24 часа. Зелёный +5.2% означает рост на 5.2% по сравнению с ценой 24 часа назад. Красный -3.1% — падение на 3.1%. Рассчитывается от точной цены 24 часа назад, а не от открытия календарного дня.' },
      { q: 'Как конвертировать криптовалюту в рубли онлайн?', a: 'Используйте Конвертер криптовалют (ссылка в похожих инструментах выше) для перевода любой монеты в рубли, доллары, евро, гривны и ещё 10 валют. Выберите монету, введите сумму и выберите RUB — результат мгновенный. Курсы те же, что в этой таблице.' },
      { q: 'Где можно купить криптовалюту?', a: 'Криптовалюты продаются на централизованных биржах (Binance, OKX, ByBit, KuCoin) и децентрализованных (Uniswap, PancakeSwap). Для новичков централизованные биржи удобнее: есть пополнение рублями через P2P или карту. Используйте только регулируемые биржи и обязательно включите двухфакторную аутентификацию.' },
      { q: 'В чём разница между ценой и капитализацией?', a: 'Цена — стоимость одной монеты. Капитализация — общая стоимость всех монет в обращении. Монета с низкой ценой и огромным предложением может иметь бо́льшую капитализацию, чем дорогая монета с малым предложением. Цена сама по себе не отражает «размер» криптовалюты.' },
      { q: 'Подходят ли цены для торговли?', a: 'Цены ориентировочные с задержкой до 5 минут. Для торговых решений в реальном времени используйте данные вашей торговой платформы — спреды, глубина стакана и комиссии влияют на итоговую цену исполнения.' },
      { q: 'Почему Bitcoin — крупнейшая криптовалюта?', a: 'Bitcoin — первая криптовалюта (2009, Сатоши Накамото). Более 15 лет истории сети, фиксированный лимит в 21 млн BTC, децентрализованный майнинг и институциональное принятие (ETF, корпоративные резервы) делают его крупнейшим по капитализации. Ethereum занимает второе место благодаря смарт-контрактам и экосистеме разработчиков.' },
    ],
  },
  uk: {
    description: 'Відстежуйте актуальні ціни топ-50 криптовалют за ринковою капіталізацією. Курс криптовалют онлайн — натисніть на заголовок будь-якого стовпця для сортування. Використовуйте пошук для швидкого знаходження монети. Дані від CoinGecko, оновлюються кожні 5 хвилин.\n\nДля обміну крипти у гривні, долари, євро та інші валюти — скористайтеся Конвертером криптовалют з розділу «Схожі інструменти». Підтримуються всі 50 монет з таблиці і 14 фіатних валют.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як часто оновлюються ціни?', a: 'Ціни отримуються від CoinGecko кожні 5 хвилин. Для торгівлі у реальному часі використовуйте дані торгової біржі.' },
      { q: 'Як сортувати таблицю?', a: 'Натисніть на заголовок стовпця — Назва, Ціна (USD), Зміна 24г або Капіталізація. Повторний клік змінює напрямок. Стрілки показують поточне сортування.' },
      { q: 'Які монети відображаються?', a: 'Таблиця показує топ-50 криптовалют за ринковою капіталізацією: Bitcoin (BTC), Ethereum (ETH), Tether (USDT), BNB, Solana (SOL), XRP, Cardano, Dogecoin та інші. Список оновлюється динамічно.' },
      { q: 'Що таке ринкова капіталізація в крипті?', a: 'Ринкова капіталізація = Ціна × Кількість монет в обігу. Bitcoin з капіталізацією ~$1.3 трлн є найбільшою криптовалютою. Капіталізація — ключовий показник розміру і ліквідності: монети з високою капіталізацією зазвичай менш волатильні.' },
      { q: 'Що показує зміна за 24 год?', a: 'Зміна за 24 год — відсоткова зміна ціни за останні 24 години. Зелений +5.2% — зростання на 5.2% порівняно з ціною 24 години тому. Червоний -3.1% — падіння на 3.1%.' },
      { q: 'Як конвертувати криптовалюту у гривні (обмін крипти)?', a: 'Скористайтеся Конвертером криптовалют (посилання у схожих інструментах вище) для переведення будь-якої монети у гривні, долари, євро та ще 10 валют. Виберіть монету, введіть суму і виберіть UAH — результат миттєвий.' },
      { q: 'Де можна купити криптовалюту?', a: 'Криптовалюти продаються на централізованих біржах (Binance, OKX, WhiteBIT) та децентралізованих (Uniswap). Для початківців зручніші централізовані біржі: є поповнення гривнями через P2P або картку. Використовуйте лише регульовані біржі і обов\'язково увімкніть двофакторну аутентифікацію.' },
      { q: 'У чому різниця між ціною і капіталізацією?', a: 'Ціна — вартість однієї монети. Капіталізація — загальна вартість усіх монет в обігу. Монета з низькою ціною і величезним обсягом може мати більшу капіталізацію, ніж дорога монета з малим обсягом. Ціна сама по собі не відображає «розмір» криптовалюти.' },
      { q: 'Чи підходять ціни для торгівлі?', a: 'Ціни орієнтовні із затримкою до 5 хвилин. Для реальних торгових рішень використовуйте дані вашої торгової платформи.' },
      { q: 'Чому Bitcoin — найбільша криптовалюта?', a: 'Bitcoin — перша криптовалюта (2009, Сатоші Накамото). Понад 15 років мережі, фіксований ліміт 21 млн BTC, децентралізований майнінг та інституційне прийняття (ETF, корпоративні резерви) роблять його найбільшим за капіталізацією.' },
    ],
  },
  fr: {
    description: 'Suivez les prix en direct du top 50 des cryptomonnaies par capitalisation boursière. Cliquez sur n\'importe quel en-tête de colonne pour trier par nom, prix, variation 24h ou capitalisation. Utilisez la recherche pour trouver rapidement une crypto. Données de CoinGecko, mises à jour toutes les 5 minutes.\n\nPour convertir n\'importe quelle crypto en euros, dollars, livres et autres devises, utilisez le Convertisseur Crypto dans les outils connexes. Il prend en charge les 50 monnaies du tableau et 14 devises fiat.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'À quelle fréquence les prix sont-ils mis à jour ?', a: 'Les prix sont récupérés de CoinGecko toutes les 5 minutes. Pour le trading en temps réel, utilisez le flux de données de votre plateforme d\'échange.' },
      { q: 'Comment trier le tableau ?', a: 'Cliquez sur un en-tête de colonne — Nom, Prix (USD), Variation 24h ou Capitalisation — pour trier. Cliquez à nouveau pour inverser. Les flèches indiquent le tri actuel.' },
      { q: 'Quelles cryptomonnaies sont affichées ?', a: 'Le tableau affiche le top 50 des cryptomonnaies par capitalisation : Bitcoin (BTC), Ethereum (ETH), Tether (USDT), BNB, Solana (SOL), XRP, Cardano, Dogecoin et d\'autres. La liste est mise à jour dynamiquement.' },
      { q: 'Qu\'est-ce que la capitalisation boursière en crypto ?', a: 'La capitalisation boursière = Prix × Offre en circulation. Avec ~$1 300 milliards, Bitcoin est la plus grande crypto. La capitalisation est le principal indicateur de la taille et de la liquidité d\'une crypto — plus elle est élevée, moins la volatilité est généralement importante.' },
      { q: 'Que signifie la variation 24h ?', a: 'La variation 24h montre le pourcentage de mouvement de prix sur les 24 dernières heures. Un +5,2 % vert indique une hausse de 5,2 % par rapport au prix d\'il y a 24 heures. Un -3,1 % rouge indique une baisse de 3,1 %.' },
      { q: 'Comment convertir des cryptos en euros ?', a: 'Utilisez le Convertisseur Crypto (lien dans les outils connexes) pour convertir n\'importe quelle crypto en euros, dollars, livres, roubles et 10 autres devises. Sélectionnez la crypto, entrez le montant et choisissez EUR — résultat instantané.' },
      { q: 'Où acheter des cryptomonnaies ?', a: 'Les cryptomonnaies s\'achètent sur les échanges centralisés (CEX) comme Binance, Coinbase, Kraken, ou sur les échanges décentralisés (DEX) comme Uniswap. Pour les débutants, les CEX sont plus accessibles et proposent des dépôts en euros par virement ou carte. N\'utilisez que des plateformes régulées et activez la double authentification.' },
      { q: 'Quelle est la différence entre prix et capitalisation ?', a: 'Le prix est le coût d\'une seule unité. La capitalisation est la valeur totale de toutes les unités en circulation. Une crypto peu chère avec une offre massive peut avoir une capitalisation plus grande qu\'une crypto chère avec peu d\'unités. Le prix seul ne reflète pas la "taille" d\'une cryptomonnaie.' },
      { q: 'Ces prix conviennent-ils au trading ?', a: 'Les prix sont indicatifs avec jusqu\'à 5 minutes de délai. Pour le trading actif, utilisez toujours les données en temps réel de votre plateforme — les spreads, la profondeur de marché et les frais affectent le prix d\'exécution.' },
      { q: 'Pourquoi Bitcoin est-il la plus grande cryptomonnaie ?', a: 'Bitcoin est la première cryptomonnaie (2009, Satoshi Nakamoto). Plus de 15 ans d\'historique réseau, une offre maximale fixée à 21 millions de BTC, un réseau de minage décentralisé et une adoption institutionnelle (ETF Bitcoin spot, trésoreries d\'entreprises) en font la crypto la plus capitalisée et reconnue.' },
    ],
  },
  lt: {
    description: 'Stebėkite 50 populiariausių kriptovaliutų kainas pagal rinkos kapitalizaciją. Spustelėkite bet kurį stulpelio antraštę rūšiavimui pagal pavadinimą, kainą, 24h pokytį ar kapitalizaciją. Naudokite paiešką greitam monetų radimui. Duomenys iš CoinGecko, atnaujinami kas 5 minutes.\n\nBet kurios monetos konvertavimui į eurus, dolerius, rublius ir kitas valiutas naudokite Kriptovaliutų Keitiklį iš susijusių įrankių. Palaiko visas 50 lentelės monetų ir 14 fiat valiutų.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip dažnai atnaujinamos kainos?', a: 'Kainos gaunamos iš CoinGecko kas 5 minutes. Realaus laiko prekybai naudokite savo biržos duomenų srautą.' },
      { q: 'Kaip rūšiuoti lentelę?', a: 'Spustelėkite stulpelio antraštę — Pavadinimas, Kaina (USD), Pokytis 24h ar Rinkos kap. Spustelėkite dar kartą, kad apverstumėte rūšiavimą. Rodyklės rodo dabartinį rūšiavimą.' },
      { q: 'Kokios monetos rodomos?', a: 'Lentelėje rodomos 50 populiariausių kriptovaliutų pagal rinkos kapitalizaciją: Bitcoin (BTC), Ethereum (ETH), Tether (USDT), BNB, Solana (SOL), XRP, Cardano, Dogecoin ir kitos. Sąrašas atnaujinamas dinamiškai.' },
      { q: 'Kas yra rinkos kapitalizacija kriptovaliutose?', a: 'Rinkos kapitalizacija = Kaina × Cirkuliuojantis kiekis. Bitcoin kapitalizacija ~$1,3 trln daro jį didžiausia kriptovaliuta. Kapitalizacija yra pagrindinis monetų dydžio ir likvidumo rodiklis — didesnės kapitalizacijos monetos paprastai yra mažiau nepastovios.' },
      { q: 'Ką rodo 24h pokytis?', a: '24h pokytis rodo kainų judėjimo procentą per paskutines 24 valandas. Žalias +5,2% reiškia 5,2% augimą. Raudonas -3,1% reiškia 3,1% kritimą, palyginti su kaina prieš 24 valandas.' },
      { q: 'Kaip konvertuoti kriptovaliutas į eurus?', a: 'Naudokite Kriptovaliutų Keitiklį (nuoroda susijusiuose įrankiuose aukščiau), kad konvertuotumėte bet kurią monetą į eurus, dolerius, rublius ir kitas valiutas. Pasirinkite monetą, įveskite sumą ir EUR — rezultatas momentinis.' },
      { q: 'Kur galima nusipirkti kriptovaliutą?', a: 'Kriptovaliutos parduodamos centralizuotose biržose (Binance, Coinbase, Kraken) ir decentralizuotose (Uniswap). Pradedantiesiems centralizuotos biržos patogesnės: yra eurų papildymas banko pavedimu ar kortele. Naudokite tik reguliuojamas platformas ir įjunkite dviejų veiksnių autentifikaciją.' },
      { q: 'Koks skirtumas tarp kainos ir kapitalizacijos?', a: 'Kaina yra vieno vieneto kaina. Kapitalizacija yra visų cirkuliuojančių vienetų bendra vertė. Pigi moneta su didele pasiūla gali turėti didesnę kapitalizaciją nei brangi moneta su mažu kiekiu. Kaina viena nerodo kriptovaliutos „dydžio".' },
      { q: 'Ar kainos tinkamos prekybai?', a: 'Kainos yra orientacinės su iki 5 minučių vėlavimu. Aktyviai prekybai visada naudokite savo platformos realaus laiko duomenis.' },
      { q: 'Kodėl Bitcoin yra didžiausia kriptovaliuta?', a: 'Bitcoin yra pirmoji kriptovaliuta (2009, Satoshi Nakamoto). Daugiau nei 15 metų tinklo istorija, fiksuota 21 mln BTC riba, decentralizuotas kasybos tinklas ir institucinis priėmimas (ETF, korporatyviniai rezervai) daro jį didžiausios kapitalizacijos kriptovaliuta.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/crypto'),
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function CryptoPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;
  const coins = await getCryptoRates();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/crypto`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <CryptoTable locale={locale} coins={coins} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
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

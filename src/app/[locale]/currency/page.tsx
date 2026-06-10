import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import CurrencyConverter from './CurrencyConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/crypto', label: 'Crypto Rates' }, { href: '/currency/rates', label: 'Exchange Rates Table' }, { href: '/crypto/converter', label: 'Crypto Converter' }, { href: '/calculator/crypto-tax', label: 'Crypto Tax Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }],
  ru: [{ href: '/crypto', label: 'Курс криптовалют' }, { href: '/currency/rates', label: 'Таблица курсов валют' }, { href: '/crypto/converter', label: 'Конвертер криптовалют' }, { href: '/calculator/crypto-tax', label: 'Калькулятор налога на крипту' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }],
  uk: [{ href: '/crypto', label: 'Курс криптовалют' }, { href: '/currency/rates', label: 'Таблиця курсів валют' }, { href: '/crypto/converter', label: 'Конвертер криптовалют' }, { href: '/calculator/crypto-tax', label: 'Калькулятор податку на крипту' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }],
  fr: [{ href: '/crypto', label: 'Cours des cryptos' }, { href: '/currency/rates', label: 'Tableau des taux de change' }, { href: '/crypto/converter', label: 'Convertisseur crypto' }, { href: '/calculator/crypto-tax', label: 'Taxe sur les cryptos' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }],
  lt: [{ href: '/crypto', label: 'Kriptovaliutų kursai' }, { href: '/currency/rates', label: 'Valiutų kursų lentelė' }, { href: '/crypto/converter', label: 'Kriptovaliutų keitiklis' }, { href: '/calculator/crypto-tax', label: 'Kriptovaliutų mokesčiai' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }],
};

type Props = { params: Promise<{ locale: string }> };

async function getRates(): Promise<{ rates: Record<string, number>; updatedAt: string }> {
  const apiKey = process.env.EXCHANGERATE_API_KEY;
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`,
      { next: { revalidate: 21600 } },
    );
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return {
      rates: data.conversion_rates as Record<string, number>,
      updatedAt: data.time_last_update_utc as string,
    };
  } catch {
    return { rates: {}, updatedAt: new Date().toISOString() };
  }
}

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Currency Converter — Live Exchange Rates',
    description: 'Free online currency converter with live exchange rates. Convert USD, EUR, GBP, RUB, UAH and 150+ currencies instantly. Rates updated every 6 hours.',
    h1: 'Currency Converter',
  },
  ru: {
    title: 'Конвертер валют — Курсы валют онлайн',
    description: 'Бесплатный конвертер валют онлайн с актуальными курсами. Конвертируйте USD, EUR, RUB, UAH, GBP и более 150 валют. Курсы обновляются каждые 6 часов.',
    h1: 'Конвертер валют',
  },
  uk: {
    title: 'Конвертер валют — Курси валют онлайн',
    description: 'Безкоштовний конвертер валют онлайн з актуальними курсами. Конвертуйте USD, EUR, UAH, RUB, GBP та понад 150 валют. Курси оновлюються кожні 6 годин.',
    h1: 'Конвертер валют',
  },
  fr: {
    title: 'Convertisseur de Devises — Taux de Change en Direct',
    description: 'Convertisseur de devises gratuit avec taux de change en temps réel. Convertissez USD, EUR, GBP et plus de 150 devises instantanément. Taux mis à jour toutes les 6 heures.',
    h1: 'Convertisseur de Devises',
  },
  lt: {
    title: 'Valiutų Keitiklis — Valiutų Kursai Internete',
    description: 'Nemokamas valiutų keitiklis su naujausiais kursais. Konvertuokite USD, EUR, GBP ir daugiau nei 150 valiutų akimirksniu. Kursai atnaujinami kas 6 valandas.',
    h1: 'Valiutų Keitiklis',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our free currency converter uses live exchange rates updated every 6 hours to give you accurate conversions for over 150 world currencies. Whether you need to convert dollars to euros, rubles to dollars, or any other pair — simply enter the amount, select currencies, and get the result instantly.\n\nThe converter also shows a popular rates table with 12 major currencies so you can compare multiple pairs at a glance. No registration, no sign-up — just fast, accurate currency conversion.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How often are exchange rates updated?',
        a: 'Exchange rates are fetched from ExchangeRate-API and cached for 6 hours. This means the rates you see are updated every 6 hours, reflecting accurate daily market data.',
      },
      {
        q: 'Which base currency is used for calculations?',
        a: 'All rates are stored relative to USD (US Dollar). When you convert between two non-USD currencies, the cross-rate is calculated automatically: amount ÷ from_rate × to_rate.',
      },
      {
        q: 'Which currencies are supported?',
        a: 'The converter supports over 150 world currencies including USD, EUR, GBP, JPY, CHF, CAD, AUD, CNY, RUB, UAH, PLN, TRY, INR, and many more.',
      },
      {
        q: 'Are these rates suitable for financial transactions?',
        a: 'These rates are indicative mid-market rates and may differ from rates offered by banks or exchange services. Always check with your bank or payment provider before making financial decisions.',
      },
      {
        q: 'How do I convert multiple amounts at once?',
        a: 'The popular rates table below the converter shows 1 unit of your selected currency converted to 12 popular currencies simultaneously. Change the "From" currency to update the entire table.',
      },
      {
        q: 'What is the difference between mid-market rate and bank rate?',
        a: 'The mid-market rate (also called interbank rate) is the midpoint between buy and sell prices on global currency markets. Banks and exchange offices add a spread or commission on top, so the rate they offer is less favourable. Our converter shows the raw mid-market rate.',
      },
      {
        q: 'How do I calculate the reverse conversion?',
        a: 'Simply swap the "From" and "To" currencies by clicking the swap button (↕). Alternatively, divide 1 by the displayed rate. For example, if 1 USD = 0.92 EUR, then 1 EUR = 1 ÷ 0.92 = 1.087 USD.',
      },
      {
        q: 'Why do airport and hotel exchange rates differ so much?',
        a: 'Airport and hotel exchange desks charge much higher spreads (often 5–15%) compared to mid-market rates because they rely on convenience. For better rates, use a local ATM or a digital bank like Wise, Revolut, or N26 for international travel.',
      },
      {
        q: 'Does the converter support cryptocurrencies?',
        a: 'This converter focuses on fiat currencies (government-issued money). For cryptocurrency conversions, use the Crypto Converter tool which covers Bitcoin, Ethereum, and 50+ other coins with live CoinGecko prices.',
      },
      {
        q: 'What is a currency cross-rate?',
        a: 'A cross-rate is the exchange rate between two currencies that are both quoted against a third currency (usually USD). For example, the EUR/GBP rate is calculated as EUR/USD ÷ GBP/USD. Our converter performs this calculation automatically.',
      },
    ],
  },
  ru: {
    description: 'Наш бесплатный конвертер валют использует актуальные курсы, обновляемые каждые 6 часов, для точного пересчёта более 150 мировых валют. Введите сумму, выберите валюты и мгновенно получите результат.\n\nКонвертер также показывает таблицу популярных курсов с 12 основными валютами, чтобы сразу сравнить несколько пар. Без регистрации и подписки — быстро и точно.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Как часто обновляются курсы валют?',
        a: 'Курсы получаются от ExchangeRate-API и кэшируются на 6 часов. Данные обновляются каждые 6 часов и отражают актуальные рыночные значения.',
      },
      {
        q: 'Какая базовая валюта используется для расчётов?',
        a: 'Все курсы хранятся относительно доллара США (USD). При конвертации между двумя валютами без USD кросс-курс рассчитывается автоматически: сумма ÷ курс_из × курс_в.',
      },
      {
        q: 'Какие валюты поддерживаются?',
        a: 'Конвертер поддерживает более 150 мировых валют: USD, EUR, GBP, JPY, CHF, CAD, AUD, CNY, RUB, UAH, PLN, TRY, INR и многие другие.',
      },
      {
        q: 'Подходят ли эти курсы для финансовых операций?',
        a: 'Это ориентировочные среднерыночные курсы. Они могут отличаться от курсов банков и обменников. Перед финансовыми операциями уточняйте курс у своего банка или платёжного провайдера.',
      },
      {
        q: 'Как увидеть курсы сразу ко многим валютам?',
        a: 'Таблица популярных курсов под конвертером показывает 1 единицу выбранной валюты «Из» в пересчёте на 12 популярных валют одновременно. Смените валюту «Из», чтобы обновить всю таблицу.',
      },
      {
        q: 'Чем среднерыночный курс отличается от банковского?',
        a: 'Среднерыночный курс (межбанковский) — это середина между ценами покупки и продажи на мировом рынке. Банки и обменники добавляют сверху спред или комиссию, поэтому предлагаемый ими курс хуже. Конвертер показывает «чистый» рыночный курс.',
      },
      {
        q: 'Как рассчитать обратную конвертацию?',
        a: 'Нажмите кнопку обмена (↕), чтобы поменять валюты местами. Или разделите 1 на отображаемый курс: если 1 USD = 90 RUB, то 1 RUB = 1 ÷ 90 = 0,0111 USD.',
      },
      {
        q: 'Почему курс в аэропорту и гостинице хуже?',
        a: 'Обменники в аэропортах и отелях добавляют высокий спред (нередко 5–15%) ради удобства расположения. Для выгодного обмена лучше использовать банкомат местного банка или карту с мультивалютным счётом (Wise, Revolut).',
      },
      {
        q: 'Поддерживаются ли криптовалюты?',
        a: 'Этот конвертер работает с фиатными (обычными государственными) валютами. Для конвертации криптовалют используйте инструмент «Конвертер криптовалют», который охватывает Bitcoin, Ethereum и 50+ монет по ценам CoinGecko.',
      },
      {
        q: 'Что такое кросс-курс?',
        a: 'Кросс-курс — это обменный курс между двумя валютами, рассчитанный через третью (обычно USD). Например, курс EUR/RUB = EUR/USD ÷ 1 × USD/RUB. Конвертер выполняет этот расчёт автоматически.',
      },
    ],
  },
  uk: {
    description: 'Наш безкоштовний конвертер валют використовує актуальні курси, які оновлюються кожні 6 годин, для точного перерахунку понад 150 світових валют. Введіть суму, оберіть валюти та миттєво отримайте результат.\n\nКонвертер також показує таблицю популярних курсів з 12 основними валютами для швидкого порівняння. Без реєстрації — швидко та точно.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Як часто оновлюються курси валют?',
        a: 'Курси отримуються від ExchangeRate-API та кешуються на 6 годин. Дані оновлюються кожні 6 годин і відображають актуальні ринкові значення.',
      },
      {
        q: 'Яка базова валюта використовується для розрахунків?',
        a: 'Усі курси зберігаються відносно долара США (USD). При конвертації між двома не-USD валютами крос-курс розраховується автоматично: сума ÷ курс_з × курс_в.',
      },
      {
        q: 'Які валюти підтримуються?',
        a: 'Конвертер підтримує понад 150 світових валют: USD, EUR, GBP, JPY, CHF, CAD, AUD, CNY, RUB, UAH, PLN, TRY, INR та багато інших.',
      },
      {
        q: 'Чи підходять ці курси для фінансових операцій?',
        a: 'Це орієнтовні середньоринкові курси. Вони можуть відрізнятися від курсів банків та обмінників. Перед фінансовими операціями уточнюйте курс у свого банку або платіжного провайдера.',
      },
      {
        q: 'Як побачити курси до багатьох валют одразу?',
        a: 'Таблиця популярних курсів під конвертером показує 1 одиницю обраної валюти «З» у перерахунку на 12 популярних валют одночасно. Змініть валюту «З», щоб оновити всю таблицю.',
      },
      {
        q: 'Чим середньоринковий курс відрізняється від банківського?',
        a: 'Середньоринковий курс (міжбанківський) — це середина між ціною купівлі та продажу на світовому ринку. Банки та обмінники додають зверху спред або комісію, тому запропонований ними курс гірший. Конвертер показує «чистий» ринковий курс.',
      },
      {
        q: 'Як розрахувати зворотну конвертацію?',
        a: 'Натисніть кнопку обміну (↕), щоб поміняти валюти місцями. Або розділіть 1 на відображуваний курс: якщо 1 USD = 41 UAH, то 1 UAH = 1 ÷ 41 = 0,0244 USD.',
      },
      {
        q: 'Чому курс в аеропорту і готелі гірший?',
        a: 'Обмінники в аеропортах та готелях додають високий спред (часто 5–15%) через зручність розташування. Для вигідного обміну краще використовувати банкомат місцевого банку або картку з мультивалютним рахунком (Wise, Revolut).',
      },
      {
        q: 'Чи підтримуються криптовалюти?',
        a: 'Цей конвертер працює з фіатними (державними) валютами. Для конвертації криптовалют використовуйте інструмент «Конвертер криптовалют», який охоплює Bitcoin, Ethereum та 50+ монет за цінами CoinGecko.',
      },
      {
        q: 'Що таке крос-курс?',
        a: 'Крос-курс — це обмінний курс між двома валютами, розрахований через третю (зазвичай USD). Наприклад, курс EUR/UAH = EUR/USD × USD/UAH. Конвертер виконує цей розрахунок автоматично.',
      },
    ],
  },
  fr: {
    description: 'Notre convertisseur de devises gratuit utilise des taux de change mis à jour toutes les 6 heures pour vous fournir des conversions précises pour plus de 150 devises mondiales. Entrez le montant, sélectionnez les devises et obtenez le résultat instantanément.\n\nLe convertisseur affiche également un tableau des taux populaires avec 12 devises majeures pour comparer plusieurs paires d\'un coup d\'œil. Sans inscription ni abonnement.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'À quelle fréquence les taux sont-ils mis à jour ?',
        a: 'Les taux sont récupérés depuis ExchangeRate-API et mis en cache pendant 6 heures. Les données sont mises à jour toutes les 6 heures, reflétant des données de marché précises.',
      },
      {
        q: 'Quelle devise de base est utilisée pour les calculs ?',
        a: 'Tous les taux sont stockés par rapport au dollar américain (USD). Lors de la conversion entre deux devises non-USD, le taux croisé est calculé automatiquement : montant ÷ taux_source × taux_cible.',
      },
      {
        q: 'Quelles devises sont prises en charge ?',
        a: 'Le convertisseur prend en charge plus de 150 devises mondiales, dont USD, EUR, GBP, JPY, CHF, CAD, AUD, CNY, RUB, UAH, PLN, TRY, INR et bien d\'autres.',
      },
      {
        q: 'Ces taux sont-ils adaptés aux transactions financières ?',
        a: 'Ce sont des taux indicatifs de milieu de marché qui peuvent différer des taux proposés par les banques ou les services de change. Vérifiez toujours auprès de votre banque avant de prendre des décisions financières.',
      },
      {
        q: 'Comment voir les taux pour plusieurs devises à la fois ?',
        a: 'Le tableau des taux populaires sous le convertisseur affiche 1 unité de votre devise source convertie en 12 devises populaires simultanément. Changez la devise « De » pour mettre à jour tout le tableau.',
      },
      {
        q: 'Quelle est la différence entre taux interbancaire et taux bancaire ?',
        a: "Le taux interbancaire (mid-market) est le point médian entre les cours d\'achat et de vente sur les marchés mondiaux. Les banques et bureaux de change ajoutent une marge ou commission, rendant leur offre moins avantageuse. Notre convertisseur affiche le taux brut du marché.",
      },
      {
        q: 'Comment calculer la conversion inverse ?',
        a: 'Cliquez sur le bouton d\'échange (↕) pour inverser les devises. Ou divisez 1 par le taux affiché : si 1 USD = 0,92 EUR, alors 1 EUR = 1 ÷ 0,92 = 1,087 USD.',
      },
      {
        q: 'Pourquoi les taux en aéroport sont-ils si mauvais ?',
        a: 'Les bureaux de change en aéroport pratiquent des marges élevées (souvent 5–15%) en profitant de la captivité des voyageurs. Pour de meilleurs taux, utilisez un distributeur local ou une néobanque comme Wise ou Revolut lors de vos voyages.',
      },
      {
        q: 'Le convertisseur prend-il en charge les cryptomonnaies ?',
        a: "Ce convertisseur est dédié aux devises fiduciaires. Pour les cryptomonnaies, utilisez l\'outil Convertisseur Crypto qui couvre Bitcoin, Ethereum et plus de 50 monnaies avec des prix en temps réel de CoinGecko.",
      },
      {
        q: "Qu\'est-ce qu\'un taux croisé (cross-rate) ?",
        a: "Un taux croisé est le taux de change entre deux devises calculé via une troisième devise (généralement USD). Par exemple, le taux EUR/CHF = EUR/USD ÷ CHF/USD. Notre convertisseur effectue ce calcul automatiquement.",
      },
    ],
  },
  lt: {
    description: 'Mūsų nemokamas valiutų keitiklis naudoja aktualius kursus, atnaujinamus kas 6 valandas, tiksliam daugiau nei 150 pasaulio valiutų konvertavimui. Įveskite sumą, pasirinkite valiutas ir gaukite rezultatą akimirksniu.\n\nKeitiklis taip pat rodo populiarių kursų lentelę su 12 pagrindinių valiutų greitam palyginimui. Be registracijos — greitai ir tiksliai.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kaip dažnai atnaujinami valiutų kursai?',
        a: 'Kursai gaunami iš ExchangeRate-API ir talpinami talpykloje 6 valandoms. Duomenys atnaujinami kas 6 valandas, atspindint tikslią rinkos informaciją.',
      },
      {
        q: 'Kokia bazinė valiuta naudojama skaičiavimams?',
        a: 'Visi kursai saugomi USD (JAV dolerio) atžvilgiu. Konvertuojant tarp dviejų ne USD valiutų, kryžminis kursas skaičiuojamas automatiškai: suma ÷ šaltinio_kursas × tikslo_kursas.',
      },
      {
        q: 'Kokios valiutos palaikomos?',
        a: 'Keitiklis palaiko daugiau nei 150 pasaulio valiutų, įskaitant USD, EUR, GBP, JPY, CHF, CAD, AUD, CNY, RUB, UAH, PLN, TRY, INR ir daugelį kitų.',
      },
      {
        q: 'Ar šie kursai tinka finansinėms operacijoms?',
        a: 'Tai orientaciniai vidutinės rinkos kursai, kurie gali skirtis nuo bankų ar valiutų keityklų siūlomų kursų. Prieš priimdami finansinius sprendimus visada patikrinkite kursą savo banke.',
      },
      {
        q: 'Kaip vienu metu pamatyti kursus keliomis valiutomis?',
        a: 'Populiarių kursų lentelė po keitikliu rodo 1 pasirinktos valiutos vienetą, konvertuotą į 12 populiarių valiutų vienu metu. Pakeiskite valiutą „Iš", kad atnaujintumėte visą lentelę.',
      },
      {
        q: 'Kuo skiriasi tarpbankinis kursas nuo banko kurso?',
        a: 'Tarpbankinis kursas (vidutinės rinkos kursas) yra pirkimo ir pardavimo kainų vidurkis pasaulinėje rinkoje. Bankai ir valiutų keityklos prideda maržą arba komisiją, todėl jų siūlomas kursas yra mažiau palankus. Mūsų keitiklis rodo „švarų" rinkos kursą.',
      },
      {
        q: 'Kaip apskaičiuoti atvirkštinį konvertavimą?',
        a: 'Paspauskite keitimo mygtuką (↕), kad sukeistumėte valiutas vietomis. Arba padalykite 1 iš rodomos normos: jei 1 USD = 0,92 EUR, tai 1 EUR = 1 ÷ 0,92 = 1,087 USD.',
      },
      {
        q: 'Kodėl oro uosto kursai tokie nepalankūs?',
        a: 'Oro uostų ir viešbučių valiutų keityklos taiko dideles maržas (dažnai 5–15%), naudodamosi keleivių patogumu. Geresniam kursui naudokite vietos bankomatą arba daugiavaliutę kortelę (Wise, Revolut) kelionių metu.',
      },
      {
        q: 'Ar keitiklis palaiko kriptovaliutas?',
        a: 'Šis keitiklis skirtas fiat (valstybinėms) valiutoms. Kriptovaliutų konvertavimui naudokite Kriptovaliutų keitiklį, kuris apima Bitcoin, Ethereum ir 50+ monetų su CoinGecko kainomis.',
      },
      {
        q: 'Kas yra kryžminis kursas?',
        a: 'Kryžminis kursas yra dviejų valiutų keitimo kursas, apskaičiuotas per trečiąją valiutą (paprastai USD). Pavyzdžiui, EUR/PLN = EUR/USD × USD/PLN. Mūsų keitiklis šį skaičiavimą atlieka automatiškai.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return buildMetadata(locale, '/currency', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CurrencyPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;
  const { rates, updatedAt } = await getRates();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/currency`,
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
        <ToolActions />
        <CurrencyConverter locale={locale} rates={rates} updatedAt={updatedAt} />

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

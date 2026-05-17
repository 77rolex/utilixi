import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import CurrencyConverter from './CurrencyConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import styles from './page.module.scss';

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
    description: 'Free online currency converter with live exchange rates. Convert USD, EUR, GBP, RUB, UAH and 30+ currencies instantly. Rates updated every 6 hours.',
    h1: 'Currency Converter',
  },
  ru: {
    title: 'Конвертер валют — Курсы валют онлайн',
    description: 'Бесплатный конвертер валют онлайн с актуальными курсами. Конвертируйте USD, EUR, RUB, UAH, GBP и более 30 валют. Курсы обновляются каждые 6 часов.',
    h1: 'Конвертер валют',
  },
  uk: {
    title: 'Конвертер валют — Курси валют онлайн',
    description: 'Безкоштовний конвертер валют онлайн з актуальними курсами. Конвертуйте USD, EUR, UAH, RUB, GBP та понад 30 валют. Курси оновлюються кожні 6 годин.',
    h1: 'Конвертер валют',
  },
  fr: {
    title: 'Convertisseur de Devises — Taux de Change en Direct',
    description: 'Convertisseur de devises gratuit avec taux de change en temps réel. Convertissez USD, EUR, GBP et plus de 30 devises instantanément. Taux mis à jour toutes les 6 heures.',
    h1: 'Convertisseur de Devises',
  },
  lt: {
    title: 'Valiutų Keitiklis — Valiutų Kursai Internete',
    description: 'Nemokamas valiutų keitiklis su naujausiais kursais. Konvertuokite USD, EUR, GBP ir daugiau nei 30 valiutų akimirksniu. Kursai atnaujinami kas 6 valandas.',
    h1: 'Valiutų Keitiklis',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our free currency converter uses live exchange rates updated every 6 hours to give you accurate conversions for over 35 world currencies. Whether you need to convert dollars to euros, rubles to dollars, or any other pair — simply enter the amount, select currencies, and get the result instantly.',
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
        a: 'The converter supports 35 major world currencies including USD, EUR, GBP, JPY, CHF, CAD, AUD, CNY, RUB, UAH, PLN, TRY, INR, and more.',
      },
      {
        q: 'Are these rates suitable for financial transactions?',
        a: 'These rates are indicative mid-market rates and may differ from rates offered by banks or exchange services. Always check with your bank or payment provider before making financial decisions.',
      },
      {
        q: 'How do I convert multiple amounts at once?',
        a: 'The popular rates table below the converter shows 1 unit of your selected currency converted to 12 popular currencies simultaneously. Change the "From" currency to update the entire table.',
      },
    ],
  },
  ru: {
    description: 'Наш бесплатный конвертер валют использует актуальные курсы, обновляемые каждые 6 часов, для точного пересчёта более 35 мировых валют. Введите сумму, выберите валюты и мгновенно получите результат.',
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
        a: 'Конвертер поддерживает 35 основных мировых валют: USD, EUR, GBP, JPY, CHF, CAD, AUD, CNY, RUB, UAH, PLN, TRY, INR и другие.',
      },
      {
        q: 'Подходят ли эти курсы для финансовых операций?',
        a: 'Это ориентировочные среднерыночные курсы. Они могут отличаться от курсов банков и обменников. Перед финансовыми операциями уточняйте курс у своего банка или платёжного провайдера.',
      },
      {
        q: 'Как увидеть курсы сразу ко многим валютам?',
        a: 'Таблица популярных курсов под конвертером показывает 1 единицу выбранной валюты «Из» в пересчёте на 12 популярных валют одновременно. Смените валюту «Из», чтобы обновить всю таблицу.',
      },
    ],
  },
  uk: {
    description: 'Наш безкоштовний конвертер валют використовує актуальні курси, які оновлюються кожні 6 годин, для точного перерахунку понад 35 світових валют. Введіть суму, оберіть валюти та миттєво отримайте результат.',
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
        a: 'Конвертер підтримує 35 основних світових валют: USD, EUR, GBP, JPY, CHF, CAD, AUD, CNY, RUB, UAH, PLN, TRY, INR та інші.',
      },
      {
        q: 'Чи підходять ці курси для фінансових операцій?',
        a: 'Це орієнтовні середньоринкові курси. Вони можуть відрізнятися від курсів банків та обмінників. Перед фінансовими операціями уточнюйте курс у свого банку або платіжного провайдера.',
      },
      {
        q: 'Як побачити курси до багатьох валют одразу?',
        a: 'Таблиця популярних курсів під конвертером показує 1 одиницю обраної валюти «З» у перерахунку на 12 популярних валют одночасно. Змініть валюту «З», щоб оновити всю таблицю.',
      },
    ],
  },
  fr: {
    description: 'Notre convertisseur de devises gratuit utilise des taux de change mis à jour toutes les 6 heures pour vous fournir des conversions précises pour plus de 35 devises mondiales. Entrez le montant, sélectionnez les devises et obtenez le résultat instantanément.',
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
        a: 'Le convertisseur prend en charge 35 devises mondiales majeures, dont USD, EUR, GBP, JPY, CHF, CAD, AUD, CNY, RUB, UAH, PLN, TRY, INR et d\'autres.',
      },
      {
        q: 'Ces taux sont-ils adaptés aux transactions financières ?',
        a: 'Ce sont des taux indicatifs de milieu de marché qui peuvent différer des taux proposés par les banques ou les services de change. Vérifiez toujours auprès de votre banque avant de prendre des décisions financières.',
      },
      {
        q: 'Comment voir les taux pour plusieurs devises à la fois ?',
        a: 'Le tableau des taux populaires sous le convertisseur affiche 1 unité de votre devise source convertie en 12 devises populaires simultanément. Changez la devise « De » pour mettre à jour tout le tableau.',
      },
    ],
  },
  lt: {
    description: 'Mūsų nemokamas valiutų keitiklis naudoja aktualius kursus, atnaujinamus kas 6 valandas, tiksliam daugiau nei 35 pasaulio valiutų konvertavimui. Įveskite sumą, pasirinkite valiutas ir gaukite rezultatą akimirksniu.',
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
        a: 'Keitiklis palaiko 35 pagrindines pasaulio valiutas, įskaitant USD, EUR, GBP, JPY, CHF, CAD, AUD, CNY, RUB, UAH, PLN, TRY, INR ir kitas.',
      },
      {
        q: 'Ar šie kursai tinka finansinėms operacijoms?',
        a: 'Tai orientaciniai vidutinės rinkos kursai, kurie gali skirtis nuo bankų ar valiutų keityklų siūlomų kursų. Prieš priimdami finansinius sprendimus visada patikrinkite kursą savo banke.',
      },
      {
        q: 'Kaip vienu metu pamatyti kursus keliomis valiutomis?',
        a: 'Populiarių kursų lentelė po keitikliu rodo 1 pasirinktos valiutos vienetą, konvertuotą į 12 populiarių valiutų vienu metu. Pakeiskite valiutą „Iš", kad atnaujintumėte visą lentelę.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  const alternates: Record<string, string> = {};
  routing.locales.forEach((l) => {
    alternates[l] = `https://utilixi.com/${l}/currency`;
  });

  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: alternates },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CurrencyPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const { rates, updatedAt } = await getRates();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/currency`,
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
        <CurrencyConverter locale={locale} rates={rates} updatedAt={updatedAt} />

        <div className={styles.page__content}>
          <p className={styles.page__description}>{content.description}</p>

          <AdInline locale={locale} />

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

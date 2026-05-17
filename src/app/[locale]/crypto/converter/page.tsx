import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import CryptoConverter from './CryptoConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import { getCryptoRates, getFiatRates } from '../shared';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Crypto Converter — Convert Bitcoin & Ethereum to Any Currency',
    description: 'Free cryptocurrency converter. Convert Bitcoin (BTC), Ethereum (ETH), Solana and top 50 coins to USD, EUR, GBP, RUB, UAH and other currencies. Live prices.',
    h1: 'Crypto Converter',
  },
  ru: {
    title: 'Конвертер криптовалют — Bitcoin, Ethereum в рубли и другие валюты',
    description: 'Бесплатный конвертер криптовалют онлайн. Переводите Bitcoin (BTC), Ethereum (ETH), Solana и топ-50 монет в USD, EUR, RUB, UAH и другие валюты. Актуальные курсы.',
    h1: 'Конвертер криптовалют',
  },
  uk: {
    title: 'Конвертер криптовалют — Bitcoin, Ethereum в гривні та інші валюти',
    description: 'Безкоштовний конвертер криптовалют онлайн. Переводьте Bitcoin (BTC), Ethereum (ETH), Solana та топ-50 монет у USD, EUR, UAH, RUB та інші валюти. Актуальні курси.',
    h1: 'Конвертер криптовалют',
  },
  fr: {
    title: 'Convertisseur Crypto — Bitcoin, Ethereum en euros et autres devises',
    description: 'Convertisseur de cryptomonnaies gratuit. Convertissez Bitcoin (BTC), Ethereum (ETH), Solana et le top 50 en USD, EUR, GBP et autres devises. Prix en direct.',
    h1: 'Convertisseur de Cryptomonnaies',
  },
  lt: {
    title: 'Kriptovaliutų Keitiklis — Bitcoin, Ethereum į eurus ir kitas valiutas',
    description: 'Nemokamas kriptovaliutų keitiklis. Konvertuokite Bitcoin (BTC), Ethereum (ETH), Solana ir top 50 monetų į USD, EUR, GBP ir kitas valiutas. Kainos atnaujinamos kas 5 min.',
    h1: 'Kriptovaliutų Keitiklis',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Convert any amount of Bitcoin, Ethereum, Solana and other top 50 cryptocurrencies into your preferred fiat currency in seconds. Prices are sourced from CoinGecko and updated every 5 minutes. Fiat exchange rates are updated every 6 hours.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How accurate is the crypto converter?', a: 'Coin prices are fetched from CoinGecko every 5 minutes. Fiat exchange rates (USD to EUR, RUB, UAH, etc.) are updated every 6 hours via ExchangeRate-API. The result is an indicative value — actual exchange rates on crypto platforms may differ.' },
      { q: 'Which cryptocurrencies can I convert?', a: 'The converter includes the top 50 cryptocurrencies by market cap. The list is dynamic and always reflects the current top 50 coins ranked by market capitalization.' },
      { q: 'Which fiat currencies are supported?', a: 'The converter supports 14 fiat currencies: USD, EUR, GBP, RUB, UAH, PLN, CHF, CAD, AUD, JPY, CNY, TRY, BYN, KZT.' },
      { q: 'Is this suitable for real transactions?', a: 'No. The prices are indicative and may be up to 5 minutes old. For actual crypto purchases or sales, always use the live rates on the exchange you are trading on.' },
      { q: 'Where can I see the full price table?', a: 'Visit the Cryptocurrency Rates page to see a full sortable table of the top 20 coins with 24h change and market capitalization.' },
    ],
  },
  ru: {
    description: 'Конвертируйте любую сумму Bitcoin, Ethereum, Solana и других криптовалют в нужную вам фиатную валюту за секунды. Цены монет обновляются каждые 5 минут (CoinGecko), курсы фиата — каждые 6 часов (ExchangeRate-API).',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Насколько точен конвертер?', a: 'Цены монет получаются от CoinGecko каждые 5 минут. Курсы фиата (USD к EUR, RUB, UAH и т.д.) обновляются каждые 6 часов. Результат является ориентировочным — реальные курсы на биржах могут отличаться.' },
      { q: 'Какие криптовалюты поддерживаются?', a: 'Конвертер включает топ-50 криптовалют по рыночной капитализации. Список динамический и всегда отражает актуальный топ-50.' },
      { q: 'Какие фиатные валюты поддерживаются?', a: 'Конвертер поддерживает 14 валют: USD, EUR, GBP, RUB, UAH, PLN, CHF, CAD, AUD, JPY, CNY, TRY, BYN, KZT.' },
      { q: 'Подходит ли конвертер для реальных сделок?', a: 'Нет. Цены являются ориентировочными и могут иметь задержку до 5 минут. Для реальных покупок или продаж всегда используйте актуальные курсы на торговой платформе.' },
      { q: 'Где посмотреть полную таблицу курсов?', a: 'Перейдите на страницу «Курс криптовалют», чтобы увидеть сортируемую таблицу топ-20 монет с изменением за 24ч и рыночной капитализацией.' },
    ],
  },
  uk: {
    description: 'Конвертуйте будь-яку суму Bitcoin, Ethereum, Solana та інших криптовалют у потрібну вам фіатну валюту за лічені секунди. Ціни монет оновлюються кожні 5 хвилин (CoinGecko), курси фіату — кожні 6 годин (ExchangeRate-API).',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Наскільки точний конвертер?', a: 'Ціни монет отримуються від CoinGecko кожні 5 хвилин. Курси фіату оновлюються кожні 6 годин. Результат є орієнтовним — реальні курси на біржах можуть відрізнятися.' },
      { q: 'Які криптовалюти підтримуються?', a: 'Конвертер включає топ-50 криптовалют за ринковою капіталізацією. Список динамічний і завжди відображає актуальний топ-50.' },
      { q: 'Які фіатні валюти підтримуються?', a: 'Конвертер підтримує 14 валют: USD, EUR, GBP, RUB, UAH, PLN, CHF, CAD, AUD, JPY, CNY, TRY, BYN, KZT.' },
      { q: 'Чи підходить конвертер для реальних угод?', a: 'Ні. Ціни є орієнтовними з можливою затримкою до 5 хвилин. Для реальних операцій завжди використовуйте актуальні курси на торговій платформі.' },
      { q: 'Де переглянути повну таблицю курсів?', a: 'Перейдіть на сторінку «Курс криптовалют», щоб побачити сортовану таблицю топ-20 монет зі змінами за 24 год та ринковою капіталізацією.' },
    ],
  },
  fr: {
    description: 'Convertissez n\'importe quel montant de Bitcoin, Ethereum, Solana et d\'autres cryptomonnaies en votre devise préférée en quelques secondes. Les prix des coins sont mis à jour toutes les 5 minutes (CoinGecko), les taux de change fiat toutes les 6 heures (ExchangeRate-API).',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quelle est la précision du convertisseur ?', a: 'Les prix des coins sont récupérés de CoinGecko toutes les 5 minutes. Les taux de change fiat sont mis à jour toutes les 6 heures. Le résultat est indicatif — les taux réels sur les plateformes d\'échange peuvent différer.' },
      { q: 'Quelles cryptomonnaies sont prises en charge ?', a: 'Le convertisseur inclut le top 50 des cryptomonnaies par capitalisation boursière. La liste est dynamique et reflète toujours le top 50 actuel.' },
      { q: 'Quelles devises fiat sont prises en charge ?', a: 'Le convertisseur prend en charge 14 devises : USD, EUR, GBP, RUB, UAH, PLN, CHF, CAD, AUD, JPY, CNY, TRY, BYN, KZT.' },
      { q: 'Est-ce adapté aux transactions réelles ?', a: 'Non. Les prix sont indicatifs et peuvent avoir un délai pouvant aller jusqu\'à 5 minutes. Pour des achats ou ventes réels, utilisez toujours les taux en direct sur votre plateforme d\'échange.' },
      { q: 'Où voir le tableau complet des cours ?', a: 'Visitez la page Cours des Cryptomonnaies pour voir un tableau trié du top 20 avec la variation 24h et la capitalisation boursière.' },
    ],
  },
  lt: {
    description: 'Konvertuokite bet kokią Bitcoin, Ethereum, Solana ir kitų kriptovaliutų sumą į norimą fiat valiutą per kelias sekundes. Monetų kainos atnaujinamos kas 5 minutes (CoinGecko), fiat valiutų kursai – kas 6 valandas (ExchangeRate-API).',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Koks keitiklio tikslumas?', a: 'Monetų kainos gaunamos iš CoinGecko kas 5 minutes. Fiat valiutų kursai atnaujinami kas 6 valandas. Rezultatas yra orientacinis — faktiniai kursai kriptovaliutų biržose gali skirtis.' },
      { q: 'Kokios kriptovaliutos palaikomos?', a: 'Keitiklyje yra 50 populiariausių kriptovaliutų pagal rinkos kapitalizaciją. Sąrašas dinamiškas ir visada atspindi dabartinį top 50.' },
      { q: 'Kokios fiat valiutos palaikomos?', a: 'Keitiklis palaiko 14 valiutų: USD, EUR, GBP, RUB, UAH, PLN, CHF, CAD, AUD, JPY, CNY, TRY, BYN, KZT.' },
      { q: 'Ar tinka realiems sandoriams?', a: 'Ne. Kainos yra orientacinės ir gali turėti iki 5 minučių vėlavimą. Faktinėms operacijoms visada naudokite savo prekybos platformos realaus laiko kursus.' },
      { q: 'Kur matyti pilną kursų lentelę?', a: 'Apsilankykite Kriptovaliutų Kursų puslapyje, kad pamatytumėte rūšiuojamą top 20 lentelę su 24h pokyčiais ir rinkos kapitalizacija.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  const alternates: Record<string, string> = {};
  routing.locales.forEach(l => {
    alternates[l] = `https://utilixi.com/${l}/crypto/converter`;
  });

  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: alternates },
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function CryptoConverterPage({ params }: Props) {
  const { locale } = await params;
  const meta    = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;

  const [coins, fiatRates] = await Promise.all([getCryptoRates(), getFiatRates()]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/crypto/converter`,
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
        <CryptoConverter locale={locale} coins={coins} fiatRates={fiatRates} />

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

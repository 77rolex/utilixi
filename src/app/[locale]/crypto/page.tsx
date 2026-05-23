import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import CryptoTable from './CryptoTable';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import { getCryptoRates } from './shared';

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/crypto/converter', label: 'Crypto Converter' }, { href: '/currency', label: 'Currency Converter' }],
  ru: [{ href: '/crypto/converter', label: 'Конвертер криптовалют' }, { href: '/currency', label: 'Конвертер валют' }],
  uk: [{ href: '/crypto/converter', label: 'Конвертер криптовалют' }, { href: '/currency', label: 'Конвертер валют' }],
  fr: [{ href: '/crypto/converter', label: 'Convertisseur crypto' }, { href: '/currency', label: 'Convertisseur de devises' }],
  lt: [{ href: '/crypto/converter', label: 'Kriptovaliutų keitiklis' }, { href: '/currency', label: 'Valiutų keitiklis' }],
};
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

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
    title: 'Курс криптовалют онлайн — Bitcoin, Ethereum та топ-50 монет',
    description: 'Актуальні курси топ-50 криптовалют: Bitcoin (BTC), Ethereum (ETH), Solana (SOL) та інші. Таблиця з сортуванням за ціною, зміною та капіталізацією. Оновлюється кожні 5 хвилин.',
    h1: 'Курс криптовалют',
  },
  fr: {
    title: 'Prix des Cryptomonnaies — Bitcoin, Ethereum en direct',
    description: 'Prix en direct du top 50 des cryptomonnaies : Bitcoin (BTC), Ethereum (ETH), Solana (SOL) et plus. Tableau triable par prix, variation 24h et capitalisation. Mis à jour toutes les 5 minutes.',
    h1: 'Prix des Cryptomonnaies',
  },
  lt: {
    title: 'Kriptovaliutų Kursai — Bitcoin, Ethereum ir Top 50',
    description: 'Realaus laiko top 50 kriptovaliutų kainų lentelė: Bitcoin, Ethereum, Solana ir kitos. Rūšiuojama pagal kainą, 24h pokytį ir kapitalizaciją. Atnaujinama kas 5 minutes.',
    h1: 'Kriptovaliutų Kursai',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Track live prices of the top 50 cryptocurrencies by market capitalization. Click any column header to sort the table by name, price, 24h change, or market cap. Prices are sourced from CoinGecko and refreshed every 5 minutes.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How often are prices updated?', a: 'Prices are fetched from CoinGecko every 5 minutes. This provides near-real-time data without exceeding the free API limits.' },
      { q: 'How do I sort the table?', a: 'Click any column header — Name, Price, 24h Change, or Market Cap — to sort the table. Click again to reverse the sort direction. Arrows next to the column name show the current sort.' },
      { q: 'Which coins are shown?', a: 'The table shows the top 50 cryptocurrencies by market capitalization, updated dynamically. The list always reflects the current top 50 coins ranked by market cap.' },
      { q: 'Where can I convert crypto to fiat?', a: 'Use our Crypto Converter to calculate the value of any coin in USD, EUR, RUB, UAH and 10 other currencies.' },
      { q: 'Are these prices suitable for trading?', a: 'The prices are indicative with up to 5 minutes delay. They are not suitable for real-time trading decisions. Always use official exchange data for actual trades.' },
    ],
  },
  ru: {
    description: 'Отслеживайте актуальные цены топ-50 криптовалют по рыночной капитализации. Нажмите на заголовок любой колонки для сортировки по названию, цене, изменению за 24ч или капитализации. Данные от CoinGecko, обновляются каждые 5 минут.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как часто обновляются цены?', a: 'Цены получаются от CoinGecko каждые 5 минут — это обеспечивает актуальность без превышения лимитов бесплатного API.' },
      { q: 'Как сортировать таблицу?', a: 'Нажмите на заголовок колонки — Название, Цена (USD), Изменение 24ч или Капитализация — для сортировки. Повторный клик меняет направление. Стрелки рядом с названием показывают текущую сортировку.' },
      { q: 'Какие монеты отображаются?', a: 'Таблица показывает топ-50 криптовалют по рыночной капитализации. Список обновляется динамически и всегда отражает актуальный топ-50 по капитализации.' },
      { q: 'Где конвертировать крипту в фиат?', a: 'Используйте наш Конвертер криптовалют для расчёта стоимости любой монеты в USD, EUR, RUB, UAH и ещё 10 валютах.' },
      { q: 'Подходят ли цены для торговли?', a: 'Цены ориентировочные с задержкой до 5 минут. Для торговых решений в реальном времени используйте данные торговой платформы.' },
    ],
  },
  uk: {
    description: 'Відстежуйте актуальні ціни топ-50 криптовалют за ринковою капіталізацією. Натисніть на заголовок будь-якого стовпця для сортування. Дані від CoinGecko, оновлюються кожні 5 хвилин.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як часто оновлюються ціни?', a: 'Ціни отримуються від CoinGecko кожні 5 хвилин без перевищення лімітів безкоштовного API.' },
      { q: 'Як сортувати таблицю?', a: 'Натисніть на заголовок стовпця — Назва, Ціна (USD), Зміна 24г або Капіталізація. Повторний клік змінює напрямок. Стрілки показують поточне сортування.' },
      { q: 'Які монети відображаються?', a: 'Таблиця показує топ-50 криптовалют за ринковою капіталізацією. Список оновлюється динамічно і завжди відображає актуальний топ-50 за капіталізацією.' },
      { q: 'Де конвертувати крипту у фіат?', a: 'Скористайтеся нашим Конвертером криптовалют для розрахунку вартості будь-якої монети в USD, EUR, UAH, RUB та ще 10 валютах.' },
      { q: 'Чи підходять ціни для торгівлі?', a: 'Ціни орієнтовні із затримкою до 5 хвилин. Для реальних торгових рішень використовуйте дані торгової платформи.' },
    ],
  },
  fr: {
    description: 'Suivez les prix en direct du top 50 des cryptomonnaies par capitalisation boursière. Cliquez sur n\'importe quel en-tête de colonne pour trier. Données de CoinGecko, mises à jour toutes les 5 minutes.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'À quelle fréquence les prix sont-ils mis à jour ?', a: 'Les prix sont récupérés de CoinGecko toutes les 5 minutes sans dépasser les limites de l\'API gratuite.' },
      { q: 'Comment trier le tableau ?', a: 'Cliquez sur un en-tête de colonne — Nom, Prix (USD), Variation 24h ou Capitalisation. Cliquez à nouveau pour inverser le tri. Les flèches indiquent le tri actuel.' },
      { q: 'Quelles monnaies sont affichées ?', a: 'Le tableau affiche le top 50 des cryptomonnaies par capitalisation boursière. La liste est mise à jour dynamiquement et reflète toujours le top 50 actuel.' },
      { q: 'Où convertir des cryptos en devises ?', a: 'Utilisez notre Convertisseur Crypto pour calculer la valeur en USD, EUR, GBP et 11 autres devises.' },
      { q: 'Ces prix conviennent-ils au trading ?', a: 'Les prix sont indicatifs avec un délai pouvant aller jusqu\'à 5 minutes. Utilisez les données de votre plateforme pour les décisions de trading.' },
    ],
  },
  lt: {
    description: 'Stebėkite 50 populiariausių kriptovaliutų kainas pagal rinkos kapitalizaciją. Spustelėkite bet kurį stulpelio antraštę, kad surūšiuotumėte. Duomenys iš CoinGecko, atnaujinami kas 5 minutes.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip dažnai atnaujinamos kainos?', a: 'Kainos gaunamos iš CoinGecko kas 5 minutes neviršijant nemokamo API ribų.' },
      { q: 'Kaip rūšiuoti lentelę?', a: 'Spustelėkite stulpelio antraštę — Pavadinimas, Kaina (USD), Pokytis 24h ar Rinkos kap. Spustelėkite dar kartą, kad apverstumėte rūšiavimą. Rodyklės rodo dabartinį rūšiavimą.' },
      { q: 'Kokios monetos rodomos?', a: 'Lentelėje rodomos 50 populiariausių kriptovaliutų pagal rinkos kapitalizaciją. Sąrašas atnaujinamas dinamiškai ir visada atspindi dabartinį top 50.' },
      { q: 'Kur konvertuoti kriptovaliutas į fiat?', a: 'Naudokite mūsų Kriptovaliutų Keitiklį, kad apskaičiuotumėte vertę USD, EUR, GBP ir dar 11 valiutų.' },
      { q: 'Ar kainos tinkamos prekybai?', a: 'Kainos yra orientacinės su iki 5 minučių vėlavimu. Faktinei prekybai naudokite savo platformos realaus laiko duomenis.' },
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
  const meta    = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;
  const coins   = await getCryptoRates();

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <CryptoTable locale={locale} coins={coins} />

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

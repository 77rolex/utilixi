import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import CryptoTaxCalculator from './CryptoTaxCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/crypto', label: 'Crypto Rates' },
    { href: '/calculator/income-tax', label: 'Income Tax Calculator' },
  ],
  ru: [
    { href: '/crypto', label: 'Курс криптовалют' },
    { href: '/calculator/income-tax', label: 'Калькулятор подоходного налога' },
  ],
  uk: [
    { href: '/crypto', label: 'Курс криптовалют' },
    { href: '/calculator/income-tax', label: 'Калькулятор прибуткового податку' },
  ],
  fr: [
    { href: '/crypto', label: 'Cours des cryptos' },
    { href: '/calculator/income-tax', label: 'Calculatrice impôt sur le revenu' },
  ],
  lt: [
    { href: '/crypto', label: 'Kriptovaliutų kursai' },
    { href: '/calculator/income-tax', label: 'Pajamų mokesčio skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Crypto Tax Calculator — Capital Gains by Country 2024',
    description: 'Free cryptocurrency tax calculator. Calculate capital gains tax on Bitcoin, Ethereum and other crypto for 8 countries. Supports short-term and long-term holdings.',
    h1: 'Crypto Tax Calculator',
  },
  ru: {
    title: 'Калькулятор налога на криптовалюту — по странам 2024',
    description: 'Бесплатный калькулятор налога на доход от криптовалют. Рассчитайте налог на прибыль от Bitcoin, Ethereum и других монет для 8 стран.',
    h1: 'Калькулятор налога на доход от крипты',
  },
  uk: {
    title: 'Калькулятор податку на криптовалюту — за країнами 2024',
    description: 'Безкоштовний калькулятор податку на дохід від криптовалют. Розрахуйте податок на прибуток від Bitcoin, Ethereum та інших монет для 8 країн.',
    h1: 'Калькулятор податку на дохід від крипти',
  },
  fr: {
    title: 'Calculatrice d\'impôt crypto — Plus-values par pays 2024',
    description: 'Calculatrice d\'impôt sur les cryptomonnaies gratuite. Calculez l\'impôt sur les plus-values de Bitcoin, Ethereum et autres cryptos pour 8 pays.',
    h1: 'Calculatrice d\'impôt sur les cryptomonnaies',
  },
  lt: {
    title: 'Kriptovaliutų mokesčių skaičiuotuvas — pagal šalis 2024',
    description: 'Nemokamas kriptovaliutų mokesčių skaičiuotuvas. Apskaičiuokite kapitalo prieaugio mokestį nuo Bitcoin, Ethereum ir kitų kriptovaliutų 8 šalims.',
    h1: 'Kriptovaliutų mokesčių skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Calculate the tax on your cryptocurrency profits for 8 countries. Enter the purchase and sale price per coin, quantity, and holding period — and our calculator will determine the applicable tax rate and the exact amount owed based on each country\'s crypto tax rules.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'Is cryptocurrency taxed?', a: 'Yes — in most countries, profits from selling cryptocurrency are subject to capital gains tax or income tax. The rate and rules vary significantly: Germany exempts gains after 1 year, France uses a flat 30% rate, and the US distinguishes between short-term and long-term rates.' },
      { q: 'What is the difference between short-term and long-term crypto tax?', a: 'In countries like the US, crypto held for less than 1 year is taxed at ordinary income rates (up to 37%), while crypto held for more than 1 year benefits from lower long-term capital gains rates (0%, 15%, or 20%). In Germany, crypto held over 1 year is completely tax-free.' },
      { q: 'Can I offset crypto losses against gains?', a: 'In most countries, yes — crypto losses can offset gains from other crypto sales in the same tax year, reducing your tax liability. In some jurisdictions, losses can even be carried forward to future years. Consult a tax professional for specifics.' },
      { q: 'Which country has the most favorable crypto tax?', a: 'Germany stands out — crypto held for more than 1 year is completely tax-free. Portugal also has no capital gains tax on crypto for individuals (though this may change). Lithuania has a relatively low 15% flat rate.' },
    ],
  },
  ru: {
    description: 'Рассчитайте налог на прибыль от криптовалют для 8 стран. Введите цену покупки и продажи монеты, количество и срок владения — калькулятор определит применимую ставку и точную сумму налога.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Облагается ли криптовалюта налогом?', a: 'Да — в большинстве стран прибыль от продажи криптовалюты облагается налогом на прирост капитала или НДФЛ. Ставки и правила существенно различаются: Германия освобождает прибыль после 1 года, Франция использует единую ставку 30%, США различают краткосрочные и долгосрочные ставки.' },
      { q: 'В чём разница между краткосрочным и долгосрочным налогом?', a: 'В таких странах, как США, криптовалюта, удерживаемая менее 1 года, облагается по ставкам обычного дохода (до 37%), а более 1 года — по льготным долгосрочным ставкам (0%, 15% или 20%). В Германии криптовалюта, удерживаемая более 1 года, полностью освобождена.' },
      { q: 'Можно ли зачесть убытки по крипте?', a: 'В большинстве стран — да. Убытки от продажи крипты можно зачесть против прибыли от других криптосделок в том же налоговом году, снизив налоговую базу. В некоторых юрисдикциях убытки можно переносить на будущие периоды.' },
      { q: 'В какой стране наиболее выгодное налогообложение крипты?', a: 'Германия выделяется — криптовалюта, удерживаемая более 1 года, полностью освобождена от налога. Литва имеет относительно низкую ставку 15%.' },
    ],
  },
  uk: {
    description: 'Розрахуйте податок на прибуток від криптовалют для 8 країн. Введіть ціну купівлі та продажу монети, кількість і термін утримання — калькулятор визначить застосовну ставку та точну суму податку.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Чи оподатковується криптовалюта?', a: 'Так — у більшості країн прибуток від продажу криптовалюти оподатковується. Ставки і правила суттєво різняться: Німеччина звільняє прибуток після 1 року, Франція застосовує єдину ставку 30%, США розрізняють короткострокові та довгострокові ставки.' },
      { q: 'У чому різниця між короткостроковим і довгостроковим податком?', a: 'У таких країнах, як США, криптовалюта, утримана менше 1 року, оподатковується за ставками звичайного доходу, а понад 1 рік — за пільговими ставками. У Німеччині криптовалюта, утримана понад 1 рік, повністю звільнена.' },
      { q: 'Чи можна зарахувати збитки по крипті?', a: 'У більшості країн так — збитки від продажу крипти можна зарахувати проти прибутку від інших угод у тому ж податковому році.' },
      { q: 'В якій країні найвигідніше оподаткування крипти?', a: 'Німеччина — криптовалюта, утримана понад 1 рік, повністю звільнена. Литва має відносно низьку ставку 15%.' },
    ],
  },
  fr: {
    description: 'Calculez l\'impôt sur vos bénéfices en cryptomonnaies pour 8 pays. Entrez le prix d\'achat et de vente par coin, la quantité et la durée de détention — notre calculatrice détermine le taux applicable et le montant exact dû.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Les cryptomonnaies sont-elles imposées ?', a: 'Oui — dans la plupart des pays, les bénéfices issus de la vente de cryptomonnaies sont soumis à l\'impôt. Les taux varient : l\'Allemagne exonère les gains après 1 an, la France applique un taux forfaitaire de 30 %, et les États-Unis distinguent les taux à court et long terme.' },
      { q: 'Quelle est la différence entre les taxes à court et long terme ?', a: 'Aux États-Unis, les cryptos détenues moins d\'1 an sont taxées comme des revenus ordinaires (jusqu\'à 37 %), tandis que celles détenues plus d\'1 an bénéficient de taux réduits. En Allemagne, les cryptos détenues plus d\'1 an sont totalement exonérées.' },
      { q: 'Puis-je déduire les pertes crypto ?', a: 'Dans la plupart des pays, oui — les pertes peuvent compenser les gains d\'autres ventes de crypto la même année, réduisant votre base imposable.' },
      { q: 'Quel pays a la fiscalité crypto la plus avantageuse ?', a: 'L\'Allemagne se distingue — les cryptos détenues plus d\'1 an sont totalement exonérées. La Lituanie a un taux forfaitaire relativement bas de 15 %.' },
    ],
  },
  lt: {
    description: 'Apskaičiuokite mokestį nuo kriptovaliutų pelno 8 šalims. Įveskite pirkimo ir pardavimo kainą už monetą, kiekį ir laikymo laikotarpį — skaičiuotuvas nustatys taikomą tarifą ir tikslią mokesčio sumą.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Ar kriptovaliutos apmokestinamos?', a: 'Taip — daugelyje šalių pelnas iš kriptovaliutų pardavimo apmokestinamas. Tarifai labai skiriasi: Vokietija atleidžia pelną po 1 metų, Prancūzija taiko 30 % fiksuotą tarifą, JAV skiria trumpalaikius ir ilgalaikius tarifus.' },
      { q: 'Koks skirtumas tarp trumpalaikio ir ilgalaikio mokesčio?', a: 'JAV kriptovaliutos, laikomos mažiau nei 1 metus, apmokestinamos kaip įprastos pajamos, o laikomos daugiau nei 1 metus — žemesniais tarifais. Vokietijoje kriptovaliutos, laikomos daugiau nei 1 metus, visiškai neapmokestinamos.' },
      { q: 'Ar galima įskaityti kriptovaliutų nuostolius?', a: 'Daugelyje šalių taip — nuostoliai gali kompensuoti pelną iš kitų kriptovaliutų sandorių tais pačiais mokestiniais metais.' },
      { q: 'Kurioje šalyje palankiausias kriptovaliutų apmokestinimas?', a: 'Vokietija išsiskiria — kriptovaliutos, laikomos daugiau nei 1 metus, visiškai neapmokestinamos. Lietuva turi palyginti žemą 15 % tarifą.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/crypto-tax'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CryptoTaxPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/crypto-tax`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <CryptoTaxCalculator locale={locale} />

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

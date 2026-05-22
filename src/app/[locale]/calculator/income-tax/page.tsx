import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import IncomeTaxCalculator from './IncomeTaxCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/vat', label: 'VAT Calculator' },
    { href: '/calculator/freelance-rate', label: 'Freelance Rate Calculator' },
  ],
  ru: [
    { href: '/calculator/vat', label: 'Калькулятор НДС' },
    { href: '/calculator/freelance-rate', label: 'Калькулятор ставки фрилансера' },
  ],
  uk: [
    { href: '/calculator/vat', label: 'Калькулятор ПДВ' },
    { href: '/calculator/freelance-rate', label: 'Калькулятор ставки фрилансера' },
  ],
  fr: [
    { href: '/calculator/vat', label: 'Calculatrice TVA' },
    { href: '/calculator/freelance-rate', label: 'Taux freelance' },
  ],
  lt: [
    { href: '/calculator/vat', label: 'PVM skaičiuotuvas' },
    { href: '/calculator/freelance-rate', label: 'Laisvai samdomų tarifas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Income Tax Calculator — Tax by Country 2024',
    description: 'Free income tax calculator for 8 countries. Calculate your income tax, effective rate, and net salary based on tax brackets for USA, UK, Germany, France, Poland, Lithuania, Ukraine, and Russia.',
    h1: 'Income Tax Calculator',
  },
  ru: {
    title: 'Калькулятор подоходного налога — НДФЛ по странам 2024',
    description: 'Бесплатный калькулятор подоходного налога для 8 стран. Рассчитайте НДФЛ, эффективную ставку и чистый доход на основе налоговых ставок США, Великобритании, Германии, Франции, Польши, Литвы, Украины, России.',
    h1: 'Калькулятор подоходного налога',
  },
  uk: {
    title: 'Калькулятор прибуткового податку — ПДФО за країнами 2024',
    description: 'Безкоштовний калькулятор прибуткового податку для 8 країн. Розрахуйте ПДФО, ефективну ставку та чистий дохід для США, Великобританії, Німеччини, Франції, Польщі, Литви, України, Росії.',
    h1: 'Калькулятор прибуткового податку',
  },
  fr: {
    title: 'Calculatrice d\'impôt sur le revenu — par pays 2024',
    description: 'Calculatrice d\'impôt gratuite pour 8 pays. Calculez votre impôt, taux effectif et salaire net selon les tranches fiscales des États-Unis, Royaume-Uni, Allemagne, France, Pologne, Lituanie, Ukraine et Russie.',
    h1: 'Calculatrice d\'impôt sur le revenu',
  },
  lt: {
    title: 'Pajamų mokesčio skaičiuotuvas — pagal šalis 2024',
    description: 'Nemokamas pajamų mokesčio skaičiuotuvas 8 šalims. Apskaičiuokite mokestį, efektyvią normą ir grynąsias pajamas pagal JAV, JK, Vokietijos, Prancūzijos, Lenkijos, Lietuvos, Ukrainos ir Rusijos tarifus.',
    h1: 'Pajamų mokesčio skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Calculate your income tax for 8 countries using real 2024 tax brackets. Enter your annual gross income and country — our calculator shows the total tax owed, your effective (average) tax rate, net annual income, and a breakdown by tax bracket.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is a marginal tax rate?', a: 'A marginal tax rate is the rate applied to your last dollar of income. In a progressive tax system, you pay different rates on different portions of your income. For example, in the US, only income above $609,350 is taxed at 37% — the rest is taxed at lower rates.' },
      { q: 'What is the effective tax rate?', a: 'The effective (average) tax rate is the total tax you pay divided by your total income. It is always lower than your marginal rate because lower portions of your income are taxed at lower rates. This is the number that tells you what percentage of your income actually goes to taxes.' },
      { q: 'Does this calculator include social security contributions?', a: 'No — this calculator only shows income tax (e.g., federal income tax in the US). It does not include social security, Medicare, national insurance, pension contributions, or local/state taxes. Your actual take-home pay will be lower.' },
      { q: 'Which country has the lowest income tax?', a: 'Among the 8 countries in our calculator, Ukraine has a simple flat rate of 19.5% (18% + 1.5% military levy). The US and Poland offer tax-free allowances that make lower incomes effectively tax-free. Germany has the highest top rate but only applies to very high incomes.' },
    ],
  },
  ru: {
    description: 'Рассчитайте подоходный налог для 8 стран по реальным налоговым ставкам 2024 года. Введите годовой доход и страну — калькулятор покажет сумму налога, эффективную ставку, чистый доход и разбивку по налоговым ставкам.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое предельная налоговая ставка?', a: 'Предельная ставка — это ставка, применяемая к последней единице дохода. В прогрессивной системе разные части дохода облагаются по разным ставкам. Например, в России НДФЛ 13% применяется к доходам до 2,4 млн ₽, а выше — уже 15% и 18%.' },
      { q: 'Что такое эффективная налоговая ставка?', a: 'Эффективная (средняя) ставка — это общая сумма налога, делённая на весь доход. Она всегда ниже предельной ставки, потому что нижние части дохода облагаются по более низким ставкам. Именно она показывает, какую реальную долю дохода вы платите в виде налогов.' },
      { q: 'Включает ли калькулятор страховые взносы?', a: 'Нет — калькулятор показывает только подоходный налог (НДФЛ). Страховые взносы в ПФР, ФОМС, ФСС и региональные налоги не учитываются. Ваш реальный чистый доход будет ниже.' },
      { q: 'В какой стране самый низкий подоходный налог?', a: 'Среди 8 стран в калькуляторе наиболее простая система на Украине — фиксированная ставка 19,5%. В США и Польше действует необлагаемый минимум, что делает небольшие доходы фактически безналоговыми.' },
    ],
  },
  uk: {
    description: 'Розрахуйте прибутковий податок для 8 країн за реальними ставками 2024 року. Введіть річний дохід і країну — калькулятор покаже суму податку, ефективну ставку, чистий дохід і розбивку за податковими ставками.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке гранична податкова ставка?', a: 'Гранична ставка — це ставка, що застосовується до останньої одиниці доходу. У прогресивній системі різні частини доходу оподатковуються за різними ставками.' },
      { q: 'Що таке ефективна податкова ставка?', a: 'Ефективна (середня) ставка — це загальна сума податку, поділена на весь дохід. Вона завжди нижча за граничну ставку, оскільки нижні частини доходу оподатковуються за нижчими ставками.' },
      { q: 'Чи включає калькулятор соціальні внески?', a: 'Ні — калькулятор показує лише прибутковий податок (ПДФО). Єдиний соціальний внесок та інші відрахування не враховуються.' },
      { q: 'В якій країні найнижчий прибутковий податок?', a: 'Серед 8 країн найпростіша система в Україні — фіксована ставка 19,5% (18% ПДФО + 1,5% військовий збір). У США і Польщі є неоподатковуваний мінімум.' },
    ],
  },
  fr: {
    description: 'Calculez votre impôt sur le revenu pour 8 pays avec les tranches fiscales réelles 2024. Entrez votre revenu annuel brut et votre pays — notre calculatrice affiche l\'impôt total, le taux effectif, le revenu net et le détail par tranche.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le taux marginal d\'imposition ?', a: 'Le taux marginal est le taux appliqué à votre dernier euro de revenu. Dans un système progressif, différentes tranches de revenu sont imposées à des taux différents.' },
      { q: 'Qu\'est-ce que le taux effectif d\'imposition ?', a: 'Le taux effectif (moyen) est le total de l\'impôt divisé par le revenu total. Il est toujours inférieur au taux marginal, car les tranches inférieures sont imposées à des taux plus bas.' },
      { q: 'Cette calculatrice inclut-elle les cotisations sociales ?', a: 'Non — la calculatrice affiche uniquement l\'impôt sur le revenu. Elle n\'inclut pas les cotisations sociales, la CSG/CRDS, ni les taxes locales.' },
      { q: 'Quel pays a le plus faible impôt sur le revenu ?', a: 'Parmi les 8 pays, l\'Ukraine applique un taux forfaitaire de 19,5 %. Les États-Unis et la Pologne offrent des abattements rendant les faibles revenus quasiment non imposables.' },
    ],
  },
  lt: {
    description: 'Apskaičiuokite pajamų mokestį 8 šalims pagal tikruosius 2024 m. mokesčių tarifus. Įveskite metines bendrąsias pajamas ir šalį — skaičiuotuvas parodys mokesčio sumą, efektyvią normą, grynąsias pajamas ir tarifų analizę.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra ribinis mokesčio tarifas?', a: 'Ribinis tarifas — tai tarifas, taikomas paskutiniam pajamų eurui. Progresyvioje sistemoje skirtingos pajamų dalys apmokestinamos skirtingais tarifais.' },
      { q: 'Kas yra efektyvus mokesčio tarifas?', a: 'Efektyvus (vidutinis) tarifas — tai bendra mokesčio suma, padalyta iš visų pajamų. Jis visada mažesnis už ribinį tarifą, nes mažesnės pajamų dalys apmokestinamos žemesniais tarifais.' },
      { q: 'Ar skaičiuotuvas apima socialinio draudimo įmokas?', a: 'Ne — skaičiuotuvas rodo tik pajamų mokestį. Socialinio draudimo ir sveikatos draudimo įmokos neįskaičiuotos.' },
      { q: 'Kurioje šalyje mažiausias pajamų mokestis?', a: 'Iš 8 šalių paprasčiausia sistema Ukrainoje — fiksuotas 19,5 % tarifas. JAV ir Lenkijoje yra neapmokestinamieji minimumai, todėl mažos pajamos praktiškai neapmokestinamos.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/income-tax'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function IncomeTaxPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/income-tax`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <IncomeTaxCalculator locale={locale} />

        <div className={styles.page__content}>
          <p className={styles.page__description}>{content.description}</p>
          <AdInline locale={locale} />
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

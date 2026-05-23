import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import MarginCalculator from './MarginCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/roi', label: 'ROI Calculator' },
    { href: '/calculator/vat', label: 'VAT Calculator' },
  ],
  ru: [
    { href: '/calculator/roi', label: 'Калькулятор ROI' },
    { href: '/calculator/vat', label: 'Калькулятор НДС' },
  ],
  uk: [
    { href: '/calculator/roi', label: 'Калькулятор ROI' },
    { href: '/calculator/vat', label: 'Калькулятор ПДВ' },
  ],
  fr: [
    { href: '/calculator/roi', label: 'Calculatrice ROI' },
    { href: '/calculator/vat', label: 'Calculatrice TVA' },
  ],
  lt: [
    { href: '/calculator/roi', label: 'RI skaičiuotuvas' },
    { href: '/calculator/vat', label: 'PVM skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Margin & Markup Calculator — Calculate Profit Margin',
    description: 'Free margin and markup calculator. Calculate gross profit margin, markup percentage, and selling price from cost. Supports two modes: calculate from prices or find selling price by target margin.',
    h1: 'Margin & Markup Calculator',
  },
  ru: {
    title: 'Калькулятор маржи и наценки — расчёт прибыльности',
    description: 'Бесплатный калькулятор маржи и наценки. Рассчитайте валовую маржу, процент наценки и цену продажи по себестоимости. Два режима: расчёт по ценам или по целевой марже.',
    h1: 'Калькулятор маржи и наценки',
  },
  uk: {
    title: 'Калькулятор маржі і націнки — розрахунок прибутковості',
    description: 'Безкоштовний калькулятор маржі та націнки. Розрахуйте валову маржу, відсоток націнки та ціну продажу за собівартістю. Два режими: розрахунок за цінами або за цільовою маржею.',
    h1: 'Калькулятор маржі і націнки',
  },
  fr: {
    title: 'Calculatrice marge et majoration — calcul de rentabilité',
    description: 'Calculatrice de marge et majoration gratuite. Calculez la marge brute, le taux de majoration et le prix de vente à partir du coût. Deux modes : calcul depuis les prix ou par marge cible.',
    h1: 'Calculatrice marge et majoration',
  },
  lt: {
    title: 'Maržos ir antkainių skaičiuotuvas — pelno skaičiavimas',
    description: 'Nemokamas maržos ir antkainių skaičiuotuvas. Apskaičiuokite bendrąją maržą, antkainių procentą ir pardavimo kainą pagal savikainą. Du režimai: skaičiavimas iš kainų arba pagal tikslinę maržą.',
    h1: 'Maržos ir antkainių skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Use our margin and markup calculator to analyze the profitability of your products. In "Calculate from prices" mode, enter the cost and selling price to instantly get the gross profit margin and markup percentage. In "Find selling price" mode, enter your cost and target margin or markup — and get the exact price you need to charge.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the difference between margin and markup?', a: 'Margin (gross profit margin) is profit as a percentage of the selling price: Margin = (Profit ÷ Revenue) × 100. Markup is profit as a percentage of the cost: Markup = (Profit ÷ Cost) × 100. For the same product, markup is always higher than margin. For example, a 50% markup corresponds to only a 33.3% margin.' },
      { q: 'Which is more useful — margin or markup?', a: 'Margin is preferred in financial analysis and accounting because it directly shows what percentage of revenue is profit. Markup is more commonly used in retail and purchasing when you need to calculate the selling price from cost. Both metrics complement each other.' },
      { q: 'How do I calculate selling price from a target margin?', a: 'Formula: Selling Price = Cost ÷ (1 − Margin%). For example, if your cost is $100 and you want a 30% margin: $100 ÷ (1 − 0.30) = $142.86. This is exactly what the "Find selling price" mode does automatically.' },
      { q: 'What is a good profit margin?', a: 'It depends heavily on the industry. Grocery retail averages 2–5%, software and SaaS can reach 60–80%, while manufacturing typically ranges from 10–20%. The key is to benchmark against your specific industry and ensure your margin covers all fixed costs and provides a return on investment.' },
    ],
  },
  ru: {
    description: 'Используйте калькулятор маржи и наценки для анализа прибыльности ваших товаров. В режиме «Расчёт по ценам» введите себестоимость и цену продажи — мгновенно получите процент маржи и наценки. В режиме «Найти цену продажи» введите себестоимость и целевую маржу или наценку — и получите точную цену.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'В чём разница между маржой и наценкой?', a: 'Маржа (валовая) — это прибыль в процентах от цены продажи: Маржа = (Прибыль ÷ Выручка) × 100. Наценка — прибыль в процентах от себестоимости: Наценка = (Прибыль ÷ Себестоимость) × 100. Для одного и того же товара наценка всегда выше маржи. Например, наценка 50% соответствует марже только 33,3%.' },
      { q: 'Что лучше использовать — маржу или наценку?', a: 'Маржа предпочтительна в финансовом анализе и бухгалтерии — она сразу показывает, какой процент выручки составляет прибыль. Наценка чаще используется в торговле и закупках, когда нужно рассчитать цену из себестоимости. Оба показателя дополняют друг друга.' },
      { q: 'Как рассчитать цену продажи по целевой марже?', a: 'Формула: Цена продажи = Себестоимость ÷ (1 − Маржа%). Например, себестоимость 100 ₽ и желаемая маржа 30%: 100 ÷ (1 − 0,30) = 142,86 ₽. Именно это автоматически делает режим «Найти цену продажи».' },
      { q: 'Какая маржа считается хорошей?', a: 'Зависит от отрасли. В розничной торговле продуктами — 2–5%, в ПО и SaaS — 60–80%, в производстве — 10–20%. Главное — сравнивать с показателями своей отрасли и убедиться, что маржа покрывает постоянные расходы и даёт достаточную отдачу на вложения.' },
    ],
  },
  uk: {
    description: 'Використовуйте калькулятор маржі та націнки для аналізу прибутковості ваших товарів. У режимі «Розрахунок за цінами» введіть собівартість і ціну продажу — миттєво отримайте відсоток маржі та націнки. У режимі «Знайти ціну продажу» введіть собівартість і цільову маржу або націнку.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'У чому різниця між маржею і націнкою?', a: 'Маржа (валова) — це прибуток у відсотках від ціни продажу: Маржа = (Прибуток ÷ Виручка) × 100. Націнка — прибуток у відсотках від собівартості: Націнка = (Прибуток ÷ Собівартість) × 100. Для одного товару націнка завжди вища за маржу. Наприклад, націнка 50% відповідає лише 33,3% маржі.' },
      { q: 'Що краще використовувати — маржу чи націнку?', a: 'Маржа переважає у фінансовому аналізі та бухгалтерії — вона одразу показує, який відсоток виручки становить прибуток. Націнка частіше використовується в торгівлі та закупівлях для розрахунку ціни із собівартості.' },
      { q: 'Як розрахувати ціну продажу за цільовою маржею?', a: 'Формула: Ціна продажу = Собівартість ÷ (1 − Маржа%). Наприклад, собівартість 100 ₴ і бажана маржа 30%: 100 ÷ (1 − 0,30) = 142,86 ₴. Саме це автоматично робить режим «Знайти ціну продажу».' },
      { q: 'Яка маржа вважається гарною?', a: 'Залежить від галузі. У роздрібній торгівлі продуктами — 2–5%, у ПЗ та SaaS — 60–80%, у виробництві — 10–20%. Головне — порівнювати з показниками своєї галузі та переконатися, що маржа покриває постійні витрати.' },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice de marge et majoration pour analyser la rentabilité de vos produits. En mode «Calculer depuis les prix», entrez le coût et le prix de vente pour obtenir instantanément la marge brute et le taux de majoration. En mode «Trouver le prix de vente», entrez votre coût et la marge ou majoration cible.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quelle est la différence entre marge et majoration ?', a: 'La marge (brute) est le bénéfice en pourcentage du prix de vente : Marge = (Bénéfice ÷ CA) × 100. La majoration est le bénéfice en pourcentage du coût : Majoration = (Bénéfice ÷ Coût) × 100. Pour un même produit, la majoration est toujours supérieure à la marge. Par exemple, une majoration de 50 % correspond à une marge de seulement 33,3 %.' },
      { q: 'Laquelle est la plus utile — marge ou majoration ?', a: 'La marge est préférée en analyse financière et comptabilité car elle montre directement quelle part du chiffre d\'affaires est du bénéfice. La majoration est plus courante dans le commerce de détail pour calculer le prix de vente à partir du coût.' },
      { q: 'Comment calculer le prix de vente à partir d\'une marge cible ?', a: 'Formule : Prix de vente = Coût ÷ (1 − Marge%). Par exemple, coût de 100 € et marge souhaitée de 30 % : 100 ÷ (1 − 0,30) = 142,86 €. C\'est exactement ce que fait le mode «Trouver le prix de vente».' },
      { q: 'Quelle est une bonne marge bénéficiaire ?', a: 'Cela dépend fortement du secteur. La distribution alimentaire tourne autour de 2 à 5 %, les logiciels et SaaS peuvent atteindre 60 à 80 %, tandis que la fabrication se situe généralement entre 10 et 20 %.' },
    ],
  },
  lt: {
    description: 'Naudokite maržos ir antkainių skaičiuotuvą savo produktų pelningumui analizuoti. Režimu „Skaičiuoti iš kainų" įveskite savikainą ir pardavimo kainą — iš karto gaukite bendrąją maržą ir antkainių procentą. Režimu „Rasti pardavimo kainą" įveskite savikainą ir tikslinę maržą arba antkainį.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Koks skirtumas tarp maržos ir antkainių?', a: 'Marža (bendroji) — tai pelnas procentais nuo pardavimo kainos: Marža = (Pelnas ÷ Pajamos) × 100. Antkainis — pelnas procentais nuo savikainos: Antkainis = (Pelnas ÷ Savikaina) × 100. Tam pačiam produktui antkainis visada didesnis už maržą. Pvz., 50 % antkainis atitinka tik 33,3 % maržą.' },
      { q: 'Ką geriau naudoti — maržą ar antkainį?', a: 'Marža labiau tinka finansinei analizei ir apskaitai, nes tiesiogiai rodo, kokia pajamų dalis yra pelnas. Antkainis dažniau naudojamas prekyboje ir pirkimuose, kai reikia apskaičiuoti pardavimo kainą iš savikainos.' },
      { q: 'Kaip apskaičiuoti pardavimo kainą pagal tikslinę maržą?', a: 'Formulė: Pardavimo kaina = Savikaina ÷ (1 − Marža%). Pvz., savikaina 100 € ir norima marža 30 %: 100 ÷ (1 − 0,30) = 142,86 €. Tai automatiškai atlieka režimas „Rasti pardavimo kainą".' },
      { q: 'Kokia laikoma gera pelno marža?', a: 'Tai labai priklauso nuo sektoriaus. Maisto mažmeninėje prekyboje — 2–5 %, programinėje įrangoje ir SaaS — 60–80 %, gamyboje — 10–20 %. Svarbiausia lyginti su savo sektoriaus rodikliais.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/margin'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MarginPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/margin`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <MarginCalculator locale={locale} />

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

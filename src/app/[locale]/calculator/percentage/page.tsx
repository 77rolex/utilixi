import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import PercentageCalculator from './PercentageCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/discount', label: 'Discount Calculator' }, { href: '/calculator/vat', label: 'VAT Calculator' }, { href: '/calculator/margin', label: 'Margin & Markup Calculator' }],
  ru: [{ href: '/calculator/discount', label: 'Калькулятор скидки' }, { href: '/calculator/vat', label: 'Калькулятор НДС' }, { href: '/calculator/margin', label: 'Калькулятор маржи' }],
  uk: [{ href: '/calculator/discount', label: 'Калькулятор знижки' }, { href: '/calculator/vat', label: 'Калькулятор ПДВ' }, { href: '/calculator/margin', label: 'Калькулятор маржі' }],
  fr: [{ href: '/calculator/discount', label: 'Calculatrice de remise' }, { href: '/calculator/vat', label: 'Calculatrice TVA' }, { href: '/calculator/margin', label: 'Calculatrice marge' }],
  lt: [{ href: '/calculator/discount', label: 'Nuolaidos skaičiuotuvas' }, { href: '/calculator/vat', label: 'PVM skaičiuotuvas' }, { href: '/calculator/margin', label: 'Maržos skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Percentage Calculator — X% of Y, Percent Change & More', description: 'Free online percentage calculator. Calculate X% of Y, find what percent X is of Y, compute percentage change, add or subtract percentages. Instant results with formula shown.', h1: 'Percentage Calculator' },
  ru: { title: 'Калькулятор процентов — X% от Y, изменение в % и другое', description: 'Бесплатный онлайн-калькулятор процентов. Рассчитайте X% от Y, найдите какой % составляет X от Y, вычислите изменение в процентах, прибавьте или вычтите проценты.', h1: 'Калькулятор процентов' },
  uk: { title: 'Калькулятор відсотків — X% від Y, зміна у % та інше', description: 'Безкоштовний онлайн-калькулятор відсотків. Розрахуйте X% від Y, знайдіть яким % є X від Y, обчисліть зміну у відсотках, додайте або відніміть відсотки.', h1: 'Калькулятор відсотків' },
  fr: { title: 'Calculatrice de pourcentage — X% de Y, variation en % et plus', description: 'Calculatrice de pourcentage gratuite. Calculez X% de Y, trouvez quel % X représente de Y, calculez la variation en %, ajoutez ou soustrayez des pourcentages. Résultats instantanés.', h1: 'Calculatrice de pourcentage' },
  lt: { title: 'Procentų skaičiuotuvas — X% iš Y, pokytis % ir daugiau', description: 'Nemokamas internetinis procentų skaičiuotuvas. Apskaičiuokite X% iš Y, raskite koks % yra X nuo Y, apskaičiuokite procentinį pokytį, pridėkite ar atimkite procentus.', h1: 'Procentų skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Percentages are one of the most fundamental concepts in everyday math, used in finance, shopping, taxes, science, and statistics. This calculator covers the five most common percentage operations: finding X% of a value, determining what percentage one number is of another, calculating percentage change between two values, increasing a value by a percentage, and decreasing a value by a percentage. Each result shows the formula so you understand exactly how the answer was reached.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How do I calculate X% of Y?', a: 'Multiply Y by X/100. For example, 25% of 200 = 200 × 0.25 = 50. This is the most common percentage calculation used for tips, taxes, discounts, and commissions.' },
      { q: 'How do I find what percentage X is of Y?', a: 'Divide X by Y and multiply by 100. For example, 50 is what % of 200? → (50 / 200) × 100 = 25%. This is useful for calculating test scores, market share, or completion rates.' },
      { q: 'How is percentage change calculated?', a: 'Percentage change = ((New Value − Old Value) / Old Value) × 100. If sales went from 100 to 150: ((150 − 100) / 100) × 100 = +50%. A negative result indicates a decrease. This formula is used in finance, economics, and performance tracking.' },
      { q: 'What\'s the difference between percentage points and percent?', a: 'Percentage points measure the arithmetic difference between two percentages. If interest rates go from 3% to 5%, that is a 2 percentage point increase, but a 66.7% increase in relative terms. Always clarify which is meant in financial or statistical contexts.' },
    ],
  },
  ru: {
    description: 'Проценты — одна из фундаментальных концепций повседневной математики, применяемая в финансах, торговле, налогах, науке и статистике. Этот калькулятор охватывает пять наиболее распространённых операций с процентами: нахождение X% от числа, определение какой процент составляет одно число от другого, расчёт изменения в процентах, увеличение числа на процент и уменьшение числа на процент. Каждый результат сопровождается формулой.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитать X% от Y?', a: 'Умножьте Y на X/100. Например, 25% от 200 = 200 × 0,25 = 50. Это наиболее распространённый расчёт процентов, используемый для чаевых, налогов, скидок и комиссий.' },
      { q: 'Как найти, сколько процентов X составляет от Y?', a: 'Разделите X на Y и умножьте на 100. Например, 50 — это сколько % от 200? → (50 / 200) × 100 = 25%. Применяется для расчёта баллов, доли рынка или процента выполнения.' },
      { q: 'Как рассчитывается изменение в процентах?', a: 'Изменение в % = ((Новое − Старое) / Старое) × 100. Если продажи выросли с 100 до 150: ((150 − 100) / 100) × 100 = +50%. Отрицательный результат указывает на снижение.' },
      { q: 'В чём разница между процентными пунктами и процентами?', a: 'Процентные пункты — это арифметическая разница между двумя процентами. Если ставка выросла с 3% до 5% — это рост на 2 процентных пункта, но в относительном выражении — на 66,7%. В финансовых контекстах важно уточнять, что имеется в виду.' },
    ],
  },
  uk: {
    description: 'Відсотки — одна з фундаментальних концепцій повсякденної математики, яка застосовується у фінансах, торгівлі, податках, науці та статистиці. Цей калькулятор охоплює п\'ять найпоширеніших операцій з відсотками: знаходження X% від числа, визначення якого відсотку є одне число від іншого, розрахунок зміни у відсотках, збільшення числа на відсоток та зменшення числа на відсоток.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розрахувати X% від Y?', a: 'Помножте Y на X/100. Наприклад, 25% від 200 = 200 × 0,25 = 50. Це найпоширеніший розрахунок відсотків, що використовується для чайових, податків, знижок та комісій.' },
      { q: 'Як знайти, скільки відсотків X становить від Y?', a: 'Розділіть X на Y і помножте на 100. Наприклад, 50 — це скільки % від 200? → (50 / 200) × 100 = 25%. Застосовується для розрахунку балів, частки ринку або відсотка виконання.' },
      { q: 'Як розраховується зміна у відсотках?', a: 'Зміна в % = ((Нове − Старе) / Старе) × 100. Якщо продажі зросли зі 100 до 150: ((150 − 100) / 100) × 100 = +50%. Від\'ємний результат вказує на зниження.' },
      { q: 'В чому різниця між відсотковими пунктами та відсотками?', a: 'Відсоткові пункти — це арифметична різниця між двома відсотками. Якщо ставка зросла з 3% до 5% — це зростання на 2 відсоткові пункти, але у відносному вираженні — на 66,7%.' },
    ],
  },
  fr: {
    description: 'Les pourcentages sont l\'un des concepts fondamentaux des mathématiques quotidiennes, utilisés en finance, commerce, fiscalité, science et statistiques. Cette calculatrice couvre les cinq opérations les plus courantes : trouver X% de Y, déterminer quel pourcentage X représente de Y, calculer la variation en %, augmenter une valeur d\'un pourcentage, et diminuer une valeur d\'un pourcentage. Chaque résultat affiche la formule utilisée.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calculer X% de Y ?', a: 'Multipliez Y par X/100. Par exemple, 25% de 200 = 200 × 0,25 = 50. C\'est le calcul de pourcentage le plus courant, utilisé pour les pourboires, les taxes, les remises et les commissions.' },
      { q: 'Comment trouver quel pourcentage X représente de Y ?', a: 'Divisez X par Y et multipliez par 100. Par exemple, 50 est quel % de 200 ? → (50 / 200) × 100 = 25%. Utile pour calculer des notes, des parts de marché ou des taux de réalisation.' },
      { q: 'Comment calcule-t-on la variation en pourcentage ?', a: 'Variation % = ((Nouvelle valeur − Ancienne valeur) / Ancienne valeur) × 100. Si les ventes passent de 100 à 150 : ((150 − 100) / 100) × 100 = +50%. Un résultat négatif indique une baisse.' },
      { q: 'Quelle est la différence entre points de pourcentage et pourcentage ?', a: 'Les points de pourcentage mesurent la différence arithmétique entre deux pourcentages. Si les taux passent de 3% à 5%, c\'est une augmentation de 2 points de pourcentage, mais une augmentation de 66,7% en termes relatifs.' },
    ],
  },
  lt: {
    description: 'Procentai yra viena iš svarbiausių kasdienės matematikos sąvokų, naudojamų finansuose, prekyboje, mokesčiuose, moksle ir statistikoje. Šis skaičiuotuvas apima penkias dažniausiai naudojamas procentų operacijas: X% iš Y radimas, nustatymas koks % yra X nuo Y, procentinio pokyčio skaičiavimas, vertės didinimas procentu ir mažinimas procentu.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuoti X% iš Y?', a: 'Padauginkite Y iš X/100. Pavyzdžiui, 25% iš 200 = 200 × 0,25 = 50. Tai dažniausiai naudojamas procentų skaičiavimas arbatpinigių, mokesčių, nuolaidų ir komisinių atveju.' },
      { q: 'Kaip rasti, koks % yra X nuo Y?', a: 'Padalinkite X iš Y ir padauginkite iš 100. Pavyzdžiui, 50 yra koks % nuo 200? → (50 / 200) × 100 = 25%. Naudinga balams, rinkos daliai ar užbaigimo procentui skaičiuoti.' },
      { q: 'Kaip skaičiuojamas procentinis pokytis?', a: 'Pokytis % = ((Nauja vertė − Sena vertė) / Sena vertė) × 100. Jei pardavimai išaugo nuo 100 iki 150: ((150 − 100) / 100) × 100 = +50%. Neigiamas rezultatas rodo sumažėjimą.' },
      { q: 'Koks skirtumas tarp procentinių punktų ir procentų?', a: 'Procentiniai punktai matuoja aritmetinį skirtumą tarp dviejų procentų. Jei palūkanos padidėjo nuo 3% iki 5%, tai yra 2 procentinių punktų padidėjimas, bet santykine prasme — 66,7% padidėjimas.' },
    ],
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: buildAlternates(locale, '/calculator/percentage'),
  };
}

export default async function PercentagePage({ params }: Props) {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const c = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: m.h1,
    description: m.description,
    url: `https://utilixi.com/${locale}/calculator/percentage`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <PageLayout sidebar={<AdSidebar locale={locale} />}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className={styles.page__title}>{m.h1}</h1>
      <PercentageCalculator locale={locale} />
      <AdInline locale={locale} />
      <div className={styles.page__content}>
        <p className={styles.page__description}>{c.description}</p>
        <RelatedTools locale={locale} tools={related} />
        <div className={styles.faq}>
          <h2 className={styles.faq__title}>{c.faqTitle}</h2>
          <div className={styles.faq__list}>
            {c.faqs.map((f, i) => (
              <div key={i} className={styles.faq__item}>
                <p className={styles.faq__question}>{f.q}</p>
                <p className={styles.faq__answer}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

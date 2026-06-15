import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import PercentageCalculator from './PercentageCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/discount', label: 'Discount Calculator' }, { href: '/calculator/vat', label: 'VAT Calculator' }, { href: '/calculator/margin', label: 'Margin & Markup Calculator' }, { href: '/calculator/basic', label: 'Basic Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }],
  ru: [{ href: '/calculator/discount', label: 'Калькулятор скидки' }, { href: '/calculator/vat', label: 'Калькулятор НДС' }, { href: '/calculator/margin', label: 'Калькулятор маржи' }, { href: '/calculator/basic', label: 'Простой калькулятор' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }],
  uk: [{ href: '/calculator/discount', label: 'Калькулятор знижки' }, { href: '/calculator/vat', label: 'Калькулятор ПДВ' }, { href: '/calculator/margin', label: 'Калькулятор маржі' }, { href: '/calculator/basic', label: 'Простий калькулятор' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }],
  fr: [{ href: '/calculator/discount', label: 'Calculatrice de remise' }, { href: '/calculator/vat', label: 'Calculatrice TVA' }, { href: '/calculator/margin', label: 'Calculatrice marge' }, { href: '/calculator/basic', label: 'Calculatrice basique' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }],
  lt: [{ href: '/calculator/discount', label: 'Nuolaidos skaičiuotuvas' }, { href: '/calculator/vat', label: 'PVM skaičiuotuvas' }, { href: '/calculator/margin', label: 'Maržos skaičiuotuvas' }, { href: '/calculator/basic', label: 'Paprastas skaičiuotuvas' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Percentage Calculator — X% of Y, Percent Change & More', description: 'Free online percentage calculator. Calculate X% of Y, find what percent X is of Y, compute percentage change, add or subtract percentages. Instant results with formula shown.', h1: 'Percentage Calculator', subtitle: 'Calculate percentages, percentage change, and what percent one number is of another.' },
  ru: { title: 'Калькулятор процентов — X% от Y, изменение в % и другое', description: 'Бесплатный онлайн-калькулятор процентов. Рассчитайте X% от Y, найдите какой % составляет X от Y, вычислите изменение в процентах, прибавьте или вычтите проценты.', h1: 'Калькулятор процентов', subtitle: 'Рассчитайте проценты, изменение в процентах и долю одного числа от другого.' },
  uk: { title: 'Калькулятор відсотків — X% від Y, зміна у % та інше', description: 'Безкоштовний онлайн-калькулятор відсотків. Розрахуйте X% від Y, знайдіть яким % є X від Y, обчисліть зміну у відсотках, додайте або відніміть відсотки.', h1: 'Калькулятор відсотків', subtitle: 'Розрахуйте відсотки, зміну у відсотках та частку одного числа від іншого.' },
  fr: { title: 'Calculatrice de pourcentage — X% de Y, variation en % et plus', description: 'Calculatrice de pourcentage gratuite. Calculez X% de Y, trouvez quel % X représente de Y, calculez la variation en %, ajoutez ou soustrayez des pourcentages. Résultats instantanés.', h1: 'Calculatrice de pourcentage', subtitle: 'Calculez des pourcentages, des variations en % et quelle part un nombre représente d\'un autre.' },
  lt: { title: 'Procentų skaičiuotuvas — X% iš Y, pokytis % ir daugiau', description: 'Nemokamas internetinis procentų skaičiuotuvas. Apskaičiuokite X% iš Y, raskite koks % yra X nuo Y, apskaičiuokite procentinį pokytį, pridėkite ar atimkite procentus.', h1: 'Procentų skaičiuotuvas', subtitle: 'Apskaičiuokite procentus, procentinį pokytį ir kiek vienas skaičius sudaro nuo kito.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Percentages are one of the most fundamental concepts in everyday math, used in finance, shopping, taxes, science, and statistics. This calculator covers the five most common percentage operations: finding X% of a value, determining what percentage one number is of another, calculating percentage change between two values, increasing a value by a percentage, and decreasing a value by a percentage. Each result shows the formula so you understand exactly how the answer was reached.\n\nFrom calculating VAT and discounts to tracking portfolio growth and exam scores, percentage calculations are unavoidable in daily life. Understanding the difference between percentage points and relative percent change prevents many common misunderstandings in finance and media reporting.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How do I calculate X% of Y?', a: 'Multiply Y by X/100. For example, 25% of 200 = 200 × 0.25 = 50. Used for tips, taxes, discounts, and commissions.' },
      { q: 'How do I find what percentage X is of Y?', a: 'Divide X by Y and multiply by 100. 50 is what % of 200? → (50 / 200) × 100 = 25%. Useful for test scores, market share, completion rates.' },
      { q: 'How is percentage change calculated?', a: '% Change = ((New − Old) / Old) × 100. Sales from 100 to 150: ((150 − 100) / 100) × 100 = +50%. A negative result means a decrease.' },
      { q: 'What is the difference between percentage points and percent?', a: 'Percentage points = arithmetic difference between two percentages. Interest from 3% to 5% = 2 percentage points, but a 66.7% increase in relative terms. This distinction matters in finance and statistics.' },
      { q: 'How do I calculate compound percentage growth?', a: 'For compound growth over multiple periods: Final = Initial × (1 + rate)^n. Example: $1,000 growing at 5% per year for 3 years: $1,000 × 1.05³ = $1,157.63. This differs from simple percentage growth (1,000 × 1.15 = $1,150).' },
      { q: 'What does a 200% increase mean?', a: 'A 200% increase means the value tripled (original + 200% of original = 3× original). Example: $100 increases by 200% → $100 + $200 = $300. Note: a 100% increase doubles the value; a 200% increase triples it. "Increased by 200%" ≠ "increased to 200%".' },
      { q: 'What is a basis point (bp)?', a: 'A basis point is 0.01 percentage point, or 1/100th of 1%. Used in finance for interest rates and bond yields: 25 basis points = 0.25%. Example: if the ECB raises rates by 50bp from 3.5%, the new rate is 4.0%. Using basis points avoids ambiguity between "percent" and "percentage points".' },
      { q: 'What is percentage error?', a: 'Percentage error = |Measured − Actual| / Actual × 100. It measures how far a measured value is from the true value. Example: estimated 95 km, actual 100 km → error = |95 − 100| / 100 × 100 = 5%. Used in science, engineering, and forecasting accuracy.' },
      { q: 'How do I convert a percentage to a decimal and fraction?', a: 'Decimal: divide by 100. 75% → 0.75. Fraction: write as X/100 and simplify. 75% → 75/100 = 3/4. To go back: decimal × 100 = %. Common: 25% = 1/4, 50% = 1/2, 33.3% ≈ 1/3, 20% = 1/5, 10% = 1/10.' },
      { q: 'What is relative vs absolute change?', a: 'Absolute change = New − Old (in original units). Relative change = (New − Old) / Old × 100 (in percent). Example: salary from €2,000 to €2,200. Absolute change: +€200. Relative change: +10%. Both are useful — absolute shows impact in real terms; relative allows fair comparison between different-sized values.' },
    ],
  },
  ru: {
    description: 'Проценты — одна из фундаментальных концепций повседневной математики, применяемая в финансах, торговле, налогах, науке и статистике. Этот калькулятор охватывает пять наиболее распространённых операций с процентами: нахождение X% от числа, определение какого процента составляет одно число от другого, расчёт изменения в процентах, увеличение и уменьшение числа на процент. Каждый результат сопровождается формулой.\n\nОт расчёта НДС и скидок до отслеживания доходности портфеля и результатов тестов — процентные вычисления повсеместны в повседневной жизни. Понимание разницы между процентными пунктами и относительным изменением в процентах предотвращает многие типичные ошибки в финансах.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитать X% от Y?', a: 'Умножьте Y на X/100. Например, 25% от 200 = 50. Используется для расчёта чаевых, налогов, скидок и комиссий.' },
      { q: 'Как найти, сколько процентов X составляет от Y?', a: '(X / Y) × 100. Например, 50 — это сколько % от 200? → 25%. Применяется для расчёта баллов, доли рынка или процента выполнения.' },
      { q: 'Как рассчитывается изменение в процентах?', a: '((Новое − Старое) / Старое) × 100. Продажи выросли с 100 до 150 → +50%. Отрицательный результат — снижение.' },
      { q: 'В чём разница между процентными пунктами и процентами?', a: 'Процентные пункты — арифметическая разница. Ставка с 3% до 5% = +2 пп, но в относительном выражении — +66,7%. В финансовых контекстах важно уточнять, что имеется в виду.' },
      { q: 'Как рассчитать сложный процентный рост?', a: 'Итоговая сумма = Начальная × (1 + ставка)^n. Пример: 1 000 ₽ при 5% годовых за 3 года: 1 000 × 1,05³ = 1 157,63 ₽. Отличается от простого процента: 1 000 × 1,15 = 1 150 ₽.' },
      { q: 'Что значит «рост на 200%»?', a: 'Рост на 200% означает утроение значения (исходное + 200% = ×3). Пример: 100 ₽ + 200% = 300 ₽. Рост на 100% — удвоение; рост на 200% — утроение. Важно: «вырасло на 200%» ≠ «выросло до 200%».' },
      { q: 'Что такое базисный пункт (б.п.)?', a: 'Базисный пункт = 0,01 процентного пункта = 1/100 от 1%. Используется в финансах для ставок и доходностей: 25 б.п. = 0,25%. Пример: ЦБ повысил ставку на 50 б.п. с 7,5% → 8,0%.' },
      { q: 'Что такое процентная погрешность?', a: '|Измеренное − Реальное| / Реальное × 100. Например, оценка 95 км, факт 100 км → погрешность 5%. Используется в науке, инженерии и оценке точности прогнозов.' },
      { q: 'Как перевести процент в десятичную дробь и обычную дробь?', a: 'В десятичную: делим на 100. 75% → 0,75. В дробь: X/100, упрощаем. 75% → 3/4. Частые случаи: 25% = 1/4, 50% = 1/2, 33,3% ≈ 1/3, 20% = 1/5, 10% = 1/10.' },
      { q: 'В чём разница между абсолютным и относительным изменением?', a: 'Абсолютное = Новое − Старое (в единицах). Относительное = (Новое − Старое) / Старое × 100 (в %). Пример: зарплата с 50 000 до 55 000 ₽. Абсолютно: +5 000 ₽. Относительно: +10%. Оба показателя важны для полного понимания.' },
    ],
  },
  uk: {
    description: 'Відсотки — одна з фундаментальних концепцій повсякденної математики, що застосовується у фінансах, торгівлі, податках та статистиці. Цей калькулятор охоплює п\'ять найпоширеніших операцій: знаходження X% від числа, визначення якого відсотку є одне число від іншого, розрахунок зміни у відсотках, збільшення та зменшення числа на відсоток. Кожен результат супроводжується формулою.\n\nВід розрахунку ПДВ і знижок до відстеження дохідності портфеля та результатів тестів — відсоткові обчислення повсюдні в повсякденному житті.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розрахувати X% від Y?', a: 'Помножте Y на X/100. Наприклад, 25% від 200 = 50. Для чайових, податків, знижок та комісій.' },
      { q: 'Як знайти, скільки відсотків X становить від Y?', a: '(X / Y) × 100. Наприклад, 50 — це скільки % від 200? → 25%.' },
      { q: 'Як розраховується зміна у відсотках?', a: '((Нове − Старе) / Старе) × 100. Продажі зросли зі 100 до 150 → +50%. Від\'ємний результат — зниження.' },
      { q: 'В чому різниця між відсотковими пунктами та відсотками?', a: 'Відсоткові пункти — арифметична різниця. Ставка з 3% до 5% = +2 в.п., але у відносному вираженні — +66,7%.' },
      { q: 'Як розрахувати складний відсотковий ріст?', a: 'Кінцева сума = Початкова × (1 + ставка)^n. Приклад: 1 000 грн при 5% річних за 3 роки: 1 000 × 1,05³ = 1 157,63 грн.' },
      { q: 'Що означає «зріст на 200%»?', a: 'Зріст на 200% означає потроєння (вихідне + 200% = ×3). 100 грн + 200% = 300 грн. Зріст на 100% = подвоєння; зріст на 200% = потроєння.' },
      { q: 'Що таке базисний пункт (б.п.)?', a: 'Базисний пункт = 0,01 відсоткового пункту. Використовується у фінансах: 25 б.п. = 0,25%. НБУ підвищив ставку на 50 б.п. з 7,5% → 8,0%.' },
      { q: 'Що таке відсоткова похибка?', a: '|Виміряне − Реальне| / Реальне × 100. Наприклад, оцінка 95 км, факт 100 км → похибка 5%.' },
      { q: 'Як перевести відсоток у десятковий дріб та звичайний дріб?', a: 'У десятковий: ділимо на 100. 75% → 0,75. У дріб: X/100, скорочуємо. 75% → 3/4. Часті випадки: 25% = 1/4, 50% = 1/2, 33,3% ≈ 1/3.' },
      { q: 'В чому різниця між абсолютною та відносною зміною?', a: 'Абсолютна = Нове − Старе (в одиницях). Відносна = (Нове − Старе) / Старе × 100 (у %). Зарплата з 20 000 до 22 000 грн: абсолютно +2 000 грн, відносно +10%.' },
    ],
  },
  fr: {
    description: 'Les pourcentages sont l\'un des concepts fondamentaux des mathématiques quotidiennes, utilisés en finance, commerce, fiscalité, science et statistiques. Cette calculatrice couvre les cinq opérations les plus courantes : trouver X% de Y, déterminer quel % X représente de Y, calculer la variation en %, augmenter et diminuer une valeur. Chaque résultat affiche la formule utilisée.\n\nDu calcul de la TVA et des remises au suivi de la performance d\'un portefeuille, les calculs de pourcentages sont omniprésents. Comprendre la différence entre points de pourcentage et variation relative prévient de nombreuses erreurs en finance.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calculer X% de Y ?', a: 'Multipliez Y par X/100. 25 % de 200 = 50. Utilisé pour pourboires, taxes, remises et commissions.' },
      { q: 'Comment trouver quel pourcentage X représente de Y ?', a: '(X / Y) × 100. 50 est quel % de 200 ? → 25 %. Utile pour les notes, parts de marché, taux de complétion.' },
      { q: 'Comment calcule-t-on la variation en pourcentage ?', a: '((Nouvelle − Ancienne) / Ancienne) × 100. Ventes de 100 à 150 : +50 %. Un résultat négatif indique une baisse.' },
      { q: 'Quelle est la différence entre points de pourcentage et pourcentage ?', a: 'Points de pourcentage = différence arithmétique. De 3 % à 5 % = +2 points, mais +66,7 % en relatif. Cette distinction est cruciale en finance.' },
      { q: 'Comment calculer la croissance en pourcentage composé ?', a: 'Valeur finale = Initiale × (1 + taux)^n. 1 000 € à 5 %/an sur 3 ans : 1 000 × 1,05³ = 1 157,63 €. Différent de la croissance simple : 1 000 × 1,15 = 1 150 €.' },
      { q: 'Que signifie une augmentation de 200 % ?', a: 'Une augmentation de 200 % = la valeur est multipliée par 3. 100 € + 200 % = 300 €. +100 % = doublement ; +200 % = triplement. "Augmenté de 200 %" ≠ "augmenté à 200 %".' },
      { q: 'Qu\'est-ce qu\'un point de base (pb) ?', a: 'Un point de base = 0,01 point de pourcentage. 25 pb = 0,25 %. Utilisé pour les taux d\'intérêt et rendements obligataires. La BCE relève ses taux de 50 pb depuis 3,5 % → 4,0 %.' },
      { q: 'Qu\'est-ce que l\'erreur en pourcentage ?', a: '|Mesuré − Réel| / Réel × 100. Estimation 95 km, réalité 100 km → erreur 5 %. Utilisé en sciences et pour mesurer la précision des prévisions.' },
      { q: 'Comment convertir un pourcentage en décimal et en fraction ?', a: 'Décimal : diviser par 100. 75 % → 0,75. Fraction : X/100 simplifié. 75 % → 3/4. Fréquents : 25 % = 1/4, 50 % = 1/2, 33,3 % ≈ 1/3, 20 % = 1/5.' },
      { q: 'Quelle est la différence entre variation absolue et relative ?', a: 'Absolue = Nouvelle − Ancienne (en unités). Relative = (Nouvelle − Ancienne) / Ancienne × 100 (en %). Salaire de 2 000 € à 2 200 € : absolu +200 €, relatif +10 %. Les deux sont utiles.' },
    ],
  },
  lt: {
    description: 'Procentai yra viena iš svarbiausių kasdienės matematikos sąvokų, naudojamų finansuose, prekyboje, mokesčiuose ir statistikoje. Šis skaičiuotuvas apima penkias dažniausiai naudojamas procentų operacijas: X% iš Y radimas, nustatymas koks % yra X nuo Y, procentinio pokyčio skaičiavimas, vertės didinimas ir mažinimas procentu. Kiekvienas rezultatas pateikiamas su formule.\n\nNuo PVM ir nuolaidų skaičiavimo iki portfelio grąžos sekimo — procentų skaičiavimai neišvengiami kasdieniniame gyvenime.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuoti X% iš Y?', a: 'Padauginkite Y iš X/100. 25 % iš 200 = 50. Naudojama arbatpinigių, mokesčių, nuolaidų ir komisinių skaičiavimui.' },
      { q: 'Kaip rasti, koks % yra X nuo Y?', a: '(X / Y) × 100. 50 yra koks % nuo 200? → 25 %. Naudinga balams, rinkos daliai ar užbaigimo procentui.' },
      { q: 'Kaip skaičiuojamas procentinis pokytis?', a: '((Nauja − Sena) / Sena) × 100. Pardavimai išaugo nuo 100 iki 150 → +50 %. Neigiamas rezultatas = sumažėjimas.' },
      { q: 'Koks skirtumas tarp procentinių punktų ir procentų?', a: 'Procentiniai punktai = aritmetinis skirtumas. Nuo 3 % iki 5 % = +2 p.p., bet santykine prasme +66,7 %.' },
      { q: 'Kaip apskaičiuoti sudėtinį procentinį augimą?', a: 'Galutinė = Pradinė × (1 + norma)^n. 1 000 € prie 5 %/m. 3 metus: 1 000 × 1,05³ = 1 157,63 €.' },
      { q: 'Ką reiškia „200 % padidėjimas"?', a: '200 % padidėjimas = vertė padidėja 3 kartus. 100 € + 200 % = 300 €. +100 % = padvigubinimas; +200 % = patrigubinimas.' },
      { q: 'Kas yra bazinis punktas (b.p.)?', a: 'Bazinis punktas = 0,01 procentinio punkto. 25 b.p. = 0,25 %. Naudojama palūkanų normoms: ECB pakėlė normą 50 b.p. nuo 3,5 % → 4,0 %.' },
      { q: 'Kas yra procentinė paklaida?', a: '|Išmatuota − Reali| / Reali × 100. Pvz., įvertinta 95 km, tikra 100 km → paklaida 5 %.' },
      { q: 'Kaip konvertuoti procentą į dešimtainę ir paprastąją trupmenas?', a: 'Į dešimtainę: dalyti iš 100. 75 % → 0,75. Į trupmenas: X/100, supaprastinti. 75 % → 3/4. Dažni: 25 % = 1/4, 50 % = 1/2.' },
      { q: 'Koks skirtumas tarp absoliutaus ir santykinio pokyčio?', a: 'Absoliutus = Nauja − Sena (vienetais). Santykinis = (Nauja − Sena) / Sena × 100 (%). Atlyginimas nuo 1 500 € iki 1 650 €: absoliučiai +150 €, santykinai +10 %.' },
    ],
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/percentage', m);
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
    url: `https://www.utilixi.com/${locale}/calculator/percentage`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((faq) => ({
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
        <h1 className={styles.page__title}>{m.h1}</h1>
        {m.subtitle && <p className={styles.page__subtitle}>{m.subtitle}</p>}
        <ToolActions />
        <RelatedTools locale={locale} tools={related} />
        <PercentageCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {c.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
          <section className={styles.faq}>
            <h2 className={styles.faq__title}>{c.faqTitle}</h2>
            <div className={styles.faq__list}>
              {c.faqs.map((f, i) => (
                <div key={i} className={styles.faq__item}>
                  <h3 className={styles.faq__question}>{f.q}</h3>
                  <p className={styles.faq__answer}>{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

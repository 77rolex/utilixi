import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import DiscountCalculator from './DiscountCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/percentage', label: 'Percentage Calculator' }, { href: '/calculator/vat', label: 'VAT Calculator' }, { href: '/calculator/margin', label: 'Margin & Markup Calculator' }],
  ru: [{ href: '/calculator/percentage', label: 'Калькулятор процентов' }, { href: '/calculator/vat', label: 'Калькулятор НДС' }, { href: '/calculator/margin', label: 'Калькулятор маржи' }],
  uk: [{ href: '/calculator/percentage', label: 'Калькулятор відсотків' }, { href: '/calculator/vat', label: 'Калькулятор ПДВ' }, { href: '/calculator/margin', label: 'Калькулятор маржі' }],
  fr: [{ href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }, { href: '/calculator/vat', label: 'Calculatrice TVA' }, { href: '/calculator/margin', label: 'Calculatrice marge' }],
  lt: [{ href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }, { href: '/calculator/vat', label: 'PVM skaičiuotuvas' }, { href: '/calculator/margin', label: 'Maržos skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Discount Calculator — Calculate Sale Price & Savings', description: 'Free discount calculator. Find the final price after a discount %, calculate what % discount you got, or apply multiple sequential discounts. Instant results.', h1: 'Discount Calculator' },
  ru: { title: 'Калькулятор скидки — рассчитайте цену и экономию', description: 'Бесплатный калькулятор скидки. Найдите финальную цену после скидки, рассчитайте процент скидки по ценам или примените несколько скидок подряд. Мгновенный результат.', h1: 'Калькулятор скидки' },
  uk: { title: 'Калькулятор знижки — розрахуйте ціну та економію', description: 'Безкоштовний калькулятор знижки. Знайдіть фінальну ціну після знижки, розрахуйте відсоток знижки за цінами або застосуйте кілька знижок підряд. Миттєвий результат.', h1: 'Калькулятор знижки' },
  fr: { title: 'Calculatrice de remise — Calculez le prix soldé et les économies', description: 'Calculatrice de remise gratuite. Trouvez le prix final après une remise %, calculez le % de remise à partir des prix, ou appliquez plusieurs remises successives.', h1: 'Calculatrice de remise' },
  lt: { title: 'Nuolaidos skaičiuotuvas — apskaičiuokite kainą ir santaupas', description: 'Nemokamas nuolaidos skaičiuotuvas. Raskite galutinę kainą po nuolaidos, apskaičiuokite nuolaidos procentą pagal kainas arba pritaikykite kelias nuolaidas iš eilės.', h1: 'Nuolaidos skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This discount calculator handles three common scenarios: calculating the final price when you know the original price and discount percentage; finding the discount percentage when you know both the original and sale prices; and applying multiple sequential discounts (common in wholesale, retail promotions, and stacked coupon codes). Note that multiple discounts do not simply add up — a 20% discount followed by a 10% discount equals a combined discount of 28%, not 30%.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How do I calculate a discount percentage?', a: 'Discount % = ((Original Price − Sale Price) / Original Price) × 100. For example, if an item costs $120 originally and is sold for $90, the discount is ((120 − 90) / 120) × 100 = 25%.' },
      { q: 'Why don\'t multiple discounts add up?', a: 'Stacked discounts apply sequentially to the reduced price. A 20% off followed by 10% off: after the first discount, you pay 80% of original; the second discount applies to that 80%, leaving 72% of the original — a total saving of 28%, not 30%. Always calculate step by step.' },
      { q: 'What is the formula for final price after discount?', a: 'Final Price = Original Price × (1 − Discount% / 100). Example: $200 with a 15% discount → $200 × (1 − 0.15) = $200 × 0.85 = $170. Savings = $30.' },
      { q: 'What is a "stacked" discount?', a: 'Stacked or sequential discounts mean applying one discount after another. Common in retail (clearance + coupon), wholesale, or B2B pricing. The order does not matter for the final result — 20% then 10% gives the same result as 10% then 20%.' },
    ],
  },
  ru: {
    description: 'Этот калькулятор скидок обрабатывает три распространённых сценария: расчёт финальной цены при известной исходной цене и проценте скидки; нахождение процента скидки при известных исходной и акционной ценах; применение нескольких последовательных скидок (распространено в оптовой торговле и при накапливаемых промокодах). Важно: несколько скидок не суммируются — скидка 20% + скидка 10% = итоговая скидка 28%, а не 30%.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитать процент скидки?', a: 'Скидка % = ((Исходная цена − Цена со скидкой) / Исходная цена) × 100. Например, если товар стоит 120 рублей, а продаётся за 90, скидка: ((120 − 90) / 120) × 100 = 25%.' },
      { q: 'Почему несколько скидок не суммируются?', a: 'Скидки применяются последовательно к уже сниженной цене. Скидка 20% + 10%: после первой скидки вы платите 80% от исходной; вторая скидка применяется к этим 80%, остаётся 72% от исходной — итого 28%, а не 30%.' },
      { q: 'Какова формула финальной цены?', a: 'Финальная цена = Исходная цена × (1 − Скидка% / 100). Пример: 200 рублей со скидкой 15% → 200 × 0,85 = 170 рублей. Экономия: 30 рублей.' },
      { q: 'Что такое накапливаемые скидки?', a: 'Накапливаемые или последовательные скидки — применение одной скидки за другой. Распространено в розничной торговле (распродажа + купон), оптовой или B2B-ценообразовании. Порядок применения не влияет на результат.' },
    ],
  },
  uk: {
    description: 'Цей калькулятор знижок обробляє три поширені сценарії: розрахунок фінальної ціни при відомій початковій ціні та відсотку знижки; знаходження відсотку знижки при відомих початковій та акційній цінах; застосування кількох послідовних знижок (поширено в оптовій торгівлі та при накопичуваних промокодах). Кілька знижок не підсумовуються: знижка 20% + знижка 10% = загальна знижка 28%, а не 30%.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розрахувати відсоток знижки?', a: 'Знижка % = ((Початкова ціна − Ціна зі знижкою) / Початкова ціна) × 100. Наприклад, якщо товар коштує 120 гривень, а продається за 90: ((120 − 90) / 120) × 100 = 25%.' },
      { q: 'Чому кілька знижок не підсумовуються?', a: 'Знижки застосовуються послідовно до вже зниженої ціни. Знижка 20% + 10%: після першої знижки ви платите 80% від початкової; друга знижка застосовується до цих 80%, залишається 72% — разом 28%, а не 30%.' },
      { q: 'Яка формула фінальної ціни?', a: 'Фінальна ціна = Початкова ціна × (1 − Знижка% / 100). Приклад: 200 грн зі знижкою 15% → 200 × 0,85 = 170 грн. Економія: 30 грн.' },
      { q: 'Що таке накопичувані знижки?', a: 'Накопичувані або послідовні знижки — застосування однієї знижки за іншою. Поширено в роздрібній торгівлі (розпродаж + купон), оптовій або B2B-ціноутворенні. Порядок застосування не впливає на результат.' },
    ],
  },
  fr: {
    description: 'Cette calculatrice de remise gère trois scénarios courants : calculer le prix final quand vous connaissez le prix original et le pourcentage de remise ; trouver le pourcentage de remise quand vous connaissez le prix original et le prix soldé ; appliquer plusieurs remises successives (courant dans le commerce en gros et les codes promo cumulables). Attention : les remises multiples ne s\'additionnent pas simplement — 20% puis 10% = 28% de remise totale, pas 30%.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calculer le pourcentage de remise ?', a: 'Remise % = ((Prix original − Prix soldé) / Prix original) × 100. Par exemple, si un article coûte 120 € et est vendu 90 €, la remise est ((120 − 90) / 120) × 100 = 25%.' },
      { q: 'Pourquoi les remises multiples ne s\'additionnent-elles pas ?', a: 'Les remises cumulées s\'appliquent séquentiellement au prix réduit. Une remise de 20% puis 10% : après la première, vous payez 80% du prix original ; la seconde s\'applique à ces 80%, laissant 72% — soit 28% de remise totale, pas 30%.' },
      { q: 'Quelle est la formule du prix final ?', a: 'Prix final = Prix original × (1 − Remise% / 100). Exemple : 200 € avec une remise de 15% → 200 × 0,85 = 170 €. Économie : 30 €.' },
      { q: 'Qu\'est-ce qu\'une remise cumulée ?', a: 'Les remises cumulées ou séquentielles consistent à appliquer une remise après l\'autre. Courant dans le commerce de détail (soldes + coupon) ou le B2B. L\'ordre d\'application ne change pas le résultat final.' },
    ],
  },
  lt: {
    description: 'Šis nuolaidos skaičiuotuvas apima tris dažniausius scenarijus: galutinės kainos apskaičiavimas žinant pradinę kainą ir nuolaidos procentą; nuolaidos procento radimas žinant pradinę ir pardavimo kainą; kelių nuoseklių nuolaidų taikymas (dažnas didmeninėje prekyboje ir kaupiamų kuponų atveju). Kelios nuolaidos nesudedamos: 20% + 10% = bendra nuolaida 28%, o ne 30%.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuoti nuolaidos procentą?', a: 'Nuolaida % = ((Pradinė kaina − Pardavimo kaina) / Pradinė kaina) × 100. Pavyzdžiui, jei prekė kainuoja 120 €, o parduodama už 90 €: ((120 − 90) / 120) × 100 = 25%.' },
      { q: 'Kodėl kelios nuolaidos nesudedamos?', a: 'Kaupiamosios nuolaidos taikomos nuosekliai prie jau sumažintos kainos. 20% + 10% nuolaidos: po pirmosios mokate 80% pradinės kainos; antroji taikoma šiems 80%, lieka 72% — iš viso 28%, o ne 30%.' },
      { q: 'Kokia yra galutinės kainos formulė?', a: 'Galutinė kaina = Pradinė kaina × (1 − Nuolaida% / 100). Pavyzdys: 200 € su 15% nuolaida → 200 × 0,85 = 170 €. Santaupos: 30 €.' },
      { q: 'Kas yra kaupiamosios nuolaidos?', a: 'Kaupiamosios arba nuoseklios nuolaidos — tai vienos nuolaidos taikymas po kitos. Dažnas mažmeninėje prekyboje (išpardavimas + kuponas) arba B2B kainodaroje. Taikymo tvarka galutinio rezultato nekeičia.' },
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
    alternates: buildAlternates(locale, '/calculator/discount'),
  };
}

export default async function DiscountPage({ params }: Props) {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const c = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: m.h1,
    description: m.description,
    url: `https://utilixi.com/${locale}/calculator/discount`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <PageLayout sidebar={<AdSidebar locale={locale} />}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className={styles.page__title}>{m.h1}</h1>
      <DiscountCalculator locale={locale} />
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

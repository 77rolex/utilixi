import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import RoiCalculator from './RoiCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/deposit', label: 'Deposit Calculator' }, { href: '/calculator/mortgage', label: 'Mortgage Calculator' }],
  ru: [{ href: '/calculator/deposit', label: 'Калькулятор депозита' }, { href: '/calculator/mortgage', label: 'Ипотечный калькулятор' }],
  uk: [{ href: '/calculator/deposit', label: 'Калькулятор депозиту' }, { href: '/calculator/mortgage', label: 'Іпотечний калькулятор' }],
  fr: [{ href: '/calculator/deposit', label: 'Calculatrice de dépôt' }, { href: '/calculator/mortgage', label: 'Calculatrice de prêt immobilier' }],
  lt: [{ href: '/calculator/deposit', label: 'Indėlio skaičiuotuvas' }, { href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'ROI Calculator — Calculate Return on Investment Online', description: 'Free ROI calculator. Calculate return on investment, net profit, annualized ROI and investment multiplier in seconds.', h1: 'ROI Calculator' },
  ru: { title: 'Калькулятор ROI — рассчитать доходность инвестиций онлайн', description: 'Бесплатный калькулятор ROI. Рассчитайте доходность инвестиций, чистую прибыль, годовой ROI и мультипликатор за несколько секунд.', h1: 'Калькулятор ROI' },
  uk: { title: 'Калькулятор ROI — розрахувати дохідність інвестицій онлайн', description: 'Безкоштовний калькулятор ROI. Розрахуйте дохідність інвестицій, чистий прибуток та річний ROI за кілька секунд.', h1: 'Калькулятор ROI' },
  fr: { title: 'Calculatrice ROI — Calculer le retour sur investissement', description: 'Calculez votre retour sur investissement (ROI), le gain net, le ROI annualisé et le multiplicateur d\'investissement en quelques secondes.', h1: 'Calculatrice ROI' },
  lt: { title: 'RI Skaičiuotuvas — Apskaičiuoti Investicijų Grąžą', description: 'Nemokamas investicijų grąžos skaičiuotuvas. Apskaičiuokite RI, grynąjį pelną, metinę grąžą ir daugiklį per kelias sekundes.', h1: 'Investicijų grąžos skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'ROI (Return on Investment) is the most widely used metric to evaluate the profitability of an investment. Enter the amount you invested and the final value to instantly calculate ROI percentage, net profit or loss, and investment multiplier. Optionally enter the time period to see the annualized (CAGR) return.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is ROI?', a: 'ROI (Return on Investment) is a percentage that shows how much profit or loss an investment generated relative to its cost. Formula: ROI = (Final Value − Initial Investment) / Initial Investment × 100%.' },
      { q: 'What is annualized ROI (CAGR)?', a: 'Annualized ROI, also known as CAGR (Compound Annual Growth Rate), shows the equivalent annual return if the investment grew at a steady rate. It\'s useful for comparing investments held over different time periods. Formula: CAGR = (Final/Initial)^(1/years) − 1.' },
      { q: 'What is the investment multiplier?', a: 'The multiplier shows how many times your money grew. For example, a multiplier of 2.5× means your investment grew 2.5 times. It equals Final Value / Initial Investment.' },
      { q: 'Can ROI be negative?', a: 'Yes. A negative ROI means you lost money on the investment. For example, if you invested $10,000 and got back $7,000, the ROI is −30%.' },
      { q: 'What\'s a good ROI?', a: 'It depends on the asset class. Stock markets historically return 7–10% per year. Real estate typically returns 4–8% annually. A savings deposit might return 2–5%. Anything above the average for its category is considered a good ROI.' },
    ],
  },
  ru: {
    description: 'ROI (Return on Investment, окупаемость инвестиций) — ключевой показатель прибыльности вложений. Введите сумму вложений и итоговую стоимость, чтобы мгновенно рассчитать ROI в процентах, чистую прибыль/убыток и мультипликатор инвестиций. Укажите период для расчёта годового ROI (CAGR).',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое ROI?', a: 'ROI (Return on Investment) — показатель, отражающий доходность инвестиций в процентах. Формула: ROI = (Итоговая стоимость − Сумма вложений) / Сумма вложений × 100%.' },
      { q: 'Что такое годовой ROI (CAGR)?', a: 'Годовой ROI, или CAGR (Compound Annual Growth Rate), показывает эквивалентную годовую доходность при условии равномерного роста. Используется для сравнения инвестиций с разными сроками. Формула: CAGR = (Итог/Вложения)^(1/лет) − 1.' },
      { q: 'Что такое мультипликатор инвестиций?', a: 'Мультипликатор показывает, во сколько раз выросли вложения. Например, 2,5× означает, что капитал вырос в 2,5 раза. Формула: Итоговая стоимость / Сумма вложений.' },
      { q: 'Может ли ROI быть отрицательным?', a: 'Да. Отрицательный ROI означает убыток. Например, вложили 100 000 ₽, получили 70 000 ₽ — ROI составит −30%.' },
      { q: 'Какой ROI считается хорошим?', a: 'Зависит от класса активов. Фондовый рынок исторически даёт 7–10% годовых, недвижимость — 4–8%, банковский депозит — 2–5%. Хорошим считается ROI выше среднего по соответствующей категории.' },
    ],
  },
  uk: {
    description: 'ROI (Return on Investment, окупність інвестицій) — ключовий показник прибутковості вкладень. Введіть суму вкладень та підсумкову вартість для миттєвого розрахунку ROI у відсотках, чистого прибутку/збитку та мультиплікатора. Вкажіть період для розрахунку річного ROI (CAGR).',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке ROI?', a: 'ROI (Return on Investment) — показник дохідності інвестицій у відсотках. Формула: ROI = (Підсумкова вартість − Сума вкладень) / Сума вкладень × 100%.' },
      { q: 'Що таке річний ROI (CAGR)?', a: 'Річний ROI або CAGR (Compound Annual Growth Rate) — еквівалентна річна дохідність при рівномірному зростанні. Формула: CAGR = (Підсумок/Вкладення)^(1/років) − 1.' },
      { q: 'Що таке мультиплікатор інвестицій?', a: 'Мультиплікатор показує, у скільки разів зросли вкладення. Наприклад, 2,5× означає, що капітал виріс у 2,5 рази. Формула: Підсумкова вартість / Сума вкладень.' },
      { q: 'Чи може ROI бути від\'ємним?', a: 'Так. Від\'ємний ROI означає збиток. Наприклад, вклали 100 000 ₴, отримали 70 000 ₴ — ROI складе −30%.' },
      { q: 'Який ROI вважається хорошим?', a: 'Залежить від класу активів. Фондовий ринок історично дає 7–10% річних, нерухомість — 4–8%, банківський депозит — 2–5%.' },
    ],
  },
  fr: {
    description: 'Le ROI (Return on Investment) est l\'indicateur de rentabilité le plus utilisé. Entrez le montant investi et la valeur finale pour calculer instantanément le ROI en pourcentage, le gain ou la perte nette, et le multiplicateur. Entrez la durée pour obtenir le ROI annualisé (TCAM).',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le ROI ?', a: 'Le ROI (Return on Investment) mesure la rentabilité d\'un investissement en pourcentage. Formule : ROI = (Valeur finale − Montant investi) / Montant investi × 100 %.' },
      { q: 'Qu\'est-ce que le ROI annualisé (TCAM) ?', a: 'Le ROI annualisé, ou TCAM (Taux de Croissance Annuel Moyen), représente le rendement annuel équivalent pour une croissance régulière. Formule : TCAM = (Final/Initial)^(1/années) − 1.' },
      { q: 'Qu\'est-ce que le multiplicateur d\'investissement ?', a: 'Le multiplicateur indique combien de fois votre capital a été multiplié. Par exemple, 2,5× signifie que l\'investissement a été multiplié par 2,5. Formule : Valeur finale / Montant initial.' },
      { q: 'Le ROI peut-il être négatif ?', a: 'Oui. Un ROI négatif signifie une perte. Par exemple, si vous investissez 10 000 € et récupérez 7 000 €, le ROI est de −30 %.' },
      { q: 'Quel est un bon ROI ?', a: 'Cela dépend de la catégorie d\'actif. Les marchés boursiers ont historiquement généré 7 à 10 % par an, l\'immobilier 4 à 8 %, les dépôts bancaires 2 à 5 %.' },
    ],
  },
  lt: {
    description: 'RI (investicijų grąža) — plačiausiai naudojamas investicijų pelningumo rodiklis. Įveskite investuotą sumą ir galutinę vertę, kad akimirksniu apskaičiuotumėte RI procentais, grynąjį pelną ar nuostolį ir daugiklį. Nurodykite laikotarpį, kad gautumėte metinę RI (CAGR).',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra RI (investicijų grąža)?', a: 'RI matuoja investicijos pelningumą procentais. Formulė: RI = (Galutinė vertė − Investuota suma) / Investuota suma × 100 %.' },
      { q: 'Kas yra metinė RI (CAGR)?', a: 'Metinė RI arba CAGR (sudėtinis metinis augimo tempas) rodo ekvivalentinę metinę grąžą esant tolygiam augimui. Formulė: CAGR = (Galutinė/Pradinė)^(1/metai) − 1.' },
      { q: 'Kas yra investicijų daugiklis?', a: 'Daugiklis rodo, kiek kartų išaugo jūsų kapitalas. Pavyzdžiui, 2,5× reiškia, kad investicija išaugo 2,5 karto.' },
      { q: 'Ar RI gali būti neigiama?', a: 'Taip. Neigiama RI reiškia nuostolį. Pavyzdžiui, investavote 10 000 €, grąžinta 7 000 € — RI bus −30 %.' },
      { q: 'Kokia RI laikoma gera?', a: 'Priklauso nuo turto klasės. Akcijų rinkos istoriškai duoda 7–10 % per metus, nekilnojamasis turtas — 4–8 %, indėliai — 2–5 %.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/roi') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RoiPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/roi`,
    applicationCategory: 'FinanceApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <RoiCalculator locale={locale} />
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

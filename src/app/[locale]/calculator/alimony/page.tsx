import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import AlimonyCalculator from './AlimonyCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/mortgage', label: 'Mortgage Calculator' }, { href: '/calculator/loan', label: 'Loan Calculator' }],
  ru: [{ href: '/calculator/mortgage', label: 'Ипотечный калькулятор' }, { href: '/calculator/loan', label: 'Калькулятор кредита' }],
  uk: [{ href: '/calculator/mortgage', label: 'Іпотечний калькулятор' }, { href: '/calculator/loan', label: 'Калькулятор кредиту' }],
  fr: [{ href: '/calculator/mortgage', label: 'Calculatrice de prêt immobilier' }, { href: '/calculator/loan', label: 'Calculatrice de prêt' }],
  lt: [{ href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' }, { href: '/calculator/loan', label: 'Paskolos skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Child Support Calculator — Calculate Alimony Online', description: 'Free child support (alimony) calculator. Calculate monthly payments based on income, number of children and your country\'s law.', h1: 'Child Support Calculator' },
  ru: { title: 'Калькулятор алиментов — расчёт онлайн', description: 'Бесплатный калькулятор алиментов. Рассчитайте ориентировочную сумму алиментов по доходу и законодательству вашей страны.', h1: 'Калькулятор алиментов' },
  uk: { title: 'Калькулятор аліментів — розрахунок онлайн', description: 'Безкоштовний калькулятор аліментів. Розрахуйте орієнтовну суму аліментів за доходом і законодавством вашої країни.', h1: 'Калькулятор аліментів' },
  fr: { title: 'Calculatrice de pension alimentaire — calcul en ligne', description: 'Calculez la pension alimentaire estimée selon vos revenus, le nombre d\'enfants et la législation de votre pays.', h1: 'Calculatrice de pension alimentaire' },
  lt: { title: 'Alimentų skaičiuotuvas — skaičiuokite internetu', description: 'Nemokamas alimentų skaičiuotuvas. Apskaičiuokite apytikslę alimentų sumą pagal pajamas ir jūsų šalies įstatymus.', h1: 'Alimentų skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This calculator helps you estimate monthly child support (alimony) payments based on your net income, number of children, and the legal framework of your country. Select your country to apply the correct percentage rates established by local family law. All results are approximate and for informational purposes only.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is child support calculated?', a: 'In most countries, child support is calculated as a percentage of the payer\'s net monthly income. The percentage depends on the number of children: typically 25% for 1 child, 33% for 2, and 50% for 3 or more in CIS countries; different rates apply in Western countries.' },
      { q: 'Is the calculated amount legally binding?', a: 'No. This calculator provides an estimate for informational purposes only. The actual amount is determined by a court and may differ based on individual circumstances, additional costs (healthcare, education), and the financial situation of both parents.' },
      { q: 'What if the payer has irregular income?', a: 'If income is variable (self-employed, freelance), courts typically use an average monthly income calculated over the past 12 months, or a fixed minimum based on the minimum wage in some jurisdictions.' },
      { q: 'Can alimony amounts be changed?', a: 'Yes. Either parent can apply to the court to increase or decrease alimony if there is a significant change in financial circumstances — such as job loss, disability, or a change in the child\'s needs.' },
      { q: 'Are child support and spousal support the same?', a: 'No. Child support (alimony for children) is calculated based on the child\'s needs and the payer\'s income. Spousal support (alimony for a spouse) is separate and depends on different legal criteria in each country.' },
    ],
  },
  ru: {
    description: 'Калькулятор помогает рассчитать ориентировочную сумму алиментов на основе чистого дохода, количества детей и законодательства вашей страны. Выберите страну, чтобы применить актуальные ставки, установленные семейным кодексом. Все результаты носят информационный характер.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитываются алименты?', a: 'В большинстве стран СНГ алименты рассчитываются как процент от чистого ежемесячного дохода: 25% на 1 ребёнка, 33% на 2 детей, 50% на 3 и более детей (ст. 81 СК РФ). В других странах ставки отличаются.' },
      { q: 'Является ли расчёт юридически обязательным?', a: 'Нет. Калькулятор даёт ориентировочную сумму. Реальный размер алиментов определяет суд, учитывая индивидуальные обстоятельства, дополнительные расходы (лечение, образование) и финансовое положение обоих родителей.' },
      { q: 'Что если у плательщика нет постоянного дохода?', a: 'При отсутствии официального дохода суд может назначить алименты в твёрдой денежной сумме, ориентируясь на прожиточный минимум ребёнка. Также учитывается средний доход за последние 12 месяцев.' },
      { q: 'Можно ли изменить размер алиментов?', a: 'Да. Любой из родителей вправе обратиться в суд с иском об изменении размера алиментов при существенном изменении материального положения (потеря работы, инвалидность, рождение новых детей).' },
      { q: 'Алименты на ребёнка и на супруга — это одно и то же?', a: 'Нет. Алименты на ребёнка рассчитываются по отдельным правилам. Алименты на супруга (супружеские алименты) — самостоятельный вид выплат с другими критериями назначения.' },
    ],
  },
  uk: {
    description: 'Калькулятор допомагає розрахувати орієнтовну суму аліментів на основі чистого доходу, кількості дітей та законодавства вашої країни. Оберіть країну, щоб застосувати актуальні ставки сімейного кодексу. Усі результати мають інформаційний характер.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розраховуються аліменти?', a: 'В Україні аліменти розраховуються як відсоток від чистого щомісячного доходу: 25% на 1 дитину, 33% на 2 дітей, 50% на 3 і більше (ст. 183 Сімейного кодексу). Мінімальна сума — 50% прожиткового мінімуму на дитину.' },
      { q: 'Чи є розрахунок юридично обов\'язковим?', a: 'Ні. Калькулятор надає орієнтовну суму. Реальний розмір аліментів визначає суд з урахуванням індивідуальних обставин, додаткових витрат та фінансового стану обох батьків.' },
      { q: 'Що якщо платник не має постійного доходу?', a: 'За відсутності офіційного доходу суд може призначити аліменти у твердій грошовій сумі, орієнтуючись на прожитковий мінімум дитини або середній заробіток у регіоні.' },
      { q: 'Чи можна змінити розмір аліментів?', a: 'Так. Будь-який з батьків може звернутися до суду для зміни розміру аліментів при суттєвій зміні матеріального становища (втрата роботи, інвалідність, народження інших дітей).' },
      { q: 'Чи відрізняються аліменти на дитину та на чоловіка/дружину?', a: 'Так. Аліменти на дитину та подружні аліменти — різні виплати з окремими критеріями призначення та розміром.' },
    ],
  },
  fr: {
    description: 'Ce calculateur vous permet d\'estimer la pension alimentaire mensuelle en fonction de vos revenus nets, du nombre d\'enfants et du droit applicable dans votre pays. Sélectionnez votre pays pour appliquer les taux légaux en vigueur. Les résultats sont indicatifs uniquement.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment est calculée la pension alimentaire ?', a: 'En France, le montant est déterminé par le juge aux affaires familiales selon un barème indicatif du Ministère de la Justice, tenant compte des revenus du débiteur, du nombre d\'enfants et du temps de résidence chez chaque parent.' },
      { q: 'Le montant calculé est-il juridiquement contraignant ?', a: 'Non. Ce calculateur fournit une estimation indicative. Le montant réel est fixé par le juge et peut différer selon les circonstances individuelles, les frais supplémentaires et la situation financière des deux parents.' },
      { q: 'Que se passe-t-il si le débiteur n\'a pas de revenus réguliers ?', a: 'En cas de revenus irréguliers, le juge peut fixer la pension sur la base d\'un revenu moyen des 12 derniers mois, ou d\'un montant forfaitaire lié au SMIC si les revenus sont très faibles.' },
      { q: 'Peut-on modifier le montant de la pension ?', a: 'Oui. L\'un ou l\'autre parent peut saisir le juge pour réviser la pension en cas de changement significatif de situation (perte d\'emploi, invalidité, nouvelle naissance).' },
      { q: 'Quelle est la différence entre pension alimentaire et prestation compensatoire ?', a: 'La pension alimentaire concerne l\'entretien des enfants. La prestation compensatoire est versée à l\'ex-conjoint pour compenser une disparité de niveau de vie due au divorce — ce sont deux mécanismes distincts.' },
    ],
  },
  lt: {
    description: 'Šis skaičiuotuvas padeda apskaičiuoti apytikslę mėnesinę alimentų sumą pagal jūsų grynosios pajamos, vaikų skaičių ir jūsų šalies teisę. Pasirinkite šalį, kad pritaikytumėte teisingus šeimos teisės normatyvus. Visi rezultatai yra orientaciniai.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip skaičiuojami alimentai?', a: 'Lietuvoje alimentai paprastai sudaro 25% pajamų vienam vaikui, 33% dviem vaikams, 50% trims ir daugiau (LR CK 3.196 str.). Teismas gali nustatyti ir fiksuotą sumą, atsižvelgdamas į vaiko poreikius.' },
      { q: 'Ar apskaičiuota suma yra teisiškai privaloma?', a: 'Ne. Skaičiuotuvas pateikia orientacinę sumą. Tikrąjį dydį nustato teismas, atsižvelgdamas į individualias aplinkybes, papildomas išlaidas ir abiejų tėvų finansinę padėtį.' },
      { q: 'Ką daryti, jei mokėtojas neturi nuolatinių pajamų?', a: 'Jei pajamos nereguliarios, teismas gali paskirti alimentus fiksuota suma, atsižvelgdamas į minimalią mėnesinę algą arba vidutines pajamas regione.' },
      { q: 'Ar galima pakeisti alimentų dydį?', a: 'Taip. Kiekvienas iš tėvų gali kreiptis į teismą dėl alimentų dydžio pakeitimo, pasikeitus finansinėms aplinkybėms (darbo netekimas, negalia, naujų vaikų gimimas).' },
      { q: 'Koks skirtumas tarp alimentų vaikui ir sutuoktiniui?', a: 'Alimentai vaikui ir sutuoktiniui — tai atskiri mokėjimai su skirtingais paskyrimo kriterijais. Alimentai vaikui skiriami jo išlaikymui, o sutuoktiniui — pagal kitus teisinius pagrindus.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/alimony') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AlimonyPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/alimony`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <AlimonyCalculator locale={locale} />

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

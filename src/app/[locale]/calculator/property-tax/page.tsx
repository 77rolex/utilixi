import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import PropertyTaxCalculator from './PropertyTaxCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/renovation', label: 'Renovation Cost Calculator' }, { href: '/calculator/mortgage', label: 'Mortgage Calculator' }],
  ru: [{ href: '/calculator/renovation', label: 'Калькулятор стоимости ремонта' }, { href: '/calculator/mortgage', label: 'Ипотечный калькулятор' }],
  uk: [{ href: '/calculator/renovation', label: 'Калькулятор вартості ремонту' }, { href: '/calculator/mortgage', label: 'Іпотечний калькулятор' }],
  fr: [{ href: '/calculator/renovation', label: 'Calculateur de coût de rénovation' }, { href: '/calculator/mortgage', label: 'Calculateur de prêt immobilier' }],
  lt: [{ href: '/calculator/renovation', label: 'Remonto kainos skaičiuotuvas' }, { href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Property Tax Calculator — By Country', description: 'Estimate annual property tax for Germany, France, Poland, Lithuania, Ukraine, USA, and the UK. Covers residential, commercial, and agricultural properties.', h1: 'Property Tax Calculator' },
  ru: { title: 'Калькулятор налога на недвижимость — по стране', description: 'Рассчитайте годовой налог на недвижимость для Германии, Франции, Польши, Литвы, Украины, США и Великобритании. Жилая, коммерческая и сельскохозяйственная недвижимость.', h1: 'Калькулятор налога на недвижимость' },
  uk: { title: 'Калькулятор податку на нерухомість — за країною', description: 'Розрахуйте річний податок на нерухомість для Німеччини, Франції, Польщі, Литви, України, США та Великої Британії. Житлова, комерційна та сільськогосподарська нерухомість.', h1: 'Калькулятор податку на нерухомість' },
  fr: { title: 'Calculateur de taxe foncière — par pays', description: 'Estimez la taxe foncière annuelle pour l\'Allemagne, la France, la Pologne, la Lituanie, l\'Ukraine, les États-Unis et le Royaume-Uni. Résidentiel, commercial et agricole.', h1: 'Calculateur de taxe foncière' },
  lt: { title: 'Nekilnojamojo turto mokesčio skaičiuotuvas — pagal šalį', description: 'Apskaičiuokite metinį nekilnojamojo turto mokestį Vokietijoje, Prancūzijoje, Lenkijoje, Lietuvoje, Ukrainoje, JAV ir Jungtinėje Karalystėje. Gyvenamasis, komercinis ir žemės ūkio turtas.', h1: 'Nekilnojamojo turto mokesčio skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Property taxes vary significantly between countries and even between regions within the same country. This calculator provides approximate annual tax estimates based on typical effective rates for your selected country and property type. Always consult official tax authority data or a tax professional for precise calculations, as rates change and may depend on specific local conditions.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is property tax calculated?', a: 'Most countries calculate property tax as a percentage of the property\'s assessed or market value. The rate may differ by property type (residential vs. commercial), primary vs. secondary home status, and municipality. Some countries (e.g. the UK and Poland) use fixed rates per square metre or per valuation band rather than a percentage of market value.' },
      { q: 'Is property tax paid by the owner or the tenant?', a: 'In almost all countries, property tax is the legal responsibility of the owner, not the tenant. However, landlords often factor property tax into the rent they charge. In France, the taxe d\'habitation (abolished for primary residences) was historically paid by the occupant, but taxe foncière is always the owner\'s responsibility.' },
      { q: 'Are there exemptions or reductions?', a: 'Yes. Common exemptions include: primary residence reductions (Lithuania, France), exemptions for low-income elderly owners (USA, many states), agricultural land at lower rates or fully exempt (UK), new construction holidays (various countries), and reductions for disabled persons. Rules vary greatly by country and even by municipality.' },
      { q: 'What happens if I don\'t pay property tax?', a: 'Non-payment typically results in penalties, interest charges, and eventually a tax lien against the property. In serious cases, tax authorities can force a sale of the property to recover unpaid taxes. In the UK, council tax debt is collected through courts and can result in bailiff action. Always pay on time or arrange a payment plan.' },
      { q: 'How often is property tax assessed and paid?', a: 'Frequency varies by country. In Germany and France, it\'s annual. In the UK, council tax is usually paid in 10 monthly instalments. In the USA, property tax is typically annual but many counties allow semi-annual or quarterly payments. In Lithuania, property tax is assessed annually based on the cadastral value from January 1st of that year.' },
    ],
  },
  ru: {
    description: 'Налоги на недвижимость существенно различаются в зависимости от страны и даже региона внутри одной страны. Калькулятор предоставляет приближённые оценки на основе типичных эффективных ставок. Для точных расчётов обращайтесь к официальным данным налоговых органов.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитывается налог на недвижимость?', a: 'В большинстве стран налог рассчитывается как процент от оценочной или рыночной стоимости недвижимости. Ставка может различаться в зависимости от типа объекта (жилой/коммерческий), основного или вторичного жилья и муниципалитета. Ряд стран (Великобритания, Польша) использует фиксированные ставки за м² или по диапазону оценки.' },
      { q: 'Кто платит налог — собственник или арендатор?', a: 'Во всех странах налог на недвижимость — обязанность собственника, а не арендатора. Однако арендодатели, как правило, учитывают этот расход в арендной плате. Во Франции taxe d\'habitation (отменён для основного жилья) исторически платился жильцом, но taxe foncière всегда платит собственник.' },
      { q: 'Есть ли льготы или освобождения?', a: 'Да. Распространённые льготы: снижение для основного жилья (Литва, Франция), освобождение для малообеспеченных пожилых собственников (США), льготные ставки или полное освобождение для сельскохозяйственных угодий (Великобритания), налоговые каникулы для новостроек, скидки для инвалидов.' },
      { q: 'Что будет, если не платить налог?', a: 'Неуплата влечёт пени, начисление процентов и налоговый залог на имущество. В серьёзных случаях налоговые органы могут принудительно продать имущество. Всегда платите вовремя или договоритесь о рассрочке.' },
      { q: 'Как часто начисляется и уплачивается налог?', a: 'Германия и Франция — ежегодно. Великобритания — как правило, 10 ежемесячных платежей. США — ежегодно, многие округа допускают полугодовые или квартальные платежи. Литва — ежегодно, исходя из кадастровой стоимости на 1 января налогового года.' },
    ],
  },
  uk: {
    description: 'Податки на нерухомість суттєво різняться в залежності від країни і навіть регіону всередині однієї країни. Калькулятор надає наближені оцінки на основі типових ефективних ставок. Для точних розрахунків звертайтеся до офіційних даних податкових органів.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розраховується податок на нерухомість?', a: 'У більшості країн податок розраховується як відсоток від оціночної або ринкової вартості нерухомості. Ставка може різнитися залежно від типу об\'єкта (житловий/комерційний), основного або вторинного житла та муніципалітету. Ряд країн (Велика Британія, Польща) використовує фіксовані ставки за м² або за діапазоном оцінки.' },
      { q: 'Хто платить податок — власник або орендар?', a: 'В усіх країнах податок на нерухомість — обов\'язок власника, а не орендаря. Однак орендодавці, як правило, враховують цей витрат у орендній платі. У Франції taxe d\'habitation (скасовано для основного житла) історично сплачував мешканець, але taxe foncière завжди платить власник.' },
      { q: 'Чи є пільги або звільнення?', a: 'Так. Поширені пільги: зниження для основного житла (Литва, Франція), звільнення для малозабезпечених літніх власників (США), пільгові ставки або повне звільнення для сільськогосподарських угідь (Велика Британія), податкові канікули для новобудов, знижки для осіб з інвалідністю.' },
      { q: 'Що буде, якщо не платити податок?', a: 'Несплата тягне за собою штрафи, нарахування відсотків та податкову заставу на майно. У серйозних випадках податкові органи можуть примусово продати майно. Завжди платіть вчасно або домовляйтеся про розстрочку.' },
      { q: 'Як часто нараховується та сплачується податок?', a: 'Німеччина та Франція — щорічно. Велика Британія — як правило, 10 щомісячних платежів. США — щорічно, багато округів допускають піврічні або квартальні платежі. Литва — щорічно, виходячи з кадастрової вартості на 1 січня податкового року.' },
    ],
  },
  fr: {
    description: 'Les taxes foncières varient considérablement d\'un pays à l\'autre et même d\'une région à l\'autre. Ce calculateur fournit des estimations approximatives basées sur les taux effectifs typiques. Consultez toujours les données officielles des autorités fiscales pour des calculs précis.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment la taxe foncière est-elle calculée ?', a: 'Dans la plupart des pays, la taxe est calculée en pourcentage de la valeur estimée ou marchande du bien. Le taux peut différer selon le type de propriété (résidentiel vs. commercial), le statut résidence principale vs. secondaire, et la commune. Certains pays (Royaume-Uni, Pologne) utilisent des taux fixes par m² ou par tranche de valorisation.' },
      { q: 'Qui paie la taxe — le propriétaire ou le locataire ?', a: 'Dans presque tous les pays, la taxe foncière est la responsabilité légale du propriétaire, pas du locataire. Les propriétaires intègrent généralement cette charge dans le loyer. En France, la taxe d\'habitation (supprimée pour les résidences principales) était historiquement payée par l\'occupant, mais la taxe foncière reste toujours à la charge du propriétaire.' },
      { q: 'Y a-t-il des exonérations ou réductions ?', a: 'Oui. Les exonérations courantes incluent : réductions pour résidence principale (Lituanie, France), exonérations pour les personnes âgées à faibles revenus (États-Unis), terres agricoles à taux réduit ou exonérées (Royaume-Uni), périodes de franchise pour les constructions nouvelles, réductions pour personnes handicapées.' },
      { q: 'Que se passe-t-il si je ne paie pas la taxe ?', a: 'Le non-paiement entraîne des pénalités, des intérêts de retard et éventuellement un privilège fiscal sur le bien. Dans les cas graves, les autorités fiscales peuvent forcer la vente du bien. Payez toujours à temps ou négociez un plan de paiement.' },
      { q: 'À quelle fréquence la taxe est-elle évaluée et payée ?', a: 'Allemagne et France : annuellement. Royaume-Uni : généralement 10 mensualités. États-Unis : annuellement, de nombreux comtés acceptent des paiements semi-annuels ou trimestriels. Lituanie : annuellement, basé sur la valeur cadastrale au 1er janvier.' },
    ],
  },
  lt: {
    description: 'Nekilnojamojo turto mokesčiai labai skiriasi priklausomai nuo šalies ir net regiono toje pačioje šalyje. Šis skaičiuotuvas pateikia apytikslius metinius mokesčio įvertinimus remiantis tipiniais efektyviais tarifais. Tikslių skaičiavimų kreipkitės į oficialius mokesčių institucijų duomenis.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuojamas nekilnojamojo turto mokestis?', a: 'Daugumoje šalių mokestis apskaičiuojamas kaip turto vertinimo arba rinkos vertės procentas. Tarifas gali skirtis priklausomai nuo turto tipo (gyvenamasis / komercinis), pagrindinės ar antrinės gyvenamosios vietos statuso ir savivaldybės. Kai kurios šalys (JK, Lenkija) naudoja fiksuotus tarifus už m² arba pagal vertinimo juostas.' },
      { q: 'Kas moka mokestį – savininkas ar nuomininkas?', a: 'Beveik visose šalyse nekilnojamojo turto mokestis yra savininko, o ne nuomininko teisinė pareiga. Tačiau nuomotojai dažniausiai įskaičiuoja šią išlaidą į nuomą. Prancūzijoje taxe d\'habitation (panaikinta pagrindinėms gyvenamosioms vietoms) istoriškai mokėjo gyventojas, tačiau taxe foncière visada mokama savininko.' },
      { q: 'Ar yra atleidimų ar nuolaidų?', a: 'Taip. Dažni atleidimai: pagrindinės gyvenamosios vietos sumažinimas (Lietuva, Prancūzija), atleidimas mažas pajamas gaunantiems pagyvenusiems savininkams (JAV), žemės ūkio paskirties žemė mažesniais tarifais arba visiškai atleista (JK), mokesčių atostogos naujoms statyboms, nuolaidos neįgaliesiems.' },
      { q: 'Kas nutiks, jei nemokėsiu mokesčio?', a: 'Nesumokėjus gresia baudos, palūkanos ir galų gale mokestinė hipoteka turtui. Rimtais atvejais mokesčių institucijos gali priverstinai parduoti turtą. Visada mokėkite laiku arba susitarkite dėl mokėjimo plano.' },
      { q: 'Kaip dažnai mokestis apskaičiuojamas ir mokamas?', a: 'Vokietija ir Prancūzija – kasmet. JK – paprastai 10 mėnesinių įmokų. JAV – kasmet, daugelis apskričių leidžia pusmečio arba ketvirčio mokėjimus. Lietuva – kasmet, remiantis kadastrų verte sausio 1 d.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/property-tax') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PropertyTaxPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/property-tax`,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <PropertyTaxCalculator locale={locale} />
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

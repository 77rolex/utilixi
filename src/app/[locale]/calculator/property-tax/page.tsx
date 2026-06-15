import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import PropertyTaxCalculator from './PropertyTaxCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/renovation', label: 'Renovation Cost Calculator' }, { href: '/calculator/mortgage', label: 'Mortgage Calculator' }, { href: '/calculator/loan', label: 'Loan Calculator' }, { href: '/calculator/rent-vs-buy', label: 'Rent vs Buy Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }],
  ru: [{ href: '/calculator/renovation', label: 'Калькулятор стоимости ремонта' }, { href: '/calculator/mortgage', label: 'Ипотечный калькулятор' }, { href: '/calculator/loan', label: 'Калькулятор кредита' }, { href: '/calculator/rent-vs-buy', label: 'Аренда vs Покупка' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }],
  uk: [{ href: '/calculator/renovation', label: 'Калькулятор вартості ремонту' }, { href: '/calculator/mortgage', label: 'Іпотечний калькулятор' }, { href: '/calculator/loan', label: 'Калькулятор кредиту' }, { href: '/calculator/rent-vs-buy', label: 'Оренда vs Купівля' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }],
  fr: [{ href: '/calculator/renovation', label: 'Calculateur de coût de rénovation' }, { href: '/calculator/mortgage', label: 'Calculateur de prêt immobilier' }, { href: '/calculator/loan', label: 'Calculatrice de prêt' }, { href: '/calculator/rent-vs-buy', label: 'Louer vs Acheter' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }],
  lt: [{ href: '/calculator/renovation', label: 'Remonto kainos skaičiuotuvas' }, { href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' }, { href: '/calculator/loan', label: 'Paskolos skaičiuotuvas' }, { href: '/calculator/rent-vs-buy', label: 'Nuoma vs Pirkimas' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Property Tax Calculator — By Country', description: 'Estimate annual property tax for Germany, France, Poland, Lithuania, Ukraine, USA, and the UK. Covers residential, commercial, and agricultural properties.', h1: 'Property Tax Calculator', subtitle: 'Estimate your annual property tax based on property value and your country\'s tax rates.' },
  ru: { title: 'Калькулятор налога на недвижимость — по стране', description: 'Рассчитайте годовой налог на недвижимость для Германии, Франции, Польши, Литвы, Украины, США и Великобритании. Жилая, коммерческая и сельскохозяйственная недвижимость.', h1: 'Калькулятор налога на недвижимость', subtitle: 'Рассчитайте ежегодный налог на недвижимость по стоимости и ставкам вашей страны.' },
  uk: { title: 'Калькулятор податку на нерухомість — за країною', description: 'Розрахуйте річний податок на нерухомість для Німеччини, Франції, Польщі, Литви, України, США та Великої Британії. Житлова, комерційна та сільськогосподарська нерухомість.', h1: 'Калькулятор податку на нерухомість', subtitle: 'Розрахуйте річний податок на нерухомість за вартістю та ставками вашої країни.' },
  fr: { title: 'Calculateur de taxe foncière — par pays', description: 'Estimez la taxe foncière annuelle pour l\'Allemagne, la France, la Pologne, la Lituanie, l\'Ukraine, les États-Unis et le Royaume-Uni. Résidentiel, commercial et agricole.', h1: 'Calculateur de taxe foncière', subtitle: 'Estimez votre taxe foncière annuelle selon la valeur du bien et les taux de votre pays.' },
  lt: { title: 'Nekilnojamojo turto mokesčio skaičiuotuvas — pagal šalį', description: 'Apskaičiuokite metinį nekilnojamojo turto mokestį Vokietijoje, Prancūzijoje, Lenkijoje, Lietuvoje, Ukrainoje, JAV ir Jungtinėje Karalystėje. Gyvenamasis, komercinis ir žemės ūkio turtas.', h1: 'Nekilnojamojo turto mokesčio skaičiuotuvas', subtitle: 'Apskaičiuokite metinį nekilnojamojo turto mokestį pagal vertę ir jūsų šalies normas.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Property taxes vary significantly between countries and even between regions within the same country. This calculator provides approximate annual tax estimates based on typical effective rates for your selected country and property type. Always consult official tax authority data or a tax professional for precise calculations, as rates change and may depend on specific local conditions.\n\nUnderstanding property tax is essential for property investment, budgeting, and cross-border comparison. In the US, property taxes can range from 0.3% (Hawaii) to 2.5% (New Jersey) of property value per year. In Europe, systems vary from France\'s taxe foncière to Germany\'s Grundsteuer to the UK\'s council tax — all calculated differently.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is property tax calculated?', a: 'Most countries calculate property tax as a percentage of assessed or market value. The rate may differ by property type (residential vs commercial), primary vs secondary home, and municipality. Some countries (UK, Poland) use fixed rates per square metre or per valuation band.' },
      { q: 'Is property tax paid by the owner or the tenant?', a: 'In almost all countries, property tax is the owner\'s legal responsibility. Landlords typically factor it into rent. Exception: in France, taxe d\'habitation (now abolished for primary residences) was historically paid by the occupant; taxe foncière is always the owner\'s.' },
      { q: 'Are there exemptions or reductions?', a: 'Yes. Common exemptions: primary residence reductions (Lithuania, France), exemptions for low-income elderly owners (USA), agricultural land at lower rates (UK), new construction holidays, and reductions for disabled persons. Rules vary greatly by country and municipality.' },
      { q: 'What happens if I don\'t pay property tax?', a: 'Non-payment results in penalties, interest, and eventually a tax lien. Tax authorities can force a property sale to recover unpaid taxes. In the UK, council tax debt is collected through courts and can lead to bailiff action. Always pay on time or arrange a payment plan.' },
      { q: 'How often is property tax assessed and paid?', a: 'Germany and France: annually. UK: 10 monthly council tax instalments. USA: annual, with many counties allowing semi-annual/quarterly payments. Lithuania: annually, based on cadastral value as of January 1st.' },
      { q: 'How is property tax calculated in Lithuania?', a: 'In Lithuania, property tax for individuals is 0.5% of the cadastral value per year for the portion above the tax-free threshold (€150,000 for residential property as of 2024). For commercial property, the rate is 0.3–3% depending on the municipality. The tax is assessed annually on the cadastral value registered on January 1st.' },
      { q: 'What is the Grundsteuer in Germany?', a: 'Germany\'s Grundsteuer (property tax) was reformed in 2025. The new system uses the property value, a federal base rate, and a municipal multiplier (Hebesatz). Rates vary enormously by municipality — from ~250% (some rural areas) to over 1,000% (some cities). The effective rate is typically 0.3–1% of market value per year.' },
      { q: 'How does UK council tax work?', a: 'In the UK, council tax is based on property valuation bands (A–H), last assessed in 1991 (England/Wales). Each council sets its own annual rate per band. A typical Band D property pays £1,500–£2,500/year depending on the council. Scotland and Northern Ireland have separate systems.' },
      { q: 'What is the millage rate in the USA?', a: 'The millage rate is the tax rate expressed per $1,000 of assessed property value. 1 mill = $1 per $1,000 of value. For example, a 20 mill rate on a $300,000 property assessed at 80% = $300,000 × 0.8 × 0.020 = $4,800/year. Rates vary enormously by state and county: from ~3 mills (some Hawaii counties) to 30+ mills (some New Jersey counties).' },
      { q: 'Are commercial properties taxed differently?', a: 'Yes — in most countries, commercial property faces higher tax rates than residential. In the UK, non-domestic rates (business rates) use a separate rateable value system with a national multiplier (~51p per £1 of rateable value). In Lithuania, commercial property is taxed at 0.3–3% vs 0.5% for residential. In France, commercial property faces both taxe foncière and a separate CFE business tax.' },
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
  return buildMetadata(locale, '/calculator/property-tax', meta);
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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
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
        <h1 className={styles.page__title}>{meta.h1}</h1>
        {meta.subtitle && <p className={styles.page__subtitle}>{meta.subtitle}</p>}
        <ToolActions />
        <PropertyTaxCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
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

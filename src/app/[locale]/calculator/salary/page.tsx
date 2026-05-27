import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import SalaryCalculator from './SalaryCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Gross to Net Salary Calculator — Tax by Country',
    description: 'Calculate your net salary from gross pay. Accurate income tax and social contribution breakdown for 24 countries: Ukraine, Russia, Belarus, Kazakhstan, Germany, France, Belgium, Switzerland, UK, USA, Canada, Australia, Ireland, New Zealand and more.',
    h1: 'Gross to Net Salary Calculator',
  },
  ru: {
    title: 'Калькулятор зарплаты брутто-нетто — налоги по странам',
    description: 'Рассчитайте нетто-зарплату из брутто. Точный расчёт налогов и социальных взносов для 24 стран: Украина, Россия, Беларусь, Казахстан, Азербайджан, Грузия, Армения, Молдова, Узбекистан, Кыргызстан, Германия, Франция, Бельгия, Швейцария, Нидерланды, Польша, Чехия, Литва, Великобритания, США, Канада, Австралия, Ирландия, Новая Зеландия.',
    h1: 'Калькулятор зарплаты брутто — нетто',
  },
  uk: {
    title: 'Калькулятор зарплати брутто-нетто — податки по країнах',
    description: 'Розрахуйте нетто-зарплату з брутто. Точний розрахунок податків і соціальних внесків для 24 країн: Україна, Росія, Білорусь, Казахстан, Азербайджан, Грузія, Вірменія, Молдова, Узбекистан, Киргизстан, Німеччина, Франція, Бельгія, Швейцарія, Нідерланди, Польща, Чехія, Литва, Велика Британія, США, Канада, Австралія, Ірландія, Нова Зеландія.',
    h1: 'Калькулятор зарплати брутто — нетто',
  },
  fr: {
    title: 'Calculateur Salaire Brut Net — Impôts par pays',
    description: 'Calculez votre salaire net à partir du brut. Détail précis des impôts et cotisations sociales pour 24 pays : Ukraine, Russie, Biélorussie, Kazakhstan, Géorgie, Arménie, Moldavie, Ouzbékistan, Allemagne, France, Belgique, Suisse, Pays-Bas, Pologne, Tchéquie, Lituanie, Royaume-Uni, États-Unis, Canada, Australie, Irlande, Nouvelle-Zélande et plus.',
    h1: 'Calculateur Salaire Brut — Net',
  },
  lt: {
    title: 'Bruto-Neto Atlyginimo Skaičiuotuvas — Mokesčiai pagal šalį',
    description: 'Apskaičiuokite neto atlyginimą iš bruto. Tikslus pajamų mokesčio ir socialinio draudimo skaičiavimas 24 šalims: Ukrainai, Rusijai, Baltarusijai, Kazachstanui, Gruzijai, Armėnijai, Moldovai, Uzbekistanui, Vokietijai, Prancūzijai, Belgijai, Šveicarijai, Lenkijai, Čekijai, Lietuvai, JK, JAV, Kanadai, Australijai, Airijai, Naujajai Zelandijai ir kt.',
    h1: 'Bruto į Neto Atlyginimo Skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our gross to net salary calculator shows exactly how much money you take home after all mandatory deductions — income tax, social security, health insurance and other contributions. Supports 24 countries including Ukraine, Russia, Belarus, Kazakhstan, Azerbaijan, Georgia, Armenia, Moldova, Uzbekistan, Kyrgyzstan, Germany, France, Belgium, Switzerland, Netherlands, Poland, Czech Republic, Lithuania, United Kingdom, USA, Canada, Australia, Ireland and New Zealand. Select your country to get a country-specific breakdown based on the latest 2024–2025 tax rates.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'What is the difference between gross and net salary?',
        a: 'Gross salary is your total earnings before any deductions. Net salary — sometimes called "take-home pay" — is what you actually receive after income tax, social security contributions, and other mandatory deductions are subtracted.',
      },
      {
        q: 'Which deductions are calculated?',
        a: 'The calculator includes employee-side income tax (using the current progressive brackets for each country) and mandatory employee social insurance contributions such as pension, health, and unemployment insurance. Employer-side contributions are not shown.',
      },
      {
        q: 'Why does the net salary differ so much between countries?',
        a: 'Each country has its own income tax structure (flat or progressive rates, tax-free thresholds, credits) and different rates for social insurance. For example, Lithuania has a combined employee social rate of 19.5%, while Ukraine is 23% (18% income tax + 5% military levy).',
      },
      {
        q: 'Is the calculation exact?',
        a: 'The results are a close approximation for a single employee with no special deductions. Local or regional taxes (e.g. US state income tax, German church tax), employment-specific deductions, or tax credits for children and dependants are not included.',
      },
    ],
  },
  ru: {
    description: 'Калькулятор зарплаты брутто-нетто точно показывает, сколько вы получите на руки после всех обязательных вычетов — налога на доходы, взносов в социальные фонды и медицинского страхования. Поддерживает 24 страны: Украина, Россия, Беларусь, Казахстан, Азербайджан, Грузия, Армения, Молдова, Узбекистан, Кыргызстан, Германия, Франция, Бельгия, Швейцария, Нидерланды, Польша, Чехия, Литва, Великобритания, США, Канада, Австралия, Ирландия, Новая Зеландия. Выберите страну, чтобы увидеть расчёт по актуальным ставкам 2024–2025 годов.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'В чём разница между брутто и нетто?',
        a: 'Зарплата брутто — это ваш доход до всех вычетов. Зарплата нетто — это сумма, которую вы фактически получаете на руки после уплаты налога на доходы, социальных и медицинских взносов.',
      },
      {
        q: 'Какие вычеты учитывает калькулятор?',
        a: 'Калькулятор учитывает налог на доходы физических лиц (по прогрессивным ставкам страны) и обязательные взносы работника: пенсионные, медицинские, по безработице. Взносы работодателя в расчёт не включены.',
      },
      {
        q: 'Почему нетто так сильно отличается по странам?',
        a: 'В каждой стране своя структура налогообложения: прогрессивные или плоские ставки, необлагаемые минимумы, налоговые кредиты. Плюс различаются ставки социального страхования. Например, в Литве сотрудник платит 19,5% ЕСН, тогда как на Украине — 23% (18% НДФЛ + 5% военный сбор).',
      },
      {
        q: 'Насколько точен расчёт?',
        a: 'Расчёт является приблизительным для работника без специальных вычетов. Региональные налоги (например, налог штата в США, церковный налог в Германии), льготы на детей и иждивенцев в расчёт не включены.',
      },
    ],
  },
  uk: {
    description: 'Калькулятор зарплати брутто-нетто точно показує, скільки ви отримаєте на руки після всіх обов\'язкових вирахувань — податку на доходи, внесків до соціальних фондів і медичного страхування. Підтримує 24 країни: Україна, Росія, Білорусь, Казахстан, Азербайджан, Грузія, Вірменія, Молдова, Узбекистан, Киргизстан, Німеччина, Франція, Бельгія, Швейцарія, Нідерланди, Польща, Чехія, Литва, Велика Британія, США, Канада, Австралія, Ірландія, Нова Зеландія. Оберіть країну, щоб побачити розрахунок за актуальними ставками 2024–2025 років.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'У чому різниця між брутто і нетто?',
        a: 'Зарплата брутто — це ваш дохід до всіх вирахувань. Зарплата нетто — це сума, яку ви фактично отримуєте на руки після сплати ПДФО, соціальних та медичних внесків.',
      },
      {
        q: 'Які вирахування враховує калькулятор?',
        a: 'Калькулятор враховує ПДФО (за прогресивними ставками країни) та обов\'язкові внески працівника: пенсійні, медичні, на безробіття. Внески роботодавця не включені.',
      },
      {
        q: 'Чому нетто так сильно відрізняється по країнах?',
        a: 'У кожній країні своя структура оподаткування: прогресивні або фіксовані ставки, неоподатковуваний мінімум, податкові кредити. Плюс різні ставки соціального страхування. Наприклад, в Україні загальна ставка вирахувань — 23% (18% ПДФО + 5% військовий збір).',
      },
      {
        q: 'Наскільки точний розрахунок?',
        a: 'Розрахунок є наближеним для найманого працівника без спеціальних вирахувань. Регіональні податки, пільги на дітей та утриманців не враховані.',
      },
    ],
  },
  fr: {
    description: 'Notre calculateur salaire brut-net vous indique exactement ce que vous percevez après toutes les retenues obligatoires — impôt sur le revenu, cotisations sociales et assurance maladie. Compatible avec 24 pays : Ukraine, Russie, Biélorussie, Kazakhstan, Azerbaïdjan, Géorgie, Arménie, Moldavie, Ouzbékistan, Kirghizistan, Allemagne, France, Belgique, Suisse, Pays-Bas, Pologne, Tchéquie, Lituanie, Royaume-Uni, États-Unis, Canada, Australie, Irlande, Nouvelle-Zélande. Sélectionnez votre pays pour obtenir un détail précis basé sur les barèmes 2024–2025.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Quelle est la différence entre salaire brut et salaire net ?',
        a: 'Le salaire brut est votre rémunération totale avant toute retenue. Le salaire net — parfois appelé salaire "à emporter" — est ce que vous percevez réellement après la déduction de l\'impôt sur le revenu, des cotisations sociales et des autres prélèvements obligatoires.',
      },
      {
        q: 'Quelles retenues sont calculées ?',
        a: 'Le calculateur inclut l\'impôt sur le revenu (avec les barèmes progressifs du pays) et les cotisations sociales salariales : retraite, santé, chômage. Les cotisations patronales ne sont pas incluses.',
      },
      {
        q: 'Pourquoi le salaire net varie-t-il autant selon les pays ?',
        a: 'Chaque pays a sa propre structure fiscale (taux progressifs ou proportionnels, abattements, crédits d\'impôt) et ses propres taux de cotisations sociales. Par exemple, en Lituanie le taux social salarié est de 19,5 %, tandis qu\'en Ukraine il est de 23 % (18 % d\'impôt + 5 % de prélèvement militaire).',
      },
      {
        q: 'Le calcul est-il exact ?',
        a: 'Le résultat est une approximation pour un salarié célibataire sans déductions particulières. Les taxes locales ou régionales (ex. impôt d\'État aux États-Unis, taxe d\'église en Allemagne) et les crédits pour enfants ne sont pas inclus.',
      },
    ],
  },
  lt: {
    description: 'Mūsų bruto į neto atlyginimo skaičiuotuvas tiksliai parodo, kiek gausite po visų privalomų išskaitymų — pajamų mokesčio, socialinio draudimo ir sveikatos draudimo įmokų. Palaikomos 24 šalys: Ukraina, Rusija, Baltarusija, Kazachstanas, Azerbaidžanas, Gruzija, Armėnija, Moldova, Uzbekistanas, Kirgizija, Vokietija, Prancūzija, Belgija, Šveicarija, Nyderlandai, Lenkija, Čekija, Lietuva, JK, JAV, Kanada, Australija, Airija, Naujoji Zelandija. Pasirinkite šalį ir gaukite detalų skaičiavimą pagal 2024–2025 m. mokesčių tarifus.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Koks skirtumas tarp bruto ir neto atlyginimo?',
        a: 'Bruto atlyginimas — tai jūsų bendros pajamos prieš bet kokius atskaitymus. Neto atlyginimas — tai suma, kurią faktiškai gausite į rankas po pajamų mokesčio, socialinio draudimo ir kitų privalomų išskaitymų.',
      },
      {
        q: 'Kokie išskaitymai skaičiuojami?',
        a: 'Skaičiuotuvas apima pajamų mokestį (pagal šalies progresinius tarifus) ir privalomus darbuotojo socialinio draudimo įnašus: pensijų, sveikatos, nedarbo draudimą. Darbdavio mokamos įmokos neįtrauktos.',
      },
      {
        q: 'Kodėl neto atlyginimas taip skiriasi priklausomai nuo šalies?',
        a: 'Kiekviena šalis turi savo mokesčių struktūrą: progresinius arba fiksuotus tarifus, neapmokestinamąsias išmokas (NPD), mokesčių kreditus. Taip pat skiriasi socialinio draudimo tarifai. Pvz., Lietuvoje darbuotojas moka 19,5 % socialinio draudimo, o Ukrainoje — 23 % (18 % PDFO + 5 % karinis mokestis).',
      },
      {
        q: 'Ar skaičiavimas yra tikslus?',
        a: 'Rezultatas yra apytiksliai tikslus vienišam darbuotojui be specialių atskaitymų. Regioniniai mokesčiai, išmokos vaikams ir išlaikytiniams neįtraukti.',
      },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/income-tax', label: 'Income Tax Calculator' },
    { href: '/calculator/freelance-rate', label: 'Freelance Rate Calculator' },
    { href: '/calculator/percentage', label: 'Percentage Calculator' },
  ],
  ru: [
    { href: '/calculator/income-tax', label: 'Калькулятор подоходного налога' },
    { href: '/calculator/freelance-rate', label: 'Калькулятор ставки фрилансера' },
    { href: '/calculator/percentage', label: 'Калькулятор процентов' },
  ],
  uk: [
    { href: '/calculator/income-tax', label: 'Калькулятор прибуткового податку' },
    { href: '/calculator/freelance-rate', label: 'Калькулятор ставки фрилансера' },
    { href: '/calculator/percentage', label: 'Калькулятор відсотків' },
  ],
  fr: [
    { href: '/calculator/income-tax', label: 'Calculatrice impôt sur le revenu' },
    { href: '/calculator/freelance-rate', label: 'Calculatrice taux freelance' },
    { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' },
  ],
  lt: [
    { href: '/calculator/income-tax', label: 'Pajamų mokesčio skaičiuotuvas' },
    { href: '/calculator/freelance-rate', label: 'Laisvai samdomų tarifų skaičiuotuvas' },
    { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/salary'),
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function SalaryPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/salary`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <SalaryCalculator locale={locale} />

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

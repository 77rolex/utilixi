import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import OvulationCalculator from './OvulationCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/pregnancy', label: 'Pregnancy Calculator' },
    { href: '/calculator/bmi', label: 'BMI Calculator' },
    { href: '/calculator/ideal-weight', label: 'Ideal Weight Calculator' },
  ],
  ru: [
    { href: '/calculator/pregnancy', label: 'Калькулятор беременности' },
    { href: '/calculator/bmi', label: 'Калькулятор ИМТ' },
    { href: '/calculator/ideal-weight', label: 'Калькулятор идеального веса' },
  ],
  uk: [
    { href: '/calculator/pregnancy', label: 'Калькулятор вагітності' },
    { href: '/calculator/bmi', label: 'Калькулятор ІМТ' },
    { href: '/calculator/ideal-weight', label: 'Калькулятор ідеальної ваги' },
  ],
  fr: [
    { href: '/calculator/pregnancy', label: 'Calculatrice de grossesse' },
    { href: '/calculator/bmi', label: 'Calculatrice IMC' },
    { href: '/calculator/ideal-weight', label: 'Poids Idéal' },
  ],
  lt: [
    { href: '/calculator/pregnancy', label: 'Nėštumo skaičiuotuvas' },
    { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' },
    { href: '/calculator/ideal-weight', label: 'Idealaus svorio skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Ovulation Calculator — Fertile Window & Due Date',
    description: 'Free ovulation calculator. Enter your last period date and cycle length to find your ovulation date, fertile window, next period, and estimated due date.',
    h1: 'Ovulation Calculator',
  },
  ru: {
    title: 'Калькулятор овуляции — фертильное окно и ПДР',
    description: 'Бесплатный калькулятор овуляции. Введите дату последней менструации и длину цикла, чтобы узнать дату овуляции, фертильное окно и предполагаемую дату родов.',
    h1: 'Калькулятор овуляции',
  },
  uk: {
    title: 'Калькулятор овуляції — фертильне вікно та ПДП',
    description: 'Безкоштовний калькулятор овуляції. Введіть дату останньої менструації та тривалість циклу, щоб дізнатися дату овуляції, фертильне вікно та передбачувану дату пологів.',
    h1: 'Калькулятор овуляції',
  },
  fr: {
    title: 'Calculatrice d\'ovulation — fenêtre fertile et date d\'accouchement',
    description: 'Calculatrice d\'ovulation gratuite. Entrez la date de vos dernières règles et la durée du cycle pour trouver votre date d\'ovulation, fenêtre fertile et date prévue d\'accouchement.',
    h1: 'Calculatrice d\'ovulation',
  },
  lt: {
    title: 'Ovuliacijos skaičiuotuvas — vaisingas langas ir gimdymo data',
    description: 'Nemokamas ovuliacijos skaičiuotuvas. Įveskite paskutinių mėnesinių datą ir ciklo trukmę, kad sužinotumėte ovuliacijos datą, vaisingą langą ir numatomą gimdymo datą.',
    h1: 'Ovuliacijos skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Use our ovulation calculator to plan or avoid pregnancy. Enter the first day of your last menstrual period (LMP) and your average cycle length to calculate your most likely ovulation date, the 6-day fertile window, when your next period is expected, and the estimated due date if conception occurs.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How is the ovulation date calculated?',
        a: 'Ovulation typically occurs 14 days before the next period. The calculator estimates it as: LMP date + (cycle length − 14). For a 28-day cycle, ovulation is around day 14. For a 30-day cycle, it would be around day 16.',
      },
      {
        q: 'What is the fertile window?',
        a: 'The fertile window spans 6 days: the 5 days before ovulation and the day of ovulation itself. Sperm can survive up to 5 days in the fallopian tubes, so intercourse in the days leading up to ovulation can result in pregnancy.',
      },
      {
        q: 'What cycle length should I enter?',
        a: 'Enter your average cycle length in days. A typical cycle is 21–35 days, with 28 days being the average. If your cycles vary, use the average of your last 3–6 cycles. This calculator supports cycle lengths from 21 to 35 days.',
      },
      {
        q: 'Is this calculator accurate?',
        a: 'This calculator provides estimates based on the average cycle. It is most accurate for women with regular cycles. Stress, illness, weight changes, or hormonal fluctuations can shift ovulation. For confirmed ovulation tracking, use ovulation predictor kits (OPKs) or basal body temperature (BBT) charting.',
      },
    ],
  },
  ru: {
    description: 'Используйте калькулятор овуляции для планирования или предотвращения беременности. Введите первый день последней менструации и длину цикла, чтобы рассчитать дату овуляции, фертильное окно, дату следующей менструации и предполагаемую дату родов.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Как рассчитывается дата овуляции?',
        a: 'Овуляция обычно происходит за 14 дней до следующей менструации. Калькулятор вычисляет её как: дата ПМ + (длина цикла − 14). При 28-дневном цикле овуляция — около 14-го дня, при 30-дневном — около 16-го.',
      },
      {
        q: 'Что такое фертильное окно?',
        a: 'Фертильное окно охватывает 6 дней: 5 дней до овуляции и сам день овуляции. Сперматозоиды могут выживать до 5 дней в маточных трубах, поэтому половой акт за несколько дней до овуляции может привести к беременности.',
      },
      {
        q: 'Какую длину цикла вводить?',
        a: 'Введите среднюю длину цикла в днях. Обычный цикл — 21–35 дней, средний — 28 дней. Если цикл нерегулярный, используйте среднее значение за последние 3–6 циклов. Калькулятор поддерживает циклы от 21 до 35 дней.',
      },
      {
        q: 'Насколько точен этот калькулятор?',
        a: 'Калькулятор даёт приблизительные результаты на основе среднего цикла. Наиболее точен для женщин с регулярными циклами. Стресс, болезнь, изменение веса или гормональные колебания могут сдвинуть овуляцию. Для точного определения используйте тесты на овуляцию (ОПК) или измерение базальной температуры тела.',
      },
    ],
  },
  uk: {
    description: 'Використовуйте калькулятор овуляції для планування або запобігання вагітності. Введіть перший день останньої менструації та тривалість циклу, щоб розрахувати дату овуляції, фертильне вікно, дату наступної менструації та передбачувану дату пологів.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Як розраховується дата овуляції?',
        a: 'Овуляція зазвичай відбувається за 14 днів до наступної менструації. Калькулятор обчислює її як: дата ОМ + (тривалість циклу − 14). При 28-денному циклі овуляція — близько 14-го дня, при 30-денному — близько 16-го.',
      },
      {
        q: 'Що таке фертильне вікно?',
        a: 'Фертильне вікно охоплює 6 днів: 5 днів до овуляції та сам день овуляції. Сперматозоїди можуть виживати до 5 днів у маткових трубах, тому статевий акт за кілька днів до овуляції може призвести до вагітності.',
      },
      {
        q: 'Яку тривалість циклу вводити?',
        a: 'Введіть середню тривалість циклу в днях. Звичайний цикл — 21–35 днів, середній — 28 днів. Якщо цикл нерегулярний, використовуйте середнє значення за останні 3–6 циклів. Калькулятор підтримує цикли від 21 до 35 днів.',
      },
      {
        q: 'Наскільки точний цей калькулятор?',
        a: 'Калькулятор дає приблизні результати на основі середнього циклу. Найточніший для жінок із регулярними циклами. Стрес, хвороба, зміна ваги або гормональні коливання можуть зсунути овуляцію. Для точного визначення використовуйте тести на овуляцію або вимірювання базальної температури тіла.',
      },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice d\'ovulation pour planifier ou éviter une grossesse. Entrez le premier jour de vos dernières règles et la durée de votre cycle pour calculer votre date d\'ovulation, la fenêtre fertile de 6 jours, la date de vos prochaines règles et la date prévue d\'accouchement.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Comment la date d\'ovulation est-elle calculée ?',
        a: 'L\'ovulation survient généralement 14 jours avant les prochaines règles. La calculatrice l\'estime ainsi : date des dernières règles + (durée du cycle − 14). Pour un cycle de 28 jours, l\'ovulation se produit vers le 14e jour ; pour un cycle de 30 jours, vers le 16e jour.',
      },
      {
        q: 'Qu\'est-ce que la fenêtre fertile ?',
        a: 'La fenêtre fertile couvre 6 jours : les 5 jours précédant l\'ovulation et le jour de l\'ovulation lui-même. Les spermatozoïdes peuvent survivre jusqu\'à 5 jours dans les trompes, donc un rapport sexuel quelques jours avant l\'ovulation peut aboutir à une grossesse.',
      },
      {
        q: 'Quelle durée de cycle entrer ?',
        a: 'Entrez la durée moyenne de votre cycle en jours. Un cycle typique dure 21 à 35 jours, avec 28 jours en moyenne. Si vos cycles varient, utilisez la moyenne de vos 3 à 6 derniers cycles. Cette calculatrice prend en charge les cycles de 21 à 35 jours.',
      },
      {
        q: 'Cette calculatrice est-elle précise ?',
        a: 'Cette calculatrice fournit des estimations basées sur le cycle moyen. Elle est plus précise pour les femmes avec des cycles réguliers. Le stress, la maladie, les variations de poids ou les fluctuations hormonales peuvent décaler l\'ovulation. Pour un suivi précis, utilisez des tests d\'ovulation (OPK) ou la méthode de la température basale.',
      },
    ],
  },
  lt: {
    description: 'Naudokite mūsų ovuliacijos skaičiuotuvą nėštumui planuoti arba išvengti. Įveskite paskutinių mėnesinių pirmą dieną ir ciklo trukmę, kad apskaičiuotumėte ovuliacijos datą, 6 dienų vaisingą langą, kitų mėnesinių datą ir numatomą gimdymo datą.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kaip apskaičiuojama ovuliacijos data?',
        a: 'Ovuliacija paprastai įvyksta likus 14 dienų iki kitų mėnesinių. Skaičiuotuvas ją įvertina taip: paskutinių mėnesinių data + (ciklo trukmė − 14). 28 dienų ciklui ovuliacija yra apie 14 dieną; 30 dienų ciklui — apie 16 dieną.',
      },
      {
        q: 'Kas yra vaisingas langas?',
        a: 'Vaisingas langas apima 6 dienas: 5 dienas prieš ovuliaciją ir pačią ovuliacijos dieną. Spermatozoidai gali išgyventi iki 5 dienų kiaušintakiuose, todėl lytiniai santykiai kelias dienas prieš ovuliaciją gali sukelti nėštumą.',
      },
      {
        q: 'Kokią ciklo trukmę įvesti?',
        a: 'Įveskite vidutinę ciklo trukmę dienomis. Tipinis ciklas trunka 21–35 dienas, vidutiniškai 28 dienas. Jei ciklai skiriasi, naudokite paskutinių 3–6 ciklų vidurkį. Šis skaičiuotuvas palaiko 21–35 dienų ciklus.',
      },
      {
        q: 'Ar šis skaičiuotuvas tikslus?',
        a: 'Skaičiuotuvas pateikia įverčius pagal vidutinį ciklą. Tiksliausias moterims su reguliariais ciklais. Stresas, liga, svorio pokyčiai ar hormoniniai svyravimai gali pastumti ovuliaciją. Tiksliam sekimui naudokite ovuliacijos testus (OPK) arba bazinės kūno temperatūros metodą.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/ovulation'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OvulationPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/ovulation`,
    applicationCategory: 'HealthApplication',
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
        <OvulationCalculator locale={locale} />

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

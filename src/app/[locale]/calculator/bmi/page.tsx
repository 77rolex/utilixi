import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import BmiCalculator from './BmiCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/ideal-weight', label: 'Ideal Weight Calculator' },
    { href: '/calculator/calories', label: 'Calorie Calculator (TDEE)' },
  ],
  ru: [
    { href: '/calculator/ideal-weight', label: 'Калькулятор идеального веса' },
    { href: '/calculator/calories', label: 'Калькулятор калорий (TDEE)' },
  ],
  uk: [
    { href: '/calculator/ideal-weight', label: 'Калькулятор ідеальної ваги' },
    { href: '/calculator/calories', label: 'Калькулятор калорій (TDEE)' },
  ],
  fr: [
    { href: '/calculator/ideal-weight', label: 'Poids Idéal' },
    { href: '/calculator/calories', label: 'Calculatrice de calories (TDEE)' },
  ],
  lt: [
    { href: '/calculator/ideal-weight', label: 'Idealaus svorio skaičiuotuvas' },
    { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas (TDEE)' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'BMI Calculator — Body Mass Index Online',
    description: 'Free BMI calculator. Calculate your Body Mass Index instantly using metric (cm/kg) or imperial (ft/lbs) units and find out your weight category.',
    h1: 'BMI Calculator',
  },
  ru: {
    title: 'Калькулятор ИМТ — индекс массы тела онлайн',
    description: 'Бесплатный калькулятор ИМТ онлайн. Рассчитайте индекс массы тела в метрической или имперской системе и узнайте свою весовую категорию.',
    h1: 'Калькулятор ИМТ',
  },
  uk: {
    title: 'Калькулятор ІМТ — індекс маси тіла онлайн',
    description: 'Безкоштовний калькулятор ІМТ онлайн. Розрахуйте індекс маси тіла в метричній або імперській системі та дізнайтеся свою вагову категорію.',
    h1: 'Калькулятор ІМТ',
  },
  fr: {
    title: 'Calculatrice IMC — Indice de Masse Corporelle',
    description: 'Calculatrice IMC gratuite. Calculez votre indice de masse corporelle en unités métriques ou impériales et découvrez votre catégorie de poids.',
    h1: 'Calculatrice IMC',
  },
  lt: {
    title: 'KMI Skaičiuotuvas — Kūno Masės Indeksas',
    description: 'Nemokamas KMI skaičiuotuvas. Apskaičiuokite kūno masės indeksą metrinėje arba imperinėje sistemoje ir sužinokite savo svorio kategoriją.',
    h1: 'KMI Skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Use our free BMI calculator to find out your Body Mass Index. Simply enter your height and weight in metric (cm/kg) or imperial (ft/lbs) units. BMI is a widely used screening tool to identify whether a person is underweight, normal weight, overweight, or obese.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'What is BMI?',
        a: 'BMI (Body Mass Index) is a value derived from a person\'s weight and height. It is calculated as weight (kg) divided by height squared (m²). BMI is used as a screening tool to categorise weight status.',
      },
      {
        q: 'What are the BMI categories?',
        a: 'The standard BMI categories are: Underweight (BMI below 18.5), Normal weight (18.5–24.9), Overweight (25–29.9), and Obese (30 and above).',
      },
      {
        q: 'Is BMI an accurate measure of health?',
        a: 'BMI is a useful screening tool but not a direct measure of body fat or health. It does not account for muscle mass, bone density, age, or fat distribution. Athletes, for example, may have a high BMI due to muscle rather than fat.',
      },
      {
        q: 'What is the difference between metric and imperial BMI?',
        a: 'The metric formula is BMI = weight (kg) ÷ height² (m²). The imperial formula is BMI = 703 × weight (lbs) ÷ height² (inches²). Both give the same result.',
      },
    ],
  },
  ru: {
    description: 'Воспользуйтесь бесплатным калькулятором ИМТ, чтобы узнать свой индекс массы тела. Введите рост и вес в метрической (см/кг) или имперской (фут/фунт) системе. ИМТ — это широко используемый показатель для оценки весовой категории.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Что такое ИМТ?',
        a: 'ИМТ (индекс массы тела) — это показатель, рассчитываемый как вес (кг), разделённый на квадрат роста (м²). Используется для оценки весовой категории человека.',
      },
      {
        q: 'Какие категории ИМТ существуют?',
        a: 'Стандартные категории: Недостаточный вес (ИМТ менее 18,5), Нормальный вес (18,5–24,9), Избыточный вес (25–29,9), Ожирение (30 и выше).',
      },
      {
        q: 'Является ли ИМТ точным показателем здоровья?',
        a: 'ИМТ — полезный инструмент скрининга, но не прямой показатель жира в организме. Он не учитывает мышечную массу, плотность костей, возраст и распределение жира. Например, у спортсменов ИМТ может быть высоким из-за мышц.',
      },
      {
        q: 'В чём разница между метрической и имперской системой?',
        a: 'Метрическая формула: ИМТ = вес (кг) ÷ рост² (м²). Имперская: ИМТ = 703 × вес (фунты) ÷ рост² (дюймы²). Результат одинаков.',
      },
    ],
  },
  uk: {
    description: 'Скористайтеся безкоштовним калькулятором ІМТ, щоб дізнатися свій індекс маси тіла. Введіть зріст і вагу в метричній (см/кг) або імперській (фут/фунт) системі.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Що таке ІМТ?',
        a: 'ІМТ (індекс маси тіла) — показник, що розраховується як вага (кг), поділена на квадрат зросту (м²). Використовується для оцінки вагової категорії.',
      },
      {
        q: 'Які категорії ІМТ існують?',
        a: 'Стандартні категорії: Недостатня вага (ІМТ менше 18,5), Нормальна вага (18,5–24,9), Надмірна вага (25–29,9), Ожиріння (30 і вище).',
      },
      {
        q: 'Чи є ІМТ точним показником здоров\'я?',
        a: 'ІМТ — корисний інструмент скринінгу, але не прямий показник жирової маси. Він не враховує м\'язову масу, щільність кісток та розподіл жиру.',
      },
      {
        q: 'У чому різниця між метричною та імперською системами?',
        a: 'Метрична формула: ІМТ = вага (кг) ÷ зріст² (м²). Імперська: ІМТ = 703 × вага (фунти) ÷ зріст² (дюйми²).',
      },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice IMC gratuite pour connaître votre Indice de Masse Corporelle. Entrez votre taille et votre poids en unités métriques (cm/kg) ou impériales (pi/lbs). L\'IMC est un outil de dépistage largement utilisé pour évaluer la catégorie de poids.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Qu\'est-ce que l\'IMC ?',
        a: 'L\'IMC (Indice de Masse Corporelle) est une valeur calculée à partir du poids et de la taille d\'une personne : poids (kg) divisé par la taille au carré (m²). Il sert à catégoriser le statut pondéral.',
      },
      {
        q: 'Quelles sont les catégories d\'IMC ?',
        a: 'Les catégories standard sont : Insuffisance pondérale (IMC inférieur à 18,5), Poids normal (18,5–24,9), Surpoids (25–29,9) et Obésité (30 et plus).',
      },
      {
        q: 'L\'IMC est-il une mesure précise de la santé ?',
        a: 'L\'IMC est un outil de dépistage utile, mais pas une mesure directe de la graisse corporelle. Il ne tient pas compte de la masse musculaire, de la densité osseuse, de l\'âge ou de la répartition des graisses.',
      },
      {
        q: 'Quelle est la différence entre les systèmes métrique et impérial ?',
        a: 'Formule métrique : IMC = poids (kg) ÷ taille² (m²). Formule impériale : IMC = 703 × poids (lbs) ÷ taille² (pouces²). Les deux donnent le même résultat.',
      },
    ],
  },
  lt: {
    description: 'Naudokite nemokamą KMI skaičiuotuvą, kad sužinotumėte savo kūno masės indeksą. Įveskite ūgį ir svorį metrinėje (cm/kg) arba imperinėje (pėd./svar.) sistemoje.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kas yra KMI?',
        a: 'KMI (kūno masės indeksas) — tai vertė, apskaičiuojama kaip svoris (kg) padalytas iš ūgio kvadrato (m²). Naudojamas svorio kategorijos nustatymui.',
      },
      {
        q: 'Kokios yra KMI kategorijos?',
        a: 'Standartinės kategorijos: Nepakankamas svoris (KMI mažiau nei 18,5), Normalus svoris (18,5–24,9), Antsvoris (25–29,9), Nutukimas (30 ir daugiau).',
      },
      {
        q: 'Ar KMI yra tikslus sveikatos rodiklis?',
        a: 'KMI yra naudingas patikros įrankis, bet ne tiesioginis kūno riebalų matas. Jis neatsižvelgia į raumenų masę, kaulų tankį, amžių ar riebalų pasiskirstymą.',
      },
      {
        q: 'Koks skirtumas tarp metrinės ir imperinės sistemų?',
        a: 'Metrinė formulė: KMI = svoris (kg) ÷ ūgis² (m²). Imperinė: KMI = 703 × svoris (svarai) ÷ ūgis² (coliai²).',
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
    alternates: buildAlternates(locale, '/calculator/bmi'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BmiPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/bmi`,
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
        <BmiCalculator locale={locale} />

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

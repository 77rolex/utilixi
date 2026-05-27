import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import BodyFatCalculator from './BodyFatCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/bmi', label: 'BMI Calculator' },
    { href: '/calculator/ideal-weight', label: 'Ideal Weight Calculator' },
    { href: '/calculator/calories', label: 'Calorie Calculator (TDEE)' },
    { href: '/calculator/water-intake', label: 'Water Intake Calculator' },
  ],
  ru: [
    { href: '/calculator/bmi', label: 'Калькулятор ИМТ' },
    { href: '/calculator/ideal-weight', label: 'Калькулятор идеального веса' },
    { href: '/calculator/calories', label: 'Калькулятор калорий (TDEE)' },
    { href: '/calculator/water-intake', label: 'Норма воды в день' },
  ],
  uk: [
    { href: '/calculator/bmi', label: 'Калькулятор ІМТ' },
    { href: '/calculator/ideal-weight', label: 'Калькулятор ідеальної ваги' },
    { href: '/calculator/calories', label: 'Калькулятор калорій (TDEE)' },
    { href: '/calculator/water-intake', label: 'Норма води на день' },
  ],
  fr: [
    { href: '/calculator/bmi', label: 'Calculatrice IMC' },
    { href: '/calculator/ideal-weight', label: 'Poids Idéal' },
    { href: '/calculator/calories', label: 'Calculatrice de calories (TDEE)' },
    { href: '/calculator/water-intake', label: 'Apport en eau quotidien' },
  ],
  lt: [
    { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' },
    { href: '/calculator/ideal-weight', label: 'Idealaus svorio skaičiuotuvas' },
    { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas (TDEE)' },
    { href: '/calculator/water-intake', label: 'Vandens normos skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Body Fat Calculator — US Navy Method Online',
    description: 'Free body fat percentage calculator using the US Navy method. Enter your measurements to find your body fat % and fitness category for men and women.',
    h1: 'Body Fat Calculator',
  },
  ru: {
    title: 'Калькулятор жира в теле — метод ВМФ США онлайн',
    description: 'Бесплатный калькулятор процента жира в теле по методу ВМФ США. Введите замеры и узнайте % жира и категорию физической формы для мужчин и женщин.',
    h1: 'Калькулятор % жира в теле',
  },
  uk: {
    title: 'Калькулятор жиру в тілі — метод ВМС США онлайн',
    description: 'Безкоштовний калькулятор відсотка жиру в тілі за методом ВМС США. Введіть виміри та дізнайтеся % жиру та категорію фізичної форми.',
    h1: 'Калькулятор % жиру в тілі',
  },
  fr: {
    title: 'Calculatrice de graisse corporelle — méthode US Navy',
    description: 'Calculatrice gratuite du pourcentage de graisse corporelle selon la méthode US Navy. Entrez vos mensurations pour connaître votre % de graisse.',
    h1: 'Calculatrice de graisse corporelle',
  },
  lt: {
    title: 'Kūno riebalų skaičiuotuvas — JAV karinio jūrų laivyno metodas',
    description: 'Nemokamas kūno riebalų procentų skaičiuotuvas pagal JAV karinio jūrų laivyno metodą. Įveskite matmenis ir sužinokite riebalų % ir fizinę kategoriją.',
    h1: 'Kūno riebalų skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our body fat calculator uses the US Navy circumference method — one of the most accurate non-equipment-based formulas. Simply enter your neck, waist (and hip for women), and height measurements to get your body fat percentage and see which fitness category you fall into.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How is body fat percentage calculated?',
        a: 'This calculator uses the US Navy method. For men: 495 ÷ (1.0324 − 0.19077 × log10(waist − neck) + 0.15456 × log10(height)) − 450. For women, hip measurement is also included. All measurements are in centimetres.',
      },
      {
        q: 'What is a healthy body fat percentage?',
        a: 'For men, 14–20% is considered fitness level and 21–24% acceptable. For women, 21–28% is fitness level and 29–35% acceptable. Essential fat (minimum needed for survival) is around 3–5% for men and 10–13% for women.',
      },
      {
        q: 'Where should I measure waist circumference?',
        a: 'Measure your waist at the narrowest point, usually around the navel level. For the most accurate result, take the measurement in the morning before eating, standing upright with relaxed muscles.',
      },
      {
        q: 'Is the US Navy method accurate?',
        a: 'The US Navy method is accurate to within 3–4% compared to DEXA scans, making it one of the best field methods. It is less accurate for very muscular or very obese individuals. For clinical precision, DEXA or hydrostatic weighing is recommended.',
      },
    ],
  },
  ru: {
    description: 'Калькулятор использует метод Военно-морского флота США — один из наиболее точных методов определения % жира без специального оборудования. Введите замеры шеи, талии (и бёдер для женщин) и роста, чтобы получить результат.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Как рассчитывается % жира в теле?',
        a: 'Используется метод ВМФ США. Для мужчин: 495 ÷ (1,0324 − 0,19077 × log10(талия − шея) + 0,15456 × log10(рост)) − 450. Для женщин дополнительно учитывается замер бёдер. Все замеры в сантиметрах.',
      },
      {
        q: 'Какой % жира считается нормальным?',
        a: 'Для мужчин 14–20% — уровень фитнеса, 21–24% — допустимый. Для женщин 21–28% — фитнес, 29–35% — допустимый. Незаменимый жир (минимум для выживания) — около 3–5% у мужчин и 10–13% у женщин.',
      },
      {
        q: 'Где измерять обхват талии?',
        a: 'Измеряйте талию в самом узком месте, обычно на уровне пупка. Для точности измеряйте утром натощак, стоя прямо с расслабленными мышцами.',
      },
      {
        q: 'Насколько точен метод ВМФ США?',
        a: 'Метод ВМФ США обеспечивает точность в пределах 3–4% по сравнению со сканированием DEXA. Менее точен для очень мускулистых или тучных людей. Для клинической точности рекомендуется DEXA или гидростатическое взвешивание.',
      },
    ],
  },
  uk: {
    description: 'Калькулятор використовує метод ВМС США — один із найточніших методів визначення % жиру без спеціального обладнання. Введіть виміри шиї, талії (та стегон для жінок) і зросту, щоб отримати результат.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Як розраховується % жиру в тілі?',
        a: 'Використовується метод ВМС США. Для чоловіків: 495 ÷ (1,0324 − 0,19077 × log10(талія − шия) + 0,15456 × log10(зріст)) − 450. Для жінок додатково враховується вимір стегон. Всі виміри в сантиметрах.',
      },
      {
        q: 'Який % жиру вважається нормальним?',
        a: 'Для чоловіків 14–20% — рівень фітнесу, 21–24% — допустимий. Для жінок 21–28% — фітнес, 29–35% — допустимий. Незамінний жир — близько 3–5% у чоловіків і 10–13% у жінок.',
      },
      {
        q: 'Де вимірювати обхват талії?',
        a: 'Вимірюйте талію у найвужчому місці, зазвичай на рівні пупка. Для точності вимірюйте вранці натщесерце, стоячи прямо з розслабленими м\'язами.',
      },
      {
        q: 'Наскільки точний метод ВМС США?',
        a: 'Метод ВМС США забезпечує точність у межах 3–4% порівняно зі скануванням DEXA. Менш точний для дуже м\'язистих або огрядних людей. Для клінічної точності рекомендується DEXA або гідростатичне зважування.',
      },
    ],
  },
  fr: {
    description: 'Notre calculatrice utilise la méthode US Navy — l\'une des formules les plus précises sans équipement. Entrez vos mesures du cou, de la taille (et des hanches pour les femmes) et votre taille pour obtenir votre pourcentage de graisse corporelle.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Comment le pourcentage de graisse est-il calculé ?',
        a: 'Cette calculatrice utilise la méthode US Navy. Pour les hommes : 495 ÷ (1,0324 − 0,19077 × log10(taille − cou) + 0,15456 × log10(hauteur)) − 450. Pour les femmes, la mesure des hanches est également incluse. Toutes les mesures sont en centimètres.',
      },
      {
        q: 'Quel est un pourcentage de graisse corporelle sain ?',
        a: 'Pour les hommes, 14–20% correspond au niveau fitness et 21–24% est acceptable. Pour les femmes, 21–28% est fitness et 29–35% acceptable. La graisse essentielle est d\'environ 3–5% pour les hommes et 10–13% pour les femmes.',
      },
      {
        q: 'Où mesurer le tour de taille ?',
        a: 'Mesurez votre taille au point le plus étroit, généralement au niveau du nombril. Pour plus de précision, prenez la mesure le matin à jeun, debout avec les muscles détendus.',
      },
      {
        q: 'La méthode US Navy est-elle précise ?',
        a: 'La méthode US Navy est précise à 3–4% par rapport aux scanners DEXA. Elle est moins précise pour les personnes très musclées ou très obèses. Pour une précision clinique, le DEXA ou la pesée hydrostatique est recommandé.',
      },
    ],
  },
  lt: {
    description: 'Mūsų skaičiuotuvas naudoja JAV karinio jūrų laivyno metodą — vieną tiksliausių be įrangos pagrįstų formulių. Įveskite kaklo, juosmens (ir klubų moterims) bei ūgio matmenis, kad gautumėte kūno riebalų procentą.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kaip apskaičiuojamas kūno riebalų procentas?',
        a: 'Skaičiuotuvas naudoja JAV karinio jūrų laivyno metodą. Vyrams: 495 ÷ (1,0324 − 0,19077 × log10(juosmuo − kaklas) + 0,15456 × log10(ūgis)) − 450. Moterims taip pat įtraukiamas klubų matmuo. Visi matmenys centimetrais.',
      },
      {
        q: 'Koks kūno riebalų procentas yra sveikas?',
        a: 'Vyrams 14–20% laikoma fitneso lygiu, 21–24% priimtinu. Moterims 21–28% yra fitnesas, 29–35% priimtina. Būtinasis riebalas (minimalus išgyvenimui) yra apie 3–5% vyrams ir 10–13% moterims.',
      },
      {
        q: 'Kur matuoti juosmens apimtį?',
        a: 'Matuokite juosmenį siauriausioje vietoje, paprastai bambos lygyje. Tikslesniam rezultatui matuokite ryte prieš valgant, stovint tiesiai su atpalaiduotais raumenimis.',
      },
      {
        q: 'Ar JAV karinio jūrų laivyno metodas tikslus?',
        a: 'JAV karinio jūrų laivyno metodas tikslus iki 3–4% palyginti su DEXA skenavimais. Mažiau tikslus labai raumeningiems ar labai nutukusiems asmenims. Klinikiniam tikslumui rekomenduojamas DEXA arba hidrostatinis svėrimas.',
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
    alternates: buildAlternates(locale, '/calculator/body-fat'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BodyFatPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/body-fat`,
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
        <BodyFatCalculator locale={locale} />

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

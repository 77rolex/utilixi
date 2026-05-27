import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import WaterIntakeCalculator from './WaterIntakeCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/bmi', label: 'BMI Calculator' },
    { href: '/calculator/calories', label: 'Calorie Calculator (TDEE)' },
    { href: '/calculator/body-fat', label: 'Body Fat Calculator' },
  ],
  ru: [
    { href: '/calculator/bmi', label: 'Калькулятор ИМТ' },
    { href: '/calculator/calories', label: 'Калькулятор калорий (TDEE)' },
    { href: '/calculator/body-fat', label: 'Калькулятор % жира в теле' },
  ],
  uk: [
    { href: '/calculator/bmi', label: 'Калькулятор ІМТ' },
    { href: '/calculator/calories', label: 'Калькулятор калорій (TDEE)' },
    { href: '/calculator/body-fat', label: 'Калькулятор % жиру в тілі' },
  ],
  fr: [
    { href: '/calculator/bmi', label: 'Calculatrice IMC' },
    { href: '/calculator/calories', label: 'Calculatrice de calories (TDEE)' },
    { href: '/calculator/body-fat', label: 'Calculatrice de graisse corporelle' },
  ],
  lt: [
    { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' },
    { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas (TDEE)' },
    { href: '/calculator/body-fat', label: 'Kūno riebalų skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Water Intake Calculator — Daily Hydration Guide',
    description: 'Free daily water intake calculator. Find out how many liters and glasses of water you should drink per day based on your weight, activity level, and climate.',
    h1: 'Water Intake Calculator',
  },
  ru: {
    title: 'Калькулятор нормы воды в день — суточная гидратация',
    description: 'Бесплатный калькулятор нормы воды в день. Узнайте, сколько литров и стаканов воды нужно пить в сутки с учётом веса, активности и климата.',
    h1: 'Норма воды в день',
  },
  uk: {
    title: 'Калькулятор норми води на день — щоденна гідратація',
    description: 'Безкоштовний калькулятор норми води на день. Дізнайтеся, скільки літрів і склянок води потрібно пити на добу з урахуванням ваги, активності та клімату.',
    h1: 'Норма води на день',
  },
  fr: {
    title: 'Calculatrice d\'apport en eau — hydratation quotidienne',
    description: 'Calculatrice gratuite de l\'apport quotidien en eau. Découvrez combien de litres et de verres d\'eau vous devez boire par jour selon votre poids, activité et climat.',
    h1: 'Calculatrice d\'apport en eau',
  },
  lt: {
    title: 'Vandens normos skaičiuotuvas — dienos hidratacija',
    description: 'Nemokamas dienos vandens normos skaičiuotuvas. Sužinokite, kiek litrų ir stiklinių vandens reikia gerti per dieną pagal svorį, aktyvumą ir klimatą.',
    h1: 'Vandens normos skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Staying hydrated is essential for health, energy, and performance. Our water intake calculator uses your body weight as the base (35 ml per kg), then adjusts for your activity level and whether you live in a hot climate. The result shows your daily target in liters, 250 ml glasses, and 8 oz cups.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How much water should I drink per day?',
        a: 'A common guideline is 35 ml per kilogram of body weight for a sedentary person in a temperate climate. Active people and those in hot weather need significantly more. For a 70 kg person with moderate activity, this is typically around 2.5–3 liters per day.',
      },
      {
        q: 'Does coffee and tea count toward daily water intake?',
        a: 'Yes — all beverages including coffee, tea, juices, and even food moisture count toward your daily fluid intake. However, alcohol has a diuretic effect and should not be counted.',
      },
      {
        q: 'What are signs of dehydration?',
        a: 'Common signs include dark yellow urine, dry mouth, fatigue, dizziness, and headaches. Mild dehydration (1–2% of body weight) can already impair physical and cognitive performance.',
      },
      {
        q: 'Should I drink more when exercising?',
        a: 'Yes. During intense exercise you can lose 0.5–2 liters of fluid per hour through sweat. Drink 400–600 ml before exercise and replace fluids regularly during and after your workout. The activity level selector in this calculator already accounts for this.',
      },
    ],
  },
  ru: {
    description: 'Правильная гидратация необходима для здоровья, энергии и работоспособности. Калькулятор использует вес тела как базу (35 мл на кг), затем корректирует норму с учётом уровня активности и климата. Результат отображается в литрах, стаканах по 250 мл и чашках.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Сколько воды нужно пить в день?',
        a: 'Общая рекомендация — 35 мл на кг веса тела для малоподвижного человека в умеренном климате. Активным людям и тем, кто живёт в жарком климате, нужно значительно больше. Для человека весом 70 кг с умеренной активностью это обычно около 2,5–3 литров в день.',
      },
      {
        q: 'Учитываются ли кофе и чай в суточной норме?',
        a: 'Да — все напитки, включая кофе, чай, соки и даже жидкость из еды, засчитываются в суточное потребление жидкости. Однако алкоголь имеет мочегонный эффект и не должен учитываться.',
      },
      {
        q: 'Каковы признаки обезвоживания?',
        a: 'Тёмно-жёлтая моча, сухость во рту, усталость, головокружение и головная боль. Даже лёгкое обезвоживание (1–2% массы тела) может снизить физическую и умственную работоспособность.',
      },
      {
        q: 'Нужно ли пить больше воды во время тренировок?',
        a: 'Да. При интенсивных тренировках можно терять 0,5–2 литра жидкости в час с потом. Выпивайте 400–600 мл перед тренировкой и восполняйте жидкость во время и после. Уровень активности в калькуляторе уже учитывает это.',
      },
    ],
  },
  uk: {
    description: 'Правильна гідратація необхідна для здоров\'я, енергії та працездатності. Калькулятор використовує вагу тіла як базу (35 мл на кг), потім коригує норму з урахуванням рівня активності та клімату. Результат відображається в літрах, склянках по 250 мл та чашках.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Скільки води потрібно пити на день?',
        a: 'Загальна рекомендація — 35 мл на кг ваги тіла для малорухливої людини в помірному кліматі. Активним людям і тим, хто живе в жаркому кліматі, потрібно значно більше. Для людини вагою 70 кг із помірною активністю це зазвичай близько 2,5–3 літрів на день.',
      },
      {
        q: 'Чи враховуються кава та чай у добовій нормі?',
        a: 'Так — всі напої, включаючи каву, чай, соки та навіть рідину з їжі, зараховуються у добове споживання рідини. Однак алкоголь має сечогінний ефект і не повинен враховуватися.',
      },
      {
        q: 'Які ознаки зневоднення?',
        a: 'Темно-жовта сеча, сухість у роті, втома, запаморочення та головний біль. Навіть легке зневоднення (1–2% маси тіла) може знизити фізичну та розумову працездатність.',
      },
      {
        q: 'Чи потрібно пити більше води під час тренувань?',
        a: 'Так. При інтенсивних тренуваннях можна втрачати 0,5–2 літри рідини на годину з потом. Випивайте 400–600 мл перед тренуванням і поповнюйте рідину під час та після. Рівень активності в калькуляторі вже враховує це.',
      },
    ],
  },
  fr: {
    description: 'Une bonne hydratation est essentielle pour la santé, l\'énergie et les performances. Notre calculatrice utilise votre poids corporel comme base (35 ml par kg), puis ajuste selon votre niveau d\'activité et le climat. Le résultat s\'affiche en litres, verres de 250 ml et tasses.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Combien d\'eau doit-on boire par jour ?',
        a: 'La recommandation générale est de 35 ml par kilogramme de poids corporel pour une personne sédentaire en climat tempéré. Les personnes actives et celles vivant en climat chaud ont besoin de beaucoup plus. Pour une personne de 70 kg avec une activité modérée, cela représente environ 2,5 à 3 litres par jour.',
      },
      {
        q: 'Le café et le thé comptent-ils dans l\'apport quotidien ?',
        a: 'Oui — toutes les boissons, y compris le café, le thé, les jus et même l\'humidité des aliments, sont comptabilisées. Cependant, l\'alcool a un effet diurétique et ne doit pas être inclus.',
      },
      {
        q: 'Quels sont les signes de déshydratation ?',
        a: 'Urine jaune foncé, bouche sèche, fatigue, vertiges et maux de tête. Une légère déshydratation (1–2% du poids corporel) peut déjà altérer les performances physiques et cognitives.',
      },
      {
        q: 'Faut-il boire plus pendant l\'exercice ?',
        a: 'Oui. Lors d\'un exercice intense, vous pouvez perdre 0,5 à 2 litres de liquide par heure par la transpiration. Buvez 400–600 ml avant l\'exercice et remplacez les fluides pendant et après l\'entraînement. Le sélecteur de niveau d\'activité tient déjà compte de cela.',
      },
    ],
  },
  lt: {
    description: 'Tinkama hidratacija yra būtina sveikatai, energijai ir darbingumui. Mūsų skaičiuotuvas naudoja kūno svorį kaip pagrindą (35 ml vienam kg), tada koreguoja pagal aktyvumo lygį ir klimatą. Rezultatas rodomas litrais, 250 ml stiklinėmis ir puodeliais.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kiek vandens reikia gerti per dieną?',
        a: 'Bendras rekomenduojamas kiekis yra 35 ml vienam kilogramui kūno svorio sėsliems žmonėms vidutinio klimato sąlygomis. Aktyviems žmonėms ir gyvenantiems karštame klimate reikia žymiai daugiau. 70 kg sveriantiems žmonėms su vidutinio aktyvumo fizine veikla paprastai reikia apie 2,5–3 litrai per dieną.',
      },
      {
        q: 'Ar kava ir arbata įskaičiuojama į dienos normą?',
        a: 'Taip — visos gėrimų rūšys, įskaitant kavą, arbatą, sultis ir net maisto drėgmę, įskaičiuojamos į dienos skysčių normą. Tačiau alkoholis turi diuretinį poveikį ir neturėtų būti skaičiuojamas.',
      },
      {
        q: 'Kokie dehidratacijos požymiai?',
        a: 'Tamsiai geltonas šlapimas, sausa burna, nuovargis, galvos svaigimas ir galvos skausmas. Net lengva dehidratacija (1–2% kūno svorio) gali pabloginti fizines ir kognityvines funkcijas.',
      },
      {
        q: 'Ar reikia gerti daugiau vandens fizinių pratimų metu?',
        a: 'Taip. Intensyvių pratimų metu galite prarasti 0,5–2 litrus skysčių per valandą per prakaitą. Išgerkite 400–600 ml prieš treniruotę ir reguliariai papildykite skysčius jos metu ir po. Aktyvumo lygio parinkiklis šiame skaičiuotuve jau tai atsižvelgia.',
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
    alternates: buildAlternates(locale, '/calculator/water-intake'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function WaterIntakePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/water-intake`,
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
        <WaterIntakeCalculator locale={locale} />

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

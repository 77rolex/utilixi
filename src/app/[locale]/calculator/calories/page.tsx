import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import CaloriesCalculator from './CaloriesCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/bmi', label: 'BMI Calculator' }, { href: '/calculator/heart-rate', label: 'Heart Rate Zones' }],
  ru: [{ href: '/calculator/bmi', label: 'Калькулятор ИМТ' }, { href: '/calculator/heart-rate', label: 'Пульсовые зоны' }],
  uk: [{ href: '/calculator/bmi', label: 'Калькулятор ІМТ' }, { href: '/calculator/heart-rate', label: 'Пульсові зони' }],
  fr: [{ href: '/calculator/bmi', label: 'Calculatrice IMC' }, { href: '/calculator/heart-rate', label: 'Zones de FC' }],
  lt: [{ href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }, { href: '/calculator/heart-rate', label: 'Pulso zonos' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Calorie Calculator — Daily Calorie Needs (TDEE)',
    description: 'Free TDEE calorie calculator. Calculate your daily calorie needs based on your age, gender, height, weight, and activity level using the Mifflin-St Jeor formula.',
    h1: 'Calorie Calculator',
  },
  ru: {
    title: 'Калькулятор калорий — суточная норма TDEE онлайн',
    description: 'Бесплатный калькулятор калорий онлайн. Рассчитайте суточную норму калорий по формуле Миффлина-Сан Жеора с учётом пола, возраста, роста, веса и активности.',
    h1: 'Калькулятор калорий',
  },
  uk: {
    title: 'Калькулятор калорій — добова норма TDEE онлайн',
    description: 'Безкоштовний калькулятор калорій онлайн. Розрахуйте добову норму калорій за формулою Міффліна-Сан Жеора з урахуванням статі, віку, зросту, ваги та активності.',
    h1: 'Калькулятор калорій',
  },
  fr: {
    title: 'Calculatrice de Calories — Besoins caloriques TDEE',
    description: 'Calculatrice de calories TDEE gratuite. Calculez vos besoins caloriques journaliers selon votre âge, sexe, taille, poids et niveau d\'activité (formule Mifflin-St Jeor).',
    h1: 'Calculatrice de Calories',
  },
  lt: {
    title: 'Kalorijų Skaičiuotuvas — Dienos kalorijų poreikis TDEE',
    description: 'Nemokamas kalorijų skaičiuotuvas. Apskaičiuokite dienos kalorijų poreikį pagal amžių, lytį, ūgį, svorį ir aktyvumo lygį (Mifflin-St Jeor formulė).',
    h1: 'Kalorijų Skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our free calorie calculator uses the Mifflin-St Jeor equation — the most accurate formula recommended by nutrition professionals — to estimate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Enter your details to see how many calories you need to maintain, lose, or gain weight.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'What is TDEE?',
        a: 'TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day, accounting for your basal metabolic rate and physical activity. It represents the number of calories you need to maintain your current weight.',
      },
      {
        q: 'What is BMR?',
        a: 'BMR (Basal Metabolic Rate) is the number of calories your body needs at complete rest to maintain basic functions like breathing, circulation, and cell production. It is the minimum calorie intake required to stay alive.',
      },
      {
        q: 'Which formula does this calculator use?',
        a: 'This calculator uses the Mifflin-St Jeor equation (1990), which is considered the most accurate for estimating BMR in most adults. For men: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5. For women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161.',
      },
      {
        q: 'How many calories should I cut to lose weight?',
        a: 'A deficit of 500 kcal per day leads to approximately 0.5 kg (1 lb) of weight loss per week. This calculator shows you the "Lose weight" figure based on this principle. It is not recommended to go below 1,200 kcal/day without medical supervision.',
      },
      {
        q: 'Are these numbers exact?',
        a: 'These are estimates. Individual metabolism varies based on genetics, hormones, sleep, and other factors. Use these numbers as a starting point and adjust based on your real results over 2–4 weeks.',
      },
    ],
  },
  ru: {
    description: 'Наш бесплатный калькулятор калорий использует формулу Миффлина-Сан Жеора — наиболее точную для расчёта базового обмена веществ (BMR) и суточной нормы калорий (TDEE). Введите свои данные, чтобы узнать, сколько калорий нужно для поддержания, снижения или набора веса.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Что такое TDEE?',
        a: 'TDEE (Total Daily Energy Expenditure) — общий расход калорий за день с учётом базового обмена и физической активности. Это количество калорий для поддержания текущего веса.',
      },
      {
        q: 'Что такое BMR?',
        a: 'BMR (базовый обмен веществ) — количество калорий, которое организм расходует в состоянии полного покоя на поддержание жизнедеятельности: дыхание, кровообращение, клеточные процессы.',
      },
      {
        q: 'Какая формула используется?',
        a: 'Используется формула Миффлина-Сан Жеора (1990). Для мужчин: BMR = 10 × вес(кг) + 6,25 × рост(см) − 5 × возраст + 5. Для женщин: BMR = 10 × вес(кг) + 6,25 × рост(см) − 5 × возраст − 161.',
      },
      {
        q: 'На сколько калорий нужно снизить рацион для похудения?',
        a: 'Дефицит 500 ккал/день даёт около 0,5 кг потери веса в неделю. Калькулятор показывает это значение в строке «Похудение». Снижать калораж ниже 1200 ккал/день без врачебного контроля не рекомендуется.',
      },
      {
        q: 'Насколько точны эти цифры?',
        a: 'Это оценочные значения. Индивидуальный обмен веществ зависит от генетики, гормонов, сна и других факторов. Используйте расчёт как отправную точку и корректируйте по реальным результатам через 2–4 недели.',
      },
    ],
  },
  uk: {
    description: 'Наш безкоштовний калькулятор калорій використовує формулу Міффліна-Сан Жеора для розрахунку базового обміну речовин (BMR) і добової норми калорій (TDEE). Введіть свої дані, щоб дізнатися, скільки калорій потрібно для підтримки, зниження або набору ваги.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Що таке TDEE?',
        a: 'TDEE — загальні витрати калорій за день з урахуванням базового обміну та фізичної активності. Це кількість калорій для підтримання поточної ваги.',
      },
      {
        q: 'Що таке BMR?',
        a: 'BMR (базовий обмін речовин) — кількість калорій, яку організм витрачає у стані повного спокою на підтримку дихання, кровообігу та клітинних процесів.',
      },
      {
        q: 'Яка формула використовується?',
        a: 'Формула Міффліна-Сан Жеора (1990). Для чоловіків: BMR = 10 × вага(кг) + 6,25 × зріст(см) − 5 × вік + 5. Для жінок: BMR = 10 × вага(кг) + 6,25 × зріст(см) − 5 × вік − 161.',
      },
      {
        q: 'На скільки калорій знизити раціон для схуднення?',
        a: 'Дефіцит 500 ккал/день дає близько 0,5 кг втрати ваги на тиждень. Знижувати калорійність нижче 1200 ккал/день без лікарського контролю не рекомендується.',
      },
      {
        q: 'Наскільки точні ці цифри?',
        a: 'Це орієнтовні значення. Індивідуальний обмін речовин залежить від генетики, гормонів і сну. Використовуйте розрахунок як відправну точку і коригуйте за реальними результатами через 2–4 тижні.',
      },
    ],
  },
  fr: {
    description: 'Notre calculatrice de calories gratuite utilise la formule Mifflin-St Jeor — la plus précise recommandée par les professionnels de la nutrition — pour estimer votre métabolisme de base (BMR) et vos dépenses énergétiques totales (TDEE). Entrez vos données pour connaître vos besoins caloriques.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Qu\'est-ce que le TDEE ?',
        a: 'Le TDEE (Dépense Énergétique Totale Journalière) est le nombre total de calories brûlées en une journée, en tenant compte du métabolisme de base et de l\'activité physique. C\'est le nombre de calories nécessaires pour maintenir votre poids actuel.',
      },
      {
        q: 'Qu\'est-ce que le BMR ?',
        a: 'Le BMR (Métabolisme de Base) est le nombre de calories que votre corps consomme au repos complet pour maintenir les fonctions vitales : respiration, circulation et production cellulaire.',
      },
      {
        q: 'Quelle formule est utilisée ?',
        a: 'La formule Mifflin-St Jeor (1990). Hommes : BMR = 10 × poids(kg) + 6,25 × taille(cm) − 5 × âge + 5. Femmes : BMR = 10 × poids(kg) + 6,25 × taille(cm) − 5 × âge − 161.',
      },
      {
        q: 'De combien réduire les calories pour perdre du poids ?',
        a: 'Un déficit de 500 kcal par jour entraîne environ 0,5 kg de perte de poids par semaine. Il n\'est pas recommandé de descendre en dessous de 1 200 kcal/jour sans suivi médical.',
      },
      {
        q: 'Ces chiffres sont-ils exacts ?',
        a: 'Ce sont des estimations. Le métabolisme individuel varie selon la génétique, les hormones et le sommeil. Utilisez ces chiffres comme point de départ et ajustez selon vos résultats réels après 2 à 4 semaines.',
      },
    ],
  },
  lt: {
    description: 'Mūsų nemokamas kalorijų skaičiuotuvas naudoja Mifflin-St Jeor lygtį — tiksliausią formulę, rekomenduojamą mitybos specialistų — baziniam medžiagų apykaitos greičiui (BMR) ir bendrai dienos energijos sąnaudoms (TDEE) apskaičiuoti.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kas yra TDEE?',
        a: 'TDEE (bendra dienos energijos sąnaudos) — tai bendras kalorijų kiekis, kurį kūnas sudegina per dieną, atsižvelgiant į bazinį medžiagų apykaitą ir fizinį aktyvumą.',
      },
      {
        q: 'Kas yra BMR?',
        a: 'BMR (bazinis medžiagų apykaitos greitis) — kalorijų kiekis, kurio reikia organizmui visiško poilsio metu pagrindinėms funkcijoms palaikyti: kvėpavimui, kraujotakai ir ląstelių veiklai.',
      },
      {
        q: 'Kokia formulė naudojama?',
        a: 'Mifflin-St Jeor formulė (1990). Vyrams: BMR = 10 × svoris(kg) + 6,25 × ūgis(cm) − 5 × amžius + 5. Moterims: BMR = 10 × svoris(kg) + 6,25 × ūgis(cm) − 5 × amžius − 161.',
      },
      {
        q: 'Kiek kalorijų sumažinti norint numesti svorio?',
        a: '500 kcal per dieną deficitas lemia apie 0,5 kg svorio netekimą per savaitę. Nerekomenduojama leistis žemiau 1200 kcal/dieną be medicininės priežiūros.',
      },
      {
        q: 'Ar šie skaičiai tikslūs?',
        a: 'Tai įvertinimai. Individualus metabolizmas priklauso nuo genetikos, hormonų ir miego. Naudokite šiuos skaičius kaip pradžios tašką ir koreguokite pagal realius rezultatus po 2–4 savaičių.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  const alternates: Record<string, string> = {};
  routing.locales.forEach((l) => {
    alternates[l] = `https://utilixi.com/${l}/calculator/calories`;
  });

  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: alternates },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CaloriesPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/calories`,
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
        <CaloriesCalculator locale={locale} />

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

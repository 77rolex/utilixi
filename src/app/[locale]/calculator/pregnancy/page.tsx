import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import PregnancyCalculator from './PregnancyCalculator';
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
  ],
  ru: [
    { href: '/calculator/bmi', label: 'Калькулятор ИМТ' },
    { href: '/calculator/calories', label: 'Калькулятор калорий (TDEE)' },
  ],
  uk: [
    { href: '/calculator/bmi', label: 'Калькулятор ІМТ' },
    { href: '/calculator/calories', label: 'Калькулятор калорій (TDEE)' },
  ],
  fr: [
    { href: '/calculator/bmi', label: 'Calculatrice IMC' },
    { href: '/calculator/calories', label: 'Calculatrice de calories (TDEE)' },
  ],
  lt: [
    { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' },
    { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas (TDEE)' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Pregnancy Due Date Calculator — Calculate EDD Online',
    description: 'Free pregnancy calculator. Find your estimated due date (EDD) by last menstrual period or conception date. Track gestational age, trimesters and key dates.',
    h1: 'Pregnancy Due Date Calculator',
  },
  ru: {
    title: 'Калькулятор беременности — дата родов онлайн (ПДР)',
    description: 'Бесплатный калькулятор беременности онлайн. Рассчитайте предполагаемую дату родов (ПДР) по дате последней менструации или зачатия. Срок и триместры.',
    h1: 'Калькулятор беременности',
  },
  uk: {
    title: 'Калькулятор вагітності — дата пологів онлайн',
    description: 'Безкоштовний калькулятор вагітності онлайн. Розрахуйте очікувану дату пологів за датою останньої менструації або зачаття. Термін і триместри.',
    h1: 'Калькулятор вагітності',
  },
  fr: {
    title: "Calculatrice de Grossesse — Date d'Accouchement Prévue",
    description: "Calculatrice de grossesse gratuite. Calculez votre date d'accouchement prévue à partir de la date de vos dernières règles ou de la date de conception.",
    h1: "Calculatrice de Grossesse",
  },
  lt: {
    title: 'Nėštumo Skaičiuotuvas — Gimdymo Data Internete',
    description: 'Nemokamas nėštumo skaičiuotuvas. Apskaičiuokite numatomą gimdymo datą pagal paskutinių mėnesinių datą arba pastojimo datą. Trukmė ir trimestrai.',
    h1: 'Nėštumo Skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our free pregnancy calculator estimates your due date and tracks your pregnancy progress. Enter the date of your last menstrual period (LMP) — the due date is calculated using Naegele\'s rule (LMP + 280 days, or 40 weeks). If you know your conception date, switch to the second mode: the result will be identical.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How is the due date calculated?',
        a: 'The calculator uses Naegele\'s rule: add 280 days (40 weeks) to the first day of the last menstrual period. In conception mode, 266 days (38 weeks) are added to the conception date, which gives the same result assuming conception occurred on day 14 of the cycle.',
      },
      {
        q: 'What is the difference between the two modes?',
        a: 'The "Last Period" mode is the standard medical method — doctors use the LMP date because it is easy to remember and conception is harder to pinpoint. The "Conception Date" mode is useful if you know the exact date, for example after IVF or with ovulation tracking.',
      },
      {
        q: 'How accurate is the estimated due date?',
        a: 'The estimated due date is a statistical average. Only about 5% of babies are born exactly on the EDD. Most births happen within 2 weeks before or after the due date. An ultrasound in the first trimester gives a more precise estimate.',
      },
      {
        q: 'What are the pregnancy trimesters?',
        a: 'Pregnancy is divided into three trimesters: 1st trimester (weeks 1–13) — organ formation; 2nd trimester (weeks 14–26) — active growth, the baby starts moving; 3rd trimester (weeks 27–40) — final development and preparation for birth.',
      },
      {
        q: 'When should I see a doctor?',
        a: 'As soon as you suspect or confirm pregnancy. Early prenatal care (ideally before week 10) helps monitor fetal development, confirm the due date with ultrasound, and detect any risks early.',
      },
    ],
  },
  ru: {
    description: 'Наш бесплатный калькулятор беременности рассчитывает предполагаемую дату родов (ПДР) и отслеживает срок беременности. Введите дату последней менструации — расчёт выполняется по правилу Негеле (ЛМП + 280 дней, или 40 недель). Если вы знаете дату зачатия, переключитесь на второй режим: результат будет одинаков.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Как рассчитывается дата родов?',
        a: 'Калькулятор использует правило Негеле: к первому дню последней менструации прибавляется 280 дней (40 недель). В режиме зачатия прибавляется 266 дней (38 недель), что даёт тот же результат при условии, что зачатие произошло на 14-й день цикла.',
      },
      {
        q: 'В чём разница между двумя режимами?',
        a: 'Режим «По ЛМП» — стандартный медицинский метод: врачи используют дату последней менструации, так как дату зачатия точно установить сложнее. Режим «По зачатию» удобен, если вы знаете точную дату — например, после ЭКО или при отслеживании овуляции.',
      },
      {
        q: 'Насколько точна предполагаемая дата родов?',
        a: 'ПДР является статистическим средним. Только около 5% детей рождаются точно в этот день. Большинство родов происходит в пределах 2 недель до или после ПДР. УЗИ в первом триместре даёт более точный срок.',
      },
      {
        q: 'Что такое триместры беременности?',
        a: 'Беременность делится на три триместра: 1-й (1–13 нед.) — формирование органов; 2-й (14–26 нед.) — активный рост, малыш начинает двигаться; 3-й (27–40 нед.) — окончательное развитие и подготовка к родам.',
      },
      {
        q: 'Когда нужно обратиться к врачу?',
        a: 'Как только вы подозреваете или подтверждаете беременность. Ранняя постановка на учёт (в идеале до 10 недель) позволяет контролировать развитие плода, уточнить дату родов по УЗИ и своевременно выявить возможные риски.',
      },
    ],
  },
  uk: {
    description: 'Наш безкоштовний калькулятор вагітності розраховує очікувану дату пологів і відстежує термін. Введіть дату останньої менструації — розрахунок виконується за правилом Негеля (ОДМ + 280 днів, або 40 тижнів). Якщо ви знаєте дату зачаття, переключіться на другий режим.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Як розраховується дата пологів?',
        a: 'Калькулятор використовує правило Негеля: до першого дня останньої менструації додається 280 днів (40 тижнів). У режимі зачаття додається 266 днів (38 тижнів), що дає той самий результат, якщо зачаття відбулося на 14-й день циклу.',
      },
      {
        q: 'У чому різниця між двома режимами?',
        a: 'Режим «По ОДМ» — стандартний медичний метод. Режим «По зачаттю» зручний, якщо ви знаєте точну дату — наприклад, після ЕКЗ або при відстеженні овуляції.',
      },
      {
        q: 'Наскільки точна очікувана дата пологів?',
        a: 'Очікувана дата пологів є статистичним середнім. Лише близько 5% дітей народжуються точно в цей день. Більшість пологів відбуваються в межах 2 тижнів до або після дати. УЗД у першому триместрі дає точніший термін.',
      },
      {
        q: 'Що таке триместри вагітності?',
        a: '1-й триместр (1–13 тиж.) — формування органів; 2-й (14–26 тиж.) — активне зростання, дитина починає рухатися; 3-й (27–40 тиж.) — підготовка до пологів.',
      },
      {
        q: 'Коли звертатися до лікаря?',
        a: 'Щойно ви підозрюєте або підтверджуєте вагітність. Рання постановка на облік (до 10 тижнів) дозволяє контролювати розвиток плода і своєчасно виявити можливі ризики.',
      },
    ],
  },
  fr: {
    description: "Notre calculatrice de grossesse gratuite estime votre date d'accouchement prévue et suit l'avancement de votre grossesse. Entrez la date de vos dernières règles — le calcul utilise la règle de Naegele (DDR + 280 jours, soit 40 semaines). Si vous connaissez la date de conception, utilisez le second mode.",
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: "Comment la date d'accouchement est-elle calculée ?",
        a: "Le calculateur utilise la règle de Naegele : 280 jours (40 semaines) sont ajoutés au premier jour des dernières règles. En mode conception, 266 jours (38 semaines) sont ajoutés à la date de conception, ce qui donne le même résultat en supposant une conception au 14e jour du cycle.",
      },
      {
        q: 'Quelle est la différence entre les deux modes ?',
        a: "Le mode « Dernières règles » est la méthode médicale standard. Le mode « Conception » est utile si vous connaissez la date exacte, par exemple après une FIV ou avec un suivi de l'ovulation.",
      },
      {
        q: "La date d'accouchement estimée est-elle fiable ?",
        a: "La date prévue est une moyenne statistique. Seulement environ 5 % des bébés naissent exactement à cette date. La plupart des naissances surviennent dans les 2 semaines avant ou après. Une échographie du premier trimestre donne une estimation plus précise.",
      },
      {
        q: 'Que sont les trimestres de grossesse ?',
        a: '1er trimestre (semaines 1–13) — formation des organes ; 2e trimestre (semaines 14–26) — croissance active, le bébé commence à bouger ; 3e trimestre (semaines 27–40) — développement final et préparation à la naissance.',
      },
      {
        q: 'Quand consulter un médecin ?',
        a: "Dès que vous suspectez ou confirmez une grossesse. Un suivi prénatal précoce (idéalement avant la 10e semaine) permet de surveiller le développement fœtal et de détecter rapidement les éventuels risques.",
      },
    ],
  },
  lt: {
    description: 'Mūsų nemokamas nėštumo skaičiuotuvas apskaičiuoja numatomą gimdymo datą ir stebi nėštumo eigą. Įveskite paskutinių mėnesinių datą — skaičiavimas atliekamas pagal Nėgelio taisyklę (PML + 280 dienų, arba 40 savaičių). Jei žinote pastojimo datą, naudokite antrąjį režimą.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kaip apskaičiuojama gimdymo data?',
        a: 'Skaičiuotuvas naudoja Nėgelio taisyklę: prie paskutinių mėnesinių pirmosios dienos pridedamos 280 dienų (40 savaičių). Pastojimo režime pridedamos 266 dienos (38 savaitės), kas duoda tą patį rezultatą, jei pastojimas įvyko 14-ą ciklo dieną.',
      },
      {
        q: 'Koks skirtumas tarp dviejų režimų?',
        a: 'Režimas „Pagal PML" — standartinis medicininis metodas. Režimas „Pagal pastojimą" patogus, jei žinote tikslią datą, pavyzdžiui, po IVF ar stebint ovuliaciją.',
      },
      {
        q: 'Ar numatoma gimdymo data yra tiksli?',
        a: 'Numatoma gimdymo data yra statistinis vidurkis. Tik apie 5 % kūdikių gimsta lygiai tą dieną. Dauguma gimdymų vyksta per 2 savaites iki arba po numatytos datos. Pirmojo trimestro ultragarsas suteikia tikslesnį įvertinimą.',
      },
      {
        q: 'Kas yra nėštumo trimestrai?',
        a: '1-asis trimestras (1–13 sav.) — organų formavimasis; 2-asis (14–26 sav.) — aktyvus augimas, kūdikis pradeda judėti; 3-iasis (27–40 sav.) — galutinis vystymasis ir pasiruošimas gimdymui.',
      },
      {
        q: 'Kada reikia kreiptis į gydytoją?',
        a: 'Vos tik įtariate ar patvirtinate nėštumą. Ankstyva prenatalinė priežiūra (idealiai iki 10 savaičių) leidžia stebėti vaisiaus raidą ir laiku nustatyti galimas rizikas.',
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
    alternates: buildAlternates(locale, '/calculator/pregnancy'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PregnancyPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/pregnancy`,
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
        <PregnancyCalculator locale={locale} />

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

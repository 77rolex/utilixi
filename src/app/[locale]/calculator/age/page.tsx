import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import AgeCalculator from './AgeCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/date-diff', label: 'Date Difference Calculator' }, { href: '/tools/countdown', label: 'Countdown Timer' }],
  ru: [{ href: '/calculator/date-diff', label: 'Разница дат' }, { href: '/tools/countdown', label: 'Таймер обратного отсчёта' }],
  uk: [{ href: '/calculator/date-diff', label: 'Різниця дат' }, { href: '/tools/countdown', label: 'Таймер зворотного відліку' }],
  fr: [{ href: '/calculator/date-diff', label: 'Différence de dates' }, { href: '/tools/countdown', label: 'Compte à rebours' }],
  lt: [{ href: '/calculator/date-diff', label: 'Datų skirtumas' }, { href: '/tools/countdown', label: 'Atgalinio skaičiavimo laikmatis' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Age Calculator — Calculate Exact Age in Years, Months & Days', description: 'Free age calculator. Find your exact age in years, months and days from your date of birth. Shows total days, weeks, and days until your next birthday.', h1: 'Age Calculator' },
  ru: { title: 'Калькулятор возраста — точный возраст в годах, месяцах и днях', description: 'Бесплатный калькулятор возраста. Узнайте точный возраст в годах, месяцах и днях по дате рождения. Показывает общее количество дней и дней до следующего дня рождения.', h1: 'Калькулятор возраста' },
  uk: { title: 'Калькулятор віку — точний вік у роках, місяцях і днях', description: 'Безкоштовний калькулятор віку. Дізнайтесь точний вік у роках, місяцях і днях за датою народження. Показує загальну кількість днів і днів до наступного дня народження.', h1: 'Калькулятор віку' },
  fr: { title: 'Calculatrice d\'âge — Âge exact en années, mois et jours', description: 'Calculatrice d\'âge gratuite. Calculez votre âge exact en années, mois et jours à partir de votre date de naissance. Affiche le total de jours et les jours jusqu\'à votre prochain anniversaire.', h1: 'Calculatrice d\'âge' },
  lt: { title: 'Amžiaus Skaičiuotuvas — Tikslus amžius metais, mėnesiais ir dienomis', description: 'Nemokamas amžiaus skaičiuotuvas. Sužinokite tikslų amžių metais, mėnesiais ir dienomis pagal gimimo datą. Rodo bendrą dienų skaičių ir dienas iki kito gimtadienio.', h1: 'Amžiaus skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Enter your date of birth to instantly calculate your exact age in years, months, and days. The calculator also shows your total days and weeks lived, and how many days are left until your next birthday.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is exact age calculated?', a: 'The calculator counts the full years, months, and remaining days between your birth date and today. For example, if you were born on March 15, 1990, and today is May 20, 2025, your age is 35 years, 2 months, and 5 days.' },
      { q: 'How many days have I lived?', a: 'Multiply your age in years by 365.25 (to account for leap years) as a quick estimate. The calculator computes the exact number by counting every day from your birth date to today.' },
      { q: 'What is a leap year and how does it affect age?', a: 'A leap year has 366 days instead of 365, occurring every 4 years (with exceptions for century years). If you were born on February 29, your "official" birthday is celebrated on March 1 in non-leap years in most countries.' },
      { q: 'How do I calculate my age in months?', a: 'Multiply completed years by 12 and add the remaining months. For example, 25 years and 3 months = 25 × 12 + 3 = 303 months. The calculator shows this total automatically.' },
      { q: 'How many weeks are in a year?', a: 'There are exactly 52 weeks and 1 day in a regular year (365 days ÷ 7 = 52.14...), and 52 weeks and 2 days in a leap year. Over a lifetime of 70 years, that\'s approximately 3,652 weeks.' },
    ],
  },
  ru: {
    description: 'Введите дату рождения, чтобы мгновенно узнать точный возраст в годах, месяцах и днях. Калькулятор также показывает общее количество прожитых дней и недель, а также сколько дней осталось до следующего дня рождения.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитывается точный возраст?', a: 'Калькулятор считает полные годы, месяцы и оставшиеся дни между датой рождения и сегодняшним днём. Например, если вы родились 15 марта 1990 года, а сегодня 20 мая 2025 года, ваш возраст — 35 лет, 2 месяца и 5 дней.' },
      { q: 'Сколько дней я прожил?', a: 'Приблизительно — умножьте возраст в годах на 365,25 (учитывая високосные годы). Калькулятор вычисляет точное число, считая каждый день от даты рождения до сегодняшнего дня.' },
      { q: 'Что такое високосный год и как он влияет на возраст?', a: 'Високосный год имеет 366 дней, а не 365, и наступает каждые 4 года. Если вы родились 29 февраля, в большинстве стран ваш день рождения отмечается 1 марта в невисокосные годы.' },
      { q: 'Как посчитать свой возраст в месяцах?', a: 'Умножьте полные годы на 12 и прибавьте оставшиеся месяцы. Например, 25 лет и 3 месяца = 25 × 12 + 3 = 303 месяца. Калькулятор показывает это значение автоматически.' },
      { q: 'Сколько недель в году?', a: 'В обычном году ровно 52 недели и 1 день (365 ÷ 7 = 52,14...), в високосном — 52 недели и 2 дня. За 70 лет жизни это примерно 3652 недели.' },
    ],
  },
  uk: {
    description: 'Введіть дату народження, щоб миттєво дізнатись точний вік у роках, місяцях і днях. Калькулятор також показує загальну кількість прожитих днів і тижнів, а також скільки днів залишилось до наступного дня народження.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розраховується точний вік?', a: 'Калькулятор рахує повні роки, місяці і дні між датою народження і сьогоднішнім днем. Наприклад, якщо ви народились 15 березня 1990 року, а сьогодні 20 травня 2025 року, ваш вік — 35 років, 2 місяці і 5 днів.' },
      { q: 'Скільки днів я прожив?', a: 'Приблизно — помножте вік у роках на 365,25. Калькулятор обчислює точне число, рахуючи кожен день від дати народження до сьогодні.' },
      { q: 'Що таке високосний рік і як він впливає на вік?', a: 'Високосний рік має 366 днів замість 365 і настає кожні 4 роки. Якщо ви народились 29 лютого, у більшості країн ваш день народження відзначається 1 березня у невисокосні роки.' },
      { q: 'Як порахувати свій вік у місяцях?', a: 'Помножте повні роки на 12 і додайте місяці. Наприклад, 25 років і 3 місяці = 25 × 12 + 3 = 303 місяці.' },
      { q: 'Скільки тижнів у році?', a: 'У звичайному році рівно 52 тижні і 1 день (365 ÷ 7 = 52,14...), у високосному — 52 тижні і 2 дні.' },
    ],
  },
  fr: {
    description: 'Entrez votre date de naissance pour calculer instantanément votre âge exact en années, mois et jours. La calculatrice affiche également le nombre total de jours et semaines vécus, ainsi que les jours restants jusqu\'à votre prochain anniversaire.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment est calculé l\'âge exact ?', a: 'La calculatrice compte les années, mois et jours complets entre votre date de naissance et aujourd\'hui. Par exemple, si vous êtes né le 15 mars 1990 et qu\'aujourd\'hui c\'est le 20 mai 2025, votre âge est 35 ans, 2 mois et 5 jours.' },
      { q: 'Combien de jours ai-je vécu ?', a: 'En estimation rapide, multipliez votre âge par 365,25. La calculatrice compte exactement chaque jour depuis votre date de naissance jusqu\'à aujourd\'hui.' },
      { q: 'Qu\'est-ce qu\'une année bissextile ?', a: 'Une année bissextile a 366 jours au lieu de 365, se produisant tous les 4 ans. Si vous êtes né le 29 février, votre anniversaire est généralement fêté le 1er mars les années non bissextiles.' },
      { q: 'Comment calculer mon âge en mois ?', a: 'Multipliez les années complètes par 12 et ajoutez les mois restants. Par exemple, 25 ans et 3 mois = 25 × 12 + 3 = 303 mois.' },
      { q: 'Combien de semaines y a-t-il dans une année ?', a: 'Il y a exactement 52 semaines et 1 jour dans une année normale (365 ÷ 7 = 52,14...) et 52 semaines et 2 jours dans une année bissextile.' },
    ],
  },
  lt: {
    description: 'Įveskite gimimo datą, kad akimirksniu sužinotumėte tikslų amžių metais, mėnesiais ir dienomis. Skaičiuotuvas taip pat rodo bendrą pragyventų dienų ir savaičių skaičių bei dienas iki kito gimtadienio.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuojamas tikslus amžius?', a: 'Skaičiuotuvas skaičiuoja pilnus metus, mėnesius ir dienas tarp gimimo datos ir šiandien. Pavyzdžiui, jei gimėte 1990 m. kovo 15 d., o šiandien 2025 m. gegužės 20 d., jūsų amžius yra 35 metai, 2 mėnesiai ir 5 dienos.' },
      { q: 'Kiek dienų aš gyvenau?', a: 'Apytiksliai — padauginkite amžių metais iš 365,25. Skaičiuotuvas apskaičiuoja tikslų skaičių, skaičiuodamas kiekvieną dieną nuo gimimo datos iki šiandien.' },
      { q: 'Kas yra keliamieji metai?', a: 'Keliamieji metai turi 366 dienas vietoj 365, pasitaikantys kas 4 metus. Jei gimėte vasario 29 d., daugumoje šalių gimtadienis švenčiamas kovo 1 d. nekeliamaisiais metais.' },
      { q: 'Kaip apskaičiuoti amžių mėnesiais?', a: 'Padauginkite pilnus metus iš 12 ir pridėkite mėnesius. Pavyzdžiui, 25 metai ir 3 mėnesiai = 25 × 12 + 3 = 303 mėnesiai.' },
      { q: 'Kiek savaičių yra metuose?', a: 'Paprastuose metuose yra lygiai 52 savaitės ir 1 diena (365 ÷ 7 = 52,14...), keliamaisiais metais — 52 savaitės ir 2 dienos.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/age') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AgePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/age`,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <AgeCalculator locale={locale} />
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

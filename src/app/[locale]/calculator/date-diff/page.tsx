import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import DateDiffCalculator from './DateDiffCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/age', label: 'Age Calculator' }, { href: '/tools/countdown', label: 'Countdown Timer' }],
  ru: [{ href: '/calculator/age', label: 'Калькулятор возраста' }, { href: '/tools/countdown', label: 'Таймер обратного отсчёта' }],
  uk: [{ href: '/calculator/age', label: 'Калькулятор віку' }, { href: '/tools/countdown', label: 'Таймер зворотного відліку' }],
  fr: [{ href: '/calculator/age', label: 'Calculatrice d\'âge' }, { href: '/tools/countdown', label: 'Minuteur de compte à rebours' }],
  lt: [{ href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' }, { href: '/tools/countdown', label: 'Atgalinio skaičiavimo laikmatis' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Date Difference Calculator — Days Between Two Dates', description: 'Free date difference calculator. Find the exact number of days, weeks, months and years between any two dates. Also shows working days and weekends.', h1: 'Date Difference Calculator' },
  ru: { title: 'Калькулятор разницы дат — дней между двумя датами', description: 'Бесплатный калькулятор разницы дат. Найдите точное количество дней, недель, месяцев и лет между любыми двумя датами. Также показывает рабочие и выходные дни.', h1: 'Калькулятор разницы дат' },
  uk: { title: 'Калькулятор різниці дат — днів між двома датами', description: 'Безкоштовний калькулятор різниці дат. Знайдіть точну кількість днів, тижнів, місяців і років між будь-якими двома датами. Також показує робочі та вихідні дні.', h1: 'Калькулятор різниці дат' },
  fr: { title: 'Calculatrice de différence de dates — Jours entre deux dates', description: 'Calculatrice gratuite de différence de dates. Trouvez le nombre exact de jours, semaines, mois et années entre deux dates. Affiche aussi les jours ouvrés et les week-ends.', h1: 'Calculatrice de différence de dates' },
  lt: { title: 'Datų Skirtumo Skaičiuotuvas — Dienos tarp dviejų datų', description: 'Nemokamas datų skirtumo skaičiuotuvas. Raskite tikslų dienų, savaičių, mėnesių ir metų skaičių tarp bet kurių dviejų datų. Rodo ir darbo dienas, ir savaitgalius.', h1: 'Datų skirtumo skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Select a start and end date to calculate the exact difference. The result is displayed in years, months, weeks, and days, plus totals in days, weeks, and months. Working days (Mon–Fri) and weekend days are also counted separately — useful for project planning and deadline calculations.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How many days are between two dates?', a: 'The calculator subtracts the start date from the end date and returns the exact number of days. For example, from January 1, 2024 to July 1, 2024 = 182 days (since 2024 is a leap year).' },
      { q: 'How are working days calculated?', a: 'Working days are Monday through Friday. The calculator counts each day in the range and classifies it as a working day or weekend. Note: public holidays are not excluded, as they vary by country.' },
      { q: 'How many days are in a month?', a: 'Months have 28, 29, 30, or 31 days depending on the month and whether it\'s a leap year. The average month is approximately 30.44 days. For precise calculations, the calculator uses exact calendar dates rather than averages.' },
      { q: 'How many weeks are between two dates?', a: 'Divide the number of days by 7. The calculator shows both the total in full weeks and the breakdown (e.g., 2 years, 3 months, 1 week, 4 days).' },
      { q: 'Can I calculate the number of business days for a project?', a: 'Yes. The "Working days" figure excludes Saturdays and Sundays. For project planning, subtract any known public holidays from this number to get the net working days available.' },
    ],
  },
  ru: {
    description: 'Выберите начальную и конечную дату, чтобы рассчитать точную разницу. Результат отображается в годах, месяцах, неделях и днях, а также суммарно в днях, неделях и месяцах. Рабочие и выходные дни считаются отдельно — удобно для планирования проектов и расчёта дедлайнов.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как посчитать количество дней между датами?', a: 'Калькулятор вычитает начальную дату из конечной и возвращает точное количество дней. Например, от 1 января 2024 до 1 июля 2024 = 182 дня (2024 — високосный год).' },
      { q: 'Как считаются рабочие дни?', a: 'Рабочими считаются дни с понедельника по пятницу. Калькулятор перебирает каждый день в диапазоне и классифицирует его. Праздничные дни не исключаются, так как они различаются по странам.' },
      { q: 'Сколько дней в месяце?', a: 'Месяцы содержат 28, 29, 30 или 31 день. Средний месяц — примерно 30,44 дня. Для точных расчётов калькулятор использует конкретные календарные даты, а не средние значения.' },
      { q: 'Как посчитать количество недель между датами?', a: 'Разделите количество дней на 7. Калькулятор показывает как общее число полных недель, так и разбивку (например, 2 года, 3 месяца, 1 неделя, 4 дня).' },
      { q: 'Можно ли рассчитать рабочие дни для проекта?', a: 'Да. Показатель «Рабочих дней» исключает субботы и воскресенья. Для планирования проекта вычтите из этого числа известные праздничные дни, чтобы получить чистые рабочие дни.' },
    ],
  },
  uk: {
    description: 'Оберіть початкову та кінцеву дату, щоб розрахувати точну різницю. Результат відображається в роках, місяцях, тижнях і днях, а також сумарно в днях, тижнях і місяцях. Робочі та вихідні дні рахуються окремо — зручно для планування проектів.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як порахувати кількість днів між датами?', a: 'Калькулятор віднімає початкову дату від кінцевої та повертає точну кількість днів. Наприклад, від 1 січня 2024 до 1 липня 2024 = 182 дні (2024 — високосний рік).' },
      { q: 'Як рахуються робочі дні?', a: 'Робочими вважаються дні з понеділка по п\'ятницю. Калькулятор перебирає кожен день у діапазоні. Святкові дні не виключаються, оскільки вони різняться по країнах.' },
      { q: 'Скільки днів у місяці?', a: 'Місяці містять 28, 29, 30 або 31 день. Середній місяць — приблизно 30,44 дні. Для точних розрахунків калькулятор використовує конкретні дати.' },
      { q: 'Як порахувати кількість тижнів між датами?', a: 'Поділіть кількість днів на 7. Калькулятор показує як загальне число повних тижнів, так і розбивку.' },
      { q: 'Чи можна розрахувати робочі дні для проекту?', a: 'Так. Показник «Робочих днів» виключає суботи і неділі. Для планування проекту відніміть відомі святкові дні від цього числа.' },
    ],
  },
  fr: {
    description: 'Sélectionnez une date de début et une date de fin pour calculer la différence exacte. Le résultat s\'affiche en années, mois, semaines et jours, ainsi que les totaux en jours, semaines et mois. Les jours ouvrés (lun–ven) et les week-ends sont également comptés séparément.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calculer le nombre de jours entre deux dates ?', a: 'La calculatrice soustrait la date de début de la date de fin. Par exemple, du 1er janvier 2024 au 1er juillet 2024 = 182 jours (2024 est une année bissextile).' },
      { q: 'Comment les jours ouvrés sont-ils calculés ?', a: 'Les jours ouvrés sont du lundi au vendredi. La calculatrice classe chaque jour. Les jours fériés ne sont pas exclus car ils varient selon les pays.' },
      { q: 'Combien de jours y a-t-il dans un mois ?', a: 'Les mois ont 28, 29, 30 ou 31 jours. Le mois moyen est d\'environ 30,44 jours. La calculatrice utilise des dates calendaires précises.' },
      { q: 'Comment calculer le nombre de semaines entre deux dates ?', a: 'Divisez le nombre de jours par 7. La calculatrice montre à la fois le total en semaines entières et la décomposition détaillée.' },
      { q: 'Peut-on calculer des jours ouvrés pour un projet ?', a: 'Oui. Le chiffre « Jours ouvrés » exclut samedis et dimanches. Pour la planification, soustrayez les jours fériés connus pour obtenir les jours ouvrés nets.' },
    ],
  },
  lt: {
    description: 'Pasirinkite pradžios ir pabaigos datą, kad apskaičiuotumėte tikslų skirtumą. Rezultatas rodomas metais, mėnesiais, savaitėmis ir dienomis, taip pat bendrais skaičiais. Darbo dienos (pir–pen) ir savaitgaliai skaičiuojami atskirai.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuoti dienų skaičių tarp dviejų datų?', a: 'Skaičiuotuvas atima pradžios datą iš pabaigos datos. Pavyzdžiui, nuo 2024 m. sausio 1 d. iki 2024 m. liepos 1 d. = 182 dienos (2024 m. — keliamieji metai).' },
      { q: 'Kaip skaičiuojamos darbo dienos?', a: 'Darbo dienos yra nuo pirmadienio iki penktadienio. Skaičiuotuvas klasifikuoja kiekvieną dieną. Valstybinės šventės neišskaitomos, nes jos skiriasi pagal šalį.' },
      { q: 'Kiek dienų yra mėnesyje?', a: 'Mėnesiai turi 28, 29, 30 arba 31 dieną. Vidutinis mėnuo yra apie 30,44 dienos. Skaičiuotuvas naudoja tikslias kalendorines datas.' },
      { q: 'Kaip apskaičiuoti savaičių skaičių tarp datų?', a: 'Padalinkite dienų skaičių iš 7. Skaičiuotuvas rodo tiek bendrą pilnų savaičių skaičių, tiek išsamų išskaidymą.' },
      { q: 'Ar galima apskaičiuoti darbo dienas projektui?', a: 'Taip. „Darbo dienų" skaičius neapima šeštadienių ir sekmadienių. Planuodami projektą, atimkite žinomas valstybines šventės.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const alternates: Record<string, string> = {};
  routing.locales.forEach((l) => { alternates[l] = `https://utilixi.com/${l}/calculator/date-diff`; });
  return { title: meta.title, description: meta.description, alternates: { languages: alternates } };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DateDiffPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/date-diff`,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <DateDiffCalculator locale={locale} />
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

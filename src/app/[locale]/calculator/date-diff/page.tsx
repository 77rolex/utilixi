import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
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
    description: 'Select a start and end date to calculate the exact difference. The result is displayed in years, months, weeks, and days, plus totals in days, weeks, and months. Working days (Mon–Fri) and weekend days are also counted separately — useful for project planning and deadline calculations.\n\nDate calculations are valuable across many fields. Project managers use them to track sprints and milestones. Legal professionals calculate statutes of limitations and contract periods. HR departments compute employment tenure for benefits eligibility. The working-days count is especially practical — knowing how many business days fall within a window helps allocate resources and set realistic delivery targets.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How many days are between two dates?', a: 'The calculator subtracts the start date from the end date and returns the exact number of days. For example, from January 1, 2024 to July 1, 2024 = 182 days (since 2024 is a leap year).' },
      { q: 'How are working days calculated?', a: 'Working days are Monday through Friday. The calculator counts each day in the range and classifies it as a working day or weekend. Note: public holidays are not excluded, as they vary by country.' },
      { q: 'How many days are in a month?', a: 'Months have 28, 29, 30, or 31 days depending on the month and whether it\'s a leap year. The average month is approximately 30.44 days. For precise calculations, the calculator uses exact calendar dates rather than averages.' },
      { q: 'How many weeks are between two dates?', a: 'Divide the number of days by 7. The calculator shows both the total in full weeks and the breakdown (e.g., 2 years, 3 months, 1 week, 4 days).' },
      { q: 'Can I calculate the number of business days for a project?', a: 'Yes. The "Working days" figure excludes Saturdays and Sundays. For project planning, subtract any known public holidays from this number to get the net working days available.' },
      { q: 'How many days are in each month?', a: 'January, March, May, July, August, October, and December have 31 days. April, June, September, and November have 30 days. February has 28 days (29 in a leap year). A useful mnemonic: count on your knuckles — knuckles are 31-day months, gaps are 30 or 28.' },
      { q: 'Can I find a future date by adding days to a start date?', a: 'This calculator finds the difference between two known dates. To find an end date by adding days, enter your start date and adjust the end date until you reach the desired number of days shown.' },
      { q: 'How do I calculate employment tenure?', a: 'Enter your employment start date as the start and today (or your end date) as the end. The result in years, months, and days gives your exact tenure. For example: started March 1, 2020, today June 8, 2026 = 6 years, 3 months, 7 days.' },
      { q: 'What is ISO 8601 date format?', a: 'ISO 8601 is the international standard for writing dates as YYYY-MM-DD (e.g., 2025-12-31). It eliminates ambiguity in formats like 05/06/2025, which can mean May 6 (US format) or June 5 (European format).' },
      { q: 'How many working days are in a typical year?', a: 'A standard year has 365 days with 52 weekends (104 days), leaving 261 working days (Mon–Fri). Subtracting public holidays (typically 8–13 days depending on country) gives approximately 248–253 net working days per year.' },
    ],
  },
  ru: {
    description: 'Выберите начальную и конечную дату, чтобы рассчитать точную разницу. Результат отображается в годах, месяцах, неделях и днях, а также суммарно в днях, неделях и месяцах. Рабочие и выходные дни считаются отдельно — удобно для планирования проектов и расчёта дедлайнов.\n\nРасчёт дат востребован в самых разных областях. Менеджеры проектов отслеживают сроки спринтов и этапов. Юристы считают сроки исковой давности и сроки договоров. Специалисты по HR вычисляют трудовой стаж для начисления льгот. Расчёт рабочих дней особенно полезен — зная, сколько рабочих дней приходится на проектное окно, легче распределять ресурсы.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как посчитать количество дней между датами?', a: 'Калькулятор вычитает начальную дату из конечной и возвращает точное количество дней. Например, от 1 января 2024 до 1 июля 2024 = 182 дня (2024 — високосный год).' },
      { q: 'Как считаются рабочие дни?', a: 'Рабочими считаются дни с понедельника по пятницу. Калькулятор перебирает каждый день в диапазоне и классифицирует его. Праздничные дни не исключаются, так как они различаются по странам.' },
      { q: 'Сколько дней в месяце?', a: 'Месяцы содержат 28, 29, 30 или 31 день. Средний месяц — примерно 30,44 дня. Для точных расчётов калькулятор использует конкретные календарные даты, а не средние значения.' },
      { q: 'Как посчитать количество недель между датами?', a: 'Разделите количество дней на 7. Калькулятор показывает как общее число полных недель, так и разбивку (например, 2 года, 3 месяца, 1 неделя, 4 дня).' },
      { q: 'Можно ли рассчитать рабочие дни для проекта?', a: 'Да. Показатель «Рабочих дней» исключает субботы и воскресенья. Для планирования проекта вычтите из этого числа известные праздничные дни, чтобы получить чистые рабочие дни.' },
      { q: 'Сколько дней в каждом месяце?', a: 'В январе, марте, мае, июле, августе, октябре и декабре 31 день. В апреле, июне, сентябре и ноябре 30 дней. В феврале 28 или 29 дней (в високосный год). Полезный приём: считайте по костяшкам — костяшки соответствуют месяцам с 31 днём, впадины — 30 или 28.' },
      { q: 'Как узнать дату через X дней после указанной?', a: 'Этот калькулятор находит разницу между двумя известными датами. Чтобы найти конечную дату, добавив нужное количество дней, введите начальную дату и подбирайте конечную, пока не получите нужное число дней.' },
      { q: 'Как рассчитать трудовой стаж?', a: 'Введите дату начала работы в поле «Начало», а сегодняшний день (или дату увольнения) в поле «Конец». Результат в годах, месяцах и днях — ваш точный стаж. Например: начало 1 марта 2020, сегодня 8 июня 2026 = 6 лет, 3 месяца, 7 дней.' },
      { q: 'Что такое формат даты ISO 8601?', a: 'ISO 8601 — международный стандарт записи дат в формате ГГГГ-ММ-ДД (например, 2025-12-31). Он устраняет неоднозначность форматов вроде 05.06.2025, который в разных странах может означать 5 июня или 6 мая.' },
      { q: 'Сколько рабочих дней в году?', a: 'В стандартном году 365 дней с 52 выходными (104 дня), что даёт 261 рабочий день (пн–пт). Вычитая праздники (обычно 8–14 дней в зависимости от страны), получаем примерно 247–253 чистых рабочих дня.' },
    ],
  },
  uk: {
    description: 'Оберіть початкову та кінцеву дату, щоб розрахувати точну різницю. Результат відображається в роках, місяцях, тижнях і днях, а також сумарно в днях, тижнях і місяцях. Робочі та вихідні дні рахуються окремо — зручно для планування проектів і розрахунку дедлайнів.\n\nРозрахунок дат затребуваний у різних галузях. Менеджери проектів відстежують строки спринтів і етапів. Юристи розраховують строки позовної давності та договорів. HR-фахівці обчислюють трудовий стаж для нарахування пільг. Розрахунок робочих днів особливо корисний — знаючи, скільки ділових днів вміщується у проектне вікно, легше розподіляти ресурси.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як порахувати кількість днів між датами?', a: 'Калькулятор віднімає початкову дату від кінцевої та повертає точну кількість днів. Наприклад, від 1 січня 2024 до 1 липня 2024 = 182 дні (2024 — високосний рік).' },
      { q: 'Як рахуються робочі дні?', a: 'Робочими вважаються дні з понеділка по п\'ятницю. Калькулятор перебирає кожен день у діапазоні. Святкові дні не виключаються, оскільки вони різняться по країнах.' },
      { q: 'Скільки днів у місяці?', a: 'Місяці містять 28, 29, 30 або 31 день. Середній місяць — приблизно 30,44 дні. Для точних розрахунків калькулятор використовує конкретні дати.' },
      { q: 'Як порахувати кількість тижнів між датами?', a: 'Поділіть кількість днів на 7. Калькулятор показує як загальне число повних тижнів, так і розбивку.' },
      { q: 'Чи можна розрахувати робочі дні для проекту?', a: 'Так. Показник «Робочих днів» виключає суботи і неділі. Для планування проекту відніміть відомі святкові дні від цього числа.' },
      { q: 'Скільки днів у кожному місяці?', a: 'У січні, березні, травні, липні, серпні, жовтні та грудні 31 день. У квітні, червні, вересні та листопаді 30 днів. У лютому 28 або 29 днів (у високосний рік).' },
      { q: 'Як дізнатися дату через X днів після зазначеної?', a: 'Цей калькулятор знаходить різницю між двома відомими датами. Щоб знайти кінцеву дату, додавши певну кількість днів, введіть початкову дату та підбирайте кінцеву, доки не отримаєте потрібну кількість днів.' },
      { q: 'Як розрахувати трудовий стаж?', a: 'Введіть дату початку роботи як початкову, а сьогоднішній день або дату звільнення — як кінцеву. Результат у роках, місяцях і днях — ваш точний стаж. Наприклад: початок 1 березня 2020, сьогодні 8 червня 2026 = 6 років, 3 місяці, 7 днів.' },
      { q: 'Що таке формат дати ISO 8601?', a: 'ISO 8601 — міжнародний стандарт запису дат у форматі РРРР-ММ-ДД (наприклад, 2025-12-31). Він усуває неоднозначність форматів на кшталт 05.06.2025, який у різних країнах може означати 5 червня або 6 травня.' },
      { q: 'Скільки робочих днів у році?', a: 'У стандартному році 365 днів з 52 вихідними (104 дні), що дає 261 робочий день (пн–пт). Відраховуючи свята (зазвичай 8–14 днів залежно від країни), отримуємо приблизно 247–253 чистих робочих дні.' },
    ],
  },
  fr: {
    description: 'Sélectionnez une date de début et une date de fin pour calculer la différence exacte. Le résultat s\'affiche en années, mois, semaines et jours, ainsi que les totaux en jours, semaines et mois. Les jours ouvrés (lun–ven) et les week-ends sont également comptés séparément.\n\nLes calculs de dates sont précieux dans de nombreux domaines. Les chefs de projet les utilisent pour suivre les sprints et jalons. Les juristes calculent les délais de prescription et les durées de contrats. Les RH calculent l\'ancienneté pour les droits aux avantages. Le nombre de jours ouvrés est particulièrement utile pour allouer des ressources et fixer des délais réalistes.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calculer le nombre de jours entre deux dates ?', a: 'La calculatrice soustrait la date de début de la date de fin. Par exemple, du 1er janvier 2024 au 1er juillet 2024 = 182 jours (2024 est une année bissextile).' },
      { q: 'Comment les jours ouvrés sont-ils calculés ?', a: 'Les jours ouvrés sont du lundi au vendredi. La calculatrice classe chaque jour. Les jours fériés ne sont pas exclus car ils varient selon les pays.' },
      { q: 'Combien de jours y a-t-il dans un mois ?', a: 'Les mois ont 28, 29, 30 ou 31 jours. Le mois moyen est d\'environ 30,44 jours. La calculatrice utilise des dates calendaires précises.' },
      { q: 'Comment calculer le nombre de semaines entre deux dates ?', a: 'Divisez le nombre de jours par 7. La calculatrice montre à la fois le total en semaines entières et la décomposition détaillée.' },
      { q: 'Peut-on calculer des jours ouvrés pour un projet ?', a: 'Oui. Le chiffre « Jours ouvrés » exclut samedis et dimanches. Pour la planification, soustrayez les jours fériés connus pour obtenir les jours ouvrés nets.' },
      { q: 'Combien de jours y a-t-il dans chaque mois ?', a: 'Janvier, mars, mai, juillet, août, octobre et décembre ont 31 jours. Avril, juin, septembre et novembre ont 30 jours. Février a 28 jours (ou 29 lors d\'une année bissextile). Aide-mémoire : comptez sur vos phalanges — les phalanges correspondent aux mois de 31 jours.' },
      { q: 'Puis-je trouver une date d\'arrivée en ajoutant des jours ?', a: 'Cette calculatrice trouve la différence entre deux dates connues. Pour trouver une date en ajoutant des jours, entrez la date de départ et ajustez la date d\'arrivée jusqu\'à obtenir le nombre de jours souhaité.' },
      { q: 'Comment calculer une ancienneté professionnelle ?', a: 'Entrez votre date d\'embauche comme date de début et la date d\'aujourd\'hui (ou de fin) comme date de fin. Le résultat en années, mois et jours est votre ancienneté exacte. Exemple : début le 1er mars 2020, aujourd\'hui le 8 juin 2026 = 6 ans, 3 mois, 7 jours.' },
      { q: 'Qu\'est-ce que le format de date ISO 8601 ?', a: 'L\'ISO 8601 est le standard international de représentation des dates en AAAA-MM-JJ (ex. 2025-12-31). Il élimine l\'ambiguïté des formats comme 05/06/2025, qui peut signifier le 5 juin ou le 6 mai selon le pays.' },
      { q: 'Combien de jours ouvrés y a-t-il dans une année type ?', a: 'Une année standard a 365 jours avec 52 week-ends (104 jours), laissant 261 jours ouvrés (lun–ven). En soustrayant les jours fériés (généralement 8–13 selon le pays), on obtient environ 248–253 jours ouvrés nets par an.' },
    ],
  },
  lt: {
    description: 'Pasirinkite pradžios ir pabaigos datą, kad apskaičiuotumėte tikslų skirtumą. Rezultatas rodomas metais, mėnesiais, savaitėmis ir dienomis, taip pat bendrais skaičiais. Darbo dienos (pir–pen) ir savaitgaliai skaičiuojami atskirai — naudinga projektų planavimui ir terminų skaičiavimui.\n\nDatų skaičiavimai vertinami daugelyje sričių. Projektų vadovai naudoja juos sprintams ir etapams stebėti. Teisininkai skaičiuoja ieškinio senaties terminus ir sutarčių laikotarpius. Personalo specialistai skaičiuoja darbo stažą išmokoms nustatyti. Darbo dienų skaičius ypač praktiškas — žinant, kiek darbo dienų tenka projekto langui, lengviau paskirstyti išteklius.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuoti dienų skaičių tarp dviejų datų?', a: 'Skaičiuotuvas atima pradžios datą iš pabaigos datos. Pavyzdžiui, nuo 2024 m. sausio 1 d. iki 2024 m. liepos 1 d. = 182 dienos (2024 m. — keliamieji metai).' },
      { q: 'Kaip skaičiuojamos darbo dienos?', a: 'Darbo dienos yra nuo pirmadienio iki penktadienio. Skaičiuotuvas klasifikuoja kiekvieną dieną. Valstybinės šventės neišskaitomos, nes jos skiriasi pagal šalį.' },
      { q: 'Kiek dienų yra mėnesyje?', a: 'Mėnesiai turi 28, 29, 30 arba 31 dieną. Vidutinis mėnuo yra apie 30,44 dienos. Skaičiuotuvas naudoja tikslias kalendorines datas.' },
      { q: 'Kaip apskaičiuoti savaičių skaičių tarp datų?', a: 'Padalinkite dienų skaičių iš 7. Skaičiuotuvas rodo tiek bendrą pilnų savaičių skaičių, tiek išsamų išskaidymą.' },
      { q: 'Ar galima apskaičiuoti darbo dienas projektui?', a: 'Taip. „Darbo dienų" skaičius neapima šeštadienių ir sekmadienių. Planuodami projektą, atimkite žinomas valstybines šventes.' },
      { q: 'Kiek dienų yra kiekviename mėnesyje?', a: 'Sausis, kovas, gegužė, liepa, rugpjūtis, spalis ir gruodis turi 31 dieną. Balandis, birželis, rugsėjis ir lapkritis turi 30 dienų. Vasaris turi 28 dienas (arba 29 keliamuosiuose metuose).' },
      { q: 'Ar galiu rasti datą pridėjus tam tikrą dienų skaičių?', a: 'Šis skaičiuotuvas randa skirtumą tarp dviejų žinomų datų. Norėdami rasti pabaigos datą pridėjus dienas, įveskite pradžios datą ir koreguokite pabaigos datą, kol gausite norimą dienų skaičių.' },
      { q: 'Kaip apskaičiuoti darbo stažą?', a: 'Įveskite darbo pradžios datą kaip pradžios datą, o šiandien (arba pabaigos datą) — kaip pabaigos datą. Rezultatas metais, mėnesiais ir dienomis yra jūsų tikslus darbo stažas. Pvz.: pradėjote 2020 m. kovo 1 d., šiandien 2026 m. birželio 8 d. = 6 metai, 3 mėnesiai, 7 dienos.' },
      { q: 'Kas yra ISO 8601 datos formatas?', a: 'ISO 8601 yra tarptautinis datos pateikimo standartas MMMM-MM-DD formatu (pvz., 2025-12-31). Jis pašalina dviprasmybę tokiuose formatuose kaip 05.06.2025, kuris skirtingose šalyse gali reikšti gegužės 6 ar birželio 5 d.' },
      { q: 'Kiek darbo dienų yra per metus?', a: 'Standartiniais metais yra 365 dienos su 52 savaitgaliais (104 dienos), paliekant 261 darbo dieną (pir–pen). Atėmus valstybines šventes (paprastai 8–13 dienų, priklausomai nuo šalies), gaunama apie 248–253 grynos darbo dienos.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/date-diff') };
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
    url: `https://www.utilixi.com/${locale}/calculator/date-diff`,
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
        <DateDiffCalculator locale={locale} />
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

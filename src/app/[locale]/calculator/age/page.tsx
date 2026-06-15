import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import AgeCalculator from './AgeCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/date-diff', label: 'Date Difference Calculator' }, { href: '/calculator/pregnancy', label: 'Pregnancy Calculator' }, { href: '/calculator/biological-age', label: 'Biological Age Calculator' }, { href: '/calculator/ovulation', label: 'Ovulation Calculator' }, { href: '/tools/countdown', label: 'Countdown Timer' }],
  ru: [{ href: '/calculator/date-diff', label: 'Разница дат' }, { href: '/calculator/pregnancy', label: 'Калькулятор беременности' }, { href: '/calculator/biological-age', label: 'Биологический возраст' }, { href: '/calculator/ovulation', label: 'Калькулятор овуляции' }, { href: '/tools/countdown', label: 'Таймер обратного отсчёта' }],
  uk: [{ href: '/calculator/date-diff', label: 'Різниця дат' }, { href: '/calculator/pregnancy', label: 'Калькулятор вагітності' }, { href: '/calculator/biological-age', label: 'Біологічний вік' }, { href: '/calculator/ovulation', label: 'Калькулятор овуляції' }, { href: '/tools/countdown', label: 'Таймер зворотного відліку' }],
  fr: [{ href: '/calculator/date-diff', label: 'Différence de dates' }, { href: '/calculator/pregnancy', label: 'Calculatrice de grossesse' }, { href: '/calculator/biological-age', label: 'Âge biologique' }, { href: '/calculator/ovulation', label: "Calculatrice d'Ovulation" }, { href: '/tools/countdown', label: 'Compte à rebours' }],
  lt: [{ href: '/calculator/date-diff', label: 'Datų skirtumas' }, { href: '/calculator/pregnancy', label: 'Nėštumo skaičiuotuvas' }, { href: '/calculator/biological-age', label: 'Biologinis amžius' }, { href: '/calculator/ovulation', label: 'Ovuliacijos skaičiuotuvas' }, { href: '/tools/countdown', label: 'Atgalinio skaičiavimo laikmatis' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Age Calculator — Calculate Exact Age in Years, Months & Days', description: 'Free age calculator. Find your exact age in years, months and days from your date of birth. Shows total days, weeks, and days until your next birthday.', h1: 'Age Calculator', subtitle: 'Enter your date of birth to find your exact age in years, months, and days.' },
  ru: { title: 'Калькулятор возраста — точный возраст в годах, месяцах и днях', description: 'Бесплатный калькулятор возраста. Узнайте точный возраст в годах, месяцах и днях по дате рождения. Показывает общее количество дней и дней до следующего дня рождения.', h1: 'Калькулятор возраста', subtitle: 'Введите дату рождения, чтобы узнать точный возраст в годах, месяцах и днях.' },
  uk: { title: 'Калькулятор віку — точний вік у роках, місяцях і днях', description: 'Безкоштовний калькулятор віку. Дізнайтесь точний вік у роках, місяцях і днях за датою народження. Показує загальну кількість днів і днів до наступного дня народження.', h1: 'Калькулятор віку', subtitle: 'Введіть дату народження, щоб дізнатися точний вік у роках, місяцях і днях.' },
  fr: { title: 'Quel âge ai-je ? Calculatrice d\'âge exact en ligne', description: 'Calculez votre âge exact en années, mois et jours à partir de votre date de naissance. Résultat instantané : âge précis, total de jours vécus et décompte jusqu\'à votre prochain anniversaire.', h1: 'Calculatrice d\'âge', subtitle: 'Entrez votre date de naissance pour connaître votre âge exact en années, mois et jours.' },
  lt: { title: 'Amžiaus Skaičiuotuvas — Tikslus amžius metais, mėnesiais ir dienomis', description: 'Nemokamas amžiaus skaičiuotuvas. Sužinokite tikslų amžių metais, mėnesiais ir dienomis pagal gimimo datą. Rodo bendrą dienų skaičių ir dienas iki kito gimtadienio.', h1: 'Amžiaus skaičiuotuvas', subtitle: 'Įveskite gimimo datą ir sužinokite tikslų amžių metais, mėnesiais ir dienomis.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Enter your date of birth to instantly calculate your exact age in years, months, and days. The calculator also shows your total days and weeks lived, and how many days are left until your next birthday.\n\nAge carries legal and social significance across many areas of life. Different jurisdictions set minimum ages for driving (16–18), voting (18 in most countries), drinking (18–21), and retirement (60–67 depending on the pension system). Knowing your exact age in days or months also matters for insurance eligibility, academic enrollment deadlines, and travel documents that expire on specific birthdays.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is exact age calculated?', a: 'The calculator counts the full years, months, and remaining days between your birth date and today. For example, if you were born on March 15, 1990, and today is May 20, 2025, your age is 35 years, 2 months, and 5 days.' },
      { q: 'How many days have I lived?', a: 'Multiply your age in years by 365.25 (to account for leap years) as a quick estimate. The calculator computes the exact number by counting every day from your birth date to today.' },
      { q: 'What is a leap year and how does it affect age?', a: 'A leap year has 366 days instead of 365, occurring every 4 years (with exceptions for century years). If you were born on February 29, your "official" birthday is celebrated on March 1 in non-leap years in most countries.' },
      { q: 'How do I calculate my age in months?', a: 'Multiply completed years by 12 and add the remaining months. For example, 25 years and 3 months = 25 × 12 + 3 = 303 months. The calculator shows this total automatically.' },
      { q: 'How many weeks are in a year?', a: 'There are exactly 52 weeks and 1 day in a regular year (365 days ÷ 7 = 52.14...), and 52 weeks and 2 days in a leap year. Over a lifetime of 70 years, that\'s approximately 3,652 weeks.' },
      { q: 'What was the oldest verified human age?', a: 'The oldest verified human age belongs to Jeanne Calment of France — 122 years and 164 days (born 1875, died 1997). People who reach 100 are called "centenarians"; those who reach 110+ are called "supercentenarians".' },
      { q: 'How is age calculated for legal purposes?', a: 'For legal purposes, age is determined by the calendar date on the birth certificate, regardless of time zone or exact time of birth. You turn a specific age at the very beginning of your birthday — i.e., at 00:00:00 on that calendar date in the relevant jurisdiction.' },
      { q: 'How many days until I turn a milestone age (e.g., 30 or 50)?', a: 'To find the days until your next birthday, use the "days to next birthday" value shown by this calculator. For further milestones, calculate the exact target date and use a Date Difference Calculator to count from today to that date.' },
      { q: 'What is a half birthday?', a: 'A half birthday falls exactly 6 months after your birth date. For someone born on August 31, the half birthday is February 28 (or 29 in a leap year). Half birthdays are sometimes celebrated for children whose actual birthday falls during school holidays.' },
      { q: 'Does daylight saving time affect age calculations?', a: 'No — age is calculated purely based on calendar dates, not clock time. A person born on a daylight saving transition day has the same birthday as anyone else born on that calendar date. Time-of-birth only becomes relevant for rare legal purposes such as twin birth-order disputes.' },
    ],
  },
  ru: {
    description: 'Введите дату рождения, чтобы мгновенно узнать точный возраст в годах, месяцах и днях. Калькулятор также показывает общее количество прожитых дней и недель, а также сколько дней осталось до следующего дня рождения.\n\nВозраст имеет юридическое и социальное значение во многих сферах жизни. В разных странах установлены разные минимальные возрасты для вождения (16–18 лет), голосования (18 лет в большинстве стран), употребления алкоголя (18–21 год) и выхода на пенсию (60–67 лет). Точный возраст в днях или месяцах также важен для страховых полисов, зачисления на учёбу и срока действия документов.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитывается точный возраст?', a: 'Калькулятор считает полные годы, месяцы и оставшиеся дни между датой рождения и сегодняшним днём. Например, если вы родились 15 марта 1990 года, а сегодня 20 мая 2025 года, ваш возраст — 35 лет, 2 месяца и 5 дней.' },
      { q: 'Сколько дней я прожил?', a: 'Приблизительно — умножьте возраст в годах на 365,25 (учитывая високосные годы). Калькулятор вычисляет точное число, считая каждый день от даты рождения до сегодняшнего дня.' },
      { q: 'Что такое високосный год и как он влияет на возраст?', a: 'Високосный год имеет 366 дней, а не 365, и наступает каждые 4 года. Если вы родились 29 февраля, в большинстве стран ваш день рождения отмечается 1 марта в невисокосные годы.' },
      { q: 'Как посчитать свой возраст в месяцах?', a: 'Умножьте полные годы на 12 и прибавьте оставшиеся месяцы. Например, 25 лет и 3 месяца = 25 × 12 + 3 = 303 месяца. Калькулятор показывает это значение автоматически.' },
      { q: 'Сколько недель в году?', a: 'В обычном году ровно 52 недели и 1 день (365 ÷ 7 = 52,14...), в високосном — 52 недели и 2 дня. За 70 лет жизни это примерно 3652 недели.' },
      { q: 'Каков самый старый подтверждённый возраст человека?', a: 'Рекорд принадлежит Жанне Кальман из Франции — 122 года и 164 дня (родилась в 1875, умерла в 1997). Людей, достигших 100 лет, называют «столетниками», а перешагнувших 110 лет — «суперстолетниками».' },
      { q: 'Как рассчитывается возраст для юридических целей?', a: 'В юридических целях возраст определяется по дате рождения в свидетельстве о рождении, независимо от часового пояса или точного времени рождения. Вы достигаете нужного возраста в начале дня рождения — в 00:00:00 по местному времени.' },
      { q: 'Сколько дней осталось до юбилея (30, 50 лет)?', a: 'Для определения дней до ближайшего дня рождения используйте значение «дней до следующего дня рождения» из этого калькулятора. Для более далёких дат рассчитайте точную дату юбилея и воспользуйтесь калькулятором разницы дат.' },
      { q: 'Что такое «полдня рождения»?', a: '«Полдня рождения» приходится ровно на 6 месяцев после дня рождения. У родившихся 31 августа это будет 28 (или 29) февраля. Иногда такой «полпраздник» отмечают для детей, чей день рождения совпадает со школьными каникулами.' },
      { q: 'Влияет ли переход на летнее время на расчёт возраста?', a: 'Нет — возраст рассчитывается исключительно по календарным датам, а не по часовому времени. Человек, рождённый в день перехода на летнее время, имеет тот же день рождения, что и все другие, рождённые в этот день.' },
    ],
  },
  uk: {
    description: 'Введіть дату народження, щоб миттєво дізнатись точний вік у роках, місяцях і днях. Калькулятор також показує загальну кількість прожитих днів і тижнів, а також скільки днів залишилось до наступного дня народження.\n\nВік має юридичне та соціальне значення в багатьох сферах. У різних країнах встановлено різний мінімальний вік для водіння (16–18 років), голосування (18 у більшості країн), вживання алкоголю (18–21 рік) і виходу на пенсію (60–67 залежно від пенсійної системи). Точний вік у днях або місяцях також важливий для страхових полісів, вступу до навчальних закладів та строку дії документів.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розраховується точний вік?', a: 'Калькулятор рахує повні роки, місяці і дні між датою народження і сьогоднішнім днем. Наприклад, якщо ви народились 15 березня 1990 року, а сьогодні 20 травня 2025 року, ваш вік — 35 років, 2 місяці і 5 днів.' },
      { q: 'Скільки днів я прожив?', a: 'Приблизно — помножте вік у роках на 365,25. Калькулятор обчислює точне число, рахуючи кожен день від дати народження до сьогодні.' },
      { q: 'Що таке високосний рік і як він впливає на вік?', a: 'Високосний рік має 366 днів замість 365 і настає кожні 4 роки. Якщо ви народились 29 лютого, у більшості країн ваш день народження відзначається 1 березня у невисокосні роки.' },
      { q: 'Як порахувати свій вік у місяцях?', a: 'Помножте повні роки на 12 і додайте місяці. Наприклад, 25 років і 3 місяці = 25 × 12 + 3 = 303 місяці.' },
      { q: 'Скільки тижнів у році?', a: 'У звичайному році рівно 52 тижні і 1 день (365 ÷ 7 = 52,14...), у високосному — 52 тижні і 2 дні.' },
      { q: 'Який найстаріший підтверджений вік людини?', a: 'Рекорд належить Жанні Кальман з Франції — 122 роки і 164 дні (народилась у 1875, померла у 1997). Людей, які досягли 100 років, називають «столітниками», а тих, хто перетнув 110-річний рубіж — «суперстолітниками».' },
      { q: 'Як розраховується вік для юридичних цілей?', a: 'Для юридичних цілей вік визначається за датою народження у свідоцтві про народження, незалежно від часового поясу. Ви досягаєте певного віку на початку дня народження — о 00:00:00 за місцевим часом.' },
      { q: 'Скільки днів залишилося до ювілею (30, 50 тощо)?', a: 'Для визначення днів до найближчого дня народження скористайтесь значенням «днів до наступного дня народження» з цього калькулятора. Для більш далеких дат розрахуйте точну дату ювілею та скористайтесь калькулятором різниці дат.' },
      { q: 'Що таке «південь народження»?', a: '«Південь народження» припадає рівно на 6 місяців після дня народження. У тих, хто народився 31 серпня, — це 28 (або 29) лютого. Іноді такий «напівсвяткування» відзначають для дітей, чий день народження збігається зі шкільними канікулами.' },
      { q: 'Чи впливає перехід на літній час на розрахунок віку?', a: 'Ні — вік розраховується виключно за календарними датами, а не за годинниковим часом. Людина, народжена в день переходу на літній час, має той самий день народження, що й усі інші, народжені в цей день.' },
    ],
  },
  fr: {
    description: 'Entrez votre date de naissance pour calculer instantanément votre âge exact en années, mois et jours. La calculatrice affiche également le nombre total de jours et semaines vécus, ainsi que les jours restants jusqu\'à votre prochain anniversaire.\n\nL\'âge revêt une importance juridique et sociale dans de nombreux domaines. Les différents pays fixent des âges minimums pour conduire (16–18 ans), voter (18 ans dans la plupart des pays), consommer de l\'alcool (18–21 ans) et partir à la retraite (62–67 ans selon le pays). Connaître son âge exact en jours ou en mois importe aussi pour les polices d\'assurance, les inscriptions scolaires et les documents de voyage qui expirent à des anniversaires précis.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment est calculé l\'âge exact ?', a: 'La calculatrice compte les années, mois et jours complets entre votre date de naissance et aujourd\'hui. Par exemple, si vous êtes né le 15 mars 1990 et qu\'aujourd\'hui c\'est le 20 mai 2025, votre âge est 35 ans, 2 mois et 5 jours.' },
      { q: 'Combien de jours ai-je vécu ?', a: 'En estimation rapide, multipliez votre âge par 365,25. La calculatrice compte exactement chaque jour depuis votre date de naissance jusqu\'à aujourd\'hui.' },
      { q: 'Qu\'est-ce qu\'une année bissextile ?', a: 'Une année bissextile a 366 jours au lieu de 365, se produisant tous les 4 ans. Si vous êtes né le 29 février, votre anniversaire est généralement fêté le 1er mars les années non bissextiles.' },
      { q: 'Comment calculer mon âge en mois ?', a: 'Multipliez les années complètes par 12 et ajoutez les mois restants. Par exemple, 25 ans et 3 mois = 25 × 12 + 3 = 303 mois.' },
      { q: 'Combien de semaines y a-t-il dans une année ?', a: 'Il y a exactement 52 semaines et 1 jour dans une année normale (365 ÷ 7 = 52,14...) et 52 semaines et 2 jours dans une année bissextile.' },
      { q: 'Quel est l\'âge humain vérifié le plus élevé ?', a: 'Le record appartient à Jeanne Calment (France) : 122 ans et 164 jours (née en 1875, décédée en 1997). Les personnes atteignant 100 ans sont des "centenaires", celles dépassant 110 ans sont des "supercentenaires".' },
      { q: 'Comment l\'âge est-il calculé à des fins juridiques ?', a: 'À des fins juridiques, l\'âge est déterminé par la date du certificat de naissance, indépendamment du fuseau horaire. Vous atteignez un âge spécifique au début de votre jour d\'anniversaire, soit à 00:00:00 ce jour-là.' },
      { q: 'Combien de jours avant un âge clé (30, 50 ans...) ?', a: 'Pour connaître les jours jusqu\'à votre prochain anniversaire, utilisez la valeur affichée par cette calculatrice. Pour des jalons plus lointains, calculez la date exacte de votre anniversaire cible et utilisez la calculatrice de différence de dates.' },
      { q: 'Qu\'est-ce qu\'un demi-anniversaire ?', a: 'Un demi-anniversaire tombe exactement 6 mois après votre date de naissance. Pour quelqu\'un né le 31 août, ce serait le 28 (ou 29 en année bissextile) février. Cette date est parfois célébrée pour les enfants dont l\'anniversaire tombe pendant les vacances scolaires.' },
      { q: 'L\'heure d\'été affecte-t-elle le calcul de l\'âge ?', a: 'Non — l\'âge est calculé purement sur la base des dates calendaires, pas de l\'heure. Une personne née un jour de changement d\'heure a le même anniversaire que toute autre personne née à cette date.' },
    ],
  },
  lt: {
    description: 'Įveskite gimimo datą, kad akimirksniu sužinotumėte tikslų amžių metais, mėnesiais ir dienomis. Skaičiuotuvas taip pat rodo bendrą pragyventų dienų ir savaičių skaičių bei dienas iki kito gimtadienio.\n\nAmžius turi teisinę ir socialinę reikšmę daugelyje gyvenimo sričių. Skirtingose šalyse nustatytas skirtingas minimalus amžius vairuoti (16–18 m.), balsuoti (18 m. daugumoje šalių), vartoti alkoholį (18–21 m.) ir išeiti į pensiją (60–67 m.). Tikslus amžius dienomis ar mėnesiais taip pat svarbus draudimo polisams, įstojimui į mokyklas ir kelionių dokumentams, kurie baigia galioti konkrečių gimtadienių dienomis.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuojamas tikslus amžius?', a: 'Skaičiuotuvas skaičiuoja pilnus metus, mėnesius ir dienas tarp gimimo datos ir šiandien. Pavyzdžiui, jei gimėte 1990 m. kovo 15 d., o šiandien 2025 m. gegužės 20 d., jūsų amžius yra 35 metai, 2 mėnesiai ir 5 dienos.' },
      { q: 'Kiek dienų aš gyvenau?', a: 'Apytiksliai — padauginkite amžių metais iš 365,25. Skaičiuotuvas apskaičiuoja tikslų skaičių, skaičiuodamas kiekvieną dieną nuo gimimo datos iki šiandien.' },
      { q: 'Kas yra keliamieji metai?', a: 'Keliamieji metai turi 366 dienas vietoj 365, pasitaikantys kas 4 metus. Jei gimėte vasario 29 d., daugumoje šalių gimtadienis švenčiamas kovo 1 d. nekeliamaisiais metais.' },
      { q: 'Kaip apskaičiuoti amžių mėnesiais?', a: 'Padauginkite pilnus metus iš 12 ir pridėkite mėnesius. Pavyzdžiui, 25 metai ir 3 mėnesiai = 25 × 12 + 3 = 303 mėnesiai.' },
      { q: 'Kiek savaičių yra metuose?', a: 'Paprastuose metuose yra lygiai 52 savaitės ir 1 diena (365 ÷ 7 = 52,14...), keliamaisiais metais — 52 savaitės ir 2 dienos.' },
      { q: 'Koks yra patvirtintas vyriausias žmogaus amžius?', a: 'Rekordas priklauso Jeanne Calment iš Prancūzijos — 122 metai ir 164 dienos (gimė 1875, mirė 1997). Žmonės, pasiekę 100 metų, vadinami „šimtamečiais", o 110+ — „supervyresniais".' },
      { q: 'Kaip amžius apskaičiuojamas teisiniais tikslais?', a: 'Teisiniais tikslais amžius nustatomas pagal gimimo liudijimo datą, neatsižvelgiant į laiko juostą. Tam tikrą amžių pasiekiate gimtadienio pradžioje — 00:00:00 tą kalendorinę dieną.' },
      { q: 'Kiek dienų iki jubiliejinio amžiaus (30, 50 ir kt.)?', a: 'Norėdami sužinoti dienas iki artimiausio gimtadienio, naudokite šiame skaičiuotuve rodomą „dienų iki kito gimtadienio" reikšmę. Tolimesniems jubiliejams apskaičiuokite tikslią datą ir naudokite datų skirtumo skaičiuotuvą.' },
      { q: 'Kas yra „pusė gimtadienio"?', a: '„Pusė gimtadienio" patenka lygiai 6 mėnesius po gimimo datos. Gimusiems rugpjūčio 31 d. tai būtų vasario 28 (arba 29 keliamuosiuose metuose) diena. Kartais tai švenčiama vaikų, kurių gimtadienis sutampa su mokyklos atostogomis.' },
      { q: 'Ar vasaros laikas veikia amžiaus skaičiavimą?', a: 'Ne — amžius skaičiuojamas tik pagal kalendorines datas, o ne laikrodžio laiką. Žmogus, gimęs laikrodžių sukimo dieną, turi tą patį gimtadienį kaip ir kiti tą dieną gimę žmonės.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/age', meta);
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
        {meta.subtitle && <p className={styles.page__subtitle}>{meta.subtitle}</p>}
        <RelatedTools locale={locale} tools={related} />
        <ToolActions />
        <AgeCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
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

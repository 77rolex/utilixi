import ToolActions from '@/components/ui/ToolActions';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import LifePathCalculator from './LifePathCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Life Path Number Calculator — Free Numerology Calculator',
    description: 'Calculate your Life Path Number free online. Enter your date of birth and discover your core numerology number, personality traits and destiny insights.',
    h1: 'Life Path Number Calculator',
  },
  ru: {
    title: 'Число жизненного пути — Онлайн нумерология бесплатно',
    description: 'Рассчитайте число жизненного пути онлайн бесплатно. Введите дату рождения и узнайте своё ключевое число нумерологии, черты личности и предназначение.',
    h1: 'Число жизненного пути — калькулятор',
  },
  uk: {
    title: 'Число Життєвого Шляху — Нумерологія Онлайн Безкоштовно',
    description: 'Розрахуйте число життєвого шляху онлайн безкоштовно. Введіть дату народження і дізнайтеся своє ключове число нумерології та призначення.',
    h1: 'Число життєвого шляху — калькулятор',
  },
  fr: {
    title: 'Calculateur Chemin de Vie — Numérologie Gratuite en Ligne',
    description: 'Calculez votre nombre chemin de vie gratuitement en ligne. Entrez votre date de naissance et découvrez votre nombre numérologique clé et vos traits de personnalité.',
    h1: 'Calculateur du Chemin de Vie',
  },
  lt: {
    title: 'Gyvenimo Kelio Skaičiaus Skaičiuotuvas — Nemokama Numerologija',
    description: 'Apskaičiuokite savo gyvenimo kelio skaičių nemokamai internete. Įveskite gimimo datą ir sužinokite savo pagrindinį numerologinį skaičių ir asmenybės bruožus.',
    h1: 'Gyvenimo kelio skaičiaus skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Your Life Path Number is the most significant number in your numerology chart. It is calculated by summing all the digits of your full date of birth and reducing them to a single digit — unless you arrive at the master numbers 11, 22 or 33, which are considered especially powerful and are never reduced further. This number reveals the overarching themes of your life, the lessons you are here to learn and the natural talents you carry into the world.\n\nUnlike other numerology numbers that relate to your name or personality, the Life Path Number is fixed from birth and cannot change. Numerologists consider it the foundation of your chart — the number that describes the broad path your soul chose before incarnation. Whether you believe in numerology or simply enjoy self-reflection, calculating your Life Path Number is a fascinating starting point for understanding your own nature.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is the Life Path Number calculated?', a: 'Sum all the digits of your full birth date (day, month and year combined). Reduce the total by adding its digits together until you reach a single digit. Stop if you reach 11, 22 or 33 — these are master numbers.' },
      { q: 'What is the difference between Life Path and Destiny Number?', a: 'Both use your birth date, but the method differs. The Life Path sums all digits together first, then reduces. The Destiny Number reduces the day, month and year separately before adding them. The results can differ.' },
      { q: 'What are master numbers in numerology?', a: '11, 22 and 33 are called master numbers. They are not reduced to a single digit because they carry a heightened vibration and special significance in numerology. People with these numbers often have an intense life mission.' },
      { q: 'Can two people have the same Life Path Number but be very different?', a: 'Yes. The Life Path Number describes core themes and tendencies, not your entire personality. Other numbers in your chart — such as the Soul Number and Personality Number — add unique layers that make every person distinct.' },
      { q: 'Is the Life Path Number the same as the Birth Number?', a: 'They are often used interchangeably but can differ depending on which tradition you follow. Some systems call a simple day-of-birth reduction the Birth Number, while the Life Path uses the full date.' },
      { q: 'Which Life Path Numbers are considered most compatible?', a: 'Traditionally, 1 and 5 are seen as compatible (both love independence), 2 and 6 pair well (both nurturing), and 3 and 9 harmonise around creativity and idealism. However, any two numbers can build a strong relationship with awareness.' },
      { q: 'Do Life Path numbers carry different energy in Western vs. Pythagorean numerology?', a: 'Pythagorean numerology (the most common Western system) is what this calculator uses. Chaldean numerology uses a different number table and assigns slightly different values to letters, but the Life Path is still date-based.' },
      { q: 'What does a Life Path 11 mean?', a: 'Life Path 11 is the master number of intuition and spiritual leadership. People with this number are often highly sensitive, visionary and drawn to creative or healing professions. The challenge is converting inspiration into practical results.' },
      { q: 'Can my Life Path Number change over time?', a: 'No — it is determined by your fixed birth date and never changes. However, numerologists use other cycles (Personal Year Numbers, for instance) to describe the shifting energies of different periods in your life.' },
      { q: 'Is numerology scientifically proven?', a: 'Numerology is a metaphysical tradition, not a science. There is no empirical evidence that numbers determine personality or fate. It is best used as a reflective tool — a mirror for self-exploration rather than a predictive system.' },
    ],
  },
  ru: {
    description: 'Число жизненного пути — наиболее значимое число в нумерологической карте. Оно вычисляется путём сложения всех цифр полной даты рождения с последующим приведением к одной цифре — если только не получаются мастер-числа 11, 22 или 33, которые считаются особенно мощными и не сводятся дальше. Это число раскрывает главные темы вашей жизни, уроки, которые вы пришли усвоить, и природные таланты.\n\nВ отличие от других нумерологических чисел, связанных с именем или личностью, число жизненного пути фиксируется с рождения и не меняется. Нумерологи рассматривают его как основу карты — число, описывающее широкий путь, который выбрала ваша душа до воплощения. Независимо от того, верите ли вы в нумерологию или просто любите самопознание, расчёт числа жизненного пути — увлекательная точка отсчёта.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитывается число жизненного пути?', a: 'Сложите все цифры полной даты рождения (день, месяц и год вместе). Сведите сумму к одной цифре, складывая её цифры. Остановитесь, если получите 11, 22 или 33 — это мастер-числа.' },
      { q: 'Чем число жизненного пути отличается от числа судьбы?', a: 'Оба используют дату рождения, но метод различается. В числе жизненного пути все цифры складываются вместе, затем редуцируются. В числе судьбы день, месяц и год редуцируются отдельно, затем складываются.' },
      { q: 'Что такое мастер-числа в нумерологии?', a: '11, 22 и 33 — мастер-числа. Они не редуцируются до одной цифры, так как несут повышенную вибрацию. Люди с этими числами часто имеют интенсивную жизненную миссию.' },
      { q: 'Могут ли два человека с одинаковым числом жизненного пути сильно отличаться?', a: 'Да. Число жизненного пути описывает ключевые темы и тенденции, но не всю личность. Другие числа карты — число души, число личности — добавляют уникальные слои.' },
      { q: 'Одинаковы ли число жизненного пути и число рождения?', a: 'Их часто используют взаимозаменяемо, но в разных традициях они могут различаться. Некоторые системы называют числом рождения редукцию только дня рождения, тогда как число жизненного пути использует полную дату.' },
      { q: 'Какие числа жизненного пути считаются наиболее совместимыми?', a: 'Традиционно 1 и 5 хорошо сочетаются (оба любят независимость), 2 и 6 гармонируют (оба заботливы), 3 и 9 схожи творчеством и идеализмом. Но любая пара может построить крепкие отношения.' },
      { q: 'Есть ли разница между западной и пифагорейской нумерологией?', a: 'Пифагорейская нумерология — наиболее распространённая западная система, которую использует этот калькулятор. Халдейская нумерология применяет иную таблицу, но число жизненного пути по-прежнему основано на дате.' },
      { q: 'Что означает число жизненного пути 11?', a: 'Число 11 — мастер-число интуиции и духовного лидерства. Такие люди часто высокочувствительны, обладают видением и тяготеют к творческим или целительским профессиям. Вызов — воплощать вдохновение на практике.' },
      { q: 'Меняется ли число жизненного пути со временем?', a: 'Нет — оно определяется фиксированной датой рождения. Однако нумерологи используют другие циклы (например, число личного года), чтобы описать меняющиеся энергии разных периодов жизни.' },
      { q: 'Является ли нумерология научно доказанной?', a: 'Нумерология — метафизическая традиция, а не наука. Эмпирических доказательств того, что числа определяют личность или судьбу, не существует. Её лучше использовать как инструмент рефлексии и самопознания.' },
    ],
  },
  uk: {
    description: 'Число життєвого шляху — найзначиміше число у нумерологічній карті. Воно обчислюється шляхом складання всіх цифр повної дати народження з наступним зведенням до однієї цифри — якщо тільки не виходять майстер-числа 11, 22 або 33, які вважаються особливо потужними і не зводяться далі. Це число розкриває головні теми вашого життя, уроки, які ви прийшли засвоїти, та природні таланти.\n\nНа відміну від інших нумерологічних чисел, пов\'язаних з іменем або особистістю, число життєвого шляху фіксується з народження та не змінюється. Нумерологи розглядають його як основу карти — число, що описує широкий шлях, який обрала ваша душа до втілення. Незалежно від того, чи вірите ви в нумерологію, чи просто любите самопізнання, розрахунок числа життєвого шляху — захоплива відправна точка.',
    faqTitle: 'Часті питання',
    faqs: [
      { q: 'Як розраховується число життєвого шляху?', a: 'Складіть усі цифри повної дати народження (день, місяць і рік разом). Зведіть суму до однієї цифри, складаючи її цифри. Зупиніться, якщо отримаєте 11, 22 або 33 — це майстер-числа.' },
      { q: 'Чим число життєвого шляху відрізняється від числа долі?', a: 'Обидва використовують дату народження, але метод різний. У числі життєвого шляху всі цифри складаються разом, потім редукуються. У числі долі день, місяць і рік редукуються окремо, потім складаються.' },
      { q: 'Що таке майстер-числа в нумерології?', a: '11, 22 і 33 — майстер-числа. Вони не редукуються до однієї цифри, оскільки несуть підвищену вібрацію. Люди з цими числами часто мають інтенсивну життєву місію.' },
      { q: 'Чи можуть два люди з однаковим числом сильно відрізнятися?', a: 'Так. Число життєвого шляху описує ключові теми та тенденції, але не всю особистість. Інші числа карти — число душі, число особистості — додають унікальні шари.' },
      { q: 'Чи однакові число життєвого шляху та число народження?', a: 'Їх часто вживають як синоніми, але в різних традиціях вони можуть відрізнятися. Деякі системи називають числом народження редукцію лише дня, тоді як число шляху використовує повну дату.' },
      { q: 'Які числа вважаються найбільш сумісними?', a: 'Традиційно 1 і 5 гармоніють (обидва люблять незалежність), 2 і 6 — турботливі натури, 3 і 9 схожі творчістю та ідеалізмом. Але будь-яка пара може побудувати міцні стосунки.' },
      { q: 'Яка різниця між західною та піфагорійською нумерологією?', a: 'Піфагорійська нумерологія — найпоширеніша західна система, яку використовує цей калькулятор. Халдейська нумерологія застосовує іншу таблицю, але число життєвого шляху все одно базується на даті.' },
      { q: 'Що означає число 11?', a: 'Число 11 — майстер-число інтуїції та духовного лідерства. Такі люди часто висококочутливі, мають бачення і тяжіють до творчих або цілительських професій. Виклик — втілювати натхнення на практиці.' },
      { q: 'Чи змінюється число з часом?', a: 'Ні — воно визначається фіксованою датою народження. Однак нумерологи використовують інші цикли (число особистого року) для опису мінливих енергій різних періодів.' },
      { q: 'Чи є нумерологія науково доведеною?', a: 'Нумерологія — метафізична традиція, а не наука. Емпіричних доказів того, що числа визначають особистість або долю, немає. Її краще використовувати як інструмент рефлексії та самопізнання.' },
    ],
  },
  fr: {
    description: 'Votre Nombre Chemin de Vie est le nombre le plus significatif de votre carte numérologique. Il est calculé en additionnant tous les chiffres de votre date de naissance complète, puis en réduisant le total à un seul chiffre — sauf si vous obtenez les nombres maîtres 11, 22 ou 33, considérés comme particulièrement puissants et jamais réduits davantage. Ce nombre révèle les grands thèmes de votre vie, les leçons à apprendre et les talents naturels que vous portez en vous.\n\nContrairement aux autres nombres numérologique liés à votre prénom ou personnalité, le Nombre Chemin de Vie est fixé dès la naissance et ne change jamais. Les numérologues le considèrent comme le fondement de votre carte — le nombre qui décrit le chemin que votre âme a choisi avant l\'incarnation. Que vous croyiez à la numérologie ou que vous l\'utilisiez simplement pour la réflexion personnelle, calculer votre Chemin de Vie est un point de départ fascinant.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calcule-t-on le Nombre Chemin de Vie ?', a: 'Additionnez tous les chiffres de votre date de naissance complète (jour, mois et année). Réduisez le total en additionnant ses chiffres jusqu\'à obtenir un seul chiffre. Arrêtez-vous si vous obtenez 11, 22 ou 33.' },
      { q: 'Quelle est la différence entre le Chemin de Vie et le Nombre Destin ?', a: 'Les deux utilisent la date de naissance, mais la méthode diffère. Le Chemin de Vie additionne d\'abord tous les chiffres, puis réduit. Le Nombre Destin réduit le jour, le mois et l\'année séparément avant de les additionner.' },
      { q: 'Que sont les nombres maîtres en numérologie ?', a: '11, 22 et 33 sont appelés nombres maîtres. Ils ne sont pas réduits à un seul chiffre car ils portent une vibration élevée. Les personnes ayant ces nombres ont souvent une mission de vie intense.' },
      { q: 'Deux personnes avec le même Chemin de Vie peuvent-elles être très différentes ?', a: 'Oui. Le Chemin de Vie décrit des thèmes et tendances fondamentaux, pas toute la personnalité. D\'autres nombres dans la carte — Nombre d\'Âme, Nombre de Personnalité — ajoutent des couches uniques.' },
      { q: 'Le Chemin de Vie est-il le même que le Nombre de Naissance ?', a: 'Ils sont souvent interchangeables mais peuvent différer selon la tradition. Certains systèmes appellent Nombre de Naissance la réduction du seul jour de naissance, tandis que le Chemin de Vie utilise la date complète.' },
      { q: 'Quels Chemins de Vie sont les plus compatibles ?', a: 'Traditionnellement, 1 et 5 s\'entendent bien (tous deux aiment l\'indépendance), 2 et 6 s\'harmonisent (tous deux bienveillants), 3 et 9 partagent créativité et idéalisme. Mais toute paire peut construire une belle relation.' },
      { q: 'Y a-t-il une différence entre numérologie occidentale et pythagoricienne ?', a: 'La numérologie pythagoricienne est le système occidental le plus courant, utilisé par ce calculateur. La numérologie chaldéenne utilise une table différente, mais le Chemin de Vie reste basé sur la date de naissance.' },
      { q: 'Que signifie un Chemin de Vie 11 ?', a: 'Le 11 est le nombre maître de l\'intuition et du leadership spirituel. Ces personnes sont souvent très sensibles, visionnaires et attirées par des professions créatives ou de guérison. Le défi est de convertir l\'inspiration en résultats.' },
      { q: 'Mon Chemin de Vie peut-il changer avec le temps ?', a: 'Non — il est déterminé par votre date de naissance fixe. Cependant, les numérologues utilisent d\'autres cycles (comme le Nombre d\'Année Personnelle) pour décrire les énergies changeantes de différentes périodes.' },
      { q: 'La numérologie est-elle scientifiquement prouvée ?', a: 'La numérologie est une tradition métaphysique, pas une science. Il n\'existe pas de preuve empirique que les nombres déterminent la personnalité. Elle est mieux utilisée comme outil de réflexion personnelle.' },
    ],
  },
  lt: {
    description: 'Jūsų gyvenimo kelio skaičius yra reikšmingiausias skaičius jūsų numerologinėje kortelėje. Jis apskaičiuojamas sumuojant visus pilnos gimimo datos skaitmenis ir mažinant iki vieno skaitmens — nebent gausite meistro skaičius 11, 22 ar 33, kurie laikomi ypač galingais ir niekada nesumuojami toliau. Šis skaičius atskleidžia pagrindinės jūsų gyvenimo temas, pamokas, kurių atėjote mokytis, ir natūralius talentus.\n\nSkirtingai nuo kitų numerologinių skaičių, susijusių su jūsų vardu ar asmenybe, gyvenimo kelio skaičius nustatomas nuo gimimo ir niekada nesikeičia. Numerologai laiko jį jūsų kortelės pagrindu — skaičiumi, aprašančiu platų kelią, kurį jūsų siela pasirinko prieš įsikūnijimą. Nepriklausomai nuo to, ar tikite numerologija, ar tiesiog mėgstate savirefleksiją, gyvenimo kelio skaičiaus apskaičiavimas yra įdomus savęs pažinimo pradžios taškas.',
    faqTitle: 'Dažni klausimai',
    faqs: [
      { q: 'Kaip apskaičiuojamas gyvenimo kelio skaičius?', a: 'Susumuokite visus pilnos gimimo datos skaitmenis (diena, mėnuo ir metai kartu). Sumažinkite sumą iki vieno skaitmens, sumuodami jos skaitmenis. Sustokite, jei gausite 11, 22 ar 33 — tai meistro skaičiai.' },
      { q: 'Kuo gyvenimo kelio skaičius skiriasi nuo likimo skaičiaus?', a: 'Abu naudoja gimimo datą, tačiau metodas skiriasi. Gyvenimo kelio skaičius pirmiausia sumuoja visus skaitmenis, tada mažina. Likimo skaičius atskirai mažina dieną, mėnesį ir metus, tada juos sumuoja.' },
      { q: 'Kas yra meistro skaičiai numerologijoje?', a: '11, 22 ir 33 vadinami meistro skaičiais. Jie nesumažinami iki vieno skaitmens, nes nešioja padidintą vibraciją. Žmonės su šiais skaičiais dažnai turi intensyvią gyvenimo misiją.' },
      { q: 'Ar du žmonės su tuo pačiu gyvenimo kelio skaičiumi gali labai skirtis?', a: 'Taip. Gyvenimo kelio skaičius aprašo pagrindines temas ir tendencijas, bet ne visą asmenybę. Kiti kortelės skaičiai — sielos skaičius, asmenybės skaičius — prideda unikalių sluoksnių.' },
      { q: 'Ar gyvenimo kelio skaičius yra tas pats, kas gimimo skaičius?', a: 'Jie dažnai vartojami pakaitomis, bet gali skirtis priklausomai nuo tradicijos. Kai kurios sistemos gimimo skaičiumi vadina tik gimimo dienos sumažinimą, o gyvenimo kelio skaičius naudoja visą datą.' },
      { q: 'Kurie gyvenimo kelio skaičiai laikomi suderinamiausiais?', a: 'Tradiciškai 1 ir 5 gerai dera (abu myli nepriklausomybę), 2 ir 6 harmonizuoja (abu rūpestingi), 3 ir 9 panašūs kūrybiškumu ir idealizmu. Tačiau bet kuri pora gali sukurti stiprius santykius.' },
      { q: 'Ar yra skirtumas tarp vakarietiškos ir pitagoriškos numerologijos?', a: 'Pitagoriška numerologija — labiausiai paplitusi vakarietiška sistema, naudojama šiame skaičiuotuve. Chaldėjų numerologija naudoja kitą lentelę, tačiau gyvenimo kelio skaičius vis tiek grindžiamas data.' },
      { q: 'Ką reiškia gyvenimo kelio skaičius 11?', a: '11 yra intuicijos ir dvasinio lyderystės meistro skaičius. Tokie žmonės dažnai yra labai jautrūs, vizioneriai ir linkę į kūrybines ar gydančias profesijas. Iššūkis — paversti įkvėpimą praktiniais rezultatais.' },
      { q: 'Ar mano gyvenimo kelio skaičius gali keistis laikui bėgant?', a: 'Ne — jis nustatomas pagal fiksuotą gimimo datą ir niekada nesikeičia. Tačiau numerologai naudoja kitus ciklus (pvz., asmeninio metų skaičių) skirtingų gyvenimo laikotarpių energijoms apibūdinti.' },
      { q: 'Ar numerologija yra moksliškai įrodyta?', a: 'Numerologija yra metafizinė tradicija, o ne mokslas. Nėra empirinių įrodymų, kad skaičiai lemia asmenybę ar likimą. Geriausia ją naudoti kaip refleksijos ir savęs pažinimo įrankį.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/destiny-number', label: 'Destiny Number' },
    { href: '/calculator/name-number', label: 'Name Number' },
    { href: '/calculator/soul-number', label: 'Soul Number' },
    { href: '/calculator/personality-number', label: 'Personality Number' },
    { href: '/calculator/age', label: 'Age Calculator' },
  ],
  ru: [
    { href: '/calculator/destiny-number', label: 'Число судьбы' },
    { href: '/calculator/name-number', label: 'Число имени' },
    { href: '/calculator/soul-number', label: 'Число души' },
    { href: '/calculator/personality-number', label: 'Число личности' },
    { href: '/calculator/age', label: 'Калькулятор возраста' },
  ],
  uk: [
    { href: '/calculator/destiny-number', label: 'Число долі' },
    { href: '/calculator/name-number', label: 'Число імені' },
    { href: '/calculator/soul-number', label: 'Число душі' },
    { href: '/calculator/personality-number', label: 'Число особистості' },
    { href: '/calculator/age', label: 'Калькулятор віку' },
  ],
  fr: [
    { href: '/calculator/destiny-number', label: 'Nombre Destin' },
    { href: '/calculator/name-number', label: 'Nombre du Nom' },
    { href: '/calculator/soul-number', label: "Nombre de l'Âme" },
    { href: '/calculator/personality-number', label: 'Nombre de Personnalité' },
    { href: '/calculator/age', label: 'Calculateur d\'âge' },
  ],
  lt: [
    { href: '/calculator/destiny-number', label: 'Likimo skaičius' },
    { href: '/calculator/name-number', label: 'Vardo skaičius' },
    { href: '/calculator/soul-number', label: 'Sielos skaičius' },
    { href: '/calculator/personality-number', label: 'Asmenybės skaičius' },
    { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/life-path', meta);
}

export async function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function LifePathPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/life-path`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
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
        <ToolActions />
        <LifePathCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <RelatedTools locale={locale} tools={related} />
          <section className={styles.faq}>
            <h2 className={styles.faq__title}>{content.faqTitle}</h2>
            <div className={styles.faq__list}>
              {content.faqs.map((f, i) => (
                <div key={i} className={styles.faq__item}>
                  <h3 className={styles.faq__question}>{f.q}</h3>
                  <p className={styles.faq__answer}>{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

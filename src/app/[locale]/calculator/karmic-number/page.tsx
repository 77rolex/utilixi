import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import KarmicNumberCalculator from './KarmicNumberCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Karmic Number Calculator — Find Your Karmic Debts Free', description: 'Discover your karmic debts by finding the digits missing from your birth date. Free numerology tool that reveals your soul\'s lessons and areas for growth in this lifetime.', h1: 'Karmic Number Calculator' },
  ru: { title: 'Калькулятор кармических чисел — кармические долги по дате рождения', description: 'Найдите кармические числа по дате рождения, определив отсутствующие цифры. Бесплатный нумерологический инструмент для изучения уроков вашей души и областей роста.', h1: 'Калькулятор кармических чисел' },
  uk: { title: 'Калькулятор кармічних чисел — кармічні борги за датою народження', description: 'Знайдіть кармічні числа за датою народження, визначивши відсутні цифри. Безкоштовний нумерологічний інструмент для вивчення уроків вашої душі та областей зростання.', h1: 'Калькулятор кармічних чисел' },
  fr: { title: 'Calculateur de Nombres Karmiques — Dettes karmiques gratuites', description: 'Découvrez vos dettes karmiques en trouvant les chiffres manquants dans votre date de naissance. Outil de numérologie gratuit révélant les leçons de votre âme.', h1: 'Calculateur de Nombres Karmiques' },
  lt: { title: 'Karminių skaičių skaičiuotuvas — karminės skolos pagal gimimo datą', description: 'Atraskite savo karmines skolas, randant trūkstamus skaitmenis gimimo datoje. Nemokamas numerologijos įrankis, atskleidžiantis jūsų sielos pamokas ir augimo sritis.', h1: 'Karminių skaičių skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'In numerology, karmic numbers represent the digits from 1 to 9 that are entirely absent from your full birth date. According to this system, each digit embodies a specific human quality — and if a digit is missing from your birth date, it indicates an area where the soul did not fully develop or apply that energy in previous cycles. The missing digit becomes a "karmic debt" — not a punishment, but a gentle invitation to consciously cultivate that quality during this lifetime. Some people have no missing digits (all of 1–9 appear in their birth date), while others may have four or five areas to work on.\n\nFor example, someone born on 15.03.1978 has digits 1, 5, 0, 3, 9, 7, 8 — and lacks 2, 4 and 6. In this tradition, these missing digits indicate areas of partnership and diplomacy (2), disciplined effort (4) and family responsibility (6) that the soul is called to develop. Understanding your karmic numbers can be a powerful tool for self-awareness, helping you recognise recurring life patterns and consciously choose to work on the qualities your birth date calls you to strengthen.',
    faqTitle: 'Frequently Asked Questions about Karmic Numbers',
    faqs: [
      { q: 'What are karmic numbers in numerology?', a: 'Karmic numbers are the digits from 1 to 9 that are entirely absent from your full birth date (DD/MM/YYYY). Each missing digit is said to represent a quality the soul did not fully develop in previous cycles and is being invited to cultivate in this lifetime.' },
      { q: 'How are karmic numbers calculated?', a: 'Write out your full birth date as individual digits. List all digits that appear (excluding 0). The karmic numbers are the digits from 1 to 9 that do NOT appear in your birth date. For example, if born on 12.07.1995, the digits present are 1, 2, 7, 9, 5 — so karmic numbers are 3, 4, 6 and 8.' },
      { q: 'What does it mean to have many karmic numbers?', a: 'Having multiple missing digits is relatively common and simply means there are several qualities the soul has chosen to develop in this life. It does not indicate bad luck — each karmic number is an invitation to growth, not a negative fate.' },
      { q: 'What does it mean to have no karmic numbers?', a: 'If all digits 1–9 appear in your birth date, you have no karmic debts. This is considered fortunate and relatively rare. It suggests the soul enters this life with a more complete set of developed qualities from previous cycles.' },
      { q: 'What does karmic number 1 mean?', a: 'Karmic number 1 indicates a lesson around developing independence, self-confidence and leadership. The soul is learning to trust its own instincts, stand apart from the crowd and take initiative without relying excessively on others for direction or validation.' },
      { q: 'What does karmic number 7 mean?', a: 'Karmic number 7 indicates a lesson around inner reflection, spirituality and trusting intuition. The soul is learning to develop a rich inner life, seek deeper meaning and move beyond purely surface-level or material pursuits.' },
      { q: 'Is karmic debt permanent?', a: 'No. Karmic debts are not fixed burdens but areas of growth. As you consciously work on the qualities associated with missing digits — through life experiences, self-awareness practices and deliberate choices — the karmic debt is considered progressively resolved.' },
      { q: 'Are karmic numbers the same as the 13, 14, 16 and 19 karmic debts?', a: 'No, these are different systems. The karmic numbers described here (missing digits in the birth date) come from the Psychomatrix / Russian numerology tradition. The four karmic debt numbers (13, 14, 16, 19) come from a different Western numerology approach applied to the Life Path or Expression number.' },
      { q: 'Can two people have exactly the same karmic numbers?', a: 'Yes, many people share the same missing digits. Karmic numbers are determined by the birth date, and dates with the same combination of digits will produce the same missing set. What differs is how each person navigates the themes associated with those numbers in their unique life context.' },
      { q: 'Should I be worried about karmic numbers?', a: 'Not at all. Karmic numbers are best understood as a compassionate map of where life may call you to stretch and grow. Approaching them with curiosity and self-compassion is far more productive than fear. Many people find that their karmic numbers point precisely to the areas where their most meaningful growth has occurred.' },
    ],
  },
  ru: {
    description: 'В нумерологии кармические числа представляют цифры от 1 до 9, полностью отсутствующие в полной дате рождения. Согласно этой системе, каждая цифра воплощает определённое человеческое качество — и если цифра отсутствует в дате рождения, это указывает на область, в которой душа не в полной мере развила или применила эту энергию в предыдущих циклах. Отсутствующая цифра становится «кармическим долгом» — не наказанием, а мягким приглашением осознанно культивировать это качество на протяжении текущей жизни.\n\nНапример, человек, рождённый 15.03.1978, имеет цифры 1, 5, 0, 3, 9, 7, 8 — и лишён 2, 4 и 6. Это указывает на области партнёрства и дипломатии (2), дисциплинированных усилий (4) и семейной ответственности (6). Понимание своих кармических чисел может быть мощным инструментом самосознания, помогающим распознать повторяющиеся жизненные паттерны.',
    faqTitle: 'Часто задаваемые вопросы о кармических числах',
    faqs: [
      { q: 'Что такое кармические числа в нумерологии?', a: 'Кармические числа — это цифры от 1 до 9, полностью отсутствующие в полной дате рождения. Каждая отсутствующая цифра представляет качество, которое душа не в полной мере развила в предыдущих циклах.' },
      { q: 'Как рассчитываются кармические числа?', a: 'Запишите полную дату рождения в виде отдельных цифр. Перечислите все присутствующие цифры (исключая 0). Кармические числа — это цифры от 1 до 9, которые НЕ появляются в вашей дате рождения.' },
      { q: 'Что значит иметь много кармических чисел?', a: 'Наличие нескольких отсутствующих цифр довольно распространено и означает, что есть несколько качеств, которые душа избрала для развития в этой жизни. Это не указывает на плохую удачу — каждое кармическое число является приглашением к росту.' },
      { q: 'Что значит не иметь кармических чисел?', a: 'Если в дате рождения присутствуют все цифры от 1 до 9, у вас нет кармических долгов. Это считается удачей и встречается относительно редко. Это предполагает, что душа входит в эту жизнь с более полным набором развитых качеств.' },
      { q: 'Что означает кармическое число 1?', a: 'Кармическое число 1 указывает на урок развития независимости, уверенности в себе и лидерства. Душа учится доверять своим инстинктам и брать инициативу без чрезмерной опоры на других.' },
      { q: 'Что означает кармическое число 7?', a: 'Кармическое число 7 указывает на урок внутренней рефлексии, духовности и доверия интуиции. Душа учится развивать богатую внутреннюю жизнь и искать более глубокий смысл.' },
      { q: 'Является ли кармический долг постоянным?', a: 'Нет. Кармические долги — не фиксированные обременения, а области роста. По мере осознанной работы над качествами, связанными с отсутствующими цифрами, кармический долг считается постепенно разрешённым.' },
      { q: 'Кармические числа — то же самое, что кармические долги 13, 14, 16 и 19?', a: 'Нет, это разные системы. Кармические числа по отсутствующим цифрам происходят из традиции психоматрицы. Четыре кармических долга (13, 14, 16, 19) — из западной нумерологической традиции, применяемой к числу жизненного пути.' },
      { q: 'Могут ли два человека иметь одинаковые кармические числа?', a: 'Да, многие люди разделяют одни и те же отсутствующие цифры. Кармические числа определяются датой рождения, и даты с одинаковым набором цифр дадут одинаковый отсутствующий набор.' },
      { q: 'Стоит ли беспокоиться о кармических числах?', a: 'Нет. Кармические числа лучше воспринимать как сострадательную карту тех мест, где жизнь может призвать вас расти. Подход с любопытством и самосостраданием значительно продуктивнее страха.' },
    ],
  },
  uk: {
    description: 'В нумерології кармічні числа представляють цифри від 1 до 9, повністю відсутні у повній даті народження. Відповідно до цієї системи, кожна цифра уособлює певну людську якість — і якщо цифра відсутня у даті народження, це вказує на область, в якій душа не повністю розвинула цю енергію у попередніх циклах. Відсутня цифра стає «кармічним боргом» — не покаранням, а м\'яким запрошенням свідомо культивувати цю якість протягом поточного життя.\n\nНаприклад, людина, народжена 15.03.1978, має цифри 1, 5, 0, 3, 9, 7, 8 — і позбавлена 2, 4 та 6. Це вказує на сфери партнерства та дипломатії (2), дисциплінованих зусиль (4) та сімейної відповідальності (6). Розуміння своїх кармічних чисел може бути потужним інструментом самосвідомості.',
    faqTitle: 'Поширені запитання про кармічні числа',
    faqs: [
      { q: 'Що таке кармічні числа в нумерології?', a: 'Кармічні числа — це цифри від 1 до 9, повністю відсутні у повній даті народження. Кожна відсутня цифра представляє якість, яку душа не повністю розвинула у попередніх циклах.' },
      { q: 'Як розраховуються кармічні числа?', a: 'Запишіть повну дату народження у вигляді окремих цифр. Перерахуйте всі присутні цифри (виключаючи 0). Кармічні числа — це цифри від 1 до 9, яких НЕ має у вашій даті народження.' },
      { q: 'Що означає мати багато кармічних чисел?', a: 'Наявність кількох відсутніх цифр є досить поширеною і просто означає, що є декілька якостей, які душа обрала для розвитку в цьому житті. Це не вказує на погану удачу — кожне кармічне число є запрошенням до зростання.' },
      { q: 'Що означає не мати кармічних чисел?', a: 'Якщо в даті народження присутні всі цифри від 1 до 9, у вас немає кармічних боргів. Це вважається удачею і зустрічається відносно рідко.' },
      { q: 'Що означає кармічне число 1?', a: 'Кармічне число 1 вказує на урок розвитку незалежності, впевненості в собі та лідерства. Душа навчається довіряти своїм інстинктам та брати ініціативу без надмірної опори на інших.' },
      { q: 'Що означає кармічне число 7?', a: 'Кармічне число 7 вказує на урок внутрішньої рефлексії, духовності та довіри інтуїції. Душа навчається розвивати багате внутрішнє життя та шукати глибший сенс.' },
      { q: 'Чи є кармічний борг постійним?', a: 'Ні. Кармічні борги — не фіксовані обтяження, а сфери зростання. У міру свідомої роботи над якостями, пов\'язаними з відсутніми цифрами, кармічний борг вважається поступово вирішеним.' },
      { q: 'Кармічні числа — те саме, що кармічні борги 13, 14, 16 та 19?', a: 'Ні, це різні системи. Кармічні числа за відсутніми цифрами походять з традиції психоматриці. Чотири кармічних борга (13, 14, 16, 19) — із Західної нумерологічної традиції.' },
      { q: 'Чи можуть дві людини мати однакові кармічні числа?', a: 'Так. Кармічні числа визначаються датою народження, і дати з однаковим набором цифр дадуть однаковий відсутній набір.' },
      { q: 'Чи варто турбуватися про кармічні числа?', a: 'Ні. Кармічні числа краще сприймати як доброзичливу карту тих місць, де життя може закликати вас рости. Підхід з цікавістю і самоспівчуттям значно продуктивніший за страх.' },
    ],
  },
  fr: {
    description: 'En numérologie, les nombres karmiques représentent les chiffres de 1 à 9 totalement absents de votre date de naissance complète. Selon ce système, chaque chiffre incarne une qualité humaine spécifique — et si un chiffre manque dans votre date de naissance, cela indique un domaine où l\'âme n\'a pas pleinement développé cette énergie dans les cycles précédents. Le chiffre manquant devient une "dette karmique" — non pas une punition, mais une invitation à cultiver consciemment cette qualité au cours de cette vie.\n\nPar exemple, quelqu\'un né le 15.03.1978 possède les chiffres 1, 5, 0, 3, 9, 7, 8 — et manque de 2, 4 et 6. Cela indique des domaines de partenariat (2), d\'effort discipliné (4) et de responsabilité familiale (6). Comprendre vos nombres karmiques peut être un outil puissant de conscience de soi, vous aidant à reconnaître les schémas récurrents dans votre vie.',
    faqTitle: 'Questions fréquentes sur les Nombres Karmiques',
    faqs: [
      { q: 'Que sont les nombres karmiques en numérologie ?', a: 'Les nombres karmiques sont les chiffres de 1 à 9 totalement absents de votre date de naissance complète. Chaque chiffre manquant représente une qualité que l\'âme n\'a pas pleinement développée dans les cycles précédents.' },
      { q: 'Comment calcule-t-on les nombres karmiques ?', a: 'Notez votre date de naissance complète en chiffres individuels. Listez tous les chiffres présents (excluant le 0). Les nombres karmiques sont les chiffres de 1 à 9 qui N\'apparaissent PAS dans votre date de naissance.' },
      { q: 'Que signifie avoir beaucoup de nombres karmiques ?', a: 'Avoir plusieurs chiffres manquants est relativement courant et signifie simplement qu\'il y a plusieurs qualités que l\'âme a choisie de développer dans cette vie. Cela n\'indique pas de malchance — chaque nombre karmique est une invitation à la croissance.' },
      { q: 'Que signifie ne pas avoir de nombres karmiques ?', a: 'Si tous les chiffres de 1 à 9 apparaissent dans votre date de naissance, vous n\'avez pas de dettes karmiques. C\'est considéré comme chanceux et relativement rare.' },
      { q: 'Que signifie le nombre karmique 1 ?', a: 'Le nombre karmique 1 indique une leçon autour du développement de l\'indépendance, de la confiance en soi et du leadership. L\'âme apprend à faire confiance à ses instincts et à prendre des initiatives.' },
      { q: 'Que signifie le nombre karmique 7 ?', a: 'Le nombre karmique 7 indique une leçon autour de la réflexion intérieure, de la spiritualité et de la confiance en l\'intuition. L\'âme apprend à développer une vie intérieure riche et à chercher un sens plus profond.' },
      { q: 'La dette karmique est-elle permanente ?', a: 'Non. Les dettes karmiques ne sont pas des fardeaux fixes mais des domaines de croissance. À mesure que vous travaillez consciemment sur les qualités associées aux chiffres manquants, la dette karmique est considérée comme progressivement résolue.' },
      { q: 'Les nombres karmiques sont-ils les mêmes que les dettes karmiques 13, 14, 16 et 19 ?', a: 'Non, ce sont des systèmes différents. Les nombres karmiques par chiffres manquants proviennent de la tradition de la Psychomatrice. Les quatre nombres de dettes karmiques (13, 14, 16, 19) proviennent d\'une approche numérologique occidentale différente.' },
      { q: 'Deux personnes peuvent-elles avoir exactement les mêmes nombres karmiques ?', a: 'Oui. Les nombres karmiques sont déterminés par la date de naissance, et les dates avec la même combinaison de chiffres produiront le même ensemble manquant.' },
      { q: 'Faut-il s\'inquiéter des nombres karmiques ?', a: 'Pas du tout. Les nombres karmiques sont mieux compris comme une carte bienveillante des domaines où la vie peut vous appeler à grandir. Les aborder avec curiosité et auto-compassion est bien plus productif que la peur.' },
    ],
  },
  lt: {
    description: 'Numerologijoje karminiai skaičiai reiškia skaitmenis nuo 1 iki 9, visiškai nesančius jūsų pilnoje gimimo datoje. Pagal šią sistemą kiekvienas skaitmuo įkūnija specifinę žmogiškąją savybę — ir jei skaitmuo trūksta gimimo datoje, tai rodo sritį, kurioje siela nepilnai išvystė tą energiją ankstesniuose cikluose. Trūkstamas skaitmuo tampa "karminine skola" — ne bausme, bet švelniai kviečiančiu sąmoningai ugdyti tą savybę šio gyvenimo metu.\n\nPavyzdžiui, gimęs 15.03.1978 turi skaitmenis 1, 5, 0, 3, 9, 7, 8 — ir neturi 2, 4 ir 6. Tai rodo partnerystės ir diplomatijos (2), drausminių pastangų (4) ir šeimos atsakomybės (6) sritis. Karminių skaičių supratimas gali būti galingas savivokos įrankis.',
    faqTitle: 'Dažnai užduodami klausimai apie karminius skaičius',
    faqs: [
      { q: 'Kas yra karminiai skaičiai numerologijoje?', a: 'Karminiai skaičiai yra skaitmenys nuo 1 iki 9, visiškai nesantys jūsų pilnoje gimimo datoje. Kiekvienas trūkstamas skaitmuo reiškia savybę, kurios siela nepilnai išvystė ankstesniuose cikluose.' },
      { q: 'Kaip apskaičiuojami karminiai skaičiai?', a: 'Užrašykite pilną gimimo datą kaip atskirus skaitmenis. Išvardykite visus esančius skaitmenis (išskyrus 0). Karminiai skaičiai yra skaitmenys nuo 1 iki 9, kurių NĖRA jūsų gimimo datoje.' },
      { q: 'Ką reiškia turėti daug karminių skaičių?', a: 'Turėti keletą trūkstamų skaitmenų yra gana dažna ir tiesiog reiškia, kad yra kelios savybės, kurias siela pasirinko ugdyti šiame gyvenime. Tai nereiškia nesėkmės — kiekvienas karminis skaičius yra kvietimas augti.' },
      { q: 'Ką reiškia neturėti karminių skaičių?', a: 'Jei visi skaitmenys nuo 1 iki 9 yra jūsų gimimo datoje, neturite karminių skolų. Tai laikoma laimingu ir yra gana reta.' },
      { q: 'Ką reiškia karminis skaičius 1?', a: 'Karminis skaičius 1 rodo pamoką ugdant nepriklausomybę, pasitikėjimą savimi ir lyderystę. Siela mokosi pasitikėti savo instinktais ir imtis iniciatyvos.' },
      { q: 'Ką reiškia karminis skaičius 7?', a: 'Karminis skaičius 7 rodo pamoką apie vidinį apmąstymą, dvasingumą ir pasitikėjimą intuicija. Siela mokosi ugdyti turtingą vidinį gyvenimą ir ieškoti gilesnės prasmės.' },
      { q: 'Ar karminė skola yra nuolatinė?', a: 'Ne. Karminės skolos nėra fiksuotos naštos, o augimo sritys. Kai sąmoningai dirbate su savybėmis, susijusiomis su trūkstamais skaitmenimis, karminė skola laikoma palaipsniui išsprendžiama.' },
      { q: 'Ar karminiai skaičiai yra tie patys kaip karminės skolos 13, 14, 16 ir 19?', a: 'Ne, tai skirtingos sistemos. Čia aprašyti karminiai skaičiai pagal trūkstamus skaitmenis kilę iš psichomatricos tradicijos. Keturios karminės skolos (13, 14, 16, 19) — iš skirtingos Vakarų numerologijos krypties.' },
      { q: 'Ar du žmonės gali turėti visiškai tuos pačius karminius skaičius?', a: 'Taip. Karminiai skaičiai nustatomi pagal gimimo datą, ir datos su ta pačia skaitmenų kombinacija duos tą patį trūkstamą rinkinį.' },
      { q: 'Ar reikėtų nerimauti dėl karminių skaičių?', a: 'Visiškai ne. Karminius skaičius geriausia suprasti kaip gailestingą žemėlapį vietų, kuriose gyvenimas gali kviesti jus augti. Artėjimas su smalsumu ir saviužuojauta yra daug produktyvesnis nei baimė.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/pythagorean-matrix', label: 'Pythagorean Matrix' },
    { href: '/calculator/personal-year', label: 'Personal Year Number' },
    { href: '/calculator/destiny-number', label: 'Destiny Number' },
    { href: '/calculator/name-number', label: 'Name Number' },
  ],
  ru: [
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/pythagorean-matrix', label: 'Матрица Пифагора' },
    { href: '/calculator/personal-year', label: 'Персональный год' },
    { href: '/calculator/destiny-number', label: 'Число судьбы' },
    { href: '/calculator/name-number', label: 'Число имени' },
  ],
  uk: [
    { href: '/calculator/life-path', label: 'Число шляху життя' },
    { href: '/calculator/pythagorean-matrix', label: 'Матриця Піфагора' },
    { href: '/calculator/personal-year', label: 'Персональний рік' },
    { href: '/calculator/destiny-number', label: 'Число долі' },
    { href: '/calculator/name-number', label: 'Число імені' },
  ],
  fr: [
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/pythagorean-matrix', label: 'Matrice Pythagoricienne' },
    { href: '/calculator/personal-year', label: 'Année Personnelle' },
    { href: '/calculator/destiny-number', label: 'Nombre de Destinée' },
    { href: '/calculator/name-number', label: 'Nombre du Prénom' },
  ],
  lt: [
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/pythagorean-matrix', label: 'Pitagoro matrica' },
    { href: '/calculator/personal-year', label: 'Asmeniniai metai' },
    { href: '/calculator/destiny-number', label: 'Likimo skaičius' },
    { href: '/calculator/name-number', label: 'Vardo skaičius' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/karmic-number', meta);
}

export function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function KarmicNumberPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/karmic-number`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
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
        <KarmicNumberCalculator locale={locale} />
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

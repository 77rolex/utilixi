import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import PythagoreanMatrixCalculator from './PythagoreanMatrixCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Pythagorean Matrix Calculator — Psychomatrix by Birth Date', description: 'Build your Pythagorean Matrix (Psychomatrix) from your birth date. Discover the strengths and gaps in your 3×3 numerology grid — Character, Energy, Health, Logic and more.', h1: 'Pythagorean Matrix Calculator', subtitle: 'Build your Pythagorean Matrix (Pythagoras square) from your date of birth and decode the 9-cell character grid.' },
  ru: { title: 'Матрица Пифагора — психоматрица по дате рождения онлайн', description: 'Составьте матрицу Пифагора (психоматрицу) по дате рождения. Узнайте сильные и слабые стороны своей нумерологической сетки 3×3: характер, энергия, здоровье, логика и другое.', h1: 'Матрица Пифагора по дате рождения', subtitle: 'Постройте матрицу Пифагора (квадрат Пифагора) по дате рождения и расшифруйте девятиклеточную сетку характера.' },
  uk: { title: 'Матриця Піфагора — психоматриця за датою народження онлайн', description: 'Складіть матрицю Піфагора (психоматрицю) за датою народження. Дізнайтеся сильні та слабкі сторони своєї нумерологічної сітки 3×3.', h1: 'Матриця Піфагора за датою народження', subtitle: 'Побудуйте матрицю Піфагора (квадрат Піфагора) за датою народження та розшифруйте дев\'ятиклітинну сітку характеру.' },
  fr: { title: 'Matrice Pythagoricienne — Psychomatrice par date de naissance', description: 'Construisez votre Matrice Pythagoricienne (Psychomatrice) à partir de votre date de naissance. Découvrez vos forces et lacunes dans la grille numérologique 3×3.', h1: 'Calculateur de Matrice Pythagoricienne', subtitle: 'Construisez votre Matrice Pythagoricienne (carré de Pythagore) à partir de votre date de naissance et décodez la grille des 9 cases.' },
  lt: { title: 'Pitagoro matrica — psichomatrica pagal gimimo datą', description: 'Sukurkite Pitagoro matricą (psichomatricą) pagal gimimo datą. Atraskite savo 3×3 numerologinės gardelės stipriąsias ir silpnąsias vietas.', h1: 'Pitagoro matricos skaičiuotuvas', subtitle: 'Sukurkite Pitagoro matricą pagal gimimo datą ir iššifruokite 9 langelių charakterio gardelę.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'The Pythagorean Matrix, also known as the Psychomatrix or the Square of Pythagoras, is a numerological system that maps the digits of your full birth date (day, month and year) onto a 3×3 grid. Each of the nine cells corresponds to a digit from 1 to 9 and a specific human quality: Character (1), Energy (2), Intellect (3), Health (4), Logic (5), Work (6), Luck (7), Duty (8) and Memory (9). The count of times each digit appears in your birth date determines how strongly that quality is expressed in your personality and life experience.\n\nA cell with many repetitions of a digit indicates a pronounced strength in that quality, while an empty cell (the digit absent from the birth date) points to an area requiring conscious development. This system, popularised in Russian-speaking countries and derived from older Pythagorean principles, offers a simple and visually striking overview of your character blueprint. Many practitioners use the Pythagorean Matrix alongside the Life Path number to gain a fuller picture of a person\'s natural gifts and areas for growth.',
    faqTitle: 'Frequently Asked Questions about the Pythagorean Matrix',
    faqs: [
      { q: 'What is the Pythagorean Matrix?', a: 'The Pythagorean Matrix (Psychomatrix) is a numerological grid created by counting the digits 1–9 in your full birth date and placing them in a 3×3 table. Each position represents a specific personality quality: Character, Energy, Intellect, Health, Logic, Work, Luck, Duty and Memory.' },
      { q: 'How is the Pythagorean Matrix calculated?', a: 'Write out your full birth date as digits (DD MM YYYY). Count how many times each digit from 1 to 9 appears. Zeros are excluded. Place the count for each digit in its corresponding cell in the 3×3 grid. Cells with no occurrences are empty.' },
      { q: 'What does each cell in the matrix represent?', a: 'Cell 1 = Character/Will; Cell 2 = Energy/Bio-field; Cell 3 = Intellect/Interests; Cell 4 = Health/Memory; Cell 5 = Logic/Intuition; Cell 6 = Work/Diligence; Cell 7 = Luck/Talent; Cell 8 = Duty/Responsibility; Cell 9 = Intelligence/Memory. The grid layout reads left-to-right, top-to-bottom.' },
      { q: 'What does a filled cell mean?', a: 'A filled cell (digit appearing multiple times in the birth date) indicates a strong expression of that quality. For example, three 1s suggests a very strong character and willpower. The more repetitions, the more dominant the trait — though extreme counts can sometimes indicate imbalance.' },
      { q: 'What does an empty cell mean?', a: 'An empty cell means the digit is entirely absent from your birth date. In the Psychomatrix tradition, an empty cell indicates an area where you are being called to consciously develop that quality. It is not a flaw but a growth opportunity — the soul\'s chosen area of work for this lifetime.' },
      { q: 'Is the Pythagorean Matrix the same as the Life Path number?', a: 'No, they are different tools. The Life Path number reduces the birth date to a single digit and describes your core soul mission. The Pythagorean Matrix does not reduce — it counts the raw digits and maps them across nine qualities, providing a more detailed personality blueprint.' },
      { q: 'How many digits does a typical matrix contain?', a: 'For dates in the 20th–21st century (e.g., 15.08.1990), the birth date string is typically 8 digits. Zero is excluded, so the total number of digits in the matrix varies. Most birth dates generate 6–8 non-zero digits, leaving 1–3 cells empty on average.' },
      { q: 'What is the ideal Pythagorean Matrix?', a: 'There is no single "ideal" matrix — each configuration has its gifts and challenges. A matrix with no empty cells means all qualities are present, which is considered fortunate. Balance across the grid is often viewed as advantageous, though strong concentrations in certain cells can indicate exceptional talent in those areas.' },
      { q: 'Can the Pythagorean Matrix predict the future?', a: 'Like all numerological systems, the Pythagorean Matrix is a tool for self-understanding rather than literal prediction. It maps inherent tendencies and energies present at birth. It does not determine events but can illuminate the natural strengths and challenges you will navigate throughout life.' },
      { q: 'How does the Pythagorean Matrix differ from a birth chart?', a: 'A birth chart (natal chart) in astrology requires exact birth time, location and positions of all planets. The Pythagorean Matrix requires only the birth date and is far simpler to calculate. Both offer character insights, but the birth chart is considerably more detailed and position-dependent.' },
    ],
  },
  ru: {
    description: 'Матрица Пифагора, известная также как психоматрица или квадрат Пифагора, — это нумерологическая система, отображающая цифры полной даты рождения (число, месяц и год) на сетку 3×3. Каждая из девяти ячеек соответствует цифре от 1 до 9 и конкретному человеческому качеству: Характер (1), Энергия (2), Интерес (3), Здоровье (4), Логика (5), Трудолюбие (6), Везение (7), Долг (8) и Память (9). Количество повторений каждой цифры в дате рождения определяет силу проявления этого качества.\n\nЯчейка с многочисленными повторениями цифры указывает на выраженную силу этого качества, тогда как пустая ячейка (цифра отсутствует в дате рождения) указывает на область, требующую осознанного развития. Эта система, широко распространённая в русскоязычных странах, предлагает наглядный обзор вашего характера. Многие практики используют матрицу Пифагора совместно с числом жизненного пути для более полной картины.',
    faqTitle: 'Часто задаваемые вопросы о матрице Пифагора',
    faqs: [
      { q: 'Что такое матрица Пифагора?', a: 'Матрица Пифагора (психоматрица) — это нумерологическая сетка, создаваемая путём подсчёта цифр 1–9 в полной дате рождения и размещения их в таблице 3×3. Каждая позиция представляет конкретное качество личности.' },
      { q: 'Как рассчитывается матрица Пифагора?', a: 'Запишите полную дату рождения в виде цифр (ДД ММ ГГГГ). Подсчитайте, сколько раз каждая цифра от 1 до 9 встречается. Нули исключаются. Разместите количество для каждой цифры в соответствующей ячейке сетки 3×3.' },
      { q: 'Что означает каждая ячейка матрицы?', a: 'Ячейка 1 = Характер/Воля; 2 = Энергия/Биополе; 3 = Интерес/Познание; 4 = Здоровье; 5 = Логика/Интуиция; 6 = Трудолюбие/Земля; 7 = Везение/Талант; 8 = Долг/Ответственность; 9 = Память/Интеллект.' },
      { q: 'Что означает заполненная ячейка?', a: 'Заполненная ячейка (цифра встречается несколько раз в дате рождения) указывает на сильное проявление этого качества. Чем больше повторений, тем доминантнее черта.' },
      { q: 'Что означает пустая ячейка?', a: 'Пустая ячейка означает, что цифра полностью отсутствует в дате рождения. В традиции психоматрицы пустая ячейка указывает на область, в которой вас призывают осознанно развивать это качество — это не недостаток, а возможность роста.' },
      { q: 'Отличается ли матрица Пифагора от числа жизненного пути?', a: 'Да. Число жизненного пути сводит дату рождения к одной цифре и описывает основную миссию души. Матрица Пифагора не сводит — она считает цифры и отображает их по девяти качествам.' },
      { q: 'Сколько цифр содержит типичная матрица?', a: 'Для дат XX–XXI века дата рождения обычно содержит 8 цифр. Ноль исключается, поэтому общее количество цифр в матрице варьируется. Большинство дат рождения дают 6–8 ненулевых цифр.' },
      { q: 'Какая идеальная матрица Пифагора?', a: 'Не существует единой «идеальной» матрицы — каждая конфигурация имеет свои достоинства и вызовы. Матрица без пустых ячеек означает, что все качества присутствуют, что считается благоприятным.' },
      { q: 'Может ли матрица Пифагора предсказать будущее?', a: 'Как и все нумерологические системы, матрица Пифагора является инструментом самопознания, а не буквального предсказания. Она отображает врождённые тенденции и энергии, присутствующие при рождении.' },
      { q: 'Как матрица Пифагора отличается от натальной карты?', a: 'Натальная карта в астрологии требует точного времени рождения, местоположения и положения всех планет. Матрица Пифагора требует только даты рождения и значительно проще в расчёте. Оба инструмента предоставляют информацию о характере, но натальная карта значительно подробнее.' },
    ],
  },
  uk: {
    description: 'Матриця Піфагора, відома також як психоматриця або квадрат Піфагора, — це нумерологічна система, що відображає цифри повної дати народження (число, місяць та рік) на сітку 3×3. Кожна з дев\'яти комірок відповідає цифрі від 1 до 9 та конкретній людській якості: Характер (1), Енергія (2), Інтерес (3), Здоров\'я (4), Логіка (5), Праця (6), Везіння (7), Обов\'язок (8) та Пам\'ять (9).\n\nКомірка з багатьма повторами цифри вказує на виражену силу цієї якості, тоді як порожня комірка вказує на область, що потребує свідомого розвитку. Ця система, широко поширена в україномовних та русомовних країнах, пропонує наочний огляд вашого характеру. Багато практиків використовують матрицю Піфагора разом із числом шляху життя для повнішої картини.',
    faqTitle: 'Поширені запитання про матрицю Піфагора',
    faqs: [
      { q: 'Що таке матриця Піфагора?', a: 'Матриця Піфагора (психоматриця) — це нумерологічна сітка, що створюється шляхом підрахунку цифр 1–9 у повній даті народження та розміщення їх у таблиці 3×3. Кожна позиція представляє конкретну якість особистості.' },
      { q: 'Як розраховується матриця Піфагора?', a: 'Запишіть повну дату народження у вигляді цифр (ДД ММ РРРР). Підрахуйте, скільки разів кожна цифра від 1 до 9 зустрічається. Нулі виключаються. Розмістіть кількість для кожної цифри у відповідній комірці сітки 3×3.' },
      { q: 'Що означає кожна комірка матриці?', a: 'Комірка 1 = Характер/Воля; 2 = Енергія/Біополе; 3 = Інтерес/Пізнання; 4 = Здоров\'я; 5 = Логіка/Інтуїція; 6 = Праця/Земля; 7 = Везіння/Талант; 8 = Обов\'язок/Відповідальність; 9 = Пам\'ять/Інтелект.' },
      { q: 'Що означає заповнена комірка?', a: 'Заповнена комірка (цифра зустрічається кілька разів у даті народження) вказує на сильний прояв цієї якості. Чим більше повторень, тим домінантніша риса.' },
      { q: 'Що означає порожня комірка?', a: 'Порожня комірка означає, що цифра повністю відсутня у даті народження. У традиції психоматриці порожня комірка вказує на область, в якій вас закликають свідомо розвивати цю якість — це не недолік, а можливість зростання.' },
      { q: 'Чим матриця Піфагора відрізняється від числа шляху життя?', a: 'Число шляху життя зводить дату народження до однієї цифри і описує основну місію душі. Матриця Піфагора не зводить — вона рахує цифри і відображає їх за дев\'ятьма якостями.' },
      { q: 'Скільки цифр містить типова матриця?', a: 'Для дат XX–XXI ст. дата народження зазвичай містить 8 цифр. Нуль виключається, тому загальна кількість цифр у матриці варіюється. Більшість дат народження дають 6–8 ненульових цифр.' },
      { q: 'Яка ідеальна матриця Піфагора?', a: 'Не існує єдиної "ідеальної" матриці — кожна конфігурація має свої переваги та виклики. Матриця без порожніх комірок означає, що всі якості присутні, що вважається сприятливим.' },
      { q: 'Чи може матриця Піфагора передбачити майбутнє?', a: 'Як і всі нумерологічні системи, матриця Піфагора є інструментом самопізнання, а не буквального передбачення. Вона відображає вроджені тенденції та енергії, присутні при народженні.' },
      { q: 'Як матриця Піфагора відрізняється від натальної карти?', a: 'Натальна карта в астрології вимагає точного часу народження, місцезнаходження та положення всіх планет. Матриця Піфагора вимагає лише дати народження і значно простіша у розрахунку.' },
    ],
  },
  fr: {
    description: 'La Matrice Pythagoricienne, également connue sous le nom de Psychomatrice ou Carré de Pythagore, est un système numérologique qui cartographie les chiffres de votre date de naissance complète (jour, mois et année) sur une grille 3×3. Chacune des neuf cellules correspond à un chiffre de 1 à 9 et à une qualité humaine spécifique : Caractère (1), Énergie (2), Intellect (3), Santé (4), Logique (5), Travail (6), Chance (7), Devoir (8) et Mémoire (9).\n\nUne cellule avec de nombreuses répétitions d\'un chiffre indique une force prononcée dans cette qualité, tandis qu\'une cellule vide (chiffre absent de la date de naissance) pointe vers un domaine nécessitant un développement conscient. Ce système, populaire dans les pays russophones et dérivé des principes pythagoriciens, offre un aperçu visuel saisissant de votre profil de caractère.',
    faqTitle: 'Questions fréquentes sur la Matrice Pythagoricienne',
    faqs: [
      { q: 'Qu\'est-ce que la Matrice Pythagoricienne ?', a: 'La Matrice Pythagoricienne (Psychomatrice) est une grille numérologique créée en comptant les chiffres 1–9 dans votre date de naissance complète et en les plaçant dans un tableau 3×3. Chaque position représente une qualité de personnalité spécifique.' },
      { q: 'Comment calcule-t-on la Matrice Pythagoricienne ?', a: 'Notez votre date de naissance complète en chiffres (JJ MM AAAA). Comptez combien de fois chaque chiffre de 1 à 9 apparaît. Les zéros sont exclus. Placez le compte de chaque chiffre dans sa cellule correspondante dans la grille 3×3.' },
      { q: 'Que représente chaque cellule de la matrice ?', a: 'Cellule 1 = Caractère/Volonté ; 2 = Énergie/Bio-champ ; 3 = Intellect/Intérêts ; 4 = Santé ; 5 = Logique/Intuition ; 6 = Travail/Diligence ; 7 = Chance/Talent ; 8 = Devoir/Responsabilité ; 9 = Intelligence/Mémoire.' },
      { q: 'Que signifie une cellule remplie ?', a: 'Une cellule remplie (chiffre apparaissant plusieurs fois dans la date de naissance) indique une expression forte de cette qualité. Plus les répétitions sont nombreuses, plus le trait est dominant.' },
      { q: 'Que signifie une cellule vide ?', a: 'Une cellule vide signifie que le chiffre est totalement absent de votre date de naissance. Dans la tradition de la Psychomatrice, une cellule vide indique un domaine où vous êtes appelé à développer consciemment cette qualité — ce n\'est pas un défaut, mais une opportunité de croissance.' },
      { q: 'La Matrice Pythagoricienne est-elle différente du Chemin de Vie ?', a: 'Oui. Le Chemin de Vie réduit la date de naissance à un seul chiffre. La Matrice Pythagoricienne ne réduit pas — elle compte les chiffres bruts et les cartographie sur neuf qualités.' },
      { q: 'Combien de chiffres contient une matrice typique ?', a: 'Pour les dates des XXe–XXIe siècles, la date de naissance comprend généralement 8 chiffres. Le zéro est exclu, donc le nombre total de chiffres varie. La plupart des dates de naissance génèrent 6 à 8 chiffres non nuls.' },
      { q: 'Quelle est la matrice idéale ?', a: 'Il n\'existe pas de matrice "idéale" unique — chaque configuration a ses forces et ses défis. Une matrice sans cellules vides signifie que toutes les qualités sont présentes, ce qui est considéré comme favorable.' },
      { q: 'La Matrice peut-elle prédire l\'avenir ?', a: 'Comme tout système numérologique, la Matrice Pythagoricienne est un outil de connaissance de soi plutôt que de prédiction littérale. Elle cartographie les tendances et énergies innées présentes à la naissance.' },
      { q: 'En quoi diffère-t-elle d\'un thème natal ?', a: 'Un thème natal en astrologie nécessite l\'heure et le lieu de naissance exacts. La Matrice ne nécessite que la date de naissance et est beaucoup plus simple à calculer. Les deux offrent des perspectives sur le caractère, mais le thème natal est plus détaillé.' },
    ],
  },
  lt: {
    description: 'Pitagoro matrica, taip pat žinoma kaip psichomatrica arba Pitagoro kvadratas, yra numerologinė sistema, kuri atvaizduoja visą gimimo datą (dieną, mėnesį ir metus) į 3×3 gardelę. Kiekviena iš devynių langelių atitinka skaitmenį nuo 1 iki 9 ir specifinę žmogiškąją savybę: Charakteris (1), Energija (2), Intelektas (3), Sveikata (4), Logika (5), Darbas (6), Sėkmė (7), Pareiga (8) ir Atmintis (9).\n\nLangelis su daugybe skaitmens pasikartojimų rodo stiprų tos savybės pasireiškimą, o tuščias langelis (skaitmuo, kurio nėra gimimo datoje) nurodo sritį, reikalaujančią sąmoningo tobulėjimo. Ši sistema, populiari rusiakalbėse šalyse, siūlo aiškų jūsų charakterio bruožų apžvalgą.',
    faqTitle: 'Dažnai užduodami klausimai apie Pitagoro matricą',
    faqs: [
      { q: 'Kas yra Pitagoro matrica?', a: 'Pitagoro matrica (psichomatrica) yra numerologinė gardelė, sukurta skaičiuojant skaitmenis 1–9 visoje gimimo datoje ir dedant juos į 3×3 lentelę. Kiekviena pozicija atspindi specifinę asmenybės savybę.' },
      { q: 'Kaip apskaičiuojama Pitagoro matrica?', a: 'Užrašykite visą gimimo datą skaitmenimis (DD MM MMMM). Suskaičiuokite, kiek kartų kiekvienas skaitmuo nuo 1 iki 9 pasirodo. Nuliai neįtraukiami. Kiekvieno skaitmens kiekį įdėkite į atitinkamą langelį 3×3 gardelėje.' },
      { q: 'Ką reiškia kiekvienas matricos langelis?', a: 'Langelis 1 = Charakteris/Valia; 2 = Energija/Biopolė; 3 = Intelektas/Interesai; 4 = Sveikata; 5 = Logika/Intuicija; 6 = Darbas/Stropumas; 7 = Sėkmė/Talentas; 8 = Pareiga/Atsakomybė; 9 = Atmintis/Intelektas.' },
      { q: 'Ką reiškia užpildytas langelis?', a: 'Užpildytas langelis (skaitmuo kelis kartus pasirodo gimimo datoje) rodo stiprų tos savybės pasireiškimą. Kuo daugiau pasikartojimų, tuo dominuojantesnė ypatybė.' },
      { q: 'Ką reiškia tuščias langelis?', a: 'Tuščias langelis reiškia, kad skaitmuo visiškai nėra jūsų gimimo datoje. Psichomatricos tradicijoje tuščias langelis rodo sritį, kurioje esate pašaukti sąmoningai ugdyti tą savybę — tai ne trūkumas, o augimo galimybė.' },
      { q: 'Ar Pitagoro matrica skiriasi nuo Gyvenimo kelio skaičiaus?', a: 'Taip. Gyvenimo kelio skaičius susmulkina gimimo datą iki vieno skaitmens. Pitagoro matrica nesmulkina — ji skaičiuoja neapdorotus skaitmenis ir atvaizduoja juos per devynias savybes.' },
      { q: 'Kiek skaitmenų yra tipinėje matricoje?', a: 'XX–XXI amžiaus datoms gimimo data paprastai turi 8 skaitmenis. Nulis neįtraukiamas, todėl bendras skaitmenų skaičius matricoje skiriasi. Dauguma gimimo datų generuoja 6–8 nenulių skaitmenų.' },
      { q: 'Kokia yra ideali Pitagoro matrica?', a: 'Nėra vienos "idealios" matricos — kiekviena konfigūracija turi savo stiprybių ir iššūkių. Matrica be tuščių langelių reiškia, kad visos savybės yra, o tai laikoma palankiu.' },
      { q: 'Ar Pitagoro matrica gali numatyti ateitį?', a: 'Kaip ir visos numerologinės sistemos, Pitagoro matrica yra savęs pažinimo, o ne pažodinio numatymo įrankis. Ji atvaizduoja gimimo metu esamus įgimtus polinkius ir energijas.' },
      { q: 'Kuo ji skiriasi nuo gimimo kortelos?', a: 'Gimimo kortelė astrologijoje reikalauja tikslaus gimimo laiko ir vietos. Pitagoro matrica reikalauja tik gimimo datos ir yra daug paprastesnė skaičiuoti. Abiejų įrankių tikslas — pateikti įžvalgų apie charakterį.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/destiny-number', label: 'Destiny Number' },
    { href: '/calculator/karmic-number', label: 'Karmic Numbers' },
    { href: '/calculator/personal-year', label: 'Personal Year Number' },
    { href: '/calculator/numerology-compatibility', label: 'Numerology Compatibility' },
  ],
  ru: [
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/destiny-number', label: 'Число судьбы' },
    { href: '/calculator/karmic-number', label: 'Кармические числа' },
    { href: '/calculator/personal-year', label: 'Персональный год' },
    { href: '/calculator/numerology-compatibility', label: 'Совместимость по нумерологии' },
  ],
  uk: [
    { href: '/calculator/life-path', label: 'Число шляху життя' },
    { href: '/calculator/destiny-number', label: 'Число долі' },
    { href: '/calculator/karmic-number', label: 'Кармічні числа' },
    { href: '/calculator/personal-year', label: 'Персональний рік' },
    { href: '/calculator/numerology-compatibility', label: 'Сумісність за нумерологією' },
  ],
  fr: [
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/destiny-number', label: 'Nombre de Destinée' },
    { href: '/calculator/karmic-number', label: 'Nombres Karmiques' },
    { href: '/calculator/personal-year', label: 'Année Personnelle' },
    { href: '/calculator/numerology-compatibility', label: 'Compatibilité Numérologique' },
  ],
  lt: [
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/destiny-number', label: 'Likimo skaičius' },
    { href: '/calculator/karmic-number', label: 'Karminiai skaičiai' },
    { href: '/calculator/personal-year', label: 'Asmeniniai metai' },
    { href: '/calculator/numerology-compatibility', label: 'Numerologinis suderinamumas' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/pythagorean-matrix', meta);
}

export function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function PythagoreanMatrixPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/pythagorean-matrix`,
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
        {meta.subtitle && <p className={styles.page__subtitle}>{meta.subtitle}</p>}
        <ToolActions />
        <PythagoreanMatrixCalculator locale={locale} />
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

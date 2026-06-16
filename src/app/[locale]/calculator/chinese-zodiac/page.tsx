import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import ChineseZodiacCalculator from './ChineseZodiacCalculator';
import FaqSection from '@/components/ui/FaqSection';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Chinese Zodiac Calculator — Find Your Animal Sign & Element', description: 'Find your Chinese zodiac animal sign, element and yin/yang polarity by birth year. Discover personality traits, lucky numbers and compatibility. Free Chinese astrology tool.', h1: 'Chinese Zodiac Calculator', subtitle: 'Find your Chinese zodiac animal, element and yin/yang polarity by birth year and explore your personality traits.' },
  ru: { title: 'Китайский гороскоп по году рождения — животное и стихия', description: 'Определите своё животное по китайскому гороскопу, стихию и полярность инь/ян. Узнайте характеристику, счастливые числа и совместимость. Бесплатно.', h1: 'Китайский гороскоп', subtitle: 'Найдите своё животное по китайскому гороскопу, стихию и полярность инь/ян по году рождения.' },
  uk: { title: 'Китайський гороскоп за роком народження — тварина і стихія', description: 'Визначте своє тварини за китайським гороскопом, стихію та полярність інь/ян. Дізнайтеся характеристику, щасливі числа та сумісність. Безкоштовно.', h1: 'Китайський гороскоп', subtitle: 'Знайдіть своє тварину за китайським гороскопом, стихію та полярність інь/ян за роком народження.' },
  fr: { title: 'Zodiaque Chinois — Trouvez votre Animal et Élément par année', description: 'Trouvez votre signe animal du zodiaque chinois, votre élément et votre polarité yin/yang par année de naissance. Découvrez vos traits de personnalité et votre compatibilité. Gratuit.', h1: 'Zodiaque Chinois', subtitle: 'Trouvez votre animal du zodiaque chinois, votre élément et votre polarité yin/yang par année de naissance.' },
  lt: { title: 'Kinų zodiako skaičiuotuvas — raskite savo gyvūną ir elementą', description: 'Raskite savo kinų zodiako gyvūno ženklą, elementą ir yin/yang poliarumą pagal gimimo metus. Sužinokite asmenybės bruožus ir suderinamumą. Nemokama.', h1: 'Kinų zodiako skaičiuotuvas', subtitle: 'Raskite savo kinų zodiako gyvūną, elementą ir yin/yang poliarumą pagal gimimo metus ir sužinokite charakterio bruožus.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'The Chinese zodiac is a twelve-year cycle in which each year is represented by an animal and its associated traits. The twelve animals — Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog and Pig — cycle in a fixed order, repeating every twelve years. Unlike the Western zodiac, which is based on months, the Chinese zodiac is based on the year of birth. Each animal sign is further defined by one of five elements — Metal, Water, Wood, Fire and Earth — creating a sixty-year grand cycle. Your element is determined by the last digit of your birth year and remains constant for two consecutive years of the same element.\n\nEvery animal sign also carries a yin or yang polarity: odd-numbered years are Yin, even-numbered years are Yang. Together, the animal, element and polarity paint a detailed picture of your energetic nature according to Chinese metaphysical tradition. This calculator uses the standard solar-year Chinese zodiac; if you were born in January or early February, your Chinese year may actually begin in late January or February of the previous Western calendar year — a note is displayed if this applies to you.',
    faqTitle: 'Frequently Asked Questions about the Chinese Zodiac',
    faqs: [
      { q: 'How is the Chinese zodiac different from the Western zodiac?', a: 'The Western zodiac assigns a sign based on the month of birth (roughly 30-day segments of the solar year), while the Chinese zodiac assigns a sign based on the year of birth. The Chinese zodiac repeats in a 12-year animal cycle, whereas the Western zodiac repeats annually with 12 monthly signs.' },
      { q: 'What are the 12 Chinese zodiac animals in order?', a: 'The 12 animals in order are: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat (or Sheep), Monkey, Rooster, Dog, Pig. The cycle then repeats from Rat.' },
      { q: 'What are the five Chinese elements and how are they determined?', a: 'The five elements are Metal, Water, Wood, Fire and Earth. They are determined by the last digit of the birth year: 0 or 1 → Metal, 2 or 3 → Water, 4 or 5 → Wood, 6 or 7 → Fire, 8 or 9 → Earth. Each element repeats for two consecutive years before cycling to the next.' },
      { q: 'What is the difference between Yin and Yang years?', a: 'In the Chinese zodiac, even-numbered years are Yang (active, outward, bright) and odd-numbered years are Yin (passive, inward, receptive). The polarity adds another layer to the energetic quality of the year and its associated animal sign.' },
      { q: 'Why does the Chinese New Year start at a different date each year?', a: 'The Chinese New Year is based on the lunisolar calendar and falls on the second new moon after the winter solstice, which places it between January 21 and February 20. This means people born in January or early February may belong to the previous Chinese zodiac year.' },
      { q: 'Which Chinese zodiac signs are most compatible?', a: 'Traditional compatibility groupings include: Rat, Dragon and Monkey (the "Achievers" trine); Ox, Snake and Rooster (the "Thinkers" trine); Tiger, Horse and Dog (the "Protectors" trine); Rabbit, Goat and Pig (the "Peacekeepers" trine). Signs within the same trine are considered highly compatible.' },
      { q: 'What does the Dragon year signify?', a: 'The Dragon is the only mythical animal in the Chinese zodiac and is considered the most auspicious sign. Dragon years are associated with strength, luck and prosperity. Children born in Dragon years are traditionally considered especially fortunate, which historically leads to higher birth rates in those years.' },
      { q: 'How is the Chinese zodiac used in compatibility and matchmaking?', a: 'In Chinese culture, zodiac compatibility is widely consulted for relationships, business partnerships and even naming children. Traditionally, certain animal combinations are considered harmonious (same trine) while others are seen as challenging (the six pairs of "clash" animals: Rat–Horse, Ox–Goat, Tiger–Monkey, Rabbit–Rooster, Dragon–Dog, Snake–Pig).' },
      { q: 'What is a "Ben Ming Nian" (zodiac year of birth)?', a: 'Ben Ming Nian refers to the year in which your own animal sign recurs — every 12 years. Contrary to what you might expect, this year is traditionally considered unlucky in Chinese culture because you are said to offend the God of Age (Tai Sui). Wearing red clothing or red accessories (especially gifted by elders) is the traditional remedy.' },
      { q: 'Is the Chinese zodiac used in other Asian cultures?', a: 'Yes. Variations of the 12-year animal cycle are used across East and Southeast Asia, including in Japanese (Eto), Korean (Tti), Vietnamese (Can Giap) and Thai astrological traditions. The animals sometimes differ slightly between cultures — for example, Vietnam uses Cat instead of Rabbit.' },
    ],
  },
  ru: {
    description: 'Китайский зодиак — это двенадцатилетний цикл, в котором каждый год представлен животным и связанными с ним характеристиками. Двенадцать животных — Крыса, Бык, Тигр, Кролик, Дракон, Змея, Лошадь, Коза, Обезьяна, Петух, Собака и Свинья — чередуются в фиксированном порядке, повторяясь каждые двенадцать лет. В отличие от западного зодиака, основанного на месяцах, китайский зодиак основан на годе рождения. Каждый знак животного дополнительно определяется одним из пяти элементов — Металл, Вода, Дерево, Огонь и Земля — создавая шестидесятилетний великий цикл.\n\nКаждый знак животного также несёт полярность инь или ян: нечётные годы — Инь, чётные — Ян. Вместе животное, элемент и полярность создают детальную картину вашей энергетической природы согласно китайской метафизической традиции. Если вы родились в январе или начале февраля, ваш китайский год может начаться в конце января или феврале предыдущего западного календарного года.',
    faqTitle: 'Часто задаваемые вопросы о китайском гороскопе',
    faqs: [
      { q: 'Чем китайский зодиак отличается от западного?', a: 'Западный зодиак присваивает знак на основе месяца рождения, а китайский — на основе года рождения. Китайский зодиак повторяется в 12-летнем цикле животных, тогда как западный повторяется ежегодно с 12 месячными знаками.' },
      { q: 'Каков порядок 12 животных китайского зодиака?', a: 'Порядок: Крыса, Бык, Тигр, Кролик, Дракон, Змея, Лошадь, Коза (Овца), Обезьяна, Петух, Собака, Свинья. Затем цикл повторяется снова с Крысы.' },
      { q: 'Как определить свой китайский элемент?', a: 'Элемент определяется по последней цифре года рождения: 0 или 1 → Металл, 2 или 3 → Вода, 4 или 5 → Дерево, 6 или 7 → Огонь, 8 или 9 → Земля. Каждый элемент повторяется два года подряд.' },
      { q: 'Что такое инь и ян в китайском гороскопе?', a: 'В китайском зодиаке чётные годы считаются Ян (активные, внешние, яркие), а нечётные — Инь (пассивные, внутренние, восприимчивые). Полярность добавляет ещё один уровень к энергетическому качеству года.' },
      { q: 'Почему китайский Новый год каждый раз в разную дату?', a: 'Китайский Новый год основан на лунно-солнечном календаре и приходится на второе новолуние после зимнего солнцестояния, что помещает его между 21 января и 20 февраля. Поэтому люди, рождённые в январе или начале февраля, могут принадлежать к предыдущему году китайского зодиака.' },
      { q: 'Какие знаки китайского зодиака наиболее совместимы?', a: 'Традиционные группы совместимости (триграммы): Крыса, Дракон и Обезьяна; Бык, Змея и Петух; Тигр, Лошадь и Собака; Кролик, Коза и Свинья. Знаки в одной триграмме считаются высоко совместимыми.' },
      { q: 'Что означает год Дракона?', a: 'Дракон — единственное мифическое животное в китайском зодиаке и считается самым благоприятным знаком. Годы Дракона ассоциируются с силой, удачей и процветанием. Дети, рождённые в год Дракона, традиционно считаются особенно везучими.' },
      { q: 'Как китайский зодиак используется для совместимости?', a: 'В китайской культуре совместимость по зодиаку широко используется для отношений, деловых партнёрств. Традиционно определённые комбинации животных считаются гармоничными (одна триграмма), а другие — конфликтными: Крыса–Лошадь, Бык–Коза, Тигр–Обезьяна, Кролик–Петух, Дракон–Собака, Змея–Свинья.' },
      { q: 'Что такое год Бэн Мин Нянь (свой год)?', a: 'Бэн Мин Нянь — год, когда ваш знак животного повторяется (каждые 12 лет). Вопреки ожиданиям, этот год традиционно считается неудачным в китайской культуре. Ношение красной одежды или красных аксессуаров является традиционным оберегом.' },
      { q: 'Используется ли китайский зодиак в других азиатских культурах?', a: 'Да. Варианты 12-летнего цикла животных используются по всей Восточной и Юго-Восточной Азии, в том числе в японской, корейской, вьетнамской и тайской астрологических традициях. Во Вьетнаме вместо Кролика используется Кот.' },
    ],
  },
  uk: {
    description: 'Китайський зодіак — це дванадцятирічний цикл, у якому кожен рік представлений твариною та пов\'язаними з нею характеристиками. Дванадцять тварин — Щур, Бик, Тигр, Кролик, Дракон, Змія, Кінь, Коза, Мавпа, Півень, Собака та Свиня — чергуються у фіксованому порядку, повторюючись кожні дванадцять років. На відміну від Західного зодіаку, заснованого на місяцях, китайський зодіак ґрунтується на році народження.\n\nКожен знак тварини також несе полярність інь або ян: непарні роки — Інь, парні — Ян. Разом тварина, елемент і полярність створюють детальну картину вашої енергетичної природи згідно з китайською метафізичною традицією. Якщо ви народилися в січні або на початку лютого, ваш китайський рік може починатися наприкінці січня або лютого попереднього Західного календарного року.',
    faqTitle: 'Поширені запитання про китайський гороскоп',
    faqs: [
      { q: 'Чим китайський зодіак відрізняється від Західного?', a: 'Захід призначає знак на основі місяця народження, тоді як китайський — на основі року народження. Китайський зодіак повторюється в 12-річному циклі тварин, тоді як Західний повторюється щорічно з 12 місячними знаками.' },
      { q: 'Який порядок 12 тварин китайського зодіаку?', a: 'Порядок: Щур, Бик, Тигр, Кролик, Дракон, Змія, Кінь, Коза (Вівця), Мавпа, Півень, Собака, Свиня. Потім цикл повторюється знову з Щура.' },
      { q: 'Як визначити свій китайський елемент?', a: 'Елемент визначається за останньою цифрою року народження: 0 або 1 → Метал, 2 або 3 → Вода, 4 або 5 → Дерево, 6 або 7 → Вогонь, 8 або 9 → Земля. Кожен елемент повторюється два роки поспіль.' },
      { q: 'Що таке інь і ян у китайському гороскопі?', a: 'У китайському зодіаку парні роки вважаються Ян (активні, зовнішні), а непарні — Інь (пасивні, внутрішні). Полярність додає ще один рівень до енергетичної якості року.' },
      { q: 'Чому китайський Новий рік щоразу в іншу дату?', a: 'Китайський Новий рік ґрунтується на місячно-сонячному календарі і припадає на другий новий місяць після зимового сонцестояння, що розміщує його між 21 січня та 20 лютого. Тому люди, що народилися в січні або на початку лютого, можуть належати до попереднього року китайського зодіаку.' },
      { q: 'Які знаки найбільш сумісні?', a: 'Традиційні групи сумісності (триграми): Щур, Дракон і Мавпа; Бик, Змія і Півень; Тигр, Кінь і Собака; Кролик, Коза і Свиня. Знаки в одній триграмі вважаються добре сумісними.' },
      { q: 'Що означає рік Дракона?', a: 'Дракон — єдина міфічна тварина в китайському зодіаку і вважається найбільш сприятливим знаком. Роки Дракона пов\'язані з силою, удачею та процвітанням. Діти, народжені в рік Дракона, традиційно вважаються особливо везучими.' },
      { q: 'Як використовується зодіак для сумісності?', a: 'У китайській культурі сумісність за зодіаком широко використовується для стосунків і ділових партнерств. Традиційно певні комбінації вважаються гармонійними, а інші — конфліктними: Щур–Кінь, Бик–Коза, Тигр–Мавпа, Кролик–Півень, Дракон–Собака, Змія–Свиня.' },
      { q: 'Що таке власний рік (Бен Мін Нянь)?', a: 'Бен Мін Нянь — рік, коли ваш знак тварини повторюється (кожні 12 років). Цей рік традиційно вважається невдалим у китайській культурі. Носіння червоного одягу або червоних аксесуарів є традиційним оберегом.' },
      { q: 'Чи використовується китайський зодіак в інших азіатських культурах?', a: 'Так. Варіанти 12-річного циклу тварин використовуються по всій Східній та Південно-Східній Азії, зокрема в японській, корейській, в\'єтнамській та тайській астрологічних традиціях. У В\'єтнамі замість Кролика використовується Кіт.' },
    ],
  },
  fr: {
    description: 'Le zodiaque chinois est un cycle de douze ans dans lequel chaque année est représentée par un animal et ses traits associés. Les douze animaux — Rat, Bœuf, Tigre, Lapin, Dragon, Serpent, Cheval, Chèvre, Singe, Coq, Chien et Cochon — se succèdent dans un ordre fixe, se répétant tous les douze ans. Contrairement au zodiaque occidental, basé sur les mois, le zodiaque chinois est basé sur l\'année de naissance. Chaque signe animal est en outre défini par l\'un des cinq éléments — Métal, Eau, Bois, Feu et Terre — créant un grand cycle de soixante ans.\n\nChaque signe animal porte également une polarité yin ou yang : les années impaires sont Yin, les années paires sont Yang. Ensemble, l\'animal, l\'élément et la polarité brossent un tableau détaillé de votre nature énergétique selon la tradition métaphysique chinoise. Si vous êtes né en janvier ou début février, votre année chinoise peut en réalité débuter fin janvier ou en février de l\'année civile précédente.',
    faqTitle: 'Questions fréquentes sur le zodiaque chinois',
    faqs: [
      { q: 'En quoi le zodiaque chinois diffère-t-il du zodiaque occidental ?', a: 'Le zodiaque occidental attribue un signe selon le mois de naissance, tandis que le zodiaque chinois l\'attribue selon l\'année de naissance. Le zodiaque chinois se répète en un cycle de 12 ans, alors que le zodiaque occidental se répète annuellement avec 12 signes mensuels.' },
      { q: 'Quel est l\'ordre des 12 animaux du zodiaque chinois ?', a: 'L\'ordre est : Rat, Bœuf, Tigre, Lapin, Dragon, Serpent, Cheval, Chèvre (ou Mouton), Singe, Coq, Chien, Cochon. Le cycle recommence ensuite avec le Rat.' },
      { q: 'Comment déterminer son élément chinois ?', a: 'L\'élément est déterminé par le dernier chiffre de l\'année de naissance : 0 ou 1 → Métal, 2 ou 3 → Eau, 4 ou 5 → Bois, 6 ou 7 → Feu, 8 ou 9 → Terre. Chaque élément se répète deux années consécutives.' },
      { q: 'Quelle est la différence entre les années Yin et Yang ?', a: 'Dans le zodiaque chinois, les années paires sont Yang (actives, extraverties) et les années impaires sont Yin (passives, introverties). La polarité ajoute une couche supplémentaire à la qualité énergétique de l\'année.' },
      { q: 'Pourquoi le Nouvel An chinois tombe-t-il à une date différente chaque année ?', a: 'Le Nouvel An chinois est basé sur le calendrier luni-solaire et tombe à la deuxième nouvelle lune après le solstice d\'hiver, entre le 21 janvier et le 20 février. Les personnes nées en janvier ou début février peuvent appartenir à l\'année zodiacale chinoise précédente.' },
      { q: 'Quels signes du zodiaque chinois sont les plus compatibles ?', a: 'Les groupes de compatibilité traditionnels sont : Rat, Dragon et Singe ; Bœuf, Serpent et Coq ; Tigre, Cheval et Chien ; Lapin, Chèvre et Cochon. Les signes du même groupe sont considérés comme très compatibles.' },
      { q: 'Que symbolise l\'année du Dragon ?', a: 'Le Dragon est le seul animal mythique du zodiaque chinois et est considéré comme le signe le plus auspicieux. Les années du Dragon sont associées à la force, la chance et la prospérité. Les enfants nés en année du Dragon sont traditionnellement considérés comme particulièrement chanceux.' },
      { q: 'Comment le zodiaque chinois est-il utilisé pour la compatibilité amoureuse ?', a: 'En Chine, la compatibilité zodiacale est largement consultée pour les relations amoureuses et les partenariats commerciaux. Certaines combinaisons sont harmonieuses (même trine), d\'autres conflictuelles : Rat–Cheval, Bœuf–Chèvre, Tigre–Singe, Lapin–Coq, Dragon–Chien, Serpent–Cochon.' },
      { q: 'Qu\'est-ce que le "Ben Ming Nian" (année de naissance zodiacale) ?', a: 'Le Ben Ming Nian désigne l\'année où votre animal revient dans le cycle — tous les 12 ans. Contrairement à ce qu\'on pourrait penser, cette année est traditionnellement considérée comme malchanceuse. Porter du rouge (surtout offert par des aînés) est le remède traditionnel.' },
      { q: 'Le zodiaque chinois est-il utilisé dans d\'autres cultures asiatiques ?', a: 'Oui. Des variantes du cycle de 12 animaux existent au Japon (Eto), en Corée (Tti), au Vietnam (Can Giap) et en Thaïlande. Les animaux peuvent légèrement différer selon les cultures — le Vietnam utilise le Chat à la place du Lapin.' },
    ],
  },
  lt: {
    description: 'Kinų zodiako kalendorius — tai dvylikos metų ciklas, kuriame kiekvienus metus atstovauja gyvūnas ir su juo susiję bruožai. Dvylika gyvūnų — Žiurkė, Jautis, Tigras, Triušis, Drakonas, Gyvatė, Arklys, Ožka, Beždžionė, Gaidys, Šuo ir Kiaulė — kaitaliojasi griežta tvarka, kartodamiesi kas dvylika metų. Skirtingai nuo Vakarų zodiako, pagrįsto mėnesiais, kinų zodiako ženklas nustatomas pagal gimimo metus.\n\nKiekvienas gyvūno ženklas taip pat turi yin arba yang poliarumą: nelyginiai metai yra Yin, lyginiai — Yang. Kartu gyvūnas, elementas ir poliarumas sudaro išsamų jūsų energetinės prigimties vaizdą pagal kinų metafizinę tradiciją. Jei gimėte sausio mėnesį ar vasario pradžioje, jūsų kiniški metai gali prasidėti sausio pabaigoje ar vasarį prieš tai buvusiais Vakarų kalendoriniais metais.',
    faqTitle: 'Dažnai užduodami klausimai apie kinų zodiaką',
    faqs: [
      { q: 'Kuo kinų zodiako ženklas skiriasi nuo Vakarų zodiako?', a: 'Vakarų zodiako ženklas priskiriamas pagal gimimo mėnesį, o kinų — pagal gimimo metus. Kinų zodiako ciklas kartojasi kas 12 metų, tuo tarpu Vakarų zodiako ciklas kartojasi kasmet su 12 mėnesinių ženklų.' },
      { q: 'Koks yra 12 kinų zodiako gyvūnų eiliškumas?', a: 'Eiliškumas: Žiurkė, Jautis, Tigras, Triušis, Drakonas, Gyvatė, Arklys, Ožka (arba Avis), Beždžionė, Gaidys, Šuo, Kiaulė. Tada ciklas prasideda iš naujo nuo Žiurkės.' },
      { q: 'Kaip nustatyti savo kinų elementą?', a: 'Elementas nustatomas pagal paskutinį gimimo metų skaitmenį: 0 arba 1 → Metalas, 2 arba 3 → Vanduo, 4 arba 5 → Medis, 6 arba 7 → Ugnis, 8 arba 9 → Žemė. Kiekvienas elementas kartojasi dvejus metus iš eilės.' },
      { q: 'Koks skirtumas tarp Yin ir Yang metų?', a: 'Kinų zodiakalyje lyginiai metai yra Yang (aktyvūs, ekstravertiški), o nelyginiai — Yin (pasyvūs, intravertiški). Poliarumas suteikia papildomą energetinės kokybės sluoksnį.' },
      { q: 'Kodėl kinų Naujieji metai prasideda skirtingomis datomis?', a: 'Kinų Naujieji metai pagrįsti mėnulio-saulės kalendoriumi ir patenka į antrą naujametį po žiemos saulėgrįžos, tarp sausio 21 d. ir vasario 20 d. Todėl gimę sausį ar vasario pradžioje gali priklausyti ankstesniems kinų metams.' },
      { q: 'Kurie kinų zodiako ženklai labiausiai suderinami?', a: 'Tradicinės suderinamumo grupės: Žiurkė, Drakonas ir Beždžionė; Jautis, Gyvatė ir Gaidys; Tigras, Arklys ir Šuo; Triušis, Ožka ir Kiaulė. To paties trigubo grupės ženklai laikomi labai suderinamais.' },
      { q: 'Ką simbolizuoja Drakono metai?', a: 'Drakonas yra vienintelis mitinis gyvūnas kinų zodiakalyje ir laikomas laimingiausiuoju ženklu. Drakono metai siejami su jėga, sėkme ir klestėjimu. Vaikai, gimę Drakono metais, tradiciškai laikomi ypač laimingais.' },
      { q: 'Kaip kinų zodiako ženklas naudojamas suderinamumui nustatyti?', a: 'Kinijos kultūroje zodiako suderinamumas plačiai naudojamas santykiuose ir verslo partnerystėse. Kai kurios kombinacijos laikomos harmoningomis, kitos — konfliktiškomis: Žiurkė–Arklys, Jautis–Ožka, Tigras–Beždžionė, Triušis–Gaidys, Drakonas–Šuo, Gyvatė–Kiaulė.' },
      { q: 'Kas yra "Ben Ming Nian" (savieji metai)?', a: 'Ben Ming Nian — metai, kai jūsų gyvūno ženklas sugrįžta cikle (kas 12 metų). Priešingai nei tikimasi, šie metai tradiciškai laikomi nesėkmingais. Raudonų drabužių ar aksesuarų (ypač padovanotų vyresniųjų) dėvėjimas yra tradicinė apsauga.' },
      { q: 'Ar kinų zodiako ženklas naudojamas kitose Azijos kultūrose?', a: 'Taip. 12 metų gyvūnų ciklo variantai naudojami visoje Rytų ir Pietryčių Azijoje, įskaitant Japonijoje (Eto), Korėjoje (Tti), Vietname (Can Giap) ir Tailande. Vietname Triušį pakeičia Katė.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/zodiac-sign', label: 'Western Zodiac Sign' },
    { href: '/calculator/celtic-zodiac', label: 'Celtic Zodiac' },
    { href: '/calculator/zodiac-compatibility', label: 'Zodiac Compatibility' },
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/age', label: 'Age Calculator' },
  ],
  ru: [
    { href: '/calculator/zodiac-sign', label: 'Знак западного зодиака' },
    { href: '/calculator/celtic-zodiac', label: 'Кельтский зодиак' },
    { href: '/calculator/zodiac-compatibility', label: 'Совместимость знаков' },
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/age', label: 'Калькулятор возраста' },
  ],
  uk: [
    { href: '/calculator/zodiac-sign', label: 'Знак Західного зодіаку' },
    { href: '/calculator/celtic-zodiac', label: 'Кельтський зодіак' },
    { href: '/calculator/zodiac-compatibility', label: 'Сумісність знаків' },
    { href: '/calculator/life-path', label: 'Число шляху життя' },
    { href: '/calculator/age', label: 'Калькулятор віку' },
  ],
  fr: [
    { href: '/calculator/zodiac-sign', label: 'Signe Zodiaque Occidental' },
    { href: '/calculator/celtic-zodiac', label: 'Zodiaque Celtique' },
    { href: '/calculator/zodiac-compatibility', label: 'Compatibilité des Signes' },
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/age', label: 'Calculateur d\'âge' },
  ],
  lt: [
    { href: '/calculator/zodiac-sign', label: 'Vakarų zodiako ženklas' },
    { href: '/calculator/celtic-zodiac', label: 'Keltų zodiako ženklas' },
    { href: '/calculator/zodiac-compatibility', label: 'Ženklų suderinamumas' },
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/chinese-zodiac', meta);
}

export function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function ChineseZodiacPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/chinese-zodiac`,
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
        <RelatedTools locale={locale} tools={related} />
        <ToolActions />
        <ChineseZodiacCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
          <FaqSection title={content.faqTitle} faqs={content.faqs} />
        </div>
      </PageLayout>
    </>
  );
}

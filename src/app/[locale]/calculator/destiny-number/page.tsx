import ToolActions from '@/components/ui/ToolActions';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import DestinyNumberCalculator from './DestinyNumberCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Destiny Number Calculator — Free Numerology Calculator',
    description: 'Calculate your Destiny Number free online. Enter your date of birth and discover the unique numerology number that reveals your life\'s purpose and potential path.',
    h1: 'Destiny Number Calculator',
    subtitle: 'Find your Destiny Number from your date of birth — a numerology figure that reveals your life\'s potential and inner mission.',
  },
  ru: {
    title: 'Число судьбы — Онлайн нумерология бесплатно',
    description: 'Рассчитайте число судьбы онлайн бесплатно. Введите дату рождения и узнайте нумерологическое число, которое раскрывает жизненное предназначение и потенциал.',
    h1: 'Число судьбы — калькулятор',
    subtitle: 'Найдите число судьбы по дате рождения — нумерологическое число, раскрывающее потенциал и жизненное предназначение.',
  },
  uk: {
    title: 'Число Долі — Нумерологія Онлайн Безкоштовно',
    description: 'Розрахуйте число долі онлайн безкоштовно. Введіть дату народження і дізнайтеся нумерологічне число, яке розкриває призначення та потенціал вашого життя.',
    h1: 'Число долі — калькулятор',
    subtitle: 'Знайдіть число долі за датою народження — нумерологічне число, що розкриває потенціал і внутрішнє призначення.',
  },
  fr: {
    title: 'Calculateur Nombre Destin — Numérologie Gratuite en Ligne',
    description: 'Calculez votre Nombre Destin gratuitement en ligne. Entrez votre date de naissance et découvrez le nombre numérologique qui révèle la mission et le potentiel de votre vie.',
    h1: 'Calculateur du Nombre Destin',
    subtitle: 'Trouvez votre Nombre Destin à partir de votre date de naissance — le chiffre révélant votre potentiel et mission de vie.',
  },
  lt: {
    title: 'Likimo Skaičiaus Skaičiuotuvas — Nemokama Numerologija',
    description: 'Apskaičiuokite savo likimo skaičių nemokamai internete. Įveskite gimimo datą ir sužinokite numerologinį skaičių, atskleidžiantį jūsų gyvenimo misiją ir potencialą.',
    h1: 'Likimo skaičiaus skaičiuotuvas',
    subtitle: 'Raskite savo likimo skaičių pagal gimimo datą — numerologinę reikšmę, atskleidžiančią jūsų potencialą ir vidinę misiją.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'The Destiny Number (also called the Expression Number in some traditions) is a core numerology figure derived from your date of birth using a method that differs from the Life Path Number. Rather than summing all digits at once, the Destiny Number reduces the day, month and year to single digits separately, then adds these three components together and reduces the result. This subtle mathematical distinction creates a different perspective on who you are — one focused on the potential, mission and inherent expression you carry in this lifetime.\n\nWhere the Life Path Number describes the road you travel, the Destiny Number speaks to the destination and the qualities you are meant to develop. Many numerologists use both numbers together to create a fuller picture of a person. Master numbers 11, 22 and 33 are preserved without reduction whenever they appear, as they carry an elevated spiritual frequency that numerology tradition honours as special callings.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the Destiny Number in numerology?', a: 'The Destiny Number (also called Expression Number) reveals the talents, abilities and mission you are meant to fulfil in this lifetime. It is calculated from your birth date using a component-by-component reduction method.' },
      { q: 'How is the Destiny Number different from the Life Path Number?', a: 'Both use the birth date but calculate differently. The Life Path sums all digits together before reducing. The Destiny Number reduces day, month and year separately first, then adds those three reduced values together and reduces again.' },
      { q: 'Can the Destiny and Life Path Numbers be the same?', a: 'Yes, it is possible for both to equal the same number, though the meaning is still approached from different angles — one describing your journey and the other describing your innate potential and mission.' },
      { q: 'What do master numbers mean in the Destiny Number?', a: 'If your calculation produces 11, 22 or 33 at any intermediate step or as the final result, it is preserved as a master number. These carry extra spiritual potency and indicate a life with heightened purpose and responsibility.' },
      { q: 'Is the Destiny Number based on the birth name or birth date?', a: 'In this calculator, the Destiny Number is based on your birth date. Some numerological traditions use a different system where Expression is derived from the full birth name. Our approach follows the birth-date school.' },
      { q: 'What does Destiny Number 1 mean?', a: 'A Destiny of 1 indicates you are meant to lead, innovate and stand out as an individual. Your mission is to develop confidence, self-reliance and the courage to pioneer new territory, whether in a career, ideas or lifestyle.' },
      { q: 'What does Destiny Number 9 mean?', a: 'A Destiny of 9 points to a humanitarian mission — you are here to serve, inspire and improve the world through wisdom and compassion. Often associated with teachers, healers, artists and global thinkers.' },
      { q: 'Which Destiny Numbers work well together in relationships?', a: 'Numerologists suggest 1 and 2 complement each other (leader and supporter), 3 and 6 share creativity and nurturing energy, and 4 and 8 both value structure and achievement. However, personal growth matters more than number pairing.' },
      { q: 'Does the Destiny Number change if I change my name?', a: 'Since this calculator uses your birth date (not your name), changing your name does not affect the result. In name-based numerology traditions, a legal name change would affect the Expression Number.' },
      { q: 'How accurate is numerology?', a: 'Numerology is a metaphysical system with thousands of years of tradition behind it, but it lacks scientific validation. It is best used as a reflective tool to spark self-awareness rather than as a predictive or diagnostic method.' },
    ],
  },
  ru: {
    description: 'Число судьбы (называемое также числом выражения в ряде традиций) — ключевое нумерологическое число, вычисляемое по дате рождения методом, отличным от числа жизненного пути. Вместо суммирования всех цифр сразу, число судьбы редуцирует день, месяц и год до однозначных чисел по отдельности, а затем складывает эти три компонента и редуцирует результат. Это тонкое математическое различие создаёт другой взгляд на личность — сосредоточенный на потенциале, миссии и врождённом выражении.\n\nЕсли число жизненного пути описывает дорогу, которую вы проходите, то число судьбы говорит о пункте назначения и качествах, которые вам предстоит развить. Многие нумерологи используют оба числа вместе для создания более полной картины личности. Мастер-числа 11, 22 и 33 сохраняются без редукции, когда бы они ни появились.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое число судьбы в нумерологии?', a: 'Число судьбы (также называется числом выражения) раскрывает таланты, способности и миссию, которые вам предстоит реализовать. Рассчитывается по дате рождения методом пошаговой редукции.' },
      { q: 'Чем число судьбы отличается от числа жизненного пути?', a: 'Оба используют дату рождения, но методы разные. Число жизненного пути суммирует все цифры сразу. Число судьбы редуцирует день, месяц и год по отдельности, затем складывает три результата и редуцирует ещё раз.' },
      { q: 'Могут ли числа судьбы и жизненного пути совпадать?', a: 'Да, совпадение возможно, хотя смысл рассматривается с разных ракурсов: одно описывает путь, другое — врождённый потенциал и миссию.' },
      { q: 'Что означают мастер-числа в числе судьбы?', a: 'Если вычисление даёт 11, 22 или 33 на промежуточном этапе или как итоговый результат, они сохраняются как мастер-числа. Они несут повышенную духовную потенцию и указывают на жизнь с особой миссией.' },
      { q: 'Число судьбы основано на имени или дате рождения?', a: 'В этом калькуляторе — на дате рождения. В некоторых нумерологических традициях число выражения выводится из полного имени при рождении. Наш подход следует школе даты рождения.' },
      { q: 'Что означает число судьбы 1?', a: 'Судьба 1 указывает на миссию лидировать, новаторствовать и выделяться. Задача — развивать уверенность, самостоятельность и смелость прокладывать новые пути в карьере, идеях или образе жизни.' },
      { q: 'Что означает число судьбы 9?', a: 'Судьба 9 указывает на гуманистическую миссию — служить, вдохновлять и улучшать мир через мудрость и сострадание. Часто связана с учителями, целителями, художниками и мыслителями.' },
      { q: 'Какие числа судьбы хорошо сочетаются в отношениях?', a: 'Нумерологи считают, что 1 и 2 дополняют друг друга, 3 и 6 разделяют творчество и заботу, 4 и 8 ценят структуру и достижения. Однако личностный рост важнее совпадения чисел.' },
      { q: 'Изменится ли число судьбы при смене имени?', a: 'Поскольку этот калькулятор использует дату рождения, смена имени не влияет на результат. В традициях, основанных на имени, юридическая смена имени изменила бы число выражения.' },
      { q: 'Насколько точна нумерология?', a: 'Нумерология — метафизическая система с тысячелетней традицией, но без научного подтверждения. Её лучше использовать как инструмент рефлексии для пробуждения самосознания, а не как предсказательную систему.' },
    ],
  },
  uk: {
    description: 'Число долі (також зване числом виразу в деяких традиціях) — ключове нумерологічне число, що обчислюється за датою народження методом, відмінним від числа життєвого шляху. Замість суммування всіх цифр одразу, число долі редукує день, місяць і рік до однозначних чисел окремо, потім складає ці три компоненти і редукує результат. Це тонке математичне розрізнення створює інший погляд на особистість — зосереджений на потенціалі, місії та вродженому виразі.\n\nЯкщо число життєвого шляху описує дорогу, яку ви проходите, то число долі говорить про пункт призначення та якості, які вам належить розвинути. Багато нумерологів використовують обидва числа разом для створення повнішої картини особистості. Майстер-числа 11, 22 і 33 зберігаються без редукції, коли б вони не з\'явилися.',
    faqTitle: 'Часті питання',
    faqs: [
      { q: 'Що таке число долі в нумерології?', a: 'Число долі (також число виразу) розкриває таланти, здібності та місію, які вам належить реалізувати. Розраховується за датою народження методом покрокової редукції.' },
      { q: 'Чим число долі відрізняється від числа життєвого шляху?', a: 'Обидва використовують дату народження, але методи різні. Число шляху підсумовує всі цифри відразу. Число долі редукує день, місяць і рік окремо, потім складає три результати і редукує ще раз.' },
      { q: 'Чи можуть числа долі і життєвого шляху збігатися?', a: 'Так, збіг можливий, хоча сенс розглядається з різних кутів: одне описує шлях, інше — вроджений потенціал та місію.' },
      { q: 'Що означають майстер-числа у числі долі?', a: 'Якщо обчислення дає 11, 22 або 33 на проміжному етапі або як підсумковий результат, вони зберігаються як майстер-числа з підвищеною духовною потенцією та особливою місією.' },
      { q: 'Число долі засноване на імені чи на даті народження?', a: 'У цьому калькуляторі — на даті народження. У деяких традиціях число виразу виводиться з повного імені при народженні. Наш підхід слідує школі дати народження.' },
      { q: 'Що означає число долі 1?', a: 'Доля 1 вказує на місію лідирувати, новаторствувати та виділятися. Завдання — розвивати впевненість, самостійність та сміливість прокладати нові шляхи в кар\'єрі, ідеях або способі життя.' },
      { q: 'Що означає число долі 9?', a: 'Доля 9 вказує на гуманістичну місію — служити, надихати та покращувати світ через мудрість і співчуття. Часто пов\'язана з вчителями, цілителями, художниками та мислителями.' },
      { q: 'Які числа долі добре поєднуються у стосунках?', a: 'Нумерологи вважають, що 1 і 2 доповнюють одне одного, 3 і 6 ділять творчість і турботу, 4 і 8 цінують структуру та досягнення. Однак особистісний ріст важливіший за збіг чисел.' },
      { q: 'Чи зміниться число долі при зміні імені?', a: 'Оскільки цей калькулятор використовує дату народження, зміна імені не впливає на результат. У традиціях, заснованих на імені, юридична зміна імені змінила б число виразу.' },
      { q: 'Наскільки точна нумерологія?', a: 'Нумерологія — метафізична система з тисячолітньою традицією, але без наукового підтвердження. Її краще використовувати як інструмент рефлексії для пробудження самосвідомості.' },
    ],
  },
  fr: {
    description: 'Le Nombre Destin (également appelé Nombre Expression dans certaines traditions) est un chiffre clé en numérologie, dérivé de votre date de naissance par une méthode qui diffère du Nombre Chemin de Vie. Plutôt que d\'additionner tous les chiffres d\'un coup, le Nombre Destin réduit séparément le jour, le mois et l\'année à des chiffres uniques, puis additionne ces trois composantes et réduit le résultat. Cette subtile distinction mathématique crée une perspective différente — focalisée sur le potentiel, la mission et l\'expression inhérente que vous portez dans cette vie.\n\nLà où le Chemin de Vie décrit la route que vous parcourez, le Nombre Destin évoque la destination et les qualités que vous êtes censé développer. De nombreux numérologues utilisent les deux nombres ensemble pour avoir une image plus complète d\'une personne. Les nombres maîtres 11, 22 et 33 sont préservés sans réduction chaque fois qu\'ils apparaissent, car ils portent une fréquence spirituelle élevée que la tradition numérologique reconnaît comme une vocation spéciale.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le Nombre Destin en numérologie ?', a: 'Le Nombre Destin révèle les talents, capacités et mission que vous êtes censé accomplir dans cette vie. Il est calculé à partir de votre date de naissance par une méthode de réduction composante par composante.' },
      { q: 'En quoi le Nombre Destin diffère-t-il du Chemin de Vie ?', a: 'Les deux utilisent la date de naissance mais calculent différemment. Le Chemin de Vie additionne d\'abord tous les chiffres. Le Nombre Destin réduit séparément le jour, le mois et l\'année, puis additionne les trois valeurs réduites.' },
      { q: 'Le Destin et le Chemin de Vie peuvent-ils être identiques ?', a: 'Oui, c\'est possible, bien que le sens soit abordé sous des angles différents — l\'un décrivant votre voyage, l\'autre votre potentiel et mission innés.' },
      { q: 'Que signifient les nombres maîtres dans le Nombre Destin ?', a: 'Si le calcul produit 11, 22 ou 33, ils sont conservés comme nombres maîtres. Ils portent une puissance spirituelle accrue et indiquent une vie avec un but et une responsabilité élevés.' },
      { q: 'Le Nombre Destin est-il basé sur le nom ou la date de naissance ?', a: 'Dans ce calculateur, il est basé sur la date de naissance. Certaines traditions numérologique dérivent le Nombre Expression du nom complet de naissance. Notre approche suit l\'école de la date de naissance.' },
      { q: 'Que signifie un Nombre Destin 1 ?', a: 'Un Destin 1 indique que vous êtes destiné à diriger, innover et vous distinguer. Votre mission est de développer confiance, autonomie et courage pour être pionnier dans votre carrière, vos idées ou votre mode de vie.' },
      { q: 'Que signifie un Nombre Destin 9 ?', a: 'Un Destin 9 indique une mission humanitaire — vous êtes ici pour servir, inspirer et améliorer le monde par la sagesse et la compassion. Souvent associé aux enseignants, guérisseurs, artistes et penseurs.' },
      { q: 'Quels Nombres Destin fonctionnent bien ensemble dans les relations ?', a: 'Les numérologues suggèrent que 1 et 2 se complètent, 3 et 6 partagent créativité et bienveillance, et 4 et 8 valorisent structure et réussite. Cependant, la croissance personnelle importe plus que les paires de nombres.' },
      { q: 'Mon Nombre Destin change-t-il si je change de nom ?', a: 'Ce calculateur utilise la date de naissance, donc un changement de nom n\'affecte pas le résultat. Dans les traditions basées sur le nom, un changement légal affecterait le Nombre Expression.' },
      { q: 'La numérologie est-elle précise ?', a: 'La numérologie est un système métaphysique millénaire mais sans validation scientifique. Elle est mieux utilisée comme outil de réflexion pour stimuler la conscience de soi plutôt que comme méthode prédictive.' },
    ],
  },
  lt: {
    description: 'Likimo skaičius (kai kuriose tradicijose vadinamas Raiškos skaičiumi) yra pagrindinis numerologinis skaičius, gautas iš gimimo datos naudojant metodą, kuris skiriasi nuo gyvenimo kelio skaičiaus. Vietoj to, kad sumuotų visus skaitmenis iš karto, likimo skaičius atskirai mažina dieną, mėnesį ir metus iki vieno skaitmens, tada sumuoja šias tris sudedamąsias dalis ir mažina rezultatą. Šis subtilus matematinis skirtumas sukuria kitokią perspektyvą — sutelktą į potencialą, misiją ir įgimtą raišką, kurią nešiojate šiame gyvenime.\n\nJei gyvenimo kelio skaičius aprašo kelią, kurį einatė, tai likimo skaičius kalba apie tikslą ir savybes, kurias turite ugdyti. Daugelis numerologų naudoja abu skaičius kartu, kad sukurtų pilnesnį žmogaus paveikslą. Meistro skaičiai 11, 22 ir 33 išsaugomi be sumažinimo, kai tik pasirodo, nes jie nešioja padidintą dvasinę dažnį, kurią numerologijos tradicija gerbia kaip ypatingą pašaukimą.',
    faqTitle: 'Dažni klausimai',
    faqs: [
      { q: 'Kas yra likimo skaičius numerologijoje?', a: 'Likimo skaičius atskleidžia talentus, gebėjimus ir misiją, kuriuos turite įvykdyti šiame gyvenime. Jis apskaičiuojamas iš gimimo datos naudojant komponentų mažinimo metodą.' },
      { q: 'Kuo likimo skaičius skiriasi nuo gyvenimo kelio skaičiaus?', a: 'Abu naudoja gimimo datą, bet skaičiuoja skirtingai. Gyvenimo kelio skaičius pirmiausia susumuoja visus skaitmenis. Likimo skaičius atskirai mažina dieną, mėnesį ir metus, tada sumuoja tris mažintus skaičius.' },
      { q: 'Ar likimo ir gyvenimo kelio skaičiai gali sutapti?', a: 'Taip, sutapimas įmanomas, nors prasmė nagrinėjama iš skirtingų kampų — vienas aprašo jūsų kelionę, kitas — įgimtą potencialą ir misiją.' },
      { q: 'Ką reiškia meistro skaičiai likimo skaičiuje?', a: 'Jei skaičiavimas duoda 11, 22 ar 33, jie išsaugomi kaip meistro skaičiai su padidinta dvasine galia, nurodančia gyvenimą su aukštu tikslu ir atsakomybe.' },
      { q: 'Ar likimo skaičius grindžiamas vardu ar gimimo data?', a: 'Šiame skaičiuotuve — gimimo data. Kai kuriose tradicijose raiškos skaičius išvedamas iš viso gimimo vardo. Mūsų požiūris seka gimimo datos mokykla.' },
      { q: 'Ką reiškia likimo skaičius 1?', a: 'Likimas 1 nurodo, kad esate destined vadovauti, novatoriauti ir išsiskirti. Jūsų misija — ugdyti pasitikėjimą, savarankiškumą ir drąsą naujinti karjerą, idėjas ar gyvenimo būdą.' },
      { q: 'Ką reiškia likimo skaičius 9?', a: 'Likimas 9 nurodo humanistinę misiją — tarnauti, įkvėpti ir gerinti pasaulį per išmintį ir užuojautą. Dažnai siejamas su mokytojais, gydytojais, menininkais ir mąstytojais.' },
      { q: 'Kurie likimo skaičiai gerai dera santykiuose?', a: 'Numerologai siūlo, kad 1 ir 2 papildo vienas kitą, 3 ir 6 dalijasi kūrybiškumu ir rūpestingumu, o 4 ir 8 vertina struktūrą ir pasiekimus. Tačiau asmeninis augimas svarbiau nei skaičių pora.' },
      { q: 'Ar mano likimo skaičius keisis, jei pakeisiu vardą?', a: 'Šis skaičiuotuvas naudoja gimimo datą, todėl vardo keitimas neturi įtakos rezultatui. Vardo pagrindu veikiančiose tradicijose teisinis vardo keitimas pakeistų raiškos skaičių.' },
      { q: 'Ar numerologija yra tiksli?', a: 'Numerologija yra metafizinė sistema su tūkstančių metų tradicija, bet be mokslinio patvirtinimo. Geriausia ją naudoti kaip refleksijos įrankį savimogai skatinti, o ne kaip nuspėjamąją sistemą.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/name-number', label: 'Name Number' },
    { href: '/calculator/soul-number', label: 'Soul Number' },
    { href: '/calculator/personality-number', label: 'Personality Number' },
    { href: '/calculator/age', label: 'Age Calculator' },
  ],
  ru: [
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/name-number', label: 'Число имени' },
    { href: '/calculator/soul-number', label: 'Число души' },
    { href: '/calculator/personality-number', label: 'Число личности' },
    { href: '/calculator/age', label: 'Калькулятор возраста' },
  ],
  uk: [
    { href: '/calculator/life-path', label: 'Число життєвого шляху' },
    { href: '/calculator/name-number', label: 'Число імені' },
    { href: '/calculator/soul-number', label: 'Число душі' },
    { href: '/calculator/personality-number', label: 'Число особистості' },
    { href: '/calculator/age', label: 'Калькулятор віку' },
  ],
  fr: [
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/name-number', label: 'Nombre du Nom' },
    { href: '/calculator/soul-number', label: "Nombre de l'Âme" },
    { href: '/calculator/personality-number', label: 'Nombre de Personnalité' },
    { href: '/calculator/age', label: 'Calculateur d\'âge' },
  ],
  lt: [
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/name-number', label: 'Vardo skaičius' },
    { href: '/calculator/soul-number', label: 'Sielos skaičius' },
    { href: '/calculator/personality-number', label: 'Asmenybės skaičius' },
    { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/destiny-number', meta);
}

export async function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function DestinyNumberPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/destiny-number`,
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
        {meta.subtitle && <p className={styles.page__subtitle}>{meta.subtitle}</p>}
        <ToolActions />
        <RelatedTools locale={locale} tools={related} />
        <DestinyNumberCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
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

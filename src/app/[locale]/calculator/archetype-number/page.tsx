import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import ArchetypeNumberCalculator from './ArchetypeNumberCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Personality Archetype Calculator — Find Your Numerology Type', description: 'Discover your personality archetype from your birth date using numerology. Get your life path number mapped to one of 12 archetypes with strengths, challenges and life purpose. Free tool.', h1: 'Personality Archetype Calculator', subtitle: 'Discover your numerological personality archetype from your birth date — one of 12 types based on your Life Path Number.' },
  ru: { title: 'Калькулятор архетипа личности — нумерология по дате рождения', description: 'Узнайте свой архетип личности по дате рождения через нумерологию. Получите число жизненного пути и сопоставьте с одним из 12 архетипов с описанием сильных сторон и предназначения.', h1: 'Калькулятор архетипа личности', subtitle: 'Узнайте нумерологический архетип личности по дате рождения — один из 12 типов на основе числа жизненного пути.' },
  uk: { title: 'Калькулятор архетипу особистості — нумерологія за датою народження', description: 'Дізнайтеся свій архетип особистості за датою народження через нумерологію. Зіставте число шляху життя з одним із 12 архетипів з описом сильних сторін і призначення.', h1: 'Калькулятор архетипу особистості', subtitle: 'Дізнайтеся нумерологічний архетип особистості за датою народження — один із 12 типів на основі числа шляху життя.' },
  fr: { title: 'Archétype de Personnalité — Calculateur Numérologique', description: 'Découvrez votre archétype de personnalité à partir de votre date de naissance par la numérologie. Chemin de vie mappé à l\'un des 12 archétypes avec forces, défis et but de vie. Gratuit.', h1: 'Calculateur d\'Archétype de Personnalité', subtitle: 'Découvrez votre archétype de personnalité numérologique par date de naissance — l\'un des 12 types selon votre Chemin de Vie.' },
  lt: { title: 'Asmenybės archetipo skaičiuotuvas — numerologinis tipas', description: 'Sužinokite savo asmenybės archetipą iš gimimo datos per numerologiją. Gyvenimo kelio numeris susietas su vienu iš 12 archetipų su stiprybėmis, iššūkiais ir gyvenimo tikslu. Nemokama.', h1: 'Asmenybės archetipo skaičiuotuvas', subtitle: 'Sužinokite savo numerologinį asmenybės archetipą pagal gimimo datą — vieną iš 12 tipų pagal jūsų gyvenimo kelio skaičių.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'A personality archetype is a universal character pattern — a symbolic role that captures the essential qualities, drives and challenges of a particular type of person. In numerology, your archetype is determined by your Life Path Number, which is calculated by reducing all the digits of your full birth date (day + month + year) to a single number or one of the three master numbers (11, 22, 33). Each number maps to one of 12 fundamental archetypes, drawn from the traditions of Jungian psychology, numerological wisdom and cross-cultural mythological study. These archetypes are not boxes to be trapped in, but lenses through which you can better understand your natural gifts, your recurring patterns of behaviour and the deepest calling of your soul.\n\nThe twelve archetypes — from the Pioneer (1) through the Sage (9) and the three master archetypes (the Visionary at 11, the Master Builder at 22, and the Master Teacher at 33) — each represent a distinct energetic frequency and life mission. Knowing your archetype can help you understand why certain situations come naturally to you, why others feel like constant struggle, and what kind of contribution you are uniquely positioned to make in the world. Enter your birth date to discover your archetype, explore your core strengths and challenges, and read your life purpose statement.',
    faqTitle: 'Frequently Asked Questions about Personality Archetypes',
    faqs: [
      { q: 'What is a personality archetype in numerology?', a: 'A numerological personality archetype is a symbolic character pattern determined by your Life Path Number. It represents the essential qualities, drives and challenges of your soul\'s journey — the role you are here to play, the gifts you carry and the lessons you are here to learn.' },
      { q: 'How is the archetype number calculated?', a: 'Your archetype number is the same as your Life Path Number. Add all the digits of your birth date (day + month + year) together, then reduce the total to a single digit — unless you arrive at 11, 22 or 33, which are master numbers and are not reduced further.' },
      { q: 'What are the 12 archetypes in numerology?', a: '1 — The Pioneer; 2 — The Diplomat; 3 — The Storyteller; 4 — The Architect; 5 — The Adventurer; 6 — The Healer; 7 — The Mystic; 8 — The Executive; 9 — The Sage; 11 — The Visionary; 22 — The Master Builder; 33 — The Master Teacher.' },
      { q: 'What are master number archetypes?', a: 'Master numbers 11, 22 and 33 are not reduced to single digits because they carry an amplified, higher-octave energy. The Visionary (11) operates on heightened intuition and inspiration; the Master Builder (22) combines vision with practical mastery; the Master Teacher (33) serves humanity through unconditional love and healing wisdom.' },
      { q: 'Is my archetype the same as my Life Path Number?', a: 'Yes. The archetype calculator uses the Life Path Number as its foundation, and maps that number to an archetypal character pattern. The archetype system adds a narrative and psychological layer to what numerology reveals about your life path.' },
      { q: 'What is the Pioneer archetype (1)?', a: 'The Pioneer is the archetype of independence, leadership and original thinking. Those born under the 1 are natural initiators — they forge new paths, take initiative and inspire others through their courage and originality. Their shadow includes a tendency to dominate and struggle with collaboration.' },
      { q: 'What is the Sage archetype (9)?', a: 'The Sage is the archetype of compassion, wisdom and universal service. Those born under the 9 carry deep empathy and broad perspective, often feeling called to serve a cause larger than themselves. Their shadow includes difficulty releasing past attachments and recognising their own needs.' },
      { q: 'Can two people with the same archetype have very different personalities?', a: 'Yes. The archetype describes the energetic frequency and core themes of your life path, not a rigid personality type. How those themes manifest depends on your entire birth chart (in astrology), upbringing, culture, choices and individual expression. Two Healers (6) may live entirely different lives while sharing the same core drive toward care and harmony.' },
      { q: 'What is the difference between archetype and personality type?', a: 'Personality types (like Myers-Briggs or Enneagram) are psychological models based on cognitive functions or core fears. Numerological archetypes are based on the symbolic meaning of numbers and their vibrational correspondence to life patterns. Both are frameworks for self-understanding; they complement rather than replace each other.' },
      { q: 'How can knowing my archetype help me in real life?', a: 'Understanding your archetype helps you recognise your natural talents and stop fighting against your own nature. It clarifies why certain situations feel effortless and others feel like swimming upstream. It also provides a language for understanding your recurring patterns — both the strengths you can lean into and the challenges that require conscious work.' },
    ],
  },
  ru: {
    description: 'Архетип личности — это универсальный паттерн характера, символическая роль, которая отражает ключевые качества, стремления и вызовы определённого типа человека. В нумерологии ваш архетип определяется числом жизненного пути, которое рассчитывается путём сложения всех цифр полной даты рождения до одной цифры или одного из трёх мастер-чисел (11, 22, 33). Каждое число соответствует одному из 12 фундаментальных архетипов, почерпнутых из традиций юнгианской психологии, нумерологической мудрости и кросс-культурного мифологического исследования.\n\nДвенадцать архетипов — от Первопроходца (1) до Мудреца (9) и трёх мастер-архетипов (Визионер — 11, Мастер-строитель — 22, Мастер-учитель — 33) — каждый представляет отдельную энергетическую частоту и жизненную миссию. Знание своего архетипа помогает понять, почему одни ситуации даются вам легко, а другие ощущаются постоянной борьбой, и какой вклад вы уникально способны внести в мир.',
    faqTitle: 'Часто задаваемые вопросы об архетипах личности',
    faqs: [
      { q: 'Что такое архетип личности в нумерологии?', a: 'Нумерологический архетип личности — символический паттерн характера, определяемый числом жизненного пути. Он представляет ключевые качества, стремления и вызовы пути вашей души — роль, которую вы здесь играете, дары и уроки жизни.' },
      { q: 'Как рассчитывается число архетипа?', a: 'Число архетипа совпадает с числом жизненного пути. Сложите все цифры даты рождения (день + месяц + год), затем сведите сумму к одной цифре — если только не получите 11, 22 или 33 (мастер-числа, которые не сводятся далее).' },
      { q: 'Каковы 12 архетипов в нумерологии?', a: '1 — Первопроходец; 2 — Дипломат; 3 — Рассказчик; 4 — Архитектор; 5 — Авантюрист; 6 — Целитель; 7 — Мистик; 8 — Руководитель; 9 — Мудрец; 11 — Визионер; 22 — Мастер-строитель; 33 — Мастер-учитель.' },
      { q: 'Что такое мастер-числа архетипов?', a: 'Мастер-числа 11, 22 и 33 не сводятся до одной цифры, поскольку несут усиленную, высокооктавную энергию. Визионер (11) работает на повышенной интуиции; Мастер-строитель (22) сочетает видение с практическим мастерством; Мастер-учитель (33) служит человечеству через безусловную любовь.' },
      { q: 'Является ли мой архетип тем же, что число жизненного пути?', a: 'Да. Калькулятор архетипа использует число жизненного пути как основу и сопоставляет его с архетипическим паттерном характера.' },
      { q: 'Что такое архетип Первопроходца (1)?', a: 'Первопроходец — архетип независимости, лидерства и оригинального мышления. Рождённые под числом 1 — природные инициаторы, прокладывающие новые пути и вдохновляющие других смелостью и оригинальностью.' },
      { q: 'Что такое архетип Мудреца (9)?', a: 'Мудрец — архетип сострадания, мудрости и универсального служения. Рождённые под числом 9 несут глубокую эмпатию и широкую перспективу, часто ощущая призыв служить делу, превышающему их самих.' },
      { q: 'Могут ли два человека с одним архетипом иметь разные личности?', a: 'Да. Архетип описывает энергетическую частоту и ключевые темы жизненного пути, а не жёсткий тип личности. Как эти темы проявляются — зависит от воспитания, культуры, выбора и индивидуального выражения.' },
      { q: 'Чем архетип отличается от типа личности?', a: 'Типы личности (MBTI, Эннеаграмма) основаны на когнитивных функциях или базовых страхах. Нумерологические архетипы основаны на символическом значении чисел и их вибрационном соответствии жизненным паттернам.' },
      { q: 'Как знание своего архетипа помогает в реальной жизни?', a: 'Понимание архетипа помогает признать свои природные таланты и перестать бороться с собственной природой. Оно прояснит, почему одни ситуации ощущаются лёгкими, а другие — борьбой против течения.' },
    ],
  },
  uk: {
    description: 'Архетип особистості — це універсальний паттерн характеру, символічна роль, що відображає ключові якості, прагнення та виклики певного типу людини. У нумерології ваш архетип визначається числом шляху життя, яке розраховується шляхом складання всіх цифр повної дати народження до однієї цифри або одного з трьох майстер-чисел (11, 22, 33). Кожне число відповідає одному з 12 фундаментальних архетипів, почерпнутих із традицій юнгіанської психології та нумерологічної мудрості.\n\nДванадцять архетипів — від Першопрохідця (1) до Мудреця (9) і трьох майстер-архетипів (Візіонер — 11, Майстер-будівельник — 22, Майстер-вчитель — 33) — кожен представляє окрему енергетичну частоту та життєву місію. Знання свого архетипу допомагає зрозуміти, чому одні ситуації даються легко, а інші відчуваються постійною боротьбою.',
    faqTitle: 'Поширені запитання про архетипи особистості',
    faqs: [
      { q: 'Що таке архетип особистості в нумерології?', a: 'Нумерологічний архетип — символічний паттерн характеру, що визначається числом шляху життя. Він представляє ключові якості, прагнення та виклики шляху вашої душі — роль, яку ви тут відіграєте, та ваші дари.' },
      { q: 'Як розраховується число архетипу?', a: 'Число архетипу збігається з числом шляху життя. Складіть усі цифри дати народження (день + місяць + рік), потім зведіть суму до однієї цифри — якщо тільки не отримаєте 11, 22 або 33 (майстер-числа).' },
      { q: 'Які 12 архетипів у нумерології?', a: '1 — Першопрохідець; 2 — Дипломат; 3 — Оповідач; 4 — Архітектор; 5 — Авантюрист; 6 — Цілитель; 7 — Містик; 8 — Керівник; 9 — Мудрець; 11 — Візіонер; 22 — Майстер-будівельник; 33 — Майстер-вчитель.' },
      { q: 'Що таке майстер-числа архетипів?', a: 'Майстер-числа 11, 22 та 33 не зводяться до однієї цифри, оскільки несуть посилену енергію. Візіонер (11) — на підвищеній інтуїції; Майстер-будівельник (22) — поєднує бачення з практичністю; Майстер-вчитель (33) — служить людству через безумовну любов.' },
      { q: 'Мій архетип — це те ж, що число шляху життя?', a: 'Так. Калькулятор архетипу використовує число шляху життя як основу і зіставляє його з архетипічним паттерном характеру.' },
      { q: 'Що таке архетип Першопрохідця (1)?', a: 'Першопрохідець — архетип незалежності, лідерства та оригінального мислення. Народжені під числом 1 — природні ініціатори, що прокладають нові шляхи та надихають інших сміливістю.' },
      { q: 'Що таке архетип Мудреця (9)?', a: 'Мудрець — архетип співчуття, мудрості та універсального служіння. Народжені під числом 9 несуть глибоку емпатію, часто відчуваючи заклик служити справі, що перевищує їх самих.' },
      { q: 'Чи можуть двоє з однаковим архетипом мати різні особистості?', a: 'Так. Архетип описує енергетичну частоту та ключові теми шляху, а не жорсткий тип особистості. Те, як ці теми проявляються, залежить від виховання, культури та індивідуального вираження.' },
      { q: 'Чим архетип відрізняється від типу особистості?', a: 'Типи особистості (MBTI, Єннеаграма) засновані на когнітивних функціях. Нумерологічні архетипи засновані на символічному значенні чисел та їхній відповідності жизнєвим паттернам.' },
      { q: 'Як знання архетипу допомагає в реальному житті?', a: 'Розуміння архетипу допомагає визнати природні таланти і перестати боротися з власною природою. Воно прояснить, чому одні ситуації відчуваються легкими, а інші — боротьбою проти течії.' },
    ],
  },
  fr: {
    description: 'Un archétype de personnalité est un modèle de caractère universel — un rôle symbolique qui capture les qualités essentielles, les motivations et les défis d\'un certain type de personne. En numérologie, votre archétype est déterminé par votre Chemin de Vie, calculé en réduisant tous les chiffres de votre date de naissance complète à un seul chiffre ou à l\'un des trois nombres maîtres (11, 22, 33). Chaque nombre correspond à l\'un des 12 archétypes fondamentaux, puisés dans les traditions de la psychologie jungienne, de la sagesse numérologique et des études mythologiques transculturelles.\n\nLes douze archétypes — du Pionnier (1) au Sage (9) et les trois archétypes maîtres (le Visionnaire à 11, le Maître Bâtisseur à 22 et le Maître Enseignant à 33) — représentent chacun une fréquence énergétique distincte et une mission de vie. Connaître votre archétype peut vous aider à comprendre pourquoi certaines situations vous sont naturelles, pourquoi d\'autres semblent être une lutte constante, et quelle contribution vous êtes uniquement positionné à apporter au monde.',
    faqTitle: 'Questions fréquentes sur les archétypes de personnalité',
    faqs: [
      { q: 'Qu\'est-ce qu\'un archétype de personnalité en numérologie ?', a: 'Un archétype numérologique est un modèle de caractère symbolique déterminé par votre Chemin de Vie. Il représente les qualités essentielles, les motivations et les défis du voyage de votre âme — le rôle que vous êtes ici pour jouer, les dons que vous portez et les leçons à apprendre.' },
      { q: 'Comment calcule-t-on le nombre d\'archétype ?', a: 'Le nombre d\'archétype est identique au Chemin de Vie. Additionnez tous les chiffres de votre date de naissance (jour + mois + année), puis réduisez le total à un seul chiffre — sauf si vous obtenez 11, 22 ou 33 (nombres maîtres, non réduits davantage).' },
      { q: 'Quels sont les 12 archétypes en numérologie ?', a: '1 — Le Pionnier ; 2 — Le Diplomate ; 3 — Le Conteur ; 4 — L\'Architecte ; 5 — L\'Aventurier ; 6 — Le Guérisseur ; 7 — Le Mystique ; 8 — L\'Exécutif ; 9 — Le Sage ; 11 — Le Visionnaire ; 22 — Le Maître Bâtisseur ; 33 — Le Maître Enseignant.' },
      { q: 'Que sont les archétypes des nombres maîtres ?', a: 'Les nombres maîtres 11, 22 et 33 ne sont pas réduits à un seul chiffre car ils portent une énergie amplifiée. Le Visionnaire (11) opère sur une intuition élevée ; le Maître Bâtisseur (22) allie vision et maîtrise pratique ; le Maître Enseignant (33) sert l\'humanité par l\'amour inconditionnel.' },
      { q: 'Mon archétype est-il le même que mon Chemin de Vie ?', a: 'Oui. Le calculateur d\'archétype utilise le Chemin de Vie comme base et le fait correspondre à un modèle de caractère archétypal.' },
      { q: 'Qu\'est-ce que l\'archétype du Pionnier (1) ?', a: 'Le Pionnier est l\'archétype de l\'indépendance, du leadership et de la pensée originale. Les personnes nées sous le 1 sont des initiateurs naturels qui tracent de nouveaux chemins et inspirent les autres par leur courage et originalité.' },
      { q: 'Qu\'est-ce que l\'archétype du Sage (9) ?', a: 'Le Sage est l\'archétype de la compassion, de la sagesse et du service universel. Les personnes nées sous le 9 portent une profonde empathie, se sentant souvent appelées à servir une cause plus grande qu\'elles-mêmes.' },
      { q: 'Deux personnes du même archétype peuvent-elles avoir des personnalités très différentes ?', a: 'Oui. L\'archétype décrit la fréquence énergétique et les thèmes centraux du chemin de vie, pas un type de personnalité rigide. La façon dont ces thèmes se manifestent dépend de l\'éducation, de la culture, des choix et de l\'expression individuelle.' },
      { q: 'Quelle est la différence entre archétype et type de personnalité ?', a: 'Les types de personnalité (MBTI, Ennéagramme) sont des modèles psychologiques basés sur des fonctions cognitives. Les archétypes numériques sont basés sur la signification symbolique des nombres et leur correspondance vibratoire avec les schémas de vie.' },
      { q: 'Comment connaître son archétype aide-t-il concrètement ?', a: 'Comprendre votre archétype vous aide à reconnaître vos talents naturels et à cesser de lutter contre votre propre nature. Il clarifie pourquoi certaines situations vous paraissent naturelles et d\'autres comme nager à contre-courant.' },
    ],
  },
  lt: {
    description: 'Asmenybės archetipas yra universalus charakterio modelis — simbolinis vaidmuo, atspindintis esmines tam tikro tipo žmogaus savybes, motyvus ir iššūkius. Numerologijoje jūsų archetipas nustatomas pagal jūsų Gyvenimo kelio numerį, kuris apskaičiuojamas sumuojant visus pilnos gimimo datos skaitmenis iki vieno skaičiaus arba vieno iš trijų meistro skaičių (11, 22, 33). Kiekvienas skaičius atitinka vieną iš 12 pagrindinių archetipų, kylančių iš jungiškosios psichologijos, numerologinės išminties ir tarpkultūrinių mitologinių tyrimų tradicijų.\n\nDvylika archetipų — nuo Pradininko (1) iki Išminčiaus (9) ir trijų meistro archetipų (Visionierius — 11, Meistro statytojas — 22, Meistro mokytojas — 33) — kiekvienas atspindi skirtingą energetinę dažnį ir gyvenimo misiją. Žinant savo archetipą galima suprasti, kodėl tam tikros situacijos yra natūralios, o kitos atrodo nuolatinė kova.',
    faqTitle: 'Dažnai užduodami klausimai apie asmenybės archetipus',
    faqs: [
      { q: 'Kas yra asmenybės archetipas numerologijoje?', a: 'Numerologinis asmenybės archetipas yra simbolinis charakterio modelis, nustatomas pagal Gyvenimo kelio numerį. Jis atspindi esmines jūsų sielos kelionės savybes, motyvus ir iššūkius — vaidmenį, kurį esate čia atlikti.' },
      { q: 'Kaip apskaičiuojamas archetipo numeris?', a: 'Archetipo numeris yra toks pat kaip Gyvenimo kelio numeris. Sudėkite visus gimimo datos skaitmenis (diena + mėnuo + metai), tada sumažinkite sumą iki vieno skaitmens — nebent gautumėte 11, 22 ar 33 (meistro skaičiai).' },
      { q: 'Kokie yra 12 archetipų numerologijoje?', a: '1 — Pradininkas; 2 — Diplomatas; 3 — Pasakotojas; 4 — Architektas; 5 — Nuotykių ieškotojas; 6 — Gydytojas; 7 — Mistikas; 8 — Vadovas; 9 — Išminčius; 11 — Visionierius; 22 — Meistro statytojas; 33 — Meistro mokytojas.' },
      { q: 'Kas yra meistro skaičių archetipai?', a: 'Meistro skaičiai 11, 22 ir 33 neredukuojami iki vieno skaitmens, nes neša sustiprintą energiją. Visionierius (11) veikia pakeltu intuicija; Meistro statytojas (22) derina viziją su praktiniu meistriškumu; Meistro mokytojas (33) tarnauja žmonijai per besąlyginę meilę.' },
      { q: 'Ar mano archetipas yra tas pats kaip Gyvenimo kelio numeris?', a: 'Taip. Archetipo skaičiuotuvas naudoja Gyvenimo kelio numerį kaip pagrindą ir susieja jį su archetipinio charakterio modeliu.' },
      { q: 'Kas yra Pradininko archetipas (1)?', a: 'Pradininkas yra nepriklausomybės, lyderystės ir originalaus mąstymo archetipas. Gimę pagal 1 yra natūralūs iniciatoriai, pramaunantys naujus kelius ir įkvepiantys kitus savo drąsa.' },
      { q: 'Kas yra Išminčiaus archetipas (9)?', a: 'Išminčius yra užuojautos, išminties ir universalaus tarnavimo archetipas. Gimę pagal 9 neša gilų empatiją, dažnai jaučiantys pašaukimą tarnauti didesniam tikslui.' },
      { q: 'Ar du žmonės su tuo pačiu archetipu gali turėti labai skirtingas asmenybes?', a: 'Taip. Archetipaas apibūdina energetinę dažnį ir pagrindines kelio temas, o ne griežtą asmenybės tipą. Kaip šios temos pasireiškia, priklauso nuo auklėjimo, kultūros ir individualios raiškos.' },
      { q: 'Kuo archetipas skiriasi nuo asmenybės tipo?', a: 'Asmenybės tipai (MBTI, Enneagram) pagrįsti kognityvinėmis funkcijomis. Numerologiniai archetipai pagrįsti simboline skaičių reikšme ir jų vibracine atitiktimi gyvenimo modeliams.' },
      { q: 'Kaip savo archetipo žinojimas padeda realiame gyvenime?', a: 'Savo archetipo supratimas padeda atpažinti natūralius talentus ir nustoti kovoti su savo pačių prigimtimi. Tai paaiškina, kodėl tam tikros situacijos yra natūralios, o kitos atrodo kaip plaukimas prieš srovę.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/numerology-compatibility', label: 'Numerology Compatibility' },
    { href: '/calculator/destiny-number', label: 'Destiny Number' },
    { href: '/calculator/biorhythm', label: 'Biorhythm Calculator' },
    { href: '/calculator/zodiac-sign', label: 'Zodiac Sign' },
  ],
  ru: [
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/numerology-compatibility', label: 'Совместимость по нумерологии' },
    { href: '/calculator/destiny-number', label: 'Число судьбы' },
    { href: '/calculator/biorhythm', label: 'Биоритмы' },
    { href: '/calculator/zodiac-sign', label: 'Знак зодиака' },
  ],
  uk: [
    { href: '/calculator/life-path', label: 'Число шляху життя' },
    { href: '/calculator/numerology-compatibility', label: 'Сумісність за нумерологією' },
    { href: '/calculator/destiny-number', label: 'Число долі' },
    { href: '/calculator/biorhythm', label: 'Біоритми' },
    { href: '/calculator/zodiac-sign', label: 'Знак зодіаку' },
  ],
  fr: [
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/numerology-compatibility', label: 'Compatibilité Numérologique' },
    { href: '/calculator/destiny-number', label: 'Nombre de Destinée' },
    { href: '/calculator/biorhythm', label: 'Calculateur de Biorythmes' },
    { href: '/calculator/zodiac-sign', label: 'Signe du Zodiaque' },
  ],
  lt: [
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/numerology-compatibility', label: 'Numerologinis suderinamumas' },
    { href: '/calculator/destiny-number', label: 'Likimo skaičius' },
    { href: '/calculator/biorhythm', label: 'Bioritmo skaičiuotuvas' },
    { href: '/calculator/zodiac-sign', label: 'Zodiako ženklas' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/archetype-number', meta);
}

export function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function ArchetypeNumberPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/archetype-number`,
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
        <ArchetypeNumberCalculator locale={locale} />
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

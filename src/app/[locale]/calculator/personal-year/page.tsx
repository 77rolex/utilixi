import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import PersonalYearCalculator from './PersonalYearCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Personal Year Number Calculator — Free Numerology', description: 'Calculate your Personal Year number for 2025 and discover the theme, opportunities and challenges that define your year. Free numerology tool based on your birth date.', h1: 'Personal Year Number Calculator', subtitle: 'Calculate your Personal Year Number to understand the numerological theme and energy defining your current year.' },
  ru: { title: 'Калькулятор персонального года — нумерология онлайн', description: 'Рассчитайте ваш персональный год по дате рождения и узнайте тему, возможности и вызовы текущего года. Бесплатный нумерологический инструмент.', h1: 'Калькулятор персонального года', subtitle: 'Рассчитайте число персонального года, чтобы понять нумерологическую тему и энергию текущего года.' },
  uk: { title: 'Калькулятор персонального року — нумерологія онлайн', description: 'Розрахуйте ваш персональний рік за датою народження та дізнайтеся тему, можливості та виклики поточного року. Безкоштовний нумерологічний інструмент.', h1: 'Калькулятор персонального року', subtitle: 'Розрахуйте число особистого року, щоб зрозуміти нумерологічну тему та енергію поточного року.' },
  fr: { title: 'Calculateur d\'Année Personnelle — Numérologie Gratuite', description: 'Calculez votre Année Personnelle en numérologie et découvrez le thème, les opportunités et les défis qui définissent votre année. Outil basé sur votre date de naissance.', h1: 'Calculateur d\'Année Personnelle', subtitle: 'Calculez votre Nombre d\'Année Personnelle pour comprendre le thème et l\'énergie numérologique de votre année en cours.' },
  lt: { title: 'Asmeninių metų skaičiuotuvas — nemokama numerologija', description: 'Apskaičiuokite savo asmeninius metus pagal gimimo datą ir sužinokite šių metų temą, galimybes bei iššūkius. Nemokamas numerologijos įrankis.', h1: 'Asmeninių metų skaičiuotuvas', subtitle: 'Apskaičiuokite asmeninių metų skaičių, kad suprastumėte numerologinę temą ir energiją, apibrėžiančią jūsų dabartinius metus.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Your Personal Year number is one of numerology\'s most practical forecasting tools. Calculated from your birth day, birth month and the current calendar year, it reveals the overarching theme of your year — whether it\'s a time to plant new seeds (Year 1), build strong foundations (Year 4), complete and release (Year 9) or experience one of the potent Master Years (11 or 22). Each personal year runs within a broader nine-year cycle and understanding where you are in that cycle allows you to align your actions with the natural flow of your energy.\n\nUnlike your fixed Life Path or Destiny Number, your Personal Year shifts each January 1st, offering a fresh theme to explore for the next twelve months. By knowing your number, you can set more aligned intentions, time important decisions wisely and navigate the year with greater ease. Many people find that looking back at past personal years reveals striking accuracy — major life events, career shifts and relationship changes often correspond precisely with the year\'s numerological theme.',
    faqTitle: 'Frequently Asked Questions about Personal Year Numbers',
    faqs: [
      { q: 'What is a Personal Year number in numerology?', a: 'A Personal Year number is a single digit (1–9, or Master 11/22) that describes the overarching theme, opportunities and challenges of your current calendar year. It is calculated from your birth day, birth month and the current year and repeats in a nine-year cycle.' },
      { q: 'How is the Personal Year number calculated?', a: 'Add the digits of your birth day + birth month + current calendar year together, then reduce by adding the resulting digits together repeatedly until you reach a single digit or a Master Number (11 or 22). For example, born May 7th in year 2025: 0+7 + 0+5 + 2+0+2+5 = 21 → 2+1 = Personal Year 3.' },
      { q: 'When does the Personal Year cycle begin and end?', a: 'Most Western numerologists consider the Personal Year to run from January 1st to December 31st of the calendar year. Some schools use your birthday to birthday cycle, but the January–December system is by far the most widely used and is what this calculator applies.' },
      { q: 'What does a Personal Year 1 mean?', a: 'Personal Year 1 marks the start of a new nine-year cycle. It is a year of new beginnings, bold action and planting seeds for the future. Independence, initiative and self-assertion are strongly favoured. Decisions and launches made in a Personal Year 1 tend to have lasting consequences.' },
      { q: 'What does a Personal Year 9 mean?', a: 'Personal Year 9 is the final year of the nine-year cycle — a time for completion, release and letting go of what no longer serves you. Relationships, habits and projects that have run their course will naturally end. It prepares you for the fresh start of Personal Year 1.' },
      { q: 'Can my Personal Year be a Master Number like 11 or 22?', a: 'Yes. If the sum of your birth day + birth month + current year reduces to 11 or 22, these are not reduced further. Master Year 11 is a year of heightened spiritual insight and inspiration. Master Year 22 is a year of large-scale manifestation and practical building on an extraordinary level.' },
      { q: 'What is the best Personal Year to start a business?', a: 'Personal Year 1 is ideal for launching new ventures and setting bold intentions. Personal Year 8 is excellent for financial growth, career advancement and material achievement. Personal Years 4 and 8 together form the most productive cycle for building lasting business structures.' },
      { q: 'What is the best Personal Year for relationships?', a: 'Personal Year 2 is deeply conducive to new relationships, partnerships and deepening existing bonds. Personal Year 6 favours committed relationships, marriage and family decisions. Personal Year 3 can also bring joyful romantic connections through social expansion.' },
      { q: 'How does the Personal Year differ from the Life Path number?', a: 'Your Life Path number is fixed for life and describes your core soul mission and strengths. Your Personal Year changes every January and describes the specific theme and energy available to you in a given twelve-month period. They work together: your Life Path shows the direction, the Personal Year shows the current chapter.' },
      { q: 'How accurate are Personal Year forecasts?', a: 'Many people find striking accuracy when reflecting on past Personal Years. The numerological themes align with major life shifts, career changes and relationship milestones with surprising frequency. Like any forecasting tool, Personal Year numerology works best when used as a guide for self-reflection and intentional planning rather than a rigid prediction.' },
    ],
  },
  ru: {
    description: 'Персональный год — один из самых практичных инструментов прогнозирования в нумерологии. Рассчитываемый из числа дня рождения, месяца рождения и текущего календарного года, он раскрывает общую тему вашего года — будь то время для посева новых семян (Год 1), строительства прочных основ (Год 4), завершения и отпускания (Год 9) или одного из мощных Мастер-годов (11 или 22). Каждый персональный год вписывается в более широкий девятилетний цикл.\n\nВ отличие от фиксированного числа Жизненного пути или Числа судьбы, персональный год меняется каждое первое января, предлагая свежую тему для следующих двенадцати месяцев. Зная своё число, вы можете ставить более согласованные намерения, своевременно принимать важные решения и проходить год с большей лёгкостью. Многие люди обнаруживают, что взгляд назад на прошлые персональные годы раскрывает поразительную точность.',
    faqTitle: 'Часто задаваемые вопросы о персональном годе',
    faqs: [
      { q: 'Что такое число персонального года в нумерологии?', a: 'Число персонального года — это однозначное число (1–9 или Мастер 11/22), описывающее общую тему, возможности и вызовы текущего календарного года. Оно рассчитывается из числа дня рождения, месяца рождения и текущего года и повторяется в девятилетнем цикле.' },
      { q: 'Как рассчитывается персональный год?', a: 'Сложите цифры числа дня рождения + месяца рождения + текущего календарного года, затем сведите к однозначному числу или Мастер-числу (11 или 22). Например, рождённый 7 мая в 2025 году: 0+7 + 0+5 + 2+0+2+5 = 21 → 2+1 = Персональный год 3.' },
      { q: 'Когда начинается и заканчивается цикл персонального года?', a: 'Большинство западных нумерологов считают, что персональный год длится с 1 января по 31 декабря. Некоторые школы используют цикл от дня рождения до дня рождения, но система январь–декабрь является наиболее распространённой и применяется в данном калькуляторе.' },
      { q: 'Что означает персональный год 1?', a: 'Персональный год 1 знаменует начало нового девятилетнего цикла. Это год новых начинаний, смелых действий и посева семян на будущее. Независимость, инициатива и самоутверждение активно поддерживаются. Решения, принятые в год 1, как правило, имеют долгосрочные последствия.' },
      { q: 'Что означает персональный год 9?', a: 'Персональный год 9 — последний год девятилетнего цикла: время завершения, освобождения и отпускания того, что больше не служит вам. Отношения, привычки и проекты, исчерпавшие себя, естественно завершатся. Он подготавливает вас к свежему старту персонального года 1.' },
      { q: 'Может ли персональный год быть Мастер-числом 11 или 22?', a: 'Да. Если сумма числа дня рождения + месяца рождения + текущего года сводится к 11 или 22, эти числа не редуцируются далее. Мастер-год 11 — год обострённого духовного понимания и вдохновения. Мастер-год 22 — год масштабного проявления и практического строительства на исключительном уровне.' },
      { q: 'Какой персональный год лучше всего для открытия бизнеса?', a: 'Персональный год 1 идеален для запуска новых проектов и постановки смелых намерений. Персональный год 8 отлично подходит для финансового роста, карьерного продвижения и материальных достижений. Годы 4 и 8 вместе образуют наиболее продуктивный цикл для построения прочных деловых структур.' },
      { q: 'Какой персональный год лучше всего для отношений?', a: 'Персональный год 2 глубоко благоприятен для новых отношений, партнёрств и углубления существующих связей. Персональный год 6 благоприятствует серьёзным отношениям, браку и семейным решениям. Год 3 также может принести радостные романтические связи через социальную экспансию.' },
      { q: 'Чем персональный год отличается от числа жизненного пути?', a: 'Ваше число жизненного пути фиксировано на всю жизнь и описывает вашу основную миссию и сильные стороны. Персональный год меняется каждый январь и описывает конкретную тему и энергию, доступную вам в данный двенадцатимесячный период.' },
      { q: 'Насколько точны прогнозы персонального года?', a: 'Многие люди обнаруживают поразительную точность, оглядываясь на прошлые персональные годы. Нумерологические темы согласуются с крупными жизненными переменами, карьерными изменениями и важными событиями с удивительной частотой.' },
    ],
  },
  uk: {
    description: 'Персональний рік — один з найбільш практичних інструментів прогнозування в нумерології. Розрахований з числа дня народження, місяця народження та поточного календарного року, він розкриває загальну тему вашого року — чи то час для посіву нових насінин (Рік 1), будівництва міцних основ (Рік 4), завершення та відпускання (Рік 9) або одного з потужних Майстер-років (11 або 22). Кожен персональний рік вписується у ширший дев\'ятирічний цикл.\n\nНа відміну від фіксованого числа Шляху життя або Числа долі, персональний рік змінюється кожного першого січня, пропонуючи свіжу тему для наступних дванадцяти місяців. Знаючи своє число, ви можете ставити більш узгоджені наміри, своєчасно приймати важливі рішення та проходити рік з більшою легкістю.',
    faqTitle: 'Поширені запитання про персональний рік',
    faqs: [
      { q: 'Що таке число персонального року в нумерології?', a: 'Число персонального року — це однозначне число (1–9 або Майстер 11/22), що описує загальну тему, можливості та виклики поточного календарного року. Воно розраховується з числа дня народження, місяця народження та поточного року.' },
      { q: 'Як розраховується персональний рік?', a: 'Складіть цифри числа дня народження + місяця народження + поточного календарного року, потім зведіть до однозначного числа або Майстер-числа (11 або 22). Наприклад, народжений 7 травня у 2025 році: 0+7 + 0+5 + 2+0+2+5 = 21 → 2+1 = Персональний рік 3.' },
      { q: 'Коли починається і закінчується цикл персонального року?', a: 'Більшість західних нумерологів вважають, що персональний рік триває з 1 січня по 31 грудня. Деякі школи використовують цикл від дня народження до дня народження, але система січень–грудень є найбільш поширеною.' },
      { q: 'Що означає персональний рік 1?', a: 'Персональний рік 1 знаменує початок нового дев\'ятирічного циклу. Це рік нових починань, сміливих дій та посіву насіння на майбутнє. Незалежність, ініціатива та самоствердження активно підтримуються.' },
      { q: 'Що означає персональний рік 9?', a: 'Персональний рік 9 — останній рік дев\'ятирічного циклу: час завершення, звільнення та відпускання того, що більше не служить вам. Стосунки, звички та проекти, що вичерпали себе, природно завершаться.' },
      { q: 'Чи може персональний рік бути Майстер-числом 11 або 22?', a: 'Так. Якщо сума числа дня народження + місяця народження + поточного року зводиться до 11 або 22, ці числа не редукуються далі. Майстер-рік 11 — рік загостреного духовного розуміння та натхнення. Майстер-рік 22 — рік масштабного прояву та практичного будівництва.' },
      { q: 'Який персональний рік найкращий для відкриття бізнесу?', a: 'Персональний рік 1 ідеальний для запуску нових проектів. Персональний рік 8 чудово підходить для фінансового зростання та кар\'єрного просування. Роки 4 і 8 разом утворюють найбільш продуктивний цикл для побудови міцних ділових структур.' },
      { q: 'Який персональний рік найкращий для стосунків?', a: 'Персональний рік 2 глибоко сприятливий для нових стосунків та поглиблення існуючих зв\'язків. Персональний рік 6 сприяє серйозним стосункам, шлюбу та сімейним рішенням.' },
      { q: 'Чим персональний рік відрізняється від числа шляху життя?', a: 'Ваше число шляху життя фіксовано на все життя і описує вашу основну місію та сильні сторони. Персональний рік змінюється кожного січня і описує конкретну тему та енергію, доступну вам у цей дванадцятимісячний період.' },
      { q: 'Наскільки точні прогнози персонального року?', a: 'Багато людей виявляють разючу точність, озираючись на минулі персональні роки. Нумерологічні теми узгоджуються з великими життєвими змінами та важливими подіями з дивовижною частотою.' },
    ],
  },
  fr: {
    description: 'L\'Année Personnelle est l\'un des outils de prévision les plus pratiques de la numérologie. Calculée à partir de votre jour de naissance, votre mois de naissance et l\'année calendaire actuelle, elle révèle le thème général de votre année — qu\'il s\'agisse d\'un moment pour planter de nouvelles graines (Année 1), construire des bases solides (Année 4), compléter et libérer (Année 9) ou vivre l\'une des puissantes Années Maîtres (11 ou 22). Chaque année personnelle s\'inscrit dans un cycle plus large de neuf ans.\n\nContrairement à votre Chemin de Vie fixe, votre Année Personnelle change chaque 1er janvier, offrant un nouveau thème à explorer pour les douze prochains mois. En connaissant votre chiffre, vous pouvez définir des intentions plus alignées, prendre des décisions importantes au bon moment et naviguer l\'année avec plus de facilité.',
    faqTitle: 'Questions fréquentes sur l\'Année Personnelle',
    faqs: [
      { q: 'Qu\'est-ce que l\'Année Personnelle en numérologie ?', a: 'L\'Année Personnelle est un chiffre unique (1–9, ou Maître 11/22) qui décrit le thème général, les opportunités et les défis de votre année calendaire actuelle. Elle est calculée à partir de votre jour, mois de naissance et de l\'année actuelle, et se répète dans un cycle de neuf ans.' },
      { q: 'Comment calcule-t-on l\'Année Personnelle ?', a: 'Additionnez les chiffres de votre jour de naissance + mois de naissance + année calendaire actuelle, puis réduisez à un seul chiffre ou un Nombre Maître (11 ou 22). Par exemple, né le 7 mai en 2025 : 0+7 + 0+5 + 2+0+2+5 = 21 → 2+1 = Année Personnelle 3.' },
      { q: 'Quand commence et se termine le cycle de l\'Année Personnelle ?', a: 'La plupart des numérologies occidentales considèrent que l\'Année Personnelle court du 1er janvier au 31 décembre. Certaines écoles utilisent le cycle anniversaire, mais le système janvier–décembre est de loin le plus répandu.' },
      { q: 'Que signifie une Année Personnelle 1 ?', a: 'L\'Année Personnelle 1 marque le début d\'un nouveau cycle de neuf ans. C\'est une année de nouveaux départs, d\'actions audacieuses et de plantation de graines pour l\'avenir. L\'indépendance, l\'initiative et l\'affirmation de soi sont fortement favorisées.' },
      { q: 'Que signifie une Année Personnelle 9 ?', a: 'L\'Année Personnelle 9 est la dernière année du cycle de neuf ans — un moment pour compléter, libérer et lâcher ce qui ne vous sert plus. Les relations, habitudes et projets qui ont fait leur temps se termineront naturellement.' },
      { q: 'Mon Année Personnelle peut-elle être un Nombre Maître comme 11 ou 22 ?', a: 'Oui. Si la somme de votre jour + mois de naissance + année actuelle donne 11 ou 22, ces chiffres ne sont pas réduits davantage. L\'Année Maître 11 est une année d\'intuition spirituelle accrue. L\'Année Maître 22 est une année de manifestation à grande échelle.' },
      { q: 'Quelle est la meilleure Année Personnelle pour créer une entreprise ?', a: 'L\'Année Personnelle 1 est idéale pour lancer de nouveaux projets. L\'Année Personnelle 8 est excellente pour la croissance financière et l\'avancement professionnel. Les années 4 et 8 ensemble forment le cycle le plus productif pour bâtir des structures durables.' },
      { q: 'Quelle est la meilleure Année Personnelle pour les relations ?', a: 'L\'Année Personnelle 2 est profondément propice aux nouvelles relations et à l\'approfondissement des liens existants. L\'Année Personnelle 6 favorise les engagements amoureux, le mariage et les décisions familiales.' },
      { q: 'Quelle est la différence entre l\'Année Personnelle et le Chemin de Vie ?', a: 'Votre Chemin de Vie est fixe pour la vie et décrit votre mission fondamentale. Votre Année Personnelle change chaque janvier et décrit le thème et l\'énergie spécifiques disponibles pour les douze prochains mois.' },
      { q: 'Les prévisions de l\'Année Personnelle sont-elles fiables ?', a: 'Beaucoup de personnes trouvent une précision remarquable en réfléchissant à leurs années personnelles passées. Les thèmes numériques s\'alignent souvent avec des changements majeurs de vie, de carrière et de relations avec une fréquence surprenante.' },
    ],
  },
  lt: {
    description: 'Asmeniniai metai yra vienas iš praktiškiausių numerologijos prognozavimo įrankių. Apskaičiuoti iš gimimo dienos, gimimo mėnesio ir einamųjų kalendorinių metų, jie atskleidžia bendrą jūsų metų temą — ar tai naujos pradžios laikas (1 metai), tvirtų pagrindų kūrimas (4 metai), užbaigimas ir paleidimas (9 metai) ar vienos iš galingų Meistro metų (11 ar 22) patyrimas. Kiekvienos asmeniniai metai įsilieja į platesnį devynerių metų ciklą.\n\nSkirtingai nuo fiksuoto Gyvenimo kelio skaičiaus, jūsų asmeniniai metai keičiasi kiekvienų sausio 1 d., siūlydami naują temą ateinantiems dvylikai mėnesių. Žinodami savo skaičių, galite nustatyti suderintesnius ketinimus, laiku priimti svarbius sprendimus ir lengviau naršyti metus.',
    faqTitle: 'Dažnai užduodami klausimai apie asmeninius metus',
    faqs: [
      { q: 'Kas yra asmeninių metų skaičius numerologijoje?', a: 'Asmeninių metų skaičius yra vieno skaitmens skaičius (1–9 arba Meistras 11/22), apibūdinantis bendrą einamųjų kalendorinių metų temą, galimybes ir iššūkius. Jis apskaičiuojamas iš gimimo dienos, gimimo mėnesio ir einamųjų metų ir kartojasi devynerių metų cikle.' },
      { q: 'Kaip apskaičiuojami asmeniniai metai?', a: 'Sudėkite gimimo dienos + gimimo mėnesio + einamųjų kalendorinių metų skaitmenis, tada susmulkinkite iki vieno skaitmens arba Meistro skaičiaus (11 arba 22). Pvz., gimęs gegužės 7 d. 2025 m.: 0+7 + 0+5 + 2+0+2+5 = 21 → 2+1 = Asmeniniai metai 3.' },
      { q: 'Kada prasideda ir baigiasi asmeninių metų ciklas?', a: 'Dauguma Vakarų numerologų laiko, kad asmeniniai metai trunka nuo sausio 1 iki gruodžio 31. Kai kurios mokyklos naudoja ciklą nuo gimtadienio iki gimtadienio, tačiau sausio–gruodžio sistema yra plačiausiai naudojama.' },
      { q: 'Ką reiškia 1 asmeniniai metai?', a: '1 asmeniniai metai žymi naujo devynerių metų ciklo pradžią. Tai naujos pradžios, drąsių veiksmų ir ateities sėklų sėjimo metai. Nepriklausomybė, iniciatyva ir savęs teigimas yra stipriai palankūs.' },
      { q: 'Ką reiškia 9 asmeniniai metai?', a: '9 asmeniniai metai yra paskutiniai devynerių metų ciklo metai — laikas baigti, atleisti ir atsikratyti to, kas nebetarnauja jums. Santykiai, įpročiai ir projektai, kurie išsisėmė, natūraliai baigsis.' },
      { q: 'Ar mano asmeniniai metai gali būti Meistro skaičius 11 ar 22?', a: 'Taip. Jei gimimo dienos + mėnesio + einamųjų metų suma sumažėja iki 11 arba 22, šie skaičiai toliau nesumažinami. Meistro metai 11 yra padidintos dvasinės įžvalgos metai. Meistro metai 22 yra didelio masto pasireiškimo metai.' },
      { q: 'Kokie asmeniniai metai geriausi verslui pradėti?', a: '1 asmeniniai metai idealūs naujoms iniciatyvoms ir drąsiems ketinimams. 8 asmeniniai metai puikiai tinka finansiniam augimui ir karjeros kilimui. 4 ir 8 metai kartu sudaro produktyviausią ciklą ilgalaikėms verslo struktūroms kurti.' },
      { q: 'Kokie asmeniniai metai geriausi santykiams?', a: '2 asmeniniai metai yra labai palankūs naujiems santykiams ir esamų ryšių gilinimui. 6 asmeniniai metai palankūs rimtiems santykiams, santuokai ir šeimos sprendimams.' },
      { q: 'Kuo asmeniniai metai skiriasi nuo Gyvenimo kelio skaičiaus?', a: 'Jūsų Gyvenimo kelio skaičius yra fiksuotas visam gyvenimui ir apibūdina jūsų pagrindinę misiją. Jūsų asmeniniai metai keičiasi kiekvieną sausį ir apibūdina konkrečią temą ir energiją, prieinamą jums per duotuosius dvylika mėnesių.' },
      { q: 'Kaip tikslios asmeninių metų prognozės?', a: 'Daugelis žmonių atranda stebinantį tikslumą žvelgdami į praėjusius asmeninius metus. Numerologinės temos dažnai sutampa su svarbiais gyvenimo pokyčiais, karjeros permainomis ir ryšių įvykiais.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/destiny-number', label: 'Destiny Number' },
    { href: '/calculator/pythagorean-matrix', label: 'Pythagorean Matrix' },
    { href: '/calculator/numerology-compatibility', label: 'Numerology Compatibility' },
    { href: '/calculator/karmic-number', label: 'Karmic Numbers' },
  ],
  ru: [
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/destiny-number', label: 'Число судьбы' },
    { href: '/calculator/pythagorean-matrix', label: 'Матрица Пифагора' },
    { href: '/calculator/numerology-compatibility', label: 'Совместимость по нумерологии' },
    { href: '/calculator/karmic-number', label: 'Кармические числа' },
  ],
  uk: [
    { href: '/calculator/life-path', label: 'Число шляху життя' },
    { href: '/calculator/destiny-number', label: 'Число долі' },
    { href: '/calculator/pythagorean-matrix', label: 'Матриця Піфагора' },
    { href: '/calculator/numerology-compatibility', label: 'Сумісність за нумерологією' },
    { href: '/calculator/karmic-number', label: 'Кармічні числа' },
  ],
  fr: [
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/destiny-number', label: 'Nombre de Destinée' },
    { href: '/calculator/pythagorean-matrix', label: 'Matrice Pythagoricienne' },
    { href: '/calculator/numerology-compatibility', label: 'Compatibilité Numérologique' },
    { href: '/calculator/karmic-number', label: 'Nombres Karmiques' },
  ],
  lt: [
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/destiny-number', label: 'Likimo skaičius' },
    { href: '/calculator/pythagorean-matrix', label: 'Pitagoro matrica' },
    { href: '/calculator/numerology-compatibility', label: 'Numerologinis suderinamumas' },
    { href: '/calculator/karmic-number', label: 'Karminiai skaičiai' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/personal-year', meta);
}

export function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function PersonalYearPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/personal-year`,
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
        <RelatedTools locale={locale} tools={related} />
        <PersonalYearCalculator locale={locale} />
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

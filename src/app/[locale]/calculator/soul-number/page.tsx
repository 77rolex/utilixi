import ToolActions from '@/components/ui/ToolActions';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import SoulNumberCalculator from './SoulNumberCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Soul Number Calculator — Heart\'s Desire Number Free Online',
    description: 'Calculate your Soul Number (Heart\'s Desire Number) free online. Enter your name and discover the secret inner motivation and deepest desire that drives your soul.',
    h1: 'Soul Number Calculator',
    subtitle: 'Discover your Soul Urge Number from the vowels of your name — the hidden desires and deepest motivations behind your personality.',
  },
  ru: {
    title: 'Число души — Число сердечного желания онлайн бесплатно',
    description: 'Рассчитайте число души (число сердечного желания) онлайн бесплатно. Введите имя и узнайте тайную внутреннюю мотивацию и глубинное желание, движущее вашей душой.',
    h1: 'Число души — калькулятор',
    subtitle: 'Узнайте число души по гласным вашего имени — скрытые желания и глубинные мотивации, стоящие за вашей личностью.',
  },
  uk: {
    title: 'Число Душі — Число Серцевого Бажання Онлайн Безкоштовно',
    description: 'Розрахуйте число душі (число серцевого бажання) онлайн безкоштовно. Введіть ім\'я і дізнайтеся таємну внутрішню мотивацію та найглибше бажання, що рухає вашою душею.',
    h1: 'Число душі — калькулятор',
    subtitle: 'Дізнайтеся число душі за голосними вашого імені — приховані бажання та глибинні мотивації, що стоять за вашою особистістю.',
  },
  fr: {
    title: "Nombre de l'Âme Numérologie — Calcul par les Voyelles",
    description: "Calculez votre Nombre de l'Âme à partir des voyelles de votre nom. Découvrez votre désir profond et vos aspirations secrètes selon la numérologie pythagoricienne — gratuit en ligne.",
    h1: "Calculateur du Nombre d'Âme",
    subtitle: "Découvrez votre Nombre d'Âme à partir des voyelles de votre nom — les désirs cachés et motivations profondes de votre personnalité.",
  },
  lt: {
    title: 'Sielos Skaičiaus Skaičiuotuvas — Širdies Troškimas Nemokamai',
    description: 'Apskaičiuokite savo sielos skaičių (širdies troškimo skaičių) nemokamai internete. Įveskite vardą ir sužinokite slaptą vidinę motyvaciją ir giliausią troškimą, kuris varo jūsų sielą.',
    h1: 'Sielos skaičiaus skaičiuotuvas',
    subtitle: 'Atraskite savo sielos skaičių iš jūsų vardo balsių — paslėptus norus ir giliausius motyvus, slypinčius už jūsų asmenybės.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'The Soul Number — also called the Heart\'s Desire Number or Vowel Number — is one of the most intimate numbers in numerology. It is calculated using only the vowels in your name, following the Pythagorean letter-to-number table. Because vowels are the breath and life of language, numerologists consider them the carriers of the soul\'s voice — the hidden dimension of who you truly are beneath the surface. This number reveals your innermost motivations, secret longings and the deepest desires that may never be fully visible to the outside world.\n\nUnlike the Personality Number (which uses consonants and describes how others see you), the Soul Number speaks to who you are in private — what you truly crave, what brings you genuine fulfilment and the kind of life your soul longs to live. This calculator supports both Latin and Cyrillic letters, including the vowels А, Е, Ё, И, О, У, Ы, Э, Ю, Я in Russian and Ukrainian, making it suitable for speakers of many languages.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the Soul Number in numerology?', a: 'The Soul Number (also called Heart\'s Desire Number or Vowel Number) reveals your innermost desires, secret motivations and what truly fulfils you. It is calculated from the vowels in your name using the Pythagorean letter-value system.' },
      { q: 'Which vowels are used to calculate the Soul Number?', a: 'For Latin names: A, E, I, O, U and Y. For Cyrillic names: А, Е, Ё, И, О, У, Ы, Э, Ю, Я, and the Ukrainian vowels І, Ї, Є. All other letters are treated as consonants.' },
      { q: 'What is the difference between the Soul Number and the Personality Number?', a: 'The Soul Number uses vowels and represents your inner world — private desires and motivations. The Personality Number uses consonants and represents your outer presentation — how others perceive you.' },
      { q: 'Is Y always treated as a vowel?', a: 'In this calculator, Y is always treated as a vowel for simplicity. In some numerological traditions, Y is treated as a vowel only when it acts as one phonetically (e.g., in "Mary" but not in "Yellow"). Different practitioners handle this differently.' },
      { q: 'What does Soul Number 1 mean?', a: 'A Soul Number 1 means you deeply crave independence, recognition and the freedom to be your own person. Your inner world is driven by a longing for autonomy — you want to lead, innovate and not be constrained by others\' expectations.' },
      { q: 'What does Soul Number 6 mean?', a: 'Soul Number 6 indicates that love, family and harmony are your deepest inner needs. You feel most fulfilled when caring for others, creating a nurturing environment and feeling that those around you are happy and well.' },
      { q: 'Can the Soul Number reveal hidden aspects of my personality?', a: 'That is precisely its purpose. The Soul Number describes motivations that may not be obvious in your behaviour — desires you may keep private, unconscious drives or long-held wishes you have never fully voiced.' },
      { q: 'Should I use my given name or chosen name?', a: 'Traditionally, the birth name is used as it reflects your original soul blueprint. However, calculating with your chosen or legal name can show you how the vibration you currently carry has shifted from your birth blueprint.' },
      { q: 'What if my name has no vowels?', a: 'Some names (especially short names or transliterations) may have no recognisable vowels in the Pythagorean table. In that case, the calculator will prompt you to enter a name with vowels. Try adding your middle name or full birth name.' },
      { q: 'How does the Soul Number relate to the Life Path Number?', a: 'The Life Path comes from your birth date and describes your life\'s journey and lessons. The Soul Number comes from your name and describes your inner desires and motivations. Together they paint a fuller portrait of your nature.' },
    ],
  },
  ru: {
    description: 'Число души — также называемое числом сердечного желания или числом гласных — одно из наиболее интимных чисел в нумерологии. Оно вычисляется по гласным в вашем имени, следуя пифагорейской таблице букв и чисел. Поскольку гласные — это дыхание и жизнь языка, нумерологи считают их носителями голоса души — скрытого измерения вашего истинного «я» под поверхностью. Это число раскрывает глубинные мотивации, тайные стремления и самые сокровенные желания, которые могут быть не вполне видимы внешнему миру.\n\nВ отличие от числа личности (которое использует согласные и описывает, как вас видят другие), число души говорит о том, кто вы есть наедине с собой — что вы по-настоящему жаждете, что приносит подлинное удовлетворение и какой жизни желает ваша душа. Калькулятор поддерживает как латиницу, так и кириллицу, включая гласные А, Е, Ё, И, О, У, Ы, Э, Ю, Я в русском и украинском языках.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое число души в нумерологии?', a: 'Число души (также число сердечного желания или число гласных) раскрывает глубинные желания, тайные мотивации и то, что по-настоящему приносит удовлетворение. Рассчитывается по гласным в имени с использованием пифагорейской системы.' },
      { q: 'Какие гласные используются для расчёта числа души?', a: 'Для латинских имён: A, E, I, O, U, Y. Для кириллических: А, Е, Ё, И, О, У, Ы, Э, Ю, Я, а также украинские гласные І, Ї, Є. Все остальные буквы считаются согласными.' },
      { q: 'Чем число души отличается от числа личности?', a: 'Число души использует гласные и представляет внутренний мир — личные желания и мотивации. Число личности использует согласные и представляет внешнюю подачу — то, как вас воспринимают другие.' },
      { q: 'Всегда ли Y считается гласной?', a: 'В этом калькуляторе Y всегда считается гласной для простоты. В некоторых нумерологических традициях Y считается гласной только когда фонетически выступает в этой роли. Разные практики обрабатывают это по-разному.' },
      { q: 'Что означает число души 1?', a: 'Число души 1 означает глубокое стремление к независимости, признанию и свободе быть собой. Внутренний мир движим желанием автономии — вы хотите руководить, новаторствовать и не быть ограниченным ожиданиями других.' },
      { q: 'Что означает число души 6?', a: 'Число души 6 указывает, что любовь, семья и гармония — ваши глубочайшие внутренние потребности. Вы чувствуете себя наиболее исполненным, заботясь о других, создавая тёплую атмосферу и зная, что окружающие счастливы.' },
      { q: 'Может ли число души раскрыть скрытые аспекты личности?', a: 'В этом и состоит его назначение. Число души описывает мотивации, которые могут не быть очевидны в поведении — желания, которые вы держите в тайне, бессознательные влечения или давние мечты.' },
      { q: 'Какое имя использовать: данное при рождении или избранное?', a: 'Традиционно используется имя при рождении, отражающее исходный чертёж души. Расчёт по текущему имени покажет, как изменилась транслируемая вибрация по сравнению с исходным чертежом.' },
      { q: 'Что если в имени нет гласных?', a: 'Некоторые имена или транслитерации могут не содержать распознаваемых гласных. В этом случае попробуйте добавить отчество или полное имя при рождении.' },
      { q: 'Как число души соотносится с числом жизненного пути?', a: 'Число жизненного пути — из даты рождения, описывает путь и уроки жизни. Число души — из имени, описывает внутренние желания и мотивации. Вместе они создают более полный портрет.' },
    ],
  },
  uk: {
    description: 'Число душі — також зване числом серцевого бажання або числом голосних — одне з найбільш інтимних чисел у нумерології. Воно обчислюється за голосними у вашому імені, слідуючи піфагорійській таблиці букв і чисел. Оскільки голосні — це дихання та життя мови, нумерологи вважають їх носіями голосу душі — прихованого виміру вашого справжнього «я». Це число розкриває найглибші мотивації, таємні прагнення та заповітні бажання.\n\nНа відміну від числа особистості (яке використовує приголосні та описує, як вас бачать інші), число душі говорить про те, ким ви є наодинці з собою — що ви справді жадаєте і якого життя прагне ваша душа. Калькулятор підтримує як латиницю, так і кирилицю, включаючи голосні А, Е, Ё, И, О, У, Ы, Э, Ю, Я, І, Ї, Є.',
    faqTitle: 'Часті питання',
    faqs: [
      { q: 'Що таке число душі в нумерології?', a: 'Число душі (також число серцевого бажання або число голосних) розкриває найглибші бажання, таємні мотивації та те, що справді приносить задоволення. Розраховується за голосними в імені за допомогою піфагорійської системи.' },
      { q: 'Які голосні використовуються для розрахунку числа душі?', a: 'Для латинських імен: A, E, I, O, U, Y. Для кириличних: А, Е, Ё, И, О, У, Ы, Э, Ю, Я, а також українські голосні І, Ї, Є. Всі інші букви вважаються приголосними.' },
      { q: 'Чим число душі відрізняється від числа особистості?', a: 'Число душі використовує голосні та представляє внутрішній світ — особисті бажання та мотивації. Число особистості використовує приголосні та представляє зовнішню подачу — те, як вас сприймають інші.' },
      { q: 'Чи завжди Y вважається голосною?', a: 'У цьому калькуляторі Y завжди вважається голосною для простоти. У деяких традиціях Y вважається голосною лише тоді, коли фонетично виступає в цій ролі. Різні практики обробляють це по-різному.' },
      { q: 'Що означає число душі 1?', a: 'Число душі 1 означає глибоке прагнення до незалежності, визнання та свободи бути собою. Внутрішній світ рухається бажанням автономії — ви хочете керувати, новаторствувати та не бути обмеженим очікуваннями інших.' },
      { q: 'Що означає число душі 6?', a: 'Число душі 6 вказує, що любов, сім\'я та гармонія — ваші найглибші внутрішні потреби. Ви почуваєтеся найбільш реалізованим, турбуючись про інших та знаючи, що оточуючі щасливі.' },
      { q: 'Чи може число душі розкрити приховані аспекти особистості?', a: 'У цьому і полягає його призначення. Число душі описує мотивації, які можуть не бути очевидними в поведінці — бажання, які ви тримаєте в таємниці, несвідомі потяги або давні мрії.' },
      { q: 'Яке ім\'я використовувати: дане при народженні чи обране?', a: 'Традиційно використовується ім\'я при народженні, що відображає первинний план душі. Розрахунок за поточним іменем покаже, як змінилася вібрація порівняно з первинним планом.' },
      { q: 'Що якщо в імені немає голосних?', a: 'Деякі імена або транслітерації можуть не містити розпізнаваних голосних. У такому разі спробуйте додати по батькові або повне ім\'я при народженні.' },
      { q: 'Як число душі співвідноситься з числом життєвого шляху?', a: 'Число шляху — з дати народження, описує шлях і уроки. Число душі — з імені, описує внутрішні бажання та мотивації. Разом вони створюють повніший портрет особистості.' },
    ],
  },
  fr: {
    description: 'Le Nombre d\'Âme — également appelé Nombre du Désir du Cœur ou Nombre des Voyelles — est l\'un des nombres les plus intimes de la numérologie. Il est calculé en utilisant uniquement les voyelles de votre nom, selon la table pythagoricienne lettre-chiffre. Parce que les voyelles sont le souffle et la vie du langage, les numérologues les considèrent comme les porteuses de la voix de l\'âme — la dimension cachée de qui vous êtes vraiment en profondeur. Ce nombre révèle vos motivations les plus intimes, vos aspirations secrètes et vos désirs les plus profonds.\n\nContrairement au Nombre de Personnalité (qui utilise les consonnes et décrit comment les autres vous voient), le Nombre d\'Âme parle de qui vous êtes en privé — ce que vous désirez vraiment, ce qui vous apporte un véritable épanouissement et le genre de vie que votre âme aspire à vivre. Ce calculateur prend en charge les alphabets latin et cyrillique.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le Nombre d\'Âme en numérologie ?', a: 'Le Nombre d\'Âme (aussi appelé Nombre du Désir du Cœur ou Nombre des Voyelles) révèle vos désirs les plus profonds, vos motivations secrètes et ce qui vous épanouit vraiment. Il est calculé à partir des voyelles de votre nom.' },
      { q: 'Quelles voyelles sont utilisées pour calculer le Nombre d\'Âme ?', a: 'Pour les noms latins : A, E, I, O, U et Y. Pour les noms cyrilliques : А, Е, Ё, И, О, У, Ы, Э, Ю, Я, et les voyelles ukrainiennes І, Ї, Є. Toutes les autres lettres sont traitées comme des consonnes.' },
      { q: 'Quelle est la différence entre le Nombre d\'Âme et le Nombre de Personnalité ?', a: 'Le Nombre d\'Âme utilise les voyelles et représente votre monde intérieur — désirs et motivations privés. Le Nombre de Personnalité utilise les consonnes et représente votre présentation extérieure — comment les autres vous perçoivent.' },
      { q: 'Y est-il toujours traité comme une voyelle ?', a: 'Dans ce calculateur, Y est toujours traité comme une voyelle par souci de simplicité. Dans certaines traditions numérologique, Y n\'est voyelle que lorsqu\'il joue ce rôle phonétiquement. Les praticiens diffèrent sur ce point.' },
      { q: 'Que signifie un Nombre d\'Âme 1 ?', a: 'Un Nombre d\'Âme 1 signifie que vous aspirez profondément à l\'indépendance, à la reconnaissance et à la liberté d\'être vous-même. Votre monde intérieur est animé par un désir d\'autonomie.' },
      { q: 'Que signifie un Nombre d\'Âme 6 ?', a: 'Un Nombre d\'Âme 6 indique que l\'amour, la famille et l\'harmonie sont vos besoins intérieurs les plus profonds. Vous vous épanouissez en prenant soin des autres et en créant un environnement chaleureux.' },
      { q: 'Le Nombre d\'Âme peut-il révéler des aspects cachés de ma personnalité ?', a: 'C\'est précisément son objectif. Il décrit des motivations non apparentes dans votre comportement — des désirs que vous gardez pour vous, des pulsions inconscientes ou des souhaits jamais pleinement exprimés.' },
      { q: 'Dois-je utiliser mon prénom de naissance ou mon prénom choisi ?', a: 'Traditionnellement, le nom de naissance est utilisé car il reflète votre modèle d\'âme originel. Calculer avec votre prénom actuel montre comment la vibration que vous portez a évolué.' },
      { q: 'Que faire si mon nom n\'a pas de voyelles ?', a: 'Certains noms ou translittérations peuvent ne pas avoir de voyelles reconnaissables. Dans ce cas, essayez d\'ajouter votre deuxième prénom ou votre nom complet de naissance.' },
      { q: 'Quel est le lien entre le Nombre d\'Âme et le Chemin de Vie ?', a: 'Le Chemin de Vie vient de votre date de naissance et décrit votre voyage et vos leçons. Le Nombre d\'Âme vient de votre nom et décrit vos désirs et motivations intérieurs. Ensemble, ils forment un portrait plus complet.' },
    ],
  },
  lt: {
    description: 'Sielos skaičius — taip pat vadinamas širdies troškimo skaičiumi ar balsių skaičiumi — yra vienas iš intymiausių skaičių numerologijoje. Jis apskaičiuojamas naudojant tik jūsų vardo balsius pagal Pitagoro raidžių-skaičių lentelę. Kadangi balsiai yra kalbos kvėpavimas ir gyvybė, numerologai laiko juos sielos balso nešėjais — paslėpta jūsų tikrosios esmės dimensija. Šis skaičius atskleidžia jūsų giliausias motyvacijas, slaptus troškimus ir giliausius norus, kurie gali niekada nebūti visiškai matomi išoriniame pasaulyje.\n\nSkirtingai nuo asmenybės skaičiaus (kuris naudoja priebalsius ir aprašo, kaip kiti jus mato), sielos skaičius kalba apie tai, kas esate privačiai — ko tikrai trokštate ir kokio gyvenimo ilgisi jūsų siela. Skaičiuotuvas palaiko tiek lotyniška, tiek kirilicos raštą.',
    faqTitle: 'Dažni klausimai',
    faqs: [
      { q: 'Kas yra sielos skaičius numerologijoje?', a: 'Sielos skaičius (taip pat širdies troškimo ar balsių skaičius) atskleidžia giliausius norus, slaptus motyvus ir tai, kas tikrai jus patenkina. Jis apskaičiuojamas iš jūsų vardo balsių naudojant Pitagoro sistemą.' },
      { q: 'Kurie balsiai naudojami sielos skaičiui apskaičiuoti?', a: 'Lotynų vardams: A, E, I, O, U ir Y. Kirilicos vardams: А, Е, Ё, И, О, У, Ы, Э, Ю, Я ir ukrainietiški balsiai І, Ї, Є. Visos kitos raidės laikomos priebalsiais.' },
      { q: 'Kuo sielos skaičius skiriasi nuo asmenybės skaičiaus?', a: 'Sielos skaičius naudoja balsius ir reprezentuoja jūsų vidinį pasaulį — privačius norus ir motyvus. Asmenybės skaičius naudoja priebalsius ir reprezentuoja jūsų išorinę pristatymą — kaip kiti jus suvokia.' },
      { q: 'Ar Y visada laikoma balse?', a: 'Šiame skaičiuotuve Y visada laikoma balsiu paprastumo dėlei. Kai kuriose tradicijose Y laikoma balsiu tik tada, kai fonetiškai atlieka šį vaidmenį. Skirtingi praktikai tai tvarko skirtingai.' },
      { q: 'Ką reiškia sielos skaičius 1?', a: 'Sielos skaičius 1 reiškia, kad giliai trokštate nepriklausomybės, pripažinimo ir laisvės būti savimi. Jūsų vidinį pasaulį varo autonomijos troškimas.' },
      { q: 'Ką reiškia sielos skaičius 6?', a: 'Sielos skaičius 6 nurodo, kad meilė, šeima ir harmonija yra jūsų giliausiai vidiniai poreikiai. Jūs jaučiatės labiausiai išpildytas, rūpindamasis kitais ir kurdamas šiltą aplinką.' },
      { q: 'Ar sielos skaičius gali atskleisti paslėptus asmenybės aspektus?', a: 'Tai yra tiksliai jo paskirtis. Jis aprašo motyvacijas, kurios gali būti neakivaizdžios jūsų elgesyje — norus, kuriuos laikote privačiai, nesąmoningus troškimus.' },
      { q: 'Ar naudoti gimimo vardą ar pasirinktą vardą?', a: 'Tradiciškai naudojamas gimimo vardas, nes jis atspindi originalų sielos planą. Skaičiuojant su dabartiniu vardu rodoma, kaip energija pasikeitė nuo gimimo plano.' },
      { q: 'Kas atsitinka, jei varde nėra balsių?', a: 'Kai kurie vardai ar transliteracijos gali neturėti atpažįstamų balsių. Tokiu atveju pabandykite pridėti tėvavardį ar pilną gimimo vardą.' },
      { q: 'Kaip sielos skaičius susijęs su gyvenimo kelio skaičiumi?', a: 'Gyvenimo kelio skaičius ateina iš gimimo datos ir aprašo jūsų gyvenimo kelionę. Sielos skaičius ateina iš vardo ir aprašo vidinius norus. Kartu jie sukuria pilnesnį paveikslą.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/destiny-number', label: 'Destiny Number' },
    { href: '/calculator/name-number', label: 'Name Number' },
    { href: '/calculator/personality-number', label: 'Personality Number' },
    { href: '/calculator/age', label: 'Age Calculator' },
  ],
  ru: [
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/destiny-number', label: 'Число судьбы' },
    { href: '/calculator/name-number', label: 'Число имени' },
    { href: '/calculator/personality-number', label: 'Число личности' },
    { href: '/calculator/age', label: 'Калькулятор возраста' },
  ],
  uk: [
    { href: '/calculator/life-path', label: 'Число життєвого шляху' },
    { href: '/calculator/destiny-number', label: 'Число долі' },
    { href: '/calculator/name-number', label: 'Число імені' },
    { href: '/calculator/personality-number', label: 'Число особистості' },
    { href: '/calculator/age', label: 'Калькулятор віку' },
  ],
  fr: [
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/destiny-number', label: 'Nombre Destin' },
    { href: '/calculator/name-number', label: 'Nombre du Nom' },
    { href: '/calculator/personality-number', label: 'Nombre de Personnalité' },
    { href: '/calculator/age', label: 'Calculateur d\'âge' },
  ],
  lt: [
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/destiny-number', label: 'Likimo skaičius' },
    { href: '/calculator/name-number', label: 'Vardo skaičius' },
    { href: '/calculator/personality-number', label: 'Asmenybės skaičius' },
    { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/soul-number', meta);
}

export async function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function SoulNumberPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/soul-number`,
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
        <SoulNumberCalculator locale={locale} />
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

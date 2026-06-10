import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import PersonalityNumberCalculator from './PersonalityNumberCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Personality Number Calculator — Free Numerology Online',
    description: 'Calculate your Personality Number free online. Enter your name and discover what energy you project to the world — the outer image others perceive before they know you.',
    h1: 'Personality Number Calculator',
  },
  ru: {
    title: 'Число личности — Нумерология онлайн бесплатно',
    description: 'Рассчитайте число личности онлайн бесплатно. Введите имя и узнайте, какую энергию вы транслируете миру — внешний образ, который другие воспринимают до того, как узнают вас.',
    h1: 'Число личности — калькулятор',
  },
  uk: {
    title: 'Число Особистості — Нумерологія Онлайн Безкоштовно',
    description: 'Розрахуйте число особистості онлайн безкоштовно. Введіть ім\'я і дізнайтеся, яку енергію ви транслюєте світу — зовнішній образ, який інші сприймають до того, як пізнають вас.',
    h1: 'Число особистості — калькулятор',
  },
  fr: {
    title: 'Calculateur Nombre de Personnalité — Numérologie Gratuite',
    description: 'Calculez votre Nombre de Personnalité gratuitement en ligne. Entrez votre nom et découvrez l\'énergie que vous projetez — l\'image extérieure que les autres perçoivent avant de vous connaître.',
    h1: 'Calculateur du Nombre de Personnalité',
  },
  lt: {
    title: 'Asmenybės Skaičiaus Skaičiuotuvas — Nemokama Numerologija',
    description: 'Apskaičiuokite savo asmenybės skaičių nemokamai internete. Įveskite vardą ir sužinokite, kokią energiją projektuojate — išorinį įvaizdį, kurį kiti suvokia prieš jus pažindami.',
    h1: 'Asmenybės skaičiaus skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'The Personality Number is derived from the consonants in your name using the Pythagorean numerology system. While the Soul Number (derived from vowels) reveals your inner world and secret desires, the Personality Number reveals your outer presentation — the first impression you make, the image you project and the qualities others notice before they truly know you. Think of it as the "wrapping" of your personality: the traits that act as a filter between who you are inside and what the world sees.\n\nConsonants form the structure and shape of words, just as the Personality Number reflects the structure and shape of how you present yourself. Understanding this number can help you become more aware of the image you project — whether it aligns with your inner self (Soul Number) or differs significantly. Many people find that bridging the gap between their Soul and Personality numbers leads to a more authentic and fulfilling way of showing up in the world.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the Personality Number in numerology?', a: 'The Personality Number describes the image you project to the world — the outer impression others form of you before knowing you deeply. It is calculated using only the consonants in your name via the Pythagorean letter-value system.' },
      { q: 'How is the Personality Number different from the Soul Number?', a: 'The Soul Number uses vowels and reveals your inner world — private desires and true motivations. The Personality Number uses consonants and reveals your outer presentation — what others perceive first about you.' },
      { q: 'Which consonants are used in the Personality Number calculation?', a: 'All letters in your name that are NOT vowels. For Latin: not A, E, I, O, U, Y. For Cyrillic: not А, Е, Ё, И, О, У, Ы, Э, Ю, Я, І, Ї, Є. Letters like Б, В, Г, Д, Ж and their Latin equivalents B, C, D, F are consonants.' },
      { q: 'Can the Personality Number reveal why people misread me?', a: 'Yes — if your Personality Number describes qualities that differ significantly from your Soul Number, it can explain why others form an impression of you that feels inaccurate. The outer number is what people see; the inner one is who you are.' },
      { q: 'What does Personality Number 3 suggest about first impressions?', a: 'People with Personality Number 3 come across as charming, witty and sociable. Others immediately perceive them as creative and fun. The challenge is that this bright outer persona can make people underestimate the depth that lies beneath.' },
      { q: 'What does Personality Number 8 indicate?', a: 'Personality Number 8 projects authority, ambition and capability. People instinctively sense you are someone who gets things done. This can be powerful in professional settings but may sometimes feel intimidating in personal relationships.' },
      { q: 'Is the Personality Number based on my birth name or current name?', a: 'This calculator works with any name you enter. Using your birth name reflects your original personality blueprint. Using your current name shows the impression you project today, which may have evolved if your name has changed.' },
      { q: 'What if someone deliberately changes their name to improve their Personality Number?', a: 'Some people do choose names — stage names, pen names, business names — partly based on numerology to project a desired vibration. However, authenticity typically matters more in practice than a numerologically ideal number.' },
      { q: 'Can master numbers appear in the Personality Number?', a: 'Yes. If the consonants in your name reduce to 11, 22 or 33, you have a master Personality Number. This indicates you project an unusually elevated presence — often perceived as inspiring, visionary or magnetic by those around you.' },
      { q: 'How should I use the Personality Number in daily life?', a: 'Use it as a mirror for self-awareness. Ask whether the image you project matches how you feel inside. If there is a large gap, you might explore why — through communication, personal style, or how you show up in different social contexts.' },
    ],
  },
  ru: {
    description: 'Число личности выводится из согласных вашего имени с использованием пифагорейской нумерологии. Тогда как число души (из гласных) раскрывает внутренний мир и тайные желания, число личности раскрывает внешнюю подачу — первое впечатление, образ, который вы проецируете, и качества, которые другие замечают до того, как по-настоящему узнают вас. Представьте это как «упаковку» личности: черты, действующие как фильтр между тем, кто вы есть внутри, и тем, что видит мир.\n\nСогласные формируют структуру и форму слов, так же как число личности отражает структуру и форму вашей самоподачи. Понимание этого числа помогает осознать транслируемый образ — совпадает ли он с внутренним «я» (числом души) или существенно отличается. Многие обнаруживают, что устранение разрыва между числами души и личности ведёт к более аутентичному и полноценному присутствию в мире.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое число личности в нумерологии?', a: 'Число личности описывает образ, который вы проецируете миру — внешнее впечатление, которое другие формируют о вас до глубокого знакомства. Рассчитывается только по согласным в имени с помощью пифагорейской системы.' },
      { q: 'Чем число личности отличается от числа души?', a: 'Число души использует гласные и раскрывает внутренний мир. Число личности использует согласные и раскрывает внешнюю подачу — то, что другие воспринимают в первую очередь.' },
      { q: 'Какие согласные используются в расчёте числа личности?', a: 'Все буквы имени, не являющиеся гласными. Для латиницы: не A, E, I, O, U, Y. Для кириллицы: не А, Е, Ё, И, О, У, Ы, Э, Ю, Я, І, Ї, Є. Такие буквы, как Б, В, Г, Д, Ж — согласные.' },
      { q: 'Может ли число личности объяснить, почему люди неверно меня считывают?', a: 'Да — если число личности описывает качества, значительно отличающиеся от числа души, это объясняет, почему другие формируют о вас впечатление, кажущееся неточным. Внешнее число — то, что люди видят; внутреннее — кто вы есть.' },
      { q: 'Что означает число личности 3 для первого впечатления?', a: 'Люди с числом личности 3 воспринимаются как обаятельные, остроумные и общительные. Другие сразу видят их творческими и весёлыми. Вызов — эта яркая внешность может заставить людей недооценивать глубину, скрытую внутри.' },
      { q: 'На что указывает число личности 8?', a: 'Число личности 8 проецирует авторитет, амбиции и компетентность. Люди инстинктивно чувствуют, что вы способны добиться результатов. Это сильно в профессиональной среде, но иногда может быть устрашающим в личных отношениях.' },
      { q: 'Число личности основано на имени при рождении или текущем имени?', a: 'Калькулятор работает с любым введённым именем. Имя при рождении отражает исходный нумерологический план. Текущее имя показывает транслируемое сегодня впечатление, которое могло измениться.' },
      { q: 'Что если кто-то намеренно меняет имя для улучшения числа личности?', a: 'Некоторые выбирают псевдонимы и сценические имена частично с учётом нумерологии. Однако на практике аутентичность обычно важнее нумерологически идеального числа.' },
      { q: 'Могут ли мастер-числа появиться в числе личности?', a: 'Да. Если согласные в имени редуцируются до 11, 22 или 33, у вас мастер-число личности. Это указывает, что вы проецируете необычно возвышенное присутствие — часто воспринимаемое как вдохновляющее или притягательное.' },
      { q: 'Как использовать число личности в повседневной жизни?', a: 'Используйте его как зеркало для самосознания. Спросите, совпадает ли транслируемый образ с вашим внутренним ощущением. Если разрыв велик, исследуйте его через общение, личный стиль или то, как вы присутствуете в разных контекстах.' },
    ],
  },
  uk: {
    description: 'Число особистості виводиться з приголосних вашого імені з використанням піфагорійської нумерології. Тоді як число душі (з голосних) розкриває внутрішній світ і таємні бажання, число особистості розкриває зовнішню подачу — перше враження, образ, який ви проектуєте, і якості, які інші помічають до того, як справді пізнають вас. Уявіть це як «упаковку» особистості: риси, що діють як фільтр між тим, ким ви є всередині, та тим, що бачить світ.\n\nПриголосні формують структуру та форму слів, так само як число особистості відображає структуру та форму вашої самоподачі. Розуміння цього числа допомагає усвідомити образ, що транслюється — збігається він із внутрішнім «я» (числом душі) чи суттєво відрізняється. Багато хто виявляє, що усунення розриву між числами душі та особистості веде до більш автентичної та повноцінної присутності у світі.',
    faqTitle: 'Часті питання',
    faqs: [
      { q: 'Що таке число особистості в нумерології?', a: 'Число особистості описує образ, який ви проектуєте світу — зовнішнє враження, яке інші формують про вас до глибокого знайомства. Розраховується лише за приголосними в імені за допомогою піфагорійської системи.' },
      { q: 'Чим число особистості відрізняється від числа душі?', a: 'Число душі використовує голосні та розкриває внутрішній світ. Число особистості використовує приголосні та розкриває зовнішню подачу — те, що інші сприймають насамперед.' },
      { q: 'Які приголосні використовуються в розрахунку числа особистості?', a: 'Всі букви імені, що не є голосними. Для латиниці: не A, E, I, O, U, Y. Для кирилиці: не А, Е, Ё, И, О, У, Ы, Э, Ю, Я, І, Ї, Є. Такі букви, як Б, В, Г, Д, Ж — приголосні.' },
      { q: 'Чи може число особистості пояснити, чому люди неправильно мене зчитують?', a: 'Так — якщо число особистості описує якості, що суттєво відрізняються від числа душі, це пояснює, чому інші формують про вас враження, що здається неточним.' },
      { q: 'Що означає число особистості 3 для першого враження?', a: 'Люди з числом особистості 3 сприймаються як чарівні, дотепні та товариські. Інші одразу бачать їх творчими та веселими. Виклик — ця яскрава зовнішність може змусити людей недооцінювати глибину всередині.' },
      { q: 'На що вказує число особистості 8?', a: 'Число особистості 8 проектує авторитет, амбіції та компетентність. Люди інстинктивно відчувають, що ви здатні досягти результатів. Це сильно в професійному середовищі, але іноді може бути лякаючим в особистих стосунках.' },
      { q: 'Число особистості засноване на імені при народженні чи поточному імені?', a: 'Калькулятор працює з будь-яким введеним іменем. Ім\'я при народженні відображає вихідний план. Поточне ім\'я показує враження, що транслюється сьогодні.' },
      { q: 'Що якщо хтось навмисно змінює ім\'я для покращення числа особистості?', a: 'Деякі обирають псевдоніми частково з урахуванням нумерології. Однак на практиці автентичність зазвичай важливіша за нумерологічно ідеальне число.' },
      { q: 'Чи можуть майстер-числа з\'явитися в числі особистості?', a: 'Так. Якщо приголосні в імені редукуються до 11, 22 або 33, у вас майстер-число особистості, що вказує на незвично підвищену присутність.' },
      { q: 'Як використовувати число особистості в повсякденному житті?', a: 'Використовуйте його як дзеркало для самосвідомості. Запитайте, чи збігається образ, що транслюється, з вашим внутрішнім відчуттям. Якщо розрив великий — досліджуйте його через спілкування та стиль.' },
    ],
  },
  fr: {
    description: 'Le Nombre de Personnalité est dérivé des consonnes de votre nom en utilisant le système pythagoricien. Alors que le Nombre d\'Âme (dérivé des voyelles) révèle votre monde intérieur et vos désirs secrets, le Nombre de Personnalité révèle votre présentation extérieure — la première impression que vous faites, l\'image que vous projetez et les qualités que les autres remarquent avant de vraiment vous connaître. Pensez-y comme à l\'«emballage» de votre personnalité.\n\nLes consonnes forment la structure et la forme des mots, tout comme le Nombre de Personnalité reflète la structure et la forme de votre façon de vous présenter. Comprendre ce nombre peut vous aider à prendre conscience de l\'image que vous projetez — si elle s\'aligne avec votre moi intérieur (Nombre d\'Âme) ou si elle diffère considérablement. Beaucoup trouvent que combler l\'écart entre les deux nombres mène à une façon plus authentique d\'être dans le monde.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le Nombre de Personnalité en numérologie ?', a: 'Le Nombre de Personnalité décrit l\'image que vous projetez — l\'impression extérieure que les autres forment de vous avant de vous connaître profondément. Il est calculé à partir des seules consonnes de votre nom.' },
      { q: 'En quoi le Nombre de Personnalité diffère-t-il du Nombre d\'Âme ?', a: 'Le Nombre d\'Âme utilise les voyelles et révèle votre monde intérieur. Le Nombre de Personnalité utilise les consonnes et révèle votre présentation extérieure — ce que les autres perçoivent en premier.' },
      { q: 'Quelles consonnes sont utilisées dans le calcul du Nombre de Personnalité ?', a: 'Toutes les lettres de votre nom qui NE SONT PAS des voyelles. Pour le latin : pas A, E, I, O, U, Y. Pour le cyrillique : pas А, Е, Ё, И, О, У, Ы, Э, Ю, Я, І, Ї, Є.' },
      { q: 'Le Nombre de Personnalité peut-il expliquer pourquoi les gens me lisent mal ?', a: 'Oui — si votre Nombre de Personnalité décrit des qualités très différentes de votre Nombre d\'Âme, cela explique pourquoi les autres forment une impression de vous qui vous semble inexacte.' },
      { q: 'Que signifie un Nombre de Personnalité 3 pour les premières impressions ?', a: 'Les personnes avec le Nombre de Personnalité 3 paraissent charmantes, spirituelles et sociables. Les autres les perçoivent immédiatement comme créatives et amusantes. Le défi est que cette personnalité brillante peut amener à sous-estimer leur profondeur.' },
      { q: 'Que signifie un Nombre de Personnalité 8 ?', a: 'Le Nombre de Personnalité 8 projette autorité, ambition et compétence. Les gens sentent instinctivement que vous êtes capable d\'obtenir des résultats. Très puissant en contexte professionnel, parfois intimidant en relations personnelles.' },
      { q: 'Le Nombre de Personnalité est-il basé sur le nom de naissance ou le nom actuel ?', a: 'Ce calculateur fonctionne avec n\'importe quel nom saisi. Le nom de naissance reflète votre modèle original. Votre nom actuel montre l\'impression que vous projetez aujourd\'hui.' },
      { q: 'Certains changent-ils de nom pour améliorer leur Nombre de Personnalité ?', a: 'Certains choisissent des pseudonymes en tenant compte de la numérologie. Cependant, l\'authenticité importe généralement plus en pratique qu\'un nombre numérologique idéal.' },
      { q: 'Des nombres maîtres peuvent-ils apparaître dans le Nombre de Personnalité ?', a: 'Oui. Si les consonnes de votre nom se réduisent à 11, 22 ou 33, vous avez un Nombre de Personnalité maître — une présence inhabituellement élevée perçue comme inspirante ou magnétique.' },
      { q: 'Comment utiliser le Nombre de Personnalité au quotidien ?', a: 'Utilisez-le comme miroir de la conscience de soi. Demandez-vous si l\'image que vous projetez correspond à ce que vous ressentez intérieurement. Un grand écart peut vous inviter à explorer comment vous vous présentez dans différents contextes.' },
    ],
  },
  lt: {
    description: 'Asmenybės skaičius gaunamas iš jūsų vardo priebalsių naudojant Pitagoro numerologiją. Sielos skaičius (iš balsių) atskleidžia vidinį pasaulį ir slaptus troškimus, o asmenybės skaičius atskleidžia išorinę pristatymą — pirmąjį įspūdį, kurį darote, įvaizdį, kurį projektuojate, ir savybes, kurias kiti pastebi prieš tikrai jus pažindami. Galvokite apie tai kaip apie asmenybės „pakuotę": savybės, kurios veikia kaip filtras tarp to, kas esate viduje, ir to, ką mato pasaulis.\n\nPriebalsiai sudaro žodžių struktūrą ir formą, lygiai taip pat kaip asmenybės skaičius atspindi jūsų savęs pristatymo struktūrą ir formą. Supratę šį skaičių, galite geriau suvokti projektuojamą įvaizdį — ar jis atitinka vidinę esmę (sielos skaičių) ar labai skiriasi. Daugelis atranda, kad mažinant atotrūkį tarp sielos ir asmenybės skaičių, gyvenime atsiranda daugiau autentiškumo.',
    faqTitle: 'Dažni klausimai',
    faqs: [
      { q: 'Kas yra asmenybės skaičius numerologijoje?', a: 'Asmenybės skaičius aprašo įvaizdį, kurį projektuojate pasauliui — išorinį įspūdį, kurį kiti susiformuoja prieš giliai jus pažindami. Jis apskaičiuojamas tik iš priebalsių jūsų varde.' },
      { q: 'Kuo asmenybės skaičius skiriasi nuo sielos skaičiaus?', a: 'Sielos skaičius naudoja balsius ir atskleidžia vidinį pasaulį. Asmenybės skaičius naudoja priebalsius ir atskleidžia išorinę pristatymą — tai, ką kiti pirmiausia pastebi.' },
      { q: 'Kurie priebalsiai naudojami asmenybės skaičiaus skaičiavimui?', a: 'Visos vardo raidės, kurios NĖRA balsiai. Lotynų: ne A, E, I, O, U, Y. Kirilicos: ne А, Е, Ё, И, О, У, Ы, Э, Ю, Я, І, Ї, Є. Tokios raidės kaip Б, В, Г, Д, Ж yra priebalsiai.' },
      { q: 'Ar asmenybės skaičius gali paaiškinti, kodėl žmonės mane neteisingai skaito?', a: 'Taip — jei asmenybės skaičius aprašo savybes, labai besiskiriančias nuo sielos skaičiaus, tai paaiškina, kodėl kiti susiformuoja apie jus netikslų įspūdį.' },
      { q: 'Ką reiškia asmenybės skaičius 3 pirmam įspūdžiui?', a: 'Žmonės su asmenybės skaičiumi 3 atrodo žavūs, sąmojingi ir bendraujantys. Kiti juos iš karto suvokia kaip kūrybingus ir linksmus. Iššūkis — ši ryški išorė gali paskatinti kitus neįvertinti viduje slypinčio gylio.' },
      { q: 'Ką nurodo asmenybės skaičius 8?', a: 'Asmenybės skaičius 8 projektuoja autoritetą, ambicijas ir kompetenciją. Žmonės instinktyviai jaučia, kad esate pajėgus pasiekti rezultatų. Tai galinga profesiniame kontekste, bet kartais gali būti bauginanti asmeniniuose santykiuose.' },
      { q: 'Ar asmenybės skaičius grindžiamas gimimo ar dabartiniu vardu?', a: 'Skaičiuotuvas veikia su bet kuriuo įvestu vardu. Gimimo vardas atspindi originalų planą. Dabartinis vardas rodo šiandien projektuojamą įspūdį.' },
      { q: 'Ar kai kurie keičia vardą norėdami pagerinti asmenybės skaičių?', a: 'Kai kurie renkasi slapyvardžius iš dalies atsižvelgdami į numerologiją. Tačiau praktiškai autentiškumas paprastai svarbiau nei numerologiškai idealus skaičius.' },
      { q: 'Ar meistro skaičiai gali pasirodyti asmenybės skaičiuje?', a: 'Taip. Jei vardo priebalsiai sumažinami iki 11, 22 ar 33, turite meistro asmenybės skaičių, nurodantį neįprastai aukštą buvimą — dažnai suvokiamą kaip įkvepiančią ar magnetišką.' },
      { q: 'Kaip naudoti asmenybės skaičių kasdieniniame gyvenime?', a: 'Naudokite jį kaip savimogos veidrodį. Paklauskite, ar projektuojamas įvaizdis atitinka tai, kaip jaučiatės viduje. Jei skirtumas didelis, tyrinėkite tai per bendravimą ir stilių.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/destiny-number', label: 'Destiny Number' },
    { href: '/calculator/name-number', label: 'Name Number' },
    { href: '/calculator/soul-number', label: 'Soul Number' },
    { href: '/calculator/age', label: 'Age Calculator' },
  ],
  ru: [
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/destiny-number', label: 'Число судьбы' },
    { href: '/calculator/name-number', label: 'Число имени' },
    { href: '/calculator/soul-number', label: 'Число души' },
    { href: '/calculator/age', label: 'Калькулятор возраста' },
  ],
  uk: [
    { href: '/calculator/life-path', label: 'Число життєвого шляху' },
    { href: '/calculator/destiny-number', label: 'Число долі' },
    { href: '/calculator/name-number', label: 'Число імені' },
    { href: '/calculator/soul-number', label: 'Число душі' },
    { href: '/calculator/age', label: 'Калькулятор віку' },
  ],
  fr: [
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/destiny-number', label: 'Nombre Destin' },
    { href: '/calculator/name-number', label: 'Nombre du Nom' },
    { href: '/calculator/soul-number', label: "Nombre de l'Âme" },
    { href: '/calculator/age', label: 'Calculateur d\'âge' },
  ],
  lt: [
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/destiny-number', label: 'Likimo skaičius' },
    { href: '/calculator/name-number', label: 'Vardo skaičius' },
    { href: '/calculator/soul-number', label: 'Sielos skaičius' },
    { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return {
    title: meta.title,
    description: meta.description,
    ...buildAlternates(locale, '/calculator/personality-number'),
  };
}

export async function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function PersonalityNumberPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/personality-number`,
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
        <PersonalityNumberCalculator locale={locale} />
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

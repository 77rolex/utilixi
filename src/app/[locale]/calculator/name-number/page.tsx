import ToolActions from '@/components/ui/ToolActions';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import NameNumberCalculator from './NameNumberCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Name Number Calculator — Pythagorean Numerology Free Online',
    description: 'Calculate your Name Number free online using Pythagorean numerology. Enter your full name and discover the vibration it carries — works with Latin and Cyrillic letters.',
    h1: 'Name Number Calculator',
    subtitle: 'Calculate your Name Number from any name using Pythagorean numerology — works with Latin and Cyrillic letters.',
  },
  ru: {
    title: 'Число имени — Пифагорейская нумерология онлайн бесплатно',
    description: 'Рассчитайте число имени онлайн бесплатно по пифагорейской нумерологии. Введите полное имя и узнайте его вибрацию — поддерживается латиница и кириллица.',
    h1: 'Число имени — калькулятор',
    subtitle: 'Рассчитайте число имени по любому имени с помощью пифагорейской нумерологии — поддерживается латиница и кириллица.',
  },
  uk: {
    title: 'Число Імені — Піфагорійська Нумерологія Онлайн Безкоштовно',
    description: 'Розрахуйте число імені онлайн безкоштовно за піфагорійською нумерологією. Введіть повне ім\'я і дізнайтеся його вібрацію — підтримується латиниця і кирилиця.',
    h1: 'Число імені — калькулятор',
    subtitle: 'Розрахуйте число імені за будь-яким іменем за допомогою піфагорійської нумерології — підтримується латиниця і кирилиця.',
  },
  fr: {
    title: 'Calculateur Nombre du Nom — Numérologie Pythagoricienne Gratuite',
    description: 'Calculez votre Nombre du Nom gratuitement en ligne avec la numérologie pythagoricienne. Entrez votre nom complet et découvrez sa vibration — compatible Latin et cyrillique.',
    h1: 'Calculateur du Nombre du Nom',
    subtitle: 'Calculez votre Nombre du Nom à partir de n\'importe quel prénom en numérologie pythagoricienne — Latin et cyrillique supportés.',
  },
  lt: {
    title: 'Vardo Skaičiaus Skaičiuotuvas — Nemokama Pitagoro Numerologija',
    description: 'Apskaičiuokite savo vardo skaičių nemokamai internete naudodami Pitagoro numerologiją. Įveskite pilną vardą ir sužinokite jo vibraciją — veikia su lotyniška ir kirilica.',
    h1: 'Vardo skaičiaus skaičiuotuvas',
    subtitle: 'Apskaičiuokite savo vardo skaičių bet kuriam vardui naudodami Pitagoro numerologiją — veikia su lotyniška ir kirilica.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'The Name Number (sometimes called the Expression Number when derived from the birth name) reveals the unique energetic vibration carried by your name. Using the Pythagorean system — the most widely used numerological method in the Western world — each letter is assigned a value from 1 to 8. By summing all the letter values in your name and reducing the total, you arrive at a single digit (or a master number) that describes the energy your name broadcasts to the world and the qualities it reinforces in your life.\n\nThis calculator supports both Latin and Cyrillic alphabets, making it suitable for English, French, Lithuanian, Russian and Ukrainian names. Many people use their first name only, while others use their full birth name or even a chosen name to understand the energy they project. If your calculation produces a master number — 11, 22 or 33 — it is not reduced further, as these carry a heightened spiritual significance in numerology tradition.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the Name Number in numerology?', a: 'The Name Number reveals the energetic vibration of your name. Each letter is assigned a value (A=1, B=2 … Z=8 in the Pythagorean system). All values are summed and reduced to a single digit or master number, showing the qualities your name amplifies.' },
      { q: 'Which numerology system does this calculator use?', a: 'This calculator uses the Pythagorean system, the most widely adopted method in Western numerology. Letters are assigned values 1–8 cycling in order. The Chaldean system uses a slightly different table (1–8 but with different assignments) and is less common.' },
      { q: 'Should I use my first name, full name or birth name?', a: 'Different traditions suggest different approaches. Your full birth name is considered most significant for the Expression/Destiny Number. Your first name alone reflects your day-to-day self. A chosen or nickname shows the energy you present socially.' },
      { q: 'Does the Name Number work for Cyrillic names?', a: 'Yes. This calculator includes a full Pythagorean Cyrillic mapping for Russian, Ukrainian and other Slavic names, including Ukrainian-specific letters (І, Ї, Є, Ґ).' },
      { q: 'What is the difference between Name Number and Soul Number?', a: 'Both are derived from your name, but they use different letters. The Name Number uses all letters. The Soul Number uses only the vowels. The Personality Number uses only the consonants.' },
      { q: 'Can I calculate the Name Number for any name?', a: 'Yes — you can calculate the number for any word or name, including nicknames, stage names, business names or names you are considering. Each carries a distinct vibration.' },
      { q: 'What does a Name Number 7 indicate?', a: 'A Name Number 7 vibrates with analytical depth, spiritual seeking and mystery. This name energy attracts introspection and intellectual pursuits. People with this name number are often perceived as thoughtful, private and wise.' },
      { q: 'What does a master number Name Number mean?', a: 'If your name reduces to 11, 22 or 33, it carries a heightened vibration. Master number names are associated with elevated spiritual purpose, greater sensitivity and the potential for significant impact. They also bring greater challenges.' },
      { q: 'Can two people with the same name have different experiences?', a: 'Yes. The Name Number describes vibrational tendencies, not fixed outcomes. The birth date numbers, personal choices and life circumstances all shape how the name energy manifests uniquely for each individual.' },
      { q: 'Is numerology a reliable guide to personality?', a: 'Numerology is a metaphysical tradition without scientific basis. It can be a useful lens for self-reflection and exploring patterns, but should not be treated as a definitive personality assessment or predictive tool.' },
    ],
  },
  ru: {
    description: 'Число имени (иногда называемое числом выражения, когда оно выводится из имени при рождении) раскрывает уникальную энергетическую вибрацию, которую несёт ваше имя. Используя пифагорейскую систему — наиболее распространённый нумерологический метод в западном мире — каждой букве присваивается значение от 1 до 8. Суммируя все значения букв в имени и редуцируя итог, вы получаете однозначную цифру (или мастер-число), описывающую энергию, которую транслирует ваше имя, и качества, которые оно усиливает в вашей жизни.\n\nЭтот калькулятор поддерживает как латиницу, так и кириллицу, что делает его пригодным для английских, французских, литовских, русских и украинских имён. Многие используют только имя, другие — полное имя при рождении или избранное имя, чтобы понять транслируемую энергию. Если расчёт даёт мастер-число — 11, 22 или 33 — оно не редуцируется, поскольку несёт повышенное духовное значение.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое число имени в нумерологии?', a: 'Число имени раскрывает энергетическую вибрацию вашего имени. Каждой букве присваивается значение (А=1, Б=2 ... Я=5 в пифагорейской системе). Все значения суммируются и редуцируются до однозначной цифры или мастер-числа.' },
      { q: 'Какую нумерологическую систему использует этот калькулятор?', a: 'Используется пифагорейская система — наиболее распространённый метод в западной нумерологии. Буквам присваиваются значения 1–8 по порядку. Халдейская система использует слегка отличающуюся таблицу и менее распространена.' },
      { q: 'Какое имя использовать: только имя, полное имя или имя при рождении?', a: 'Разные традиции предлагают разные подходы. Полное имя при рождении считается наиболее значимым для числа выражения. Только имя отражает повседневное «я». Избранное имя или псевдоним показывает социально транслируемую энергию.' },
      { q: 'Работает ли расчёт для кириллических имён?', a: 'Да. Калькулятор включает полную пифагорейскую таблицу для кириллицы — русских, украинских и других славянских имён, включая украинские буквы І, Ї, Є, Ґ.' },
      { q: 'Чем число имени отличается от числа души?', a: 'Оба выводятся из имени, но используют разные буквы. Число имени учитывает все буквы. Число души — только гласные. Число личности — только согласные.' },
      { q: 'Можно ли рассчитать число для любого имени?', a: 'Да — можно рассчитать число для любого слова или имени: псевдонима, имени для сцены, названия бизнеса или имени, которое вы рассматриваете. Каждое несёт свою вибрацию.' },
      { q: 'Что означает число имени 7?', a: 'Число имени 7 вибрирует с аналитической глубиной, духовным поиском и тайностью. Эта именная энергия привлекает интроспекцию и интеллектуальные занятия. Такие люди воспринимаются как задумчивые, скрытные и мудрые.' },
      { q: 'Что означает мастер-число в числе имени?', a: 'Если имя редуцируется до 11, 22 или 33, оно несёт повышенную вибрацию. Такие имена связаны с духовной целью, повышенной чувствительностью и потенциалом значительного влияния, а также с большими испытаниями.' },
      { q: 'Могут ли два человека с одним именем иметь разный опыт?', a: 'Да. Число имени описывает вибрационные тенденции, но не фиксированные исходы. Числа даты рождения, личные выборы и жизненные обстоятельства формируют уникальное проявление именной энергии.' },
      { q: 'Является ли нумерология надёжным руководством по личности?', a: 'Нумерология — метафизическая традиция без научного обоснования. Она может служить полезной призмой для саморефлексии и изучения закономерностей, но не должна рассматриваться как авторитетная оценка личности.' },
    ],
  },
  uk: {
    description: 'Число імені (іноді зване числом виразу, коли воно виводиться з імені при народженні) розкриває унікальну енергетичну вібрацію, яку несе ваше ім\'я. Використовуючи піфагорійську систему — найпоширеніший нумерологічний метод у західному світі — кожній букві присвоюється значення від 1 до 8. Підсумовуючи всі значення букв у імені та редукуючи підсумок, ви отримуєте однозначну цифру (або майстер-число), що описує енергію, яку транслює ваше ім\'я.\n\nЦей калькулятор підтримує як латиницю, так і кирилицю, що робить його придатним для англійських, французьких, литовських, російських та українських імен. Багато хто використовує лише ім\'я, інші — повне ім\'я при народженні або обране ім\'я. Якщо розрахунок дає майстер-число — 11, 22 або 33 — воно не редукується, оскільки несе підвищене духовне значення.',
    faqTitle: 'Часті питання',
    faqs: [
      { q: 'Що таке число імені в нумерології?', a: 'Число імені розкриває енергетичну вібрацію вашого імені. Кожній букві присвоюється значення (А=1, Б=2 ... Я=5 в піфагорійській системі). Всі значення підсумовуються та редукуються до однозначної цифри або майстер-числа.' },
      { q: 'Яку нумерологічну систему використовує цей калькулятор?', a: 'Використовується піфагорійська система — найпоширеніший метод у західній нумерології. Буквам присвоюються значення 1–8 по порядку. Халдейська система використовує дещо відмінну таблицю.' },
      { q: 'Яке ім\'я використовувати: тільки ім\'я, повне ім\'я чи ім\'я при народженні?', a: 'Різні традиції пропонують різні підходи. Повне ім\'я при народженні вважається найзначимішим. Тільки ім\'я відображає повсякденне «я». Обране ім\'я або псевдонім показує соціально транслюєму енергію.' },
      { q: 'Чи працює розрахунок для кириличних імен?', a: 'Так. Калькулятор включає повну піфагорійську таблицю для кирилиці — російських, українських та інших слов\'янських імен, включаючи українські літери І, Ї, Є, Ґ.' },
      { q: 'Чим число імені відрізняється від числа душі?', a: 'Обидва виводяться з імені, але використовують різні букви. Число імені враховує всі букви. Число душі — лише голосні. Число особистості — лише приголосні.' },
      { q: 'Чи можна розрахувати число для будь-якого імені?', a: 'Так — можна розрахувати число для будь-якого слова чи імені: псевдоніма, сценічного імені, назви бізнесу або імені, яке ви розглядаєте. Кожне несе свою вібрацію.' },
      { q: 'Що означає число імені 7?', a: 'Число імені 7 вібрує з аналітичною глибиною, духовним пошуком та таємничістю. Така іменна енергія притягує інтроспекцію та інтелектуальні заняття. Такі люди сприймаються як задумливі, стримані та мудрі.' },
      { q: 'Що означає майстер-число в числі імені?', a: 'Якщо ім\'я редукується до 11, 22 або 33, воно несе підвищену вібрацію. Такі імена пов\'язані з духовною метою, підвищеною чутливістю та потенціалом значного впливу.' },
      { q: 'Чи можуть два люди з однаковим іменем мати різний досвід?', a: 'Так. Число імені описує вібраційні тенденції, але не фіксовані результати. Числа дати народження, особисті вибори та життєві обставини формують унікальне прояв іменної енергії.' },
      { q: 'Чи є нумерологія надійним керівництвом з особистості?', a: 'Нумерологія — метафізична традиція без наукового обґрунтування. Вона може бути корисною призмою для саморефлексії, але не повинна розглядатися як авторитетна оцінка особистості.' },
    ],
  },
  fr: {
    description: 'Le Nombre du Nom (parfois appelé Nombre Expression lorsqu\'il est dérivé du nom de naissance) révèle la vibration énergétique unique portée par votre nom. En utilisant le système pythagoricien — la méthode numérologique la plus répandue dans le monde occidental — chaque lettre se voit attribuer une valeur de 1 à 8. En additionnant toutes les valeurs des lettres de votre nom et en réduisant le total, vous obtenez un chiffre unique (ou un nombre maître) qui décrit l\'énergie que diffuse votre nom.\n\nCe calculateur prend en charge les alphabets latin et cyrillique, ce qui le rend adapté aux noms anglais, français, lituaniens, russes et ukrainiens. Beaucoup utilisent leur seul prénom, d\'autres leur nom complet de naissance. Si votre calcul donne un nombre maître — 11, 22 ou 33 — il n\'est pas réduit davantage, car il porte une signification spirituelle élevée dans la tradition numérologique.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le Nombre du Nom en numérologie ?', a: 'Le Nombre du Nom révèle la vibration énergétique de votre nom. Chaque lettre reçoit une valeur (A=1, B=2 … Z=8 dans le système pythagoricien). Toutes les valeurs sont additionnées et réduites à un seul chiffre ou nombre maître.' },
      { q: 'Quel système numérologique ce calculateur utilise-t-il ?', a: 'Ce calculateur utilise le système pythagoricien, la méthode la plus adoptée en numérologie occidentale. Les lettres reçoivent des valeurs 1–8 cycliquement. Le système chaldéen utilise une table légèrement différente et est moins courant.' },
      { q: 'Dois-je utiliser mon prénom, mon nom complet ou mon nom de naissance ?', a: 'Différentes traditions proposent différentes approches. Votre nom complet de naissance est le plus significatif pour le Nombre Expression. Votre seul prénom reflète votre moi quotidien. Un surnom montre l\'énergie que vous projetez socialement.' },
      { q: 'Le Nombre du Nom fonctionne-t-il pour les noms cyrilliques ?', a: 'Oui. Ce calculateur inclut une table pythagoricienne cyrillique complète pour les noms russes, ukrainiens et slaves, incluant les lettres ukrainiennes spécifiques (І, Ї, Є, Ґ).' },
      { q: 'Quelle est la différence entre le Nombre du Nom et le Nombre d\'Âme ?', a: 'Les deux sont dérivés du nom mais utilisent des lettres différentes. Le Nombre du Nom utilise toutes les lettres. Le Nombre d\'Âme utilise uniquement les voyelles. Le Nombre de Personnalité utilise uniquement les consonnes.' },
      { q: 'Puis-je calculer le nombre pour n\'importe quel nom ?', a: 'Oui — vous pouvez calculer le nombre pour n\'importe quel mot ou nom, y compris des surnoms, noms de scène, noms d\'entreprise ou noms que vous envisagez. Chacun porte une vibration distincte.' },
      { q: 'Que signifie un Nombre du Nom 7 ?', a: 'Un Nombre du Nom 7 vibre avec une profondeur analytique, une quête spirituelle et du mystère. Cette énergie nominale attire l\'introspection et les poursuites intellectuelles. Ces personnes sont souvent perçues comme réfléchies et sages.' },
      { q: 'Que signifie un nombre maître dans le Nombre du Nom ?', a: 'Si votre nom se réduit à 11, 22 ou 33, il porte une vibration élevée. Les noms à nombre maître sont associés à un but spirituel élevé, une plus grande sensibilité et un potentiel d\'impact significatif.' },
      { q: 'Deux personnes avec le même nom peuvent-elles avoir des expériences différentes ?', a: 'Oui. Le Nombre du Nom décrit des tendances vibratoires, pas des résultats fixes. Les nombres de date de naissance, les choix personnels et les circonstances de vie façonnent la manifestation unique de l\'énergie du nom.' },
      { q: 'La numérologie est-elle un guide fiable de la personnalité ?', a: 'La numérologie est une tradition métaphysique sans base scientifique. Elle peut être une lentille utile pour la réflexion personnelle, mais ne doit pas être traitée comme une évaluation définitive de la personnalité.' },
    ],
  },
  lt: {
    description: 'Vardo skaičius (kartais vadinamas Raiškos skaičiumi, kai išvedamas iš gimimo vardo) atskleidžia unikalią energetinę vibraciją, kurią nešioja jūsų vardas. Naudojant Pitagoro sistemą — labiausiai paplitusį numerologinį metodą vakarų pasaulyje — kiekvienai raidei priskiriama reikšmė nuo 1 iki 8. Susumuojant visas vardo raidžių reikšmes ir mažinant sumą, gaunate vieną skaitmenį (arba meistro skaičių), kuris aprašo energiją, kurią skleidžia jūsų vardas.\n\nŠis skaičiuotuvas palaiko tiek lotyniška, tiek kirilicos raštą, todėl tinka anglų, prancūzų, lietuvių, rusų ir ukrainiečių vardams. Daugelis naudoja tik vardą, kiti — pilną gimimo vardą. Jei skaičiavimas duoda meistro skaičių — 11, 22 ar 33 — jis nesumažinamas toliau, nes nešioja padidintą dvasinę reikšmę numerologijos tradicijoje.',
    faqTitle: 'Dažni klausimai',
    faqs: [
      { q: 'Kas yra vardo skaičius numerologijoje?', a: 'Vardo skaičius atskleidžia energetinę jūsų vardo vibraciją. Kiekvienai raidei suteikiama reikšmė (A=1, B=2 … Z=8 Pitagoro sistemoje). Visos reikšmės sumuojamos ir mažinamos iki vieno skaitmens ar meistro skaičiaus.' },
      { q: 'Kurią numerologijos sistemą naudoja šis skaičiuotuvas?', a: 'Šis skaičiuotuvas naudoja Pitagoro sistemą — labiausiai paplitusį vakarų numerologijos metodą. Raidėms priskiriamos reikšmės 1–8 cikliškai. Chaldėjų sistema naudoja šiek tiek kitokią lentelę.' },
      { q: 'Kurį vardą naudoti: tik vardą, pilną vardą ar gimimo vardą?', a: 'Skirtingos tradicijos siūlo skirtingus požiūrius. Pilnas gimimo vardas laikomas reikšmingiausiu. Tik vardas atspindi kasdieninį jūsų aš. Pasirinktas vardas ar slapyvardis rodo socialiai projektuojamą energiją.' },
      { q: 'Ar vardo skaičius veikia kirilicos vardams?', a: 'Taip. Skaičiuotuvas apima pilną Pitagoro kirilicos lentelę rusų, ukrainiečių ir kitų slavų vardams, įskaitant ukrainietiškus raides (І, Ї, Є, Ґ).' },
      { q: 'Kuo vardo skaičius skiriasi nuo sielos skaičiaus?', a: 'Abu gaunami iš vardo, bet naudoja skirtingas raides. Vardo skaičius naudoja visas raides. Sielos skaičius naudoja tik balsius. Asmenybės skaičius naudoja tik priebalsius.' },
      { q: 'Ar galiu apskaičiuoti skaičių bet kuriam vardui?', a: 'Taip — galite apskaičiuoti skaičių bet kokiam žodžiui ar vardui, įskaitant slapyvardžius, sceninius vardus, verslo pavadinimus ar vardus, kuriuos svarstote. Kiekvienas nešioja skirtingą vibraciją.' },
      { q: 'Ką reiškia vardo skaičius 7?', a: 'Vardo skaičius 7 vibruoja analitine giluma, dvasiniu ieškojimu ir paslaptingumu. Ši vardo energija traukia introspekcija ir intelektualiais užsiėmimais. Tokie žmonės dažnai suvokiami kaip mąslingi ir išmintingi.' },
      { q: 'Ką reiškia meistro skaičius vardo skaičiuje?', a: 'Jei jūsų vardas sumažinamas iki 11, 22 ar 33, jis nešioja padidintą vibraciją. Meistro skaičių vardai siejami su dvasiniu tikslu, didesniu jautrumu ir reikšmingo poveikio potencialu.' },
      { q: 'Ar du žmonės tuo pačiu vardu gali turėti skirtingą patirtį?', a: 'Taip. Vardo skaičius aprašo vibracinias tendencijas, o ne fiksuotus rezultatus. Gimimo datos skaičiai, asmeniniai pasirinkimai ir gyvenimo aplinkybės formuoja unikalią vardo energijos apraišką.' },
      { q: 'Ar numerologija yra patikimas asmenybės vadovas?', a: 'Numerologija yra metafizinė tradicija be mokslinio pagrindo. Ji gali būti naudinga savirefleksijos priemonė, bet neturėtų būti laikoma galutine asmenybės įvertinimo sistema.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/destiny-number', label: 'Destiny Number' },
    { href: '/calculator/soul-number', label: 'Soul Number' },
    { href: '/calculator/personality-number', label: 'Personality Number' },
    { href: '/calculator/age', label: 'Age Calculator' },
  ],
  ru: [
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/destiny-number', label: 'Число судьбы' },
    { href: '/calculator/soul-number', label: 'Число души' },
    { href: '/calculator/personality-number', label: 'Число личности' },
    { href: '/calculator/age', label: 'Калькулятор возраста' },
  ],
  uk: [
    { href: '/calculator/life-path', label: 'Число життєвого шляху' },
    { href: '/calculator/destiny-number', label: 'Число долі' },
    { href: '/calculator/soul-number', label: 'Число душі' },
    { href: '/calculator/personality-number', label: 'Число особистості' },
    { href: '/calculator/age', label: 'Калькулятор віку' },
  ],
  fr: [
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/destiny-number', label: 'Nombre Destin' },
    { href: '/calculator/soul-number', label: "Nombre de l'Âme" },
    { href: '/calculator/personality-number', label: 'Nombre de Personnalité' },
    { href: '/calculator/age', label: 'Calculateur d\'âge' },
  ],
  lt: [
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/destiny-number', label: 'Likimo skaičius' },
    { href: '/calculator/soul-number', label: 'Sielos skaičius' },
    { href: '/calculator/personality-number', label: 'Asmenybės skaičius' },
    { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/name-number', meta);
}

export async function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function NameNumberPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/name-number`,
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
        <NameNumberCalculator locale={locale} />
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

import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import TimezoneConverter from './TimezoneConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/date-diff', label: 'Date Difference Calculator' }, { href: '/calculator/age', label: 'Age Calculator' }, { href: '/tools/countdown', label: 'Countdown Timer' }, { href: '/converter/units', label: 'Unit Converter' }, { href: '/tools/word-counter', label: 'Word Counter' }],
  ru: [{ href: '/calculator/date-diff', label: 'Калькулятор разницы дат' }, { href: '/calculator/age', label: 'Калькулятор возраста' }, { href: '/tools/countdown', label: 'Таймер обратного отсчёта' }, { href: '/converter/units', label: 'Конвертер единиц' }, { href: '/tools/word-counter', label: 'Счётчик слов' }],
  uk: [{ href: '/calculator/date-diff', label: 'Калькулятор різниці дат' }, { href: '/calculator/age', label: 'Калькулятор віку' }, { href: '/tools/countdown', label: 'Таймер зворотного відліку' }, { href: '/converter/units', label: 'Конвертер одиниць' }, { href: '/tools/word-counter', label: 'Лічильник слів' }],
  fr: [{ href: '/calculator/date-diff', label: 'Calculatrice de différence de dates' }, { href: '/calculator/age', label: 'Calculatrice d\'âge' }, { href: '/tools/countdown', label: 'Compte à rebours' }, { href: '/converter/units', label: 'Convertisseur d\'unités' }, { href: '/tools/word-counter', label: 'Compteur de mots' }],
  lt: [{ href: '/calculator/date-diff', label: 'Datų skirtumo skaičiuotuvas' }, { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' }, { href: '/tools/countdown', label: 'Atgalinio skaičiavimo laikmatis' }, { href: '/converter/units', label: 'Vienetų keitiklis' }, { href: '/tools/word-counter', label: 'Žodžių skaitiklis' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Timezone Converter — World Clock Online',
    description: 'Free timezone converter. Select a date, time, and source timezone to instantly see the same moment across 50+ major world cities and time zones.',
    h1: 'Timezone Converter',
    subtitle: 'See any moment in time across 50+ world cities — useful for scheduling international calls and meetings.',
  },
  ru: {
    title: 'Конвертер часовых поясов — мировые часы онлайн',
    description: 'Бесплатный конвертер часовых поясов. Выберите дату, время и исходный часовой пояс, чтобы мгновенно увидеть тот же момент в 50+ городахх мира.',
    h1: 'Конвертер часовых поясов',
    subtitle: 'Посмотрите любой момент времени в 50+ городах мира — удобно для планирования звонков и встреч.',
  },
  uk: {
    title: 'Конвертер часових поясів — світовий годинник онлайн',
    description: 'Безкоштовний конвертер часових поясів. Виберіть дату, час та вихідний часовий пояс, щоб миттєво побачити той самий момент у 50+ містах світу.',
    h1: 'Конвертер часових поясів',
    subtitle: 'Переглядайте будь-який момент часу в 50+ містах світу — зручно для планування дзвінків і зустрічей.',
  },
  fr: {
    title: 'Convertisseur de fuseaux horaires — horloge mondiale',
    description: 'Convertisseur de fuseaux horaires gratuit. Sélectionnez une date, une heure et un fuseau source pour voir instantanément le même moment dans 50+ grandes villes du monde.',
    h1: 'Convertisseur de fuseaux horaires',
    subtitle: 'Visualisez n\'importe quel moment dans 50+ villes du monde — idéal pour planifier des appels et réunions internationaux.',
  },
  lt: {
    title: 'Laiko juostų skaičiuoklė — laiko juostos pasaulyje internetu',
    description: 'Laiko juostų skaičiuoklė nemokamai. Lietuvos laiko juosta GMT, pasaulio laiko juostos — pamatykite tą patį momentą 50+ miestuose. Pasirinkite datą, laiką ir šaltinio laiko juostą.',
    h1: 'Laiko juostų keitiklis',
    subtitle: 'Peržiūrėkite bet kurį momentą 50+ pasaulio miestuose — patogu planuojant tarptautinius skambučius ir susitikimus.',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our timezone converter shows the same point in time across 50+ major world cities instantly. Pick any date and time, select your source timezone, and the tool automatically displays the equivalent local time for every city in the list — including the UTC offset for each zone.\n\nTime zone conversion is critical for scheduling international meetings, planning travel, and coordinating remote teams. Getting it wrong means calling colleagues at 3 AM or missing a flight. Use this tool to find a time that works across multiple zones, and check whether daylight saving time is currently in effect in your target locations.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How does the timezone converter work?',
        a: 'The converter takes your chosen date and time, interprets it in the selected source timezone, then converts that exact UTC moment to local time in all 50+ listed cities. Conversion uses the browser\'s built-in Intl.DateTimeFormat API, which respects daylight saving time (DST) automatically.',
      },
      {
        q: 'Does it account for daylight saving time?',
        a: 'Yes. Daylight saving time is handled automatically by the Intl API. The UTC offset shown next to each city reflects the actual offset on the selected date — so UTC+1 in winter and UTC+2 in summer for Central European Time, for example.',
      },
      {
        q: 'What is UTC?',
        a: 'UTC (Coordinated Universal Time) is the world\'s primary time standard. All other timezones are defined as an offset from UTC. UTC does not observe daylight saving time, making it a stable reference for international scheduling.',
      },
      {
        q: 'Why might a meeting scheduled at "9 AM EST" be confusing?',
        a: 'Timezone abbreviations like EST can be ambiguous — EST means UTC−5 in North America, but different abbreviations overlap across the world. It is always safer to specify a full timezone name (e.g., "America/New_York") or state the UTC offset explicitly.',
      },
      {
        q: 'How many time zones exist in the world?',
        a: 'There are 24 standard time zones based on 15-degree longitude increments, but in practice there are 40+ actual time zones, including half-hour offsets (India UTC+5:30, Iran UTC+3:30) and quarter-hour offsets (Nepal UTC+5:45). Some territories use non-standard offsets to align with their geography or national preference.',
      },
      {
        q: 'What is the International Date Line?',
        a: 'The International Date Line runs roughly along the 180° meridian in the Pacific Ocean. Crossing it eastward (towards the Americas) sets you back one calendar day; crossing westward (towards Asia/Pacific) advances you one day. This is why it\'s possible to have two different dates simultaneously on Earth.',
      },
      {
        q: 'Which countries span the most time zones?',
        a: 'France has the most time zones (12) due to its overseas territories. Russia has 11, the United States has 6 (including territories), and Australia has 5 (including half-hour zones like ACST UTC+9:30). China officially uses only 1 time zone (UTC+8) despite spanning 5 geographical zones.',
      },
      {
        q: 'What is the difference between GMT and UTC?',
        a: 'GMT (Greenwich Mean Time) is a timezone at Greenwich, London, with UTC offset +0. UTC (Coordinated Universal Time) is an atomic clock standard that is also at UTC+0 offset. In practice they show the same time, but UTC is the modern scientific standard. Neither observes daylight saving time.',
      },
      {
        q: 'What is a good time to schedule a meeting between the US and Europe?',
        a: '9–10 AM Eastern Time (ET) works well for US/Europe overlap: it\'s 3–4 PM in London, 4–5 PM in Paris/Berlin, and 6–7 PM in Moscow. For US West Coast (PT) and Europe, 8–9 AM PT = 4–5 PM CET. For US and Asia, there is usually no good overlap — one side works early morning or late evening.',
      },
      {
        q: 'What does a UTC offset like "UTC+3" mean?',
        a: 'A UTC offset tells you how many hours ahead or behind UTC a timezone is. UTC+3 means the local time is 3 hours ahead of UTC — e.g., when it\'s 12:00 UTC, it\'s 15:00 in UTC+3. UTC−5 (Eastern Standard Time) means 5 hours behind: 12:00 UTC = 07:00 ET. UTC offsets range from UTC−12 to UTC+14.',
      },
    ],
  },
  ru: {
    description: 'Конвертер часовых поясов мгновенно показывает один и тот же момент времени в 50+ крупных городах мира. Выберите дату, время и исходный часовой пояс — инструмент автоматически отобразит местное время для каждого города, включая смещение UTC.\n\nКонвертация часовых поясов необходима для планирования международных встреч, путешествий и координации удалённых команд. Ошибка означает звонок коллегам в 3 часа ночи или пропущенный рейс. Используйте этот инструмент, чтобы найти удобное время для нескольких часовых поясов и проверить, действует ли сейчас переход на летнее время в нужных локациях.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Как работает конвертер часовых поясов?',
        a: 'Конвертер берёт выбранные дату и время, интерпретирует их в исходном часовом поясе, затем преобразует этот момент UTC в местное время для всех 50+ городов. Конвертация использует встроенный браузерный API Intl.DateTimeFormat, который автоматически учитывает переход на летнее время.',
      },
      {
        q: 'Учитывается ли переход на летнее время?',
        a: 'Да. Переход на летнее время обрабатывается автоматически через Intl API. Смещение UTC рядом с каждым городом отражает фактическое смещение на выбранную дату — например, UTC+1 зимой и UTC+2 летом для Центральной Европы.',
      },
      {
        q: 'Что такое UTC?',
        a: 'UTC (всемирное координированное время) — главный мировой стандарт времени. Все часовые пояса определяются как смещение от UTC. UTC не переходит на летнее время, что делает его стабильным ориентиром для международного планирования.',
      },
      {
        q: 'Почему сокращения часовых поясов могут быть неоднозначными?',
        a: 'Сокращения часовых поясов, например EST, могут быть неточными — EST означает UTC−5 в Северной Америке, но похожие аббревиатуры используются по всему миру. Лучше указывать полное название часового пояса (например, "America/New_York") или явно указывать смещение UTC.',
      },
      {
        q: 'Сколько часовых поясов существует в мире?',
        a: 'Существует 24 стандартных часовых пояса, основанных на 15-градусных приращениях долготы, но на практике их 40+, включая получасовые смещения (Индия UTC+5:30, Иран UTC+3:30) и четверть-часовые (Непал UTC+5:45). Некоторые территории используют нестандартные смещения.',
      },
      {
        q: 'Что такое линия перемены дат?',
        a: 'Линия перемены дат проходит примерно по 180-му меридиану в Тихом океане. При пересечении на восток (в сторону Америки) дата откатывается на один день, на запад (в сторону Азии/Тихого океана) — прибавляется один день. Поэтому на Земле одновременно могут существовать две разные календарные даты.',
      },
      {
        q: 'В каких странах больше всего часовых поясов?',
        a: 'Больше всего часовых поясов у Франции (12) — за счёт заморских территорий. У России — 11, у США — 6 (включая территории), у Австралии — 5. Китай официально использует только 1 часовой пояс (UTC+8), несмотря на охват 5 географических зон.',
      },
      {
        q: 'В чём разница между GMT и UTC?',
        a: 'GMT (среднее время по Гринвичу) — это часовой пояс в Гринвиче (Лондон) со смещением UTC+0. UTC — атомный стандарт времени, также UTC+0. Практически они показывают одинаковое время, но UTC — современный научный стандарт. Ни один из них не переходит на летнее время.',
      },
      {
        q: 'Когда удобнее всего проводить встречу между США и Европой?',
        a: '9–10 утра по восточному времени (ET) хорошо подходит для США/Европы: это 15–16 часов в Лондоне, 16–17 в Париже/Берлине, 18–19 в Москве. Для западного побережья США (PT) и Европы: 8–9 утра PT = 16–17 CET.',
      },
      {
        q: 'Что означает смещение UTC, например "UTC+3"?',
        a: 'Смещение UTC показывает, на сколько часов местное время опережает или отстаёт от UTC. UTC+3 означает, что местное время на 3 часа впереди UTC — например, когда UTC 12:00, в UTC+3 уже 15:00. Смещения UTC варьируются от UTC−12 до UTC+14.',
      },
    ],
  },
  uk: {
    description: 'Конвертер часових поясів миттєво показує один і той самий момент часу в 50+ великих містах світу. Виберіть дату, час та вихідний часовий пояс — інструмент автоматично відобразить місцевий час для кожного міста, включаючи зміщення UTC.\n\nКонвертація часових поясів необхідна для планування міжнародних зустрічей, подорожей та координації розподілених команд. Помилка означає дзвінок колегам о 3 годині ночі або пропущений рейс. Використовуйте цей інструмент, щоб знайти зручний час для кількох часових поясів.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Як працює конвертер часових поясів?',
        a: 'Конвертер бере обрані дату та час, інтерпретує їх у вихідному часовому поясі, потім перетворює цей момент UTC у місцевий час для всіх 50+ міст. Конвертація використовує вбудований браузерний API Intl.DateTimeFormat, який автоматично враховує перехід на літній час.',
      },
      {
        q: 'Чи враховується перехід на літній час?',
        a: 'Так. Перехід на літній час обробляється автоматично через Intl API. Зміщення UTC поруч із кожним містом відображає фактичне зміщення на обрану дату — наприклад, UTC+1 взимку та UTC+2 влітку для Центральної Європи.',
      },
      {
        q: 'Що таке UTC?',
        a: 'UTC (всесвітній координований час) — головний світовий стандарт часу. Всі часові пояси визначаються як зміщення від UTC. UTC не переходить на літній час, що робить його стабільним орієнтиром для міжнародного планування.',
      },
      {
        q: 'Чому скорочення часових поясів можуть бути неоднозначними?',
        a: 'Скорочення часових поясів, наприклад EST, можуть бути неточними — EST означає UTC−5 у Північній Америці, але схожі абревіатури використовуються по всьому світу. Краще вказувати повну назву часового поясу або явно вказувати зміщення UTC.',
      },
      {
        q: 'Скільки часових поясів існує у світі?',
        a: 'Існує 24 стандартних часових пояси, але на практиці їх 40+, включаючи напівгодинні зміщення (Індія UTC+5:30, Іран UTC+3:30) і чверть-годинні (Непал UTC+5:45). Деякі території використовують нестандартні зміщення.',
      },
      {
        q: 'Що таке лінія зміни дат?',
        a: 'Лінія зміни дат проходить приблизно по 180-му меридіану в Тихому океані. При перетині на схід (в бік Америки) дата відкочується на один день, на захід (в бік Азії/Тихого океану) — додається один день.',
      },
      {
        q: 'У яких країнах найбільше часових поясів?',
        a: 'Найбільше часових поясів у Франції (12) — за рахунок заморських територій. У Росії — 11, у США — 6, в Австралії — 5. Китай офіційно використовує лише 1 часовий пояс (UTC+8), незважаючи на охоплення 5 географічних зон.',
      },
      {
        q: 'У чому різниця між GMT та UTC?',
        a: 'GMT (середній час за Гринвічем) — це часовий пояс у Гринвічі (Лондон) зі зміщенням UTC+0. UTC — атомний стандарт часу, також UTC+0. Практично вони показують однаковий час, але UTC — сучасний науковий стандарт. Жоден з них не переходить на літній час.',
      },
      {
        q: 'Коли зручніше проводити зустріч між США та Європою?',
        a: '9–10 ранку за східним часом (ET) підходить для США/Європи: це 15–16 годин у Лондоні, 16–17 у Парижі/Берліні. Для тихоокеанського узбережжя США (PT) та Європи: 8–9 ранку PT = 16–17 CET.',
      },
      {
        q: 'Що означає зміщення UTC, наприклад "UTC+3"?',
        a: 'Зміщення UTC показує, на скільки годин місцевий час випереджає або відстає від UTC. UTC+3 означає, що місцевий час на 3 години попереду UTC — наприклад, коли UTC 12:00, в UTC+3 вже 15:00. Зміщення UTC варіюються від UTC−12 до UTC+14.',
      },
    ],
  },
  fr: {
    description: 'Notre convertisseur de fuseaux horaires affiche instantanément le même moment dans 50+ grandes villes du monde. Choisissez une date et une heure, sélectionnez votre fuseau source, et l\'outil affiche automatiquement l\'heure locale équivalente pour chaque ville, avec le décalage UTC.\n\nLa conversion de fuseaux horaires est essentielle pour planifier des réunions internationales, organiser des voyages et coordonner des équipes à distance. Une erreur peut signifier un appel à 3h du matin ou un vol raté. Utilisez cet outil pour trouver un horaire qui convient à plusieurs fuseaux et vérifier si l\'heure d\'été est actuellement appliquée dans vos destinations.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Comment fonctionne le convertisseur de fuseaux horaires ?',
        a: 'Le convertisseur prend la date et l\'heure choisies, les interprète dans le fuseau horaire source, puis convertit ce moment UTC exact en heure locale pour les 50+ villes listées. La conversion utilise l\'API Intl.DateTimeFormat du navigateur, qui gère automatiquement l\'heure d\'été.',
      },
      {
        q: 'Prend-il en compte l\'heure d\'été ?',
        a: 'Oui. L\'heure d\'été est gérée automatiquement par l\'API Intl. Le décalage UTC affiché pour chaque ville reflète le décalage réel à la date sélectionnée — par exemple UTC+1 en hiver et UTC+2 en été pour l\'heure d\'Europe centrale.',
      },
      {
        q: 'Qu\'est-ce que l\'UTC ?',
        a: 'L\'UTC (Temps Universel Coordonné) est le principal standard horaire mondial. Tous les fuseaux horaires sont définis comme un décalage par rapport à l\'UTC. L\'UTC n\'observe pas l\'heure d\'été, ce qui en fait une référence stable pour la planification internationale.',
      },
      {
        q: 'Pourquoi les abréviations de fuseaux horaires peuvent-elles prêter à confusion ?',
        a: 'Les abréviations comme EST peuvent être ambiguës — EST signifie UTC−5 en Amérique du Nord, mais des abréviations similaires existent dans le monde entier. Il est préférable de préciser le nom complet du fuseau (p. ex. "America/New_York") ou d\'indiquer explicitement le décalage UTC.',
      },
      {
        q: 'Combien de fuseaux horaires existe-t-il dans le monde ?',
        a: 'Il existe 24 fuseaux horaires standard basés sur des incréments de 15 degrés de longitude, mais en pratique il y en a plus de 40, dont des décalages de demi-heure (Inde UTC+5:30, Iran UTC+3:30) et de quart d\'heure (Népal UTC+5:45).',
      },
      {
        q: 'Qu\'est-ce que la ligne de changement de date ?',
        a: 'La ligne de changement de date longe approximativement le méridien 180° dans le Pacifique. La traverser vers l\'est (vers les Amériques) recule d\'un jour ; vers l\'ouest (vers l\'Asie/Pacifique), avance d\'un jour. C\'est pourquoi deux dates différentes peuvent coexister simultanément sur Terre.',
      },
      {
        q: 'Quels pays ont le plus de fuseaux horaires ?',
        a: 'La France en a le plus (12) grâce à ses territoires d\'outre-mer. La Russie en a 11, les États-Unis 6 (avec territoires), l\'Australie 5. La Chine n\'utilise officiellement qu\'1 fuseau (UTC+8) malgré une étendue de 5 zones géographiques.',
      },
      {
        q: 'Quelle est la différence entre GMT et UTC ?',
        a: 'GMT (Greenwich Mean Time) est un fuseau horaire à Greenwich (Londres), UTC+0. UTC est un standard d\'horloge atomique, également à UTC+0. En pratique ils affichent la même heure, mais UTC est le standard scientifique moderne. Aucun des deux n\'observe l\'heure d\'été.',
      },
      {
        q: 'À quelle heure organiser une réunion entre les États-Unis et l\'Europe ?',
        a: '9h–10h heure de l\'Est (ET) convient bien pour les États-Unis/Europe : c\'est 15h–16h à Londres, 16h–17h à Paris/Berlin. Pour la côte ouest américaine (PT) et l\'Europe : 8h–9h PT = 16h–17h CET.',
      },
      {
        q: 'Que signifie un décalage UTC comme "UTC+3" ?',
        a: 'Un décalage UTC indique combien d\'heures l\'heure locale est en avance ou en retard sur UTC. UTC+3 signifie que l\'heure locale est 3 heures en avance : quand il est 12h UTC, il est 15h en UTC+3. Les décalages UTC vont de UTC−12 à UTC+14.',
      },
    ],
  },
  lt: {
    description: 'Mūsų laiko juostų keitiklis akimirksniu rodo tą patį laiko momentą 50+ didžiuosiuose pasaulio miestuose. Pasirinkite datą, laiką ir šaltinio laiko juostą — įrankis automatiškai rodo atitinkamą vietos laiką kiekvienam miestui su UTC poslinkiu.\n\nLaiko juostų konvertavimas būtinas planuojant tarptautinius susitikimus, keliones ir koordinuojant nuotolines komandas. Klaida gali reikšti skambutį kolegoms 3 val. nakties arba praleistą skrydį. Naudokite šį įrankį, kad rastumėte patogų laiką kelioms laiko juostoms.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kaip veikia laiko juostų keitiklis?',
        a: 'Keitiklis paima pasirinktą datą ir laiką, interpretuoja juos pasirinktoje šaltinio laiko juostoje, tada konvertuoja tą tikslų UTC momentą į vietos laiką visoms 50+ išvardytiems miestams. Konvertacija naudoja naršyklės integruotą Intl.DateTimeFormat API, kuris automatiškai atsižvelgia į vasaros laiką.',
      },
      {
        q: 'Ar atsižvelgiama į vasaros laiką?',
        a: 'Taip. Vasaros laikas tvarkomas automatiškai per Intl API. UTC poslinkis šalia kiekvieno miesto atspindi faktinį poslinkį pasirinktą datą — pavyzdžiui, UTC+1 žiemą ir UTC+2 vasarą Vidurio Europos laikui.',
      },
      {
        q: 'Kas yra UTC?',
        a: 'UTC (koordinuotasis universalusis laikas) yra pagrindinis pasaulio laiko standartas. Visos laiko juostos apibrėžiamos kaip poslinkis nuo UTC. UTC nepereina į vasaros laiką, todėl yra stabili tarptautinio planavimo nuoroda.',
      },
      {
        q: 'Kodėl laiko juostų santrumpos gali kelti painiavą?',
        a: 'Laiko juostų santrumpos, pvz., EST, gali būti dviprasmiškos — EST reiškia UTC−5 Šiaurės Amerikoje, tačiau panašios santrumpos naudojamos visame pasaulyje. Visada geriau nurodyti visą laiko juostos pavadinimą arba aiškiai nurodyti UTC poslinkį.',
      },
      {
        q: 'Kiek laiko juostų yra pasaulyje?',
        a: 'Yra 24 standartinės laiko juostos, pagrįstos 15 laipsnių ilgumos žingsniais, tačiau praktiškai jų yra 40+, įskaitant pusvalandžio poslinkius (Indija UTC+5:30, Iranas UTC+3:30) ir ketvirtvalandžio poslinkius (Nepalas UTC+5:45).',
      },
      {
        q: 'Kas yra tarptautinė datų keitimo linija?',
        a: 'Tarptautinė datų keitimo linija eina maždaug palei 180-ąjį meridianą Ramiajame vandenyne. Kertant ją į rytus (link Amerikos) datos eina atgal viena diena, į vakarus (link Azijos/Ramiojo vandenyno) — pirmyn viena diena.',
      },
      {
        q: 'Kuriose šalyse daugiausia laiko juostų?',
        a: 'Prancūzija turi daugiausiai laiko juostų (12) dėl užjūrio teritorijų. Rusijoje — 11, JAV — 6 (su teritorijomis), Australijoje — 5. Kinija oficialiai naudoja tik 1 laiko juostą (UTC+8), nepaisant 5 geografinių zonų aprėpties.',
      },
      {
        q: 'Kuo skiriasi GMT ir UTC?',
        a: 'GMT (Grinvičo vidutinis laikas) yra laiko juosta Grinviče (Londone), UTC poslinkis +0. UTC yra atominių laikrodžių standartas, taip pat UTC+0. Praktiškai jie rodo tą patį laiką, tačiau UTC yra šiuolaikinis mokslinis standartas. Nė vienas nesilaikomas vasaros laiko.',
      },
      {
        q: 'Kada geriausia planuoti susitikimą tarp JAV ir Europos?',
        a: '9–10 val. Rytų laiku (ET) tinka JAV/Europai: tai 15–16 val. Londone, 16–17 val. Paryžiuje/Berlyne. Vakarų pakrantės JAV (PT) ir Europai: 8–9 val. PT = 16–17 val. CET.',
      },
      {
        q: 'Ką reiškia UTC poslinkis, pvz., „UTC+3"?',
        a: 'UTC poslinkis nurodo, kiek valandų vietos laikas yra priekyje ar atsilikęs nuo UTC. UTC+3 reiškia, kad vietos laikas 3 valandomis lenkia UTC — pvz., kai UTC yra 12:00, UTC+3 yra 15:00. UTC poslinkiai svyruoja nuo UTC−12 iki UTC+14.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return buildMetadata(locale, '/converter/timezone', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function TimezonePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/converter/timezone`,
    applicationCategory: 'UtilitiesApplication',
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
        <TimezoneConverter locale={locale} />

        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}

          <AdPlaceholder locale={locale} size="banner" />
          <section className={styles.faq}>
            <h2 className={styles.faq__title}>{content.faqTitle}</h2>
            <div className={styles.faq__list}>
              {content.faqs.map((item, i) => (
                <div key={i} className={styles.faq__item}>
                  <h3 className={styles.faq__question}>{item.q}</h3>
                  <p className={styles.faq__answer}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

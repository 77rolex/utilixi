import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import MoonPhasesCalculator from './MoonPhasesCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/zodiac-sign', label: 'Zodiac Sign' },
    { href: '/calculator/biorhythm', label: 'Biorhythm Calculator' },
    { href: '/calculator/mercury-retrograde', label: 'Mercury Retrograde' },
    { href: '/calculator/chinese-zodiac', label: 'Chinese Zodiac' },
    { href: '/calculator/life-path', label: 'Life Path Number' },
  ],
  ru: [
    { href: '/calculator/zodiac-sign', label: 'Знак зодиака' },
    { href: '/calculator/biorhythm', label: 'Биоритмы' },
    { href: '/calculator/mercury-retrograde', label: 'Меркурий ретроградный' },
    { href: '/calculator/chinese-zodiac', label: 'Китайский гороскоп' },
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
  ],
  uk: [
    { href: '/calculator/zodiac-sign', label: 'Знак зодіаку' },
    { href: '/calculator/biorhythm', label: 'Біоритми' },
    { href: '/calculator/mercury-retrograde', label: 'Меркурій ретроградний' },
    { href: '/calculator/chinese-zodiac', label: 'Китайський гороскоп' },
    { href: '/calculator/life-path', label: 'Число життєвого шляху' },
  ],
  fr: [
    { href: '/calculator/zodiac-sign', label: 'Signe du Zodiaque' },
    { href: '/calculator/biorhythm', label: 'Biorythmes' },
    { href: '/calculator/mercury-retrograde', label: 'Mercure Rétrograde' },
    { href: '/calculator/chinese-zodiac', label: 'Zodiaque Chinois' },
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
  ],
  lt: [
    { href: '/calculator/zodiac-sign', label: 'Zodiako ženklas' },
    { href: '/calculator/biorhythm', label: 'Bioritmas' },
    { href: '/calculator/mercury-retrograde', label: 'Merkurijaus retrogradas' },
    { href: '/calculator/chinese-zodiac', label: 'Kinų zodiako ženklas' },
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Moon Phase Calculator — Current Phase & Upcoming Dates 2025–2026',
    description: 'Free moon phase calculator. See the current lunar phase, illumination %, next New Moon and Full Moon dates, and a 6-month calendar of upcoming lunar phases.',
    h1: 'Moon Phase Calculator',
  },
  ru: {
    title: 'Лунный календарь — фаза луны сегодня, новолуния и полнолуния 2025–2026',
    description: 'Бесплатный лунный календарь онлайн. Узнайте фазу луны на сегодня, процент освещённости, дату ближайшего новолуния и полнолуния. Таблица на 6 месяцев вперёд.',
    h1: 'Лунный календарь — фаза луны',
  },
  uk: {
    title: 'Місячний календар — фаза місяця сьогодні, новолуніє та повний місяць 2025–2026',
    description: 'Безкоштовний місячний календар онлайн. Дізнайтесь фазу місяця на сьогодні, відсоток освітленості, дату найближчого новолуніє та повного місяця.',
    h1: 'Місячний календар — фаза місяця',
  },
  fr: {
    title: 'Phases de la Lune — Phase actuelle, Nouvelle Lune & Pleine Lune 2025–2026',
    description: 'Calculateur de phases lunaires gratuit. Connaissez la phase actuelle de la Lune, le taux d\'illumination, les prochaines Nouvelle Lune et Pleine Lune, et le calendrier lunaire sur 6 mois.',
    h1: 'Phases de la Lune',
  },
  lt: {
    title: 'Mėnulio fazės — dabartinė fazė, Jaunatis ir Pilnatis 2025–2026',
    description: 'Nemokamas mėnulio fazių skaičiuotuvas. Sužinokite dabartinę mėnulio fazę, apšvietimo procentą, artimiausio jauno mėnulio ir pilnaties datas bei 6 mėnesių kalendorių.',
    h1: 'Mėnulio fazės',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'The Moon completes a full cycle of phases approximately every 29.5 days — a period called the synodic month. It begins with the New Moon when the lunar disk is invisible, then grows through Waxing Crescent, First Quarter (half illuminated), and Waxing Gibbous before reaching the Full Moon at maximum brightness. It then decreases through Waning Gibbous, Last Quarter, and Waning Crescent back to New Moon. Our calculator uses the Meeus astronomical algorithm, accurate to within a few hours for any date from 1900 to 2100.\n\nEnter any date to instantly see the lunar phase, the illumination percentage, and the exact dates of the next four key phases — New Moon, First Quarter, Full Moon, and Last Quarter. The built-in calendar also lists the upcoming 6 New Moons and 6 Full Moons, making it easy to plan around lunar events. The calculator works entirely in your browser with no external data needed.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What are the 8 moon phases in order?', a: 'The 8 moon phases in order are: New Moon (0% lit), Waxing Crescent, First Quarter (50% lit, growing), Waxing Gibbous, Full Moon (100% lit), Waning Gibbous, Last Quarter (50% lit, shrinking), and Waning Crescent. The cycle then repeats with the next New Moon.' },
      { q: 'How is the moon phase calculated?', a: 'Moon phase is calculated from the Moon\'s age — the number of days since the last New Moon. This uses the Julian Day Number and a known New Moon reference date (January 6, 2000). The age is divided by the synodic period (29.530589 days) to find where in the cycle the Moon currently is.' },
      { q: 'How long is one complete lunar cycle?', a: 'One complete lunar cycle (synodic month) lasts approximately 29 days, 12 hours, 44 minutes, and 3 seconds — or 29.530589 days. This is the time from one New Moon to the next. The sidereal month (one orbit relative to the stars) is shorter at 27.3 days.' },
      { q: 'What is the difference between a New Moon and a Full Moon?', a: 'During a New Moon, the Moon is between Earth and the Sun, making its illuminated side face away from us — the Moon appears dark or invisible. During a Full Moon, the Earth is between the Sun and Moon, so the Moon\'s entire illuminated hemisphere faces us, appearing as a bright complete disk.' },
      { q: 'What is a supermoon?', a: 'A supermoon occurs when a Full Moon (or New Moon) coincides with the Moon being at or near its closest point to Earth (perigee). Because the Moon\'s orbit is elliptical, its distance varies from about 356,500 km to 406,700 km. A perigee Full Moon appears up to 14% larger and 30% brighter than an apogee Full Moon.' },
      { q: 'What is a Blue Moon?', a: 'A Blue Moon most commonly refers to the second Full Moon in a single calendar month. Since a lunar cycle is ~29.5 days and most months have 30–31 days, this happens roughly every 2–3 years — hence the phrase "once in a blue moon." A second definition is the third Full Moon in a season that has four Full Moons.' },
      { q: 'Does the moon phase affect human sleep?', a: 'Several studies suggest that sleep quality can be slightly poorer around the Full Moon, with people taking longer to fall asleep and sleeping about 20 minutes less on average. The proposed mechanism is that even in the absence of visible moonlight, our internal circadian rhythm may retain a lunar component from evolutionary history. The effect is subtle and varies significantly between individuals.' },
      { q: 'What is a lunar eclipse and when does it happen?', a: 'A lunar eclipse occurs when the Earth passes directly between the Sun and the Full Moon, casting Earth\'s shadow onto the Moon. A total lunar eclipse makes the Moon appear deep red ("Blood Moon") because Earth\'s atmosphere refracts and filters sunlight. Lunar eclipses only happen at Full Moon and require the Moon to be near a lunar node.' },
      { q: 'How does the moon phase affect ocean tides?', a: 'Tides are primarily caused by the Moon\'s gravitational pull on Earth\'s oceans. During New Moon and Full Moon, the Sun, Earth, and Moon align, creating stronger "spring tides" with higher highs and lower lows. During First and Last Quarter, the Moon and Sun pull at right angles, producing weaker "neap tides" with smaller tidal range.' },
      { q: 'Can I use this calculator for past and future dates?', a: 'Yes. The Meeus algorithm is valid for any date from approximately the year 1000 to 3000, though results are most accurate for dates within a few centuries of the present. You can check the moon phase for any historical date or plan ahead for any future date using the date picker.' },
    ],
  },
  ru: {
    description: 'Луна проходит полный цикл фаз примерно за 29,5 дней — этот период называется синодическим месяцем. Цикл начинается с новолуния, когда лунный диск не виден. Затем луна растёт через фазы молодого месяца, первой четверти и растущей луны, достигая полнолуния с максимальной освещённостью. После этого она убывает через убывающую луну, последнюю четверть и старый месяц обратно к новолунию. Калькулятор использует астрономический алгоритм Мееуса, точность которого составляет несколько часов для любой даты с 1900 по 2100 год.\n\nВведите любую дату, чтобы мгновенно увидеть фазу луны, процент освещённости и точные даты следующих четырёх ключевых фаз — новолуния, первой четверти, полнолуния и последней четверти. Встроенный лунный календарь показывает ближайшие 6 новолуний и 6 полнолуний вперёд, что удобно для планирования.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Какие 8 фаз луны существуют?', a: 'Восемь фаз луны по порядку: новолуние (0% освещённости), молодой месяц (растущий серп), первая четверть (50%, растёт), растущая луна, полнолуние (100%), убывающая луна, последняя четверть (50%, убывает), старый месяц (убывающий серп). Затем цикл повторяется.' },
      { q: 'Как рассчитывается фаза луны?', a: 'Фаза луны рассчитывается через «возраст луны» — количество дней с момента последнего новолуния. Используется юлианский день и опорная дата новолуния (6 января 2000 года). Возраст делится на синодический период (29,530589 суток), что даёт положение луны в цикле.' },
      { q: 'Сколько длится один лунный цикл?', a: 'Один полный лунный цикл (синодический месяц) длится примерно 29 суток 12 часов 44 минуты 3 секунды, то есть 29,530589 дней. Это время от одного новолуния до следующего. Сидерический месяц (оборот луны относительно звёзд) короче — 27,3 дня.' },
      { q: 'В чём разница между новолунием и полнолунием?', a: 'При новолунии Луна находится между Землёй и Солнцем, и освещённая сторона обращена от нас — диск тёмный или невидимый. При полнолунии Земля находится между Солнцем и Луной, поэтому вся освещённая сторона обращена к нам — луна светит ярко и полностью.' },
      { q: 'Что такое суперлуние?', a: 'Суперлуние — это полнолуние (или новолуние), совпадающее с нахождением луны в перигее (ближайшей точке орбиты). Из-за эллиптической орбиты расстояние до луны меняется от ~356 500 до ~406 700 км. В перигее полная луна выглядит до 14% больше и до 30% ярче.' },
      { q: 'Что такое Голубая луна?', a: 'Голубая луна — второе полнолуние в пределах одного календарного месяца. Поскольку лунный цикл ~29,5 дней, а большинство месяцев длиннее, это происходит примерно раз в 2–3 года — отсюда выражение «раз в синее луние». Второе значение — третье из четырёх полнолуний в одном сезоне.' },
      { q: 'Влияет ли фаза луны на сон?', a: 'Ряд исследований показывает, что около полнолуния люди в среднем засыпают на несколько минут дольше и спят около 20 минут меньше. Предполагается, что внутренние циркадные ритмы могут сохранять лунный компонент. Эффект слабый и сильно варьируется у разных людей.' },
      { q: 'Что такое лунное затмение и когда оно происходит?', a: 'Лунное затмение происходит, когда Земля оказывается точно между Солнцем и полной луной, бросая тень на лунный диск. При полном затмении луна приобретает красноватый оттенок («кровавая луна»), так как атмосфера Земли преломляет солнечный свет. Затмения возможны только в полнолуние.' },
      { q: 'Как фаза луны влияет на морские приливы?', a: 'Приливы вызваны гравитационным притяжением луны (и в меньшей мере — Солнца). Во время новолуния и полнолуния Солнце, Земля и Луна выстраиваются в линию — возникают сизигийные приливы (наибольшие). В первую и последнюю четверть образуются квадратурные приливы (наименьшие).' },
      { q: 'Могу ли я проверить фазу луны для прошлых или будущих дат?', a: 'Да. Алгоритм Мееуса действителен приблизительно с 1000 по 3000 год. Вы можете проверить фазу луны для любой исторической даты или запланировать события на основе будущих фаз, используя выбор даты в калькуляторе.' },
    ],
  },
  uk: {
    description: 'Місяць проходить повний цикл фаз приблизно за 29,5 доби — цей період називається синодичним місяцем. Цикл починається з новолуніє, коли місячний диск не видно. Потім місяць зростає через молодик, першу чверть і місяць, що прибуває, досягаючи повного місяця з максимальною освітленістю. Після цього він зменшується через місяць, що спадає, останню чверть і серп, що спадає, знову до новолуніє. Калькулятор використовує астрономічний алгоритм Мееуса з точністю кілька годин для будь-якої дати з 1900 по 2100 рік.\n\nВведіть будь-яку дату, щоб миттєво побачити фазу місяця, відсоток освітленості та точні дати наступних чотирьох ключових фаз — новолуніє, першої чверті, повного місяця та останньої чверті. Вбудований місячний календар показує найближчі 6 новолуній і 6 повних місяців наперед.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Які 8 фаз місяця існують?', a: 'Вісім фаз місяця по порядку: новолуніє (0% освітленості), молодик (серп, що росте), перша чверть (50%, зростає), місяць, що прибуває, повний місяць (100%), місяць, що спадає, остання чверть (50%, зменшується), серп, що спадає. Потім цикл повторюється.' },
      { q: 'Як розраховується фаза місяця?', a: 'Фаза місяця розраховується через «вік місяця» — кількість днів з моменту останнього новолуніє. Використовується юліанський день і опорна дата новолуніє (6 січня 2000 року). Вік ділиться на синодичний період (29,530589 діб).' },
      { q: 'Скільки триває один місячний цикл?', a: 'Один повний місячний цикл (синодичний місяць) триває приблизно 29 діб 12 годин 44 хвилини 3 секунди, тобто 29,530589 дня. Це час від одного новолуніє до наступного. Сидеричний місяць (оборот відносно зірок) коротший — 27,3 дня.' },
      { q: 'У чому різниця між новолунієм і повним місяцем?', a: 'При новолунії Місяць знаходиться між Землею і Сонцем, і освітлена сторона обернена від нас — диск темний або невидимий. При повному місяці Земля знаходиться між Сонцем і Місяцем, тому вся освітлена сторона звернена до нас.' },
      { q: 'Що таке суперлуніє?', a: 'Суперлуніє — це повний місяць (або новолуніє), що збігається з перебуванням місяця в перигеї (найближчій точці орбіти). В перигеї повний місяць виглядає до 14% більшим і до 30% яскравішим.' },
      { q: 'Що таке Блакитний місяць?', a: 'Блакитний місяць — це другий повний місяць у межах одного календарного місяця. Оскільки місячний цикл ~29,5 дня, а більшість місяців довші, це трапляється приблизно раз на 2–3 роки.' },
      { q: 'Чи впливає фаза місяця на сон?', a: 'Ряд досліджень показує, що поблизу повного місяця люди в середньому засинають довше і сплять близько 20 хвилин менше. Ефект слабкий і сильно варіюється у різних людей.' },
      { q: 'Що таке місячне затемнення?', a: 'Місячне затемнення відбувається, коли Земля опиняється точно між Сонцем і повним місяцем. При повному затемненні місяць набуває червонуватого відтінку через заломлення сонячного світла в атмосфері Землі.' },
      { q: 'Як фаза місяця впливає на морські припливи?', a: 'Припливи спричинені гравітаційним тяжінням місяця. Під час новолуніє і повного місяця виникають найбільші (сизигійні) припливи. У першу і останню чверть — найменші (квадратурні) припливи.' },
      { q: 'Чи можна перевірити фазу місяця для минулих або майбутніх дат?', a: 'Так. Алгоритм Мееуса дійсний приблизно з 1000 по 3000 рік. Ви можете перевірити фазу місяця для будь-якої дати за допомогою вибору дати в калькуляторі.' },
    ],
  },
  fr: {
    description: 'La Lune complète un cycle complet de phases en environ 29,5 jours — une période appelée mois synodique. Le cycle débute par la Nouvelle Lune, lorsque le disque lunaire est invisible, puis croît en passant par le Croissant croissant, le Premier Quartier (moitié éclairée), la Lune gibbeuse croissante, avant d\'atteindre la Pleine Lune à son maximum. Ensuite, elle décroît à travers la Lune gibbeuse décroissante, le Dernier Quartier et le Croissant décroissant pour revenir à la Nouvelle Lune. Notre calculateur utilise l\'algorithme astronomique de Meeus, précis à quelques heures près pour toute date entre 1900 et 2100.\n\nSaisissez n\'importe quelle date pour voir instantanément la phase lunaire, le pourcentage d\'illumination et les dates exactes des quatre prochaines phases clés — Nouvelle Lune, Premier Quartier, Pleine Lune et Dernier Quartier. Le calendrier intégré affiche également les 6 prochaines Nouvelles Lunes et Pleines Lunes.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quelles sont les 8 phases de la Lune dans l\'ordre ?', a: 'Les 8 phases lunaires dans l\'ordre sont : Nouvelle Lune (0% éclairée), Croissant croissant, Premier Quartier (50%, croissant), Gibbeuse croissante, Pleine Lune (100%), Gibbeuse décroissante, Dernier Quartier (50%, décroissant), Croissant décroissant. Puis le cycle recommence.' },
      { q: 'Comment calcule-t-on la phase de la Lune ?', a: 'La phase lunaire est calculée à partir de l\'âge de la Lune — le nombre de jours depuis la dernière Nouvelle Lune. On utilise le Jour Julien et une date de référence (Nouvelle Lune du 6 janvier 2000). L\'âge est divisé par la période synodique (29,530589 jours).' },
      { q: 'Combien de temps dure un cycle lunaire complet ?', a: 'Un cycle lunaire complet (mois synodique) dure environ 29 jours, 12 heures, 44 minutes et 3 secondes, soit 29,530589 jours. C\'est le temps entre deux Nouvelles Lunes consécutives. Le mois sidéral (une orbite par rapport aux étoiles) est plus court : 27,3 jours.' },
      { q: 'Quelle est la différence entre la Nouvelle Lune et la Pleine Lune ?', a: 'Lors de la Nouvelle Lune, la Lune se trouve entre la Terre et le Soleil, son côté éclairé nous est invisible — le disque paraît sombre. Lors de la Pleine Lune, la Terre est entre le Soleil et la Lune, so toute la face éclairée nous fait face — la Lune apparaît comme un disque brillant et complet.' },
      { q: 'Qu\'est-ce qu\'une Superlune ?', a: 'Une Superlune se produit quand une Pleine Lune (ou Nouvelle Lune) coïncide avec le périgée de la Lune (son point le plus proche de la Terre). En périgée, la Pleine Lune peut paraître jusqu\'à 14% plus grande et 30% plus lumineuse qu\'une Lune à l\'apogée.' },
      { q: 'Qu\'est-ce qu\'une Lune bleue ?', a: 'Une Lune bleue désigne généralement la deuxième Pleine Lune d\'un même mois calendaire. Comme le cycle lunaire dure ~29,5 jours et la plupart des mois ont 30-31 jours, cela se produit environ tous les 2-3 ans — d\'où l\'expression "une fois dans une lune bleue".' },
      { q: 'La phase lunaire affecte-t-elle le sommeil ?', a: 'Plusieurs études suggèrent qu\'autour de la Pleine Lune, les gens mettent légèrement plus de temps à s\'endormir et dorment en moyenne 20 minutes de moins. L\'effet est subtil et varie beaucoup selon les individus.' },
      { q: 'Qu\'est-ce qu\'une éclipse lunaire ?', a: 'Une éclipse lunaire se produit quand la Terre passe exactement entre le Soleil et la Pleine Lune, projetant son ombre sur la Lune. Lors d\'une éclipse totale, la Lune prend une teinte rouge foncé ("Lune de sang") en raison de la réfraction de la lumière solaire dans l\'atmosphère terrestre.' },
      { q: 'Comment la Lune influence-t-elle les marées ?', a: 'Les marées sont principalement dues à l\'attraction gravitationnelle de la Lune. Lors de la Nouvelle Lune et de la Pleine Lune, le Soleil, la Terre et la Lune s\'alignent, créant de plus grandes "marées de vive-eau". Aux Premier et Dernier Quartiers, les forces s\'exercent perpendiculairement, produisant de plus faibles "marées de morte-eau".' },
      { q: 'Puis-je utiliser ce calculateur pour des dates passées ou futures ?', a: 'Oui. L\'algorithme de Meeus est valide pour environ l\'an 1000 à 3000. Vous pouvez vérifier la phase de la Lune pour n\'importe quelle date historique ou planifier des événements à l\'avance grâce au sélecteur de date.' },
    ],
  },
  lt: {
    description: 'Mėnulis užbaigia visą fazių ciklą maždaug per 29,5 dienos — šis laikotarpis vadinamas sinodišku mėnesiu. Ciklas prasideda nuo Jauno mėnulio, kai mėnulio diskas nematomas, tada auga per jauną mėnulį, pirmąjį ketvirtį (pusiau apšviesta), didėjantį mėnulį, kol pasiekia Pilnatį su maksimaliu ryškumu. Tada mažėja per mažėjantį mėnulį, paskutinį ketvirtį ir seną mėnulį atgal į Jaunatį. Skaičiuotuvas naudoja Meeaus astronomijos algoritmą, tikslų kelių valandų ribose bet kuriai datai nuo 1900 iki 2100 metų.\n\nĮveskite bet kurią datą, kad iškart pamatytumėte mėnulio fazę, apšvietimo procentą ir tikslias keturių artimų fazių datas — Jauno mėnulio, Pirmojo ketvirčio, Pilnaties ir Paskutinio ketvirčio. Įmontuotas kalendorius taip pat rodo artimiausias 6 jauno mėnulio ir 6 pilnaties datas.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kokios yra 8 mėnulio fazės?', a: '8 mėnulio fazės eilės tvarka: Jaunatis (0% apšviesta), Jaunas mėnulis, Pirmasis ketvirtis (50%, didėja), Didėjantis mėnulis, Pilnatis (100%), Mažėjantis mėnulis, Paskutinis ketvirtis (50%, mažėja), Senas mėnulis. Tada ciklas kartojasi.' },
      { q: 'Kaip apskaičiuojama mėnulio fazė?', a: 'Mėnulio fazė apskaičiuojama pagal mėnulio amžių — dienų skaičių nuo paskutinio jauno mėnulio. Naudojamas Julijaus dienos skaičius ir atskaitos data (2000 m. sausio 6 d.). Amžius dalijamas iš sinodinio periodo (29,530589 dienos).' },
      { q: 'Kiek trunka vienas mėnulio ciklas?', a: 'Vienas pilnas mėnulio ciklas (sinodinis mėnuo) trunka maždaug 29 dienas, 12 valandų, 44 minutes ir 3 sekundes — arba 29,530589 dienos. Tai laikas tarp dviejų jaunatų. Siderinis mėnuo (orbita stacionarių žvaigždžių atžvilgiu) yra trumpesnis — 27,3 dienos.' },
      { q: 'Kuo skiriasi jaunatis ir pilnatis?', a: 'Per jaunatį Mėnulis yra tarp Žemės ir Saulės, jo apšviesta pusė nukreipta nuo mūsų — diskas tamsus arba nematomas. Per pilnatį Žemė yra tarp Saulės ir Mėnulio, todėl visa apšviesta pusė nukreipta į mus.' },
      { q: 'Kas yra Supervaidmuo?', a: 'Supermėnulis įvyksta tada, kai pilnatis (ar jaunatis) sutampa su Mėnulio buvimu perigėjuje (arčiausiai Žemės). Perigėjuje pilnatis gali atrodyti iki 14% didesnė ir 30% ryškesnė.' },
      { q: 'Kas yra Mėlynasis mėnulis?', a: 'Mėlynasis mėnulis dažniausiai reiškia antrąją pilnatį tame pačiame kalendoriniame mėnesyje. Kadangi mėnulio ciklas ~29,5 dienos, o dauguma mėnesių ilgesni, tai nutinka maždaug kas 2–3 metus.' },
      { q: 'Ar mėnulio fazė veikia miegą?', a: 'Keliais tyrimais nustatyta, kad apie pilnatį žmonės vidutiniškai 20 minučių miega mažiau ir ilgiau užmiega. Poveikis subtilus ir labai skiriasi tarp individų.' },
      { q: 'Kas yra mėnulio užtemimas?', a: 'Mėnulio užtemimas įvyksta, kai Žemė atsiduria tiksliai tarp Saulės ir pilnaties, užtemdydama Mėnulį savo šešėliu. Visiško užtemimo metu Mėnulis įgauna tamsiai raudoną spalvą dėl saulės šviesos lūžimo Žemės atmosferoje.' },
      { q: 'Kaip mėnulio fazė veikia potvynius?', a: 'Potvyniai daugiausia kyla dėl Mėnulio gravitacinio traukos. Per jaunatį ir pilnatį Saulė, Žemė ir Mėnulis išsirikiuoja — susidaro didžiausi potvyniai. Per pirmąjį ir paskutinį ketvirtį — mažesni potvyniai.' },
      { q: 'Ar galiu patikrinti mėnulio fazę praeities ar ateities datoms?', a: 'Taip. Meeaus algoritmas galioja maždaug nuo 1000 iki 3000 metų. Galite patikrinti mėnulio fazę bet kuriai istorinei datai arba planuoti renginius ateičiai naudodami datos parinkiklį.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/moon-phases', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MoonPhasesPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/moon-phases`,
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
        <MoonPhasesCalculator locale={locale} />
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

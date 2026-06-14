import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import PaceCalculator from './PaceCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/calories', label: 'Calorie Calculator' },
    { href: '/calculator/heart-rate', label: 'Heart Rate Calculator' },
    { href: '/calculator/bmi', label: 'BMI Calculator' },
    { href: '/calculator/calorie-deficit', label: 'Calorie Deficit Calculator' },
    { href: '/calculator/macros', label: 'Macro Calculator' },
  ],
  ru: [
    { href: '/calculator/calories', label: 'Калькулятор калорий' },
    { href: '/calculator/heart-rate', label: 'Калькулятор пульса' },
    { href: '/calculator/bmi', label: 'Калькулятор ИМТ' },
    { href: '/calculator/calorie-deficit', label: 'Калькулятор дефицита калорий' },
    { href: '/calculator/macros', label: 'Калькулятор макросов' },
  ],
  uk: [
    { href: '/calculator/calories', label: 'Калькулятор калорій' },
    { href: '/calculator/heart-rate', label: 'Калькулятор пульсу' },
    { href: '/calculator/bmi', label: 'Калькулятор ІМТ' },
    { href: '/calculator/calorie-deficit', label: 'Калькулятор дефіциту калорій' },
    { href: '/calculator/macros', label: 'Калькулятор макросів' },
  ],
  fr: [
    { href: '/calculator/calories', label: 'Calculatrice Calories' },
    { href: '/calculator/heart-rate', label: 'Calculatrice Fréquence Cardiaque' },
    { href: '/calculator/bmi', label: 'Calculatrice IMC' },
    { href: '/calculator/calorie-deficit', label: 'Calculatrice Déficit Calorique' },
    { href: '/calculator/macros', label: 'Calculatrice Macros' },
  ],
  lt: [
    { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas' },
    { href: '/calculator/heart-rate', label: 'Širdies ritmo skaičiuotuvas' },
    { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' },
    { href: '/calculator/calorie-deficit', label: 'Kalorijų deficito skaičiuotuvas' },
    { href: '/calculator/macros', label: 'Makroelementų skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Running Pace Calculator — Pace, Time & Speed',
    description: 'Free running and cycling pace calculator. Calculate your pace per km or mile, total finish time, or average speed. Supports kilometers and miles.',
    h1: 'Running Pace Calculator',
    subtitle: 'Calculate your running or cycling pace, speed, and finish time for any distance.',
  },
  ru: {
    title: 'Калькулятор темпа бега — темп, время и скорость',
    description: 'Бесплатный калькулятор темпа бега и езды на велосипеде. Рассчитайте темп на км или милю, время финиша или среднюю скорость. Поддержка км и миль.',
    h1: 'Калькулятор темпа бега',
    subtitle: 'Рассчитайте темп, скорость и время финиша для бега или велосипеда на любую дистанцию.',
  },
  uk: {
    title: 'Калькулятор темпу бігу — темп, час і швидкість',
    description: 'Безкоштовний калькулятор темпу бігу та їзди на велосипеді. Розрахуйте темп на км або милю, час фінішу або середню швидкість. Підтримка км та миль.',
    h1: 'Калькулятор темпу бігу',
    subtitle: 'Розрахуйте темп, швидкість і час фінішу для бігу або велосипеду на будь-яку дистанцію.',
  },
  fr: {
    title: 'Calculatrice Allure Course — Allure, Temps & Vitesse',
    description: 'Calculatrice d\'allure de course gratuite. Calculez votre allure au km ou au mile, le temps total de course ou la vitesse moyenne. Supporte km et miles.',
    h1: 'Calculatrice Allure Course',
    subtitle: 'Calculez votre allure, vitesse et temps d\'arrivée en course à pied ou vélo pour toute distance.',
  },
  lt: {
    title: 'Bėgimo Tempo Skaičiuotuvas — Tempas, Laikas ir Greitis',
    description: 'Nemokamas bėgimo ir dviračio tempo skaičiuotuvas. Apskaičiuokite tempą km arba myliai, finišo laiką ar vidutinį greitį. Palaikomos km ir mylios.',
    h1: 'Bėgimo Tempo Skaičiuotuvas',
    subtitle: 'Apskaičiuokite bėgimo ar dviračio tempą, greitį ir finišo laiką bet kokiam atstumui.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our running pace calculator helps runners, cyclists, and athletes of all levels calculate three key metrics: pace (time per km or mile), total finish time for a given distance, and average speed in km/h. Whether you are training for a 5K, a marathon, or simply tracking a daily jog, this tool gives you instant, accurate results for any distance.\n\nUnderstanding your pace is fundamental to effective training. Running too fast leads to early fatigue and injury risk; running too slow limits cardiovascular improvement. Most coaches recommend training at 60–80% of maximum effort for base building, which typically means a pace 60–90 seconds per km slower than your race pace. Use this calculator to plan training zones, set realistic race goals, and track your progress over time.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is running pace?', a: 'Running pace is the time it takes to cover one unit of distance — usually expressed in minutes per kilometre (min/km) or minutes per mile (min/mi). For example, a pace of 6:00 min/km means you cover 1 kilometre in exactly 6 minutes.' },
      { q: 'How do I calculate my finish time from pace?', a: 'Multiply your pace (in seconds per km) by the total distance in km. For example, a 5:30 min/km pace (330 seconds/km) over a 10K distance: 330 × 10 = 3,300 seconds = 55 minutes.' },
      { q: 'What is a good pace for a beginner runner?', a: 'For beginners, a comfortable pace of 7–9 min/km (11–14 min/mi) is typical. The key is the "talk test" — you should be able to hold a conversation. As fitness improves, pace naturally improves without extra effort.' },
      { q: 'What are typical race paces for common distances?', a: 'Average recreational runner paces: 5K — 6:00–7:00 min/km; 10K — 6:30–7:30 min/km; half marathon — 7:00–8:00 min/km; marathon — 7:30–9:00 min/km. Elite runners are significantly faster: sub-3:00 min/km for marathon.' },
      { q: 'How does pace relate to speed?', a: 'Speed (km/h) = 60 ÷ pace (min/km). For example, a 6:00 min/km pace = 60 ÷ 6 = 10 km/h. Conversely, pace (min/km) = 60 ÷ speed (km/h).' },
      { q: 'What is negative splitting?', a: 'Negative splitting means running the second half of a race faster than the first half. This pacing strategy is used by most elite runners and is considered the most efficient way to run a race, as it prevents early glycogen depletion and maintains better form throughout.' },
      { q: 'How do I convert pace between km and miles?', a: 'To convert min/km to min/mile: multiply by 1.60934. So 6:00 min/km × 1.60934 ≈ 9:39 min/mile. To convert min/mile to min/km: divide by 1.60934.' },
      { q: 'What training paces should I use?', a: 'Common training zones: Easy/recovery run = race pace + 60–90 sec/km; Long run = race pace + 45–75 sec/km; Tempo run = race pace + 15–30 sec/km; Interval/VO2max = race pace − 15–30 sec/km. These are general guidelines — adjust based on heart rate data.' },
      { q: 'What is VO2max and how does it affect pace?', a: 'VO2max is the maximum rate at which your body can use oxygen during intense exercise. A higher VO2max allows you to run faster at the same effort level. Elite marathon runners typically have VO2max values of 70–85 ml/kg/min, compared to 40–55 for recreational runners.' },
      { q: 'How do hills affect running pace?', a: 'Uphill running slows pace significantly — roughly 10–20 seconds per km for every 100m of elevation gain per km (1% gradient). Modern GPS watches use Gradient Adjusted Pace (GAP) to show your "equivalent flat pace" to make hilly and flat runs comparable.' },
      { q: 'How does cadence affect pace and injury risk?', a: 'Running cadence (steps per minute) affects pace and injury mechanics. Most recreational runners run at 150–165 steps/minute; increasing to 170–180 typically reduces impact forces and overstriding. A 5–10% increase in cadence can improve efficiency without requiring more effort.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор темпа бега помогает бегунам, велосипедистам и спортсменам всех уровней рассчитать три ключевых показателя: темп (время на км или милю), общее время финиша и среднюю скорость в км/ч. Подходит для тренировок на 5 км, марафона или обычной пробежки.\n\nПонимание своего темпа — основа эффективных тренировок. Бег слишком быстро приводит к раннему утомлению и риску травм; слишком медленно — ограничивает прогресс. Большинство тренеров рекомендуют тренироваться на 60–80% от максимальных усилий при базовой подготовке, что обычно означает темп на 60–90 секунд на км медленнее гоночного. Используйте этот калькулятор для планирования тренировочных зон и постановки целей.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое темп бега?', a: 'Темп бега — это время, необходимое для преодоления одной единицы расстояния, обычно в минутах на километр (мин/км) или милю (мин/ми). Например, темп 6:00 мин/км означает, что 1 км вы пробегаете за 6 минут.' },
      { q: 'Как рассчитать время финиша по темпу?', a: 'Умножьте темп (в секундах на км) на дистанцию в км. Например, темп 5:30 мин/км (330 сек/км) на дистанции 10 км: 330 × 10 = 3300 секунд = 55 минут.' },
      { q: 'Какой темп считается хорошим для начинающего?', a: 'Для новичков комфортный темп — 7–9 мин/км. Ориентир — «разговорный тест»: вы должны свободно говорить во время бега. С ростом физической формы темп улучшается естественно.' },
      { q: 'Какие средние темпы для популярных дистанций?', a: 'Типичные темпы любителей: 5 км — 6:00–7:00 мин/км; 10 км — 6:30–7:30 мин/км; полумарафон — 7:00–8:00 мин/км; марафон — 7:30–9:00 мин/км. Элита пробегает марафон быстрее 3:00 мин/км.' },
      { q: 'Как темп связан со скоростью?', a: 'Скорость (км/ч) = 60 ÷ темп (мин/км). Например, 6:00 мин/км = 60 ÷ 6 = 10 км/ч. Обратно: темп (мин/км) = 60 ÷ скорость (км/ч).' },
      { q: 'Что такое негативный сплит?', a: 'Негативный сплит — бег второй половины дистанции быстрее первой. Это наиболее эффективная стратегия темпа: предотвращает преждевременный расход гликогена и позволяет сохранить технику до финиша.' },
      { q: 'Как перевести темп из км в мили?', a: 'Для перевода мин/км в мин/милю: умножьте на 1,60934. 6:00 мин/км × 1,60934 ≈ 9:39 мин/миля. Для обратного перевода: разделите на 1,60934.' },
      { q: 'Какие темпы использовать на тренировках?', a: 'Основные зоны: лёгкий бег = гоночный + 60–90 сек/км; длинный = гоночный + 45–75 сек/км; темповый = гоночный + 15–30 сек/км; интервалы = гоночный − 15–30 сек/км. Корректируйте по данным пульса.' },
      { q: 'Что такое МПК и как он влияет на темп?', a: 'МПК (VO2max) — максимальное потребление кислорода. Чем выше МПК, тем быстрее можно бежать при той же интенсивности. У элитных марафонцев МПК 70–85 мл/кг/мин, у любителей — 40–55.' },
      { q: 'Как рельеф влияет на темп?', a: 'Подъёмы замедляют темп примерно на 10–20 секунд на км на каждые 100 м набора высоты на км. Современные часы используют «скорректированный темп» (GAP) для сравнения равнинных и холмистых пробежек.' },
      { q: 'Как каденс влияет на темп и риск травм?', a: 'Каденс (шагов в минуту) влияет на темп и биомеханику. Большинство любителей бегут с частотой 150–165 шаг/мин; увеличение до 170–180 снижает ударную нагрузку. Рост каденса на 5–10% улучшает эффективность без увеличения усилий.' },
    ],
  },
  uk: {
    description: 'Наш калькулятор темпу бігу допомагає бігунам, велосипедистам і спортсменам будь-якого рівня розрахувати три ключових показники: темп (час на км або милю), загальний час фінішу і середню швидкість у км/год. Підходить для тренувань на 5 км, марафону або звичайної пробіжки.\n\nРозуміння свого темпу — основа ефективних тренувань. Занадто швидкий біг призводить до раннього стомлення і ризику травм; занадто повільний — обмежує прогрес. Більшість тренерів рекомендують тренуватися на 60–80% від максимальних зусиль при базовій підготовці, що зазвичай означає темп на 60–90 секунд на км повільніше гоночного.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке темп бігу?', a: 'Темп бігу — час, необхідний для подолання однієї одиниці відстані, зазвичай у хвилинах на кілометр (хв/км) або милю. Наприклад, темп 6:00 хв/км означає, що 1 км ви пробігаєте за 6 хвилин.' },
      { q: 'Як розрахувати час фінішу за темпом?', a: 'Помножте темп (у секундах на км) на дистанцію в км. Наприклад, темп 5:30 хв/км (330 сек/км) на дистанції 10 км: 330 × 10 = 3300 секунд = 55 хвилин.' },
      { q: 'Який темп вважається хорошим для початківця?', a: 'Для новачків комфортний темп — 7–9 хв/км. Орієнтир — «розмовний тест»: ви маєте вільно говорити під час бігу. З ростом фізичної форми темп покращується природно.' },
      { q: 'Які середні темпи для популярних дистанцій?', a: 'Типові темпи аматорів: 5 км — 6:00–7:00 хв/км; 10 км — 6:30–7:30 хв/км; напівмарафон — 7:00–8:00 хв/км; марафон — 7:30–9:00 хв/км. Еліта пробігає марафон швидше 3:00 хв/км.' },
      { q: 'Як темп пов\'язаний із швидкістю?', a: 'Швидкість (км/год) = 60 ÷ темп (хв/км). Наприклад, 6:00 хв/км = 60 ÷ 6 = 10 км/год. Зворотно: темп (хв/км) = 60 ÷ швидкість (км/год).' },
      { q: 'Що таке негативний спліт?', a: 'Негативний спліт — біг другої половини дистанції швидше першої. Це найефективніша стратегія: запобігає передчасним витратам глікогену і дозволяє зберегти техніку до фінішу.' },
      { q: 'Як перевести темп з км у милі?', a: 'Для перетворення хв/км у хв/милю: помножте на 1,60934. 6:00 хв/км × 1,60934 ≈ 9:39 хв/миля. Для зворотного: розділіть на 1,60934.' },
      { q: 'Які темпи використовувати на тренуваннях?', a: 'Основні зони: легкий біг = гоночний + 60–90 сек/км; довгий = гоночний + 45–75 сек/км; темповий = гоночний + 15–30 сек/км; інтервали = гоночний − 15–30 сек/км.' },
      { q: 'Що таке МСК і як він впливає на темп?', a: 'МСК (VO2max) — максимальне споживання кисню. Чим вище МСК, тим швидше можна бігти за тієї ж інтенсивності. У елітних марафонців МСК 70–85 мл/кг/хв, у аматорів — 40–55.' },
      { q: 'Як рельєф впливає на темп?', a: 'Підйоми сповільнюють темп приблизно на 10–20 секунд на км на кожні 100 м набору висоти. Сучасні годинники використовують «скоригований темп» (GAP) для порівняння рівнинних і горбистих пробіжок.' },
      { q: 'Як каденс впливає на темп і ризик травм?', a: 'Каденс (кроків за хвилину) впливає на темп і біомеханіку. Більшість аматорів бігають з частотою 150–165 кроків/хв; збільшення до 170–180 знижує ударне навантаження. Зростання каденсу на 5–10% підвищує ефективність без збільшення зусиль.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice d\'allure de course aide les coureurs, cyclistes et sportifs de tous niveaux à calculer trois métriques clés : l\'allure (temps par km ou mile), le temps total de course et la vitesse moyenne en km/h. Idéale pour l\'entraînement au 5 km, au marathon ou pour une simple sortie quotidienne.\n\nComprendre son allure est fondamental pour un entraînement efficace. Courir trop vite entraîne fatigue précoce et risque de blessure ; trop lentement limite les progrès cardiovasculaires. La plupart des entraîneurs recommandent de s\'entraîner à 60–80 % de l\'effort maximal pour développer l\'endurance de base, soit une allure 60–90 secondes par km plus lente que l\'allure de course.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que l\'allure de course ?', a: 'L\'allure de course est le temps nécessaire pour parcourir une unité de distance, exprimé en minutes par kilomètre (min/km) ou par mile. Par exemple, une allure de 6:00 min/km signifie que vous parcourez 1 km en exactement 6 minutes.' },
      { q: 'Comment calculer le temps de course à partir de l\'allure ?', a: 'Multipliez votre allure (en secondes/km) par la distance en km. Par exemple, 5:30 min/km (330 s/km) sur 10 km : 330 × 10 = 3 300 secondes = 55 minutes.' },
      { q: 'Quelle est une bonne allure pour un débutant ?', a: 'Pour les débutants, une allure confortable de 7 à 9 min/km est typique. Le repère est le « test de la conversation » — vous devez pouvoir parler sans difficulté. L\'allure s\'améliore naturellement avec la condition physique.' },
      { q: 'Quelles sont les allures typiques pour les distances courantes ?', a: 'Allures moyennes des coureurs loisirs : 5 km — 6:00–7:00 min/km ; 10 km — 6:30–7:30 min/km ; semi-marathon — 7:00–8:00 min/km ; marathon — 7:30–9:00 min/km. Les élites sont bien en dessous de 3:00 min/km au marathon.' },
      { q: 'Quelle est la relation entre allure et vitesse ?', a: 'Vitesse (km/h) = 60 ÷ allure (min/km). Par exemple, 6:00 min/km = 60 ÷ 6 = 10 km/h. Inversement, allure (min/km) = 60 ÷ vitesse (km/h).' },
      { q: 'Qu\'est-ce que le negative split ?', a: 'Le negative split consiste à courir la seconde moitié de la course plus vite que la première. C\'est la stratégie d\'allure la plus efficace : elle évite l\'épuisement précoce du glycogène et permet de maintenir une meilleure technique jusqu\'à l\'arrivée.' },
      { q: 'Comment convertir l\'allure entre km et miles ?', a: 'Pour convertir min/km en min/mile : multipliez par 1,60934. 6:00 min/km × 1,60934 ≈ 9:39 min/mile. Pour la conversion inverse, divisez par 1,60934.' },
      { q: 'Quelles allures utiliser à l\'entraînement ?', a: 'Zones d\'entraînement courantes : Footing/récupération = allure de course + 60–90 sec/km ; Sortie longue = + 45–75 sec/km ; Tempo = + 15–30 sec/km ; Intervalles = − 15–30 sec/km. Ajustez selon les données de fréquence cardiaque.' },
      { q: 'Qu\'est-ce que le VO2max et comment affecte-t-il l\'allure ?', a: 'Le VO2max est la consommation maximale d\'oxygène. Plus il est élevé, plus vous pouvez courir vite au même effort. Les marathoniens d\'élite ont un VO2max de 70–85 ml/kg/min, contre 40–55 pour les coureurs loisirs.' },
      { q: 'Comment le dénivelé affecte-t-il l\'allure ?', a: 'La montée ralentit l\'allure d\'environ 10–20 secondes par km pour chaque 100 m de dénivelé positif par km. Les montres GPS modernes utilisent l\'Allure Ajustée au Gradient (GAP) pour comparer équitablement les sorties plates et vallonnées.' },
      { q: 'Comment la cadence affecte-t-elle l\'allure et le risque de blessure ?', a: 'La cadence (pas par minute) influe sur l\'allure et la biomécanique. La plupart des coureurs loisirs courent à 150–165 pas/min ; passer à 170–180 réduit les forces d\'impact. Une augmentation de 5–10 % améliore l\'efficacité sans effort supplémentaire.' },
    ],
  },
  lt: {
    description: 'Mūsų bėgimo tempo skaičiuotuvas padeda bėgikams, dviratininkams ir visiems sportininkams apskaičiuoti tris pagrindinius rodiklius: tempą (laikas km ar myliai), bendrą finišo laiką ir vidutinį greitį km/h. Tinka tiek 5 km treniruotei, tiek maratonui ar kasdieniam bėgimui.\n\nTempo supratimas yra efektyvaus treniravimosi pagrindas. Per greitas bėgimas sukelia ankstyvą nuovargį ir traumų riziką; per lėtas riboja pažangą. Dauguma trenerių rekomenduoja treniruotis 60–80% maksimalių pastangų lygyje, o tai paprastai reiškia tempą 60–90 sek/km lėtesnį nei varžybinis tempas.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kas yra bėgimo tempas?', a: 'Bėgimo tempas — laikas, reikalingas nueiti vieną atstumo vienetą, paprastai išreikštas minutėmis per kilometrą (min/km) arba mylią. Pavyzdžiui, 6:00 min/km tempas reiškia, kad 1 km nubėgate per 6 minutes.' },
      { q: 'Kaip apskaičiuoti finišo laiką pagal tempą?', a: 'Padauginkite tempą (sekundėmis/km) iš atstumo km. Pavyzdžiui, 5:30 min/km (330 sek/km) per 10 km: 330 × 10 = 3300 sekundžių = 55 minutės.' },
      { q: 'Koks yra geras tempas pradedančiajam?', a: 'Pradedantiesiems patogus tempas yra 7–9 min/km. Orientyras — „pokalbio testas": turėtumėte galėti laisvai kalbėti bėgant. Tempas natūraliai gerėja didėjant fiziniam pajėgumui.' },
      { q: 'Kokie yra tipiniai tempai populiariems atstumams?', a: 'Vidutiniai mėgėjų tempai: 5 km — 6:00–7:00 min/km; 10 km — 6:30–7:30 min/km; pusmaratonis — 7:00–8:00 min/km; maratonas — 7:30–9:00 min/km. Elitas bėga maratoną greičiau nei 3:00 min/km.' },
      { q: 'Kaip tempas susijęs su greičiu?', a: 'Greitis (km/h) = 60 ÷ tempas (min/km). Pavyzdžiui, 6:00 min/km = 60 ÷ 6 = 10 km/h. Atvirkščiai: tempas (min/km) = 60 ÷ greitis (km/h).' },
      { q: 'Kas yra negatyvus splitas?', a: 'Negatyvus splitas — antrosios distancijos pusės bėgimas greičiau nei pirmosios. Tai efektyviausia tempo strategija: neleidžia anksti išeikvoti glikogeno ir išsaugo geresnę techniką iki finišo.' },
      { q: 'Kaip konvertuoti tempą iš km į mylias?', a: 'Norint konvertuoti min/km į min/mylią: padauginkite iš 1,60934. 6:00 min/km × 1,60934 ≈ 9:39 min/mylia. Atvirkščiai: padalinkite iš 1,60934.' },
      { q: 'Kokius tempus naudoti treniruotėse?', a: 'Pagrindinės zonos: lengvas/atsistatymo bėgimas = varžybinis + 60–90 sek/km; ilgas = varžybinis + 45–75 sek/km; tempo = varžybinis + 15–30 sek/km; intervalai = varžybinis − 15–30 sek/km.' },
      { q: 'Kas yra VO2max ir kaip tai veikia tempą?', a: 'VO2max — maksimalus deguonies suvartojimas. Kuo jis didesnis, tuo greičiau galima bėgti esant toms pačioms pastangoms. Elitinių maratonininkų VO2max yra 70–85 ml/kg/min, mėgėjų — 40–55.' },
      { q: 'Kaip reljefas veikia tempą?', a: 'Kilimas sulėtina tempą maždaug 10–20 sekundžių km kiekvienam 100 m aukščio skirtumui km. Modernūs GPS laikrodžiai naudoja gradiento pakoreguotą tempą (GAP), kad palygintų lygius ir kalvotus bėgimus.' },
      { q: 'Kaip kadensas veikia tempą ir traumų riziką?', a: 'Kadensas (žingsniai per minutę) veikia tempą ir biomechaniką. Daugelis mėgėjų bėga 150–165 žingsniai/min; padidinimas iki 170–180 sumažina smūgio jėgas. 5–10% kadenso padidėjimas gerina efektyvumą be papildomų pastangų.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/pace', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PacePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/pace`,
    applicationCategory: 'HealthApplication',
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
        <PaceCalculator locale={locale} />
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

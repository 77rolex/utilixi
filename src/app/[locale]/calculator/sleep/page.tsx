import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import SleepCalculator from './SleepCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/stress-level', label: 'Stress Level Calculator' }, { href: '/calculator/heart-rate', label: 'Heart Rate Zones' }, { href: '/calculator/biological-age', label: 'Biological Age Calculator' }, { href: '/calculator/bmi', label: 'BMI Calculator' }, { href: '/calculator/calories', label: 'Calorie Calculator' }],
  ru: [{ href: '/calculator/stress-level', label: 'Калькулятор уровня стресса' }, { href: '/calculator/heart-rate', label: 'Пульсовые зоны' }, { href: '/calculator/biological-age', label: 'Калькулятор биологического возраста' }, { href: '/calculator/bmi', label: 'Калькулятор ИМТ' }, { href: '/calculator/calories', label: 'Калькулятор калорий' }],
  uk: [{ href: '/calculator/stress-level', label: 'Калькулятор рівня стресу' }, { href: '/calculator/heart-rate', label: 'Пульсові зони' }, { href: '/calculator/biological-age', label: 'Калькулятор біологічного віку' }, { href: '/calculator/bmi', label: 'Калькулятор ІМТ' }, { href: '/calculator/calories', label: 'Калькулятор калорій' }],
  fr: [{ href: '/calculator/stress-level', label: 'Calculatrice du stress' }, { href: '/calculator/heart-rate', label: 'Zones de FC' }, { href: '/calculator/biological-age', label: 'Âge biologique' }, { href: '/calculator/bmi', label: 'Calculatrice IMC' }, { href: '/calculator/calories', label: 'Calculatrice de calories' }],
  lt: [{ href: '/calculator/stress-level', label: 'Streso lygio skaičiuotuvas' }, { href: '/calculator/heart-rate', label: 'Pulso zonos' }, { href: '/calculator/biological-age', label: 'Biologinio amžiaus skaičiuotuvas' }, { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }, { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Sleep Calculator — Best Bedtimes Based on Sleep Cycles', description: 'Free sleep calculator based on 90-minute sleep cycles. Find the best time to wake up or go to bed to feel refreshed. Supports wake-up time, bedtime, and sleep-now modes.', h1: 'Sleep Calculator', subtitle: 'Find the best bedtime or wake-up time aligned with your 90-minute sleep cycles.' },
  ru: { title: 'Калькулятор сна — лучшее время для подъёма по циклам сна', description: 'Бесплатный калькулятор сна на основе 90-минутных циклов. Найдите лучшее время для пробуждения или отхода ко сну, чтобы проснуться бодрым.', h1: 'Калькулятор сна', subtitle: 'Найдите оптимальное время для сна или пробуждения по 90-минутным циклам сна.' },
  uk: { title: 'Калькулятор сну — найкращий час для підйому за циклами сну', description: 'Безкоштовний калькулятор сну на основі 90-хвилинних циклів. Знайдіть найкращий час для пробудження або відходу до сну, щоб прокинутися бадьорим.', h1: 'Калькулятор сну', subtitle: 'Знайдіть оптимальний час для сну або пробудження за 90-хвилинними циклами сну.' },
  fr: { title: 'Calculatrice du sommeil — Meilleurs horaires selon les cycles de sommeil', description: 'Calculatrice du sommeil gratuite basée sur les cycles de 90 minutes. Trouvez le meilleur moment pour vous réveiller ou vous coucher afin de vous sentir reposé(e).', h1: 'Calculatrice du sommeil', subtitle: 'Trouvez le meilleur moment pour vous coucher ou vous réveiller selon vos cycles de sommeil.' },
  lt: { title: 'Miego skaičiuotuvas — geriausias miego laikas pagal miego ciklus', description: 'Nemokamas miego skaičiuotuvas, pagrįstas 90 minučių miego ciklais. Raskite geriausią laiką pabusti arba eiti miegoti, kad pabustumėte žvalūs.', h1: 'Miego skaičiuotuvas', subtitle: 'Raskite geriausią miego ar pabudimo laiką pagal 90 minučių miego ciklus.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Sleep occurs in cycles of approximately 90 minutes, each consisting of several stages including light sleep, deep sleep (slow-wave sleep), and REM sleep. Waking up at the end of a complete cycle — rather than in the middle of deep sleep — significantly reduces sleep inertia (that groggy feeling). The calculator adds 14 minutes (average time to fall asleep) to the sleep time to give you accurate bedtimes or wake-up times aligned with natural cycle boundaries.\n\nQuality sleep is as important as quantity. A full night of 5–6 sleep cycles allows the brain to consolidate memories, the body to repair tissues, and the immune system to strengthen. Chronic sleep deprivation is linked to obesity, diabetes, cardiovascular disease, impaired immune function, and cognitive decline. Aligning your schedule with natural sleep cycles is one of the simplest ways to improve daily energy and long-term health.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How long is one sleep cycle?', a: 'A complete sleep cycle lasts approximately 90 minutes and consists of: N1 (light sleep, ~5 min), N2 (light sleep, ~25 min), N3 (deep/slow-wave sleep, ~30 min), and REM (rapid eye movement, ~30 min). The proportion of REM sleep increases in later cycles, while deep sleep dominates early in the night.' },
      { q: 'Why does the calculator add 14 minutes?', a: 'The average person takes about 14 minutes to fall asleep after lying down. This is added to the recommended sleep duration so that your bedtime recommendation accounts for the time it actually takes to transition from wakefulness to the first sleep stage.' },
      { q: 'How many sleep cycles do I need?', a: 'Adults need 7–9 hours of sleep per night, which corresponds to 5–6 full cycles (450–540 minutes). 4 cycles (6 hours) is the minimum many function on, but research consistently shows that 5–6 cycles (7.5–9 hours) is optimal for cognitive performance, mood, and physical health.' },
      { q: 'What if I can\'t fall asleep exactly at the suggested time?', a: 'The 14-minute estimate is an average. If you know it takes you longer (e.g., 30 minutes), mentally adjust the bedtime earlier by the difference. The key goal is to wake up after a complete cycle — even 5–10 minutes late means you\'re in a new cycle, and waking mid-cycle can still cause grogginess.' },
      { q: 'What happens if I wake up in the middle of a sleep cycle?', a: 'Waking in the middle of N3 (deep sleep) or during REM sleep causes the strongest sleep inertia — the disoriented, foggy feeling that can last 15–60 minutes. This impairs reaction time, working memory, and mood. Waking during N1 or N2 (light sleep) feels much more natural. This is why cycle-aligned alarms (like smart alarms or this calculator\'s suggestions) help you feel more alert immediately upon waking.' },
      { q: 'What is the difference between REM sleep and deep sleep?', a: 'Deep sleep (N3 or slow-wave sleep) is the most physically restorative stage — growth hormone is released, tissues repair, and immune function strengthens. It dominates the first half of the night. REM (rapid eye movement) sleep is where most vivid dreaming occurs, and it is critical for emotional processing, memory consolidation, and creative problem-solving. It dominates the second half of the night. Both stages are essential; cutting sleep short disproportionately reduces REM.' },
      { q: 'What is sleep inertia and how can I reduce it?', a: 'Sleep inertia is the groggy, disoriented state immediately after waking, caused by elevated adenosine and residual sleep pressure. It typically lasts 15–30 minutes but can impair performance for up to an hour. To reduce it: wake up at the end of a sleep cycle (this calculator helps); expose yourself to bright light immediately upon waking; move your body within minutes; have caffeine shortly after waking (not immediately — wait 90 min after rising for maximum effect). Avoid hitting snooze, as it starts a new incomplete cycle.' },
      { q: 'Should I use an alarm clock, and what type is best?', a: 'Traditional fixed-time alarms often interrupt sleep mid-cycle. Smart alarm apps (using accelerometers to detect movement) or sunrise simulation alarms (gradually brightening light) are more effective at waking during light sleep phases. If using a fixed alarm, this calculator\'s suggestions help place it at natural cycle endpoints. Some people find that setting an intention to wake up (telling yourself a specific time before sleeping) can be surprisingly effective due to hypothalamic regulation of wake hormones.' },
      { q: 'How can I improve my overall sleep quality?', a: 'Key evidence-based strategies: maintain a consistent sleep/wake schedule (even on weekends); keep your bedroom cool (18–20°C), dark, and quiet; avoid screens 1 hour before bed (blue light suppresses melatonin); limit caffeine after 2pm; avoid alcohol close to bedtime (it fragments REM sleep); exercise regularly but not within 3 hours of bed; manage stress with relaxation techniques. Cognitive Behavioral Therapy for Insomnia (CBT-I) is the most effective long-term treatment for chronic insomnia.' },
      { q: 'How do sleep needs change with age?', a: 'Newborns need 14–17 hours per day; toddlers 11–14 hours; school-age children 9–11 hours; teenagers 8–10 hours (with a natural shift toward later sleep times driven by circadian biology — not laziness). Adults need 7–9 hours. Older adults (65+) still need 7–8 hours but often experience more fragmented sleep and earlier wake times. The tendency to need less sleep as you age is a myth — older adults who sleep less are often experiencing impaired sleep quality, not reduced need.' },
      { q: 'What are signs that I am not getting enough quality sleep?', a: 'Signs of chronic sleep deprivation include: needing an alarm clock to wake up (your body would sleep longer if rested); feeling sleepy during sedentary activities; relying heavily on caffeine to function; difficulty concentrating or making decisions; emotional irritability or mood swings; getting sick frequently (impaired immunity); falling asleep within minutes of lying down (normal is 10–20 minutes — falling asleep in under 5 minutes suggests significant sleep debt).' },
    ],
  },
  ru: {
    description: 'Сон протекает циклами примерно по 90 минут, каждый из которых включает несколько стадий: лёгкий сон, глубокий сон (медленноволновой) и фазу быстрого сна (REM). Пробуждение в конце полного цикла, а не в середине глубокого сна, значительно снижает сонную инерцию (ощущение разбитости). Калькулятор добавляет 14 минут (среднее время засыпания) к времени сна для точного расчёта.\n\nКачество сна так же важно, как и его количество. Полноценный ночной сон из 5–6 циклов позволяет мозгу консолидировать воспоминания, телу восстанавливать ткани, а иммунной системе укрепляться. Хроническое недосыпание связано с ожирением, диабетом, сердечно-сосудистыми заболеваниями и снижением когнитивных функций.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Сколько длится один цикл сна?', a: 'Полный цикл сна длится около 90 минут и состоит из: N1 (лёгкий сон, ~5 мин), N2 (лёгкий сон, ~25 мин), N3 (глубокий сон, ~30 мин) и REM (быстрый сон, ~30 мин). Доля REM-сна возрастает в поздних циклах, тогда как глубокий сон преобладает в начале ночи.' },
      { q: 'Почему калькулятор добавляет 14 минут?', a: 'В среднем человеку требуется около 14 минут, чтобы заснуть после того, как он лёг в постель. Это учитывается в расчёте, чтобы время отхода ко сну соответствовало реальному переходу от бодрствования к первой стадии сна.' },
      { q: 'Сколько циклов сна мне нужно?', a: 'Взрослым необходимо 7–9 часов сна в сутки, что соответствует 5–6 полным циклам (450–540 минут). 4 цикла (6 часов) — минимум, при котором многие функционируют, но 5–6 циклов оптимальны для когнитивных способностей, настроения и здоровья.' },
      { q: 'Что если я не могу заснуть точно в указанное время?', a: 'Оценка 14 минут — среднее значение. Если вам нужно больше времени (например, 30 минут), скорректируйте время отхода ко сну. Главное — проснуться после завершённого цикла, а не в его середине.' },
      { q: 'Что происходит, если проснуться в середине цикла?', a: 'Пробуждение в середине N3 (глубокого сна) или REM-сна вызывает наиболее сильную сонную инерцию — ощущение дезориентированности, которое может длиться 15–60 минут. Это ухудшает реакцию, рабочую память и настроение. Пробуждение в N1 или N2 (лёгкий сон) ощущается значительно более естественным. Именно поэтому умные будильники (учитывающие циклы сна) помогают проснуться бодрее.' },
      { q: 'В чём разница между REM-сном и глубоким сном?', a: 'Глубокий сон (N3, медленноволновой) — наиболее физически восстановительная стадия: выделяется гормон роста, восстанавливаются ткани, укрепляется иммунитет. Он преобладает в первой половине ночи. REM-сон — стадия ярких сновидений, критически важная для эмоциональной обработки, консолидации памяти и творческого мышления. Преобладает во второй половине ночи. Сокращение сна непропорционально уменьшает долю REM.' },
      { q: 'Что такое сонная инерция и как её снизить?', a: 'Сонная инерция — сонливость и дезориентация сразу после пробуждения. Обычно длится 15–30 минут, но может ухудшать работоспособность до часа. Как снизить: просыпайтесь в конце цикла (этот калькулятор помогает); сразу выходите на яркий свет; двигайтесь сразу после пробуждения; выпейте кофе (но не сразу — подождите 90 минут после подъёма для максимального эффекта). Не нажимайте кнопку отложить — это запускает новый неполный цикл.' },
      { q: 'Нужен ли будильник и какой тип лучше?', a: 'Обычные будильники с фиксированным временем часто прерывают сон в середине цикла. Умные будильники (используют акселерометр) или имитаторы рассвета (постепенное освещение) более эффективно будят в фазе лёгкого сна. При использовании обычного будильника воспользуйтесь подсказками этого калькулятора. Интересно, что намерение проснуться в конкретное время перед засыпанием может быть удивительно эффективным из-за регуляции гормонов пробуждения гипоталамусом.' },
      { q: 'Как улучшить качество сна?', a: 'Ключевые научно обоснованные стратегии: соблюдайте постоянный график (даже в выходные); поддерживайте в спальне прохладу (18–20°C), темноту и тишину; избегайте экранов за 1 час до сна (синий свет подавляет мелатонин); ограничьте кофеин после 14:00; избегайте алкоголя перед сном (он фрагментирует REM); тренируйтесь регулярно, но не менее чем за 3 часа до сна. Когнитивно-поведенческая терапия бессонницы (КПТ-Б) — наиболее эффективное долгосрочное лечение хронической бессонницы.' },
      { q: 'Как потребность во сне меняется с возрастом?', a: 'Новорождённые нуждаются в 14–17 часах; малыши — в 11–14; школьники — в 9–11; подростки — в 8–10 часах (с биологическим сдвигом к позднему засыпанию — это не лень). Взрослые — 7–9 часов. Пожилые (65+) по-прежнему нуждаются в 7–8 часах, но часто испытывают более фрагментарный сон. Убеждение, что с возрастом нужно меньше спать, — миф: пожилые люди, спящие меньше, чаще испытывают нарушения качества сна, а не сниженную потребность.' },
      { q: 'Какие признаки хронического недосыпания?', a: 'Признаки: зависимость от будильника (отдохнувший организм просыпается сам); сонливость в спокойных ситуациях; сильная зависимость от кофеина; трудности с концентрацией и принятием решений; раздражительность и перепады настроения; частые болезни; засыпание в течение нескольких минут (норма — 10–20 минут; засыпание менее чем за 5 минут указывает на значительный дефицит сна).' },
    ],
  },
  uk: {
    description: 'Сон відбувається циклами приблизно по 90 хвилин, кожен з яких включає кілька стадій: легкий сон, глибокий сон (повільнохвильовий) та фазу швидкого сну (REM). Пробудження в кінці повного циклу, а не в середині глибокого сну, значно знижує сонну інерцію. Калькулятор додає 14 хвилин (середній час засинання) до часу сну для точного розрахунку.\n\nЯкість сну так само важлива, як і його кількість. Повноцінний нічний сон з 5–6 циклів дозволяє мозку консолідувати спогади, тілу відновлювати тканини, а імунній системі зміцнюватися. Хронічне недосипання пов\'язано з ожирінням, діабетом, серцево-судинними захворюваннями та зниженням когнітивних функцій.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Скільки триває один цикл сну?', a: 'Повний цикл сну триває близько 90 хвилин і складається з: N1 (легкий сон, ~5 хв), N2 (легкий сон, ~25 хв), N3 (глибокий сон, ~30 хв) та REM (швидкий сон, ~30 хв). Частка REM-сну зростає в пізніх циклах, тоді як глибокий сон переважає на початку ночі.' },
      { q: 'Чому калькулятор додає 14 хвилин?', a: 'В середньому людині потрібно близько 14 хвилин, щоб заснути після того, як вона лягла в ліжко. Це враховується в розрахунку для точного визначення часу відходу до сну.' },
      { q: 'Скільки циклів сну мені потрібно?', a: 'Дорослим необхідно 7–9 годин сну на добу, що відповідає 5–6 повним циклам (450–540 хвилин). 4 цикли (6 годин) — мінімум, але 5–6 циклів оптимальні для когнітивних здібностей і здоров\'я.' },
      { q: 'Що якщо я не можу заснути точно в зазначений час?', a: 'Оцінка 14 хвилин — середнє значення. Якщо вам потрібно більше часу, скоригуйте час відходу до сну. Головне — прокинутися після завершеного циклу, а не в його середині.' },
      { q: 'Що відбувається, якщо прокинутися в середині циклу?', a: 'Пробудження в середині N3 (глибокого сну) або REM-сну викликає найсильнішу сонну інерцію — відчуття дезорієнтованості, яке може тривати 15–60 хвилин. Це погіршує реакцію, робочу пам\'ять і настрій. Пробудження в N1 або N2 (легкий сон) відчувається значно природніше. Саме тому розумні будильники (що враховують цикли сну) допомагають прокинутися бадьоріше.' },
      { q: 'В чому різниця між REM-сном і глибоким сном?', a: 'Глибокий сон (N3, повільнохвильовий) — найбільш фізично відновлювальна стадія: виділяється гормон росту, відновлюються тканини, зміцнюється імунітет. Переважає в першій половині ночі. REM-сон — стадія яскравих сновидінь, критично важлива для емоційної обробки, консолідації пам\'яті та творчого мислення. Переважає в другій половині ночі. Скорочення сну непропорційно зменшує частку REM.' },
      { q: 'Що таке сонна інерція і як її знизити?', a: 'Сонна інерція — сонливість і дезорієнтація одразу після пробудження. Зазвичай триває 15–30 хвилин. Як знизити: прокидайтесь в кінці циклу (цей калькулятор допомагає); відразу виходьте на яскраве світло; рухайтеся одразу після пробудження; випийте каву (але не відразу — зачекайте 90 хвилин після підйому). Не натискайте кнопку відкласти — це запускає новий неповний цикл.' },
      { q: 'Чи потрібен будильник і який тип кращий?', a: 'Звичайні будильники з фіксованим часом часто перервуть сон у середині циклу. Розумні будильники (використовують акселерометр) або імітатори сходу сонця (поступове освітлення) ефективніше будять у фазі легкого сну. При використанні звичайного будильника скористайтеся підказками цього калькулятора.' },
      { q: 'Як покращити якість сну?', a: 'Ключові науково обґрунтовані стратегії: дотримуйтесь постійного графіку (навіть у вихідні); підтримуйте в спальні прохолоду (18–20°C), темряву і тишу; уникайте екранів за 1 годину до сну (синє світло пригнічує мелатонін); обмежте кофеїн після 14:00; уникайте алкоголю перед сном (він фрагментує REM). Когнітивно-поведінкова терапія безсоння (КПТ-Б) — найефективніше довгострокове лікування хронічного безсоння.' },
      { q: 'Як потреба у сні змінюється з віком?', a: 'Новонароджені потребують 14–17 годин; малюки — 11–14; школярі — 9–11; підлітки — 8–10 годин (з біологічним зсувом до пізнього засинання — це не лінь). Дорослі — 7–9 годин. Люди похилого віку (65+) все ще потребують 7–8 годин, але часто мають більш фрагментарний сон. Переконання, що з віком потрібно менше спати, — міф.' },
      { q: 'Які ознаки хронічного недосипання?', a: 'Ознаки: залежність від будильника; сонливість у спокійних ситуаціях; сильна залежність від кофеїну; труднощі з концентрацією і прийняттям рішень; дратівливість і перепади настрою; часті хвороби; засинання протягом кількох хвилин (норма — 10–20 хвилин; засинання менш ніж за 5 хвилин вказує на значний дефіцит сну).' },
    ],
  },
  fr: {
    description: 'Le sommeil se déroule en cycles d\'environ 90 minutes, comprenant plusieurs stades : sommeil léger, sommeil profond (ondes lentes) et sommeil paradoxal (REM). Se réveiller à la fin d\'un cycle complet plutôt qu\'en plein sommeil profond réduit considérablement l\'inertie du sommeil (sensation de grogue). La calculatrice ajoute 14 minutes (temps moyen d\'endormissement) pour des recommandations précises.\n\nLa qualité du sommeil est aussi importante que la quantité. Une nuit complète de 5 à 6 cycles permet au cerveau de consolider les souvenirs, au corps de réparer les tissus et au système immunitaire de se renforcer. Le manque de sommeil chronique est lié à l\'obésité, au diabète, aux maladies cardiovasculaires et au déclin cognitif.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Combien de temps dure un cycle de sommeil ?', a: 'Un cycle de sommeil complet dure environ 90 minutes et comprend : N1 (sommeil léger, ~5 min), N2 (sommeil léger, ~25 min), N3 (sommeil profond, ~30 min) et REM (sommeil paradoxal, ~30 min). La proportion de REM augmente dans les cycles tardifs, tandis que le sommeil profond prédomine en début de nuit.' },
      { q: 'Pourquoi la calculatrice ajoute-t-elle 14 minutes ?', a: 'La plupart des gens mettent environ 14 minutes à s\'endormir après s\'être allongés. Ce délai est pris en compte pour que l\'heure de coucher recommandée corresponde au temps réel de transition entre l\'éveil et la première phase de sommeil.' },
      { q: 'De combien de cycles ai-je besoin ?', a: 'Les adultes ont besoin de 7 à 9 heures de sommeil par nuit, ce qui correspond à 5 à 6 cycles complets (450 à 540 minutes). 4 cycles (6 heures) est le minimum pour beaucoup, mais 5 à 6 cycles sont optimaux pour les performances cognitives, l\'humeur et la santé physique.' },
      { q: 'Que faire si je ne peux pas m\'endormir exactement à l\'heure suggérée ?', a: 'Les 14 minutes sont une moyenne. Si vous savez que vous mettez plus longtemps, avancez l\'heure de coucher en conséquence. L\'objectif principal est de se réveiller après un cycle complet — même 5 à 10 minutes de retard peut vous faire entrer dans un nouveau cycle.' },
      { q: 'Que se passe-t-il si je me réveille au milieu d\'un cycle ?', a: 'Se réveiller en plein sommeil profond (N3) ou pendant le REM provoque la plus forte inertie de sommeil — une sensation de désorientation qui peut durer 15 à 60 minutes. Cela altère la réactivité, la mémoire de travail et l\'humeur. Se réveiller en N1 ou N2 (sommeil léger) est beaucoup plus naturel. C\'est pourquoi les réveils intelligents synchronisés avec les cycles de sommeil permettent de se sentir plus alerte.' },
      { q: 'Quelle est la différence entre le sommeil REM et le sommeil profond ?', a: 'Le sommeil profond (N3) est le stade le plus récupérateur physiquement : l\'hormone de croissance est libérée, les tissus se réparent, l\'immunité se renforce. Il prédomine en première partie de nuit. Le sommeil REM est celui des rêves vivids, essentiel au traitement émotionnel, à la consolidation de la mémoire et à la résolution créative de problèmes. Il prédomine en fin de nuit. Réduire le temps de sommeil diminue surtout le REM.' },
      { q: 'Qu\'est-ce que l\'inertie du sommeil et comment la réduire ?', a: 'L\'inertie du sommeil est cet état de somnolence et de désorientation juste après le réveil. Elle dure généralement 15 à 30 minutes. Pour la réduire : réveillez-vous à la fin d\'un cycle (cette calculatrice aide) ; exposez-vous immédiatement à la lumière vive ; bougez dans les premières minutes ; prenez du café (attendez 90 minutes après le réveil pour un effet maximal). Évitez de snoozer — cela démarre un nouveau cycle incomplet.' },
      { q: 'Faut-il utiliser un réveil, et lequel est le meilleur ?', a: 'Les réveils classiques à heure fixe interrompent souvent le sommeil en milieu de cycle. Les applications de réveil intelligent (accéléromètre) ou les simulateurs d\'aube (lumière progressive) sont plus efficaces pour se réveiller en sommeil léger. Avec un réveil fixe, utilisez les suggestions de cette calculatrice. Fait intéressant : se fixer l\'intention de se réveiller à une heure précise avant de s\'endormir peut être étonnamment efficace.' },
      { q: 'Comment améliorer la qualité du sommeil ?', a: 'Stratégies clés fondées sur des preuves : maintenez un horaire régulier (même le week-end) ; gardez la chambre fraîche (18–20°C), sombre et silencieuse ; évitez les écrans 1 heure avant le coucher ; limitez la caféine après 14h ; évitez l\'alcool en soirée (il fragmente le REM) ; faites de l\'exercice régulièrement mais pas dans les 3 heures avant le coucher. La thérapie cognitivo-comportementale pour l\'insomnie (TCC-i) est le traitement le plus efficace à long terme.' },
      { q: 'Comment les besoins en sommeil évoluent-ils avec l\'âge ?', a: 'Les nourrissons ont besoin de 14–17 heures ; les tout-petits 11–14 h ; les enfants scolarisés 9–11 h ; les adolescents 8–10 h (avec un décalage biologique vers des horaires tardifs — pas de la paresse). Les adultes ont besoin de 7 à 9 heures. Les personnes de 65+ ont toujours besoin de 7 à 8 heures mais ont souvent un sommeil plus fragmenté. L\'idée que les besoins diminuent avec l\'âge est un mythe.' },
      { q: 'Quels sont les signes de manque chronique de sommeil ?', a: 'Signes : dépendance au réveil (un corps reposé se réveille seul) ; somnolence en situation passive ; forte dépendance à la caféine ; difficultés de concentration ; irritabilité ; maladies fréquentes ; s\'endormir en quelques minutes (la normale est 10–20 min — s\'endormir en moins de 5 min indique une importante dette de sommeil).' },
    ],
  },
  lt: {
    description: 'Miegas vyksta ~90 minučių ciklais, kurių kiekvieną sudaro keli etapai: lengvas miegas, gilus miegas (lėtų bangų) ir REM miegas. Pabusti ciklo pabaigoje, o ne gilaus miego viduryje, žymiai sumažina miego inerciją (apsiblausimo jausmą). Skaičiuotuvas prideda 14 minučių (vidutinį užmigimo laiką) prie miego laiko tiksliam skaičiavimui.\n\nMiego kokybė yra tokia pat svarbi kaip ir jo kiekis. Pilnavertis nakties miegas iš 5–6 ciklų leidžia smegenims konsoliduoti atsiminimus, kūnui atstatyti audinius ir imuninei sistemai stiprėti. Lėtinis miego trūkumas siejamas su nutukimu, diabetu, širdies ligomis ir kognityvinio gebėjimo mažėjimu.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kiek trunka vienas miego ciklas?', a: 'Visas miego ciklas trunka apie 90 minučių ir susideda iš: N1 (lengvas miegas, ~5 min), N2 (lengvas miegas, ~25 min), N3 (gilus miegas, ~30 min) ir REM (greitas akių judėjimas, ~30 min). REM miego dalis didėja vėlesniuose cikluose, o gilus miegas vyrauja nakties pradžioje.' },
      { q: 'Kodėl skaičiuotuvas prideda 14 minučių?', a: 'Vidutiniškai žmogui reikia apie 14 minučių užmigti po atsigulimo. Tai įtraukiama į skaičiavimą, kad rekomenduojamas miego laikas atitiktų tikrąjį perėjimą iš budrumo į pirmąjį miego etapą.' },
      { q: 'Kiek miego ciklų man reikia?', a: 'Suaugusiesiems reikia 7–9 valandų miego per naktį, tai atitinka 5–6 pilnus ciklus (450–540 minučių). 4 ciklai (6 valandos) yra minimumas, bet 5–6 ciklai yra optimalūs kognityviniam našumui, nuotaikai ir fizinei sveikatai.' },
      { q: 'Ką daryti, jei negaliu užmigti tiksliai siūlomu laiku?', a: '14 minučių yra vidurkis. Jei žinote, kad jums reikia ilgiau, atitinkamai paankstinkite miego laiką. Pagrindinis tikslas — pabusti po viso ciklo, o ne jo viduryje.' },
      { q: 'Kas nutinka, jei pabundi ciklo viduryje?', a: 'Pabusti gilaus miego (N3) ar REM miego viduryje sukelia stipriausią miego inerciją — dezorientacijos jausmą, trunkantį 15–60 minučių. Tai kenkia reakcijoms, darbinei atmintiai ir nuotaikai. Pabusti N1 ar N2 (lengvo miego) fazėje jaučiasi daug natūraliau. Todėl miego ciklus sekančios programėlės padeda jaustis žvalesniam.' },
      { q: 'Kuo skiriasi REM miegas ir gilus miegas?', a: 'Gilus miegas (N3) yra fiziškai atkuriantis: išsiskiria augimo hormonas, atstatomi audiniai, stiprėja imunitetas. Vyrauja pirmoje nakties pusėje. REM miegas — ryškių sapnų stadija, svarbi emociniam apdorojimui, atminties konsolidavimui ir kūrybiškumui. Vyrauja antroje nakties pusėje. Miego sutrumpinimas proporcingai sumažina REM dalį.' },
      { q: 'Kas yra miego inercija ir kaip ją sumažinti?', a: 'Miego inercija — mieguistumas ir dezorientacija iškart po pabudimo. Paprastai trunka 15–30 minučių. Kaip sumažinti: pabusti ciklo pabaigoje (šis skaičiuotuvas padeda); iškart išeiti į šviesą; judėti pirmomis minutėmis po pabudimo; išgerti kavą (palaukite 90 min po pabudimo maksimaliam efektui). Neverskite snooze — tai pradeda naują neužbaigtą ciklą.' },
      { q: 'Ar reikia žadintuvo, ir koks geriausias?', a: 'Tradiciniai fiksuoto laiko žadintuvai dažnai pertraukia miegą ciklo viduryje. Išmaniosios žadintuvo programėlės (naudojančios akselerometrą) ar aušros simuliatoriai (laipsniškai šviečianti šviesa) efektyviau pažadina lengvo miego fazėje. Naudodami paprastą žadintuvą, vadovaukitės šio skaičiuotuvo rekomendacijomis.' },
      { q: 'Kaip pagerinti miego kokybę?', a: 'Pagrindinės moksliniais įrodymais pagrįstos strategijos: laikykitės pastovaus grafiko (net savaitgaliais); palaikykite vėsią (18–20°C), tamsią ir tylią miegamąją; venkite ekranų 1 valandą prieš miegą (mėlyna šviesa slopina melatoniną); ribokite kofeiną po 14 val.; venkite alkoholio vakare (jis fragmentuoja REM). Kognityvinė elgesio terapija nemigai (KET-N) yra veiksmingiausias ilgalaikis lėtinės nemigos gydymas.' },
      { q: 'Kaip miego poreikiai keičiasi su amžiumi?', a: 'Kūdikiams reikia 14–17 val.; mažiesiems 11–14; moksleiviams 9–11; paaugliams 8–10 val. (su biologiniu poslinkiu vėlesniam miegui — ne tinginystė). Suaugusiesiems — 7–9 val. Vyresnio amžiaus žmonėms (65+) vis dar reikia 7–8 val., tačiau dažnai miegas fragmentiškas. Įsitikinimas, kad su amžiumi reikia mažiau miegoti, yra mitas.' },
      { q: 'Kokie lėtinio miego trūkumo požymiai?', a: 'Požymiai: priklausomybė nuo žadintuvo; mieguistumas pasyvios veiklos metu; didelė priklausomybė nuo kofeino; sunkumai koncentruojantis; dirglumas; dažnos ligos; užmigimas per kelias minutes (norma — 10–20 min; užmigimas per mažiau nei 5 min rodo didelį miego skolą).' },
    ],
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/sleep', m);
}

export default async function SleepPage({ params }: Props) {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const c = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: m.h1,
    description: m.description,
    url: `https://utilixi.com/${locale}/calculator/sleep`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((faq) => ({
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
        <h1 className={styles.page__title}>{m.h1}</h1>
        {m.subtitle && <p className={styles.page__subtitle}>{m.subtitle}</p>}
        <ToolActions />
        <SleepCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {c.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <RelatedTools locale={locale} tools={related} />
          <section className={styles.faq}>
            <h2 className={styles.faq__title}>{c.faqTitle}</h2>
            <div className={styles.faq__list}>
              {c.faqs.map((f, i) => (
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

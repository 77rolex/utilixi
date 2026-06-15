import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import HeartRateCalculator from './HeartRateCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/bmi', label: 'BMI Calculator' }, { href: '/calculator/calories', label: 'Calorie Calculator' }, { href: '/calculator/biological-age', label: 'Biological Age Calculator' }, { href: '/calculator/ideal-weight', label: 'Ideal Weight Calculator' }, { href: '/calculator/body-fat', label: 'Body Fat Calculator' }],
  ru: [{ href: '/calculator/bmi', label: 'Калькулятор ИМТ' }, { href: '/calculator/calories', label: 'Калькулятор калорий' }, { href: '/calculator/biological-age', label: 'Калькулятор биологического возраста' }, { href: '/calculator/ideal-weight', label: 'Калькулятор идеального веса' }, { href: '/calculator/body-fat', label: 'Калькулятор жира' }],
  uk: [{ href: '/calculator/bmi', label: 'Калькулятор ІМТ' }, { href: '/calculator/calories', label: 'Калькулятор калорій' }, { href: '/calculator/biological-age', label: 'Калькулятор біологічного віку' }, { href: '/calculator/ideal-weight', label: 'Калькулятор ідеальної ваги' }, { href: '/calculator/body-fat', label: 'Калькулятор жиру' }],
  fr: [{ href: '/calculator/bmi', label: 'Calculatrice IMC' }, { href: '/calculator/calories', label: 'Calculatrice de calories' }, { href: '/calculator/biological-age', label: 'Calculateur d\'âge biologique' }, { href: '/calculator/ideal-weight', label: 'Poids Idéal' }, { href: '/calculator/body-fat', label: 'Calculatrice de graisse corporelle' }],
  lt: [{ href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }, { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas' }, { href: '/calculator/biological-age', label: 'Biologinio amžiaus skaičiuotuvas' }, { href: '/calculator/ideal-weight', label: 'Idealaus svorio skaičiuotuvas' }, { href: '/calculator/body-fat', label: 'Kūno riebalų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Heart Rate Zones Calculator — Zone 2, MAF & 5 Training Zones by Age',
    description: 'Free heart rate zones calculator. Calculate your Zone 2, MAF heart rate, and all 5 training zones by age using the 220−age and Karvonen formulas. Instant results — no registration required.',
    h1: 'Heart Rate Zones Calculator',
    subtitle: 'Calculate your 5 training heart rate zones, Zone 2, and MAF heart rate by age and resting heart rate.',
  },
  ru: {
    title: 'Калькулятор пульсовых зон — Зона 2 и 5 тренировочных зон по возрасту',
    description: 'Бесплатный калькулятор пульсовых зон онлайн. Рассчитайте зону 2, МАФ-пульс и все 5 зон тренировки по возрасту и пульсу покоя по формуле 220−возраст и методу Карвонена.',
    h1: 'Калькулятор пульсовых зон',
    subtitle: 'Рассчитайте 5 пульсовых зон, зону 2 и МАФ-пульс по возрасту и пульсу покоя.',
  },
  uk: {
    title: 'Калькулятор пульсових зон — Зона 2 і 5 тренувальних зон за віком',
    description: 'Безкоштовний калькулятор пульсових зон онлайн. Розрахуйте зону 2, МАФ-пульс і всі 5 зон тренування за віком і пульсом спокою за формулою 220−вік і методом Карвонена.',
    h1: 'Калькулятор пульсових зон',
    subtitle: 'Розрахуйте 5 пульсових зон, зону 2 та МАФ-пульс за віком та пульсом спокою.',
  },
  fr: {
    title: 'Calculatrice Zones Fréquence Cardiaque — Zone 2, MAF & 5 Zones',
    description: 'Calculatrice gratuite des zones de fréquence cardiaque. Calculez votre Zone 2, fréquence MAF et les 5 zones d\'entraînement selon votre âge, avec les formules 220−âge et Karvonen.',
    h1: 'Calculatrice des zones de fréquence cardiaque',
    subtitle: 'Calculez vos 5 zones de fréquence cardiaque, Zone 2 et MAF selon votre âge et pouls de repos.',
  },
  lt: {
    title: 'Pulso Zonų Skaičiuotuvas — 2 zona, MAF ir 5 Treniruočių zonos',
    description: 'Nemokamas pulso zonų skaičiuotuvas. Apskaičiuokite 2 zoną, MAF pulsą ir visas 5 treniruočių zonas pagal amžių, naudodami 220−amžius ir Karvonenų formules.',
    h1: 'Pulso zonų skaičiuotuvas',
    subtitle: 'Apskaičiuokite 5 pulso zonas, 2 zoną ir MAF pulsą pagal amžių ir ramybės pulsą.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This free heart rate zones calculator finds your 5 training zones based on your age and optional resting heart rate. Maximum heart rate is estimated using the standard 220−age formula; enter your resting heart rate to switch to the more accurate Karvonen method, which personalises zones to your cardiovascular fitness level. Zones range from Zone 1 (light recovery, 50–60% max HR) to Zone 5 (maximum effort, 90–100% max HR).\n\nZone 2 training (60–70% max HR) is the cornerstone of endurance and longevity fitness — it builds aerobic base, improves fat oxidation, and increases mitochondrial density without accumulating significant fatigue. The MAF (Maximum Aerobic Function) method by Dr. Phil Maffetone sets your optimal aerobic ceiling at 180 minus your age — a practical upper boundary for Zone 2 work. Elite endurance coaches typically recommend 70–80% of weekly training volume in Zone 2.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What are the 5 heart rate training zones?', a: 'Zone 1 (50–60% max HR): very light — warm-up, cool-down, and active recovery. Zone 2 (60–70%): light aerobic — fat-burning, base endurance, mitochondrial development. Zone 3 (70–80%): moderate — sustained aerobic effort, "comfortably hard". Zone 4 (80–90%): hard — lactate threshold, high-intensity intervals. Zone 5 (90–100%): maximum — peak power, sprint efforts, can only be sustained for seconds to a few minutes.' },
      { q: 'What is Zone 2 heart rate training?', a: 'Zone 2 training is aerobic exercise at 60–70% of your maximum heart rate — a pace where you can hold a conversation but feel like you\'re working. It is the most researched training zone for long-term health and endurance performance. Benefits of regular Zone 2 training include: increased mitochondrial density (cellular energy production), improved fat oxidation (using fat as primary fuel), enhanced cardiovascular efficiency, and lower resting heart rate. Most endurance coaches (including Peter Attia, Phil Maffetone, Stephen Seiler) recommend 70–80% of total weekly training time in Zone 2.' },
      { q: 'What is the MAF heart rate method?', a: 'MAF (Maximum Aerobic Function) is a method developed by endurance coach Dr. Phil Maffetone to define your optimal aerobic training heart rate. The MAF formula is simply 180 minus your age. For a 35-year-old: MAF HR = 180 − 35 = 145 bpm. This is an upper ceiling for fully aerobic training — staying below it ensures you develop fat-burning capacity and avoid over-reaching. Adjustments: subtract 5 if you are recovering from illness or overtraining; add 5 if you are a highly trained athlete with several years of consistent training.' },
      { q: 'How is maximum heart rate calculated?', a: 'The most common formula is 220 − age. For a 35-year-old: max HR = 220 − 35 = 185 bpm. A more precise alternative is the Tanaka formula: 208 − (0.7 × age), which gives slightly higher values for older adults. For example, at age 50: standard formula gives 170 bpm, Tanaka gives 173 bpm. Neither formula is precise for individuals — actual max HR can vary by ±10–20 bpm from the estimate. The most accurate measurement is a laboratory maximal exercise test or a field test (e.g., all-out 1-mile run).' },
      { q: 'What is the Karvonen formula and why is it more accurate?', a: 'The Karvonen method calculates target training heart rate using your heart rate reserve (HRR = max HR − resting HR). Target HR = resting HR + (HRR × zone intensity%). Example for a 35-year-old with a resting HR of 55 bpm: max HR = 185, HRR = 130. Zone 2 (60–70%): 55 + (130 × 0.60) to 55 + (130 × 0.70) = 133–146 bpm. The Karvonen method is more accurate than the simple percentage-of-max because it accounts for your individual cardiovascular fitness — a trained athlete with a low resting HR gets higher zone targets than an untrained person of the same age.' },
      { q: 'What is the best heart rate zone for fat burning?', a: 'Zone 2 (60–70% max HR) is the primary fat-burning zone — at this intensity, fat provides ~60–70% of total energy. However, Zone 3–4 burns more total calories per hour even though a lower percentage comes from fat. For sustained fat loss and metabolic health, Zone 2 training is superior long-term: it increases fat-oxidation capacity, improves insulin sensitivity, and can be sustained for long durations without excessive recovery needs. Most people aiming for body composition improvement benefit from 3–5 Zone 2 sessions per week of 45–90 minutes.' },
      { q: 'What is the difference between Zone 2 and Zone 3 training?', a: 'Zone 2 (60–70% max HR) feels easy to moderate — you can speak in full sentences, breathing is elevated but controlled, and you could sustain the effort for 1–3+ hours. Zone 3 (70–80% max HR) is "comfortably hard" — talking becomes difficult, you can speak in short phrases, and the effort is sustainable for 30–90 minutes. Zone 3 crosses into carbohydrate-dominant metabolism and begins accumulating lactate. Many amateur athletes train too often in Zone 3, which research calls the "moderate intensity trap" — generating fatigue without the aerobic adaptations of Zone 2 or the performance benefits of Zone 4–5.' },
      { q: 'How do I measure my resting heart rate?', a: 'Measure your resting HR first thing in the morning before getting out of bed — ideally after lying still for 5 minutes after waking. Count your pulse at your wrist or neck for 60 seconds (or 30 seconds × 2). Average adult resting HR: 60–80 bpm. Trained endurance athletes: 40–60 bpm. Elite cyclists and runners: sometimes 28–40 bpm. A resting HR above 100 bpm (tachycardia) or below 40 bpm in a non-athlete warrants a medical check. Smartwatches and heart rate monitors measure resting HR automatically — useful for tracking trends over weeks and months.' },
      { q: 'How many sessions per week should I train in each zone?', a: 'The "polarised training" model — supported by research from Dr. Stephen Seiler — recommends: 70–80% of sessions in Zone 1–2 (easy aerobic), 5–10% in Zone 3 (moderate), and 15–20% in Zone 4–5 (high intensity). For a typical recreational athlete training 5 days/week: 3–4 sessions in Zone 2 (long easy runs, cycling, swimming), 1 session with Zone 4–5 intervals, 0–1 moderate Zone 3 session. Many amateur athletes invert this pyramid — training too hard on easy days and too easy on hard days — reducing the benefit of both.' },
      { q: 'How accurate is this heart rate zones calculator?', a: 'This calculator provides zone estimates based on age-predicted maximum heart rate (220−age or Karvonen formula). Individual accuracy varies: the 220−age formula has a standard deviation of ±10–12 bpm, meaning a 35-year-old\'s actual max HR could be anywhere from 163–207 bpm. The Karvonen method improves accuracy by using your actual resting HR. For the most precise zones, consider a lactate threshold test or VO2 max test with a sports physiologist, or use a heart rate monitor with a dedicated maximal field test protocol.' },
    ],
  },
  ru: {
    description: 'Бесплатный калькулятор пульсовых зон рассчитывает 5 тренировочных зон на основе возраста и, при желании, пульса в покое. Максимальная ЧСС определяется по формуле 220−возраст; введите пульс покоя для использования более точного метода Карвонена, учитывающего вашу индивидуальную физическую форму. Зоны варьируются от зоны 1 (лёгкое восстановление, 50–60% МЧСС) до зоны 5 (максимальное усилие, 90–100%).\n\nТренировки в зоне 2 (60–70% от МЧСС) — основа выносливости и долголетия. Они развивают аэробную базу, улучшают жиросжигание и увеличивают плотность митохондрий без накопления значительной усталости. МАФ-метод (Maximum Aerobic Function) доктора Фила Маффетона задаёт оптимальный потолок аэробной тренировки как 180 минус возраст. Ведущие тренеры рекомендуют 70–80% еженедельного объёма тренировок проводить именно в зоне 2.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое 5 пульсовых зон тренировки?', a: 'Зона 1 (50–60% МЧСС): очень лёгкая — разминка, заминка, восстановление. Зона 2 (60–70%): лёгкая аэробная — жиросжигание, базовая выносливость, развитие митохондрий. Зона 3 (70–80%): умеренная — «комфортно тяжело», устойчивая аэробная нагрузка. Зона 4 (80–90%): тяжёлая — лактатный порог, интервальные тренировки. Зона 5 (90–100%): максимальная — пиковая мощность, спринт, можно поддерживать лишь секунды или несколько минут.' },
      { q: 'Что такое тренировки в зоне 2 (зона 2 пульс)?', a: 'Тренировки в зоне 2 — это аэробные упражнения при 60–70% от максимального пульса. Это темп, при котором можно вести разговор, но ощущается нагрузка. Главные преимущества: увеличение плотности митохондрий, улучшение жирового обмена, повышение сердечно-сосудистой эффективности и снижение пульса покоя. Большинство тренеров по выносливости (Питер Аттиа, Фил Маффетон, Стивен Сейлер) рекомендуют 70–80% недельного тренировочного времени именно в зоне 2.' },
      { q: 'Что такое МАФ-метод (метод Маффетона)?', a: 'МАФ (Maximum Aerobic Function, Максимальная аэробная функция) — метод тренера Фила Маффетона для определения оптимального аэробного пульса. Формула МАФ: 180 минус возраст. Для 35-летнего: 180 − 35 = 145 уд/мин. Это потолок полностью аэробной тренировки. Корректировки: минус 5, если вы восстанавливаетесь после болезни или перетренированности; плюс 5, если тренируетесь планомерно несколько лет без травм.' },
      { q: 'Как рассчитывается максимальная ЧСС?', a: 'Наиболее распространённая формула: 220 − возраст. Для 35-летнего: 220 − 35 = 185 уд/мин. Более точная формула Танака: 208 − (0,7 × возраст). Для 50-летнего: стандартная даёт 170, Танака — 173 уд/мин. Ни одна формула не точна для конкретного человека — реальная МЧСС может отличаться на ±10–20 уд/мин. Точнее всего измерить МЧСС в лаборатории или на поле (максимальный тест).' },
      { q: 'Что такое формула Карвонена и почему она точнее?', a: 'Метод Карвонена рассчитывает целевую ЧСС через резерв пульса (РП = МЧСС − пульс покоя). Целевая ЧСС = пульс покоя + (РП × интенсивность%). Пример для 35-летнего с пульсом покоя 55 уд/мин: МЧСС = 185, РП = 130. Зона 2 (60–70%): 55 + (130×0,6) до 55 + (130×0,7) = 133–146 уд/мин. Метод Карвонена точнее потому, что учитывает вашу физическую форму через пульс покоя.' },
      { q: 'Какая зона лучше всего для сжигания жира?', a: 'Зона 2 (60–70% МЧСС) является основной зоной жиросжигания — при этой интенсивности жир обеспечивает 60–70% общей энергии. Однако зоны 3–4 сжигают больше калорий в час. Для долгосрочного похудения и метаболического здоровья зона 2 более эффективна: она развивает способность к жиросжиганию, повышает чувствительность к инсулину и не вызывает усталости, которая мешала бы регулярным тренировкам.' },
      { q: 'Чем отличается зона 2 от зоны 3?', a: 'Зона 2 (60–70% МЧСС) ощущается как лёгкая-умеренная нагрузка — можно говорить полными предложениями, дыхание учащено, но ровное, усилие можно поддерживать 1–3+ часа. Зона 3 (70–80%) — «комфортно тяжело»: говорить сложно, только короткие фразы, нагрузка держится 30–90 минут. В зоне 3 начинается углеводный метаболизм и накопление лактата. Многие любители тренируются слишком часто в зоне 3 — исследователи называют это «ловушкой умеренной интенсивности».' },
      { q: 'Как измерить пульс в покое?', a: 'Измеряйте пульс покоя утром, сразу после пробуждения, ещё лёжа в постели — после 5 минут неподвижности. Считайте пульс на запястье или шее 60 секунд. Норма взрослого: 60–80 уд/мин. Тренированные спортсмены: 40–60 уд/мин. Элитные бегуны и велосипедисты: иногда 28–40 уд/мин. Умные часы измеряют пульс покоя автоматически — удобно отслеживать динамику.' },
      { q: 'Сколько раз в неделю тренироваться в каждой зоне?', a: 'Модель поляризованных тренировок (доктор Стивен Сейлер) рекомендует: 70–80% объёма в зонах 1–2 (лёгкая аэробика), 5–10% в зоне 3, 15–20% в зонах 4–5 (высокая интенсивность). При 5 тренировках в неделю: 3–4 тренировки в зоне 2 (длинный бег, велосипед, плавание), 1 интервальная тренировка (зоны 4–5), 0–1 умеренная (зона 3). Большинство любителей тренируются слишком тяжело в лёгкие дни — снижая пользу от обоих типов тренировок.' },
      { q: 'Насколько точен этот калькулятор пульсовых зон?', a: 'Калькулятор даёт оценку на основе прогнозируемой по возрасту максимальной ЧСС (220−возраст или метод Карвонена). Точность у разных людей варьируется: стандартное отклонение формулы 220−возраст составляет ±10–12 уд/мин. Метод Карвонена точнее за счёт учёта пульса покоя. Для наиболее точных зон рассмотрите тест на лактатный порог или VO2max у спортивного физиолога.' },
    ],
  },
  uk: {
    description: 'Безкоштовний калькулятор пульсових зон розраховує 5 тренувальних зон на основі віку та, за бажанням, пульсу в спокої. Максимальна ЧСС визначається за формулою 220−вік; введіть пульс спокою для використання точнішого методу Карвонена, який враховує вашу індивідуальну фізичну форму. Зони варіюються від зони 1 (легке відновлення, 50–60% МЧСС) до зони 5 (максимальне зусилля, 90–100%).\n\nТренування в зоні 2 (60–70% від МЧСС) — основа витривалості та довголіття. Вони розвивають аеробну базу, покращують жироспалювання і збільшують щільність мітохондрій без накопичення значної втоми. МАФ-метод (Maximum Aerobic Function) доктора Філа Маффетона задає оптимальну стелю аеробного тренування як 180 мінус вік. Провідні тренери рекомендують 70–80% тижневого обсягу тренувань проводити саме в зоні 2.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке 5 пульсових зон тренування?', a: 'Зона 1 (50–60% МЧСС): дуже легка — розминка, заминка, відновлення. Зона 2 (60–70%): легка аеробна — жироспалювання, базова витривалість, розвиток мітохондрій. Зона 3 (70–80%): помірна — «комфортно важко», стала аеробна нагрузка. Зона 4 (80–90%): важка — лактатний поріг, інтервальні тренування. Зона 5 (90–100%): максимальна — пікова потужність, спринт, можна підтримувати лише секунди або кілька хвилин.' },
      { q: 'Що таке тренування в зоні 2 пульсу?', a: 'Тренування в зоні 2 — це аеробні вправи при 60–70% від максимального пульсу. Це темп, при якому можна вести розмову, але відчувається навантаження. Головні переваги: збільшення щільності мітохондрій, поліпшення жирового обміну, підвищення серцево-судинної ефективності і зниження пульсу спокою. Більшість тренерів з витривалості рекомендують 70–80% тижневого тренувального часу в зоні 2.' },
      { q: 'Що таке МАФ-метод (метод Маффетона)?', a: 'МАФ (Maximum Aerobic Function) — метод тренера Філа Маффетона для визначення оптимального аеробного пульсу. Формула МАФ: 180 мінус вік. Для 35-річного: 180 − 35 = 145 уд/хв. Це стеля повністю аеробного тренування. Корекції: мінус 5, якщо ви відновлюєтеся після хвороби або перетренованості; плюс 5, якщо тренуєтеся планомірно кілька років без травм.' },
      { q: 'Як розраховується максимальна ЧСС?', a: 'Найпоширеніша формула: 220 − вік. Для 35-річного: 185 уд/хв. Більш точна формула Танака: 208 − (0,7 × вік). Жодна формула не є точною для конкретної людини — реальна МЧСС може відрізнятися на ±10–20 уд/хв. Точніше виміряти МЧСС можна в лабораторії або під час максимального польового тесту.' },
      { q: 'Що таке формула Карвонена і чому вона точніша?', a: 'Метод Карвонена розраховує цільову ЧСС через резерв пульсу (РП = МЧСС − пульс спокою). Цільова ЧСС = пульс спокою + (РП × інтенсивність%). Метод Карвонена точніший тому, що враховує вашу фізичну форму через пульс спокою — тренована людина з низьким пульсом спокою отримує вищі цільові зони, ніж нетренована того ж віку.' },
      { q: 'Яка зона найкраще підходить для жироспалювання?', a: 'Зона 2 (60–70% МЧСС) є основною зоною жироспалювання — при цій інтенсивності жир забезпечує 60–70% загальної енергії. Однак зони 3–4 спалюють більше калорій на годину. Для довгострокового схуднення та метаболічного здоров\'я зона 2 ефективніша: вона розвиває здатність до жироспалювання, підвищує чутливість до інсуліну і не накопичує втому.' },
      { q: 'Чим відрізняється зона 2 від зони 3?', a: 'Зона 2 (60–70% МЧСС) відчувається як легка-помірна — можна говорити повними реченнями, дихання прискорене, але рівне, навантаження можна підтримувати 1–3+ години. Зона 3 (70–80%) — «комфортно важко»: говорити важко, лише короткі фрази, навантаження тримається 30–90 хвилин. Багато любителів тренуються надто часто в зоні 3 — дослідники називають це «пасткою помірної інтенсивності».' },
      { q: 'Як виміряти пульс у спокої?', a: 'Вимірюйте пульс спокою вранці, одразу після пробудження, ще лежачи в ліжку. Підраховуйте пульс на зап\'ясті або шиї 60 секунд. Норма дорослого: 60–80 уд/хв. Тренованих спортсменів: 40–60 уд/хв. Розумні годинники вимірюють пульс спокою автоматично — зручно відстежувати динаміку.' },
      { q: 'Скільки разів на тиждень тренуватися в кожній зоні?', a: 'Модель поляризованих тренувань (доктор Стівен Сейлер) рекомендує: 70–80% обсягу в зонах 1–2, 5–10% в зоні 3, 15–20% в зонах 4–5. При 5 тренуваннях на тиждень: 3–4 тренування в зоні 2 (довгий біг, велосипед), 1 інтервальне тренування (зони 4–5), 0–1 помірне (зона 3). Більшість любителів тренуються надто важко у легкі дні — знижуючи користь від обох типів тренувань.' },
      { q: 'Наскільки точний цей калькулятор пульсових зон?', a: 'Калькулятор дає оцінку на основі прогнозованої за віком максимальної ЧСС (220−вік або метод Карвонена). Точність для різних людей варіюється: стандартне відхилення формули 220−вік становить ±10–12 уд/хв. Метод Карвонена точніший завдяки врахуванню пульсу спокою. Для найбільш точних зон розгляньте тест на лактатний поріг або VO2max у спортивного фізіолога.' },
    ],
  },
  fr: {
    description: 'Cette calculatrice gratuite des zones de fréquence cardiaque détermine vos 5 zones d\'entraînement selon votre âge et, en option, votre FC de repos. La FC maximale est estimée par la formule standard 220−âge ; entrez votre FC de repos pour utiliser la méthode de Karvonen, plus précise car elle tient compte de votre condition cardiovasculaire individuelle. Les zones vont de la Zone 1 (récupération légère, 50–60% FC max) à la Zone 5 (effort maximal, 90–100%).\n\nL\'entraînement en Zone 2 (60–70% FC max) est la clé de l\'endurance et de la longévité : il développe la base aérobie, améliore l\'oxydation des graisses et augmente la densité mitochondriale sans accumuler de fatigue significative. La méthode MAF (Maximum Aerobic Function) du Dr Phil Maffetone fixe le plafond aérobie optimal à 180 moins l\'âge. Les meilleurs entraîneurs d\'endurance recommandent 70–80% du volume hebdomadaire en Zone 2.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quelles sont les 5 zones de fréquence cardiaque ?', a: 'Zone 1 (50–60% FC max) : très légère — échauffement, récupération active. Zone 2 (60–70%) : aérobie légère — combustion des graisses, endurance de base, développement mitochondrial. Zone 3 (70–80%) : modérée — effort aérobie soutenu, "confortablement difficile". Zone 4 (80–90%) : intensive — seuil lactique, intervalles à haute intensité. Zone 5 (90–100%) : maximale — puissance de pointe, sprint, soutenable seulement quelques secondes à minutes.' },
      { q: 'Qu\'est-ce que l\'entraînement en Zone 2 ?', a: 'L\'entraînement en Zone 2 est un exercice aérobie à 60–70% de la FC maximale — un rythme où vous pouvez parler en phrases complètes mais sentez que vous travaillez. Bénéfices principaux : augmentation de la densité mitochondriale, amélioration de l\'oxydation des graisses, meilleure efficacité cardiovasculaire, réduction de la FC de repos. Les entraîneurs d\'endurance (Peter Attia, Phil Maffetone, Stephen Seiler) recommandent 70–80% du volume d\'entraînement hebdomadaire en Zone 2.' },
      { q: 'Qu\'est-ce que la méthode MAF ?', a: 'La méthode MAF (Maximum Aerobic Function) a été développée par le Dr Phil Maffetone pour définir le plafond optimal de l\'entraînement aérobie. Formule MAF : 180 − âge. Pour une personne de 35 ans : FC MAF = 145 bpm. Ajustements : soustrayez 5 si vous récupérez d\'une maladie ou d\'un surentraînement ; ajoutez 5 si vous êtes un athlète expérimenté avec plusieurs années d\'entraînement régulier sans blessures.' },
      { q: 'Comment calcule-t-on la fréquence cardiaque maximale ?', a: 'La formule la plus courante est 220 − âge. Pour 35 ans : FC max = 185 bpm. La formule de Tanaka (208 − 0,7 × âge) est légèrement plus précise pour les personnes de plus de 40 ans. Aucune formule n\'est exacte pour un individu — la FC max réelle peut varier de ±10–20 bpm. La mesure la plus précise est un test d\'effort maximal en laboratoire ou sur le terrain.' },
      { q: 'Qu\'est-ce que la méthode de Karvonen et pourquoi est-elle plus précise ?', a: 'La méthode de Karvonen utilise la réserve de FC (RCF = FC max − FC repos). FC cible = FC repos + (RCF × intensité%). Exemple pour 35 ans avec FC repos 55 bpm : FC max = 185, RCF = 130. Zone 2 (60–70%) : 55 + (130×0,60) à 55 + (130×0,70) = 133–146 bpm. Elle est plus précise car elle intègre votre condition cardiovasculaire via la FC de repos.' },
      { q: 'Quelle zone est la meilleure pour brûler les graisses ?', a: 'La Zone 2 (60–70% FC max) est la zone de combustion des graisses principale — les lipides fournissent 60–70% de l\'énergie à cette intensité. Cependant, les Zones 3–4 brûlent plus de calories totales par heure. Pour la perte de poids durable et la santé métabolique, la Zone 2 est supérieure : elle développe la capacité d\'oxydation des graisses, améliore la sensibilité à l\'insuline et peut être maintenue longtemps sans surmenage.' },
      { q: 'Quelle est la différence entre Zone 2 et Zone 3 ?', a: 'Zone 2 (60–70% FC max) : confortable, vous pouvez parler normalement, effort soutenu 1–3+ heures. Zone 3 (70–80%) : "confortablement difficile", parler en phrases courtes devient difficile, effort soutenu 30–90 minutes. La Zone 3 bascule vers le métabolisme des glucides et commence à accumuler du lactate. Beaucoup d\'amateurs tombent dans le "piège de l\'intensité modérée" en s\'entraînant trop souvent en Zone 3.' },
      { q: 'Comment mesurer sa fréquence cardiaque de repos ?', a: 'Mesurez votre FC de repos le matin, avant de vous lever, après 5 minutes d\'immobilité. Comptez votre pouls au poignet ou au cou pendant 60 secondes. FC de repos normale chez un adulte : 60–80 bpm. Athlètes entraînés : 40–60 bpm. Les montres connectées et cardiofréquencemètres mesurent automatiquement la FC de repos — utile pour suivre les tendances sur les semaines et mois.' },
      { q: 'Combien de séances par semaine dans chaque zone ?', a: 'Le modèle d\'entraînement polarisé (Dr Stephen Seiler) recommande : 70–80% du volume en Zones 1–2 (aérobie facile), 5–10% en Zone 3, 15–20% en Zones 4–5 (haute intensité). Pour 5 entraînements/semaine : 3–4 séances en Zone 2 (longues sorties course, vélo, natation), 1 séance d\'intervalles (Zones 4–5), 0–1 séance modérée (Zone 3). La plupart des amateurs s\'entraînent trop fort les jours faciles — réduisant le bénéfice des deux types d\'entraînement.' },
      { q: 'Quelle est la précision de cette calculatrice des zones cardiaques ?', a: 'La calculatrice fournit des estimations de zones basées sur la FC maximale prédite par l\'âge (220−âge ou méthode Karvonen). La précision individuelle varie : la formule 220−âge a un écart-type de ±10–12 bpm. La méthode Karvonen améliore la précision en utilisant votre FC de repos réelle. Pour des zones très précises, consultez un physiologiste du sport pour un test de seuil lactique ou de VO2max.' },
    ],
  },
  lt: {
    description: 'Nemokamas pulso zonų skaičiuotuvas nustato jūsų 5 treniruočių zonas pagal amžių ir neprivalomą ramybės pulsą. Maksimalus pulsas apskaičiuojamas pagal standartinę formulę 220−amžius; įveskite ramybės pulsą, kad būtų naudojamas tikslesnis Karvonenų metodas, atsižvelgiantis į jūsų individualų širdies ir kraujagyslių pajėgumą. Zonos svyruoja nuo 1 zonos (lengvas atsigavimas, 50–60% maks. pulso) iki 5 zonos (maksimalios pastangos, 90–100%).\n\n2 zonos treniruotės (60–70% maks. pulso) yra ištvermės ir ilgaamžiškumo pagrindas — jos ugdo aerobinę bazę, gerina riebalų oksidaciją ir didina mitochondrijų tankį be didelės nuovargio kaupimo. Dr. Philo Maffetone MAF (Maximum Aerobic Function) metodas nustato optimalų aerobinės treniruotės lubas kaip 180 minus amžius. Pirmaujantys ištvermės treneriai rekomenduoja 70–80% savaitinio treniruočių kiekio atlikti 2 zonoje.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kokios yra 5 treniruočių pulso zonos?', a: '1 zona (50–60% maks. pulso): labai lengva — atšilimas, atvėsinimas, aktyvus atsigavimas. 2 zona (60–70%): lengva aerobinė — riebalų deginimas, bazinė ištvermė, mitochondrijų vystymas. 3 zona (70–80%): vidutinė — stabili aerobinė pastanga, "patogiai sunkiai". 4 zona (80–90%): sunki — laktato slenkstis, intensyvūs intervalai. 5 zona (90–100%): maksimali — didžiausia galia, sprintas, galima išlaikyti tik kelias sekundes ar minutes.' },
      { q: 'Kas yra 2 zonos pulso treniruotės?', a: '2 zonos treniruotės — tai aerobiniai pratimai 60–70% maksimalaus pulso intensyvumu. Tai tempas, kai galite kalbėti pilnais sakiniais, bet jaučiate apkrovą. Pagrindiniai privalumai: padidėjęs mitochondrijų tankis, pagerėjusi riebalų oksidacija, padidėjęs širdies ir kraujagyslių efektyvumas ir sumažėjęs ramybės pulsas. Dauguma ištvermės trenerių rekomenduoja 70–80% savaitinio treniruočių laiko 2 zonoje.' },
      { q: 'Kas yra MAF metodas?', a: 'MAF (Maximum Aerobic Function) — trenerio Dr. Philo Maffetone metodas optimaliam aerobiniam pulsui nustatyti. MAF formulė: 180 minus amžius. 35 metų žmogui: 180 − 35 = 145 k/min. Tai visiškai aerobinės treniruotės lubos. Koregavimai: atimkite 5, jei atsigaunate nuo ligos ar pertrenėjimo; pridėkite 5, jei esate patyręs sportininkas su keliais metais reguliarių treniruočių be traumų.' },
      { q: 'Kaip apskaičiuojamas maksimalus pulsas?', a: 'Labiausiai paplitusi formulė: 220 minus amžius. 35 metų žmogui: 185 k/min. Tikslesnė Tanakos formulė: 208 − (0,7 × amžius). Jokia formulė nėra tiksli konkrečiam žmogui — tikrasis maks. pulsas gali skirtis ±10–20 k/min. Tiksliau jį išmatuoti laboratorijoje arba maksimalaus lauko testo metu.' },
      { q: 'Kas yra Karvonenų formulė ir kodėl ji tikslesnė?', a: 'Karvonenų metodas apskaičiuoja tikslinį pulsą naudojant pulso rezervą (PR = maks. pulsas − ramybės pulsas). Tikslinė zona = ramybės pulsas + (PR × intensyvumas%). Metodas tiklesnis, nes atsižvelgia į jūsų fizinę formą per ramybės pulsą — treniruotas žmogus su žemu ramybės pulsu gauna aukštesnes tikslines zonas nei netreniruotas to paties amžiaus.' },
      { q: 'Kuri zona geriausia riebalų deginimui?', a: '2 zona (60–70% maks. pulso) yra pagrindinė riebalų deginimo zona — šiuo intensyvumu riebalai suteikia 60–70% visos energijos. Tačiau 3–4 zonos degina daugiau kalorijų per valandą. Ilgalaikiam svorio metimui ir metabolinei sveikatai 2 zona efektyvesnė: ji ugdo riebalų oksidacijos gebėjimą, gerina jautrumą insulinui ir nesukelia nuovargio, kuris trukdytų reguliarioms treniruotėms.' },
      { q: 'Kuo skiriasi 2 zona nuo 3 zonos?', a: '2 zona (60–70% maks. pulso): lengva-vidutinė, galima kalbėti pilnais sakiniais, kvėpavimas pagreitėjęs bet tolygus, pastangą galima palaikyti 1–3+ valandas. 3 zona (70–80%): "patogiai sunkiai", sunku kalbėti pilnais sakiniais, pastangą galima palaikyti 30–90 minučių. Daugelis mėgėjų treniruojasi per dažnai 3 zonoje — tyrėjai tai vadina "vidutinio intensyvumo spąstais".' },
      { q: 'Kaip išmatuoti ramybės pulsą?', a: 'Matuokite ramybės pulsą ryte, prieš atsikeldami iš lovos, po 5 minučių nejudrumo. Skaičiuokite pulsą ant riešo ar kaklo 60 sekundžių. Suaugusiojo norma: 60–80 k/min. Treniruotų sportininkų: 40–60 k/min. Išmanieji laikrodžiai matuoja ramybės pulsą automatiškai — patoga stebėti tendencijas.' },
      { q: 'Kiek kartų per savaitę treniruotis kiekvienoje zonoje?', a: 'Poliarizuotų treniruočių modelis (Dr. Stephenas Seileris) rekomenduoja: 70–80% apimties 1–2 zonose (lengva aerobika), 5–10% 3 zonoje, 15–20% 4–5 zonose (didelis intensyvumas). 5 treniruočių per savaitę atveju: 3–4 treniruotės 2 zonoje (ilgi bėgimai, dviratis, plaukimas), 1 intervalinė treniruotė (4–5 zonos), 0–1 vidutinė (3 zona). Dauguma mėgėjų treniruojasi per sunkiai lengvomis dienomis — mažindami abiejų tipų treniruočių naudą.' },
      { q: 'Kiek tikslus šis pulso zonų skaičiuotuvas?', a: 'Skaičiuotuvas pateikia zonų įvertinimus pagal amžiumi prognozuojamą maksimalų pulsą (220−amžius arba Karvonenų metodas). Individuali tikslumas skiriasi: 220−amžius formulės standartinis nuokrypis yra ±10–12 k/min. Karvonenų metodas tikslesnis, nes naudoja jūsų tikrąjį ramybės pulsą. Tiksliausioms zonoms kreipkitės į sporto fiziologą dėl laktato slenksčio ar VO2max testo.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/heart-rate', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HeartRatePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/heart-rate`,
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
        <RelatedTools locale={locale} tools={related} />
        <HeartRateCalculator locale={locale} />
        <AdInline locale={locale} />
        <DisclaimerNote locale={locale} />
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

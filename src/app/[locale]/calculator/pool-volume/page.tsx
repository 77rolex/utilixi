import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import PoolVolumeCalculator from './PoolVolumeCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/material-cost', label: 'Material Cost Calculator' },
    { href: '/calculator/renovation', label: 'Renovation Cost Calculator' },
    { href: '/calculator/electricity-bill', label: 'Electricity Bill Calculator' },
    { href: '/calculator/water-intake', label: 'Water Intake Calculator' },
    { href: '/calculator/ac-cost', label: 'AC & Heating Cost Calculator' },
  ],
  ru: [
    { href: '/calculator/material-cost', label: 'Калькулятор стоимости материалов' },
    { href: '/calculator/renovation', label: 'Калькулятор ремонта' },
    { href: '/calculator/electricity-bill', label: 'Калькулятор счёта за электричество' },
    { href: '/calculator/water-intake', label: 'Калькулятор нормы воды' },
    { href: '/calculator/ac-cost', label: 'Калькулятор кондиционера' },
  ],
  uk: [
    { href: '/calculator/material-cost', label: 'Калькулятор вартості матеріалів' },
    { href: '/calculator/renovation', label: 'Калькулятор ремонту' },
    { href: '/calculator/electricity-bill', label: 'Калькулятор рахунку за електроенергію' },
    { href: '/calculator/water-intake', label: 'Калькулятор норми води' },
    { href: '/calculator/ac-cost', label: 'Калькулятор кондиціонера' },
  ],
  fr: [
    { href: '/calculator/material-cost', label: 'Calculatrice Coût Matériaux' },
    { href: '/calculator/renovation', label: 'Calculatrice Rénovation' },
    { href: '/calculator/electricity-bill', label: 'Calculatrice Facture Électricité' },
    { href: '/calculator/water-intake', label: 'Calculatrice Hydratation' },
    { href: '/calculator/ac-cost', label: 'Calculatrice Climatiseur' },
  ],
  lt: [
    { href: '/calculator/material-cost', label: 'Medžiagų kainos skaičiuotuvas' },
    { href: '/calculator/renovation', label: 'Renovacijos skaičiuotuvas' },
    { href: '/calculator/electricity-bill', label: 'Elektros sąskaitos skaičiuotuvas' },
    { href: '/calculator/water-intake', label: 'Vandens normos skaičiuotuvas' },
    { href: '/calculator/ac-cost', label: 'Kondicionieriaus išlaidų skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Pool Volume Calculator — Litres, Gallons & Chemicals',
    description: 'Free swimming pool volume calculator. Calculate pool volume in m³, litres, and gallons for rectangular, round, oval, and freeform pools. Includes weekly chemical estimates.',
    h1: 'Pool Volume Calculator',
    subtitle: 'Calculate your pool water volume in m³, litres, and gallons for any shape — with weekly chemical estimates.',
  },
  ru: {
    title: 'Калькулятор объёма бассейна — литры, галлоны и химия',
    description: 'Бесплатный калькулятор объёма бассейна. Рассчитайте объём в м³, литрах и галлонах для прямоугольного, круглого, овального и произвольного бассейна. Включая дозировки химии.',
    h1: 'Калькулятор объёма бассейна',
    subtitle: 'Рассчитайте объём воды в бассейне в м³, литрах и галлонах для любой формы, с дозировками химии.',
  },
  uk: {
    title: 'Калькулятор об\'єму басейну — літри, галони та хімія',
    description: 'Безкоштовний калькулятор об\'єму басейну. Розрахуйте об\'єм у м³, літрах і галонах для прямокутного, круглого, овального та довільного басейну. Включаючи дозування хімії.',
    h1: 'Калькулятор об\'єму басейну',
    subtitle: 'Розрахуйте об\'єм води в басейні в м³, літрах і галонах для будь-якої форми, з дозуванням хімікатів.',
  },
  fr: {
    title: 'Calculatrice Volume Piscine — Litres, Gallons & Chimie',
    description: 'Calculatrice de volume de piscine gratuite. Calculez le volume en m³, litres et gallons pour les piscines rectangulaires, rondes, ovales et à forme libre. Inclut les estimations chimiques.',
    h1: 'Calculatrice Volume Piscine',
    subtitle: 'Calculez le volume d\'eau de votre piscine en m³, litres et gallons pour toute forme — avec estimations chimiques.',
  },
  lt: {
    title: 'Baseino Tūrio Skaičiuotuvas — Litrai, Galonai ir Chemija',
    description: 'Nemokamas baseino tūrio skaičiuotuvas. Apskaičiuokite baseino tūrį m³, litrais ir galonais stačiakampiems, apvaliems, ovaliems ir laisvos formos baseinams. Įskaitant cheminių medžiagų įvertinimus.',
    h1: 'Baseino Tūrio Skaičiuotuvas',
    subtitle: 'Apskaičiuokite baseino vandens tūrį m³, litrais ir galonais bet kokiai formai — su savaitinėmis cheminių medžiagų dozėmis.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our pool volume calculator helps you determine the exact water volume of any swimming pool — rectangular, round, oval, or freeform — in cubic metres, litres, and US gallons. Knowing your pool volume is essential for correct chemical dosing, pump sizing, and water heating calculations. Simply enter the pool dimensions and depth to instantly see all three volume measurements, plus estimated weekly chemical quantities.\n\nAccurate chemical dosing depends entirely on water volume. Under-dosing chlorine allows algae and bacteria to grow; over-dosing wastes money and can irritate swimmers. As a general rule, maintain free chlorine at 1–3 ppm, pH at 7.2–7.6, and alkalinity at 80–120 ppm. Weekly shock treatment (superchlorination) is recommended to oxidise organic compounds and prevent chloramine buildup. Always add chemicals to water, never water to chemicals, and wait at least 15 minutes between adding different products.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How do I calculate pool volume?', a: 'Rectangular pool: Volume = Length × Width × Average Depth. Round pool: Volume = π × r² × Depth (where r = radius). Oval pool: Volume = π/4 × Length × Width × Depth. Freeform: use 0.85 as a correction factor on the bounding rectangle. The calculator handles all these formulas automatically.' },
      { q: 'How much chlorine does my pool need per week?', a: 'A general guideline is 175g of granular chlorine per 10,000 litres per week for maintenance dosing. Adjust based on: sunlight exposure (UV destroys chlorine — use stabilised chlorine or add cyanuric acid), bather load (more swimmers = more organic matter), water temperature (higher temp = faster chlorine consumption), and rainfall (dilutes and disrupts balance).' },
      { q: 'What is the ideal pool pH?', a: 'Ideal pool pH is 7.2–7.6. Below 7.0: water becomes acidic, irritates eyes and skin, corrodes metal fittings, and degrades pool surfaces. Above 7.8: chlorine becomes ineffective (at pH 8.0, only 3% of chlorine is active vs 73% at pH 7.0), water becomes cloudy, scale builds up. Test pH at least twice per week.' },
      { q: 'How often should I shock my pool?', a: 'Shock treatment (superchlorination) should be done: weekly during summer, after heavy rain, after a pool party (>10 bathers), when water becomes cloudy, or when chlorine demand is unusually high. Use 3–5× the normal chlorine dose. Shock in the evening and wait 24 hours before swimming.' },
      { q: 'What is the difference between pool chlorine and shock?', a: 'Regular chlorine maintains a steady 1–3 ppm free chlorine level. Shock (superchlorination) temporarily raises chlorine to 10–20 ppm to break down combined chlorines (chloramines) and oxidise organic matter. Chloramines cause the characteristic "swimming pool smell" and eye irritation — they indicate insufficient sanitisation, not too much chlorine.' },
      { q: 'How long does it take to fill a pool?', a: 'Fill time = Volume ÷ Flow rate. A typical garden hose flows at 15–20 litres/minute. A 50,000-litre pool: 50,000 ÷ 17 = ~49 hours (2 days) with one hose. Filling from a municipal supply also incurs water costs — factor this into installation budgets (typical: €0.003–0.006/litre).' },
      { q: 'How do I winterise my pool?', a: 'Winterising steps: 1) Lower water level below skimmer; 2) Shock and algaecide dose; 3) Balance pH and alkalinity; 4) Drain pump, filter, and heater completely; 5) Add winter cover; 6) Check monthly. In climates below −10°C, drain all plumbing fully to prevent freeze damage. Proper winterisation prevents costly spring damage.' },
      { q: 'What is alkalinity and why does it matter?', a: 'Total alkalinity (TA) acts as a pH buffer — it prevents pH from swinging rapidly. Ideal range: 80–120 ppm. Low TA causes pH to fluctuate wildly ("pH bounce"). High TA makes pH difficult to adjust and can cause scale. Raise TA with sodium bicarbonate (baking soda); lower it with muriatic acid added slowly.' },
      { q: 'How does cyanuric acid stabilise chlorine?', a: 'Cyanuric acid (CYA or stabiliser/conditioner) protects chlorine from UV degradation. Without CYA, direct sunlight destroys 50–90% of chlorine in 2 hours. With CYA at 30–50 ppm, chlorine lasts 5–10× longer. However, high CYA (>80 ppm) reduces chlorine effectiveness — this is called "chlorine lock." Ideal CYA: 30–50 ppm.' },
      { q: 'How do I reduce pool water evaporation?', a: 'Pool covers (solar or liquid) are the most effective method — they reduce evaporation by 90–95%. An uncovered 50m² pool loses approximately 100–200 litres per day in summer. Windbreaks, trees providing morning shade (without dropping leaves), and lowering water temperature all help. Each 10°C reduction in water temperature reduces evaporation by ~40%.' },
      { q: 'What size pool pump do I need?', a: 'The pump should circulate the full pool volume in 6–8 hours. For a 50,000-litre pool: 50,000 ÷ 7h ÷ 60min = ~120 litres/minute (7.2 m³/h). Select a pump with flow rate of 120–150 L/min for this pool. Variable speed pumps reduce energy costs by 60–80% compared to single-speed models — highly recommended for pools used >3 months per year.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор объёма бассейна поможет определить точный объём воды в любом бассейне — прямоугольном, круглом, овальном или произвольной формы — в кубических метрах, литрах и галлонах. Знание объёма бассейна необходимо для правильного дозирования химии, выбора насоса и расчёта нагрева воды.\n\nТочное дозирование химии полностью зависит от объёма воды. Недостаток хлора позволяет размножаться водорослям и бактериям; избыток — пустая трата денег. Поддерживайте свободный хлор 1–3 ppm, pH 7,2–7,6, щёлочность 80–120 ppm. Еженедельная ударная хлорация окисляет органику и предотвращает образование хлораминов.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитать объём бассейна?', a: 'Прямоугольный: Объём = Длина × Ширина × Средняя глубина. Круглый: Объём = π × r² × Глубина. Овальный: Объём = π/4 × Длина × Ширина × Глубина. Произвольная форма: умножить на коэффициент 0,85. Калькулятор обрабатывает все формулы автоматически.' },
      { q: 'Сколько хлора нужно бассейну в неделю?', a: 'Ориентировочная дозировка: 175 г гранулированного хлора на 10 000 литров в неделю при обычном обслуживании. Корректируйте с учётом: освещённости (УФ разрушает хлор), нагрузки купающихся, температуры воды (выше = быстрее расход), осадков.' },
      { q: 'Каков идеальный pH бассейна?', a: 'Идеальный pH — 7,2–7,6. Ниже 7,0: вода разъедает кожу, глаза и металлические части. Выше 7,8: хлор теряет эффективность (при pH 8,0 активен только 3% хлора vs 73% при pH 7,0), вода мутнеет, образуется накипь. Проверяйте pH минимум дважды в неделю.' },
      { q: 'Как часто делать ударную хлорацию?', a: 'Ударная хлорация (суперхлорирование) рекомендована: еженедельно летом, после сильного дождя, после большого количества купающихся (10+), при помутнении воды. Используйте 3–5-кратную обычную дозу. Проводите вечером, не купаться 24 часа.' },
      { q: 'В чём разница между обычным хлором и ударной дозой?', a: 'Обычный хлор поддерживает уровень 1–3 ppm. Ударная доза временно поднимает до 10–20 ppm для разрушения хлораминов и окисления органики. Хлорамины — причина «запаха бассейна» и раздражения глаз: это сигнал о недостаточной дезинфекции, а не избытке хлора.' },
      { q: 'Сколько времени нужно на наполнение бассейна?', a: 'Время наполнения = Объём ÷ Расход воды. Обычный шланг: 15–20 л/мин. Бассейн 50 000 л: 50 000 ÷ 17 ≈ 49 часов (2 дня) одним шлангом. Учитывайте стоимость воды при планировании (обычно 0,03–0,08 руб./л).' },
      { q: 'Как консервировать бассейн на зиму?', a: 'Шаги консервации: понизить уровень воды ниже скиммера; ударная доза хлора и альгицида; сбалансировать pH; слить насос, фильтр и нагреватель; установить зимнее покрытие. В регионах с морозами ниже −10°C — полностью слить трубопроводы.' },
      { q: 'Что такое щёлочность воды и почему она важна?', a: 'Общая щёлочность (TA) стабилизирует pH. Идеал: 80–120 ppm. Низкая TA: pH нестабилен ("скачки pH"). Высокая TA: сложно регулировать pH, образуется накипь. Повышают: бикарбонат натрия; понижают: соляная кислота.' },
      { q: 'Как циануровая кислота стабилизирует хлор?', a: 'Циануровая кислота (CYA) защищает хлор от УФ-разрушения. Без CYA прямой солнечный свет уничтожает 50–90% хлора за 2 часа. При CYA 30–50 ppm хлор держится в 5–10 раз дольше. При CYA > 80 ppm хлор теряет эффективность ("хлорный замок"). Идеал: 30–50 ppm.' },
      { q: 'Как снизить испарение воды в бассейне?', a: 'Накрытие (солнечный или жидкий тент) снижает испарение на 90–95%. Открытый бассейн 50 м² теряет 100–200 л/день летом. Ветрозащита и снижение температуры воды также помогают.' },
      { q: 'Какой насос нужен для моего бассейна?', a: 'Насос должен перекачивать весь объём за 6–8 часов. Бассейн 50 000 л: 50 000 ÷ 7 ч ÷ 60 мин ≈ 120 л/мин. Выбирайте насос 120–150 л/мин. Насосы с переменной скоростью экономят 60–80% электроэнергии по сравнению с однооборотными.' },
    ],
  },
  uk: {
    description: 'Наш калькулятор об\'єму басейну допоможе визначити точний об\'єм води в будь-якому басейні — прямокутному, круглому, овальному або довільної форми — у кубічних метрах, літрах і галонах. Знання об\'єму басейну необхідне для правильного дозування хімії, вибору насосу і розрахунку нагріву води.\n\nТочне дозування хімії повністю залежить від об\'єму води. Нестача хлору дозволяє розмножуватися водоростям і бактеріям; надлишок — марна витрата грошей. Підтримуйте вільний хлор 1–3 ppm, pH 7,2–7,6, лужність 80–120 ppm.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розрахувати об\'єм басейну?', a: 'Прямокутний: Об\'єм = Довжина × Ширина × Середня глибина. Круглий: Об\'єм = π × r² × Глибина. Овальний: Об\'єм = π/4 × Довжина × Ширина × Глибина. Довільна форма: помножити на коефіцієнт 0,85.' },
      { q: 'Скільки хлору потрібно басейну на тиждень?', a: 'Орієнтовне дозування: 175 г гранульованого хлору на 10 000 літрів на тиждень. Коригуйте з урахуванням освітленості, навантаження купаючих, температури води та опадів.' },
      { q: 'Яким має бути ідеальний pH басейну?', a: 'Ідеальний pH — 7,2–7,6. Нижче 7,0: вода роз\'їдає шкіру, очі та металеві деталі. Вище 7,8: хлор втрачає ефективність, вода мутніє. Перевіряйте pH мінімум двічі на тиждень.' },
      { q: 'Як часто робити ударну хлорацію?', a: 'Ударна хлорація рекомендована: щотижня влітку, після сильного дощу, після великої кількості купаючихся (10+), при помутнінні води. Використовуйте 3–5-кратну звичайну дозу. Проводьте ввечері, не купатися 24 години.' },
      { q: 'У чому різниця між звичайним хлором та ударною дозою?', a: 'Звичайний хлор підтримує рівень 1–3 ppm. Ударна доза тимчасово піднімає до 10–20 ppm для руйнування хлорамінів та окислення органіки. Хлораміни — причина запаху та подразнення очей.' },
      { q: 'Скільки часу потрібно на наповнення басейну?', a: 'Час наповнення = Об\'єм ÷ Витрата води. Звичайний шланг: 15–20 л/хв. Басейн 50 000 л: ~49 годин (2 дні) одним шлангом.' },
      { q: 'Як консервувати басейн на зиму?', a: 'Кроки консервації: знизити рівень води нижче скімера; ударна доза хлору та альгіциду; збалансувати pH; злити насос, фільтр і нагрівач; встановити зимове покриття.' },
      { q: 'Що таке лужність і навіщо вона важлива?', a: 'Загальна лужність (TA) стабілізує pH. Ідеал: 80–120 ppm. Низька TA: pH нестабільний. Висока TA: складно регулювати pH, утворюється накип.' },
      { q: 'Як ціанурова кислота стабілізує хлор?', a: 'Ціанурова кислота (CYA) захищає хлор від УФ-руйнування. Без CYA пряме сонячне світло знищує 50–90% хлору за 2 години. При CYA 30–50 ppm хлор тримається в 5–10 разів довше. При CYA > 80 ppm хлор втрачає ефективність. Ідеал: 30–50 ppm.' },
      { q: 'Як знизити випаровування води в басейні?', a: 'Накриття (сонячний або рідкий тент) знижує випаровування на 90–95%. Відкритий басейн 50 м² втрачає 100–200 л/день влітку.' },
      { q: 'Який насос потрібен для мого басейну?', a: 'Насос повинен перекачувати весь об\'єм за 6–8 годин. Басейн 50 000 л: ~120 л/хв. Насоси зі змінною швидкістю економлять 60–80% електроенергії.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice de volume de piscine vous aide à déterminer le volume d\'eau exact de n\'importe quelle piscine — rectangulaire, ronde, ovale ou à forme libre — en mètres cubes, litres et gallons américains. Connaître le volume de votre piscine est essentiel pour le dosage correct des produits chimiques, le dimensionnement de la pompe et le calcul du chauffage.\n\nUn dosage chimique précis dépend entièrement du volume d\'eau. Maintenez le chlore libre entre 1 et 3 ppm, le pH entre 7,2 et 7,6, et l\'alcalinité entre 80 et 120 ppm. Un traitement choc hebdomadaire est recommandé pour oxyder les matières organiques et prévenir la formation de chloramines.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calculer le volume d\'une piscine ?', a: 'Rectangulaire : Volume = Longueur × Largeur × Profondeur moyenne. Ronde : Volume = π × r² × Profondeur. Ovale : Volume = π/4 × Longueur × Largeur × Profondeur. Forme libre : appliquer un facteur 0,85 sur le rectangle englobant.' },
      { q: 'Quelle quantité de chlore par semaine pour ma piscine ?', a: 'En règle générale : 175 g de chlore granulé pour 10 000 litres par semaine pour un entretien courant. Ajustez selon : l\'ensoleillement (les UV détruisent le chlore), la fréquentation, la température de l\'eau (plus chaude = consommation plus rapide), et les précipitations.' },
      { q: 'Quel est le pH idéal d\'une piscine ?', a: 'Le pH idéal est de 7,2 à 7,6. En dessous de 7,0 : eau acide, irritation des yeux et de la peau, corrosion. Au-dessus de 7,8 : le chlore devient inefficace (à pH 8,0, seulement 3 % du chlore est actif), eau trouble, entartrage. Testez le pH au moins deux fois par semaine.' },
      { q: 'À quelle fréquence faire un traitement choc ?', a: 'Le traitement choc est recommandé : chaque semaine en été, après une forte pluie, après une importante fréquentation (>10 baigneurs), quand l\'eau est trouble. Utilisez 3 à 5 fois la dose habituelle de chlore. Choquée le soir, attendez 24 h avant de se baigner.' },
      { q: 'Quelle est la différence entre chlore d\'entretien et traitement choc ?', a: 'Le chlore d\'entretien maintient un niveau de 1 à 3 ppm. Le traitement choc monte temporairement à 10–20 ppm pour décomposer les chloramines et oxyder les matières organiques. Les chloramines causent la « odeur de piscine » et les irritations — signe d\'une désinfection insuffisante.' },
      { q: 'Combien de temps pour remplir une piscine ?', a: 'Temps de remplissage = Volume ÷ Débit. Un tuyau de jardin coule à 15–20 L/min. Piscine 50 000 L : 50 000 ÷ 17 ≈ 49 heures (2 jours) avec un tuyau. N\'oubliez pas le coût de l\'eau (environ 0,003–0,006 €/L).' },
      { q: 'Comment hiverner sa piscine ?', a: 'Étapes d\'hivernage : abaisser le niveau d\'eau sous le skimmer ; traitement choc + algicide ; équilibrer pH et alcalinité ; vidanger la pompe, le filtre et le réchauffeur ; installer la bâche hivernale. En région très froide (< −10 °C), vidanger entièrement la plomberie.' },
      { q: 'Qu\'est-ce que l\'alcalinité et pourquoi est-elle importante ?', a: 'L\'alcalinité totale (TA) stabilise le pH. Idéal : 80–120 ppm. TA faible : pH instable. TA élevée : pH difficile à ajuster, entartrage. Augmentez avec du bicarbonate de soude ; réduisez avec de l\'acide muriatique ajouté lentement.' },
      { q: 'Comment l\'acide cyanurique stabilise-t-il le chlore ?', a: 'L\'acide cyanurique (CYA) protège le chlore des UV. Sans CYA, le soleil détruit 50–90 % du chlore en 2 heures. Avec CYA à 30–50 ppm, le chlore dure 5 à 10 fois plus longtemps. Au-delà de 80 ppm : effet de blocage du chlore. Idéal : 30–50 ppm.' },
      { q: 'Comment réduire l\'évaporation de l\'eau de piscine ?', a: 'Les bâches (solaires ou liquides) réduisent l\'évaporation de 90–95 %. Une piscine non couverte de 50 m² perd environ 100–200 L/jour en été. Des brise-vent et une température d\'eau plus basse aident également.' },
      { q: 'Quelle pompe pour ma piscine ?', a: 'La pompe doit traiter le volume total en 6 à 8 heures. Piscine 50 000 L : 50 000 ÷ 7 h ÷ 60 min ≈ 120 L/min. Choisissez une pompe de 120 à 150 L/min. Les pompes à vitesse variable réduisent la consommation électrique de 60–80 %.' },
    ],
  },
  lt: {
    description: 'Mūsų baseino tūrio skaičiuotuvas padeda nustatyti tikslų vandens tūrį bet kuriame baseine — stačiakampame, apvaliame, ovaliame ar laisvos formos — kubiniais metrais, litrais ir JAV galonais. Baseino tūrio žinojimas būtinas tinkamam cheminių medžiagų dozavimui, siurblio parinkimui ir vandens šildymo skaičiavimams.\n\nTikslus cheminis dozavimas visiškai priklauso nuo vandens tūrio. Palaikykite laisvą chlorą 1–3 ppm, pH 7,2–7,6, šarmingumą 80–120 ppm. Savaitinis smūginis gydymas rekomenduojamas organinių medžiagų oksiduoti ir chloraminų formavimuisi išvengti.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuoti baseino tūrį?', a: 'Stačiakampis: Tūris = Ilgis × Plotis × Vidutinis gylis. Apvalus: Tūris = π × r² × Gylis. Ovalus: Tūris = π/4 × Ilgis × Plotis × Gylis. Laisvos formos: padauginkite iš 0,85 koeficiento.' },
      { q: 'Kiek chloro baseinui reikia per savaitę?', a: 'Orientyras: 175 g granuliuoto chloro 10 000 litrų per savaitę. Koreguokite atsižvelgdami į įsauliavimą, maudymosi intensyvumą, vandens temperatūrą ir kritulių kiekį.' },
      { q: 'Koks idealus baseino pH?', a: 'Idealus pH — 7,2–7,6. Žemiau 7,0: vanduo trikdo akis ir odą, ardo metalines dalis. Aukščiau 7,8: chloras tampa neefektyvus, vanduo drumsčiasi. Tikrinkite pH bent du kartus per savaitę.' },
      { q: 'Kaip dažnai atlikti smūginį gydymą?', a: 'Smūginis gydymas rekomenduojamas: kas savaitę vasarą, po stipraus lietaus, po didelės apkrovos (10+ maudytojų), kai vanduo drumsčiasi. Naudokite 3–5 kartus didesnę dozę. Atlikite vakare, nelaukite plaukioti 24 val.' },
      { q: 'Koks skirtumas tarp įprasto chloro ir smūginės dozės?', a: 'Įprastas chloras palaiko 1–3 ppm lygį. Smūginė dozė laikinai pakelia iki 10–20 ppm chloraminams suardyti. Chloraminai sukelia „baseino kvapą" ir akių dirginimą.' },
      { q: 'Kiek laiko užima baseino užpildymas?', a: 'Užpildymo laikas = Tūris ÷ Debitas. Įprastas sodinis žarnas: 15–20 L/min. 50 000 L baseinui: ~49 valandos (2 dienos) vienu žarnu.' },
      { q: 'Kaip paruošti baseiną žiemai?', a: 'Žiemavimo žingsniai: nuleisti vandens lygį žemiau sraigtelės; smūginė chloro dozė ir algicidas; subalansuoti pH; ištuštinti siurblį, filtrą ir šildytuvą; uždengti žieminiu uždangalu.' },
      { q: 'Kas yra šarmingumas ir kodėl jis svarbus?', a: 'Bendras šarmingumas (TA) stabilizuoja pH. Idealus: 80–120 ppm. Žemas TA: nestabilus pH. Aukštas TA: sunkiai reguliuojamas pH, susidaro nuosėdos. Didinkite natrio bikarbonatu; mažinkite druskos rūgštimi.' },
      { q: 'Kaip cianurinė rūgštis stabilizuoja chlorą?', a: 'Cianurinė rūgštis (CYA) apsaugo chlorą nuo UV. Be CYA saulė sunaikina 50–90% chloro per 2 valandas. Esant CYA 30–50 ppm, chloras išlaiko aktyvumą 5–10 kartų ilgiau. CYA > 80 ppm — chloro blokavimas. Idealus: 30–50 ppm.' },
      { q: 'Kaip sumažinti baseino vandens garavimą?', a: 'Dangčiai (saulės ar skystieji) sumažina garavimą 90–95%. Neuždengtas 50 m² baseinas praranda ~100–200 L/dieną vasarą.' },
      { q: 'Kokio siurblio reikia mano baseinui?', a: 'Siurblys turi perpumpuoti visą tūrį per 6–8 valandas. 50 000 L baseinui: ~120 L/min. Kintamo greičio siurbliai sumažina elektros sąnaudas 60–80%.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/pool-volume', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PoolVolumePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/pool-volume`,
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
        <PoolVolumeCalculator locale={locale} />
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

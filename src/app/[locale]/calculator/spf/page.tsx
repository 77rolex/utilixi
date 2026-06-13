import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import SpfCalculator from './SpfCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/biological-age', label: 'Biological Age Calculator' },
    { href: '/calculator/bmi', label: 'BMI Calculator' },
    { href: '/calculator/water-intake', label: 'Water Intake Calculator' },
    { href: '/calculator/heart-rate', label: 'Heart Rate Calculator' },
    { href: '/calculator/stress-level', label: 'Stress Level Calculator' },
  ],
  ru: [
    { href: '/calculator/biological-age', label: 'Калькулятор биологического возраста' },
    { href: '/calculator/bmi', label: 'Калькулятор ИМТ' },
    { href: '/calculator/water-intake', label: 'Калькулятор нормы воды' },
    { href: '/calculator/heart-rate', label: 'Калькулятор пульса' },
    { href: '/calculator/stress-level', label: 'Калькулятор стресса' },
  ],
  uk: [
    { href: '/calculator/biological-age', label: 'Калькулятор біологічного віку' },
    { href: '/calculator/bmi', label: 'Калькулятор ІМТ' },
    { href: '/calculator/water-intake', label: 'Калькулятор норми води' },
    { href: '/calculator/heart-rate', label: 'Калькулятор пульсу' },
    { href: '/calculator/stress-level', label: 'Калькулятор стресу' },
  ],
  fr: [
    { href: '/calculator/biological-age', label: 'Calculatrice Âge Biologique' },
    { href: '/calculator/bmi', label: 'Calculatrice IMC' },
    { href: '/calculator/water-intake', label: 'Calculatrice Hydratation' },
    { href: '/calculator/heart-rate', label: 'Calculatrice Fréquence Cardiaque' },
    { href: '/calculator/stress-level', label: 'Calculatrice Stress' },
  ],
  lt: [
    { href: '/calculator/biological-age', label: 'Biologinio amžiaus skaičiuotuvas' },
    { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' },
    { href: '/calculator/water-intake', label: 'Vandens normos skaičiuotuvas' },
    { href: '/calculator/heart-rate', label: 'Širdies ritmo skaičiuotuvas' },
    { href: '/calculator/stress-level', label: 'Streso lygio skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'SPF Calculator — Sun Protection Time by Skin Type',
    description: 'Free SPF calculator. Calculate how long your sunscreen protects you based on your skin type (Fitzpatrick scale), SPF value, UV index, and activity. With sun safety tips.',
    h1: 'SPF Calculator',
  },
  ru: {
    title: 'Калькулятор SPF — время защиты по типу кожи',
    description: 'Бесплатный калькулятор SPF. Рассчитайте, сколько времени вас защищает солнцезащитный крем по типу кожи (шкала Фицпатрика), SPF, индексу УФ и активности.',
    h1: 'Калькулятор SPF',
  },
  uk: {
    title: 'Калькулятор SPF — час захисту за типом шкіри',
    description: 'Безкоштовний калькулятор SPF. Розрахуйте, скільки часу захищає сонцезахисний крем за типом шкіри (шкала Фіцпатріка), SPF, індексом УФ та активністю.',
    h1: 'Калькулятор SPF',
  },
  fr: {
    title: 'Calculatrice SPF — Durée de Protection par Type de Peau',
    description: 'Calculatrice SPF gratuite. Calculez la durée de protection de votre crème solaire selon votre type de peau (Échelle de Fitzpatrick), l\'indice SPF, l\'indice UV et l\'activité.',
    h1: 'Calculatrice SPF',
  },
  lt: {
    title: 'SPF Skaičiuotuvas — Apsaugos Laikas pagal Odos Tipą',
    description: 'Nemokamas SPF skaičiuotuvas. Apskaičiuokite, kiek laiko apsaugos jūsų saulės kremas pagal odos tipą (Fitzpatrick skalė), SPF vertę, UV indeksą ir veiklą.',
    h1: 'SPF Skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our SPF calculator estimates how long your sunscreen will protect you from sunburn based on four factors: your skin type (Fitzpatrick scale I–VI), your chosen SPF value, the current UV index, and your activity type. The result shows the maximum protected time before reapplication is needed, with a hard cap at 4 hours since UV exposure accumulates and no sunscreen lasts indefinitely.\n\nSunscreen is one of the most evidence-based skin cancer prevention tools available. Daily use of SPF 15 or higher reduces the risk of developing melanoma by 50% and squamous cell carcinoma by 40% according to longitudinal studies. However, sunscreen alone is not sufficient — UV protection also requires seeking shade during peak hours (10am–4pm), wearing protective clothing (UPF-rated fabrics block 97.5% of UV), and using polarised sunglasses that block UV.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What does SPF number mean?', a: 'SPF (Sun Protection Factor) indicates how much longer you can stay in the sun before getting a sunburn compared to unprotected skin. SPF 30 means it takes 30× longer to burn. In practice: if your unprotected skin burns in 10 minutes, SPF 30 provides about 300 minutes of theoretical protection. However, real-world protection is lower due to incomplete coverage and sweating.' },
      { q: 'What is the Fitzpatrick skin type scale?', a: 'The Fitzpatrick scale categorises skin into 6 types based on melanin content and UV sensitivity: Type I (very fair, always burns, never tans), Type II (fair, usually burns, sometimes tans), Type III (medium, sometimes burns, gradually tans), Type IV (olive, rarely burns, tans easily), Type V (brown, very rarely burns, tans deeply), Type VI (dark, almost never burns). Lower types need higher SPF.' },
      { q: 'Does SPF 100 provide twice the protection of SPF 50?', a: 'No — the difference is much smaller than the numbers suggest. SPF 50 blocks 98% of UVB rays; SPF 100 blocks 99%. The 1% difference means SPF 100 allows through only half as many UV rays as SPF 50 — but both block more than 98%. For daily use, SPF 30–50 is considered adequate; SPF 50+ is recommended for fair skin, long outdoor exposure, and high UV environments.' },
      { q: 'What is UV index and how does it affect sunscreen needs?', a: 'UV index (UVI) measures ultraviolet radiation intensity: 1–2 = low; 3–5 = moderate; 6–7 = high; 8–10 = very high; 11+ = extreme. At UVI 6+, unprotected fair skin can burn in 10–15 minutes. The WHO recommends SPF 30+ at UVI 3+, SPF 50+ at UVI 6+. UV index peaks at solar noon and is highest in summer, at altitude, near snow/sand/water (reflection).' },
      { q: 'How much sunscreen should I apply?', a: 'The standard dose is 2 mg/cm² of skin surface. In practice, this means: face and neck — 1 teaspoon (5ml); full body adult — 35–40ml (about 6–7 teaspoons or approximately one-quarter of a 150ml bottle). Most people apply only 25–50% of the recommended amount, significantly reducing actual protection. Applying too little is the most common sunscreen mistake.' },
      { q: 'Does sunscreen expire?', a: 'Yes. Sunscreen has a shelf life of 2–3 years from manufacture. After expiry, UV-filtering compounds degrade and protection is reduced. Store sunscreen below 25°C and away from direct sunlight. Sunscreen left in a hot car (60–80°C) can degrade significantly within days. Check the expiry date on the bottle — an "open jar" symbol with a number (e.g., 12M) indicates months after opening.' },
      { q: 'Is sunscreen safe for children?', a: 'For children under 6 months: avoid sunscreen — protect with clothing, hats, and shade instead. Over 6 months: use SPF 30+ broad-spectrum sunscreen. Mineral sunscreens (zinc oxide, titanium dioxide) are preferred for children as they sit on the surface of skin rather than being absorbed. Avoid sunscreens with oxybenzone or retinyl palmitate in children.' },
      { q: 'What is broad-spectrum sunscreen?', a: 'Broad-spectrum means protection against both UVA and UVB rays. UVB causes sunburn and most skin cancers. UVA (longer wavelength) penetrates deeper, causing premature skin ageing and contributing to melanoma. The SPF number only measures UVB protection. Always choose "broad-spectrum" sunscreens, which have passed additional UVA protection testing.' },
      { q: 'Does sunscreen prevent vitamin D production?', a: 'Regular sunscreen use does slightly reduce vitamin D synthesis, but not as much as feared. Studies show that even regular sunscreen users produce sufficient vitamin D because: application is rarely complete (uncovered areas still produce D), and brief incidental sun exposure (10–15 min on arms/face daily) provides adequate synthesis. Vitamin D deficiency is better addressed through diet and supplements than by skipping sun protection.' },
      { q: 'What is water-resistant sunscreen?', a: 'Water-resistant sunscreen maintains efficacy for 40 minutes in water (standard) or 80 minutes (very water resistant). After this time, or after towelling off, reapplication is essential. No sunscreen is "waterproof" — this claim was banned in many countries. For swimming and water sports, use SPF 50+ with very water-resistant formula and reapply after exiting the water.' },
      { q: 'Can I use last year\'s leftover sunscreen?', a: 'Check the expiry date first. If within date, the sunscreen should still be effective if stored properly (cool, dark place). If it has separated, become watery, developed a strange smell, or changed colour, discard it — the formula has degraded. As a practical rule: buy a new bottle at the start of each sun season rather than relying on opened bottles from previous years.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор SPF оценивает, как долго солнцезащитный крем защищает вас от солнечного ожога, исходя из четырёх факторов: тип кожи (шкала Фицпатрика I–VI), выбранный SPF, текущий индекс УФ и вид активности. Результат показывает максимальное время защиты до повторного нанесения (не более 4 часов).\n\nСолнцезащитный крем — одно из наиболее научно доказанных средств профилактики рака кожи. Ежедневное использование SPF 15+ снижает риск развития меланомы на 50% и плоскоклеточного рака кожи на 40%. Однако только крема недостаточно: нужно также избегать солнца в часы пик (10:00–16:00), носить защитную одежду и солнечные очки с УФ-фильтром.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что означает цифра SPF?', a: 'SPF (фактор защиты от солнца) показывает, во сколько раз дольше можно находиться на солнце без ожога по сравнению с незащищённой кожей. SPF 30 означает: если кожа без крема сгорает за 10 минут, с SPF 30 — за 300 минут. На практике реальная защита ниже из-за неполного нанесения и потения.' },
      { q: 'Что такое шкала Фицпатрика?', a: 'Шкала Фицпатрика классифицирует кожу по 6 типам: I — очень светлая, всегда горит; II — светлая, обычно горит; III — средняя, иногда горит; IV — смуглая, редко горит; V — тёмная, почти не горит; VI — очень тёмная, не горит. Тип I–II требует максимальной защиты.' },
      { q: 'SPF 100 защищает вдвое лучше SPF 50?', a: 'Нет. SPF 50 блокирует 98% УФ-В; SPF 100 — 99%. Разница в 1% означает, что SPF 100 пропускает вдвое меньше лучей, чем SPF 50 — но оба блокируют более 98%. Для ежедневного применения SPF 30–50 достаточен; SPF 50+ рекомендован при светлой коже и длительном пребывании на открытом воздухе.' },
      { q: 'Что такое индекс УФ?', a: 'УФ-индекс измеряет интенсивность ультрафиолетового излучения: 1–2 = низкий; 3–5 = умеренный; 6–7 = высокий; 8–10 = очень высокий; 11+ = экстремальный. При УФ 6+ незащищённая светлая кожа может сгореть за 10–15 минут. ВОЗ рекомендует SPF 30+ при УФ-индексе ≥3.' },
      { q: 'Сколько крема нужно наносить?', a: 'Стандартная дозировка — 2 мг/см² кожи. На практике: лицо и шея — 1 чайная ложка (5 мл); всё тело взрослого — 35–40 мл (~7 чайных ложек). Большинство людей наносят лишь 25–50% нормы, существенно снижая реальную защиту.' },
      { q: 'Есть ли у солнцезащитного крема срок годности?', a: 'Да. Срок годности — 2–3 года с даты производства. После истечения срока УФ-фильтры деградируют. Хранить при температуре ниже 25°C, вдали от прямых солнечных лучей. Крем в раскалённой машине деградирует за несколько дней.' },
      { q: 'Безопасен ли крем с SPF для детей?', a: 'До 6 месяцев: только одежда, шапки и тень. После 6 месяцев: SPF 30+ широкого спектра. Для детей предпочтительны минеральные экраны (оксид цинка, диоксид титана) — они остаются на поверхности, а не всасываются.' },
      { q: 'Что такое защита широкого спектра?', a: 'Широкий спектр означает защиту как от УФ-В (ожог, рак кожи), так и от УФ-А (старение, меланома). Значение SPF показывает только УФ-В-защиту. Всегда выбирайте крем с пометкой «широкий спектр».' },
      { q: 'Снижает ли крем с SPF выработку витамина D?', a: 'Немного снижает, но не так сильно, как принято считать. Даже регулярные пользователи вырабатывают достаточно витамина D за счёт незащищённых участков кожи и кратких солнечных воздействий. Дефицит D лучше восполнять диетой и добавками, а не отказом от защиты.' },
      { q: 'Что такое водостойкий крем?', a: '«Водостойкий» — сохраняет защиту 40 минут в воде; «очень водостойкий» — 80 минут. После этого или вытирания нужно нанести повторно. Понятия «водонепроницаемый» не существует — это запрещённое маркетинговое заявление.' },
      { q: 'Можно ли использовать прошлогодний крем?', a: 'Проверьте срок годности. Если не истёк и хранился правильно — можно. Если расслоился, стал жидким, изменил запах или цвет — выбросьте. Лучшее правило: покупать новый флакон в начале каждого сезона.' },
    ],
  },
  uk: {
    description: 'Наш калькулятор SPF оцінює, як довго сонцезахисний крем захищає вас від сонячного опіку, виходячи з чотирьох факторів: тип шкіри (шкала Фіцпатріка I–VI), обраний SPF, поточний індекс УФ і вид активності. Результат показує максимальний час захисту до повторного нанесення (не більше 4 годин).\n\nСонцезахисний крем — один з науково доведених засобів профілактики раку шкіри. Щоденне використання SPF 15+ знижує ризик розвитку меланоми на 50%. Проте лише крему недостатньо: уникайте сонця у години пік (10:00–16:00), носіть захисний одяг і окуляри з УФ-фільтром.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що означає цифра SPF?', a: 'SPF (фактор захисту від сонця) показує, у скільки разів довше можна перебувати на сонці без опіку порівняно з незахищеною шкірою. SPF 30 означає: якщо шкіра без крему горить за 10 хвилин, то з SPF 30 — за 300 хвилин.' },
      { q: 'Що таке шкала Фіцпатріка?', a: 'Шкала Фіцпатріка класифікує шкіру за 6 типами: I — дуже світла, завжди горить; II — світла, зазвичай горить; III — середня, іноді горить; IV — смаглява, рідко горить; V — темна, майже не горить; VI — дуже темна, не горить.' },
      { q: 'SPF 100 захищає вдвічі краще за SPF 50?', a: 'Ні. SPF 50 блокує 98% УФ-В; SPF 100 — 99%. Різниця в 1% означає, що SPF 100 пропускає вдвічі менше променів, ніж SPF 50 — але обидва блокують понад 98%.' },
      { q: 'Що таке індекс УФ?', a: 'УФ-індекс вимірює інтенсивність ультрафіолетового випромінювання: 1–2 = низький; 3–5 = помірний; 6–7 = високий; 8–10 = дуже високий; 11+ = екстремальний. При УФ 6+ незахищена світла шкіра може згоріти за 10–15 хвилин.' },
      { q: 'Скільки крему потрібно наносити?', a: 'Стандартне дозування — 2 мг/см² шкіри. На практиці: обличчя і шия — 1 чайна ложка (5 мл); все тіло дорослого — 35–40 мл. Більшість людей наносять лише 25–50% норми.' },
      { q: 'Чи є у сонцезахисного крему термін придатності?', a: 'Так. Термін придатності — 2–3 роки. Після закінчення терміну УФ-фільтри деградують. Зберігати при температурі нижче 25°C, подалі від прямих сонячних променів.' },
      { q: 'Чи безпечний крем з SPF для дітей?', a: 'До 6 місяців: лише одяг, головні убори і тінь. Після 6 місяців: SPF 30+ широкого спектру. Для дітей кращі мінеральні екрани (оксид цинку, диоксид титану).' },
      { q: 'Що таке захист широкого спектру?', a: 'Широкий спектр означає захист від УФ-В (опік, рак шкіри) і УФ-А (старіння, меланома). Значення SPF показує лише УФ-В-захист. Завжди обирайте крем з позначкою «широкий спектр».' },
      { q: 'Чи знижує крем з SPF вироблення вітаміну D?', a: 'Незначно знижує, але не так сильно, як прийнято вважати. Навіть регулярні користувачі виробляють достатньо вітаміну D. Дефіцит D краще заповнювати дієтою та добавками.' },
      { q: 'Що таке водостійкий крем?', a: '«Водостійкий» зберігає захист 40 хвилин у воді; «дуже водостійкий» — 80 хвилин. Після цього або витирання потрібно нанести повторно.' },
      { q: 'Чи можна використовувати торішній крем?', a: 'Перевірте термін придатності. Якщо не закінчився і зберігався правильно — можна. Якщо розшарувався, змінив запах або колір — викиньте. Краще правило: купувати новий флакон на початку кожного сезону.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice SPF estime combien de temps votre crème solaire vous protège contre les coups de soleil en fonction de quatre facteurs : votre type de peau (Échelle de Fitzpatrick I–VI), l\'indice SPF choisi, l\'indice UV actuel et le type d\'activité. Le résultat indique le temps de protection maximum avant de devoir réappliquer (limité à 4 heures).\n\nLa crème solaire est l\'un des outils de prévention du cancer cutané les mieux documentés. L\'utilisation quotidienne d\'un SPF 15 ou plus réduit le risque de mélanome de 50 % et de carcinome épidermoïde de 40 %. Mais la crème seule ne suffit pas : il faut aussi chercher l\'ombre aux heures de pointe (10h–16h), porter des vêtements protecteurs et des lunettes filtrant les UV.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Que signifie le chiffre SPF ?', a: 'Le SPF (Sun Protection Factor) indique combien de temps plus longtemps vous pouvez rester au soleil sans brûler par rapport à une peau non protégée. SPF 30 signifie : si votre peau brûle en 10 minutes sans protection, SPF 30 offre environ 300 minutes de protection théorique. En pratique, la protection réelle est moindre en raison d\'une application incomplète et de la transpiration.' },
      { q: 'Qu\'est-ce que l\'Échelle de Fitzpatrick ?', a: 'L\'Échelle de Fitzpatrick classe les peaux en 6 types : Type I (très claire, brûle toujours, ne bronze jamais), Type II (claire, brûle souvent), Type III (moyenne, brûle parfois), Type IV (mate, brûle rarement), Type V (foncée, brûle très rarement), Type VI (très foncée, ne brûle presque jamais). Les types plus clairs nécessitent un SPF plus élevé.' },
      { q: 'Le SPF 100 protège-t-il deux fois mieux que le SPF 50 ?', a: 'Non. Le SPF 50 bloque 98 % des UVB ; le SPF 100 en bloque 99 %. La différence de 1 % signifie que SPF 100 laisse passer deux fois moins de rayons que SPF 50, mais les deux bloquent plus de 98 %. Pour un usage quotidien, SPF 30–50 est considéré comme suffisant.' },
      { q: 'Qu\'est-ce que l\'indice UV ?', a: 'L\'indice UV mesure l\'intensité du rayonnement ultraviolet : 1–2 = faible ; 3–5 = modéré ; 6–7 = élevé ; 8–10 = très élevé ; 11+ = extrême. À IUV 6+, une peau claire non protégée peut brûler en 10–15 minutes. L\'OMS recommande SPF 30+ à partir de IUV 3.' },
      { q: 'Quelle quantité de crème solaire appliquer ?', a: 'La dose standard est de 2 mg/cm² de peau. En pratique : visage et cou — 1 cuillère à café (5 ml) ; corps entier adulte — 35–40 ml (environ 7 cuillères à café). La plupart des gens n\'appliquent que 25 à 50 % de la quantité recommandée, réduisant considérablement la protection réelle.' },
      { q: 'La crème solaire a-t-elle une date de péremption ?', a: 'Oui. Sa durée de vie est de 2 à 3 ans. Après péremption, les filtres UV se dégradent. Conservez-la à moins de 25 °C, à l\'abri du soleil. Une crème laissée dans une voiture chaude peut se dégrader en quelques jours.' },
      { q: 'La crème solaire est-elle sûre pour les enfants ?', a: 'Moins de 6 mois : évitez la crème solaire — utilisez vêtements, chapeaux et ombre. Plus de 6 mois : utilisez SPF 30+ à large spectre. Les crèmes minérales (oxyde de zinc, dioxyde de titane) sont préférées pour les enfants.' },
      { q: 'Qu\'est-ce qu\'une protection à large spectre ?', a: 'Large spectre signifie protection contre les UVA et les UVB. Les UVB causent les coups de soleil et la plupart des cancers cutanés. Les UVA (longueur d\'onde plus longue) pénètrent plus profondément, causant le vieillissement prématuré. Le SPF mesure seulement la protection UVB. Choisissez toujours "large spectre".' },
      { q: 'La crème solaire empêche-t-elle la synthèse de vitamine D ?', a: 'Légèrement, mais moins qu\'on ne le craignait. Même les utilisateurs réguliers produisent suffisamment de vitamine D grâce aux zones non couvertes et aux expositions brèves. La carence en D est mieux corrigée par l\'alimentation et les compléments.' },
      { q: 'Qu\'est-ce qu\'une crème solaire résistante à l\'eau ?', a: '« Résistante à l\'eau » maintient son efficacité 40 minutes dans l\'eau ; « très résistante » 80 minutes. Après ce délai ou après s\'être essuyé, il faut réappliquer. Aucune crème n\'est imperméable — cette mention est interdite dans de nombreux pays.' },
      { q: 'Puis-je utiliser la crème solaire de l\'année dernière ?', a: 'Vérifiez d\'abord la date de péremption. Si elle est valide et que la crème a été correctement conservée, elle devrait être efficace. Si elle s\'est séparée, est devenue liquide, sent bizarre ou a changé de couleur, jetez-la.' },
    ],
  },
  lt: {
    description: 'Mūsų SPF skaičiuotuvas įvertina, kiek laiko jūsų saulės kremas apsaugo nuo nudegimo, atsižvelgdamas į keturis veiksnius: odos tipas (Fitzpatrick skalė I–VI), pasirinkta SPF vertė, dabartinis UV indeksas ir veiklos tipas. Rezultatas rodo maksimalų apsaugos laiką iki pakartotinio tepimo (ne daugiau kaip 4 valandos).\n\nSaulės kremas yra viena geriausiai moksliškai pagrįstų odos vėžio prevencijos priemonių. Kasdienis SPF 15+ naudojimas sumažina melanomos riziką 50%. Tačiau vien kremo nepakanka: taip pat reikia ieškoti šešėlio piko valandomis (10:00–16:00), dėvėti apsauginius drabužius ir akinius su UV filtru.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Ką reiškia SPF skaičius?', a: 'SPF (Saulės apsaugos faktorius) nurodo, kiek ilgiau galima būti saulėje nenudegus, palyginti su neapsaugota oda. SPF 30 reiškia: jei neapsaugota oda nudega per 10 min, su SPF 30 — per 300 min.' },
      { q: 'Kas yra Fitzpatrick skalė?', a: 'Fitzpatrick skalė klasifikuoja odą į 6 tipus: I — labai šviesi, visada dega; II — šviesi, dažnai dega; III — vidutinė, kartais dega; IV — tamsesnė, retai dega; V — tamsi, labai retai dega; VI — labai tamsi, beveik nedega.' },
      { q: 'Ar SPF 100 apsaugo dvigubai geriau nei SPF 50?', a: 'Ne. SPF 50 blokuoja 98% UVB; SPF 100 — 99%. 1% skirtumas reiškia, kad SPF 100 praleidžia dvigubai mažiau spindulių nei SPF 50 — tačiau abu blokuoja daugiau nei 98%.' },
      { q: 'Kas yra UV indeksas?', a: 'UV indeksas matuoja ultravioletinės spinduliuotės intensyvumą: 1–2 = žemas; 3–5 = vidutinis; 6–7 = aukštas; 8–10 = labai aukštas; 11+ = itin aukštas. Esant UVI 6+, neapsaugota šviesi oda gali nudegti per 10–15 min.' },
      { q: 'Kiek kremazlio reikia tepti?', a: 'Standartinė dozė — 2 mg/cm² odos. Praktiškai: veidas ir kaklas — 1 arbatinis šaukštelis (5 ml); visas suaugusiojo kūnas — 35–40 ml. Dauguma žmonių tepasi tik 25–50% rekomenduojamo kiekio.' },
      { q: 'Ar saulės kremas turi galiojimo datą?', a: 'Taip. Tinkamumo laikas — 2–3 metai. Po šio laiko UV filtrai degraduoja. Laikykite žemiau 25°C, toli nuo tiesioginės saulės.' },
      { q: 'Ar saulės kremas saugus vaikams?', a: 'Iki 6 mėnesių: tik drabužiai, kepurės ir šešėlis. Po 6 mėnesių: SPF 30+ plačiojo spektro. Vaikams geriau mineraliniai ekranai (cinko oksidas, titano dioksidas).' },
      { q: 'Kas yra plačiojo spektro apsauga?', a: 'Plačiojo spektro reiškia apsaugą nuo UVB (nudegimas, odos vėžys) ir UVA (senėjimas, melanoma). SPF skaičius matuoja tik UVB apsaugą. Visada rinkitės kremus su „plačiojo spektro" žyme.' },
      { q: 'Ar saulės kremas sumažina vitamino D sintezę?', a: 'Šiek tiek sumažina, bet mažiau nei manoma. Net reguliariai tepantys susigamina pakankamai vitamino D. Vitamino D trūkumą geriau kompensuoti mityba ir papildais.' },
      { q: 'Kas yra vandeniui atsparus kremas?', a: '„Atsparus vandeniui" išlaiko apsaugą 40 min vandenyje; „labai atsparus" — 80 min. Po šio laiko ar nusišluostant rankšluosčiu reikia pakartotinai tepti.' },
      { q: 'Ar galiu naudoti praėjusių metų kremazlį?', a: 'Pirmiausia patikrinkite galiojimo datą. Jei nepraėjusi ir tinkamai saugota — galima. Jei atsisluoksniavęs, pakeitęs kvapą ar spalvą — išmeskite. Geriausia taisyklė: kiekvieno sezono pradžioje pirkti naują.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/spf', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function SpfPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/spf`,
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
        <ToolActions />
        <SpfCalculator locale={locale} />
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

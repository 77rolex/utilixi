import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import EngineeringCalculator from './EngineeringCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/basic', label: 'Basic Calculator' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }, { href: '/calculator/compound-interest', label: 'Compound Interest Calculator' }, { href: '/converter/units', label: 'Unit Converter' }, { href: '/calculator/gpa', label: 'GPA Calculator' }],
  ru: [{ href: '/calculator/basic', label: 'Простой калькулятор' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }, { href: '/calculator/compound-interest', label: 'Калькулятор сложных процентов' }, { href: '/converter/units', label: 'Конвертер единиц' }, { href: '/calculator/gpa', label: 'Калькулятор GPA' }],
  uk: [{ href: '/calculator/basic', label: 'Простий калькулятор' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }, { href: '/calculator/compound-interest', label: 'Калькулятор складних відсотків' }, { href: '/converter/units', label: 'Конвертер одиниць' }, { href: '/calculator/gpa', label: 'Калькулятор GPA' }],
  fr: [{ href: '/calculator/basic', label: 'Calculatrice basique' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }, { href: '/calculator/compound-interest', label: 'Intérêts composés' }, { href: '/converter/units', label: 'Convertisseur d\'unités' }, { href: '/calculator/gpa', label: 'Calculatrice GPA' }],
  lt: [{ href: '/calculator/basic', label: 'Paprastas skaičiuotuvas' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }, { href: '/calculator/compound-interest', label: 'Sudėtinių palūkanų skaičiuotuvas' }, { href: '/converter/units', label: 'Vienetų keitiklis' }, { href: '/calculator/gpa', label: 'GPA skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Scientific Calculator Online — Engineering Calculator Free', description: 'Free online scientific calculator with sin, cos, tan, log, ln, sqrt, powers and more. Supports DEG/RAD mode. Works on all devices without installation.', h1: 'Scientific Calculator', subtitle: 'A scientific calculator with trigonometric functions, logarithms, powers, and more.' },
  ru: { title: 'Инженерный калькулятор онлайн — научный калькулятор бесплатно', description: 'Бесплатный онлайн инженерный калькулятор с sin, cos, tan, log, ln, sqrt, степенями и другими функциями. Поддержка градусов и радиан.', h1: 'Инженерный калькулятор', subtitle: 'Инженерный калькулятор с тригонометрическими функциями, логарифмами, степенями и другим.' },
  uk: { title: 'Інженерний калькулятор онлайн — науковий калькулятор безкоштовно', description: 'Безкоштовний онлайн інженерний калькулятор з sin, cos, tan, log, ln, sqrt, степенями та іншими функціями. Підтримка градусів і радіан.', h1: 'Інженерний калькулятор', subtitle: 'Інженерний калькулятор з тригонометричними функціями, логарифмами, степенями та іншим.' },
  fr: { title: 'Calculatrice scientifique en ligne — Calculatrice ingénieur gratuite', description: 'Calculatrice scientifique en ligne gratuite avec sin, cos, tan, log, ln, racine carrée, puissances et plus. Mode DEG/RAD. Fonctionne sur tous les appareils.', h1: 'Calculatrice scientifique', subtitle: 'Une calculatrice scientifique avec fonctions trigonométriques, logarithmes, puissances et plus.' },
  lt: { title: 'Mokslinis skaičiuotuvas online — inžinerinis skaičiuotuvas nemokamai', description: 'Mokslinis skaičiuotuvas online nemokamai. Sin, cos, tan, log, ln, sqrt, laipsniai, faktorialas, konstantos π ir e. Palaiko DEG/RAD režimą. Veikia visuose įrenginiuose.', h1: 'Mokslinis skaičiuotuvas', subtitle: 'Mokslinis skaičiuotuvas su trigonometrinėmis funkcijomis, logaritmais ir laipsniais.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This scientific calculator supports a full range of mathematical functions: trigonometry (sin, cos, tan and their inverses), logarithms (log base 10 and natural log ln), exponential functions (eˣ, 10ˣ), powers (xⁿ), square root, factorial (n!), constants π and e, and parentheses for complex expressions. Switch between degree and radian mode using the DEG/RAD toggle. The calculator builds expressions step by step and shows them as you type, evaluating when you press =.\n\nThe calculator also includes advanced functions for engineering and science: hyperbolic functions (sinh, cosh, tanh), absolute value (|x|), cube root (∛), base-2 logarithm (log₂), floor/ceiling/round, modulo (mod), the golden ratio (φ), and an answer memory (Ans) that inserts the last result into the next expression. A history of the last 5 calculations is stored for reference.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How do I use trigonometric functions?', a: 'Press sin, cos, or tan, then type the angle value, then close with ). For example, sin(30) in DEG mode returns 0.5. Switch between degrees and radians using the DEG/RAD toggle at bottom left.' },
      { q: 'What is the difference between log and ln?', a: 'log calculates the base-10 logarithm (log₁₀), while ln calculates the natural logarithm (base e ≈ 2.718). For example, log(100) = 2 and ln(e) = 1. Use log for decibels, pH, and decades; use ln for continuous growth and decay.' },
      { q: 'How do I enter powers (xⁿ)?', a: 'Type the base number, press the xⁿ button (which inserts ^), then type the exponent. For example: 2 ^ 10 = 1024. You can also use x² to quickly square a number.' },
      { q: 'How does factorial (n!) work?', a: 'Press n!, type the number, then close with ). For example: fact(5) = 120 (because 5! = 5×4×3×2×1 = 120). Factorial is only defined for non-negative integers up to 170.' },
      { q: 'Can I use π in expressions?', a: 'Yes. Press the π button to insert the constant π (≈ 3.14159265358979). You can use it in any expression, for example: 2 × π calculates the circumference factor, or sin(π/2) = 1 in radian mode.' },
      { q: 'How do I use inverse trig functions (arcsin, arccos, arctan)?', a: 'Inverse trig functions are accessed by pressing the INV button to activate inverse mode, then pressing sin, cos, or tan. For example, arcsin(0.5) in DEG mode returns 30°. Make sure you are in the correct DEG or RAD mode, as the output unit follows the active mode.' },
      { q: 'What is the difference between DEG and RAD modes?', a: 'DEG (degrees) measures angles in degrees — a full circle is 360°. RAD (radians) measures angles in radians — a full circle is 2π ≈ 6.283. Use DEG for everyday geometry and navigation; use RAD for calculus and physics formulas.' },
      { q: 'How do I use the Ans (Answer) memory?', a: 'After calculating any result, pressing Ans inserts that result into your next expression. For example: calculate 5 ^ 2 = 25, then type Ans + 10 = to get 35. This chaining saves you from retyping long results and reduces rounding errors.' },
      { q: 'What is the golden ratio (φ)?', a: 'The golden ratio φ (phi) ≈ 1.61803398874989 is defined as φ = (1 + √5) / 2. It appears naturally in the Fibonacci sequence, art, architecture, and nature. The φ button inserts this constant directly into your expression.' },
      { q: 'What advanced functions does this calculator have beyond a basic calculator?', a: 'Beyond four basic operations, this scientific calculator adds: trigonometry (sin, cos, tan, arcsin, arccos, arctan), logarithms (log, ln, log₂), exponentials (eˣ, 10ˣ), powers (xⁿ, x²), roots (√, ∛), factorial (n!), hyperbolic functions (sinh, cosh, tanh), constants (π, e, φ), absolute value, floor, ceiling, round, modulo, and a 5-entry history.' },
    ],
  },
  ru: {
    description: 'Этот инженерный калькулятор поддерживает полный набор математических функций: тригонометрию (sin, cos, tan и обратные), логарифмы (log по основанию 10 и натуральный ln), экспоненциальные функции (eˣ, 10ˣ), степени (xⁿ), квадратный корень, факториал (n!), константы π и e, скобки для сложных выражений. Переключайте градусы и радианы кнопкой ГРД/РАД.\n\nКалькулятор также включает расширенные функции для инженерных и научных расчётов: гиперболические функции (sinh, cosh, tanh), абсолютное значение (|x|), кубический корень (∛), логарифм по основанию 2 (log₂), округление (floor/ceil/round), остаток от деления (mod), золотое сечение (φ) и память ответа (Ans). Хранится история последних 5 вычислений.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как использовать тригонометрические функции?', a: 'Нажмите sin, cos или tan, введите значение угла, затем закройте скобку. Например, sin(30) в режиме ГРД вернёт 0,5. Переключение между градусами и радианами — кнопка ГРД/РАД.' },
      { q: 'В чём разница между log и ln?', a: 'log вычисляет логарифм по основанию 10 (log₁₀), ln — натуральный логарифм (по основанию e ≈ 2,718). Например, log(100) = 2 и ln(e) = 1.' },
      { q: 'Как вводить степени (xⁿ)?', a: 'Введите основание, нажмите кнопку xⁿ (вставляет ^), затем введите показатель. Например: 2 ^ 10 = 1024. Кнопка x² быстро возводит число в квадрат.' },
      { q: 'Как работает факториал (n!)?', a: 'Нажмите n!, введите число, затем закройте скобку. Например: fact(5) = 120 (5! = 5×4×3×2×1). Факториал определён только для неотрицательных целых чисел до 170.' },
      { q: 'Можно ли использовать π в выражениях?', a: 'Да. Кнопка π вставляет константу π (≈ 3,14159). Её можно использовать в любом выражении, например: sin(π/2) = 1 в режиме радиан.' },
      { q: 'Как использовать обратные тригонометрические функции (arcsin, arccos, arctan)?', a: 'Нажмите кнопку INV для активации обратного режима, затем нажмите sin, cos или tan. Например, arcsin(0,5) в режиме ГРД вернёт 30°. Убедитесь, что выбран правильный режим (ГРД или РАД), так как результат выводится в единицах активного режима.' },
      { q: 'В чём разница между режимами ГРД и РАД?', a: 'Режим ГРД (градусы) измеряет углы в градусах — полный круг = 360°. Режим РАД (радианы) — полный круг = 2π ≈ 6,283. Используйте ГРД для обычных геометрических задач, РАД — для формул математического анализа и физики.' },
      { q: 'Как использовать память ответа (Ans)?', a: 'После вычисления любого результата нажатие Ans вставляет этот результат в следующее выражение. Например: вычислите 5 ^ 2 = 25, затем введите Ans + 10 = и получите 35. Это экономит время и снижает ошибки при переписывании длинных чисел.' },
      { q: 'Что такое золотое сечение (φ)?', a: 'Золотое сечение φ (фи) ≈ 1,61803398874989 определяется как φ = (1 + √5) / 2. Оно встречается в последовательности Фибоначчи, в природе, искусстве и архитектуре. Кнопка φ вставляет эту константу прямо в выражение.' },
      { q: 'Какие расширенные функции есть в инженерном калькуляторе?', a: 'Помимо четырёх базовых операций, инженерный калькулятор включает: тригонометрию (sin, cos, tan, arcsin, arccos, arctan), логарифмы (log, ln, log₂), экспоненты (eˣ, 10ˣ), степени (xⁿ, x²), корни (√, ∛), факториал (n!), гиперболические функции, константы (π, e, φ), модуль, округление (floor/ceil/round), остаток (mod) и историю из 5 вычислений.' },
    ],
  },
  uk: {
    description: 'Цей інженерний калькулятор підтримує повний набір математичних функцій: тригонометрію (sin, cos, tan та обернені), логарифми (log за основою 10 та натуральний ln), експоненціальні функції (eˣ, 10ˣ), степені (xⁿ), квадратний корінь, факторіал (n!), константи π та e, дужки для складних виразів. Перемикайте градуси і радіани кнопкою ГРД/РАД.\n\nКалькулятор також включає розширені функції: гіперболічні функції (sinh, cosh, tanh), абсолютне значення (|x|), кубічний корінь (∛), логарифм за основою 2 (log₂), округлення (floor/ceil/round), залишок від ділення (mod), золотий перетин (φ) та пам\'ять відповіді (Ans). Зберігається історія останніх 5 обчислень.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як використовувати тригонометричні функції?', a: 'Натисніть sin, cos або tan, введіть значення кута, потім закрийте дужку. Наприклад, sin(30) в режимі ГРД поверне 0,5.' },
      { q: 'В чому різниця між log та ln?', a: 'log обчислює логарифм за основою 10, ln — натуральний логарифм (за основою e ≈ 2,718). Наприклад, log(100) = 2, ln(e) = 1.' },
      { q: 'Як вводити степені (xⁿ)?', a: 'Введіть основу, натисніть xⁿ (вставляє ^), потім введіть показник. Наприклад: 2 ^ 10 = 1024.' },
      { q: 'Як працює факторіал (n!)?', a: 'Натисніть n!, введіть число, потім закрийте дужку. Наприклад: fact(5) = 120.' },
      { q: 'Чи можна використовувати π у виразах?', a: 'Так. Кнопка π вставляє константу π (≈ 3,14159). Її можна використовувати у будь-якому виразі.' },
      { q: 'Як використовувати обернені тригонометричні функції (arcsin, arccos, arctan)?', a: 'Натисніть кнопку INV для активації оберненого режиму, потім натисніть sin, cos або tan. Наприклад, arcsin(0,5) у режимі ГРД поверне 30°. Переконайтеся, що вибрано правильний режим (ГРД або РАД).' },
      { q: 'У чому різниця між режимами ГРД і РАД?', a: 'ГРД (градуси) — повне коло = 360°. РАД (радіани) — повне коло = 2π ≈ 6,283. Використовуйте ГРД для звичайних геометричних задач, РАД — для формул математичного аналізу та фізики.' },
      { q: 'Як використовувати пам\'ять відповіді (Ans)?', a: 'Після обчислення будь-якого результату натискання Ans вставляє цей результат у наступний вираз. Наприклад: обчислте 5 ^ 2 = 25, потім введіть Ans + 10 = і отримайте 35.' },
      { q: 'Що таке золотий перетин (φ)?', a: 'Золотий перетин φ (фі) ≈ 1,61803398874989 визначається як φ = (1 + √5) / 2. Він зустрічається в послідовності Фібоначчі, природі, мистецтві та архітектурі. Кнопка φ вставляє цю константу прямо у вираз.' },
      { q: 'Які розширені функції є в інженерному калькуляторі?', a: 'Крім чотирьох базових операцій, інженерний калькулятор включає: тригонометрію, логарифми (log, ln, log₂), експоненти (eˣ, 10ˣ), степені, корені (√, ∛), факторіал, гіперболічні функції, константи (π, e, φ), модуль, округлення, залишок (mod) та історію з 5 обчислень.' },
    ],
  },
  fr: {
    description: 'Cette calculatrice scientifique prend en charge un large éventail de fonctions mathématiques : trigonométrie (sin, cos, tan et leurs inverses), logarithmes (log base 10 et ln naturel), fonctions exponentielles (eˣ, 10ˣ), puissances (xⁿ), racine carrée, factorielle (n!), constantes π et e, parenthèses pour les expressions complexes. Basculez entre degrés et radians avec le bouton DEG/RAD.\n\nLa calculatrice inclut également des fonctions avancées pour l\'ingénierie et les sciences : fonctions hyperboliques (sinh, cosh, tanh), valeur absolue (|x|), racine cubique (∛), logarithme en base 2 (log₂), arrondi (floor/ceil/round), modulo (mod), nombre d\'or (φ) et mémoire de réponse (Ans). Un historique des 5 derniers calculs est conservé.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment utiliser les fonctions trigonométriques ?', a: 'Appuyez sur sin, cos ou tan, tapez la valeur de l\'angle, puis fermez la parenthèse. Par exemple, sin(30) en mode DEG donne 0,5.' },
      { q: 'Quelle est la différence entre log et ln ?', a: 'log calcule le logarithme en base 10, ln calcule le logarithme naturel (base e ≈ 2,718). Par exemple, log(100) = 2 et ln(e) = 1.' },
      { q: 'Comment entrer des puissances (xⁿ) ?', a: 'Tapez la base, appuyez sur xⁿ (insère ^), puis tapez l\'exposant. Par exemple : 2 ^ 10 = 1024.' },
      { q: 'Comment fonctionne la factorielle (n!) ?', a: 'Appuyez sur n!, tapez le nombre, puis fermez avec ). Exemple : fact(5) = 120.' },
      { q: 'Peut-on utiliser π dans les expressions ?', a: 'Oui. Le bouton π insère la constante π (≈ 3,14159). Utilisable dans n\'importe quelle expression.' },
      { q: 'Comment utiliser les fonctions trigonométriques inverses (arcsin, arccos, arctan) ?', a: 'Appuyez sur le bouton INV pour activer le mode inverse, puis sur sin, cos ou tan. Par exemple, arcsin(0,5) en mode DEG donne 30°. Vérifiez le mode DEG ou RAD actif, car le résultat est exprimé dans l\'unité du mode.' },
      { q: 'Quelle est la différence entre les modes DEG et RAD ?', a: 'DEG (degrés) mesure les angles en degrés — un cercle complet = 360°. RAD (radians) — un cercle complet = 2π ≈ 6,283. Utilisez DEG pour la géométrie courante, RAD pour les formules de calcul différentiel et de physique.' },
      { q: 'Comment utiliser la mémoire de réponse (Ans) ?', a: 'Après avoir calculé un résultat, appuyez sur Ans pour l\'insérer dans l\'expression suivante. Par exemple : calculez 5 ^ 2 = 25, puis tapez Ans + 10 = pour obtenir 35. Cela évite de retaper des résultats longs.' },
      { q: 'Qu\'est-ce que le nombre d\'or (φ) ?', a: 'Le nombre d\'or φ (phi) ≈ 1,61803398874989 est défini par φ = (1 + √5) / 2. Il apparaît dans la suite de Fibonacci, l\'art, l\'architecture et la nature. Le bouton φ insère cette constante directement dans l\'expression.' },
      { q: 'Quelles fonctions avancées cette calculatrice propose-t-elle ?', a: 'Au-delà des quatre opérations de base, cette calculatrice ajoute : trigonométrie (sin, cos, tan, arcsin...), logarithmes (log, ln, log₂), exponentielles (eˣ, 10ˣ), puissances, racines (√, ∛), factorielle, fonctions hyperboliques, constantes (π, e, φ), valeur absolue, arrondi (floor/ceil/round), modulo et un historique de 5 calculs.' },
    ],
  },
  lt: {
    description: 'Šis mokslinis skaičiuotuvas palaiko visą matematinių funkcijų rinkinį: trigonometriją (sin, cos, tan ir jų atvirkštines), logaritmus (log 10 pagrindu ir natūrinį ln), eksponentines funkcijas (eˣ, 10ˣ), laipsnius (xⁿ), kvadratinę šaknį, faktorialą (n!), konstantas π ir e, skliaustus sudėtingiems išreiškimams. Perjunkite tarp laipsnių ir radianų DEG/RAD mygtuku.\n\nSkaičiuotuvas taip pat turi pažangias funkcijas: hiperbolines funkcijas (sinh, cosh, tanh), absoliučią reikšmę (|x|), kubinę šaknį (∛), logaritmą 2 pagrindu (log₂), apvalinimą (floor/ceil/round), liekaną (mod), aukso santykį (φ) ir atsakymo atmintį (Ans). Saugoma paskutinių 5 skaičiavimų istorija.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip naudoti trigonometrines funkcijas?', a: 'Paspauskite sin, cos arba tan, įveskite kampo reikšmę, tada uždarykite skliaustą. Pavyzdžiui, sin(30) DEG režimu duoda 0,5.' },
      { q: 'Koks skirtumas tarp log ir ln?', a: 'log skaičiuoja logaritmą 10 pagrindu, ln — natūrinį logaritmą (e pagrindu ≈ 2,718). Pavyzdžiui, log(100) = 2, ln(e) = 1.' },
      { q: 'Kaip įvesti laipsnius (xⁿ)?', a: 'Įveskite pagrindą, paspauskite xⁿ (įterpia ^), tada įveskite laipsnį. Pavyzdžiui: 2 ^ 10 = 1024.' },
      { q: 'Kaip veikia faktorialas (n!)?', a: 'Paspauskite n!, įveskite skaičių, tada uždarykite skliaustą. Pavyzdžiui: fact(5) = 120.' },
      { q: 'Ar galima naudoti π išraiškose?', a: 'Taip. π mygtukas įterpia konstantą π (≈ 3,14159). Galima naudoti bet kurioje išraiškoje.' },
      { q: 'Kaip naudoti atvirkštines trigonometrines funkcijas (arcsin, arccos, arctan)?', a: 'Paspauskite INV mygtuką atvirkštiniam režimui įjungti, tada paspauskite sin, cos arba tan. Pavyzdžiui, arcsin(0,5) DEG režimu duoda 30°. Patikrinkite aktyvų DEG arba RAD režimą.' },
      { q: 'Koks skirtumas tarp DEG ir RAD režimų?', a: 'DEG (laipsniai) — pilnas ratas = 360°. RAD (radianai) — pilnas ratas = 2π ≈ 6,283. Naudokite DEG kasdieniams geometrijos uždaviniams, RAD — matematinės analizės ir fizikos formulėms.' },
      { q: 'Kaip naudoti atsakymo atmintį (Ans)?', a: 'Apskaičiavus bet kokį rezultatą, paspaudus Ans jis įterpiamas į kitą išraišką. Pavyzdžiui: apskaičiuokite 5 ^ 2 = 25, tada įveskite Ans + 10 = ir gaukite 35.' },
      { q: 'Kas yra aukso santykis (φ)?', a: 'Aukso santykis φ (fi) ≈ 1,61803398874989 apibrėžiamas kaip φ = (1 + √5) / 2. Jis pasitaiko Fibonačio sekoje, gamtoje, mene ir architektūroje. φ mygtukas tiesiogiai įterpia šią konstantą į išraišką.' },
      { q: 'Kokias pažangias funkcijas turi mokslinis skaičiuotuvas?', a: 'Be keturių pagrindinių veiksmų, mokslinis skaičiuotuvas turi: trigonometriją, logaritmus (log, ln, log₂), eksponentes (eˣ, 10ˣ), laipsnius, šaknis (√, ∛), faktorialą, hiperbolines funkcijas, konstantas (π, e, φ), absoliučią reikšmę, apvalinimą, liekaną (mod) ir 5 skaičiavimų istoriją.' },
    ],
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/engineering', m);
}

export default async function EngineeringCalculatorPage({ params }: Props) {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const c = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: m.h1,
    description: m.description,
    url: `https://utilixi.com/${locale}/calculator/engineering`,
    applicationCategory: 'UtilityApplication',
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
        <EngineeringCalculator locale={locale} />
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

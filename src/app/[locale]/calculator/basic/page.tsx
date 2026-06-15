import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import BasicCalculator from './BasicCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/engineering', label: 'Engineering Calculator' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }, { href: '/calculator/discount', label: 'Discount Calculator' }, { href: '/calculator/tip', label: 'Tip Calculator' }, { href: '/tools/word-counter', label: 'Word Counter' }],
  ru: [{ href: '/calculator/engineering', label: 'Инженерный калькулятор' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }, { href: '/calculator/discount', label: 'Калькулятор скидки' }, { href: '/calculator/tip', label: 'Калькулятор чаевых' }, { href: '/tools/word-counter', label: 'Счётчик слов' }],
  uk: [{ href: '/calculator/engineering', label: 'Інженерний калькулятор' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }, { href: '/calculator/discount', label: 'Калькулятор знижки' }, { href: '/calculator/tip', label: 'Калькулятор чайових' }, { href: '/tools/word-counter', label: 'Лічильник слів' }],
  fr: [{ href: '/calculator/engineering', label: 'Calculatrice scientifique' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }, { href: '/calculator/discount', label: 'Calculatrice de remise' }, { href: '/calculator/tip', label: 'Calculatrice de pourboire' }, { href: '/tools/word-counter', label: 'Compteur de mots' }],
  lt: [{ href: '/calculator/engineering', label: 'Inžinerinis skaičiuotuvas' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }, { href: '/calculator/discount', label: 'Nuolaidos skaičiuotuvas' }, { href: '/calculator/tip', label: 'Arbatpinigių skaičiuotuvas' }, { href: '/tools/word-counter', label: 'Žodžių skaitiklis' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Online Calculator — Basic Calculator Free', description: 'Free online basic calculator. Perform addition, subtraction, multiplication and division instantly. Works on all devices, no install needed.', h1: 'Basic Calculator', subtitle: 'A simple online calculator for everyday arithmetic — add, subtract, multiply, and divide.' },
  ru: { title: 'Онлайн калькулятор — бесплатный простой калькулятор', description: 'Бесплатный простой онлайн-калькулятор. Выполняйте сложение, вычитание, умножение и деление мгновенно. Работает на всех устройствах.', h1: 'Простой калькулятор', subtitle: 'Простой онлайн-калькулятор для повседневных вычислений — сложение, вычитание, умножение, деление.' },
  uk: { title: 'Онлайн калькулятор — безкоштовний простий калькулятор', description: 'Безкоштовний простий онлайн-калькулятор. Виконуйте додавання, віднімання, множення та ділення миттєво. Працює на всіх пристроях.', h1: 'Простий калькулятор', subtitle: 'Простий онлайн-калькулятор для щоденних обчислень — додавання, віднімання, множення, ділення.' },
  fr: { title: 'Calculatrice en ligne — Calculatrice basique gratuite', description: 'Calculatrice basique en ligne gratuite. Effectuez additions, soustractions, multiplications et divisions instantanément. Fonctionne sur tous les appareils.', h1: 'Calculatrice basique', subtitle: 'Une calculatrice simple pour le quotidien — addition, soustraction, multiplication et division.' },
  lt: { title: 'Internetinis skaičiuotuvas — nemokamas paprastas skaičiuotuvas', description: 'Nemokamas paprastas internetinis skaičiuotuvas. Atlikite sudėtį, atimtį, dauginimą ir dalinimą akimirksniu. Veikia visuose įrenginiuose.', h1: 'Paprastas skaičiuotuvas', subtitle: 'Paprastas internetinis skaičiuotuvas kasdienėms aritmetinėms operacijoms.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This online basic calculator handles everyday arithmetic: addition (+), subtraction (−), multiplication (×), and division (÷). It includes a percentage key (%) for quick percent calculations and a sign toggle (±) to change positive/negative. Results are shown with up to 10 significant digits of precision. The calculator is fully keyboard-friendly — use number keys and operator keys directly.\n\nA simple calculator is the right tool for quick, sequential arithmetic. For expressions with trigonometry, logarithms, powers, or complex operator precedence, use the scientific calculator. This basic calculator evaluates left to right, step by step — press = after each operation to chain calculations.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How do I calculate a percentage?', a: 'Press the number, then the % button. For example, to find 15% of 200: press 200 × 15 %, and the result is 30. Or press 15 % alone to convert 15 to 0.15.' },
      { q: 'What does the ± button do?', a: 'The ± (plus/minus) button toggles the sign of the currently displayed number. Press it to change a positive number to negative or vice versa. Useful for subtracting from a running total.' },
      { q: 'What happens when I divide by zero?', a: 'Dividing any number by zero is mathematically undefined. The calculator displays "Error" to indicate an invalid operation. Press C to clear and start a new calculation.' },
      { q: 'Is this calculator free to use?', a: 'Yes, completely free with no account needed. Works in any browser on mobile, tablet, or desktop. No download or installation required.' },
      { q: 'Can I use the keyboard with this calculator?', a: 'Yes. Number keys (0–9), operator keys (+, −, *, /), Enter or = to evaluate, Backspace to delete the last digit, and Escape or Delete to clear. The calculator is fully keyboard-accessible for fast calculations without using the mouse.' },
      { q: 'How does this calculator handle order of operations?', a: 'This basic calculator evaluates left to right, one operation at a time. For example: 2 + 3 × 4 is processed as (2 + 3) × 4 = 20, not 14. For expressions that require standard mathematical precedence (BODMAS/PEMDAS), use the scientific calculator.' },
      { q: 'What is the maximum number this calculator can handle?', a: 'The calculator uses JavaScript\'s IEEE 754 floating-point arithmetic, which handles numbers up to about 15–17 significant digits reliably. For everyday use — bills, measurements, percentages — this limit is never a concern.' },
      { q: 'How do I calculate a square root on a basic calculator?', a: 'A basic four-function calculator does not have a dedicated square root button. To compute √n, use the engineering calculator on this site, which includes a √ button and other advanced functions.' },
      { q: 'What is the difference between C and CE on a calculator?', a: 'C (Clear) resets the entire calculation — it clears both the current number and any pending operator. CE (Clear Entry) clears only the most recent number entered but keeps the operator. In this calculator, C performs a full reset.' },
      { q: 'Can I calculate a percentage tip or discount directly?', a: 'Yes. Enter the total, press ×, type the percentage, press %. For example: 200 × 15 % = 30. For splitting bills or applying discounts, use the dedicated Tip Calculator or Discount Calculator on this site.' },
    ],
  },
  ru: {
    description: 'Этот онлайн-калькулятор выполняет повседневные арифметические операции: сложение (+), вычитание (−), умножение (×) и деление (÷). Включает кнопку процента (%) для быстрых вычислений и переключатель знака (±). Результаты отображаются с точностью до 10 значащих цифр. Калькулятор полностью поддерживает ввод с клавиатуры.\n\nПростой калькулятор оптимален для быстрых последовательных вычислений. Для выражений с тригонометрией, логарифмами, степенями или приоритетом операторов используйте инженерный калькулятор. Этот калькулятор выполняет вычисления слева направо — нажимайте = после каждой операции для цепочных вычислений.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как посчитать процент?', a: 'Нажмите число, затем кнопку %. Например, чтобы найти 15% от 200: нажмите 200 × 15 %, результат — 30. Или нажмите 15 % отдельно, чтобы получить 0,15.' },
      { q: 'Что делает кнопка ±?', a: 'Кнопка ± меняет знак текущего числа с положительного на отрицательный или наоборот. Полезно при вычитании из накопленной суммы.' },
      { q: 'Что происходит при делении на ноль?', a: 'Деление на ноль математически не определено. Калькулятор отображает «Ошибка». Нажмите C, чтобы очистить и начать новое вычисление.' },
      { q: 'Калькулятор бесплатный?', a: 'Да, полностью бесплатный, аккаунт не нужен. Работает в любом браузере на телефоне, планшете или ПК.' },
      { q: 'Можно ли использовать клавиатуру?', a: 'Да. Цифровые клавиши (0–9), операторы (+, −, *, /), Enter или = для вычисления, Backspace для удаления последней цифры, Escape или Delete для очистки. Калькулятор полностью поддерживает ввод с клавиатуры.' },
      { q: 'Как работает порядок действий в этом калькуляторе?', a: 'Этот простой калькулятор выполняет вычисления слева направо, по одной операции. Например: 2 + 3 × 4 вычисляется как (2 + 3) × 4 = 20, а не 14. Для стандартного математического приоритета используйте инженерный калькулятор.' },
      { q: 'Каково максимальное число, которое может обработать калькулятор?', a: 'Калькулятор использует числа с плавающей точкой IEEE 754, обеспечивающие надёжное вычисление до 15–17 значащих цифр. Для повседневных расчётов это ограничение никогда не имеет значения.' },
      { q: 'Как посчитать квадратный корень на простом калькуляторе?', a: 'У базового калькулятора нет кнопки квадратного корня. Для вычисления √n воспользуйтесь инженерным калькулятором на этом сайте, где есть специальная кнопка √.' },
      { q: 'В чём разница между C и CE?', a: 'C (сброс) обнуляет всё вычисление — очищает и текущее число, и ожидающий оператор. CE (сброс ввода) очищает только последнее введённое число, оставляя оператор. В этом калькуляторе C выполняет полный сброс.' },
      { q: 'Можно ли напрямую посчитать чаевые или скидку?', a: 'Да. Введите сумму, нажмите ×, введите процент, нажмите %. Например: 200 × 15 % = 30. Для разделения счёта или расчёта скидок используйте специальные калькуляторы чаевых и скидок.' },
    ],
  },
  uk: {
    description: 'Цей онлайн-калькулятор виконує повсякденні арифметичні операції: додавання (+), віднімання (−), множення (×) та ділення (÷). Включає кнопку відсотка (%) та перемикач знака (±). Результати відображаються з точністю до 10 значущих цифр. Калькулятор повністю підтримує введення з клавіатури.\n\nПростий калькулятор оптимальний для швидких послідовних обчислень. Для виразів з тригонометрією, логарифмами, степенями або пріоритетом операторів використовуйте інженерний калькулятор. Цей калькулятор виконує обчислення зліва направо — натискайте = після кожної операції для ланцюгових обчислень.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як порахувати відсоток?', a: 'Натисніть число, потім кнопку %. Наприклад, щоб знайти 15% від 200: натисніть 200 × 15 %, результат — 30.' },
      { q: 'Що робить кнопка ±?', a: 'Кнопка ± змінює знак поточного числа з позитивного на негативний або навпаки.' },
      { q: 'Що відбувається при діленні на нуль?', a: 'Ділення на нуль математично не визначене. Калькулятор показує «Помилка». Натисніть C для очищення.' },
      { q: 'Калькулятор безкоштовний?', a: 'Так, повністю безкоштовний, не потребує аккаунта. Працює у будь-якому браузері.' },
      { q: 'Чи можна використовувати клавіатуру?', a: 'Так. Цифрові клавіші (0–9), оператори (+, −, *, /), Enter або = для обчислення, Backspace для видалення останньої цифри, Escape або Delete для очищення.' },
      { q: 'Як працює порядок дій у цьому калькуляторі?', a: 'Цей простий калькулятор виконує обчислення зліва направо, по одній операції. Наприклад: 2 + 3 × 4 обчислюється як (2 + 3) × 4 = 20, а не 14. Для стандартного математичного пріоритету використовуйте інженерний калькулятор.' },
      { q: 'Яке максимальне число може обробити калькулятор?', a: 'Калькулятор використовує числа з плаваючою точкою IEEE 754, які надійно обчислюють до 15–17 значущих цифр. Для повсякденних розрахунків це обмеження ніколи не має значення.' },
      { q: 'Як порахувати квадратний корінь?', a: 'У базового калькулятора немає кнопки квадратного кореня. Для обчислення √n скористайтесь інженерним калькулятором на цьому сайті, де є спеціальна кнопка √.' },
      { q: 'У чому різниця між C і CE?', a: 'C (очистити) скидає все обчислення — очищає і поточне число, і оператор. CE (очистити запис) очищає лише останнє введене число, залишаючи оператор. У цьому калькуляторі C виконує повне очищення.' },
      { q: 'Чи можна напряму порахувати чайові або знижку?', a: 'Так. Введіть суму, натисніть ×, введіть відсоток, натисніть %. Наприклад: 200 × 15 % = 30. Для розділення рахунку або розрахунку знижок використовуйте спеціальні калькулятори.' },
    ],
  },
  fr: {
    description: 'Cette calculatrice en ligne effectue les opérations arithmétiques courantes : addition (+), soustraction (−), multiplication (×) et division (÷). Elle comprend une touche pourcentage (%) et une touche changement de signe (±). Les résultats sont affichés avec jusqu\'à 10 chiffres significatifs. La calculatrice supporte entièrement la saisie au clavier.\n\nUne calculatrice simple est l\'outil idéal pour les opérations arithmétiques rapides et séquentielles. Pour les expressions avec trigonométrie, logarithmes, puissances ou priorité des opérateurs, utilisez la calculatrice scientifique. Cette calculatrice évalue de gauche à droite, étape par étape — appuyez sur = après chaque opération pour enchaîner les calculs.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calculer un pourcentage ?', a: 'Appuyez sur le nombre, puis sur %. Par exemple, pour trouver 15% de 200 : appuyez sur 200 × 15 %, le résultat est 30.' },
      { q: 'À quoi sert le bouton ± ?', a: 'Le bouton ± (plus/moins) change le signe du nombre affiché de positif à négatif ou inversement.' },
      { q: 'Que se passe-t-il lors d\'une division par zéro ?', a: 'La division par zéro est mathématiquement indéfinie. La calculatrice affiche « Erreur ». Appuyez sur C pour recommencer.' },
      { q: 'Cette calculatrice est-elle gratuite ?', a: 'Oui, entièrement gratuite, sans compte nécessaire. Fonctionne dans n\'importe quel navigateur.' },
      { q: 'Puis-je utiliser le clavier avec cette calculatrice ?', a: 'Oui. Touches numériques (0–9), opérateurs (+, −, *, /), Entrée ou = pour évaluer, Retour arrière pour supprimer, Échap ou Suppr pour effacer. La calculatrice est entièrement utilisable au clavier.' },
      { q: 'Comment fonctionne la priorité des opérations ?', a: 'Cette calculatrice évalue de gauche à droite, opération par opération. Par exemple : 2 + 3 × 4 est traité comme (2 + 3) × 4 = 20, pas 14. Pour les expressions avec priorité mathématique standard, utilisez la calculatrice scientifique.' },
      { q: 'Quel est le nombre maximum que cette calculatrice peut traiter ?', a: 'La calculatrice utilise l\'arithmétique en virgule flottante IEEE 754 de JavaScript, fiable jusqu\'à 15–17 chiffres significatifs. Pour les calculs quotidiens, cette limite ne pose jamais problème.' },
      { q: 'Comment calculer une racine carrée sur une calculatrice simple ?', a: 'Une calculatrice quatre opérations n\'a pas de touche racine carrée. Pour calculer √n, utilisez la calculatrice scientifique de ce site, qui dispose d\'un bouton √ dédié.' },
      { q: 'Quelle est la différence entre C et CE ?', a: 'C (Effacer) réinitialise tout le calcul — il efface le nombre affiché et l\'opérateur en attente. CE (Effacer la saisie) efface uniquement le dernier nombre saisi mais conserve l\'opérateur. Sur cette calculatrice, C effectue une réinitialisation complète.' },
      { q: 'Puis-je calculer directement un pourboire ou une remise ?', a: 'Oui. Entrez le total, appuyez sur ×, tapez le pourcentage, appuyez sur %. Par exemple : 200 × 15 % = 30. Pour partager une addition ou calculer des remises, utilisez les calculatrices dédiées (pourboire, remise) de ce site.' },
    ],
  },
  lt: {
    description: 'Šis internetinis skaičiuotuvas atlieka kasdienius aritmetinius veiksmus: sudėtį (+), atimtį (−), dauginimą (×) ir dalinimą (÷). Turi procentų mygtuką (%) ir ženklo keitimo mygtuką (±). Rezultatai rodomi su iki 10 reikšminių skaitmenų tikslumu. Skaičiuotuvas visiškai palaiko klaviatūros įvestį.\n\nPaprastas skaičiuotuvas puikiai tinka gretiems, nuosekliems aritmetiniams veiksmams. Trigonometrijai, logaritmams, laipsniams ar sudėtingų operatorių prioritetui naudokite mokslinio skaičiuotuvą. Šis skaičiuotuvas skaičiuoja iš kairės į dešinę — paspauskite = po kiekvieno veiksmo grandinintiems skaičiavimams.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuoti procentą?', a: 'Paspauskite skaičių, tada % mygtuką. Pavyzdžiui, 15% nuo 200: paspauskite 200 × 15 %, rezultatas — 30.' },
      { q: 'Ką daro ± mygtukas?', a: '± mygtukas keičia rodomo skaičiaus ženklą iš teigiamo į neigiamą arba atvirkščiai.' },
      { q: 'Kas nutinka dalijant iš nulio?', a: 'Dalijimas iš nulio matematiškai neapibrėžtas. Skaičiuotuvas rodo „Klaida". Paspauskite C, kad pradėtumėte iš naujo.' },
      { q: 'Ar skaičiuotuvas nemokamas?', a: 'Taip, visiškai nemokamas, nereikia paskyros. Veikia bet kurioje naršyklėje.' },
      { q: 'Ar galima naudoti klaviatūrą?', a: 'Taip. Skaitmenų klavišai (0–9), operatoriai (+, −, *, /), Enter arba = skaičiavimui, Backspace paskutiniam skaitmeniui ištrinti, Escape arba Delete valymui. Skaičiuotuvas visiškai palaiko klaviatūros įvestį.' },
      { q: 'Kaip veikia veiksmų eiliškumas?', a: 'Šis paprastas skaičiuotuvas skaičiuoja iš kairės į dešinę, vieną veiksmą iš karto. Pavyzdžiui: 2 + 3 × 4 apskaičiuojama kaip (2 + 3) × 4 = 20, o ne 14. Standartiniam matematiniam prioritetui naudokite mokslinio skaičiuotuvą.' },
      { q: 'Kokį maksimalų skaičių gali tvarkyti skaičiuotuvas?', a: 'Skaičiuotuvas naudoja IEEE 754 slankiojo kablelio aritmtetiką, patikimai tvarkančią iki 15–17 reikšminių skaitmenų. Kasdieniams skaičiavimams ši riba niekada nėra aktuali.' },
      { q: 'Kaip apskaičiuoti kvadratinę šaknį?', a: 'Bazinis keturių veiksmų skaičiuotuvas neturi kvadratinės šaknies mygtuko. √n skaičiavimui naudokite šios svetainės mokslinio skaičiuotuvą, kuriame yra specialus √ mygtukas.' },
      { q: 'Koks skirtumas tarp C ir CE?', a: 'C (Valyti) atnaujina visą skaičiavimą — išvalo rodomą skaičių ir laukiantį operatorių. CE (Valyti įvestį) išvalo tik paskutinį įvestą skaičių, palikdamas operatorių. Šiame skaičiuotuve C atlieka visišką atstatymą.' },
      { q: 'Ar galima tiesiogiai apskaičiuoti arbatpinigius ar nuolaidą?', a: 'Taip. Įveskite sumą, paspauskite ×, įveskite procentą, paspauskite %. Pavyzdžiui: 200 × 15 % = 30. Sąskaitai padalinti ar nuolaidoms skaičiuoti naudokite specialius skaičiuotuvus.' },
    ],
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/basic', m);
}

export default async function BasicCalculatorPage({ params }: Props) {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const c = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: m.h1,
    description: m.description,
    url: `https://utilixi.com/${locale}/calculator/basic`,
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
        <RelatedTools locale={locale} tools={related} />
        <ToolActions />
        <BasicCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {c.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
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

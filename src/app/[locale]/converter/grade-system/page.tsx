import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import GradeSystemConverter from './GradeSystemConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/gpa', label: 'GPA Calculator' }, { href: '/calculator/age', label: 'Age Calculator' }, { href: '/calculator/salary', label: 'Salary Calculator' }, { href: '/calculator/date-diff', label: 'Date Difference Calculator' }, { href: '/converter/units', label: 'Unit Converter' }],
  ru: [{ href: '/calculator/gpa', label: 'Калькулятор GPA' }, { href: '/calculator/age', label: 'Калькулятор возраста' }, { href: '/calculator/salary', label: 'Калькулятор зарплаты' }, { href: '/calculator/date-diff', label: 'Разница дат' }, { href: '/converter/units', label: 'Конвертер единиц' }],
  uk: [{ href: '/calculator/gpa', label: 'Калькулятор GPA' }, { href: '/calculator/age', label: 'Калькулятор віку' }, { href: '/calculator/salary', label: 'Калькулятор зарплати' }, { href: '/calculator/date-diff', label: 'Різниця дат' }, { href: '/converter/units', label: 'Конвертер одиниць' }],
  fr: [{ href: '/calculator/gpa', label: 'Calculatrice GPA' }, { href: '/calculator/age', label: 'Calculatrice d\'âge' }, { href: '/calculator/salary', label: 'Calculatrice de salaire' }, { href: '/calculator/date-diff', label: 'Différence de dates' }, { href: '/converter/units', label: 'Convertisseur d\'unités' }],
  lt: [{ href: '/calculator/gpa', label: 'GPA skaičiuotuvas' }, { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' }, { href: '/calculator/salary', label: 'Atlyginimo skaičiuotuvas' }, { href: '/calculator/date-diff', label: 'Datų skirtumas' }, { href: '/converter/units', label: 'Vienetų keitiklis' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Grade System Converter — German GPA to US GPA, ECTS, UK & More',
    description: 'Free grade system converter. Convert German GPA to US GPA, UK percentage to GPA, ECTS to 4.0 scale, and more. Covers US GPA (4.0), UK percentage, European ECTS (A–F), Russian 5-point, and German 1–6 systems.',
    h1: 'Grade System Converter',
  },
  ru: {
    title: 'Конвертер систем оценок — GPA, ECTS, российская, немецкая',
    description: 'Бесплатный конвертер систем оценок. Переводите оценки между американской GPA (4.0), британской %, европейской ECTS (A–F), российской пятибалльной и немецкой системами. Мгновенный результат.',
    h1: 'Конвертер систем оценок',
  },
  uk: {
    title: 'Конвертер систем оцінок — GPA, ECTS, українська, німецька',
    description: 'Безкоштовний конвертер систем оцінок. Переводьте оцінки між американською GPA (4.0), британською %, європейською ECTS (A–F), українською п\'ятибальною та німецькою системами.',
    h1: 'Конвертер систем оцінок',
  },
  fr: {
    title: 'Convertisseur de systèmes de notation — GPA, ECTS, allemand, UK',
    description: 'Convertisseur de notes gratuit. Convertissez le GPA américain (4,0), les pourcentages UK, l\'ECTS européen (A–F), la note russe sur 5 et le système allemand 1–6 instantanément.',
    h1: 'Convertisseur de systèmes de notation',
  },
  lt: {
    title: 'Pažymių Sistemų Konverteris — GPA, ECTS, vokiška, britų',
    description: 'Nemokamas pažymių sistemų konverteris. Konvertuokite JAV GPA (4,0), JK procentus, Europos ECTS (A–F), Rusijos 5 balų ir Vokietijos 1–6 sistemas akimirksniu.',
    h1: 'Pažymių sistemų konverteris',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This grade system converter instantly translates any grade between 5 major grading systems used worldwide. Whether you need to convert a German grade for a US university application, understand a UK degree classification in GPA terms, or compare ECTS grades with the American 4.0 scale — simply enter your grade and source system.\n\nThe converter is particularly useful for international students, university applicants, and professionals with foreign qualifications. Converting a German GPA to US GPA is one of the most common needs — German universities use a 1.0–6.0 scale (where 1.0 is the best), which is the opposite of most other systems. Use this tool as a reference guide before official academic transcript evaluation.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How do I convert a German GPA to US GPA?', a: 'The German system uses a 1.0–6.0 scale where 1.0 is the best grade and 4.0 is the minimum pass. To convert to a US 4.0 GPA: a common formula is US GPA = (1 − German grade) / (1 − 4.0) × 4.0, but simplified: German 1.0 ≈ US 4.0, German 1.5 ≈ US 3.7, German 2.0 ≈ US 3.3, German 2.5 ≈ US 3.0, German 3.0 ≈ US 2.7, German 3.5 ≈ US 2.3, German 4.0 ≈ US 2.0. This converter applies this mapping automatically.' },
      { q: 'How does the converter work?', a: 'The converter normalises all grades to a 0–100% percentage scale internally, then converts to each target system. This is an approximation — grade system boundaries vary by institution and country. It provides a reliable reference for academic comparisons, applications, and professional qualification assessments. Always check with the specific institution for their official conversion policy.' },
      { q: 'What is the ECTS grading scale?', a: 'ECTS (European Credit Transfer and Accumulation System) uses letter grades from A (awarded to the top 10% of passing students) through E (lowest 50% that still pass), with F as fail. Approximate percentage boundaries: A ≥ 90%, B ≥ 80%, C ≥ 70%, D ≥ 60%, E ≥ 50%. ECTS grades are widely used across European universities for student mobility and Erasmus programmes.' },
      { q: 'How is the German grading scale different from other systems?', a: 'The German university system (Hochschule) uses a 1.0–6.0 scale — the opposite of most systems. 1.0 = sehr gut (very good/excellent), 1.0–1.5 = exceptional, 1.6–2.5 = gut (good), 2.6–3.5 = befriedigend (satisfactory), 3.6–4.0 = ausreichend (sufficient/passing), 4.1–5.0 = nicht ausreichend (fail). A German grade of 1.0 is the highest possible — equivalent to an A+ in the US system.' },
      { q: 'What GPA is needed to study in Germany?', a: 'German universities generally require a minimum GPA equivalent to 2.5–3.0 on the German scale (ausreichend to befriedigend) for admission. For competitive Master\'s programmes (especially at TU Munich, LMU, or Heidelberg), a German-equivalent grade of 2.0 or better (gut) is typically required. International applicants should use the anabin database or have their grades evaluated by uni-assist for official recognition.' },
      { q: 'Is 4.0 GPA equivalent to 100%?', a: 'Not exactly. A 4.0 GPA in the US typically corresponds to an A grade (90–100%). A 4.3 GPA (A+ with grade inflation at some schools) represents exceptional work. GPA 3.0 (B) roughly corresponds to 80–89%, GPA 2.0 (C) to 70–79%. The exact percentage boundaries vary by institution — some use 93% as the threshold for an A.' },
      { q: 'How does the UK classification system compare to US GPA?', a: 'UK degrees use classification rather than GPA: First Class (70%+) ≈ US 3.7–4.0 GPA; Upper Second (2:1, 60–69%) ≈ US 3.3–3.7; Lower Second (2:2, 50–59%) ≈ US 2.7–3.3; Third Class (40–49%) ≈ US 2.0–2.7. A UK 2:1 is the most common degree awarded and is typically considered equivalent to a US GPA of ~3.3–3.5 for graduate school admissions.' },
      { q: 'What is a "point grade average" (PGA)?', a: 'Point Grade Average (PGA) is another term for GPA used in some countries and institutions (including Ireland and some Commonwealth countries). It is calculated the same way as US GPA — multiplying grade points by credit hours and dividing by total credit hours. Ireland uses a similar QCA (Quality Credit Average) system on a 0–4.2 scale.' },
      { q: 'How does the Russian/Ukrainian 5-point scale convert to GPA?', a: 'Russian/Ukrainian 5-point scale: 5 (отлично/відмінно) ≈ US 4.0, GPA 4 (хорошо/добре) ≈ US 3.0, 3 (удовлетворительно/задовільно) ≈ US 2.0, 2 (неудовлетворительно/незадовільно) = fail. For graduate school applications in the US, a Russian average of 4.5–5.0 is typically considered equivalent to a 3.5–4.0 GPA.' },
      { q: 'Are ECTS grades used in Erasmus applications?', a: 'Yes. ECTS grades are the standard for credit transfer within the Erasmus+ programme across 40+ European countries. When applying, you\'ll typically need to provide your home institution\'s transcript with grades, and the host institution will map them to their local system. ECTS grades (A–F) are included on the European Diploma Supplement, which accompanies all EU university degrees.' },
      { q: 'How accurate is this grade system converter?', a: 'This converter provides an approximation based on typical boundary values for each system. Individual institutions may use different conversion tables. For official academic applications (graduate school, professional licensing, credential evaluation), always obtain an official transcript evaluation from an accredited credential evaluation service (e.g., WES in the US/Canada, NARIC in the UK, anabin/uni-assist in Germany).' },
    ],
  },
  ru: {
    description: 'Конвертер систем оценок позволяет мгновенно перевести любую оценку между 5 основными системами, используемыми в мире. Введите оценку и выберите исходную систему — получите эквиваленты во всех остальных. Особенно полезен для студентов, поступающих в зарубежные университеты.\n\nКонвертер особенно актуален для перевода российских/украинских оценок в GPA США или Европы, а также для перевода немецких оценок (1–6) в американскую систему. Немецкая система обратная большинству других: 1.0 — наивысшая оценка, а не минимальная. Используйте конвертер как справочник — для официального перевода оценок обращайтесь в аккредитованные сервисы.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как перевести немецкую оценку в GPA США?', a: 'Немецкая система: 1.0 = sehr gut (отлично), 1.5 ≈ GPA 3.7, 2.0 ≈ GPA 3.3, 2.5 ≈ GPA 3.0, 3.0 ≈ GPA 2.7, 3.5 ≈ GPA 2.3, 4.0 ≈ GPA 2.0. Формула: GPA = (4.0 − 4.0) × (4.0 − German) / (4.0 − 1.0). Обратите внимание: немецкая 1.0 — это максимум (отлично), а не минимум, как в большинстве других систем.' },
      { q: 'Как работает конвертер?', a: 'Конвертер нормализует все оценки к внутренней шкале 0–100%, а затем переводит в каждую целевую систему. Это приближённое значение, поскольку границы систем оценок варьируются по учебным заведениям. Для официального перевода оценок обращайтесь в аккредитованные сервисы оценки академических документов.' },
      { q: 'Что такое шкала ECTS?', a: 'ECTS (Европейская система перевода кредитов) использует буквенные оценки от A (лучшие 10% успевающих) до E (нижние 50% успевающих), F — незачёт. Примерные границы: A ≥ 90%, B ≥ 80%, C ≥ 70%, D ≥ 60%, E ≥ 50%. ECTS широко используется в европейских университетах для программ Erasmus и академической мобильности.' },
      { q: 'Чем отличается немецкая система оценок?', a: 'Немецкая шкала: 1.0 (sehr gut) — отлично, 1.6–2.5 (gut) — хорошо, 2.6–3.5 (befriedigend) — удовлетворительно, 3.6–4.0 (ausreichend) — достаточно/зачёт, выше 4.0 — незачёт. Это полная противоположность большинству систем: чем меньше число, тем лучше оценка. Немецкая 1.0 соответствует американской A+.' },
      { q: 'Как перевести российскую/украинскую оценку в GPA?', a: 'Российская/украинская 5-балльная шкала: 5 (отлично) ≈ GPA 4.0, 4 (хорошо) ≈ GPA 3.0, 3 (удовлетворительно) ≈ GPA 2.0, 2 (неудовлетворительно) = провал. При поступлении в аспирантуру США средний балл 4.5–5.0 по российской шкале обычно рассматривается как GPA 3.5–4.0.' },
      { q: 'Какой GPA нужен для поступления в немецкий университет?', a: 'Немецкие университеты, как правило, требуют минимальный эквивалент оценки 2.5–3.0 по немецкой шкале (от «достаточно» до «удовлетворительно»). Для конкурентных магистерских программ (ТУ Мюнхен, LMU, Гейдельберг) обычно требуется немецкий эквивалент 2.0 и выше. Иностранцам рекомендуется проверить признание оценок через uni-assist или базу anabin.' },
      { q: 'Равен ли GPA 4.0 ста процентам?', a: 'Не совсем. GPA 4.0 в США обычно соответствует оценке A (90–100%). GPA 3.0 (B) — примерно 80–89%, GPA 2.0 (C) — 70–79%. Точные процентные границы варьируются: в некоторых учебных заведениях A начинается от 93%, в других — от 90%.' },
      { q: 'Как британская система соотносится с GPA?', a: 'Британские дипломы используют классификации: First Class (70%+) ≈ GPA 3.7–4.0; Upper Second (2:1, 60–69%) ≈ GPA 3.3–3.7; Lower Second (2:2, 50–59%) ≈ GPA 2.7–3.3; Third Class (40–49%) ≈ GPA 2.0–2.7. Британский 2:1 — наиболее распространённый диплом, обычно считается эквивалентом GPA ~3.3–3.5 при поступлении в магистратуру США.' },
      { q: 'Используются ли оценки ECTS при подаче на Erasmus?', a: 'Да. Оценки ECTS являются стандартом для переноса кредитов в рамках программы Erasmus+ в 40+ европейских странах. При подаче заявки вы предоставляете транскрипт с оценками от вашего университета, который принимающий вуз переводит в свою систему. Оценки ECTS (A–F) включаются в европейское Приложение к диплому.' },
      { q: 'Насколько точен этот конвертер систем оценок?', a: 'Конвертер даёт приближённое значение на основе типичных граничных значений для каждой системы. Отдельные учебные заведения могут использовать иные таблицы перевода. Для официального перевода оценок (поступление в аспирантуру, профессиональные лицензии) обращайтесь в аккредитованные сервисы оценки: WES (США/Канада), NARIC (Великобритания), uni-assist (Германия).' },
    ],
  },
  uk: {
    description: 'Конвертер систем оцінок дозволяє миттєво перевести будь-яку оцінку між 5 основними системами, що використовуються у світі. Введіть оцінку та виберіть вихідну систему — отримайте еквіваленти в усіх інших. Особливо корисний для студентів, що вступають до закордонних університетів.\n\nКонвертер актуальний для перекладу українських/російських оцінок у GPA США або Європи, а також для перекладу німецьких оцінок (1–6) в американську систему. Німецька система обернена більшості інших: 1.0 — найвища оцінка. Використовуйте конвертер як довідник — для офіційного перекладу оцінок звертайтеся до акредитованих сервісів.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як перевести німецьку оцінку у GPA США?', a: 'Німецька система: 1.0 = sehr gut (відмінно) ≈ GPA 4.0, 1.5 ≈ GPA 3.7, 2.0 ≈ GPA 3.3, 2.5 ≈ GPA 3.0, 3.0 ≈ GPA 2.7, 3.5 ≈ GPA 2.3, 4.0 ≈ GPA 2.0. Зверніть увагу: у Німеччині 1.0 — максимум (відмінно), а не мінімум, як у більшості інших систем.' },
      { q: 'Як працює конвертер?', a: 'Конвертер нормалізує всі оцінки до внутрішньої шкали 0–100%, а потім переводить у кожну цільову систему. Це наближене значення, оскільки межі систем оцінок різняться залежно від навчального закладу. Для офіційного перекладу оцінок звертайтеся до акредитованих сервісів.' },
      { q: 'Що таке шкала ECTS?', a: 'ECTS (Європейська система перенесення кредитів) використовує буквені оцінки від A (найкращі 10% успішних) до E (нижні 50% успішних), F — незалік. Приблизні межі: A ≥ 90%, B ≥ 80%, C ≥ 70%, D ≥ 60%, E ≥ 50%. ECTS широко використовується в європейських університетах для програм Erasmus.' },
      { q: 'Чим відрізняється німецька система оцінок?', a: 'Німецька шкала: 1.0 (sehr gut) — відмінно, 1.6–2.5 (gut) — добре, 2.6–3.5 (befriedigend) — задовільно, 3.6–4.0 (ausreichend) — достатньо/залік, вище 4.0 — незалік. Це повна протилежність більшості систем: чим менше число, тим краща оцінка.' },
      { q: 'Як перевести українську/російську оцінку у GPA?', a: 'Українська/російська 5-бальна шкала: 5 (відмінно) ≈ GPA 4.0, 4 (добре) ≈ GPA 3.0, 3 (задовільно) ≈ GPA 2.0, 2 (незадовільно) = провал. При вступі до аспірантури США середній бал 4.5–5.0 за українською шкалою зазвичай розглядається як GPA 3.5–4.0.' },
      { q: 'Який GPA потрібен для вступу до університету Німеччини?', a: 'Університети Німеччини зазвичай вимагають мінімальний еквівалент оцінки 2.5–3.0 за німецькою шкалою. Для конкурентних магістерських програм потрібен еквівалент 2.0 і вище. Іноземцям рекомендується перевірити визнання оцінок через uni-assist або базу anabin.' },
      { q: 'Чи дорівнює GPA 4.0 ста відсоткам?', a: 'Не зовсім. GPA 4.0 у США зазвичай відповідає оцінці A (90–100%). GPA 3.0 (B) — приблизно 80–89%, GPA 2.0 (C) — 70–79%. Точні відсоткові межі різняться між навчальними закладами.' },
      { q: 'Як британська система співвідноситься з GPA?', a: 'Британські дипломи: First Class (70%+) ≈ GPA 3.7–4.0; Upper Second (2:1, 60–69%) ≈ GPA 3.3–3.7; Lower Second (2:2, 50–59%) ≈ GPA 2.7–3.3; Third Class (40–49%) ≈ GPA 2.0–2.7. Британський 2:1 — найпоширеніший диплом, зазвичай вважається еквівалентом GPA ~3.3–3.5 при вступі до магістратури США.' },
      { q: 'Чи використовуються оцінки ECTS при подачі на Erasmus?', a: 'Так. Оцінки ECTS є стандартом для перенесення кредитів у рамках програми Erasmus+ у 40+ європейських країнах. При поданні заявки ви надаєте транскрипт з оцінками від вашого університету, який приймаючий ВНЗ переводить у свою систему.' },
      { q: 'Наскільки точний цей конвертер систем оцінок?', a: 'Конвертер дає наближене значення на основі типових граничних значень. Для офіційного перекладу оцінок (вступ до аспірантури, ліцензування) звертайтеся до акредитованих сервісів: WES (США/Канада), NARIC (Великобританія), uni-assist (Німеччина).' },
    ],
  },
  fr: {
    description: 'Ce convertisseur de systèmes de notation traduit instantanément n\'importe quelle note entre 5 systèmes majeurs utilisés dans le monde. Entrez votre note et sélectionnez le système source pour obtenir les équivalents dans tous les autres. Particulièrement utile pour les étudiants internationaux et les candidats aux universités étrangères.\n\nConvertir une note allemande en GPA américain est l\'un des besoins les plus courants — le système allemand utilise une échelle de 1,0 à 6,0 (où 1,0 est la meilleure note), ce qui est l\'inverse de la plupart des autres systèmes. Utilisez cet outil comme référence avant une évaluation officielle des diplômes.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment convertir une note allemande en GPA américain ?', a: 'Le système allemand : 1,0 = sehr gut (très bien) ≈ GPA 4,0 ; 1,5 ≈ GPA 3,7 ; 2,0 ≈ GPA 3,3 ; 2,5 ≈ GPA 3,0 ; 3,0 ≈ GPA 2,7 ; 3,5 ≈ GPA 2,3 ; 4,0 ≈ GPA 2,0. Attention : en Allemagne, 1,0 est la note maximale (excellent) — c\'est l\'inverse de la plupart des autres systèmes.' },
      { q: 'Comment fonctionne le convertisseur ?', a: 'Le convertisseur normalise toutes les notes sur une échelle interne de 0 à 100 %, puis les convertit dans chaque système cible. Il s\'agit d\'une approximation, car les frontières des systèmes varient selon les établissements. Pour une conversion officielle, consultez un service d\'évaluation des diplômes accrédité.' },
      { q: 'Qu\'est-ce que l\'échelle ECTS ?', a: 'L\'ECTS utilise des lettres de A (10 % les meilleurs) à E (50 % inférieurs mais admis), avec F comme échec. Seuils approximatifs : A ≥ 90 %, B ≥ 80 %, C ≥ 70 %, D ≥ 60 %, E ≥ 50 %. L\'ECTS est le standard pour les transferts de crédits dans Erasmus+ dans plus de 40 pays européens.' },
      { q: 'En quoi le système allemand est-il différent ?', a: 'Le système allemand (1,0–6,0) est l\'inverse de la plupart des systèmes. 1,0 = sehr gut (très bien/excellent), 1,6–2,5 = gut (bien), 2,6–3,5 = befriedigend (satisfaisant), 3,6–4,0 = ausreichend (suffisant/admis), au-dessus de 4,0 = insuffisant. Une note allemande de 1,0 est la plus haute — équivalente à A+ aux États-Unis.' },
      { q: 'Quel GPA faut-il pour étudier en Allemagne ?', a: 'Les universités allemandes exigent généralement un équivalent de 2,5–3,0 sur l\'échelle allemande pour l\'admission. Pour les Masters compétitifs (TU Munich, LMU, Heidelberg), un équivalent de 2,0 ou mieux est souvent requis. Les candidats étrangers doivent faire évaluer leurs notes via uni-assist ou vérifier la base de données anabin.' },
      { q: 'Un GPA de 4,0 équivaut-il à 100 % ?', a: 'Pas exactement. Un GPA de 4,0 correspond généralement à la note A (90–100 %). GPA 3,0 (B) ≈ 80–89 %, GPA 2,0 (C) ≈ 70–79 %. Les seuils exacts varient selon les établissements.' },
      { q: 'Comment le système UK se compare-t-il au GPA ?', a: 'Les diplômes britanniques utilisent des classifications : First Class (70%+) ≈ GPA 3,7–4,0 ; Upper Second (2:1, 60–69 %) ≈ GPA 3,3–3,7 ; Lower Second (2:2, 50–59 %) ≈ GPA 2,7–3,3 ; Third Class (40–49 %) ≈ GPA 2,0–2,7. Un 2:1 britannique est généralement considéré comme équivalent à un GPA ~3,3–3,5 pour les admissions en Master aux États-Unis.' },
      { q: 'Comment le système russe/ukrainien se convertit-il en GPA ?', a: 'Échelle russe/ukrainienne sur 5 points : 5 (отлично/відмінно) ≈ GPA 4,0 ; 4 (хорошо/добре) ≈ GPA 3,0 ; 3 (удовлетворительно) ≈ GPA 2,0 ; 2 = échec. Une moyenne russe de 4,5–5,0 est généralement considérée comme équivalente à un GPA 3,5–4,0 pour les dossiers de Master américains.' },
      { q: 'Les notes ECTS sont-elles utilisées dans les candidatures Erasmus ?', a: 'Oui. Les notes ECTS sont le standard pour les transferts de crédits dans Erasmus+ dans plus de 40 pays. Lors de votre candidature, vous fournissez votre relevé de notes et l\'université d\'accueil les convertit dans son système. Les notes ECTS (A–F) figurent sur le Supplément au diplôme européen.' },
      { q: 'Quelle est la précision de ce convertisseur de systèmes de notation ?', a: 'Ce convertisseur fournit une approximation basée sur les valeurs limites typiques. Pour une conversion officielle (admission en Master, reconnaissance professionnelle), consultez un service accrédité : WES (États-Unis/Canada), NARIC (Royaume-Uni), uni-assist (Allemagne), ENIC-NARIC (France/Europe).' },
    ],
  },
  lt: {
    description: 'Šis pažymių sistemų konverteris akimirksniu verčia bet kokį pažymį tarp 5 pagrindinių sistemų, naudojamų visame pasaulyje. Įveskite pažymį ir pasirinkite šaltinio sistemą — gaukite atitikmenis visose kitose. Ypač naudingas tarptautiniams studentams ir stojantiems į užsienio universitetus.\n\nKonverteris aktualus verčiant vokiškus pažymius į JAV GPA — Vokietijos sistema naudoja 1,0–6,0 skalę (kur 1,0 yra geriausias pažymys), kas yra priešinga daugumai kitų sistemų. Naudokite šį įrankį kaip orientyrą prieš oficialų akademinių dokumentų vertinimą.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip konvertuoti vokišką pažymį į JAV GPA?', a: 'Vokietijos sistema: 1,0 = sehr gut (puikiai) ≈ GPA 4,0; 1,5 ≈ GPA 3,7; 2,0 ≈ GPA 3,3; 2,5 ≈ GPA 3,0; 3,0 ≈ GPA 2,7; 3,5 ≈ GPA 2,3; 4,0 ≈ GPA 2,0. Svarbu: Vokietijoje 1,0 yra aukščiausias pažymys — priešingai daugumai kitų sistemų.' },
      { q: 'Kaip veikia konverteris?', a: 'Konverteris normalizuoja visus pažymius į vidinę 0–100 % skalę, o tada konvertuoja į kiekvieną tikslinę sistemą. Tai apytiksliai rezultatai — pažymių sistemų ribos skiriasi priklausomai nuo institucijos. Oficialiam pažymių vertinimui kreipkitės į akredituotas institucijas.' },
      { q: 'Kas yra ECTS vertinimo skalė?', a: 'ECTS naudoja raides nuo A (geriausieji 10 %) iki E (žemiausi 50 % išlaikančių), F — neišlaikė. Ribos: A ≥ 90 %, B ≥ 80 %, C ≥ 70 %, D ≥ 60 %, E ≥ 50 %. ECTS yra kreditų perkėlimo standartas Erasmus+ programoje daugiau nei 40 Europos šalyse.' },
      { q: 'Kuo skiriasi Vokietijos pažymių sistema?', a: 'Vokietijos skalė (1,0–6,0) yra priešinga daugumai kitų sistemų. 1,0 = sehr gut (labai gerai/puikiai), 1,6–2,5 = gut (gerai), 2,6–3,5 = befriedigend (patenkinamai), 3,6–4,0 = ausreichend (pakankama/išlaikyta), virš 4,0 = neišlaikyta. Vokiškas 1,0 atitinka JAV A+.' },
      { q: 'Ar GPA 4,0 = 100 %?', a: 'Ne visai. GPA 4,0 paprastai atitinka A pažymį (90–100 %). GPA 3,0 (B) ≈ 80–89 %, GPA 2,0 (C) ≈ 70–79 %. Tikslios procentinės ribos skiriasi priklausomai nuo institucijos.' },
      { q: 'Kaip JK klasifikacija atitinka GPA?', a: 'JK diplomai: First Class (70 %+) ≈ GPA 3,7–4,0; Upper Second (2:1, 60–69 %) ≈ GPA 3,3–3,7; Lower Second (2:2, 50–59 %) ≈ GPA 2,7–3,3; Third Class (40–49 %) ≈ GPA 2,0–2,7. JK 2:1 paprastai laikomas ekvivalentu GPA ~3,3–3,5 stojant į JAV magistrantūrą.' },
      { q: 'Kaip Rusijos/Ukrainos 5 balų skalė konvertuojama į GPA?', a: 'Rusijos/Ukrainos 5 balų skalė: 5 (puikiai) ≈ GPA 4,0; 4 (gerai) ≈ GPA 3,0; 3 (patenkinamai) ≈ GPA 2,0; 2 = neišlaikyta. Rusijos vidurkis 4,5–5,0 paprastai laikomas GPA 3,5–4,0 ekvivalentu JAV magistrantūros paraiškose.' },
      { q: 'Ar ECTS pažymiai naudojami Erasmus paraiškose?', a: 'Taip. ECTS pažymiai yra kreditų perkėlimo standartas Erasmus+ programoje daugiau nei 40 šalių. Teikdami paraišką pateikiate akademinę pažymą, o priimančioji institucija ją konvertuoja į savo sistemą. ECTS pažymiai (A–F) įtraukiami į Europos diplomo priedą.' },
      { q: 'Kiek tikslus šis pažymių sistemų konverteris?', a: 'Konverteris pateikia apytikslį rezultatą pagal tipines kiekvienai sistemai ribines vertes. Oficialiam pažymių vertinimui kreipkitės į akredituotas institucijas: WES (JAV/Kanada), NARIC (JK), uni-assist (Vokietija).' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/converter/grade-system') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function GradeSystemPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/converter/grade-system`,
    applicationCategory: 'EducationApplication',
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
        <GradeSystemConverter locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <RelatedTools locale={locale} tools={related} />
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

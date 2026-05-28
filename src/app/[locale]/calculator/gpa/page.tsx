import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import GpaCalculator from './GpaCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/converter/grade-system', label: 'Grade System Converter' }, { href: '/calculator/age', label: 'Age Calculator' }, { href: '/calculator/date-diff', label: 'Date Difference Calculator' }],
  ru: [{ href: '/converter/grade-system', label: 'Конвертер систем оценок' }, { href: '/calculator/age', label: 'Калькулятор возраста' }, { href: '/calculator/date-diff', label: 'Разница дат' }],
  uk: [{ href: '/converter/grade-system', label: 'Конвертер систем оцінок' }, { href: '/calculator/age', label: 'Калькулятор віку' }, { href: '/calculator/date-diff', label: 'Різниця дат' }],
  fr: [{ href: '/converter/grade-system', label: 'Convertisseur de notes' }, { href: '/calculator/age', label: 'Calculatrice d\'âge' }, { href: '/calculator/date-diff', label: 'Différence de dates' }],
  lt: [{ href: '/converter/grade-system', label: 'Pažymių sistemų konverteris' }, { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' }, { href: '/calculator/date-diff', label: 'Datų skirtumas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'GPA Calculator — Calculate My GPA Online Free (4.0 Scale)',
    description: 'Free GPA calculator online. Enter courses, letter grades and credit hours to instantly calculate your Grade Point Average on the 4.0 scale. Works for high school, middle school, college and university. Determine my GPA in seconds.',
    h1: 'GPA Calculator',
  },
  ru: {
    title: 'Калькулятор GPA — рассчитать средний балл онлайн бесплатно',
    description: 'Бесплатный калькулятор GPA онлайн. Добавьте курсы, выберите буквенные оценки и кредиты — мгновенно рассчитайте средний балл по шкале 4.0. Подходит для вузов США, Европы и международных программ.',
    h1: 'Калькулятор GPA',
  },
  uk: {
    title: 'Калькулятор GPA — розрахувати середній бал онлайн безкоштовно',
    description: 'Безкоштовний калькулятор GPA онлайн. Додайте курси, оберіть буквені оцінки та кредити — миттєво розрахуйте середній бал за шкалою 4.0. Підходить для університетів США, Європи та міжнародних програм.',
    h1: 'Калькулятор GPA',
  },
  fr: {
    title: 'Calculatrice GPA Gratuite — Calculer ma GPA en ligne (échelle 4,0)',
    description: 'Calculatrice GPA gratuite en ligne. Entrez vos cours, notes littérales et crédits pour calculer instantanément votre GPA sur l\'échelle 4,0 américaine. Idéale pour les études aux États-Unis, au Canada ou en programmes internationaux.',
    h1: 'Calculatrice GPA',
  },
  lt: {
    title: 'GPA Skaičiuotuvas — Apskaičiuoti GPA internetu nemokamai',
    description: 'Nemokamas GPA skaičiuotuvas internetu. Pridėkite kursus, pasirinkite raidinius pažymius ir kreditus — iš karto apskaičiuokite vidurkį pagal 4.0 skalę. Tinka JAV, Europos ir tarptautinių programų studentams.',
    h1: 'GPA skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Use our free GPA calculator to instantly calculate your Grade Point Average. Add each course, select the letter grade you received (A+, A, B+, B, C+, C, D, F) and enter the credit hours. The calculator uses the standard US 4.0 scale, weighting each course by its credit hours for an accurate result. Works for high school, middle school, college, and university GPA calculations.\n\nTo calculate your cumulative GPA (CGPA), add all courses from all semesters. Use the Grade System Converter (linked below) to convert between US letter grades, percentages, and international grading systems including German GPA to US GPA conversion.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is GPA calculated?', a: 'GPA = Total Grade Points ÷ Total Credit Hours. Each letter grade has a point value: A+ = 4.3, A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0. Each course\'s grade points = grade value × credit hours. Sum all grade points and divide by total credit hours. Example: A (4.0) in a 3-credit course = 12 grade points.' },
      { q: 'What is a good GPA?', a: 'On the 4.0 scale: 3.7–4.0 is excellent (summa/magna cum laude, Dean\'s List), 3.5–3.69 is very good, 3.0–3.49 is good, 2.5–2.99 is satisfactory, 2.0–2.49 is below average, below 2.0 may put you on academic probation. Most US graduate programs require a minimum 3.0 GPA for admission; competitive programs (law, medicine, MBA) typically require 3.5+.' },
      { q: 'What GPA do I need for college or graduate school?', a: 'For US undergraduate admission: selective colleges prefer 3.7+, competitive state schools 3.5+. For graduate school: most programs require 3.0 minimum; medical school typically 3.5+; law school 3.5+ for top schools; MBA programs 3.2+ for competitive programs. International students should check how their home country grades convert to the 4.0 scale.' },
      { q: 'How to calculate middle school GPA?', a: 'Middle school GPA is calculated the same way as college GPA. Assign point values to letter grades (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0), use credit hours (or equal weights if all courses have the same value), sum the grade points and divide by total credits. Enter your middle school courses in our calculator the same way you would for college.' },
      { q: 'What GPA is 75%?', a: 'A score of 75% typically corresponds to a C+ or B− depending on the school\'s grading scale. On a standard US scale: 90–100% = A (4.0), 80–89% = B (3.0), 70–79% = C (2.0), 60–69% = D (1.0), below 60% = F (0). Some schools use plus/minus grades: 77–79% = C+, 73–76% = C, 70–72% = C−. A 75% average would be approximately 2.0–2.3 GPA.' },
      { q: 'What is the difference between GPA and CGPA?', a: 'GPA (Grade Point Average) can refer to a single term or semester. CGPA (Cumulative GPA) is the weighted average across all completed semesters. Most official transcripts show CGPA. To calculate your CGPA with our tool, enter all courses from every semester you\'ve completed.' },
      { q: 'Does an A+ count as 4.0 or 4.3?', a: 'It depends on the institution. Most US high schools and many colleges cap the unweighted scale at 4.0 (A+ = 4.0). Some universities use a 4.3 scale (A+ = 4.3) to differentiate exceptional performance. Our calculator uses the 4.3 scale. For weighted GPA (AP/honors courses), A+ can reach 5.0 on a 5-point scale.' },
      { q: 'What is a weighted vs unweighted GPA?', a: 'Unweighted GPA uses the standard 4.0 scale regardless of course difficulty. Weighted GPA adds extra points for honors, AP, or IB courses (typically +0.5 for honors, +1.0 for AP). For example, an A in an AP course = 5.0 on a weighted scale vs 4.0 unweighted. Colleges receive both and consider course rigor alongside GPA.' },
      { q: 'How is GPA calculated in Ireland?', a: 'Irish universities use a different scale: First Class Honours (1.1) = 70%+, Second Class Honours Upper (2.1) = 60–69%, Second Class Honours Lower (2.2) = 50–59%, Pass (3rd) = 40–49%, Fail below 40%. To convert to US GPA: 1.1 ≈ 4.0, 2.1 ≈ 3.0–3.5, 2.2 ≈ 2.5–3.0. Use our Grade System Converter for detailed conversions.' },
      { q: 'What is point grade average?', a: '"Point grade average" is another term for GPA (Grade Point Average) — your academic average expressed as a number on a fixed scale (typically 4.0 in the US, 10.0 in India, or various national scales). The term is sometimes used in international contexts. All refer to the same concept: a weighted average of your course grades.' },
      { q: 'How can I improve my GPA?', a: 'Key strategies: retake courses where you scored below C (if your school allows grade replacement); prioritize high-credit courses as they affect GPA more; focus on courses with straightforward grading criteria; seek help early when struggling rather than waiting for exams; use Pass/Fail options for electives if your school offers them; and remember that GPA recovery takes time — each new semester can raise it by 0.1–0.3 points.' },
    ],
  },
  ru: {
    description: 'Используйте бесплатный калькулятор GPA для мгновенного расчёта среднего балла по американской системе. Добавьте каждый курс, выберите буквенную оценку (A+, A, B+, B, C+, C, D, F) и введите количество кредитов. Калькулятор использует стандартную шкалу 4.0 с взвешиванием по кредитным часам.\n\nDля расчёта кумулятивного GPA (CGPA) — добавьте все курсы за все семестры. Для перевода российской пятибалльной системы в GPA используйте Конвертер систем оценок (ссылка ниже).',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитывается GPA?', a: 'GPA = Сумма баллов ÷ Сумма кредитов. Числовые значения: A+ = 4.3, A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0. Баллы курса = числовое значение оценки × кредиты. Пример: A (4.0) в курсе на 3 кредита = 12 баллов.' },
      { q: 'Какой GPA считается хорошим?', a: 'По шкале 4.0: 3.7–4.0 — отлично (summa cum laude, Dean\'s List), 3.5–3.69 — очень хорошо, 3.0–3.49 — хорошо, 2.5–2.99 — удовлетворительно, ниже 2.0 — риск академических санкций. Большинство магистерских программ США требуют минимум 3.0; медицинские и юридические школы — 3.5+.' },
      { q: 'Как перевести российские оценки в GPA?', a: 'Приблизительный перевод: 5 (отлично) ≈ 3.7–4.0, 4 (хорошо) ≈ 2.7–3.3, 3 (удовлетворительно) ≈ 1.7–2.3, 2 (неудовлетворительно) = 0. Для точного перевода используйте Конвертер систем оценок. При поступлении в иностранные вузы обычно требуется официальный перевод диплома.' },
      { q: 'Что такое кумулятивный GPA (CGPA)?', a: 'GPA — средний балл за один семестр. CGPA (Cumulative GPA) — взвешенный средний балл за все пройденные семестры. Именно CGPA указывается в официальных транскриптах. Для расчёта CGPA добавьте в калькулятор все курсы за все семестры.' },
      { q: 'A+ — это 4.0 или 4.3?', a: 'Зависит от учебного заведения. Многие американские школы и вузы ограничивают шкалу 4.0 (A+ = 4.0). Часть университетов использует шкалу 4.3 (A+ = 4.3) для дифференциации отличников. Наш калькулятор применяет шкалу 4.3.' },
      { q: 'Какой GPA нужен для поступления в магистратуру США?', a: 'Минимальный GPA для магистратуры в большинстве американских университетов — 3.0. Для конкурентных программ (MBA, юриспруденция, медицина) — 3.5+. Технические специальности иногда принимают при 2.8 с сильным профилем. Помните, что GPA — не единственный критерий: GRE/GMAT, мотивационное письмо и опыт также важны.' },
      { q: 'Взвешенный и невзвешенный GPA — в чём разница?', a: 'Невзвешенный GPA использует стандартную шкалу 4.0 независимо от сложности курса. Взвешенный GPA добавляет баллы за курсы повышенной сложности (AP, IB, Honours): обычно +0.5 за Honours, +1.0 за AP. Колледжи получают оба показателя и учитывают уровень сложности программы.' },
      { q: 'Как рассчитать GPA для средней школы?', a: 'Расчёт GPA для средней школы ничем не отличается от вузовского. Присвойте числовые значения оценкам (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0), умножьте на количество кредитов (или используйте равные веса), сложите и разделите на сумму кредитов.' },
      { q: 'Как повысить GPA?', a: 'Основные стратегии: пересдача курсов с низкими оценками (если вуз допускает замену оценки); фокус на курсах с большим количеством кредитов; своевременное обращение за помощью при отставании; использование Pass/Fail для факультативных курсов. Помните: повышение GPA — постепенный процесс, каждый семестр может добавить 0.1–0.3 пункта.' },
      { q: 'Насколько точен этот калькулятор GPA?', a: 'Калькулятор вычисляет GPA по стандартной формуле с точностью до двух знаков после запятой. Результат совпадёт с официальным GPA вашего вуза, если тот использует шкалу 4.0/4.3. Если ваш вуз использует другую шкалу, результат будет отличаться.' },
    ],
  },
  uk: {
    description: 'Використовуйте безкоштовний калькулятор GPA для миттєвого розрахунку середнього балу за американською системою. Додайте кожен курс, оберіть буквену оцінку (A+, A, B+, B, C+, C, D, F) та введіть кількість кредитів. Калькулятор використовує стандартну шкалу 4.0 з зважуванням за кредитними годинами.\n\nДля розрахунку кумулятивного GPA (CGPA) — додайте всі курси за всі семестри. Для перекладу вітчизняної системи оцінювання в GPA використовуйте Конвертер систем оцінок (посилання нижче).',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розраховується GPA?', a: 'GPA = Сума балів ÷ Сума кредитів. Числові значення: A+ = 4.3, A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0. Бали курсу = числове значення оцінки × кредити. Приклад: A (4.0) в курсі на 3 кредити = 12 балів.' },
      { q: 'Який GPA вважається гарним?', a: 'За шкалою 4.0: 3.7–4.0 — відмінно (summa cum laude, Dean\'s List), 3.5–3.69 — дуже добре, 3.0–3.49 — добре, 2.5–2.99 — задовільно, нижче 2.0 — ризик академічних санкцій. Більшість магістерських програм США вимагають мінімум 3.0; медичні та юридичні школи — 3.5+.' },
      { q: 'Як перевести українські оцінки в GPA?', a: 'Приблизний переклад: 5 / A (90–100) ≈ 4.0, 4 / B (75–89) ≈ 3.0, 3 / C (60–74) ≈ 2.0, 2 / F (нижче 60) = 0. Для точного конвертування використовуйте Конвертер систем оцінок. При вступі до іноземних вузів зазвичай потрібен офіційний переклад диплома.' },
      { q: 'Що таке кумулятивний GPA (CGPA)?', a: 'GPA — середній бал за один семестр. CGPA (Cumulative GPA) — зважений середній бал за всі пройдені семестри. Саме CGPA зазначається в офіційних транскриптах. Для розрахунку CGPA додайте в калькулятор усі курси за всі семестри.' },
      { q: 'A+ — це 4.0 чи 4.3?', a: 'Залежить від навчального закладу. Багато американських шкіл і університетів обмежують шкалу 4.0 (A+ = 4.0). Частина університетів використовує шкалу 4.3 (A+ = 4.3). Наш калькулятор застосовує шкалу 4.3.' },
      { q: 'Який GPA потрібен для вступу в магістратуру США?', a: 'Мінімальний GPA для більшості магістерських програм США — 3.0. Для конкурентних (MBA, право, медицина) — 3.5+. GPA — не єдиний критерій: GRE/GMAT, мотиваційний лист і досвід роботи теж мають значення.' },
      { q: 'Зважений і незважений GPA — у чому різниця?', a: 'Незважений GPA використовує стандартну шкалу 4.0 незалежно від складності курсу. Зважений GPA додає бали за курси підвищеної складності (AP, IB, Honours): зазвичай +0.5 за Honours, +1.0 за AP. Коледжі отримують обидва показники і враховують рівень складності програми.' },
      { q: 'Як розрахувати GPA для середньої школи?', a: 'Розрахунок GPA для середньої школи не відрізняється від університетського. Присвойте числові значення оцінкам, помножте на кількість кредитів, складіть і поділіть на суму кредитів. Введіть курси середньої школи в калькулятор так само, як університетські.' },
      { q: 'Як підвищити GPA?', a: 'Основні стратегії: перескладання курсів з низькими оцінками (якщо вуз допускає заміну оцінки); фокус на курсах з великою кількістю кредитів; своєчасне звернення за допомогою при відставанні; використання Pass/Fail для вибіркових курсів. Підвищення GPA — поступовий процес: кожен семестр може додати 0.1–0.3 пункту.' },
      { q: 'Наскільки точний цей калькулятор GPA?', a: 'Калькулятор обчислює GPA за стандартною формулою з точністю до двох знаків після коми. Результат збігатиметься з офіційним GPA вашого вузу, якщо той використовує шкалу 4.0/4.3.' },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice GPA gratuite pour calculer instantanément votre Grade Point Average. Ajoutez chaque cours, sélectionnez la note littérale obtenue (A+, A, B+, B, C, D, F) et entrez les crédits. La calculatrice utilise l\'échelle américaine standard 4,0 avec pondération par crédits. Idéale pour les étudiants en programmes américains, canadiens ou internationaux.\n\nPour calculer votre GPA cumulatif (CGPA), ajoutez tous les cours de tous vos semestres. Utilisez le Convertisseur de notes (lien ci-dessous) pour convertir les notes françaises (sur 20) ou d\'autres systèmes vers l\'échelle 4,0.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment se calcule la GPA ?', a: 'GPA = Total des points de note ÷ Total des crédits. Valeurs numériques : A+ = 4,3, A = 4,0, A− = 3,7, B+ = 3,3, B = 3,0, B− = 2,7, C+ = 2,3, C = 2,0, D = 1,0, F = 0. Points du cours = valeur de note × crédits. Exemple : A (4,0) dans un cours de 3 crédits = 12 points de note.' },
      { q: 'Quelle est une bonne GPA ?', a: 'Sur l\'échelle 4,0 : 3,7–4,0 est excellent (summa cum laude, Dean\'s List), 3,5–3,69 est très bien, 3,0–3,49 est bien, 2,5–2,99 est satisfaisant, en dessous de 2,0 risque des conséquences académiques. La plupart des masters américains exigent un minimum de 3,0 ; les programmes sélectifs (médecine, droit, MBA) 3,5+.' },
      { q: 'Comment convertir les notes françaises en GPA ?', a: 'Conversion approximative depuis le système français (sur 20) : 16–20/20 ≈ A (4,0), 14–15,9 ≈ B+ (3,3), 12–13,9 ≈ B (3,0), 10–11,9 ≈ C (2,0), 8–9,9 ≈ D (1,0), moins de 8 = F (0). Pour une conversion précise, utilisez le Convertisseur de notes. Les universités américaines peuvent demander une traduction officielle.' },
      { q: 'Quelle est la différence entre GPA et CGPA ?', a: 'La GPA désigne généralement une seule période (semestre ou trimestre). La CGPA (GPA cumulatif) est la moyenne pondérée sur tous les semestres complétés. C\'est la CGPA qui figure sur les relevés de notes officiels. Pour la calculer, entrez tous les cours de tous vos semestres dans notre outil.' },
      { q: 'A+ vaut-il 4,0 ou 4,3 ?', a: 'Cela dépend de l\'établissement. La plupart des lycées et universités américains plafonnent la GPA non pondérée à 4,0 (A+ = 4,0). Certaines universités utilisent l\'échelle 4,3 (A+ = 4,3). Notre calculatrice utilise 4,3 pour plus de granularité.' },
      { q: 'Quelle GPA faut-il pour entrer en master aux États-Unis ?', a: 'La plupart des programmes de master américains exigent une GPA minimale de 3,0. Pour les programmes compétitifs (MBA, droit, médecine), 3,5+ est recommandé. Les étudiants étrangers doivent vérifier comment leurs notes se convertissent : une mention Bien française (14/20) correspond environ à une GPA de 3,0–3,3.' },
      { q: 'GPA pondérée vs non pondérée : quelle différence ?', a: 'La GPA non pondérée utilise l\'échelle 4,0 standard pour tous les cours. La GPA pondérée ajoute des points pour les cours avancés (AP, IB, Honours) : généralement +0,5 pour Honours et +1,0 pour AP. Les universités reçoivent les deux et tiennent compte du niveau des cours suivis.' },
      { q: 'Comment calculer une GPA de lycée ou collège ?', a: 'Le calcul est identique : attribuez des valeurs numériques aux notes, multipliez par les crédits (ou des poids égaux si tous les cours ont la même valeur), additionnez et divisez par le total des crédits. Utilisez notre calculatrice de la même façon pour le lycée ou le collège.' },
      { q: 'Qu\'est-ce que le point grade average ?', a: 'Le "point grade average" (PGA) est simplement un autre nom pour la GPA — la moyenne des notes exprimée sur une échelle numérique. Le terme est parfois utilisé dans les contextes internationaux. La GPA américaine, le GPA irlandais et le point grade average désignent tous le même concept.' },
      { q: 'Comment améliorer sa GPA ?', a: 'Stratégies clés : reprendre les cours où vous avez eu de mauvaises notes (si l\'université autorise le remplacement) ; prioriser les cours à fort crédit ; demander de l\'aide dès le début des difficultés ; utiliser l\'option Pass/Fail pour les électifs si disponible. La GPA remonte progressivement — chaque semestre peut l\'augmenter de 0,1 à 0,3 point.' },
    ],
  },
  lt: {
    description: 'Naudokite nemokamą GPA skaičiuotuvą, kad iš karto apskaičiuotumėte vidurkį pagal Amerikos sistemą. Pridėkite kiekvieną kursą, pasirinkite raidinį pažymį (A+, A, B+, B, C, D, F) ir įveskite kreditų skaičių. Skaičiuotuvas naudoja standartinę JAV 4.0 skalę su kreditų svoriais. Tinka aukštosios, vidurinės mokyklos ir universiteto GPA skaičiavimui.\n\nKumuliatyviam GPA (CGPA) apskaičiuoti pridėkite visus kursus iš visų semestrų. Lietuviškos pažymių sistemos keitimui į GPA naudokite Pažymių sistemų konverterį (nuoroda žemiau).',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip skaičiuojamas GPA?', a: 'GPA = Bendri taškai ÷ Bendri kreditai. Skaitinės reikšmės: A+ = 4,3, A = 4,0, A− = 3,7, B+ = 3,3, B = 3,0, B− = 2,7, C+ = 2,3, C = 2,0, D = 1,0, F = 0. Kurso taškai = pažymio reikšmė × kreditai. Pavyzdys: A (4,0) 3 kreditų kurse = 12 taškų.' },
      { q: 'Koks GPA laikomas geru?', a: 'Pagal 4.0 skalę: 3,7–4,0 — puikiai (summa cum laude, Dean\'s List), 3,5–3,69 — labai gerai, 3,0–3,49 — gerai, 2,5–2,99 — patenkinamai, žemiau 2,0 — akademinės pasekmės. Dauguma JAV magistrantūros programų reikalauja bent 3,0; medicinos ir teisės mokyklos 3,5+.' },
      { q: 'Kaip konvertuoti lietuviškus pažymius į GPA?', a: 'Apytikslis vertimas iš lietuviškos 10 balų sistemos: 9–10 ≈ A (4,0), 8 ≈ B+ (3,3), 7 ≈ B (3,0), 6 ≈ C+ (2,3), 5 ≈ C (2,0), 4 ≈ D (1,0), žemiau 4 = F (0). Tiksliam vertimui naudokite Pažymių sistemų konverterį.' },
      { q: 'Koks skirtumas tarp GPA ir CGPA?', a: 'GPA paprastai reiškia vieno semestro vidurkį. CGPA (kumuliatyvinis GPA) yra svertinis vidurkis per visus baigtuosius semestrus. Oficialūs transkriptai rodo CGPA. Norėdami jį apskaičiuoti, pridėkite visus kursus iš visų semestrų.' },
      { q: 'Ar A+ = 4,0 ar 4,3?', a: 'Tai priklauso nuo institucijos. Daugelis JAV mokyklų ir universitetų riboja skalę iki 4,0 (A+ = 4,0). Kai kurie universitetai naudoja 4,3 skalę (A+ = 4,3). Mūsų skaičiuotuvas naudoja 4,3 skalę.' },
      { q: 'Kokio GPA reikia stojant į JAV magistrantūrą?', a: 'Minimalus GPA daugumai JAV magistrantūros programų — 3,0. Konkurencingoms programoms (MBA, teisė, medicina) — 3,5+. Užsienio studentai turi patikrinti, kaip jų šalies pažymiai konvertuojami į 4,0 skalę.' },
      { q: 'Koks skirtumas tarp svertinio ir nesvertinio GPA?', a: 'Nesvertinis GPA naudoja standartinę 4,0 skalę visiems kursams. Svertinis GPA prideda taškus prie sudėtingesnių kursų (AP, IB, Honours): paprastai +0,5 Honours, +1,0 AP. Universitetai gauna abu rodiklius ir atsižvelgia į kursų sudėtingumą.' },
      { q: 'Kaip apskaičiuoti vidurinės mokyklos GPA?', a: 'Vidurinės mokyklos GPA skaičiavimas nesiskiria nuo universiteto. Priskirkite skaitines reikšmes pažymiams, padauginkite iš kreditų (arba naudokite lygius svorius), sudėkite ir padalinkite iš bendro kreditų skaičiaus.' },
      { q: 'Kaip pagerinti GPA?', a: 'Pagrindinės strategijos: pakartotinai laikykite egzaminus kursams, kuriuose gavote žemus pažymius (jei universitetas leidžia pažymį pakeisti); koncentruokitės į daugiau kreditų turinčius kursus; laiku kreipkitės pagalbos atsilikę; naudokite Pass/Fail galimybę pasirinktiniams kursams. GPA gerėja palaipsniui — kiekvieną semestrą galima padidinti 0,1–0,3 balo.' },
      { q: 'Kiek tikslus šis GPA skaičiuotuvas?', a: 'Skaičiuotuvas apskaičiuoja GPA pagal standartinę formulę, tikslumą iki dviejų skaičių po kablelio. Rezultatas sutaps su jūsų universiteto oficialiu GPA, jei jis naudoja 4,0/4,3 skalę.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/gpa') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function GpaPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: meta.title, description: meta.description, url: `https://www.utilixi.com/${locale}/calculator/gpa`, applicationCategory: 'EducationApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <GpaCalculator locale={locale} />
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

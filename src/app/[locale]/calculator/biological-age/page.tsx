import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import BiologicalAgeCalculator from './BiologicalAgeCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import FaqSection from '@/components/ui/FaqSection';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/bmi', label: 'BMI Calculator' }, { href: '/calculator/heart-rate', label: 'Heart Rate Zones Calculator' }, { href: '/calculator/stress-level', label: 'Stress Level Test' }, { href: '/calculator/calories', label: 'Calorie Calculator' }, { href: '/calculator/sleep', label: 'Sleep Calculator' }],
  ru: [{ href: '/calculator/bmi', label: 'Калькулятор ИМТ' }, { href: '/calculator/heart-rate', label: 'Зоны пульса' }, { href: '/calculator/stress-level', label: 'Тест уровня стресса' }, { href: '/calculator/calories', label: 'Калькулятор калорий' }, { href: '/calculator/sleep', label: 'Калькулятор сна' }],
  uk: [{ href: '/calculator/bmi', label: 'Калькулятор ІМТ' }, { href: '/calculator/heart-rate', label: 'Зони пульсу' }, { href: '/calculator/stress-level', label: 'Тест рівня стресу' }, { href: '/calculator/calories', label: 'Калькулятор калорій' }, { href: '/calculator/sleep', label: 'Калькулятор сну' }],
  fr: [{ href: '/calculator/bmi', label: 'Calculatrice IMC' }, { href: '/calculator/heart-rate', label: 'Zones de fréquence cardiaque' }, { href: '/calculator/stress-level', label: 'Test de stress' }, { href: '/calculator/calories', label: 'Calculatrice de calories' }, { href: '/calculator/sleep', label: 'Calculatrice du sommeil' }],
  lt: [{ href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }, { href: '/calculator/heart-rate', label: 'Širdies ritmo zonos' }, { href: '/calculator/stress-level', label: 'Streso lygio testas' }, { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas' }, { href: '/calculator/sleep', label: 'Miego skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Biological Age Calculator Online — Free Bio Age Test',
    description: 'Free biological age calculator online. Find out your real body age based on lifestyle factors: BMI, exercise frequency, sleep quality, diet, stress, smoking and alcohol. Discover how to reduce your biological age.',
    h1: 'Biological Age Calculator',
    subtitle: 'Estimate your real body age based on lifestyle habits: exercise, sleep, diet, stress, and more.',
  },
  ru: {
    title: 'Калькулятор биологического возраста онлайн — бесплатный тест',
    description: 'Бесплатный калькулятор биологического возраста онлайн. Узнайте реальный возраст вашего тела по образу жизни: ИМТ, физическая активность, сон, питание, стресс, курение и алкоголь.',
    h1: 'Калькулятор биологического возраста',
    subtitle: 'Оцените реальный биологический возраст тела на основе образа жизни: активность, сон, питание, стресс.',
  },
  uk: {
    title: 'Калькулятор біологічного віку онлайн — безкоштовний тест',
    description: 'Безкоштовний калькулятор біологічного віку онлайн. Дізнайтесь реальний вік вашого тіла за способом життя: ІМТ, фізична активність, сон, харчування, стрес, куріння та алкоголь.',
    h1: 'Калькулятор біологічного віку',
    subtitle: 'Оцініть реальний біологічний вік тіла на основі способу життя: активність, сон, харчування, стрес.',
  },
  fr: {
    title: 'Test Âge Biologique Gratuit — Calculez votre âge réel en ligne',
    description: 'Test d\'âge biologique gratuit en ligne. Découvrez l\'âge réel de votre corps selon votre style de vie : IMC, exercice, sommeil, alimentation, stress, tabac et alcool. Calcul âge biologique instantané — sans inscription.',
    h1: 'Calculateur d\'âge biologique',
    subtitle: 'Estimez votre âge corporel réel selon votre mode de vie : exercice, sommeil, alimentation, stress.',
  },
  lt: {
    title: 'Biologinio Amžiaus Skaičiuotuvas — Nemokamas testas internetu',
    description: 'Nemokamas biologinio amžiaus skaičiuotuvas internetu. Sužinokite tikrąjį kūno amžių pagal gyvenimo būdą: KMI, fizinis aktyvumas, miegas, mityba, stresas, rūkymas ir alkoholis.',
    h1: 'Biologinio amžiaus skaičiuotuvas',
    subtitle: 'Įvertinkite tikrąjį kūno amžių pagal gyvenimo būdą: aktyvumas, miegas, mityba, stresas.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Your biological age reflects how well your body is functioning compared to an average person of the same chronological age. Unlike your birth date, biological age can be actively improved through lifestyle changes. This free bio age calculator estimates your biological age based on seven key factors that science has linked to aging rate: BMI, physical activity, sleep quality, smoking status, alcohol consumption, diet quality, and stress levels.\n\nA result lower than your chronological age means your body is aging more slowly than average — a sign of good health habits. A higher result indicates areas where lifestyle changes could meaningfully slow your biological clock. Use the results as a guide for prioritising health improvements, not as a medical diagnosis.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is biological age?', a: 'Biological age is an estimate of how old your body functions relative to population averages for your age group. A 40-year-old with an active lifestyle, healthy BMI, and good sleep may have a biological age of 33, while someone with poor habits might register 48. Unlike chronological age (years lived), biological age reflects cumulative health status and can be changed.' },
      { q: 'What is the difference between chronological age and biological age?', a: 'Chronological age is simply the number of years since you were born — it cannot be changed. Biological age measures how quickly your body is aging at the cellular and organ level, based on biomarkers. Two people of the same chronological age can have biological ages that differ by 10–15 years depending on their lifestyle, genetics, and environment.' },
      { q: 'Can I reduce my biological age?', a: 'Yes. Multiple peer-reviewed studies show that consistent exercise, quality sleep (7–9 hours/night), a Mediterranean-style diet, not smoking, and managing chronic stress can measurably slow or partially reverse biological aging markers. Even moderate improvements — adding 3 exercise sessions per week, for example — can reduce biological age by 2–4 years within months.' },
      { q: 'Which lifestyle factor has the biggest impact on biological age?', a: 'Smoking has one of the strongest negative effects — regular smoking is associated with adding 7–10 biological years. Physical inactivity and chronic poor sleep each add roughly 3–5 years. Obesity (high BMI) adds 2–6 years depending on severity and duration. Conversely, regular vigorous exercise is consistently the single most powerful anti-aging lifestyle intervention, with studies showing it can reduce biological age by 5–10 years in previously sedentary people.' },
      { q: 'How does BMI affect biological age?', a: 'Being significantly overweight accelerates cellular aging through chronic inflammation, insulin resistance, and increased oxidative stress. A BMI above 30 is associated with a biological age 3–6 years higher than a healthy-weight person of the same age. Conversely, being underweight (BMI < 18.5) is also associated with faster aging due to nutritional deficiencies and reduced muscle mass.' },
      { q: 'How does sleep affect biological age?', a: 'Chronic sleep deprivation (less than 6 hours/night) accelerates biological aging through elevated cortisol, impaired cell repair, increased inflammation, and disrupted hormone balance. Studies using epigenetic clocks have found that people who consistently sleep fewer than 6 hours have biological ages 3–5 years older than those sleeping 7–9 hours. Sleep quality matters as much as duration — fragmented sleep has similar aging effects.' },
      { q: 'How does exercise reduce biological age?', a: 'Regular aerobic and resistance exercise slows biological aging through multiple pathways: it reduces systemic inflammation, improves telomere maintenance (telomeres shorten with aging), enhances mitochondrial function, and improves cardiovascular and metabolic health. Studies show that highly active 70-year-olds can have the cardiovascular fitness and biological age of sedentary 40-year-olds. Even 150 minutes of moderate exercise per week produces measurable anti-aging effects.' },
      { q: 'What is epigenetic age and how does it relate to biological age?', a: 'Epigenetic age (measured by DNA methylation clocks like the Horvath clock or GrimAge) is currently the most scientifically validated measure of biological age. It measures chemical modifications to DNA that accumulate with aging. Our calculator estimates biological age using lifestyle factors proven to correlate with epigenetic age changes. For a precise epigenetic age test, commercial kits (e.g., TruAge, Elysium Index) are available from approximately $200–300.' },
      { q: 'What foods can reduce biological age?', a: 'Diet has a significant impact on biological aging. Foods associated with slower biological aging: leafy greens, berries (high in antioxidants), fatty fish (omega-3s reduce inflammation), olive oil, nuts, and legumes. The Mediterranean and MIND diets have the strongest evidence. Foods that accelerate aging: ultra-processed foods, excess sugar, trans fats, and heavy alcohol consumption. A poor diet can add 2–4 biological years; an excellent diet can reduce it by a similar amount.' },
      { q: 'How accurate is this biological age calculator?', a: 'This tool provides a lifestyle-based estimate using well-established correlations between health behaviours and aging biomarkers. It is not a clinical diagnostic — actual biological age varies based on genetics, medical history, environmental exposures, and factors not captured in a questionnaire. For a medically validated biological age assessment, consult your doctor about blood biomarker panels or epigenetic testing.' },
      { q: 'How much can biological age differ from chronological age?', a: 'Research shows that biological age can diverge from chronological age by 10–20 years in either direction. In large population studies, the range of biological ages for people of the same chronological age typically spans 15–25 years. Elite endurance athletes in their 50s often have biological ages equivalent to sedentary adults in their 30s, while people with multiple unhealthy habits can show biological ages 15+ years older than their chronological age.' },
    ],
  },
  ru: {
    description: 'Биологический возраст отражает, насколько хорошо функционирует ваш организм по сравнению со среднестатистическим человеком того же хронологического возраста. В отличие от даты рождения, биологический возраст можно улучшить через изменение образа жизни. Бесплатный калькулятор биологического возраста оценивает ваш реальный возраст тела на основе семи ключевых факторов: ИМТ, физическая активность, качество сна, курение, алкоголь, питание и уровень стресса.\n\nРезультат ниже хронологического возраста означает, что ваш организм стареет медленнее среднего — признак хороших привычек. Результат выше указывает на области, где изменение образа жизни может существенно замедлить биологические часы. Используйте результат как ориентир, а не медицинский диагноз.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое биологический возраст?', a: 'Биологический возраст — оценка того, насколько молодо или старо функционирует ваш организм относительно среднего человека той же возрастной группы. 40-летний с активным образом жизни и нормальным ИМТ может иметь биологический возраст 33 года, а человек с нездоровыми привычками — 48 лет. В отличие от хронологического возраста, биологический можно изменить.' },
      { q: 'В чём разница между хронологическим и биологическим возрастом?', a: 'Хронологический возраст — это количество лет с рождения, изменить его невозможно. Биологический возраст измеряет скорость старения на клеточном и органном уровне. Два человека одного хронологического возраста могут иметь биологический возраст с разницей 10–15 лет в зависимости от образа жизни, генетики и окружающей среды.' },
      { q: 'Можно ли снизить биологический возраст?', a: 'Да. Многочисленные исследования показывают: регулярные физические нагрузки, качественный сон (7–9 часов), средиземноморская диета, отказ от курения и управление хроническим стрессом способны замедлить или частично обратить вспять маркеры биологического старения. Даже умеренные изменения — добавление 3 тренировок в неделю — могут снизить биологический возраст на 2–4 года за несколько месяцев.' },
      { q: 'Какой фактор влияет на биологический возраст сильнее всего?', a: 'Курение имеет один из самых сильных негативных эффектов — добавляет 7–10 биологических лет. Физическая инертность и хронически плохой сон добавляют по 3–5 лет каждый. Ожирение (ИМТ > 30) — ещё 2–6 лет в зависимости от степени. При этом регулярные интенсивные тренировки — самая мощная антивозрастная интервенция: у тренированных 50-летних биологический возраст нередко соответствует 35–40 годам.' },
      { q: 'Как ИМТ влияет на биологический возраст?', a: 'Значительный лишний вес ускоряет клеточное старение через хроническое воспаление, инсулинорезистентность и окислительный стресс. ИМТ выше 30 связан с биологическим возрастом на 3–6 лет старше нормы. Дефицит веса (ИМТ < 18.5) также ускоряет старение из-за нехватки питательных веществ и потери мышечной массы.' },
      { q: 'Как сон влияет на биологический возраст?', a: 'Хроническое недосыпание (менее 6 часов) ускоряет биологическое старение через повышенный кортизол, нарушение клеточного восстановления и хроническое воспаление. Исследования с использованием эпигенетических часов показали: те, кто регулярно спит менее 6 часов, имеют биологический возраст на 3–5 лет старше тех, кто спит 7–9 часов. Качество сна важно не меньше продолжительности.' },
      { q: 'Как физические упражнения снижают биологический возраст?', a: 'Регулярные аэробные и силовые нагрузки замедляют биологическое старение через несколько механизмов: снижают системное воспаление, улучшают поддержание теломер, усиливают митохондриальную функцию. Исследования показывают: высокоактивные 70-летние могут иметь сердечно-сосудистый возраст и биологический возраст 40-летних людей. Даже 150 минут умеренных нагрузок в неделю дают измеримый антивозрастной эффект.' },
      { q: 'Что такое эпигенетический возраст?', a: 'Эпигенетический возраст (измеряется часами метилирования ДНК: часы Хорвата, GrimAge) — самый научно обоснованный метод измерения биологического возраста. Наш калькулятор оценивает биологический возраст по факторам образа жизни, доказанно коррелирующим с эпигенетическими изменениями. Для точного теста доступны коммерческие наборы (TruAge, Elysium Index) — от $200–300.' },
      { q: 'Какие продукты снижают биологический возраст?', a: 'Продукты, замедляющие старение: листовые овощи, ягоды (антиоксиданты), жирная рыба (омега-3 снижают воспаление), оливковое масло, орехи, бобовые. Средиземноморская диета имеет наиболее убедительную доказательную базу. Ускоряют старение: ультраобработанные продукты, избыток сахара, трансжиры, злоупотребление алкоголем. Плохое питание добавляет 2–4 года; хорошее — снижает на столько же.' },
      { q: 'Насколько точен этот калькулятор биологического возраста?', a: 'Калькулятор даёт оценку на основе образа жизни и установленных корреляций между привычками и маркерами старения. Это не клинический диагностический инструмент. Реальный биологический возраст также зависит от генетики, истории болезней и факторов окружающей среды. Для медицински валидированной оценки проконсультируйтесь с врачом об анализах биомаркеров или эпигенетическом тестировании.' },
    ],
  },
  uk: {
    description: 'Біологічний вік відображає, наскільки добре функціонує ваш організм порівняно з середньостатистичною людиною того ж хронологічного віку. На відміну від дати народження, біологічний вік можна покращити через зміну способу життя. Безкоштовний калькулятор біологічного віку оцінює реальний вік вашого тіла за сімома ключовими факторами: ІМТ, фізична активність, якість сну, куріння, алкоголь, харчування та рівень стресу.\n\nРезультат нижчий за хронологічний вік означає, що ваш організм старіє повільніше за середнє — ознака хороших звичок. Вищий результат вказує на сфери, де зміна способу життя може суттєво сповільнити біологічний годинник. Використовуйте результат як орієнтир, а не медичний діагноз.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке біологічний вік?', a: 'Біологічний вік — оцінка того, наскільки молодо або старо функціонує ваш організм відносно середньої людини тієї ж вікової групи. 40-річний з активним способом життя може мати біологічний вік 33 роки, а людина з нездоровими звичками — 48 років. На відміну від хронологічного, біологічний вік можна змінити.' },
      { q: 'У чому різниця між хронологічним і біологічним віком?', a: 'Хронологічний вік — це кількість років від народження, змінити його неможливо. Біологічний вік вимірює швидкість старіння на клітинному рівні. Дві людини одного хронологічного віку можуть мати біологічний вік з різницею 10–15 років залежно від способу життя, генетики та середовища.' },
      { q: 'Чи можна знизити біологічний вік?', a: 'Так. Численні дослідження показують: регулярні фізичні навантаження, якісний сон (7–9 годин), середземноморська дієта, відмова від куріння та управління хронічним стресом здатні сповільнити або частково обернути вспять маркери біологічного старіння. Навіть помірні зміни — 3 тренування на тиждень — можуть знизити біологічний вік на 2–4 роки за кілька місяців.' },
      { q: 'Який фактор впливає на біологічний вік найбільше?', a: 'Куріння має один з найсильніших негативних ефектів — додає 7–10 біологічних років. Фізична інертність і хронічно поганий сон додають по 3–5 років кожен. Ожиріння (ІМТ > 30) — ще 2–6 років. При цьому регулярні інтенсивні тренування — найпотужніше антивікове втручання: у тренованих 50-річних біологічний вік нерідко відповідає 35–40 рокам.' },
      { q: 'Як ІМТ впливає на біологічний вік?', a: 'Значний надмір ваги прискорює клітинне старіння через хронічне запалення, інсулінорезистентність і окислювальний стрес. ІМТ вище 30 пов\'язаний з біологічним віком на 3–6 років старшим за норму. Дефіцит ваги (ІМТ < 18.5) також прискорює старіння через нестачу поживних речовин і втрату м\'язової маси.' },
      { q: 'Як сон впливає на біологічний вік?', a: 'Хронічне недосипання (менше 6 годин) прискорює біологічне старіння через підвищений кортизол, порушення клітинного відновлення та хронічне запалення. Дослідження з використанням епігенетичних годинників показали: ті, хто регулярно спить менше 6 годин, мають біологічний вік на 3–5 років старший за тих, хто спить 7–9 годин.' },
      { q: 'Як фізичні вправи знижують біологічний вік?', a: 'Регулярні аеробні та силові навантаження сповільнюють біологічне старіння: знижують системне запалення, покращують підтримку теломер, посилюють мітохондріальну функцію. Дослідження показують: високоактивні 70-річні можуть мати серцево-судинний і біологічний вік 40-річних. Навіть 150 хвилин помірних навантажень на тиждень дають відчутний антивіковий ефект.' },
      { q: 'Що таке епігенетичний вік?', a: 'Епігенетичний вік (вимірюється годинниками метилювання ДНК: годинники Хорвата, GrimAge) — найбільш науково обґрунтований метод вимірювання біологічного віку. Наш калькулятор оцінює біологічний вік за факторами способу життя, що доведено корелюють з епігенетичними змінами. Для точного тесту доступні комерційні набори (TruAge, Elysium Index) — від $200–300.' },
      { q: 'Які продукти знижують біологічний вік?', a: 'Продукти, що сповільнюють старіння: листові овочі, ягоди (антиоксиданти), жирна риба (омега-3 знижують запалення), оливкова олія, горіхи, бобові. Середземноморська дієта має найбільш переконливу доказову базу. Прискорюють старіння: ультраоброблені продукти, надлишок цукру, трансжири, зловживання алкоголем.' },
      { q: 'Наскільки точний цей калькулятор біологічного віку?', a: 'Калькулятор дає оцінку на основі способу життя та встановлених кореляцій між звичками і маркерами старіння. Це не клінічний діагностичний інструмент. Для медично валідованої оцінки проконсультуйтеся з лікарем щодо аналізів біомаркерів або епігенетичного тестування.' },
    ],
  },
  fr: {
    description: 'L\'âge biologique reflète l\'état réel de fonctionnement de votre corps par rapport à une personne moyenne du même âge chronologique. Contrairement à votre date de naissance, l\'âge biologique peut être amélioré grâce à des changements de mode de vie. Ce test d\'âge biologique gratuit estime votre âge réel en fonction de sept facteurs clés : IMC, activité physique, qualité du sommeil, tabagisme, alcool, alimentation et stress.\n\nUn résultat inférieur à votre âge chronologique signifie que votre corps vieillit moins vite que la moyenne — signe de bonnes habitudes de vie. Un résultat supérieur indique des domaines où des changements pourraient significativement ralentir votre horloge biologique. Utilisez ce calcul d\'âge biologique comme guide, pas comme diagnostic médical.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que l\'âge biologique ?', a: 'L\'âge biologique est une estimation de la façon dont votre corps fonctionne par rapport aux moyennes de la population du même groupe d\'âge. Une personne de 40 ans avec un mode de vie actif peut avoir un âge biologique de 33 ans, tandis qu\'une avec de mauvaises habitudes peut en avoir 48. Contrairement à l\'âge chronologique, l\'âge biologique peut être modifié.' },
      { q: 'Quelle est la différence entre âge chronologique et âge biologique ?', a: 'L\'âge chronologique est le nombre d\'années depuis votre naissance — il ne peut pas être modifié. L\'âge biologique mesure la vitesse à laquelle votre corps vieillit au niveau cellulaire et organique. Deux personnes du même âge chronologique peuvent avoir des âges biologiques différant de 10 à 15 ans selon leur mode de vie, leur génétique et leur environnement.' },
      { q: 'Peut-on réduire son âge biologique ?', a: 'Oui. De nombreuses études montrent que l\'exercice régulier, un sommeil de qualité (7–9 heures/nuit), un régime méditerranéen, ne pas fumer et gérer le stress chronique peuvent ralentir ou partiellement inverser les marqueurs du vieillissement biologique. Même des améliorations modérées — ajouter 3 séances d\'exercice par semaine — peuvent réduire l\'âge biologique de 2 à 4 ans en quelques mois.' },
      { q: 'Quel facteur de mode de vie a le plus grand impact sur l\'âge biologique ?', a: 'Le tabagisme a l\'un des effets négatifs les plus forts — il est associé à un vieillissement de 7 à 10 ans supplémentaires. La sédentarité et le mauvais sommeil chronique ajoutent chacun 3 à 5 ans. L\'obésité (IMC > 30) ajoute 2 à 6 ans selon la durée et la sévérité. À l\'inverse, l\'exercice vigoureux régulier est l\'intervention anti-âge la plus puissante : des sportifs de 70 ans peuvent avoir l\'âge biologique de sédentaires de 40 ans.' },
      { q: 'Comment l\'IMC influence-t-il l\'âge biologique ?', a: 'Le surpoids significatif accélère le vieillissement cellulaire par l\'inflammation chronique, la résistance à l\'insuline et le stress oxydatif. Un IMC supérieur à 30 est associé à un âge biologique de 3 à 6 ans plus élevé que la moyenne. À l\'inverse, la maigreur (IMC < 18,5) accélère aussi le vieillissement en raison de carences nutritionnelles et de la perte de masse musculaire.' },
      { q: 'Comment le sommeil affecte-t-il l\'âge biologique ?', a: 'La privation chronique de sommeil (moins de 6 heures/nuit) accélère le vieillissement biologique via une élévation du cortisol, une réparation cellulaire altérée et une inflammation accrue. Des études utilisant des horloges épigénétiques montrent que les personnes dormant moins de 6 heures ont un âge biologique de 3 à 5 ans supérieur à celles dormant 7 à 9 heures. La qualité du sommeil compte autant que la durée.' },
      { q: 'Comment l\'exercice physique réduit-il l\'âge biologique ?', a: 'L\'exercice aérobie et musculaire régulier ralentit le vieillissement par plusieurs mécanismes : réduction de l\'inflammation systémique, meilleur maintien des télomères, renforcement de la fonction mitochondriale. Des études montrent que des sportifs très actifs de 70 ans peuvent avoir la condition cardiovasculaire et l\'âge biologique de sédentaires de 40 ans. Même 150 minutes d\'exercice modéré par semaine produisent des effets anti-âge mesurables.' },
      { q: 'Qu\'est-ce que l\'âge épigénétique ?', a: 'L\'âge épigénétique (mesuré par les horloges de méthylation de l\'ADN : horloge Horvath, GrimAge) est la mesure la plus scientifiquement validée de l\'âge biologique. Notre calculateur estime l\'âge biologique à partir des facteurs de mode de vie dont la corrélation avec les changements épigénétiques est bien établie. Pour un test précis, des kits commerciaux (TruAge, Elysium Index) sont disponibles à partir de 200–300 $.' },
      { q: 'Quels aliments réduisent l\'âge biologique ?', a: 'Aliments associés à un vieillissement plus lent : légumes verts (épinards, brocoli), baies (antioxydants), poissons gras (oméga-3 anti-inflammatoires), huile d\'olive, noix et légumineuses. Le régime méditerranéen a les preuves les plus solides. Aliments accélérant le vieillissement : ultra-transformés, excès de sucre, graisses trans, alcool excessif. Une bonne alimentation peut réduire l\'âge biologique de 2 à 4 ans.' },
      { q: 'Quel est le test d\'âge biologique le plus fiable ?', a: 'Les tests épigénétiques (méthylation de l\'ADN) comme TruAge, Elysium Index ou Inside Tracker sont les plus validés scientifiquement. Ils coûtent 200–400 € et nécessitent une prise de sang ou un frottis. Pour la plupart des gens, ce calculateur de style de vie gratuit donne une estimation suffisamment précise pour identifier les priorités d\'amélioration sans dépense.' },
      { q: 'Quelle est la précision de ce calculateur d\'âge biologique ?', a: 'Cet outil fournit une estimation basée sur des corrélations établies entre les habitudes de vie et les biomarqueurs du vieillissement. Il ne s\'agit pas d\'un outil de diagnostic clinique. L\'âge biologique réel dépend aussi de la génétique, des antécédents médicaux et d\'expositions environnementales. Pour une évaluation médicalement validée, consultez votre médecin.' },
    ],
  },
  lt: {
    description: 'Biologinis amžius atspindi, kaip gerai funkcionuoja jūsų kūnas, palyginti su vidutinio to paties chronologinio amžiaus žmogumi. Skirtingai nuo gimimo datos, biologinis amžius gali būti pagerintas keičiant gyvenimo būdą. Šis nemokamas biologinio amžiaus skaičiuotuvas įvertina tikrąjį jūsų kūno amžių pagal septynis pagrindinius veiksnius: KMI, fizinį aktyvumą, miego kokybę, rūkymą, alkoholį, mitybą ir stresą.\n\nRezultatas žemesnis už chronologinį amžių reiškia, kad jūsų kūnas sensta lėčiau nei vidutiniškai — tai gero gyvenimo būdo ženklas. Aukštesnis rezultatas nurodo sritis, kur gyvenimo būdo pokyčiai gali žymiai sulėtinti jūsų biologinį laikrodį. Naudokite rezultatą kaip gairę, o ne medicininę diagnozę.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra biologinis amžius?', a: 'Biologinis amžius yra įvertinimas, kaip jaunas ar senas funkcionuoja jūsų kūnas, palyginti su tos pačios amžiaus grupės populiacijos vidurkiais. 40-metis su aktyviu gyvenimo būdu gali turėti 33 metų biologinį amžių, o žmogus su blogais įpročiais — 48 metų. Skirtingai nuo chronologinio, biologinis amžius gali būti keičiamas.' },
      { q: 'Koks skirtumas tarp chronologinio ir biologinio amžiaus?', a: 'Chronologinis amžius — tai metų skaičius nuo gimimo, jo pakeisti neįmanoma. Biologinis amžius matuoja, kaip greitai jūsų kūnas sensta ląstelių ir organų lygmeniu. Du to paties chronologinio amžiaus žmonės gali turėti biologinį amžių, besiskiriantį 10–15 metų, priklausomai nuo gyvenimo būdo, genetikos ir aplinkos.' },
      { q: 'Ar galima sumažinti biologinį amžių?', a: 'Taip. Tyrimai rodo, kad reguliari fizinė veikla, kokybiškas miegas (7–9 val.), Viduržemio jūros dieta, nerūkymas ir streso valdymas gali sulėtinti ar net iš dalies atversti biologinio senėjimo žymenis. Net nedideli pokyčiai — 3 treniruotės per savaitę — per kelis mėnesius gali sumažinti biologinį amžių 2–4 metais.' },
      { q: 'Kuris veiksnys turi didžiausią poveikį biologiniam amžiui?', a: 'Rūkymas turi vieną stipriausių neigiamų poveikių — prideda 7–10 biologinių metų. Fizinis neaktyvumas ir lėtinis blogas miegas — po 3–5 metus kiekvienas. Nutukimas (KMI > 30) — 2–6 metus. Tuo tarpu reguliarios intensyvios treniruotės yra galingiausias antisenėjimo įrankis: aktyvūs 70-mečiai dažnai turi 40-mečių biologinį amžių.' },
      { q: 'Kaip KMI veikia biologinį amžių?', a: 'Didelis antsvoris pagreitina ląstelių senėjimą per lėtinį uždegimą, insulino rezistenciją ir oksidacinį stresą. KMI virš 30 siejamas su 3–6 metais didesniu biologiniu amžiumi nei normos ribose. Nepakankamas svoris (KMI < 18,5) taip pat pagreitina senėjimą dėl mitybos trūkumų ir raumenų masės praradimo.' },
      { q: 'Kaip miegas veikia biologinį amžių?', a: 'Lėtinis miego trūkumas (mažiau nei 6 val.) pagreitina biologinį senėjimą per padidėjusį kortizolio kiekį, sutrikdytą ląstelių atsistatymą ir uždegimą. Epigenetinių laikrodžių tyrimai rodo: miegantys mažiau nei 6 val. turi 3–5 metais didesnį biologinį amžių nei miegantys 7–9 val.' },
      { q: 'Kaip fiziniai pratimai mažina biologinį amžių?', a: 'Reguliari aerobinė ir jėgos veikla sulėtina biologinį senėjimą per kelis mechanizmus: mažina sisteminį uždegimą, gerina telomerų palaikymą, stiprina mitochondrijų funkciją. Tyrimai rodo: labai aktyvūs 70-mečiai gali turėti 40-mečių sėslių žmonių širdies ir kraujagyslių bei biologinį amžių.' },
      { q: 'Kas yra epigenetinis amžius?', a: 'Epigenetinis amžius (matuojamas DNR metilinimo laikrodžiais: Horvath laikrodis, GrimAge) yra moksliškai pagrįsčiausias biologinio amžiaus matavimo metodas. Mūsų skaičiuotuvas įvertina biologinį amžių pagal gyvenimo būdo veiksnius, kurių koreliacija su epigenetiniais pokyčiais yra gerai dokumentuota. Tiksliam testui prieinami komerciniai rinkiniai (TruAge) nuo 200–300 $.' },
      { q: 'Kokie maisto produktai mažina biologinį amžių?', a: 'Senėjimą lėtinantys produktai: lapinės daržovės, uogos (antioksidantai), riebūs jūros produktai (omega-3 mažina uždegimą), alyvuogių aliejus, riešutai, ankštiniai. Viduržemio jūros dieta turi stipriausią mokslinę bazę. Senėjimą greitinantys: ultraperdirbti produktai, perteklinis cukrus, trans riebalai, alkoholis.' },
      { q: 'Kiek tikslus šis biologinio amžiaus skaičiuotuvas?', a: 'Skaičiuotuvas pateikia gyvenimo būdu pagrįstą įvertinimą pagal nusistovėjusias koreliacijas tarp sveikatos elgesio ir senėjimo žymenų. Tai nėra klinikinė diagnostinė priemonė. Tikrasis biologinis amžius taip pat priklauso nuo genetikos ir medicininės istorijos. Mediciniškai pagrįstam įvertinimui kreipkitės į gydytoją.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/biological-age', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BiologicalAgePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/biological-age`,
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
        <RelatedTools locale={locale} tools={related} />
        <ToolActions />
        <BiologicalAgeCalculator locale={locale} />
        <AdInline locale={locale} />
        <DisclaimerNote locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
          <FaqSection title={content.faqTitle} faqs={content.faqs} />
        </div>
      </PageLayout>
    </>
  );
}

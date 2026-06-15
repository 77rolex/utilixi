import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import DiabetesRiskCalculator from './DiabetesRiskCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/bmi', label: 'BMI Calculator' }, { href: '/calculator/biological-age', label: 'Biological Age Calculator' }, { href: '/calculator/ideal-weight', label: 'Ideal Weight Calculator' }, { href: '/calculator/calories', label: 'Calorie Calculator (TDEE)' }, { href: '/calculator/body-fat', label: 'Body Fat Calculator' }],
  ru: [{ href: '/calculator/bmi', label: 'Калькулятор ИМТ' }, { href: '/calculator/biological-age', label: 'Калькулятор биологического возраста' }, { href: '/calculator/ideal-weight', label: 'Калькулятор идеального веса' }, { href: '/calculator/calories', label: 'Калькулятор калорий (TDEE)' }, { href: '/calculator/body-fat', label: 'Калькулятор жира' }],
  uk: [{ href: '/calculator/bmi', label: 'Калькулятор ІМТ' }, { href: '/calculator/biological-age', label: 'Калькулятор біологічного віку' }, { href: '/calculator/ideal-weight', label: 'Калькулятор ідеальної ваги' }, { href: '/calculator/calories', label: 'Калькулятор калорій (TDEE)' }, { href: '/calculator/body-fat', label: 'Калькулятор жиру' }],
  fr: [{ href: '/calculator/bmi', label: 'Calculatrice IMC' }, { href: '/calculator/biological-age', label: 'Âge biologique' }, { href: '/calculator/ideal-weight', label: 'Poids Idéal' }, { href: '/calculator/calories', label: 'Calculatrice de calories (TDEE)' }, { href: '/calculator/body-fat', label: 'Calculatrice de graisse corporelle' }],
  lt: [{ href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }, { href: '/calculator/biological-age', label: 'Biologinio amžiaus skaičiuotuvas' }, { href: '/calculator/ideal-weight', label: 'Idealaus svorio skaičiuotuvas' }, { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas (TDEE)' }, { href: '/calculator/body-fat', label: 'Kūno riebalų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Diabetes Risk Calculator — FINDRISC Score Test', description: 'Free diabetes risk calculator based on the validated FINDRISC questionnaire. Assess your 10-year risk of developing type 2 diabetes in under 2 minutes.', h1: 'Diabetes Risk Calculator', subtitle: 'Assess your 10-year risk of type 2 diabetes using the validated FINDRISC questionnaire in under 2 minutes.' },
  ru: { title: 'Калькулятор риска диабета — тест FINDRISC', description: 'Бесплатный калькулятор риска диабета на основе валидированного опросника FINDRISC. Оцените риск развития диабета 2 типа за 10 лет менее чем за 2 минуты.', h1: 'Калькулятор риска диабета', subtitle: 'Оцените 10-летний риск диабета 2 типа по опроснику FINDRISC менее чем за 2 минуты.' },
  uk: { title: 'Калькулятор ризику діабету — тест FINDRISC', description: 'Безкоштовний калькулятор ризику діабету на основі валідованого опитувальника FINDRISC. Оцініть ризик розвитку діабету 2 типу за 10 років менш ніж за 2 хвилини.', h1: 'Калькулятор ризику діабету', subtitle: 'Оцініть 10-річний ризик діабету 2 типу за опитувальником FINDRISC менш ніж за 2 хвилини.' },
  fr: { title: 'Calculatrice de risque de diabète — Score FINDRISC', description: 'Calculatrice de risque de diabète gratuite basée sur le questionnaire FINDRISC validé. Évaluez votre risque de développer un diabète de type 2 sur 10 ans en moins de 2 minutes.', h1: 'Calculatrice de risque de diabète', subtitle: 'Évaluez votre risque de diabète de type 2 sur 10 ans avec le questionnaire FINDRISC validé en 2 minutes.' },
  lt: { title: 'Diabeto rizikos skaičiuotuvas — FINDRISC testas', description: 'Nemokamas diabeto rizikos skaičiuotuvas, pagrįstas patvirtintu FINDRISC klausimynu. Įvertinkite 10 metų 2 tipo diabeto išsivystymo riziką per mažiau nei 2 minutes.', h1: 'Diabeto rizikos skaičiuotuvas', subtitle: 'Įvertinkite 10 metų 2 tipo diabeto riziką pagal FINDRISC klausimyną per mažiau nei 2 minutes.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This diabetes risk calculator is based on the FINDRISC (Finnish Diabetes Risk Score) questionnaire, one of the most widely validated screening tools for type 2 diabetes risk. It evaluates nine key risk factors: age, BMI, waist circumference, physical activity, diet, history of elevated blood glucose, blood pressure medication, and family history. The resulting score estimates your probability of developing type 2 diabetes within the next 10 years.\n\nType 2 diabetes is largely preventable through lifestyle changes. Early screening is critical because the disease often develops silently for years before diagnosis. If your score is 12 or higher, consider discussing blood glucose testing and preventive strategies with your doctor.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is FINDRISC?', a: 'FINDRISC (Finnish Diabetes Risk Score) is a validated questionnaire developed in Finland and adopted by the International Diabetes Federation. It accurately identifies individuals at high risk of developing type 2 diabetes using simple, non-invasive questions. Studies show it has a sensitivity of about 78% and specificity of 77% for detecting undiagnosed type 2 diabetes.' },
      { q: 'What score means high risk?', a: 'FINDRISC scores: 0–7 = Low risk (1% chance over 10 years), 7–11 = Slightly elevated (4%), 12–14 = Moderate (17%), 15–20 = High (33%), 21–26 = Very high (50%). Scores of 15+ are clinically significant and warrant medical consultation and a blood glucose test.' },
      { q: 'Can type 2 diabetes be prevented?', a: 'Yes — research shows that lifestyle intervention in high-risk individuals can reduce type 2 diabetes incidence by 58%. Key interventions: losing 5–7% of body weight if overweight, at least 150 minutes of moderate exercise per week, reducing saturated fat and increasing fiber intake. Early intervention is far more effective than later treatment.' },
      { q: 'Is this a medical diagnosis?', a: 'No. This calculator is a screening tool only. A high score does not mean you have diabetes — it indicates elevated risk that warrants further evaluation by a healthcare professional. Only blood tests (fasting glucose, HbA1c, or oral glucose tolerance test) can confirm a diabetes diagnosis.' },
      { q: 'What is the difference between type 1 and type 2 diabetes?', a: 'Type 1 diabetes is an autoimmune condition where the immune system destroys insulin-producing cells — it is not preventable and requires lifelong insulin therapy. Type 2 diabetes develops when the body becomes resistant to insulin or doesn\'t produce enough of it, and is strongly associated with lifestyle factors like obesity and inactivity. The FINDRISC tool screens only for type 2 diabetes risk.' },
      { q: 'What are the early symptoms of type 2 diabetes?', a: 'Early symptoms include: increased thirst and frequent urination, unexplained fatigue, blurred vision, slow-healing wounds, frequent infections, and tingling or numbness in hands and feet. However, type 2 diabetes is often asymptomatic in its early stages — which is why regular screening is important, especially if you have risk factors.' },
      { q: 'How does waist circumference affect diabetes risk?', a: 'Excess abdominal fat (visceral fat) is strongly correlated with insulin resistance, the main driver of type 2 diabetes. High-risk thresholds are typically ≥94 cm (37 in) for men and ≥80 cm (31.5 in) for women. Waist circumference is a more reliable predictor of metabolic risk than BMI alone, which is why FINDRISC includes it as a scored variable.' },
      { q: 'Does family history increase my diabetes risk?', a: 'Yes significantly. Having a first-degree relative (parent or sibling) with type 2 diabetes roughly doubles your lifetime risk. Grandparents or other second-degree relatives with diabetes also elevate risk, but less so. Genetic predisposition combined with lifestyle factors explains most type 2 diabetes cases — which is why lifestyle changes are especially important for those with family history.' },
      { q: 'Which blood tests are used to diagnose diabetes?', a: 'Three main tests are used: (1) Fasting plasma glucose — ≥7.0 mmol/L (126 mg/dL) indicates diabetes; (2) HbA1c (glycated haemoglobin) — ≥6.5% indicates diabetes, 5.7–6.4% is prediabetes; (3) 2-hour oral glucose tolerance test — ≥11.1 mmol/L (200 mg/dL) indicates diabetes. A high FINDRISC score is a reason to request these tests from your GP.' },
      { q: 'How often should I be screened for type 2 diabetes?', a: 'If your FINDRISC score is low (0–7), screening every 3–5 years is generally sufficient. If moderate or high (12+), annual screening with fasting glucose or HbA1c is recommended. People over 45, with obesity (BMI ≥30), or with prediabetes should be screened at least annually regardless of symptoms.' },
    ],
  },
  ru: {
    description: 'Калькулятор риска диабета основан на опроснике FINDRISC (Finnish Diabetes Risk Score) — одном из наиболее валидированных инструментов скрининга риска сахарного диабета 2 типа. Он оценивает девять ключевых факторов риска: возраст, ИМТ, окружность талии, физическую активность, питание, историю повышенного сахара, приём препаратов от давления и семейный анамнез.\n\nДиабет 2 типа во многом предотвратим с помощью изменения образа жизни. Ранний скрининг крайне важен, поскольку заболевание часто развивается бессимптомно годами. Если ваш балл 12 и выше, обсудите с врачом анализ крови на сахар и профилактические меры.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое FINDRISC?', a: 'FINDRISC (Finnish Diabetes Risk Score) — валидированный опросник, разработанный в Финляндии и принятый Международной федерацией диабета. Он выявляет людей с высоким риском развития диабета 2 типа с помощью простых неинвазивных вопросов. Чувствительность — около 78%, специфичность — 77%.' },
      { q: 'Какой балл означает высокий риск?', a: 'Баллы FINDRISC: 0–7 = низкий риск (1% за 10 лет), 7–11 = немного повышен (4%), 12–14 = умеренный (17%), 15–20 = высокий (33%), 21–26 = очень высокий (50%). Баллы от 15 требуют консультации врача и анализа крови на сахар.' },
      { q: 'Можно ли предотвратить диабет 2 типа?', a: 'Да — исследования показывают, что изменение образа жизни у людей из группы риска снижает заболеваемость диабетом на 58%. Ключевые меры: снижение веса на 5–7% при избыточном весе, не менее 150 минут умеренных нагрузок в неделю, уменьшение насыщенных жиров и увеличение клетчатки в рационе.' },
      { q: 'Это медицинский диагноз?', a: 'Нет. Это инструмент скрининга. Высокий балл не означает наличие диабета — он указывает на повышенный риск, требующий обследования у врача. Только анализы крови (глюкоза натощак, HbA1c или тест с нагрузкой глюкозой) могут подтвердить диагноз.' },
      { q: 'В чём разница между диабетом 1 и 2 типа?', a: 'Диабет 1 типа — аутоиммунное заболевание, при котором иммунная система разрушает клетки, производящие инсулин. Он не предотвратим и требует пожизненной инсулинотерапии. Диабет 2 типа развивается при инсулинорезистентности и тесно связан с образом жизни: ожирением и малоподвижностью. Тест FINDRISC оценивает только риск диабета 2 типа.' },
      { q: 'Каковы ранние симптомы диабета 2 типа?', a: 'Ранние симптомы: повышенная жажда и частое мочеиспускание, необъяснимая усталость, нечёткое зрение, медленное заживление ран, частые инфекции, покалывание или онемение в руках и ногах. Однако диабет 2 типа часто протекает бессимптомно на ранних стадиях — именно поэтому важен регулярный скрининг при наличии факторов риска.' },
      { q: 'Как окружность талии влияет на риск диабета?', a: 'Избыток абдоминального жира (висцерального) тесно связан с инсулинорезистентностью — главным механизмом диабета 2 типа. Пороговые значения высокого риска: ≥94 см для мужчин и ≥80 см для женщин. Окружность талии — более надёжный предиктор метаболического риска, чем ИМТ.' },
      { q: 'Влияет ли семейный анамнез на риск диабета?', a: 'Да, значительно. Наличие родителя или брата/сестры с диабетом 2 типа примерно вдвое увеличивает пожизненный риск. Генетическая предрасположенность в сочетании с образом жизни объясняет большинство случаев диабета 2 типа — поэтому изменения образа жизни особенно важны для тех, у кого отягощён семейный анамнез.' },
      { q: 'Какие анализы крови используются для диагностики диабета?', a: 'Три основных теста: (1) Глюкоза плазмы натощак — ≥7,0 ммоль/л указывает на диабет; (2) HbA1c (гликированный гемоглобин) — ≥6,5% — диабет, 5,7–6,4% — преддиабет; (3) 2-часовой тест толерантности к глюкозе — ≥11,1 ммоль/л. Высокий балл FINDRISC — повод попросить эти анализы у врача.' },
      { q: 'Как часто нужно проходить скрининг на диабет 2 типа?', a: 'При низком балле FINDRISC (0–7) достаточно скрининга каждые 3–5 лет. При умеренном или высоком (12+) рекомендуется ежегодный анализ крови на глюкозу или HbA1c. Люди старше 45 лет, с ожирением (ИМТ ≥30) или преддиабетом должны проходить скрининг не реже одного раза в год.' },
    ],
  },
  uk: {
    description: 'Калькулятор ризику діабету заснований на опитувальнику FINDRISC — одному з найбільш валідованих інструментів скринінгу ризику цукрового діабету 2 типу. Він оцінює дев\'ять ключових факторів ризику: вік, ІМТ, окружність талії, фізичну активність, харчування, історію підвищеного цукру, прийом ліків від тиску та сімейний анамнез.\n\nДіабет 2 типу значною мірою можна запобігти за допомогою зміни способу життя. Ранній скринінг є критично важливим, оскільки захворювання часто розвивається безсимптомно роками. Якщо ваш бал 12 і вище, обговоріть з лікарем аналіз крові на цукор і профілактичні заходи.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке FINDRISC?', a: 'FINDRISC (Finnish Diabetes Risk Score) — валідований опитувальник, розроблений у Фінляндії і прийнятий Міжнародною федерацією діабету. Він виявляє людей з високим ризиком розвитку діабету 2 типу за допомогою простих неінвазивних запитань. Чутливість — близько 78%, специфічність — 77%.' },
      { q: 'Який бал означає високий ризик?', a: 'Бали FINDRISC: 0–7 = низький ризик (1% за 10 років), 7–11 = дещо підвищений (4%), 12–14 = помірний (17%), 15–20 = високий (33%), 21–26 = дуже високий (50%). Бали від 15 потребують консультації лікаря та аналізу крові на цукор.' },
      { q: 'Чи можна запобігти діабету 2 типу?', a: 'Так — зміна способу життя у людей з групи ризику знижує захворюваність на 58%. Ключові заходи: зниження ваги на 5–7% при надмірній вазі, не менше 150 хвилин помірних навантажень на тиждень, зменшення насичених жирів і збільшення клітковини.' },
      { q: 'Це медичний діагноз?', a: 'Ні. Це інструмент скринінгу. Лише аналізи крові (глюкоза натщесерце, HbA1c або тест з навантаженням глюкозою) можуть підтвердити діагноз.' },
      { q: 'У чому різниця між діабетом 1 і 2 типу?', a: 'Діабет 1 типу — аутоімунне захворювання, при якому імунна система руйнує клітини, що виробляють інсулін. Він не запобіжний і потребує довічної інсулінотерапії. Діабет 2 типу розвивається при інсулінорезистентності і тісно пов\'язаний із ожирінням та малорухливістю. Тест FINDRISC оцінює лише ризик діабету 2 типу.' },
      { q: 'Які ранні симптоми діабету 2 типу?', a: 'Ранні симптоми: підвищена спрага та часте сечовипускання, невмотивована втома, нечіткий зір, повільне загоєння ран, часті інфекції, поколювання або оніміння в руках і ногах. Однак діабет 2 типу часто протікає безсимптомно на ранніх стадіях — тому регулярний скринінг є важливим.' },
      { q: 'Як окружність талії впливає на ризик діабету?', a: 'Надлишок абдомінального жиру (вісцерального) тісно пов\'язаний з інсулінорезистентністю — головним механізмом діабету 2 типу. Порогові значення: ≥94 см для чоловіків і ≥80 см для жінок. Окружність талії — надійніший предиктор метаболічного ризику, ніж ІМТ.' },
      { q: 'Чи впливає сімейний анамнез на ризик діабету?', a: 'Так, суттєво. Наявність батька, матері або брата/сестри з діабетом 2 типу приблизно вдвічі збільшує довічний ризик. Генетична схильність у поєднанні зі способом життя пояснює більшість випадків діабету 2 типу — тому зміни способу життя особливо важливі для тих, хто має обтяжений сімейний анамнез.' },
      { q: 'Які аналізи крові використовуються для діагностики діабету?', a: 'Три основні тести: (1) Глюкоза плазми натщесерце — ≥7,0 ммоль/л вказує на діабет; (2) HbA1c (глікований гемоглобін) — ≥6,5% — діабет, 5,7–6,4% — переддіабет; (3) 2-годинний тест толерантності до глюкози — ≥11,1 ммоль/л. Високий бал FINDRISC — привід попросити ці аналізи у лікаря.' },
      { q: 'Як часто потрібно проходити скринінг на діабет 2 типу?', a: 'При низькому балі FINDRISC (0–7) достатньо скринінгу кожні 3–5 років. При помірному або високому (12+) рекомендується щорічний аналіз крові. Люди старше 45 років, з ожирінням (ІМТ ≥30) або переддіабетом повинні проходити скринінг не рідше одного разу на рік.' },
    ],
  },
  fr: {
    description: 'Cette calculatrice de risque de diabète est basée sur le questionnaire FINDRISC (Finnish Diabetes Risk Score), l\'un des outils de dépistage les plus validés pour le risque de diabète de type 2. Il évalue neuf facteurs de risque clés : âge, IMC, tour de taille, activité physique, alimentation, antécédents de glycémie élevée, médicaments antihypertenseurs et antécédents familiaux.\n\nLe diabète de type 2 est largement évitable grâce à des changements de mode de vie. Le dépistage précoce est crucial car la maladie se développe souvent silencieusement pendant des années. Si votre score est de 12 ou plus, discutez d\'un test de glycémie et de stratégies préventives avec votre médecin.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le FINDRISC ?', a: 'Le FINDRISC (Finnish Diabetes Risk Score) est un questionnaire validé développé en Finlande et adopté par la Fédération internationale du diabète. Il identifie les personnes à risque élevé de développer un diabète de type 2 avec une sensibilité d\'environ 78 % et une spécificité de 77 %.' },
      { q: 'Quel score indique un risque élevé ?', a: 'Scores FINDRISC : 0–7 = faible risque (1 % sur 10 ans), 7–11 = légèrement élevé (4 %), 12–14 = modéré (17 %), 15–20 = élevé (33 %), 21–26 = très élevé (50 %). Un score ≥ 15 justifie une consultation médicale et un test de glycémie.' },
      { q: 'Peut-on prévenir le diabète de type 2 ?', a: 'Oui — des études montrent que l\'intervention sur le mode de vie réduit l\'incidence du diabète de 58 %. Mesures clés : perdre 5 à 7 % du poids corporel si en surpoids, au moins 150 minutes d\'exercice modéré par semaine, réduire les graisses saturées et augmenter les fibres.' },
      { q: 'Est-ce un diagnostic médical ?', a: 'Non. Il s\'agit uniquement d\'un outil de dépistage. Seuls des tests sanguins (glycémie à jeun, HbA1c ou test de tolérance au glucose) peuvent confirmer un diagnostic de diabète.' },
      { q: 'Quelle est la différence entre le diabète de type 1 et de type 2 ?', a: 'Le diabète de type 1 est une maladie auto-immune où le système immunitaire détruit les cellules productrices d\'insuline — il n\'est pas évitable et nécessite une insulinothérapie à vie. Le diabète de type 2 se développe lorsque l\'organisme devient résistant à l\'insuline, fortement associé à l\'obésité et à la sédentarité. Le FINDRISC évalue uniquement le risque de diabète de type 2.' },
      { q: 'Quels sont les premiers symptômes du diabète de type 2 ?', a: 'Les symptômes précoces incluent : soif accrue et mictions fréquentes, fatigue inexpliquée, vision floue, cicatrisation lente, infections fréquentes, fourmillements ou engourdissements des mains et des pieds. Cependant, le diabète de type 2 est souvent asymptomatique à ses débuts — d\'où l\'importance du dépistage régulier.' },
      { q: 'Comment le tour de taille affecte-t-il le risque de diabète ?', a: 'L\'excès de graisse abdominale (viscérale) est fortement corrélé à l\'insulinorésistance. Les seuils à risque élevé sont ≥94 cm pour les hommes et ≥80 cm pour les femmes. Le tour de taille est un prédicteur plus fiable du risque métabolique que l\'IMC seul.' },
      { q: 'Les antécédents familiaux augmentent-ils le risque de diabète ?', a: 'Oui, significativement. Avoir un parent ou un frère/sœur atteint de diabète de type 2 double approximativement le risque. La prédisposition génétique combinée aux facteurs de mode de vie explique la plupart des cas — d\'où l\'importance des changements de mode de vie pour les personnes avec des antécédents familiaux.' },
      { q: 'Quels tests sanguins sont utilisés pour diagnostiquer le diabète ?', a: 'Trois tests principaux : (1) Glycémie à jeun — ≥7,0 mmol/L indique un diabète ; (2) HbA1c — ≥6,5 % = diabète, 5,7–6,4 % = prédiabète ; (3) Test de tolérance au glucose — ≥11,1 mmol/L. Un score FINDRISC élevé est une raison de demander ces tests à votre médecin.' },
      { q: 'À quelle fréquence se faire dépister pour le diabète de type 2 ?', a: 'Si votre score FINDRISC est faible (0–7), un dépistage tous les 3 à 5 ans est généralement suffisant. Si modéré ou élevé (12+), un dépistage annuel par glycémie ou HbA1c est recommandé. Les personnes de plus de 45 ans, obèses (IMC ≥30) ou prédiabétiques devraient être dépistées au moins une fois par an.' },
    ],
  },
  lt: {
    description: 'Šis diabeto rizikos skaičiuotuvas pagrįstas FINDRISC (Finnish Diabetes Risk Score) klausimynu — vienu iš labiausiai patvirtintų 2 tipo diabeto rizikos atrankos įrankių. Jis įvertina devynius pagrindinius rizikos veiksnius: amžių, KMI, juosmens apimtį, fizinį aktyvumą, mitybą, padidėjusio cukraus kiekio kraujyje istoriją, vaistų nuo spaudimo vartojimą ir šeimos istoriją.\n\n2 tipo diabeto dažniausiai galima išvengti keičiant gyvenimo būdą. Ankstyva atranka yra labai svarbi, nes liga dažnai vystosi be simptomų daugelį metų. Jei jūsų balas yra 12 ar daugiau, aptarkite su gydytoju kraujo cukraus tyrimą ir prevencines priemones.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra FINDRISC?', a: 'FINDRISC (Finnish Diabetes Risk Score) — patvirtintas klausimynas, sukurtas Suomijoje ir priimtas Tarptautinės diabeto federacijos. Jis identifikuoja asmenis, kurių rizika susirgti 2 tipo diabetu yra didelė, naudodamas paprastus neinvazinius klausimus. Jautrumas — apie 78 %, specifiškumas — 77 %.' },
      { q: 'Koks balas rodo didelę riziką?', a: 'FINDRISC balai: 0–7 = maža rizika (1 % per 10 metų), 7–11 = šiek tiek padidėjusi (4 %), 12–14 = vidutinė (17 %), 15–20 = didelė (33 %), 21–26 = labai didelė (50 %). Balai nuo 15 reikalauja medicininės konsultacijos ir kraujo cukraus testo.' },
      { q: 'Ar galima išvengti 2 tipo diabeto?', a: 'Taip — tyrimai rodo, kad gyvenimo būdo pakeitimai didelės rizikos asmenims sumažina diabeto dažnį 58 %. Pagrindinės priemonės: sumažinti svorį 5–7 % esant antsvorį, ne mažiau kaip 150 minučių vidutinio intensyvumo pratimų per savaitę, mažinti sočiuosius riebalus ir didinti skaidulinių medžiagų kiekį.' },
      { q: 'Ar tai medicininė diagnozė?', a: 'Ne. Tai tik atrankos priemonė. Tik kraujo tyrimai (gliukozė nevalgius, HbA1c arba gliukozės tolerancijos testas) gali patvirtinti diabeto diagnozę.' },
      { q: 'Koks skirtumas tarp 1 ir 2 tipo diabeto?', a: '1 tipo diabetas yra autoimuninė liga, kurios metu imuninė sistema naikina insuliną gaminančias ląsteles — jo negalima išvengti ir reikia visą gyvenimą vartoti insuliną. 2 tipo diabetas išsivysto, kai organizmas tampa atsparus insulinui, ir yra glaudžiai susijęs su nutukimu ir nejudumu. FINDRISC įvertina tik 2 tipo diabeto riziką.' },
      { q: 'Kokie yra ankstyvieji 2 tipo diabeto simptomai?', a: 'Ankstyvieji simptomai: padidėjęs troškulys ir dažnas šlapinimasis, nepaaiškinamas nuovargis, neryškus regėjimas, lėtas žaizdų gijimas, dažnos infekcijos, dilgčiojimas ar tirpimas rankose ir kojose. Tačiau 2 tipo diabetas ankstyvose stadijose dažnai neturi simptomų — todėl reguliari atranka yra svarbi.' },
      { q: 'Kaip juosmens apimtis veikia diabeto riziką?', a: 'Perteklinis pilvo riebalų kiekis (visceraliniai riebalai) yra glaudžiai susijęs su insulino rezistencija. Didelės rizikos ribos: ≥94 cm vyrams ir ≥80 cm moterims. Juosmens apimtis yra patikimesnis medžiagų apykaitos rizikos rodiklis nei vien KMI.' },
      { q: 'Ar šeimos istorija didina diabeto riziką?', a: 'Taip, reikšmingai. Turėti tėvą, motiną ar brolį/seserį, sergančią 2 tipo diabetu, maždaug dvigubina visą gyvenimo riziką. Genetinis polinkis kartu su gyvenimo būdo veiksniais paaiškina daugumą 2 tipo diabeto atvejų — todėl gyvenimo būdo keitimas ypač svarbus turintiems šeimos istoriją.' },
      { q: 'Kokie kraujo tyrimai naudojami diabetui diagnozuoti?', a: 'Trys pagrindiniai tyrimai: (1) Plazmos gliukozė nevalgius — ≥7,0 mmol/L rodo diabetą; (2) HbA1c — ≥6,5 % = diabetas, 5,7–6,4 % = prediabetas; (3) 2 valandų gliukozės tolerancijos testas — ≥11,1 mmol/L. Didelis FINDRISC balas yra priežastis paprašyti šių tyrimų iš gydytojo.' },
      { q: 'Kaip dažnai reikia tikrintis dėl 2 tipo diabeto?', a: 'Esant mažam FINDRISC balui (0–7), paprastai pakanka tikrintis kas 3–5 metus. Esant vidutiniam ar dideliam (12+), rekomenduojama kasmetinė gliukozės arba HbA1c analizė. Vyresni nei 45 metų asmenys, nutukę (KMI ≥30) arba turintys prediabetą turėtų tikrintis ne rečiau kaip kartą per metus.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/diabetes-risk', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DiabetesRiskPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: meta.title, description: meta.description, url: `https://www.utilixi.com/${locale}/calculator/diabetes-risk`, applicationCategory: 'HealthApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } };

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
        <DiabetesRiskCalculator locale={locale} />
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

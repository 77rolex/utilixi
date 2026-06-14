import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import StressLevelCalculator from './StressLevelCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/biological-age', label: 'Biological Age Calculator' }, { href: '/calculator/heart-rate', label: 'Heart Rate Zones' }, { href: '/calculator/sleep', label: 'Sleep Calculator' }, { href: '/calculator/bmi', label: 'BMI Calculator' }, { href: '/calculator/calories', label: 'Calorie Calculator' }],
  ru: [{ href: '/calculator/biological-age', label: 'Калькулятор биологического возраста' }, { href: '/calculator/heart-rate', label: 'Пульсовые зоны' }, { href: '/calculator/sleep', label: 'Калькулятор сна' }, { href: '/calculator/bmi', label: 'Калькулятор ИМТ' }, { href: '/calculator/calories', label: 'Калькулятор калорий' }],
  uk: [{ href: '/calculator/biological-age', label: 'Калькулятор біологічного віку' }, { href: '/calculator/heart-rate', label: 'Пульсові зони' }, { href: '/calculator/sleep', label: 'Калькулятор сну' }, { href: '/calculator/bmi', label: 'Калькулятор ІМТ' }, { href: '/calculator/calories', label: 'Калькулятор калорій' }],
  fr: [{ href: '/calculator/biological-age', label: 'Âge biologique' }, { href: '/calculator/heart-rate', label: 'Zones de FC' }, { href: '/calculator/sleep', label: 'Calculatrice du sommeil' }, { href: '/calculator/bmi', label: 'Calculatrice IMC' }, { href: '/calculator/calories', label: 'Calculatrice de calories' }],
  lt: [{ href: '/calculator/biological-age', label: 'Biologinio amžiaus skaičiuotuvas' }, { href: '/calculator/heart-rate', label: 'Pulso zonos' }, { href: '/calculator/sleep', label: 'Miego skaičiuotuvas' }, { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }, { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Stress Level Calculator — PSS-10 Perceived Stress Test', description: 'Free online stress level test based on the Perceived Stress Scale (PSS-10). Answer 10 questions to find out if your stress is low, moderate, or high.', h1: 'Stress Level Calculator', subtitle: 'Take the PSS-10 test to find out if your stress level is low, moderate, or high.' },
  ru: { title: 'Калькулятор уровня стресса — тест PSS-10', description: 'Бесплатный тест на уровень стресса по шкале PSS-10. Ответьте на 10 вопросов и узнайте, низкий, умеренный или высокий у вас уровень стресса.', h1: 'Калькулятор уровня стресса', subtitle: 'Пройдите тест PSS-10 и узнайте свой уровень стресса: низкий, умеренный или высокий.' },
  uk: { title: 'Калькулятор рівня стресу — тест PSS-10', description: 'Безкоштовний тест на рівень стресу за шкалою PSS-10. Дайте відповідь на 10 запитань і дізнайтеся свій рівень стресу.', h1: 'Калькулятор рівня стресу', subtitle: 'Пройдіть тест PSS-10 і дізнайтеся свій рівень стресу: низький, помірний чи високий.' },
  fr: { title: 'Calculatrice du niveau de stress — Test PSS-10', description: 'Test de stress gratuit basé sur l\'échelle PSS-10. Répondez à 10 questions pour savoir si votre stress est faible, modéré ou élevé.', h1: 'Calculatrice du niveau de stress', subtitle: 'Passez le test PSS-10 pour savoir si votre niveau de stress est faible, modéré ou élevé.' },
  lt: { title: 'Streso lygio skaičiuotuvas — PSS-10 testas', description: 'Nemokamas streso lygio testas pagal PSS-10 skalę. Atsakykite į 10 klausimų ir sužinokite, ar jūsų stresas žemas, vidutinis ar aukštas.', h1: 'Streso lygio skaičiuotuvas', subtitle: 'Atlikite PSS-10 testą ir sužinokite, ar jūsų stresas yra žemas, vidutinis ar aukštas.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'The Perceived Stress Scale (PSS-10) is one of the most widely used psychological instruments for measuring the perception of stress. Developed by Dr. Sheldon Cohen in 1983, it asks about feelings and thoughts during the last month. The PSS assesses the degree to which situations in one\'s life are seen as stressful. Understanding your stress level is the first step toward managing it effectively.\n\nChronic stress affects physical health as much as mental wellbeing. Sustained high stress is linked to cardiovascular disease, weakened immunity, digestive problems, sleep disorders, and cognitive decline. The PSS-10 is not a medical diagnosis — it is a self-awareness tool. If your score is consistently high, consider consulting a healthcare professional or psychologist.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the PSS-10?', a: 'The Perceived Stress Scale (PSS-10) is a validated 10-item psychological questionnaire developed by Sheldon Cohen at Carnegie Mellon University. It measures the degree to which situations in your life are appraised as stressful. It is not a clinical diagnostic tool but a widely used screening instrument in research and wellness settings.' },
      { q: 'What do the score ranges mean?', a: 'Scores range from 0 to 40. Low stress: 0–13 — you handle life events well. Moderate stress: 14–26 — you face typical daily pressures and may benefit from stress reduction strategies. High stress: 27–40 — you are experiencing significant stress that may affect your health; consider speaking to a professional.' },
      { q: 'Why are some questions reversed?', a: 'Questions 4, 5, 7, and 8 ask about positive experiences (feeling confident, things going your way). These are scored in reverse — answering "very often" for these reduces your stress score, reflecting good coping. This design makes the scale more accurate and reduces response bias.' },
      { q: 'What can I do to reduce my stress level?', a: 'Evidence-based strategies include: regular aerobic exercise (30 min/day), mindfulness meditation, adequate sleep (7–9 hours), reducing caffeine and alcohol, time management techniques, social support from friends and family, and professional counseling or therapy if needed.' },
      { q: 'How accurate is the PSS-10 as a stress measure?', a: 'The PSS-10 has strong psychometric properties — it has been validated across many cultures, age groups, and languages with consistently high reliability (Cronbach\'s alpha ~0.78–0.91). However, it measures perceived stress rather than objective stressors. Two people in identical situations may score very differently based on their coping resources, personality, and resilience. Use it as a self-reflection tool, not a definitive measure.' },
      { q: 'What is the difference between acute stress and chronic stress?', a: 'Acute stress is short-term — triggered by an immediate threat or challenge (a deadline, an argument, near-miss accident). The body\'s fight-or-flight response activates, and once the threat passes, the body recovers. Chronic stress is ongoing — caused by prolonged situations like financial problems, relationship conflict, job insecurity, or caregiving. The PSS-10 measures perceived chronic stress over the past month. Chronic stress, unlike acute, causes long-term physiological damage.' },
      { q: 'How does stress affect physical health?', a: 'Chronic high stress triggers sustained release of cortisol and adrenaline. Long-term effects include: elevated blood pressure and heart disease risk; weakened immune function (more frequent illness); digestive problems (IBS, acid reflux); disrupted sleep; muscle tension and chronic pain; hormonal imbalances; and increased risk of anxiety and depression. Reducing chronic stress through lifestyle changes measurably improves these markers.' },
      { q: 'What is the link between stress and sleep?', a: 'Stress and poor sleep form a vicious cycle. High cortisol levels from stress suppress melatonin (the sleep hormone) and increase arousal, making it hard to fall asleep. Sleep deprivation in turn elevates cortisol, reducing resilience to future stressors. Improving either sleep or stress management tends to improve the other. Sleep hygiene interventions (consistent bedtime, dark/cool room, no screens 1 hour before bed) are among the most effective stress interventions.' },
      { q: 'When should I seek professional help for stress?', a: 'Consider professional help if: your PSS-10 score is consistently in the high range (27+); stress significantly impairs your work, relationships, or daily functioning; you experience physical symptoms (chest pain, chronic headaches, gastrointestinal issues) linked to stress; you turn to alcohol or other substances to cope; or you feel hopeless or have thoughts of self-harm. Cognitive-behavioral therapy (CBT) and other evidence-based therapies have strong evidence for stress and anxiety disorders.' },
      { q: 'What is the difference between stress and burnout?', a: 'Stress typically involves too much — too many demands, pressures, and responsibilities, with the sense that things will improve if you can just get through it. Burnout is characterised by exhaustion, cynicism, and a sense of ineffectiveness — it is the result of prolonged, unresolved stress, especially work-related. Burnout requires more recovery time than stress; it often involves emotional detachment and reduced professional efficacy. The Maslach Burnout Inventory (MBI) is the most used burnout assessment tool.' },
      { q: 'Can the PSS-10 be used for children or teenagers?', a: 'The standard PSS-10 is validated for adults (18+). For adolescents (13–18), a modified version called the PSS-C (Child/Adolescent) exists with age-appropriate language. For younger children, observational and parent-report tools are more appropriate. If you are concerned about stress in a young person, consult a school counsellor or child psychologist rather than relying solely on self-report questionnaires.' },
    ],
  },
  ru: {
    description: 'Шкала воспринимаемого стресса (PSS-10) — один из наиболее широко применяемых психологических инструментов для измерения уровня стресса. Разработана доктором Шелдоном Коэном в 1983 году. Тест задаёт вопросы о чувствах и мыслях в течение последнего месяца, оценивая, насколько ситуации воспринимаются как стрессовые. Понимание своего уровня стресса — первый шаг к его эффективному управлению.\n\nХронический стресс влияет на физическое здоровье не меньше, чем на психическое. Длительный высокий стресс связан с сердечно-сосудистыми заболеваниями, ослаблением иммунитета, расстройствами ЖКТ, нарушениями сна и снижением когнитивных функций. PSS-10 — не медицинский диагноз, а инструмент самопознания. При стабильно высоких баллах обратитесь к специалисту.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое PSS-10?', a: 'Шкала воспринимаемого стресса (PSS-10) — валидированный психологический опросник из 10 вопросов, разработанный Шелдоном Коэном в Университете Карнеги–Меллон. Он измеряет, насколько ситуации в жизни воспринимаются как стрессовые. Не является клиническим диагностическим инструментом, но широко используется в исследованиях.' },
      { q: 'Что означают диапазоны баллов?', a: 'Баллы от 0 до 40. Низкий стресс: 0–13 — вы хорошо справляетесь с жизненными событиями. Умеренный стресс: 14–26 — вы испытываете типичное давление и можете воспользоваться методами снижения стресса. Высокий стресс: 27–40 — вы испытываете значительный стресс, который может влиять на здоровье.' },
      { q: 'Почему некоторые вопросы оцениваются в обратном порядке?', a: 'Вопросы 4, 5, 7 и 8 касаются позитивного опыта (уверенность, всё идёт как надо). Они оцениваются в обратном порядке — частые позитивные ответы снижают балл стресса, отражая хорошие копинг-навыки. Это делает шкалу более точной.' },
      { q: 'Что делать для снижения уровня стресса?', a: 'Научно обоснованные методы: регулярные аэробные нагрузки (30 мин/день), медитация осознанности, достаточный сон (7–9 часов), снижение потребления кофеина и алкоголя, тайм-менеджмент, социальная поддержка, при необходимости — консультация специалиста.' },
      { q: 'Насколько точна PSS-10 как мера стресса?', a: 'PSS-10 обладает высокими психометрическими свойствами — валидирована в разных культурах и возрастных группах с высокой надёжностью (α Кронбаха ~0,78–0,91). Однако она измеряет воспринимаемый стресс, а не объективные стрессоры. Два человека в одинаковых условиях могут получить очень разные баллы в зависимости от копинг-ресурсов и личности. Используйте как инструмент самопознания, а не как окончательный вывод.' },
      { q: 'В чём разница между острым и хроническим стрессом?', a: 'Острый стресс кратковременен — вызывается конкретной угрозой или вызовом (дедлайн, ссора, авария). Тело восстанавливается после его исчезновения. Хронический стресс — длительный, вызванный продолжающимися ситуациями (финансовые проблемы, конфликты, неопределённость). PSS-10 измеряет воспринимаемый хронический стресс за последний месяц. Хронический стресс, в отличие от острого, причиняет долгосрочный физиологический вред.' },
      { q: 'Как стресс влияет на физическое здоровье?', a: 'Хронический высокий стресс вызывает длительное высвобождение кортизола и адреналина. Долгосрочные последствия: повышенное артериальное давление и риск сердечно-сосудистых заболеваний; ослабление иммунитета; расстройства ЖКТ (СРК, гастрит); нарушения сна; мышечные боли; гормональный дисбаланс; повышенный риск тревоги и депрессии.' },
      { q: 'Как стресс связан со сном?', a: 'Стресс и плохой сон образуют порочный круг. Высокий кортизол подавляет мелатонин и повышает возбуждение, мешая засыпанию. Недостаток сна в свою очередь повышает кортизол, снижая устойчивость к стрессу. Улучшение сна или управления стрессом тянет за собой улучшение другого. Гигиена сна (постоянный график, тёмная комната, без гаджетов за час до сна) — одно из наиболее эффективных вмешательств.' },
      { q: 'Когда стоит обратиться за профессиональной помощью?', a: 'Обратитесь к специалисту, если: баллы PSS-10 стабильно в зоне высокого стресса (27+); стресс значительно нарушает работу, отношения или повседневную жизнь; есть физические симптомы (боли в груди, хронические головные боли, проблемы с ЖКТ); вы прибегаете к алкоголю или другим веществам для снятия стресса; есть ощущение безнадёжности или мысли о самоповреждении. КПТ и другие научно обоснованные методы терапии имеют сильную доказательную базу.' },
      { q: 'В чём разница между стрессом и выгоранием?', a: 'Стресс — это слишком много: давление, требования, ощущение, что станет лучше, если переждать. Выгорание характеризуется истощением, цинизмом и ощущением неэффективности — это результат длительного нерешённого стресса, особенно профессионального. Выгорание требует более длительного восстановления. Для его оценки используется Опросник выгорания Маслач (MBI).' },
      { q: 'Можно ли использовать PSS-10 для детей или подростков?', a: 'Стандартная PSS-10 валидирована для взрослых (18+). Для подростков (13–18 лет) существует адаптированная версия PSS-C с возрастным языком. Для детей младшего возраста более подходящими являются наблюдательные инструменты и опросники для родителей. При беспокойстве об уровне стресса у ребёнка обратитесь к школьному психологу или специалисту.' },
    ],
  },
  uk: {
    description: 'Шкала сприйнятого стресу (PSS-10) — один з найбільш широко застосовуваних психологічних інструментів для вимірювання рівня стресу. Розроблена доктором Шелдоном Коеном у 1983 році. Тест задає питання про почуття та думки протягом останнього місяця, оцінюючи, наскільки ситуації сприймаються як стресові. Розуміння свого рівня стресу — перший крок до ефективного управління ним.\n\nХронічний стрес впливає на фізичне здоров\'я не менше, ніж на психічне. Тривалий високий стрес пов\'язаний із серцево-судинними захворюваннями, послабленням імунітету, розладами ШКТ, порушеннями сну та зниженням когнітивних функцій. PSS-10 — не медичний діагноз, а інструмент самопізнання. При стабільно високих балах зверніться до фахівця.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке PSS-10?', a: 'Шкала сприйнятого стресу (PSS-10) — валідований психологічний опитувальник з 10 запитань, розроблений Шелдоном Коеном в Університеті Карнегі–Меллон. Він вимірює, наскільки ситуації в житті сприймаються як стресові. Не є клінічним діагностичним інструментом.' },
      { q: 'Що означають діапазони балів?', a: 'Бали від 0 до 40. Низький стрес: 0–13 — ви добре справляєтеся з подіями. Помірний стрес: 14–26 — ви відчуваєте типовий тиск і можете скористатися методами зниження стресу. Високий стрес: 27–40 — ви відчуваєте значний стрес, який може впливати на здоров\'я.' },
      { q: 'Чому деякі питання оцінюються у зворотному порядку?', a: 'Питання 4, 5, 7 і 8 стосуються позитивного досвіду (впевненість, все йде як треба). Вони оцінюються у зворотному порядку — часті позитивні відповіді знижують бал стресу. Це робить шкалу більш точною.' },
      { q: 'Що робити для зниження рівня стресу?', a: 'Науково обґрунтовані методи: регулярні аеробні навантаження (30 хв/день), медитація усвідомленості, достатній сон (7–9 годин), зниження споживання кофеїну та алкоголю, тайм-менеджмент, соціальна підтримка, за необхідності — консультація спеціаліста.' },
      { q: 'Наскільки точна PSS-10 як міра стресу?', a: 'PSS-10 має високі психометричні властивості — валідована в різних культурах і вікових групах з високою надійністю (α Кронбаха ~0,78–0,91). Однак вона вимірює сприйнятий стрес, а не об\'єктивні стресори. Два людини в однакових умовах можуть отримати дуже різні бали залежно від копінг-ресурсів і особистості. Використовуйте як інструмент самопізнання.' },
      { q: 'В чому різниця між гострим і хронічним стресом?', a: 'Гострий стрес короткочасний — викликається конкретною загрозою чи викликом (дедлайн, сварка, аварія). Тіло відновлюється після його зникнення. Хронічний стрес тривалий, викликається постійними ситуаціями (фінансові проблеми, конфлікти, невизначеність). PSS-10 вимірює сприйнятий хронічний стрес за останній місяць. Хронічний стрес завдає довгострокової фізіологічної шкоди.' },
      { q: 'Як стрес впливає на фізичне здоров\'я?', a: 'Хронічний високий стрес викликає тривале вивільнення кортизолу та адреналіну. Довгострокові наслідки: підвищений артеріальний тиск і ризик серцево-судинних захворювань; послаблення імунітету; розлади ШКТ (СПК, гастрит); порушення сну; м\'язові болі; гормональний дисбаланс; підвищений ризик тривоги та депресії.' },
      { q: 'Як стрес пов\'язаний зі сном?', a: 'Стрес і поганий сон утворюють хибне коло. Високий кортизол пригнічує мелатонін і підвищує збудження, заважаючи засинанню. Нестача сну підвищує кортизол, знижуючи стійкість до стресу. Покращення сну або управління стресом позитивно впливає на інше. Гігієна сну (постійний графік, темна кімната, без гаджетів за годину до сну) — одне з найефективніших втручань.' },
      { q: 'Коли варто звернутися за фаховою допомогою?', a: 'Зверніться до фахівця, якщо: бали PSS-10 стабільно у зоні високого стресу (27+); стрес значно порушує роботу, стосунки або повсякденне життя; є фізичні симптоми (болі в грудях, хронічні головні болі, проблеми з ШКТ); ви вдаєтеся до алкоголю або інших речовин для зняття стресу; є відчуття безнадійності або думки про самоушкодження. КПТ та інші науково обґрунтовані методи терапії мають сильну доказову базу.' },
      { q: 'В чому різниця між стресом і вигоранням?', a: 'Стрес — це занадто багато: тиск, вимоги, відчуття, що стане краще, якщо пережити. Вигорання характеризується виснаженням, цинізмом і відчуттям неефективності — це результат тривалого невирішеного стресу, особливо професійного. Вигорання потребує тривалішого відновлення. Для його оцінки використовується Опитувальник вигорання Маслач (MBI).' },
      { q: 'Чи можна використовувати PSS-10 для дітей або підлітків?', a: 'Стандартна PSS-10 валідована для дорослих (18+). Для підлітків (13–18 років) існує адаптована версія PSS-C з відповідною мовою. Для дітей молодшого віку більш підходящими є спостережні інструменти та опитувальники для батьків. При занепокоєнні щодо рівня стресу у дитини зверніться до шкільного психолога.' },
    ],
  },
  fr: {
    description: 'L\'échelle de stress perçu (PSS-10) est l\'un des instruments psychologiques les plus utilisés pour mesurer la perception du stress. Développée par le Dr Sheldon Cohen en 1983, elle pose des questions sur les sentiments et pensées du dernier mois. La PSS évalue dans quelle mesure les situations de la vie sont perçues comme stressantes. Comprendre son niveau de stress est la première étape pour le gérer efficacement.\n\nLe stress chronique affecte la santé physique autant que le bien-être mental. Un stress élevé prolongé est associé aux maladies cardiovasculaires, à un système immunitaire affaibli, aux troubles digestifs, aux troubles du sommeil et au déclin cognitif. La PSS-10 n\'est pas un diagnostic médical — c\'est un outil de connaissance de soi. Si votre score est régulièrement élevé, consultez un professionnel de santé.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le PSS-10 ?', a: 'L\'échelle de stress perçu (PSS-10) est un questionnaire psychologique validé de 10 items développé par Sheldon Cohen à l\'Université Carnegie Mellon. Il mesure dans quelle mesure les situations de votre vie sont perçues comme stressantes. Ce n\'est pas un outil de diagnostic clinique, mais un instrument de dépistage largement utilisé.' },
      { q: 'Que signifient les plages de scores ?', a: 'Les scores vont de 0 à 40. Stress faible : 0–13 — vous gérez bien les événements. Stress modéré : 14–26 — vous faites face aux pressions quotidiennes et pouvez bénéficier de stratégies de réduction du stress. Stress élevé : 27–40 — vous ressentez un stress important qui peut affecter votre santé.' },
      { q: 'Pourquoi certaines questions sont-elles inversées ?', a: 'Les questions 4, 5, 7 et 8 portent sur des expériences positives (confiance en soi, les choses vont dans votre sens). Elles sont notées à l\'envers — répondre souvent positivement réduit le score de stress, reflétant de bonnes capacités d\'adaptation.' },
      { q: 'Comment réduire mon niveau de stress ?', a: 'Stratégies fondées sur des preuves : exercice aérobique régulier (30 min/jour), méditation de pleine conscience, sommeil suffisant (7–9 heures), réduction de la caféine et de l\'alcool, gestion du temps, soutien social, et si nécessaire, consultation professionnelle.' },
      { q: 'Quelle est la précision du PSS-10 ?', a: 'Le PSS-10 possède de solides propriétés psychométriques — validé dans de nombreuses cultures et groupes d\'âge avec une fiabilité élevée (alpha de Cronbach ~0,78–0,91). Il mesure cependant le stress perçu, pas les facteurs de stress objectifs. Deux personnes dans des situations identiques peuvent obtenir des scores très différents selon leurs ressources d\'adaptation.' },
      { q: 'Quelle est la différence entre stress aigu et stress chronique ?', a: 'Le stress aigu est à court terme — déclenché par une menace immédiate (délai, dispute, accident évité de justesse). Le corps récupère une fois la menace passée. Le stress chronique est continu — causé par des situations prolongées (problèmes financiers, conflits relationnels, insécurité professionnelle). Le PSS-10 mesure le stress chronique perçu au cours du dernier mois. Le stress chronique cause des dommages physiologiques à long terme.' },
      { q: 'Comment le stress affecte-t-il la santé physique ?', a: 'Un stress chronique élevé provoque une libération soutenue de cortisol et d\'adrénaline. Les effets à long terme comprennent : pression artérielle élevée et risque cardiovasculaire accru ; immunité affaiblie ; problèmes digestifs (SCI, reflux) ; troubles du sommeil ; tensions musculaires ; déséquilibres hormonaux ; et risque accru d\'anxiété et de dépression.' },
      { q: 'Quel est le lien entre stress et sommeil ?', a: 'Le stress et le mauvais sommeil forment un cercle vicieux. Le cortisol élevé supprime la mélatonine et augmente l\'éveil, rendant l\'endormissement difficile. Le manque de sommeil élève à son tour le cortisol. Améliorer le sommeil ou la gestion du stress améliore généralement les deux. L\'hygiène du sommeil (horaire régulier, chambre sombre/fraîche, pas d\'écrans 1 heure avant) est l\'une des interventions les plus efficaces.' },
      { q: 'Quand faut-il consulter un professionnel ?', a: 'Consultez un professionnel si : votre score PSS-10 est régulièrement élevé (27+) ; le stress affecte significativement votre travail, vos relations ou votre vie quotidienne ; vous ressentez des symptômes physiques liés au stress ; vous avez recours à l\'alcool pour faire face ; ou vous ressentez un sentiment d\'impuissance. La thérapie cognitivo-comportementale (TCC) a une forte base de preuves pour les troubles anxieux et le stress.' },
      { q: 'Quelle est la différence entre stress et burn-out ?', a: 'Le stress implique généralement trop — trop de demandes et de pression, avec le sentiment que les choses iront mieux. L\'épuisement professionnel (burn-out) est caractérisé par un épuisement, du cynisme et un sentiment d\'inefficacité — c\'est le résultat d\'un stress prolongé non résolu, notamment au travail. Le burn-out nécessite davantage de récupération. L\'inventaire de burn-out de Maslach (MBI) est l\'outil de mesure le plus utilisé.' },
      { q: 'Le PSS-10 peut-il être utilisé pour les enfants ou les adolescents ?', a: 'Le PSS-10 standard est validé pour les adultes (18+). Pour les adolescents (13–18 ans), une version adaptée PSS-C existe avec un langage approprié à l\'âge. Pour les jeunes enfants, des outils d\'observation et de rapport parental sont plus appropriés. En cas d\'inquiétude concernant le stress d\'un jeune, consultez un conseiller scolaire ou un psychologue.' },
    ],
  },
  lt: {
    description: 'Suvokiamo streso skalė (PSS-10) yra vienas iš plačiausiai naudojamų psichologinių instrumentų streso lygiui matuoti. Sukurta dr. Sheldono Coheno 1983 m. Testas klausia apie jausmus ir mintis per praėjusį mėnesį, vertindamas, kiek situacijos gyvenime suvokiamos kaip stresinės. Streso lygio supratimas yra pirmasis žingsnis jo valdymui.\n\nLėtinis stresas veikia fizinę sveikatą ne mažiau nei psichinę gerovę. Ilgalaikis didelis stresas siejamas su širdies ir kraujagyslių ligomis, susilpnėjusiu imunitetu, virškinimo sutrikimais, miego sutrikimais ir kognityvinio gebėjimo sumažėjimu. PSS-10 nėra medicininė diagnozė — tai savęs pažinimo priemonė. Jei jūsų balas nuolat aukštas, pasikonsultuokite su specialistu.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra PSS-10?', a: 'Suvokiamo streso skalė (PSS-10) — tai patvirtintas 10 klausimų psichologinis klausimynas, sukurtas Sheldono Coheno Karnegio Melono universitete. Jis matuoja, kiek gyvenimo situacijos suvokiamos kaip stresinės. Tai nėra klinikinės diagnostikos priemonė, tačiau plačiai naudojama tyrimuose ir sveikatos priežiūroje.' },
      { q: 'Ką reiškia balų intervalai?', a: 'Balai svyruoja nuo 0 iki 40. Mažas stresas: 0–13 — jūs gerai susitvarkyti su gyvenimo įvykiais. Vidutinis stresas: 14–26 — jūs patiriate tipinį kasdienį spaudimą ir galite pasinaudoti streso mažinimo strategijomis. Didelis stresas: 27–40 — jūs patirkiate didelį stresą, kuris gali paveikti jūsų sveikatą.' },
      { q: 'Kodėl kai kurie klausimai yra atvirkštiniai?', a: 'Klausimai 4, 5, 7 ir 8 klausia apie teigiamą patirtį (pasitikėjimas savimi, viskas klostosi gerai). Jie vertinami atvirkštiniai — dažni teigiami atsakymai mažina streso balą. Tai skalę daro tikslesnę.' },
      { q: 'Ką galima padaryti, kad sumažėtų streso lygis?', a: 'Moksliniais įrodymais pagrįstos strategijos: reguliari aerobinė veikla (30 min/dieną), sąmoningumo meditacija, pakankamas miegas (7–9 val.), kofeino ir alkoholio mažinimas, laiko valdymas, socialinė parama ir, jei reikia, profesionali konsultacija.' },
      { q: 'Koks PSS-10 tikslumas?', a: 'PSS-10 turi puikias psichometrines savybes — patvirtinta daugelyje kultūrų ir amžiaus grupių su aukštu patikimumu (Cronbacho α ~0,78–0,91). Tačiau ji matuoja suvokiamą stresą, o ne objektyvius stresoriuis. Du žmonės identiškose situacijose gali gauti labai skirtingus balus priklausomai nuo jų gebėjimų susidoroti ir asmenybės.' },
      { q: 'Kuo skiriasi ūminis ir lėtinis stresas?', a: 'Ūminis stresas yra trumpalaikis — sukeliamas tiesioginio pavojaus ar iššūkio (terminas, ginčas, nelaimingas atsitikimas). Kūnas atsigauna pasibaigus grėsmei. Lėtinis stresas yra nuolatinis — sukeliamas ilgalaikių situacijų (finansinės problemos, santykių konfliktai, darbo netikrumas). PSS-10 matuoja suvokiamą lėtinį stresą per praėjusį mėnesį. Lėtinis stresas sukelia ilgalaikę fiziologinę žalą.' },
      { q: 'Kaip stresas veikia fizinę sveikatą?', a: 'Lėtinis didelis stresas sukelia ilgalaikį kortizolio ir adrenalino išsiskyrimą. Ilgalaikiai poveikiai: padidėjęs kraujospūdis ir širdies ir kraujagyslių ligų rizika; susilpnėjęs imunitetas; virškinimo problemos (IBS, refliuksas); miego sutrikimai; raumenų įtampa; hormonų disbalansas; padidėjusi nerimo ir depresijos rizika.' },
      { q: 'Koks ryšys tarp streso ir miego?', a: 'Stresas ir blogas miegas sudaro užburtą ratą. Didelis kortizolio kiekis slopina melatoniną ir didina budimumą, todėl sunku užmigti. Miego trūkumas savo ruožtu didina kortizolio lygį. Miego higiena (pastovus laikas, tamsi/vėsi patalpa, be ekranų 1 valandą prieš miegą) yra vienas veiksmingiausių streso valdymo metodų.' },
      { q: 'Kada kreiptis į specialistą?', a: 'Kreipkitės į specialistą, jei: PSS-10 balas nuolat aukštas (27+); stresas reikšmingai trikdo darbą, santykius ar kasdienį gyvenimą; jaučiate fizinius simptomus, susijusius su stresu; griebitės alkoholio ar kitų medžiagų stresui malšinti; jaučiatės beviltiški. Kognityvinio-elgesio terapija (KET) turi stiprią įrodymų bazę stresui ir nerimo sutrikimams.' },
      { q: 'Kuo stresas skiriasi nuo perdegimo?', a: 'Stresas paprastai reiškia per daug — per daug reikalavimų ir spaudimo, su jausmu, kad viskas pagerės. Perdegimui būdingas išsekimas, cinizmas ir neefektyvumo jausmas — tai ilgalaikio neišspręsto streso, ypač darbe, rezultatas. Perdegimas reikalauja ilgesnio atsigavimo. Maslach perdegimo aprašas (MBI) yra plačiausiai naudojama perdegimo vertinimo priemonė.' },
      { q: 'Ar PSS-10 galima naudoti vaikams ar paaugliams?', a: 'Standartinė PSS-10 patvirtinta suaugusiesiems (18+). Paaugliams (13–18 metų) egzistuoja pritaikyta PSS-C versija su tinkama kalba. Jaunesniems vaikams labiau tinka stebėjimo ir tėvų ataskaitų priemonės. Susirūpinus paauglio ar vaiko streso lygiu, kreipkitės į mokyklos konsultantą ar vaikų psichologą.' },
    ],
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/stress-level', m);
}

export default async function StressLevelPage({ params }: Props) {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const c = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: m.h1,
    description: m.description,
    url: `https://utilixi.com/${locale}/calculator/stress-level`,
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
        <StressLevelCalculator locale={locale} />
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

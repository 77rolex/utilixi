import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import PregnancyCalculator from './PregnancyCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/ovulation', label: 'Ovulation Calculator' }, { href: '/calculator/bmi', label: 'BMI Calculator' }, { href: '/calculator/ideal-weight', label: 'Ideal Weight Calculator' }, { href: '/calculator/age', label: 'Age Calculator' }, { href: '/calculator/calories', label: 'Calorie Calculator' }],
  ru: [{ href: '/calculator/ovulation', label: 'Калькулятор овуляции' }, { href: '/calculator/bmi', label: 'Калькулятор ИМТ' }, { href: '/calculator/ideal-weight', label: 'Калькулятор идеального веса' }, { href: '/calculator/age', label: 'Калькулятор возраста' }, { href: '/calculator/calories', label: 'Калькулятор калорий' }],
  uk: [{ href: '/calculator/ovulation', label: 'Калькулятор овуляції' }, { href: '/calculator/bmi', label: 'Калькулятор ІМТ' }, { href: '/calculator/ideal-weight', label: 'Калькулятор ідеальної ваги' }, { href: '/calculator/age', label: 'Калькулятор віку' }, { href: '/calculator/calories', label: 'Калькулятор калорій' }],
  fr: [{ href: '/calculator/ovulation', label: "Calculatrice d'Ovulation" }, { href: '/calculator/bmi', label: 'Calculatrice IMC' }, { href: '/calculator/ideal-weight', label: 'Poids Idéal' }, { href: '/calculator/age', label: 'Calculatrice d\'âge' }, { href: '/calculator/calories', label: 'Calculatrice de calories' }],
  lt: [{ href: '/calculator/ovulation', label: 'Ovuliacijos skaičiuotuvas' }, { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }, { href: '/calculator/ideal-weight', label: 'Idealaus svorio skaičiuotuvas' }, { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' }, { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Pregnancy Due Date Calculator — EDD & Gestational Age Online',
    description: 'Free pregnancy calculator. Find your estimated due date (EDD) by last menstrual period or conception date. Track gestational age, trimesters and key milestone dates online.',
    h1: 'Pregnancy Due Date Calculator',
  },
  ru: {
    title: 'Калькулятор беременности онлайн — рассчитать ПДР и срок бесплатно',
    description: 'Бесплатный калькулятор беременности онлайн. Рассчитайте предполагаемую дату родов (ПДР) по дате последней менструации или зачатия. Акушерский срок, триместры и ключевые даты.',
    h1: 'Калькулятор беременности',
  },
  uk: {
    title: 'Калькулятор вагітності онлайн — розрахувати дату пологів і термін',
    description: 'Безкоштовний калькулятор вагітності онлайн. Розрахуйте очікувану дату пологів за датою останньої менструації або зачаття. Акушерський термін, триместри і ключові дати.',
    h1: 'Калькулятор вагітності',
  },
  fr: {
    title: 'Calculatrice de Grossesse Gratuite — Date d\'Accouchement (DPA)',
    description: 'Calculatrice de grossesse gratuite. Calculez votre date prévue d\'accouchement (DPA) à partir de vos dernières règles ou de la date de conception. Âge gestationnel, trimestres et dates clés.',
    h1: 'Calculatrice de Grossesse',
  },
  lt: {
    title: 'Nėštumo Skaičiuotuvas Online — Gimdymo Data ir Trukmė',
    description: 'Nemokamas nėštumo skaičiuotuvas. Apskaičiuokite numatomą gimdymo datą pagal paskutinių mėnesinių datą arba pastojimo datą. Gestacinis amžius, trimestrai ir svarbios datos.',
    h1: 'Nėštumo Skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  description2: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our free pregnancy calculator estimates your due date (EDD) and tracks your gestational age week by week. Simply enter the first day of your last menstrual period (LMP) — the due date is calculated using Naegele\'s rule: LMP + 280 days (40 weeks). If you know your conception date, switch to conception mode and add 266 days (38 weeks) to get the same result.',
    description2: 'The pregnancy due date calculator also shows your current trimester, the number of weeks and days elapsed, and key milestone dates throughout pregnancy. Whether you\'re tracking an early pregnancy or planning ahead, this free EDD calculator gives you instant results — no registration needed.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How is the due date (EDD) calculated?',
        a: 'The calculator uses Naegele\'s rule: add 280 days (40 weeks) to the first day of your last menstrual period (LMP). In conception mode, 266 days (38 weeks) are added to the conception date — giving the same result, assuming conception occurred on day 14 of the cycle.',
      },
      {
        q: 'What is EDD (Estimated Due Date)?',
        a: 'EDD stands for Estimated Due Date — the date your baby is expected to be born. It is calculated at 40 weeks (280 days) from the last menstrual period. The EDD is an estimate: only about 5% of babies are born exactly on that day.',
      },
      {
        q: 'What is the difference between LMP mode and conception date mode?',
        a: 'The "Last Period" (LMP) mode is the standard medical method — doctors use it because the LMP date is easy to remember. The "Conception Date" mode is useful if you know the exact date, for example after IVF treatment or with ovulation tracking apps.',
      },
      {
        q: 'How accurate is the due date calculator?',
        a: 'Naegele\'s rule gives a reliable statistical estimate. Most births occur within 2 weeks before or after the EDD. A first-trimester ultrasound (weeks 8–12) provides the most accurate individual estimate and may adjust the calculated date.',
      },
      {
        q: 'What are the trimesters of pregnancy?',
        a: '1st trimester (weeks 1–13): organ and neural tube formation, high miscarriage risk. 2nd trimester (weeks 14–26): rapid growth, baby starts moving, visible on ultrasound. 3rd trimester (weeks 27–40): final lung and brain development, preparation for birth.',
      },
      {
        q: 'What is gestational age?',
        a: 'Gestational age is the number of weeks and days since the first day of the last menstrual period. For example, "12 weeks 3 days" means 87 days have passed since LMP. Embryonic age (from conception) is typically 2 weeks less than gestational age.',
      },
      {
        q: 'My periods are irregular — can I still use this calculator?',
        a: 'Yes, but results will be less accurate. With irregular cycles, the assumed ovulation on day 14 may not apply. In this case, use the "Conception Date" mode if you know when conception occurred, or rely on a first-trimester ultrasound for a more precise due date.',
      },
      {
        q: 'Can I use my IVF transfer date to calculate the due date?',
        a: 'Yes. For IVF, the gestational age is calculated differently. For a Day 5 blastocyst transfer, add 261 days (37 weeks + 2 days) to the transfer date. For a Day 3 transfer, add 263 days. Many IVF clinics provide the adjusted EDD directly.',
      },
      {
        q: 'What if my baby is born before or after the due date?',
        a: 'Births between 37 and 42 weeks are considered full-term. Births before 37 weeks are preterm; after 42 weeks, post-term. If labour hasn\'t started by 41–42 weeks, doctors may recommend induction.',
      },
      {
        q: 'When should I see a doctor during pregnancy?',
        a: 'As soon as you suspect or confirm pregnancy — ideally before week 10. Early prenatal care allows fetal development monitoring, ultrasound to confirm the due date, screening tests, and early detection of any complications.',
      },
      {
        q: 'What is the difference between gestational age and embryonic age?',
        a: 'Gestational age is measured from the LMP and is the standard used in clinical practice. Embryonic (fetal) age is measured from conception and is approximately 2 weeks less. At 40 weeks gestational age, the embryo is about 38 weeks old.',
      },
    ],
  },
  ru: {
    description: 'Наш бесплатный калькулятор беременности рассчитывает предполагаемую дату родов (ПДР) и срок беременности по неделям. Введите дату последней менструации (ДПМ) — расчёт ведётся по правилу Негеле: ДПМ + 280 дней (40 недель). Если вы знаете дату зачатия, переключитесь на второй режим: к ней прибавляется 266 дней (38 недель).',
    description2: 'Акушерский калькулятор беременности показывает текущий триместр, количество полных недель и дней от зачатия, а также ключевые даты вынашивания. Универсальный калькулятор беременности подходит для расчёта ПДР по ЛМП или по дате зачатия (в том числе ЭКО) — бесплатно, без регистрации.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Как рассчитывается предполагаемая дата родов (ПДР)?',
        a: 'Калькулятор использует правило Негеле: к первому дню последней менструации прибавляется 280 дней (40 недель). В режиме «по дате зачатия» прибавляется 266 дней (38 недель) — результат совпадает при условии, что зачатие произошло на 14-й день цикла.',
      },
      {
        q: 'Что такое ПДР (предполагаемая дата родов)?',
        a: 'ПДР — это прогнозируемая дата рождения ребёнка, рассчитываемая как 40 недель (280 дней) от первого дня последней менструации. ПДР является статистическим показателем: только около 5% родов происходят точно в этот день.',
      },
      {
        q: 'В чём разница между режимами «по ЛМП» и «по дате зачатия»?',
        a: 'Режим «По ЛМП» — стандартный акушерский метод: дату последней менструации легко вспомнить и она используется в медицинских документах. Режим «По дате зачатия» удобен, если вы точно знаете дату — например, после ЭКО или при мониторинге овуляции.',
      },
      {
        q: 'Насколько точен онлайн-калькулятор беременности?',
        a: 'Правило Негеле даёт надёжную среднестатистическую оценку. Большинство родов происходит в пределах 2 недель до или после ПДР. Наиболее точный индивидуальный срок даёт УЗИ в первом триместре (8–12 недель).',
      },
      {
        q: 'Что такое триместры беременности?',
        a: '1-й триместр (1–13 нед.) — формирование органов и нейронной трубки, высокий риск выкидыша. 2-й триместр (14–26 нед.) — активный рост, ребёнок начинает двигаться, хорошо виден на УЗИ. 3-й триместр (27–40 нед.) — созревание лёгких и мозга, подготовка к родам.',
      },
      {
        q: 'Что такое акушерский срок беременности?',
        a: 'Акушерский срок — это количество полных недель и дней с первого дня последней менструации (ДПМ). Например, «12 недель 3 дня» означает, что прошло 87 дней. Эмбриональный срок (от зачатия) обычно на 2 недели меньше акушерского.',
      },
      {
        q: 'Когда нужно вставать на учёт по беременности?',
        a: 'Как только беременность подтверждена, лучше всего до 10 недель. Ранняя постановка на учёт позволяет провести скрининг, уточнить срок по УЗИ, выявить возможные риски и получить необходимые направления. В России государственные женские консультации принимают бесплатно по полису ОМС.',
      },
      {
        q: 'У меня нерегулярный цикл — как использовать калькулятор беременности?',
        a: 'При нерегулярном цикле расчёт по ЛМП менее точен, так как овуляция может произойти не на 14-й день. В таком случае используйте режим «По дате зачатия», если она известна. Наиболее точный срок при нерегулярном цикле определяет УЗИ первого триместра.',
      },
      {
        q: 'Можно ли рассчитать срок беременности после ЭКО?',
        a: 'Да. При переносе 5-дневного бластоциста к дате переноса прибавляют 261 день (37 нед. 2 дня). При переносе 3-дневного эмбриона — 263 дня. Большинство клиник ЭКО сразу указывают скорректированную ПДР.',
      },
      {
        q: 'Что если роды произойдут раньше или позже ПДР?',
        a: 'Роды на сроке 37–42 недели считаются доношенными. До 37 недель — преждевременные, после 42 — переношенные. Если к 41–42 неделям роды не начались, врач может рекомендовать родовозбуждение.',
      },
      {
        q: 'Что такое правило Негеле?',
        a: 'Правило Негеле — медицинская формула расчёта ПДР, предложенная в XIX веке: от первого дня последней менструации отнять 3 месяца и прибавить 7 дней (что равно +280 дням). Применяется в акушерстве по всему миру.',
      },
      {
        q: 'Чем отличается акушерский срок от эмбрионального?',
        a: 'Акушерский срок отсчитывается от даты последней менструации и используется в медицинской документации. Эмбриональный срок — от даты зачатия, он примерно на 2 недели меньше. При акушерском сроке 40 недель эмбрион в возрасте около 38 недель.',
      },
    ],
  },
  uk: {
    description: 'Наш безкоштовний калькулятор вагітності розраховує очікувану дату пологів (ОДП) і термін вагітності по тижнях. Введіть дату останньої менструації (ДОМ) — розрахунок виконується за правилом Негеля: ДОМ + 280 днів (40 тижнів). Якщо ви знаєте дату зачаття, переключіться на відповідний режим.',
    description2: 'Розрахувати термін вагітності онлайн тепер легко: калькулятор показує поточний триместр, кількість тижнів і днів від зачаття, а також ключові дати вагітності. Підходить для розрахунку після ЕКЗ або при нерегулярному циклі — безкоштовно і без реєстрації.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Як розраховується очікувана дата пологів (ОДП)?',
        a: 'Калькулятор використовує правило Негеля: до першого дня останньої менструації (ДОМ) додається 280 днів (40 тижнів). У режимі «по даті зачаття» додається 266 днів (38 тижнів) — результат однаковий, якщо зачаття відбулося на 14-й день циклу.',
      },
      {
        q: 'Що таке ОДП (очікувана дата пологів)?',
        a: 'ОДП — це прогнозована дата народження дитини, що розраховується як 40 тижнів (280 днів) від першого дня останньої менструації. Це статистичне середнє: лише близько 5% дітей народжуються точно в цей день.',
      },
      {
        q: 'У чому різниця між режимами «по ДОМ» і «по даті зачаття»?',
        a: 'Режим «По ДОМ» — стандартний медичний метод, дату останньої менструації легко запам\'ятати. Режим «По даті зачаття» зручний при ЕКЗ або відстеженні овуляції, коли точна дата відома.',
      },
      {
        q: 'Наскільки точний онлайн-калькулятор вагітності?',
        a: 'Правило Негеля — надійна середньостатистична оцінка. Більшість пологів відбуваються в межах 2 тижнів до або після ОДП. Найточніший індивідуальний термін встановлює УЗД першого триместру (8–12 тижнів).',
      },
      {
        q: 'Що таке триместри вагітності?',
        a: '1-й триместр (1–13 тиж.) — формування органів і нервової трубки. 2-й триместр (14–26 тиж.) — активне зростання, дитина починає рухатися, чітко видно на УЗД. 3-й триместр (27–40 тиж.) — дозрівання легень і мозку, підготовка до пологів.',
      },
      {
        q: 'Що таке акушерський термін вагітності?',
        a: 'Акушерський термін — кількість повних тижнів і днів від першого дня останньої менструації. Наприклад, «12 тижнів 3 дні» означає, що минуло 87 днів. Ембріональний термін (від зачаття) зазвичай на 2 тижні менший.',
      },
      {
        q: 'Коли ставати на облік по вагітності в Україні?',
        a: 'Якнайшвидше після підтвердження вагітності, в ідеалі до 12 тижнів. Рання постановка на облік дозволяє провести скринінг першого триместру, уточнити термін за УЗД і отримати обменну карту. В Україні облік ведуть у жіночій консультації безкоштовно.',
      },
      {
        q: 'У мене нерегулярний цикл — чи можна використовувати калькулятор вагітності?',
        a: 'Так, але результат буде менш точним. При нерегулярному циклі овуляція може не відбуватись на 14-й день. Використовуйте режим «По даті зачаття», якщо вона відома, або визначте термін за УЗД першого триместру.',
      },
      {
        q: 'Чи можна розрахувати термін вагітності після ЕКЗ?',
        a: 'Так. При перенесенні 5-денного бластоцисту до дати переносу додають 261 день (37 тиж. 2 дні). При перенесенні 3-денного ембріона — 263 дні. Більшість клінік ЕКЗ одразу надають скоректовану ОДП.',
      },
      {
        q: 'Що якщо пологи відбудуться раніше або пізніше ОДП?',
        a: 'Пологи на 37–42 тижні вважаються доношеними. До 37 тижнів — передчасні, після 42 — переношені. Якщо до 41–42 тижнів пологи не почалися, лікар може рекомендувати стимуляцію.',
      },
      {
        q: 'Що таке правило Негеля?',
        a: 'Правило Негеля — медична формула розрахунку ОДП: від першого дня останньої менструації відняти 3 місяці і додати 7 днів (що дорівнює +280 дням). Застосовується в акушерстві по всьому світу.',
      },
      {
        q: 'Чим відрізняється акушерський термін від ембріонального?',
        a: 'Акушерський термін відраховується від ДОМ і використовується в медичних документах. Ембріональний термін — від зачаття, він приблизно на 2 тижні менший. При акушерському терміні 40 тижнів ембріону близько 38 тижнів.',
      },
    ],
  },
  fr: {
    description: 'Notre calculatrice de grossesse gratuite estime votre date prévue d\'accouchement (DPA) et suit votre grossesse semaine par semaine. Entrez la date de vos dernières règles (DDR) — le calcul utilise la règle de Naegele : DDR + 280 jours (40 semaines). Si vous connaissez la date de conception, utilisez le second mode : 266 jours sont ajoutés pour obtenir le même résultat.',
    description2: 'Cette calculatrice grossesse affiche votre trimestre actuel, le nombre de semaines et jours écoulés, ainsi que les dates importantes. Idéale pour un calcul prénatal rapide — que ce soit après une FIV ou pour un suivi classique — elle est entièrement gratuite et sans inscription.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Comment la date d\'accouchement prévue (DPA) est-elle calculée ?',
        a: 'La calculatrice utilise la règle de Naegele : 280 jours (40 semaines) sont ajoutés au premier jour des dernières règles (DDR). En mode conception, 266 jours (38 semaines) sont ajoutés à la date de conception — le résultat est identique si la conception a eu lieu au 14e jour du cycle.',
      },
      {
        q: 'Qu\'est-ce que la DPA (date prévue d\'accouchement) ?',
        a: 'La DPA est la date estimée de naissance de votre bébé, calculée à 40 semaines (280 jours) depuis la date des dernières règles. C\'est une moyenne statistique : seulement environ 5 % des bébés naissent exactement ce jour-là.',
      },
      {
        q: 'Quelle est la différence entre le mode DDR et le mode date de conception ?',
        a: 'Le mode « Dernières règles » (DDR) est la méthode médicale standard — la DDR est facile à retenir et figure dans les dossiers médicaux. Le mode « Date de conception » est utile si vous connaissez la date exacte, par exemple après une FIV ou avec un suivi de l\'ovulation.',
      },
      {
        q: 'La calculatrice de grossesse est-elle fiable ?',
        a: 'La règle de Naegele donne une estimation statistiquement fiable. La plupart des accouchements surviennent dans les 2 semaines avant ou après la DPA. L\'échographie du premier trimestre (semaines 8–12) fournit l\'estimation individuelle la plus précise.',
      },
      {
        q: 'Quels sont les trimestres de grossesse ?',
        a: '1er trimestre (semaines 1–13) : formation des organes et du tube neural, risque de fausse couche plus élevé. 2e trimestre (semaines 14–26) : croissance rapide, mouvements du bébé, bien visible à l\'échographie. 3e trimestre (semaines 27–40) : maturation des poumons et du cerveau, préparation à la naissance.',
      },
      {
        q: 'Qu\'est-ce que l\'âge gestationnel ?',
        a: 'L\'âge gestationnel est le nombre de semaines et jours depuis le premier jour des dernières règles. Par exemple, « 12 semaines 3 jours » signifie que 87 jours se sont écoulés. L\'âge embryonnaire (depuis la conception) est généralement inférieur de 2 semaines.',
      },
      {
        q: 'Quand prendre le premier rendez-vous prénatal en France ?',
        a: 'Dès que la grossesse est confirmée, idéalement avant la fin du 1er trimestre (12 semaines d\'aménorrhée). La première consultation prénatale obligatoire en France a lieu avant la fin du 3e mois. Elle permet le dépistage du 1er trimestre, l\'échographie et la déclaration de grossesse.',
      },
      {
        q: 'Mes règles sont irrégulières — comment utiliser la calculatrice ?',
        a: 'Le calcul par DDR suppose une ovulation au 14e jour, ce qui n\'est pas toujours le cas. Si vos cycles sont irréguliers, utilisez le mode « Date de conception » si elle est connue. Sinon, l\'échographie du 1er trimestre reste la méthode la plus précise pour dater la grossesse.',
      },
      {
        q: 'Puis-je utiliser la date de transfert FIV pour calculer la DPA ?',
        a: 'Oui. Pour un transfert de blastocyste (J5), ajoutez 261 jours à la date de transfert. Pour un transfert à J3, ajoutez 263 jours. La plupart des centres FIV fournissent directement la DPA ajustée.',
      },
      {
        q: 'Que se passe-t-il si l\'accouchement survient avant ou après la DPA ?',
        a: 'Un accouchement entre 37 et 42 semaines est considéré à terme. Avant 37 semaines, il est prématuré ; après 42 semaines, post-terme. En France, un déclenchement est généralement proposé à partir de 41 semaines d\'aménorrhée.',
      },
      {
        q: 'Qu\'est-ce que la règle de Naegele ?',
        a: 'La règle de Naegele est une formule obstétricale du XIXe siècle : retrancher 3 mois au premier jour des dernières règles et ajouter 7 jours (soit +280 jours au total). Elle reste la référence mondiale pour le calcul de la DPA.',
      },
      {
        q: 'Quelle différence entre âge gestationnel et âge embryonnaire ?',
        a: 'L\'âge gestationnel est compté depuis la DDR et est utilisé dans les documents médicaux. L\'âge embryonnaire est compté depuis la conception et est environ 2 semaines moins élevé. À 40 semaines gestationnelles, l\'embryon a environ 38 semaines.',
      },
    ],
  },
  lt: {
    description: 'Mūsų nemokamas nėštumo skaičiuotuvas apskaičiuoja numatomą gimdymo datą (NGD) ir stebi nėštumo eigą savaitė po savaitės. Įveskite paskutinių mėnesinių (PM) pirmąją dieną — skaičiavimas atliekamas pagal Nėgelio taisyklę: PM + 280 dienų (40 savaičių). Jei žinote pastojimo datą, naudokite antrąjį režimą.',
    description2: 'Nėštumo skaičiuoklė rodo dabartinį trimestrą, savaičių ir dienų skaičių, taip pat svarbias nėštumo datas. Tinka skaičiuoti po IVF ar esant nereguliariam ciklui — nemokamas ir patogus įrankis bet kuriam nėštumo etapui sekti.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kaip apskaičiuojama numatoma gimdymo data (NGD)?',
        a: 'Skaičiuotuvas naudoja Nėgelio taisyklę: prie paskutinių mėnesinių (PM) pirmosios dienos pridedamos 280 dienų (40 savaičių). Pastojimo režime pridedamos 266 dienos (38 savaitės) — rezultatas vienodas, jei pastojimas įvyko 14-ą ciklo dieną.',
      },
      {
        q: 'Kas yra NGD (numatoma gimdymo data)?',
        a: 'NGD — tai prognozuojama kūdikio gimimo data, apskaičiuota kaip 40 savaičių (280 dienų) nuo paskutinių mėnesinių pirmosios dienos. Tai statistinis vidurkis: tik apie 5 % kūdikių gimsta lygiai tą dieną.',
      },
      {
        q: 'Koks skirtumas tarp PM ir pastojimo datos režimų?',
        a: 'Režimas „Pagal PM" — standartinis medicininis metodas, PM datą lengva prisiminti ir ji naudojama medicinos dokumentuose. Režimas „Pagal pastojimą" patogus po IVF ar stebint ovuliaciją, kai tiksli data žinoma.',
      },
      {
        q: 'Ar nėštumo skaičiuotuvas yra tikslus?',
        a: 'Nėgelio taisyklė suteikia patikimą statistinį įvertinimą. Dauguma gimdymų vyksta per 2 savaites iki ar po NGD. Pirmojo trimestro ultragarsas (8–12 sav.) suteikia tikslesnį individualų nėštumo termino įvertinimą.',
      },
      {
        q: 'Kas yra nėštumo trimestrai?',
        a: '1-asis trimestras (1–13 sav.) — organų ir nervų vamzdelio formavimasis. 2-asis trimestras (14–26 sav.) — spartus augimas, kūdikis pradeda judėti, gerai matomas ultragarsu. 3-iasis trimestras (27–40 sav.) — plaučių ir smegenų brendimas, pasiruošimas gimdymui.',
      },
      {
        q: 'Kas yra gestacinis amžius?',
        a: 'Gestacinis amžius — savaičių ir dienų skaičius nuo paskutinių mėnesinių pirmosios dienos. Pvz., „12 savaičių 3 dienos" reiškia, kad praėjo 87 dienos. Embrioninis amžius (nuo pastojimo) paprastai 2 savaitėmis mažesnis.',
      },
      {
        q: 'Kada reikia registruotis pas akušerį-ginekologą Lietuvoje?',
        a: 'Kuo greičiau patvirtinus nėštumą, geriausia iki 12 nėštumo savaičių. Ankstyva priežiūra leidžia atlikti pirmojo trimestro skriningo tyrimus, patikslinti terminą ultragarsu ir gauti nėštumo kortelę. Lietuvoje nėštumo stebėjimas įtrauktas į PSDF finansuojamų paslaugų sąrašą.',
      },
      {
        q: 'Mano menstruacinis ciklas nereguliarus — kaip naudotis skaičiuotuvu?',
        a: 'Skaičiavimas pagal PM dalinai priklauso nuo prielaidos, kad ovuliacija vyksta 14-ą dieną, tačiau esant nereguliariam ciklui tai gali skirtis. Naudokite „Pastojimo datos" režimą, jei data žinoma, arba pasitikslinkite terminą ultragarsu.',
      },
      {
        q: 'Ar galima skaičiuoti pagal IVF perkėlimo datą?',
        a: 'Taip. Perkeliant 5 dienų blastocistą, prie perkėlimo datos pridedamos 261 diena. Perkeliant 3 dienų embrioną — 263 dienos. Dauguma IVF klinikų iš karto nurodo pakoreguotą NGD.',
      },
      {
        q: 'Ką daryti, jei gimdymas bus anksčiau ar vėliau NGD?',
        a: 'Gimdymas tarp 37 ir 42 savaičių laikomas laiku. Iki 37 savaičių — neišnešiotas; po 42 savaičių — perneštasis. Jei gimdymas neprasideda iki 41–42 savaičių, gydytojas gali rekomenduoti gimdymo stimuliavimą.',
      },
      {
        q: 'Kas yra Nėgelio taisyklė?',
        a: 'Nėgelio taisyklė — XIX amžiaus akušerinė formulė: nuo paskutinių mėnesinių pirmosios dienos atimami 3 mėnesiai ir pridedamos 7 dienos (iš viso +280 dienų). Naudojama akušerijoje visame pasaulyje.',
      },
      {
        q: 'Kuo skiriasi gestacinis ir embrioninis amžius?',
        a: 'Gestacinis amžius skaičiuojamas nuo PM ir naudojamas medicinos dokumentuose. Embrioninis amžius skaičiuojamas nuo pastojimo ir yra maždaug 2 savaitėmis mažesnis. Esant 40 gestacinio amžiaus savaičių, embrionui apie 38 savaičių.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/pregnancy'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PregnancyPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/pregnancy`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <PregnancyCalculator locale={locale} />

        <AdInline locale={locale} />
        <div className={styles.page__content}>
          <p className={styles.page__description}>{content.description}</p>
          <p className={styles.page__description}>{content.description2}</p>

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

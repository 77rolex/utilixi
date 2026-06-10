import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import BiorhythmCalculator from './BiorhythmCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Biorhythm Calculator — Physical, Emotional & Intellectual Cycles', description: 'Calculate your biorhythm cycles for any date. See your physical (23-day), emotional (28-day) and intellectual (33-day) cycles on a 30-day chart with critical days highlighted. Free online tool.', h1: 'Biorhythm Calculator' },
  ru: { title: 'Калькулятор биоритмов — физический, эмоциональный, интеллектуальный', description: 'Рассчитайте биоритмы на любую дату. Физический (23 дня), эмоциональный (28 дней) и интеллектуальный (33 дня) циклы на 30-дневном графике с выделением критических дней. Бесплатно онлайн.', h1: 'Калькулятор биоритмов' },
  uk: { title: 'Калькулятор біоритмів — фізичний, емоційний, інтелектуальний', description: 'Розрахуйте біоритми на будь-яку дату. Фізичний (23 дні), емоційний (28 днів) та інтелектуальний (33 дні) цикли на 30-денному графіку з виділенням критичних днів. Безкоштовно онлайн.', h1: 'Калькулятор біоритмів' },
  fr: { title: 'Calculateur de Biorythmes — Cycles Physique, Émotionnel et Intellectuel', description: 'Calculez vos biorythmes pour n\'importe quelle date. Cycles physique (23 jours), émotionnel (28 jours) et intellectuel (33 jours) sur un graphique de 30 jours avec jours critiques mis en évidence. Gratuit.', h1: 'Calculateur de Biorythmes' },
  lt: { title: 'Bioritmo skaičiuotuvas — fizinis, emocinis ir intelektualinis ciklas', description: 'Apskaičiuokite savo bioritmus bet kuriai datai. Fizinis (23 dienų), emocinis (28 dienų) ir intelektualinis (33 dienų) ciklai 30 dienų grafike su pažymėtomis kritinėmis dienomis. Nemokama.', h1: 'Bioritmo skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Biorhythm theory, developed in the late 19th and early 20th centuries by scientists Wilhelm Fliess, Hermann Swoboda and Friedrich Teltscher, proposes that human performance fluctuates according to three fundamental sinusoidal cycles that begin at birth and continue throughout life. The physical cycle (23 days) governs stamina, strength, coordination and overall physical energy. The emotional cycle (28 days) influences mood, creativity, emotional sensitivity and interpersonal dynamics. The intellectual cycle (33 days) affects cognitive sharpness, analytical ability, memory and problem-solving capacity. Each cycle alternates between positive phases (above the baseline — high energy) and negative phases (below — recovery and rest), passing through the baseline twice per cycle.\n\nThe most significant events in biorhythm theory are the critical days — the moments when a cycle crosses zero. During these transition points, the body or mind is switching phase, which can manifest as instability, heightened accident risk or poor decision-making. When two or three cycles cross zero on the same day (a double or triple critical day), the effect is considered especially pronounced. To use this calculator, enter your date of birth and the date you want to analyse. The gauge bars show your current standing in each cycle, and the 30-day chart lets you plan ahead by identifying upcoming high-energy windows and critical crossings.',
    faqTitle: 'Frequently Asked Questions about Biorhythms',
    faqs: [
      { q: 'What are biorhythms?', a: 'Biorhythms are three theoretical sinusoidal cycles — physical (23 days), emotional (28 days) and intellectual (33 days) — that are said to start at birth and repeat throughout life. Each cycle oscillates between high (positive) and low (negative) phases, with critical days at the zero-crossing points.' },
      { q: 'How is the physical cycle calculated?', a: 'The physical cycle has a period of 23 days and is calculated using the formula: sin(2π × days since birth / 23). A positive value means you are in the high phase: greater stamina, strength and coordination. A negative value indicates the recovery phase.' },
      { q: 'What is the emotional cycle (28 days)?', a: 'The emotional cycle governs mood, creativity and emotional sensitivity with a period of 28 days. During positive phases you tend to feel optimistic, socially energised and emotionally resilient. During negative phases you may feel more withdrawn, sensitive or emotionally flat.' },
      { q: 'What does the intellectual cycle (33 days) affect?', a: 'The intellectual cycle influences cognitive sharpness, analytical thinking, memory and problem-solving with a 33-day period. High phases support learning, creative thinking and complex tasks. Low phases may feel mentally sluggish — better for review than for generating new ideas.' },
      { q: 'What are critical days in biorhythms?', a: 'A critical day occurs when a cycle\'s value crosses zero — the transition between positive and negative phases. Theory suggests these are days of instability: the body or mind is switching mode, which can increase accident risk and make decisions less reliable. Double critical days (two cycles crossing together) and triple critical days are considered especially significant.' },
      { q: 'Is biorhythm theory scientifically proven?', a: 'Biorhythm theory is not accepted by mainstream science. Controlled studies have not found statistically significant correlations between biorhythm phases and human performance. It remains in the category of pseudoscience. However, many people find it a useful framework for self-reflection and planning, similar to other cyclical models of wellness and energy.' },
      { q: 'How many days are in each biorhythm cycle?', a: 'Physical: 23 days. Emotional: 28 days. Intellectual: 33 days. These periods were determined empirically by the original researchers. The three cycles are chosen partly because 23, 28 and 33 are coprime — their combined cycle (the time before all three align again) is approximately 23 × 28 × 33 = 21,252 days, roughly 58 years.' },
      { q: 'When do all three biorhythm cycles align at their peak?', a: 'All three cycles starting at their peaks simultaneously takes approximately 21,252 days (about 58.2 years), since 23, 28 and 33 are coprime numbers. In practice, near-triple-peak alignments occur more frequently and represent your highest-energy windows for significant undertakings.' },
      { q: 'Should I plan important events around my biorhythms?', a: 'Many people use biorhythm charts as a soft planning tool — scheduling demanding tasks, exams or athletic competitions during high physical or intellectual phases, and treating critical days with extra caution. Whether or not the theory is scientifically valid, the act of planning around energy cycles can itself encourage better self-awareness and preparation.' },
      { q: 'Can I calculate biorhythms for past dates?', a: 'Yes. Because biorhythms are pure mathematical functions starting from your birth date, they can be calculated for any date — past, present or future — with equal precision. Simply enter a past date as the target date to see what your cycles were on that day.' },
    ],
  },
  ru: {
    description: 'Теория биоритмов, разработанная в конце XIX — начале XX века учёными Вильгельмом Флисом, Германом Свободой и Фридрихом Тельтчером, предполагает, что физические и психические возможности человека колеблются в соответствии с тремя фундаментальными синусоидальными циклами, начинающимися при рождении. Физический цикл (23 дня) определяет выносливость, силу, координацию и общую физическую энергию. Эмоциональный цикл (28 дней) влияет на настроение, творческий потенциал, эмоциональную чувствительность и межличностную динамику. Интеллектуальный цикл (33 дня) влияет на остроту мышления, аналитические способности, память и умение решать задачи.\n\nНаиболее значимыми событиями в теории биоритмов являются критические дни — моменты, когда цикл пересекает ноль. В эти переходные моменты тело или разум меняет фазу, что может проявляться в нестабильности, повышенном риске несчастных случаев или ухудшении принятия решений. Когда два или три цикла пересекают ноль в один день (двойной или тройной критический день), эффект считается особенно выраженным. Введите дату рождения и интересующую дату, чтобы увидеть ваши текущие циклы и критические дни на 30 дней вперёд.',
    faqTitle: 'Часто задаваемые вопросы о биоритмах',
    faqs: [
      { q: 'Что такое биоритмы?', a: 'Биоритмы — три теоретических синусоидальных цикла: физический (23 дня), эмоциональный (28 дней) и интеллектуальный (33 дня), которые, согласно теории, начинаются при рождении и повторяются на протяжении всей жизни. Каждый цикл колеблется между высокой (положительной) и низкой (отрицательной) фазами, с критическими днями в точках пересечения нуля.' },
      { q: 'Как рассчитывается физический цикл?', a: 'Физический цикл имеет период 23 дня и рассчитывается по формуле: sin(2π × дней с рождения / 23). Положительное значение означает высокую фазу: повышенные выносливость, сила и координация. Отрицательное значение указывает на фазу восстановления.' },
      { q: 'Что такое эмоциональный цикл (28 дней)?', a: 'Эмоциональный цикл с периодом 28 дней управляет настроением, творчеством и эмоциональной чувствительностью. В положительной фазе вы склонны чувствовать оптимизм и эмоциональную стойкость. В отрицательной фазе — замкнутость или эмоциональную усталость.' },
      { q: 'На что влияет интеллектуальный цикл (33 дня)?', a: 'Интеллектуальный цикл с периодом 33 дня влияет на остроту мышления, аналитические способности, память и решение задач. Высокие фазы благоприятны для обучения и творчества. Низкие фазы — для обзора и повторения.' },
      { q: 'Что такое критические дни?', a: 'Критический день наступает, когда значение цикла пересекает ноль — переход между положительной и отрицательной фазами. Теория утверждает, что в эти дни повышается риск ошибок и несчастных случаев. Двойные и тройные критические дни считаются особенно значимыми.' },
      { q: 'Подтверждена ли теория биоритмов наукой?', a: 'Теория биоритмов не принята mainstream-наукой. Контролируемые исследования не обнаружили статистически значимых корреляций между фазами биоритмов и работоспособностью человека. Тем не менее многие находят её полезной как инструмент для самонаблюдения и планирования.' },
      { q: 'Сколько дней в каждом цикле биоритмов?', a: 'Физический: 23 дня. Эмоциональный: 28 дней. Интеллектуальный: 33 дня. Совместный цикл всех трёх составляет примерно 21 252 дня (~58 лет).' },
      { q: 'Когда все три цикла биоритмов достигают пика одновременно?', a: 'Все три цикла одновременно начинаются в пиках раз в ~21 252 дня (около 58 лет), поскольку 23, 28 и 33 являются взаимно простыми числами. Близкие к тройному пику совпадения происходят значительно чаще.' },
      { q: 'Стоит ли планировать важные события с учётом биоритмов?', a: 'Многие используют графики биоритмов как мягкий инструмент планирования — назначают важные дела на высокие фазы, а в критические дни проявляют дополнительную осторожность. Независимо от научной обоснованности теории, осознанное планирование само по себе полезно.' },
      { q: 'Можно ли рассчитать биоритмы для прошлых дат?', a: 'Да. Поскольку биоритмы — чисто математические функции от даты рождения, их можно рассчитать для любой даты — прошлой, настоящей или будущей.' },
    ],
  },
  uk: {
    description: 'Теорія біоритмів, розроблена наприкінці XIX — початку XX століття вченими Вільгельмом Флісом, Германом Свободою та Фрідріхом Тельтчером, передбачає, що фізичні та психічні можливості людини коливаються відповідно до трьох фундаментальних синусоїдальних циклів, що починаються при народженні. Фізичний цикл (23 дні) визначає витривалість, силу, координацію та загальну фізичну енергію. Емоційний цикл (28 днів) впливає на настрій, творчий потенціал та міжособистісну динаміку. Інтелектуальний цикл (33 дні) впливає на гостроту мислення, аналітичні здібності та пам’ять.\n\nНайбільш значущими подіями в теорії біоритмів є критичні дні — моменти, коли цикл перетинає нуль. Під час цих переходних моментів тіло або розум змінює фазу, що може проявлятися у нестабільності, підвищеному ризику нещасних випадків або погіршенні прийняття рішень. Введіть дату народження та цікавлячу дату, щоб побачити ваші поточні цикли та критичні дні на 30 днів вперед.',
    faqTitle: 'Поширені запитання про біоритми',
    faqs: [
      { q: 'Що таке біоритми?', a: 'Біоритми — три теоретичні синусоїдальні цикли: фізичний (23 дні), емоційний (28 днів) та інтелектуальний (33 дні), які, за теорією, починаються при народженні і повторюються протягом усього життя.' },
      { q: 'Як розраховується фізичний цикл?', a: 'Фізичний цикл має період 23 дні і розраховується за формулою: sin(2π × днів з народження / 23). Позитивне значення означає високу фазу: підвищені витривалість, сила і координація.' },
      { q: 'Що таке емоційний цикл (28 днів)?', a: 'Емоційний цикл з періодом 28 днів керує настроєм, творчістю та емоційною чутливістю. У позитивній фазі ви схильні відчувати оптимізм та емоційну стійкість. У негативній — замкнутість або емоційну втому.' },
      { q: 'На що впливає інтелектуальний цикл (33 дні)?', a: 'Інтелектуальний цикл з періодом 33 дні впливає на гостроту мислення, аналітичні здібності та пам’ять. Високі фази сприяють навчанню і творчості. Низькі — для повторення та огляду.' },
      { q: 'Що таке критичні дні?', a: 'Критичний день настає, коли значення циклу перетинає нуль — перехід між позитивною та негативною фазами. Теорія стверджує, що в ці дні підвищується ризик помилок та нещасних випадків.' },
      { q: 'Чи підтверджена теорія біоритмів наукою?', a: 'Теорія біоритмів не прийнята основним напрямком науки. Контрольовані дослідження не виявили статистично значущих кореляцій між фазами біоритмів і працездатністю людини.' },
      { q: 'Скільки днів у кожному циклі біоритмів?', a: 'Фізичний: 23 дні. Емоційний: 28 днів. Інтелектуальний: 33 дні. Спільний цикл усіх трьох складає приблизно 21 252 дні (~58 років).' },
      { q: 'Коли всі три цикли досягають піку одночасно?', a: 'Усі три цикли одночасно стартують на піках раз на ~21 252 дні (близько 58 років), оскільки 23, 28 та 33 є взаємно простими числами.' },
      { q: 'Чи варто планувати важливі події з урахуванням біоритмів?', a: 'Багато людей використовують графіки біоритмів як м’який інструмент планування — призначають важливі справи на високі фази, а в критичні дні проявляють додаткову обережність.' },
      { q: 'Чи можна розрахувати біоритми для минулих дат?', a: 'Так. Оскільки біоритми — чисто математичні функції від дати народження, їх можна розрахувати для будь-якої дати — минулої, теперішньої або майбутньої.' },
    ],
  },
  fr: {
    description: 'La théorie des biorythmes, développée à la fin du XIXe et au début du XXe siècle par les scientifiques Wilhelm Fliess, Hermann Swoboda et Friedrich Teltscher, propose que les performances humaines fluctuent selon trois cycles sinusoïdaux fondamentaux qui débutent à la naissance. Le cycle physique (23 jours) gouverne l\'endurance, la force, la coordination et l\'énergie physique globale. Le cycle émotionnel (28 jours) influence l\'humeur, la créativité, la sensibilité émotionnelle et les dynamiques interpersonnelles. Le cycle intellectuel (33 jours) affecte la vivacité cognitive, la capacité analytique, la mémoire et la résolution de problèmes.\n\nLes événements les plus importants dans la théorie des biorythmes sont les jours critiques — les moments où un cycle passe par zéro. Durant ces points de transition, le corps ou l\'esprit change de phase, ce qui peut se manifester par une instabilité, un risque accru d\'accidents ou une prise de décision défaillante. Lorsque deux ou trois cycles passent par zéro le même jour, l\'effet est considéré comme particulièrement prononcé. Entrez votre date de naissance et la date à analyser pour voir vos cycles actuels et vos jours critiques pour les 30 prochains jours.',
    faqTitle: 'Questions fréquentes sur les biorythmes',
    faqs: [
      { q: 'Que sont les biorythmes ?', a: 'Les biorythmes sont trois cycles sinusoïdaux théoriques — physique (23 jours), émotionnel (28 jours) et intellectuel (33 jours) — censés démarrer à la naissance et se répéter tout au long de la vie. Chaque cycle alterne entre phases haute et basse, avec des jours critiques aux points de passage par zéro.' },
      { q: 'Comment le cycle physique est-il calculé ?', a: 'Le cycle physique a une période de 23 jours et est calculé par la formule : sin(2π × jours depuis la naissance / 23). Une valeur positive indique une phase haute : endurance, force et coordination accrues. Une valeur négative indique la phase de récupération.' },
      { q: "Qu'est-ce que le cycle émotionnel (28 jours) ?", a: "Le cycle émotionnel gouverne l'humeur, la créativité et la sensibilité émotionnelle sur 28 jours. En phase positive, vous vous sentez optimiste et émotionnellement résistant. En phase négative, vous pouvez vous sentir replié sur vous-même ou émotionnellement plat." },
      { q: "Que gouverne le cycle intellectuel (33 jours) ?", a: "Le cycle intellectuel influence la vivacité cognitive, la pensée analytique, la mémoire et la résolution de problèmes sur 33 jours. Les phases hautes favorisent l'apprentissage et la créativité. Les phases basses conviennent mieux à la révision." },
      { q: 'Que sont les jours critiques ?', a: 'Un jour critique survient quand la valeur d\'un cycle passe par zéro — la transition entre les phases positive et négative. La théorie suggère une instabilité accrue et un risque d\'erreurs plus élevé. Les doubles et triples jours critiques sont considérés comme particulièrement significatifs.' },
      { q: 'La théorie des biorythmes est-elle scientifiquement prouvée ?', a: 'La théorie des biorythmes n\'est pas acceptée par la science dominante. Des études contrôlées n\'ont pas trouvé de corrélations statistiquement significatives entre les phases de biorythmes et les performances humaines. Elle reste dans la catégorie de la pseudoscience, bien que beaucoup la trouvent utile pour la réflexion personnelle.' },
      { q: 'Combien de jours dure chaque cycle ?', a: 'Physique : 23 jours. Émotionnel : 28 jours. Intellectuel : 33 jours. Le cycle combiné des trois est d\'environ 21 252 jours (environ 58 ans), car 23, 28 et 33 sont des nombres premiers entre eux.' },
      { q: 'Quand les trois cycles atteignent-ils leur pic simultanément ?', a: 'Tous les trois cycles démarrant au pic simultanément prend environ 21 252 jours (environ 58,2 ans), car 23, 28 et 33 sont premiers entre eux. Des alignements proches de ce triple pic se produisent plus fréquemment.' },
      { q: 'Devrais-je planifier des événements importants selon mes biorythmes ?', a: "Beaucoup utilisent les graphiques de biorythmes comme outil de planification souple — en programmant des tâches exigeantes lors des phases physiques ou intellectuelles élevées, et en abordant les jours critiques avec prudence supplémentaire." },
      { q: 'Puis-je calculer des biorythmes pour des dates passées ?', a: 'Oui. Comme les biorythmes sont des fonctions purement mathématiques à partir de votre date de naissance, ils peuvent être calculés pour n\'importe quelle date — passée, présente ou future.' },
    ],
  },
  lt: {
    description: 'Bioritmo teorija, kurią XIX amžiaus pabaigoje ir XX amžiaus pradžioje sukūrė mokslininkai Wilhelmas Fliessas, Hermannas Swoboda ir Friedrichas Teltsheris, teigia, kad žmogaus veiksmingumas svyruoja pagal tris fundamentalius sinusinės formos ciklus, prasidedančius gimimu. Fizinis ciklas (23 dienos) valdo ištvermę, jėgą, koordinaciją ir bendrą fizinę energiją. Emocinis ciklas (28 dienos) veikia nuotaiką, kūrybiškumą ir emocinį jautrumą. Intelektualinis ciklas (33 dienos) veikia mąstymo aštrumą, analitinį gebėjimą ir atmintį.\n\nSvarbiausi bioritmo teorijoje įvykiai yra kritinės dienos — momentai, kai ciklas kerta nulį. Šių perėjimų metu kūnas ar protas keičia fazę, kas gali pasireikšti nestabilumu ar padidėjusia klaidų rizika. Kai du ar trys ciklai tuo pačiu metu kerta nulį (dviguba arba triguba kritinė diena), efektas laikomas ypač ryškiu. Įveskite gimimo datą ir norimą datą, kad pamatytumėte savo ciklus ir kritines dienas artimiausias 30 dienų.',
    faqTitle: 'Dažnai užduodami klausimai apie bioritmus',
    faqs: [
      { q: 'Kas yra bioritmai?', a: 'Bioritmai — trys teoriniai sinusiniai ciklai: fizinis (23 dienos), emocinis (28 dienos) ir intelektualinis (33 dienos), kurie, pasak teorijos, prasideda gimimu ir kartojasi visą gyvenimą.' },
      { q: 'Kaip apskaičiuojamas fizinis ciklas?', a: 'Fizinis ciklas turi 23 dienų periodą ir skaičiuojamas formule: sin(2π × dienų nuo gimimo / 23). Teigiama reikšmė reiškia aukštą fazę: padidėjusi ištvermė ir koordinacija. Neigiama — atsistatymo fazę.' },
      { q: 'Kas yra emocinis ciklas (28 dienos)?', a: 'Emocinis ciklas valdo nuotaiką, kūrybiškumą ir emocinį jautrumą per 28 dienas. Teigiamoje fazėje jaučiatės optimistiškai ir emociškai atspariai. Neigiamoje — galite jaustis uždaresni ar emociškai išsekę.' },
      { q: 'Ką valdo intelektualinis ciklas (33 dienos)?', a: 'Intelektualinis ciklas veikia mąstymo aštrumą, analitinį mąstymą ir atmintį per 33 dienas. Aukštos fazės palankios mokymuisi ir kūrybiškumui. Žemos fazės — peržiūrai ir kartojimui.' },
      { q: 'Kas yra kritinės dienos?', a: 'Kritinė diena atsiranda kai ciklo reikšmė kerta nulį — perėjimas tarp teigiamos ir neigiamos fazių. Teorija teigia, kad šiomis dienomis padidėja klaidų ir nelaimingų atsitikimų rizika.' },
      { q: 'Ar bioritmo teorija moksliškai įrodyta?', a: 'Bioritmo teorija nėra pripažinta pagrindinės mokslo srovės. Kontroliuoti tyrimai nerado statistiškai reikšmingų sąsajų tarp bioritmo fazių ir žmogaus veiksmingumo. Ji išlieka pseudomokslo kategorijoje.' },
      { q: 'Kiek dienų trunka kiekvienas bioritmo ciklas?', a: 'Fizinis: 23 dienos. Emocinis: 28 dienos. Intelektualinis: 33 dienos. Bendras visų trijų ciklas yra apie 21 252 dienos (~58 metai), nes 23, 28 ir 33 yra tarpusavyje pirminiai skaičiai.' },
      { q: 'Kada visi trys ciklai tuo pačiu metu pasiekia viršūnę?', a: 'Visi trys ciklai vienu metu prasideda viršūnėje kas ~21 252 dienas (apie 58 metus), nes 23, 28 ir 33 yra tarpusavyje pirminiai skaičiai.' },
      { q: 'Ar verta planuoti svarbius įvykius atsižvelgiant į bioritmus?', a: 'Daugelis naudoja bioritmo grafikus kaip švelnų planavimo įrankį — sudėtingus darbus skirsto aukštoms fazėms, o kritinėmis dienomis būna papildomai atsargūs.' },
      { q: 'Ar galiu apskaičiuoti bioritmus praėjusioms datoms?', a: 'Taip. Kadangi bioritmai yra grynai matematinės funkcijos nuo gimimo datos, juos galima apskaičiuoti bet kuriai datai — praeičiai, dabarčiai ar ateičiai.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/archetype-number', label: 'Personality Archetype' },
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/zodiac-sign', label: 'Zodiac Sign' },
    { href: '/calculator/sleep', label: 'Sleep Calculator' },
    { href: '/calculator/stress-level', label: 'Stress Level Test' },
  ],
  ru: [
    { href: '/calculator/archetype-number', label: 'Архетип личности' },
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/zodiac-sign', label: 'Знак зодиака' },
    { href: '/calculator/sleep', label: 'Калькулятор сна' },
    { href: '/calculator/stress-level', label: 'Уровень стресса' },
  ],
  uk: [
    { href: '/calculator/archetype-number', label: 'Архетип особистості' },
    { href: '/calculator/life-path', label: 'Число шляху життя' },
    { href: '/calculator/zodiac-sign', label: 'Знак зодіаку' },
    { href: '/calculator/sleep', label: 'Калькулятор сну' },
    { href: '/calculator/stress-level', label: 'Рівень стресу' },
  ],
  fr: [
    { href: '/calculator/archetype-number', label: 'Archétype de Personnalité' },
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/zodiac-sign', label: 'Signe du Zodiaque' },
    { href: '/calculator/sleep', label: 'Calculateur de Sommeil' },
    { href: '/calculator/stress-level', label: 'Test de Stress' },
  ],
  lt: [
    { href: '/calculator/archetype-number', label: 'Asmenybės archetipas' },
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/zodiac-sign', label: 'Zodiako ženklas' },
    { href: '/calculator/sleep', label: 'Miego skaičiuotuvas' },
    { href: '/calculator/stress-level', label: 'Streso lygis' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/biorhythm') };
}

export function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function BiorhythmPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/biorhythm`,
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
        <BiorhythmCalculator locale={locale} />
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

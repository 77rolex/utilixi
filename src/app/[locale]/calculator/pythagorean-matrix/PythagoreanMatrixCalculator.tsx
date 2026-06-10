'use client';

import { useState } from 'react';
import styles from './PythagoreanMatrixCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  label: string; btn: string; errEmpty: string; errInvalid: string;
  levelTags: [string, string, string, string, string];
  interpretTitle: string;
}> = {
  en: {
    label: 'Date of birth', btn: 'Build My Matrix',
    errEmpty: 'Please enter your date of birth.', errInvalid: 'Please enter a valid date.',
    levelTags: ['Absent', 'Weak', 'Normal', 'Strong', 'Very strong'],
    interpretTitle: 'Interpretation',
  },
  ru: {
    label: 'Дата рождения', btn: 'Построить матрицу',
    errEmpty: 'Введите дату рождения.', errInvalid: 'Введіть коректну дату.',
    levelTags: ['Отсутствует', 'Слабо', 'Норма', 'Сильно', 'Очень сильно'],
    interpretTitle: 'Расшифровка',
  },
  uk: {
    label: 'Дата народження', btn: 'Побудувати матрицю',
    errEmpty: 'Введіть дату народження.', errInvalid: 'Введіть коректну дату.',
    levelTags: ['Відсутня', 'Слабко', 'Норма', 'Сильно', 'Дуже сильно'],
    interpretTitle: 'Розшифровка',
  },
  fr: {
    label: 'Date de naissance', btn: 'Créer ma matrice',
    errEmpty: 'Veuillez entrer votre date de naissance.', errInvalid: 'Veuillez entrer une date valide.',
    levelTags: ['Absent', 'Faible', 'Normal', 'Fort', 'Très fort'],
    interpretTitle: 'Interprétation',
  },
  lt: {
    label: 'Gimimo data', btn: 'Kurti matricą',
    errEmpty: 'Įveskite gimimo datą.', errInvalid: 'Įveskite teisingą datą.',
    levelTags: ['Nėra', 'Silpna', 'Norma', 'Stipru', 'Labai stipru'],
    interpretTitle: 'Interpretacija',
  },
};

type Level = 0 | 1 | 2 | 3 | 4;
type DigitLevel = { name: string; desc: string };
type DigitMeanings = Record<Level, DigitLevel>;

const COUNT_MEANINGS: Record<string, Record<number, DigitMeanings>> = {
  en: {
    1: {
      0: { name: 'Will & Character', desc: 'Absent — weak will, difficulty making independent decisions, tendency to depend on others\' opinions. A karmic task: develop inner core.' },
      1: { name: 'Will & Character', desc: 'Weak — will is forming. Needs to consciously build self-confidence, learn to say "no" and stand one\'s ground.' },
      2: { name: 'Will & Character', desc: 'Normal — balanced character. Can make decisions and defend a position without aggression.' },
      3: { name: 'Will & Character', desc: 'Strong — natural leader. Purposeful, persistent, strong-willed. Others sense the inner authority.' },
      4: { name: 'Will & Character', desc: 'Very strong — dominant will. Risk of stubbornness, difficulty accepting others\' views, possible tendency to control.' },
    },
    2: {
      0: { name: 'Bioenergy', desc: 'Absent — very low vital energy. Health requires special attention; lifestyle and rest are crucial.' },
      1: { name: 'Bioenergy', desc: 'Low — moderate energy. May lack strength in stressful periods; recovery takes time.' },
      2: { name: 'Bioenergy', desc: 'Normal — good energy level. Feels well, copes with everyday loads.' },
      3: { name: 'Bioenergy', desc: 'High — energetic person. High vitality, quick recovery, natural drive.' },
      4: { name: 'Bioenergy', desc: 'Very high — excessive energy. Risk of impulsiveness, emotional explosiveness, difficulty relaxing.' },
    },
    3: {
      0: { name: 'Interest & Curiosity', desc: 'Absent — not a bookworm by nature. Prefers practice over theory, may dislike systematic studying. Karmic task: open the mind.' },
      1: { name: 'Interest & Curiosity', desc: 'Low — selective curiosity. Learns what seems practically useful, avoids abstract knowledge.' },
      2: { name: 'Interest & Curiosity', desc: 'Normal — good intellect and genuine interest in learning, self-development.' },
      3: { name: 'Interest & Curiosity', desc: 'Strong — pronounced intellectual abilities. Loves knowledge, academic mindset, natural researcher.' },
      4: { name: 'Interest & Curiosity', desc: 'Very strong — exceptional intellect. Risk of over-theorizing, living in the mind, detachment from everyday life.' },
    },
    4: {
      0: { name: 'Health', desc: 'Absent — weak constitution. Health requires careful attention, healthy lifestyle, and regular check-ups.' },
      1: { name: 'Health', desc: 'Below average — ordinary health, prone to seasonal illnesses. Worth paying attention to well-being.' },
      2: { name: 'Health', desc: 'Normal — good health. Copes well with everyday loads and recovers reasonably.' },
      3: { name: 'Health', desc: 'Good — strong health, high endurance, good recovery after stress and illness.' },
      4: { name: 'Health', desc: 'Excellent — very strong constitution. Physical strength and endurance; health is a natural resource.' },
    },
    5: {
      0: { name: 'Logic & Intuition', desc: 'Absent — intuition is not developed. Relies exclusively on logic and facts; inner voice is silent. Karmic task: learn to trust feelings.' },
      1: { name: 'Logic & Intuition', desc: 'Weak — intuition is present but rarely trusted. Prefers rational explanations over gut feeling.' },
      2: { name: 'Logic & Intuition', desc: 'Normal — good balance of logic and intuition. Listens to inner voice and usually makes sound decisions.' },
      3: { name: 'Logic & Intuition', desc: 'Strong — well-developed intuition. Often makes correct decisions based on feeling; senses things ahead.' },
      4: { name: 'Logic & Intuition', desc: 'Very strong — powerful intuitive channel. High sensitivity, possible precognitive ability or mediumistic gift.' },
    },
    6: {
      0: { name: 'Work Ethic', desc: 'Absent — dislikes routine and physical work. Prefers creative or intellectual tasks. Karmic task: learn discipline.' },
      1: { name: 'Work Ethic', desc: 'Low — works when necessary, but monotony is tiring. Prefers variety and creative freedom.' },
      2: { name: 'Work Ethic', desc: 'Normal — conscientious approach to work. Fulfills obligations and keeps things in order.' },
      3: { name: 'Work Ethic', desc: 'High — very hardworking. Loves order, thoroughness, and doing things properly the first time.' },
      4: { name: 'Work Ethic', desc: 'Very high — workaholic tendencies, perfectionism. Difficulty delegating and accepting "good enough".' },
    },
    7: {
      0: { name: 'Luck & Fate', desc: 'Absent — no obvious luck. Achieves everything through hard work; fate rarely intervenes. Karmic task: learn to trust the flow.' },
      1: { name: 'Luck & Fate', desc: 'Low — occasional fortunate coincidences. Mainly relies on own strength rather than favorable circumstances.' },
      2: { name: 'Luck & Fate', desc: 'Normal — life is generally favorable. Fate helps in important moments; right people appear at the right time.' },
      3: { name: 'Luck & Fate', desc: 'High — lucky person. Circumstances often work in their favor; protected by a strong life energy.' },
      4: { name: 'Luck & Fate', desc: 'Very high — exceptionally lucky. Protected by fate, things fall into place; spiritual protection is strong.' },
    },
    8: {
      0: { name: 'Duty & Responsibility', desc: 'Absent — not burdened by obligations. May avoid responsibility and commitments. Karmic task: learn reliability.' },
      1: { name: 'Duty & Responsibility', desc: 'Low — tries to be responsible but sometimes avoids difficult obligations when they conflict with personal interests.' },
      2: { name: 'Duty & Responsibility', desc: 'Normal — responsible person. Fulfills duties, keeps word, can be relied upon.' },
      3: { name: 'Duty & Responsibility', desc: 'High — strong sense of duty. Takes obligations very seriously; highly reliable and principled.' },
      4: { name: 'Duty & Responsibility', desc: 'Very high — excessive sense of responsibility. Risk of self-sacrifice, carrying others\' burdens, emotional burnout.' },
    },
    9: {
      0: { name: 'Memory & Wisdom', desc: 'Absent — weak memory or prefers not to dwell on past experience. Lives in the present. Karmic task: learn from life.' },
      1: { name: 'Memory & Wisdom', desc: 'Weak — average memory, sometimes forgets details. Wisdom comes slowly through experience.' },
      2: { name: 'Memory & Wisdom', desc: 'Normal — good memory. Learns well from experience and can generalize lessons.' },
      3: { name: 'Memory & Wisdom', desc: 'Strong — excellent memory and deep wisdom. Draws meaningful lessons from life; natural mentor.' },
      4: { name: 'Memory & Wisdom', desc: 'Very strong — phenomenal memory and wisdom. Or possible over-fixation on the past, difficulty letting go.' },
    },
  },
  ru: {
    1: {
      0: { name: 'Воля и характер', desc: 'Отсутствует — слабая воля, сложно принимать самостоятельные решения, склонность зависеть от чужого мнения. Кармическая задача: выработать внутренний стержень.' },
      1: { name: 'Воля и характер', desc: 'Слабая — воля формируется. Необходимо сознательно развивать уверенность в себе, учиться говорить «нет» и отстаивать позицию.' },
      2: { name: 'Воля и характер', desc: 'Норма — сбалансированный характер. Умеет принимать решения и защищать точку зрения без агрессии.' },
      3: { name: 'Воля и характер', desc: 'Сильная — природный лидер. Целеустремлённый, настойчивый, волевой. Окружающие чувствуют внутренний авторитет.' },
      4: { name: 'Воля и характер', desc: 'Очень сильная — доминирующая воля. Риск упрямства, сложности с принятием чужой точки зрения, возможна тяга к контролю.' },
    },
    2: {
      0: { name: 'Биоэнергетика', desc: 'Отсутствует — очень низкая жизненная энергия. Здоровье требует особого внимания; образ жизни и отдых критически важны.' },
      1: { name: 'Биоэнергетика', desc: 'Низкая — умеренная энергия. В стрессовые периоды может не хватать сил; восстановление требует времени.' },
      2: { name: 'Биоэнергетика', desc: 'Норма — хороший уровень энергии. Чувствует себя хорошо, справляется с повседневными нагрузками.' },
      3: { name: 'Биоэнергетика', desc: 'Высокая — энергичный человек. Высокая жизненная сила, быстрое восстановление, природный драйв.' },
      4: { name: 'Биоэнергетика', desc: 'Очень высокая — избыточная энергия. Риск импульсивности, эмоциональной взрывчатости, сложно расслабиться.' },
    },
    3: {
      0: { name: 'Интерес и увлечённость', desc: 'Отсутствует — не книжник по природе. Предпочитает практику теории, может не любить систематическую учёбу. Кармическая задача: открыть разум.' },
      1: { name: 'Интерес и увлечённость', desc: 'Слабый — избирательный интерес. Учится тому, что кажется практически полезным, избегает абстрактных знаний.' },
      2: { name: 'Интерес и увлечённость', desc: 'Норма — хороший интеллект и искренний интерес к обучению, саморазвитию.' },
      3: { name: 'Интерес и увлечённость', desc: 'Сильный — выраженные интеллектуальные способности. Любит знания, академический склад ума, природный исследователь.' },
      4: { name: 'Интерес и увлечённость', desc: 'Очень сильный — исключительный интеллект. Риск излишнего теоретизирования, жизни в голове, отрыва от быта.' },
    },
    4: {
      0: { name: 'Здоровье', desc: 'Отсутствует — слабая конституция. Здоровье требует бережного отношения, здорового образа жизни и регулярных обследований.' },
      1: { name: 'Здоровье', desc: 'Ниже среднего — обычное здоровье, склонность к сезонным заболеваниям. Стоит уделять внимание самочувствию.' },
      2: { name: 'Здоровье', desc: 'Норма — хорошее здоровье. Справляется с обычными нагрузками и восстанавливается без особых проблем.' },
      3: { name: 'Здоровье', desc: 'Хорошее — крепкое здоровье, высокая выносливость, хорошее восстановление после стрессов и болезней.' },
      4: { name: 'Здоровье', desc: 'Отличное — очень сильная конституция. Физическая сила и выносливость; здоровье — природный ресурс.' },
    },
    5: {
      0: { name: 'Логика и интуиция', desc: 'Отсутствует — интуиция не развита. Опирается исключительно на логику и факты; внутренний голос молчит. Кармическая задача: научиться доверять ощущениям.' },
      1: { name: 'Логика и интуиция', desc: 'Слабая — интуиция есть, но редко ей доверяет. Предпочитает рациональные объяснения вместо чутья.' },
      2: { name: 'Логика и интуиция', desc: 'Норма — хороший баланс логики и интуиции. Прислушивается к внутреннему голосу, обычно принимает взвешенные решения.' },
      3: { name: 'Логика и интуиция', desc: 'Сильная — хорошо развитая интуиция. Часто принимает верные решения на основе чутья; чувствует события заранее.' },
      4: { name: 'Логика и интуиция', desc: 'Очень сильная — мощный интуитивный канал. Высокая чувствительность, возможные способности к предвидению или медиумизму.' },
    },
    6: {
      0: { name: 'Трудолюбие', desc: 'Отсутствует — не любит рутинную и физическую работу. Предпочитает творческие или умственные задачи. Кармическая задача: научиться дисциплине.' },
      1: { name: 'Трудолюбие', desc: 'Низкое — работает, когда нужно, но однообразие быстро утомляет. Предпочитает разнообразие и творческую свободу.' },
      2: { name: 'Трудолюбие', desc: 'Норма — добросовестный подход к работе. Выполняет обязательства и поддерживает порядок.' },
      3: { name: 'Трудолюбие', desc: 'Высокое — очень трудолюбивый. Любит порядок, тщательность и делать всё правильно с первого раза.' },
      4: { name: 'Трудолюбие', desc: 'Очень высокое — трудоголизм, перфекционизм. Сложно делегировать и принять результат «достаточно хорошим».' },
    },
    7: {
      0: { name: 'Везение и судьба', desc: 'Отсутствует — явного везения нет. Всего добивается трудом; судьба редко вмешивается. Кармическая задача: научиться доверять потоку жизни.' },
      1: { name: 'Везение и судьба', desc: 'Низкое — изредка везёт. В основном опирается на собственные силы, а не на благоприятные обстоятельства.' },
      2: { name: 'Везение и судьба', desc: 'Норма — жизнь в целом складывается благоприятно. Судьба помогает в важные моменты; нужные люди появляются вовремя.' },
      3: { name: 'Везение и судьба', desc: 'Высокое — везучий человек. Обстоятельства часто складываются в его пользу; есть ощущение защищённости судьбой.' },
      4: { name: 'Везение и судьба', desc: 'Очень высокое — исключительное везение. Защищён судьбой, всё складывается; сильная духовная защита.' },
    },
    8: {
      0: { name: 'Долг и ответственность', desc: 'Отсутствует — не отягощён обязательствами. Может избегать ответственности и обязательств. Кармическая задача: научиться надёжности.' },
      1: { name: 'Долг и ответственность', desc: 'Низкая — старается быть ответственным, но иногда уклоняется от трудных обязательств, когда они противоречат личным интересам.' },
      2: { name: 'Долг и ответственность', desc: 'Норма — ответственный человек. Выполняет обязанности, держит слово, на него можно положиться.' },
      3: { name: 'Долг и ответственность', desc: 'Высокая — сильное чувство долга. Очень серьёзно относится к обязательствам; надёжный и принципиальный.' },
      4: { name: 'Долг и ответственность', desc: 'Очень высокая — чрезмерное чувство ответственности. Риск самопожертвования, несения чужих грузов, эмоционального выгорания.' },
    },
    9: {
      0: { name: 'Память и интеллект', desc: 'Отсутствует — слабая память или предпочитает не углубляться в прошлый опыт. Живёт настоящим. Кармическая задача: учиться на жизненных уроках.' },
      1: { name: 'Память и интеллект', desc: 'Слабая — средняя память, иногда забывает детали. Мудрость приходит медленно, через опыт.' },
      2: { name: 'Память и интеллект', desc: 'Норма — хорошая память. Хорошо учится на опыте и умеет обобщать уроки.' },
      3: { name: 'Память и интеллект', desc: 'Сильная — отличная память и глубокая мудрость. Извлекает смысл из жизненных событий; природный наставник.' },
      4: { name: 'Память и интеллект', desc: 'Очень сильная — феноменальная память и мудрость. Или возможная чрезмерная фиксация на прошлом, сложности с отпусканием.' },
    },
  },
  uk: {
    1: {
      0: { name: 'Воля і характер', desc: 'Відсутня — слабка воля, важко приймати самостійні рішення, схильність залежати від чужої думки. Кармічне завдання: виробити внутрішній стрижень.' },
      1: { name: 'Воля і характер', desc: 'Слабка — воля формується. Потрібно свідомо розвивати впевненість у собі, вчитися говорити «ні» та відстоювати позицію.' },
      2: { name: 'Воля і характер', desc: 'Норма — збалансований характер. Вміє приймати рішення та захищати точку зору без агресії.' },
      3: { name: 'Воля і характер', desc: 'Сильна — природний лідер. Цілеспрямований, наполегливий, вольовий. Оточуючі відчувають внутрішній авторитет.' },
      4: { name: 'Воля і характер', desc: 'Дуже сильна — домінуюча воля. Ризик впертості, складнощів із прийняттям чужої точки зору, можлива тяга до контролю.' },
    },
    2: {
      0: { name: 'Біоенергетика', desc: 'Відсутня — дуже низька життєва енергія. Здоров\'я потребує особливої уваги; спосіб життя та відпочинок критично важливі.' },
      1: { name: 'Біоенергетика', desc: 'Низька — помірна енергія. У стресові періоди може бракувати сил; відновлення потребує часу.' },
      2: { name: 'Біоенергетика', desc: 'Норма — хороший рівень енергії. Почувається добре, справляється з повсякденними навантаженнями.' },
      3: { name: 'Біоенергетика', desc: 'Висока — енергійна людина. Висока життєва сила, швидке відновлення, природний драйв.' },
      4: { name: 'Біоенергетика', desc: 'Дуже висока — надмірна енергія. Ризик імпульсивності, емоційної вибуховості, важко розслабитися.' },
    },
    3: {
      0: { name: 'Інтерес і захопленість', desc: 'Відсутній — не книголюб від природи. Надає перевагу практиці над теорією, може не любити систематичне навчання. Кармічне завдання: відкрити розум.' },
      1: { name: 'Інтерес і захопленість', desc: 'Слабкий — вибірковий інтерес. Навчається тому, що здається практично корисним, уникає абстрактних знань.' },
      2: { name: 'Інтерес і захопленість', desc: 'Норма — хороший інтелект і щирий інтерес до навчання, саморозвитку.' },
      3: { name: 'Інтерес і захопленість', desc: 'Сильний — виражені інтелектуальні здібності. Любить знання, академічний склад розуму, природний дослідник.' },
      4: { name: 'Інтерес і захопленість', desc: 'Дуже сильний — виключний інтелект. Ризик надмірного теоретизування, відриву від реальності та побуту.' },
    },
    4: {
      0: { name: 'Здоров\'я', desc: 'Відсутнє — слабка конституція. Здоров\'я потребує дбайливого ставлення, здорового способу життя та регулярних обстежень.' },
      1: { name: 'Здоров\'я', desc: 'Нижче середнього — звичайне здоров\'я, схильність до сезонних хвороб. Варто приділяти увагу самопочуттю.' },
      2: { name: 'Здоров\'я', desc: 'Норма — хороше здоров\'я. Справляється зі звичайними навантаженнями та відновлюється без особливих проблем.' },
      3: { name: 'Здоров\'я', desc: 'Хороше — міцне здоров\'я, висока витривалість, гарне відновлення після стресів та хвороб.' },
      4: { name: 'Здоров\'я', desc: 'Відмінне — дуже сильна конституція. Фізична сила та витривалість; здоров\'я — природний ресурс.' },
    },
    5: {
      0: { name: 'Логіка та інтуїція', desc: 'Відсутня — інтуїція не розвинена. Спирається виключно на логіку та факти; внутрішній голос мовчить. Кармічне завдання: навчитися довіряти відчуттям.' },
      1: { name: 'Логіка та інтуїція', desc: 'Слабка — інтуїція є, але рідко їй довіряє. Надає перевагу раціональним поясненням замість чуття.' },
      2: { name: 'Логіка та інтуїція', desc: 'Норма — хороший баланс логіки та інтуїції. Прислухається до внутрішнього голосу, зазвичай приймає зважені рішення.' },
      3: { name: 'Логіка та інтуїція', desc: 'Сильна — добре розвинена інтуїція. Часто приймає вірні рішення на основі чуття; відчуває події наперед.' },
      4: { name: 'Логіка та інтуїція', desc: 'Дуже сильна — потужний інтуїтивний канал. Висока чутливість, можливі здібності до передбачення або медіумізму.' },
    },
    6: {
      0: { name: 'Працьовитість', desc: 'Відсутня — не любить рутинну та фізичну роботу. Надає перевагу творчим або розумовим завданням. Кармічне завдання: навчитися дисципліні.' },
      1: { name: 'Працьовитість', desc: 'Низька — працює, коли потрібно, але одноманітність швидко втомлює. Надає перевагу різноманітності та творчій свободі.' },
      2: { name: 'Працьовитість', desc: 'Норма — сумлінний підхід до роботи. Виконує зобов\'язання та підтримує порядок.' },
      3: { name: 'Працьовитість', desc: 'Висока — дуже працьовита людина. Любить порядок, ретельність та робити все правильно з першого разу.' },
      4: { name: 'Працьовитість', desc: 'Дуже висока — трудоголізм, перфекціонізм. Важко делегувати та прийняти результат «достатньо добрим».' },
    },
    7: {
      0: { name: 'Везіння і доля', desc: 'Відсутнє — явного везіння немає. Всього досягає працею; доля рідко втручається. Кармічне завдання: навчитися довіряти потоку життя.' },
      1: { name: 'Везіння і доля', desc: 'Низьке — зрідка щастить. Переважно спирається на власні сили, а не на сприятливі обставини.' },
      2: { name: 'Везіння і доля', desc: 'Норма — життя загалом складається сприятливо. Доля допомагає у важливі моменти; потрібні люди з\'являються вчасно.' },
      3: { name: 'Везіння і доля', desc: 'Висока — щаслива людина. Обставини часто складаються на її користь; є відчуття захищеності долею.' },
      4: { name: 'Везіння і доля', desc: 'Дуже висока — виняткове везіння. Захищена долею, все складається; сильний духовний захист.' },
    },
    8: {
      0: { name: 'Обов\'язок і відповідальність', desc: 'Відсутні — не обтяжений зобов\'язаннями. Може уникати відповідальності та обов\'язків. Кармічне завдання: навчитися надійності.' },
      1: { name: 'Обов\'язок і відповідальність', desc: 'Низькі — намагається бути відповідальним, але іноді ухиляється від складних зобов\'язань, коли вони суперечать особистим інтересам.' },
      2: { name: 'Обов\'язок і відповідальність', desc: 'Норма — відповідальна людина. Виконує обов\'язки, тримає слово, на неї можна покластися.' },
      3: { name: 'Обов\'язок і відповідальність', desc: 'Високі — сильне почуття обов\'язку. Дуже серйозно ставиться до зобов\'язань; надійний та принциповий.' },
      4: { name: 'Обов\'язок і відповідальність', desc: 'Дуже високі — надмірне почуття відповідальності. Ризик самопожертви, несення чужих тягарів, емоційного вигорання.' },
    },
    9: {
      0: { name: 'Пам\'ять та інтелект', desc: 'Відсутня — слабка пам\'ять або вважає за краще не заглиблюватися в минулий досвід. Живе теперішнім. Кармічне завдання: вчитися на життєвих уроках.' },
      1: { name: 'Пам\'ять та інтелект', desc: 'Слабка — середня пам\'ять, іноді забуває деталі. Мудрість приходить повільно, через досвід.' },
      2: { name: 'Пам\'ять та інтелект', desc: 'Норма — хороша пам\'ять. Добре вчиться на досвіді та вміє узагальнювати уроки.' },
      3: { name: 'Пам\'ять та інтелект', desc: 'Сильна — відмінна пам\'ять і глибока мудрість. Витягує сенс із життєвих подій; природний наставник.' },
      4: { name: 'Пам\'ять та інтелект', desc: 'Дуже сильна — феноменальна пам\'ять і мудрість. Або можлива надмірна фіксація на минулому, складнощі з відпусканням.' },
    },
  },
  fr: {
    1: {
      0: { name: 'Volonté & Caractère', desc: 'Absente — volonté faible, difficulté à prendre des décisions indépendantes, tendance à dépendre des opinions des autres. Tâche karmique : développer un noyau intérieur.' },
      1: { name: 'Volonté & Caractère', desc: 'Faible — la volonté se forme. Besoin de développer consciemment la confiance en soi, apprendre à dire «non» et défendre sa position.' },
      2: { name: 'Volonté & Caractère', desc: 'Normale — caractère équilibré. Capable de prendre des décisions et de défendre son point de vue sans agressivité.' },
      3: { name: 'Volonté & Caractère', desc: 'Forte — leader naturel. Déterminé, persévérant, volontaire. L\'entourage ressent l\'autorité intérieure.' },
      4: { name: 'Volonté & Caractère', desc: 'Très forte — volonté dominante. Risque d\'entêtement, de difficulté à accepter les opinions des autres, possible tendance au contrôle.' },
    },
    2: {
      0: { name: 'Bioénergie', desc: 'Absente — énergie vitale très faible. La santé nécessite une attention particulière ; le mode de vie et le repos sont essentiels.' },
      1: { name: 'Bioénergie', desc: 'Faible — énergie modérée. Peut manquer de forces en période de stress ; la récupération prend du temps.' },
      2: { name: 'Bioénergie', desc: 'Normale — bon niveau d\'énergie. Se sent bien, supporte les charges quotidiennes.' },
      3: { name: 'Bioénergie', desc: 'Élevée — personne énergique. Haute vitalité, récupération rapide, dynamisme naturel.' },
      4: { name: 'Bioénergie', desc: 'Très élevée — énergie excessive. Risque d\'impulsivité, d\'explosivité émotionnelle, difficulté à se détendre.' },
    },
    3: {
      0: { name: 'Intérêt & Curiosité', desc: 'Absent — pas un intellectuel de nature. Préfère la pratique à la théorie, peut ne pas aimer l\'apprentissage systématique. Tâche karmique : ouvrir l\'esprit.' },
      1: { name: 'Intérêt & Curiosité', desc: 'Faible — curiosité sélective. Apprend ce qui semble pratiquement utile, évite les connaissances abstraites.' },
      2: { name: 'Intérêt & Curiosité', desc: 'Normal — bonne intelligence et intérêt sincère pour l\'apprentissage et le développement personnel.' },
      3: { name: 'Intérêt & Curiosité', desc: 'Prononcé — capacités intellectuelles marquées. Aime le savoir, esprit académique, chercheur né.' },
      4: { name: 'Intérêt & Curiosité', desc: 'Très élevé — intellect exceptionnel. Risque de sur-théorisation, de vivre dans sa tête, de déconnexion du quotidien.' },
    },
    4: {
      0: { name: 'Santé', desc: 'Absente — constitution faible. La santé nécessite des soins particuliers, un mode de vie sain et des bilans réguliers.' },
      1: { name: 'Santé', desc: 'En dessous de la moyenne — santé ordinaire, tendance aux maladies saisonnières. Vaut la peine de surveiller son bien-être.' },
      2: { name: 'Santé', desc: 'Normale — bonne santé. Supporte bien les charges quotidiennes et récupère raisonnablement.' },
      3: { name: 'Santé', desc: 'Bonne — santé robuste, haute endurance, bonne récupération après le stress et les maladies.' },
      4: { name: 'Santé', desc: 'Excellente — constitution très forte. Force physique et endurance ; la santé est une ressource naturelle.' },
    },
    5: {
      0: { name: 'Logique & Intuition', desc: 'Absente — intuition non développée. S\'appuie exclusivement sur la logique et les faits ; la voix intérieure est silencieuse. Tâche karmique : apprendre à faire confiance aux ressentis.' },
      1: { name: 'Logique & Intuition', desc: 'Faible — intuition présente mais rarement écoutée. Préfère les explications rationnelles aux pressentiments.' },
      2: { name: 'Logique & Intuition', desc: 'Normale — bon équilibre entre logique et intuition. Écoute la voix intérieure et prend généralement de bonnes décisions.' },
      3: { name: 'Logique & Intuition', desc: 'Forte — intuition bien développée. Prend souvent de bonnes décisions basées sur le ressenti ; pressent les événements.' },
      4: { name: 'Logique & Intuition', desc: 'Très forte — canal intuitif puissant. Haute sensibilité, possibles capacités précognitives ou médiumniques.' },
    },
    6: {
      0: { name: 'Travail & Discipline', desc: 'Absent — n\'aime pas le travail routinier et physique. Préfère les tâches créatives ou intellectuelles. Tâche karmique : apprendre la discipline.' },
      1: { name: 'Travail & Discipline', desc: 'Faible — travaille quand nécessaire, mais la monotonie est épuisante. Préfère la variété et la liberté créative.' },
      2: { name: 'Travail & Discipline', desc: 'Normal — approche consciencieuse du travail. Remplit ses obligations et maintient l\'ordre.' },
      3: { name: 'Travail & Discipline', desc: 'Élevé — très travailleur. Aime l\'ordre, la minutie et faire les choses correctement dès la première fois.' },
      4: { name: 'Travail & Discipline', desc: 'Très élevé — tendances au surmenage, perfectionnisme. Difficulté à déléguer et à accepter un résultat « assez bon ».' },
    },
    7: {
      0: { name: 'Chance & Destin', desc: 'Absente — pas de chance évidente. Obtient tout par le travail ; le destin intervient rarement. Tâche karmique : apprendre à faire confiance au flux de la vie.' },
      1: { name: 'Chance & Destin', desc: 'Faible — de temps en temps de la chance. S\'appuie principalement sur ses propres forces plutôt que sur des circonstances favorables.' },
      2: { name: 'Chance & Destin', desc: 'Normale — la vie est généralement favorable. Le destin aide dans les moments importants ; les bonnes personnes apparaissent au bon moment.' },
      3: { name: 'Chance & Destin', desc: 'Élevée — personne chanceuse. Les circonstances jouent souvent en sa faveur ; sentiment d\'être protégé par le destin.' },
      4: { name: 'Chance & Destin', desc: 'Très élevée — chance exceptionnelle. Protégé par le destin, tout se met en place ; protection spirituelle puissante.' },
    },
    8: {
      0: { name: 'Devoir & Responsabilité', desc: 'Absent — non alourdi par les obligations. Peut éviter les responsabilités et les engagements. Tâche karmique : apprendre la fiabilité.' },
      1: { name: 'Devoir & Responsabilité', desc: 'Faible — essaie d\'être responsable mais évite parfois les obligations difficiles quand elles entrent en conflit avec les intérêts personnels.' },
      2: { name: 'Devoir & Responsabilité', desc: 'Normal — personne responsable. Remplit ses devoirs, tient parole, on peut compter sur elle.' },
      3: { name: 'Devoir & Responsabilité', desc: 'Élevé — fort sens du devoir. Prend les engagements très au sérieux ; fiable et intègre.' },
      4: { name: 'Devoir & Responsabilité', desc: 'Très élevé — sens excessif de la responsabilité. Risque d\'abnégation, de porter les fardeaux des autres, d\'épuisement émotionnel.' },
    },
    9: {
      0: { name: 'Mémoire & Sagesse', desc: 'Absente — mauvaise mémoire ou préfère ne pas s\'attarder sur le passé. Vit dans le présent. Tâche karmique : apprendre des leçons de la vie.' },
      1: { name: 'Mémoire & Sagesse', desc: 'Faible — mémoire moyenne, oublie parfois les détails. La sagesse vient lentement, par l\'expérience.' },
      2: { name: 'Mémoire & Sagesse', desc: 'Normale — bonne mémoire. Apprend bien de l\'expérience et peut généraliser les leçons.' },
      3: { name: 'Mémoire & Sagesse', desc: 'Forte — excellente mémoire et sagesse profonde. Tire du sens des événements de la vie ; mentor naturel.' },
      4: { name: 'Mémoire & Sagesse', desc: 'Très forte — mémoire et sagesse phénoménales. Ou possible fixation excessive sur le passé, difficulté à lâcher prise.' },
    },
  },
  lt: {
    1: {
      0: { name: 'Valia ir charakteris', desc: 'Nėra — silpna valia, sunku priimti savarankiškus sprendimus, polinkis priklausyti nuo kitų nuomonės. Karminė užduotis: ugdyti vidinį stuburo jausmą.' },
      1: { name: 'Valia ir charakteris', desc: 'Silpna — valia formuojasi. Reikia sąmoningai ugdyti pasitikėjimą savimi, mokytis sakyti „ne" ir ginti savo poziciją.' },
      2: { name: 'Valia ir charakteris', desc: 'Norma — subalansuotas charakteris. Geba priimti sprendimus ir apginti požiūrį be agresijos.' },
      3: { name: 'Valia ir charakteris', desc: 'Stipri — prigimtinis lyderis. Tikslingas, atkaklus, valingas. Aplinkiniai jaučia vidinį autoritetą.' },
      4: { name: 'Valia ir charakteris', desc: 'Labai stipri — dominuojanti valia. Užsispyrimo rizika, sunkumai priimant kitų nuomones, galimas polinkis į kontrolę.' },
    },
    2: {
      0: { name: 'Bioenergetika', desc: 'Nėra — labai maža gyvybinė energija. Sveikata reikalauja ypatingos priežiūros; gyvenimo būdas ir poilsis yra labai svarbūs.' },
      1: { name: 'Bioenergetika', desc: 'Žema — vidutinė energija. Streso laikotarpiais gali trūkti jėgų; atsigavimas užtrunka.' },
      2: { name: 'Bioenergetika', desc: 'Norma — geras energijos lygis. Jaučiasi gerai, susidoroja su kasdieniais krūviais.' },
      3: { name: 'Bioenergetika', desc: 'Aukšta — energingas žmogus. Didelė gyvybinė jėga, greitas atsigavimas, prigimtinis entuziazmas.' },
      4: { name: 'Bioenergetika', desc: 'Labai aukšta — perteklinė energija. Impulsyvumo, emocinio sprogstingumo rizika, sunku atsipalaiduoti.' },
    },
    3: {
      0: { name: 'Susidomėjimas ir smalsumas', desc: 'Nėra — prigimtinis ne knygų žmogus. Teikia pirmenybę praktikai prieš teoriją, gali nemėgti sistemingo mokymosi. Karminė užduotis: atverti protą.' },
      1: { name: 'Susidomėjimas ir smalsumas', desc: 'Silpnas — selektyvus smalsumas. Mokosi to, kas atrodo praktiškai naudinga, vengia abstrakčių žinių.' },
      2: { name: 'Susidomėjimas ir smalsumas', desc: 'Norma — geras intelektas ir nuoširdus susidomėjimas mokymusi bei savitobulėjimu.' },
      3: { name: 'Susidomėjimas ir smalsumas', desc: 'Ryškus — pastebimi intelektiniai gebėjimai. Myli žinias, akademinis mąstymas, prigimtinis tyrėjas.' },
      4: { name: 'Susidomėjimas ir smalsumas', desc: 'Labai aukštas — išskirtinis intelektas. Per didelio teoretizavimo, gyvenimo mintyse, atitrūkimo nuo kasdienybės rizika.' },
    },
    4: {
      0: { name: 'Sveikata', desc: 'Nėra — silpna konstitucija. Sveikata reikalauja atsargaus požiūrio, sveiko gyvenimo būdo ir reguliarių patikrinimų.' },
      1: { name: 'Sveikata', desc: 'Žemiau vidurkio — įprasta sveikata, polinkis į sezoninius susirgimus. Verta atkreipti dėmesį į savijautą.' },
      2: { name: 'Sveikata', desc: 'Norma — gera sveikata. Gerai susidoroja su kasdieniais krūviais ir pakankamai atsigauna.' },
      3: { name: 'Sveikata', desc: 'Gera — tvirta sveikata, didelė ištvermė, geras atsigavimas po streso ir ligų.' },
      4: { name: 'Sveikata', desc: 'Puiki — labai stipri konstitucija. Fizinė jėga ir ištvermė; sveikata yra prigimtinis išteklius.' },
    },
    5: {
      0: { name: 'Logika ir intuicija', desc: 'Nėra — intuicija neišvystyta. Remiasi tik logika ir faktais; vidinis balsas tyli. Karminė užduotis: išmokti pasitikėti jausmais.' },
      1: { name: 'Logika ir intuicija', desc: 'Silpna — intuicija yra, tačiau retai ja pasitikima. Teikiama pirmenybė racionaliems paaiškinimams, o ne nuojautai.' },
      2: { name: 'Logika ir intuicija', desc: 'Norma — geras logikos ir intuicijos balansas. Klauso vidinio balso, paprastai priima subalansuotus sprendimus.' },
      3: { name: 'Logika ir intuicija', desc: 'Stipri — gerai išvystyta intuicija. Dažnai priima teisingus sprendimus remdamasis nuojauta; jaučia įvykius iš anksto.' },
      4: { name: 'Logika ir intuicija', desc: 'Labai stipri — galingas intuityvus kanalas. Didelis jautrumas, galimos prekognicijos ar mediuminės gebos.' },
    },
    6: {
      0: { name: 'Darbštumas', desc: 'Nėra — nemėgsta rutininio ir fizinio darbo. Teikia pirmenybę kūrybinėms ar intelektinėms užduotims. Karminė užduotis: išmokti drausmės.' },
      1: { name: 'Darbštumas', desc: 'Žemas — dirba kai reikia, tačiau monotonija greitai vargina. Teikiama pirmenybė įvairovei ir kūrybinei laisvei.' },
      2: { name: 'Darbštumas', desc: 'Norma — sąžiningas požiūris į darbą. Vykdo įsipareigojimus ir palaiko tvarką.' },
      3: { name: 'Darbštumas', desc: 'Aukštas — labai darbštus. Mėgsta tvarką, kruopštumą ir viską daryti teisingai iš pirmo karto.' },
      4: { name: 'Darbštumas', desc: 'Labai aukštas — darboholizmo tendencijos, perfekcionizmas. Sunku deleguoti ir priimti rezultatą kaip „pakankamai gerą".' },
    },
    7: {
      0: { name: 'Sėkmė ir likimas', desc: 'Nėra — nėra akivaizdžios sėkmės. Viską pasiekia darbu; likimas retai įsikiša. Karminė užduotis: išmokti pasitikėti gyvenimo srautu.' },
      1: { name: 'Sėkmė ir likimas', desc: 'Žema — retkarčiais pasiseka. Daugiausia remiasi savomis jėgomis, o ne palankiomis aplinkybėmis.' },
      2: { name: 'Sėkmė ir likimas', desc: 'Norma — gyvenimas apskritai klostosi palankiai. Likimas padeda svarbiais momentais; reikalingi žmonės pasirodo laiku.' },
      3: { name: 'Sėkmė ir likimas', desc: 'Aukšta — laimingas žmogus. Aplinkybės dažnai klostosi jo naudai; jaučia likimo globą.' },
      4: { name: 'Sėkmė ir likimas', desc: 'Labai aukšta — išskirtinė sėkmė. Likimo globojamas, viskas susiklosto; stipri dvasinė apsauga.' },
    },
    8: {
      0: { name: 'Pareiga ir atsakomybė', desc: 'Nėra — neapsunkintas įsipareigojimais. Gali vengti atsakomybės ir įsipareigojimų. Karminė užduotis: išmokti patikimumo.' },
      1: { name: 'Pareiga ir atsakomybė', desc: 'Žema — stengiasi būti atsakingas, tačiau kartais vengia sunkių įsipareigojimų, kai jie prieštarauja asmeniniams interesams.' },
      2: { name: 'Pareiga ir atsakomybė', desc: 'Norma — atsakingas žmogus. Vykdo pareigas, laiko žodį, galima pasikliauti.' },
      3: { name: 'Pareiga ir atsakomybė', desc: 'Aukšta — stiprus pareigos jausmas. Labai rimtai žiūri į įsipareigojimus; patikimas ir principingas.' },
      4: { name: 'Pareiga ir atsakomybė', desc: 'Labai aukšta — per didelis atsakomybės jausmas. Savęs aukojimo, kitų naštų nešimo, emocinio perdegimo rizika.' },
    },
    9: {
      0: { name: 'Atmintis ir išmintis', desc: 'Nėra — silpna atmintis arba renkasi nesaugoti praeities patirties. Gyvena dabartimi. Karminė užduotis: mokytis iš gyvenimo pamokų.' },
      1: { name: 'Atmintis ir išmintis', desc: 'Silpna — vidutinė atmintis, kartais pamiršta detales. Išmintis ateina lėtai, per patirtį.' },
      2: { name: 'Atmintis ir išmintis', desc: 'Norma — gera atmintis. Gerai mokosi iš patirties ir geba apibendrinti pamokas.' },
      3: { name: 'Atmintis ir išmintis', desc: 'Stipri — puiki atmintis ir gili išmintis. Sembia prasmę iš gyvenimo įvykių; prigimtinis mentorius.' },
      4: { name: 'Atmintis ir išmintis', desc: 'Labai stipri — fenomenali atmintis ir išmintis. Arba galima per didelė praeities fiksacija, sunkumai atleidžiant.' },
    },
  },
};

function getLevel(count: number): Level {
  return Math.min(count, 4) as Level;
}

function calcMatrix(dateStr: string): Record<number, number> {
  const [yyyy, mm, dd] = dateStr.split('-');
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  const addDigits = (n: number) => {
    String(n).split('').map(Number).forEach(d => { if (d >= 1 && d <= 9) counts[d]++; });
  };
  const sumDigits = (n: number): number =>
    String(n).split('').map(Number).reduce((a, b) => a + b, 0);

  const raw = dd + mm + yyyy;
  raw.split('').map(Number).forEach(d => { if (d >= 1 && d <= 9) counts[d]++; });

  // A = sum of all date digits
  const A = raw.split('').map(Number).reduce((a, b) => a + b, 0);
  addDigits(A);

  // B = sum of digits of A
  const B = sumDigits(A);
  addDigits(B);

  // C = A − 2 × first digit of day
  const firstDayDigit = parseInt(dd[0], 10);
  const C = A - 2 * firstDayDigit;
  if (C > 0) {
    addDigits(C);
    // D = sum of digits of C
    addDigits(sumDigits(C));
  }

  return counts;
}

const GRID_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function PythagoreanMatrixCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const meanings = COUNT_MEANINGS[locale] ?? COUNT_MEANINGS.en;
  const [date, setDate] = useState('');
  const [matrix, setMatrix] = useState<Record<number, number> | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!date) { setError(t.errEmpty); setMatrix(null); return; }
    const d = new Date(date);
    if (isNaN(d.getTime())) { setError(t.errInvalid); setMatrix(null); return; }
    setError('');
    setMatrix(calcMatrix(date));
  };

  return (
    <div className={styles.calc}>
      <div className={styles.calc__field}>
        <label className={styles.calc__label}>{t.label}</label>
        <input
          type="date"
          className={styles.calc__input}
          value={date}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => { setDate(e.target.value); setError(''); setMatrix(null); }}
        />
      </div>
      <button className={styles.calc__btn} onClick={calculate}>{t.btn}</button>
      {error && <p className={styles.calc__error}>{error}</p>}
      {matrix && (
        <div className={styles.calc__result}>
          <div className={styles.calc__grid_wrap}>
            <div className={styles.calc__grid}>
              {GRID_ORDER.map(n => {
                const count = matrix[n];
                const filled = count > 0;
                return (
                  <div
                    key={n}
                    className={`${styles.calc__cell}${filled ? ' ' + styles['calc__cell--filled'] : ''}`}
                    title={meanings[n][getLevel(count)].name}
                  >
                    <span className={styles.calc__cell_num}>{n}</span>
                    <span className={styles.calc__cell_count}>
                      {filled ? String(n).repeat(Math.min(count, 4)) + (count > 4 ? '+' : '') : '—'}
                    </span>
                    {filled && (
                      <span className={styles.calc__cell_dots}>
                        {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
                          <span key={i} className={styles.calc__dot} />
                        ))}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.calc__interp}>
            <h3 className={styles.calc__zone_title}>{t.interpretTitle}</h3>
            <div className={styles.calc__zone_list}>
              {GRID_ORDER.map(n => {
                const count = matrix[n];
                const level = getLevel(count);
                const meaning = meanings[n][level];
                const isEmpty = count === 0;
                return (
                  <div
                    key={n}
                    className={`${styles.calc__zone_item}${isEmpty ? ' ' + styles['calc__zone_item--empty'] : ''}`}
                  >
                    <div className={`${styles.calc__zone_badge}${isEmpty ? ' ' + styles['calc__zone_badge--empty'] : ' ' + styles['calc__zone_badge--filled']}`}>
                      {isEmpty ? n : String(n).repeat(Math.min(count, 4))}
                    </div>
                    <div className={styles.calc__zone_content}>
                      <span className={styles.calc__zone_name}>{meaning.name}</span>
                      <span className={`${styles.calc__zone_level} ${styles[`calc__zone_level--${level}`]}`}>
                        {t.levelTags[level]}
                      </span>
                      <span className={styles.calc__zone_trait}>{meaning.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

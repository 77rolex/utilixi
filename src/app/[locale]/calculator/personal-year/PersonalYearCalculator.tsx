'use client';

import { useState } from 'react';
import styles from './PersonalYearCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  label: string; btn: string; yearLabel: string; errEmpty: string; errInvalid: string;
}> = {
  en: { label: 'Date of birth', btn: 'Calculate Personal Year', yearLabel: 'Your Personal Year', errEmpty: 'Please enter your date of birth.', errInvalid: 'Please enter a valid date.' },
  ru: { label: 'Дата рождения', btn: 'Рассчитать персональный год', yearLabel: 'Ваш персональный год', errEmpty: 'Введите дату рождения.', errInvalid: 'Введите корректную дату.' },
  uk: { label: 'Дата народження', btn: 'Розрахувати персональний рік', yearLabel: 'Ваш персональний рік', errEmpty: 'Введіть дату народження.', errInvalid: 'Введіть коректну дату.' },
  fr: { label: 'Date de naissance', btn: 'Calculer l\'Année Personnelle', yearLabel: 'Votre Année Personnelle', errEmpty: 'Veuillez entrer votre date de naissance.', errInvalid: 'Veuillez entrer une date valide.' },
  lt: { label: 'Gimimo data', btn: 'Apskaičiuoti asmeninį metus', yearLabel: 'Jūsų asmeniniai metai', errEmpty: 'Įveskite gimimo datą.', errInvalid: 'Įveskite teisingą datą.' },
};

const YEAR_INFO: Record<number, Record<string, { name: string; desc: string }>> = {
  1: {
    en: { name: 'Year of New Beginnings', desc: 'This is your year to start fresh. Doors open, new opportunities appear and the energy strongly supports launching anything you have been dreaming about. Act boldly, trust your instincts and prioritise independence — the seeds you plant now define the next nine-year cycle.' },
    ru: { name: 'Год новых начинаний', desc: 'Это ваш год для свежего старта. Открываются двери, появляются новые возможности, а энергия активно поддерживает запуск того, о чём вы давно мечтали. Действуйте смело, доверяйте своим инстинктам и ставьте независимость на первое место — семена, посеянные сейчас, определяют следующий девятилетний цикл.' },
    uk: { name: 'Рік нових починань', desc: 'Це ваш рік для свіжого старту. Відкриваються двері, з\'являються нові можливості, а енергія активно підтримує запуск того, про що ви давно мріяли. Дійте сміливо, довіряйте своїм інстинктам — насіння, посіяне зараз, визначає наступний дев\'ятирічний цикл.' },
    fr: { name: 'Année des Nouveaux Départs', desc: 'C\'est votre année pour repartir à zéro. Les portes s\'ouvrent, les nouvelles opportunités apparaissent et l\'énergie soutient fortement le lancement de tout ce que vous rêvez depuis longtemps. Agissez audacieusement — les graines que vous plantez maintenant définissent votre prochain cycle de neuf ans.' },
    lt: { name: 'Naujų pradžių metai', desc: 'Tai jūsų metai pradėti iš naujo. Atsiveria durys, atsiranda naujos galimybės ir energija stipriai palaiko visko, apie ką svajojote, paleidimą. Elgkitės drąsiai, pasitikėkite savo instinktais — dabar pasėtos sėklos lemia kitą devynerių metų ciklą.' },
  },
  2: {
    en: { name: 'Year of Cooperation', desc: 'This is a year for patience, diplomacy and building relationships. The energy calls you to slow down, listen more and work in partnership rather than alone. Collaborations and romantic connections begun this year carry lasting depth. Trust that small, steady steps forward count enormously.' },
    ru: { name: 'Год сотрудничества', desc: 'Это год терпения, дипломатии и построения отношений. Энергия призывает вас замедлиться, больше слушать и работать в партнёрстве, а не в одиночку. Сотрудничества и романтические связи, начатые в этом году, несут глубину и долговечность. Доверяйте тому, что небольшие уверенные шаги вперёд имеют огромное значение.' },
    uk: { name: 'Рік співпраці', desc: 'Це рік терпіння, дипломатії та будівництва стосунків. Енергія закликає вас уповільнитися, більше слухати та працювати в партнерстві. Співпраці та романтичні зв\'язки, розпочаті цього року, несуть глибину і довговічність. Довіряйте тому, що невеликі впевнені кроки мають величезне значення.' },
    fr: { name: 'Année de la Coopération', desc: 'C\'est une année de patience, de diplomatie et de construction de relations. L\'énergie vous appelle à ralentir, à écouter davantage et à travailler en partenariat plutôt que seul. Les collaborations et liaisons romantiques entamées cette année ont une profondeur durable. Faites confiance au fait que les petits pas réguliers comptent énormément.' },
    lt: { name: 'Bendradarbiavimo metai', desc: 'Tai kantrybės, diplomatijos ir santykių kūrimo metai. Energija kviečia jus sulėtėti, daugiau klausytis ir dirbti partnerystėje, o ne vieniems. Šiais metais pradėti bendradarbiavimai ir romantiniai ryšiai turi ilgalaikį gylį. Pasitikėkite, kad maži, nuoseklūs žingsniai labai svarbūs.' },
  },
  3: {
    en: { name: 'Year of Creative Expression', desc: 'Joy, creativity and social expansion define this year. Your self-expression is heightened and your natural talents are magnetic to others. Pursue artistic projects, enjoy social life and speak your truth — this is a fertile time for communication, writing, performing and any form of inspired creation.' },
    ru: { name: 'Год творческого самовыражения', desc: 'Радость, творчество и социальная экспансия определяют этот год. Ваше самовыражение обострено, а природные таланты притягивают других. Занимайтесь художественными проектами, наслаждайтесь общественной жизнью и говорите свою правду — это плодотворное время для общения, написания, выступлений и любого вдохновлённого творчества.' },
    uk: { name: 'Рік творчого самовираження', desc: 'Радість, творчість та соціальна експансія визначають цей рік. Ваше самовираження загострене, а природні таланти притягують інших. Займайтеся мистецькими проектами, насолоджуйтеся соціальним життям — це плідний час для спілкування, написання, виступів та будь-якого натхненного творчества.' },
    fr: { name: 'Année de l\'Expression Créative', desc: 'La joie, la créativité et l\'expansion sociale définissent cette année. Votre expression personnelle est amplifiée et vos talents naturels attirent les autres. Poursuivez des projets artistiques, profitez de la vie sociale et exprimez votre vérité — c\'est une période fertile pour la communication, l\'écriture et toute création inspirée.' },
    lt: { name: 'Kūrybinės raiškos metai', desc: 'Džiaugsmas, kūrybiškumas ir socialinė plėtra apibrėžia šiuos metus. Jūsų saviraiška yra padidinta ir natūralūs talentai patraukia kitus. Siekite meninių projektų, mėgaukitės socialiniu gyvenimu — tai derlinggas laikas bendravimui, rašymui, pasirodymas ir bet kokiai įkvepiančiai kūrybai.' },
  },
  4: {
    en: { name: 'Year of Building Foundations', desc: 'This is a year to work hard, organise and lay solid groundwork. Dreams require practical structure now — commit to plans, establish routines and focus on health, finances and long-term security. What you build methodically this year will support you for years to come. Discipline is your greatest asset.' },
    ru: { name: 'Год закладки фундамента', desc: 'Это год трудолюбия, организации и закладки прочной основы. Мечты сейчас требуют практической структуры — следуйте планам, устанавливайте распорядок дня и сосредоточьтесь на здоровье, финансах и долгосрочной безопасности. То, что вы методично построите в этом году, будет поддерживать вас долгие годы. Дисциплина — ваш главный актив.' },
    uk: { name: 'Рік закладення фундаменту', desc: 'Це рік наполегливої праці, організації та закладення міцної основи. Мрії зараз вимагають практичної структури — дотримуйтеся планів, встановлюйте розпорядок дня та зосередьтеся на здоров\'ї, фінансах і довгостроковій безпеці. Дисципліна — ваш головний актив.' },
    fr: { name: 'Année de Construction des Fondations', desc: 'C\'est une année pour travailler dur, s\'organiser et poser des bases solides. Les rêves nécessitent une structure pratique maintenant — engagez-vous dans vos plans, établissez des routines et concentrez-vous sur la santé, les finances et la sécurité à long terme. La discipline est votre atout le plus précieux.' },
    lt: { name: 'Pamatų kūrimo metai', desc: 'Tai sunkaus darbo, organizavimo ir tvirtų pagrindų kūrimo metai. Dabar svajonės reikalauja praktinės struktūros — laikykitės planų, nustatykite rutinas ir sutelkite dėmesį į sveikatą, finansus ir ilgalaikį saugumą. Disciplina yra jūsų didžiausias privalumas.' },
  },
  5: {
    en: { name: 'Year of Change and Freedom', desc: 'Expect the unexpected — this year brings rapid change, new experiences and a powerful drive toward freedom. Travel, adventure and variety characterise the energy. Resist the urge to cling to the familiar; instead, embrace transitions with curiosity. The more flexible and open you remain, the more this year rewards you.' },
    ru: { name: 'Год перемен и свободы', desc: 'Ожидайте неожиданного — этот год приносит быстрые перемены, новые впечатления и мощное стремление к свободе. Путешествия, приключения и разнообразие характеризуют эту энергию. Сопротивляйтесь желанию цепляться за привычное; вместо этого принимайте переходы с любопытством. Чем более гибкими вы остаётесь, тем больше этот год вознаграждает вас.' },
    uk: { name: 'Рік змін та свободи', desc: 'Очікуйте несподіваного — цей рік приносить швидкі зміни, нові враження та потужне прагнення до свободи. Подорожі, пригоди та різноманітність характеризують цю енергію. Чим більш гнучкими та відкритими ви залишаєтеся, тим більше цей рік винагороджує вас.' },
    fr: { name: 'Année du Changement et de la Liberté', desc: 'Attendez-vous à l\'inattendu — cette année apporte des changements rapides, de nouvelles expériences et une puissante aspiration à la liberté. Les voyages, l\'aventure et la variété caractérisent cette énergie. Résistez à l\'envie de vous accrocher au familier ; embrassez les transitions avec curiosité.' },
    lt: { name: 'Pokyčių ir laisvės metai', desc: 'Tikitės netikėtumo — šiais metais ateina greiti pokyčiai, naujos patirtys ir galinga laisvės troškimo banga. Kelionės, nuotykiai ir įvairovė apibūdina šią energiją. Kuo lankstesni ir atviresni išliekate, tuo labiau šie metai jus apdovanoja.' },
  },
  6: {
    en: { name: 'Year of Harmony and Service', desc: 'Love, family and community take centre stage this year. You are called to give, care and take responsibility for those around you. Home improvements, committed relationships and healing old wounds are favoured. Although it demands much of you, the deep fulfilment and love you receive in return make it deeply worthwhile.' },
    ru: { name: 'Год гармонии и служения', desc: 'Любовь, семья и общество выходят на первый план в этом году. Вас призывают отдавать, заботиться и брать ответственность за окружающих. Улучшения дома, серьёзные отношения и исцеление старых ран находятся в приоритете. Хотя это многого от вас требует, глубокое удовлетворение и любовь, которые вы получаете взамен, делают это стоящим.' },
    uk: { name: 'Рік гармонії та служіння', desc: 'Любов, сім\'я та спільнота виходять на перший план цього року. Вас закликають віддавати, піклуватися та брати відповідальність за оточуючих. Покращення дому, серйозні стосунки та зцілення старих ран у пріоритеті. Глибоке задоволення та любов, які ви отримуєте взамін, роблять це вартим.' },
    fr: { name: 'Année de l\'Harmonie et du Service', desc: 'L\'amour, la famille et la communauté occupent le devant de la scène cette année. Vous êtes appelé à donner, à prendre soin et à assumer la responsabilité de ceux qui vous entourent. Les améliorations de la maison, les relations engagées et la guérison des vieilles blessures sont favorisées.' },
    lt: { name: 'Harmonijos ir tarnystės metai', desc: 'Meilė, šeima ir bendruomenė užima centrinę vietą šiais metais. Esate pašauktas duoti, rūpintis ir prisiimti atsakomybę už aplinkinius. Namų pagerinimas, rimti santykiai ir senų žaizdų gydymas yra palankus. Gilus pasitenkinimas ir meilė, kurią gaunate mainais, daro tai labai verta.' },
  },
  7: {
    en: { name: 'Year of Inner Reflection', desc: 'This is a year to turn inward. Rest, study, spiritual exploration and solitude are your greatest gifts now. The pace of life slows to invite deeper self-knowledge. Resist frustration when things do not progress quickly externally; the real growth this year is taking place beneath the surface, preparing you for the power cycle ahead.' },
    ru: { name: 'Год внутренней рефлексии', desc: 'Это год для обращения внутрь. Отдых, учёба, духовное исследование и уединение — ваши величайшие дары сейчас. Темп жизни замедляется, приглашая к более глубокому самопознанию. Реальный рост в этом году происходит под поверхностью, готовя вас к силовому циклу впереди.' },
    uk: { name: 'Рік внутрішньої рефлексії', desc: 'Це рік для звернення всередину. Відпочинок, навчання, духовне дослідження та самотність — ваші найбільші дари зараз. Темп життя сповільнюється, запрошуючи до глибшого самопізнання. Справжнє зростання цього року відбувається під поверхнею, готуючи вас до силового циклу попереду.' },
    fr: { name: 'Année de la Réflexion Intérieure', desc: 'C\'est une année pour se tourner vers l\'intérieur. Le repos, les études, l\'exploration spirituelle et la solitude sont vos plus grands dons maintenant. Le rythme de vie ralentit pour inviter une connaissance de soi plus profonde. La véritable croissance de cette année se déroule en dessous de la surface.' },
    lt: { name: 'Vidinio apmąstymo metai', desc: 'Tai metai atsigręžti į vidų. Poilsis, studijos, dvasinis tyrinėjimas ir vienatvė dabar yra jūsų didžiausios dovanos. Gyvenimo tempas lėtėja, kviesdamas gilesniam savęs pažinimui. Tikrasis šių metų augimas vyksta po paviršiumi, ruošiant jus galios ciklui priekyje.' },
  },
  8: {
    en: { name: 'Year of Achievement and Abundance', desc: 'Power, ambition and material success are the hallmarks of this year. Career advancement, financial growth and the recognition of your efforts are strongly favoured. You have the drive and authority now to accomplish significant goals — take charge, negotiate boldly and claim what you have earned. Use any gains wisely, as they plant seeds for future cycles.' },
    ru: { name: 'Год достижений и изобилия', desc: 'Власть, амбиции и материальный успех — отличительные черты этого года. Карьерный рост, финансовое процветание и признание ваших усилий активно поддерживаются. У вас есть стремление и авторитет для достижения значительных целей — берите на себя управление, ведите переговоры смело и получайте заработанное. Используйте доходы мудро.' },
    uk: { name: 'Рік досягнень та достатку', desc: 'Влада, амбіції та матеріальний успіх — відмінні риси цього року. Кар\'єрне зростання, фінансове процвітання та визнання ваших зусиль активно підтримуються. У вас є прагнення та авторитет для досягнення значних цілей — беріть керування та отримуйте зароблене. Використовуйте доходи мудро.' },
    fr: { name: 'Année de la Réussite et de l\'Abondance', desc: 'Le pouvoir, l\'ambition et le succès matériel sont les marques de cette année. L\'avancement professionnel, la croissance financière et la reconnaissance de vos efforts sont fortement favorisés. Vous avez la motivation et l\'autorité pour accomplir des objectifs significatifs — prenez en charge et réclamez ce que vous avez mérité.' },
    lt: { name: 'Pasiekimų ir gausos metai', desc: 'Galia, ambicijos ir materialinė sėkmė yra šių metų ženklai. Karjeros kilimas, finansinis augimas ir jūsų pastangų pripažinimas yra stipriai palankus. Turite ryžtą ir autoritetą siekti reikšmingų tikslų — perimkite vadovavimą ir reikalaukite to, ką uždirbote.' },
  },
  9: {
    en: { name: 'Year of Completion and Release', desc: 'This is the final year of your nine-year cycle — a time to complete, release and let go of what no longer serves you. Relationships, jobs, beliefs and habits that have outgrown their purpose will naturally end. Rather than resisting these endings, embrace them as clearing the way for an entirely new chapter. Forgiveness, generosity and compassionate service bring the greatest rewards.' },
    ru: { name: 'Год завершения и отпускания', desc: 'Это последний год вашего девятилетнего цикла — время завершать, отпускать и освобождаться от того, что больше вам не служит. Отношения, работа, убеждения и привычки, изжившие себя, естественно завершатся. Прощение, щедрость и сострадательное служение принесут наибольшую отдачу.' },
    uk: { name: 'Рік завершення та відпускання', desc: 'Це останній рік вашого дев\'ятирічного циклу — час завершувати, відпускати та звільнятися від того, що більше вам не служить. Стосунки, робота, переконання та звички, що пережили себе, природно завершаться. Прощення, щедрість та співчутливе служіння принесуть найбільшу винагороду.' },
    fr: { name: 'Année de la Complétion et de la Libération', desc: 'C\'est la dernière année de votre cycle de neuf ans — un moment pour compléter, libérer et lâcher ce qui ne vous sert plus. Les relations, les emplois, les croyances et les habitudes qui ont dépassé leur but se termineront naturellement. Le pardon, la générosité et le service compatissant apportent les plus grandes récompenses.' },
    lt: { name: 'Užbaigimo ir paleidimo metai', desc: 'Tai paskutiniai jūsų devynerių metų ciklo metai — laikas užbaigti, atleisti ir atsikratyti to, kas jums nebetarnauja. Santykiai, darbai, įsitikinimai ir įpročiai, kurie viršijo savo tikslą, natūraliai baigsis. Atleidimas, dosnumas ir užjaučianti tarnyba atneša didžiausias dovanas.' },
  },
  11: {
    en: { name: 'Master Year of Illumination', desc: 'This is an exceptionally powerful year charged with heightened intuition and spiritual awareness. Insights, creative inspiration and synchronicities abound — pay close attention to them. You are being called to step into a higher level of purpose and influence. The intensity can feel overwhelming, but with trust in your inner guidance, this year can be truly transformational.' },
    ru: { name: 'Мастер-год просветления', desc: 'Это исключительно мощный год, заряженный обострённой интуицией и духовным сознанием. Озарения, творческое вдохновение и синхронности в изобилии — уделяйте им пристальное внимание. Вас призывают выйти на более высокий уровень цели и влияния. Интенсивность может казаться подавляющей, но с доверием внутреннему руководству этот год может быть поистине трансформационным.' },
    uk: { name: 'Майстер-рік просвітлення', desc: 'Це винятково потужний рік, заряджений загостреною інтуїцією та духовним усвідомленням. Осяяння, творче натхнення та синхронності у надлишку — приділяйте їм пильну увагу. Вас закликають вийти на вищий рівень мети та впливу. З довірою внутрішньому керівництву цей рік може бути справді трансформаційним.' },
    fr: { name: 'Année Maître de l\'Illumination', desc: 'C\'est une année exceptionnellement puissante chargée d\'intuition accrue et de conscience spirituelle. Les insights, l\'inspiration créative et les synchronicités abondent — faites-y bien attention. Vous êtes appelé à accéder à un niveau supérieur de but et d\'influence. Avec confiance en votre guidance intérieure, cette année peut être vraiment transformatrice.' },
    lt: { name: 'Meistro apšvietimo metai', desc: 'Tai ypač galinga metai, kupina padidėjusios intuicijos ir dvasinio sąmoningumo. Įžvalgų, kūrybinio įkvėpimo ir sinchronijų gausu — atidžiai atkreipkite į juos dėmesį. Esate pašauktas žengti į aukštesnį tikslo ir įtakos lygį. Su pasitikėjimu vidine vadovaude, šie metai gali būti tikrai transformaciniai.' },
  },
  22: {
    en: { name: 'Master Year of Manifestation', desc: 'This is a year of extraordinary practical power. The capacity to turn grand visions into real, lasting structures is at its peak. You have both the vision and the discipline to build something of lasting significance — in business, community or your personal life. The demands are high, but the legacy you can create this year is unparalleled. Think big, act methodically and trust in your ability to serve on a large scale.' },
    ru: { name: 'Мастер-год манифестации', desc: 'Это год исключительной практической мощи. Способность превращать грандиозные видения в реальные, долговечные структуры находится на пике. У вас есть как видение, так и дисциплина для создания чего-то значительного. Думайте масштабно, действуйте методично и доверяйте своей способности служить в большом масштабе.' },
    uk: { name: 'Майстер-рік маніфестації', desc: 'Це рік виняткової практичної потужності. Здатність перетворювати грандіозні бачення на реальні, довговічні структури знаходиться на піку. У вас є як бачення, так і дисципліна для створення чогось значущого. Думайте масштабно, дійте методично та довіряйте своїй здатності служити у великому масштабі.' },
    fr: { name: 'Année Maître de la Manifestation', desc: 'C\'est une année de pouvoir pratique extraordinaire. La capacité de transformer de grandes visions en structures réelles et durables est à son apogée. Vous avez à la fois la vision et la discipline pour construire quelque chose de signification durable. Pensez grand, agissez méthodiquement et faites confiance à votre capacité à servir à grande échelle.' },
    lt: { name: 'Meistro manifestacijos metai', desc: 'Tai nepaprastos praktinės galios metai. Gebėjimas paversti grandiozines vizijas realiais, ilgalaikiais statiniais pasiekia viršūnę. Turite ir viziją, ir discipliną sukurti kažką reikšmingo. Galvokite plačiai, elkitės metodiškai ir pasitikėkite savo gebėjimu tarnauti dideliu mastu.' },
  },
};

function digitSum(n: number): number {
  return String(Math.abs(n)).split('').reduce((s, d) => s + parseInt(d, 10), 0);
}

function reduce(n: number): number {
  if (n === 11 || n === 22) return n;
  if (n <= 9) return n;
  return reduce(digitSum(n));
}

function calcPersonalYear(dateStr: string): number {
  const [, mm, dd] = dateStr.split('-');
  const currentYear = new Date().getFullYear();
  const total = (dd + mm + String(currentYear))
    .split('')
    .reduce((s, d) => s + parseInt(d, 10), 0);
  return reduce(total);
}

export default function PersonalYearCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [date, setDate] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!date) { setError(t.errEmpty); setResult(null); return; }
    const d = new Date(date);
    if (isNaN(d.getTime())) { setError(t.errInvalid); setResult(null); return; }
    setError('');
    setResult(calcPersonalYear(date));
  };

  const info = result !== null ? (YEAR_INFO[result]?.[locale] ?? YEAR_INFO[result]?.en) : null;
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.calc}>
      <div className={styles.calc__field}>
        <label className={styles.calc__label}>{t.label}</label>
        <input
          type="date"
          className={styles.calc__input}
          value={date}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => { setDate(e.target.value); setError(''); setResult(null); }}
        />
      </div>
      <button className={styles.calc__btn} onClick={calculate}>{t.btn}</button>
      {error && <p className={styles.calc__error}>{error}</p>}
      {result !== null && info && (
        <div className={styles.calc__result}>
          <span className={styles.calc__year_badge}>{t.yearLabel} {currentYear}</span>
          <div className={styles.calc__number}>{result}</div>
          <div className={styles.calc__name}>{info.name}</div>
          <p className={styles.calc__desc}>{info.desc}</p>
        </div>
      )}
    </div>
  );
}

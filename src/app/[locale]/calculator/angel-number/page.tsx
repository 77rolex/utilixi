import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import AngelNumberCalculator from './AngelNumberCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Angel Number Meaning — 111, 222, 333, 444 and More', description: 'Look up the meaning of any angel number from 111 to 9999. Discover what 111, 222, 333, 444, 555, 666, 777, 888, 999 and other repeating numbers mean spiritually. Free angel number guide.', h1: 'Angel Number Meaning Calculator', subtitle: 'Look up the spiritual meaning of any repeating number sequence — from 111 and 222 to 9999.' },
  ru: { title: 'Числа ангелов — значение 111, 222, 333, 444 и других', description: 'Узнайте значение любого числа ангела от 111 до 9999. Что означает 111, 222, 333, 444, 555, 666, 777, 888, 999 и другие повторяющиеся числа. Бесплатно.', h1: 'Числа ангелов — расшифровка', subtitle: 'Узнайте духовное значение любой повторяющейся числовой последовательности — от 111 и 222 до 9999.' },
  uk: { title: 'Числа ангелів — значення 111, 222, 333, 444 та інших', description: 'Дізнайтеся значення будь-якого числа ангела від 111 до 9999. Що означає 111, 222, 333, 444, 555, 666, 777, 888, 999 та інші числа. Безкоштовно.', h1: 'Числа ангелів — розшифрування', subtitle: 'Дізнайтеся духовне значення будь-якої числової послідовності, що повторюється, — від 111 і 222 до 9999.' },
  fr: { title: 'Nombre Angélique — Signification du 111, 222, 333, 444…', description: 'Découvrez la signification de tout nombre angélique de 111 à 9999. Que signifient 111, 222, 333, 444, 555, 777, 888, 999 et autres nombres répétitifs. Outil gratuit.', h1: 'Signification des Nombres Angéliques', subtitle: 'Découvrez la signification spirituelle de toute séquence de nombres répétitifs — de 111 et 222 jusqu\'à 9999.' },
  lt: { title: 'Angelo skaičiai — 111, 222, 333, 444 ir kitų reikšmė', description: 'Sužinokite bet kurio angelo skaičiaus reikšmę nuo 111 iki 9999. Ką reiškia 111, 222, 333, 444, 555, 666, 777, 888, 999 ir kiti besikartojantys skaičiai. Nemokama.', h1: 'Angelo skaičiaus reikšmė', subtitle: 'Sužinokite bet kurios besikartojančios skaičių sekos dvasinę reikšmę — nuo 111 ir 222 iki 9999.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Angel numbers are repeating or patterned number sequences that many people notice appearing repeatedly in everyday life — on clocks, licence plates, receipts, phone numbers or anywhere else numbers appear. According to numerological and spiritual traditions, these sequences are believed to carry messages from guardian angels, the universe or one\'s higher self. The phenomenon gained widespread popularity in the modern spiritual community through the work of Doreen Virtue and later through social media, where personal accounts of synchronicity with number sequences became a common theme. The core idea is that when you repeatedly notice the same number, it is not mere coincidence but a meaningful signal worth reflecting on.\n\nEach angel number carries a specific symbolic meaning derived from the vibrational qualities of its component digits. For example, 111 is associated with new beginnings and manifestation — a reminder that your thoughts are powerful and you are co-creating your reality. 444 carries protective energy — a sign that you are supported and guided. 777 signals spiritual alignment and growth. The meaning of a four-digit sequence like 1234 builds on the progression of its numbers, suggesting forward movement and step-by-step growth. Enter any number to look up its symbolic meaning, or use this tool for daily reflection on the numbers that catch your attention.',
    faqTitle: 'Frequently Asked Questions about Angel Numbers',
    faqs: [
      { q: 'What are angel numbers?', a: 'Angel numbers are repeating or patterned number sequences (such as 111, 222, 333, or 1234) that people notice recurrently in daily life. In spiritual and numerological traditions, they are believed to carry messages or guidance from angels, the universe, or the higher self.' },
      { q: 'What does 111 mean?', a: '111 is one of the most powerful angel numbers, associated with new beginnings, manifestation and alignment. It is a reminder that your thoughts are creating your reality — focus on what you want, not what you fear. Seeing 111 is often interpreted as a signal to set clear intentions.' },
      { q: 'What does 222 mean?', a: '222 is associated with balance, harmony, trust and partnerships. It encourages patience and faith that things are unfolding as they should. Seeing 222 is often a sign to trust the process, maintain balance in your relationships and believe that cooperation will lead to the right outcomes.' },
      { q: 'What does 333 mean?', a: '333 is linked to creativity, self-expression and the presence of ascended masters or spiritual guides. It is a sign of encouragement — you are on the right path, your abilities are recognised, and you are supported in expressing your authentic self and creative gifts.' },
      { q: 'What does 444 mean?', a: '444 is the number of protection, stability and divine support. It signals that you are surrounded and supported by angels or higher energies. Seeing 444 is often interpreted as reassurance during difficult times — you are not alone, and you are on solid ground.' },
      { q: 'What does 555 mean?', a: '555 signals change, transformation and life shifts. It is a sign that significant changes are coming or already in progress. Rather than resisting, 555 encourages you to embrace transformation, let go of what no longer serves you and trust that the changes lead to positive growth.' },
      { q: 'What does 777 mean?', a: '777 is considered one of the most spiritually powerful angel numbers. It signifies spiritual awakening, divine alignment, inner wisdom and good fortune. Seeing 777 is often taken as confirmation that you are deeply in alignment with your spiritual path and that rewards and insight are flowing to you.' },
      { q: 'What does 888 mean?', a: '888 is strongly associated with abundance, financial flow and the infinite cycle of giving and receiving. It suggests that a period of abundance and material reward is either approaching or underway. The figure-8 shape (the infinity symbol) reinforces themes of continuous flow and karmic balance.' },
      { q: 'What does 999 mean?', a: '999 marks endings, completion and readiness to begin a new chapter. It signals the close of a cycle — a relationship, phase of life, job or habit — and encourages you to release the old with gratitude. It is often seen as a preparation signal before a significant new beginning.' },
      { q: 'What does 1111 mean?', a: '1111 (or 11:11 on a clock) is perhaps the most widely noticed angel number. It is associated with awakening, synchronicity, portals of opportunity and spiritual alignment. Many traditions treat 11:11 as a "wish moment" — a reminder to focus your thoughts on what you most desire to call into your life.' },
    ],
  },
  ru: {
    description: 'Числа ангелов — это повторяющиеся или узорчатые числовые последовательности, которые многие люди замечают в повседневной жизни: на часах, номерных знаках, чеках, телефонных номерах. Согласно нумерологическим и духовным традициям, эти последовательности считаются посланиями от ангелов-хранителей, Вселенной или высшего "я". Каждое число ангела несёт специфическое символическое значение, основанное на вибрационных качествах составляющих его цифр.\n\nНапример, 111 связано с новыми начинаниями и материализацией желаний — напоминание о том, что ваши мысли мощны. 444 несёт защитную энергию. 777 сигнализирует о духовном выравнивании. Введите любое число, чтобы узнать его символическое значение, или используйте этот инструмент для ежедневного размышления над числами, которые привлекают ваше внимание.',
    faqTitle: 'Часто задаваемые вопросы о числах ангелов',
    faqs: [
      { q: 'Что такое числа ангелов?', a: 'Числа ангелов — повторяющиеся числовые последовательности (111, 222, 333 или 1234), которые люди регулярно замечают в повседневной жизни. В духовных традициях они считаются посланиями от ангелов, Вселенной или высшего "я".' },
      { q: 'Что означает 111?', a: '111 — одно из самых мощных чисел ангелов, связанное с новыми начинаниями, материализацией и выравниванием. Это напоминание о том, что ваши мысли создают вашу реальность. Видеть 111 часто означает сигнал к формированию чётких намерений.' },
      { q: 'Что означает 222?', a: '222 связано с балансом, гармонией, доверием и партнёрством. Это поощряет терпение и веру в то, что всё развивается так, как должно. Видеть 222 — знак доверять процессу и поддерживать баланс в отношениях.' },
      { q: 'Что означает 333?', a: '333 связано с творчеством, самовыражением и присутствием вознесённых мастеров. Это знак поощрения — вы на правильном пути, ваши способности признаны, вы поддержаны в выражении подлинного "я".' },
      { q: 'Что означает 444?', a: '444 — число защиты, стабильности и божественной поддержки. Оно сигнализирует, что вы окружены ангелами. Видеть 444 часто интерпретируется как утешение в трудные времена — вы не одиноки и стоите на твёрдой почве.' },
      { q: 'Что означает 555?', a: '555 сигнализирует об изменениях, преобразовании и жизненных переменах. Это знак того, что значительные изменения приближаются или уже происходят. 555 поощряет принять трансформацию и доверять, что перемены ведут к положительному росту.' },
      { q: 'Что означает 777?', a: '777 — одно из самых духовно мощных чисел ангелов. Оно означает духовное пробуждение, божественное выравнивание, внутреннюю мудрость и удачу. Видеть 777 часто воспринимается как подтверждение глубокого соответствия вашему духовному пути.' },
      { q: 'Что означает 888?', a: '888 тесно связано с изобилием, финансовым потоком и бесконечным циклом давать и получать. Оно предполагает, что период изобилия и материального вознаграждения приближается. Форма цифры 8 (символ бесконечности) усиливает темы непрерывного потока.' },
      { q: 'Что означает 999?', a: '999 знаменует окончания, завершение и готовность начать новую главу. Оно сигнализирует о завершении цикла и поощряет отпустить старое с благодарностью.' },
      { q: 'Что означает 1111?', a: '1111 (или 11:11 на часах) — одно из наиболее широко замечаемых чисел ангелов. Связано с пробуждением, синхронизмом и духовным выравниванием. Многие традиции рассматривают 11:11 как "момент желания".' },
    ],
  },
  uk: {
    description: 'Числа ангелів — це повторювані або узорчасті числові послідовності, які багато людей помічають у повсякденному житті: на годинниках, номерних знаках, чеках. Згідно з нумерологічними та духовними традиціями, ці послідовності вважаються посланнями від ангелів-охоронців, Всесвіту або вищого "я". Кожне число ангела несе специфічне символічне значення, засноване на вібраційних якостях його цифр.\n\nНаприклад, 111 пов\'язано з новими починаннями та матеріалізацією бажань. 444 несе захисну енергію. 777 сигналізує про духовне вирівнювання. Введіть будь-яке число, щоб дізнатися його символічне значення, або використовуйте цей інструмент для щоденних роздумів.',
    faqTitle: 'Поширені запитання про числа ангелів',
    faqs: [
      { q: 'Що таке числа ангелів?', a: 'Числа ангелів — повторювані числові послідовності (111, 222, 333 або 1234), які люди регулярно помічають у повсякденному житті. У духовних традиціях вони вважаються посланнями від ангелів, Всесвіту або вищого "я".' },
      { q: 'Що означає 111?', a: '111 — одне з найпотужніших чисел ангелів, пов\'язане з новими починаннями та матеріалізацією. Це нагадування про те, що ваші думки створюють вашу реальність. Бачити 111 часто означає сигнал до формування чітких намірів.' },
      { q: 'Що означає 222?', a: '222 пов\'язано з балансом, гармонією, довірою та партнерством. Це заохочує терпіння і віру в те, що все розвивається так, як має. Бачити 222 — знак довіряти процесу.' },
      { q: 'Що означає 333?', a: '333 пов\'язано з творчістю, самовираженням та присутністю духовних наставників. Це знак заохочення — ви на правильному шляху, ваші здібності визнані.' },
      { q: 'Що означає 444?', a: '444 — число захисту, стабільності та божественної підтримки. Бачити 444 часто інтерпретується як втіха у важкі часи — ви не самотні.' },
      { q: 'Що означає 555?', a: '555 сигналізує про зміни та перетворення. Це знак того, що значні зміни наближаються або вже відбуваються. 555 заохочує прийняти трансформацію.' },
      { q: 'Що означає 777?', a: '777 — одне з найбільш духовно потужних чисел ангелів. Воно означає духовне пробудження, внутрішню мудрість та удачу.' },
      { q: 'Що означає 888?', a: '888 тісно пов\'язано з достатком та фінансовим потоком. Форма цифри 8 (символ нескінченності) посилює теми безперервного потоку та кармічного балансу.' },
      { q: 'Що означає 999?', a: '999 знаменує закінчення, завершення та готовність почати новий розділ. Воно сигналізує про завершення циклу та заохочує відпустити старе з подякою.' },
      { q: 'Що означає 1111?', a: '1111 (або 11:11 на годиннику) — одне з найбільш широко помічуваних чисел ангелів. Пов\'язане з пробудженням, синхронізмом та духовним вирівнюванням.' },
    ],
  },
  fr: {
    description: 'Les nombres angéliques sont des séquences numériques répétées ou à motifs que de nombreuses personnes remarquent dans la vie quotidienne — sur les horloges, les plaques d\'immatriculation, les reçus. Selon les traditions numérologique et spirituelle, ces séquences sont considérées comme des messages des anges gardiens, de l\'univers ou du soi supérieur. La popularité du phénomène a explosé avec l\'essor des réseaux sociaux, où les témoignages de synchronicité avec des suites numériques sont devenus monnaie courante.\n\nChaque nombre angélique porte une signification symbolique spécifique dérivée des qualités vibratoires de ses chiffres. Par exemple, 111 est associé aux nouveaux départs et à la manifestation ; 444 porte une énergie protectrice ; 777 signale l\'alignement spirituel. Entrez n\'importe quel nombre pour découvrir sa signification symbolique ou utilisez cet outil pour votre réflexion quotidienne.',
    faqTitle: 'Questions fréquentes sur les nombres angéliques',
    faqs: [
      { q: 'Que sont les nombres angéliques ?', a: 'Les nombres angéliques sont des séquences numériques répétées (comme 111, 222, 333 ou 1234) que les gens remarquent de façon récurrente dans la vie quotidienne. Dans les traditions spirituelles et numérologique, ils sont considérés comme des messages des anges, de l\'univers ou du soi supérieur.' },
      { q: 'Que signifie le 111 ?', a: 'Le 111 est l\'un des nombres angéliques les plus puissants, associé aux nouveaux départs, à la manifestation et à l\'alignement. C\'est un rappel que vos pensées créent votre réalité — concentrez-vous sur ce que vous voulez, pas sur ce que vous craignez.' },
      { q: 'Que signifie le 222 ?', a: 'Le 222 est associé à l\'équilibre, l\'harmonie, la confiance et les partenariats. Il encourage la patience et la foi que les choses se déroulent comme elles le doivent. C\'est souvent un signe de faire confiance au processus.' },
      { q: 'Que signifie le 333 ?', a: 'Le 333 est lié à la créativité, à l\'expression de soi et à la présence de maîtres ascensionnés ou de guides spirituels. C\'est un signe d\'encouragement : vous êtes sur la bonne voie.' },
      { q: 'Que signifie le 444 ?', a: 'Le 444 est le nombre de la protection, de la stabilité et du soutien divin. Il signale que vous êtes entouré et soutenu par des anges. Le voir est souvent interprété comme une réassurance dans les moments difficiles.' },
      { q: 'Que signifie le 555 ?', a: 'Le 555 signale le changement, la transformation et les tournants de la vie. C\'est un signe que des changements significatifs arrivent ou sont déjà en cours. Il encourage à embrasser la transformation.' },
      { q: 'Que signifie le 777 ?', a: 'Le 777 est considéré comme l\'un des nombres angéliques les plus spirituellement puissants. Il signifie éveil spirituel, alignement divin, sagesse intérieure et bonne fortune.' },
      { q: 'Que signifie le 888 ?', a: 'Le 888 est fortement associé à l\'abondance et au flux financier. La forme du chiffre 8 (symbole de l\'infini) renforce les thèmes de flux continu et d\'équilibre karmique.' },
      { q: 'Que signifie le 999 ?', a: 'Le 999 marque les fins, l\'achèvement et la préparation à une nouvelle étape. Il signale la clôture d\'un cycle et encourage à lâcher l\'ancien avec gratitude.' },
      { q: 'Que signifie le 1111 ?', a: 'Le 1111 (ou 11h11 sur une horloge) est peut-être le nombre angélique le plus largement remarqué. Il est associé à l\'éveil, à la synchronicité et aux portes d\'opportunité. Beaucoup le traitent comme un "moment vœu".' },
    ],
  },
  lt: {
    description: 'Angelo skaičiai yra besikartojančios arba modelinės skaičių sekos, kurias daugelis žmonių pastebi kasdieniame gyvenime — laikrodžiuose, automobilio numeriuose, kvituose. Pagal numerologines ir dvasines tradicijas, šios sekos laikomos žinučiais iš angelų sargų, visatos ar aukštesnio "aš". Kiekvienas angelo skaičius turi specifinę simbolinę reikšmę, kylančią iš jo skaitmenų vibracininih savybių.\n\nPavyzdžiui, 111 siejamas su naujais pradžiūmais ir materializacija — priminimas, kad jūsų mintys kuria jūsų tikrovę. 444 nešioja apsaugos energiją. 777 signalizuoja dvasinį atsirikiavimą. Įveskite bet kurį skaičių, kad sužinotumėte jo simbolinę reikšmę, arba naudokite šį įrankį kasdieniam mąstymui.',
    faqTitle: 'Dažnai užduodami klausimai apie angelo skaičius',
    faqs: [
      { q: 'Kas yra angelo skaičiai?', a: 'Angelo skaičiai yra besikartojančios skaičių sekos (pvz., 111, 222, 333 ar 1234), kurias žmonės reguliariai pastebi kasdieniame gyvenime. Dvasinėse tradicijose jie laikomi žinutėmis iš angelų, visatos ar aukštesnio "aš".' },
      { q: 'Ką reiškia 111?', a: '111 yra vienas galingiausių angelo skaičių, siejamas su naujais pradžiūmais, materializacija ir atsirikiavimui. Tai priminimas, kad jūsų mintys kuria jūsų tikrovę — susitelkite į tai, ko norite, o ne ko bijote.' },
      { q: 'Ką reiškia 222?', a: '222 siejamas su pusiausvyra, harmonija, pasitikėjimu ir partnerystėmis. Jis skatina kantrybę ir tikėjimą, kad viskas klostosi taip, kaip turėtų. Matyti 222 dažnai yra ženklas pasitikėti procesu.' },
      { q: 'Ką reiškia 333?', a: '333 susijęs su kūrybiškumu, saviraišku ir aukštesniųjų meistrų buvimu. Tai padrąsinimo ženklas — esate tinkamame kelyje, jūsų sugebėjimai pripažinti.' },
      { q: 'Ką reiškia 444?', a: '444 yra apsaugos, stabilumo ir dieviškosios paramos skaičius. Matyti 444 dažnai interpretuojama kaip paguoda sunkiais laikais — jūs nesate vieni.' },
      { q: 'Ką reiškia 555?', a: '555 signalizuoja pokyčius, transformaciją ir gyvenimo lūžius. Tai ženklas, kad reikšmingi pokyčiai artėja arba jau vyksta. 555 skatina priimti transformaciją.' },
      { q: 'Ką reiškia 777?', a: '777 laikomas vienu dvasiškai galingiausių angelo skaičių. Jis simbolizuoja dvasinį pabudimą, dieviškąjį atsirikiavimą, vidinę išmintį ir laimę.' },
      { q: 'Ką reiškia 888?', a: '888 stipriai siejamas su gausa ir finansiniu srautu. Skaičiaus 8 forma (begalybės simbolis) sustiprina nuolatinio srauto ir karminės pusiausvyros temas.' },
      { q: 'Ką reiškia 999?', a: '999 žymi pabaigą, užbaigimą ir pasirengimą pradėti naują skyrių. Jis signalizuoja apie ciklo pabaigą ir skatina paleisti senąjį su dėkingumu.' },
      { q: 'Ką reiškia 1111?', a: '1111 (arba 11:11 laikrodyje) yra bene labiausiai pastebimas angelo skaičius. Jis siejamas su pabudimu, sinchroniškumu ir dvasiniu atsirikiavimą. Daugelis tradicijų laiko 11:11 "norų momentu".' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/numerology-compatibility', label: 'Numerology Compatibility' },
    { href: '/calculator/mercury-retrograde', label: 'Mercury Retrograde' },
    { href: '/calculator/zodiac-sign', label: 'Zodiac Sign Calculator' },
    { href: '/calculator/karmic-number', label: 'Karmic Number' },
  ],
  ru: [
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/numerology-compatibility', label: 'Совместимость по нумерологии' },
    { href: '/calculator/mercury-retrograde', label: 'Меркурий ретроградный' },
    { href: '/calculator/zodiac-sign', label: 'Знак зодиака' },
    { href: '/calculator/karmic-number', label: 'Кармическое число' },
  ],
  uk: [
    { href: '/calculator/life-path', label: 'Число шляху життя' },
    { href: '/calculator/numerology-compatibility', label: 'Сумісність за нумерологією' },
    { href: '/calculator/mercury-retrograde', label: 'Меркурій ретроградний' },
    { href: '/calculator/zodiac-sign', label: 'Знак зодіаку' },
    { href: '/calculator/karmic-number', label: 'Кармічне число' },
  ],
  fr: [
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/numerology-compatibility', label: 'Compatibilité Numérologique' },
    { href: '/calculator/mercury-retrograde', label: 'Mercure Rétrograde' },
    { href: '/calculator/zodiac-sign', label: 'Signe du Zodiaque' },
    { href: '/calculator/karmic-number', label: 'Nombre Karmique' },
  ],
  lt: [
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/numerology-compatibility', label: 'Numerologinis suderinamumas' },
    { href: '/calculator/mercury-retrograde', label: 'Merkurijaus retrogradas' },
    { href: '/calculator/zodiac-sign', label: 'Zodiako ženklas' },
    { href: '/calculator/karmic-number', label: 'Karminis skaičius' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/angel-number', meta);
}

export function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function AngelNumberPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/angel-number`,
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
        {meta.subtitle && <p className={styles.page__subtitle}>{meta.subtitle}</p>}
        <ToolActions />
        <AngelNumberCalculator locale={locale} />
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

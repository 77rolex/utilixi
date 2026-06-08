import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import WordCounter from './WordCounter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/tools/password-generator', label: 'Password Generator' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }],
  ru: [{ href: '/tools/password-generator', label: 'Генератор паролей' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }],
  uk: [{ href: '/tools/password-generator', label: 'Генератор паролів' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }],
  fr: [{ href: '/tools/password-generator', label: 'Générateur de mot de passe' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }],
  lt: [{ href: '/tools/password-generator', label: 'Slaptažodžių generatorius' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Word Counter — Count Words, Characters & Reading Time', description: 'Free online word counter. Count words, characters (with and without spaces), sentences, paragraphs, and estimate reading time. Includes top keyword density analysis.', h1: 'Word Counter' },
  ru: { title: 'Счётчик слов — считайте слова, символы и время чтения', description: 'Бесплатный онлайн-счётчик слов. Считайте слова, символы (с пробелами и без), предложения, абзацы и оценивайте время чтения. Анализ частоты ключевых слов.', h1: 'Счётчик слов и символов' },
  uk: { title: 'Лічильник слів — рахуйте слова, символи та час читання', description: 'Безкоштовний онлайн-лічильник слів. Рахуйте слова, символи (з пробілами та без), речення, абзаци та оцінюйте час читання. Аналіз частоти ключових слів.', h1: 'Лічильник слів і символів' },
  fr: { title: 'Compteur de mots — Comptez mots, caractères et temps de lecture', description: 'Compteur de mots gratuit en ligne. Comptez les mots, caractères (avec et sans espaces), phrases, paragraphes et estimez le temps de lecture. Analyse de densité des mots-clés.', h1: 'Compteur de mots' },
  lt: { title: 'Žodžių skaičiuotuvas — skaičiuokite žodžius, simbolius ir skaitymo laiką', description: 'Nemokamas internetinis žodžių skaičiuotuvas. Skaičiuokite žodžius, simbolius (su tarpais ir be), sakinius, pastraipas ir įvertinkite skaitymo laiką.', h1: 'Žodžių ir simbolių skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our word counter provides instant real-time statistics as you type or paste text. It counts words, characters (total and without spaces), sentences, paragraphs, and estimates reading time based on an average reading speed of 200 words per minute. The keyword density section highlights your most frequently used words, which is useful for SEO writing and avoiding word repetition.\n\nWord and character counts matter across many contexts: Twitter/X limits posts to 280 characters, LinkedIn allows 3,000, Instagram captions up to 2,200. For SEO, meta descriptions should be 155–160 characters and titles 50–60. Academic essays and submissions often specify word limits (e.g., 1,000–5,000 words). Use this tool to stay within any platform or assignment constraint.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How are words counted?', a: 'Words are counted by splitting the text on whitespace. Any sequence of characters separated by spaces, tabs, or line breaks is counted as one word. Numbers and hyphenated words count as one word each.' },
      { q: 'How is reading time calculated?', a: 'Reading time is estimated at 200 words per minute (wpm), which is close to the average adult reading speed for online content. Academic texts are typically read at 150–200 wpm, while technical content may be 100–150 wpm. Adjust your estimation accordingly.' },
      { q: 'What counts as a sentence?', a: 'Sentences are detected by period (.), exclamation mark (!), and question mark (?) characters. This is a simplified approach — complex punctuation like ellipses or abbreviations may slightly affect the count.' },
      { q: 'What is the keyword density feature?', a: 'The keyword density section shows the most frequently used content words in your text (excluding common stop words like "the", "a", "and"). It is useful for checking keyword frequency in SEO writing and identifying overused words.' },
      { q: 'What is the recommended word count for a blog post?', a: 'For blog posts: 1,500–2,500 words for standard articles, 3,000+ for comprehensive pillar content. For news articles: 300–800 words. Academic essays: 1,000–5,000 words depending on level. Google tends to rank longer, thorough content for informational queries, but quality always matters more than raw length.' },
      { q: 'How many words fit on one A4 page?', a: 'An A4 page in standard format (12pt font, double-spaced, 2.5cm margins) holds approximately 250–300 words. Single-spaced at 12pt fits about 500–600 words. These figures vary with font and line spacing. Academic papers typically require double-spacing, giving roughly 250 words per page.' },
      { q: 'What are the character limits for major social media platforms?', a: 'Twitter/X: 280 characters. LinkedIn post: 3,000 characters. Facebook post: 63,206 characters. Instagram caption: 2,200 characters. Meta description (SEO): 155–160 characters. Page title (SEO): 50–60 characters. SMS: 160 characters per single message.' },
      { q: 'How do I reduce word count without losing meaning?', a: 'Replace wordy phrases: "due to the fact that" → "because", "in order to" → "to", "at the present time" → "now". Remove filler words: "very", "really", "quite", "basically". Cut redundant pairs: "each and every" → "each". Switch passive to active voice — it shortens sentences and adds clarity.' },
      { q: 'What is the character limit for a Google meta description?', a: 'Google typically displays 155–160 characters in search results. Focus on a clear, keyword-rich summary under 155 characters to avoid truncation. Quality and relevance matter more than hitting an exact character count.' },
      { q: 'Does the word counter save or transmit my text?', a: 'No — your text is processed entirely in your browser and is never sent to any server. The counter does not save, store, or transmit your content. Refreshing or closing the page clears the text area completely.' },
    ],
  },
  ru: {
    description: 'Наш счётчик слов мгновенно предоставляет статистику в режиме реального времени при вводе или вставке текста. Он считает слова, символы (всего и без пробелов), предложения, абзацы и оценивает время чтения из расчёта 200 слов в минуту. Раздел плотности ключевых слов показывает наиболее часто встречающиеся слова, что полезно для SEO-текстов и избегания повторений.\n\nКоличество слов и символов важно в самых разных контекстах: Twitter/X ограничивает посты до 280 символов, LinkedIn — до 3000, Instagram — до 2200 символов в подписи. Для SEO мета-описания должны быть 155–160 символов, заголовки — 50–60. Академические работы часто имеют ограничения по словам (1000–5000). Используйте этот инструмент, чтобы соответствовать любым требованиям.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как считаются слова?', a: 'Слова считаются путём разделения текста по пробелам. Любая последовательность символов, разделённая пробелами, табуляцией или переносами строк, считается одним словом. Числа и слова через дефис считаются как одно слово.' },
      { q: 'Как рассчитывается время чтения?', a: 'Время чтения оценивается из расчёта 200 слов в минуту (с/мин) — близко к средней скорости чтения взрослого онлайн-контента. Академические тексты читаются в 150–200 с/мин, технические — 100–150 с/мин.' },
      { q: 'Что считается предложением?', a: 'Предложения определяются по знакам препинания: точка (.), восклицательный (!) и вопросительный (?) знаки. Это упрощённый подход — многоточия и сокращения могут незначительно влиять на счётчик.' },
      { q: 'Для чего нужен анализ ключевых слов?', a: 'Раздел плотности ключевых слов показывает наиболее частые смысловые слова в тексте (исключая стоп-слова: "и", "в", "на" и т.д.). Полезен для SEO-копирайтинга и выявления слов-повторений.' },
      { q: 'Каков рекомендуемый объём статьи или поста в блоге?', a: 'Для постов в блогах: 1500–2500 слов для стандартных статей, 3000+ для «пилларного» контента. Новостные статьи: 300–800 слов. Академические работы: 1000–5000 слов. Google продвигает более длинный, подробный контент, но качество всегда важнее объёма.' },
      { q: 'Сколько слов умещается на странице A4?', a: 'Страница A4 в стандартном формате (шрифт 12pt, двойной интервал, поля 2,5 см) вмещает около 250–300 слов. При одинарном интервале — 500–600 слов. Академические работы обычно требуют двойного интервала — примерно 250 слов на страницу.' },
      { q: 'Каковы ограничения символов в социальных сетях?', a: 'Twitter/X: 280 символов. Пост в LinkedIn: 3000 символов. Пост в Facebook: 63 206 символов. Подпись в Instagram: 2200 символов. Мета-описание (SEO): 155–160 символов. Заголовок страницы (SEO): 50–60 символов. СМС: 160 символов (одно сообщение).' },
      { q: 'Как сократить объём текста, не теряя смысла?', a: 'Замените многословные обороты: «в связи с тем, что» → «потому что», «с целью» → «чтобы». Уберите слова-паразиты: «очень», «буквально», «как бы». Активный залог короче пассивного. Избегайте тавтологий: «каждый и все» → «каждый».' },
      { q: 'Каков оптимальный размер мета-описания для Google?', a: 'Google обычно отображает 155–160 символов в результатах поиска. Сосредоточьтесь на понятном, содержащем ключевые слова описании до 155 символов, чтобы избежать обрезки. Качество и релевантность важнее точного количества символов.' },
      { q: 'Сохраняет ли счётчик слов мой текст?', a: 'Нет — ваш текст обрабатывается полностью в браузере и никогда не отправляется на сервер. Счётчик не сохраняет, не хранит и не передаёт ваш контент. Обновление или закрытие страницы очищает текстовое поле.' },
    ],
  },
  uk: {
    description: 'Наш лічильник слів миттєво надає статистику в режимі реального часу при введенні або вставці тексту. Він рахує слова, символи (всього та без пробілів), речення, абзаци та оцінює час читання з розрахунку 200 слів на хвилину. Розділ частоти ключових слів показує найбільш часто вживані слова, що корисно для SEO-текстів.\n\nКількість слів і символів важлива в різних контекстах: Twitter/X обмежує пости до 280 символів, LinkedIn — до 3000, Instagram — до 2200 символів у підписі. Для SEO мета-описи мають бути 155–160 символів, заголовки — 50–60. Академічні роботи часто мають обмеження за словами. Використовуйте цей інструмент, щоб відповідати будь-яким вимогам.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як рахуються слова?', a: 'Слова рахуються шляхом розділення тексту за пробілами. Будь-яка послідовність символів, розділена пробілами, табуляцією або переносами рядків, вважається одним словом.' },
      { q: 'Як розраховується час читання?', a: 'Час читання оцінюється з розрахунку 200 слів на хвилину — близько до середньої швидкості читання дорослого онлайн-контенту. Академічні тексти читаються зі швидкістю 150–200 сл/хв, технічні — 100–150 сл/хв.' },
      { q: 'Що вважається реченням?', a: 'Речення визначаються за знаками пунктуації: крапка (.), знак оклику (!) та питальний знак (?). Це спрощений підхід — крапки в абревіатурах можуть незначно впливати на лічильник.' },
      { q: 'Для чого потрібен аналіз ключових слів?', a: 'Розділ частоти ключових слів показує найбільш часті смислові слова в тексті (виключаючи стоп-слова). Корисний для SEO-копірайтингу та виявлення слів-повторень.' },
      { q: 'Яким має бути рекомендований обсяг статті або посту в блозі?', a: 'Для постів у блогах: 1500–2500 слів для стандартних статей, 3000+ для «pillar»-контенту. Новинні статті: 300–800 слів. Академічні роботи: 1000–5000 слів. Google просуває більш довгий, детальний контент, але якість завжди важливіша за обсяг.' },
      { q: 'Скільки слів вміщується на сторінці A4?', a: 'Сторінка A4 у стандартному форматі (шрифт 12pt, подвійний інтервал, поля 2,5 см) вміщує близько 250–300 слів. При одинарному інтервалі — 500–600 слів. Академічні роботи зазвичай вимагають подвійного інтервалу — приблизно 250 слів на сторінку.' },
      { q: 'Які обмеження символів у соціальних мережах?', a: 'Twitter/X: 280 символів. Пост у LinkedIn: 3000 символів. Пост у Facebook: 63 206 символів. Підпис в Instagram: 2200 символів. Мета-опис (SEO): 155–160 символів. Заголовок сторінки (SEO): 50–60 символів. СМС: 160 символів (одне повідомлення).' },
      { q: 'Як скоротити обсяг тексту, не втрачаючи змісту?', a: 'Замініть багатослівні звороти: «у зв\'язку з тим, що» → «тому що», «з метою» → «щоб». Прибирайте слова-паразити. Активний стан коротший за пасивний. Уникайте тавтологій.' },
      { q: 'Який оптимальний розмір мета-опису для Google?', a: 'Google зазвичай відображає 155–160 символів у результатах пошуку. Зосередьтеся на чіткому описі до 155 символів із ключовими словами, щоб уникнути обрізки. Якість і релевантність важливіші за точну кількість символів.' },
      { q: 'Чи зберігає лічильник слів мій текст?', a: 'Ні — ваш текст обробляється повністю у браузері і ніколи не надсилається на сервер. Лічильник не зберігає і не передає ваш контент. Оновлення або закриття сторінки очищає текстове поле.' },
    ],
  },
  fr: {
    description: 'Notre compteur de mots fournit des statistiques en temps réel au fur et à mesure de la saisie ou du collage de texte. Il compte les mots, caractères (total et sans espaces), phrases, paragraphes et estime le temps de lecture à 200 mots par minute. La section densité des mots-clés met en évidence les mots les plus fréquents, utile pour la rédaction SEO et éviter les répétitions.\n\nLe nombre de mots et de caractères est important dans de nombreux contextes : Twitter/X limite les publications à 280 caractères, LinkedIn à 3 000, Instagram à 2 200 caractères en légende. Pour le SEO, les méta-descriptions doivent faire 155–160 caractères et les titres 50–60. Les travaux académiques ont souvent des limites de mots. Utilisez cet outil pour respecter toutes ces contraintes.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment les mots sont-ils comptés ?', a: 'Les mots sont comptés en divisant le texte sur les espaces. Toute séquence de caractères séparée par des espaces, tabulations ou sauts de ligne est comptée comme un mot. Les nombres et les mots avec tiret comptent comme un seul mot.' },
      { q: 'Comment le temps de lecture est-il calculé ?', a: 'Le temps de lecture est estimé à 200 mots par minute (mpm), proche de la vitesse de lecture moyenne pour le contenu en ligne. Les textes académiques se lisent généralement à 150–200 mpm, les contenus techniques à 100–150 mpm.' },
      { q: 'Qu\'est-ce qui compte comme une phrase ?', a: 'Les phrases sont détectées par le point (.), le point d\'exclamation (!) et le point d\'interrogation (?). C\'est une approche simplifiée — les points de suspension et les abréviations peuvent légèrement affecter le comptage.' },
      { q: 'À quoi sert la densité des mots-clés ?', a: 'La section densité des mots-clés montre les mots de contenu les plus fréquents (hors mots vides comme "le", "la", "et"). Utile pour vérifier la fréquence des mots-clés en rédaction SEO et identifier les répétitions.' },
      { q: 'Quel est le nombre de mots recommandé pour un article de blog ?', a: 'Pour un blog : 1 500–2 500 mots pour les articles standards, 3 000+ pour le contenu pilier. Pour les actualités : 300–800 mots. Travaux académiques : 1 000–5 000 mots. Google favorise les contenus longs et approfondis pour les requêtes informationnelles, mais la qualité prime toujours.' },
      { q: 'Combien de mots tiennent sur une page A4 ?', a: 'Une page A4 en format standard (police 12pt, double interligne, marges 2,5 cm) contient environ 250–300 mots. En simple interligne à 12pt, environ 500–600 mots. Les travaux académiques exigent généralement un double interligne, soit environ 250 mots par page.' },
      { q: 'Quelles sont les limites de caractères des principales plateformes ?', a: 'Twitter/X : 280 caractères. LinkedIn : 3 000 caractères. Facebook : 63 206 caractères. Instagram : 2 200 caractères. Méta-description SEO : 155–160 caractères. Titre de page SEO : 50–60 caractères. SMS : 160 caractères par message.' },
      { q: 'Comment réduire le nombre de mots sans perdre le sens ?', a: 'Remplacez les formules longues : "en raison du fait que" → "parce que", "afin de" → "pour". Supprimez les mots de remplissage : "vraiment", "assez", "en quelque sorte". La voix active est plus courte que la voix passive. Évitez les pléonasmes.' },
      { q: 'Quelle est la limite optimale pour une méta-description Google ?', a: 'Google affiche généralement 155–160 caractères dans les résultats. Rédigez un résumé clair et riche en mots-clés de moins de 155 caractères pour éviter la troncature. La qualité et la pertinence comptent plus que le nombre exact de caractères.' },
      { q: 'Le compteur de mots sauvegarde-t-il mon texte ?', a: 'Non — votre texte est traité entièrement dans votre navigateur et n\'est jamais envoyé à un serveur. Le compteur ne sauvegarde, ne stocke ni ne transmet votre contenu. Actualiser ou fermer la page efface complètement la zone de texte.' },
    ],
  },
  lt: {
    description: 'Mūsų žodžių skaičiuotuvas teikia momentinę statistiką realiuoju laiku, kai rašote ar įklijuojate tekstą. Jis skaičiuoja žodžius, simbolius (iš viso ir be tarpų), sakinius, pastraipas ir įvertina skaitymo laiką pagal 200 žodžių per minutę greitį. Raktinių žodžių dažnio skyrius parodo dažniausiai vartojamus žodžius, naudingas SEO rašymui.\n\nŽodžių ir simbolių skaičius svarbus įvairiuose kontekstuose: Twitter/X riboja įrašus iki 280 simbolių, LinkedIn — iki 3000, Instagram antraštės — iki 2200 simbolių. SEO meta aprašymams reikia 155–160 simbolių, antraštėms — 50–60. Akademiniams darbams dažnai nustatomi žodžių limitai. Naudokite šį įrankį bet kokiems reikalavimams atitikti.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip skaičiuojami žodžiai?', a: 'Žodžiai skaičiuojami dalijant tekstą pagal tarpus. Bet kokia simbolių seka, atskirta tarpais, tabuliavimais ar eilučių pertraukomis, skaičiuojama kaip vienas žodis. Skaičiai ir žodžiai su brūkšneliu skaičiuojami kaip vienas žodis.' },
      { q: 'Kaip apskaičiuojamas skaitymo laikas?', a: 'Skaitymo laikas apskaičiuojamas pagal 200 žodžių per minutę greitį, kuris artimas vidutiniam suaugusiojo skaitymo greičiui internete. Akademiniai tekstai skaitomi 150–200 ž/min greičiu, techniniai — 100–150 ž/min.' },
      { q: 'Kas laikoma sakiniu?', a: 'Sakiniai aptinkami pagal taškus (.), šauktukai (!) ir klaustukai (?). Tai supaprastintas metodas — daugtaškiai ir santrumpos gali šiek tiek paveikti skaičiavimą.' },
      { q: 'Kam skirta raktinių žodžių dažnio funkcija?', a: 'Raktinių žodžių dažnio skyrius rodo dažniausiai vartojamus turininius žodžius (išskyrus praleidžiamus žodžius). Tai naudinga SEO rašymui ir pakartotinių žodžių nustatymui.' },
      { q: 'Koks rekomenduojamas žodžių skaičius tinklaraščio įrašui?', a: 'Tinklaraščiams: 1500–2500 žodžių standartiniams straipsniams, 3000+ pagrindiniams turinio straipsniams. Naujienų straipsniams: 300–800 žodžių. Akademiniams darbams: 1000–5000 žodžių. Google skatina ilgesnį, išsamesnį turinį informatyviems užklausimams, tačiau kokybė visada svarbiau už kiekį.' },
      { q: 'Kiek žodžių telpa viename A4 puslapyje?', a: 'A4 puslapis standartiniu formatu (12pt šriftas, dvigubas tarpas, 2,5 cm paraštės) talpina apie 250–300 žodžių. Viengubas tarpas 12pt — apie 500–600 žodžių. Akademiniai darbai paprastai reikalauja dvigubo tarpo — apie 250 žodžių puslapyje.' },
      { q: 'Kokie simbolių limitai pagrindinėse socialinių tinklų platformose?', a: 'Twitter/X: 280 simbolių. LinkedIn įrašas: 3000 simbolių. Facebook įrašas: 63 206 simboliai. Instagram antraštė: 2200 simbolių. Meta aprašymas (SEO): 155–160 simbolių. Puslapio pavadinimas (SEO): 50–60 simbolių. SMS: 160 simbolių (vienas pranešimas).' },
      { q: 'Kaip sumažinti žodžių skaičių neprarandant prasmės?', a: 'Pakeiskite ilgas frazes trumpesnėmis: „dėl to, kad" → „nes", „siekiant" → „kad". Pašalinkite nereikalingus žodžius: „labai", „iš tikrųjų", „tiesiog". Aktyvioji rūšis trumpesnė už pasyviąją. Venkite pleonizmų.' },
      { q: 'Koks optimalus Google meta aprašymo ilgis?', a: 'Google paprastai rodo 155–160 simbolių paieškos rezultatuose. Parašykite aiškų, raktiniais žodžiais turtingą aprašymą iki 155 simbolių, kad išvengtumėte trumpinimo. Kokybė ir aktualumas svarbiau nei tikslus simbolių skaičius.' },
      { q: 'Ar žodžių skaičiuotuvas išsaugo mano tekstą?', a: 'Ne — jūsų tekstas apdorojamas tik jūsų naršyklėje ir niekada nesiunčiamas į serverį. Skaičiuotuvas neišsaugo, nesaugo ir neperduoda jūsų turinio. Atnaujinus ar uždarius puslapį teksto laukas visiškai išvalomas.' },
    ],
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: buildAlternates(locale, '/tools/word-counter'),
  };
}

export default async function WordCounterPage({ params }: Props) {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const c = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: m.h1,
    description: m.description,
    url: `https://utilixi.com/${locale}/tools/word-counter`,
    applicationCategory: 'UtilitiesApplication',
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
        <WordCounter locale={locale} />
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

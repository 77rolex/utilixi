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
    description: 'Our word counter provides instant real-time statistics as you type or paste text. It counts words, characters (total and without spaces), sentences, paragraphs, and estimates reading time based on an average reading speed of 200 words per minute. The keyword density section highlights your most frequently used words, which is useful for SEO writing and avoiding word repetition.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How are words counted?', a: 'Words are counted by splitting the text on whitespace. Any sequence of characters separated by spaces, tabs, or line breaks is counted as one word. Numbers and hyphenated words count as one word each.' },
      { q: 'How is reading time calculated?', a: 'Reading time is estimated at 200 words per minute (wpm), which is close to the average adult reading speed for online content. Academic texts are typically read at 150–200 wpm, while technical content may be 100–150 wpm. Adjust your estimation accordingly.' },
      { q: 'What counts as a sentence?', a: 'Sentences are detected by period (.), exclamation mark (!), and question mark (?) characters. This is a simplified approach — complex punctuation like ellipses or abbreviations may slightly affect the count.' },
      { q: 'What is the keyword density feature?', a: 'The keyword density section shows the most frequently used content words in your text (excluding common stop words like "the", "a", "and"). It is useful for checking keyword frequency in SEO writing and identifying overused words.' },
    ],
  },
  ru: {
    description: 'Наш счётчик слов мгновенно предоставляет статистику в режиме реального времени при вводе или вставке текста. Он считает слова, символы (всего и без пробелов), предложения, абзацы и оценивает время чтения из расчёта 200 слов в минуту. Раздел плотности ключевых слов показывает наиболее часто встречающиеся слова, что полезно для SEO-текстов и избегания повторений.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как считаются слова?', a: 'Слова считаются путём разделения текста по пробелам. Любая последовательность символов, разделённая пробелами, табуляцией или переносами строк, считается одним словом. Числа и слова через дефис считаются как одно слово.' },
      { q: 'Как рассчитывается время чтения?', a: 'Время чтения оценивается из расчёта 200 слов в минуту (с/мин) — близко к средней скорости чтения взрослого онлайн-контента. Академические тексты читаются в 150–200 с/мин, технические — 100–150 с/мин.' },
      { q: 'Что считается предложением?', a: 'Предложения определяются по знакам препинания: точка (.), восклицательный (!) и вопросительный (?) знаки. Это упрощённый подход — многоточия и сокращения могут незначительно влиять на счётчик.' },
      { q: 'Для чего нужен анализ ключевых слов?', a: 'Раздел плотности ключевых слов показывает наиболее частые смысловые слова в тексте (исключая стоп-слова: "и", "в", "на" и т.д.). Полезен для SEO-копирайтинга и выявления слов-повторений.' },
    ],
  },
  uk: {
    description: 'Наш лічильник слів миттєво надає статистику в режимі реального часу при введенні або вставці тексту. Він рахує слова, символи (всього та без пробілів), речення, абзаци та оцінює час читання з розрахунку 200 слів на хвилину. Розділ частоти ключових слів показує найбільш часто вживані слова.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як рахуються слова?', a: 'Слова рахуються шляхом розділення тексту за пробілами. Будь-яка послідовність символів, розділена пробілами, табуляцією або переносами рядків, вважається одним словом.' },
      { q: 'Як розраховується час читання?', a: 'Час читання оцінюється з розрахунку 200 слів на хвилину — близько до середньої швидкості читання дорослого онлайн-контенту. Академічні тексти читаються зі швидкістю 150–200 сл/хв, технічні — 100–150 сл/хв.' },
      { q: 'Що вважається реченням?', a: 'Речення визначаються за знаками пунктуації: крапка (.), знак оклику (!) та питальний знак (?). Це спрощений підхід — крапки в абревіатурах можуть незначно впливати на лічильник.' },
      { q: 'Для чого потрібен аналіз ключових слів?', a: 'Розділ частоти ключових слів показує найбільш часті смислові слова в тексті (виключаючи стоп-слова). Корисний для SEO-копірайтингу та виявлення слів-повторень.' },
    ],
  },
  fr: {
    description: 'Notre compteur de mots fournit des statistiques en temps réel au fur et à mesure de la saisie ou du collage de texte. Il compte les mots, caractères (total et sans espaces), phrases, paragraphes et estime le temps de lecture à 200 mots par minute. La section densité des mots-clés met en évidence les mots les plus fréquents, utile pour la rédaction SEO.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment les mots sont-ils comptés ?', a: 'Les mots sont comptés en divisant le texte sur les espaces. Toute séquence de caractères séparée par des espaces, tabulations ou sauts de ligne est comptée comme un mot. Les nombres et les mots avec tiret comptent comme un seul mot.' },
      { q: 'Comment le temps de lecture est-il calculé ?', a: 'Le temps de lecture est estimé à 200 mots par minute (mpm), proche de la vitesse de lecture moyenne pour le contenu en ligne. Les textes académiques se lisent généralement à 150–200 mpm, les contenus techniques à 100–150 mpm.' },
      { q: 'Qu\'est-ce qui compte comme une phrase ?', a: 'Les phrases sont détectées par le point (.), le point d\'exclamation (!) et le point d\'interrogation (?). C\'est une approche simplifiée — les points de suspension et les abréviations peuvent légèrement affecter le comptage.' },
      { q: 'À quoi sert la densité des mots-clés ?', a: 'La section densité des mots-clés montre les mots de contenu les plus fréquents (hors mots vides comme "le", "la", "et"). Utile pour vérifier la fréquence des mots-clés en rédaction SEO et identifier les répétitions.' },
    ],
  },
  lt: {
    description: 'Mūsų žodžių skaičiuotuvas teikia momentinę statistiką realiuoju laiku, kai rašote ar įklijuojate tekstą. Jis skaičiuoja žodžius, simbolius (iš viso ir be tarpų), sakinius, pastraipas ir įvertina skaitymo laiką pagal 200 žodžių per minutę greitį. Raktinių žodžių dažnio skyrius parodo dažniausiai vartojamus žodžius.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip skaičiuojami žodžiai?', a: 'Žodžiai skaičiuojami dalijant tekstą pagal tarpus. Bet kokia simbolių seka, atskirta tarpais, tabuliavimais ar eilučių pertraukomis, skaičiuojama kaip vienas žodis. Skaičiai ir žodžiai su brūkšneliu skaičiuojami kaip vienas žodis.' },
      { q: 'Kaip apskaičiuojamas skaitymo laikas?', a: 'Skaitymo laikas apskaičiuojamas pagal 200 žodžių per minutę greitį, kuris artimas vidutiniam suaugusiojo skaitymo greičiui internete. Akademiniai tekstai skaitomi 150–200 ž/min greičiu, techniniai — 100–150 ž/min.' },
      { q: 'Kas laikoma sakiniu?', a: 'Sakiniai aptinkami pagal taškus (.), šauktukai (!) ir klaustukai (?). Tai supaprastintas metodas — daugtaškiai ir santrumpos gali šiek tiek paveikti skaičiavimą.' },
      { q: 'Kam skirta raktinių žodžių dažnio funkcija?', a: 'Raktinių žodžių dažnio skyrius rodo dažniausiai vartojamus turininius žodžius (išskyrus praleidžiamus žodžius). Tai naudinga SEO rašymui ir pakartotinių žodžių nustatymui.' },
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

  return (
    <PageLayout sidebar={<AdSidebar locale={locale} />}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className={styles.page__title}>{m.h1}</h1>
      <WordCounter locale={locale} />
      <AdInline locale={locale} />
      <div className={styles.page__content}>
        <p className={styles.page__description}>{c.description}</p>
        <RelatedTools locale={locale} tools={related} />
        <div className={styles.faq}>
          <h2 className={styles.faq__title}>{c.faqTitle}</h2>
          <div className={styles.faq__list}>
            {c.faqs.map((f, i) => (
              <div key={i} className={styles.faq__item}>
                <p className={styles.faq__question}>{f.q}</p>
                <p className={styles.faq__answer}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import CountdownTimer from './CountdownTimer';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/date-diff', label: 'Date Difference Calculator' }, { href: '/calculator/age', label: 'Age Calculator' }],
  ru: [{ href: '/calculator/date-diff', label: 'Калькулятор разницы дат' }, { href: '/calculator/age', label: 'Калькулятор возраста' }],
  uk: [{ href: '/calculator/date-diff', label: 'Калькулятор різниці дат' }, { href: '/calculator/age', label: 'Калькулятор віку' }],
  fr: [{ href: '/calculator/date-diff', label: 'Calculatrice de différence de dates' }, { href: '/calculator/age', label: 'Calculatrice d\'âge' }],
  lt: [{ href: '/calculator/date-diff', label: 'Datų skirtumo skaičiuotuvas' }, { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Countdown Timer — Count Down to Any Date', description: 'Free online countdown timer. Count down to any date and time — New Year, birthday, holiday, or custom event. Shows days, hours, minutes and seconds.', h1: 'Countdown Timer' },
  ru: { title: 'Таймер обратного отсчёта — отсчёт до любой даты', description: 'Бесплатный онлайн-таймер обратного отсчёта. Отсчитывайте время до любой даты: Нового года, дня рождения, праздника или своего события. Показывает дни, часы, минуты и секунды.', h1: 'Таймер обратного отсчёта' },
  uk: { title: 'Таймер зворотного відліку — відлік до будь-якої дати', description: 'Безкоштовний онлайн-таймер зворотного відліку. Відлічуйте час до будь-якої дати: Нового року, дня народження, свята або власної події. Показує дні, години, хвилини та секунди.', h1: 'Таймер зворотного відліку' },
  fr: { title: 'Minuteur de compte à rebours — décompte jusqu\'à n\'importe quelle date', description: 'Minuteur de compte à rebours gratuit en ligne. Comptez à rebours jusqu\'à n\'importe quelle date — Nouvel An, anniversaire, fête ou événement personnalisé. Affiche jours, heures, minutes et secondes.', h1: 'Minuteur de compte à rebours' },
  lt: { title: 'Atgalinio skaičiavimo laikmatis — skaičiuokite iki bet kokios datos', description: 'Nemokamas atgalinio skaičiavimo laikmatis internete. Skaičiuokite atgal iki bet kokios datos — Naujųjų metų, gimtadienio, šventės ar renginio. Rodo dienas, valandas, minutes ir sekundes.', h1: 'Atgalinio skaičiavimo laikmatis' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Select a target date (and optionally a specific time), then press Start. The timer counts down in real time, showing days, hours, minutes, and seconds remaining. Use the quick preset buttons to instantly set a countdown to popular holidays. When the time is up, the timer shows a completion message. Press Reset to start a new countdown.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How does the countdown timer work?', a: 'Enter a future date and optional time, then click Start. The timer calculates the difference between now and your target moment and updates every second. It runs entirely in your browser — no server is involved.' },
      { q: 'Can I count down to a specific time, not just a date?', a: 'Yes. Use the time field to set a specific hour and minute for your target. For example, you can count down to midnight on New Year\'s Eve by setting the date to January 1 and the time to 00:00.' },
      { q: 'Does the timer keep running if I switch tabs?', a: 'The timer uses JavaScript\'s setInterval which continues running in the background in most browsers. However, some browsers throttle inactive tabs, so the display may update less frequently. The final time calculation is always based on the actual system clock, not tick counts.' },
      { q: 'What are the quick preset buttons?', a: 'The preset buttons (New Year, Christmas, Halloween, Valentine\'s Day) automatically set the target date to the next upcoming occurrence of that holiday. If the holiday has already passed this year, it sets the date to next year.' },
      { q: 'What happens when the countdown reaches zero?', a: 'When the target time is reached, the timer stops and displays a "Time is up!" message. Press Reset to clear everything and start a new countdown.' },
    ],
  },
  ru: {
    description: 'Выберите целевую дату (и при необходимости время), затем нажмите «Старт». Таймер отсчитывает время в реальном времени, показывая оставшиеся дни, часы, минуты и секунды. Используйте кнопки быстрых пресетов для популярных праздников. Когда время истекает, таймер показывает сообщение об окончании. Нажмите «Сброс» для нового отсчёта.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как работает таймер обратного отсчёта?', a: 'Введите будущую дату и при необходимости время, затем нажмите «Старт». Таймер вычисляет разницу между текущим моментом и целевым и обновляется каждую секунду. Работает полностью в браузере.' },
      { q: 'Можно ли отсчитывать до конкретного времени?', a: 'Да. Используйте поле времени для указания нужного часа и минуты. Например, для отсчёта до Нового года укажите дату 1 января и время 00:00.' },
      { q: 'Продолжает ли таймер работать при переключении вкладок?', a: 'Таймер использует setInterval JavaScript, который продолжает работать в фоновом режиме. Однако некоторые браузеры замедляют неактивные вкладки. Финальный расчёт всегда основан на реальных системных часах.' },
      { q: 'Что делают кнопки быстрых пресетов?', a: 'Кнопки (Новый год, Рождество, Хэллоуин, День влюблённых) автоматически устанавливают дату ближайшего предстоящего праздника. Если праздник в этом году уже прошёл — дата переносится на следующий год.' },
      { q: 'Что происходит, когда таймер достигает нуля?', a: 'Когда время истекает, таймер останавливается и показывает сообщение «Время вышло!». Нажмите «Сброс» для нового отсчёта.' },
    ],
  },
  uk: {
    description: 'Оберіть цільову дату (і за потреби час), потім натисніть «Старт». Таймер відлічує час у реальному часі, показуючи дні, години, хвилини та секунди. Використовуйте кнопки швидких пресетів для популярних свят. Коли час закінчується, таймер показує повідомлення. Натисніть «Скинути» для нового відліку.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як працює таймер зворотного відліку?', a: 'Введіть майбутню дату і за потреби час, потім натисніть «Старт». Таймер обчислює різницю між поточним моментом і цільовим та оновлюється щосекунди. Працює повністю в браузері.' },
      { q: 'Чи можна відлічувати до конкретного часу?', a: 'Так. Використовуйте поле часу для вказання потрібної години та хвилини. Наприклад, для відліку до Нового року вкажіть дату 1 січня і час 00:00.' },
      { q: 'Чи продовжує таймер працювати при перемиканні вкладок?', a: 'Таймер використовує setInterval JavaScript, який продовжує працювати у фоновому режимі. Деякі браузери сповільнюють неактивні вкладки, але фінальний розрахунок завжди базується на системних годинниках.' },
      { q: 'Що роблять кнопки швидких пресетів?', a: 'Кнопки автоматично встановлюють дату найближчого майбутнього свята. Якщо свято в цьому році вже минуло — дата переноситься на наступний рік.' },
      { q: 'Що відбувається, коли таймер досягає нуля?', a: 'Коли час закінчується, таймер зупиняється і показує повідомлення «Час минув!». Натисніть «Скинути» для нового відліку.' },
    ],
  },
  fr: {
    description: 'Sélectionnez une date cible (et optionnellement une heure), puis appuyez sur Démarrer. Le minuteur décompte en temps réel, affichant les jours, heures, minutes et secondes restants. Utilisez les boutons de raccourci pour les fêtes populaires. Quand le temps est écoulé, un message s\'affiche. Appuyez sur Réinitialiser pour un nouveau compte à rebours.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment fonctionne le minuteur de compte à rebours ?', a: 'Entrez une date future et une heure optionnelle, puis cliquez sur Démarrer. Le minuteur calcule la différence entre maintenant et votre objectif et se met à jour chaque seconde. Il fonctionne entièrement dans votre navigateur.' },
      { q: 'Puis-je compter jusqu\'à une heure précise ?', a: 'Oui. Utilisez le champ heure pour définir l\'heure et la minute cibles. Par exemple, pour compter jusqu\'au Nouvel An à minuit, réglez la date au 1er janvier et l\'heure à 00:00.' },
      { q: 'Le minuteur continue-t-il si je change d\'onglet ?', a: 'Le minuteur utilise setInterval de JavaScript qui continue en arrière-plan dans la plupart des navigateurs. Certains navigateurs peuvent ralentir les onglets inactifs, mais le calcul final est toujours basé sur l\'horloge système.' },
      { q: 'Que font les boutons de raccourcis ?', a: 'Les boutons (Nouvel An, Noël, Halloween, Saint-Valentin) définissent automatiquement la date de la prochaine occurrence de cette fête. Si la fête est passée cette année, la date est fixée à l\'année prochaine.' },
      { q: 'Que se passe-t-il quand le compte à rebours atteint zéro ?', a: 'Quand le temps est écoulé, le minuteur s\'arrête et affiche « Temps écoulé ! ». Appuyez sur Réinitialiser pour effacer tout et démarrer un nouveau compte à rebours.' },
    ],
  },
  lt: {
    description: 'Pasirinkite tikslinę datą (ir pasirinktinai laiką), tada paspauskite Pradėti. Laikmatis skaičiuoja atgal realiuoju laiku, rodydamas likusias dienas, valandas, minutes ir sekundes. Naudokite greito pasirinkimo mygtukus populiarioms šventėms. Kai laikas baigiasi, rodomas pranešimas. Paspauskite Atstatyti naujam atgaliniam skaičiavimui.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip veikia atgalinio skaičiavimo laikmatis?', a: 'Įveskite būsimą datą ir pasirinktinai laiką, tada spustelėkite Pradėti. Laikmatis apskaičiuoja skirtumą tarp dabar ir jūsų tikslo ir atnaujinamas kas sekundę. Veikia tik naršyklėje.' },
      { q: 'Ar galima skaičiuoti iki konkretaus laiko?', a: 'Taip. Naudokite laiko lauką norimos valandos ir minutės nustatymui. Pavyzdžiui, Naujųjų metų atgaliniam skaičiavimui iki vidurnakčio nustatykite sausio 1 d. ir laiką 00:00.' },
      { q: 'Ar laikmatis veikia perjungus skirtukus?', a: 'Laikmatis naudoja JavaScript setInterval, kuris veikia fone daugelyje naršyklių. Kai kurios naršyklės sulėtina neaktyvius skirtukus, tačiau galutinis skaičiavimas visada grindžiamas sistemos laikrodžiu.' },
      { q: 'Ką daro greito pasirinkimo mygtukai?', a: 'Mygtukai (Naujieji metai, Kalėdos, Helovinas, Valentino diena) automatiškai nustato artimiausios šventės datą. Jei šventė šiais metais jau praėjo, data perkeliama į kitų metų.' },
      { q: 'Kas atsitinka, kai atgalinis skaičiavimas pasiekia nulį?', a: 'Kai laikas baigiasi, laikmatis sustoja ir rodo pranešimą „Laikas baigėsi!". Paspauskite Atstatyti, kad išvalytumėte viską ir pradėtumėte naują atgalinį skaičiavimą.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const alternates: Record<string, string> = {};
  routing.locales.forEach((l) => { alternates[l] = `https://utilixi.com/${l}/tools/countdown`; });
  return { title: meta.title, description: meta.description, alternates: { languages: alternates } };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CountdownPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://utilixi.com/${locale}/tools/countdown`,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <CountdownTimer locale={locale} />
        <div className={styles.page__content}>
          <p className={styles.page__description}>{content.description}</p>
          <AdInline locale={locale} />
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

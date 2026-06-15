import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import CountdownTimer from './CountdownTimer';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/date-diff', label: 'Date Difference Calculator' }, { href: '/calculator/age', label: 'Age Calculator' }, { href: '/tools/word-counter', label: 'Word Counter' }, { href: '/converter/timezone', label: 'Timezone Converter' }, { href: '/tools/password-generator', label: 'Password Generator' }],
  ru: [{ href: '/calculator/date-diff', label: 'Калькулятор разницы дат' }, { href: '/calculator/age', label: 'Калькулятор возраста' }, { href: '/tools/word-counter', label: 'Счётчик слов' }, { href: '/converter/timezone', label: 'Конвертер часовых поясов' }, { href: '/tools/password-generator', label: 'Генератор паролей' }],
  uk: [{ href: '/calculator/date-diff', label: 'Калькулятор різниці дат' }, { href: '/calculator/age', label: 'Калькулятор віку' }, { href: '/tools/word-counter', label: 'Лічильник слів' }, { href: '/converter/timezone', label: 'Конвертер часових поясів' }, { href: '/tools/password-generator', label: 'Генератор паролів' }],
  fr: [{ href: '/calculator/date-diff', label: 'Calculatrice de différence de dates' }, { href: '/calculator/age', label: 'Calculatrice d\'âge' }, { href: '/tools/word-counter', label: 'Compteur de mots' }, { href: '/converter/timezone', label: 'Convertisseur de fuseaux horaires' }, { href: '/tools/password-generator', label: 'Générateur de mot de passe' }],
  lt: [{ href: '/calculator/date-diff', label: 'Datų skirtumo skaičiuotuvas' }, { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' }, { href: '/tools/word-counter', label: 'Žodžių skaitiklis' }, { href: '/converter/timezone', label: 'Laiko juostų keitiklis' }, { href: '/tools/password-generator', label: 'Slaptažodžių generatorius' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Countdown Timer — Count Down to Any Date', description: 'Free online countdown timer. Count down to any date and time — New Year, birthday, holiday, or custom event. Shows days, hours, minutes and seconds.', h1: 'Countdown Timer', subtitle: 'Set a target date and watch the real-time countdown — perfect for events, deadlines, and holidays.' },
  ru: { title: 'Таймер обратного отсчёта — отсчёт до любой даты', description: 'Бесплатный онлайн-таймер обратного отсчёта. Отсчитывайте время до любой даты: Нового года, дня рождения, праздника или своего события. Показывает дни, часы, минуты и секунды.', h1: 'Таймер обратного отсчёта', subtitle: 'Укажите целевую дату и наблюдайте отсчёт в реальном времени — для событий, дедлайнов и праздников.' },
  uk: { title: 'Таймер зворотного відліку — відлік до будь-якої дати', description: 'Безкоштовний онлайн-таймер зворотного відліку. Відлічуйте час до будь-якої дати: Нового року, дня народження, свята або власної події. Показує дні, години, хвилини та секунди.', h1: 'Таймер зворотного відліку', subtitle: 'Вкажіть цільову дату і спостерігайте відлік у реальному часі — для подій, дедлайнів і свят.' },
  fr: { title: 'Minuteur de compte à rebours — décompte jusqu\'à n\'importe quelle date', description: 'Minuteur de compte à rebours gratuit en ligne. Comptez à rebours jusqu\'à n\'importe quelle date — Nouvel An, anniversaire, fête ou événement personnalisé. Affiche jours, heures, minutes et secondes.', h1: 'Minuteur de compte à rebours', subtitle: 'Définissez une date cible et regardez le décompte en temps réel — parfait pour les événements, délais et fêtes.' },
  lt: { title: 'Atgalinio skaičiavimo laikmatis — skaičiuokite iki bet kokios datos', description: 'Nemokamas atgalinio skaičiavimo laikmatis internete. Skaičiuokite atgal iki bet kokios datos — Naujųjų metų, gimtadienio, šventės ar renginio. Rodo dienas, valandas, minutes ir sekundes.', h1: 'Atgalinio skaičiavimo laikmatis', subtitle: 'Nustatykite tikslinę datą ir stebėkite atgalinį skaičiavimą realiuoju laiku — puikiai tinka renginiams, terminams ir šventėms.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Select a target date (and optionally a specific time), then press Start. The timer counts down in real time, showing days, hours, minutes, and seconds remaining. Use the quick preset buttons to instantly set a countdown to popular holidays. When the time is up, the timer shows a completion message. Press Reset to start a new countdown.\n\nCountdown timers are useful for project deadlines, event planning, travel departures, and personal milestones. Whether you are counting down to a product launch, a marathon race, a wedding date, or simply the end of the workday, this tool gives you a clear, live view of the time remaining.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How does the countdown timer work?', a: 'Enter a future date and optional time, then click Start. The timer calculates the difference between now and your target moment and updates every second. It runs entirely in your browser — no server is involved.' },
      { q: 'Can I count down to a specific time, not just a date?', a: 'Yes. Use the time field to set a specific hour and minute for your target. For example, you can count down to midnight on New Year\'s Eve by setting the date to January 1 and the time to 00:00.' },
      { q: 'Does the timer keep running if I switch tabs?', a: 'The timer uses JavaScript\'s setInterval which continues running in the background in most browsers. However, some browsers throttle inactive tabs, so the display may update less frequently. The final time calculation is always based on the actual system clock, not tick counts.' },
      { q: 'What are the quick preset buttons?', a: 'The preset buttons (New Year, Christmas, Halloween, Valentine\'s Day) automatically set the target date to the next upcoming occurrence of that holiday. If the holiday has already passed this year, it sets the date to next year.' },
      { q: 'What happens when the countdown reaches zero?', a: 'When the target time is reached, the timer stops and displays a "Time is up!" message. Press Reset to clear everything and start a new countdown.' },
      { q: 'Can I count down to a past date?', a: 'No — the countdown timer only works for future dates. If you enter a date that has already passed, the timer will show "Time is up!" immediately. To calculate time elapsed since a past event, use the Date Difference Calculator instead.' },
      { q: 'Does the timer persist if I close the browser?', a: 'No — the timer does not save state between sessions. Closing or refreshing the browser tab resets the timer. To set a persistent reminder, use your device\'s native clock or calendar app rather than this browser-based tool.' },
      { q: 'Can I share a countdown with others?', a: 'This tool does not generate a shareable URL with a countdown embedded. To share a countdown, take a screenshot of the running timer or consider using a dedicated countdown app that supports shareable links.' },
      { q: 'How do I set a countdown to exactly midnight tonight?', a: 'Select today\'s date and set the time to 23:59:59, or select tomorrow\'s date with time 00:00:00. For a New Year countdown, use the "New Year" preset which automatically targets January 1 at midnight.' },
      { q: 'Why does the display lag slightly after switching back to this tab?', a: 'JavaScript timers are throttled by most browsers when a tab is inactive to save battery. The display may show a second or two behind. However, the value always self-corrects the moment you return to the tab — the shown time is re-derived from the actual system clock.' },
    ],
  },
  ru: {
    description: 'Выберите целевую дату (и при необходимости время), затем нажмите «Старт». Таймер отсчитывает время в реальном времени, показывая оставшиеся дни, часы, минуты и секунды. Используйте кнопки быстрых пресетов для популярных праздников. Когда время истекает, таймер показывает сообщение об окончании. Нажмите «Сброс» для нового отсчёта.\n\nТаймеры обратного отсчёта полезны для планирования дедлайнов, мероприятий, отпусков и личных достижений. Готовитесь ли вы к запуску продукта, марафону, свадьбе или просто к концу рабочего дня — этот инструмент даёт чёткое представление об оставшемся времени.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как работает таймер обратного отсчёта?', a: 'Введите будущую дату и при необходимости время, затем нажмите «Старт». Таймер вычисляет разницу между текущим моментом и целевым и обновляется каждую секунду. Работает полностью в браузере.' },
      { q: 'Можно ли отсчитывать до конкретного времени?', a: 'Да. Используйте поле времени для указания нужного часа и минуты. Например, для отсчёта до Нового года укажите дату 1 января и время 00:00.' },
      { q: 'Продолжает ли таймер работать при переключении вкладок?', a: 'Таймер использует setInterval JavaScript, который продолжает работать в фоновом режиме. Однако некоторые браузеры замедляют неактивные вкладки. Финальный расчёт всегда основан на реальных системных часах.' },
      { q: 'Что делают кнопки быстрых пресетов?', a: 'Кнопки (Новый год, Рождество, Хэллоуин, День влюблённых) автоматически устанавливают дату ближайшего предстоящего праздника. Если праздник в этом году уже прошёл — дата переносится на следующий год.' },
      { q: 'Что происходит, когда таймер достигает нуля?', a: 'Когда время истекает, таймер останавливается и показывает сообщение «Время вышло!». Нажмите «Сброс» для нового отсчёта.' },
      { q: 'Можно ли отсчитывать прошедшую дату?', a: 'Нет — таймер работает только для будущих дат. Если указать уже прошедшую дату, таймер сразу покажет «Время вышло!». Для расчёта времени, прошедшего с определённого события, используйте калькулятор разницы дат.' },
      { q: 'Сохраняется ли таймер при закрытии браузера?', a: 'Нет — таймер не сохраняет состояние между сессиями. Закрытие или обновление вкладки сбрасывает таймер. Для постоянного напоминания используйте нативные приложения часов или календаря на своём устройстве.' },
      { q: 'Можно ли поделиться таймером с другими?', a: 'Этот инструмент не генерирует ссылку с встроенным таймером. Чтобы поделиться, сделайте скриншот работающего таймера или используйте специальные приложения для обратного отсчёта с поддержкой ссылок.' },
      { q: 'Как установить таймер ровно до полуночи?', a: 'Выберите сегодняшнюю дату и установите время 23:59:59, или выберите завтрашнюю дату с временем 00:00:00. Для новогоднего отсчёта используйте кнопку «Новый год», которая автоматически устанавливает 1 января в полночь.' },
      { q: 'Почему показания немного отстают после переключения обратно на вкладку?', a: 'Большинство браузеров замедляют JavaScript-таймеры в неактивных вкладках для экономии энергии. Показания могут отставать на секунду-две. Однако значение мгновенно корректируется, как только вы возвращаетесь на вкладку.' },
    ],
  },
  uk: {
    description: 'Оберіть цільову дату (і за потреби час), потім натисніть «Старт». Таймер відлічує час у реальному часі, показуючи дні, години, хвилини та секунди. Використовуйте кнопки швидких пресетів для популярних свят. Коли час закінчується, таймер показує повідомлення. Натисніть «Скинути» для нового відліку.\n\nТаймери зворотного відліку корисні для планування дедлайнів, заходів, поїздок та особистих досягнень. Чи готуєтесь ви до запуску продукту, марафону, весілля або просто до кінця робочого дня — цей інструмент дає чітке уявлення про час, що залишився.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як працює таймер зворотного відліку?', a: 'Введіть майбутню дату і за потреби час, потім натисніть «Старт». Таймер обчислює різницю між поточним моментом і цільовим та оновлюється щосекунди. Працює повністю в браузері.' },
      { q: 'Чи можна відлічувати до конкретного часу?', a: 'Так. Використовуйте поле часу для вказання потрібної години та хвилини. Наприклад, для відліку до Нового року вкажіть дату 1 січня і час 00:00.' },
      { q: 'Чи продовжує таймер працювати при перемиканні вкладок?', a: 'Таймер використовує setInterval JavaScript, який продовжує працювати у фоновому режимі. Деякі браузери сповільнюють неактивні вкладки, але фінальний розрахунок завжди базується на системних годинниках.' },
      { q: 'Що роблять кнопки швидких пресетів?', a: 'Кнопки автоматично встановлюють дату найближчого майбутнього свята. Якщо свято в цьому році вже минуло — дата переноситься на наступний рік.' },
      { q: 'Що відбувається, коли таймер досягає нуля?', a: 'Коли час закінчується, таймер зупиняється і показує повідомлення «Час минув!». Натисніть «Скинути» для нового відліку.' },
      { q: 'Чи можна відлічувати до минулої дати?', a: 'Ні — таймер працює лише для майбутніх дат. Якщо вказати дату, що вже минула, таймер одразу покаже «Час минув!». Для розрахунку часу, що минув із певної події, використовуйте калькулятор різниці дат.' },
      { q: 'Чи зберігається таймер при закритті браузера?', a: 'Ні — таймер не зберігає стан між сесіями. Закриття або оновлення вкладки скидає таймер. Для постійного нагадування використовуйте нативні програми годинника або календаря.' },
      { q: 'Чи можна поділитися таймером з іншими?', a: 'Цей інструмент не генерує посилання з вбудованим таймером. Щоб поділитися, зробіть знімок екрана або скористайтесь спеціальними застосунками для зворотного відліку з підтримкою посилань.' },
      { q: 'Як встановити таймер рівно до опівночі?', a: 'Оберіть сьогоднішню дату і встановіть час 23:59:59, або оберіть завтрашню дату з часом 00:00:00. Для новорічного відліку використовуйте кнопку «Новий рік».' },
      { q: 'Чому показання трохи відстають після повернення на вкладку?', a: 'Більшість браузерів уповільнюють JavaScript-таймери в неактивних вкладках для економії заряду. Показання можуть відставати на секунду-дві, але значення миттєво виправляється, як тільки ви повертаєтесь на вкладку.' },
    ],
  },
  fr: {
    description: 'Sélectionnez une date cible (et optionnellement une heure), puis appuyez sur Démarrer. Le minuteur décompte en temps réel, affichant les jours, heures, minutes et secondes restants. Utilisez les boutons de raccourci pour les fêtes populaires. Quand le temps est écoulé, un message s\'affiche. Appuyez sur Réinitialiser pour un nouveau compte à rebours.\n\nLes minuteurs de compte à rebours sont utiles pour les délais de projet, la planification d\'événements, les départs en voyage et les objectifs personnels. Que vous comptiez les jours avant un lancement de produit, un marathon, un mariage ou simplement la fin de la journée de travail, cet outil vous donne une vue claire du temps restant.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment fonctionne le minuteur de compte à rebours ?', a: 'Entrez une date future et une heure optionnelle, puis cliquez sur Démarrer. Le minuteur calcule la différence entre maintenant et votre objectif et se met à jour chaque seconde. Il fonctionne entièrement dans votre navigateur.' },
      { q: 'Puis-je compter jusqu\'à une heure précise ?', a: 'Oui. Utilisez le champ heure pour définir l\'heure et la minute cibles. Par exemple, pour compter jusqu\'au Nouvel An à minuit, réglez la date au 1er janvier et l\'heure à 00:00.' },
      { q: 'Le minuteur continue-t-il si je change d\'onglet ?', a: 'Le minuteur utilise setInterval de JavaScript qui continue en arrière-plan dans la plupart des navigateurs. Certains navigateurs peuvent ralentir les onglets inactifs, mais le calcul final est toujours basé sur l\'horloge système.' },
      { q: 'Que font les boutons de raccourcis ?', a: 'Les boutons (Nouvel An, Noël, Halloween, Saint-Valentin) définissent automatiquement la date de la prochaine occurrence de cette fête. Si la fête est passée cette année, la date est fixée à l\'année prochaine.' },
      { q: 'Que se passe-t-il quand le compte à rebours atteint zéro ?', a: 'Quand le temps est écoulé, le minuteur s\'arrête et affiche « Temps écoulé ! ». Appuyez sur Réinitialiser pour effacer tout et démarrer un nouveau compte à rebours.' },
      { q: 'Puis-je faire un compte à rebours vers une date passée ?', a: 'Non — le minuteur ne fonctionne que pour les dates futures. Si vous entrez une date déjà passée, il affichera immédiatement « Temps écoulé ! ». Pour calculer le temps écoulé depuis un événement passé, utilisez la calculatrice de différence de dates.' },
      { q: 'Le minuteur est-il sauvegardé si je ferme le navigateur ?', a: 'Non — le minuteur ne sauvegarde pas l\'état entre les sessions. La fermeture ou l\'actualisation de l\'onglet réinitialise le minuteur. Pour un rappel permanent, utilisez l\'application d\'horloge ou de calendrier native de votre appareil.' },
      { q: 'Puis-je partager un compte à rebours avec d\'autres personnes ?', a: 'Cet outil ne génère pas d\'URL partageable avec un compte à rebours intégré. Pour partager, prenez une capture d\'écran du minuteur en cours ou utilisez une application dédiée qui prend en charge les liens partageables.' },
      { q: 'Comment mettre en place un compte à rebours jusqu\'à minuit ce soir ?', a: 'Sélectionnez la date d\'aujourd\'hui et réglez l\'heure à 23:59:59, ou sélectionnez demain avec l\'heure 00:00:00. Pour le Nouvel An, utilisez le bouton préréglé qui cible automatiquement le 1er janvier à minuit.' },
      { q: 'Pourquoi l\'affichage est-il légèrement en retard après être revenu sur l\'onglet ?', a: 'La plupart des navigateurs ralentissent les minuteurs JavaScript dans les onglets inactifs pour économiser la batterie. L\'affichage peut accuser un retard d\'une ou deux secondes, mais il se corrige instantanément dès que vous revenez sur l\'onglet.' },
    ],
  },
  lt: {
    description: 'Pasirinkite tikslinę datą (ir pasirinktinai laiką), tada paspauskite Pradėti. Laikmatis skaičiuoja atgal realiuoju laiku, rodydamas likusias dienas, valandas, minutes ir sekundes. Naudokite greito pasirinkimo mygtukus populiarioms šventėms. Kai laikas baigiasi, rodomas pranešimas. Paspauskite Atstatyti naujam atgaliniam skaičiavimui.\n\nAtgalinio skaičiavimo laikmaičiai naudingi projektų terminams, renginių planavimui, kelionių pradžiai ir asmeniniams tikslams. Nesvarbu, ar skaičiuojate dienas iki produkto pristatymo, maratono, vestuvių ar tiesiog darbo dienos pabaigos — šis įrankis suteikia aiškų, gyvą likusio laiko vaizdą.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip veikia atgalinio skaičiavimo laikmatis?', a: 'Įveskite būsimą datą ir pasirinktinai laiką, tada spustelėkite Pradėti. Laikmatis apskaičiuoja skirtumą tarp dabar ir jūsų tikslo ir atnaujinamas kas sekundę. Veikia tik naršyklėje.' },
      { q: 'Ar galima skaičiuoti iki konkretaus laiko?', a: 'Taip. Naudokite laiko lauką norimos valandos ir minutės nustatymui. Pavyzdžiui, Naujųjų metų atgaliniam skaičiavimui iki vidurnakčio nustatykite sausio 1 d. ir laiką 00:00.' },
      { q: 'Ar laikmatis veikia perjungus skirtukus?', a: 'Laikmatis naudoja JavaScript setInterval, kuris veikia fone daugelyje naršyklių. Kai kurios naršyklės sulėtina neaktyvius skirtukus, tačiau galutinis skaičiavimas visada grindžiamas sistemos laikrodžiu.' },
      { q: 'Ką daro greito pasirinkimo mygtukai?', a: 'Mygtukai (Naujieji metai, Kalėdos, Helovinas, Valentino diena) automatiškai nustato artimiausios šventės datą. Jei šventė šiais metais jau praėjo, data perkeliama į kitų metų.' },
      { q: 'Kas atsitinka, kai atgalinis skaičiavimas pasiekia nulį?', a: 'Kai laikas baigiasi, laikmatis sustoja ir rodo pranešimą „Laikas baigėsi!". Paspauskite Atstatyti, kad išvalytumėte viską ir pradėtumėte naują atgalinį skaičiavimą.' },
      { q: 'Ar galima skaičiuoti atgal iki praeities datos?', a: 'Ne — laikmatis veikia tik ateities datoms. Jei įvesite praėjusią datą, laikmatis iškart rodys „Laikas baigėsi!". Praėjusio laiko skaičiavimui naudokite datų skirtumo skaičiuotuvą.' },
      { q: 'Ar laikmatis išsaugomas uždarius naršyklę?', a: 'Ne — laikmatis neišsaugo būsenos tarp sesijų. Uždarius ar atnaujinus skirtuką laikmatis atstatomas. Nuolatiniam priminimui naudokite savo įrenginio natyvią laikrodžio ar kalendoriaus programėlę.' },
      { q: 'Ar galima pasidalinti laikmaičiu su kitais?', a: 'Šis įrankis negeneruoja bendrinamos nuorodos su įdėtu laikmaičiu. Norėdami pasidalinti, padarykite ekrano kopiją arba naudokite specialią atgalinio skaičiavimo programėlę su bendrinamų nuorodų palaikymu.' },
      { q: 'Kaip nustatyti laikmatį lygiai iki vidurnakčio šiąnakt?', a: 'Pasirinkite šiandienę datą ir nustatykite laiką 23:59:59, arba pasirinkite rytojaus datą su laiku 00:00:00. Naujųjų metų skaičiavimui naudokite „Naujieji metai" mygtuką, kuris automatiškai nukreipia į sausio 1 d. vidurnaktį.' },
      { q: 'Kodėl rodmenys šiek tiek vėluoja grįžus į skirtuką?', a: 'Daugelis naršyklių sulėtina JavaScript laikmaičius neaktyviuose skirtukuose akumuliatoriui tausoti. Rodmenys gali atsilikti sekundę ar dvi, tačiau reikšmė akimirksniu pasikoreguoja grįžus į skirtuką.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/tools/countdown', meta);
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
    url: `https://www.utilixi.com/${locale}/tools/countdown`,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
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
        <RelatedTools locale={locale} tools={related} />
        <CountdownTimer locale={locale} />
        <AdInline locale={locale} />
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

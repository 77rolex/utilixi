import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import MercuryRetrogradeCalculator from './MercuryRetrogradeCalculator';
import FaqSection from '@/components/ui/FaqSection';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Mercury Retrograde 2025–2029 — Dates & What to Avoid', description: 'Check if Mercury is in retrograde right now and see all upcoming Mercury retrograde dates from 2025 to 2029. Learn what to avoid and how to navigate this astrological period. Free tool.', h1: 'Mercury Retrograde Calculator', subtitle: 'Check if Mercury is retrograde today and see all upcoming retrograde periods from 2025 to 2029.' },
  ru: { title: 'Меркурий ретроградный 2025–2029 — даты и что избегать', description: 'Проверьте, ретроградный ли Меркурий сейчас, и посмотрите все предстоящие даты с 2025 по 2029. Узнайте, что нужно избегать в это время. Бесплатно.', h1: 'Меркурий ретроградный', subtitle: 'Проверьте, ретроградный ли Меркурий сегодня, и узнайте все предстоящие ретроградные периоды с 2025 по 2029 год.' },
  uk: { title: 'Меркурій ретроградний 2025–2029 — дати та що уникати', description: 'Перевірте, чи є Меркурій ретроградним зараз, і подивіться всі майбутні дати з 2025 по 2029. Дізнайтеся, що потрібно уникати в цей час. Безкоштовно.', h1: 'Меркурій ретроградний', subtitle: 'Перевірте, чи є Меркурій ретроградним сьогодні, та дізнайтеся всі майбутні ретроградні періоди з 2025 по 2029 рік.' },
  fr: { title: 'Mercure Rétrograde 2025–2029 — Dates et conseils', description: 'Vérifiez si Mercure est actuellement rétrograde et consultez toutes les dates à venir de 2025 à 2029. Découvrez ce qu\'il faut éviter pendant cette période astrologique. Gratuit.', h1: 'Mercure Rétrograde', subtitle: 'Vérifiez si Mercure est rétrograde aujourd\'hui et consultez toutes les périodes à venir de 2025 à 2029.' },
  lt: { title: 'Merkurijus retrogradas 2025–2029 — datos ir ką vengti', description: 'Patikrinkite, ar Merkurijus šiuo metu yra retrogradinis, ir peržiūrėkite visas artėjančias datas nuo 2025 iki 2029. Sužinokite, ko vengti šiuo astrologiniu laikotarpiu. Nemokama.', h1: 'Merkurijaus retrogrodo skaičiuotuvas', subtitle: 'Patikrinkite, ar šiandien Merkurijus yra retrogradinis, ir peržiūrėkite visus artėjančius retrogradinius laikotarpius iki 2029 m.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Mercury retrograde is one of the most widely discussed astrological phenomena. Three or four times a year, Mercury — the planet governing communication, intellect, travel, contracts and technology — appears to reverse its direction in the sky as seen from Earth. This apparent backward motion occurs because Mercury, being an inner planet with a shorter orbital period, periodically overtakes Earth in their respective orbits around the Sun. For approximately three weeks during each retrograde period, astrologers observe recurring patterns of miscommunication, technology glitches, travel delays, contract disputes and revisited decisions. Mercury retrograde is not a time of doom — it is a time of review, reflection and revision.\n\nThe practical guidance for Mercury retrograde periods is well-established: avoid signing major contracts, launching new ventures, making large purchases, or starting important new relationships. Instead, use the period to review existing projects, reconnect with old friends, complete unfinished work and backup important data. The shadow period — roughly one week before and after the retrograde itself — is also worth factoring in, as effects can begin and linger around the main event. This tool shows the current status and all upcoming retrograde windows through 2029, so you can plan accordingly.',
    faqTitle: 'Frequently Asked Questions about Mercury Retrograde',
    faqs: [
      { q: 'What is Mercury retrograde?', a: 'Mercury retrograde is an optical illusion where Mercury appears to move backward in the sky relative to Earth. It occurs three to four times per year when Earth passes Mercury (or appears to do so from our orbital perspective). In astrology, it is associated with disruptions in communication, technology, travel and contracts.' },
      { q: 'How long does Mercury retrograde last?', a: 'Each Mercury retrograde period lasts approximately 21–24 days. There are typically three, sometimes four, retrograde periods per year. Including the shadow periods (pre- and post-retrograde), the influenced timeframe extends to roughly 6–8 weeks per cycle.' },
      { q: 'Is Mercury retrograde bad?', a: 'Mercury retrograde is not inherently bad — it is a time of revision and reflection rather than forward motion. Problems arise when people push ahead with new starts and major decisions during this period. Using it for review, rest, and reconnection tends to yield positive results.' },
      { q: 'What should you avoid during Mercury retrograde?', a: 'Common advice: avoid signing contracts, launching products or businesses, making big tech purchases, scheduling important negotiations, starting new relationships, and making irreversible major decisions. Backup your data, confirm travel arrangements carefully, and allow extra time for communication delays.' },
      { q: 'What is a Mercury retrograde shadow period?', a: 'The shadow period refers to the weeks before and after the retrograde when Mercury is moving through the same degrees of the zodiac it will traverse (or has just traversed) during the retrograde itself. Effects can begin to appear in the pre-shadow and linger in the post-shadow, so many astrologers extend caution to cover these periods.' },
      { q: 'When is the next Mercury retrograde?', a: 'The calculator above shows the current status and the next upcoming Mercury retrograde periods through 2029. Mercury goes retrograde three to four times per year, spending about three weeks in apparent backward motion each time.' },
      { q: 'Does Mercury retrograde affect everyone equally?', a: 'In astrology, individuals with Mercury prominently placed in their birth chart (for example, in Virgo or Gemini, the signs Mercury rules) may feel the effects more strongly. Those with many planets in Gemini, Virgo or the 3rd/6th houses may also be more sensitive to Mercury retrograde periods.' },
      { q: 'Can you start a relationship during Mercury retrograde?', a: 'It is generally advised to wait, as communication misunderstandings are more likely during this period. However, reconnecting with past partners or deepening existing relationships tends to go well — Mercury retrograde often brings people from the past back into our lives.' },
      { q: 'Is it okay to travel during Mercury retrograde?', a: 'Travel is possible during Mercury retrograde, but extra care is advised. Double-check flight details, hotel bookings and schedules; allow more time than usual; backup important documents; and have contingency plans. Technology glitches and miscommunications are more common during this period.' },
      { q: 'What zodiac sign does Mercury retrograde affect most?', a: 'Mercury rules Gemini and Virgo, so those sun signs (or those with Gemini/Virgo rising or Mercury-dominant charts) often feel retrograde periods most keenly. The zodiac sign Mercury is transiting during its retrograde also colours the themes of that particular retrograde period.' },
    ],
  },
  ru: {
    description: 'Ретроградный Меркурий — одно из наиболее широко обсуждаемых астрологических явлений. Три-четыре раза в год Меркурий — планета, управляющая общением, интеллектом, путешествиями, контрактами и технологиями — кажется меняет направление движения на небосклоне. Это кажущееся обратное движение происходит потому, что Меркурий, будучи внутренней планетой с более коротким орбитальным периодом, периодически обгоняет Землю. В течение примерно трёх недель каждого ретроградного периода астрологи наблюдают повторяющиеся паттерны недопонимания, технических сбоев, задержек в путешествиях и пересмотренных решений.\n\nПрактические рекомендации для ретроградного Меркурия хорошо известны: избегайте подписания важных контрактов, запуска новых проектов, крупных покупок. Вместо этого используйте период для проверки существующих проектов, воссоединения со старыми друзьями и завершения незаконченной работы. Теневой период — примерно неделя до и после ретрограда — также стоит учитывать.',
    faqTitle: 'Часто задаваемые вопросы о ретроградном Меркурии',
    faqs: [
      { q: 'Что такое ретроградный Меркурий?', a: 'Ретроградный Меркурий — оптическая иллюзия, при которой Меркурий кажется движущимся в обратном направлении по небу. Это происходит три-четыре раза в год. В астрологии связан с нарушениями в общении, технологиях, путешествиях и контрактах.' },
      { q: 'Как долго длится ретроградный Меркурий?', a: 'Каждый ретроградный период Меркурия длится около 21–24 дней. Обычно бывает три, иногда четыре ретроградных периода в год. Вместе с теневыми периодами общий период влияния составляет примерно 6–8 недель.' },
      { q: 'Ретроградный Меркурий — это плохо?', a: 'Ретроградный Меркурий не является изначально плохим — это время пересмотра и размышлений, а не движения вперёд. Проблемы возникают, когда люди настойчиво стартуют новые дела и принимают важные решения в этот период.' },
      { q: 'Чего следует избегать во время ретроградного Меркурия?', a: 'Общие рекомендации: избегайте подписания контрактов, запуска продуктов, крупных покупок техники, важных переговоров, новых отношений. Делайте резервные копии данных, тщательно проверяйте дорожные договорённости.' },
      { q: 'Что такое теневой период Меркурия?', a: 'Теневой период — недели до и после ретрограда, когда Меркурий проходит через те же градусы зодиака. Эффекты могут начать проявляться в предтеневом периоде и сохраняться в послетеневом.' },
      { q: 'Когда следующий ретроградный Меркурий?', a: 'Калькулятор выше показывает текущий статус и все предстоящие ретроградные периоды Меркурия до 2029 года. Меркурий ретроградируется три-четыре раза в год.' },
      { q: 'Одинаково ли ретроградный Меркурий влияет на всех?', a: 'В астрологии люди с Меркурием, выделенным в натальной карте (например, в Деве или Близнецах), могут ощущать эффекты сильнее. Те, у кого много планет в Близнецах, Деве или в 3-м/6-м домах, также более чувствительны.' },
      { q: 'Можно ли начинать отношения во время ретроградного Меркурия?', a: 'Обычно рекомендуется подождать, так как недопонимание более вероятно. Однако воссоединение с прошлыми партнёрами или углубление существующих отношений проходит хорошо.' },
      { q: 'Можно ли путешествовать во время ретроградного Меркурия?', a: 'Путешествия возможны, но требуют особой осторожности. Дважды проверяйте детали рейсов и бронирования, выделяйте больше времени, делайте резервные копии документов.' },
      { q: 'Какой знак зодиака ретроградный Меркурий затрагивает больше всего?', a: 'Меркурий управляет Близнецами и Девой, поэтому эти знаки зачастую ощущают ретроградные периоды наиболее остро. Знак зодиака, в котором Меркурий транзитирует во время ретрограда, также определяет темы конкретного периода.' },
    ],
  },
  uk: {
    description: 'Ретроградний Меркурій — одне з найбільш широко обговорюваних астрологічних явищ. Три-чотири рази на рік Меркурій — планета, що управляє спілкуванням, інтелектом, подорожами, контрактами та технологіями — здається змінює напрямок руху на небосхилі. Це уявний зворотний рух відбувається тому, що Меркурій, будучи внутрішньою планетою з коротшим орбітальним періодом, час від часу випереджає Землю. Приблизно три тижні кожного ретроградного періоду астрологи спостерігають повторювані паттерни нерозуміння, технічних збоїв та затримок.\n\nПрактичні рекомендації на час ретроградного Меркурія добре відомі: уникайте підписання важливих контрактів, запуску нових проектів і великих покупок. Натомість використовуйте цей час для перевірки існуючих проектів, возз\'єднання зі старими друзями та завершення незакінченої роботи.',
    faqTitle: 'Поширені запитання про ретроградний Меркурій',
    faqs: [
      { q: 'Що таке ретроградний Меркурій?', a: 'Ретроградний Меркурій — оптична ілюзія, при якій Меркурій здається рухається у зворотньому напрямку по небу. Це відбувається три-чотири рази на рік. В астрології пов\'язаний з порушеннями у спілкуванні, технологіях, подорожах та контрактах.' },
      { q: 'Як довго триває ретроградний Меркурій?', a: 'Кожен ретроградний період Меркурія тривалістю близько 21–24 днів. Зазвичай буває три, іноді чотири ретроградних періоди на рік. З урахуванням тіньових періодів загальний вплив становить приблизно 6–8 тижнів.' },
      { q: 'Ретроградний Меркурій — це погано?', a: 'Ретроградний Меркурій не є поганим сам по собі — це час перегляду та роздумів. Проблеми виникають, коли люди наполегливо починають нові справи та приймають важливі рішення в цей час.' },
      { q: 'Чого слід уникати під час ретроградного Меркурія?', a: 'Загальні рекомендації: уникайте підписання контрактів, запуску продуктів, великих покупок техніки, важливих переговорів, нових стосунків. Робіть резервні копії даних.' },
      { q: 'Що таке тіньовий період Меркурія?', a: 'Тіньовий період — тижні до і після ретрограда, коли Меркурій проходить через ті самі градуси зодіаку. Ефекти можуть починатися в передтіньовому і зберігатися в посттіньовому.' },
      { q: 'Коли наступний ретроградний Меркурій?', a: 'Калькулятор вище показує поточний статус і всі майбутні ретроградні періоди Меркурія до 2029 року. Меркурій ретрогрудує три-чотири рази на рік.' },
      { q: 'Однаково ретроградний Меркурій впливає на всіх?', a: 'В астрології люди з виділеним Меркурієм у натальній карті (наприклад, у Діві або Близнюках) можуть відчувати ефекти сильніше. Ті, хто має багато планет у Близнюках, Діві або 3-му/6-му будинках, також більш чутливі.' },
      { q: 'Чи можна починати стосунки під час ретроградного Меркурія?', a: 'Зазвичай рекомендується зачекати, оскільки непорозуміння більш вірогідні. Однак возз\'єднання з минулими партнерами чи поглиблення існуючих стосунків проходить добре.' },
      { q: 'Чи можна подорожувати під час ретроградного Меркурія?', a: 'Подорожі можливі, але потребують особливої обережності. Двічі перевіряйте деталі рейсів та бронювання, виділяйте більше часу, робіть резервні копії документів.' },
      { q: 'Який знак зодіаку ретроградний Меркурій зачіпає найбільше?', a: 'Меркурій управляє Близнюками і Дівою, тому ці знаки частіше відчувають ретроградні періоди найгостріше. Знак зодіаку, через який Меркурій транзитує під час ретрограда, також визначає теми конкретного.' },
    ],
  },
  fr: {
    description: 'Mercure rétrograde est l\'un des phénomènes astrologiques les plus commentés. Trois à quatre fois par an, Mercure — la planète gouvernant la communication, l\'intellect, les voyages, les contrats et la technologie — semble inverser sa direction dans le ciel. Ce mouvement apparent en arrière se produit parce que Mercure, étant une planète intérieure avec une période orbitale plus courte, dépasse périodiquement la Terre. Pendant environ trois semaines à chaque période rétrograde, les astrologues observent des schémas récurrents de malentendus, de pannes technologiques, de retards de voyage et de décisions révisées.\n\nLes conseils pratiques pour les périodes de Mercure rétrograde sont bien établis : évitez de signer des contrats importants, de lancer de nouvelles activités, de faire de gros achats, ou de commencer de nouvelles relations importantes. Utilisez plutôt cette période pour réviser les projets existants, reconnecter avec de vieux amis et terminer les travaux inachevés.',
    faqTitle: 'Questions fréquentes sur Mercure rétrograde',
    faqs: [
      { q: 'Qu\'est-ce que Mercure rétrograde ?', a: 'Mercure rétrograde est une illusion d\'optique où Mercure semble reculer dans le ciel par rapport à la Terre. Cela se produit trois à quatre fois par an. En astrologie, il est associé à des perturbations dans la communication, la technologie, les voyages et les contrats.' },
      { q: 'Combien de temps dure Mercure rétrograde ?', a: 'Chaque période rétrograde de Mercure dure environ 21–24 jours. Il y a généralement trois, parfois quatre périodes rétrogrades par an. En incluant les périodes d\'ombre, la durée d\'influence s\'étend à environ 6–8 semaines par cycle.' },
      { q: 'Mercure rétrograde est-il mauvais ?', a: 'Mercure rétrograde n\'est pas intrinsèquement mauvais — c\'est une période de révision et de réflexion plutôt que d\'avancement. Les problèmes surviennent lorsqu\'on insiste pour démarrer de nouvelles choses pendant cette période.' },
      { q: 'Que faut-il éviter pendant Mercure rétrograde ?', a: 'Conseils généraux : évitez de signer des contrats, de lancer des produits, de faire de gros achats technologiques, de planifier des négociations importantes, de commencer de nouvelles relations. Sauvegardez vos données, vérifiez attentivement les arrangements de voyage.' },
      { q: 'Qu\'est-ce que la période d\'ombre de Mercure ?', a: 'La période d\'ombre désigne les semaines avant et après le rétrograde où Mercure traverse les mêmes degrés du zodiaque. Les effets peuvent commencer à apparaître dans la pré-ombre et persister dans la post-ombre.' },
      { q: 'Quand est la prochaine période de Mercure rétrograde ?', a: 'Le calculateur ci-dessus affiche le statut actuel et toutes les prochaines périodes de Mercure rétrograde jusqu\'en 2029. Mercure devient rétrograde trois à quatre fois par an.' },
      { q: 'Mercure rétrograde affecte-t-il tout le monde de la même façon ?', a: 'En astrologie, les personnes ayant Mercure bien placé dans leur thème natal (par exemple en Vierge ou Gémeaux) peuvent ressentir les effets plus fortement. Ceux avec beaucoup de planètes en Gémeaux, en Vierge ou dans les maisons 3/6 sont également plus sensibles.' },
      { q: 'Peut-on commencer une relation pendant Mercure rétrograde ?', a: 'Il est généralement conseillé d\'attendre, car les malentendus communicatifs sont plus fréquents. Cependant, renouer avec d\'anciens partenaires ou approfondir des relations existantes se passe souvent bien.' },
      { q: 'Peut-on voyager pendant Mercure rétrograde ?', a: 'Les voyages sont possibles mais demandent plus de vigilance. Vérifiez deux fois les détails de vol, prévoyez plus de temps, sauvegardez vos documents importants et ayez des plans de contingence.' },
      { q: 'Quel signe est le plus affecté par Mercure rétrograde ?', a: 'Mercure gouverne les Gémeaux et la Vierge, donc ces signes (ou ceux avec Gémeaux/Vierge ascendant) ressentent généralement les périodes rétrogrades le plus intensément.' },
    ],
  },
  lt: {
    description: 'Merkurijaus retrogradas yra vienas iš labiausiai aptariamų astrologinių reiškinių. Tris ar keturis kartus per metus Merkurijus — planeta, valdanti bendravimą, intelektą, keliones, sutartis ir technologijas — regisi keičianti kryptį danguje. Šis tariamas judėjimas atgal vyksta todėl, kad Merkurijus, kaip vidinė planeta su trumpesniu orbitos periodu, periodiškai aplenkia Žemę. Maždaug tris savaites kiekvieno retrogradinio laikotarpio metu astrologai stebi pasikartojančius nesusikalbėjimo, technologijų gedimų, kelionių vėlavimų ir persvarstytų sprendimų modelius.\n\nPraktiniai patarimai retrogradiniais Merkurijaus laikotarpiais yra gerai žinomi: venkite pasirašyti svarbių sutarčių, pradėti naujų projektų, daryti didelių pirkinių. Vietoj to naudokite laikotarpį esamiems projektams peržiūrėti, atsinaujinimui su senais draugais ir nebaigtiems darbams užbaigti.',
    faqTitle: 'Dažnai užduodami klausimai apie Merkurijaus retrogradą',
    faqs: [
      { q: 'Kas yra Merkurijaus retrogradas?', a: 'Merkurijaus retrogradas yra optinė iliuzija, kai Merkurijus atrodo juda atgal danguje Žemės atžvilgiu. Tai nutinka tris ar keturis kartus per metus. Astrologijoje siejamas su komunikacijos, technologijų, kelionių ir sutarčių sutrikimais.' },
      { q: 'Kiek trunka Merkurijaus retrogradas?', a: 'Kiekvienas Merkurijaus retrogradinis laikotarpis trunka maždaug 21–24 dienas. Paprastai per metus būna trys, kartais keturi retrogradiniai laikotarpiai. Įskaitant šešėlinius laikotarpius, bendras poveikio laikotarpis siekia maždaug 6–8 savaites.' },
      { q: 'Ar Merkurijaus retrogradas yra blogas?', a: 'Merkurijaus retrogradas nėra iš esmės blogas — tai peržiūros ir apmąstymų laikas, o ne judėjimo į priekį. Problemos kyla, kai žmonės siekia pradėti naujus dalykus ir priimti svarbius sprendimus šiuo laikotarpiu.' },
      { q: 'Ko reikia vengti Merkurijaus retrogradu?', a: 'Bendri patarimai: venkite pasirašyti sutarčių, pristatyti produktų, daryti didelių technologijų pirkinių, planuoti svarbias derybas, pradėti naujų santykių. Kurkite atsargines duomenų kopijas, atidžiai tikrinkite kelionių planus.' },
      { q: 'Kas yra Merkurijaus šešėlinis laikotarpis?', a: 'Šešėlinis laikotarpis yra savaitės prieš ir po retrogradu, kai Merkurijus juda per tuos pačius zodiako laipsnius. Poveikis gali pradėti atsirasti priešretrogradiniame šešėlyje ir tęstis po-retrogradiniame.' },
      { q: 'Kada kitas Merkurijaus retrogradas?', a: 'Aukščiau pateiktas skaičiuotuvas rodo dabartinę būklę ir visus artėjančius Merkurijaus retrogradi laikotarpius iki 2029 m. Merkurijus tampa retrogradinis tris ar keturis kartus per metus.' },
      { q: 'Ar Merkurijaus retrogradas vienodai veikia visus?', a: 'Astrologijoje žmonės, kurių gimimo kortoje Merkurijus yra ryškioje pozicijoje (pvz., Mergelėje ar Dvyniai), gali jausti poveikį stipriau. Taip pat jautresni yra tie, kurie turi daug planetų Dvyniuose, Mergelėje arba 3-iame/6-ame namuose.' },
      { q: 'Ar galima pradėti santykius Merkurijaus retrogradu?', a: 'Paprastai rekomenduojama palaukti, nes bendravimo nesusipratimų tikimybė yra didesnė. Tačiau atsinaujinimas su buvusiais partneriais ar esamų santykių pagilinimas dažnai vyksta gerai.' },
      { q: 'Ar galima keliauti Merkurijaus retrogradu?', a: 'Kelionės įmanomos, tačiau reikia papildomos atsargumo. Du kartus patikrinkite skrydžio informaciją, skirkite daugiau laiko, darykite svarbių dokumentų atsargines kopijas ir turėkite atsarginius planus.' },
      { q: 'Kuriam zodiako ženklui Merkurijaus retrogradas daro didžiausią poveikį?', a: 'Merkurijus valdo Dvynius ir Mergelę, todėl šie ženklai dažnai jautriau reaguoja į retrogrodo periodus. Zodiako ženklas, kurį Merkurijus pervažiuoja retrogradu, nuspalvina konkretaus retrogrodo temas.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/zodiac-sign', label: 'Zodiac Sign Calculator' },
    { href: '/calculator/angel-number', label: 'Angel Number Meaning' },
    { href: '/calculator/zodiac-compatibility', label: 'Zodiac Compatibility' },
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/chinese-zodiac', label: 'Chinese Zodiac' },
  ],
  ru: [
    { href: '/calculator/zodiac-sign', label: 'Знак зодиака' },
    { href: '/calculator/angel-number', label: 'Число ангела' },
    { href: '/calculator/zodiac-compatibility', label: 'Совместимость знаков' },
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/chinese-zodiac', label: 'Китайский гороскоп' },
  ],
  uk: [
    { href: '/calculator/zodiac-sign', label: 'Знак зодіаку' },
    { href: '/calculator/angel-number', label: 'Число ангела' },
    { href: '/calculator/zodiac-compatibility', label: 'Сумісність знаків' },
    { href: '/calculator/life-path', label: 'Число шляху життя' },
    { href: '/calculator/chinese-zodiac', label: 'Китайський гороскоп' },
  ],
  fr: [
    { href: '/calculator/zodiac-sign', label: 'Signe du Zodiaque' },
    { href: '/calculator/angel-number', label: 'Nombre Angélique' },
    { href: '/calculator/zodiac-compatibility', label: 'Compatibilité des Signes' },
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/chinese-zodiac', label: 'Zodiaque Chinois' },
  ],
  lt: [
    { href: '/calculator/zodiac-sign', label: 'Zodiako ženklas' },
    { href: '/calculator/angel-number', label: 'Angelo skaičiaus reikšmė' },
    { href: '/calculator/zodiac-compatibility', label: 'Ženklų suderinamumas' },
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/chinese-zodiac', label: 'Kinų zodiako ženklas' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/mercury-retrograde', meta);
}

export function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function MercuryRetrogradePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/mercury-retrograde`,
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
        <RelatedTools locale={locale} tools={related} />
        <ToolActions />
        <MercuryRetrogradeCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
          <FaqSection title={content.faqTitle} faqs={content.faqs} />
        </div>
      </PageLayout>
    </>
  );
}

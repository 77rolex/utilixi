'use client';

import { useState, useEffect } from 'react';
import styles from './MoonSignCalculator.module.scss';

const T: Record<string, {
  dateLabel: string;
  timeLabel: string;
  tzLabel: string;
  moonIn: string;
  elementLabel: string;
  rulingLabel: string;
  warnTitle: string;
  warnText: string;
  nowBtn: string;
}> = {
  en: {
    dateLabel: 'Date of Birth',
    timeLabel: 'Time of Birth',
    tzLabel: 'UTC Offset (Timezone)',
    moonIn: 'Moon in',
    elementLabel: 'Element',
    rulingLabel: 'Ruling Planet',
    warnTitle: '⚠ Near Sign Boundary',
    warnText: 'The Moon is within 2° of a sign boundary at this date/time. Due to the algorithm\'s ±1–2° approximation, the actual sign may be the adjacent one. Verify with astrology software for certainty.',
    nowBtn: 'Now',
  },
  ru: {
    dateLabel: 'Дата рождения',
    timeLabel: 'Время рождения',
    tzLabel: 'Часовой пояс (UTC)',
    moonIn: 'Луна в',
    elementLabel: 'Стихия',
    rulingLabel: 'Управитель',
    warnTitle: '⚠ Близко к границе знака',
    warnText: 'Луна находится в пределах 2° от границы знака. Из-за погрешности алгоритма (±1–2°) реальный знак может быть соседним. Для точности проверьте в астрологическом ПО.',
    nowBtn: 'Сейчас',
  },
  uk: {
    dateLabel: 'Дата народження',
    timeLabel: 'Час народження',
    tzLabel: 'Часовий пояс (UTC)',
    moonIn: 'Місяць у',
    elementLabel: 'Стихія',
    rulingLabel: 'Управитель',
    warnTitle: '⚠ Близько до межі знаку',
    warnText: 'Місяць знаходиться в межах 2° від межі знаку. Через похибку алгоритму (±1–2°) реальний знак може бути сусіднім. Для точності перевірте в астрологічному ПЗ.',
    nowBtn: 'Зараз',
  },
  fr: {
    dateLabel: 'Date de naissance',
    timeLabel: 'Heure de naissance',
    tzLabel: 'Décalage UTC (fuseau horaire)',
    moonIn: 'Lune en',
    elementLabel: 'Élément',
    rulingLabel: 'Planète dominante',
    warnTitle: '⚠ Proche de la limite de signe',
    warnText: 'La Lune se trouve à moins de 2° d\'une limite de signe. En raison de l\'approximation (±1–2°), le signe réel pourrait être celui adjacent. Vérifiez avec un logiciel d\'astrologie.',
    nowBtn: 'Maintenant',
  },
  lt: {
    dateLabel: 'Gimimo data',
    timeLabel: 'Gimimo laikas',
    tzLabel: 'UTC poslinkis (laiko juosta)',
    moonIn: 'Mėnulis',
    elementLabel: 'Elementas',
    rulingLabel: 'Valdančioji planeta',
    warnTitle: '⚠ Arti ženklo ribos',
    warnText: 'Mėnulis yra mažiau nei 2° nuo ženklo ribos. Dėl algoritmo paklaidos (±1–2°) tikrasis ženklas gali būti gretimas. Patikrinkite astrologijos programine įranga.',
    nowBtn: 'Dabar',
  },
};

const UTC_OFFSETS = [
  { value: -12, label: 'UTC−12' },
  { value: -11, label: 'UTC−11 (Samoa)' },
  { value: -10, label: 'UTC−10 (Hawaii)' },
  { value: -9, label: 'UTC−9 (Alaska)' },
  { value: -8, label: 'UTC−8 (Los Angeles)' },
  { value: -7, label: 'UTC−7 (Denver, Phoenix)' },
  { value: -6, label: 'UTC−6 (Chicago, Mexico City)' },
  { value: -5, label: 'UTC−5 (New York, Bogotá)' },
  { value: -4, label: 'UTC−4 (Halifax, Caracas)' },
  { value: -3, label: 'UTC−3 (Buenos Aires, São Paulo)' },
  { value: -2, label: 'UTC−2' },
  { value: -1, label: 'UTC−1 (Azores)' },
  { value: 0, label: 'UTC±0 (London, Lisbon)' },
  { value: 1, label: 'UTC+1 (Paris, Berlin, Warsaw, Rome)' },
  { value: 2, label: 'UTC+2 (Kyiv, Helsinki, Cairo)' },
  { value: 3, label: 'UTC+3 (Moscow, Istanbul, Riyadh)' },
  { value: 3.5, label: 'UTC+3:30 (Tehran)' },
  { value: 4, label: 'UTC+4 (Dubai, Baku)' },
  { value: 4.5, label: 'UTC+4:30 (Kabul)' },
  { value: 5, label: 'UTC+5 (Karachi, Tashkent)' },
  { value: 5.5, label: 'UTC+5:30 (Delhi, Mumbai)' },
  { value: 5.75, label: 'UTC+5:45 (Kathmandu)' },
  { value: 6, label: 'UTC+6 (Dhaka, Almaty)' },
  { value: 6.5, label: 'UTC+6:30 (Yangon)' },
  { value: 7, label: 'UTC+7 (Bangkok, Jakarta, Novosibirsk)' },
  { value: 8, label: 'UTC+8 (Beijing, Singapore, Kuala Lumpur)' },
  { value: 9, label: 'UTC+9 (Tokyo, Seoul)' },
  { value: 9.5, label: 'UTC+9:30 (Adelaide, Darwin)' },
  { value: 10, label: 'UTC+10 (Sydney, Vladivostok)' },
  { value: 11, label: 'UTC+11 (Magadan, Solomon Islands)' },
  { value: 12, label: 'UTC+12 (Auckland, Fiji)' },
  { value: 13, label: 'UTC+13 (Tonga)' },
];

type SignData = { name: string; symbol: string; element: string; ruling: string; desc: string };

const SIGNS: Record<string, SignData[]> = {
  en: [
    { name: 'Aries', symbol: '♈', element: 'Fire', ruling: 'Mars', desc: 'Moon in Aries brings bold, impulsive emotional energy and a need for independence. Feelings are expressed directly and quickly. You crave new beginnings and act on instinct rather than reflection.' },
    { name: 'Taurus', symbol: '♉', element: 'Earth', ruling: 'Venus', desc: 'Moon in Taurus brings calm, sensuality and a deep need for stability. Emotions are steady and grounded. You find comfort in beauty, routine and material security — and resist change instinctively.' },
    { name: 'Gemini', symbol: '♊', element: 'Air', ruling: 'Mercury', desc: 'Moon in Gemini brings curiosity, adaptability and emotional versatility. You process feelings through communication and thrive on mental variety. Boredom is your greatest emotional trigger.' },
    { name: 'Cancer', symbol: '♋', element: 'Water', ruling: 'Moon', desc: 'Moon in Cancer heightens intuition and emotional depth. Deep nurturing instincts, strong family bonds and vivid imagination define this placement. This is the Moon\'s home sign — its most natural position.' },
    { name: 'Leo', symbol: '♌', element: 'Fire', ruling: 'Sun', desc: 'Moon in Leo brings warmth, generosity and a need for recognition. Emotions are expressed dramatically and creatively. You lead with heart, inspire those around you and need to feel truly seen.' },
    { name: 'Virgo', symbol: '♍', element: 'Earth', ruling: 'Mercury', desc: 'Moon in Virgo brings analytical precision and emotional reserve. You process feelings through practical action and a desire to be useful. Perfectionism and attention to detail run deep in your emotional nature.' },
    { name: 'Libra', symbol: '♎', element: 'Air', ruling: 'Venus', desc: 'Moon in Libra brings a need for harmony, fairness and beauty in all things. Emotions are expressed diplomatically. You seek balance in relationships and are deeply unsettled by conflict or injustice.' },
    { name: 'Scorpio', symbol: '♏', element: 'Water', ruling: 'Pluto / Mars', desc: 'Moon in Scorpio brings intensity, depth and powerful emotional instincts. You feel everything profoundly, crave transformation and are drawn to the hidden layers beneath the surface of life.' },
    { name: 'Sagittarius', symbol: '♐', element: 'Fire', ruling: 'Jupiter', desc: 'Moon in Sagittarius brings optimism, freedom and a restless need for exploration. Emotions are enthusiastic and philosophical. You need space, adventure and a sense of meaning to feel emotionally fulfilled.' },
    { name: 'Capricorn', symbol: '♑', element: 'Earth', ruling: 'Saturn', desc: 'Moon in Capricorn brings emotional discipline, ambition and self-sufficiency. Feelings are internalised and expressed through achievement. You value responsibility, structure and long-term security above all.' },
    { name: 'Aquarius', symbol: '♒', element: 'Air', ruling: 'Uranus / Saturn', desc: 'Moon in Aquarius brings independence, originality and emotional detachment. You process feelings intellectually and are drawn to humanitarian ideals. Connection to humanity as a whole matters more than closeness to one person.' },
    { name: 'Pisces', symbol: '♓', element: 'Water', ruling: 'Neptune / Jupiter', desc: 'Moon in Pisces brings deep empathy, imagination and spiritual sensitivity. Emotions are boundless and intuitive — you absorb the feelings of those around you and dream with extraordinary vividness.' },
  ],
  ru: [
    { name: 'Овен', symbol: '♈', element: 'Огонь', ruling: 'Марс', desc: 'Луна в Овне приносит смелость, импульсивность и потребность в независимости. Эмоции выражаются прямо и быстро. Вы действуете по интуиции, жаждете новых начинаний и не любите ждать.' },
    { name: 'Телец', symbol: '♉', element: 'Земля', ruling: 'Венера', desc: 'Луна в Тельце приносит спокойствие, чувственность и глубокую потребность в стабильности. Эмоции устойчивы и заземлены. Вы находите комфорт в красоте, привычном укладе и материальной безопасности.' },
    { name: 'Близнецы', symbol: '♊', element: 'Воздух', ruling: 'Меркурий', desc: 'Луна в Близнецах приносит любопытство, гибкость и эмоциональную адаптивность. Вы обрабатываете чувства через общение и жаждете умственного разнообразия. Скука — ваш главный эмоциональный триггер.' },
    { name: 'Рак', symbol: '♋', element: 'Вода', ruling: 'Луна', desc: 'Луна в Раке (в своём знаке) усиливает интуицию и эмоциональную глубину. Глубокие инстинкты заботы, сильные семейные связи и богатое воображение — ключевые черты этого положения.' },
    { name: 'Лев', symbol: '♌', element: 'Огонь', ruling: 'Солнце', desc: 'Луна во Льве приносит теплоту, щедрость и потребность в признании. Эмоции выражаются ярко и творчески. Вы ведёте сердцем, вдохновляете окружающих и хотите, чтобы вас по-настоящему видели.' },
    { name: 'Дева', symbol: '♍', element: 'Земля', ruling: 'Меркурий', desc: 'Луна в Деве приносит аналитическую точность и эмоциональную сдержанность. Вы обрабатываете чувства через практические действия и желание быть полезным. Перфекционизм — ваша эмоциональная основа.' },
    { name: 'Весы', symbol: '♎', element: 'Воздух', ruling: 'Венера', desc: 'Луна в Весах приносит потребность в гармонии, справедливости и красоте. Эмоции выражаются дипломатично. Вы ищете баланс в отношениях и глубоко страдаете от конфликтов и несправедливости.' },
    { name: 'Скорпион', symbol: '♏', element: 'Вода', ruling: 'Плутон / Марс', desc: 'Луна в Скорпионе приносит интенсивность, глубину и мощные эмоциональные инстинкты. Вы чувствуете всё очень глубоко, жаждете трансформации и притягиваетесь к скрытым слоям жизни.' },
    { name: 'Стрелец', symbol: '♐', element: 'Огонь', ruling: 'Юпитер', desc: 'Луна в Стрельце приносит оптимизм, свободу и неутолимую потребность в исследовании. Эмоции энтузиастичны и философичны. Вам нужны пространство, приключения и смысл жизни.' },
    { name: 'Козерог', symbol: '♑', element: 'Земля', ruling: 'Сатурн', desc: 'Луна в Козероге приносит эмоциональную дисциплину, амбиции и самодостаточность. Чувства сдерживаются и выражаются через достижения. Вы цените ответственность, структуру и долгосрочную безопасность.' },
    { name: 'Водолей', symbol: '♒', element: 'Воздух', ruling: 'Уран / Сатурн', desc: 'Луна в Водолее приносит независимость, оригинальность и эмоциональную отстранённость. Вы обрабатываете чувства интеллектуально и тяготеете к гуманистическим идеалам и социальным переменам.' },
    { name: 'Рыбы', symbol: '♓', element: 'Вода', ruling: 'Нептун / Юпитер', desc: 'Луна в Рыбах приносит глубокую эмпатию, воображение и духовную чувствительность. Эмоции безграничны и интуитивны — вы впитываете чувства окружающих и видите необычайно яркие сны.' },
  ],
  uk: [
    { name: 'Овен', symbol: '♈', element: 'Вогонь', ruling: 'Марс', desc: 'Місяць в Овні приносить сміливість, імпульсивність і потребу в незалежності. Емоції виражаються прямо і швидко. Ви дієте за інтуїцією, прагнете нових починань і не любите чекати.' },
    { name: 'Телець', symbol: '♉', element: 'Земля', ruling: 'Венера', desc: 'Місяць у Тельці приносить спокій, чуттєвість і глибоку потребу в стабільності. Емоції стійкі та заземлені. Ви знаходите комфорт у красі, звичному укладі та матеріальній безпеці.' },
    { name: 'Близнюки', symbol: '♊', element: 'Повітря', ruling: 'Меркурій', desc: 'Місяць у Близнюках приносить допитливість, гнучкість і емоційну адаптивність. Ви обробляєте почуття через спілкування та жадаєте розумового різноманіття. Нудьга — ваш головний емоційний тригер.' },
    { name: 'Рак', symbol: '♋', element: 'Вода', ruling: 'Місяць', desc: 'Місяць у Раку (у своєму знаці) посилює інтуїцію та емоційну глибину. Глибокі інстинкти турботи, сильні сімейні зв\'язки та багата уява — ключові риси цього положення.' },
    { name: 'Лев', symbol: '♌', element: 'Вогонь', ruling: 'Сонце', desc: 'Місяць у Леві приносить теплоту, щедрість і потребу у визнанні. Емоції виражаються яскраво і творчо. Ви ведете серцем, надихаєте оточуючих і хочете, щоб вас по-справжньому бачили.' },
    { name: 'Діва', symbol: '♍', element: 'Земля', ruling: 'Меркурій', desc: 'Місяць у Діві приносить аналітичну точність і емоційну стриманість. Ви обробляєте почуття через практичні дії та бажання бути корисним. Перфекціонізм — ваша емоційна основа.' },
    { name: 'Терези', symbol: '♎', element: 'Повітря', ruling: 'Венера', desc: 'Місяць у Терезах приносить потребу в гармонії, справедливості та красі. Емоції виражаються дипломатично. Ви шукаєте баланс у стосунках і глибоко страждаєте від конфліктів.' },
    { name: 'Скорпіон', symbol: '♏', element: 'Вода', ruling: 'Плутон / Марс', desc: 'Місяць у Скорпіоні приносить інтенсивність, глибину та потужні емоційні інстинкти. Ви відчуваєте все дуже глибоко, прагнете трансформації та притягуєтеся до прихованих шарів життя.' },
    { name: 'Стрілець', symbol: '♐', element: 'Вогонь', ruling: 'Юпітер', desc: 'Місяць у Стрільці приносить оптимізм, свободу та невтамовну потребу в дослідженні. Емоції ентузіастичні та філософські. Вам потрібні простір, пригоди та сенс у житті.' },
    { name: 'Козеріг', symbol: '♑', element: 'Земля', ruling: 'Сатурн', desc: 'Місяць у Козерозі приносить емоційну дисципліну, амбіції та самодостатність. Почуття стримуються та виражаються через досягнення. Ви цінуєте відповідальність та довгострокову безпеку.' },
    { name: 'Водолій', symbol: '♒', element: 'Повітря', ruling: 'Уран / Сатурн', desc: 'Місяць у Водолії приносить незалежність, оригінальність і емоційну відстороненість. Ви обробляєте почуття інтелектуально та тяжієте до гуманістичних ідеалів і соціальних змін.' },
    { name: 'Риби', symbol: '♓', element: 'Вода', ruling: 'Нептун / Юпітер', desc: 'Місяць у Рибах приносить глибоку емпатію, уяву та духовну чутливість. Емоції безмежні й інтуїтивні — ви вбираєте почуття оточуючих і бачите надзвичайно яскраві сни.' },
  ],
  fr: [
    { name: 'Bélier', symbol: '♈', element: 'Feu', ruling: 'Mars', desc: 'La Lune en Bélier apporte audace, impulsivité et besoin d\'indépendance. Les émotions s\'expriment directement et rapidement. Vous agissez par instinct, cherchez les nouveaux départs et détestez attendre.' },
    { name: 'Taureau', symbol: '♉', element: 'Terre', ruling: 'Vénus', desc: 'La Lune en Taureau apporte calme, sensualité et un profond besoin de stabilité. Les émotions sont stables et ancrées. Vous trouvez le réconfort dans la beauté, la routine et la sécurité matérielle.' },
    { name: 'Gémeaux', symbol: '♊', element: 'Air', ruling: 'Mercure', desc: 'La Lune en Gémeaux apporte curiosité, adaptabilité et polyvalence émotionnelle. Vous traitez les sentiments par la communication et avez besoin de variété intellectuelle. L\'ennui est votre principal déclencheur émotionnel.' },
    { name: 'Cancer', symbol: '♋', element: 'Eau', ruling: 'Lune', desc: 'La Lune en Cancer (son signe natal) renforce l\'intuition et la profondeur émotionnelle. Des instincts nourriciers profonds, des liens familiaux forts et une imagination vive définissent ce placement.' },
    { name: 'Lion', symbol: '♌', element: 'Feu', ruling: 'Soleil', desc: 'La Lune en Lion apporte chaleur, générosité et besoin de reconnaissance. Les émotions s\'expriment de façon dramatique et créative. Vous guidez par le cœur, inspirez votre entourage et avez besoin d\'être vu.' },
    { name: 'Vierge', symbol: '♍', element: 'Terre', ruling: 'Mercure', desc: 'La Lune en Vierge apporte précision analytique et réserve émotionnelle. Vous traitez vos sentiments par l\'action pratique et le désir d\'être utile. Le perfectionnisme est au cœur de votre nature émotionnelle.' },
    { name: 'Balance', symbol: '♎', element: 'Air', ruling: 'Vénus', desc: 'La Lune en Balance apporte un besoin d\'harmonie, de justice et de beauté. Les émotions s\'expriment avec diplomatie. Vous cherchez l\'équilibre dans les relations et souffrez profondément des conflits.' },
    { name: 'Scorpion', symbol: '♏', element: 'Eau', ruling: 'Pluton / Mars', desc: 'La Lune en Scorpion apporte intensité, profondeur et instincts émotionnels puissants. Vous ressentez tout profondément, recherchez la transformation et êtes attirés par les couches cachées de la vie.' },
    { name: 'Sagittaire', symbol: '♐', element: 'Feu', ruling: 'Jupiter', desc: 'La Lune en Sagittaire apporte optimisme, liberté et un besoin d\'exploration inextinguible. Les émotions sont enthousiastes et philosophiques. Vous avez besoin d\'espace, d\'aventure et de sens pour vous épanouir.' },
    { name: 'Capricorne', symbol: '♑', element: 'Terre', ruling: 'Saturne', desc: 'La Lune en Capricorne apporte discipline émotionnelle, ambition et autonomie. Les sentiments sont intériorisés et exprimés à travers l\'accomplissement. Vous valorisez la responsabilité et la sécurité à long terme.' },
    { name: 'Verseau', symbol: '♒', element: 'Air', ruling: 'Uranus / Saturne', desc: 'La Lune en Verseau apporte indépendance, originalité et détachement émotionnel. Vous traitez les sentiments intellectuellement et êtes attirés par les idéaux humanitaires et la réforme sociale.' },
    { name: 'Poissons', symbol: '♓', element: 'Eau', ruling: 'Neptune / Jupiter', desc: 'La Lune en Poissons apporte empathie profonde, imagination et sensibilité spirituelle. Les émotions sont illimitées et intuitives — vous absorbez les sentiments de votre entourage et rêvez avec une vivacité extraordinaire.' },
  ],
  lt: [
    { name: 'Avinas', symbol: '♈', element: 'Ugnis', ruling: 'Marsas', desc: 'Mėnulis Avine teikia drąsą, impulsyvumą ir nepriklausomybės poreikį. Emocijos reiškiamos tiesiogiai ir greitai. Veikiate pagal intuiciją, trokštate naujų pradžių ir nemėgstate laukti.' },
    { name: 'Jautis', symbol: '♉', element: 'Žemė', ruling: 'Venera', desc: 'Mėnulis Jaučiui teikia ramybę, juslumą ir gilų stabilumo poreikį. Emocijos stabilios ir prisirišusios prie žemės. Komfortą randate grožyje, rutinoje ir materialiame saugume.' },
    { name: 'Dvyniai', symbol: '♊', element: 'Oras', ruling: 'Merkurijus', desc: 'Mėnulis Dvyniuose teikia smalsumą, prisitaikymą ir emocinį universalumą. Jausmus apdorojate per bendravimą ir klestite intelektinėje įvairovėje. Nuobodulys yra jūsų didžiausias emocinis provokuotojas.' },
    { name: 'Vėžys', symbol: '♋', element: 'Vanduo', ruling: 'Mėnulis', desc: 'Mėnulis Vėžyje (savo ženkle) sustiprina intuiciją ir emocinį gilumą. Gilūs globos instinktai, stiprūs šeimos ryšiai ir ryški vaizduotė yra šios pozicijos pagrindiniai bruožai.' },
    { name: 'Liūtas', symbol: '♌', element: 'Ugnis', ruling: 'Saulė', desc: 'Mėnulis Liūte teikia šilumos, dosnumo ir pripažinimo poreikio. Emocijos reiškiamos ryškiai ir kūrybiškai. Vadovaujate širdimi, įkvepiate aplinkinius ir norite, kad jus tikrai matytų.' },
    { name: 'Mergelė', symbol: '♍', element: 'Žemė', ruling: 'Merkurijus', desc: 'Mėnulis Mergelėje teikia analitinio tikslumo ir emocinio santūrumo. Jausmus apdorojate per praktinę veiklą ir norą būti naudingam. Perfekcionizmas yra giliai įsišaknijęs jūsų emocinėje prigimtyje.' },
    { name: 'Svarstyklės', symbol: '♎', element: 'Oras', ruling: 'Venera', desc: 'Mėnulis Svarstyklėse teikia harmonijos, teisingumo ir grožio poreikio. Emocijos reiškiamos diplomatiškai. Ieškote pusiausvyros santykiuose ir giliai kenčiate nuo konfliktų ir neteisybės.' },
    { name: 'Skorpionas', symbol: '♏', element: 'Vanduo', ruling: 'Plutonas / Marsas', desc: 'Mėnulis Skorpione teikia intensyvumo, gylio ir galingų emocinių instinktų. Viską jaučiate labai giliai, trokštate transformacijos ir traukia paslėpti gyvenimo sluoksniai.' },
    { name: 'Šaulys', symbol: '♐', element: 'Ugnis', ruling: 'Jupiteris', desc: 'Mėnulis Šaulyje teikia optimizmo, laisvės ir nenumaldomo tyrinėjimo poreikio. Emocijos entuziastingos ir filosofiškos. Jums reikia erdvės, nuotykių ir prasmės jausmui patirti.' },
    { name: 'Ožiaragis', symbol: '♑', element: 'Žemė', ruling: 'Saturnas', desc: 'Mėnulis Ožiaragyje teikia emocinio discipliniškumo, ambicijų ir savarankiškumo. Jausmai internalizuojami ir reiškiami per pasiekimus. Vertinate atsakomybę ir ilgalaikį saugumą.' },
    { name: 'Vandenis', symbol: '♒', element: 'Oras', ruling: 'Uranas / Saturnas', desc: 'Mėnulis Vandenyje teikia nepriklausomybės, originalumo ir emocinio atsiribojimo. Jausmus apdorojate intelektualiai ir traukia humanistiniai idealai bei socialinės reformos.' },
    { name: 'Žuvys', symbol: '♓', element: 'Vanduo', ruling: 'Neptūnas / Jupiteris', desc: 'Mėnulis Žuvyse teikia gilios empatijos, vaizduotės ir dvasinio jautrumo. Emocijos beribės ir intuityvios — įsisavinate aplinkinių jausmus ir sapnuojate nepaprasto ryškumo sapnus.' },
  ],
};

function julianDay(year: number, month: number, day: number, utcHour: number): number {
  let y = year;
  let m = month;
  const d = day + utcHour / 24;
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
}

function getMoonLongitude(year: number, month: number, day: number, utcHour: number): number {
  const JD = julianDay(year, month, day, utcHour);
  const T = (JD - 2451545.0) / 36525;
  const r = (d: number) => d * Math.PI / 180;
  const n = (d: number) => ((d % 360) + 360) % 360;

  const L0 = n(218.3164477 + 481267.88123421 * T);
  const D  = n(297.8501921 + 445267.1114034 * T);
  const M  = n(357.5291092 + 35999.0502909 * T);
  const Mp = n(134.9633964 + 477198.8675055 * T);
  const F  = n(93.2720950 + 483202.0175233 * T);

  const Sl =
    6.288774 * Math.sin(r(Mp)) +
    1.274027 * Math.sin(r(2*D - Mp)) +
    0.658314 * Math.sin(r(2*D)) +
    0.213618 * Math.sin(r(2*Mp)) +
    -0.185116 * Math.sin(r(M)) +
    -0.114332 * Math.sin(r(2*F)) +
    0.058793 * Math.sin(r(2*D - 2*Mp)) +
    0.057066 * Math.sin(r(2*D - M - Mp)) +
    0.053322 * Math.sin(r(2*D + Mp)) +
    0.045758 * Math.sin(r(2*D - M)) +
    -0.040923 * Math.sin(r(M - Mp)) +
    -0.034720 * Math.sin(r(D)) +
    -0.030383 * Math.sin(r(M + Mp)) +
    0.015327 * Math.sin(r(2*D - 2*F)) +
    -0.012528 * Math.sin(r(Mp + 2*F)) +
    0.010980 * Math.sin(r(Mp - 2*F)) +
    0.010675 * Math.sin(r(4*D - Mp)) +
    0.010034 * Math.sin(r(3*Mp)) +
    0.008548 * Math.sin(r(4*D - 2*Mp)) +
    -0.007888 * Math.sin(r(2*D + M - Mp));

  return n(L0 + Sl);
}

function detectOffset(): number {
  const browser = -new Date().getTimezoneOffset() / 60;
  return UTC_OFFSETS.reduce((prev, curr) =>
    Math.abs(curr.value - browser) < Math.abs(prev.value - browser) ? curr : prev
  ).value;
}

function nowDateStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function nowTimeStr(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

type Result = { signIndex: number; warning: boolean };

function compute(dateStr: string, timeStr: string, offset: number): Result | null {
  if (!dateStr || !timeStr) return null;
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hh, mm] = timeStr.split(':').map(Number);
  const utcHour = hh + mm / 60 - offset;
  const lon = getMoonLongitude(year, month, day, utcHour);
  const signIndex = Math.floor(lon / 30);
  const deg = lon % 30;
  return { signIndex, warning: deg < 2 || deg > 28 };
}

export default function MoonSignCalculator({ locale }: { locale: string }) {
  const t = T[locale] ?? T.en;
  const signs = SIGNS[locale] ?? SIGNS.en;

  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [offset, setOffset] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const d = nowDateStr();
    const tm = nowTimeStr();
    const off = detectOffset();
    setDateStr(d);
    setTimeStr(tm);
    setOffset(off);
    setResult(compute(d, tm, off));
  }, []);

  function handleChange(d: string, tm: string, off: number) {
    setResult(compute(d, tm, off));
  }

  const sign = result != null ? signs[result.signIndex] : null;

  return (
    <div className={styles.msign}>
      <div className={styles.msign__form}>
        <div className={styles.msign__field}>
          <label className={styles.msign__label}>{t.dateLabel}</label>
          <input
            type="date"
            className={styles.msign__input}
            value={dateStr}
            onChange={(e) => { setDateStr(e.target.value); handleChange(e.target.value, timeStr, offset); }}
          />
        </div>

        <div className={styles.msign__row}>
          <div className={styles.msign__field}>
            <label className={styles.msign__label}>{t.timeLabel}</label>
            <input
              type="time"
              className={styles.msign__input}
              value={timeStr}
              onChange={(e) => { setTimeStr(e.target.value); handleChange(dateStr, e.target.value, offset); }}
            />
          </div>

          <div className={styles.msign__field}>
            <label className={styles.msign__label}>{t.tzLabel}</label>
            <select
              className={styles.msign__select}
              value={offset}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                setOffset(v);
                handleChange(dateStr, timeStr, v);
              }}
            >
              {UTC_OFFSETS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          className={styles.msign__input}
          style={{ background: 'var(--color-primary)', color: '#fff', fontWeight: 600, cursor: 'pointer', border: 'none' }}
          onClick={() => {
            const d = nowDateStr();
            const tm = nowTimeStr();
            const off = detectOffset();
            setDateStr(d);
            setTimeStr(tm);
            setOffset(off);
            setResult(compute(d, tm, off));
          }}
        >
          {t.nowBtn}
        </button>
      </div>

      {sign && result && (
        <div className={styles.msign__result}>
          <div className={styles.msign__header}>
            <div className={styles.msign__symbol}>{sign.symbol}</div>
            <div className={styles.msign__info}>
              <div className={styles.msign__name}>{t.moonIn} {sign.name}</div>
              <div className={styles.msign__badges}>
                <span className={styles.msign__badge}>{t.elementLabel}: {sign.element}</span>
                <span className={styles.msign__badge}>{t.rulingLabel}: {sign.ruling}</span>
              </div>
            </div>
          </div>

          <p className={styles.msign__desc}>{sign.desc}</p>

          {result.warning && (
            <div className={styles.msign__warning}>
              <div className={styles.msign__warning_title}>{t.warnTitle}</div>
              <div className={styles.msign__warning_text}>{t.warnText}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

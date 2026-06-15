import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import ClothingSizeConverter from './ClothingSizeConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/converter/units', label: 'Unit Converter' }, { href: '/converter/color', label: 'Color Converter' }, { href: '/converter/timezone', label: 'Timezone Converter' }, { href: '/converter/grade-system', label: 'Grade System Converter' }, { href: '/calculator/basic', label: 'Basic Calculator' }],
  ru: [{ href: '/converter/units', label: 'Конвертер единиц' }, { href: '/converter/color', label: 'Конвертер цветов' }, { href: '/converter/timezone', label: 'Конвертер часовых поясов' }, { href: '/converter/grade-system', label: 'Конвертер систем оценок' }, { href: '/calculator/basic', label: 'Простой калькулятор' }],
  uk: [{ href: '/converter/units', label: 'Конвертер одиниць' }, { href: '/converter/color', label: 'Конвертер кольорів' }, { href: '/converter/timezone', label: 'Конвертер часових поясів' }, { href: '/converter/grade-system', label: 'Конвертер систем оцінок' }, { href: '/calculator/basic', label: 'Простий калькулятор' }],
  fr: [{ href: '/converter/units', label: 'Convertisseur d\'unités' }, { href: '/converter/color', label: 'Convertisseur de couleurs' }, { href: '/converter/timezone', label: 'Convertisseur de fuseaux horaires' }, { href: '/converter/grade-system', label: 'Convertisseur de notes' }, { href: '/calculator/basic', label: 'Calculatrice basique' }],
  lt: [{ href: '/converter/units', label: 'Vienetų keitiklis' }, { href: '/converter/color', label: 'Spalvų keitiklis' }, { href: '/converter/timezone', label: 'Laiko juostų keitiklis' }, { href: '/converter/grade-system', label: 'Pažymių sistemų konverteris' }, { href: '/calculator/basic', label: 'Paprastas skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Clothing Size Converter — EU, US, UK, IT Sizes', description: 'Free clothing size converter. Convert men\'s and women\'s clothing sizes between EU, US, UK, and Italian standards for tops, pants, and shoes.', h1: 'Clothing Size Converter', subtitle: 'Convert men\'s and women\'s clothing and shoe sizes between EU, US, UK, and Italian standards.' },
  ru: { title: 'Конвертер размеров одежды — EU, US, UK, IT', description: 'Бесплатный конвертер размеров одежды. Переводите мужские и женские размеры между стандартами EU, US, UK и итальянским для верха, брюк и обуви.', h1: 'Конвертер размеров одежды', subtitle: 'Переводите мужские и женские размеры одежды и обуви между стандартами EU, US, UK и итальянским.' },
  uk: { title: 'Конвертер розмірів одягу — EU, US, UK, IT', description: 'Безкоштовний конвертер розмірів одягу. Переводьте чоловічі та жіночі розміри між стандартами EU, US, UK та італійським для верху, штанів і взуття.', h1: 'Конвертер розмірів одягу', subtitle: 'Переводьте чоловічі та жіночі розміри одягу й взуття між стандартами EU, US, UK та італійським.' },
  fr: { title: 'Convertisseur de tailles — EU, US, UK, IT', description: 'Convertisseur de tailles gratuit. Convertissez les tailles hommes et femmes entre les normes européennes, américaines, britanniques et italiennes.', h1: 'Convertisseur de tailles vêtements', subtitle: 'Convertissez les tailles hommes et femmes entre les normes européenne, américaine, britannique et italienne.' },
  lt: { title: 'Drabužių dydžių keitiklis — EU, US, UK, IT', description: 'Nemokamas drabužių dydžių keitiklis. Konvertuokite vyrų ir moterų dydžius tarp ES, JAV, JK ir Italijos standartų viršutinei aprangai, kelnėms ir avalynei.', h1: 'Drabužių dydžių keitiklis', subtitle: 'Konvertuokite vyrų ir moterų drabužių bei avalynės dydžius tarp ES, JAV, JK ir Italijos standartų.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Select your gender and clothing category (tops, pants, or shoes), then choose the sizing standard you know (EU, US, UK, IT, or INT). Click your size to instantly see its equivalents across all other standards. The highlighted card shows your source size. Note: sizes are approximate averages — always check brand-specific size guides when shopping.\n\nClothing sizes vary significantly between countries and even between brands within the same country. An EU 38 women\'s top is a US 8, UK 10, and IT 42 — four different numbers for the same garment. Knowing how to convert sizes helps avoid returns when shopping internationally online, especially from US, European, or Asian retailers.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the difference between EU and US clothing sizes?', a: 'EU sizes are based on body measurements in centimeters, while US sizes use a numerical or letter system (XS/S/M/L/XL or numerical for jeans). For example, an EU 48 men\'s jacket corresponds to US "L". Women\'s sizes differ too: EU 38 = US 8 for tops.' },
      { q: 'How do UK clothing sizes compare to EU?', a: 'UK women\'s sizes typically run about 4 numbers lower than EU sizes (EU 36 = UK 8). UK men\'s clothing often uses the same letter system (S/M/L) but shoes differ significantly: UK sizes run about 1 full size below EU.' },
      { q: 'What does "INT" size mean?', a: 'INT (International) refers to the generic letter-based system: XXS, XS, S, M, L, XL, XXL, 3XL, 4XL. It is widely used by sportswear and casual brands globally, though exact measurements vary between manufacturers.' },
      { q: 'Are Italian clothing sizes different from EU sizes?', a: 'Italian (IT) sizes typically match EU numeric sizes exactly for most garments (IT 46 = EU 46 for men\'s jackets). However, some Italian luxury brands cut slightly smaller, so it\'s always worth checking the brand\'s own size chart.' },
      { q: 'Why do sizes vary between brands?', a: 'Clothing sizes are not standardized across manufacturers. A "size M" from one brand may differ by 2–5 cm from another brand\'s "M". This is especially true for jeans, where the fit (slim, regular, loose) also plays a major role.' },
      { q: 'How do US and EU shoe sizes compare?', a: 'EU shoe sizes are based on foot length in Paris points (2/3 cm). A rough formula: EU size ≈ US men\'s size + 31, EU size ≈ US women\'s size + 30. For example, EU 42 ≈ US men\'s 9, EU 38 ≈ US women\'s 8. Always measure your foot in cm for the most accurate match.' },
      { q: 'What is "plus size" in different countries?', a: 'Plus size varies by country: in the US it typically starts at size 14W (or EU 44); in the UK it starts at size 16; in France/EU it starts around size 46–48. Some brands use "extended sizes" or "curve" ranges. This converter covers standard sizes — very large sizes may fall outside the comparison table.' },
      { q: 'How do I measure myself for the most accurate size?', a: 'For tops: measure your chest (fullest part) and waist. For pants: measure waist and hips (widest point), plus inseam (crotch to ankle). For shoes: measure foot length from heel to longest toe in cm (measure in the afternoon when feet are slightly swollen). Use these measurements against the brand\'s size chart rather than relying only on size conversions.' },
      { q: 'What is the difference between slim, regular, and loose fit?', a: 'Fit describes how the garment sits on your body — a slim-cut EU 48 jacket will feel tighter than a regular-cut EU 48 from the same brand. Slim fit follows body contours, regular fit gives 2–4 cm ease, and loose/relaxed fit provides 5+ cm ease. The size number stays the same, only the cut changes.' },
      { q: 'Does this converter include children\'s sizes?', a: 'No — this tool covers adult sizes only. Children\'s clothing uses a different system based on age or height in cm (e.g., 110 cm = approx. 4–5 years in the EU system). For children, measure height and weight and use the brand\'s specific age/height chart.' },
    ],
  },
  ru: {
    description: 'Выберите пол и категорию одежды (верх, брюки или обувь), затем укажите известный вам стандарт (EU, US, UK, IT или INT). Нажмите на свой размер, чтобы мгновенно увидеть соответствие во всех остальных стандартах. Выделенная карточка показывает исходный размер. Примечание: размеры являются приблизительными — всегда проверяйте таблицу размеров конкретного бренда.\n\nРазмеры одежды существенно различаются в разных странах. EU 38 для женской одежды — это US 8, UK 10 и IT 42 — четыре разных числа для одного и того же изделия. Знание правил перевода размеров поможет избежать возвратов при заказе одежды в зарубежных интернет-магазинах.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'В чём разница между европейским и американским размерами?', a: 'Европейские размеры основаны на измерениях тела в сантиметрах, американские используют числовую или буквенную систему. Например, EU 48 для мужского пиджака соответствует US "L". Женские размеры: EU 38 = US 8.' },
      { q: 'Как британские размеры соотносятся с европейскими?', a: 'Женские UK-размеры примерно на 4 единицы ниже EU (EU 36 = UK 8). Для мужской одежды часто используется та же буквенная система, но обувь отличается: UK примерно на 1 размер меньше EU.' },
      { q: 'Что означает размер "INT"?', a: 'INT (международный) — универсальная буквенная система: XXS, XS, S, M, L, XL, XXL и т.д. Широко используется спортивными и casual-брендами по всему миру, хотя точные измерения варьируются у разных производителей.' },
      { q: 'Отличаются ли итальянские размеры от европейских?', a: 'Итальянские размеры (IT) в большинстве случаев совпадают с европейскими числовыми (IT 46 = EU 46 для мужских пиджаков). Однако некоторые итальянские бренды класса люкс шьют немного меньше.' },
      { q: 'Почему размеры отличаются у разных брендов?', a: 'Размеры одежды не стандартизированы между производителями. «Размер M» одного бренда может отличаться на 2–5 см от «M» другого. Особенно это касается джинсов, где посадка тоже играет роль.' },
      { q: 'Как соотносятся американские и европейские размеры обуви?', a: 'Размер обуви EU основан на длине стопы в «парижских пунктах» (2/3 см). Приблизительная формула: EU ≈ US мужской + 31, EU ≈ US женский + 30. Например, EU 42 ≈ US мужской 9. Для точного подбора измерьте длину стопы в сантиметрах.' },
      { q: 'Что такое plus size в разных странах?', a: 'В США plus size начинается примерно с размера 14W (EU 44), в Великобритании — с размера 16, во Франции/ЕС — около 46–48. Этот конвертер охватывает стандартные размеры — очень большие размеры могут не попасть в таблицу сравнения.' },
      { q: 'Как правильно измерить себя для точного подбора размера?', a: 'Для верха: обхват груди (самая широкая часть) и талия. Для брюк: обхват талии и бёдер (самая широкая часть), длина шага (от паха до лодыжки). Для обуви: длина стопы от пятки до кончика самого длинного пальца в см (измеряйте во второй половине дня). Используйте эти мерки с таблицей размеров конкретного бренда.' },
      { q: 'В чём разница между зауженным, прямым и свободным кроем?', a: 'Крой описывает посадку изделия на теле. Зауженный (slim) крой плотно облегает фигуру, прямой (regular) даёт 2–4 см свободы, свободный (loose/relaxed) — 5+ см. Размерное число остаётся одинаковым — меняется только силуэт.' },
      { q: 'Есть ли в конвертере детские размеры?', a: 'Нет — инструмент охватывает только взрослые размеры. Детская одежда использует другую систему: по возрасту или росту в см (например, 110 см ≈ 4–5 лет в системе ЕС). Для детей измерьте рост и вес и используйте таблицу конкретного бренда.' },
    ],
  },
  uk: {
    description: 'Оберіть стать і категорію одягу (верх, штани або взуття), потім вкажіть відомий вам стандарт (EU, US, UK, IT або INT). Натисніть на свій розмір, щоб миттєво побачити відповідність в усіх інших стандартах. Примітка: розміри є приблизними — завжди перевіряйте таблицю розмірів конкретного бренду.\n\nРозміри одягу суттєво відрізняються в різних країнах. EU 38 для жіночого одягу — це US 8, UK 10 і IT 42 — чотири різних числа для одного і того ж виробу. Знання правил переведення розмірів допоможе уникнути повернень при замовленні одягу в зарубіжних інтернет-магазинах.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'У чому різниця між європейськими та американськими розмірами?', a: 'Європейські розміри засновані на вимірюваннях тіла в сантиметрах, американські використовують числову або літерну систему. Наприклад, EU 48 для чоловічого піджака відповідає US "L".' },
      { q: 'Як британські розміри співвідносяться з європейськими?', a: 'Жіночі UK-розміри приблизно на 4 одиниці нижче EU (EU 36 = UK 8). Для взуття UK приблизно на 1 розмір менше EU.' },
      { q: 'Що означає розмір "INT"?', a: 'INT (міжнародний) — універсальна літерна система: XXS, XS, S, M, L, XL, XXL тощо. Широко використовується спортивними та casual-брендами, хоча точні вимірювання варіюються у різних виробників.' },
      { q: 'Чи відрізняються італійські розміри від європейських?', a: 'Італійські розміри (IT) здебільшого збігаються з європейськими числовими (IT 46 = EU 46 для чоловічих піджаків). Деякі преміальні бренди шиють трохи менше.' },
      { q: 'Чому розміри відрізняються у різних брендів?', a: 'Розміри одягу не стандартизовані між виробниками. «Розмір M» одного бренду може відрізнятися на 2–5 см від «M» іншого. Особливо це стосується джинсів.' },
      { q: 'Як співвідносяться американські та європейські розміри взуття?', a: 'Розмір взуття EU заснований на довжині стопи в «паризьких пунктах» (2/3 см). Приблизна формула: EU ≈ US чоловічий + 31, EU ≈ US жіночий + 30. Наприклад, EU 42 ≈ US чоловічий 9. Для точного підбору виміряйте довжину стопи в сантиметрах.' },
      { q: 'Що таке plus size у різних країнах?', a: 'У США plus size починається приблизно з розміру 14W (EU 44), у Великій Британії — з розміру 16, у Франції/ЄС — близько 46–48. Цей конвертер охоплює стандартні розміри.' },
      { q: 'Як правильно виміряти себе для точного підбору розміру?', a: 'Для верху: обхват грудей (найширша частина) і талія. Для штанів: обхват талії і стегон, довжина кроку. Для взуття: довжина стопи від п\'яти до кінчика найдовшого пальця в см (вимірюйте у другій половині дня). Використовуйте ці мірки разом з таблицею розмірів конкретного бренду.' },
      { q: 'У чому різниця між зауженим, прямим та вільним кроєм?', a: 'Крій описує посадку виробу на тілі. Зауженим (slim) кроєм щільно облягає фігуру, прямим (regular) дає 2–4 см свободи, вільним (loose) — 5+ см. Розмірне число залишається однаковим — змінюється лише силует.' },
      { q: 'Чи є в конвертері дитячі розміри?', a: 'Ні — інструмент охоплює лише дорослі розміри. Дитячий одяг використовує іншу систему: за віком або зростом у см (наприклад, 110 см ≈ 4–5 років у системі ЄС). Для дітей виміряйте зріст і використовуйте таблицю конкретного бренду.' },
    ],
  },
  fr: {
    description: 'Sélectionnez votre sexe et la catégorie de vêtements (hauts, pantalons ou chaussures), puis choisissez la norme que vous connaissez (EU, US, UK, IT ou INT). Cliquez sur votre taille pour voir instantanément les équivalences dans tous les autres standards. Note : les tailles sont des moyennes approximatives — vérifiez toujours le guide des tailles de la marque.\n\nLes tailles vestimentaires varient considérablement d\'un pays à l\'autre. Un EU 38 féminin équivaut à US 8, UK 10 et IT 42 — quatre numéros différents pour le même vêtement. Connaître les conversions aide à éviter les retours lors d\'achats en ligne à l\'international, notamment depuis des sites américains, européens ou asiatiques.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quelle est la différence entre les tailles EU et US ?', a: 'Les tailles EU sont basées sur les mensurations corporelles en centimètres, tandis que les tailles US utilisent un système numérique ou de lettres. Par exemple, une veste EU 48 homme correspond à US "L".' },
      { q: 'Comment les tailles UK se comparent-elles aux tailles EU ?', a: 'Les tailles femmes UK sont généralement 4 numéros inférieures aux tailles EU (EU 36 = UK 8). Pour les chaussures, les tailles UK sont environ 1 taille en dessous des tailles EU.' },
      { q: 'Que signifie la taille "INT" ?', a: 'INT (International) désigne le système générique de lettres : XXS, XS, S, M, L, XL, XXL, etc. Largement utilisé par les marques de sport et de mode décontractée, bien que les mesures exactes varient selon les fabricants.' },
      { q: 'Les tailles italiennes diffèrent-elles des tailles EU ?', a: 'Les tailles italiennes (IT) correspondent généralement aux tailles EU numériques (IT 46 = EU 46 pour les vestes homme). Certaines marques de luxe italiennes taillent légèrement plus petit.' },
      { q: 'Pourquoi les tailles varient-elles selon les marques ?', a: 'Les tailles vestimentaires ne sont pas standardisées entre les fabricants. Un "taille M" d\'une marque peut différer de 2 à 5 cm de celui d\'une autre marque.' },
      { q: 'Comment se comparent les pointures US et EU ?', a: 'Les pointures EU sont basées sur la longueur du pied en points de Paris (2/3 cm). Formule approximative : EU ≈ US homme + 31, EU ≈ US femme + 30. Par exemple, EU 42 ≈ US homme 9. Mesurez votre pied en cm pour un résultat précis.' },
      { q: 'Qu\'est-ce que le "grande taille" dans différents pays ?', a: 'En France/EU, les grandes tailles commencent vers le 46–48 ; au Royaume-Uni, à partir du size 16 ; aux États-Unis, à partir du 14W (EU 44). Ce convertisseur couvre les tailles standard — les très grandes tailles peuvent dépasser le tableau.' },
      { q: 'Comment prendre ses mesures pour trouver la bonne taille ?', a: 'Hauts : tour de poitrine (partie la plus large) et tour de taille. Bas : tour de taille et tour de hanches (partie la plus large), entrejambe. Chaussures : longueur du pied de talon au bout du plus long orteil en cm (mesurer l\'après-midi). Utilisez ces mesures avec le guide des tailles de la marque.' },
      { q: 'Quelle est la différence entre coupe slim, regular et loose ?', a: 'La coupe décrit comment le vêtement tombe sur le corps. La coupe slim épouse les formes, regular laisse 2 à 4 cm d\'aisance, loose/relaxed en donne 5+ cm. Le numéro de taille reste identique — seule la coupe change.' },
      { q: 'Ce convertisseur inclut-il les tailles enfants ?', a: 'Non — cet outil couvre uniquement les tailles adultes. Les vêtements enfants utilisent un système différent basé sur l\'âge ou la taille en cm (ex : 110 cm ≈ 4–5 ans selon le système européen). Pour les enfants, mesurez la taille et utilisez le guide spécifique de la marque.' },
    ],
  },
  lt: {
    description: 'Pasirinkite lytį ir drabužių kategoriją (viršutinė dalis, kelnės ar avalynė), tada nurodykite žinomą standartą (EU, US, UK, IT ar INT). Spustelėkite savo dydį, kad akimirksniu pamatytumėte atitikimą visuose kituose standartuose. Pastaba: dydžiai yra apytiksliai — visada tikrinkite konkrečios prekės ženklo dydžių lentelę.\n\nDrabužių dydžiai labai skiriasi skirtingose šalyse. EU 38 moterų drabužiams atitinka US 8, UK 10 ir IT 42 — keturi skirtingi skaičiai tam pačiam drabužiui. Mokėjimas konvertuoti dydžius padeda išvengti grąžinimų perkant drabužius tarptautinėse internetinėse parduotuvėse.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Koks skirtumas tarp ES ir JAV drabužių dydžių?', a: 'ES dydžiai pagrįsti kūno matmenimis centimetrais, o JAV naudojama skaitinė arba raidinė sistema. Pavyzdžiui, vyriškas švarkas EU 48 atitinka US „L".' },
      { q: 'Kaip JK dydžiai lyginami su ES dydžiais?', a: 'Moterų JK dydžiai paprastai yra maždaug 4 vienetais mažesni nei ES (EU 36 = UK 8). Avalynėje JK dydžiai yra maždaug 1 dydžiu mažesni nei ES.' },
      { q: 'Ką reiškia dydis „INT"?', a: 'INT (tarptautinis) reiškia bendrą raidinę sistemą: XXS, XS, S, M, L, XL, XXL ir kt. Plačiai naudojama sportinių ir laisvalaikio prekių ženklų, nors tikslūs matmenys skiriasi.' },
      { q: 'Ar italų drabužių dydžiai skiriasi nuo ES?', a: 'Italų (IT) dydžiai dažniausiai sutampa su ES skaitiniais dydžiais (IT 46 = EU 46 vyriškiems švarkams). Kai kurie itališki prabangos prekių ženklai pjauna šiek tiek mažiau.' },
      { q: 'Kodėl dydžiai skiriasi priklausomai nuo prekės ženklo?', a: 'Drabužių dydžiai nėra standartizuoti tarp gamintojų. Vieno prekės ženklo „M dydis" gali skirtis 2–5 cm nuo kito. Tai ypač aktualu džinsams.' },
      { q: 'Kaip JAV ir ES batų dydžiai atitinka vienas kitą?', a: 'ES batų dydžiai pagrįsti pėdos ilgiu Paryžiaus taškais (2/3 cm). Apytikslė formulė: ES ≈ JAV vyriški + 31, ES ≈ JAV moteriški + 30. Pvz., EU 42 ≈ JAV vyriški 9. Tiksliam dydžiui išmatuokite pėdos ilgį centimetrais.' },
      { q: 'Kas yra „plus size" skirtingose šalyse?', a: 'JAV „plus size" prasideda maždaug nuo 14W dydžio (EU 44), JK — nuo 16 dydžio, Prancūzijoje/ES — apie 46–48. Šis keitiklis apima standartinius dydžius — labai dideli dydžiai gali nepatekti į palyginimo lentelę.' },
      { q: 'Kaip teisingai apsimati, norint tiksliai nustatyti dydį?', a: 'Viršutiniai drabužiai: krūtinės apimtis (plačiausia vieta) ir juosmuo. Kelnės: juosmuo, klubai (plačiausia vieta) ir kojų ilgis. Avalynė: pėdos ilgis nuo kulno iki ilgiausio piršto galiuko centimetrais (matuokite popiet). Naudokite šiuos matmenis su konkretaus prekės ženklo dydžių lentele.' },
      { q: 'Koks skirtumas tarp slim, regular ir loose kerpimo?', a: 'Kerpimas apibūdina, kaip drabužis sėdi ant kūno. Slim kerpimas glaudžiai liečia kūną, regular suteikia 2–4 cm laisvės, loose/relaxed — 5+ cm. Dydžio numeris išlieka toks pat — keičiasi tik siluetas.' },
      { q: 'Ar šiame keitiklyje yra vaikų dydžiai?', a: 'Ne — šis įrankis apima tik suaugusiųjų dydžius. Vaikų drabužiai naudoja kitą sistemą, pagrįstą amžiumi arba ūgiu centimetrais (pvz., 110 cm ≈ 4–5 metai ES sistemoje). Vaikams išmatuokite ūgį ir naudokite konkretaus prekės ženklo lentelę.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/converter/clothing-size', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ClothingSizePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/converter/clothing-size`,
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
        <RelatedTools locale={locale} tools={related} />
        <ToolActions />
        <ClothingSizeConverter locale={locale} />
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

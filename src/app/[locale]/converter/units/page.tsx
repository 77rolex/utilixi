import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import UnitConverter from './UnitConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import FaqSection from '@/components/ui/FaqSection';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/converter/color', label: 'Color Converter' }, { href: '/converter/clothing-size', label: 'Clothing Size Converter' }, { href: '/converter/timezone', label: 'Timezone Converter' }, { href: '/calculator/basic', label: 'Basic Calculator' }, { href: '/converter/grade-system', label: 'Grade System Converter' }],
  ru: [{ href: '/converter/color', label: 'Конвертер цветов' }, { href: '/converter/clothing-size', label: 'Конвертер размеров одежды' }, { href: '/converter/timezone', label: 'Конвертер часовых поясов' }, { href: '/calculator/basic', label: 'Простой калькулятор' }, { href: '/converter/grade-system', label: 'Конвертер систем оценок' }],
  uk: [{ href: '/converter/color', label: 'Конвертер кольорів' }, { href: '/converter/clothing-size', label: 'Конвертер розмірів одягу' }, { href: '/converter/timezone', label: 'Конвертер часових поясів' }, { href: '/calculator/basic', label: 'Простий калькулятор' }, { href: '/converter/grade-system', label: 'Конвертер систем оцінок' }],
  fr: [{ href: '/converter/color', label: 'Convertisseur de couleurs' }, { href: '/converter/clothing-size', label: 'Convertisseur de tailles' }, { href: '/converter/timezone', label: 'Convertisseur de fuseaux horaires' }, { href: '/calculator/basic', label: 'Calculatrice basique' }, { href: '/converter/grade-system', label: 'Convertisseur de notes' }],
  lt: [{ href: '/converter/color', label: 'Spalvų keitiklis' }, { href: '/converter/clothing-size', label: 'Drabužių dydžių keitiklis' }, { href: '/converter/timezone', label: 'Laiko juostų keitiklis' }, { href: '/calculator/basic', label: 'Paprastas skaičiuotuvas' }, { href: '/converter/grade-system', label: 'Pažymių sistemų konverteris' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Unit Converter — Length, Weight, Temperature & More', description: 'Free online unit converter. Convert length, weight, temperature, volume, area, speed, and digital storage units instantly. No ads, no sign-up.', h1: 'Unit Converter', subtitle: 'Convert length, weight, temperature, volume, area, speed, and data units instantly.' },
  ru: { title: 'Конвертер единиц — длина, вес, температура и другое', description: 'Бесплатный онлайн конвертер единиц измерения. Конвертируйте длину, массу, температуру, объём, площадь, скорость и данные мгновенно.', h1: 'Конвертер единиц', subtitle: 'Мгновенно конвертируйте единицы длины, массы, температуры, объёма, площади, скорости и данных.' },
  uk: { title: 'Конвертер одиниць — довжина, вага, температура та інше', description: 'Безкоштовний онлайн конвертер одиниць виміру. Конвертуйте довжину, масу, температуру, об\'єм, площу, швидкість і дані миттєво.', h1: 'Конвертер одиниць', subtitle: 'Миттєво конвертуйте одиниці довжини, маси, температури, об\'єму, площі, швидкості та даних.' },
  fr: { title: 'Convertisseur d\'unités — Longueur, Poids, Température et plus', description: 'Convertisseur d\'unités gratuit en ligne. Convertissez longueur, masse, température, volume, superficie, vitesse et données numériques instantanément.', h1: 'Convertisseur d\'unités', subtitle: 'Convertissez instantanément les unités de longueur, masse, température, volume, superficie, vitesse et données.' },
  lt: { title: 'Vienetų Keitiklis — Ilgis, Svoris, Temperatūra ir daugiau', description: 'Nemokamas vienetų keitiklis internete. Akimirksniu konvertuokite ilgį, masę, temperatūrą, tūrį, plotą, greitį ir skaitmeninius vienetus.', h1: 'Vienetų keitiklis', subtitle: 'Akimirksniu konvertuokite ilgio, masės, temperatūros, tūrio, ploto, greičio ir duomenų vienetus.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This unit converter supports 7 categories with dozens of units. Select a category (length, weight, temperature, volume, area, speed, or digital storage), choose the units to convert between, enter a value, and the result appears instantly. Use the swap button to reverse the conversion direction.\n\nUnit conversion is essential across travel, science, cooking, and engineering. The metric system (SI) is used in most of the world, while the US and partially the UK still use imperial/US customary units. Knowing key conversions — such as miles to kilometres, Fahrenheit to Celsius, or gallons to litres — helps you work seamlessly across both systems.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How many meters are in a mile?', a: 'One mile equals exactly 1609.344 meters. Conversely, one meter equals approximately 0.000621371 miles. For rough estimates: 1 mile ≈ 1.6 km.' },
      { q: 'How do you convert Celsius to Fahrenheit?', a: 'The formula is °F = °C × 9/5 + 32. For example, 20°C = 68°F. To convert back: °C = (°F − 32) × 5/9. Absolute zero is −273.15°C = −459.67°F = 0 K.' },
      { q: 'What is the difference between KB and KiB?', a: 'KB (Kilobyte) = 1000 bytes in the decimal SI system. KiB (Kibibyte) = 1024 bytes in the binary IEC system. Operating systems often report file sizes in KiB/MiB/GiB but label them as KB/MB/GB, causing confusion. This converter uses the standard definitions: 1 KB = 1000 B, 1 KiB = 1024 B.' },
      { q: 'How many pounds in a kilogram?', a: 'One kilogram equals approximately 2.20462 pounds. One pound equals approximately 0.453592 kg. For a quick estimate, 1 kg ≈ 2.2 lb.' },
      { q: 'What are knots in speed?', a: 'A knot (kn) is one nautical mile per hour, where 1 nautical mile = 1852 m. It is used in aviation and maritime navigation. 1 knot ≈ 1.852 km/h ≈ 1.151 mph.' },
      { q: 'How do you convert square feet to square meters?', a: 'Multiply square feet by 0.092903. For example, 500 sq ft × 0.092903 = 46.45 m². To go the other way, multiply m² by 10.7639. This conversion is common in real estate when comparing US listings to international markets.' },
      { q: 'How many liters are in a gallon?', a: 'In the US system, 1 US gallon = 3.78541 liters. In the UK (Imperial) system, 1 Imperial gallon = 4.54609 liters. To convert US gallons to liters, multiply by 3.785. To convert liters to US gallons, divide by 3.785.' },
      { q: 'What is the difference between US and Imperial gallons?', a: 'A US gallon equals 3.785 liters, while a UK Imperial gallon equals 4.546 liters — about 20% larger. This difference matters for fuel economy: a car rated at 30 mpg (US) gets about 36 mpg (UK). Always check which system is used when comparing fuel consumption.' },
      { q: 'How do you convert km/h to mph?', a: 'Divide km/h by 1.60934. For a quick mental estimate, multiply by 0.6: 100 km/h ≈ 62 mph, 80 km/h ≈ 50 mph. To convert mph to km/h, multiply by 1.60934.' },
      { q: 'What is the difference between metric and imperial systems?', a: 'The metric (SI) system uses base-10 units — metres, kilograms, litres — and is used by most of the world. The imperial/US customary system uses feet, pounds, and gallons, still common in the US and partially in the UK. Science, medicine, and international trade universally use metric; everyday US life uses imperial for distance, weight, and volume.' },
    ],
  },
  ru: {
    description: 'Конвертер поддерживает 7 категорий с десятками единиц. Выберите категорию (длина, масса, температура, объём, площадь, скорость или данные), единицы для конвертации, введите значение — результат появится мгновенно. Кнопка «Поменять» меняет направление конвертации.\n\nПеревод единиц измерения необходим в путешествиях, науке, кулинарии и технике. Метрическая система (СИ) используется в большинстве стран, тогда как США и частично Великобритания используют имперские единицы. Знание ключевых соответствий — мили в километры, Фаренгейт в Цельсий, галлоны в литры — поможет работать в обоих системах.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Сколько метров в миле?', a: 'В одной миле ровно 1609,344 метра. Один метр равен примерно 0,000621371 мили. Для приближённых расчётов: 1 миля ≈ 1,6 км.' },
      { q: 'Как перевести Цельсий в Фаренгейт?', a: 'Формула: °F = °C × 9/5 + 32. Например, 20°C = 68°F. Обратный перевод: °C = (°F − 32) × 5/9. Абсолютный ноль: −273,15°C = −459,67°F = 0 К.' },
      { q: 'В чём разница между КБ и КиБ?', a: 'КБ (Килобайт) = 1000 байт (десятичная система SI). КиБ (Кибибайт) = 1024 байт (двоичная система IEC). ОС часто отображают размеры в КиБ/МиБ/ГиБ, называя их КБ/МБ/ГБ, что вызывает путаницу. Этот конвертер использует стандартные определения: 1 КБ = 1000 Б, 1 КиБ = 1024 Б.' },
      { q: 'Сколько фунтов в килограмме?', a: 'Один килограмм равен примерно 2,20462 фунта. Один фунт равен примерно 0,453592 кг. Для быстрой оценки: 1 кг ≈ 2,2 фунта.' },
      { q: 'Что такое узлы (knots) в скорости?', a: 'Узел (уз) — единица скорости, равная одной морской миле в час (1 морская миля = 1852 м). Используется в авиации и мореплавании. 1 уз ≈ 1,852 км/ч ≈ 1,151 мили/ч.' },
      { q: 'Как перевести квадратные футы в квадратные метры?', a: 'Умножьте квадратные футы на 0,092903. Например, 500 кв.фут × 0,092903 = 46,45 м². Для обратного расчёта умножьте м² на 10,7639. Этот перевод часто нужен при сравнении американской и международной недвижимости.' },
      { q: 'Сколько литров в галлоне?', a: 'В американской системе 1 галлон США = 3,78541 литра. В британской (имперской) системе 1 имперский галлон = 4,54609 литра. Для перевода галлонов США в литры умножьте на 3,785.' },
      { q: 'В чём разница между американским и имперским галлонами?', a: 'Американский галлон = 3,785 л, британский имперский = 4,546 л — примерно на 20% больше. Это важно при сравнении расхода топлива: 30 mpg (США) ≈ 36 mpg (Великобритания).' },
      { q: 'Как перевести км/ч в мили/ч?', a: 'Разделите км/ч на 1,60934. Для быстрой оценки умножьте на 0,6: 100 км/ч ≈ 62 мили/ч, 80 км/ч ≈ 50 мили/ч. Для обратного расчёта умножьте мили/ч на 1,60934.' },
      { q: 'В чём разница между метрической и имперской системами?', a: 'Метрическая (СИ) система использует десятичные единицы — метры, килограммы, литры — и принята в большинстве стран. Имперская/американская система использует футы, фунты и галлоны. Наука, медицина и международная торговля повсеместно используют метрическую систему.' },
    ],
  },
  uk: {
    description: 'Конвертер підтримує 7 категорій з десятками одиниць. Оберіть категорію (довжина, маса, температура, об\'єм, площа, швидкість або дані), одиниці для конвертації, введіть значення — результат з\'явиться миттєво. Кнопка «Поміняти» змінює напрямок конвертації.\n\nПереведення одиниць виміру необхідне в подорожах, науці, кулінарії та техніці. Метрична система (СІ) використовується в більшості країн, тоді як США і частково Велика Британія використовують імперські одиниці. Знання ключових відповідностей — милі в кілометри, Фаренгейт у Цельсій, галони в літри — допоможе працювати в обох системах.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Скільки метрів у милі?', a: 'В одній милі рівно 1609,344 метра. Один метр дорівнює приблизно 0,000621371 милі. Для приблизних розрахунків: 1 миля ≈ 1,6 км.' },
      { q: 'Як перевести Цельсій у Фаренгейт?', a: 'Формула: °F = °C × 9/5 + 32. Наприклад, 20°C = 68°F. Зворотний переклад: °C = (°F − 32) × 5/9.' },
      { q: 'У чому різниця між КБ і КіБ?', a: 'КБ (Кілобайт) = 1000 байт (десяткова система SI). КіБ (Кібібайт) = 1024 байт (двійкова система IEC). ОС часто відображають розміри в КіБ/МіБ/ГіБ, називаючи їх КБ/МБ/ГБ.' },
      { q: 'Скільки фунтів у кілограмі?', a: 'Один кілограм дорівнює приблизно 2,20462 фунта. Один фунт дорівнює приблизно 0,453592 кг. Для швидкої оцінки: 1 кг ≈ 2,2 фунта.' },
      { q: 'Що таке вузли (knots) у швидкості?', a: 'Вузол — одиниця швидкості, що дорівнює одній морській милі на годину (1 морська миля = 1852 м). Використовується в авіації та судноплавстві. 1 вуз ≈ 1,852 км/год ≈ 1,151 миль/год.' },
      { q: 'Як перевести квадратні фути у квадратні метри?', a: 'Помножте квадратні фути на 0,092903. Наприклад, 500 кв.фут × 0,092903 = 46,45 м². Для зворотного розрахунку помножте м² на 10,7639.' },
      { q: 'Скільки літрів у галоні?', a: 'В американській системі 1 галон США = 3,78541 літра. В британській (імперській) системі 1 імперський галон = 4,54609 літра. Для переведення галонів США в літри помножте на 3,785.' },
      { q: 'У чому різниця між американським та імперським галонами?', a: 'Американський галон = 3,785 л, британський імперський = 4,546 л — приблизно на 20% більше. Це важливо при порівнянні витрати палива: 30 mpg (США) ≈ 36 mpg (Велика Британія).' },
      { q: 'Як перевести км/год у милі/год?', a: 'Розділіть км/год на 1,60934. Для швидкої оцінки помножте на 0,6: 100 км/год ≈ 62 миль/год. Для зворотного розрахунку помножте миль/год на 1,60934.' },
      { q: 'У чому різниця між метричною та імперською системами?', a: 'Метрична (СІ) система використовує десяткові одиниці — метри, кілограми, літри — і прийнята в більшості країн. Імперська/американська система використовує фути, фунти та галони. Наука, медицина і міжнародна торгівля повсюдно використовують метричну систему.' },
    ],
  },
  fr: {
    description: 'Ce convertisseur supporte 7 catégories avec des dizaines d\'unités. Sélectionnez une catégorie (longueur, masse, température, volume, superficie, vitesse ou données numériques), choisissez les unités, entrez une valeur — le résultat s\'affiche instantanément. Le bouton Inverser échange les deux unités.\n\nLa conversion d\'unités est essentielle en voyage, sciences, cuisine et ingénierie. Le système métrique (SI) est utilisé dans la plupart des pays, tandis que les États-Unis et partiellement le Royaume-Uni utilisent encore les unités impériales. Connaître les conversions clés — miles en kilomètres, Fahrenheit en Celsius, gallons en litres — facilite le travail dans les deux systèmes.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Combien de mètres dans un mile ?', a: 'Un mile équivaut exactement à 1609,344 mètres. Un mètre équivaut à environ 0,000621371 mile. Pour les estimations rapides : 1 mile ≈ 1,6 km.' },
      { q: 'Comment convertir Celsius en Fahrenheit ?', a: 'La formule est °F = °C × 9/5 + 32. Par exemple, 20°C = 68°F. Conversion inverse : °C = (°F − 32) × 5/9. Le zéro absolu est −273,15°C = 0 K.' },
      { q: 'Quelle est la différence entre Ko et Kio ?', a: 'Ko (Kilooctet) = 1000 octets (système décimal SI). Kio (Kibioctet) = 1024 octets (système binaire CEI). Les systèmes d\'exploitation affichent souvent des tailles en Kio/Mio/Gio mais les étiquettent Ko/Mo/Go.' },
      { q: 'Combien de livres dans un kilogramme ?', a: 'Un kilogramme équivaut à environ 2,20462 livres. Une livre équivaut à environ 0,453592 kg. Pour une estimation rapide : 1 kg ≈ 2,2 lb.' },
      { q: 'Qu\'est-ce qu\'un nœud en vitesse ?', a: 'Un nœud (kn) est une unité de vitesse équivalant à un mille nautique par heure (1 mille nautique = 1852 m). Utilisé en aviation et navigation maritime. 1 nœud ≈ 1,852 km/h ≈ 1,151 mph.' },
      { q: 'Comment convertir les pieds carrés en mètres carrés ?', a: 'Multipliez les pieds carrés par 0,092903. Par exemple, 500 pi² × 0,092903 = 46,45 m². Dans l\'autre sens, multipliez m² par 10,7639. Utile pour comparer des biens immobiliers américains avec des annonces françaises en m².' },
      { q: 'Combien de litres dans un gallon ?', a: 'Dans le système américain, 1 gallon US = 3,785 litres. Dans le système britannique (impérial), 1 gallon impérial = 4,546 litres. Pour convertir des gallons US en litres, multipliez par 3,785.' },
      { q: 'Quelle est la différence entre gallon US et gallon impérial ?', a: 'Le gallon US = 3,785 L, le gallon impérial britannique = 4,546 L — environ 20 % de plus. Cela compte pour la consommation de carburant : 30 mpg (US) ≈ 36 mpg (UK). Vérifiez toujours quel système est utilisé.' },
      { q: 'Comment convertir km/h en mph ?', a: 'Divisez km/h par 1,60934. Pour une estimation mentale rapide, multipliez par 0,6 : 100 km/h ≈ 62 mph, 80 km/h ≈ 50 mph. Pour l\'inverse, multipliez mph par 1,60934.' },
      { q: 'Quelle est la différence entre système métrique et impérial ?', a: 'Le système métrique (SI) utilise des unités décimales — mètres, kilogrammes, litres — adopté par la quasi-totalité du monde. Le système impérial/US utilise pieds, livres et gallons. Les sciences, la médecine et le commerce international utilisent universellement le système métrique.' },
    ],
  },
  lt: {
    description: 'Šis keitiklis palaiko 7 kategorijas su dešimtimis vienetų. Pasirinkite kategoriją (ilgis, masė, temperatūra, tūris, plotas, greitis arba skaitmeniniai duomenys), vienetus ir įveskite reikšmę — rezultatas pasirodys akimirksniu. Mygtuku „Sukeisti" galima apkeisti konvertavimo kryptį.\n\nVienetų konvertavimas būtinas keliaujant, moksle, kulinarijoje ir inžinerijoje. Metrinė sistema (SI) naudojama daugumoje pasaulio šalių, tuo tarpu JAV ir iš dalies Didžioji Britanija vis dar naudoja imperinę sistemą. Žinant pagrindinius atitikimus — mylios į kilometrus, Farenheitas į Celsijų, galonai į litrus — galima lengvai dirbti abiejose sistemose.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kiek metrų yra mylioje?', a: 'Viena mylia lygi tiksliai 1609,344 metrų. Vienas metras lygus maždaug 0,000621371 mylios. Greitam įvertinimui: 1 mylia ≈ 1,6 km.' },
      { q: 'Kaip konvertuoti Celsijų į Farenheitą?', a: 'Formulė: °F = °C × 9/5 + 32. Pavyzdžiui, 20°C = 68°F. Atvirkštinis: °C = (°F − 32) × 5/9. Absoliutus nulis: −273,15°C = 0 K.' },
      { q: 'Kuo skiriasi KB ir KiB?', a: 'KB (kilobaitas) = 1000 baitų (dešimtainė SI sistema). KiB (kibibaitas) = 1024 baitai (dvejetainė IEC sistema). Operacinės sistemos dažnai rodo dydžius KiB/MiB/GiB, bet ženklina juos KB/MB/GB.' },
      { q: 'Kiek svarų yra kilogramą?', a: 'Vienas kilogramas lygus maždaug 2,20462 svaro. Vienas svaras lygus maždaug 0,453592 kg. Greitam įvertinimui: 1 kg ≈ 2,2 lb.' },
      { q: 'Kas yra mazgai greičio matavime?', a: 'Mazgas (kn) — greičio vienetas, lygus vienai jūrmylei per valandą (1 jūrmylė = 1852 m). Naudojamas aviacijoje ir laivyboje. 1 mazgas ≈ 1,852 km/h ≈ 1,151 mph.' },
      { q: 'Kaip konvertuoti kvadratinius pėdas į kvadratinius metrus?', a: 'Padauginkite kvadratinius pėdus iš 0,092903. Pavyzdžiui, 500 kv. pėdų × 0,092903 = 46,45 m². Atvirkščiai — padauginkite m² iš 10,7639.' },
      { q: 'Kiek litrų yra galione?', a: 'JAV sistemoje 1 JAV galonas = 3,785 litro. Didžiosios Britanijos (imperinėje) sistemoje 1 imperinis galonas = 4,546 litro. Norėdami konvertuoti JAV galonus į litrus, padauginkite iš 3,785.' },
      { q: 'Kuo skiriasi JAV ir imperinis galonas?', a: 'JAV galonas = 3,785 L, imperinis galonas = 4,546 L — maždaug 20 % didesnis. Tai svarbu lyginant degalų sąnaudas: 30 mpg (JAV) ≈ 36 mpg (JK).' },
      { q: 'Kaip konvertuoti km/h į mph?', a: 'Padalinkite km/h iš 1,60934. Greitam psichiniam skaičiavimui padauginkite iš 0,6: 100 km/h ≈ 62 mph. Atvirkščiai — padauginkite mph iš 1,60934.' },
      { q: 'Kuo skiriasi metrinė ir imperinė sistemos?', a: 'Metrinė (SI) sistema naudoja dešimtainius vienetus — metrus, kilogramus, litrus — ir priimta daugumoje šalių. Imperinė/JAV sistema naudoja pėdas, svarus ir galonus. Mokslas, medicina ir tarptautinė prekyba visuotinai naudoja metrinę sistemą.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/converter/units', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function UnitsPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/converter/units`,
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
        <UnitConverter locale={locale} />
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

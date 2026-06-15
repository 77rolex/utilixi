import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import MaterialCostCalculator from './MaterialCostCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/renovation', label: 'Renovation Cost Calculator' },
    { href: '/calculator/pool-volume', label: 'Pool Volume Calculator' },
    { href: '/calculator/property-tax', label: 'Property Tax Calculator' },
    { href: '/calculator/electricity-bill', label: 'Electricity Bill Calculator' },
    { href: '/calculator/net-worth', label: 'Net Worth Calculator' },
  ],
  ru: [
    { href: '/calculator/renovation', label: 'Калькулятор ремонта' },
    { href: '/calculator/pool-volume', label: 'Калькулятор объёма бассейна' },
    { href: '/calculator/property-tax', label: 'Калькулятор налога на имущество' },
    { href: '/calculator/electricity-bill', label: 'Калькулятор счёта за электричество' },
    { href: '/calculator/net-worth', label: 'Калькулятор капитала' },
  ],
  uk: [
    { href: '/calculator/renovation', label: 'Калькулятор ремонту' },
    { href: '/calculator/pool-volume', label: 'Калькулятор об\'єму басейну' },
    { href: '/calculator/property-tax', label: 'Калькулятор податку на майно' },
    { href: '/calculator/electricity-bill', label: 'Калькулятор рахунку за електроенергію' },
    { href: '/calculator/net-worth', label: 'Калькулятор капіталу' },
  ],
  fr: [
    { href: '/calculator/renovation', label: 'Calculatrice Rénovation' },
    { href: '/calculator/pool-volume', label: 'Calculatrice Volume Piscine' },
    { href: '/calculator/property-tax', label: 'Calculatrice Taxe Foncière' },
    { href: '/calculator/electricity-bill', label: 'Calculatrice Facture Électricité' },
    { href: '/calculator/net-worth', label: 'Calculatrice Valeur Nette' },
  ],
  lt: [
    { href: '/calculator/renovation', label: 'Renovacijos skaičiuotuvas' },
    { href: '/calculator/pool-volume', label: 'Baseino tūrio skaičiuotuvas' },
    { href: '/calculator/property-tax', label: 'Nekilnojamojo turto mokesčio skaičiuotuvas' },
    { href: '/calculator/electricity-bill', label: 'Elektros sąskaitos skaičiuotuvas' },
    { href: '/calculator/net-worth', label: 'Grynosios vertės skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Material Cost Calculator — Flooring, Paint & Concrete',
    description: 'Free material cost calculator for flooring, paint, and concrete. Calculate how much material you need and total cost for any room or area. Enter dimensions and price per unit.',
    h1: 'Material Cost Calculator',
    subtitle: 'Calculate how much flooring, paint, or concrete you need and the total cost for any room or area.',
  },
  ru: {
    title: 'Калькулятор стоимости материалов — пол, краска, бетон',
    description: 'Бесплатный калькулятор материалов для пола, краски и бетона. Рассчитайте необходимое количество материала и общую стоимость для любого помещения.',
    h1: 'Калькулятор стоимости материалов',
    subtitle: 'Рассчитайте количество и стоимость напольного покрытия, краски или бетона для любой комнаты.',
  },
  uk: {
    title: 'Калькулятор вартості матеріалів — підлога, фарба, бетон',
    description: 'Безкоштовний калькулятор матеріалів для підлоги, фарби та бетону. Розрахуйте необхідну кількість матеріалу та загальну вартість для будь-якого приміщення.',
    h1: 'Калькулятор вартості матеріалів',
    subtitle: 'Розрахуйте кількість і вартість підлогового покриття, фарби або бетону для будь-якого приміщення.',
  },
  fr: {
    title: 'Calculatrice Coût Matériaux — Sol, Peinture & Béton',
    description: 'Calculatrice de coût de matériaux gratuite pour revêtements de sol, peinture et béton. Calculez la quantité nécessaire et le coût total pour n\'importe quelle pièce.',
    h1: 'Calculatrice Coût Matériaux',
    subtitle: 'Calculez la quantité et le coût du revêtement de sol, de la peinture ou du béton pour n\'importe quelle pièce.',
  },
  lt: {
    title: 'Medžiagų Kainos Skaičiuotuvas — Grindys, Dažai ir Betonas',
    description: 'Nemokamas medžiagų kainos skaičiuotuvas grindims, dažams ir betonui. Apskaičiuokite reikalingą medžiagų kiekį ir bendrą kainą bet kuriam kambariui.',
    h1: 'Medžiagų Kainos Skaičiuotuvas',
    subtitle: 'Apskaičiuokite grindų dangos, dažų ar betono kiekį ir bendrą kainą bet kuriam kambariui.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our material cost calculator helps you estimate the amount and total cost of three common construction and renovation materials: flooring (tiles, laminate, hardwood), paint, and concrete. For flooring, it applies a waste allowance to account for cutting and breakage. For paint, it calculates litres needed based on coverage rate and number of coats. For concrete, it estimates the number of 25 kg bags required.\n\nAccurate material calculations prevent two common problems: ordering too little (causing project delays) and ordering too much (wasting money). As a rule, add 10% waste for straight-cut flooring, 15% for diagonal cuts, and up to 20% for irregular shapes. For paint, always buy 10% extra for touch-ups and second coats. For concrete, measure twice — small errors in slab dimensions can cause significant material waste.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'Why add a waste allowance for flooring?', a: 'Flooring materials are cut to fit rooms — cuts produce waste. For straight, grid-aligned installations, 10% waste is standard. Diagonal (45°) installations need 15–20% more material. Irregular shapes and rooms with many corners may need 20–25% extra. It\'s better to buy 10% too much than to run short and face a colour mismatch with a new batch.' },
      { q: 'What is paint coverage rate?', a: 'Paint coverage rate is the area one litre covers in one coat. Typical coverage: interior emulsion — 10–12 m²/litre; exterior masonry paint — 6–8 m²/litre; gloss/satin — 10–12 m²/litre; primer — 8–10 m²/litre. Textured, porous, or dark surfaces absorb more paint and reduce coverage. Always check the manufacturer\'s specification on the can.' },
      { q: 'Do I need two coats of paint?', a: 'Almost always yes — a single coat rarely provides full coverage and consistent colour. Two coats are standard for: changing colours, painting over dark colours with light, new plaster or drywall, exterior surfaces. Three coats may be needed when going from very dark to very light. Allow full drying time between coats (typically 2–4 hours for emulsion).' },
      { q: 'How much concrete is in one 25 kg bag?', a: 'One standard 25 kg concrete bag (when mixed correctly) produces approximately 12 litres (0.012 m³) of concrete. This means: a 1 m² slab at 10 cm (0.1 m) depth = 0.1 m³ = 8–9 bags. A 4 m × 4 m × 10 cm garden path = 1.6 m³ ≈ 134 bags (about 3,350 kg).' },
      { q: 'How do I calculate how much tile I need?', a: 'Calculate floor area: Length × Width = total m². Add waste (10% for square rooms, 15–20% for diagonal). Divide by tile area to get number of tiles. Example: 3m × 4m room = 12 m². With 10% waste = 13.2 m². 30×30 cm tiles (0.09 m² each): 13.2 ÷ 0.09 ≈ 147 tiles. Always round up to nearest full pack.' },
      { q: 'What is the difference between laminate and hardwood flooring costs?', a: 'Laminate: €8–25/m². Hardwood solid: €40–120/m². Engineered hardwood: €25–80/m². Installation adds €10–30/m² for professional fitting. Laminate can often be self-installed with floating method, saving significantly. Hardwood lasts 50–100 years (refinishable); laminate 15–25 years (replacement only).' },
      { q: 'How much concrete do I need for a foundation?', a: 'A typical residential strip foundation (30 cm wide × 60 cm deep) needs 0.18 m³ per linear metre. A 10m × 8m house perimeter (36 linear metres) needs: 36 × 0.18 = 6.48 m³ ≈ 540 bags. For large foundations, buying ready-mix concrete by the cubic metre (truck delivery) is significantly cheaper than bagged concrete.' },
      { q: 'What is the best flooring for wet areas?', a: 'Bathrooms, kitchens, laundry: porcelain tiles (most durable, waterproof), ceramic tiles, luxury vinyl tile (LVT), or stone. Avoid standard laminate and hardwood in wet areas — they swell and warp. Slip resistance rating (R rating): R10+ for bathrooms, R11+ for wet areas. Grout must be sealed to prevent mould.' },
      { q: 'How many litres of paint for a room?', a: 'For a standard 4m × 4m room with 2.5m ceilings: Wall area = (4+4+4+4) × 2.5 = 40 m² (minus doors/windows ≈ 30–35 m²). Two coats: 60–70 m² total. At 10 m²/litre: 6–7 litres. Add ceiling: 4×4 = 16 m², two coats ≈ 3.2 litres. Total: approximately 10 litres of paint for walls and ceiling.' },
      { q: 'What is the concrete mix ratio?', a: '1:2:4 cement:sand:aggregate is the standard mix for general purposes. Ready-mix C20/25 (standard domestic) is equivalent. For load-bearing applications, use C25/30. Never add excess water — it weakens concrete. Aim for a workable but not runny consistency. Water-to-cement ratio should be 0.45–0.55.' },
      { q: 'Should I hire a professional or DIY for flooring installation?', a: 'DIY suitable: laminate, click-vinyl, carpet tiles (simple installations). Professional recommended: hardwood (requires specialist tools, moisture testing), ceramic/porcelain tiles (heavy, grout alignment critical), stone (heavy, specialist adhesive). Labour typically costs 50–150% of material cost. Factor this into your total project budget.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор стоимости материалов помогает рассчитать количество и общую стоимость трёх распространённых строительных материалов: напольного покрытия (плитка, ламинат, паркет), краски и бетона. Для пола учитывается запас на отходы при резке. Для краски — необходимое количество литров с учётом расхода и количества слоёв. Для бетона — число мешков по 25 кг.\n\nТочные расчёты материалов предотвращают две типичные проблемы: нехватку (срыв сроков) и избыток (потеря денег). Стандартные нормы: +10% на отходы при прямой укладке, +15% при диагональной, +20% для нестандартных форм. Для краски всегда берите +10% на подкраску. Для бетона — всегда измеряйте дважды.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Зачем добавлять запас на отходы для напольного покрытия?', a: 'При укладке материал режется по периметру и вокруг препятствий — образуются отходы. Стандарт: +10% при прямой укладке; +15–20% при диагональной (45°); +20–25% для сложных форм. Лучше купить чуть больше: добрать материал из нового партии сложно — может не совпасть цвет.' },
      { q: 'Что такое расход краски?', a: 'Расход краски — площадь, которую покрывает один литр за один слой. Типичные значения: интерьерная эмаль — 10–12 м²/л; фасадная — 6–8 м²/л; глянцевая — 10–12 м²/л; грунт — 8–10 м²/л. Текстурированные или пористые поверхности поглощают больше краски.' },
      { q: 'Нужно ли красить в два слоя?', a: 'Почти всегда да. Два слоя стандартны для: смены цвета, нанесения светлой краски на тёмную, новой штукатурки, фасада. Три слоя — при переходе от очень тёмного к очень светлому. Соблюдайте время сушки между слоями (обычно 2–4 часа для эмали).' },
      { q: 'Сколько бетона в одном мешке 25 кг?', a: 'Стандартный мешок бетонной смеси 25 кг даёт при замешивании ~12 литров (0,012 м³) готового бетона. Плита 1 м² × толщина 10 см = 0,1 м³ ≈ 8–9 мешков. Дорожка 4×4 м × 10 см = 1,6 м³ ≈ 134 мешка.' },
      { q: 'Как рассчитать количество плитки?', a: 'Площадь комнаты = Длина × Ширина. Добавьте запас: 10% для квадратных комнат, 15–20% для диагональной укладки. Пример: 3×4 м = 12 м² + 10% = 13,2 м². Плитка 30×30 см (0,09 м²): 13,2 ÷ 0,09 ≈ 147 штук. Всегда округляйте вверх до целой упаковки.' },
      { q: 'Какова разница в стоимости ламината и паркета?', a: 'Ламинат: 600–2000 руб/м². Массивная доска: 3000–10 000 руб/м². Инженерная доска: 2000–7000 руб/м². Укладка: 500–1500 руб/м². Ламинат можно уложить самостоятельно — плавающим методом. Паркет служит 50–100 лет (шлифуется), ламинат — 15–25 лет.' },
      { q: 'Сколько бетона нужно для фундамента?', a: 'Типичный ленточный фундамент (30 см шириной × 60 см глубиной) требует 0,18 м³ на погонный метр. Периметр дома 10×8 м (36 м): 36 × 0,18 = 6,5 м³ ≈ 540 мешков. Для крупных объёмов выгоднее заказывать товарный бетон в миксере.' },
      { q: 'Какое напольное покрытие лучше для влажных помещений?', a: 'Ванная, кухня: керамогранит (самый прочный, водонепроницаемый), керамическая плитка, ПВХ-плитка LVT. Ламинат и паркет во влажных помещениях не рекомендуются — разбухают. Коэффициент нескользкости: R10+ для ванной, R11+ для мокрых зон. Затирку обязательно обрабатывать герметиком.' },
      { q: 'Сколько литров краски нужно для комнаты?', a: 'Комната 4×4 м, высота потолков 2,5 м: площадь стен ≈ 30–35 м² (за вычетом окон/дверей). Два слоя: 60–70 м² при расходе 10 м²/л = 6–7 литров. Потолок 4×4 = 16 м², два слоя ≈ 3,2 литра. Итого: ~10 литров на стены и потолок.' },
      { q: 'Какое соотношение компонентов для бетона?', a: 'Стандартная пропорция: 1:2:4 (цемент:песок:щебень). Готовые смеси класса B15–B20 эквивалентны. Для нагруженных конструкций — B25. Никогда не добавляйте лишнюю воду — ослабляет бетон. Водоцементное соотношение: 0,45–0,55.' },
      { q: 'Монтировать напольное покрытие самому или нанимать специалистов?', a: 'Своими руками: ламинат, кликовый ПВХ, ковровая плитка. Рекомендуется специалист: паркет (нужен инструмент), керамическая/керамогранитная плитка (выравнивание), камень. Стоимость укладки обычно 50–150% от цены материала. Учитывайте это в общем бюджете проекта.' },
    ],
  },
  uk: {
    description: 'Наш калькулятор вартості матеріалів допомагає розрахувати кількість і загальну вартість трьох поширених будівельних матеріалів: підлогового покриття (плитка, ламінат, паркет), фарби та бетону. Для підлоги враховується запас на відходи при різці. Для фарби — необхідна кількість літрів з урахуванням витрат і кількості шарів. Для бетону — кількість мішків по 25 кг.\n\nТочні розрахунки матеріалів запобігають двом типовим проблемам: нестачі (зрив термінів) і надлишку (витрата грошей). Стандартні норми: +10% на відходи при прямому укладанні, +15% при діагональному, +20% для нестандартних форм.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Навіщо додавати запас на відходи для підлогового покриття?', a: 'При укладанні матеріал ріжеться по периметру та навколо перешкод — утворюються відходи. Стандарт: +10% при прямому укладанні; +15–20% при діагональному (45°); +20–25% для складних форм. Краще купити трохи більше: добрати матеріал з нової партії складно — може не збігтися колір.' },
      { q: 'Що таке витрата фарби?', a: 'Витрата фарби — площа, яку покриває один літр за один шар. Типові значення: інтер\'єрна емаль — 10–12 м²/л; фасадна — 6–8 м²/л; глянцева — 10–12 м²/л; ґрунт — 8–10 м²/л. Текстуровані або пористі поверхні поглинають більше фарби.' },
      { q: 'Чи потрібно фарбувати у два шари?', a: 'Майже завжди так. Два шари стандартні для: зміни кольору, нанесення світлої фарби на темну, нової штукатурки, фасаду. Три шари — при переході від дуже темного до дуже світлого. Дотримуйтесь часу сушки між шарами (зазвичай 2–4 години для емалі).' },
      { q: 'Скільки бетону в одному мішку 25 кг?', a: 'Стандартний мішок бетонної суміші 25 кг дає при замішуванні ~12 літрів (0,012 м³) готового бетону. Плита 1 м² × товщина 10 см = 0,1 м³ ≈ 8–9 мішків.' },
      { q: 'Як розрахувати кількість плитки?', a: 'Площа кімнати = Довжина × Ширина. Додайте запас: 10% для квадратних кімнат, 15–20% для діагонального укладання. Приклад: 3×4 м = 12 м² + 10% = 13,2 м². Плитка 30×30 см (0,09 м²): 13,2 ÷ 0,09 ≈ 147 штук.' },
      { q: 'Яка різниця у вартості ламінату та паркету?', a: 'Ламінат: 250–800 грн/м². Масивна дошка: 1200–4000 грн/м². Інженерна дошка: 800–3000 грн/м². Укладання: 200–600 грн/м². Ламінат можна укласти самостійно. Паркет служить 50–100 років, ламінат — 15–25 років.' },
      { q: 'Скільки бетону потрібно для фундаменту?', a: 'Типовий стрічковий фундамент (30 см шириною × 60 см глибиною) потребує 0,18 м³ на погонний метр. Периметр будинку 10×8 м (36 м): 36 × 0,18 = 6,5 м³ ≈ 540 мішків. Для великих об\'ємів вигідніше замовляти товарний бетон у міксері.' },
      { q: 'Яке підлогове покриття краще для вологих приміщень?', a: 'Ванна, кухня: керамограніт, керамічна плитка, ПВХ-плитка LVT. Ламінат і паркет у вологих приміщеннях не рекомендуються — розбухають. Коефіцієнт нековзкості: R10+ для ванної. Затірку обов\'язково обробляти герметиком.' },
      { q: 'Скільки літрів фарби потрібно для кімнати?', a: 'Кімната 4×4 м, висота стель 2,5 м: площа стін ≈ 30–35 м². Два шари: 60–70 м² при витраті 10 м²/л = 6–7 літрів. Стеля 4×4 = 16 м², два шари ≈ 3,2 літра. Всього: ~10 літрів на стіни і стелю.' },
      { q: 'Яке співвідношення компонентів для бетону?', a: 'Стандартна пропорція: 1:2:4 (цемент:пісок:щебінь). Водоцементне відношення: 0,45–0,55. Ніколи не додавайте зайву воду — послаблює бетон.' },
      { q: 'Укладати підлогове покриття самому чи наймати спеціалістів?', a: 'Самостійно: ламінат, кліковий ПВХ, килимова плитка. Рекомендується спеціаліст: паркет, керамічна/керамогранітна плитка, камінь. Вартість укладання зазвичай 50–150% від ціни матеріалу. Враховуйте це у загальному бюджеті.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice de coût de matériaux vous aide à estimer la quantité et le coût total de trois matériaux de construction et rénovation courants : revêtements de sol (carrelage, parquet, stratifié), peinture et béton. Pour les sols, une marge de perte est appliquée pour tenir compte des coupes. Pour la peinture, les litres nécessaires sont calculés selon la couverture et le nombre de couches. Pour le béton, le nombre de sacs de 25 kg est estimé.\n\nDes calculs précis évitent les deux problèmes courants : commander trop peu (retards) ou trop (gaspillage d\'argent). En règle générale, ajoutez 10 % de perte pour une pose droite, 15 % pour la diagonale, et 20 % pour les formes irrégulières.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Pourquoi ajouter une marge de perte pour les revêtements de sol ?', a: 'Les matériaux de sol sont coupés pour s\'adapter aux pièces — les coupes produisent des chutes. Pour une pose droite : 10 % de marge standard. En diagonal (45°) : 15–20 %. Formes irrégulières : 20–25 %. Il vaut mieux acheter légèrement trop que d\'en manquer et risquer un écart de teinte avec un nouveau lot.' },
      { q: 'Qu\'est-ce que le rendement de la peinture ?', a: 'Le rendement est la surface couverte par un litre en une couche. Valeurs typiques : peinture intérieure — 10–12 m²/litre ; peinture extérieure — 6–8 m²/litre ; laque — 10–12 m²/litre ; primaire — 8–10 m²/litre. Les surfaces texturées absorbent davantage de peinture.' },
      { q: 'Faut-il appliquer deux couches de peinture ?', a: 'Presque toujours oui. Deux couches sont standard pour : changer de couleur, couvrir une couleur foncée avec une claire, une nouvelle plâtrerie, les façades. Trois couches pour passer du très foncé au très clair. Respectez le temps de séchage (2–4 h pour les émulsions).' },
      { q: 'Quelle quantité de béton dans un sac de 25 kg ?', a: 'Un sac standard de 25 kg produit environ 12 litres (0,012 m³) de béton prêt à l\'emploi. Une dalle de 1 m² à 10 cm d\'épaisseur = 0,1 m³ ≈ 8–9 sacs.' },
      { q: 'Comment calculer la quantité de carrelage ?', a: 'Surface du sol : Longueur × Largeur. Ajoutez la marge de perte (10 % pour pièce carrée, 15–20 % en diagonal). Exemple : 3 m × 4 m = 12 m² + 10 % = 13,2 m². Carreaux 30 × 30 cm (0,09 m²) : 13,2 ÷ 0,09 ≈ 147 carreaux. Toujours arrondir à la boîte entière.' },
      { q: 'Quelle est la différence de coût entre stratifié et parquet ?', a: 'Stratifié : 15–35 €/m². Parquet massif : 60–150 €/m². Parquet contrecollé : 35–90 €/m². Pose : 15–40 €/m² (main-d\'œuvre). Le stratifié peut souvent être posé en flottant soi-même. Le parquet massif dure 50–100 ans (ponçable) ; le stratifié 15–25 ans.' },
      { q: 'Quelle quantité de béton pour une fondation ?', a: 'Une semelle filante standard (30 cm × 60 cm de profondeur) nécessite 0,18 m³ par mètre linéaire. Pour une maison 10 × 8 m (36 ml) : 36 × 0,18 = 6,5 m³ ≈ 540 sacs. Pour de grands volumes, le béton prêt à l\'emploi livré en toupie est beaucoup moins cher.' },
      { q: 'Quel revêtement pour les pièces humides ?', a: 'Salle de bain, cuisine : carrelage en grès cérame (le plus durable), céramique, dalle vinyle LVT. Évitez le stratifié et le parquet dans les zones humides — ils gonflent. Indice d\'anti-dérapant : R10+ pour salles de bain. Le joint doit être traité avec un hydrofuge.' },
      { q: 'Combien de litres de peinture pour une pièce ?', a: 'Pièce standard 4 × 4 m, hauteur 2,5 m : surface des murs ≈ 30–35 m². Deux couches : 60–70 m² / 10 m²/litre = 6–7 litres. Plafond 4 × 4 m + deux couches ≈ 3,2 litres. Total : environ 10 litres pour murs et plafond.' },
      { q: 'Quel dosage pour le béton ?', a: 'Dosage standard 1:2:4 (ciment:sable:granulats). Rapport eau/ciment : 0,45–0,55. N\'ajoutez jamais trop d\'eau — cela affaiblit le béton. Pour les structures porteuses, utilisez un béton C25/C30.' },
      { q: 'Poser soi-même ou faire appel à un professionnel ?', a: 'DIY adapté : stratifié, vinyle à clipser, dalles de moquette. Professionnel recommandé : parquet massif, carrelage céramique/grès (alignement du joint), pierre. La main-d\'œuvre représente généralement 50–150 % du coût des matériaux. Intégrez-la dans votre budget global.' },
    ],
  },
  lt: {
    description: 'Mūsų medžiagų kainos skaičiuotuvas padeda įvertinti trijų dažniausių statybos ir renovacijos medžiagų kiekį ir bendrą kainą: grindų dangos (plytelės, laminatas, parketlentės), dažų ir betono. Grindims taikomas atliekų atsarginės normos koeficientas. Dažams apskaičiuojami reikalingi litrai pagal sunaudojimą ir sluoksnių skaičių. Betonui — 25 kg maišų skaičius.\n\nTikslūs medžiagų skaičiavimai išvengia dviejų dažnų problemų: per mažo užsakymo (projekto vėlavimai) ir per didelio (pinigų švaistymas). Standartinė taisyklė: +10% atliekoms tiesiam klojimui, +15% įstrižiniam, +20% sudėtingoms formoms.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kodėl reikia pridėti atliekų atsargą grindų dangai?', a: 'Grindų medžiagos pjaustomos, kad tilptų patalpose — dėl to atsiranda atliekos. Standartas: +10% tiesiam klojimui; +15–20% įstrižiniam (45°); +20–25% sudėtingoms formoms. Geriau nusipirkti šiek tiek daugiau: pirkti iš naujos partijos gali skirtis spalva.' },
      { q: 'Kas yra dažų dangumas?', a: 'Dažų dangumas — plotas, kurį uždengti vienas litras per vieną sluoksnį. Tipinės reikšmės: interjero emalis — 10–12 m²/l; fasado — 6–8 m²/l; blizgūs — 10–12 m²/l; gruntas — 8–10 m²/l. Tekstūruoti ar poringi paviršiai sugeria daugiau dažų.' },
      { q: 'Ar reikia dažyti dviem sluoksniais?', a: 'Beveik visada taip. Du sluoksniai standartiniai keičiant spalvą, dengiant tamsias spalvas šviesiomis, naujoms tinkuotoms sienoms, fasadams. Trys sluoksniai — pereinant nuo labai tamsios prie labai šviesios. Laukite džiūvimo laiko tarp sluoksnių (paprastai 2–4 val.).' },
      { q: 'Kiek betono viename 25 kg maiše?', a: 'Vienas standartinis 25 kg betono mišinio maišas sumaišytas duoda maždaug 12 litrų (0,012 m³) betono. Plokštė 1 m² × 10 cm gylio = 0,1 m³ ≈ 8–9 maišai.' },
      { q: 'Kaip apskaičiuoti reikiamą plytelių kiekį?', a: 'Grindų plotas = Ilgis × Plotis. Pridėkite atliekų atsargą: 10% kvadratiniam kambariui, 15–20% įstrižiniam klojimui. Pavyzdys: 3×4 m = 12 m² + 10% = 13,2 m². Plytelės 30×30 cm (0,09 m²): 13,2 ÷ 0,09 ≈ 147 vnt.' },
      { q: 'Koks skirtumas tarp laminato ir parketo kainos?', a: 'Laminatas: 10–30 €/m². Masyvinis parketlentis: 50–120 €/m². Inžinerinis parketlentis: 30–80 €/m². Klojimas: 15–40 €/m². Laminatą galima kloti savarankiškai. Parketlentis tarnauja 50–100 metų, laminatas — 15–25 metus.' },
      { q: 'Kiek betono reikia pamatams?', a: 'Tipinis juostinis pamatas (30 cm pločio × 60 cm gylio) sunaudoja 0,18 m³ vienam tiesiniam metrui. Namo 10×8 m perimetras (36 m): 36 × 0,18 = 6,5 m³ ≈ 540 maišų. Dideliems tūriams pigiau užsakyti betononešį.' },
      { q: 'Kokia grindų danga geriausia drėgnoms patalpoms?', a: 'Vonios kambarys, virtuvė: porcelianinis akmuo (atspariausias), keraminės plytelės, PVC plokštelė LVT. Laminatas ir parketlentis drėgnose zonose nerekomenduojami — brinksta. Slydimo atsparumas: R10+ vonios kambariui.' },
      { q: 'Kiek litrų dažų reikia kambariui?', a: 'Standartinis 4×4 m kambarys, 2,5 m lubų: sienų plotas ≈ 30–35 m². Du sluoksniai: 60–70 m² esant 10 m²/l sunaudojimui = 6–7 litrai. Lubos 4×4 m + du sluoksniai ≈ 3,2 litrai. Iš viso: ~10 litrų sienoms ir luboms.' },
      { q: 'Koks yra betono maišymo santykis?', a: 'Standartinis santykis: 1:2:4 (cementas:smėlis:žvirgždas). Vandens ir cemento santykis: 0,45–0,55. Niekada nedėkite per daug vandens — susilpnina betoną.' },
      { q: 'Ar kloti grindis savarankiškai ar samdyti specialistą?', a: 'Savarankiškai tinka: laminatas, spustelėjimo plytelės, kilimėlių plytelės. Specialistas rekomenduojamas: parketas, keraminės/porcelianinės plytelės, akmuo. Darbo sąnaudos paprastai sudaro 50–150% medžiagų kainos.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/material-cost', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MaterialCostPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/material-cost`,
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
        <MaterialCostCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
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

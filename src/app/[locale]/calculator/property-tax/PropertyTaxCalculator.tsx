'use client';

import { useState } from 'react';
import styles from './PropertyTaxCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  country: string; propertyValue: string; propertyType: string;
  calculate: string; reset: string;
  annualTax: string; monthlyTax: string; effectiveRate: string;
  basis: string; notes: string; errFields: string; errValue: string;
  typePrimary: string; typeSecondary: string; typeCommercial: string; typeAgriculture: string;
  placeholder: string;
}> = {
  en: {
    country: 'Country', propertyValue: 'Property value', propertyType: 'Property type',
    calculate: 'Calculate tax', reset: 'Reset',
    annualTax: 'Annual tax', monthlyTax: 'Monthly equivalent', effectiveRate: 'Effective rate',
    basis: 'Legal basis', notes: 'Notes',
    errFields: 'Please fill in all fields.', errValue: 'Property value must be between 1 000 and 100 000 000.',
    typePrimary: 'Primary residence', typeSecondary: 'Secondary / investment property',
    typeCommercial: 'Commercial property', typeAgriculture: 'Agricultural land',
    placeholder: 'e.g. 250000',
  },
  ru: {
    country: 'Страна', propertyValue: 'Стоимость недвижимости', propertyType: 'Тип недвижимости',
    calculate: 'Рассчитать налог', reset: 'Сбросить',
    annualTax: 'Годовой налог', monthlyTax: 'В месяц', effectiveRate: 'Эффективная ставка',
    basis: 'Правовая основа', notes: 'Примечания',
    errFields: 'Пожалуйста, заполните все поля.', errValue: 'Стоимость должна быть от 1 000 до 100 000 000.',
    typePrimary: 'Основное жильё', typeSecondary: 'Вторичное / инвестиционное',
    typeCommercial: 'Коммерческая недвижимость', typeAgriculture: 'Сельскохозяйственные угодья',
    placeholder: 'напр. 250000',
  },
  uk: {
    country: 'Країна', propertyValue: 'Вартість нерухомості', propertyType: 'Тип нерухомості',
    calculate: 'Розрахувати податок', reset: 'Скинути',
    annualTax: 'Річний податок', monthlyTax: 'На місяць', effectiveRate: 'Ефективна ставка',
    basis: 'Правова основа', notes: 'Примітки',
    errFields: 'Будь ласка, заповніть всі поля.', errValue: 'Вартість повинна бути від 1 000 до 100 000 000.',
    typePrimary: 'Основне житло', typeSecondary: 'Вторинне / інвестиційне',
    typeCommercial: 'Комерційна нерухомість', typeAgriculture: 'Сільськогосподарські угіддя',
    placeholder: 'напр. 250000',
  },
  fr: {
    country: 'Pays', propertyValue: 'Valeur du bien', propertyType: 'Type de bien',
    calculate: 'Calculer la taxe', reset: 'Réinitialiser',
    annualTax: 'Taxe annuelle', monthlyTax: 'Équivalent mensuel', effectiveRate: 'Taux effectif',
    basis: 'Base juridique', notes: 'Remarques',
    errFields: 'Veuillez remplir tous les champs.', errValue: 'La valeur doit être comprise entre 1 000 et 100 000 000.',
    typePrimary: 'Résidence principale', typeSecondary: 'Résidence secondaire / investissement',
    typeCommercial: 'Propriété commerciale', typeAgriculture: 'Terrain agricole',
    placeholder: 'ex. 250000',
  },
  lt: {
    country: 'Šalis', propertyValue: 'Turto vertė', propertyType: 'Turto tipas',
    calculate: 'Skaičiuoti mokestį', reset: 'Atstatyti',
    annualTax: 'Metinis mokestis', monthlyTax: 'Mėnesinis ekvivalentas', effectiveRate: 'Efektyvus tarifas',
    basis: 'Teisinis pagrindas', notes: 'Pastabos',
    errFields: 'Užpildykite visus laukus.', errValue: 'Turto vertė turi būti nuo 1 000 iki 100 000 000.',
    typePrimary: 'Pagrindinė gyvenamoji vieta', typeSecondary: 'Antrinis / investicinis turtas',
    typeCommercial: 'Komercinis turtas', typeAgriculture: 'Žemės ūkio paskirties žemė',
    placeholder: 'pvz. 250000',
  },
};

type PropertyType = 'primary' | 'secondary' | 'commercial' | 'agriculture';

type TaxEntry = {
  rate: number;
  basis: string;
  notes: Record<LangKey, string>;
};

type CountryConfig = {
  currency: string;
  symbol: string;
  taxes: Record<PropertyType, TaxEntry>;
};

const COUNTRIES: Record<string, CountryConfig> = {
  de: {
    currency: 'EUR', symbol: '€',
    taxes: {
      primary: {
        rate: 0.0026,
        basis: 'Grundsteuerreformgesetz 2022',
        notes: {
          en: 'Germany\'s property tax (Grundsteuer) is calculated using the property\'s assessed value multiplied by a federal rate and a local multiplier (Hebesatz), which varies by municipality. Average effective rate ~0.26% of market value. Reform took effect Jan 2025.',
          ru: 'Налог на недвижимость в Германии (Grundsteuer) рассчитывается на основе оценочной стоимости, федеральной ставки и муниципального коэффициента (Hebesatz). Средняя эффективная ставка ~0,26% рыночной стоимости. Реформа вступила в силу с января 2025.',
          uk: 'Податок на нерухомість у Німеччині (Grundsteuer) розраховується на основі оціночної вартості, федеральної ставки та муніципального коефіцієнта (Hebesatz). Середня ефективна ставка ~0,26% ринкової вартості. Реформа набула чинності з січня 2025.',
          fr: 'La taxe foncière allemande (Grundsteuer) est calculée en multipliant la valeur cadastrale par un taux fédéral et un multiplicateur communal (Hebesatz). Taux effectif moyen ~0,26% de la valeur de marché. Réforme entrée en vigueur en janvier 2025.',
          lt: 'Vokietijos nekilnojamojo turto mokestis (Grundsteuer) apskaičiuojamas pagal vertinimo vertę, federalinį tarifą ir savivaldybės koeficientą (Hebesatz). Vidutinis efektyvus tarifas ~0,26% rinkos vertės. Reforma įsigaliojo 2025 m. sausio mėn.',
        },
      },
      secondary: { rate: 0.0026, basis: 'Grundsteuerreformgesetz 2022', notes: { en: 'Same rate as primary residence. Additional transfer taxes apply when buying (3.5–6.5% depending on state).', ru: 'Та же ставка, что и для основного жилья. При покупке взимается налог на переход права собственности 3,5–6,5% в зависимости от земли.', uk: 'Та ж ставка, що й для основного житла. При купівлі стягується податок на перехід права власності 3,5–6,5%.', fr: 'Même taux que pour la résidence principale. Des taxes de mutation s\'appliquent lors de l\'achat (3,5–6,5% selon l\'État fédéral).', lt: 'Toks pat tarifas kaip ir pagrindinei gyvenamoji vietai. Perkant taikomas perleidimo mokestis 3,5–6,5%.' } },
      commercial: { rate: 0.0034, basis: 'Grundsteuer B', notes: { en: 'Commercial properties (Grundsteuer B) typically face a slightly higher effective rate due to higher municipal multipliers applied to commercial assessments.', ru: 'Коммерческая недвижимость (Grundsteuer B) обычно имеет несколько более высокую эффективную ставку из-за более высоких муниципальных коэффициентов.', uk: 'Комерційна нерухомість (Grundsteuer B) зазвичай має дещо вищу ефективну ставку через вищі муніципальні коефіцієнти.', fr: 'Les propriétés commerciales (Grundsteuer B) ont généralement un taux effectif légèrement plus élevé en raison de multiplicateurs communaux plus élevés.', lt: 'Komercinis turtas (Grundsteuer B) paprastai turi šiek tiek didesnį efektyvų tarifą dėl didesnių savivaldybės koeficientų.' } },
      agriculture: { rate: 0.0006, basis: 'Grundsteuer A', notes: { en: 'Agricultural land (Grundsteuer A) benefits from significantly lower effective rates. Rates vary by region and land use.', ru: 'Сельскохозяйственные угодья (Grundsteuer A) имеют значительно более низкие ставки. Ставки варьируются в зависимости от региона и вида использования.', uk: 'Сільськогосподарські угіддя (Grundsteuer A) мають значно нижчі ставки залежно від регіону та виду використання.', fr: 'Les terres agricoles (Grundsteuer A) bénéficient de taux effectifs nettement inférieurs. Les taux varient selon la région et l\'usage.', lt: 'Žemės ūkio paskirties žemė (Grundsteuer A) turi žymiai mažesnį efektyvų tarifą. Tarifai skiriasi priklausomai nuo regiono ir naudojimo.' } },
    },
  },
  fr: {
    currency: 'EUR', symbol: '€',
    taxes: {
      primary: {
        rate: 0.008,
        basis: 'Code général des impôts art. 1380',
        notes: {
          en: 'France has two property taxes: taxe foncière (owner\'s tax, ~0.8% average) and taxe d\'habitation (abolished for primary residences in 2023, still applies to secondary homes). Rate varies by commune.',
          ru: 'Во Франции два налога на недвижимость: taxe foncière (~0,8% среднее, платит собственник) и taxe d\'habitation (отменён для основного жилья в 2023 году, применяется для вторичного). Ставка зависит от коммуны.',
          uk: 'У Франції два податки: taxe foncière (~0,8% середня, платить власник) та taxe d\'habitation (скасовано для основного житла у 2023 р., зберігається для вторинного). Ставка залежить від комуни.',
          fr: 'La France a deux taxes immobilières : taxe foncière (propriétaire, ~0,8% en moyenne) et taxe d\'habitation (supprimée pour les résidences principales en 2023, maintenue pour les résidences secondaires). Le taux varie selon la commune.',
          lt: 'Prancūzijoje yra du nekilnojamojo turto mokesčiai: taxe foncière (~0,8% vidurkis) ir taxe d\'habitation (panaikinta pagrindinėms gyvenamosioms vietoms 2023 m., taikoma antriniams būstams). Tarifas priklauso nuo savivaldybės.',
        },
      },
      secondary: { rate: 0.014, basis: 'Code général des impôts + taxe d\'habitation résidence secondaire', notes: { en: 'Secondary homes pay taxe foncière (~0.8%) plus taxe d\'habitation (~0.6% average, but up to 60% surcharge in high-demand areas). Total effective rate ~1.4%.', ru: 'Вторичное жильё платит taxe foncière (~0,8%) + taxe d\'habitation (~0,6% среднее, но надбавка до 60% в дефицитных районах). Итого ~1,4%.', uk: 'Вторинне житло платить taxe foncière (~0,8%) + taxe d\'habitation (~0,6% середня, але надбавка до 60% у дефіцитних районах). Разом ~1,4%.', fr: 'Les résidences secondaires paient la taxe foncière (~0,8%) + taxe d\'habitation (~0,6% en moyenne, avec une surtaxe possible de 60% dans les zones tendues). Total ~1,4%.', lt: 'Antriniam būstui taikoma taxe foncière (~0,8%) + taxe d\'habitation (~0,6% vidurkis, iki 60% priemoka didesnės paklausos zonose). Iš viso ~1,4%.' } },
      commercial: { rate: 0.015, basis: 'Taxe foncière sur les propriétés bâties + CFE', notes: { en: 'Commercial property pays taxe foncière (~0.8–1.5%) plus the Cotisation Foncière des Entreprises (CFE), a business property tax. Combined effective rate ~1.5%.', ru: 'Коммерческая недвижимость платит taxe foncière (~0,8–1,5%) + Cotisation Foncière des Entreprises (CFE). Суммарная эффективная ставка ~1,5%.', uk: 'Комерційна нерухомість платить taxe foncière (~0,8–1,5%) + Cotisation Foncière des Entreprises (CFE). Сумарна ефективна ставка ~1,5%.', fr: 'Les propriétés commerciales paient la taxe foncière (~0,8–1,5%) + la Cotisation Foncière des Entreprises (CFE). Taux effectif combiné ~1,5%.', lt: 'Komercinis turtas moka taxe foncière (~0,8–1,5%) + Cotisation Foncière des Entreprises (CFE). Bendras efektyvus tarifas ~1,5%.' } },
      agriculture: { rate: 0.002, basis: 'Taxe foncière sur les propriétés non bâties', notes: { en: 'Agricultural land (taxe foncière sur les propriétés non bâties) benefits from reduced rates. Young farmers may get a 50% reduction for the first 5 years.', ru: 'Сельскохозяйственные угодья (taxe foncière sur les propriétés non bâties) облагаются по сниженным ставкам. Молодые фермеры могут получить скидку 50% на первые 5 лет.', uk: 'Сільськогосподарські угіддя (taxe foncière sur les propriétés non bâties) оподатковуються за зниженими ставками. Молоді фермери можуть отримати знижку 50% на перші 5 років.', fr: 'Les terres agricoles (taxe foncière sur les propriétés non bâties) bénéficient de taux réduits. Les jeunes agriculteurs peuvent bénéficier d\'une réduction de 50% pendant les 5 premières années.', lt: 'Žemės ūkio paskirties žemei (taxe foncière sur les propriétés non bâties) taikomi mažesni tarifai. Jaunieji ūkininkai gali gauti 50% nuolaidą pirmuosius 5 metus.' } },
    },
  },
  pl: {
    currency: 'PLN', symbol: 'zł',
    taxes: {
      primary: {
        rate: 0.0008,
        basis: 'Ustawa o podatkach i opłatach lokalnych',
        notes: {
          en: 'Poland\'s property tax (podatek od nieruchomości) is set per square metre by local councils, not as a percentage of value. This calculator uses approximate value-based equivalent. Max rate for residential: ~1.15 zł/m² in 2024.',
          ru: 'Налог на недвижимость в Польше (podatek od nieruchomości) устанавливается в злотых за м², а не в % от стоимости. Максимальная ставка для жилья: ~1,15 зл/м² в 2024 году.',
          uk: 'Податок на нерухомість у Польщі (podatek od nieruchomości) встановлюється в злотих за м², а не у % від вартості. Максимальна ставка для житла: ~1,15 зл/м² у 2024 р.',
          fr: 'La taxe foncière polonaise (podatek od nieruchomości) est fixée en PLN/m² par les collectivités locales, pas en % de la valeur. Taux max résidentiel : ~1,15 zł/m² en 2024.',
          lt: 'Lenkijos nekilnojamojo turto mokestis (podatek od nieruchomości) nustatomas zlotais/m², o ne % nuo vertės. Maksimalus tarifas gyvenamiesiems: ~1,15 zł/m² 2024 m.',
        },
      },
      secondary: { rate: 0.001, basis: 'Ustawa o podatkach i opłatach lokalnych', notes: { en: 'Same rate as primary residence for residential properties. Higher rates apply if the property qualifies as commercial.', ru: 'Та же ставка, что и для основного жилья. Более высокие ставки применяются, если объект квалифицируется как коммерческий.', uk: 'Та ж ставка, що й для основного житла. Вищі ставки застосовуються, якщо об\'єкт кваліфікується як комерційний.', fr: 'Même taux que pour la résidence principale. Des taux plus élevés s\'appliquent si la propriété est classée comme commerciale.', lt: 'Toks pat tarifas kaip ir pagrindinei gyvenamoji vietai. Aukštesni tarifai taikomi, jei turtas klasifikuojamas kaip komercinis.' } },
      commercial: { rate: 0.0045, basis: 'Ustawa o podatkach i opłatach lokalnych', notes: { en: 'Commercial/industrial buildings: max rate ~33.10 zł/m² in 2024. This value-based estimate uses ~0.45% effective rate for typical commercial valuations.', ru: 'Коммерческие/промышленные здания: максимальная ставка ~33,10 зл/м² в 2024. Оценка в % от стоимости: ~0,45% для типичных объектов.', uk: 'Комерційні/промислові будівлі: максимальна ставка ~33,10 зл/м² у 2024 р. Оцінка у % від вартості: ~0,45% для типових об\'єктів.', fr: 'Bâtiments commerciaux/industriels : taux max ~33,10 zł/m² en 2024. Equivalent valeur ~0,45% pour les valorisations commerciales typiques.', lt: 'Komerciniai/pramoniniai pastatai: maksimalus tarifas ~33,10 zł/m² 2024 m. Vertės atitikmuo ~0,45% tipinėms komercinėms vertinimo sumoms.' } },
      agriculture: { rate: 0.0002, basis: 'Ustawa o podatku rolnym', notes: { en: 'Agricultural land is taxed separately under the agricultural tax law, based on land classification (ha przeliczeniowe), not market value.', ru: 'Сельскохозяйственные угодья облагаются по отдельному закону о сельскохозяйственном налоге исходя из классификации земли, а не рыночной стоимости.', uk: 'Сільськогосподарські угіддя оподатковуються окремо за законом про сільськогосподарський податок на основі класифікації землі, а не ринкової вартості.', fr: 'Les terres agricoles sont taxées séparément selon la loi sur la taxe agricole, basée sur la classification des terres, pas la valeur de marché.', lt: 'Žemės ūkio paskirties žemė apmokestinama atskirai pagal žemės ūkio mokesčio įstatymą, remiantis žemės klasifikacija, o ne rinkos verte.' } },
    },
  },
  lt: {
    currency: 'EUR', symbol: '€',
    taxes: {
      primary: {
        rate: 0.005,
        basis: 'Nekilnojamojo turto mokesčio įstatymas',
        notes: {
          en: 'Lithuanian property tax rate is 0.5–3% of the property\'s taxable value (average ~0.5–1%). Residential properties under €150,000 are exempt; tax applies only to the value above the threshold.',
          ru: 'Ставка налога на недвижимость в Литве составляет 0,5–3% от налогооблагаемой стоимости. Жильё стоимостью до €150 000 освобождено от налога; налог взимается только с суммы сверх порога.',
          uk: 'Ставка податку на нерухомість у Литві становить 0,5–3% від оподатковуваної вартості. Житло вартістю до €150 000 звільнено від податку; податок стягується лише із суми понад поріг.',
          fr: 'Le taux de taxe foncière lituanien est de 0,5 à 3% de la valeur imposable. Les biens résidentiels inférieurs à 150 000€ sont exonérés ; la taxe ne s\'applique qu\'à la valeur au-delà du seuil.',
          lt: 'Lietuvos nekilnojamojo turto mokesčio tarifas yra 0,5–3% nuo apmokestinamos vertės. Gyvenamieji pastatai iki 150 000 € yra neapmokestinami; mokestis taikomas tik vertei, viršijančiai ribą.',
        },
      },
      secondary: { rate: 0.01, basis: 'Nekilnojamojo turto mokesčio įstatymas', notes: { en: 'Secondary/rental residential property: rate 0.5–3%, effectively ~1% average without the primary residence exemption.', ru: 'Вторичная/арендная недвижимость: ставка 0,5–3%, фактически ~1% без льготы основного жилья.', uk: 'Вторинна/орендна нерухомість: ставка 0,5–3%, фактично ~1% без пільги основного житла.', fr: 'Résidence secondaire/locative : taux 0,5–3%, effectivement ~1% en moyenne sans l\'exonération résidence principale.', lt: 'Antrinis/nuomojamas gyvenamasis turtas: tarifas 0,5–3%, efektyviai ~1% vidurkis be pagrindinės gyvenamosios vietos lengvatos.' } },
      commercial: { rate: 0.015, basis: 'Nekilnojamojo turto mokesčio įstatymas', notes: { en: 'Commercial property: rate 0.5–3% of assessed value. Municipalities can set rates within this range. Average for commercial ~1.5%.', ru: 'Коммерческая недвижимость: ставка 0,5–3% от оценочной стоимости. Муниципалитеты могут устанавливать ставки в этом диапазоне. Средняя для коммерческих объектов ~1,5%.', uk: 'Комерційна нерухомість: ставка 0,5–3% від оціночної вартості. Муніципалітети можуть встановлювати ставки в цьому діапазоні. Середня для комерційних об\'єктів ~1,5%.', fr: 'Propriété commerciale : taux 0,5–3% de la valeur cadastrale. Les communes peuvent fixer des taux dans cette plage. Moyenne commerciale ~1,5%.', lt: 'Komercinis turtas: tarifas 0,5–3% nuo vertinimo vertės. Savivaldybės gali nustatyti tarifus šiame diapazone. Vidutinis komerciniam turtui ~1,5%.' } },
      agriculture: { rate: 0.0015, basis: 'Žemės mokesčio įstatymas', notes: { en: 'Agricultural land in Lithuania is taxed under the Land Tax Law (not property tax), at 0.01–4% of cadastral value. Average ~0.15%.', ru: 'Сельскохозяйственные угодья в Литве облагаются по закону о земельном налоге (не налоге на недвижимость): 0,01–4% кадастровой стоимости. Среднее ~0,15%.', uk: 'Сільськогосподарські угіддя в Литві оподатковуються за законом про земельний податок (не податок на нерухомість): 0,01–4% кадастрової вартості. Середнє ~0,15%.', fr: 'Les terres agricoles en Lituanie sont taxées sous la loi sur la taxe foncière (pas la taxe immobilière), à 0,01–4% de la valeur cadastrale. Moyenne ~0,15%.', lt: 'Žemės ūkio paskirties žemė Lietuvoje apmokestinama pagal žemės mokesčio įstatymą (ne nekilnojamojo turto mokestį), 0,01–4% nuo kadastrų vertės. Vidurkis ~0,15%.' } },
    },
  },
  ua: {
    currency: 'UAH', symbol: '₴',
    taxes: {
      primary: {
        rate: 0.005,
        basis: 'ПКУ ст. 266',
        notes: {
          en: 'Ukraine\'s property tax (податок на нерухоме майно) is charged at 1.5% of the minimum wage per m² above the exempt area (60m² for apartments, 120m² for houses). This calculator uses a value-based approximation. Kyiv may charge different rates.',
          ru: 'Налог на недвижимость в Украине взимается из расчёта 1,5% минимальной зарплаты за м² площади сверх льготного метража (60 м² для квартир, 120 м² для домов). Здесь используется приближение в % от стоимости.',
          uk: 'Податок на нерухоме майно в Україні стягується з розрахунку 1,5% мінімальної зарплати за м² площі понад пільговий метраж (60 м² для квартир, 120 м² для будинків). Тут використовується наближення у % від вартості.',
          fr: 'La taxe foncière ukrainienne est calculée à 1,5% du salaire minimum par m² au-delà de la surface exonérée (60m² pour les appartements, 120m² pour les maisons). Ce calculateur utilise une approximation basée sur la valeur.',
          lt: 'Ukrainos nekilnojamojo turto mokestis apskaičiuojamas 1,5% minimalaus atlyginimo už m² virš atleidžiamo ploto (60 m² butams, 120 m² namams). Šis skaičiuotuvas naudoja vertės pagrįstą apytikslį vertinimą.',
        },
      },
      secondary: { rate: 0.015, basis: 'ПКУ ст. 266', notes: { en: 'Secondary/investment property: same per-m² rate, but no area exemption. Large properties (300m²+) face 25 000 UAH surcharge per year.', ru: 'Вторичная/инвестиционная недвижимость: та же ставка за м², но без льготного метража. Объекты от 300 м² платят доплату 25 000 грн/год.', uk: 'Вторинна/інвестиційна нерухомість: та ж ставка за м², але без пільгового метражу. Об\'єкти від 300 м² сплачують доплату 25 000 грн/рік.', fr: 'Propriété secondaire/investissement : même taux au m², mais sans exonération de surface. Les grandes propriétés (300m²+) ont une surtaxe de 25 000 UAH/an.', lt: 'Antrinis/investicinis turtas: toks pat m² tarifas, bet be ploto atleidimo. Didesniems objektams (300m²+) taikoma 25 000 UAH priemoka per metus.' } },
      commercial: { rate: 0.02, basis: 'ПКУ ст. 266', notes: { en: 'Commercial property: up to 3% of minimum wage per m², no exemptions. Local councils set specific rates within the legal maximum.', ru: 'Коммерческая недвижимость: до 3% минимальной зарплаты за м², без льгот. Местные советы устанавливают конкретные ставки в пределах законодательного максимума.', uk: 'Комерційна нерухомість: до 3% мінімальної зарплати за м², без пільг. Місцеві ради встановлюють конкретні ставки в межах законодавчого максимуму.', fr: 'Propriété commerciale : jusqu\'à 3% du salaire minimum par m², sans exonérations. Les conseils locaux fixent les taux spécifiques dans la limite légale.', lt: 'Komercinis turtas: iki 3% minimalaus atlyginimo už m², be atleidimų. Vietinės tarybos nustato konkrečius tarifus teisinio maksimalaus ribose.' } },
      agriculture: { rate: 0.003, basis: 'ПКУ ст. 272 (плата за землю)', notes: { en: 'Agricultural land in Ukraine is subject to land payment (плата за землю), not property tax. Rate is 1% of the normative monetary valuation.', ru: 'Сельскохозяйственные угодья облагаются платой за землю (не налогом на имущество): 1% нормативной денежной оценки.', uk: 'Сільськогосподарські угіддя підлягають оплаті за землю (не податку на майно): 1% нормативної грошової оцінки.', fr: 'Les terres agricoles en Ukraine sont soumises à la taxe foncière (плата за землю), pas à la taxe immobilière. Taux : 1% de l\'évaluation normative.', lt: 'Žemės ūkio paskirties žemė Ukrainoje apmokestinama žemės mokesčiu (плата за землю), o ne nekilnojamojo turto mokesčiu. Tarifas: 1% normatyvinės piniginės vertinimo vertės.' } },
    },
  },
  us: {
    currency: 'USD', symbol: '$',
    taxes: {
      primary: {
        rate: 0.011,
        basis: 'State / County law (varies)',
        notes: {
          en: 'US property tax is levied by county/municipality, not federally. National average ~1.1% of assessed value. New Jersey (~2.2%), Illinois (~2.0%) are highest. Hawaii (~0.3%), Alabama (~0.4%) are lowest. Many states offer homestead exemptions for primary residences.',
          ru: 'Налог на недвижимость в США взимается на уровне округа/муниципалитета. Национальное среднее ~1,1% оценочной стоимости. Наибольшие: Нью-Джерси (~2,2%), Иллинойс (~2,0%). Наименьшие: Гавайи (~0,3%), Алабама (~0,4%). Многие штаты предоставляют освобождение для основного жилья.',
          uk: 'Податок на нерухомість у США стягується на рівні округу/муніципалітету. Національне середнє ~1,1% оціночної вартості. Найвищі: Нью-Джерсі (~2,2%), Іллінойс (~2,0%). Найнижчі: Гаваї (~0,3%), Алабама (~0,4%). Багато штатів надають пільгу для основного житла.',
          fr: 'La taxe foncière aux États-Unis est perçue par les comtés/municipalités. Moyenne nationale ~1,1% de la valeur imposable. New Jersey (~2,2%), Illinois (~2,0%) sont les plus élevés. Hawaii (~0,3%), Alabama (~0,4%) sont les plus bas. Beaucoup d\'États offrent des exonérations pour les résidences principales.',
          lt: 'JAV nekilnojamojo turto mokestis renkamas apskrities/savivaldybės lygiu. Nacionalinis vidurkis ~1,1% nuo vertinimo vertės. Didžiausi: Naujasis Džersis (~2,2%), Ilinojus (~2,0%). Mažiausi: Havajus (~0,3%), Alabama (~0,4%). Daugelis valstijų teikia pagrindinio būsto atleidimą.',
        },
      },
      secondary: { rate: 0.014, basis: 'State / County law', notes: { en: 'Secondary/investment properties typically do not qualify for homestead exemptions, resulting in a higher effective rate (~1.4% average). Short-term rental properties may face additional local taxes.', ru: 'Вторичная/инвестиционная недвижимость обычно не имеет права на освобождение (homestead exemption), что даёт более высокую эффективную ставку (~1,4%). Краткосрочная аренда может облагаться дополнительными местными налогами.', uk: 'Вторинна/інвестиційна нерухомість зазвичай не має права на пільгу (homestead exemption), що дає вищу ефективну ставку (~1,4%). Короткострокова оренда може обкладатися додатковими місцевими податками.', fr: 'Les propriétés secondaires/d\'investissement ne bénéficient généralement pas d\'exonérations homestead, entraînant un taux effectif plus élevé (~1,4%). Les locations courte durée peuvent faire face à des taxes locales supplémentaires.', lt: 'Antriniam/investiciniam turtui paprastai netaikomos homestead lengvatos, todėl efektyvus tarifas didesnis (~1,4% vidurkis). Trumpalaikei nuomai gali būti taikomi papildomi vietiniai mokesčiai.' } },
      commercial: { rate: 0.018, basis: 'State / County law', notes: { en: 'Commercial properties typically face higher effective rates (~1.5–2.5%). Some states assess commercial property at full market value vs. residential at lower percentages.', ru: 'Коммерческая недвижимость обычно имеет более высокие ставки (~1,5–2,5%). Ряд штатов оценивает коммерческую недвижимость по полной рыночной стоимости в отличие от жилой.', uk: 'Комерційна нерухомість зазвичай має вищі ставки (~1,5–2,5%). Ряд штатів оцінює комерційну нерухомість за повною ринковою вартістю, на відміну від житлової.', fr: 'Les propriétés commerciales font généralement face à des taux effectifs plus élevés (~1,5–2,5%). Certains États évaluent la propriété commerciale à la pleine valeur marchande contre des pourcentages plus faibles pour le résidentiel.', lt: 'Komercinis turtas paprastai turi aukštesnius efektyvius tarifus (~1,5–2,5%). Kai kurios valstijos vertina komercinį turtą pagal visą rinkos vertę, o gyvenamąjį - pagal mažesnius procentus.' } },
      agriculture: { rate: 0.005, basis: 'State law (varies by state)', notes: { en: 'Most US states offer preferential assessment for agricultural land (use-value assessment), resulting in much lower effective rates. Typical effective rate on market value ~0.3–0.7%.', ru: 'Большинство штатов США предоставляют льготную оценку для сельскохозяйственных угодий (оценка по использованию), что даёт значительно более низкие ставки. Типичная эффективная ставка ~0,3–0,7% рыночной стоимости.', uk: 'Більшість штатів США надають пільгову оцінку для сільськогосподарських угідь (оцінка за використанням), що дає значно нижчі ставки. Типова ефективна ставка ~0,3–0,7% ринкової вартості.', fr: 'La plupart des États américains offrent une évaluation préférentielle pour les terres agricoles (use-value assessment), entraînant des taux effectifs beaucoup plus bas. Taux effectif typique sur la valeur marchande ~0,3–0,7%.', lt: 'Dauguma JAV valstijų siūlo preferencinį žemės ūkio paskirties žemės vertinimą (naudojimo vertės vertinimas), o tai lemia daug mažesnius efektyvius tarifus. Tipinis efektyvus tarifas nuo rinkos vertės ~0,3–0,7%.' } },
    },
  },
  gb: {
    currency: 'GBP', symbol: '£',
    taxes: {
      primary: {
        rate: 0.005,
        basis: 'Local Government Finance Act 1992',
        notes: {
          en: 'UK council tax is a fixed annual charge per valuation band (A–H), not a % of market value. Typical council tax for band D (mid-range property) is £1 500–£4 000/year depending on council. This value-based estimate uses ~0.5% effective rate.',
          ru: 'Муниципальный налог в Великобритании — фиксированный ежегодный платёж по оценочному диапазону (A–H), не % от рыночной стоимости. Типичный налог по группе D: £1 500–4 000/год в зависимости от совета. Здесь использована приближённая ставка ~0,5%.',
          uk: 'Муніципальний податок у Великій Британії — фіксований щорічний платіж за оцінковим діапазоном (A–H), не % від ринкової вартості. Типовий податок по групі D: £1 500–4 000/рік залежно від ради. Тут використана наближена ставка ~0,5%.',
          fr: 'La taxe d\'habitation britannique (council tax) est une charge annuelle fixe par tranche de valorisation (A–H), pas un % de la valeur marchande. Council tax typique pour la tranche D : £1 500–4 000/an selon le conseil. Approximation ~0,5%.',
          lt: 'JK savivaldybių mokestis (council tax) yra fiksuotas metinis mokestis pagal vertinimo juostą (A–H), o ne % nuo rinkos vertės. Tipinis council tax D juostai: £1 500–4 000/metai priklausomai nuo tarybos. Čia naudojamas apytikslis ~0,5% tarifas.',
        },
      },
      secondary: { rate: 0.01, basis: 'Local Government Finance Act 1992 + council surcharges', notes: { en: 'From April 2025, councils can charge up to 300% council tax on second homes (previously 100%). Average additional charge: ~100% surcharge on top of standard rate. Effective rate estimate ~1%.', ru: 'С апреля 2025 г. советы могут взимать до 300% муниципального налога за второй дом (ранее 100%). Средняя доплата: ~100% к стандартной ставке. Приближённая эффективная ставка ~1%.', uk: 'З квітня 2025 р. ради можуть стягувати до 300% муніципального податку за другий будинок (раніше 100%). Середня доплата: ~100% до стандартної ставки. Наближена ефективна ставка ~1%.', fr: 'À partir d\'avril 2025, les conseils peuvent appliquer jusqu\'à 300% de la council tax sur les résidences secondaires (anciennement 100%). Majoration moyenne : ~100% en plus du taux standard. Taux effectif estimé ~1%.', lt: 'Nuo 2025 m. balandžio tarybos gali imti iki 300% council tax antriems namams (anksčiau 100%). Vidutinis priemoka: ~100% prie standartinio tarifo. Apytikslis efektyvus tarifas ~1%.' } },
      commercial: { rate: 0.0049, basis: 'Non-Domestic Rating', notes: { en: 'UK commercial property pays business rates (non-domestic rates), calculated as property rateable value × multiplier (~49.9p per £1 rateable value in 2024–25). This is NOT a % of market value. Estimate here uses ~0.49% of capital value.', ru: 'Коммерческая недвижимость в Великобритании платит деловые ставки (business rates): оценочная стоимость × коэффициент (~49,9 пенса за £1 оценочной стоимости в 2024–25). Это не % от рыночной стоимости. Здесь использована приближённая ставка ~0,49% капитальной стоимости.', uk: 'Комерційна нерухомість у Великій Британії сплачує ділові ставки (business rates): оціночна вартість × коефіцієнт (~49,9 пенсів за £1 оціночної вартості у 2024–25). Це не % від ринкової вартості.', fr: 'Les propriétés commerciales au Royaume-Uni paient des business rates (cotisation immobilière) : valeur locative cadastrale × multiplicateur (~49,9p par £1 de valeur locative en 2024–25). Ce n\'est pas un % de la valeur marchande.', lt: 'JK komercinis turtas moka verslo tarifus (business rates): vertinamos vertės × daugiklis (~49,9p už £1 vertinamos vertės 2024–25 m.). Tai NE % nuo rinkos vertės.' } },
      agriculture: { rate: 0, basis: 'Non-Domestic Rating: agricultural exemption', notes: { en: 'Agricultural land and farm buildings are fully exempt from business rates in the UK. Council tax does not apply to uninhabited agricultural land.', ru: 'Сельскохозяйственные угодья и сельскохозяйственные постройки полностью освобождены от деловых ставок в Великобритании. Муниципальный налог не применяется к незаселённым сельскохозяйственным угодьям.', uk: 'Сільськогосподарські угіддя та сільськогосподарські будівлі повністю звільнені від ділових ставок у Великій Британії. Муніципальний податок не застосовується до незаселених сільськогосподарських угідь.', fr: 'Les terres agricoles et les bâtiments agricoles sont totalement exonérés de business rates au Royaume-Uni. La council tax ne s\'applique pas aux terres agricoles non habitées.', lt: 'Žemės ūkio paskirties žemė ir ūkio pastatai JK yra visiškai atleisti nuo verslo tarifų. Council tax netaikomas neapgyvendintiems žemės ūkio sklypams.' } },
    },
  },
  ru: {
    currency: 'RUB', symbol: '₽',
    taxes: {
      primary: {
        rate: 0.001,
        basis: 'НК РФ Гл. 32 ст. 406',
        notes: {
          en: 'Russia\'s property tax rate for residential property is 0.1% of cadastral value. Properties with cadastral value above 300 million RUB are taxed at 2%. Many regions offer deductions (20 m² for apartments, 50 m² for houses). Moscow and St. Petersburg may set higher rates.',
          ru: 'Ставка налога на имущество физических лиц для жилых объектов — 0,1% кадастровой стоимости. Объекты дороже 300 млн ₽ облагаются по ставке 2%. Предусмотрены вычеты: 20 м² для квартир, 50 м² для домов. Москва и Санкт-Петербург могут устанавливать повышенные ставки.',
          uk: 'Ставка податку на майно фізичних осіб для житлових об\'єктів — 0,1% кадастрової вартості. Об\'єкти дорожче 300 млн ₽ оподатковуються за ставкою 2%. Передбачено вирахування: 20 м² для квартир, 50 м² для будинків.',
          fr: 'Le taux de taxe foncière russe pour les biens résidentiels est de 0,1% de la valeur cadastrale. Les biens d\'une valeur cadastrale supérieure à 300 millions de RUB sont taxés à 2%. Des déductions sont prévues (20 m² pour les appartements, 50 m² pour les maisons).',
          lt: 'Rusijos nekilnojamojo turto mokesčio tarifas gyvenamajam turtui yra 0,1% kadastrinės vertės. Turtas, kurio kadastrinė vertė viršija 300 mln. RUB, apmokestinamas 2% tarifu. Numatytos atskaitos: 20 m² butams, 50 m² namams.',
        },
      },
      secondary: { rate: 0.001, basis: 'НК РФ Гл. 32 ст. 406', notes: { en: 'Secondary residential property uses the same 0.1% rate. No area deduction for investment properties. Luxury surcharge (2%) applies if cadastral value exceeds 300 million RUB.', ru: 'Вторичная жилая недвижимость облагается по той же ставке 0,1%. Вычеты по площади не применяются. Объекты дороже 300 млн ₽ — по ставке 2%.', uk: 'Вторинна житлова нерухомість оподатковується за тією ж ставкою 0,1%. Вирахування за площею не застосовуються. Об\'єкти дорожче 300 млн ₽ — за ставкою 2%.', fr: 'Le bien résidentiel secondaire utilise le même taux de 0,1%. Pas de déduction de surface pour les biens d\'investissement. Surtaxe de luxe (2%) si la valeur cadastrale dépasse 300 millions RUB.', lt: 'Antrinis gyvenamasis turtas apmokestinamas tuo pačiu 0,1% tarifu. Ploto atskaita netaikoma. 2% tarifas, jei kadastrinė vertė viršija 300 mln. RUB.' } },
      commercial: { rate: 0.02, basis: 'НК РФ Гл. 32 ст. 406 + НК РФ Гл. 30', notes: { en: 'Commercial property (offices, retail, etc.) is taxed at up to 2% of cadastral value. Organizations also pay a corporate property tax (up to 2.2% of book value under Chapter 30). Rates are set by regional laws within federal limits.', ru: 'Коммерческая недвижимость (офисы, торговые помещения и пр.) облагается по ставке до 2% кадастровой стоимости. Организации также платят налог на имущество организаций (до 2,2% остаточной стоимости по Гл. 30 НК РФ). Ставки устанавливаются региональными законами.', uk: 'Комерційна нерухомість (офіси, торгові приміщення тощо) оподатковується за ставкою до 2% кадастрової вартості. Організації також сплачують податок на майно організацій (до 2,2%). Ставки встановлюються регіональними законами.', fr: 'Les biens commerciaux (bureaux, commerces, etc.) sont taxés jusqu\'à 2% de la valeur cadastrale. Les organisations paient également une taxe foncière d\'entreprise (jusqu\'à 2,2% de la valeur comptable). Les taux sont fixés par les lois régionales.', lt: 'Komercinis turtas (biurai, mažmeninė prekyba ir kt.) apmokestinamas iki 2% kadastrinės vertės. Organizacijos taip pat moka nekilnojamojo turto mokestį (iki 2,2% balansinės vertės). Tarifus nustato regioniniai įstatymai.' } },
      agriculture: { rate: 0.003, basis: 'НК РФ Гл. 31 ст. 394 (земельный налог)', notes: { en: 'Agricultural land in Russia is subject to land tax (земельный налог) at 0.3% of cadastral value, not property tax. Local authorities may set lower rates. Tax benefits available for certain agricultural organisations.', ru: 'Сельскохозяйственные угодья в России облагаются земельным налогом по ставке 0,3% кадастровой стоимости (а не налогом на имущество). Местные органы власти могут устанавливать более низкие ставки. Для ряда сельскохозяйственных организаций предусмотрены льготы.', uk: 'Сільськогосподарські угіддя в Росії підлягають земельному податку за ставкою 0,3% кадастрової вартості (не податку на майно). Місцеві органи влади можуть встановлювати нижчі ставки.', fr: 'Les terres agricoles en Russie sont soumises à la taxe foncière (земельный налог) à 0,3% de la valeur cadastrale, pas à la taxe immobilière. Les autorités locales peuvent fixer des taux inférieurs.', lt: 'Žemės ūkio paskirties žemė Rusijoje apmokestinama žemės mokesčiu (земельный налог) 0,3% kadastrinės vertės, o ne nekilnojamojo turto mokesčiu. Vietos valdžia gali nustatyti mažesnius tarifus.' } },
    },
  },
};

const COUNTRY_LABELS: Record<LangKey, Record<string, string>> = {
  en: { de: 'Germany', fr: 'France', pl: 'Poland', lt: 'Lithuania', ua: 'Ukraine', us: 'USA', gb: 'United Kingdom', ru: 'Russia' },
  ru: { de: 'Германия', fr: 'Франция', pl: 'Польша', lt: 'Литва', ua: 'Украина', us: 'США', gb: 'Великобритания', ru: 'Россия' },
  uk: { de: 'Німеччина', fr: 'Франція', pl: 'Польща', lt: 'Литва', ua: 'Україна', us: 'США', gb: 'Велика Британія', ru: 'Росія' },
  fr: { de: 'Allemagne', fr: 'France', pl: 'Pologne', lt: 'Lituanie', ua: 'Ukraine', us: 'États-Unis', gb: 'Royaume-Uni', ru: 'Russie' },
  lt: { de: 'Vokietija', fr: 'Prancūzija', pl: 'Lenkija', lt: 'Lietuva', ua: 'Ukraina', us: 'JAV', gb: 'Jungtinė Karalystė', ru: 'Rusija' },
};

function fmt(val: number, symbol: string): string {
  return symbol + val.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export default function PropertyTaxCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [country, setCountry] = useState('');
  const [propType, setPropType] = useState<PropertyType | ''>('');
  const [value, setValue] = useState('');
  const [result, setResult] = useState<{ annual: number; monthly: number; rate: number; symbol: string; basis: string; notes: string } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!country || !propType || !value) { setError(t.errFields); return; }
    const val = parseFloat(value.replace(/\s/g, '').replace(/,/g, ''));
    if (isNaN(val) || val < 1000 || val > 100_000_000) { setError(t.errValue); return; }
    setError('');

    const cfg = COUNTRIES[country];
    const entry = cfg.taxes[propType];
    const annual = Math.round(val * entry.rate);
    setResult({
      annual,
      monthly: Math.round(annual / 12),
      rate: entry.rate * 100,
      symbol: cfg.symbol,
      basis: entry.basis,
      notes: entry.notes[lang],
    });
  };

  const reset = () => { setCountry(''); setPropType(''); setValue(''); setResult(null); setError(''); };

  const typeOptions: [PropertyType, string][] = [
    ['primary', t.typePrimary], ['secondary', t.typeSecondary],
    ['commercial', t.typeCommercial], ['agriculture', t.typeAgriculture],
  ];

  return (
    <div className={styles['ptax-calc']}>
      <div className={styles['ptax-calc__form']}>
        <div className={styles['ptax-calc__field']}>
          <label className={styles['ptax-calc__label']}>{t.country}</label>
          <select className={styles['ptax-calc__select']} value={country} onChange={e => { setCountry(e.target.value); setResult(null); setError(''); }}>
            <option value="">—</option>
            {Object.keys(COUNTRIES).map(k => <option key={k} value={k}>{COUNTRY_LABELS[lang][k]}</option>)}
          </select>
        </div>

        <div className={styles['ptax-calc__field']}>
          <label className={styles['ptax-calc__label']}>{t.propertyType}</label>
          <select className={styles['ptax-calc__select']} value={propType} onChange={e => { setPropType(e.target.value as PropertyType); setResult(null); setError(''); }}>
            <option value="">—</option>
            {typeOptions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        <div className={styles['ptax-calc__field']}>
          <label className={styles['ptax-calc__label']}>{t.propertyValue}</label>
          <input
            type="number"
            className={styles['ptax-calc__input']}
            value={value}
            min={1000} max={100000000} step={1000}
            placeholder={t.placeholder}
            onChange={e => { setValue(e.target.value); setResult(null); setError(''); }}
          />
        </div>
      </div>

      {error && <p className={styles['ptax-calc__error']}>{error}</p>}

      <div className={styles['ptax-calc__actions']}>
        <button type="button" className={styles['ptax-calc__btn']} onClick={calculate}>{t.calculate}</button>
        <button type="button" className={styles['ptax-calc__btn--reset']} onClick={reset}>{t.reset}</button>
      </div>

      {result && (
        <div className={styles['ptax-calc__result']}>
          <div className={styles['ptax-calc__result-grid']}>
            <div className={styles['ptax-calc__result-item']}>
              <span className={styles['ptax-calc__result-label']}>{t.annualTax}</span>
              <span className={styles['ptax-calc__result-value']}>{fmt(result.annual, result.symbol)}</span>
            </div>
            <div className={styles['ptax-calc__result-item']}>
              <span className={styles['ptax-calc__result-label']}>{t.monthlyTax}</span>
              <span className={styles['ptax-calc__result-value']}>{fmt(result.monthly, result.symbol)}</span>
            </div>
            <div className={styles['ptax-calc__result-item']}>
              <span className={styles['ptax-calc__result-label']}>{t.effectiveRate}</span>
              <span className={styles['ptax-calc__result-value']}>{result.rate.toFixed(2)}%</span>
            </div>
          </div>

          <div className={styles['ptax-calc__basis']}>
            <span className={styles['ptax-calc__basis-label']}>{t.basis}:</span> {result.basis}
          </div>

          <p className={styles['ptax-calc__notes']}>{result.notes}</p>
        </div>
      )}
    </div>
  );
}

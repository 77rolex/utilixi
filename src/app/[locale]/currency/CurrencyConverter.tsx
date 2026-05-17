'use client';

import { useState, useMemo, useRef, useEffect, Fragment } from 'react';
import styles from './CurrencyConverter.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

// Full currency names in 5 languages
const CURRENCY_NAMES: Record<string, Partial<Record<LangKey, string>>> = {
  AED: { en: 'UAE Dirham', ru: 'Дирхам ОАЭ', uk: 'Дирхам ОАЕ', fr: 'Dirham des EAU', lt: 'JA Emyratų dirhamas' },
  AFN: { en: 'Afghan Afghani', ru: 'Афганский афгани', uk: 'Афганський афгані', fr: 'Afghani afghan', lt: 'Afganistano afganas' },
  ALL: { en: 'Albanian Lek', ru: 'Албанский лек', uk: 'Албанський лек', fr: 'Lek albanais', lt: 'Albanijos lekas' },
  AMD: { en: 'Armenian Dram', ru: 'Армянский драм', uk: 'Вірменський драм', fr: 'Dram arménien', lt: 'Armėnijos dramas' },
  ANG: { en: 'Antillean Guilder', ru: 'Антильский гульден', uk: 'Антильський гульден', fr: 'Florin antillais', lt: 'Antilų guldenas' },
  AOA: { en: 'Angolan Kwanza', ru: 'Ангольская кванза', uk: 'Ангольська кванза', fr: 'Kwanza angolais', lt: 'Angolos kvanza' },
  ARS: { en: 'Argentine Peso', ru: 'Аргентинское песо', uk: 'Аргентинське песо', fr: 'Peso argentin', lt: 'Argentinos pesas' },
  AUD: { en: 'Australian Dollar', ru: 'Австралийский доллар', uk: 'Австралійський долар', fr: 'Dollar australien', lt: 'Australijos doleris' },
  AZN: { en: 'Azerbaijani Manat', ru: 'Азербайджанский манат', uk: 'Азербайджанський манат', fr: 'Manat azerbaïdjanais', lt: 'Azerbaidžano manatas' },
  BAM: { en: 'Bosnia-Herzegovina Mark', ru: 'Боснийская марка', uk: 'Боснійська марка', fr: 'Mark de Bosnie-Herzégovine', lt: 'Bosnijos markė' },
  BBD: { en: 'Barbadian Dollar', ru: 'Барбадосский доллар', uk: 'Барбадоський долар', fr: 'Dollar barbadien', lt: 'Barbadoso doleris' },
  BDT: { en: 'Bangladeshi Taka', ru: 'Бангладешская така', uk: 'Бангладеська така', fr: 'Taka bangladais', lt: 'Bangladešo taka' },
  BGN: { en: 'Bulgarian Lev', ru: 'Болгарский лев', uk: 'Болгарський лев', fr: 'Lev bulgare', lt: 'Bulgarijos levas' },
  BHD: { en: 'Bahraini Dinar', ru: 'Бахрейнский динар', uk: 'Бахрейнський динар', fr: 'Dinar bahreïni', lt: 'Bahreino dinaras' },
  BIF: { en: 'Burundian Franc', ru: 'Бурундийский франк', uk: 'Бурундійський франк', fr: 'Franc burundais', lt: 'Burundžio frankas' },
  BND: { en: 'Brunei Dollar', ru: 'Брунейский доллар', uk: 'Брунейський долар', fr: 'Dollar de Brunei', lt: 'Brunėjaus doleris' },
  BOB: { en: 'Bolivian Boliviano', ru: 'Боливийский боливиано', uk: 'Болівійський болівіано', fr: 'Boliviano bolivien', lt: 'Bolivijos bolivianas' },
  BRL: { en: 'Brazilian Real', ru: 'Бразильский реал', uk: 'Бразильський реал', fr: 'Réal brésilien', lt: 'Brazilijos realas' },
  BSD: { en: 'Bahamian Dollar', ru: 'Багамский доллар', uk: 'Багамський долар', fr: 'Dollar des Bahamas', lt: 'Bahamų doleris' },
  BWP: { en: 'Botswana Pula', ru: 'Ботсванская пула', uk: 'Ботсванська пула', fr: 'Pula du Botswana', lt: 'Botsvanos pula' },
  BYN: { en: 'Belarusian Ruble', ru: 'Белорусский рубль', uk: 'Білоруський рубль', fr: 'Rouble biélorusse', lt: 'Baltarusijos rublis' },
  BZD: { en: 'Belize Dollar', ru: 'Белизский доллар', uk: 'Белізський долар', fr: 'Dollar de Belize', lt: 'Belizo doleris' },
  CAD: { en: 'Canadian Dollar', ru: 'Канадский доллар', uk: 'Канадський долар', fr: 'Dollar canadien', lt: 'Kanados doleris' },
  CHF: { en: 'Swiss Franc', ru: 'Швейцарский франк', uk: 'Швейцарський франк', fr: 'Franc suisse', lt: 'Šveicarijos frankas' },
  CLP: { en: 'Chilean Peso', ru: 'Чилийское песо', uk: 'Чилійське песо', fr: 'Peso chilien', lt: 'Čilės pesas' },
  CNY: { en: 'Chinese Yuan', ru: 'Китайский юань', uk: 'Китайський юань', fr: 'Yuan chinois', lt: 'Kinijos juanis' },
  COP: { en: 'Colombian Peso', ru: 'Колумбийское песо', uk: 'Колумбійське песо', fr: 'Peso colombien', lt: 'Kolumbijos pesas' },
  CRC: { en: 'Costa Rican Colón', ru: 'Костариканский колон', uk: 'Костариканський колон', fr: 'Colón costaricain', lt: 'Kosta Rikos kolonas' },
  CZK: { en: 'Czech Koruna', ru: 'Чешская крона', uk: 'Чеська крона', fr: 'Couronne tchèque', lt: 'Čekijos krona' },
  DJF: { en: 'Djiboutian Franc', ru: 'Джибутийский франк', uk: 'Джибутійський франк', fr: 'Franc djiboutien', lt: 'Džibučio frankas' },
  DKK: { en: 'Danish Krone', ru: 'Датская крона', uk: 'Данська крона', fr: 'Couronne danoise', lt: 'Danijos krona' },
  DOP: { en: 'Dominican Peso', ru: 'Доминиканское песо', uk: 'Домініканське песо', fr: 'Peso dominicain', lt: 'Dominikos pesas' },
  DZD: { en: 'Algerian Dinar', ru: 'Алжирский динар', uk: 'Алжирський динар', fr: 'Dinar algérien', lt: 'Alžyro dinaras' },
  EGP: { en: 'Egyptian Pound', ru: 'Египетский фунт', uk: 'Єгипетський фунт', fr: 'Livre égyptienne', lt: 'Egipto svaras' },
  ERN: { en: 'Eritrean Nakfa', ru: 'Эритрейская накфа', uk: 'Еритрейська накфа', fr: 'Nakfa érythréen', lt: 'Eritrėjos nakfa' },
  ETB: { en: 'Ethiopian Birr', ru: 'Эфиопский быр', uk: 'Ефіопський бир', fr: 'Birr éthiopien', lt: 'Etiopijos biras' },
  EUR: { en: 'Euro', ru: 'Евро', uk: 'Євро', fr: 'Euro', lt: 'Euras' },
  FJD: { en: 'Fijian Dollar', ru: 'Фиджийский доллар', uk: 'Фіджійський долар', fr: 'Dollar fidjien', lt: 'Fidžio doleris' },
  FKP: { en: 'Falkland Islands Pound', ru: 'Фолклендский фунт', uk: 'Фолклендський фунт', fr: 'Livre des Malouines', lt: 'Folklendo salų svaras' },
  GBP: { en: 'British Pound', ru: 'Британский фунт', uk: 'Британський фунт', fr: 'Livre sterling', lt: 'Britanijos svaras' },
  GEL: { en: 'Georgian Lari', ru: 'Грузинский лари', uk: 'Грузинський ларі', fr: 'Lari géorgien', lt: 'Gruzijos laris' },
  GHS: { en: 'Ghanaian Cedi', ru: 'Ганский седи', uk: 'Ганський седі', fr: 'Cedi ghanéen', lt: 'Ganos cedis' },
  GIP: { en: 'Gibraltar Pound', ru: 'Гибралтарский фунт', uk: 'Гібралтарський фунт', fr: 'Livre de Gibraltar', lt: 'Gibraltaro svaras' },
  GMD: { en: 'Gambian Dalasi', ru: 'Гамбийский даласи', uk: 'Гамбійський даласі', fr: 'Dalasi gambien', lt: 'Gambijos dalasis' },
  GTQ: { en: 'Guatemalan Quetzal', ru: 'Гватемальский кетсаль', uk: 'Гватемальський кетсаль', fr: 'Quetzal guatémaltèque', lt: 'Gvatemalos kecalas' },
  GYD: { en: 'Guyanese Dollar', ru: 'Гайанский доллар', uk: 'Гаянський долар', fr: 'Dollar guyanien', lt: 'Gajanos doleris' },
  HKD: { en: 'Hong Kong Dollar', ru: 'Гонконгский доллар', uk: 'Гонконгський долар', fr: 'Dollar de Hong Kong', lt: 'Honkongo doleris' },
  HNL: { en: 'Honduran Lempira', ru: 'Гондурасская лемпира', uk: 'Гондураська лемпіра', fr: 'Lempira hondurien', lt: 'Hondūro lempira' },
  HTG: { en: 'Haitian Gourde', ru: 'Гаитянский гурд', uk: 'Гаїтянський гурд', fr: 'Gourde haïtienne', lt: 'Haičio gurdo' },
  HUF: { en: 'Hungarian Forint', ru: 'Венгерский форинт', uk: 'Угорський форинт', fr: 'Forint hongrois', lt: 'Vengrijos forintas' },
  IDR: { en: 'Indonesian Rupiah', ru: 'Индонезийская рупия', uk: 'Індонезійська рупія', fr: 'Roupie indonésienne', lt: 'Indonezijos rupija' },
  ILS: { en: 'Israeli Shekel', ru: 'Израильский шекель', uk: 'Ізраїльський шекель', fr: 'Shekel israélien', lt: 'Izraelio šekelis' },
  INR: { en: 'Indian Rupee', ru: 'Индийская рупия', uk: 'Індійська рупія', fr: 'Roupie indienne', lt: 'Indijos rupija' },
  IQD: { en: 'Iraqi Dinar', ru: 'Иракский динар', uk: 'Іракський динар', fr: 'Dinar irakien', lt: 'Irako dinaras' },
  IRR: { en: 'Iranian Rial', ru: 'Иранский риал', uk: 'Іранський ріал', fr: 'Rial iranien', lt: 'Irano rialas' },
  ISK: { en: 'Icelandic Króna', ru: 'Исландская крона', uk: 'Ісландська крона', fr: 'Couronne islandaise', lt: 'Islandijos krona' },
  JMD: { en: 'Jamaican Dollar', ru: 'Ямайский доллар', uk: 'Ямайський долар', fr: 'Dollar jamaïcain', lt: 'Jamaikos doleris' },
  JOD: { en: 'Jordanian Dinar', ru: 'Иорданский динар', uk: 'Йорданський динар', fr: 'Dinar jordanien', lt: 'Jordanijos dinaras' },
  JPY: { en: 'Japanese Yen', ru: 'Японская иена', uk: 'Японська єна', fr: 'Yen japonais', lt: 'Japonijos jena' },
  KES: { en: 'Kenyan Shilling', ru: 'Кенийский шиллинг', uk: 'Кенійський шилінг', fr: 'Shilling kényan', lt: 'Kenijos šilingas' },
  KGS: { en: 'Kyrgyz Som', ru: 'Киргизский сом', uk: 'Киргизький сом', fr: 'Som kirghiz', lt: 'Kirgizijos somas' },
  KHR: { en: 'Cambodian Riel', ru: 'Камбоджийский риель', uk: 'Камбоджійський рієль', fr: 'Riel cambodgien', lt: 'Kambodžos rielis' },
  KMF: { en: 'Comorian Franc', ru: 'Коморский франк', uk: 'Коморський франк', fr: 'Franc comorien', lt: 'Komorų frankas' },
  KRW: { en: 'South Korean Won', ru: 'Южнокорейская вона', uk: 'Південнокорейська вона', fr: 'Won sud-coréen', lt: 'Pietų Korėjos vonas' },
  KWD: { en: 'Kuwaiti Dinar', ru: 'Кувейтский динар', uk: 'Кувейтський динар', fr: 'Dinar koweïtien', lt: 'Kuveito dinaras' },
  KYD: { en: 'Cayman Islands Dollar', ru: 'Каймановый доллар', uk: 'Кайманський долар', fr: 'Dollar des Îles Caïmans', lt: 'Kaimanų salų doleris' },
  KZT: { en: 'Kazakhstani Tenge', ru: 'Казахстанский тенге', uk: 'Казахстанський тенге', fr: 'Tenge kazakh', lt: 'Kazachstano tengė' },
  LAK: { en: 'Lao Kip', ru: 'Лаосский кип', uk: 'Лаоський кіп', fr: 'Kip laotien', lt: 'Laoso kipas' },
  LBP: { en: 'Lebanese Pound', ru: 'Ливанский фунт', uk: 'Ліванський фунт', fr: 'Livre libanaise', lt: 'Libano svaras' },
  LKR: { en: 'Sri Lankan Rupee', ru: 'Шри-ланкийская рупия', uk: 'Шрі-ланкійська рупія', fr: 'Roupie sri-lankaise', lt: 'Šri Lankos rupija' },
  LRD: { en: 'Liberian Dollar', ru: 'Либерийский доллар', uk: 'Ліберійський долар', fr: 'Dollar libérien', lt: 'Liberijos doleris' },
  LYD: { en: 'Libyan Dinar', ru: 'Ливийский динар', uk: 'Лівійський динар', fr: 'Dinar libyen', lt: 'Libijos dinaras' },
  MAD: { en: 'Moroccan Dirham', ru: 'Марокканский дирхам', uk: 'Марокканський дирхам', fr: 'Dirham marocain', lt: 'Maroko dirhamas' },
  MDL: { en: 'Moldovan Leu', ru: 'Молдавский лей', uk: 'Молдовський лей', fr: 'Leu moldave', lt: 'Moldovos lėjas' },
  MGA: { en: 'Malagasy Ariary', ru: 'Малагасийский ариари', uk: 'Малагасійський аріарі', fr: 'Ariary malgache', lt: 'Madagaskaro ariaras' },
  MKD: { en: 'Macedonian Denar', ru: 'Македонский денар', uk: 'Македонський денар', fr: 'Denar macédonien', lt: 'Makedonijos denaras' },
  MMK: { en: 'Myanmar Kyat', ru: 'Мьянманский кьят', uk: "М'янманський кьят", fr: 'Kyat myanmar', lt: 'Mianmaro kjatas' },
  MNT: { en: 'Mongolian Tögrög', ru: 'Монгольский тугрик', uk: 'Монгольський тугрик', fr: 'Tögrög mongol', lt: 'Mongolijos tugricas' },
  MOP: { en: 'Macanese Pataca', ru: 'Макаосская патака', uk: 'Макаоська патака', fr: 'Pataca macanaise', lt: 'Makao pataka' },
  MRU: { en: 'Mauritanian Ouguiya', ru: 'Мавританская угия', uk: 'Мавританська угія', fr: 'Ouguiya mauritanien', lt: 'Mauritanijos ugija' },
  MUR: { en: 'Mauritian Rupee', ru: 'Маврикийская рупия', uk: 'Маврикійська рупія', fr: 'Roupie mauricienne', lt: 'Mauricijaus rupija' },
  MVR: { en: 'Maldivian Rufiyaa', ru: 'Мальдивская руфия', uk: 'Мальдівська руфія', fr: 'Rufiyaa maldivien', lt: 'Maldyvų rufija' },
  MWK: { en: 'Malawian Kwacha', ru: 'Малавийская квача', uk: 'Малавійська квача', fr: 'Kwacha malawien', lt: 'Malavio kvača' },
  MXN: { en: 'Mexican Peso', ru: 'Мексиканское песо', uk: 'Мексиканське песо', fr: 'Peso mexicain', lt: 'Meksikos pesas' },
  MYR: { en: 'Malaysian Ringgit', ru: 'Малайзийский ринггит', uk: 'Малайзійський рингіт', fr: 'Ringgit malaisien', lt: 'Malaizijos ringitas' },
  MZN: { en: 'Mozambican Metical', ru: 'Мозамбикский метикал', uk: 'Мозамбікський метикал', fr: 'Metical mozambicain', lt: 'Mozambiko metikalas' },
  NAD: { en: 'Namibian Dollar', ru: 'Намибийский доллар', uk: 'Намібійський долар', fr: 'Dollar namibien', lt: 'Namibijos doleris' },
  NGN: { en: 'Nigerian Naira', ru: 'Нигерийская найра', uk: 'Нігерійська найра', fr: 'Naira nigérian', lt: 'Nigerijos naira' },
  NIO: { en: 'Nicaraguan Córdoba', ru: 'Никарагуанская кордоба', uk: 'Нікарагуанська кордоба', fr: 'Córdoba nicaraguayen', lt: 'Nikaragvos kordoba' },
  NOK: { en: 'Norwegian Krone', ru: 'Норвежская крона', uk: 'Норвезька крона', fr: 'Couronne norvégienne', lt: 'Norvegijos krona' },
  NPR: { en: 'Nepalese Rupee', ru: 'Непальская рупия', uk: 'Непальська рупія', fr: 'Roupie népalaise', lt: 'Nepalo rupija' },
  NZD: { en: 'New Zealand Dollar', ru: 'Новозеландский доллар', uk: 'Новозеландський долар', fr: 'Dollar néo-zélandais', lt: 'Naujosios Zelandijos doleris' },
  OMR: { en: 'Omani Rial', ru: 'Оманский риал', uk: 'Оманський ріал', fr: 'Rial omanais', lt: 'Omano rialas' },
  PAB: { en: 'Panamanian Balboa', ru: 'Панамское бальбоа', uk: 'Панамське бальбоа', fr: 'Balboa panaméen', lt: 'Panamos balboja' },
  PEN: { en: 'Peruvian Sol', ru: 'Перуанский соль', uk: 'Перуанський соль', fr: 'Sol péruvien', lt: 'Peru solis' },
  PGK: { en: 'Papua New Guinean Kina', ru: 'Кина Папуа — Новой Гвинеи', uk: 'Кіна Папуа — Нової Гвінеї', fr: 'Kina de Papouasie', lt: 'Papua Naujosios Gvinėjos kina' },
  PHP: { en: 'Philippine Peso', ru: 'Филиппинское песо', uk: 'Філіппінське песо', fr: 'Peso philippin', lt: 'Filipinų pesas' },
  PKR: { en: 'Pakistani Rupee', ru: 'Пакистанская рупия', uk: 'Пакистанська рупія', fr: 'Roupie pakistanaise', lt: 'Pakistano rupija' },
  PLN: { en: 'Polish Zloty', ru: 'Польский злотый', uk: 'Польський злотий', fr: 'Zloty polonais', lt: 'Lenkijos zlotas' },
  PYG: { en: 'Paraguayan Guaraní', ru: 'Парагвайский гуарани', uk: 'Парагвайський гуарані', fr: 'Guaraní paraguayen', lt: 'Paragvajaus guaranis' },
  QAR: { en: 'Qatari Riyal', ru: 'Катарский риял', uk: 'Катарський ріял', fr: 'Riyal qatari', lt: 'Kataro rialas' },
  RON: { en: 'Romanian Leu', ru: 'Румынский лей', uk: 'Румунський лей', fr: 'Leu roumain', lt: 'Rumunijos lėjas' },
  RSD: { en: 'Serbian Dinar', ru: 'Сербский динар', uk: 'Сербський динар', fr: 'Dinar serbe', lt: 'Serbijos dinaras' },
  RUB: { en: 'Russian Ruble', ru: 'Российский рубль', uk: 'Російський рубль', fr: 'Rouble russe', lt: 'Rusijos rublis' },
  RWF: { en: 'Rwandan Franc', ru: 'Руандийский франк', uk: 'Руандійський франк', fr: 'Franc rwandais', lt: 'Ruandos frankas' },
  SAR: { en: 'Saudi Riyal', ru: 'Саудовский риял', uk: 'Саудівський ріял', fr: 'Riyal saoudien', lt: 'Saudo Arabijos rialas' },
  SBD: { en: 'Solomon Islands Dollar', ru: 'Соломонов доллар', uk: 'Соломоновий долар', fr: 'Dollar des Îles Salomon', lt: 'Saliamono Salų doleris' },
  SCR: { en: 'Seychellois Rupee', ru: 'Сейшельская рупия', uk: 'Сейшельська рупія', fr: 'Roupie seychelloise', lt: 'Seišelių rupija' },
  SDG: { en: 'Sudanese Pound', ru: 'Суданский фунт', uk: 'Суданський фунт', fr: 'Livre soudanaise', lt: 'Sudano svaras' },
  SEK: { en: 'Swedish Krona', ru: 'Шведская крона', uk: 'Шведська крона', fr: 'Couronne suédoise', lt: 'Švedijos krona' },
  SGD: { en: 'Singapore Dollar', ru: 'Сингапурский доллар', uk: 'Сінгапурський долар', fr: 'Dollar de Singapour', lt: 'Singapūro doleris' },
  SHP: { en: 'Saint Helena Pound', ru: 'Фунт острова Святой Елены', uk: 'Фунт острова Святої Єлени', fr: 'Livre de Sainte-Hélène', lt: 'Šventosios Elenos salos svaras' },
  SLE: { en: 'Sierra Leonean Leone', ru: 'Сьерра-леонский леоне', uk: 'Сьєрра-леонський леоне', fr: 'Leone sierra-léonais', lt: 'Siera Leonės leonė' },
  SOS: { en: 'Somali Shilling', ru: 'Сомалийский шиллинг', uk: 'Сомалійський шилінг', fr: 'Shilling somalien', lt: 'Somalio šilingas' },
  SRD: { en: 'Surinamese Dollar', ru: 'Суринамский доллар', uk: 'Суринамський долар', fr: 'Dollar surinamais', lt: 'Surinamo doleris' },
  SSP: { en: 'South Sudanese Pound', ru: 'Южносуданский фунт', uk: 'Південносуданський фунт', fr: 'Livre sud-soudanaise', lt: 'Pietų Sudano svaras' },
  STN: { en: 'São Tomé Dobra', ru: 'Добра Сан-Томе и Принсипи', uk: 'Добра Сан-Томе і Прінсіпі', fr: 'Dobra de São Tomé', lt: 'San Tomė dobra' },
  SVC: { en: 'Salvadoran Colón', ru: 'Сальвадорский колон', uk: 'Сальвадорський колон', fr: 'Colón salvadorien', lt: 'Salvadoro kolonas' },
  SYP: { en: 'Syrian Pound', ru: 'Сирийский фунт', uk: 'Сирійський фунт', fr: 'Livre syrienne', lt: 'Sirijos svaras' },
  SZL: { en: 'Swazi Lilangeni', ru: 'Свазилендский лилангени', uk: 'Свазіледнський ліланґені', fr: 'Lilangeni swazi', lt: 'Svazilendo lilangenė' },
  THB: { en: 'Thai Baht', ru: 'Тайский бат', uk: 'Тайський бат', fr: 'Baht thaïlandais', lt: 'Tailando batas' },
  TJS: { en: 'Tajikistani Somoni', ru: 'Таджикский сомони', uk: 'Таджицький сомоні', fr: 'Somoni tadjik', lt: 'Tadžikistano somonis' },
  TMT: { en: 'Turkmenistani Manat', ru: 'Туркменский манат', uk: 'Туркменський манат', fr: 'Manat turkmène', lt: 'Turkmėnistano manatas' },
  TND: { en: 'Tunisian Dinar', ru: 'Тунисский динар', uk: 'Туніський динар', fr: 'Dinar tunisien', lt: 'Tuniso dinaras' },
  TOP: { en: 'Tongan Paʻanga', ru: 'Тонганская паанга', uk: 'Тонганська паанга', fr: 'Paʻanga tongien', lt: 'Tongo paanga' },
  TRY: { en: 'Turkish Lira', ru: 'Турецкая лира', uk: 'Турецька ліра', fr: 'Livre turque', lt: 'Turkijos lira' },
  TTD: { en: 'Trinidad & Tobago Dollar', ru: 'Доллар Тринидада и Тобаго', uk: 'Долар Тринідаду і Тобаго', fr: 'Dollar de Trinité-et-Tobago', lt: 'Trinidado ir Tobago doleris' },
  TVD: { en: 'Tuvaluan Dollar', ru: 'Тувалуанский доллар', uk: 'Тувалуанський долар', fr: 'Dollar tuvaluan', lt: 'Tuvalu doleris' },
  TWD: { en: 'Taiwan Dollar', ru: 'Тайваньский доллар', uk: 'Тайванський долар', fr: 'Dollar taïwanais', lt: 'Taivano doleris' },
  TZS: { en: 'Tanzanian Shilling', ru: 'Танзанийский шиллинг', uk: 'Танзанійський шилінг', fr: 'Shilling tanzanien', lt: 'Tanzanijos šilingas' },
  UAH: { en: 'Ukrainian Hryvnia', ru: 'Украинская гривна', uk: 'Українська гривня', fr: 'Hryvnia ukrainienne', lt: 'Ukrainos grivna' },
  UGX: { en: 'Ugandan Shilling', ru: 'Угандийский шиллинг', uk: 'Угандійський шилінг', fr: 'Shilling ougandais', lt: 'Ugandos šilingas' },
  USD: { en: 'US Dollar', ru: 'Доллар США', uk: 'Долар США', fr: 'Dollar américain', lt: 'JAV doleris' },
  UYU: { en: 'Uruguayan Peso', ru: 'Уругвайское песо', uk: 'Уругвайське песо', fr: 'Peso uruguayen', lt: 'Urugvajaus pesas' },
  UZS: { en: 'Uzbekistani Som', ru: 'Узбекский сум', uk: 'Узбецький сум', fr: 'Sum ouzbek', lt: 'Uzbekistano sumas' },
  VES: { en: 'Venezuelan Bolívar', ru: 'Венесуэльский боливар', uk: 'Венесуельський болівар', fr: 'Bolívar vénézuélien', lt: 'Venesuelos bolivaras' },
  VND: { en: 'Vietnamese Dong', ru: 'Вьетнамский донг', uk: "В'єтнамський донг", fr: 'Dong vietnamien', lt: 'Vietnamo dongas' },
  VUV: { en: 'Vanuatu Vatu', ru: 'Вануатский вату', uk: 'Вануатський вату', fr: 'Vatu vanuatuan', lt: 'Vanuatu vatu' },
  WST: { en: 'Samoan Tālā', ru: 'Самоанская тала', uk: 'Самоанська тала', fr: 'Tālā samoan', lt: 'Samoa tala' },
  XAF: { en: 'Central African CFA Franc', ru: 'Франк КФА Центральной Африки', uk: 'Франк КФА Центральної Африки', fr: "Franc CFA d'Afrique centrale", lt: 'Centrinės Afrikos CFA frankas' },
  XCD: { en: 'East Caribbean Dollar', ru: 'Восточнокарибский доллар', uk: 'Східнокарибський долар', fr: 'Dollar des Caraïbes orientales', lt: 'Rytų Karibų doleris' },
  XOF: { en: 'West African CFA Franc', ru: 'Франк КФА Западной Африки', uk: 'Франк КФА Західної Африки', fr: "Franc CFA d'Afrique de l'Ouest", lt: 'Vakarų Afrikos CFA frankas' },
  XPF: { en: 'CFP Franc', ru: 'Французский тихоокеанский франк', uk: 'Французький тихоокеанський франк', fr: 'Franc CFP', lt: 'CFP frankas' },
  YER: { en: 'Yemeni Rial', ru: 'Йеменский риал', uk: 'Єменський ріал', fr: 'Rial yéménite', lt: 'Jemeno rialas' },
  ZAR: { en: 'South African Rand', ru: 'Южноафриканский рэнд', uk: 'Південноафриканський ренд', fr: 'Rand sud-africain', lt: 'Pietų Afrikos randas' },
  ZMW: { en: 'Zambian Kwacha', ru: 'Замбийская квача', uk: 'Замбійська квача', fr: 'Kwacha zambien', lt: 'Zambijos kvača' },
  ZWL: { en: 'Zimbabwean Dollar', ru: 'Зимбабвийский доллар', uk: 'Зімбабвійський долар', fr: 'Dollar zimbabwéen', lt: 'Zimbabvės doleris' },
};

function getCurrencyName(code: string, locale: string): string {
  const lang = (['en', 'ru', 'uk', 'fr', 'lt'].includes(locale) ? locale : 'en') as LangKey;
  return CURRENCY_NAMES[code]?.[lang] || CURRENCY_NAMES[code]?.en || '';
}

// Top currencies per locale — shown first in the dropdown
const LOCALE_TOP: Record<string, string[]> = {
  en: ['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'JPY', 'CHF', 'CNY', 'HKD', 'NZD'],
  ru: ['RUB', 'USD', 'EUR', 'UAH', 'BYN', 'KZT', 'GBP', 'CHF', 'JPY', 'CNY'],
  uk: ['UAH', 'USD', 'EUR', 'RUB', 'PLN', 'GBP', 'CHF', 'JPY', 'CNY', 'CZK'],
  fr: ['EUR', 'USD', 'GBP', 'CHF', 'CAD', 'JPY', 'CNY', 'MAD', 'DZD', 'TND'],
  lt: ['EUR', 'USD', 'GBP', 'PLN', 'SEK', 'DKK', 'NOK', 'CHF', 'CZK', 'HUF'],
};

// Popular currencies for the rates table
const POPULAR = ['USD', 'EUR', 'GBP', 'CHF', 'JPY', 'CAD', 'AUD', 'CNY', 'PLN', 'TRY', 'INR', 'RUB', 'UAH'];

type Props = {
  locale: string;
  rates: Record<string, number>;
  updatedAt: string;
};

const T: Record<string, {
  amount: string;
  from: string;
  to: string;
  popularRates: string;
  updated: string;
  currency: string;
  rate: string;
  noData: string;
  search: string;
}> = {
  en: {
    amount: 'Amount',
    from: 'From',
    to: 'To',
    popularRates: 'Popular exchange rates',
    updated: 'Rates updated',
    currency: 'Currency',
    rate: 'Rate',
    noData: 'Exchange rates are temporarily unavailable.',
    search: 'Search currency...',
  },
  ru: {
    amount: 'Сумма',
    from: 'Из',
    to: 'В',
    popularRates: 'Популярные курсы валют',
    updated: 'Курсы обновлены',
    currency: 'Валюта',
    rate: 'Курс',
    noData: 'Курсы валют временно недоступны.',
    search: 'Поиск валюты...',
  },
  uk: {
    amount: 'Сума',
    from: 'З',
    to: 'В',
    popularRates: 'Популярні курси валют',
    updated: 'Курси оновлено',
    currency: 'Валюта',
    rate: 'Курс',
    noData: 'Курси валют тимчасово недоступні.',
    search: 'Пошук валюти...',
  },
  fr: {
    amount: 'Montant',
    from: 'De',
    to: 'Vers',
    popularRates: 'Taux de change populaires',
    updated: 'Taux mis à jour le',
    currency: 'Devise',
    rate: 'Taux',
    noData: 'Les taux de change sont temporairement indisponibles.',
    search: 'Rechercher une devise...',
  },
  lt: {
    amount: 'Suma',
    from: 'Iš',
    to: 'Į',
    popularRates: 'Populiarūs valiutų kursai',
    updated: 'Kursai atnaujinti',
    currency: 'Valiuta',
    rate: 'Kursas',
    noData: 'Valiutų kursai laikinai nepasiekiami.',
    search: 'Ieškoti valiutos...',
  },
};

// Default from/to per locale
const DEFAULT_FROM: Record<string, string> = {
  en: 'USD', ru: 'RUB', uk: 'UAH', fr: 'EUR', lt: 'EUR',
};
const DEFAULT_TO: Record<string, string> = {
  en: 'GBP', ru: 'USD', uk: 'USD', fr: 'USD', lt: 'USD',
};

function convert(amount: number, from: string, to: string, rates: Record<string, number>): number {
  const fromRate = rates[from] ?? 1;
  const toRate = rates[to] ?? 1;
  return (amount / fromRate) * toRate;
}

function fmt(n: number): string {
  if (n >= 100) return n.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  if (n >= 1) return n.toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 2 });
  return n.toLocaleString('en-US', { maximumFractionDigits: 6 });
}

function formatDate(utcStr: string, locale: string): string {
  try {
    const date = new Date(utcStr);
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : locale, {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  } catch {
    return utcStr;
  }
}

// ─── Searchable currency combobox ───────────────────────────────────────────

type SelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  rates: Record<string, number>;
  locale: string;
  searchPlaceholder: string;
};

function CurrencySelect({ id, label, value, onChange, rates, locale, searchPlaceholder }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    if (open) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  // Sorted list: locale top first, then alphabetical
  const sortedCurrencies = useMemo(() => {
    const top = (LOCALE_TOP[locale] || LOCALE_TOP.en).filter(c => rates[c]);
    const rest = Object.keys(rates)
      .filter(c => !top.includes(c))
      .sort((a, b) => a.localeCompare(b));
    return [...top, ...rest];
  }, [rates, locale]);

  const topCount = useMemo(
    () => (LOCALE_TOP[locale] || LOCALE_TOP.en).filter(c => rates[c]).length,
    [rates, locale],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sortedCurrencies;
    return sortedCurrencies.filter(c => {
      const name = getCurrencyName(c, locale);
      return c.toLowerCase().includes(q) || name.toLowerCase().includes(q);
    });
  }, [sortedCurrencies, search, locale]);

  const selectedName = getCurrencyName(value, locale);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') { setOpen(false); setSearch(''); }
  }

  return (
    <div ref={containerRef} className={styles['currency-widget__combobox']} onKeyDown={handleKey}>
      <label className={styles['currency-widget__label']} htmlFor={id}>{label}</label>
      <button
        id={id}
        type="button"
        className={styles['currency-widget__combobox-trigger']}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles['currency-widget__combobox-code']}>{value}</span>
        {selectedName && (
          <span className={styles['currency-widget__combobox-name']}>{selectedName}</span>
        )}
        <svg
          className={`${styles['currency-widget__combobox-chevron']} ${open ? styles['currency-widget__combobox-chevron--open'] : ''}`}
          width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true"
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className={styles['currency-widget__combobox-dropdown']} role="listbox">
          <div className={styles['currency-widget__combobox-search-wrap']}>
            <input
              ref={searchRef}
              type="text"
              className={styles['currency-widget__combobox-search']}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
            />
          </div>
          <ul className={styles['currency-widget__combobox-list']}>
            {filtered.map((c, idx) => {
              const showDivider = !search.trim() && idx === topCount;
              const name = getCurrencyName(c, locale);
              return (
                <Fragment key={c}>
                  {showDivider && (
                    <li className={styles['currency-widget__combobox-divider']} role="separator" aria-hidden="true" />
                  )}
                  <li role="option" aria-selected={c === value}>
                    <button
                      type="button"
                      className={`${styles['currency-widget__combobox-option']} ${c === value ? styles['currency-widget__combobox-option--active'] : ''}`}
                      onClick={() => { onChange(c); setOpen(false); setSearch(''); }}
                    >
                      <span className={styles['currency-widget__combobox-option-code']}>{c}</span>
                      {name && <span className={styles['currency-widget__combobox-option-name']}>{name}</span>}
                    </button>
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function CurrencyConverter({ locale, rates, updatedAt }: Props) {
  const t = T[locale] || T.en;

  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState(DEFAULT_FROM[locale] || 'USD');
  const [to, setTo] = useState(DEFAULT_TO[locale] || 'EUR');

  const parsed = parseFloat(amount.replace(',', '.'));
  const isValid = !isNaN(parsed) && parsed > 0 && Object.keys(rates).length > 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    return convert(parsed, from, to, rates);
  }, [parsed, from, to, rates, isValid]);

  const rateForOne = useMemo(() => {
    if (!isValid) return null;
    return convert(1, from, to, rates);
  }, [from, to, rates, isValid]);

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  const tableRows = useMemo(() => {
    return POPULAR
      .filter(c => c !== from && rates[c])
      .map(c => ({ code: c, rate: convert(1, from, c, rates) }));
  }, [from, rates]);

  if (Object.keys(rates).length === 0) {
    return (
      <div className={styles['currency-widget']}>
        <div className={styles['currency-widget__body']}>
          <p className={styles['currency-widget__error']}>{t.noData}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['currency-widget']}>
      <div className={styles['currency-widget__body']}>

        {/* Inputs row */}
        <div className={styles['currency-widget__inputs']}>
          <div className={styles['currency-widget__field']}>
            <label className={styles['currency-widget__label']} htmlFor="cur-amount">{t.amount}</label>
            <input
              id="cur-amount"
              className={styles['currency-widget__input']}
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>

          <CurrencySelect
            id="cur-from"
            label={t.from}
            value={from}
            onChange={setFrom}
            rates={rates}
            locale={locale}
            searchPlaceholder={t.search}
          />

          <div className={styles['currency-widget__swap']}>
            <button
              type="button"
              className={styles['currency-widget__swap-btn']}
              onClick={handleSwap}
              aria-label="Swap currencies"
            >
              ⇄
            </button>
          </div>

          <CurrencySelect
            id="cur-to"
            label={t.to}
            value={to}
            onChange={setTo}
            rates={rates}
            locale={locale}
            searchPlaceholder={t.search}
          />
        </div>

        {/* Result */}
        {result !== null && (
          <div className={styles['currency-widget__result']}>
            <div className={styles['currency-widget__result-main']}>
              {fmt(parsed)} {from} = {fmt(result)} {to}
            </div>
            {rateForOne !== null && (
              <div className={styles['currency-widget__result-rate']}>
                1 {from} = {fmt(rateForOne)} {to}
                {' · '}
                1 {to} = {fmt(convert(1, to, from, rates))} {from}
              </div>
            )}
          </div>
        )}

        <p className={styles['currency-widget__updated']}>
          {t.updated}: {formatDate(updatedAt, locale)}
        </p>
      </div>

      {/* Popular rates table */}
      <div className={styles['currency-widget__table-wrap']}>
        <p className={styles['currency-widget__table-title']}>
          {t.popularRates} · 1 {from}
        </p>
        <table className={styles['currency-widget__table']}>
          <thead>
            <tr className={`${styles['currency-widget__table-row']} ${styles['currency-widget__table-row--header']}`}>
              <th className={`${styles['currency-widget__table-cell']} ${styles['currency-widget__table-cell--header']}`}>
                {t.currency}
              </th>
              <th className={`${styles['currency-widget__table-cell']} ${styles['currency-widget__table-cell--header']}`}>
                {t.rate}
              </th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ code, rate }) => (
              <tr key={code} className={styles['currency-widget__table-row']}>
                <td className={styles['currency-widget__table-cell']}>
                  <span className={styles['currency-widget__table-code']}>{code}</span>
                  <span className={styles['currency-widget__table-name']}>{getCurrencyName(code, locale)}</span>
                </td>
                <td className={styles['currency-widget__table-cell']}>{fmt(rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

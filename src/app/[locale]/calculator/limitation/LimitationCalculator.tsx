'use client';

import { useState } from 'react';
import styles from './LimitationCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  country: string; claimType: string; calculate: string; reset: string;
  result: string; years: string; year: string; notes: string;
  basis: string; errSelect: string; selectCountry: string; selectType: string;
  expired: string; notExpired: string; unknown: string;
}> = {
  en: {
    country: 'Country', claimType: 'Claim type', calculate: 'Calculate', reset: 'Reset',
    result: 'Limitation period', years: 'years', year: 'year', notes: 'Notes',
    basis: 'Legal basis', errSelect: 'Please select country and claim type.',
    selectCountry: 'Select country', selectType: 'Select claim type',
    expired: 'Limitation period may have expired', notExpired: 'Within limitation period',
    unknown: 'Varies by circumstances',
  },
  ru: {
    country: 'Страна', claimType: 'Тип иска', calculate: 'Рассчитать', reset: 'Сбросить',
    result: 'Срок исковой давности', years: 'лет', year: 'год', notes: 'Примечания',
    basis: 'Правовая основа', errSelect: 'Пожалуйста, выберите страну и тип иска.',
    selectCountry: 'Выберите страну', selectType: 'Выберите тип иска',
    expired: 'Срок исковой давности мог истечь', notExpired: 'В пределах срока',
    unknown: 'Зависит от обстоятельств',
  },
  uk: {
    country: 'Країна', claimType: 'Тип позову', calculate: 'Розрахувати', reset: 'Скинути',
    result: 'Строк позовної давності', years: 'років', year: 'рік', notes: 'Примітки',
    basis: 'Правова основа', errSelect: 'Будь ласка, оберіть країну та тип позову.',
    selectCountry: 'Оберіть країну', selectType: 'Оберіть тип позову',
    expired: 'Строк позовної давності міг сплинути', notExpired: 'В межах строку',
    unknown: 'Залежить від обставин',
  },
  fr: {
    country: 'Pays', claimType: 'Type de réclamation', calculate: 'Calculer', reset: 'Réinitialiser',
    result: 'Délai de prescription', years: 'ans', year: 'an', notes: 'Remarques',
    basis: 'Base juridique', errSelect: 'Veuillez sélectionner un pays et un type de réclamation.',
    selectCountry: 'Sélectionner un pays', selectType: 'Sélectionner un type',
    expired: 'Le délai de prescription peut être expiré', notExpired: 'Dans le délai de prescription',
    unknown: 'Variable selon les circonstances',
  },
  lt: {
    country: 'Šalis', claimType: 'Ieškinio tipas', calculate: 'Skaičiuoti', reset: 'Atstatyti',
    result: 'Ieškinio senaties terminas', years: 'metai', year: 'metai', notes: 'Pastabos',
    basis: 'Teisinis pagrindas', errSelect: 'Pasirinkite šalį ir ieškinio tipą.',
    selectCountry: 'Pasirinkite šalį', selectType: 'Pasirinkite tipą',
    expired: 'Ieškinio senaties terminas gali būti pasibaigęs', notExpired: 'Terminas dar nepraėjęs',
    unknown: 'Priklauso nuo aplinkybių',
  },
};

type ClaimKey =
  | 'contract' | 'tort' | 'property' | 'debt' | 'employment'
  | 'consumer' | 'criminal_minor' | 'criminal_serious' | 'medical';

type LimitEntry = {
  years: number | null;
  basis: string;
  notes: Record<LangKey, string>;
};

type CountryData = Partial<Record<ClaimKey, LimitEntry>>;

const CLAIM_LABELS: Record<LangKey, Record<ClaimKey, string>> = {
  en: {
    contract: 'Contract dispute', tort: 'Personal injury / tort', property: 'Property dispute',
    debt: 'Debt recovery', employment: 'Employment claim', consumer: 'Consumer rights',
    criminal_minor: 'Criminal offence (minor)', criminal_serious: 'Criminal offence (serious)',
    medical: 'Medical negligence',
  },
  ru: {
    contract: 'Договорный спор', tort: 'Причинение вреда (деликт)', property: 'Имущественный спор',
    debt: 'Взыскание долга', employment: 'Трудовой спор', consumer: 'Защита прав потребителей',
    criminal_minor: 'Уголовное преступление (лёгкое)', criminal_serious: 'Уголовное преступление (тяжкое)',
    medical: 'Медицинская халатность',
  },
  uk: {
    contract: 'Договірний спір', tort: 'Завдання шкоди (деліктний позов)', property: 'Майновий спір',
    debt: 'Стягнення боргу', employment: 'Трудовий спір', consumer: 'Захист прав споживачів',
    criminal_minor: 'Кримінальне правопорушення (легке)', criminal_serious: 'Кримінальне правопорушення (тяжке)',
    medical: 'Медична недбалість',
  },
  fr: {
    contract: 'Litige contractuel', tort: 'Préjudice corporel / délit civil', property: 'Litige immobilier',
    debt: 'Recouvrement de créance', employment: 'Litige prud\'homal', consumer: 'Droits des consommateurs',
    criminal_minor: 'Infraction pénale (mineure)', criminal_serious: 'Infraction pénale (grave)',
    medical: 'Négligence médicale',
  },
  lt: {
    contract: 'Sutartinis ginčas', tort: 'Žala sveikatai / deliktas', property: 'Turto ginčas',
    debt: 'Skolos išieškojimas', employment: 'Darbo ginčas', consumer: 'Vartotojų teisės',
    criminal_minor: 'Baudžiamoji veika (mažareikšmė)', criminal_serious: 'Baudžiamoji veika (sunki)',
    medical: 'Medicinos aplaidumas',
  },
};

const DATA: Record<string, CountryData> = {
  de: {
    contract: { years: 3, basis: 'BGB §195', notes: { en: 'General limitation period under the German Civil Code. Starts from end of the year in which the claim arose.', ru: 'Общий срок по ГГУ. Отсчёт с конца года, в котором возникло требование.', uk: 'Загальний строк за ЦК Німеччини. Відлік з кінця року виникнення вимоги.', fr: 'Délai général selon le BGB. Court à partir de la fin de l\'année de naissance de la créance.', lt: 'Bendrasis terminas pagal BGB. Skaičiuojamas nuo metų, kuriais atsirado reikalavimas, pabaigos.' } },
    tort: { years: 3, basis: 'BGB §195, §199', notes: { en: 'Begins when the claimant becomes aware (or should have become aware) of the damage and the liable party.', ru: 'Начинается с момента, когда истец узнал (или должен был узнать) об ущербе и виновной стороне.', uk: 'Починається з моменту, коли позивач дізнався про шкоду та винну сторону.', fr: 'Court à partir du moment où le demandeur a eu connaissance du dommage et de la partie responsable.', lt: 'Pradedamas skaičiuoti, kai ieškovas sužinojo apie žalą ir atsakingą šalį.' } },
    property: { years: 10, basis: 'BGB §196', notes: { en: 'Rights in rem (property rights) have a 10-year limitation period.', ru: 'Вещные права имеют срок давности 10 лет.', uk: 'Речові права мають строк позовної давності 10 років.', fr: 'Les droits réels ont un délai de prescription de 10 ans.', lt: 'Daiktinėms teisėms taikomas 10 metų ieškinio senaties terminas.' } },
    debt: { years: 3, basis: 'BGB §195', notes: { en: 'Standard 3-year period. Some debts (e.g. mortgage) may have longer periods.', ru: 'Стандартный срок 3 года. Некоторые долги (например, ипотека) могут иметь более длительный срок.', uk: 'Стандартний строк 3 роки. Деякі борги (наприклад, іпотека) можуть мати довший строк.', fr: 'Délai standard de 3 ans. Certaines dettes (ex. hypothèque) peuvent avoir un délai plus long.', lt: 'Standartinis 3 metų terminas. Kai kurioms skoloms (pvz., hipoteka) gali būti ilgesni terminai.' } },
    employment: { years: 3, basis: 'BGB §195; ArbGG', notes: { en: 'Many employment contracts set much shorter claim periods (e.g. 3 months). Always check your contract.', ru: 'Многие трудовые договоры устанавливают более короткие сроки (например, 3 месяца). Проверяйте договор.', uk: 'Багато трудових договорів встановлюють коротші строки (наприклад, 3 місяці). Перевіряйте договір.', fr: 'Beaucoup de contrats de travail prévoient des délais plus courts (ex. 3 mois). Vérifiez votre contrat.', lt: 'Daugelyje darbo sutarčių nustatyti trumpesni terminai (pvz., 3 mėnesiai). Patikrinkite sutartį.' } },
    medical: { years: 3, basis: 'BGB §195, §199', notes: { en: '3 years from knowledge of harm; absolute maximum of 30 years from the act.', ru: '3 года с момента осведомлённости о вреде; абсолютный максимум 30 лет с момента действия.', uk: '3 роки з моменту поінформованості про шкоду; абсолютний максимум 30 років.', fr: '3 ans à compter de la connaissance du préjudice ; maximum absolu de 30 ans.', lt: '3 metai nuo žalos sužinojimo; absoliutus maksimumas – 30 metų nuo veiksmo.' } },
  },
  fr: {
    contract: { years: 5, basis: 'Code civil art. 2224', notes: { en: 'General limitation period in France is 5 years from the date the holder knew or should have known their right.', ru: 'Общий срок исковой давности во Франции — 5 лет с момента, когда истец узнал или должен был узнать о своём праве.', uk: 'Загальний строк позовної давності у Франції — 5 років.', fr: 'Délai de droit commun de 5 ans à compter de la date de connaissance du droit.', lt: 'Bendrasis Prancūzijos terminas – 5 metai nuo teisės sužinojimo dienos.' } },
    tort: { years: 5, basis: 'Code civil art. 2224', notes: { en: '5 years from knowledge of the harm and the responsible party.', ru: '5 лет с момента осведомлённости о вреде и виновной стороне.', uk: '5 років з моменту поінформованості про шкоду.', fr: '5 ans à compter de la connaissance du dommage et du responsable.', lt: '5 metai nuo žalos ir atsakingo asmens sužinojimo.' } },
    property: { years: 30, basis: 'Code civil art. 2227', notes: { en: 'Real property (immovable) rights have a 30-year period.', ru: 'Права на недвижимое имущество имеют срок 30 лет.', uk: 'Права на нерухоме майно — строк 30 років.', fr: 'Les droits sur les immeubles ont un délai de 30 ans.', lt: 'Nekilnojamojo turto teisėms taikomas 30 metų terminas.' } },
    debt: { years: 5, basis: 'Code civil art. 2224', notes: { en: 'Consumer debt against a professional is 2 years (art. 2222 et seq.).', ru: 'Долг потребителя перед профессионалом — 2 года (ст. 2222 и след.).', uk: 'Борг споживача перед підприємцем — 2 роки.', fr: 'La dette d\'un consommateur envers un professionnel se prescrit en 2 ans (art. 2222 s.).', lt: 'Vartotojo skola verslininkui – 2 metai (str. 2222 ir kt.).' } },
    employment: { years: 2, basis: 'Code du travail L1471-1', notes: { en: 'Employment claims must be brought within 2 years of the facts giving rise to the claim.', ru: 'Трудовые иски должны быть поданы в течение 2 лет с момента возникновения основания.', uk: 'Трудові позови повинні бути подані протягом 2 років.', fr: 'Les actions en matière de contrat de travail se prescrivent par 2 ans.', lt: 'Darbo ginčai turi būti pareikšti per 2 metus nuo fakto atsiradimo.' } },
    consumer: { years: 2, basis: 'Code de la consommation', notes: { en: '2-year prescription for consumer claims against professionals.', ru: '2 года для требований потребителей к профессионалам.', uk: '2 роки для вимог споживачів до підприємців.', fr: 'Prescription de 2 ans pour les actions des consommateurs contre les professionnels.', lt: '2 metai vartotojų ieškiniams prieš verslininkus.' } },
    medical: { years: 10, basis: 'Code de la santé publique L1142-28', notes: { en: '10 years from the consolidation of damage (or from majority for minors).', ru: '10 лет с момента стабилизации ущерба (или с совершеннолетия для несовершеннолетних).', uk: '10 років з моменту стабілізації шкоди (або з повноліття для неповнолітніх).', fr: '10 ans à compter de la consolidation du dommage (ou de la majorité pour les mineurs).', lt: '10 metų nuo žalos stabilizavimosi (arba nuo pilnametystės nepilnamečiams).' } },
  },
  pl: {
    contract: { years: 6, basis: 'KC art. 118', notes: { en: 'General limitation period in Poland is 6 years (reduced from 10 in 2018). Business claims: 3 years.', ru: 'Общий срок в Польше — 6 лет (снижен с 10 в 2018). Деловые требования: 3 года.', uk: 'Загальний строк у Польщі — 6 років (знижено з 10 у 2018). Ділові вимоги: 3 роки.', fr: 'Délai général en Pologne : 6 ans (réduit de 10 en 2018). Créances commerciales : 3 ans.', lt: 'Bendrasis Lenkijos terminas – 6 metai (2018 m. sumažintas nuo 10). Verslo reikalavimai: 3 metai.' } },
    tort: { years: 3, basis: 'KC art. 442¹', notes: { en: '3 years from knowledge of damage; up to 20 years from the harmful event (absolute).', ru: '3 года с момента осведомлённости о вреде; до 20 лет с момента события (абсолютный).', uk: '3 роки з моменту поінформованості про шкоду; до 20 років з моменту події.', fr: '3 ans à partir de la connaissance du dommage ; jusqu\'à 20 ans depuis l\'événement (absolu).', lt: '3 metai nuo žalos sužinojimo; iki 20 metų nuo žalingos veikos (absoliutus).' } },
    debt: { years: 3, basis: 'KC art. 118', notes: { en: '3-year period for business/commercial debts; 6 years for general obligations.', ru: '3 года для деловых/коммерческих долгов; 6 лет для общих обязательств.', uk: '3 роки для ділових/комерційних боргів; 6 років для загальних зобов\'язань.', fr: '3 ans pour les dettes commerciales ; 6 ans pour les obligations générales.', lt: '3 metai verslo skoloms; 6 metai bendrosioms prievolėms.' } },
    employment: { years: 3, basis: 'Kodeks pracy art. 291', notes: { en: 'Employment law claims: 3 years. Some claims (e.g. wrongful dismissal) may have shorter periods — check your contract.', ru: 'Трудовые иски: 3 года. Некоторые требования (например, незаконное увольнение) могут иметь более короткие сроки.', uk: 'Трудові позови: 3 роки. Деякі вимоги (наприклад, незаконне звільнення) можуть мати коротші строки.', fr: 'Actions en droit du travail : 3 ans. Certaines actions (ex. licenciement abusif) peuvent avoir des délais plus courts.', lt: 'Darbo ginčai: 3 metai. Kai kuriems reikalavimams (pvz., neteisėtas atleidimas) gali būti trumpesni terminai.' } },
  },
  lt: {
    contract: { years: 10, basis: 'CK str. 1.125', notes: { en: 'General limitation period under Lithuanian Civil Code is 10 years.', ru: 'Общий срок исковой давности по Гражданскому кодексу Литвы — 10 лет.', uk: 'Загальний строк позовної давності за ЦК Литви — 10 років.', fr: 'Délai général de prescription en Lituanie : 10 ans.', lt: 'Bendrasis ieškinio senaties terminas pagal Lietuvos civilinį kodeksą – 10 metų.' } },
    tort: { years: 3, basis: 'CK str. 1.125 §8', notes: { en: '3-year period for tort claims, beginning when the victim knew or should have known about the damage.', ru: '3-летний срок для деликтных требований с момента осведомлённости о вреде.', uk: '3-річний строк для деліктних вимог з моменту поінформованості про шкоду.', fr: 'Délai de 3 ans pour les actions délictuelles, à compter de la connaissance du dommage.', lt: '3 metų terminas delikto reikalavimams, skaičiuojamas nuo žalos sužinojimo.' } },
    debt: { years: 5, basis: 'CK str. 6.429', notes: { en: '5-year period for debt recovery claims in Lithuania.', ru: '5 лет для требований о взыскании долга в Литве.', uk: '5 років для вимог про стягнення боргу в Литві.', fr: '5 ans pour les actions en recouvrement de créances en Lituanie.', lt: '5 metai skolų išieškojimo reikalavimams Lietuvoje.' } },
    employment: { years: 1, basis: 'DK str. 27', notes: { en: '1 year for most employment disputes. Wrongful dismissal: 1 month from dismissal for reinstatement claims.', ru: '1 год для большинства трудовых споров. Незаконное увольнение: 1 месяц с момента увольнения для требований о восстановлении.', uk: '1 рік для більшості трудових спорів. Незаконне звільнення: 1 місяць з моменту звільнення для вимог про поновлення.', fr: '1 an pour la plupart des litiges du travail. Licenciement abusif : 1 mois à compter du licenciement pour les demandes de réintégration.', lt: '1 metai daugumai darbo ginčų. Neteisėtas atleidimas: 1 mėnesis nuo atleidimo ieškiniam dėl grąžinimo.' } },
  },
  ua: {
    contract: { years: 3, basis: 'ЦКУ ст. 257', notes: { en: 'General limitation period under the Civil Code of Ukraine is 3 years.', ru: 'Общий срок исковой давности по ГКУ — 3 года.', uk: 'Загальний строк позовної давності за ЦКУ — 3 роки.', fr: 'Délai général de prescription selon le Code civil ukrainien : 3 ans.', lt: 'Bendrasis ieškinio senaties terminas pagal Ukrainos civilinį kodeksą – 3 metai.' } },
    tort: { years: 3, basis: 'ЦКУ ст. 257, 268', notes: { en: '3 years from knowledge of damage. Claims for health damage have no limitation period.', ru: '3 года с момента осведомлённости о вреде. Требования о возмещении вреда здоровью — без срока давности.', uk: '3 роки з моменту поінформованості про шкоду. Вимоги про відшкодування шкоди здоров\'ю — без строку давності.', fr: '3 ans à compter de la connaissance du dommage. Les réclamations pour atteinte à la santé n\'ont pas de délai.', lt: '3 metai nuo žalos sužinojimo. Sveikatos žalos reikalavimams ieškinio senaties terminas netaikomas.' } },
    property: { years: 3, basis: 'ЦКУ ст. 257', notes: { en: '3 years for most property disputes. Vindication claims may be unlimited for owner.', ru: '3 года для большинства имущественных споров. Виндикационные иски собственника могут быть без ограничений.', uk: '3 роки для більшості майнових спорів. Віндикаційні позови власника можуть бути без обмежень.', fr: '3 ans pour la plupart des litiges immobiliers. Les actions en revendication du propriétaire peuvent être illimitées.', lt: '3 metai daugumai turto ginčų. Vindikacijos ieškiniai savininkui gali būti be termino.' } },
    employment: { years: 1, basis: 'КЗпП ст. 233', notes: { en: '1 year for most employment disputes. Unlawful dismissal: 1 month from the date of dismissal.', ru: '1 год для большинства трудовых споров. Незаконное увольнение: 1 месяц с момента увольнения.', uk: '1 рік для більшості трудових спорів. Незаконне звільнення: 1 місяць з дня звільнення.', fr: '1 an pour la plupart des litiges du travail. Licenciement abusif : 1 mois à compter de la date de licenciement.', lt: '1 metai daugumai darbo ginčų. Neteisėtas atleidimas: 1 mėnesis nuo atleidimo dienos.' } },
    consumer: { years: 3, basis: 'Закон про захист прав споживачів', notes: { en: '3 years for consumer rights claims under the Consumer Protection Law of Ukraine.', ru: '3 года для требований о защите прав потребителей по Закону Украины.', uk: '3 роки для вимог про захист прав споживачів за Законом України.', fr: '3 ans pour les actions en défense des droits des consommateurs selon la loi ukrainienne.', lt: '3 metai vartotojų teisių apsaugos reikalavimams pagal Ukrainos įstatymą.' } },
  },
  ru: {
    contract: { years: 3, basis: 'ГК РФ ст. 196', notes: { en: 'General limitation period under the Civil Code of Russia is 3 years. Absolute maximum — 10 years.', ru: 'Общий срок исковой давности по ГК РФ — 3 года. Абсолютный максимум — 10 лет.', uk: 'Загальний строк позовної давності за ЦК РФ — 3 роки. Абсолютний максимум — 10 років.', fr: 'Délai général de prescription selon le Code civil de la Fédération de Russie : 3 ans. Maximum absolu : 10 ans.', lt: 'Bendrasis Rusijos civilinio kodekso terminas – 3 metai. Absoliutus maksimumas – 10 metų.' } },
    tort: { years: 3, basis: 'ГК РФ ст. 196', notes: { en: '3 years from the date of knowledge of harm. Health/life damage claims — no limitation period.', ru: '3 года с момента осведомлённости. Требования о вреде жизни/здоровью — без срока давности.', uk: '3 роки з моменту поінформованості. Вимоги про шкоду здоров\'ю/життю — без строку давності.', fr: '3 ans à compter de la connaissance du dommage. Préjudice corporel/vital : pas de délai.', lt: '3 metai nuo žalos sužinojimo. Sveikatos/gyvybės žalos reikalavimams senaties terminas netaikomas.' } },
    employment: { years: 1, basis: 'ТК РФ ст. 392', notes: { en: '1 year for monetary claims; 1 month for wrongful dismissal (from dismissal date).', ru: '1 год для денежных требований; 1 месяц для незаконного увольнения (с даты увольнения).', uk: '1 рік для грошових вимог; 1 місяць для незаконного звільнення (з дати звільнення).', fr: '1 an pour les réclamations pécuniaires ; 1 mois pour licenciement abusif (à compter de la date).', lt: '1 metai piniginėms pretenzijoms; 1 mėnuo neteisėto atleidimo atveju.' } },
    consumer: { years: 3, basis: 'Закон РФ «О защите прав потребителей»', notes: { en: '3 years under the Consumer Protection Law. Warranty claims may have shorter periods.', ru: '3 года по Закону о защите прав потребителей. Гарантийные требования могут иметь более короткие сроки.', uk: '3 роки за Законом про захист прав споживачів. Гарантійні вимоги можуть мати коротші строки.', fr: '3 ans selon la Loi sur la protection des consommateurs. Les réclamations de garantie peuvent avoir des délais plus courts.', lt: '3 metai pagal Vartotojų teisių apsaugos įstatymą. Garantiniai reikalavimai gali turėti trumpesnius terminus.' } },
  },
  us: {
    contract: { years: null, basis: 'State law (varies)', notes: { en: 'Varies by state: typically 3–6 years (written contracts), 2–3 years (oral contracts). California: 4 years written / 2 oral. New York: 6 years. Texas: 4 years.', ru: 'Зависит от штата: обычно 3–6 лет (письменные договоры), 2–3 года (устные). Калифорния: 4/2 года. Нью-Йорк: 6 лет. Техас: 4 года.', uk: 'Залежить від штату: зазвичай 3–6 років (письмові договори), 2–3 роки (усні). Каліфорнія: 4/2 роки. Нью-Йорк: 6 років. Техас: 4 роки.', fr: 'Variable selon l\'État : généralement 3 à 6 ans (écrits), 2 à 3 ans (verbaux). Californie : 4/2 ans. New York : 6 ans. Texas : 4 ans.', lt: 'Priklauso nuo valstijos: paprastai 3–6 metai (rašytinės sutartys), 2–3 metai (žodinės). Kalifornija: 4/2 m. Niujorkas: 6 m. Teksasas: 4 m.' } },
    tort: { years: null, basis: 'State law (varies)', notes: { en: 'Typically 2–3 years for personal injury. California: 2 years. New York: 3 years. Florida: 4 years (recently reduced).', ru: 'Обычно 2–3 года для личного вреда. Калифорния: 2 года. Нью-Йорк: 3 года. Флорида: 4 года (недавно снижено).', uk: 'Зазвичай 2–3 роки для заподіяної шкоди. Каліфорнія: 2 роки. Нью-Йорк: 3 роки. Флорида: 4 роки.', fr: 'Généralement 2 à 3 ans pour préjudice corporel. Californie : 2 ans. New York : 3 ans. Floride : 4 ans (récemment réduit).', lt: 'Paprastai 2–3 metai asmeninei žalai. Kalifornija: 2 m. Niujorkas: 3 m. Florida: 4 m.' } },
    debt: { years: null, basis: 'State law (varies)', notes: { en: 'Typically 3–6 years depending on state and type of debt. Credit card debt: often 3–4 years. Written loan agreements: 4–6 years.', ru: 'Обычно 3–6 лет в зависимости от штата и типа долга. Задолженность по кредитной карте: часто 3–4 года. Письменные кредитные соглашения: 4–6 лет.', uk: 'Зазвичай 3–6 років залежно від штату і типу боргу. Кредитна картка: часто 3–4 роки. Письмові кредитні угоди: 4–6 років.', fr: 'Généralement 3 à 6 ans selon l\'État et le type de dette. Cartes de crédit : souvent 3 à 4 ans. Prêts écrits : 4 à 6 ans.', lt: 'Paprastai 3–6 metai pagal valstiją ir skolos tipą. Kreditinės kortelės: dažnai 3–4 metai. Rašytinės paskolos: 4–6 metai.' } },
    employment: { years: null, basis: 'Federal / State law', notes: { en: 'Federal claims (Title VII discrimination): 180–300 days to file with EEOC. State wrongful termination: typically 1–3 years. Wage claims: 2–3 years.', ru: 'Федеральные иски (дискриминация по Title VII): 180–300 дней для подачи в EEOC. Незаконное увольнение (штат): обычно 1–3 года. Зарплатные требования: 2–3 года.', uk: 'Федеральні позови (дискримінація за Title VII): 180–300 днів для подачі до EEOC. Незаконне звільнення (штат): зазвичай 1–3 роки. Зарплатні вимоги: 2–3 роки.', fr: 'Réclamations fédérales (discrimination Title VII) : 180 à 300 jours pour saisir l\'EEOC. Licenciement abusif (État) : 1 à 3 ans en général. Réclamations salariales : 2 à 3 ans.', lt: 'Federaliniai ieškiniai (Title VII diskriminacija): 180–300 dienų pateikti EEOC. Neteisėtas atleidimas (valstija): paprastai 1–3 metai. Darbo užmokesčio reikalavimai: 2–3 metai.' } },
    medical: { years: null, basis: 'State law (varies)', notes: { en: 'Typically 2–3 years from discovery of harm. California: 3 years from injury or 1 year from discovery. New York: 2.5 years from act or 2.5 years from discovery of foreign object.', ru: 'Обычно 2–3 года с момента обнаружения вреда. Калифорния: 3 года с момента травмы или 1 год с момента обнаружения. Нью-Йорк: 2,5 года.', uk: 'Зазвичай 2–3 роки з моменту виявлення шкоди. Каліфорнія: 3 роки з травми або 1 рік з виявлення. Нью-Йорк: 2,5 роки.', fr: 'Généralement 2 à 3 ans à compter de la découverte. Californie : 3 ans depuis la blessure ou 1 an depuis la découverte. New York : 2,5 ans.', lt: 'Paprastai 2–3 metai nuo žalos aptikimo. Kalifornija: 3 metai nuo traumos arba 1 metai nuo aptikimo. Niujorkas: 2,5 metai.' } },
  },
  gb: {
    contract: { years: 6, basis: 'Limitation Act 1980 s.5', notes: { en: '6 years from the date of breach for simple contracts. Contracts under seal (deeds): 12 years (s.8).', ru: '6 лет с момента нарушения для простых договоров. Договоры под печатью (акты): 12 лет.', uk: '6 років з моменту порушення для простих договорів. Договори під печаткою (акти): 12 років.', fr: '6 ans à compter de la violation pour les contrats simples. Contrats sous sceau (actes) : 12 ans.', lt: '6 metai nuo pažeidimo paprastoms sutartims. Sutartys su antspaudu (aktai): 12 metų.' } },
    tort: { years: 3, basis: 'Limitation Act 1980 s.2, s.11', notes: { en: '3 years for personal injury from date of knowledge. General tort: 6 years. Latent damage: 3 years from knowledge (max 15 years absolute).', ru: '3 года для личного вреда с момента осведомлённости. Общий деликт: 6 лет. Скрытый ущерб: 3 года с момента осведомлённости (максимум 15 лет).', uk: '3 роки для заподіяної шкоди з моменту поінформованості. Загальний деліктний позов: 6 років. Прихований збиток: 3 роки з поінформованості (максимум 15 років).', fr: '3 ans pour préjudice corporel à compter de la connaissance. Délit général : 6 ans. Dommage latent : 3 ans à compter de la connaissance (maximum 15 ans).', lt: '3 metai asmeninei žalai nuo sužinojimo. Bendrasis deliktas: 6 metai. Latentinė žala: 3 metai nuo sužinojimo (maksimumas 15 metų).' } },
    debt: { years: 6, basis: 'Limitation Act 1980 s.5', notes: { en: '6 years for most debts. Mortgage debts secured on land: 12 years for the capital, 6 years for interest.', ru: '6 лет для большинства долгов. Ипотечные долги: 12 лет для основного долга, 6 лет для процентов.', uk: '6 років для більшості боргів. Іпотечні борги: 12 років для основного боргу, 6 років для відсотків.', fr: '6 ans pour la plupart des dettes. Hypothèques immobilières : 12 ans pour le capital, 6 ans pour les intérêts.', lt: '6 metai daugumai skolų. Hipoteka: 12 metų kapitalui, 6 metai palūkanoms.' } },
    employment: { years: 3, basis: 'Employment Rights Act 1996; Equality Act 2010', notes: { en: 'Unfair dismissal: 3 months to ET. Discrimination: 3 months. Wrongful dismissal (court): 6 years. Equal pay: 6 years.', ru: 'Незаконное увольнение: 3 месяца в трибунал. Дискриминация: 3 месяца. Неправомерное увольнение (суд): 6 лет. Равная оплата: 6 лет.', uk: 'Незаконне звільнення: 3 місяці до трибуналу. Дискримінація: 3 місяці. Неправомірне звільнення (суд): 6 років. Рівна оплата: 6 років.', fr: 'Licenciement abusif : 3 mois (tribunal du travail). Discrimination : 3 mois. Licenciement injustifié (cour) : 6 ans. Égalité de rémunération : 6 ans.', lt: 'Neteisėtas atleidimas: 3 mėnesiai (darbo teismas). Diskriminacija: 3 mėnesiai. Neteisėtas atleidimas (teismas): 6 metai. Vienodas atlyginimas: 6 metai.' } },
    medical: { years: 3, basis: 'Limitation Act 1980 s.11', notes: { en: '3 years from date of knowledge of injury and the defendant\'s identity. Court discretion to extend (s.33). No limit for children until age 18 + 3 years.', ru: '3 года с момента осведомлённости. Суд может продлить по усмотрению (ст. 33). Для детей — до 18 лет + 3 года.', uk: '3 роки з моменту поінформованості. Суд може продовжити на розсуд. Для дітей — до 18 років + 3 роки.', fr: '3 ans à compter de la connaissance. Pouvoir discrétionnaire du tribunal de proroger (art. 33). Pas de limite pour les enfants jusqu\'à 18 ans + 3 ans.', lt: '3 metai nuo sužinojimo. Teismas gali pratęsti (str. 33). Vaikams – iki 18 metų + 3 metai.' } },
  },
};

const COUNTRY_LABELS: Record<LangKey, Record<string, string>> = {
  en: { de: 'Germany', fr: 'France', pl: 'Poland', lt: 'Lithuania', ua: 'Ukraine', ru: 'Russia', us: 'USA', gb: 'United Kingdom' },
  ru: { de: 'Германия', fr: 'Франция', pl: 'Польша', lt: 'Литва', ua: 'Украина', ru: 'Россия', us: 'США', gb: 'Великобритания' },
  uk: { de: 'Німеччина', fr: 'Франція', pl: 'Польща', lt: 'Литва', ua: 'Україна', ru: 'Росія', us: 'США', gb: 'Велика Британія' },
  fr: { de: 'Allemagne', fr: 'France', pl: 'Pologne', lt: 'Lituanie', ua: 'Ukraine', ru: 'Russie', us: 'États-Unis', gb: 'Royaume-Uni' },
  lt: { de: 'Vokietija', fr: 'Prancūzija', pl: 'Lenkija', lt: 'Lietuva', ua: 'Ukraina', ru: 'Rusija', us: 'JAV', gb: 'Jungtinė Karalystė' },
};

export default function LimitationCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [country, setCountry] = useState('');
  const [claimType, setClaimType] = useState<ClaimKey | ''>('');
  const [result, setResult] = useState<LimitEntry | null>(null);
  const [error, setError] = useState('');

  const countryKeys = Object.keys(DATA);
  const claimKeys = country ? (Object.keys(DATA[country]) as ClaimKey[]) : (Object.keys(CLAIM_LABELS.en) as ClaimKey[]);

  const calculate = () => {
    if (!country || !claimType) { setError(t.errSelect); return; }
    const entry = DATA[country]?.[claimType];
    if (!entry) { setError(t.errSelect); return; }
    setError('');
    setResult(entry);
  };

  const reset = () => { setCountry(''); setClaimType(''); setResult(null); setError(''); };

  const handleCountryChange = (v: string) => {
    setCountry(v);
    setClaimType('');
    setResult(null);
    setError('');
  };

  return (
    <div className={styles['lim-calc']}>
      <div className={styles['lim-calc__form']}>
        <div className={styles['lim-calc__field']}>
          <label className={styles['lim-calc__label']}>{t.country}</label>
          <select className={styles['lim-calc__select']} value={country} onChange={e => handleCountryChange(e.target.value)}>
            <option value="">— {t.selectCountry} —</option>
            {countryKeys.map(k => <option key={k} value={k}>{COUNTRY_LABELS[lang][k]}</option>)}
          </select>
        </div>

        <div className={styles['lim-calc__field']}>
          <label className={styles['lim-calc__label']}>{t.claimType}</label>
          <select
            className={styles['lim-calc__select']}
            value={claimType}
            onChange={e => { setClaimType(e.target.value as ClaimKey); setResult(null); setError(''); }}
            disabled={!country}
          >
            <option value="">— {t.selectType} —</option>
            {claimKeys.map(k => <option key={k} value={k}>{CLAIM_LABELS[lang][k]}</option>)}
          </select>
        </div>
      </div>

      {error && <p className={styles['lim-calc__error']}>{error}</p>}

      <div className={styles['lim-calc__actions']}>
        <button type="button" className={styles['lim-calc__btn']} onClick={calculate}>{t.calculate}</button>
        <button type="button" className={styles['lim-calc__btn--reset']} onClick={reset}>{t.reset}</button>
      </div>

      {result && (
        <div className={styles['lim-calc__result']}>
          <div className={styles['lim-calc__period']}>
            <span className={styles['lim-calc__period-label']}>{t.result}:</span>
            <span className={styles['lim-calc__period-value']}>
              {result.years === null ? t.unknown : `${result.years} ${result.years === 1 ? t.year : t.years}`}
            </span>
          </div>

          <div className={styles['lim-calc__basis']}>
            <span className={styles['lim-calc__basis-label']}>{t.basis}:</span> {result.basis}
          </div>

          <div className={styles['lim-calc__notes']}>
            <p className={styles['lim-calc__notes-title']}>{t.notes}:</p>
            <p className={styles['lim-calc__notes-text']}>{result.notes[lang]}</p>
          </div>
        </div>
      )}
    </div>
  );
}

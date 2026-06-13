'use client';
import { useState } from 'react';
import styles from './PartyFoodCalculator.module.scss';

const T: Record<string, {
  guests: string; eventType: string; duration: string;
  typeBbq: string; typeBuffet: string; typeCocktail: string;
  dur2h: string; dur3h: string; dur4h: string;
  calculate: string;
  resultsFor: string; guests2: string;
  catMeat: string; catSides: string; catDrinks: string; catDesserts: string; catBread: string;
  error: string;
}> = {
  en: { guests: 'Number of Guests', eventType: 'Event Type', duration: 'Event Duration', typeBbq: 'BBQ / Grill', typeBuffet: 'Buffet Dinner', typeCocktail: 'Cocktail Party', dur2h: '2 hours', dur3h: '3 hours', dur4h: '4+ hours', calculate: 'Calculate Food Quantities', resultsFor: 'Shopping List for', guests2: 'guests', catMeat: 'Meat / Protein', catSides: 'Sides & Salads', catDrinks: 'Drinks', catDesserts: 'Desserts', catBread: 'Bread & Buns', error: 'Please enter a valid number of guests (1–500).' },
  ru: { guests: 'Количество гостей', eventType: 'Формат мероприятия', duration: 'Продолжительность', typeBbq: 'Барбекю / Гриль', typeBuffet: 'Банкет / Фуршет', typeCocktail: 'Коктейльная вечеринка', dur2h: '2 часа', dur3h: '3 часа', dur4h: '4+ часа', calculate: 'Рассчитать продукты', resultsFor: 'Список покупок на', guests2: 'гостей', catMeat: 'Мясо / Белок', catSides: 'Гарниры и салаты', catDrinks: 'Напитки', catDesserts: 'Десерты', catBread: 'Хлеб и булки', error: 'Введите корректное количество гостей (1–500).' },
  uk: { guests: 'Кількість гостей', eventType: 'Формат заходу', duration: 'Тривалість', typeBbq: 'Барбекю / Гриль', typeBuffet: 'Банкет / Фуршет', typeCocktail: 'Коктейльна вечірка', dur2h: '2 години', dur3h: '3 години', dur4h: '4+ годин', calculate: 'Розрахувати продукти', resultsFor: 'Список покупок на', guests2: 'гостей', catMeat: 'М\'ясо / Білок', catSides: 'Гарніри та салати', catDrinks: 'Напої', catDesserts: 'Десерти', catBread: 'Хліб та булки', error: 'Введіть коректну кількість гостей (1–500).' },
  fr: { guests: 'Nombre d\'invités', eventType: 'Type d\'événement', duration: 'Durée', typeBbq: 'Barbecue / Grill', typeBuffet: 'Buffet dînatoire', typeCocktail: 'Cocktail party', dur2h: '2 heures', dur3h: '3 heures', dur4h: '4h et plus', calculate: 'Calculer les quantités', resultsFor: 'Liste de courses pour', guests2: 'invités', catMeat: 'Viande / Protéines', catSides: 'Accompagnements & Salades', catDrinks: 'Boissons', catDesserts: 'Desserts', catBread: 'Pain & Buns', error: 'Veuillez entrer un nombre valide d\'invités (1–500).' },
  lt: { guests: 'Svečių skaičius', eventType: 'Renginio tipas', duration: 'Trukmė', typeBbq: 'Kepsninė / Grilias', typeBuffet: 'Bufetas / Vakarienė', typeCocktail: 'Kokteilių vakarėlis', dur2h: '2 valandos', dur3h: '3 valandos', dur4h: '4+ valandų', calculate: 'Skaičiuoti produktus', resultsFor: 'Apsipirkimo sąrašas', guests2: 'svečių', catMeat: 'Mėsa / Baltymai', catSides: 'Garnyrai ir salotos', catDrinks: 'Gėrimai', catDesserts: 'Desertai', catBread: 'Duona ir bandelės', error: 'Įveskite tinkamą svečių skaičių (1–500).' },
};

type EventType = 'bbq' | 'buffet' | 'cocktail';
type Duration = '2h' | '3h' | '4h';

interface FoodItem { name: string; amount: string }
interface FoodResult { meat: FoodItem[]; sides: FoodItem[]; drinks: FoodItem[]; desserts: FoodItem[]; bread: FoodItem[] }

function calcFood(guests: number, type: EventType, duration: Duration, locale: string): FoodResult {
  const dur = duration === '2h' ? 1 : duration === '3h' ? 1.3 : 1.6;

  if (type === 'bbq') {
    const meat = Math.ceil(guests * 0.35 * dur);
    const sausages = Math.ceil(guests * 2 * dur);
    const veggies = Math.ceil(guests * 0.15 * dur);
    const salad = Math.ceil(guests * 0.12 * dur);
    const water = Math.ceil(guests * 0.5 * dur);
    const beer = Math.ceil(guests * 1.5 * dur);
    const softDrink = Math.ceil(guests * 0.5 * dur);
    const dessert = Math.ceil(guests * 0.1 * dur);
    const buns = Math.ceil(guests * 2 * dur);
    const bread = Math.ceil(guests * 0.1 * dur);
    return {
      meat: [{ name: 'Meat (kg)', amount: `${meat} kg` }, { name: 'Sausages', amount: `${sausages} pcs` }],
      sides: [{ name: 'Grilled vegetables (kg)', amount: `${veggies} kg` }, { name: 'Salads (kg)', amount: `${salad} kg` }],
      drinks: [{ name: 'Water (L)', amount: `${water} L` }, { name: 'Beer (L)', amount: `${beer} L` }, { name: 'Soft drinks (L)', amount: `${softDrink} L` }],
      desserts: [{ name: 'Desserts (kg)', amount: `${dessert} kg` }],
      bread: [{ name: 'Buns', amount: `${buns} pcs` }, { name: 'Bread (kg)', amount: `${bread} kg` }],
    };
  } else if (type === 'buffet') {
    const appetizers = Math.ceil(guests * 0.15 * dur);
    const mainCourse = Math.ceil(guests * 0.25 * dur);
    const salad = Math.ceil(guests * 0.15 * dur);
    const sides = Math.ceil(guests * 0.2 * dur);
    const water = Math.ceil(guests * 0.4 * dur);
    const wine = Math.ceil(guests * 0.35 * dur);
    const dessert = Math.ceil(guests * 0.12 * dur);
    const bread = Math.ceil(guests * 0.06 * dur);
    return {
      meat: [{ name: 'Main course protein (kg)', amount: `${mainCourse} kg` }, { name: 'Appetizers (kg)', amount: `${appetizers} kg` }],
      sides: [{ name: 'Side dishes (kg)', amount: `${sides} kg` }, { name: 'Salads (kg)', amount: `${salad} kg` }],
      drinks: [{ name: 'Water (L)', amount: `${water} L` }, { name: 'Wine / Juice (L)', amount: `${wine} L` }],
      desserts: [{ name: 'Desserts (kg)', amount: `${dessert} kg` }],
      bread: [{ name: 'Bread (kg)', amount: `${bread} kg` }],
    };
  } else {
    const fingerFood = Math.ceil(guests * 0.3 * dur);
    const canapes = Math.ceil(guests * 6 * dur);
    const water = Math.ceil(guests * 0.25 * dur);
    const wine = Math.ceil(guests * 0.25 * dur);
    const spirits = Math.ceil(guests * 0.04 * dur);
    const softDrink = Math.ceil(guests * 0.15 * dur);
    const dessert = Math.ceil(guests * 0.08 * dur);
    return {
      meat: [{ name: 'Finger food / canapés (kg)', amount: `${fingerFood} kg` }, { name: 'Canapés (pcs)', amount: `${canapes} pcs` }],
      sides: [{ name: 'Dips & nibbles (kg)', amount: `${Math.ceil(guests * 0.1 * dur)} kg` }],
      drinks: [{ name: 'Water (L)', amount: `${water} L` }, { name: 'Wine / Prosecco (L)', amount: `${wine} L` }, { name: 'Spirits (L)', amount: `${spirits} L` }, { name: 'Soft drinks (L)', amount: `${softDrink} L` }],
      desserts: [{ name: 'Sweets / bites (kg)', amount: `${dessert} kg` }],
      bread: [],
    };
  }
}

export default function PartyFoodCalculator({ locale }: { locale: string }) {
  const t = T[locale] ?? T.en;
  const [guests, setGuests] = useState('20');
  const [eventType, setEventType] = useState<EventType>('bbq');
  const [duration, setDuration] = useState<Duration>('3h');
  const [result, setResult] = useState<FoodResult | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    const g = parseInt(guests);
    if (!g || g < 1 || g > 500) { setError(t.error); return; }
    setResult(calcFood(g, eventType, duration, locale));
  }

  const categories = result ? [
    { title: t.catMeat, items: result.meat },
    { title: t.catSides, items: result.sides },
    { title: t.catDrinks, items: result.drinks },
    { title: t.catDesserts, items: result.desserts },
    { title: t.catBread, items: result.bread },
  ].filter(c => c.items.length > 0) : [];

  return (
    <div className={styles.widget}>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.guests}</label>
        <input type="number" min="1" max="500" className={styles.widget__input} value={guests} onChange={e => setGuests(e.target.value)} />
      </div>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.eventType}</label>
        <select className={styles.widget__select} value={eventType} onChange={e => setEventType(e.target.value as EventType)}>
          <option value="bbq">{t.typeBbq}</option>
          <option value="buffet">{t.typeBuffet}</option>
          <option value="cocktail">{t.typeCocktail}</option>
        </select>
      </div>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.duration}</label>
        <select className={styles.widget__select} value={duration} onChange={e => setDuration(e.target.value as Duration)}>
          <option value="2h">{t.dur2h}</option>
          <option value="3h">{t.dur3h}</option>
          <option value="4h">{t.dur4h}</option>
        </select>
      </div>
      {error && <p className={styles.widget__error}>{error}</p>}
      <button type="button" className={styles.widget__btn} onClick={calculate}>{t.calculate}</button>

      {result && (
        <div className={styles.widget__results}>
          <div className={styles['widget__results-header']}>{t.resultsFor} {guests} {t.guests2}</div>
          {categories.map(cat => (
            <div key={cat.title} className={styles.widget__category}>
              <div className={styles['widget__category-title']}>{cat.title}</div>
              <div className={styles.widget__items}>
                {cat.items.map(item => (
                  <div key={item.name} className={styles.widget__item}>
                    <span className={styles['widget__item-name']}>{item.name}</span>
                    <span className={styles['widget__item-amount']}>{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

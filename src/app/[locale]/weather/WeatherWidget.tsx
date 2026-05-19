'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './WeatherWidget.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';
type TempUnit = 'C' | 'F';

interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code?: string;
  admin1?: string;
}

interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  address: {
    city?: string;
    town?: string;
    municipality?: string;
    village?: string;
    state?: string;
    country?: string;
    country_code?: string;
  };
}

interface CurrentWeather {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
}

interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  sunrise: string[];
  sunset: string[];
}

interface WeatherData {
  current: CurrentWeather;
  daily: DailyWeather;
}

// [en, ru, uk, fr, lt, icon]
const WMO: Record<number, [string, string, string, string, string, string]> = {
  0:  ['Clear sky',           'Ясно',                    'Ясно',                  'Ciel dégagé',              'Giedra',                   '☀️'],
  1:  ['Mainly clear',        'Преимущественно ясно',    'Переважно ясно',        'Principalement dégagé',    'Daugiausia giedra',        '🌤️'],
  2:  ['Partly cloudy',       'Переменная облачность',   'Мінлива хмарність',     'Partiellement nuageux',    'Iš dalies debesuota',      '⛅'],
  3:  ['Overcast',            'Пасмурно',                'Похмуро',               'Nuageux',                  'Debesuota',                '☁️'],
  45: ['Foggy',               'Туман',                   'Туман',                 'Brouillard',               'Rūkas',                    '🌫️'],
  48: ['Rime fog',            'Гололедица',              'Ожеледиця',             'Brouillard givrant',       'Šaltas rūkas',             '🌫️'],
  51: ['Light drizzle',       'Лёгкая морось',           'Легка мряка',           'Bruine légère',            'Lengvas lijundra',         '🌦️'],
  53: ['Moderate drizzle',    'Умеренная морось',        'Помірна мряка',         'Bruine modérée',           'Vidutinis lijundra',       '🌦️'],
  55: ['Dense drizzle',       'Сильная морось',          'Густа мряка',           'Bruine dense',             'Tankus lijundra',          '🌧️'],
  61: ['Slight rain',         'Небольшой дождь',         'Невеликий дощ',         'Pluie légère',             'Nedidelis lietus',         '🌧️'],
  63: ['Moderate rain',       'Умеренный дождь',         'Помірний дощ',          'Pluie modérée',            'Vidutinis lietus',         '🌧️'],
  65: ['Heavy rain',          'Сильный дождь',           'Сильний дощ',           'Forte pluie',              'Smarkus lietus',           '🌧️'],
  71: ['Slight snow',         'Небольшой снег',          'Невеликий сніг',        'Légère neige',             'Nedidelis sniegas',        '🌨️'],
  73: ['Moderate snow',       'Умеренный снег',          'Помірний сніг',         'Neige modérée',            'Vidutinis sniegas',        '🌨️'],
  75: ['Heavy snow',          'Сильный снег',            'Сильний сніг',          'Forte neige',              'Smarkus sniegas',          '❄️'],
  77: ['Snow grains',         'Снежная крупа',           'Снігова крупа',         'Grésil',                   'Sniego kruša',             '🌨️'],
  80: ['Slight showers',      'Небольшой ливень',        'Невеликі зливи',        'Averses légères',          'Nedideli liūtys',          '🌦️'],
  81: ['Moderate showers',    'Умеренный ливень',        'Помірні зливи',         'Averses modérées',         'Vidutiniai liūtys',        '🌧️'],
  82: ['Violent showers',     'Сильный ливень',          'Сильні зливи',          'Averses violentes',        'Smarkūs liūtys',           '⛈️'],
  85: ['Snow showers',        'Снежный ливень',          'Снігові зливи',         'Averses de neige',         'Sniego liūtys',            '🌨️'],
  86: ['Heavy snow showers',  'Сильный снегопад',        'Сильні снігові зливи',  'Fortes averses de neige',  'Smarkios sniego liūtys',   '❄️'],
  95: ['Thunderstorm',        'Гроза',                   'Гроза',                 'Orage',                    'Perkūnija',                '⛈️'],
  96: ['Thunderstorm + hail', 'Гроза с градом',          'Гроза з градом',        'Orage avec grêle',         'Perkūnija su kruša',       '⛈️'],
  99: ['Thunderstorm + hail', 'Гроза с крупным градом',  'Гроза з великим градом','Orage avec forte grêle',   'Perkūnija su stambia kruša','⛈️'],
};

const LANG_IDX: Record<LangKey, number> = { en: 0, ru: 1, uk: 2, fr: 3, lt: 4 };

function getWmo(code: number, locale: string): { label: string; icon: string } {
  const row = WMO[code] ?? WMO[0];
  const idx = LANG_IDX[locale as LangKey] ?? 0;
  return { label: row[idx], icon: row[5] };
}

const INTL_LOCALE: Record<LangKey, string> = {
  en: 'en-US', ru: 'ru-RU', uk: 'uk-UA', fr: 'fr-FR', lt: 'lt-LT',
};

function getDayLabel(dateStr: string, locale: string, todayStr: string, todayLabel: string): string {
  if (dateStr === todayStr) return todayLabel;
  const loc = INTL_LOCALE[locale as LangKey] ?? 'en-US';
  return new Intl.DateTimeFormat(loc, { weekday: 'short' }).format(new Date(dateStr + 'T12:00:00'));
}

function toF(c: number): number { return Math.round(c * 9 / 5 + 32); }
function fmtTemp(c: number, unit: TempUnit): string {
  return unit === 'C' ? `${Math.round(c)}°` : `${toF(c)}°`;
}

function formatTime(iso: string): string {
  return iso.split('T')[1]?.slice(0, 5) ?? '';
}

const T: Record<LangKey, {
  placeholder: string;
  searchBtn: string;
  useLocation: string;
  today: string;
  feelsLike: string;
  humidity: string;
  wind: string;
  kmh: string;
  errNotFound: string;
  errLocation: string;
  errFetch: string;
  loading: string;
  sunrise: string;
  sunset: string;
}> = {
  en: {
    placeholder: 'City name...',
    searchBtn: 'Search',
    useLocation: 'Use my location',
    today: 'Today',
    feelsLike: 'Feels like',
    humidity: 'Humidity',
    wind: 'Wind',
    kmh: 'km/h',
    errNotFound: 'City not found. Check the name and try again.',
    errLocation: 'Could not get your location. Check browser permissions.',
    errFetch: 'Failed to load weather. Please try again.',
    loading: 'Loading weather...',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
  },
  ru: {
    placeholder: 'Название города...',
    searchBtn: 'Найти',
    useLocation: 'Моё местоположение',
    today: 'Сегодня',
    feelsLike: 'Ощущается',
    humidity: 'Влажность',
    wind: 'Ветер',
    kmh: 'км/ч',
    errNotFound: 'Город не найден. Проверьте название и попробуйте снова.',
    errLocation: 'Не удалось определить местоположение. Проверьте разрешения браузера.',
    errFetch: 'Ошибка загрузки погоды. Попробуйте ещё раз.',
    loading: 'Загрузка погоды...',
    sunrise: 'Восход',
    sunset: 'Закат',
  },
  uk: {
    placeholder: 'Назва міста...',
    searchBtn: 'Знайти',
    useLocation: 'Моє місцезнаходження',
    today: 'Сьогодні',
    feelsLike: 'Відчувається',
    humidity: 'Вологість',
    wind: 'Вітер',
    kmh: 'км/год',
    errNotFound: 'Місто не знайдено. Перевірте назву і спробуйте знову.',
    errLocation: 'Не вдалося визначити місцезнаходження. Перевірте дозволи браузера.',
    errFetch: 'Помилка завантаження погоди. Спробуйте ще раз.',
    loading: 'Завантаження погоди...',
    sunrise: 'Схід сонця',
    sunset: 'Захід сонця',
  },
  fr: {
    placeholder: 'Nom de la ville...',
    searchBtn: 'Rechercher',
    useLocation: 'Ma position',
    today: "Aujourd'hui",
    feelsLike: 'Ressenti',
    humidity: 'Humidité',
    wind: 'Vent',
    kmh: 'km/h',
    errNotFound: 'Ville introuvable. Vérifiez le nom et réessayez.',
    errLocation: "Impossible d'obtenir votre position. Vérifiez les autorisations du navigateur.",
    errFetch: 'Échec du chargement météo. Veuillez réessayer.',
    loading: 'Chargement de la météo...',
    sunrise: 'Lever du soleil',
    sunset: 'Coucher du soleil',
  },
  lt: {
    placeholder: 'Miesto pavadinimas...',
    searchBtn: 'Ieškoti',
    useLocation: 'Mano vieta',
    today: 'Šiandien',
    feelsLike: 'Jaučiasi',
    humidity: 'Drėgnumas',
    wind: 'Vėjas',
    kmh: 'km/val',
    errNotFound: 'Miestas nerastas. Patikrinkite pavadinimą ir bandykite dar kartą.',
    errLocation: 'Nepavyko nustatyti vietos. Patikrinkite naršyklės leidimus.',
    errFetch: 'Nepavyko įkelti oro prognozės. Bandykite dar kartą.',
    loading: 'Kraunama oro prognozė...',
    sunrise: 'Saulėtekis',
    sunset: 'Saulėlydis',
  },
};

async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset` +
    `&timezone=auto&forecast_days=7&wind_speed_unit=kmh`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('weather error');
  return res.json();
}

async function geocode(query: string, lang: string): Promise<GeoResult[]> {
  const url =
    `https://nominatim.openstreetmap.org/search` +
    `?q=${encodeURIComponent(query)}&format=json&limit=7&addressdetails=1&accept-language=${lang}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'utilixi.com/weather' } });
  if (!res.ok) return [];
  const data: NominatimResult[] = await res.json();

  const seen = new Set<string>();
  const results: GeoResult[] = [];
  for (const r of data) {
    const cityName = r.address.city || r.address.town || r.address.municipality || r.address.village;
    if (!cityName) continue;
    const key = `${Math.round(parseFloat(r.lat) * 10)}|${Math.round(parseFloat(r.lon) * 10)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    results.push({
      id: r.place_id,
      name: cityName,
      latitude: parseFloat(r.lat),
      longitude: parseFloat(r.lon),
      country: r.address.country || '',
      country_code: r.address.country_code?.toUpperCase(),
      admin1: r.address.state,
    });
    if (results.length >= 5) break;
  }
  return results;
}

async function reverseGeocode(lat: number, lon: number, lang: string): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=${lang}`,
      { headers: { 'User-Agent': 'utilixi.com/weather' } },
    );
    if (!res.ok) return 'My Location';
    const d = await res.json();
    return d.address?.city || d.address?.town || d.address?.village || d.name || 'My Location';
  } catch {
    return 'My Location';
  }
}

export default function WeatherWidget({ locale }: { locale: string }) {
  const t = T[locale as LangKey] ?? T.en;

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeoResult[]>([]);
  const [showSug, setShowSug] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [cityName, setCityName] = useState('');
  const [unit, setUnit] = useState<TempUnit>('C');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sugRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (sugRef.current && !sugRef.current.contains(e.target as Node)) {
        setShowSug(false);
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const loadWeather = useCallback(async (lat: number, lon: number, name: string) => {
    setStatus('loading');
    setError('');
    setShowSug(false);
    try {
      const data = await fetchWeather(lat, lon);
      setWeather(data);
      setCityName(name);
      setStatus('idle');
    } catch {
      setStatus('error');
      setError(t.errFetch);
    }
  }, [t.errFetch]);

  const handleQueryChange = useCallback((val: string) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.trim().length < 2) { setSuggestions([]); setShowSug(false); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await geocode(val, locale);
        setSuggestions(results);
        setShowSug(results.length > 0);
      } catch {
        // silently ignore autocomplete errors
      }
    }, 400);
  }, [locale]);

  const handleSelectSuggestion = useCallback((geo: GeoResult) => {
    const name = `${geo.name}${geo.admin1 ? `, ${geo.admin1}` : ''}, ${geo.country}`;
    setQuery(geo.name);
    setSuggestions([]);
    setShowSug(false);
    loadWeather(geo.latitude, geo.longitude, name);
  }, [loadWeather]);

  const handleSearch = useCallback(async () => {
    const q = query.trim();
    if (!q) return;
    setStatus('loading');
    setError('');
    setShowSug(false);
    try {
      const results = await geocode(q, locale);
      if (!results.length) {
        setStatus('error');
        setError(t.errNotFound);
        return;
      }
      if (results.length > 1) {
        setStatus('idle');
        setSuggestions(results);
        setShowSug(true);
        return;
      }
      const geo = results[0];
      const name = `${geo.name}${geo.admin1 ? `, ${geo.admin1}` : ''}, ${geo.country}`;
      loadWeather(geo.latitude, geo.longitude, name);
    } catch {
      setStatus('error');
      setError(t.errFetch);
    }
  }, [query, locale, t.errNotFound, t.errFetch, loadWeather]);

  const handleUseLocation = useCallback(() => {
    if (!navigator.geolocation) { setStatus('error'); setError(t.errLocation); return; }
    setStatus('loading');
    setError('');
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const name = await reverseGeocode(coords.latitude, coords.longitude, locale);
        loadWeather(coords.latitude, coords.longitude, name);
      },
      () => { setStatus('error'); setError(t.errLocation); },
    );
  }, [locale, t.errLocation, loadWeather]);

  const today = weather?.daily.time[0] ?? '';

  return (
    <div className={styles['weather-widget']}>

      {/* Search */}
      <div className={styles['weather-widget__top']}>
        <div ref={sugRef} className={styles['weather-widget__combobox']}>
          <div className={styles['weather-widget__search-row']}>
            <input
              className={styles['weather-widget__input']}
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              aria-autocomplete="list"
              aria-expanded={showSug}
            />
            <button
              type="button"
              className={styles['weather-widget__search-btn']}
              onClick={handleSearch}
              disabled={status === 'loading'}
            >
              {t.searchBtn}
            </button>
          </div>

          {showSug && (
            <ul className={styles['weather-widget__suggestions']} role="listbox">
              {suggestions.map((s) => (
                <li key={s.id} role="option" aria-selected={false}>
                  <button
                    type="button"
                    className={styles['weather-widget__suggestion']}
                    onClick={() => handleSelectSuggestion(s)}
                  >
                    <span className={styles['weather-widget__sug-name']}>{s.name}</span>
                    <span className={styles['weather-widget__sug-detail']}>
                      {s.admin1 ? `${s.admin1}, ` : ''}{s.country}{s.country_code ? ` (${s.country_code})` : ''}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          className={styles['weather-widget__loc-btn']}
          onClick={handleUseLocation}
          disabled={status === 'loading'}
          aria-label={t.useLocation}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
          <span>{t.useLocation}</span>
        </button>
      </div>

      {/* Loading */}
      {status === 'loading' && (
        <div className={styles['weather-widget__loading']}>
          <span className={styles['weather-widget__spinner']} aria-hidden="true" />
          {t.loading}
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <p className={styles['weather-widget__error']}>{error}</p>
      )}

      {/* Results */}
      {status === 'idle' && weather && (
        <div className={styles['weather-widget__results']}>

          <div className={styles['weather-widget__result-header']}>
            <p className={styles['weather-widget__city']}>{cityName}</p>
            <div className={styles['weather-widget__unit-toggle']}>
              <button
                type="button"
                className={`${styles['weather-widget__unit-btn']} ${unit === 'C' ? styles['weather-widget__unit-btn--active'] : ''}`}
                onClick={() => setUnit('C')}
              >°C</button>
              <button
                type="button"
                className={`${styles['weather-widget__unit-btn']} ${unit === 'F' ? styles['weather-widget__unit-btn--active'] : ''}`}
                onClick={() => setUnit('F')}
              >°F</button>
            </div>
          </div>

          <div className={styles['weather-widget__current']}>
            <div className={styles['weather-widget__current-main']}>
              <span className={styles['weather-widget__current-icon']} aria-hidden="true">
                {getWmo(weather.current.weather_code, locale).icon}
              </span>
              <span className={styles['weather-widget__current-temp']}>
                {fmtTemp(weather.current.temperature_2m, unit)}
              </span>
            </div>
            <p className={styles['weather-widget__current-condition']}>
              {getWmo(weather.current.weather_code, locale).label}
            </p>
            <div className={styles['weather-widget__current-meta']}>
              <div className={styles['weather-widget__meta-item']}>
                <span className={styles['weather-widget__meta-label']}>{t.feelsLike}</span>
                <span className={styles['weather-widget__meta-value']}>{fmtTemp(weather.current.apparent_temperature, unit)}</span>
              </div>
              <div className={styles['weather-widget__meta-item']}>
                <span className={styles['weather-widget__meta-label']}>{t.humidity}</span>
                <span className={styles['weather-widget__meta-value']}>{weather.current.relative_humidity_2m}%</span>
              </div>
              <div className={styles['weather-widget__meta-item']}>
                <span className={styles['weather-widget__meta-label']}>{t.wind}</span>
                <span className={styles['weather-widget__meta-value']}>{Math.round(weather.current.wind_speed_10m)} {t.kmh}</span>
              </div>
              {weather.daily.sunrise?.[0] && (
                <div className={styles['weather-widget__meta-item']}>
                  <span className={styles['weather-widget__meta-label']}>{t.sunrise}</span>
                  <span className={styles['weather-widget__meta-value']}>🌅 {formatTime(weather.daily.sunrise[0])}</span>
                </div>
              )}
              {weather.daily.sunset?.[0] && (
                <div className={styles['weather-widget__meta-item']}>
                  <span className={styles['weather-widget__meta-label']}>{t.sunset}</span>
                  <span className={styles['weather-widget__meta-value']}>🌇 {formatTime(weather.daily.sunset[0])}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles['weather-widget__forecast']}>
            {weather.daily.time.map((date, i) => {
              const wmo = getWmo(weather.daily.weather_code[i], locale);
              const label = getDayLabel(date, locale, today, t.today);
              const isToday = date === today;
              return (
                <div
                  key={date}
                  className={`${styles['weather-widget__forecast-day']} ${isToday ? styles['weather-widget__forecast-day--today'] : ''}`}
                >
                  <span className={styles['weather-widget__forecast-label']}>{label}</span>
                  <span className={styles['weather-widget__forecast-precip']}>
                    💧{weather.daily.precipitation_probability_max[i] ?? 0}%
                  </span>
                  <span className={styles['weather-widget__forecast-icon']} aria-hidden="true">{wmo.icon}</span>
                  <span className={styles['weather-widget__forecast-max']}>{fmtTemp(weather.daily.temperature_2m_max[i], unit)}</span>
                  <span className={styles['weather-widget__forecast-min']}>{fmtTemp(weather.daily.temperature_2m_min[i], unit)}</span>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
}

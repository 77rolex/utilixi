import type { MetadataRoute } from 'next';
import { BASE_URL, LOCALES } from '@/lib/seo';

const PAGES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/calculator/mortgage', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/calculator/loan', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/calculator/bmi', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/calculator/calories', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/currency', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/currency/rates', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/crypto', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/crypto/converter', priority: 0.8, changeFrequency: 'daily' as const },
  { path: '/calculator/pregnancy', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/deposit', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/ideal-weight', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/weather', priority: 0.8, changeFrequency: 'daily' as const },
  { path: '/calculator/alimony', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/rent-vs-buy', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/roi', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/pension', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/tools/password-generator', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/vat', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/compound-interest', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/converter/units', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/heart-rate', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/tip', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/age', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/date-diff', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/converter/color', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/converter/clothing-size', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/tools/countdown', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/traffic-fine', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/flight-delay', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/limitation', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/renovation', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/calculator/property-tax', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/calculator/car-insurance', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/life-insurance', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/income-tax', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/crypto-tax', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/freelance-rate', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/margin', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/gpa', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/converter/grade-system', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/biological-age', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/diabetes-risk', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/stress-level', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/tools/word-counter', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/discount', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/sleep', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/percentage', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/basic', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/engineering', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/body-fat', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/water-intake', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/ovulation', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/converter/timezone', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/salary', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/calculator/life-path', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/destiny-number', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/name-number', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/soul-number', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/personality-number', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/personal-year', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/numerology-compatibility', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/pythagorean-matrix', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/karmic-number', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/zodiac-sign', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/chinese-zodiac', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/celtic-zodiac', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/zodiac-compatibility', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/mercury-retrograde', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/angel-number', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/archetype-number', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/biorhythm', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/moon-phases', priority: 0.8, changeFrequency: 'daily' as const },
  { path: '/calculator/moon-sign', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/fuel-cost', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/electricity-bill', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/savings-goal', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/calorie-deficit', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/net-worth', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/pace', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/macros', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/ac-cost', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/travel-budget', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/material-cost', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/party-food', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/pool-volume', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/spf', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/calculator/inflation', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/calculator/loan-payoff', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/contact', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const page of PAGES) {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[locale] = `${BASE_URL}/${locale}${page.path}`;
    }
    languages['x-default'] = `${BASE_URL}/en${page.path}`;

    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}

import type { MetadataRoute } from 'next';
import { BASE_URL, LOCALES } from '@/lib/seo';

const PAGES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/calculator/mortgage', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/calculator/loan', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/calculator/bmi', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/calculator/calories', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/currency', priority: 0.9, changeFrequency: 'daily' as const },
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

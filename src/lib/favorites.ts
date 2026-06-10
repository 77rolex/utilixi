export const FAVORITES_KEY = 'utilixi_favorites';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isFavorite(href: string): boolean {
  return getFavorites().includes(href);
}

export function toggleFavorite(href: string): boolean {
  const current = getFavorites();
  const exists = current.includes(href);
  const next = exists ? current.filter((h) => h !== href) : [...current, href];
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  } catch {
    // localStorage недоступен (приватный режим с полным хранилищем)
  }
  return !exists;
}

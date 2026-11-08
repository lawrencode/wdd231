const THEME_KEY = 'alaMai-theme';
const PLAN_KEY = 'alaMai-trip-plan';
const FAVORITES_KEY = 'alaMai-favorites';

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

export function savePlan(plan) {
  localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

export function getPlan() {
  const saved = localStorage.getItem(PLAN_KEY);
  return saved ? JSON.parse(saved) : null;
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function getFavorites() {
  const saved = localStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
}






// Thin, safe wrapper around browser localStorage. All reads/writes are
// JSON-encoded and guarded so a parse error or disabled storage never
// crashes the app.

const PREFIX = 'scn_'; // Student Career Navigator namespace

export const STORAGE_KEYS = {
  PROFILE: `${PREFIX}profile`,
  SAVED_JOBS: `${PREFIX}saved_jobs`,
  APPLICATIONS: `${PREFIX}applications`,
};

export function loadFromStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Could not read "${key}" from localStorage:`, err);
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`Could not write "${key}" to localStorage:`, err);
    return false;
  }
}

export function removeFromStorage(key) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.warn(`Could not remove "${key}" from localStorage:`, err);
    return false;
  }
}

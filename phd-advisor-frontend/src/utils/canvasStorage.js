export const CANVAS_LAYOUT_KEY = 'canvas-layout-v2';
export const CANVAS_STATES_KEY = 'canvas-states-v2';
export const CANVAS_DELIVERABLES_KEY = 'canvas-deliverables-v2';
export const CANVAS_TASK_STATUS_KEY = 'canvas-task-status-v1';
export const CANVAS_INSIGHTS_VIEW_KEY = 'canvas-insights-view';
export const CANVAS_VIEW_KEY = 'canvas-view-v2';
export const CANVAS_HANDOFF_KEY = 'canvas-chat-handoff';
export const CANVAS_TOUR_KEY = 'canvas-tour-seen-launchpad-v1';
export const ACTIVE_ADVISORS_KEY = 'healthyEatingActiveAdvisorIds';
export const LEGACY_ACTIVE_ADVISORS_KEY = 'muscleGrowthActiveAdvisorIds';
export const USER_AVATAR_KEY = 'userAvatarId';
export const SEARCH_PATH_KEY = 'healthyEatingSearchPath';
export const ONBOARDING_TOUR_KEY = 'hasSeenOnboardingTour';
export const AVATAR_OVERRIDES_KEY = 'advisorAvatarOverrides';
export const CUSTOM_AVATARS_KEY = 'myCustomAvatars';
export const SIDEBAR_EXPANDED_KEY = 'sidebar-expanded-v1';
export const IDENTITY_EVENT = 'hea-identity-change';

export const PRESERVED_KEYS = ['theme', 'authToken', 'user'];

export const MATERIAL_BASE_KEYS = [
  CANVAS_LAYOUT_KEY,
  CANVAS_STATES_KEY,
  CANVAS_DELIVERABLES_KEY,
  CANVAS_TASK_STATUS_KEY,
  'canvas-deliverables-v1',
  CANVAS_INSIGHTS_VIEW_KEY,
  CANVAS_VIEW_KEY,
  CANVAS_HANDOFF_KEY,
  CANVAS_TOUR_KEY,
  ACTIVE_ADVISORS_KEY,
  LEGACY_ACTIVE_ADVISORS_KEY,
  USER_AVATAR_KEY,
  SEARCH_PATH_KEY,
  ONBOARDING_TOUR_KEY,
  AVATAR_OVERRIDES_KEY,
  CUSTOM_AVATARS_KEY,
  SIDEBAR_EXPANDED_KEY,
];

export function canvasUserId(user) {
  return user?.id || user?._id || null;
}

export function scopedStorageKey(baseKey, userId) {
  return userId ? `${baseKey}:${userId}` : baseKey;
}

export function notifyIdentityChange() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(IDENTITY_EVENT));
}

export function isMaterialStorageKey(key) {
  if (!key || PRESERVED_KEYS.includes(key)) return false;
  const base = key.split(':')[0];
  if (MATERIAL_BASE_KEYS.includes(base)) return true;
  return base.startsWith('canvas-');
}

function allLocalStorageKeys() {
  const keys = [];
  if (typeof localStorage === 'undefined') return keys;
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key) keys.push(key);
  }
  return keys;
}

export function readScopedItem(baseKey, userId) {
  if (!userId || typeof localStorage === 'undefined') return null;
  return localStorage.getItem(scopedStorageKey(baseKey, userId));
}

export function writeScopedItem(baseKey, userId, value) {
  if (!userId || typeof localStorage === 'undefined') return;
  localStorage.setItem(scopedStorageKey(baseKey, userId), value);
}

export function readScopedJson(baseKey, userId, fallback) {
  try {
    if (!userId) return fallback;
    const raw = readScopedItem(baseKey, userId);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeScopedJson(baseKey, userId, value) {
  if (!userId) return;
  writeScopedItem(baseKey, userId, JSON.stringify(value));
}

export function removeScoped(baseKey, userId) {
  if (typeof localStorage === 'undefined') return;
  if (userId) {
    localStorage.removeItem(scopedStorageKey(baseKey, userId));
  }
  localStorage.removeItem(baseKey);
}

export function clearUnscopedMaterial() {
  allLocalStorageKeys().forEach((key) => {
    if (PRESERVED_KEYS.includes(key)) return;
    if (key.includes(':')) return;
    if (isMaterialStorageKey(key)) localStorage.removeItem(key);
  });
}

export function clearScopedMaterialForUser(userId) {
  if (!userId) return;
  const suffix = `:${userId}`;
  allLocalStorageKeys().forEach((key) => {
    if (key.endsWith(suffix)) localStorage.removeItem(key);
  });
}

export function clearSessionMaterial() {
  try {
    if (typeof sessionStorage === 'undefined') return;
    sessionStorage.removeItem('__tourStarted__');
    sessionStorage.clear();
  } catch {
    /* ignore */
  }
}

/** Call before persisting a new identity so leftover unscoped keys cannot leak. */
export function isolateIncomingSession() {
  clearUnscopedMaterial();
  clearSessionMaterial();
}

/** Sign-out: drop leftovers. Guest-scoped keys are disposable; accounts keep theirs. */
export function prepareSignOut(user) {
  clearUnscopedMaterial();
  clearSessionMaterial();
  if (user?.is_guest) {
    clearScopedMaterialForUser(canvasUserId(user));
  }
}

export function clearCanvasLocalData(userId) {
  [
    CANVAS_LAYOUT_KEY,
    CANVAS_STATES_KEY,
    CANVAS_DELIVERABLES_KEY,
    CANVAS_TASK_STATUS_KEY,
  ].forEach((key) => removeScoped(key, userId));
}

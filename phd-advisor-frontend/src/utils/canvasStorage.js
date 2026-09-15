export const CANVAS_LAYOUT_KEY = 'canvas-layout-v2';
export const CANVAS_STATES_KEY = 'canvas-states-v2';
export const CANVAS_DELIVERABLES_KEY = 'canvas-deliverables-v2';
export const CANVAS_TASK_STATUS_KEY = 'canvas-task-status-v1';

export function canvasUserId(user) {
  return user?.id || user?._id || null;
}

export function scopedStorageKey(baseKey, userId) {
  return userId ? `${baseKey}:${userId}` : baseKey;
}

export function readScopedJson(baseKey, userId, fallback) {
  try {
    if (userId) {
      const scoped = scopedStorageKey(baseKey, userId);
      const raw = localStorage.getItem(scoped);
      if (raw != null) return JSON.parse(raw);
      const legacy = localStorage.getItem(baseKey);
      if (legacy != null) {
        localStorage.setItem(scoped, legacy);
        localStorage.removeItem(baseKey);
        return JSON.parse(legacy);
      }
      return fallback;
    }
    const raw = localStorage.getItem(baseKey);
    return raw != null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeScopedJson(baseKey, userId, value) {
  localStorage.setItem(scopedStorageKey(baseKey, userId), JSON.stringify(value));
}

export function removeScoped(baseKey, userId) {
  localStorage.removeItem(scopedStorageKey(baseKey, userId));
  if (userId) {
    localStorage.removeItem(baseKey);
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

const AUTH_TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

export function readStoredAuth() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const userData = localStorage.getItem(USER_KEY);
  if (!token || !userData) {
    return null;
  }

  try {
    return { token, user: JSON.parse(userData) };
  } catch {
    clearStoredAuth();
    return null;
  }
}

export function persistAuth(user, token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getApiBaseUrl() {
  return process.env.REACT_APP_API_URL || '';
}

/** FastAPI may return detail as a string or a list of validation objects. */
export function formatApiDetail(detail, fallback = 'Something went wrong. Please try again.') {
  if (detail == null || detail === '') return fallback;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    const parts = detail.map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item.msg === 'string') {
        const loc = Array.isArray(item.loc)
          ? item.loc.filter((x) => x !== 'body' && x !== 'query').join(' ')
          : '';
        return loc ? `${loc}: ${item.msg}` : item.msg;
      }
      return null;
    }).filter(Boolean);
    return parts.join(' ') || fallback;
  }
  if (typeof detail === 'object' && typeof detail.msg === 'string') {
    return detail.msg;
  }
  return fallback;
}

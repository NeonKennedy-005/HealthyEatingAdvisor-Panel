import {
  CANVAS_LAYOUT_KEY,
  CANVAS_STATES_KEY,
  ACTIVE_ADVISORS_KEY,
  SEARCH_PATH_KEY,
  readScopedJson,
  writeScopedJson,
  readScopedItem,
  writeScopedItem,
  isolateIncomingSession,
  prepareSignOut,
  clearUnscopedMaterial,
  clearScopedMaterialForUser,
} from './canvasStorage';

function seedUnscoped() {
  localStorage.setItem(CANVAS_LAYOUT_KEY, JSON.stringify({ leaked: true }));
  localStorage.setItem(CANVAS_STATES_KEY, JSON.stringify({ notes: 'account A leftover' }));
  localStorage.setItem(ACTIVE_ADVISORS_KEY, JSON.stringify(['veggie_chef']));
  localStorage.setItem(SEARCH_PATH_KEY, 'Supplements');
}

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

test('readScopedJson does not migrate unscoped leftovers into a new identity', () => {
  seedUnscoped();
  expect(readScopedJson(CANVAS_STATES_KEY, 'user-b', {})).toEqual({});
  expect(localStorage.getItem(CANVAS_STATES_KEY)).toBeTruthy();
});

test('writeScopedJson with no userId does not write unscoped material', () => {
  writeScopedJson(CANVAS_STATES_KEY, null, { notes: 'should not persist' });
  expect(localStorage.getItem(CANVAS_STATES_KEY)).toBeNull();
});

test('account A canvas survives sign-out and is hidden from guest', () => {
  writeScopedJson(CANVAS_STATES_KEY, 'user-a', { notes: 'Heidi widgets' });
  writeScopedItem(ACTIVE_ADVISORS_KEY, 'user-a', JSON.stringify(['veggie_chef']));
  seedUnscoped();

  prepareSignOut({ id: 'user-a', is_guest: false });

  expect(readScopedJson(CANVAS_STATES_KEY, 'user-a', {})).toEqual({ notes: 'Heidi widgets' });
  expect(localStorage.getItem(CANVAS_STATES_KEY)).toBeNull();
  expect(localStorage.getItem(ACTIVE_ADVISORS_KEY)).toBeNull();
  expect(readScopedJson(CANVAS_STATES_KEY, 'guest-1', {})).toEqual({});
  expect(readScopedItem(ACTIVE_ADVISORS_KEY, 'guest-1')).toBeNull();
});

test('guest sign-out drops that guest scoped material', () => {
  writeScopedJson(CANVAS_STATES_KEY, 'guest-1', { notes: 'guest doodle' });
  prepareSignOut({ id: 'guest-1', is_guest: true });
  expect(readScopedJson(CANVAS_STATES_KEY, 'guest-1', {})).toEqual({});
});

test('incoming signup/guest session clears unscoped leftovers', () => {
  seedUnscoped();
  sessionStorage.setItem('__tourStarted__', '1');
  isolateIncomingSession();
  expect(localStorage.getItem(CANVAS_STATES_KEY)).toBeNull();
  expect(localStorage.getItem(ACTIVE_ADVISORS_KEY)).toBeNull();
  expect(sessionStorage.getItem('__tourStarted__')).toBeNull();
});

test('new account does not inherit previous account scoped canvas', () => {
  writeScopedJson(CANVAS_LAYOUT_KEY, 'user-a', { widgets: ['produce'] });
  isolateIncomingSession();
  expect(readScopedJson(CANVAS_LAYOUT_KEY, 'user-new', null)).toBeNull();
  expect(readScopedJson(CANVAS_LAYOUT_KEY, 'user-a', null)).toEqual({ widgets: ['produce'] });
});

test('clearUnscopedMaterial leaves auth and theme', () => {
  localStorage.setItem('theme', 'dark');
  localStorage.setItem('authToken', 'tok');
  localStorage.setItem('user', '{"id":"user-a"}');
  seedUnscoped();
  clearUnscopedMaterial();
  expect(localStorage.getItem('theme')).toBe('dark');
  expect(localStorage.getItem('authToken')).toBe('tok');
  expect(localStorage.getItem(CANVAS_STATES_KEY)).toBeNull();
});

test('clearScopedMaterialForUser only removes that user', () => {
  writeScopedJson(CANVAS_STATES_KEY, 'user-a', { a: 1 });
  writeScopedJson(CANVAS_STATES_KEY, 'user-b', { b: 1 });
  clearScopedMaterialForUser('user-a');
  expect(readScopedJson(CANVAS_STATES_KEY, 'user-a', {})).toEqual({});
  expect(readScopedJson(CANVAS_STATES_KEY, 'user-b', {})).toEqual({ b: 1 });
});

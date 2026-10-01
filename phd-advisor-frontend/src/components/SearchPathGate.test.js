import { needsSearchPath, persistFoodTrack, FOOD_TRACK, SEARCH_PATH_OPTIONS } from './SearchPathGate';
import { SEARCH_PATH_KEY, readScopedItem } from '../utils/canvasStorage';

beforeEach(() => {
  localStorage.clear();
});

test('food is the only track option', () => {
  expect(SEARCH_PATH_OPTIONS.map((o) => o.value)).toEqual([FOOD_TRACK]);
});

test('the guest track popup never shows', () => {
  expect(needsSearchPath(null, 'guest-1')).toBe(false);
  expect(needsSearchPath({ cyber_role: 'Supplements' }, 'guest-1')).toBe(false);
  expect(needsSearchPath({ cyber_role: 'Healthcare' }, 'user-a')).toBe(false);
});

test('persistFoodTrack stores Foods for the user', () => {
  persistFoodTrack('guest-1');
  expect(readScopedItem(SEARCH_PATH_KEY, 'guest-1')).toBe(FOOD_TRACK);
});

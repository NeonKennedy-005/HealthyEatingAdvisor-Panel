import { Leaf } from 'lucide-react';
import { writeScopedItem, SEARCH_PATH_KEY } from '../utils/canvasStorage';

export const SEARCH_PATH_STORAGE_KEY = SEARCH_PATH_KEY;
export const FOOD_TRACK = 'Foods';

/** Food is the only track. Non-food options (Supplements, Exercise, Healthcare) are gone. */
export const SEARCH_PATH_OPTIONS = [
  {
    value: FOOD_TRACK,
    title: 'Foods',
    description: 'Clean eating, produce, recipes, and everyday real-food habits.',
    icon: Leaf,
    color: '#059669',
    bg: '#ECFDF5',
  },
];

export function persistFoodTrack(userId) {
  if (userId) writeScopedItem(SEARCH_PATH_KEY, userId, FOOD_TRACK);
}

/**
 * Never show the first-run track picker. Heidi’s panel is food-only.
 */
export function needsSearchPath(_profile, _userId) {
  return false;
}

const SearchPathGate = () => null;

export default SearchPathGate;

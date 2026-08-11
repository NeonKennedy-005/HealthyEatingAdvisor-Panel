import React, { useState } from 'react';
import { Leaf, Pill, Dumbbell, HeartPulse, ArrowRight } from 'lucide-react';
import './SearchPathGate.css';

export const SEARCH_PATH_STORAGE_KEY = 'healthyEatingSearchPath';

export const SEARCH_PATH_OPTIONS = [
  {
    value: 'Foods',
    title: 'Foods',
    description: 'Clean eating, produce, recipes, and everyday real-food habits.',
    icon: Leaf,
    color: '#059669',
    bg: '#ECFDF5',
  },
  {
    value: 'Supplements',
    title: 'Supplements',
    description: 'Superfoods, enzymes, and concentrated nutrition — with careful guidance.',
    icon: Pill,
    color: '#D97706',
    bg: '#FFFBEB',
  },
  {
    value: 'Exercise',
    title: 'Exercise',
    description: 'Fueling movement with whole foods, snacks, and recovery-friendly meals.',
    icon: Dumbbell,
    color: '#2563EB',
    bg: '#EFF6FF',
  },
  {
    value: 'Healthcare',
    title: 'Healthcare',
    description: 'Food-first wellness questions to discuss alongside your own clinicians.',
    icon: HeartPulse,
    color: '#E11D48',
    bg: '#FFF1F2',
  },
];

const KNOWN_PATHS = new Set([
  ...SEARCH_PATH_OPTIONS.map((o) => o.value.toLowerCase()),
  'clean eating basics',
  'more fruits & vegetables',
  'more fruits and vegetables',
]);

/**
 * First-run gate: healthy-eating focus steers advisor trajectory.
 * Shown once until a known focus is saved (profile or localStorage).
 */
const SearchPathGate = ({ authToken, onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    if (!selected) {
      setError('Pick a focus to continue.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cyber_role: selected }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.detail || 'Could not save your choice');
      }
      const profile = await resp.json();
      localStorage.setItem(SEARCH_PATH_STORAGE_KEY, selected);
      onComplete?.(profile, selected);
    } catch (e) {
      setError(e.message || 'Could not save your choice');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="search-path-backdrop" role="dialog" aria-modal="true" aria-labelledby="search-path-title">
      <div className="search-path-card">
        <h2 id="search-path-title">What would you like to focus on right now?</h2>
        <p className="search-path-sub">
          Pick one track to start. You can always ask about anything in chat — this just helps the advisors greet you in the right lane.
        </p>
        <div className="search-path-options">
          {SEARCH_PATH_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = selected === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                className={`search-path-option ${active ? 'active' : ''}`}
                onClick={() => { setSelected(opt.value); setError(''); }}
                disabled={saving}
                style={active ? { borderColor: opt.color, background: opt.bg } : undefined}
              >
                <Icon className="search-path-option-icon" size={22} style={{ color: opt.color }} />
                <span className="search-path-option-title">{opt.title}</span>
                <span className="search-path-option-desc">{opt.description}</span>
              </button>
            );
          })}
        </div>
        {error && <div className="search-path-error">{error}</div>}
        <button
          type="button"
          className="search-path-continue"
          onClick={handleContinue}
          disabled={saving || !selected}
        >
          {saving ? 'Saving…' : 'Continue to advisors'}
          {!saving && <ArrowRight size={16} />}
        </button>
        <button
          type="button"
          className="search-path-skip"
          onClick={() => {
            localStorage.setItem(SEARCH_PATH_STORAGE_KEY, 'Foods');
            onComplete?.(null, 'Foods');
          }}
          disabled={saving}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export function needsSearchPath(profile) {
  try {
    const stored = localStorage.getItem(SEARCH_PATH_STORAGE_KEY);
    if (stored && KNOWN_PATHS.has(String(stored).toLowerCase())) {
      return false;
    }
  } catch {
    /* ignore */
  }
  const role = profile?.cyber_role;
  if (!role) return true;
  return !KNOWN_PATHS.has(String(role).toLowerCase());
}

export default SearchPathGate;

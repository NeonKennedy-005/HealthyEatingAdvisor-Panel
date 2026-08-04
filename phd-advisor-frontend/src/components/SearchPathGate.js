import React, { useState } from 'react';
import { Leaf, UtensilsCrossed, ArrowRight } from 'lucide-react';
import './SearchPathGate.css';

export const SEARCH_PATH_OPTIONS = [
  {
    value: 'Clean eating basics',
    title: 'Get started',
    description: 'I want practical clean eating and real-food basics without overwhelm.',
    icon: Leaf,
  },
  {
    value: 'More fruits & vegetables',
    title: 'More produce',
    description: 'I want help enjoying fruits, vegetables, recipes, and easy prep.',
    icon: UtensilsCrossed,
  },
];

/**
 * First-run gate: healthy-eating focus steers advisor trajectory.
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
      localStorage.setItem('healthyEatingSearchPath', selected);
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
        <h2 id="search-path-title">What food goal are you aiming for right now?</h2>
        <p className="search-path-sub">
          This steers every advisor — Kitchen Coach, produce specialists, superfoods, enzymes, and book guidance.
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
              >
                <Icon className="search-path-option-icon" size={22} />
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
      </div>
    </div>
  );
};

export function needsSearchPath(profile) {
  const role = profile?.cyber_role;
  if (!role) return true;
  const normalized = String(role).toLowerCase();
  return !(
    normalized.includes('internship')
    || normalized.includes('full-time')
    || normalized.includes('full time')
    || normalized.includes('both')
  );
}

export default SearchPathGate;

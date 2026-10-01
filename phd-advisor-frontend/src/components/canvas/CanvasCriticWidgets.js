import React, { useState } from 'react';
import Icon from './CanvasIcon';

const fireToast = (msg, kind = 'success') =>
  window.dispatchEvent(new CustomEvent('canvas-toast', { detail: { msg, kind } }));

export const hasUserText = (value) => String(value || '').trim().length > 0;

// Keep typing in the widget/modal from being stolen by drag, drop overlays, or parent capture.
export const stopFieldPointer = (e) => {
  e.stopPropagation();
};

const hashText = (text) => {
  const s = String(text || '');
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h + s.charCodeAt(i) * (i + 1)) % 997;
  return h;
};

// Critic widgets are scripted in canvas; the *real* critique should happen in
// the main chat so message history lives in one place (per Daniel's review).
// "Open in chat" stashes a draft prompt + persona hint then asks CanvasPage to
// navigate to chat — the chat page can read `canvas-chat-handoff` from localStorage.
const handoffToChat = (persona, prompt, context = {}) => {
  try {
    localStorage.setItem('canvas-chat-handoff', JSON.stringify({
      at: Date.now(), persona, prompt, ...context,
    }));
  } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent('canvas-open-in-chat', { detail: { persona, prompt } }));
  fireToast(`Opening ${persona} in chat — full history will be there.`);
};

function CriticField({ id, label, value, onChange, placeholder, minHeight = 88 }) {
  return (
    <div className="critic-form">
      <label className="label" htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className="textarea critic-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onPointerDown={stopFieldPointer}
        onMouseDown={stopFieldPointer}
        onTouchStart={stopFieldPointer}
        placeholder={placeholder}
        style={{ minHeight }}
      />
    </div>
  );
}

const REVIEW_TEMPLATES = [
  {
    severity: 8,
    major: 'The eating plan states a goal ("eat healthier") before defining what success looks like. You never specify the measurable target — which meals, how many produce servings/week, by when — so there is no way to tell if the plan is working or when to change it.',
    minor: [
      'Weekly volume is described as "more vegetables" without a concrete count or quality bar.',
      'No rule for when to pause new recipes and reuse a shortlist instead.',
      'Snack strategy is mentioned once with no prep cadence or tracking.',
      'No Friday review is scheduled — leftover waste will stay invisible.',
    ],
    suggestions: [
      'Add one sentence naming the target: e.g. "5 produce-forward dinners/week through April 15."',
      'Define what "quality meal" means (real-food ingredients + one produce item).',
      'Add a weekly kitchen review with homemade-meal count.',
    ],
  },
  {
    severity: 7,
    major: 'You claim this approach is "optimal for eating clean." That word is doing too much work. The plan is also compatible with worse outcomes (generic takeout, skipped prep, burnout). Without a way to check whether homemade meals improve, "optimal" is untestable.',
    minor: [
      'The shopping mix is justified by "everyone buys salad kits" rather than by your kitchen time and season.',
      'No statement of what would make you change the plan.',
      'A meal plan with no tracked numbers is a red flag — you cannot audit it later.',
    ],
    suggestions: [
      'Replace "optimal" with a specific target the plan either hits or misses.',
      'List 1–2 signals (0 homemade lunches after 5 days, missed prep blocks) that trigger a change.',
    ],
  },
  {
    severity: 9,
    major: 'This reads like a wish list, not a plan. There is no number. There is no timeframe. The strongest claim is that you want to "find something good" — which is the lowest possible bar. If you actually care about the result, lead with the measurable goal, not the vibe.',
    minor: [
      'The word "meal prep" appears without a single shopping list drafted.',
      '"Dream recipe" is undefined; name 10 real meals.',
      'No mention of pantry staples, despite them driving most weeknight outcomes.',
    ],
    suggestions: [
      'Lead sentence: "By <date> I will <specific, measurable result>."',
      'Cut "I want to eat healthier" entirely. Replace it with meal lane, volume, and a date.',
    ],
  },
];

export function critiqueDraft(draft) {
  const text = String(draft || '').trim();
  if (!text) return null;
  const idx = (text.length + text.split(/\s+/).filter(Boolean).length) % REVIEW_TEMPLATES.length;
  const r = REVIEW_TEMPLATES[idx];
  return {
    draft: text,
    severity: r.severity,
    major: r.major,
    minor: r.minor,
    suggestions: r.suggestions,
    minorCount: r.minor.length,
    suggestionCount: r.suggestions.length,
  };
}

const DEVIL_POOL = [
  { lbl: 'Reverse causation', text: 'You assume the plan caused the win. A quieter week, leftover produce already in the fridge, or eating out less for unrelated reasons could explain the same result. Name a check that would falsify the plan.' },
  { lbl: 'Goalpost shift', text: 'When dinners slip you will be tempted to redefine success ("at least I bought kale"). Pick the primary metric now — produce servings, homemade dinners, or snack swaps — or you cannot honestly say it worked.' },
  { lbl: 'Wrong lever', text: 'You are tweaking recipes when the bottleneck is shopping cadence and a visible produce default. Optimizing flavor while the fridge is empty will not move the number.' },
  { lbl: 'Copied context', text: 'This cadence was built for someone with a different kitchen, schedule, or household. On your weeknights it may be testing a plan that does not apply to you.' },
  { lbl: 'Hidden willpower tax', text: 'The plan only works if you are unusually motivated. If it requires a perfect Sunday prep, it will fail the first busy Thursday. Write the version that survives a late meeting.' },
  { lbl: 'No kill criteria', text: 'There is no rule for when to stop adding new recipes and reuse a shortlist. Without a stop rule, "trying foods" becomes infinite scope and leftover waste.' },
];

export function countersForClaim(claim, already = []) {
  const text = String(claim || '').trim();
  if (!text) return [];
  const used = new Set((already || []).map((c) => c.lbl));
  const start = hashText(text) % DEVIL_POOL.length;
  const ordered = DEVIL_POOL.slice(start).concat(DEVIL_POOL.slice(0, start));
  const next = [...(already || [])];
  const want = next.length === 0 ? 3 : next.length + 1;
  for (const c of ordered) {
    if (next.length >= want) break;
    if (used.has(c.lbl)) continue;
    next.push({ lbl: c.lbl, text: c.text });
    used.add(c.lbl);
  }
  return next;
}

export function verdictForTarget(target) {
  const text = String(target || '').trim();
  if (!text) return null;
  const words = text.split(/\s+/).filter(Boolean);
  const hasNumber = /\d/.test(text);
  const hasTime = /(day|days|week|weeks|month|months|by |until|deadline|friday|monday)/i.test(text);
  const vague = /(healthier|better|more|optimal|eat clean|wellness|try to|something good)/i.test(text);
  const specificFood = /(veg|fruit|produce|dinner|lunch|snack|meal|protein|prep|homemade)/i.test(text);

  const specificity = Math.min(95, (hasNumber ? 36 : 12) + Math.min(36, words.length * 4) + (specificFood ? 18 : 0));
  const timebox = hasTime ? 78 : 28;
  const measurable = hasNumber ? 82 : 24;
  const kitchenLoad = vague ? 34 : 64;
  const buffer = hasTime && hasNumber ? 70 : 38;
  const factors = [
    { label: 'Specificity', val: specificity },
    { label: 'Timebox', val: timebox },
    { label: 'Measurable', val: measurable },
    { label: 'Kitchen load', val: kitchenLoad },
    { label: 'Recovery buffer', val: buffer },
  ];
  const avg = factors.reduce((sum, f) => sum + f.val, 0) / factors.length;
  const score = Math.round((avg / 10) * 10) / 10;
  let label = 'Unrealistic without a rewrite';
  if (score >= 7) label = 'Comfortable if you protect the cadence';
  else if (score >= 5) label = 'Possible, but the plan is still mushy';
  else if (score >= 3) label = 'Stretched — cut scope or add a date';
  const notes = !hasNumber
    ? `“${text}” has no number. A feasibility check cannot tell a vibe from a target. Name servings, meals/week, or a date.`
    : !hasTime
      ? `“${text}” names a quantity but not when. Without a timebox, leftover weeks and skipped prep stay invisible.`
      : `“${text}” is specific enough to pressure-test. The risk is kitchen load on busy nights, not effort on a good week.`;
  const actions = [
    hasNumber ? 'Keep the number; make it visible on a Friday review.' : 'Rewrite as one measurable target (count + meal lane).',
    hasTime ? 'Protect a short prep block that survives a late day.' : 'Add a deadline: this week, two weeks, or a calendar date.',
    'Commit to one primary goal for this block. Extra recipes are scope creep.',
    'Keep a frozen-produce backup so dinner never depends on a perfect grocery run.',
  ];
  return { target: text, score, label, factors, notes, actions };
}

function runDelayed(setter, work) {
  setter(true);
  window.setTimeout(() => {
    work();
    setter(false);
  }, 600);
}

// ---------- Reviewer 2 widget ----------
export function Reviewer2Widget({ state, setState, openModal }) {
  const savedDraft = state.lastDraft || '';
  const [draft, setDraft] = useState(savedDraft);
  const [running, setRunning] = useState(false);
  const hasReview = !!(state.lastReview && hasUserText(state.lastDraft));

  const run = () => {
    if (!hasUserText(draft) || running) return;
    runDelayed(setRunning, () => {
      const review = critiqueDraft(draft);
      if (!review) return;
      setState({ ...state, lastDraft: review.draft, lastReview: review });
      fireToast('Critique ready · severity ' + review.severity + '/10', 'critic');
    });
  };

  return (
    <>
      <CriticField
        id="reviewer-2-draft"
        label="Paste a draft"
        value={draft}
        onChange={setDraft}
        placeholder="Paste a draft paragraph, abstract, or meal-plan section…"
        minHeight={110}
      />
      {!hasReview && (
        <div className="critic-empty-hint">
          No critique yet. Paste a draft above and submit — this widget will not invent one.
        </div>
      )}
      {hasReview && (
        <div className="review">
          <span className="review-tag">Last critique · {state.lastReview.severity}/10 severity</span>
          <div style={{ marginBottom: 6 }}><strong>Major:</strong> {state.lastReview.major}</div>
          <div style={{ color: 'var(--canvas-text-2)', fontSize: 12 }}>+{state.lastReview.minorCount} minor issues, {state.lastReview.suggestionCount} suggestions</div>
        </div>
      )}
      <div className="critic-meter">
        <span>tone</span>
        <div className="bar"><i style={{ width: '92%' }}/></div>
        <span style={{ color: 'var(--canvas-critic)' }}>harsh</span>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignSelf: 'flex-start' }}>
        <button
          className="btn btn-critic"
          onClick={run}
          disabled={!hasUserText(draft) || running}
        >
          <Icon name="gavel" size={13}/>{running ? 'Reviewing…' : 'Critique my draft'}
        </button>
        {hasReview && (
          <button
            className="btn"
            onClick={() => openModal('reviewer-2', {
              initial: draft || state.lastDraft,
              onComplete: (review) => setState({ ...state, lastDraft: review.draft, lastReview: review }),
            })}
          >
            <Icon name="gavel" size={13}/>Read full critique
          </button>
        )}
        <button
          className="btn"
          title="Open Reviewer 2 in the main chat (history lives there)"
          onClick={() => handoffToChat('Reviewer 2', hasUserText(draft)
            ? `Critique this draft as Reviewer 2: "${draft.trim()}"`
            : 'I want Reviewer 2. I will paste a draft in chat.')}
        >
          <Icon name="message" size={13}/>Open in chat
        </button>
      </div>
    </>
  );
}

// ---------- Devil's Advocate widget ----------
export function DevilsAdvocateWidget({ state, setState, openModal }) {
  const [claim, setClaim] = useState(state.claim || '');
  const [pushing, setPushing] = useState(false);
  const hasClaim = hasUserText(state.claim);
  const counters = hasClaim ? (state.counters || []) : [];

  const run = () => {
    if (!hasUserText(claim) || pushing) return;
    runDelayed(setPushing, () => {
      const next = countersForClaim(claim, []);
      setState({ ...state, claim: claim.trim(), counters: next });
      fireToast('Counters ready · ' + next.length, 'critic');
    });
  };

  return (
    <>
      <CriticField
        id="devils-advocate-claim"
        label="Enter a claim"
        value={claim}
        onChange={setClaim}
        placeholder="Enter a claim — e.g. I'll cook 5 produce-forward dinners this week."
      />
      {!hasClaim && (
        <div className="critic-empty-hint">
          No counters yet. Enter a claim above and submit — nothing is generated until you do.
        </div>
      )}
      {hasClaim && (
        <>
          <div style={{ fontSize: 11, color: 'var(--canvas-critic)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            Strongest counters · {counters.length}
          </div>
          <div className="devil-list">
            {counters.slice(0, 3).map((c, i) => (
              <div key={i} className="devil-item">
                <div className="lbl">{c.lbl}</div>
                <div>{c.text}</div>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignSelf: 'flex-start' }}>
        <button
          className="btn btn-critic"
          onClick={run}
          disabled={!hasUserText(claim) || pushing}
        >
          <Icon name="scale" size={13}/>{pushing ? 'Thinking…' : 'Challenge this claim'}
        </button>
        {hasClaim && (
          <button
            className="btn"
            onClick={() => openModal('devils-advocate', {
              claim: state.claim,
              counters: state.counters,
              onUpdate: (next) => setState({ ...state, ...next }),
            })}
          >
            <Icon name="scale" size={13}/>Push harder
          </button>
        )}
        <button
          className="btn"
          title="Open Devil's Advocate in the main chat (history lives there)"
          onClick={() => handoffToChat("Devil's Advocate",
            hasUserText(claim)
              ? `Take the position of devil's advocate on my claim: "${claim.trim()}". Be ruthless.`
              : "I want Devil's Advocate. I will enter a claim in chat.")}
        >
          <Icon name="message" size={13}/>Open in chat
        </button>
      </div>
    </>
  );
}

// ---------- Scope realism widget ----------
export function ScopeRealismWidget({ state, setState, openModal }) {
  const [target, setTarget] = useState(state.target || '');
  const [running, setRunning] = useState(false);
  const hasTarget = hasUserText(state.target);

  const run = () => {
    if (!hasUserText(target) || running) return;
    runDelayed(setRunning, () => {
      const next = verdictForTarget(target);
      if (!next) return;
      setState({ ...state, ...next });
      fireToast('Feasibility check ready · ' + next.score.toFixed(1), 'critic');
    });
  };

  return (
    <div className="realism">
      <CriticField
        id="scope-realism-target"
        label="Set a target"
        value={target}
        onChange={setTarget}
        placeholder="Set a target — e.g. 5 produce-forward dinners/week through April 15."
        minHeight={72}
      />
      {!hasTarget && (
        <div className="critic-empty-hint">
          No verdict yet. Set a target above and submit — the score stays blank until then.
        </div>
      )}
      {hasTarget && (
        <>
          <div className="realism-verdict">
            <div className="verdict-head">
              <div className="verdict-score">{Number(state.score || 0).toFixed(1)}</div>
              <div>
                <div className="verdict-label">Feasibility</div>
                <div style={{ fontSize: 12, color: 'var(--canvas-text-2)', marginTop: 2 }}>{state.label}</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--canvas-text-3)', fontFamily: 'var(--canvas-mono)' }}>
              target: {state.target}
            </div>
          </div>
          <div>
            {(state.factors || []).map((f) => (
              <div key={f.label} className="realism-row">
                <span className="label-cell">{f.label}</span>
                <span className="gauge"><i style={{ width: f.val + '%' }}/></span>
                <span className="val">{f.val}</span>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignSelf: 'flex-start' }}>
        <button
          className="btn btn-critic"
          onClick={run}
          disabled={!hasUserText(target) || running}
        >
          <Icon name="bullseye" size={13}/>{running ? 'Checking…' : 'Check feasibility'}
        </button>
        {hasTarget && (
          <button
            className="btn"
            onClick={() => openModal('scope-realism', {
              state,
              onUpdate: (next) => setState({ ...state, ...next }),
            })}
          >
            <Icon name="bullseye" size={13}/>Read full verdict
          </button>
        )}
        <button
          className="btn"
          title="Open Scope Realism in the main chat (history lives there)"
          onClick={() => handoffToChat('Scope Realism',
            hasUserText(target)
              ? `Run a brutal feasibility check on my goal: "${target.trim()}". Be specific about what's at risk.`
              : 'I want a Scope Realism check. I will set a target in chat.')}
        >
          <Icon name="message" size={13}/>Open in chat
        </button>
      </div>
    </div>
  );
}

// ===================================================================
// Critic modals
// ===================================================================

export function ReviewerModal({ data, onClose }) {
  const [draft, setDraft] = useState(data.initial || '');
  const [running, setRunning] = useState(false);
  const [review, setReview] = useState(null);

  const run = () => {
    if (!hasUserText(draft)) return;
    setRunning(true);
    setReview(null);
    setTimeout(() => {
      setReview(critiqueDraft(draft));
      setRunning(false);
    }, 900);
  };

  const accept = () => {
    if (!review) return;
    data.onComplete({
      draft,
      severity: review.severity,
      major: review.major,
      minorCount: review.minor.length,
      suggestionCount: review.suggestions.length,
    });
    fireToast('Critique saved · severity ' + review.severity + '/10', 'critic');
    onClose();
  };

  return (
    <div className="canvas-modal huge" onClick={(e) => e.stopPropagation()}>
      <div className="modal-head">
        <div className="modal-icon critic"><Icon name="gavel" size={18}/></div>
        <div style={{ flex: 1 }}>
          <div className="modal-title">Reviewer 2 Simulator</div>
          <div className="modal-sub">Paste a draft. Get the harshest competent peer review you'll ever read — before a real reviewer does.</div>
        </div>
        <button className="icon-btn" onClick={onClose}><Icon name="x" size={16}/></button>
      </div>
      <div className="modal-body">
        <div className="form-row critic-form">
          <label className="label" htmlFor="reviewer-modal-draft">Paste a draft</label>
          <textarea
            id="reviewer-modal-draft"
            className="textarea critic-input"
            style={{ minHeight: 120, fontFamily: 'var(--canvas-mono)', fontSize: 12.5 }}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onPointerDown={stopFieldPointer}
            onMouseDown={stopFieldPointer}
            placeholder="Paste an abstract, a claim, a paragraph…"
          />
          <div style={{ fontSize: 11, color: 'var(--canvas-text-3)', fontFamily: 'var(--canvas-mono)', textAlign: 'right' }}>{draft.length} chars · {draft.trim().split(/\s+/).filter(Boolean).length} words</div>
        </div>

        {!review && !running && (
          <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--canvas-bg-2)', border: '1px dashed var(--canvas-border-2)', borderRadius: 8, fontSize: 12, color: 'var(--canvas-text-3)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--canvas-text-2)' }}>What this is:</strong> a simulated peer review tuned to push back hard. It will name unstated operationalizations, rival explanations, and weak phrasings. <span style={{ color: 'var(--canvas-text-4)' }}>It will not flatter you. That's the point.</span>
          </div>
        )}

        {running && (
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--canvas-text-2)' }}>
            <div className="spinner critic"/>
            <span style={{ fontFamily: 'var(--canvas-mono)', fontSize: 12 }}>parsing claims · finding rival hypotheses · drafting…</span>
          </div>
        )}

        {review && (
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                fontFamily: 'var(--canvas-mono)', fontSize: 22, fontWeight: 600,
                color: 'var(--canvas-critic)', letterSpacing: '-0.02em',
              }}>{review.severity}/10</div>
              <div style={{ fontSize: 11, color: 'var(--canvas-text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>severity</div>
              <div style={{ flex: 1 }}/>
              <div style={{ fontSize: 11, fontFamily: 'var(--canvas-mono)', color: 'var(--canvas-text-3)' }}>{review.minor.length} minor · {review.suggestions.length} suggestions</div>
            </div>
            <div className="review">
              <span className="review-tag">Major issue</span>
              {review.major}
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--canvas-text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>Minor issues</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: 'var(--canvas-text-2)', lineHeight: 1.55 }}>
                {review.minor.map((m, i) => <li key={i} style={{ marginBottom: 4 }}>{m}</li>)}
              </ul>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--canvas-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>Suggestions</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: 'var(--canvas-text-2)', lineHeight: 1.55 }}>
                {review.suggestions.map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="modal-foot">
        <button className="btn btn-ghost" onClick={onClose}>Close</button>
        {review ? (
          <>
            <button className="btn" onClick={() => { setReview(null); }}>New critique</button>
            <button className="btn btn-critic" onClick={accept}><Icon name="check" size={13}/>Save to widget</button>
          </>
        ) : (
          <button className="btn btn-critic" onClick={run} disabled={!hasUserText(draft) || running}>
            <Icon name="gavel" size={13}/>{running ? 'Reviewing…' : 'Critique my draft'}
          </button>
        )}
      </div>
    </div>
  );
}

export function DevilsModal({ data, onClose }) {
  const [claim, setClaim] = useState(data.claim || '');
  const [counters, setCounters] = useState(hasUserText(data.claim) ? (data.counters || []) : []);
  const [pushing, setPushing] = useState(false);

  const run = (harder) => {
    if (!hasUserText(claim)) return;
    setPushing(true);
    setTimeout(() => {
      const next = countersForClaim(claim, harder ? counters : []);
      if (harder && next.length === counters.length) {
        fireToast('No more counters — your plan is more robust than I thought.');
      } else {
        setCounters(next);
        data.onUpdate?.({ claim: claim.trim(), counters: next });
        fireToast(harder ? 'Stronger counter added' : 'Counters ready · ' + next.length, 'critic');
      }
      setPushing(false);
    }, 800);
  };

  return (
    <div className="canvas-modal wide" onClick={(e) => e.stopPropagation()}>
      <div className="modal-head">
        <div className="modal-icon critic"><Icon name="scale" size={18}/></div>
        <div style={{ flex: 1 }}>
          <div className="modal-title">Devil's Advocate</div>
          <div className="modal-sub">Enter a claim, then get the strongest counter-arguments ranked by how much they should worry you.</div>
        </div>
        <button className="icon-btn" onClick={onClose}><Icon name="x" size={16}/></button>
      </div>
      <div className="modal-body">
        <div className="form-row critic-form" style={{ marginBottom: 16 }}>
          <label className="label" htmlFor="devils-modal-claim">Enter a claim</label>
          <textarea
            id="devils-modal-claim"
            className="textarea critic-input"
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            onPointerDown={stopFieldPointer}
            onMouseDown={stopFieldPointer}
            placeholder="Enter a claim — e.g. I'll cook 5 produce-forward dinners this week."
          />
        </div>
        {counters.length === 0 ? (
          <div className="critic-empty-hint">No counters yet. Enter a claim and submit.</div>
        ) : (
          <div className="devil-list">
            {counters.map((c, i) => (
              <div key={i} className="devil-item" style={{ padding: '12px 14px 12px 36px' }}>
                <div className="lbl">{c.lbl}</div>
                <div style={{ fontSize: 13, lineHeight: 1.55 }}>{c.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="modal-foot">
        <button className="btn btn-ghost" onClick={onClose}>Close</button>
        <button
          className="btn btn-critic"
          onClick={() => run(counters.length > 0)}
          disabled={!hasUserText(claim) || pushing}
        >
          {pushing ? <><div className="spinner critic"/>Thinking…</> : <><Icon name="zap" size={13}/>{counters.length ? 'Push harder' : 'Challenge this claim'}</>}
        </button>
      </div>
    </div>
  );
}

export function ScopeModal({ data, onClose }) {
  const initial = data.state || {};
  const [target, setTarget] = useState(initial.target || '');
  const [verdict, setVerdict] = useState(hasUserText(initial.target) ? initial : null);
  const [running, setRunning] = useState(false);

  const run = () => {
    if (!hasUserText(target)) return;
    setRunning(true);
    setTimeout(() => {
      const next = verdictForTarget(target);
      setVerdict(next);
      data.onUpdate?.(next);
      setRunning(false);
      fireToast('Feasibility check ready · ' + next.score.toFixed(1), 'critic');
    }, 700);
  };

  return (
    <div className="canvas-modal wide" onClick={(e) => e.stopPropagation()}>
      <div className="modal-head">
        <div className="modal-icon critic"><Icon name="bullseye" size={18}/></div>
        <div style={{ flex: 1 }}>
          <div className="modal-title">Scope Realism Check</div>
          <div className="modal-sub">Set a target, then get a brutal feasibility verdict given your current pace.</div>
        </div>
        <button className="icon-btn" onClick={onClose}><Icon name="x" size={16}/></button>
      </div>
      <div className="modal-body">
        <div className="form-row critic-form" style={{ marginBottom: 16 }}>
          <label className="label" htmlFor="scope-modal-target">Set a target</label>
          <textarea
            id="scope-modal-target"
            className="textarea critic-input"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onPointerDown={stopFieldPointer}
            onMouseDown={stopFieldPointer}
            placeholder="Set a target — e.g. 5 produce-forward dinners/week through April 15."
            style={{ minHeight: 72 }}
          />
        </div>

        {!verdict && (
          <div className="critic-empty-hint">No verdict yet. Set a target and submit.</div>
        )}

        {verdict && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', background: 'var(--canvas-bg-2)', border: '1px solid rgba(232,100,184,0.3)', borderRadius: 10, marginBottom: 18 }}>
              <div style={{ fontFamily: 'var(--canvas-mono)', fontSize: 36, fontWeight: 600, color: 'var(--canvas-critic)', letterSpacing: '-0.02em', lineHeight: 1 }}>{Number(verdict.score).toFixed(1)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10.5, color: 'var(--canvas-text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Verdict</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--canvas-text)', marginTop: 2 }}>{verdict.label}</div>
                <div style={{ fontSize: 12, color: 'var(--canvas-text-3)', marginTop: 4 }}>5.0 = neither feasible nor infeasible · &lt;3 = unrealistic · &gt;7 = comfortable</div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div className="label" style={{ marginBottom: 8 }}>Factor breakdown</div>
              {(verdict.factors || []).map((f) => (
                <div key={f.label} className="realism-row" style={{ padding: '7px 0' }}>
                  <span className="label-cell" style={{ width: 140, fontSize: 12.5 }}>{f.label}</span>
                  <span className="gauge" style={{ height: 6 }}><i style={{ width: f.val + '%' }}/></span>
                  <span className="val" style={{ width: 36 }}>{f.val}</span>
                </div>
              ))}
            </div>

            <div className="review">
              <span className="review-tag">The actual problem</span>
              {verdict.notes}
            </div>

            <div style={{ marginTop: 16 }}>
              <div className="label" style={{ marginBottom: 8 }}>Recommended actions</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--canvas-text-2)', lineHeight: 1.6 }}>
                {(verdict.actions || []).map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="modal-foot">
        <button className="btn btn-ghost" onClick={onClose}>Close</button>
        <button className="btn btn-critic" onClick={run} disabled={!hasUserText(target) || running}>
          {running ? <><div className="spinner critic"/>Checking…</> : <><Icon name="zap" size={13}/>{verdict ? 'Re-run with new estimates' : 'Check feasibility'}</>}
        </button>
      </div>
    </div>
  );
}

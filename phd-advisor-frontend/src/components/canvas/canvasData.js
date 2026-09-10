// Demo data for someone building cleaner eating habits.

export const DEMO_PROJECT = {
  title: 'Clean Eating Starter Plan',
  meta: 'Real food · more produce · simple prep',
};

// Example Goals from Heidi Boudro, Dashboard Ideas August 30 2026 — wording kept exact.
export const EXAMPLE_GOALS = [
  'Add one vegetable each day for a week.',
  'Add one fruit each day for a week.',
  'Replace one junk food with a healthy snack.',
  'Replace one sugary snack with fruit.',
  'Buy a grab-and-go veggies item.',
  'Try one easy veg prep style: raw snack, steamed, sauteed, or roasted',
  'Make one whole-foods meal with protein, produce, and a whole-food starch.',
  'Buy a healthy eating book.',
];

export const PRODUCE_BOARD_COLS = [
  { id: 'veg-like', label: 'Veg I like' },
  { id: 'veg-try', label: 'Veg to try' },
  { id: 'fruit-like', label: 'Fruit I like' },
  { id: 'fruit-try', label: 'Fruit to try' },
];

export const INSIGHTS = [
  {
    id: 'i-progress',
    title: 'Habit progress',
    icon: 'graph',
    category: 'progress',
    confidence: 82,
    summary: 'Week 2 of building cleaner, real-food habits. Produce is up, but lunch packing and reducing ultra-processed snacks are the main gaps.',
    bullets: [
      'Wins: <strong>fruit at breakfast</strong> most days · one veggie side at dinner',
      'Cadence: <strong>~3 homemade lunches/week</strong> — below a simple 5-day target',
      '<strong>Risk:</strong> afternoon snack still defaults to packaged sweets',
    ],
    pinned: true,
    sources: 18,
    updatedMinutesAgo: 5,
    quotes: [
      'These are example starters, not quotes from your chats.',
    ],
  },
  {
    id: 'i-method',
    title: 'Kitchen basics',
    icon: 'flask',
    category: 'theory',
    confidence: 71,
    summary: 'Clean-eating swaps are clear, but prep systems and ingredient lists still need tightening for busy weekdays.',
    bullets: [
      'Pantry: <strong>short ingredient lists</strong> · stock olive oil, beans, oats, frozen veg',
      'Prep: wash/chop produce once · batch a simple grain or protein',
      'Snacks: keep fruit, nuts, or yogurt ready before cravings hit',
    ],
    sources: 14,
    updatedMinutesAgo: 14,
    quotes: [
      'These are example starters, not quotes from your chats.',
    ],
  },
  {
    id: 'i-lit',
    title: 'Food knowledge',
    icon: 'book',
    category: 'literature',
    confidence: 76,
    summary: 'Solid grasp of whole-food basics. Weaker on enzyme-rich foods, superfood portions, and which cookbooks match your kitchen time.',
    bullets: [
      '<strong>Coverage:</strong> clean eating swaps, easy produce prep, fruit habits',
      '<strong>Gap:</strong> practical <strong>superfood</strong> upgrades that actually taste good',
      '<strong>Gap:</strong> a short <strong>cookbook shortlist</strong> for weeknight cooking',
    ],
    sources: 32,
    updatedMinutesAgo: 28,
    quotes: [
      'These are example starters, not quotes from your chats.',
    ],
  },
  {
    id: 'i-questions',
    title: 'Open food questions',
    icon: 'sparkles',
    category: 'theory',
    confidence: 63,
    summary: 'Three live threads. Q1 sets the weekly focus. Q2–Q3 affect prep time and snack strategy.',
    bullets: [
      '<strong>Q1:</strong> easy vegetable dinners only, or broader clean-eating basics too?',
      '<strong>Q2:</strong> Cook more at home, or improve grab-and-go choices first?',
      '<strong>Q3:</strong> How many weeknight minutes are realistic for prep?',
    ],
    sources: 9,
    updatedMinutesAgo: 41,
    quotes: [
      'These are example starters, not quotes from your chats.',
      'Try one easy veg prep style: raw snack, steamed, sauteed, or roasted',
    ],
  },
  {
    id: 'i-next',
    title: 'Example Goals',
    icon: 'arrow',
    category: 'action',
    confidence: 85,
    summary: 'I asked the Panel for goals but modified them.',
    bullets: [
      'Add one vegetable each day for a week.',
      'Add one fruit each day for a week.',
      'Replace one junk food with a healthy snack.',
      'Replace one sugary snack with fruit.',
      'Buy a grab-and-go veggies item.',
      'Try one easy veg prep style: raw snack, steamed, sauteed, or roasted',
      'Make one whole-foods meal with protein, produce, and a whole-food starch.',
      'Buy a healthy eating book.',
    ],
    sources: 7,
    updatedMinutesAgo: 9,
    quotes: [
      'Example Goals — I asked the Panel for goals but modified them.',
      'Add one vegetable each day for a week.',
      'Replace one junk food with a healthy snack.',
    ],
  },
  {
    id: 'i-blockers',
    title: 'Blockers & risks',
    icon: 'alert',
    category: 'risk',
    confidence: 74,
    summary: 'One materials blocker (empty fridge midweek) and one process blocker (inconsistent prep). Prep cadence is the higher risk to slipping back to ultra-processed defaults.',
    bullets: [
      '<strong>Materials:</strong> no ready produce makes takeout the easy path',
      '<strong>Process:</strong> missed prep blocks during busy weeks with no backup plan',
    ],
    sources: 6,
    updatedMinutesAgo: 20,
    quotes: [
      'These are example starters, not quotes from your chats.',
    ],
  },
];

export const WIDGET_CATALOG = [
  { type: 'bibliography', name: 'Saved Recipes', desc: 'Track recipes, links, and notes for meals you care about', icon: 'book', cat: 'research', defaultSize: 'M', enhanced: true },
  { type: 'reading-queue', name: 'Reading Queue', desc: 'Cookbooks, produce guides, and articles to review', icon: 'list', cat: 'research', defaultSize: 'S', enhanced: true },
  { type: 'notes', name: 'Note Inbox', desc: 'Markdown notes with full-text search', icon: 'notes', cat: 'research', defaultSize: 'S', enhanced: true },
  { type: 'concept-map', name: 'Plate Map', desc: 'Map meals, produce, and prep ideas', icon: 'network', cat: 'research', defaultSize: 'M', stub: true },
  { type: 'highlights', name: 'Flavor Notes', desc: 'Tasty swaps and quotes ready for the week', icon: 'cite', cat: 'research', defaultSize: 'M', enhanced: true },
  { type: 'paper-tldr', name: 'Recipe TL;DR', desc: 'Paste a recipe → must-haves / swaps / prep gaps', icon: 'microscope', cat: 'research', defaultSize: 'M', stub: true },

  { type: 'writing', name: 'Shopping List', desc: 'Exportable list of foods with notes on each item', icon: 'pencil', cat: 'writing', defaultSize: 'M', enhanced: true },
  { type: 'outline', name: 'Outline Builder', desc: 'Structure meal plans and shopping lists', icon: 'list', cat: 'writing', defaultSize: 'M', enhanced: true },
  { type: 'latex', name: 'Scratchpad', desc: 'Freeform drafting pad with live preview', icon: 'flask', cat: 'writing', defaultSize: 'M', enhanced: true },
  { type: 'draft-locker', name: 'Draft Locker', desc: 'Versioned meal-plan and shopping-list drafts', icon: 'shield', cat: 'writing', defaultSize: 'S', stub: true },

  { type: 'kanban', name: 'Produce Board', desc: 'Veg I like · Veg to try · Fruit I like · Fruit to try', icon: 'kanban', cat: 'project', defaultSize: 'L', enhanced: true },
  { type: 'deadlines', name: 'Deadlines', desc: 'Market and prep deadlines plus .ics export', icon: 'calendar', cat: 'project', defaultSize: 'S', enhanced: true },
  { type: 'pomodoro', name: 'Pomodoro', desc: 'Focused cook / prep blocks with breaks', icon: 'timer', cat: 'project', defaultSize: 'S', enhanced: true },
  { type: 'gantt', name: 'Season Timeline', desc: 'Shop → prep → cook → leftover week', icon: 'flag', cat: 'project', defaultSize: 'L', stub: true },
  { type: 'meeting-log', name: 'Kitchen Log', desc: 'Markets, recipes, last cooked, next action', icon: 'message', cat: 'project', defaultSize: 'M' },
  { type: 'goals', name: 'Goals', desc: 'Up to three goals at a time. Completed goals are a Success.', icon: 'bullseye', cat: 'project', defaultSize: 'M' },
  { type: 'calendar', name: 'Calendar', desc: 'Month grid with market days and prep blocks', icon: 'calendar', cat: 'project', defaultSize: 'M', enhanced: true },
  { type: 'activity', name: 'Activity Feed', desc: 'Chronological log of edits across widgets', icon: 'graph', cat: 'project', defaultSize: 'M', enhanced: true },
  { type: 'documenter', name: 'Daily Documenter', desc: 'Date-stamped food journal', icon: 'pencil', cat: 'project', defaultSize: 'M', enhanced: true },
  { type: 'phd-journey', name: 'Habit Roadmap', desc: 'Milestones from pantry reset → weekly rhythm', icon: 'flag', cat: 'project', defaultSize: 'M', enhanced: true },
  { type: 'phd-resources', name: 'Food Resources', desc: 'Principles, books, superfoods, enzymes, and pesticide guides', icon: 'star', cat: 'research', defaultSize: 'M', enhanced: true },

  { type: 'mood', name: 'Mood / Energy Check-in', desc: 'Daily slider during habit-building weeks', icon: 'smile', cat: 'wellness', defaultSize: 'S', stub: true },
  { type: 'sleep', name: 'Energy Check', desc: 'Spot fatigue before a busy cook week', icon: 'heart', cat: 'wellness', defaultSize: 'S', stub: true },
  { type: 'habits', name: 'Habit Tracker', desc: 'Daily produce, prep, and snack-swap habits', icon: 'flame', cat: 'wellness', defaultSize: 'S' },
  { type: 'focus', name: 'Focus Playlist', desc: 'Ambient sounds for prep blocks', icon: 'music', cat: 'wellness', defaultSize: 'S', stub: true },

  { type: 'cfp', name: 'Farmers Market Tracker', desc: 'Markets, seasonal produce, recipes to try', icon: 'send', cat: 'food', defaultSize: 'M', stub: true },
  { type: 'grants', name: 'Grocery Budget Notes', desc: 'Optional spending caps and market deadlines', icon: 'award', cat: 'food', defaultSize: 'S', stub: true },
  { type: 'crm', name: 'Recipe Contacts', desc: 'Cookbooks, markets, last tried, next ask', icon: 'network', cat: 'food', defaultSize: 'M', stub: true },
  { type: 'cv', name: 'Meal Plan Versions', desc: 'Track tailored weekly meal-plan variants', icon: 'user', cat: 'food', defaultSize: 'S', stub: true },

  { type: 'datasets', name: 'Produce Shortlist', desc: 'Target fruits and vegetables by season', icon: 'database', cat: 'data', defaultSize: 'M', stub: true },
  { type: 'methods', name: 'Prep Cheat Sheet', desc: 'Cooking methods and easy flavor frameworks', icon: 'flask', cat: 'data', defaultSize: 'M', stub: true },

  { type: 'budget', name: 'Budget Tracker', desc: 'Grocery and market spend', icon: 'wallet', cat: 'practical', defaultSize: 'S' },
  { type: 'discounts', name: 'Kitchen Deals', desc: 'Tools and staples with student or sale pricing', icon: 'star', cat: 'practical', defaultSize: 'S', stub: true },

  { type: 'reviewer-2', name: 'Reviewer 2 Simulator', desc: 'Paste a plan → harsh, honest critique', icon: 'gavel', cat: 'critic', defaultSize: 'M', critic: true },
  { type: 'devils-advocate', name: 'Devil\'s Advocate', desc: 'Strongest counter-arguments to your plan', icon: 'scale', cat: 'critic', defaultSize: 'M', critic: true },
  { type: 'scope-realism', name: 'Scope Realism Check', desc: 'Feasibility given hours/week and deadlines', icon: 'bullseye', cat: 'critic', defaultSize: 'M', critic: true },
  { type: 'assumption', name: 'Assumption Excavator', desc: 'Names hidden assumptions in your meal plan', icon: 'brain', cat: 'critic', defaultSize: 'M', critic: true, stub: true },
  { type: 'whats-missing', name: '"What\'s Missing"', desc: 'Gap analysis on pantry, prep, or snack habits', icon: 'alert', cat: 'critic', defaultSize: 'S', critic: true, stub: true },
  { type: 'calibrator', name: 'Confidence Calibrator', desc: 'Challenges every "this always works" claim', icon: 'scale', cat: 'critic', defaultSize: 'S', critic: true, stub: true },
];

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'research', label: 'Research' },
  { id: 'writing', label: 'Writing' },
  { id: 'project', label: 'Kitchen' },
  { id: 'wellness', label: 'Wellness' },
  { id: 'food', label: 'Food' },
  { id: 'data', label: 'Prep' },
  { id: 'practical', label: 'Practical' },
  { id: 'critic', label: 'Anti-yes-man', critic: true },
];

export const DEFAULT_LAYOUT = [];

const presetIds = (types) => types.map((t, i) => ({ id: `pre-${t.type}-${i}`, ...t }));
export const WORKSPACE_PRESETS = [
  {
    id: 'day1-soc',
    name: 'Food Canvas',
    desc: 'Food Resources, Produce Board, Shopping List, and Goals.',
    icon: 'sparkles',
    layout: presetIds([
      { type: 'phd-resources', size: 'M' },
      { type: 'kanban', size: 'L' },
      { type: 'writing', size: 'M' },
      { type: 'goals', size: 'M' },
    ]),
  },
  {
    id: 'writing-sprint',
    name: 'Meal Prep Sprint',
    desc: 'Polish the week: writing pad, outline, flavor notes, task board.',
    icon: 'pencil',
    layout: presetIds([
      { type: 'writing', size: 'M' },
      { type: 'outline', size: 'M' },
      { type: 'pomodoro', size: 'S' },
      { type: 'highlights', size: 'M' },
      { type: 'notes', size: 'M' },
    ]),
  },
  {
    id: 'audit-prep',
    name: 'Market Week',
    desc: 'Prep hard: flavor notes, kitchen log, deadlines, prep board.',
    icon: 'book',
    layout: presetIds([
      { type: 'highlights', size: 'M' },
      { type: 'meeting-log', size: 'M' },
      { type: 'notes', size: 'M' },
      { type: 'deadlines', size: 'S' },
      { type: 'kanban', size: 'M' },
    ]),
  },
  {
    id: 'incident-mode',
    name: 'Habit Pressure-Test',
    desc: 'Pressure-test your eating plan with challenge widgets before you commit.',
    icon: 'gavel',
    layout: presetIds([
      { type: 'writing', size: 'M' },
      { type: 'outline', size: 'M' },
      { type: 'reviewer-2', size: 'M', critic: true },
      { type: 'devils-advocate', size: 'M', critic: true },
      { type: 'scope-realism', size: 'M', critic: true },
      { type: 'deadlines', size: 'S' },
    ]),
  },
];

export const EMPTY_STATE = {
  bibliography: { format: 'APA', entries: [] },
  kanban: {
    cols: [
      { id: 'veg-like', label: 'Veg I like' },
      { id: 'veg-try', label: 'Veg to try' },
      { id: 'fruit-like', label: 'Fruit I like' },
      { id: 'fruit-try', label: 'Fruit to try' },
    ],
    cards: [],
  },
  pomodoro: { focus: 25, brk: 5, sessionsToday: 0 },
  writing: {
    chapters: [{ id: 'c-default', name: 'Shopping list', target: 0, draft: '' }],
    activeChapterId: 'c-default',
    dailyTotals: {},
    target: 500,
  },
  deadlines: [],
  budget: { cap: 1000, items: [] },
  notes: { items: [] },
  habits: { items: [] },
  goals: { items: [] },
  'meeting-log': { items: [] },
  'reading-queue': [],
  'reviewer-2': { lastDraft: '', lastReview: null },
  'devils-advocate': { claim: '', counters: [] },
  'scope-realism': {
    target: '',
    score: 0,
    label: 'Set a target',
    factors: [],
    notes: '',
  },
  outline: { items: [], expanded: {} },
  highlights: { items: [] },
  latex: { source: '', displayMode: true },
  calendar: { viewMonth: new Date().toISOString().slice(0, 7) },
  activity: {},
  documenter: { entries: [], lastSummary: null },
  'phd-journey': {
    statuses: {},
    notes: {},
  },
  'phd-resources': {
    customLinks: [],
  },
};

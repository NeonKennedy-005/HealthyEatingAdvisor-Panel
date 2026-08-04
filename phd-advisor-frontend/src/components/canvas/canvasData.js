// Demo data for someone building cleaner eating habits.

export const DEMO_PROJECT = {
  title: 'Clean Eating Starter Plan',
  meta: 'Real food · more produce · simple prep',
};

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
      '"Add one produce item to the first meal of the day." — Kitchen Coach',
      '"Keep washed veggies visible so the easy choice wins." — Veggie Chef',
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
      '"Choose foods with shorter, simpler ingredients." — Kitchen Coach',
      '"Frozen fruit and veg count — use them for easy wins." — Fruit Maven',
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
      '"One nutrient-dense upgrade repeated three times beats a long shopping list." — Superfoods Superman',
      '"Start with one enzyme-friendly side and notice how you feel." — Enzyme Explorer',
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
      '"Pick one focus for two weeks, then expand." — Superfoods Superman',
      '"Protect two short prep blocks on busy weekdays." — Kitchen Coach',
    ],
  },
  {
    id: 'i-next',
    title: 'Next steps',
    icon: 'arrow',
    category: 'action',
    confidence: 85,
    summary: 'Near-term actions for this week’s meals and snacks. Two items have slipped a week.',
    bullets: [
      'Add <strong>one vegetable</strong> to lunch or dinner every day',
      'Pack <strong>3 produce-forward lunches</strong> for the work/school week',
      'Replace <strong>one packaged snack</strong> with fruit or yogurt',
      'Ask Book Advisor for <strong>2 weeknight-friendly cookbooks</strong>',
    ],
    sources: 7,
    updatedMinutesAgo: 9,
    quotes: [
      '"Ship the produce habit before opening more recipe tabs." — Veggie Chef',
      '"Schedule snack prep like an appointment you keep." — Fruit Maven',
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
      '"Without a weekly produce restock, even good intentions fade." — Enzyme Explorer',
      '"Keep a frozen-veg backup so dinner never depends on a perfect grocery run." — Veggie Chef',
    ],
  },
];

export const WIDGET_CATALOG = [
  { type: 'bibliography', name: 'Saved Postings', desc: 'Track JDs, links, and notes for roles you care about', icon: 'book', cat: 'research', defaultSize: 'M', enhanced: true },
  { type: 'reading-queue', name: 'Research Queue', desc: 'Companies, alumni, and articles to review before applying', icon: 'list', cat: 'research', defaultSize: 'S', enhanced: true },
  { type: 'notes', name: 'Note Inbox', desc: 'Markdown notes with full-text search', icon: 'notes', cat: 'research', defaultSize: 'S', enhanced: true },
  { type: 'concept-map', name: 'Target Map', desc: 'Map industries, roles, and companies', icon: 'network', cat: 'research', defaultSize: 'M', stub: true },
  { type: 'highlights', name: 'Story Bank', desc: 'STAR stories and quotes ready for interviews', icon: 'cite', cat: 'research', defaultSize: 'M', enhanced: true },
  { type: 'paper-tldr', name: 'JD TL;DR', desc: 'Paste a JD → must-haves / keywords / fit gaps', icon: 'microscope', cat: 'research', defaultSize: 'M', stub: true },

  { type: 'writing', name: 'Writing Tracker', desc: 'Resume/cover drafts with a writing heatmap', icon: 'pencil', cat: 'writing', defaultSize: 'M', enhanced: true },
  { type: 'outline', name: 'Outline Builder', desc: 'Structure cover letters and interview answers', icon: 'list', cat: 'writing', defaultSize: 'M', enhanced: true },
  { type: 'latex', name: 'Scratchpad', desc: 'Freeform drafting pad with live preview', icon: 'flask', cat: 'writing', defaultSize: 'M', enhanced: true },
  { type: 'draft-locker', name: 'Draft Locker', desc: 'Versioned resume and cover-letter drafts', icon: 'shield', cat: 'writing', defaultSize: 'S', stub: true },

  { type: 'kanban', name: 'Application Board', desc: 'Wishlist → Applied → Interview → Offer', icon: 'kanban', cat: 'project', defaultSize: 'L', enhanced: true },
  { type: 'deadlines', name: 'Deadlines', desc: 'App deadlines plus .ics calendar export', icon: 'calendar', cat: 'project', defaultSize: 'S', enhanced: true },
  { type: 'pomodoro', name: 'Pomodoro', desc: 'Focused apply / prep blocks with breaks', icon: 'timer', cat: 'project', defaultSize: 'S', enhanced: true },
  { type: 'gantt', name: 'Semester Timeline', desc: 'Search → apply → interview → offer season', icon: 'flag', cat: 'project', defaultSize: 'L', stub: true },
  { type: 'meeting-log', name: 'Networking Log', desc: 'Alumni/recruiters, last contact, next action', icon: 'message', cat: 'project', defaultSize: 'M' },
  { type: 'goals', name: 'Goals / OKRs', desc: 'Weekly apply and interview goals', icon: 'bullseye', cat: 'project', defaultSize: 'M' },
  { type: 'calendar', name: 'Calendar', desc: 'Month grid with deadlines and apply days', icon: 'calendar', cat: 'project', defaultSize: 'M', enhanced: true },
  { type: 'activity', name: 'Activity Feed', desc: 'Chronological log of edits across widgets', icon: 'graph', cat: 'project', defaultSize: 'M', enhanced: true },
  { type: 'documenter', name: 'Daily Documenter', desc: 'Date-stamped search journal', icon: 'pencil', cat: 'project', defaultSize: 'M', enhanced: true },
  { type: 'phd-journey', name: 'Search Roadmap', desc: 'Milestones from profile → offer decision', icon: 'flag', cat: 'project', defaultSize: 'M', enhanced: true },
  { type: 'phd-resources', name: 'Food Resources', desc: 'Produce guides, superfood notes, clean-eating book shortlists', icon: 'star', cat: 'research', defaultSize: 'M', enhanced: true },

  { type: 'mood', name: 'Mood / Burnout Check-in', desc: 'Daily slider during heavy apply weeks', icon: 'smile', cat: 'wellness', defaultSize: 'S', stub: true },
  { type: 'sleep', name: 'Energy Check', desc: 'Spot burnout before interview week', icon: 'heart', cat: 'wellness', defaultSize: 'S', stub: true },
  { type: 'habits', name: 'Habit Tracker', desc: 'Daily apply, outreach, and practice habits', icon: 'flame', cat: 'wellness', defaultSize: 'S' },
  { type: 'focus', name: 'Focus Playlist', desc: 'Ambient sounds for apply blocks', icon: 'music', cat: 'wellness', defaultSize: 'S', stub: true },

  { type: 'cfp', name: 'Farmers Market Tracker', desc: 'Markets, seasonal produce, recipes to try', icon: 'send', cat: 'career', defaultSize: 'M', stub: true },
  { type: 'grants', name: 'Scholarship / Stipend Tracker', desc: 'Optional funding deadlines', icon: 'award', cat: 'career', defaultSize: 'S', stub: true },
  { type: 'crm', name: 'Networking CRM', desc: 'Contacts, last touch, next ask', icon: 'network', cat: 'career', defaultSize: 'M', stub: true },
  { type: 'cv', name: 'Resume Versions', desc: 'Track tailored resume variants', icon: 'user', cat: 'career', defaultSize: 'S', stub: true },

  { type: 'datasets', name: 'Company Shortlist', desc: 'Target employers by industry/location', icon: 'database', cat: 'data', defaultSize: 'M', stub: true },
  { type: 'methods', name: 'Interview Cheat Sheet', desc: 'Question types and answer frameworks', icon: 'flask', cat: 'data', defaultSize: 'M', stub: true },

  { type: 'budget', name: 'Budget Tracker', desc: 'Interview travel / attire spend', icon: 'wallet', cat: 'practical', defaultSize: 'S' },
  { type: 'discounts', name: 'Student Discounts', desc: 'Software & services with edu pricing', icon: 'star', cat: 'practical', defaultSize: 'S', stub: true },

  { type: 'reviewer-2', name: 'Reviewer 2 Simulator', desc: 'Paste a plan → harsh, honest critique', icon: 'gavel', cat: 'critic', defaultSize: 'M', critic: true },
  { type: 'devils-advocate', name: 'Devil\'s Advocate', desc: 'Strongest counter-arguments to your plan', icon: 'scale', cat: 'critic', defaultSize: 'M', critic: true },
  { type: 'scope-realism', name: 'Scope Realism Check', desc: 'Feasibility given hours/week and deadlines', icon: 'bullseye', cat: 'critic', defaultSize: 'M', critic: true },
  { type: 'assumption', name: 'Assumption Excavator', desc: 'Names hidden assumptions in your search plan', icon: 'brain', cat: 'critic', defaultSize: 'M', critic: true, stub: true },
  { type: 'whats-missing', name: '"What\'s Missing"', desc: 'Gap analysis on resume, outreach, or pipeline', icon: 'alert', cat: 'critic', defaultSize: 'S', critic: true, stub: true },
  { type: 'calibrator', name: 'Confidence Calibrator', desc: 'Challenges every "this always works" claim', icon: 'scale', cat: 'critic', defaultSize: 'S', critic: true, stub: true },
];

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'research', label: 'Research' },
  { id: 'writing', label: 'Writing' },
  { id: 'project', label: 'Pipeline' },
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
    name: 'Search Starter',
    desc: 'Get oriented: resources, notes, deadlines, application board, pomodoro.',
    icon: 'sparkles',
    layout: presetIds([
      { type: 'phd-resources', size: 'M' },
      { type: 'notes', size: 'M' },
      { type: 'deadlines', size: 'S' },
      { type: 'pomodoro', size: 'S' },
      { type: 'kanban', size: 'L' },
    ]),
  },
  {
    id: 'writing-sprint',
    name: 'Resume Sprint',
    desc: 'Polish materials: writing pad, outline, story bank, task board.',
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
    name: 'Interview Week',
    desc: 'Prep hard: story bank, networking log, deadlines, application board.',
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
    name: 'Offer Pressure-Test',
    desc: 'Pressure-test your plan with challenge widgets before you accept.',
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
      { id: 'todo', label: 'Wishlist' },
      { id: 'doing', label: 'Applied' },
      { id: 'stuck', label: 'Interview' },
      { id: 'done', label: 'Offer / Closed' },
    ],
    cards: [],
  },
  pomodoro: { focus: 25, brk: 5, sessionsToday: 0 },
  writing: {
    chapters: [{ id: 'c-default', name: 'Resume draft', target: 500, draft: '' }],
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

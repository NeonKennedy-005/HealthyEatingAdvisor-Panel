// User Guide content for Healthy Eating Advisor (Heidi Boudro).
// Use {{appName}} as a placeholder — replaced at render time.

export const userGuideTopics = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: 'Sparkles',
    content: `# Welcome to {{appName}}

{{appName}} helps you explore **easy clean eating and real food** with a panel of specialized AI advisors. Get practical tips on fruits, vegetables, superfoods, simple prep, enzymes, and useful books.

## Your first steps
1. **Start a new chat** using the pencil icon next to the search bar
2. **Type a food question** — or tap an example prompt card
3. **Read multiple advisor responses** — each mentor brings a different lens
4. **Reply to a specific advisor** to go deeper on their angle

## Guest mode
Use **Try without an account** to explore. Create an account later to keep longer-term progress.

## Need help?
Return to this guide anytime via the **?** icon in the header.`,
  },
  {
    id: 'advisors',
    title: 'Your Advisors',
    icon: 'Leaf',
    content: `# Your Advisors

{{appName}} includes {{advisorCount}} specialized healthy-eating personas:

{{advisorList}}

## Seeing who's available
Click the **advisors** dropdown in the top right of the chat to see the full panel.`,
  },
  {
    id: 'conversations',
    title: 'Conversations & Replies',
    icon: 'MessageCircle',
    content: `# Conversations & Replies

## Asking a question
Type into the chat box at the bottom. Advisors respond with their unique perspectives on clean eating and real food.

## Replying to a specific advisor
Click an advisor's response to **reply directly to them** and continue one-on-one.

## Tips
- Share goals, time constraints, and preferences
- Prefer concrete requests: "easy weekday lunches" beats "be healthier"
- You can upload a food article or notes from chat so advisors can ground their answers in that document`
  },
  {
    id: 'profile',
    title: 'Your Profile',
    icon: 'User',
    content: `# Your Profile

Complete the healthy-eating profile so advisors can personalize guidance:

- Where you are on healthy eating
- Focus areas (produce, superfoods, prep, books…)
- Dietary preferences and kitchen constraints
- Your goals and how you like advice packaged

Open the profile walkthrough from the settings or user menu.`,
  },
  {
    id: 'canvas',
    title: 'Food Canvas',
    icon: 'LayoutDashboard',
    content: `# Food Canvas

**Food Canvas** is the name for the three dashboard tabs next to Chat:

- **Insights** — example healthy-eating goals you can mark as a Success (these starters are not generated from your chats)
- **Workspace** — widgets you choose, including Food Resources, a produce board (Veg I like / Veg to try / Fruit I like / Fruit to try), a Shopping List, and Goals
- **Documents** — longer drafts you can export as Markdown, HTML, or Print / PDF

Open a document draft before using Export. Ask advisors in Chat, then park useful answers on Food Canvas.`,
  },
  {
    id: 'safety',
    title: 'Safety & Scope',
    icon: 'Shield',
    content: `# Safety & Scope

Advisors are **educational wellness coaches**, not doctors, dietitians, or therapists.

- They do not diagnose, prescribe, or tell you to stop medications
- For medical conditions, disordered eating concerns, pregnancy, or allergies requiring strict avoidance, consult a qualified clinician
- Treat book notes and RAG articles as perspective-setting, not medical authority`,
  },
];

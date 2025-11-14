# CorpComment

preview: https://taleex-corpcomment.netlify.app/

Small feedback app built with React + Vite as part of ByteGrad’s "Professional React and Next.js" course.

Quick summary:
- Users submit feedback text that must include a `#company` tag (e.g. "Great work #Acme").
- App extracts the company from the hashtag, renders feedback items with badge, upvotes and age, and lets you filter by company via the hashtag list.
- New feedback is posted to the course sample API.

Credits: project and sample API provided by ByteGrad (credit to the course author).

---

## Features
- Submit feedback using a `#company` tag
- Company hashtag list (filter by company)
- Feedback list with upvote count, badge letter and relative age
- Persists new feedback to the course API
- Small client-side store for state (Zustand + optional Context)

---

## Tech
- React (functional components, hooks)
- Vite (dev server + build)
- Zustand (store)
- Fetch API for server interactions
- Plain CSS (project styles)

---

## Quick start (local)
Requirements: Node.js (16+ recommended), npm or yarn.

1. Install
   npm install

2. Dev
   npm run dev
   (app will be on http://localhost:5173 by default)

3. Build for production
   npm run build

4. Preview production build locally
   npm run preview

Make sure package.json contains:
- "dev": "vite"
- "build": "vite build"
- "preview": "vite preview"

---

## Deploy (Netlify)
- Build command: `npm run build`
- Publish directory: `dist` (vite.config sets outDir: 'dist')

For SPA routing on Netlify, include `public/_redirects`:
```
/*    /index.html   200
```

Optional netlify.toml:
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

---

## File structure (important files)
- src/
  - components/ — UI components (FeedbackList, FeedbackItem, HastagList, HashtagItem, Form, etc.)
  - stores/feedbackItemsStore.ts — Zustand store used by the app
  - Context/FeedbackItemsContextProvider.tsx — optional context/provider (split context into its own file for fast refresh)
- public/_redirects — SPA redirect for Netlify
- vite.config.ts — Vite config (outDir = `dist`)
- package.json — scripts / dependencies

---

## Common issues & notes
- If you see "filteredFeedbackItems.map is not a function" — ensure you call the getter: `useFeedbackItemsStore(s => s.getFilteredFeedbackItems())` (note the `()`).
- If a list component warns about keys — add a unique `key` prop for list children.
- Fast Refresh warning: export your React context and provider from separate files (context-only file + provider file) to avoid refresh problems.
- When adding items to the store, prefer functional set: `set(state => ({ feedbackItems: [...state.feedbackItems, newItem] }))` to avoid stale state updates.

---

## API
This project uses the course sample API (provided by ByteGrad). No production API keys are required — the example API is public for the course.

---

## Contributing
This repo is an exercise project from the ByteGrad course. Suggested changes and fixes are welcome, but keep in mind the app follows the course structure.

---

## License
Check the course materials for licensing guidance. Credit to ByteGrad for original project content and API.

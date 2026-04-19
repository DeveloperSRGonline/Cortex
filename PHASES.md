# CORTEX — Phased Implementation Plan
> AI-Powered Code Editor | Based on `Cortex_PRD_v1.0.md`

---

## ⚠️ INSTRUCTIONS FOR THE EXECUTING AI

1. **Before starting ANY phase**, re-read `Cortex_PRD_v1.0.md` in its entirety to understand the full context.
2. **Complete tasks in order** — each phase builds on the previous one.
3. **After completing each task**, mark it `[x]` in this file before moving to the next.
4. **After completing an entire phase**, mark the phase header `[x]` before starting the next phase.
5. **Do not skip tasks** — every task corresponds to a specific PRD requirement.
6. **Technology decisions are locked** — use exact versions specified in the PRD (Section 3).
7. **Design tokens are non-negotiable** — use ONLY the SCSS variables from PRD Section 4. No hardcoded CSS values.
8. **Never use placeholder images or lorem ipsum** — all UI must reflect the actual product.

---

## TECH STACK REFERENCE (do not deviate)

| Layer | Technology |
|---|---|
| Frontend | React 18.x + Vite, Monaco Editor 0.47.x, SCSS 1.70.x, Zustand 4.x, React Router v6, D3.js 7.x, Axios 1.6.x |
| Backend | Node.js 20 LTS, Express.js 4.x, MongoDB 7.x, Mongoose 8.x, Multer 1.4.x, Socket.IO 4.x |
| AI Provider | Google Gemini 2.0 Flash (`gemini-2.0-flash-exp`) via `@google/generative-ai` SDK, Groq as fallback |
| Auth | Clerk (JWT middleware on all backend routes) |
| DB | MongoDB Atlas (free M0) |

---

## FOLDER STRUCTURE REFERENCE

**Frontend (`client/src/`):**
```
components/     → Reusable atoms: Button, Modal, Badge, Tag, Tooltip
layouts/        → AppShell.jsx (3-panel layout)
features/
  intent/       → IntentMode.jsx, IntentSelector.jsx, IntentResultPanel.jsx, useIntentMode.js
  explainer/    → CodebaseExplainer.jsx, DependencyGraph.jsx, FlowOverlay.jsx, useExplainer.js
  memory/       → DecisionMemory.jsx, MemoryAnnotation.jsx, MemorySearch.jsx, useMemory.js
editor/         → MonacoWrapper.jsx, EditorTabs.jsx, FileTree.jsx, EditorToolbar.jsx
store/          → editorStore.js, projectStore.js, memoryStore.js, uiStore.js
api/            → intentApi.js, explainerApi.js, memoryApi.js
hooks/          → useProject.js, useSocket.js, useTheme.js, useDebounce.js
styles/         → _variables.scss, _reset.scss, _typography.scss, _utilities.scss, main.scss
styles/components/ → _button.scss, _tabs.scss, _sidebar.scss, _modal.scss
pages/          → Editor.jsx, MemoryVault.jsx, ExplainerView.jsx, Settings.jsx
utils/          → fileParser.js, tokenCounter.js, graphBuilder.js, diffHighlighter.js
```

**Backend (`server/`):**
```
index.js
routes/         → intent.routes.js, explainer.routes.js, memory.routes.js, project.routes.js
controllers/    → IntentController.js, ExplainerController.js, MemoryController.js
services/       → GeminiService.js, CodeParserService.js, GraphBuilderService.js
models/         → DecisionMemory.js, Project.js, CodebaseSnapshot.js
middleware/     → Auth.js, RateLimit.js, ErrorHandler.js, RequestLogger.js
utils/          → fileExtractor.js, promptBuilder.js, tokenEstimator.js
sockets/        → streamHandler.js, intentStream.js
```

---

## PHASE 1 — Foundation & Project Setup [x]
> **PRD Reference:** Section 9 — Phase 1 (Week 1–2), Section 3 (Tech Stack), Section 4 (Design System), Section 7.1 (App Shell Layout)
> **Goal:** Initialize the full MERN project with Vite, configure auth with Clerk, build the SCSS design system, Monaco Editor wrapper, and the 3-panel App Shell.

### 1.1 — Project Initialization

- [x] **1.1.1** Create root project folder `cortex/` with two subdirectories: `client/` (Vite+React) and `server/` (Express).
- [x] **1.1.2** Initialize `client/` using Vite: `npm create vite@latest client -- --template react`. Install dependencies: `react-router-dom@6`, `zustand@4`, `axios@1.6`, `monaco-editor@0.47`, `@monaco-editor/react`, `sass@1.70`, `socket.io-client@4`, `@clerk/clerk-react`.
- [x] **1.1.3** Initialize `server/` with `npm init -y`. Install: `express@4`, `mongoose@8`, `multer@1.4`, `socket.io@4`, `dotenv@16`, `cors`, `@clerk/clerk-sdk-node`, `@google/generative-ai`, `groq-sdk`.
- [x] **1.1.4** Create `server/.env` with placeholders for all environment variables from PRD Section 10.1: `GEMINI_API_KEY`, `GROQ_API_KEY`, `MONGODB_URI`, `CLERK_SECRET_KEY`, `VITE_CLERK_PUBLISHABLE_KEY`, `REDIS_URL`, `PORT=3001`, `CLIENT_URL=http://localhost:5173`.
- [x] **1.1.5** Create `client/.env` with `VITE_CLERK_PUBLISHABLE_KEY` and `VITE_API_URL=http://localhost:3001`.
- [x] **1.1.6** Configure `vite.config.js` to proxy `/api` to `http://localhost:3001`.
- [x] **1.1.7** Create root `package.json` with `dev` script running both client and server concurrently (use `concurrently` npm package).

### 1.2 — SCSS Design System

> Re-read PRD Section 4 (Design System) before starting this section.

- [x] **1.2.1** Create `client/src/styles/_variables.scss`. Define ALL color tokens from PRD Section 4.2 exactly as specified (e.g., `$color-bg-base: #0A0A0F`). Include all 20 color tokens.
- [x] **1.2.2** Add ALL typography tokens to `_variables.scss` from PRD Section 4.3: `$font-ui`, `$font-mono`, all `$font-size-*` and `$font-weight-*` variables.
- [x] **1.2.3** Add ALL spacing tokens to `_variables.scss` from PRD Section 4.4: `$space-1` through `$space-12`.
- [x] **1.2.4** Add ALL border radius tokens from PRD Section 4.5: `$radius-sm` through `$radius-full`.
- [x] **1.2.5** Add ALL shadow/elevation tokens from PRD Section 4.6: `$shadow-sm`, `$shadow-md`, `$shadow-lg`, `$shadow-glow-primary`, `$shadow-glow-memory`.
- [x] **1.2.6** Create `client/src/styles/_reset.scss` — CSS reset scoped to Cortex, setting `box-sizing: border-box`, removing default margins, and setting base background to `$color-bg-base`, base text to `$color-text-primary`.
- [x] **1.2.7** Create `client/src/styles/_typography.scss` — import Google Fonts (Inter + JetBrains Mono), set base font-family using `$font-ui`, set monospace elements to use `$font-mono`.
- [x] **1.2.8** Create `client/src/styles/_utilities.scss` — utility classes like `.text-secondary`, `.text-disabled`, `.font-mono`, `.truncate`.
- [x] **1.2.9** Create `client/src/styles/main.scss` — imports all partials in order: `_variables`, `_reset`, `_typography`, `_utilities`, `components/*`.
- [x] **1.2.10** Import `main.scss` in `client/src/main.jsx`.

### 1.3 — Base UI Components

> Re-read PRD Section 4.7 (Component Design Patterns) before starting.

- [x] **1.3.1** Create `client/src/components/Button/Button.jsx` and `_button.scss`. Implement three variants: `primary`, `ghost`, `icon` as specified in PRD Section 4.7. All styles use SCSS tokens only.
- [x] **1.3.2** Create `client/src/components/Badge/Badge.jsx` and its SCSS. Badge variants: `success`, `warning`, `error`, `primary`, `secondary`. Uses `$radius-sm`, appropriate `$color-*` tokens.
- [x] **1.3.3** Create `client/src/components/Tag/Tag.jsx` and its SCSS. Closeable tag component for memory tags. Style with `$color-bg-elevated`, `$radius-sm`.
- [x] **1.3.4** Create `client/src/components/Modal/Modal.jsx` and `_modal.scss`. Implements a centered overlay modal with backdrop blur. Uses `$color-bg-surface`, `$shadow-lg`, `$radius-lg`.
- [x] **1.3.5** Create `client/src/components/Tooltip/Tooltip.jsx` — hover tooltip. Uses `$color-bg-elevated`, `$shadow-md`, `$font-size-xs`.
- [x] **1.3.6** Create `client/src/components/Spinner/Spinner.jsx` — animated loading spinner using `$color-primary`.
- [x] **1.3.7** Create `client/src/components/Skeleton/Skeleton.jsx` — skeleton loader component with shimmer animation using `$color-bg-elevated` to `$color-bg-surface` gradient.

### 1.4 — Zustand Store Setup

- [x] **1.4.1** Create `client/src/store/editorStore.js` — Zustand slice managing: `openFiles[]`, `activeFileId`, `tabOrder[]`, `editorContent` (map of fileId → content).
- [x] **1.4.2** Create `client/src/store/projectStore.js` — managing: `projects[]`, `activeProjectId`, `projectFiles` (file tree structure).
- [x] **1.4.3** Create `client/src/store/memoryStore.js` — managing: `memories[]`, `activeMemoryId`, `isMemoryPanelOpen`.
- [x] **1.4.4** Create `client/src/store/uiStore.js` — managing: `sidebarWidth`, `featurePanelOpen`, `featurePanelMode` (`intent` | `explainer` | `memory`), `bottomPanelOpen`, `bottomPanelHeight`.

### 1.5 — App Shell Layout

> Re-read PRD Section 7.1 (App Shell Layout) before starting.

- [x] **1.5.1** Create `client/src/layouts/AppShell.jsx` — the 3-panel IDE layout. Renders: ActivityBar (48px fixed left), Sidebar (240px resizable), Editor Area (flex fill), Feature Panel (380px resizable right), Bottom Panel (200px collapsible). Use CSS Grid or Flexbox layout.
- [x] **1.5.2** Create `client/src/styles/components/_sidebar.scss` — Sidebar panel styles using `$color-bg-surface`. File tree indent is 16px per level, active file uses `$color-primary-muted` background and `$color-primary-hover` text.
- [x] **1.5.3** Create `client/src/editor/EditorToolbar.jsx` — the toolbar between tab strip and Monaco. Five zones as per PRD Section 7.2: Breadcrumb, Language badge + line:col, Three Feature CTA buttons (Intent Mode=violet, Explain Codebase=cyan, Add Memory=amber), format/wordwrap/minimap toggles, Settings gear + User avatar.
- [x] **1.5.4** Style the Activity Bar — 48px wide, `$color-bg-surface` background, icon nav for File Tree, Search, Memory Vault, Settings, User Avatar icons. Active icon highlighted with `$color-primary`.
- [x] **1.5.5** Create `client/src/editor/EditorTabs.jsx` — horizontal tab strip. Active tab: `$color-primary` bottom border (2px), `$color-text-primary` text. Inactive: `$color-bg-surface`, `$color-text-secondary`. Close icon appears on hover. Horizontally scrollable when > 8 tabs.
- [x] **1.5.6** Implement panel resizing for Sidebar (min 160px, max 400px) and Feature Panel (min 300px, max 600px) using drag handles. Persist widths to `uiStore`.

### 1.6 — MongoDB & Backend Foundation

- [x] **1.6.1** Create `server/index.js` — Express app setup: CORS (whitelist `CLIENT_URL`), JSON body parser, Multer setup, Socket.IO attached to HTTP server, connect to MongoDB Atlas via Mongoose.
- [x] **1.6.2** Create `server/middleware/Auth.js` — Clerk JWT verification middleware. Extracts Bearer token, verifies with `@clerk/clerk-sdk-node`, attaches `userId` to `req`.
- [x] **1.6.3** Create `server/middleware/ErrorHandler.js` — global Express error handler. Returns `{ error: message, code }` JSON. Handles Mongoose validation errors and Gemini API errors distinctly.
- [x] **1.6.4** Create `server/middleware/RequestLogger.js` — logs method + path + status + duration for every request.
- [x] **1.6.5** Create `server/models/Project.js` — Mongoose schema: `{ clerkUserId: String, name: String, description: String, fileTree: Object, createdAt: Date, updatedAt: Date }`. Add index on `{ clerkUserId: 1 }`.
- [x] **1.6.6** Create `server/routes/project.routes.js` with CRUD endpoints: `POST /api/projects`, `GET /api/projects` (user's projects), `GET /api/projects/:id`, `PATCH /api/projects/:id`, `DELETE /api/projects/:id`. All routes use `Auth.js` middleware.
- [x] **1.6.7** Create `server/controllers/ProjectController.js` — business logic for all project endpoints.

### 1.7 — Monaco Editor Integration

- [x] **1.7.1** Create `client/src/editor/MonacoWrapper.jsx` — wraps `@monaco-editor/react`. Configure Monaco theme using Cortex design tokens: background = `$color-code-bg` (#0D0D17), selection = `$color-highlight` (#4F6EF720), font = `$font-mono`. Enable IntelliSense, multi-cursor, minimap.
- [x] **1.7.2** Implement file tree in `client/src/editor/FileTree.jsx` — renders project file tree from `projectStore`. Folders with chevron expand/collapse. 16px indent per level. Active file highlighted. Right-click context menu: rename, delete, "Add Decision Memory", "Copy Path".
- [x] **1.7.3** Create `client/src/hooks/useProject.js` — hook for loading project, switching active file, and syncing file content with `editorStore`.
- [x] **1.7.4** Wire up routing in `client/src/main.jsx` using React Router v6: `/` → Editor page, `/memory` → MemoryVault page, `/explainer` → ExplainerView page, `/settings` → Settings page.
- [x] **1.7.5** Create `client/src/pages/Editor.jsx` — renders `AppShell` with `MonacoWrapper` + `FileTree` + `EditorTabs` + `EditorToolbar`.

### 1.8 — Clerk Auth Integration

- [x] **1.8.1** Wrap `client/src/main.jsx` with `<ClerkProvider publishableKey={...}>`. Add `<SignedIn>` / `<SignedOut>` guards so only authenticated users see the Editor.
- [x] **1.8.2** Create a `LandingPage.jsx` or `AuthPage.jsx` rendered when signed out — shows Cortex logo, tagline "Code with Intent. Build with Memory.", and Clerk's `<SignIn />` component. Style with full dark theme (`$color-bg-base` background, `$color-primary` accents).
- [x] **1.8.3** Add user avatar to toolbar/activity bar using Clerk's `<UserButton />` component.

### ✅ Phase 1 Complete Checklist
- [x] Vite + React client runs on `localhost:5173`
- [x] Express server runs on `localhost:3001`
- [x] MongoDB Atlas connection established
- [x] Clerk auth works — users can sign in/out
- [x] SCSS design system fully defined with all tokens
- [x] Monaco Editor renders with Cortex dark theme
- [x] 3-panel App Shell layout renders correctly
- [x] File tree renders project files
- [x] Editor tabs open/close/switch correctly

---

## PHASE 2 — Decision Memory
> **PRD Reference:** Section 6.3 (Decision Memory Feature), Section 9 Phase 2 (Week 3–4)
> **Goal:** Build the complete Decision Memory feature — MongoDB model, all CRUD APIs, Monaco gutter decorations, annotation drawer UI, Memory Vault page, and AI summarization.

> ⚠️ Re-read PRD Section 6.3 fully before starting this phase.

### 2.1 — Decision Memory Data Layer

- [ ] **2.1.1** Create `server/models/DecisionMemory.js` — Mongoose schema with ALL fields from PRD Section 6.3:
  - `_id` (ObjectId), `projectId` (String, required), `filePath` (String, required), `lineFrom` (Number), `lineTo` (Number), `codeSnapshot` (String), `reason` (String, required), `category` (Enum: `PERFORMANCE | SECURITY | BUGFIX | SCALABILITY | REFACTOR | EXPERIMENT | TODO`), `tags` (String[]), `linkedTo` (ObjectId[]), `intentRunId` (ObjectId, optional), `author` (String — Clerk userId), `createdAt` (Date), `updatedAt` (Date).
- [ ] **2.1.2** Add MongoDB indexes to DecisionMemory as per PRD Section 8.2: `{ projectId: 1, filePath: 1 }`, `{ projectId: 1, category: 1 }`, `{ projectId: 1, createdAt: -1 }`, `{ tags: 1 }`.
- [ ] **2.1.3** Create `server/routes/memory.routes.js` — define all 6 endpoints from PRD Section 6.3: `POST /api/memory`, `GET /api/memory/:projectId`, `PATCH /api/memory/:id`, `DELETE /api/memory/:id`, `POST /api/memory/summarize`, `GET /api/memory/timeline/:projectId`. All routes protected by `Auth.js`.
- [ ] **2.1.4** Create `server/controllers/MemoryController.js` — implement full business logic for all 6 endpoints. `GET /api/memory/:projectId` supports query filters: `file`, `category`, `tag`, `search` (text search). Pagination: `page` and `limit` query params.

### 2.2 — AI Memory Summarization

- [ ] **2.2.1** Create `server/services/GeminiService.js` — initialize `@google/generative-ai` with `GEMINI_API_KEY`. Implement `summarizeMemories(memories[], projectContext)` method — takes array of memory objects, returns a paragraph summarizing key architectural decisions. Use model `gemini-2.0-flash-exp`.
- [ ] **2.2.2** Wire `GeminiService.summarizeMemories()` into `MemoryController.summarize()` — called by `POST /api/memory/summarize`. Accept `{ projectId, filters }` body, fetch matching memories, pass to Gemini, return `{ aiSummary, keyDecisions[] }`.

### 2.3 — Memory API Client Layer

- [ ] **2.3.1** Create `client/src/api/index.js` — configure Axios instance with `baseURL: VITE_API_URL`, and request interceptor that attaches Clerk Bearer token from `useAuth()` to every request Authorization header.
- [ ] **2.3.2** Create `client/src/api/memoryApi.js` — functions: `createMemory(data)`, `getMemories(projectId, filters)`, `updateMemory(id, data)`, `deleteMemory(id)`, `summarizeMemories(projectId, filters)`, `getMemoryTimeline(projectId)`.
- [ ] **2.3.3** Create `client/src/hooks/useSocket.js` — Socket.IO client hook. Connects to backend on mount, exposes `on(event, handler)` and `emit(event, data)`, cleans up on unmount.

### 2.4 — Monaco Gutter Decorations

- [ ] **2.4.1** In `MonacoWrapper.jsx`, after memories load for the active file, call `editor.deltaDecorations()` to render amber gutter marks for each memory. Decoration color: `#F59E0B` (matches `$color-memory`). Left-border gutter style.
- [ ] **2.4.2** Implement hover tooltip on gutter marks — shows memory `reason` + `category` badge. Use Monaco's `editor.addContentWidget()` or a custom tooltip overlay.
- [ ] **2.4.3** Clicking a gutter mark opens the memory in the right feature panel (set `featurePanelMode = 'memory'` in `uiStore`, set `activeMemoryId`).
- [ ] **2.4.4** Multiple memories on same file range: stack gutter marks. Clicking opens a list panel showing all memories at that range.
- [ ] **2.4.5** Right-click context menu in Monaco editor — add "Add Decision Memory" option using Monaco's `editor.addAction()`. Pre-fills the annotation drawer with current file path and selected line range.

### 2.5 — Memory Annotation Drawer UI

> Re-read PRD Section 6.3 (Decision Memory UI Flow steps 18–26) before starting.

- [ ] **2.5.1** Create `client/src/features/memory/MemoryAnnotation.jsx` — right-side drawer panel (slides in from right as part of Feature Panel). Contains:
  - Read-only fields: File Path, Line Range (pre-filled)
  - Required: Reason textarea
  - Category dropdown (7 values from schema)
  - Tags: comma-separated input that renders individual Tag components
  - Links: search input to find and link other memory entries by reason text
  - Save / Cancel buttons
- [ ] **2.5.2** Style the drawer using SCSS tokens — `$color-bg-surface` background, `$shadow-lg`, `$radius-lg`. Amber accent (`$color-memory`) for borders and focus states. Glow effect on save button: `$shadow-glow-memory`.
- [ ] **2.5.3** Create `client/src/hooks/useMemory.js` — hook managing: loading memories for current project/file, opening the annotation drawer (with optional pre-fill), saving a new memory (calls `memoryApi.createMemory`), updating, deleting.
- [ ] **2.5.4** Implement the "Add Memory" Feature CTA button in `EditorToolbar.jsx` — clicking sets `featurePanelMode = 'memory'` and opens annotation drawer with current file path.

### 2.6 — Memory Vault Page

> Re-read PRD Section 6.3 steps 23–26.

- [ ] **2.6.1** Create `client/src/pages/MemoryVault.jsx` — full-page view (route: `/memory`). Layout: Left sidebar with filters, main content area with memory list/timeline.
- [ ] **2.6.2** Create `client/src/features/memory/MemorySearch.jsx` — search bar + filter panel. Filters: text search, category (multi-select), tags (multi-select), date range picker, file path filter, author filter. Calls `memoryApi.getMemories()` with filters on change.
- [ ] **2.6.3** Create `client/src/features/memory/DecisionMemory.jsx` — memory list card component. Shows: reason (truncated), category badge (color per enum), tags list, file path, timestamp, author. Click to expand and edit.
- [ ] **2.6.4** Implement Timeline View tab in MemoryVault — renders memories sorted by `createdAt` in a vertical timeline. Each entry shows date, reason, category badge, and the `codeSnapshot` in a read-only Monaco diff viewer.
- [ ] **2.6.5** Implement "Summarize Decisions" button in MemoryVault — calls `memoryApi.summarizeMemories()`, shows result in a modal with `$shadow-glow-memory` glow. Display `aiSummary` paragraph + `keyDecisions[]` list.
- [ ] **2.6.6** Memory Vault accessible from Activity Bar icon and keyboard shortcut `Ctrl+Shift+V` (Win) / `Cmd+Shift+V` (Mac).

### ✅ Phase 2 Complete Checklist
- [ ] DecisionMemory Mongoose model created with all fields and indexes
- [ ] All 6 CRUD + AI API endpoints functional and returning correct data
- [ ] Clerk auth protects all memory endpoints
- [ ] Monaco gutter shows amber decorations for memories
- [ ] Hover on gutter shows memory preview tooltip
- [ ] Right-click context menu has "Add Decision Memory" option
- [ ] Memory annotation drawer opens, all fields functional, saves to DB
- [ ] Memory Vault page loads all memories with search and filter
- [ ] Timeline view renders
- [ ] AI Summarize button returns summary from Gemini

---

## PHASE 3 — Intent Mode
> **PRD Reference:** Section 6.1 (Intent Mode Feature Spec), Section 9 Phase 3 (Week 5–6)
> **Goal:** Build the Intent Mode AI feature — GeminiService streaming, Intent panel UI, diff viewer, rate limiting, Groq fallback, and auto-memory creation.

> ⚠️ Re-read PRD Section 6.1 fully before starting this phase.

### 3.1 — GeminiService Streaming

- [ ] **3.1.1** Extend `server/services/GeminiService.js` — add `streamAnalysis({ code, intent, scope, projectContext, customInstruction, detectedLanguage })` method. Uses `generateContentStream()` from `@google/generative-ai`. Builds system prompt from PRD Section 6.1 template exactly:
  - Role: `You are a senior software architect specializing in {intent} optimization.`
  - Input: code file in `{detectedLanguage}`, project context: `{projectContext}`
  - Task: Refactor for `{intent}`, preserve all functionality
  - Output format: JSON object `{ refactoredCode, changes[], explanation, confidenceScore }`. Each change: `{ lineFrom, lineTo, reason, type }`.
- [ ] **3.1.2** Create `server/services/GroqService.js` — initialize Groq SDK with `GROQ_API_KEY`. Implement same `streamAnalysis()` interface as GeminiService using `groq.chat.completions.create()` with `stream: true` and model `llama-3.3-70b-versatile`. This is the fallback provider.
- [ ] **3.1.3** Create `server/utils/tokenEstimator.js` — estimate token count for a string (approx: `text.length / 4`). Warn if > 50,000 tokens.
- [ ] **3.1.4** Create `server/utils/promptBuilder.js` — builds the full Gemini prompt string from intent parameters. Supports all 5 intent types: `Performance`, `Scalability`, `Security`, `Readability`, `Maintainability`.

### 3.2 — Socket.IO Stream Relay

- [ ] **3.2.1** Create `server/sockets/streamHandler.js` — exports a function that takes `io` (Socket.IO server instance) and registers socket event listeners.
- [ ] **3.2.2** Create `server/sockets/intentStream.js` — handles the streaming pipeline: receives tokens from GeminiService stream → emits `intent:token` event to the specific client socket → emits `intent:done` with metadata when stream ends → emits `intent:error` on failure.
- [ ] **3.2.3** Wire Socket.IO handlers into `server/index.js` — on new connection, attach `streamHandler`.

### 3.3 — Rate Limiting & Groq Fallback

- [ ] **3.3.1** Create `server/middleware/RateLimit.js` — implement per-user rate limiting for AI endpoints. Track request count per `userId` in memory (or Redis if `REDIS_URL` is set). Apply 15 RPM limit matching Gemini free tier.
- [ ] **3.3.2** In `IntentController` (next step), implement provider fallback logic: attempt Gemini first. If rate limit error (429) or any Gemini error, automatically retry with `GroqService`. Emit `intent:provider` socket event to notify client which provider is being used.
- [ ] **3.3.3** Token estimation check before AI call: if `tokenEstimator.estimate(code) > 50000`, return `{ warning: 'File too large for single analysis. Consider selecting a smaller scope.' }` before making AI call.

### 3.4 — Intent Mode API

- [ ] **3.4.1** Create `server/routes/intent.routes.js` — define 3 endpoints from PRD Section 6.1: `POST /api/intent/analyze`, `GET /api/intent/history/:projectId`, `POST /api/intent/accept`. All protected by `Auth.js` and `RateLimit.js`.
- [ ] **3.4.2** Create `server/controllers/IntentController.js`:
  - `analyze()`: Validates body (`code`, `intent`, `scope`, `projectId`), estimates tokens, calls `GeminiService.streamAnalysis()` (or Groq fallback), pipes stream tokens to Socket.IO via `intentStream`.
  - `getHistory()`: Returns past intent runs for a project from a new `IntentRun` Mongoose model.
  - `accept()`: Saves accepted diffs, auto-creates a `DecisionMemory` entry linking to the intent run.
- [ ] **3.4.3** Create `server/models/IntentRun.js` — Mongoose schema: `{ projectId, intent, scope, filePath, originalCode, refactoredCode, changes[], explanation, confidenceScore, acceptedDiffs[], memoryId, createdAt }`.

### 3.5 — Intent Mode API Client & Hook

- [ ] **3.5.1** Create `client/src/api/intentApi.js` — functions: `analyzeIntent(data)`, `getIntentHistory(projectId)`, `acceptIntent(intentRunId, acceptedDiffs)`.
- [ ] **3.5.2** Create `client/src/hooks/useIntentMode.js` — hook managing intent mode state. Connects to Socket.IO, listens for `intent:token` events and appends tokens to result buffer, handles `intent:done` and `intent:error`. Exposes: `runIntent(params)`, `acceptAll()`, `acceptSelected(diffs)`, `rejectAll()`, `intentResult`, `isStreaming`, `confidenceScore`.

### 3.6 — Intent Mode UI

> Re-read PRD Section 6.1 (Intent Mode UI Flow steps 1–9) and Section 4.7 (Button styles — Feature CTA).

- [ ] **3.6.1** Create `client/src/features/intent/IntentSelector.jsx` — the right-side panel for intent selection:
  - Five intent types as radio buttons with color-coded icons per PRD Section 6.1: Performance=green, Scalability=blue, Security=red, Readability=cyan, Maintainability=amber.
  - Scope selector: `Selection | Current File | Current Folder | Entire Project`
  - Optional custom instruction textarea
  - "Run Intent" CTA button — violet (`$color-secondary`), 40px height, shows spinner when running
- [ ] **3.6.2** Create `client/src/features/intent/IntentResultPanel.jsx` — renders after streaming completes:
  - Split-pane diff view: left = original code, right = refactored code (use Monaco diff editor)
  - Confidence badge per suggestion: High (green) / Medium (amber) / Low (red)
  - Action buttons: "Accept All" (`Ctrl+Shift+A`), "Accept Selected", "Reject All" (Escape)
  - AI provider badge showing whether Gemini or Groq was used
- [ ] **3.6.3** Create `client/src/features/intent/IntentMode.jsx` — parent component that toggles between `IntentSelector` (pre-run) and `IntentResultPanel` (post-run). Connected to `useIntentMode` hook.
- [ ] **3.6.4** Wire Intent Mode to "Intent Mode" CTA button in `EditorToolbar.jsx` — click sets `featurePanelMode = 'intent'`, opens feature panel.
- [ ] **3.6.5** Implement keyboard shortcuts for Intent Mode: `Ctrl+Shift+I` opens Intent Mode panel, `Ctrl+Enter` runs intent after selection, `Ctrl+Shift+A` accepts all, `Escape` rejects all.
- [ ] **3.6.6** On "Accept" — call `intentApi.acceptIntent()`. This auto-creates a Decision Memory entry. Show success toast: "Changes applied + Decision Memory created".

### ✅ Phase 3 Complete Checklist
- [ ] GeminiService streams tokens via Socket.IO to client
- [ ] All 5 intent types work with correct prompts
- [ ] Groq fallback activates automatically on Gemini rate limit
- [ ] Token estimation warns for large files (>50K tokens)
- [ ] Rate limiting enforced per user (15 RPM)
- [ ] Intent selector panel renders all 5 intents with color coding
- [ ] Scope selector works (Selection / File / Folder / Project)
- [ ] Diff view shows original vs refactored side-by-side
- [ ] Confidence badge renders per suggestion
- [ ] Accept All / Accept Selected / Reject All UI actions work
- [ ] Accepting auto-creates a Decision Memory entry
- [ ] All keyboard shortcuts functional

---

## PHASE 4 — Codebase Explainer
> **PRD Reference:** Section 6.2 (Codebase Explainer), Section 9 Phase 4 (Week 7–8)
> **Goal:** Build the CodeParserService (AST-based), GraphBuilderService, D3 force-directed graph UI, 4 visualization layers, data flow tracer, dependency audit, and SVG/PDF export.

> ⚠️ Re-read PRD Section 6.2 fully before starting this phase.

### 4.1 — Code Parser Service

- [ ] **4.1.1** Install additional backend dependencies: `acorn`, `estree-walker`, `archiver`, `@babel/parser` (for JSX support).
- [ ] **4.1.2** Create `server/utils/fileExtractor.js` — handles ZIP file extraction using `archiver`. Extracts to a temp directory, returns array of `{ filePath, content }` objects. Filter out `node_modules`, `.git`, binary files. Enforce 10MB upload limit.
- [ ] **4.1.3** Create `server/services/CodeParserService.js` — implements AST-based parsing using `@babel/parser` (handles JSX/TSX):
  - `parseFile(filePath, content)` — returns `{ imports: [], exports: [], functions: [], components: [], linesOfCode }` for a single file.
  - `parseProject(files[])` — parses all files, builds cross-file import/export map.
  - Fallback: if AST parsing fails, use regex-based import parsing (`import .* from '.*'` pattern). Log failed files but skip gracefully.
- [ ] **4.1.4** Create `server/services/GraphBuilderService.js` — converts parsed project data to D3-compatible format:
  - `buildGraph(parsedProject)` — returns `{ nodes[], edges[], clusters[] }`.
  - Each node: `{ id, label, type, summary, imports[], importedBy[], linesOfCode, lastModified }` per PRD Section 6.2 Graph Node Schema.
  - `type` determined by file path pattern: `routes/` → `route`, `models/` → `model`, `services/` → `service`, `components/` → `component`, etc.
  - Cluster nodes by folder (each folder = one cluster with a color).
  - Each edge: `{ source: fileId, target: fileId, type: 'import' }`.
- [ ] **4.1.5** Create `server/utils/graphBuilder.js` (client-side utils) — helper functions for filtering and searching graph data. Also add to `client/src/utils/graphBuilder.js`.

### 4.2 — AI File Summarization

- [ ] **4.2.1** Extend `GeminiService.js` — add `summarizeFile({ fileContent, fileName, projectContext })` method. Returns `{ summary: string (one-line), keyFunctions: string[], importedBy: [], imports: [] }`. Used to populate graph node tooltips.
- [ ] **4.2.2** In `CodeParserService`, after parsing all files, batch-call `GeminiService.summarizeFile()` for each file in groups of 5 (to respect rate limits). Store summaries in project snapshot.

### 4.3 — Codebase Explainer API

- [ ] **4.3.1** Create `server/models/CodebaseSnapshot.js` — Mongoose schema: `{ projectId, fileCount, graphData: { nodes[], edges[], clusters[] }, parsedAt: Date, fileHashes: Object }`. Add index `{ projectId: 1, createdAt: -1 }`.
- [ ] **4.3.2** Create `server/routes/explainer.routes.js` — define all 5 endpoints from PRD Section 6.2: `POST /api/explainer/analyze`, `GET /api/explainer/:snapshotId/graph`, `GET /api/explainer/:snapshotId/flow`, `GET /api/explainer/:snapshotId/deps`, `POST /api/explainer/summarize-file`. Protected by `Auth.js`.
- [ ] **4.3.3** Create `server/controllers/ExplainerController.js`:
  - `analyze()`: Accepts multipart ZIP upload OR `{ projectPath }`. Runs `CodeParserService.parseProject()`, then `GraphBuilderService.buildGraph()`, then file summarization. Caches result in `CodebaseSnapshot`. Returns `{ snapshotId, fileCount, graphData, summary }`.
  - `getGraph()`: Returns `{ nodes[], edges[], clusters[] }` from snapshot.
  - `getFlow()`: Given `entryPoint` query param, traces execution path through the import graph using BFS/DFS. Returns `{ flowNodes[], flowEdges[] }`.
  - `getDeps()`: Returns npm dependency audit — parses `package.json`, identifies `unusedList[]` by cross-referencing with import graph. Returns `{ dependencies[], devDependencies[], unusedList[] }`.
  - `summarizeFile()`: Calls `GeminiService.summarizeFile()` for single file.
- [ ] **4.3.4** Create `client/src/api/explainerApi.js` — functions: `analyzeProject(formData)`, `getGraph(snapshotId)`, `getFlow(snapshotId, entryPoint)`, `getDeps(snapshotId)`, `summarizeFile(data)`.

### 4.4 — D3 Force-Directed Graph

- [ ] **4.4.1** Install D3.js in client: `npm install d3@7`.
- [ ] **4.4.2** Create `client/src/features/explainer/DependencyGraph.jsx` — D3 force-directed graph component:
  - Nodes rendered as SVG circles, colored by `type`: component=blue, route=green, model=amber, service=violet, utility=gray, config=cyan, test=red.
  - Edges rendered as SVG lines with directional arrows.
  - Force simulation: charge repulsion, link distance by cluster proximity.
  - Cluster nodes visually grouped with a subtle background hull.
  - Hover on node: shows tooltip with file name, type badge, one-line AI summary.
  - Click on node: opens `ExplainerNodePanel` sidebar with full details.
  - Search bar at top: typing filters graph — matched node + its direct connections highlighted, others dimmed.
  - Zoom + pan support using D3 zoom behavior.
- [ ] **4.4.3** Create `client/src/features/explainer/ExplainerNodePanel.jsx` — right sidebar on node click. Shows: file summary, list of files it imports, list of files that import it, key functions list. Each import/importedBy is a clickable link that re-centers graph on that node.

### 4.5 — 4 Visualization Layers

- [ ] **4.5.1** Create tab bar at top of ExplainerView with 4 tabs: "File Dependencies", "Data Flow", "Dependency Audit", "Component Tree".
- [ ] **4.5.2** **File Dependencies tab**: Renders `DependencyGraph.jsx` (already built above).
- [ ] **4.5.3** **Data Flow tab**: Create `client/src/features/explainer/FlowOverlay.jsx` — directed acyclic graph. User inputs an entry point (e.g., "user clicks login"). Calls `explainerApi.getFlow(snapshotId, entryPoint)`. Renders the returned flow as a step-by-step DAG: User Action → Component → API Call → Server Route → DB Query. Use React Flow (`reactflow` package) for this directed graph with drag-and-drop nodes.
- [ ] **4.5.4** **Dependency Audit tab**: Renders all npm packages, their version, estimated size, whether used (from `unusedList`), and AI-generated one-line summaries. Also renders a treemap visualization using D3 `d3.treemap()` where area = package size. Highlight unused packages in red.
- [ ] **4.5.5** **Component Tree tab**: Renders React component hierarchy as a top-down tree diagram. Parent components at top, children below. Nodes that hold state marked with amber badge. Pure components marked with blue badge. Use D3 `d3.tree()` layout.

### 4.6 — Explainer Page & Export

- [ ] **4.6.1** Create `client/src/pages/ExplainerView.jsx` — full-screen overlay page (route: `/explainer`). Header: "Codebase Explainer" + close button (returns to Editor). Upload section if no project analyzed yet: drag-drop ZIP or enter folder path. Shows loading skeleton while parsing runs. Tab bar for 4 views.
- [ ] **4.6.2** Create `client/src/hooks/useExplainer.js` — manages: `snapshotId`, `graphData`, `selectedNode`, `activeTab`, `searchTerm`. Calls APIs and caches results.
- [ ] **4.6.3** Implement Export button: "Export as SVG" — uses `d3.select('svg').node().outerHTML` to get graph SVG, creates a Blob, triggers download. "Export as PDF" — use browser's `window.print()` with print-specific CSS, or use `html2canvas` + `jspdf` library.
- [ ] **4.6.4** Wire "Explain Codebase" CTA button in `EditorToolbar.jsx` to navigate to `/explainer`. Keyboard shortcut: `Ctrl+Shift+E`.

### ✅ Phase 4 Complete Checklist
- [ ] ZIP upload works — files extracted and parsed
- [ ] AST parsing extracts imports/exports for JS/JSX/TS/TSX files
- [ ] Regex fallback works for unparseable files
- [ ] D3 force-directed graph renders with correct nodes and edges
- [ ] Node hover shows AI summary tooltip
- [ ] Node click opens detail sidebar panel
- [ ] Graph search highlights matched node + connections
- [ ] Data Flow tab traces entry point through execution path
- [ ] Dependency Audit shows used vs unused packages with treemap
- [ ] Component Tree renders React hierarchy
- [ ] Export to SVG works and downloads correctly
- [ ] Codebase Explainer accessible via toolbar and `Ctrl+Shift+E`

---

## PHASE 5 — Polish & Launch
> **PRD Reference:** Section 9 Phase 5 (Week 9–10), Section 5.4 (Data Flow), Section 8.1 (Rate Limiting), Section 10 (Deployment)
> **Goal:** Responsive design, full keyboard shortcut system, comprehensive error handling, skeleton loaders, performance optimization, and production deployment.

> ⚠️ Re-read PRD Sections 8, 9 (Phase 5), and 10 fully before starting this phase.

### 5.1 — Keyboard Shortcut System

- [ ] **5.1.1** Implement a global keyboard shortcut manager in `client/src/hooks/useKeyboardShortcuts.js`. Registers `keydown` event listeners. Dispatch actions based on shortcut combinations from PRD Section 7.3.
- [ ] **5.1.2** Implement ALL shortcuts from PRD Section 7.3 table:
  - `Ctrl+Shift+I` → Open Intent Mode
  - `Ctrl+Shift+E` → Open Codebase Explainer
  - `Ctrl+Shift+M` → Add Decision Memory
  - `Ctrl+Shift+V` → Open Memory Vault
  - `Ctrl+Enter` → Run Intent (when Intent panel is active)
  - `Ctrl+Shift+A` → Accept All Suggestions
  - `Escape` → Reject All Suggestions / Close active panel
  - `Ctrl+B` (right) → Toggle Feature Panel
  - `Ctrl+[1-9]` → Switch Editor Tabs
- [ ] **5.1.3** Create a Command Palette modal (`client/src/components/CommandPalette/CommandPalette.jsx`) — triggered by `Ctrl+Shift+P`. Lists all available commands with their shortcuts. Searchable. Style with `$color-bg-elevated`, `$shadow-lg`, fuzzy search highlighting.

### 5.2 — Error Handling

- [ ] **5.2.1** Every AI call in the frontend must have a try/catch. On error: render an inline error state within the feature panel (not a crash). Show message + "Retry" button.
- [ ] **5.2.2** Add loading states to all async AI operations using the `Skeleton` component from Phase 1:
  - Intent Mode streaming: show streaming cursor animation while tokens arrive
  - Codebase Explainer analysis: show skeleton graph with placeholder nodes
  - Memory Summarization: show skeleton paragraph loader
- [ ] **5.2.3** Backend `ErrorHandler.js` — ensure it catches and formats: Mongoose validation errors (400), Clerk auth errors (401), rate limit exceeded (429 with `retryAfter` header), Gemini/Groq errors (502 with provider info), file too large (413).
- [ ] **5.2.4** All fetch errors display a non-intrusive toast notification at bottom-right. Toast component: `client/src/components/Toast/Toast.jsx`. Variants: `error` (red), `warning` (amber), `success` (green), `info` (blue). Auto-dismiss after 4 seconds.
- [ ] **5.2.5** Monaco editor: if a file fails to load, show an error state within the editor area with file path and error message.

### 5.3 — Responsive Design

- [ ] **5.3.1** Test and fix layout at three breakpoints from PRD Section 9 Phase 5: 1280px, 1440px, 1920px widths.
- [ ] **5.3.2** At 1280px: Feature Panel auto-collapses to 300px minimum. Sidebar collapses to 200px. Editor area still usable.
- [ ] **5.3.3** At 1920px: Feature Panel expands to 420px. Wider sidebar (280px default). More comfortable spacing.
- [ ] **5.3.4** Bottom Panel height adjusts responsively. On smaller viewports, bottom panel collapsed by default.

### 5.4 — Performance Optimization

- [ ] **5.4.1** Monaco Editor lazy loading — use `React.lazy()` and `Suspense` to load `MonacoWrapper.jsx`. Show `Skeleton` while Monaco loads.
- [ ] **5.4.2** D3 graph virtualization — for graphs with > 200 nodes, only render nodes visible in the current viewport (implement simple viewport-based culling using D3 quadtree).
- [ ] **5.4.3** Large file handling in Monaco: for files > 5,000 lines, disable Monaco's heavy features (semantic tokenization, full IntelliSense) and show a performance warning badge.
- [ ] **5.4.4** Implement response caching for Codebase Explainer: before analyzing, compute project hash from file contents. If hash matches an existing `CodebaseSnapshot` in DB, return cached result without re-running AI. (Redis cache if `REDIS_URL` available, MongoDB cache as fallback.)
- [ ] **5.4.5** Implement request deduplication in `intentApi.js` — if an identical request (same code + intent + scope hash) is already in flight, return the same promise instead of making a second API call.

### 5.5 — UI Polish

- [ ] **5.5.1** Add micro-animations to all interactive elements:
  - Feature CTA buttons: gradient border animation on hover (CSS keyframe animation cycling through feature's accent color)
  - Intent type radio buttons: scale up + glow on selection
  - Memory gutter decoration: pulse animation on newly added memory
  - Graph nodes in D3: smooth transition on position change, scale animation on hover
- [ ] **5.5.2** Settings page (`client/src/pages/Settings.jsx`): allow user to configure AI provider preference (Gemini first vs Groq first), Monaco editor font size, font family choice (JetBrains Mono or Fira Code), tab size (2 or 4 spaces).
- [ ] **5.5.3** Empty states for all views:
  - Memory Vault (no memories): "No memories yet. Right-click any code to add your first decision memory."
  - Explainer (no project): "Upload your project to visualize its architecture."
  - Intent Mode (no code): "Open a file to run Intent Mode."
- [ ] **5.5.4** Add a subtle hexagonal animated background pattern to the Auth/Landing page using CSS clip-path — referencing the Cortex hexagonal logo concept from PRD Section 2.1.

### 5.6 — Production Deployment

- [ ] **5.6.1** Configure `client/vite.config.js` for production build. Ensure environment variables are properly inlined. Run `npm run build` in `client/` and verify no build errors.
- [ ] **5.6.2** Set up `server/` for production: ensure `process.env.NODE_ENV === 'production'` disables verbose logging. Use `helmet` Express middleware for security headers. Verify CORS `CLIENT_URL` is set to production Vercel URL.
- [ ] **5.6.3** Deploy frontend to Vercel: connect GitHub repo, set `client/` as root directory, configure all `VITE_*` environment variables in Vercel dashboard.
- [ ] **5.6.4** Deploy backend to Railway: connect GitHub repo, set `server/` as root directory, configure all server environment variables (`GEMINI_API_KEY`, `GROQ_API_KEY`, `MONGODB_URI`, `CLERK_SECRET_KEY`, `PORT`, `CLIENT_URL`).
- [ ] **5.6.5** MongoDB Atlas: ensure IP whitelist includes Railway's egress IPs OR set to `0.0.0.0/0` for development. Verify Atlas M0 connection string is correct.
- [ ] **5.6.6** Clerk dashboard: add production domain to allowed origins. Ensure Clerk publishable key and secret key are the production keys (not development).
- [ ] **5.6.7** End-to-end smoke test on production deployment:
  - [ ] Sign in with Google/GitHub via Clerk
  - [ ] Create a project
  - [ ] Open a file in Monaco Editor
  - [ ] Run Intent Mode and see streaming AI response
  - [ ] Add a Decision Memory and verify it appears in gutter
  - [ ] Open Memory Vault and search memories
  - [ ] Upload a project ZIP and view Codebase Explainer graph

### ✅ Phase 5 Complete Checklist
- [ ] All 9 keyboard shortcuts from PRD functional
- [ ] Command Palette opens with `Ctrl+Shift+P` and lists all commands
- [ ] Every AI call has error handling + retry UI
- [ ] Toast notifications show for errors, warnings, successes
- [ ] All skeleton loaders implemented for async operations
- [ ] App works correctly at 1280px, 1440px, 1920px
- [ ] Monaco lazy-loaded with suspense
- [ ] D3 graph virtualized for large projects
- [ ] Explainer caching works (repeat analysis is instant)
- [ ] Micro-animations on Feature CTA buttons and interactive elements
- [ ] Settings page functional (AI provider, font size, tab size)
- [ ] Empty states for all views
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway
- [ ] MongoDB Atlas connected to production
- [ ] Clerk auth works in production
- [ ] All 7 smoke tests pass on production

---

## SUMMARY PROGRESS TRACKER

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Foundation & Project Setup | ⬜ Not Started |
| Phase 2 | Decision Memory | ⬜ Not Started |
| Phase 3 | Intent Mode | ⬜ Not Started |
| Phase 4 | Codebase Explainer | ⬜ Not Started |
| Phase 5 | Polish & Launch | ⬜ Not Started |

> Update this table as phases complete: ⬜ Not Started → 🔄 In Progress → ✅ Complete

---

*— Cortex Phased Plan v1.0 | Based on Cortex_PRD_v1.0.md | Shivam Garade | 2026 —*

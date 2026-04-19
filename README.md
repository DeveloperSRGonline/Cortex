

⬡

**CORTEX**

*AI-Powered Code Editor*

*"Code with Intent. Build with Memory."*

Product Requirements Document  •  Version 1.0  
Shivam Garade  •  April 2026

# **1\. Executive Summary**

Cortex is a next-generation, AI-first code editor built on the MERN stack with Monaco Editor. Unlike conventional AI copilots that only autocomplete code, Cortex understands the intent behind your code, explains your entire codebase visually, and remembers every architectural decision you make — transforming coding from a solitary act into an intelligent, documented process.

## **1.1 The Problem**

* Developers write code but rarely document why — context is lost forever once a sprint ends.

* AI tools today are glorified autocomplete engines with no understanding of codebase-level architecture.

* Onboarding new devs is painful because no tool explains how data flows through a real project.

* Code review is slow because reviewers don't know the intent behind specific implementations.

## **1.2 The Solution — Three Signature Features**

| Feature | What It Does | Why It's Unique |
| :---- | :---- | :---- |
| Intent Mode | Refactor/optimize the current file or entire codebase toward a chosen intent (Performance, Scalability, Security, Readability) | No editor lets you optimize with a declared objective — it's intent-driven AI transformation |
| Codebase Explainer | One-click visual map of how files relate, how data flows, and what every dependency does | Converts an entire MERN project into an interactive, annotated dependency graph |
| Decision Memory | Annotate why code exists. Search, audit, and time-travel through architectural decisions | Your editor becomes a living architecture journal — zero extra tooling needed |

## **1.3 Target Users**

* Solo developers building products — need context preservation across sessions

* Small engineering teams (2–8 devs) — need shared architectural understanding

* Students & bootcamp grads — need to understand codebases they didn't write

* Indie hackers & startup CTOs — need to move fast without losing 'why'

# **2\. Product Identity**

## **2.1 Name & Branding**

| Attribute | Value |
| :---- | :---- |
| Product Name | Cortex |
| Tagline | Code with Intent. Build with Memory. |
| Version | 1.0.0 — MVP |
| Category | AI-Powered Code Editor / Developer Tool |
| Platform | Web App (Browser-based, Desktop-ready via Electron later) |
| Target Stack | MERN projects (React, Node.js, Express, MongoDB) — expandable |
| Logo Concept | Hexagonal neural node — representing a cortex cell / code node |

## **2.2 Brand Voice**

* Intelligent but not arrogant — it explains, doesn't lecture

* Precise — every word in the UI has a reason

* Dark & focused — like a terminal, not a toy

* Dev-native — uses real terminology, not dumbed-down language

# **3\. Technology Stack**

## **3.1 Frontend**

| Technology | Version | Purpose | Why This Choice |
| :---- | :---- | :---- | :---- |
| React | 18.x | UI framework | Component model fits panel-based editor layout |
| Monaco Editor | 0.47.x | Code editing core | Same engine as VS Code — syntax highlight, IntelliSense, multi-cursor |
| SCSS | 1.70.x | Styling | Token-based theming, nested rules, dark mode variables |
| Zustand | 4.x | State management | Minimal boilerplate, perfect for editor state (tabs, file tree, memory) |
| React Router v6 | 6.x | Routing | SPA navigation between editor, memory view, explainer view |
| D3.js | 7.x | Graph visualization | Codebase Explainer force-directed graph |
| React Flow | 11.x | Interactive diagrams | Drag-and-drop dependency visualization fallback |
| Axios | 1.6.x | HTTP client | API calls to backend & AI endpoints |

## **3.2 Backend**

| Technology | Version | Purpose | Why This Choice |
| :---- | :---- | :---- | :---- |
| Node.js | 20 LTS | Runtime | Non-blocking I/O — handles concurrent AI streaming responses |
| Express.js | 4.x | API framework | Minimal, fast, production-proven |
| MongoDB | 7.x | Primary database | Flexible schema for decision memories \+ codebase metadata |
| Mongoose | 8.x | ODM | Schema validation for Decision Memory documents |
| Multer | 1.4.x | File uploads | For codebase upload/analysis — handles zip files |
| Socket.IO | 4.x | Real-time | Streaming AI responses token-by-token to the editor |
| dotenv | 16.x | Config | Env variable management for API keys & DB strings |

## **3.3 AI Provider — Google Gemini Flash**

After evaluating all major AI providers on free-tier generosity, Google Gemini 2.0 Flash is the clear winner for this project:

| Provider | Free Tier RPM | Free Tier RPD | Token Limit | Cost After Free |
| :---- | :---- | :---- | :---- | :---- |
| Google Gemini 2.0 Flash | 15 req/min | 1,500 req/day | 1M tokens/day FREE | \~$0.075 / 1M tokens |
| Groq (Llama 3.3 70B) | 30 req/min | 14,400 req/day | Limited context | Pay-as-you-go |
| OpenAI GPT-4o-mini | Limited | 200 req/day | Restricted | $0.15 / 1M tokens |
| Anthropic Claude Haiku | Limited | \~50/day trial | Restricted | $0.25 / 1M tokens |

**Decision:** Google Gemini 2.0 Flash via @google/generative-ai SDK. Model ID: gemini-2.0-flash-exp. 1 million free tokens per day is more than enough for MVP usage. Add Groq as fallback for burst traffic.

## **3.4 Database — MongoDB Atlas**

* Free tier: 512 MB storage, unlimited read/write for dev usage

* Hosts: DecisionMemory, CodebaseSnapshot, UserSession collections

* Index: decision memories are indexed by fileHash \+ projectId for fast lookup

## **3.5 Auth**

* Clerk — free tier, 10,000 MAU, handles JWT, OAuth (Google/GitHub), user sessions

* All backend routes protected via Clerk JWT middleware

# **4\. Design System**

## **4.1 Philosophy**

Cortex follows a Dark-First, Token-Based design system. Every color, spacing, and typography value is stored as a SCSS variable. There is no hardcoded value anywhere in the codebase. The system is inspired by VS Code's density with Linear's visual refinement.

## **4.2 Color Tokens (SCSS Variables)**

| SCSS Token | Hex Value | Usage |
| :---- | :---- | :---- |
| $color-bg-base | \#0A0A0F | Outermost background — editor shell |
| $color-bg-surface | \#111118 | Sidebar, panels, modals |
| $color-bg-elevated | \#1A1A28 | Dropdowns, tooltips, cards |
| $color-bg-input | \#0F0F1A | Input fields, search bar |
| $color-border-subtle | \#1E1E30 | Dividers, inactive tab borders |
| $color-border-default | \#2E2E45 | Active panels, focused inputs |
| $color-text-primary | \#E5E5F0 | Main readable text |
| $color-text-secondary | \#8888AA | Labels, metadata, hints |
| $color-text-disabled | \#44445A | Placeholder, disabled state |
| $color-primary | \#4F6EF7 | CTAs, active tabs, selections, links |
| $color-primary-hover | \#6B85FF | Button hover state |
| $color-primary-muted | \#1E2A5C | Selected row backgrounds |
| $color-secondary | \#8B5CF6 | Intent Mode accent — Violet |
| $color-accent | \#22D3EE | Codebase Explainer accent — Cyan |
| $color-memory | \#F59E0B | Decision Memory accent — Amber |
| $color-success | \#22C55E | Pass states, positive confirmations |
| $color-warning | \#F97316 | Warnings, caution states |
| $color-error | \#EF4444 | Errors, destructive actions |
| $color-code-bg | \#0D0D17 | Monaco editor background |
| $color-highlight | \#4F6EF720 | Selection highlight in editor |

## **4.3 Typography**

| Token | Value | Usage |
| :---- | :---- | :---- |
| $font-ui | Inter, system-ui, sans-serif | All UI text — sidebar, menus, panels |
| $font-mono | JetBrains Mono, Fira Code, monospace | Code in Monaco, inline code snippets |
| $font-size-xs | 11px | Metadata, timestamps, badges |
| $font-size-sm | 12px | File tree labels, tab names |
| $font-size-base | 13px | Default panel text, inputs |
| $font-size-md | 14px | Primary content, descriptions |
| $font-size-lg | 16px | Section headers |
| $font-size-xl | 20px | Panel titles, modal headers |
| $font-size-2xl | 24px | Feature headings |
| $font-weight-normal | 400 | Default body text |
| $font-weight-medium | 500 | Labels, emphasis |
| $font-weight-semibold | 600 | Section headers, active states |
| $font-weight-bold | 700 | Feature titles, primary CTAs |

## **4.4 Spacing Scale**

| Token | Value | Usage |
| :---- | :---- | :---- |
| $space-1 | 4px | Icon internal padding |
| $space-2 | 8px | Tight component gaps |
| $space-3 | 12px | Default padding inside small components |
| $space-4 | 16px | Standard padding — sidebar items, inputs |
| $space-5 | 20px | Panel sections |
| $space-6 | 24px | Card padding, modal padding |
| $space-8 | 32px | Between major sections |
| $space-12 | 48px | Page-level margins |

## **4.5 Border Radius**

| Token | Value | Usage |
| :---- | :---- | :---- |
| $radius-sm | 4px | Badges, tags, tiny pills |
| $radius-md | 8px | Buttons, input fields, file tree items |
| $radius-lg | 12px | Panels, cards, modals |
| $radius-xl | 16px | Feature callout boxes |
| $radius-full | 9999px | Avatar, toggle switches, circular icons |

## **4.6 Shadow & Elevation**

| Token | Value | Usage |
| :---- | :---- | :---- |
| $shadow-sm | 0 1px 3px rgba(0,0,0,0.4) | Subtle card lift |
| $shadow-md | 0 4px 12px rgba(0,0,0,0.5) | Dropdown, tooltip |
| $shadow-lg | 0 8px 32px rgba(0,0,0,0.6) | Modal, feature panel |
| $shadow-glow-primary | 0 0 20px rgba(79,110,247,0.25) | Active intent mode button glow |
| $shadow-glow-memory | 0 0 20px rgba(245,158,11,0.25) | Active memory annotation glow |

## **4.7 Component Design Patterns**

### **Buttons**

* Primary: bg=$color-primary, text=white, radius=$radius-md, height=36px, hover=primary-hover \+ glow

* Ghost: bg=transparent, border=$color-border-default, hover=bg-elevated

* Icon: 32x32px, radius=$radius-md, hover=bg-elevated — used in toolbar

* Feature CTA (Intent / Explainer / Memory): 40px height, left icon, gradient border animation on hover

### **Tabs**

* Active tab: $color-primary bottom border (2px), $color-text-primary text

* Inactive tab: $color-bg-surface bg, $color-text-secondary text, close icon on hover

* Tab strip: horizontal scroll when \> 8 tabs open, pinned tabs support

### **File Tree**

* Indent per level: 16px — folder chevron \+ icon \+ filename pattern

* Active file: $color-primary-muted background, $color-primary-hover text

* Right-click context menu: rename, delete, add decision memory, copy path

# **5\. System Architecture**

## **5.1 High-Level Architecture**

Cortex follows a clean Client → API Server → AI Service → Database pipeline:

| Layer | Technology | Responsibility |
| :---- | :---- | :---- |
| Client (Browser) | React \+ Monaco \+ D3 \+ SCSS | Editor UI, file tree, feature panels, real-time AI response streaming |
| API Gateway | Express.js (Node 20\) | Route handling, auth middleware (Clerk JWT), rate limiting, request queueing |
| AI Service Layer | Gemini 2.0 Flash SDK | Intent analysis, codebase parsing, decision extraction — prompt engineering lives here |
| Database | MongoDB Atlas (Mongoose) | Decision Memory documents, project metadata, user sessions, codebase snapshots |
| File System (Temp) | Node fs \+ multer \+ archiver | Handling uploaded project zips, parsing directory trees, extracting file content for analysis |
| Real-time Layer | Socket.IO | Streaming AI token responses to Monaco editor panels in real-time |
| Auth | Clerk | JWT issuance, OAuth, user identity across sessions |

## **5.2 Frontend Architecture**

### **Folder Structure**

| Path | Contents |
| :---- | :---- |
| src/ | Root of React application |
| src/components/ | Reusable UI atoms and molecules — Button, Modal, Badge, Tag, Tooltip, etc. |
| src/layouts/ | AppShell.jsx — main 3-panel layout (Sidebar | Editor | Feature Panel) |
| src/features/ | Feature-level modules — intent/, explainer/, memory/ — each has its own components, hooks, store slice |
| src/features/intent/ | IntentMode.jsx, IntentSelector.jsx, IntentResultPanel.jsx, useIntentMode.js |
| src/features/explainer/ | CodebaseExplainer.jsx, DependencyGraph.jsx, FlowOverlay.jsx, useExplainer.js |
| src/features/memory/ | DecisionMemory.jsx, MemoryAnnotation.jsx, MemorySearch.jsx, useMemory.js |
| src/editor/ | MonacoWrapper.jsx, EditorTabs.jsx, FileTree.jsx, EditorToolbar.jsx |
| src/store/ | Zustand store slices — editorStore.js, projectStore.js, memoryStore.js, uiStore.js |
| src/api/ | Axios instance \+ service files — intentApi.js, explainerApi.js, memoryApi.js |
| src/hooks/ | Shared custom hooks — useProject.js, useSocket.js, useTheme.js, useDebounce.js |
| src/styles/ | SCSS architecture — \_variables.scss, \_reset.scss, \_typography.scss, \_utilities.scss, main.scss |
| src/styles/components/ | Per-component SCSS — \_button.scss, \_tabs.scss, \_sidebar.scss, \_modal.scss |
| src/pages/ | Route-level pages — Editor.jsx, MemoryVault.jsx, ExplainerView.jsx, Settings.jsx |
| src/utils/ | Helpers — fileParser.js, tokenCounter.js, graphBuilder.js, diffHighlighter.js |
| public/ | Static assets — favicon, fonts, editor themes |

## **5.3 Backend Architecture**

### **Folder Structure**

| Path | Contents |
| :---- | :---- |
| server/ | Root of Express application |
| server/index.js | App entry — Express setup, Socket.IO, CORS, middleware chain |
| server/routes/ | Route definitions — intent.routes.js, explainer.routes.js, memory.routes.js, project.routes.js |
| server/controllers/ | Business logic — IntentController.js, ExplainerController.js, MemoryController.js |
| server/services/ | Service abstractions — GeminiService.js, CodeParserService.js, GraphBuilderService.js |
| server/models/ | Mongoose schemas — DecisionMemory.js, Project.js, CodebaseSnapshot.js |
| server/middleware/ | Auth.js (Clerk JWT), RateLimit.js, ErrorHandler.js, RequestLogger.js |
| server/utils/ | Helpers — fileExtractor.js, promptBuilder.js, tokenEstimator.js |
| server/sockets/ | Socket event handlers — streamHandler.js, intentStream.js |
| .env | GEMINI\_API\_KEY, MONGODB\_URI, CLERK\_SECRET\_KEY, PORT, CLIENT\_URL |

## **5.4 Data Flow — Request Lifecycle**

| Step | What Happens |
| :---- | :---- |
| 1\. User action | User clicks Intent Mode → selects 'Performance' → selects scope (current file) |
| 2\. React fires | useIntentMode hook calls intentApi.analyze({ code, intent, scope, projectId }) |
| 3\. Express receives | POST /api/intent/analyze — Clerk JWT middleware validates, rate limiter checks |
| 4\. Controller | IntentController extracts code payload, calls GeminiService.streamAnalysis() |
| 5\. Gemini SDK | generateContentStream() called with system prompt \+ user code — response streams token by token |
| 6\. Socket.IO | Server emits 'intent:token' events per token — client Socket.IO listener appends to result panel |
| 7\. Stream complete | Server emits 'intent:done' with metadata — client saves diff to Zustand store |
| 8\. User accepts | Client calls PATCH /api/memory/attach to link this refactor to a decision memory entry |

# **6\. Feature Specifications**

## **6.1 Feature 1 — Intent Mode**

### **Overview**

Intent Mode is Cortex's most powerful feature. A developer declares an intent (what they want the code to become), selects a scope (current selection, file, folder, or full project), and Cortex's AI rewrites and annotates the code to fulfill that intent — showing a clear diff, explanation, and confidence score.

### **Intent Types**

| Intent | Color Token | What Cortex Does | Example Output |
| :---- | :---- | :---- | :---- |
| Performance | $color-success (Green) | Identifies bottlenecks, removes unnecessary re-renders, replaces O(n²) with O(n), adds memoization | Wraps heavy computations in useMemo, replaces forEach chains with Map lookups |
| Scalability | $color-primary (Blue) | Decouples modules, moves inline logic to services, separates concerns, adds abstraction layers | Extracts API calls to service layer, adds pagination-ready data structures |
| Security | $color-error (Red) | Finds injection risks, adds input sanitization, identifies exposed secrets, validates data shapes | Adds Joi/Zod validation, escapes HTML, moves secrets to env |
| Readability | $color-accent (Cyan) | Renames vague variables, adds JSDoc comments, splits long functions, adds meaningful constants | Converts 'x' to 'userCount', splits 80-line function into 3 named functions |
| Maintainability | $color-memory (Amber) | Removes duplication, extracts reusable hooks/utilities, adds error boundaries | Creates useLocalStorage hook from 3 duplicated useState patterns |

### **Intent Mode UI Flow**

1. Toolbar button 'Intent Mode' clicked → Intent selector panel slides in from right

2. User selects intent type (radio button with color-coded icon)

3. User selects scope: Selection, Current File, Current Folder, Entire Project

4. Optional: User adds a custom instruction field (e.g., 'Focus on the fetchUsers function only')

5. Click 'Run Intent' → loading state shows AI processing badge with spinner

6. Results stream into a split-pane diff view (left \= original, right \= refactored)

7. Confidence badge shown per suggestion (High / Medium / Low)

8. User can Accept All, Accept Selected, or Reject — with keyboard shortcuts

9. On accept, changes apply to Monaco editor \+ a Decision Memory entry is auto-created

### **Intent Mode — Backend API**

| Endpoint | Method | Body | Response |
| :---- | :---- | :---- | :---- |
| POST /api/intent/analyze | POST | { code, intent, scope, projectId, customInstruction } | Stream of { token, type } events via Socket.IO |
| GET /api/intent/history/:projectId | GET | \- | Array of past intent runs with diffs |
| POST /api/intent/accept | POST | { intentRunId, acceptedDiffs\[\] } | { success, memoryId } |

### **Intent Mode — System Prompt Template**

The GeminiService builds this prompt dynamically based on intent and scope:

* Role: You are a senior software architect specializing in {intent} optimization.

* Input: A code file written in {detectedLanguage}. Project context: {projectContext}.

* Task: Refactor this code for {intent}. Preserve all existing functionality.

* Output format: Return ONLY a JSON object with { refactoredCode, changes\[\], explanation, confidenceScore }.

* Each change in changes\[\] must have: { lineFrom, lineTo, reason, type }.

## **6.2 Feature 2 — Codebase Explainer**

### **Overview**

The Codebase Explainer converts an entire project directory into an interactive visual graph. Developers can see which files import which, how data flows from a user action all the way to the database, and what every major dependency does — without reading a single line of code.

### **Visualization Layers**

| Layer | View Type | What Is Shown |
| :---- | :---- | :---- |
| File Dependency Graph | Force-directed D3 graph | Nodes \= files. Edges \= import/require relationships. Cluster by folder with color coding. |
| Data Flow View | Directed acyclic graph | Traces a specific user action (e.g., 'user clicks login') through components → API call → server route → DB query |
| Dependency Audit | Flat list \+ treemap | All npm packages, their size, last updated, whether they are used, and AI-generated one-line summaries |
| Component Tree | Tree diagram | React component hierarchy — parent/child relationships, which components hold state, which are pure |

### **Explainer UI Flow**

10. User clicks 'Explain Codebase' in toolbar → Explainer view opens as full-screen overlay

11. If project not yet analyzed: upload project as ZIP or point to local folder path

12. Parser runs on backend — extracts all imports, exports, function calls, and component trees

13. AI summarizes each file's purpose in one line — shown as tooltip on hover in the graph

14. User can switch between 4 visualization layers via tab bar at top

15. Clicking any node opens a side panel with: file summary, what it imports, what imports it, key functions

16. Search bar filters the graph — typing a filename highlights it and its direct connections

17. Export button saves the graph as SVG or PDF for documentation/onboarding

### **Explainer — Backend API**

| Endpoint | Method | Body | Response |
| :---- | :---- | :---- | :---- |
| POST /api/explainer/analyze | POST | { projectZip } multipart OR { projectPath } | { snapshotId, fileCount, graphData, summary } |
| GET /api/explainer/:snapshotId/graph | GET | \- | { nodes\[\], edges\[\], clusters\[\] } |
| GET /api/explainer/:snapshotId/flow | GET | query: { entryPoint } | { flowNodes\[\], flowEdges\[\] } |
| GET /api/explainer/:snapshotId/deps | GET | \- | { dependencies\[\], devDependencies\[\], unusedList\[\] } |
| POST /api/explainer/summarize-file | POST | { fileContent, fileName, projectContext } | { summary, keyFunctions\[\], importedBy\[\], imports\[\] } |

### **Graph Node Schema**

* id: Unique file path string

* label: Filename (e.g., UserController.js)

* type: component | route | model | service | utility | config | test

* summary: AI-generated one-line description

* imports: string\[\] — list of files this imports

* importedBy: string\[\] — list of files that import this

* linesOfCode: number

* lastModified: ISO timestamp

## **6.3 Feature 3 — Decision Memory**

### **Overview**

Decision Memory is the feature that makes Cortex truly irreplaceable. Every piece of code can carry a 'memory' — a developer-written annotation explaining WHY it exists, what it prevents, what tradeoff it makes, or what bug it was added to fix. These memories are searchable, timestamped, linkable, and AI-summarizable — creating a living architecture decision record inside your editor.

### **Memory Entry Schema (MongoDB)**

| Field | Type | Description |
| :---- | :---- | :---- |
| \_id | ObjectId | MongoDB document ID |
| projectId | String | Links memory to a project — from Clerk user context |
| filePath | String | Relative file path — e.g., src/features/auth/AuthService.js |
| lineFrom | Number | Start line of the annotated code block |
| lineTo | Number | End line of the annotated code block |
| codeSnapshot | String | The exact code at time of annotation (for diff comparison later) |
| reason | String (required) | The 'why' — what this code does that isn't obvious |
| category | Enum | PERFORMANCE | SECURITY | BUGFIX | SCALABILITY | REFACTOR | EXPERIMENT | TODO |
| tags | String\[\] | Developer-defined tags — \['re-render', 'race-condition', 'api-contract'\] |
| linkedTo | ObjectId\[\] | Other memory entries this decision references or depends on |
| intentRunId | ObjectId (optional) | If created from an Intent Mode run — links to that analysis |
| author | String | Clerk userId — for team memory attribution |
| createdAt | Date | When the memory was created |
| updatedAt | Date | Last edited timestamp |

### **Decision Memory UI Flow**

18. Right-click on any code range in Monaco → context menu shows 'Add Decision Memory'

19. OR: Click the Memory icon in the toolbar → opens Memory Annotation panel

20. A drawer opens from the right with pre-filled file path and line range

21. Developer fills: Reason field (required), Category (dropdown), Tags (comma input), Links (search other memories)

22. Saved memory appears as an amber gutter decoration in Monaco — hover shows preview

23. Memory Vault view: full-screen list/search of all memories in the project

24. Search memories by text, category, tag, date range, file, or author

25. Timeline view: shows all memories in chronological order with code diffs

26. AI Summary: click 'Summarize Decisions' to get a paragraph explaining the most important architectural choices

### **Decision Memory — Backend API**

| Endpoint | Method | Body | Response |
| :---- | :---- | :---- | :---- |
| POST /api/memory | POST | Full memory schema object | { memory, \_id } |
| GET /api/memory/:projectId | GET | query: { file, category, tag, search } | { memories\[\], count } |
| PATCH /api/memory/:id | PATCH | Partial memory object | { updated memory } |
| DELETE /api/memory/:id | DELETE | \- | { success } |
| POST /api/memory/summarize | POST | { projectId, filters } | { aiSummary, keyDecisions\[\] } |
| GET /api/memory/timeline/:projectId | GET | \- | { memories\[\] sorted by createdAt } |

### **Gutter Decoration in Monaco**

* Monaco Editor API: editor.deltaDecorations() — adds colored left-border gutter marks

* Amber color (\#F59E0B) — consistent with $color-memory SCSS token

* Hover over gutter mark → shows memory preview tooltip (reason \+ category badge)

* Click gutter mark → opens full memory in right panel

* Multiple memories on same file: stacked gutter marks, click opens all in sidebar

# **7\. UI / UX Layout**

## **7.1 App Shell Layout**

Cortex uses a classic 3-panel IDE layout with a right feature panel for AI output:

| Panel | Width | Content | Resizable? |
| :---- | :---- | :---- | :---- |
| Activity Bar (leftmost) | 48px fixed | Icon nav — File Tree, Search, Memory Vault, Settings, User Avatar | No |
| Sidebar | 240px default | File tree, project switcher, git status indicators | Yes (min 160px, max 400px) |
| Editor Area | Flexible (fills remaining) | Monaco Editor, tab strip, breadcrumb, toolbar row | Yes |
| Feature Panel (right) | 380px default | Intent Mode result, Memory annotation, Explainer detail — slides in on activation | Yes (min 300px, max 600px) |
| Bottom Panel | 200px default, collapsible | Terminal, AI logs, console output | Yes (min 120px, max 50%) |

## **7.2 Toolbar Design**

The editor toolbar sits between the tab strip and the Monaco canvas. It contains 5 zones:

* Left: Breadcrumb (project \> folder \> file \> function)

* Center-Left: Language badge, line:col indicator, encoding

* Center: Three Feature CTA buttons — Intent Mode, Explain Codebase, Add Memory — always visible, color-coded

* Center-Right: Format Document, Toggle Word Wrap, Minimap toggle

* Right: Collaboration indicator (future), Settings gear, User avatar

## **7.3 Keyboard Shortcuts**

| Action | Shortcut (Mac) | Shortcut (Win/Linux) |
| :---- | :---- | :---- |
| Open Intent Mode | Cmd \+ Shift \+ I | Ctrl \+ Shift \+ I |
| Open Codebase Explainer | Cmd \+ Shift \+ E | Ctrl \+ Shift \+ E |
| Add Decision Memory | Cmd \+ Shift \+ M | Ctrl \+ Shift \+ M |
| Open Memory Vault | Cmd \+ Shift \+ V | Ctrl \+ Shift \+ V |
| Run Intent (after selection) | Cmd \+ Enter | Ctrl \+ Enter |
| Accept All Suggestions | Cmd \+ Shift \+ A | Ctrl \+ Shift \+ A |
| Reject All Suggestions | Escape | Escape |
| Toggle Feature Panel | Cmd \+ B (right) | Ctrl \+ B (right) |
| Switch Editor Tabs | Cmd \+ \[1-9\] | Ctrl \+ \[1-9\] |

# **8\. Scalability & Architecture Decisions**

## **8.1 AI Rate Limiting Strategy**

Gemini Flash free tier gives 15 RPM and 1,500 RPD. Cortex handles this gracefully:

* Request queue: Bull (Redis-backed) queues AI requests — no dropped requests, shows position in queue

* Token estimation: Before each AI call, estimate token count — warn user if \> 50K tokens (large codebase)

* Scope limiting: Codebase Explainer never sends more than 20 files per batch — splits large projects

* Response caching: Redis caches Explainer results for 24 hours per project hash — avoid duplicate analysis

* Fallback: If Gemini rate limit hit, switch to Groq Llama 3.3 70B automatically

## **8.2 MongoDB Index Strategy**

| Collection | Index | Reason |
| :---- | :---- | :---- |
| DecisionMemory | { projectId: 1, filePath: 1 } | Fast lookup of all memories for a file |
| DecisionMemory | { projectId: 1, category: 1 } | Filter memories by category in vault |
| DecisionMemory | { projectId: 1, createdAt: \-1 } | Timeline view — latest first |
| DecisionMemory | { tags: 1 } | Tag-based search |
| CodebaseSnapshot | { projectId: 1, createdAt: \-1 } | Latest snapshot fast lookup |
| Project | { clerkUserId: 1 } | User's project list |

## **8.3 Future Scalability Path**

| Phase | Upgrade | Trigger |
| :---- | :---- | :---- |
| Phase 1 (MVP) | Gemini free tier, MongoDB Atlas free, Clerk free | 0–100 users |
| Phase 2 (Growth) | Gemini paid tier, Redis caching, MongoDB M10 cluster | 100–1,000 users |
| Phase 3 (Scale) | Multiple AI provider routing, horizontal Express scaling, CDN for graph assets | 1,000–10,000 users |
| Phase 4 (Product) | Team workspaces, shared Memory Vault, Electron desktop app, VS Code extension | 10,000+ users |

# **9\. Development Phases**

## **Phase 1 — Foundation (Week 1–2)**

27. Initialize MERN project: Vite \+ React, Express server, MongoDB Atlas connection, Clerk auth

28. Build Monaco Editor wrapper — file tree integration, tab management, SCSS theming

29. Implement SCSS design system — all tokens, base components: Button, Badge, Tag, Modal

30. Build App Shell layout — Activity Bar, Sidebar, Editor Area, Feature Panel, Bottom Panel

31. Create project management — create/open/switch projects, persist file tree to MongoDB

## **Phase 2 — Decision Memory (Week 3–4)**

32. Build DecisionMemory Mongoose model \+ all CRUD API endpoints

33. Integrate Monaco gutter decorations for memory display

34. Build Memory Annotation drawer UI — form with all fields, tag input, category selector

35. Build Memory Vault page — list, search, filter, timeline view

36. Add AI Summarize endpoint — generates architectural summary from a project's memories

## **Phase 3 — Intent Mode (Week 5–6)**

37. Build GeminiService with streaming support \+ Socket.IO stream relay

38. Implement Intent Mode panel — intent selector, scope selector, custom instructions

39. Build diff viewer — split-pane view, accept/reject per change

40. Add rate limiting middleware — queue, Groq fallback, user feedback on wait

41. Auto-create Decision Memory from Intent Mode accepted changes

## **Phase 4 — Codebase Explainer (Week 7–8)**

42. Build CodeParserService — extract imports/exports from JS/TS/JSX files using AST (acorn \+ estree-walker)

43. Build GraphBuilderService — convert parsed data to D3 node/edge format

44. Build Explainer page — D3 force-directed graph with hover, search, filter

45. Add data flow tracer — given an entry point, trace execution path through graph

46. Add dependency audit view — treemap \+ AI-generated package summaries

47. Add export to SVG/PDF functionality

## **Phase 5 — Polish & Launch (Week 9–10)**

48. Responsive design audit — ensure usable at 1280px, 1440px, 1920px widths

49. Keyboard shortcut system — all shortcuts implemented and shown in Command Palette

50. Error handling — every AI call has graceful fallback, user-visible error states

51. Loading skeleton states — every async action shows skeleton loaders, not spinners alone

52. Performance audit — Monaco lazy-loaded, D3 graph virtualized, large files chunked

53. Deploy — Frontend on Vercel, Backend on Railway, DB on MongoDB Atlas

# **10\. Environment & Deployment**

## **10.1 Environment Variables**

| Variable | Service | Where Used |
| :---- | :---- | :---- |
| GEMINI\_API\_KEY | Google AI Studio (free) | GeminiService — all AI calls |
| GROQ\_API\_KEY | Groq Cloud (free) | Fallback AI service |
| MONGODB\_URI | MongoDB Atlas (free M0) | Mongoose connection string |
| CLERK\_SECRET\_KEY | Clerk (free tier) | Server-side JWT verification |
| VITE\_CLERK\_PUBLISHABLE\_KEY | Clerk (free tier) | Frontend auth initialization |
| REDIS\_URL | Upstash Redis (free) | Request queuing, response caching (Phase 2\) |
| PORT | 3001 (default) | Express server port |
| CLIENT\_URL | http://localhost:5173 | CORS whitelist |

## **10.2 Deployment Stack**

| Service | Platform | Cost |
| :---- | :---- | :---- |
| Frontend (React) | Vercel — Hobby plan | Free |
| Backend (Express) | Railway — Dev plan | Free $5 credit/month |
| Database (MongoDB) | MongoDB Atlas M0 | Free 512MB |
| Auth (Clerk) | Clerk Free | Free up to 10,000 MAU |
| AI (Gemini) | Google AI Studio | Free 1M tokens/day |
| AI Fallback (Groq) | Groq Cloud | Free tier 14,400 req/day |
| Redis (optional) | Upstash Redis | Free 10K commands/day |

Total MVP Cost: $0/month until meaningful scale.

# **11\. Success Metrics**

| Metric | MVP Target | 6-Month Target |
| :---- | :---- | :---- |
| Decision Memories Created / User / Week | \> 5 | \> 20 |
| Intent Mode Runs / Week (total) | \> 50 | \> 500 |
| Codebase Explainer Views / Week | \> 20 | \> 200 |
| AI Response Time (first token) | \< 1.5s | \< 0.8s |
| Intent Suggestion Acceptance Rate | \> 60% | \> 75% |
| Memory Search Satisfaction (qualitative) | Positive | Highly positive |
| Monthly Active Users | 50 | 1,000 |

# **12\. Risks & Mitigations**

| Risk | Probability | Impact | Mitigation |
| :---- | :---- | :---- | :---- |
| Gemini free tier rate limits hit during peak | High | High | Groq fallback \+ request queue \+ user wait indicator |
| Monaco Editor performance on very large files (10K+ lines) | Medium | Medium | Lazy load sections, disable heavy features on large files, show warning |
| AST parsing fails on unusual JS patterns | Medium | Medium | Fallback to regex-based import parsing, skip unparseable files gracefully |
| User uploads huge project ZIP (100MB+) | Low | High | 10MB upload limit \+ warn user to select specific folders, not entire repo |
| Decision Memory search performance degrades at scale | Low | Medium | Full-text index on MongoDB, pagination, Redis cache for common queries |
| Gemini API changes or deprecates free tier | Low | High | Provider-agnostic service layer — swap Gemini for any provider in one file |

# **13\. Competitive Analysis**

| Feature | Cortex | GitHub Copilot | Cursor | VS Code \+ Extensions |
| :---- | :---- | :---- | :---- | :---- |
| Intent-driven optimization | ✅ Core feature | ❌ | ⚠️ Partial (Composer) | ❌ |
| Visual codebase graph | ✅ Built-in | ❌ | ❌ | ⚠️ Via extensions only |
| Decision Memory / ADR | ✅ Core feature | ❌ | ❌ | ❌ |
| Free tier AI | ✅ Generous | ❌ Paid only | ❌ Paid only | ⚠️ Copilot needed |
| Browser-based | ✅ Web app | ❌ | ❌ Desktop only | ❌ Desktop only |
| MERN-first experience | ✅ Designed for it | ⚠️ Generic | ⚠️ Generic | ⚠️ Generic |
| Streaming AI responses | ✅ | ✅ | ✅ | ⚠️ Varies |

*— End of Document —*  
Cortex PRD v1.0  •  Shivam Garade  •  2026

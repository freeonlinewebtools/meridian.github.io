# Meridian — AI Codebase Guide

Meridian is an Australian HSC/school study tracker for Year 11–12 students. It's a **single-page application** built with vanilla JS, no framework, no build step, deployed on GitHub Pages.

---

## File Map

```
meridian.github.io/
├── index.html        # Minimal shell (51 lines) — SPA root, Firebase config, PDF.js import
├── app.js            # ~6,300 lines — ALL application logic
├── styles.css        # ~5,900 lines — ALL styling
└── papers/
    ├── index.json    # Metadata array for all PDF study materials
    └── *.pdf         # Practice exams, worksheets, assessments
```

That's it. No package.json, no build tool, no framework.

---

## State Model

One global object `S` holds all runtime state:

```js
S = {
  data: {},           // Persisted account: {name, pin, year, subjects, sessions, tests, timetable, ...}
  view: 'dashboard',  // Active page — see navigation section
  modal: null,        // Active modal type string or null
  sessions: [],       // Study logs (alias into S.data.sessions)
  tests: [],          // Test scores
  timetable: [],      // Weekly schedule entries
  darkMode: bool,
  pomodoroBreak: bool,
  timerBg: 'forest'|'cafe'|'ocean'|'none',
  lbData: [],         // Cached leaderboard entries
  papersData: {},     // {local, thsc, hsc} paper cache
  // + many UI filter/flag fields
}
```

**Persistence layers (in priority order):**
1. `localStorage['mer_v4']` — primary, always used
2. Firebase Firestore — optional cloud backup, cross-device restore
3. JSONBin API — optional secondary sync endpoint

Other localStorage keys: `mer_sync`, `mer_authed`, `mer_teams`, `mer_dark`, `mer_timer_bg`, `mer_timer_audio`, `mer_timer_font`

---

## Navigation & Rendering

```
render() → navTo(view) → renderLogin() | renderDash() | renderTimer() | etc.
                                      ↓
                                   attach()   ← global event delegation
```

- `render()` — decides login vs. shell
- `renderShell()` — draws sidebar + topbar + bottom nav + injects current view
- `navTo(view)` — updates `S.view`, calls the matching `render*()` function
- `attach()` — wires all `[data-action="..."]` click targets and touch/keyboard handlers

**Valid view values:**
`dashboard`, `timer`, `history`, `stats`, `progress`, `papers`, `assess`, `todo`, `settings`, `leaderboard`, `timetable`

---

## app.js Layout (by line range)

| Lines | Content |
|-------|---------|
| 1–180 | Constants — subject modules, confidence scales, pomodoro presets, exam dates |
| 181–330 | Utilities — date formatting, ICS calendar parsing, session analytics |
| 298–430 | Study Intelligence — spaced repetition, interleaving, score prediction |
| 255–265 | Data I/O — `loadLocal()`, `saveLocal()`, `migrateData()`, `newAccount()` |
| 678–960 | Cloud sync — JSONBin, Firebase, leaderboard, teams |
| 963–1307 | Timer & Pomodoro — start/pause/reset, ambient backgrounds (forest/cafe/ocean SVG) |
| 1384–1437 | State initialisation — `S` object definition |
| 1591–1816 | Auth — `renderLogin()`, `renderRegister()`, Firebase Google OAuth |
| 1838–5000 | View renderers — one `render*()` function per page |
| 5000–6000 | Modal renderers — `renderLogModal()`, `renderAddSubjModal()`, etc. |
| 6002–6176 | `attach()` — event delegation, keyboard shortcuts, swipe handlers |
| 6230–6284 | Init — dark mode, auto-login, Firebase redirect, leaderboard cache |

---

## CSS Architecture

### Theme (CSS variables, top of styles.css)

```css
/* Light mode */
--bg, --srf        /* page background, surface/card */
--tx, --tx2, --tx3 /* text: primary, secondary, muted */
--bd               /* border colour */
--acc              /* accent orange #C05A30 */
--ok, --warn, --err /* status colours */
--sh, --shM, --shL  /* shadow levels */

/* 8 subject colour palettes */
--c0-bg … --c7-bg  /* background chip colours for subjects */
```

Dark mode overrides all variables under `body.dark { ... }`.

### Major Component Classes

| Class | What it is |
|-------|-----------|
| `.topbar` | Fixed top header bar |
| `.bnav` | Bottom navigation (mobile) |
| `.side` | Left sidebar with subject list |
| `.content` | Main scrollable content area |
| `.card` | Generic card with hover shadow |
| `.modal` | Swipe-dismissible overlay panel |
| `.fab` | Floating action button (log session) |
| `.streak-card` | Animated SVG ring streak tracker |
| `.live-card` | Real-time timetable status |
| `.stile` | Small 3-col stat tile grid |
| `.cov-card` | Topic coverage progress bar |
| `.qa-btn` | Quick-action button strip |
| `.toast` / `.flash` | Notification toasts |
| `.auth-card` | Login/register form wrapper |
| `.lb-*` | Leaderboard-specific components |

### Responsive Breakpoint

Single breakpoint at `640px`. Desktop-only elements use `.dsk`, mobile-only use `.mob`.

### Fonts (Google Fonts CDN)

Cormorant, DM Sans, DM Mono, Space Mono, Playfair Display, Outfit, JetBrains Mono

---

## Key Functions Reference

### Data
- `loadLocal()` / `saveLocal()` — read/write `localStorage['mer_v4']`
- `migrateData(d)` — upgrades old schema to current
- `exportCode()` / `importCode(str)` — base64 JSON account backup
- `newAccount()` — returns default account object

### Analytics / Intelligence
- `getStreak(sessions)` — current study streak in days
- `getReviewTopics(sessions)` — spaced repetition: topics due for review
- `getInterleaveSuggestion(sessions)` — detect subject blocking
- `predictNextScore(subject, tests)` — weighted score prediction
- `getSubjectTrends(sessions)` — 2-week rolling trend comparison
- `isRisk()` — true if no study logged by 5pm today

### Sync
- `syncPush()` / `syncPull()` — JSONBin cloud sync
- `saveUserData(uid, data)` / `loadUserData(uid)` — Firebase Firestore
- `lbPush(entry)` / `lbFetchAll()` — leaderboard read/write

### Timer
- `startTimer()` / `pauseTimer()` / `resetTimer()` — Pomodoro control
- `Ambient._renderForestBg()` / `_renderCafeBg()` / `_renderOceanBg()` — procedural SVG backgrounds

### Rendering
- `render()` — top-level entry point, always call this to refresh UI
- `navTo(view)` — navigate to a page
- `renderShell()` — full layout scaffold
- `renderDash()`, `renderTimer()`, `renderHistory()`, `renderStats()`, `renderProgress()`, `renderPapers()`, `renderAssess()`, `renderTodo()`, `renderSettings()`, `renderLeaderboard()`, `renderTimetable()` — one per page
- `renderLogModal()` — log a study session
- `attach()` — must be called after any DOM render to wire events

---

## Event System

All interactive elements use `data-action="actionName"` attributes. `attach()` sets up a single delegated listener on `document` that calls `A[action](btn, event)` where `A` is the actions object.

**Keyboard shortcuts** (wired in `attach()`):
- `L` → open log modal
- `T` → timer view
- `D` → dashboard
- `P` → progress
- `H` → history
- `F` → focus/timer
- `Escape` → close modal or menu

**Touch** — swipe-to-dismiss on modals and side menu, velocity-based physics.

---

## Subject System

Subjects are defined in `SUBJECT_MODULES` (top of app.js). Each entry has:
- Display name
- Module list (for HSC curriculum)
- Inquiry questions per module
- Topic list for coverage tracking

The 8-slot colour palette (`--c0` through `--c7`) is assigned per subject added by the user.

---

## papers/index.json Schema

```json
[
  {
    "file": "filename.pdf",
    "title": "Human-readable title",
    "subject": "Maths Ext 1",
    "unit": "Yr 11/12",
    "year": "2026",
    "type": "Practice Questions | Assessment Task | Worksheet | ...",
    "topics": ["Topic name", ...]
  }
]
```

Add a new PDF by dropping it in `papers/` and adding an entry here.

---

## Third-Party Dependencies (CDN only)

| Library | Version | Purpose |
|---------|---------|---------|
| PDF.js | 4.4.168 | Render PDF thumbnails in papers library |
| Google Fonts | — | Typography |
| Firebase Auth | v10.12.0 | Google OAuth sign-in |
| Firebase Firestore | v10.12.0 | Cross-device data sync |
| JSONBin API | — | Optional secondary cloud sync |

Firebase config is embedded in `index.html`.

---

## Common Tasks

**Add a new page/view:**
1. Add view name string to `navTo()` switch
2. Create `renderMyPage()` function in app.js
3. Add nav item in `renderShell()` sidebar/bottom nav
4. Add keyboard shortcut in `attach()` if needed

**Add a new subject:**
Add entry to `SUBJECT_MODULES` constant at the top of app.js following the existing shape.

**Add a practice paper:**
Drop PDF into `papers/`, add metadata object to `papers/index.json`.

**Change the accent color:**
Update `--acc` in the `:root` block in styles.css.

**Add a new CSS component:**
Add to styles.css. Follow existing naming: short lowercase hyphenated classes. Use existing CSS variables for colors/shadows, never hardcode hex in components.

---

## What NOT to do

- Don't add a framework, bundler, or build step — intentionally avoided.
- Don't split app.js into modules — the single-file constraint is deliberate (GitHub Pages, no build).
- Don't use `innerHTML` with unsanitized user data — XSS risk.
- Don't hardcode colours in component CSS — always use `--var` tokens.
- Don't call `attach()` inside a render function that is itself called by `renderShell()` without checking for double-binding.

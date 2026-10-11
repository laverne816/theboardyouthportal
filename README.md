# THE BOARD — South African Youth Opportunities Portal
> *"Your future, pinned."*

A verified, bold, neo-brutalist youth opportunities portal built for young South Africans seeking verified jobs, learnerships, internships, bursaries, courses, and career events.

---

## 🎨 Creative Concept & Design System
- **Bold Swiss-Editorial meets Pop-Art Bulletin Board**: Massive typography, chunky 2.5–3.5px black borders, offset card drop-shadows, pushpins, and intentional colour blocks.
- **Colour carries meaning**:
  - 🔵 **Jobs**: Soft Sky (`#BAE6FD` / `#0284C7`)
  - 🟡 **Learnerships**: Electric Yellow (`#FEF08A` / `#CA8A04`)
  - 🟢 **Internships**: Fresh Mint (`#BBF7D0` / `#16A34A`)
  - 🔴 **Bursaries**: Coral Rose (`#FECDD3` / `#E11D48`)
  - 🟣 **Courses**: Lilac Purple (`#E9D5FF` / `#9333EA`)
  - 🟠 **Events**: Tangerine Orange (`#FED7AA` / `#EA580C`)
- **Pinned Micro-Interactions**:
  - Tactile audio synthesiser (zero external MP3 assets, powered by native Web Audio API).
  - Pin drop physics animation when saving an opportunity.
  - Live ticking deadline countdowns with "Closing Soon" fire indicators.
  - Interactive tickable Application Checklist saved per opportunity to `localStorage`.
- **"Night Board" Mode**: High-contrast dark charcoal mode with neon yellow and emerald highlights.

---

## 🧩 Features & Architecture

### 1. Home Page — "The Board"
- **Hero**: Massive poster headline (`YOUR FUTURE, PINNED.`), verified badge, and prominent rounded search bar with chunky submit button.
- **Featured Bulletin**: Pinned opportunities featuring physical bulletin rotations (-1.5° to +2°).
- **Opportunity Tracks**: 6 large interactive category blocks with live opening counts.
- **Interactive South Africa Map**: Vector SVG map of all 9 provinces with metro hubs (Johannesburg, Cape Town, Durban, Pretoria, Gqeberha, Bloemfontein, Polokwane) and instant regional filtering.
- **Upcoming Deadlines**: Real-time ticking countdown timers.
- **Career Readiness Teasers**: Instant links to the toolkit.
- **Pinned Scam Warning Notice**: High-visibility safety notice warning against fraudulent recruitment fees.

### 2. Opportunities Page — "The Wall"
- Dynamic search across titles, organisations, locations, and tags.
- Multi-select category chips that "pop" when selected.
- Province and experience level filters (Beginner, Intermediate, Advanced).
- Quick deadline toggles (Closing This Week, This Month, All).
- Sorting by Closing Soonest, Recently Added, or Alphabetical.
- Empty search state with reset filter action.

### 3. Opportunity Details — "The Pinned Poster"
- Large poster header with pushpin anchor.
- Live countdown timer with < 7 days closing soon indicator.
- Eligibility requirements & minimum qualifications checklists.
- Interactive document readiness checklist (persisted to device storage).
- Step-by-step numbered application instructions.
- Safe application redirect with recruitment fraud warning modal.
- Web Share API integration with clipboard copy fallback.

### 4. Career Resources — "The Toolkit"
6 expandable tactical guides:
1. **"YOUR CV, SORTED"**: South African 2-page format, ATS optimization, and copyable professional summary template.
2. **"OWN THE INTERVIEW"**: STAR framework breakdown and top questions to ask the panel.
3. **"BUILD YOUR PROFILE"**: LinkedIn & SAYouth.mobi optimization for recruiters.
4. **"WRITE A COVER LETTER THAT WORKS"**: 3-paragraph punchy structure.
5. **"SPOT THE SCAM"**: Identifying PEP Paxi fees, eWallet scams, and fake hospital ads.
6. **"GET YOUR DOCS READY"**: Free SAPS certification rules, mobile PDF scanning, and digital bank confirmation letters.

### 5. Interactive Application Tracker — "My Board"
- Full Kanban workflow board:
  - 📌 Pinned (Watching)
  - ✍️ In Progress (Preparing Docs)
  - 🚀 Submitted (Application Sent)
  - 🎯 Interviewing / Assessment
  - 🎉 Offered / Accepted!
- Add personal candidate notes per listing and track application velocity.

### 6. Contact & Report — "Pin a Note"
Four validated forms:
1. General enquiry — "SEND US A MESSAGE"
2. Report incorrect/expired info — "REPORT OUTDATED INFO"
3. Suggest a new opportunity — "SUGGEST AN OPPORTUNITY"
4. Platform feedback — "GIVE FEEDBACK"

### 7. Spot the Scam 60s Quiz
- Interactive gamified simulation testing candidates on common South African job fraud scenarios (PEP Paxi deposits, OTP requests, and domain authentication).

---

## 🛠️ Technology Stack
- **Structure**: HTML5 (Semantic elements, accessibility & forms)
- **Styling**: CSS3 (Responsive Grid, Flexbox, custom properties, neo-brutalist theme)
- **Icons & Visuals**: Vector SVGs & Accessible UI Badges
- **Audio & Interactivity**: Native Web Audio API synthesizer
- **Fonts**: Space Grotesk, Bricolage Grotesque, Plus Jakarta Sans

---

## ♿ Accessibility Compliance
- Tested contrast ratios exceeding WCAG AA.
- Full keyboard navigation and visible outline rings.
- Respects `prefers-reduced-motion` media queries.
- Clean semantic HTML structure (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`).

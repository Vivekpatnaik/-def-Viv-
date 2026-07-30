# CAREEROS AI - UX & DESIGN SYSTEM BIBLE
## Master Design & Usability Specification (V1.0)
### Designed by: Principal Product Designer (Apple), Principal UX Designer (Linear), & Principal Interaction Designer (Notion)

---

## CONSTITUTIONAL ADOPTION & PREMIUM EXPERIENCE STATEMENT
*This UX and Design System Bible has been meticulously engineered for CareerOS AI. Inspired by the usability philosophies of Apple (refined physical elegance), Linear (unparalleled keyboard-driven speed and focus), and Notion (contextual and simple blocks), the design has a single purpose: **increasing the user's probability of getting hired** by reducing cognitive fatigue, streamlining work pipelines, and offering a premium experience. In strict accordance with the Master Prompt 04 guidelines, this document defines visual rules, layouts, components, animation curves, accessibility targets, and tokens logically without writing application code.*

---

## SECTION 1: DESIGN PHILOSOPHY & VISUAL STYLE

### 1.1 Core Usability Tenets
1.  **Less Clicks, More Clarity:** If a task takes more than three clicks to execute from the home workspace, the layout must be consolidated.
2.  **One Primary Action Per Screen:** Avoid "action paralysis" by highlighting exactly one premium colored button per view. Secondary operations must use soft borders or trigger inline elements.
3.  **Low Cognitive Load:** Complex data (such as ATS keyword gaps or code syntax errors) must be formatted into clean, visual micro-cards rather than raw terminal output.
4.  **Priority of Usability:** Zero decorative gradients, heavy glassmorphism, or infinite animations that degrade system speed or distract from the single mission.

---

## SECTION 2: GLOBAL DESIGN TOKENS

### 2.1 Color Token System (Dual Mode Contrast)

To guarantee readability and maintain accessibility contrast ratios (WCAG AA minimum of 4.5:1, target WCAG AAA 7:1), light and dark color modes are strictly mapped below.

| Category | Token Name | Light Mode Hex | Dark Mode Hex | Usage / Application |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas** | `color-bg-base` | `#F9FAFB` (Off-white) | `#0B0F19` (Slate Night) | Main viewport background |
| **Surface** | `color-bg-surface` | `#FFFFFF` (Pure white) | `#161B26` (Muted Steel) | Cards, Modals, Dropdowns, Sidebars |
| **Brand** | `color-brand` | `#0066FF` (Apple Blue) | `#2F80ED` (Linear Blue) | Primary button, focus rings, progress |
| **Success** | `color-success` | `#10B981` (Emerald) | `#34D399` (Mint Green) | Passed tests, ready badges, verified stats |
| **Warning** | `color-warning` | `#F59E0B` (Amber) | `#FBBF24` (Soft Gold) | Missing ATS keywords, pending reviews |
| **Danger** | `color-danger` | `#EF4444` (Coral Red) | `#F87171` (Crimson) | Code failures, urgent errors, limits |
| **Text Primary** | `color-text-primary` | `#111827` (Deep Ink) | `#F3F4F6` (Snow Gray) | Main headers, body copy |
| **Text Secondary** | `color-text-secondary` | `#4B5563` (Charcoal) | `#9CA3AF` (Muted Silver) | Subheadings, descriptions, metadata |
| **Border Base** | `color-border-base`| `#E5E7EB` (Soft Gray) | `#2D3748` (Slate Gray) | Layout separators, card borders |

---

### 2.2 Responsive Typography Scale

*   **Primary Typeface:** Modern Sans-Serif system font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`).
*   **Monospace Typeface:** Clean, proportional monospace (`"SF Mono", Menlo, Monaco, Consolas, monospace`) applied strictly for code editors, inline tags, and analytics numbers.

| Level | Token | Font Size (Desktop) | Font Size (Mobile) | Line Height | Weight |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title**| `text-hero` | `3.5rem` (56px) | `2.5rem` (40px) | `1.15` | `800` (Bold) |
| **Title H1** | `text-h1` | `2.25rem` (36px) | `1.75rem` (28px) | `1.2` | `700` (Bold) |
| **Header H2** | `text-h2` | `1.5rem` (24px) | `1.25rem` (20px) | `1.25` | `600` (Semibold) |
| **Header H3** | `text-h3` | `1.25rem` (20px) | `1.125rem` (18px) | `1.3` | `600` (Semibold) |
| **Body Primary**| `text-body-p` | `1rem` (16px) | `0.9375rem` (15px) | `1.5` | `400` (Regular) |
| **Body Secondary**| `text-body-s` | `0.875rem` (14px) | `0.8125rem` (13px) | `1.5` | `400` (Regular) |
| **Caption** | `text-caption` | `0.75rem` (12px) | `0.75rem` (12px) | `1.4` | `500` (Medium) |

---

### 2.3 Grid & Spacing System (8px Increment Matrix)

All spacing, margins, paddings, and element widths are mapped strictly as multiples of **8px** to guarantee perfect geometric visual balance.

```
+────────────────────────────────────────────────────────────+
|                      SCREEN CONTAINER                      |
|                                                            |
|  +──────────────────────────────────────────────────────+  |
|  |                    GRID ROW (8px x N)                |  |
|  |                                                      |  |
|  |  +────────────────────+      +────────────────────+  |  |
|  |  |   CARD (Radius 8px)  |      |   CARD (Radius 8px)  |  |  |
|  |  |   Padding: 24px    |      |   Padding: 24px    |  |  |
|  |  |                    |      |                    |  |  |
|  |  |   Gap: 16px (2x8px)├──────┤                    |  |  |
|  |  +────────────────────+      +────────────────────+  |  |
|  +──────────────────────────────────────────────────────+  |
+────────────────────────────────────────────────────────────+
```

*   **System Scale Tokens:**
    *   `spacing-1` (4px): Micro offsets, badge internal padding, custom elements.
    *   `spacing-2` (8px): Element gaps, label-to-input padding.
    *   `spacing-3` (12px): Standard inner margins for cards and components.
    *   `spacing-4` (16px): Grid card gaps, list item separations, responsive paddings.
    *   `spacing-6` (24px): Standard page content layout padding, modal internal space.
    *   `spacing-8` (32px): Deep vertical separations, sections, and empty states.
*   **Border Radius Tokens:**
    *   `radius-sm` (4px): Small badges, tooltips, tags, checkboxes.
    *   `radius-md` (8px): Dynamic inputs, select items, buttons, small cards.
    *   `radius-lg` (12px): Large content cards, charts containers, dialog overlays.
    *   `radius-xl` (16px): Interactive modal frames, premium floating interfaces.

---

### 2.4 Shadows & Elevation Tokens

*   `shadow-sm`: `0 1px 2px rgba(0,0,0,0.05)` (applied strictly to inputs and flat action buttons).
*   `shadow-md`: `0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.02)` (standard page layout cards, select elements).
*   `shadow-lg`: `0 10px 15px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.03)` (modals, dropdown lists, tooltips).

---

### 2.5 Motion & Animation Curves

*   `transition-speed-fast`: `150ms` (hover states, focus highlights, icon rotations).
*   `transition-speed-normal`: `250ms` (sidebar expansions, dialog entry frames, tab changes).
*   `transition-ease-in-out`: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth, natural deceleration curves).

---

## SECTION 3: COMPONENT LIBRARY UX SPECIFICATIONS

Every component designed for CareerOS AI must follow these detailed specifications to ensure usability and accessibility.

### 3.1 Buttons
*   **Variants:** Primary (Brand fill), Secondary (Border stroke, transparent background), Ghost (Flat text, background visible on hover only).
*   **Interactions:** Hover (+5% lightness), Focus (Outer 2px ring matching brand color, 2px inner white border), Active (-5% lightness, minor pressed offset).
*   **Accessibility:** Buttons must be accessible using `Tab` and `Enter` keys, and maintain an aria-label if utilizing an icon only.

### 3.2 Form Inputs & Autocomplete Selects
*   **Variants:** Standard Input, Interactive Autocomplete, Multi-select dropdown.
*   **UX Rules:** Text labels must remain visible above inputs (never using placeholders as labels). Display helper text and validation states clearly beneath inputs.
*   **Accessibility:** Group inputs with descriptive labels using `htmlFor`. Focus rings must wrap inputs cleanly, with errors highlighted in danger red with descriptive error icons.

### 3.3 Dialog Modals & Interactive Drawers
*   **Variants:** Centered Dialog Modals, Right-hand slider Drawers.
*   **UX Rules:** Modals must dim the background viewport with a soft, semi-transparent dark overlay. Provide a clear "Close" (X) button in the top-right corner.
*   **Accessibility:** Set focus strictly inside active modals. Escape key must dismiss the modal, and the background page elements must be aria-hidden.

### 3.4 Progress Trackers & Circular Score Indicators
*   **Variants:** Horizontal milestone progress bars, Circular percentage gauges.
*   **UX Rules:** Always display numerical value percentages alongside tracking charts. Use color indicators (0-49% Danger Red, 50-79% Warning Amber, 80-100% Success Green) to help candidates quickly gauge their readiness.

---

## SECTION 4: STATE SPECIFICATIONS & SYSTEM DYNAMICS

CareerOS AI avoids blank screens. Every page or dynamic module transition must follow these detailed states:

```
[Trigger Action]
       │
       ▼
[Loading / Skeleton State] (Shimmering shapes, LCP optimized)
       │
       ├─────────────────────────┼─────────────────────────┐
       ▼                         ▼                         ▼
[Success State]            [Empty State]             [Error State]
(Confirm animation,        (Clear guide,             (Explain reason,
 next recommended action)   primary action,           retry button,
                            secondary action)         support link)
```

---

### 4.1 Skeleton/Loading State
*   **Specification:** Skeletons must mimic the exact layout cards they are loading to prevent Content Layout Shift (CLS < 0.05). Use soft gray blocks that pulse smoothly (80% opacity to 30% opacity, 1.5s loop).

### 4.2 Empty State
*   **Specification:** Empty workspaces (such as a fresh application board or brand new project workspace) must contain:
    1.  An elegant, muted illustration or icon demonstrating the area's purpose.
    2.  A clear, actionable header (e.g., "No verified projects yet").
    3.  A short description explaining the feature's value ("Verified projects increase your recruiter response rates by 85%").
    4.  Exactly one primary CTA button to start the workflow ("Analyze GitHub Project").

### 4.3 Error State (Graceful Fallback)
*   **Specification:** Avoid cryptic technical logs (like "Connection closed, error 500"). Instead, display:
    1.  An understandable reason ("We are unable to connect to our code analysis engine").
    2.  A clear recovery action ("Verify your repository URL is public").
    3.  An immediate, prominent action button ("Retry Analysis").
    4.  A secondary contact link ("Message Support").

### 4.4 Success State & Confirmations
*   **Specification:** Form completions, file uploads, and milestone achievements must trigger a smooth, reassuring confirmation:
    1.  A green success badge with a soft checkmark animation.
    2.  Clear confirmation text ("Resume successfully analyzed!").
    3.  A temporary, one-click "Undo" button where appropriate.
    4.  A prominent next-step button ("View ATS Match Score") to keep the candidate moving forward.

---

## SECTION 5: CORE WORKSPACE SCREEN HIERARCHIES

### 5.1 Dashboard Layout
The Dashboard acts as the candidate's career control center. It uses a structured three-column layout designed to focus attention on critical daily activities.

```
+───────────────────────────────────────────────────────────────────────────────────────────────+
| [C] CAREEROS_AI               [Quick Search...]           [Profile Avatar]                    |
+───────────────────────────────────────────────────────────────────────────────────────────────+
|  [D] Dashboard       |  Main Panel: Today's Priorities (Section 1.4 Mod 1)   | Right Panel:  |
|  [R] Resume AI       |                                                       | Notifications |
|  [M] Roadmap         |  +-------------------------------------------------+  |               |
|  [I] Mock Interviews |  | Goal 1: Quantify experience points (30 min)     |  | Upcoming      |
|  [A] Applications    |  +-------------------------------------------------+  | Interviews    |
|                      |  | Goal 2: Solve 1 intermediate coding problem     |  |               |
|                      |  +-------------------------------------------------+  | Recent        |
|                      |                                                       | Activities    |
|                      |  Readiness Indices                                    |               |
|                      |  +--------------------+  +--------------------+       |               |
|                      |  | Overall Index: 82% |  | Resume Score: 92%  |       |               |
|                      |  +--------------------+  +--------------------+       |               |
+───────────────────────────────────────────────────────────────────────────────────────────────+
```

1.  **Sidebar (Left-hand):** Navigation links to other core modules, including settings and target role displays.
2.  **Main Panel (Center):** Prominently displays the overall Readiness Score (using a large visual circular gauge) alongside the three high-impact daily priorities.
3.  **Context Panel (Right-hand):** Displays upcoming mock interview dates, active job applications, and platform notifications.

---

### 5.2 Resume Page Layout
*   **Split-Screen View:**
    *   *Left Column (60%):* Original document view with interactive, colored highlights pointing to specific areas of improvement.
    *   *Right Column (40%):* Collapsible suggestion panels categorized by type (e.g., STAR improvements, missing keywords).
*   **Interactive Controls:** Single prominent "AI Rewrite" action button for each suggestion, allowing the candidate to quickly accept improvements inline.

---

### 5.3 Roadmap Page Layout
*   **Timeline View:** A clean, vertical timeline displaying milestones as interactive nodes.
*   **Progress Indicators:** Checked nodes for completed items, an active highlighted node for current tasks, and locked nodes for remaining goals.
*   **Task Card Overlay:** Clicking a node displays target skill details, relevant external learning references, and related practice challenges.

---

### 5.4 Interview Workspace Layout
*   **Simulated Pressure View:**
    *   *Top Section:* A visual progress bar displaying the current section (e.g., Introduction, Coding, Behavioral) alongside a running timer.
    *   *Main Center Section:* Displays a warm, neutral animated waveform of the AI interviewer on the left, and a live webcam stream of the user on the right.
    *   *Control Panel:* Large, clear mic toggles and a prominent "End Interview" button.

---

### 5.5 Analytics Page Layout
*   **Data Visualization Grid:** A clean grid of visual charts displaying performance trends.
*   **Key Charts:** Average mock interview performance trends, daily coding practice streaks, and ATS match success charts.
*   **Actionable Summaries:** Interactive highlight cards pointing out areas of strength and weakness (e.g., "Weakness: System Design, Recommendation: Complete advanced scalability roadmap").

---

## SECTION 6: RESPONSIVENESS, ACCESSIBILITY, & DESIGN CONTROLS

### 6.1 Multi-Device Adaptation
*   **Desktop / Laptop (1440px / 1200px):** Full three-column layout, left-sidebar navigation, and right-context panels.
*   **Tablet (768px):** Collapses the right-context panel into an expandable sheet. Nav links collapse to icons.
*   **Mobile (375px):** Standard single-column layout. The left sidebar collapses into an accessible slide-out menu. A persistent, thumb-friendly bottom navigation bar provides quick access to core screens.

### 6.2 Key Accessibility Safeguards (WCAG AA)
1.  **Keyboard Navigable:** Ensure all interactive elements can be reached and activated using the `Tab`, `Arrow`, and `Enter` keys.
2.  **Explicit Focus States:** Focus indicators must be prominent (using a solid 2px colored ring around the active element).
3.  **Reduced Motion Support:** All transitions and indicators must adapt to system `prefers-reduced-motion` settings, replacing slide/expand transitions with immediate, fade-in animations.
4.  **Aria-Labels:** Interactive buttons and elements (such as icon-only actions or close buttons) must include descriptive, accessible labels.

---

This UX & Design System Bible serves as the master UI and design blueprint for CareerOS AI. Once approved, frontend component implementations can proceed.

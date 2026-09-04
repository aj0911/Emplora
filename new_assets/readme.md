# Emplora design system

Emplora is the design system for a multi-tenant payroll SaaS: 37 screens across public registration, an org-scoped core app, employee self-service, and a platform console. It is built for the two things payroll screens actually are — dense tables of money and long statutory forms — and it is quiet everywhere else so those two things read clearly.

## How to use this

- Link the one stylesheet from every page: `<link rel="stylesheet" href="styles.css">` (adjust the relative path). Take every color, size, radius and duration from its variables (`var(--color-*)`, `var(--text-*)`, `var(--space-*)`, `var(--radius-*)`, `var(--shadow-*)`, `var(--dur-*)`). Never hard-code a hex or a raw px value the tokens already carry.
- Use the React components below rather than re-implementing their markup; each ships a `.d.ts` documenting its props and when to use it.
- `templates/` holds whole starting screens a consuming project can copy.
- Dark mode is a token swap: set `data-theme="dark"` on the root element. Nothing else changes.

## Direction

Left-aligned, table-first, no chrome that does not carry information. A cool slate canvas with white surfaces; one cobalt accent that appears only on the primary action, the active nav item, the focus ring and links; borders rather than shadows to separate things. Saturation is reserved for state, so a red row means something is wrong rather than something is styled. Density is deliberate: 44px table rows, 32px controls, a 4px spacing base — a laptop should show about twenty employees without scrolling.

## Color

A neutral ramp (`--neutral-50` … `--neutral-950`) carries surfaces, borders and text. A cobalt primary ramp (`--primary-50` … `--primary-900`, base `#4360ea`) carries interaction. Four semantic ramps carry meaning: success (paid, active, verified), warning (pending, on notice, due soon), danger (failed, suspended, rejected), info (processing, approved, system). Components read the semantic aliases — `--color-canvas`, `--color-surface`, `--color-text`, `--color-border`, `--color-primary`, `--color-focus` — never the ramps directly, which is what makes the dark theme a re-point of aliases only. Tinted fills stay at the 50 step so 13px text on them stays readable. Do not add a second accent hue.

## Type

Geist for the interface, Geist Mono for every number — amounts, employee IDs, UANs, IFSC codes, dates, counts — because a column of figures has to line up and be countable. Base size 14px; headings 600, body 400, hierarchy from size and space rather than weight. Amounts use Indian digit grouping (12,34,567) with paise only where the statutory figure is exact: payslip lines and deduction breakdowns, never dashboard totals.

## Logo

The mark is a soft lowercase e drawn as one continuous stroke: the crossbar runs into the bowl and the mouth is real negative space. It sits in the people-software family — friendly, letter-first, no container — and leaves the payroll story to the words beside it. Three approved files live in `assets/`: `logo.svg` (cobalt container, white arms — the default), `logo-mono.svg` (single ink via `currentColor`), `logo-lockup.svg` (mark plus the Geist 600 wordmark). Clear space equals the container's corner radius; minimum size is 16px for the mark and 96px for the lockup. The stroke is 5.4 units in a 40-unit viewBox with round caps and never changes weight — scale the viewBox, never the stroke. Never stretch, rotate, recolour the arms, or add a gradient or shadow. Full geometry, colour values and paste-ready markup are in `foundations/logo.html`.

## Icons

Phosphor icons (https://phosphoricons.com), regular weight, 16px in navigation and buttons, inheriting `currentColor`. One weight per screen.

## Interaction states

Every interactive element has a hover, a pressed and a visible focus state: a 2px cobalt outline at 2px offset, or the `--ring` soft ring on filled controls. `::selection` is a cobalt tint, disabled controls drop to 45% opacity, and motion is 110ms for hover and press, 180ms for anything entering or leaving, on one easing curve. Nothing bounces, and no number animates.

## Components

| Component | What it is | Shown in |
| --- | --- | --- |
| `Button`, `ButtonGroup` | Actions in five variants and three sizes | components/actions/card.html |
| `Badge` | Tinted taxonomy label — department, plan, role type | components/actions/card.html |
| `StatusBadge` | The shared state vocabulary: draft, processing, pending, approved, paid, failed, sent, active, notice, exited, verified, unverified, locked, system, custom, trial, suspended | components/actions/card.html |
| `Input`, `Textarea` | Labelled fields, with currency and statutory-code affixes | components/forms/card.html |
| `Select` | Native single-select; role pickers read the org's live role list | components/forms/card.html |
| `Checkbox` | Checkbox or radio with a second line — the role permission checklist | components/forms/card.html |
| `Switch` | Settings that apply immediately (PF, ESIC, professional tax) | components/forms/card.html |
| `SegmentedControl` | Two to four exclusive options (calendar vs working days) | components/forms/card.html |
| `DataTable` | Sticky header, 44px rows, selection, sort, totals row | components/data/card.html |
| `StatCard` | One KPI with its delta; four across maximum | components/data/card.html |
| `Money`, `formatMoney` | Every rupee amount in the product | components/data/card.html |
| `Avatar`, `PersonCell`, `AvatarStack` | People, initials first | components/data/card.html |
| `AppShell`, `PageHeader` | The org-scoped frame: sidebar, topbar, content well | components/navigation/card.html |
| `Tabs` | Views of one record — the employee profile | components/navigation/card.html |
| `Stepper` | Registration (5 steps) and the payroll run (3 steps) | components/navigation/card.html |
| `Alert` | Inline consequence, deadline and failure messages | components/feedback/card.html |
| `Modal` | A focused task over the current page | components/feedback/card.html |
| `EmptyState` | What a collection shows before it has anything | components/feedback/card.html |

Utility classes back the same patterns for plain-HTML pages: `.btn`, `.badge`, `.field`/`.input`/`.select`/`.check`/`.switch`/`.seg`, `.card`, `.stat`, `.table`, `.tabs`, `.nav-item`, `.alert`, `.dialog`, `.empty`, `.progress`, `.skeleton`, `.stepper`, plus `.num` for tabular figures and `.stack`/`.row`/`.grid-*` with `gap` for layout.

## Product patterns

- **The tenant is always visible.** The org name sits under the brand on every org-scoped screen; platform (SuperAdmin) screens use an ink topbar so the boundary is never ambiguous.
- **Permission is data, not an enum.** Roles are tenant-created, so no picker hardcodes role names. The permission checklist is grouped by module with a select-all per group; the OrgAdmin role shows a Locked pill and no destructive action.
- **Irreversible actions state their blast radius in figures**, and the confirming button carries the verb — "Approve & generate payslips", never "OK".
- **Sensitive data is masked, gated and logged.** Bank accounts and UANs are masked outside the screens that need them, employees request corrections rather than editing their own bank details, and platform support access is time-boxed, reasoned and written to the audit log.
- **The agent proposes, a person approves.** A launcher pill sits at the bottom of every org-scoped screen (or Ctrl+K); clicking it opens a floating composer where anything can be asked in plain language — "add these 30 employees from this Excel", "increase Rahul's salary to ₹75,000 from next month", "why is this salary different from last month?". The agent resolves the intent, then answers inline or opens a preview. It reads only what the signed-in role can already see, and every write it suggests — an import, a run, an override — is shown as a reviewable diff with counts before anything is saved. It never approves a payroll or moves money.
- **Nothing blocks day one.** Registration asks only what a working account needs; missing optional data becomes an attention badge, not a required field.

## Do

- One primary action per view; everything else secondary or ghost.
- Right-align every amount and count, in mono, so decimals stack.
- Pick a tone by meaning, and use `StatusBadge` so one state looks the same on every screen.
- Lay groups out with flex or grid and `gap`.

## Don't

- Do not tint whole table rows except for selection, or add a second accent hue.
- Do not centre app content, nest cards, or stack heavy shadows.
- Do not use pure black or pure white — the darkest ink is `--neutral-950`.
- Do not go below 12px for anything read as a sentence.

## Files

- `styles.css` — the only stylesheet: tokens, base type, component and utility layers, dark theme.
- `readme.md` — this guide.
- `thumbnail.html` — the project cover.
- `foundations/color.html` — roles, ramps, semantic aliases, dark theme.
- `foundations/type.html` — the two faces, the scale, and numeral rules.
- `foundations/layout.html` — spacing, density, the application frame.
- `foundations/patterns.html` — multi-tenancy, roles, destructive actions, sensitive data.
- `foundations/logo.html` — the logo: geometry, colour, lockups, don'ts, developer handoff.
- `foundations/icons.html` — icon usage, motion, focus.
- `assets/logo.svg`, `assets/logo-mono.svg`, `assets/logo-lockup.svg` — the only approved logo files.
- `components/*/` — component source, prop documentation, and one spec card per group.
- `templates/*/` — whole screens to copy: `landing` (public homepage with pricing), `registration` (5-step signup), `payroll-dashboard`, `employees`, `payroll-run`, `payslip`, `roles`, `ai-agent` (launcher pill, floating natural-language composer, intent preview), `books` (payroll accounting, Tally/Busy export), `billing` (org subscription, payment methods, GST invoices, upgrade checkout), `platform-console` (SuperAdmin zone on ink chrome: tenant KPIs, organizations, plans, time-boxed support access, audit log).

# Emplora — User Manual

Emplora is a multi-tenant payroll and HR platform: each company ("organization") that signs up gets its own isolated workspace — employees, attendance, leave, payroll, reports — and you, as the platform operator, have a separate SuperAdmin console that sits above every organization.

This manual is written against the demo data seeded into your local environment right now (`npm run seed:demo` in `backend/`), so every screen it describes has real data behind it — nothing here is hypothetical.

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001 (interactive API docs at http://localhost:3001/api-docs)

---

## 1. Logging in

All seeded accounts share one password: **`Emplora@2026`**

| Email                             | Organization             | Role                      | What it's for                                                                                                                                                   |
| -----------------------------------| --------------------------| ---------------------------| -----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `jabhinav974@gmail.com`           | Sunrise Apparels Pvt Ltd | OrgAdmin **+ SuperAdmin** | Full org control, and the platform console. This is your main account.                                                                                          |
| `jhaabhinav09112004@gmail.com`    | Sunrise Apparels Pvt Ltd | HR                        | Employee lifecycle, attendance, leave                                                                                                                           |
| `twiliogyde@gmail.com`            | Sunrise Apparels Pvt Ltd | Accountant                | Payroll runs, payslips, statutory reports                                                                                                                       |
| `claudeabhinav09@gmail.com`       | Sunrise Apparels Pvt Ltd | Employee                  | Self-service only — this account is linked to a real Employee record (EMP006), so it sees payslips, attendance, and leave for *itself*                          |
| `abhinavjha_ee22b15_03@dtu.ac.in` | Coastal Textiles LLP     | OrgAdmin                  | A second, empty, isolated organization — exists to show the SuperAdmin console managing more than one tenant, and to prove one org can never see another's data |

There's one login screen for everyone at `/login` — the app routes you to the right view based on your role and permissions after that. If you're both OrgAdmin and SuperAdmin (like your main account), you land in the org workspace and reach the SuperAdmin console via the link in the sidebar or `/superadmin/dashboard` directly.

**Forgot password**: `/forgot-password` sends a real branded email with a reset link (1-hour expiry). **Inviting someone new**: they get a real branded email with a temporary password and are forced to set their own on first login.

---

## 2. Getting oriented

Once logged in, the left sidebar is your main navigation, grouped by what your role can see:

- **Overview** — Dashboard. For OrgAdmin/HR/Accountant (anyone with `reports.view`) this shows org-wide KPIs, a net-payout trend chart, and a "needs your attention" feed. For a pure Employee account, it instead shows *your own* leave balance, latest payslip, and quick links — there's no "admin" view leaking through.
- **Workforce** — Employees, Attendance, Leave & Holidays
- **Payroll** — Payroll Runs, Payslips, Reports, Statutory Config
- **Organization** — Users, Roles & Permissions, Correction Requests, Settings, Audit Log
- **My Space** (only shown if your account is linked to an employee record) — My Payslips, My Attendance, My Leave, My Profile

The theme toggle (sun/moon/monitor icon, top-right of every screen) cycles **light → dark → system** and remembers your choice across sessions.

---

## 3. Core workflows

### Employees
`/employees` — the full roster (log in as HR or OrgAdmin to see this). Click into anyone for their detail page, which includes a **Salary** tab — that's where salary structures and loans/advances live for that specific person, rather than as separate top-level pages, since both are always reached "about this person." Add a new employee via **+ New Employee**; mark someone as exited via **Edit** → Employment Status.

Try it: open EMP002 (Rohan Verma) — he has an active loan, so you'll see it reflected in his Salary tab and in his payslip deductions.

### Attendance
`/attendance` — a click-to-cycle grid (present/absent/half-day/leave/holiday) per employee per day. Changes are tracked and saved in one batched call, not one request per click. The demo data has a full month of August 2026 marked, plus 3 days of September so the current draft payroll run has something real to calculate against.

### Leave
Four sub-pages under **Leave & Holidays**:
- **Leave Types** (`/leave/types`) — Casual (12 days), Sick (8 days), Earned (15 days, carries forward)
- **Holidays** (`/leave/holidays`) — the year's holiday calendar
- **Requests** (`/leave/requests`) — the approval queue (log in as HR to approve/reject)
- **My Leave** (self-service, `/leave/my-leave`) — log in as the Employee account to see balance cards and submit a request yourself

The demo has a realistic mix: some approved, one rejected, a couple still pending, and one genuinely submitted through the self-service form (not entered by HR on someone's behalf) — try approving one of the pending ones as HR and watch the balance update.

### Payroll — running a full cycle
This is the core workflow, so here's the actual sequence, matching what the seed data already did for August 2026:

1. **Statutory Config** (`/statutory-config`) — EPF/ESIC/PT rates for the organization. Materializes automatically from platform defaults the first time you view it for a given financial year.
2. **Salary Structures** — set per-employee via the employee's Salary tab (Basic, HRA, Conveyance, Other Allowances, effective date).
3. **Payroll Runs** (`/payroll-runs`) — log in as Accountant, click **New Run**, pick month/year. This calculates payslips immediately for every active employee based on their salary structure and that month's attendance.
4. **Override** (optional) — open a run, click into an individual payslip to adjust TDS or other deductions with a reason (the seed data overrode Rohan Verma's August TDS this way, simulating a mid-cycle Form 12BB update).
5. **Approve** — locks the run; payslips become final.
6. **Send Payslips** — emails a PDF payslip to everyone with a personal email on file. Check **Delivery Log** on the run detail page afterward — the demo data shows 8 sent, 1 failed ("no email on file"), a deliberately realistic mix rather than an all-or-nothing result.

The September 2026 run in your demo data is left as a **draft** on purpose — open it to see what a payroll run looks like mid-flow, before approval.

### Payslips & Reports
`/payslips` (pick an employee, view/download their history) and `/me/payslips`-style self-service under **My Space**. **Reports** (`/reports`) is cycle-scoped — pick a payroll run, then export EPF Contribution, ESIC Contribution, Professional Tax, Overtime, or a bank transfer CSV for that specific cycle; Joining/Exit is the one report that's date-range-scoped instead.

### Users & inviting people
`/users` — **Invite User** now works by *picking an existing employee* rather than typing their name and email: select who, their email auto-fills from their employee record (editable if it's missing), pick a role, send. This only works for someone who already has an Employee record — if you need to invite someone who isn't an employee yet (rare — usually only for pure back-office access), add them as an employee first.

### Roles & Permissions
`/roles` — every organization gets four default roles at signup (OrgAdmin, HR, Accountant, Employee), each with a sensible starting permission set. OrgAdmin's role is locked (always has every permission); the others can be edited, or you can clone one to create a custom role.

### Correction Requests
Self-service employees can request a fix to their own record (mobile, personal email, bank details, etc.) via **My Profile → Request Correction** — they can't edit these fields directly, since bank/statutory details need a human to verify. HR/OrgAdmin resolves them from `/correction-requests`. The demo data has one resolved, one still pending — try resolving it as HR.

### Settings
`/settings` — organization profile, industry/size/state, pay cycle day, PF/ESIC/PT applicability toggles, financial year start, and logo upload.

### Audit Log
`/audit-log` — every meaningful action in the organization (invites, role changes, payroll approvals, etc.), attributed to who did it and when.

---

## 4. The SuperAdmin console

Reachable from your main account (`jabhinav974@gmail.com`, which is both OrgAdmin of Sunrise Apparels *and* a platform SuperAdmin) via `/superadmin/dashboard`.

- **Organizations** — every tenant on the platform. You'll see both Sunrise Apparels (10 employees) and Coastal Textiles LLP (0 employees, just registered) — proof the two are fully isolated from each other. Click into one for status, plan tier, and payroll run history.
- **Request Support Access** — SuperAdmin visibility is deliberately limited to counts and status by default; if you need to look at an organization's actual data (say, to debug a support ticket), you have to log a reason first — and that request is written into **that organization's own audit log**, not hidden from them. This is a real privacy boundary, not just UI decoration.
- **Platform Users** — who else has SuperAdmin access. Promoting someone requires their user ID (there's no platform-wide user search yet — a known, flagged gap, not an oversight).
- **Platform Settings** — the default EPF/ESIC/PT rates every *new* organization inherits at signup.
- **Platform Audit Log** — SuperAdmin actions across every organization, in one feed.

---

## 5. What's real vs. what to still click through yourself

Everything above has been verified against the live backend and real data — logged in as each seeded account, checked the actual API responses, confirmed the payroll math, confirmed emails send through real Gmail SMTP. What hasn't happened: an actual human clicking through the UI in a browser. There's no browser automation available in this environment, so things like drag interactions, modal focus behavior, and exact visual polish are worth a real click-through pass before you'd show this to anyone else.

A good first session: log in as `jabhinav974@gmail.com`, glance at the Dashboard, open an employee, approve the pending September leave request as HR, then switch to the Accountant account and look at the September draft payroll run.

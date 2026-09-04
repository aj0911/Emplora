# UI/UX Specification — Multi-Tenant Payroll SaaS

*Every screen in the product, what it asks for, what it shows, and who can see it. Companion to `PLAN.md` (architecture) and `BUILD_PLAN.md` (build order).*

## 0. Design principle for this spec

Registration should be **generic and simple**: short steps, minimal required fields, everything non-essential deferred to Settings or marked skippable. We ask for exactly what's needed to create a working account — nothing that can wait, waits.

## 1. Page Inventory (37 screens across 4 zones)

| Zone                        | Screens | Who                                   |
| -----------------------------| ---------| ---------------------------------------|
| A — Pre-auth & Registration | 8       | Public / new signups                  |
| B — First-login Onboarding  | 1       | New OrgAdmin                          |
| C — Org-scoped Core App     | 23      | OrgAdmin / HR / Accountant / Employee |
| D — SuperAdmin Platform     | 7       | You (SuperAdmin) only                 |
| **Total**                   | **~37** |                                       |

Full breakdown follows. Role access matrix is in §7.

---

## 2. Zone A — Pre-Auth & Registration (8 screens)

### A1. Login
- Fields: Work Email, Password
- Links: "Forgot password", "Register your company"
- Note: same login page for every role (SuperAdmin, OrgAdmin, HR, Accountant, Employee) — the backend routes by role after auth, not a separate login URL per role.

### A2. Forgot Password
- Field: Email
- Action: sends reset link

### A3. Reset Password
- Fields: New Password, Confirm Password (strength meter)

### A4-A8. Organization Registration — 5-step wizard

Kept intentionally short. Anything not essential to functioning on day one is deferred to Organization Settings (post-login) or explicitly skippable.

**A4 — Step 1: Your Company**

| Field | Type | Required | Notes |
|---|---|---|---|
| Company Name | Text | Yes | |
| Industry | Dropdown | Yes | Manufacturing, IT/Software, Retail & Trade, Textile/Garment, Healthcare, Education, Other |
| Company Size | Dropdown | Yes | 1–10, 11–50, 51–200, 201–1000, 1000+ |
| State | Dropdown | Yes | Drives the Professional Tax default in Step 3 |
| City | Text | Yes | |

**A5 — Step 2: Your Account** (registrant becomes the org's first OrgAdmin)

| Field | Type | Required | Notes |
|---|---|---|---|
| Full Name | Text | Yes | |
| Work Email | Email | Yes | Becomes the login ID; OTP-verified |
| Mobile Number | Text | Yes | OTP-verified |
| Password / Confirm Password | Password | Yes | Strength meter |
| Your Designation | Text | No | e.g. "HR Manager" — helps personalize, not functional |

**A6 — Step 3: Payroll Basics** (minimum needed to run a first payroll; deep statutory detail lives in Settings)

| Field | Type | Required | Notes |
|---|---|---|---|
| Pay Cycle | Dropdown | Yes | "Last day of month" / fixed date picker |
| Salary Calculated On | Toggle | Yes | Calendar Days vs. Working Days |
| PF Applicable? | Yes/No toggle | Yes | If Yes → PF Establishment Code (optional here, can add later) |
| ESIC Applicable? | Yes/No toggle | Yes | If Yes → ESIC Employer Code (optional here) |
| Professional Tax Applicable? | Yes/No toggle | Yes | Pre-filled based on State from Step 1, editable |

**A7 — Step 4: Branding** *(entirely skippable — "Skip for now" link)*

| Field | Type | Required |
|---|---|---|
| Company Logo | Image upload | No |
| Brand Color | Color picker | No |

**A8 — Step 5: Review & Confirm**
- Read-only summary of Steps 1–4, each section with an "Edit" link back to that step
- Terms of Service + Privacy Policy checkbox — required
- Button: "Create My Organization" → creates `Organization` + first `User` (role: OrgAdmin) → sends OTP to email/mobile → on verification, redirects to **B1 (Onboarding Checklist)**

---

## 3. Zone B — First-Login Onboarding (1 screen)

### B1. Getting Started Checklist
Shown once, dismissible, reappears via a "Setup" nav item until complete.
- Checklist items (each links to the relevant page): Add your first employee · Invite your HR/Accountant · Set up leave types · Configure your holiday calendar · Set your salary structure defaults
- Progress bar (e.g. "2 of 5 done")

---

## 4. Zone C — Org-Scoped Core App (20 screens)

### C1. Dashboard (role-aware)
- OrgAdmin/Accountant view: Active Employees, This Cycle's Payroll Status, Pending Leave Requests, Projected Net Payout, payout trend chart, "Needs your attention" list (missing bank details, upcoming statutory due dates)
- HR view: same minus payout-total figures
- Employee view: see **C20 (My Dashboard)** instead

### C2. Employees — List
- Table columns: ID, Name, Department, Designation, PF status, ESIC status, Bank verification status, Gross/mo
- Search + filter by department/status
- Actions: "+ Add Employee", "Import Excel"

### C3. Add / Edit Employee

| Field | Type | Required |
|---|---|---|
| Employee ID (auto-generated, editable) | Text | Yes |
| Full Name | Text | Yes |
| Mobile Number | Text | Yes |
| Personal Email | Email | No |
| Department | Dropdown/text | Yes |
| Designation | Text | Yes |
| Date of Joining | Date | Yes |
| Employment Status | Dropdown | Yes | Active/On Notice/Exited |
| Bank Account Number | Text | Yes | encrypted at rest |
| IFSC Code | Text | Yes | validated format |
| UAN | Text | No | required only if PF applicable |
| ESIC Number | Text | No | required only if ESIC applicable |
| PF Opt-in | Yes/No | Yes | |
| ESIC Opt-in | Yes/No | Yes | auto-set based on gross salary ceiling, overridable |

### C4. Employee Profile (detail view)
- Tabs: Overview (fields above, read/edit) · Salary Structure (links to C17) · Attendance History · Leave History · Payslip History

### C5. Attendance — Grid
- Monthly grid: rows = employees, columns = days, cell = status (Present/Absent/Leave/Half-day/Holiday), OT hours column
- Auto-computed working days for the cycle shown at top

### C6. Attendance — Bulk Import
- Excel upload, column-mapping step, validation preview (highlights errors before committing), confirm import

### C7. Leave Types — Configuration
- Table: Leave Type Name, Days/Year, Carry-forward Yes/No, "+ Add Leave Type"

### C8. Holiday Calendar — Configuration
- Calendar/list view, "+ Add Holiday" (Date, Name)

### C9. Leave Requests — Approval Queue
- Table: Employee, Type, From, To, Days, Status, Approve/Reject actions

### C10. My Leave (Employee self-service)
- Leave balance by type, request form (Type, From, To, Reason), request history

### C11. Salary Structure — Editor (per employee)

| Field | Type | Required |
|---|---|---|
| Basic | Currency | Yes |
| HRA | Currency | Yes |
| Conveyance | Currency | No |
| Other Allowances | Currency | No |
| Effective From | Date | Yes |

### C12. Payroll Run — Wizard (3 steps in one flow)
- Step 1 "Lock Attendance": confirms the cycle's attendance is final
- Step 2 "Review & Adjust": per-employee table — Gross, EPF, ESIC, TDS, Net — editable overrides with a reason field
- Step 3 "Approve & Generate": cycle summary (Gross payout, total deductions, Net payout) → "Approve & Generate Payslips" button

### C13. Payslips — List
- Table: Employee, Cycle, Net Pay, Status (Generated/Sent/Failed), filter by month

### C14. Payslip — Detail / Preview
- Branded document view (logo, employee details, earnings/deductions breakdown, net pay)
- Actions: Download PDF, Send via Email

### C15. Reports — Hub
- List: Salary Register, EPF Contribution, ESIC Contribution, Professional Tax, OT Report, Joining/Exit, Bank Transfer File
- Each with a date-range filter and Export (Excel/PDF)

### C16. Users — Management
- Table: Name, Email, **Role** (the org's actual role names — could be "HR" or a custom one like "Regional HR — Production"), Status, "Change Role" action, "Deactivate" action
- Roles assignable here come from **C16a**, not a fixed list — this is the difference from a hardcoded enum
- "+ Invite User" opens **C17**

### C16a. Roles — List *(AWS IAM–style: this is the actual roles/permissions console)*
- Table: Role Name, Type (`System` / `Custom` pill), Users Assigned (count), Permissions Granted (count), Actions
- The 4 System roles (OrgAdmin, HR, Accountant, Employee) are always present, seeded at org creation
- **OrgAdmin row shows a "Locked" pill and no Edit/Delete action** — this is deliberate, see §5.1 in `PLAN.md`: nobody can accidentally strip their own admin access
- HR / Accountant / Employee rows: "Edit", "Clone", and "Delete" (Delete disabled with a tooltip if any user currently holds that role)
- "+ Create Custom Role" button → **C16b**

### C16b. Create / Edit Role
| Field | Type | Required |
|---|---|---|
| Role Name | Text | Yes |
| Description | Text | No |
| Cloned From | Read-only note | — | shown only when created via "Clone" |

Below the fields: a **permission checklist grouped by module** — collapsible sections, each with a "select all in this module" toggle:
- **Employees** — View, Create, Edit, Delete, Import
- **Attendance** — View, Mark, Bulk Import
- **Leave** — View, Approve/Reject, Configure Leave Types
- **Payroll** — View, Run Payroll, Approve Payroll, Override Calculations
- **Payslips** — View, Generate, Send
- **Reports** — View, Export
- **Roles & Users** — Manage Roles, Invite Users, Manage Users
- **Organization Settings** — Edit

Save button: "Save Role". If editing a role that's currently assigned to users, a confirmation note: *"This changes access for N people immediately."*

### C16c. Role Detail (view, reached by clicking a role name in C16a)
- Read-only permission summary (same grouped layout as C16b, checkboxes disabled)
- "Users with this role" list (name, email) — click through to C16 filtered
- Edit / Clone actions (Edit hidden if locked)

### C17. Invite User (modal)

| Field | Type | Required |
|---|---|---|
| Name | Text | Yes |
| Email | Email | Yes |
| Role | Dropdown | Yes | pulled from **C16a** — the org's live role list, System + Custom |

### C18. Organization Settings
- Editable versions of everything gathered at registration (A4–A7), plus: Financial Year start month, default TDS regime assumption, PT state list, weekly-off days — all the "advanced" statutory fields we deliberately deferred out of the registration wizard live here.

### C19. My Profile (Employee)
- Read-only: personal + bank details, with a "Request correction" action (routes to HR, employees can't silently edit their own bank details — a fraud-prevention basic)

### C20. My Dashboard / My Payslips / My Attendance (Employee self-service, 3 lightweight screens grouped here)
- My Dashboard: this month's leave balance, latest payslip summary
- My Payslips: list + download, same document as C14 but read-only and self-scoped
- My Attendance: personal calendar view, no edit rights

---

## 5. Zone D — SuperAdmin Platform Pages (7 screens, you only)

### D1. SuperAdmin Dashboard
- Platform-wide KPIs: Total Organizations, Total Employees (across all orgs), Total Payroll Processed this month (₹, platform-wide), New Signups (trend chart), Active vs. Trial vs. Suspended org counts

### D2. Organizations — List
- Table: Company Name, Plan/Tier, Employee Count, Status, Signup Date, Last Payroll Run Date
- Search/filter, "Suspend" / "Reactivate" actions

### D3. Organization Detail (drill-in from D2)
- Org profile info (as entered at registration)
- Employee count + summary stats (**not** a raw employee list with salaries — see §6)
- Payroll run history (dates, status — not amounts, see §6)
- Subscription/billing status
- Actions: Suspend, Reactivate, "Request Support Access" (see §6 — this is deliberately not a silent one-click view)

### D4. Platform Users
- Manage other SuperAdmin accounts, if the platform ever has more than one

### D5. Billing & Plans
- Plan definitions (name, price, employee-count limits), which org is on which plan, manual upgrade/downgrade

### D6. Platform Settings
- Global default statutory rate templates (EPF %, ESIC %, PT slabs) that new orgs inherit at registration but can override in their own C18 settings

### D7. Platform Audit Log
- Every SuperAdmin action against any organization (suspensions, support-access grants, plan changes) — timestamped, actor-tagged, exportable

---

## 6. SuperAdmin Visibility & Privacy Model — important design decision

As SuperAdmin you should freely see **business/operational metrics**: how many orgs, how many employees each has, subscription status, login activity, whether payroll ran on time. That's normal and expected for running the platform.

You should **not** have a standing, un-logged, one-click view into an individual employee's actual salary, bank account, or UAN inside someone else's company — even though technically nothing stops you at the database level. Every client company would reasonably expect their payroll data isn't casually browsable by the platform vendor. Two concrete design consequences:

- **D3 shows counts and status, not amounts or PII**, by default.
- If you genuinely need to see granular payroll data for a support case (client reports a bug, asks for help), route it through a **"Request Support Access"** action that (a) logs the reason, (b) time-boxes the access (e.g. 24 hours), and (c) is itself visible in that org's own audit log (D7 logs it, and ideally the client sees a note too). This turns "the platform owner can see everything" from a trust liability into a trust feature — you can point to the audit trail.

This is a cheap thing to build now (it's just a gate + a log row) and an expensive thing to retrofit after a client asks "wait, who looked at our payroll data?"

---

## 7. Role Access Matrix

| Screen group | SuperAdmin | OrgAdmin | HR | Accountant | Employee |
|---|---|---|---|---|---|
| Zone A (pre-auth) | ✓ | ✓ | ✓ | ✓ | ✓ |
| C1 Dashboard | — (has D1) | ✓ | ✓ | ✓ | Self-service view only (C20) |
| C2-C4 Employees | — | ✓ | ✓ | View only | Own profile only (C19) |
| C5-C10 Attendance/Leave | — | ✓ | ✓ | View only | Own records only |
| C11-C14 Payroll/Payslips | — | ✓ | View only | ✓ | Own payslips only |
| C15 Reports | — | ✓ | Limited (non-financial) | ✓ | — |
| C16-C16c Users/Roles, C18 Settings | — | ✓ (or a custom role with `roles.manage`) | — | — | — |
| Zone D (platform) | ✓ | — | — | — | — |

# Multi-Tenant Payroll & HR SaaS — End-to-End Plan
*Client's first requirement, translated & architected · Stack: NestJS + Next.js + Neon Postgres*

---

## 1. What We're Building

Not a single-company payroll script — a **multi-tenant SaaS platform** where any company can self-register as an "Organization," onboard its own employees, and run its own payroll independently, fully isolated from every other company on the platform. One codebase, one database, many tenants.

## 2. Requirement Checklist (translated from client's spec)

| # | Client asked for (Hindi) | Module |
|---|---|---|
| 1 | Employee Master — ID, Name, Mobile, Dept, Designation, Joining Date, Bank, UAN, ESIC No., PF/ESIC status | Employee Master |
| 2 | Attendance — Present/Absent/Leave/Half Day/Holiday/OT, auto working-days calc | Attendance |
| 3 | Salary calc — Basic, HRA, Conveyance, Allowances, Bonus, OT, auto Gross & Net | Payroll Engine |
| 4 | Deductions — EPF, ESIC, TDS, Advance, Loan, Salary Hold | Payroll Engine |
| 5 | EPF & ESIC auto calculator (employee + employer contribution) | Statutory Engine |
| 6 | Payslip PDF generation with company logo | Payslip Module |
| 7 | Monthly Salary Register export (Excel/PDF) | Reports |
| 8 | Leave & Holiday management, leave balance | Leave Module |
| 9 | Reports — Salary, Attendance, EPF, ESIC, OT, Joining/Exit, Bank Transfer | Reports |
| 10 | Admin/HR/Accountant/Employee logins | Auth & RBAC |
| 11 | Excel import/export, Payslip via Email | Import-Export + Notifications |

**One gap in the client's list worth raising with them:** most Indian states levy **Professional Tax (PT)** as a statutory monthly deduction (varies by state, e.g. Maharashtra, Karnataka, West Bengal), and it's not mentioned. Flagging this to the client now — proactively catching it — is a good trust-builder for your first project. I've included it as an optional configurable deduction below so it's not a rebuild later if they say yes.

## 3. Tech Stack & Key Decisions

| Layer | Choice | Why |
|---|---|---|
| Backend | **NestJS** (modular monolith, not microservices) | Matches your ask; microservices are overkill at this scale and would slow delivery |
| Frontend | **Next.js 14 (App Router)** + Tailwind + shadcn/ui | Matches your existing stack/experience from Finance.ai |
| Database | **Neon Postgres** | Serverless, branching (great for dev/staging without extra cost), scales with tenants |
| ORM | **Sequelize** (`sequelize-typescript` + `@nestjs/sequelize`) | Since NestJS runs as a persistent server (not edge functions), a standard `pg` connection pool against Neon's **pooled connection string** works directly — no serverless/HTTP adapter needed |
| Auth | JWT (access + refresh) via NestJS Passport strategies | Standard, stateless, works well with role guards |
| File storage | Cloudflare R2 or AWS S3 (Neon is DB-only, not file storage) | Company logos, generated payslip PDFs |
| PDF generation | Puppeteer (HTML→PDF) for payslips, `exceljs` for Excel exports | Puppeteer gives full design control for branded payslips |
| Email | Resend or SendGrid | Payslip delivery, notifications |
| Hosting | Next.js → Vercel · NestJS → Railway/Render/Fly.io · DB → Neon | Cheap to start, scales later |

## 4. Multi-Tenancy Model

**Approach: shared database, shared schema, `organization_id` row-level scoping.**

Why not database-per-tenant or schema-per-tenant: those add real operational complexity (migrations run N times, connection pool per tenant) that isn't justified until you have dozens of large enterprise clients. Row-level scoping is what 90% of SaaS payroll tools run on at this stage, and Neon's branching still gives you cheap isolated dev/staging environments.

**Enforcement pattern (this is the part that prevents "Company A sees Company B's salary data" bugs):**
- Every table that holds tenant data carries `organization_id`.
- A NestJS Guard extracts `organization_id` from the JWT on every request.
- A **Sequelize base repository / scope** (`addScope('tenant', ...)` applied globally, or a shared base repository class every module extends) auto-injects `WHERE organization_id = :orgId` on every query — so a developer literally cannot forget to scope a query. This is non-negotiable for payroll data (salaries, bank details, UAN) — one missed `WHERE` clause is a real data leak, not a cosmetic bug.

**Onboarding flow:** Company signs up → creates `Organization` record + first user as `OrgAdmin` → OrgAdmin invites HR/Accountant/Employee users → org configures pay cycle, statutory settings (PF/ESIC/PT applicability, financial year rates).

## 5. Roles & Permissions — permission-based (AWS IAM style), not a fixed enum

A hardcoded `role` enum (OrgAdmin/HR/Accountant/Employee) is fine for a demo but breaks the moment a real company wants something like "Regional HR who can approve leave but not touch payroll." So instead of a fixed role list, we build it the way AWS IAM, or Keka's actual roles module, work:

- **Permissions are atomic**, one per action-on-resource — e.g. `employees.view`, `employees.edit`, `attendance.mark`, `leave.approve`, `payroll.run`, `payroll.approve`, `payslips.generate`, `reports.export`, `roles.manage`, `settings.edit`. Seeded in the DB, not user-editable.
- **Roles are named bundles of permissions, scoped to one organization.** Every org gets its own copies (not shared rows) so customizing one org's "HR" role never touches another org's.
- **Every org is seeded with 4 default roles at signup** — OrgAdmin, HR, Accountant, Employee — pre-populated with sensible permission sets, so nobody has to build from a blank slate.
- **OrgAdmin's own permission set is locked** (all permissions, not editable, not deletable) — this is the one safety rail: nobody can accidentally strip admin access from the only admin account and lock themselves out.
- **HR / Accountant / Employee are editable and cloneable.** OrgAdmin can edit what a default role can do, or clone one into a new custom role (e.g. clone HR → "Regional HR — Production" → uncheck a few permissions).
- **One role per user for V1** — a user has exactly one role. AWS IAM allows stacking multiple policies per user, which is powerful but opens a real can of worms (allow/deny precedence, conflict resolution) that isn't worth the complexity until an actual client asks for it. Single-role-per-user covers everything in the current requirement.
- **SuperAdmin is separate from this system entirely** — it's a platform-level flag on the user, not an org-scoped role, and isn't editable by any org.

See `UI_UX_SPEC.md` §4 (C16 series) for the actual Roles management screens.

## 6. Core Database Schema (key tables)

```
organizations (id, name, logo_url, pf_applicable, esic_applicable, pt_applicable, pay_cycle_day, ...)
users (id, org_id, name, email, phone, role_id, is_superadmin, password_hash, ...)
permissions (id, key [e.g. "payroll.run"], module, description)  -- seeded, not editable
roles (id, org_id, name, description, is_system_role, is_locked)  -- org-scoped; is_locked=true only for OrgAdmin
role_permissions (role_id, permission_id)  -- join table: what a role can do
employees (id, org_id, employee_code, name, mobile, department, designation,
           joining_date, exit_date, bank_account, ifsc, uan, esic_no, pf_status, esic_status)
salary_structures (id, org_id, employee_id, basic, hra, conveyance, other_allowances, effective_from)
attendance (id, org_id, employee_id, date, status[present/absent/leave/half_day/holiday], ot_hours)
leave_types (id, org_id, name, days_per_year)
leave_requests (id, org_id, employee_id, leave_type_id, from_date, to_date, status)
holidays (id, org_id, date, name)
payroll_runs (id, org_id, month, year, status, run_date)
payslips (id, org_id, payroll_run_id, employee_id, gross, epf_employee, epf_employer,
          esic_employee, esic_employer, tds, pt, loan_deduction, advance_deduction,
          other_deductions, net_salary, pdf_url)
loans_advances (id, org_id, employee_id, type, amount, monthly_installment, balance)
statutory_config (id, org_id, financial_year, epf_rate, esic_rate, esic_wage_ceiling, pt_slabs)
audit_logs (id, org_id, user_id, action, entity, timestamp)
```

Statutory rates (`statutory_config`) are **never hardcoded** — EPF/ESIC/PT rates and wage ceilings change via government notification, so they live in a config table, editable by SuperAdmin, versioned by financial year.

## 7. Payroll Calculation Flow

```
Working Days (from Attendance + Holidays)
   → Pro-rated Basic / HRA / Conveyance / Allowances (based on Present + Paid Leave days)
   → + Bonus + OT pay
   = Gross Salary
   → − EPF (employee share, ~12% of Basic, capped per wage ceiling)
   → − ESIC (employee share, ~0.75%, only if Gross ≤ ceiling — currently ₹21,000)
   → − TDS (slab-based, simplified calculator with manual override — full IT filing logic is out of MVP scope)
   → − Professional Tax (if applicable, state-slab based)
   → − Loan/Advance installment
   → − Salary Hold / other manual deductions
   = Net Salary
```

Employer-side EPF/ESIC contributions are calculated in parallel for company cost reporting (not deducted from employee, but needed for the Bank Transfer / statutory reports).

## 8. Build Roadmap (phased for part-time delivery, ~15 hrs/week)

| Phase | Scope | Est. duration |
|---|---|---|
| 0 | Project setup, org onboarding, auth + RBAC | ~1 week |
| 1 | Employee Master, Attendance, Leave & Holiday | ~1.5 weeks |
| 2 | Salary Structure config + Payroll Engine + EPF/ESIC/TDS/PT calculators | ~2 weeks |
| 3 | Payslip PDF generation (branded) + Salary Register export | ~1 week |
| 4 | Reports suite + Excel import/export + Email delivery | ~1 week |
| 5 | Admin console polish, testing, deployment | ~0.5–1 week |
| 6 *(V2 add-on, separately scoped)* | Bank settlement — auto payout via RazorpayX/Cashfree API. See `PAYOUTS.md` — this ships **after** V1 has run 2-3 real payroll cycles on the manual bank-file flow, not bundled into the initial build. | ~1 week (~35-40 hrs) |

**Total: ~6-8 weeks part-time for V1.** Worth locking this timeline into the client conversation explicitly so expectations are set from day one.

## 9. Pricing & Contract Structure (important — this is your first client)

- **Quote fixed-price, not hourly**, for a scoped MVP like this — hourly invites scope creep on a first project with no track record yet.
- Given the real complexity here (multi-tenant architecture + statutory calculations + PDF/Excel generation + RBAC), this is not a ₹5-10k job — it's a genuine mid-size build. Get a sense of their budget before anchoring a number.
- **Structure payment in milestones, not one lump sum at the end** — standard protection on a first engagement: e.g., 30% upfront (before work starts), 40% at Phase 2 (payroll engine working), 30% on final delivery. Never build 6-8 weeks of work on a promise.
- One open question that changes everything about pricing: **is this client through Upwork, or a direct/local contact?** The requirement being written in Hindi suggests possibly a direct Indian client rather than a US Upwork lead — worth confirming, since it changes currency, payment platform (Upwork escrow vs. direct invoice/UPI), and whether Upwork's service fee applies.

## 10. Questions to Send the Client Before You Start Building

1. How many companies (tenants) and roughly how many employees per company should we plan for initially?
2. Is Professional Tax applicable (which state(s))?
3. Any existing biometric/attendance device to integrate, or is attendance marked manually in the system for now?
4. Timeline and budget expectations — confirm before you lock the roadmap above.

## 11. Design

See the companion prototype artifact for the core screens (Org onboarding, role-based Dashboard, Employee Master, Payroll Run, Payslip preview) — built as a working HTML/CSS mockup since Figma isn't something I can generate directly, but the layout/component decisions carry over directly into your Next.js build.

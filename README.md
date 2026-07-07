# Governance Hub

Governance Hub is a corporate hive workspace for organizing governance, risk, compliance, evidence, controls, records, vendors, expenses, and readiness signals from one executive dashboard.

It is built as a working portfolio app with sample data. A reviewer can open the workspace and see how a comprehensive corporate GRC system could be structured, navigated, validated, and expanded.

The app uses static HTML, CSS, JavaScript, local JSON, and browser-safe sample data so it can run on GitHub Pages without a backend, database, authentication layer, or build step.

## Why This Exists

Small organizations often manage governance through scattered files, inbox searches, memory, text threads, and spreadsheets that become haunted once there is more than one deadline.

Governance Hub models a cleaner operating system:

1. Capture the workspace foundation.
2. Track obligations and renewal dates.
3. Store governance records.
4. Map evidence to requirements.
5. Track risks and controls.
6. Monitor vendors, expenses, and dependencies.
7. Give leaders an executive summary.

## Current Version

Current version: **Version 2 Corporate Hive Workspace**

Version 2 keeps the app static and local-first while adding JSON-fed tables, calculated dashboard metrics, stable due-date logic, quick filters, search, category filtering, status filtering, recent activity hydration, and validation checks.

## Core Modules

- Executive Dashboard
- Workspace Profile
- Obligations Tracker
- Governance Vault
- Licenses and Permits
- Risk Register
- Controls / SOP Library
- Evidence Tracker
- Expenses
- Governance Intelligence Roadmap

## Corporate Hive Coverage

Governance Hub is organized around the major areas a corporate GRC workspace needs:

- Workspace foundation
- Ownership and roles
- Obligations and renewals
- Governance records
- Licenses and permits
- Risk register
- Controls and SOPs
- Evidence tracker
- Expense support
- Vendor dependencies
- Continuity review
- Audit readiness
- Executive reporting

See:

`docs/GRC_OPERATING_MODEL.md`

## Visual Portfolio Strategy

This repo does not require screenshots to explain the project.

The portfolio story is carried through the README, the case study, the operating model, module summaries, architecture notes, data relationships, and the validation workflow.

Screenshots can still be added later as optional polish, but they are not required proof.

See:

- `docs/README_VISUAL_STRATEGY.md`
- `docs/SCREENSHOTS.md`

## Case Study

The project includes a full case study at:

`docs/CASE_STUDY.md`

It explains the problem, product hypothesis, target user, GRC concepts, information architecture, data model, build logic, tradeoffs, roadmap, and skills demonstrated.

## Architecture

```txt
GovernanceHub/
├── index.html
├── docs/
├── assets/
├── data/
├── pages/
├── scripts/
└── styles/
```

The design system is split into focused CSS files for tokens, base styling, layout, hive visuals, cards, tables, badges, page-specific patterns, and responsive behavior.

## Data Model

Sample data lives in `/data`:

- `business.json`
- `obligations.json`
- `documents.json`
- `evidence.json`
- `risks.json`
- `controls.json`
- `expenses.json`
- `vendors.json`
- `licenses.json`
- `activity.json`

The data is sample data, but the structure is meaningful. Records use IDs, owners, dates, statuses, and relationship fields so the workspace can model how governance work connects across documents, risks, controls, evidence, expenses, vendors, and licenses.

## Version 2 Logic

Current interactive pieces:

- Local JSON loader
- Stable due-date logic
- Calculated dashboard metrics
- Dynamic dashboard deadline table
- Recent activity from `activity.json`
- JSON-backed tracker tables
- Quick filter chips
- Search filters
- Category filters
- Status filters
- License data model
- Shared corporate hive chrome cleanup
- Data validation script
- Validation GitHub Action

## Quality Gate

Run the validation script from the repository root:

```bash
node scripts/validate-data.js
```

The script checks required files, JSON parsing, ID uniqueness, key relationship links, page navigation links, and referenced CSS/script assets.

The repository also includes:

`/.github/workflows/validate-data.yml`

That workflow runs the validation check on pushes, pull requests, and manual dispatch.

## How to Run

Because Version 2 uses `fetch()` to load local JSON files, run the app from a local static server instead of opening `index.html` directly.

```bash
python3 -m http.server 8000
```

Then visit:

```txt
http://localhost:8000
```

## Suggested Review Path

```txt
Landing Page → Dashboard → Workspace Profile → Obligations → Vault → Licenses → Risks → Controls → Evidence → Expenses → Roadmap
```

## GitHub Pages

The repository includes a GitHub Actions workflow at:

`/.github/workflows/pages.yml`

Configure GitHub Pages to use GitHub Actions for deployment.

## Skills Demonstrated

- GRC workflow design
- Risk and control mapping
- Audit readiness modeling
- Governance operations
- Executive reporting
- Process modeling
- Information architecture
- Local-first product thinking
- Frontend prototyping
- Static deployment planning
- Sample data modeling
- Lightweight JavaScript logic
- Data validation thinking
- Portfolio case study writing

## Boundary

Governance Hub is a working portfolio app with sample data.

It is designed to show how a comprehensive corporate GRC workspace can be structured, navigated, validated, and expanded.

It is not a production compliance platform and does not provide legal, tax, financial, or compliance advice.

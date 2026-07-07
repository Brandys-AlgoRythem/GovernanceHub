# Governance Hub

## Overview

Governance Hub is a local-first governance operations prototype for small businesses.

It demonstrates how a small business can organize obligations, evidence, risk, controls, documents, licenses, expenses, vendors, and governance readiness from one executive dashboard.

The project is built as a static HTML, CSS, and JavaScript portfolio app so it can run on GitHub Pages without a backend, authentication, database, or build step.

## Purpose

The purpose of Governance Hub is to show how governance work can be structured before a business grows into chaos, which is apparently where humanity keeps putting important records.

This prototype focuses on:

- Executive visibility
- Compliance operations
- Risk and control mapping
- Evidence tracking
- Document readiness
- Business process modeling
- Local-first product thinking

## Why This Project Exists

Small businesses often manage governance through scattered files, memory, text threads, inbox searches, and spreadsheets that became haunted sometime around row 438.

Governance Hub models a cleaner operating system:

1. Capture the business foundation.
2. Track obligations and renewal dates.
3. Store governance documents.
4. Map evidence to requirements.
5. Track risks and controls.
6. Give leaders an executive summary.

## Core Features

- Public landing page
- Executive dashboard
- Shared sidebar and header shell
- Governance health hive visual
- Business profile page
- Obligations tracker
- Governance vault
- Licenses and permits tracker
- Risk register
- Controls / SOP library
- Evidence tracker
- Business expenses tracker
- Governance intelligence roadmap
- Static mock JSON data model
- GitHub Pages deployment workflow

## Portfolio Scope

This is a portfolio prototype, not a production compliance platform.

It is designed to show product thinking, governance structure, GRC workflow design, interface planning, and frontend execution.

It does not provide legal advice, financial advice, tax advice, or real compliance management.

## Current Version

Current version: **Version 2 Light Logic Demo**

Version 2 keeps the app static and local-first, but adds JSON-fed tables, calculated dashboard metrics, stable demo due-date logic, quick filters, search, category filtering, status filtering, and a lightweight validation script.

## Architecture

The app uses a vanilla static structure:

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

The design system is split into CSS files:

- `tokens.css` for colors, typography, spacing, and design variables
- `base.css` for global defaults
- `layout.css` for shell, sidebar, header, and grids
- `hive.css` for the governance hive visual
- `cards.css` for panels and metrics
- `tables.css` for register tables and filter chips
- `badges.css` for status chips
- `pages.css` for page-specific patterns and charts
- `responsive.css` for mobile behavior

## Mock Data Model

Mock data lives in `/data`:

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

The data is fake, but the structure is intentionally meaningful. Records include IDs, owners, dates, statuses, evidence links, document links, risk links, control links, expense links, license links, and notes so Version 2 can add lightweight logic without a backend.

## Screenshots

Screenshot guidance lives in `docs/SCREENSHOTS.md`.

Recommended screenshots:

- Landing page
- Executive dashboard
- Governance health hive
- Business profile
- Obligations tracker
- Evidence tracker
- Risk register
- Business expenses chart
- Governance intelligence roadmap

Screenshot assets should be stored in `assets/screenshots/`.

## Roadmap

### Version 1: Static Portfolio

Complete foundation with required pages, mock content, status badges, static dashboard, and CSS-only expense chart.

### Version 2: Light Logic Demo

Current additions:

- Calculated dashboard metrics from mock JSON
- Stable demo due-date logic
- JSON-fed dynamic tables
- Quick filter chips
- Search across table rows
- Category and status filters
- License data model
- Link validation script

Planned additions:

- Relationship highlighting between connected items
- Optional local storage settings or notes
- Print or export-ready mock report page
- Dashboard activity feed from `activity.json`

### Governance Intelligence Future Scope

Governance Intelligence is a future roadmap concept for local-first governance automation. Planned capabilities include document classification, SOP conflict detection, evidence gap review, obligation reminders, and executive-ready governance summaries.

## Skills Demonstrated

- GRC workflow design
- Risk and control mapping
- Audit readiness modeling
- Compliance operations
- Executive reporting
- Business process modeling
- Information architecture
- Local-first product thinking
- Frontend prototyping
- Static deployment planning
- Mock data modeling
- Lightweight JavaScript logic
- Data validation thinking

## Version 1 Acceptance Checklist

- [x] Landing page exists
- [x] Dashboard exists
- [x] Sidebar works visually
- [x] Header matches brand
- [x] Hive visual exists
- [x] 8+ pages exist
- [x] Tables use realistic mock data
- [x] Status badges are styled
- [x] Expense page has static chart
- [x] Roadmap page explains AI future scope
- [x] README explains portfolio purpose
- [x] No broken navigation links identified in required pages
- [x] CSS files are linked from required pages
- [x] App is designed for desktop
- [x] Screenshots folder/doc exists

## Version 2 Acceptance Checklist

- [x] Local JSON loader exists
- [x] Dashboard metrics calculate from mock data
- [x] Due-date logic uses a stable demo date
- [x] Major tables render from JSON
- [x] Quick filters are available on major tracker pages
- [x] Search, category filter, and status filter are available on dynamic tables
- [x] Licenses have a mock JSON model
- [x] Table targets use explicit `data-dynamic-table` anchors
- [x] Data validation script exists

## How to Run

Because Version 2 uses `fetch()` to load local JSON files, run the app from a local static server instead of opening `index.html` directly.

```bash
python3 -m http.server 8000
```

Then visit:

```txt
http://localhost:8000
```

## How to Validate

Run the lightweight validation script from the repository root:

```bash
node scripts/validate-data.js
```

The script checks required files, JSON parsing, ID uniqueness, key relationship links, page navigation links, and referenced CSS/script assets.

## GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml` to publish the static site from the repository root.

If deploying manually, configure GitHub Pages to use GitHub Actions.

## Important Boundary

Governance Hub should feel like:

> This could become a real governance platform.

It should not claim:

> This already manages compliance.

We do not lie. We present the prototype cleanly.

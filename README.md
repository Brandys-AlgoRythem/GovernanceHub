# Governance Hub

A local-first governance operations prototype for small businesses.

Governance Hub is a static portfolio app that demonstrates how small businesses can organize obligations, evidence, risk, documentation, licenses, controls, expenses, and audit readiness from one executive dashboard.

This project is intentionally built with vanilla HTML, CSS, and JavaScript so it can run directly on GitHub Pages without a build step, dependency lockfile, or the usual frontend goblin ceremony.

## Version 1 Scope

Version 1 includes:

- Landing Page
- Executive Dashboard
- Business Profile
- Obligations Tracker
- Governance Vault
- Licenses & Permits
- Risk Register
- Controls / SOP Library
- Evidence Tracker
- Business Expenses
- Governance Intelligence Roadmap

Optional modules such as Audit Center and Third-Party Risk are documented in the roadmap but intentionally excluded from the required Version 1 build.

## Portfolio Purpose

This repository is a portfolio demonstration of governance, risk, compliance, operations, and documentation architecture. It is not legal advice, financial advice, or a production compliance system.

The mock company shown in the interface is `SyNERDgy LLC`. All business details, obligations, vendors, controls, risks, expenses, and records are sample data created for demonstration.

## Design Direction

The visual system uses a dark executive command-center style with cream and gold accents, honeycomb navigation motifs, and governance-focused UI patterns.

Core design traits:

- Dark gold hive aesthetic
- Sidebar and header app shell
- Executive dashboard cards
- Hex-based governance health visualization
- Modular governance pages
- Static mock data files
- GitHub Pages-ready structure

## Project Structure

```txt
GovernanceHub/
├── index.html
├── README.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   ├── SCREENSHOTS.md
│   └── PORTFOLIO_NOTES.md
├── assets/
│   ├── icons/
│   ├── images/
│   └── screenshots/
├── data/
│   ├── business.json
│   ├── obligations.json
│   ├── risks.json
│   ├── documents.json
│   ├── evidence.json
│   ├── expenses.json
│   ├── controls.json
│   ├── vendors.json
│   └── activity.json
├── pages/
│   ├── dashboard.html
│   ├── business-profile.html
│   ├── obligations.html
│   ├── vault.html
│   ├── licenses.html
│   ├── risks.html
│   ├── controls.html
│   ├── evidence.html
│   ├── expenses.html
│   └── roadmap.html
├── scripts/
│   ├── app.js
│   ├── navigation.js
│   ├── metrics.js
│   ├── filters.js
│   ├── charts.js
│   └── relationships.js
└── styles/
    ├── tokens.css
    ├── base.css
    ├── layout.css
    ├── hive.css
    ├── cards.css
    ├── tables.css
    ├── badges.css
    ├── pages.css
    └── responsive.css
```

## Running Locally

Open `index.html` in a browser, or run a local static server:

```bash
python3 -m http.server 8000
```

Then visit:

```txt
http://localhost:8000
```

## GitHub Pages

This project includes a GitHub Actions workflow at `.github/workflows/pages.yml` to publish the static site from the repository root.

If deploying manually through repository settings, set GitHub Pages to use GitHub Actions or the root of the `main` branch.

## Key Screens

- `index.html` - public portfolio landing page
- `pages/dashboard.html` - executive dashboard and governance health hive
- `pages/business-profile.html` - entity foundation and roles
- `pages/obligations.html` - statutory and operational deadline tracking
- `pages/vault.html` - governance records inventory
- `pages/licenses.html` - permits, licenses, renewals, and owners
- `pages/risks.html` - operational and compliance risk register
- `pages/controls.html` - control and SOP library
- `pages/evidence.html` - proof, artifacts, and audit support
- `pages/expenses.html` - business expense tracking
- `pages/roadmap.html` - governance intelligence roadmap

## Status

Version 1 static build: complete foundation.

Next recommended improvements:

- Add real screenshots to `assets/screenshots/`
- Add optional Audit Center page
- Add optional Third-Party Risk page
- Add lightweight client-side charts
- Add exported governance snapshot mockup
- Add accessibility review notes

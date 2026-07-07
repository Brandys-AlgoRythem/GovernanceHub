# Governance Hub

Governance Hub is a local-first governance operations portfolio prototype for small businesses. The prototype demonstrates how obligations, evidence, risk, documentation, expenses, and audit readiness connect inside one executive governance dashboard built with HTML, CSS and lightweight JavaScript.

## Current sprint

Sprint 4 focuses on documentation and laying the groundwork for Version 2. It builds on the static pages and aesthetic completed in earlier sprints and introduces mock data and dynamic rendering for key pages.

### Completed scope

- Working branch: `print4`
- Added static risk register, controls library, and evidence tracker pages alongside the existing obligations, vault, expenses, business profile, dashboard and roadmap.
- Added mock JSON data files (`data/obligations.json`, `data/risks.json`, `data/controls.json`, `data/evidence.json`, `data/expenses.json`) to seed Version 2.
- Added a data loader script (`scripts/data.js`) and converted the obligations page to render its table from JSON.
- Added documentation: `docs/ARCHITECTURE.md` (overview of the static architecture and data model), `docs/ROADMAP.md` (detailed version roadmap), `docs/SCREENSHOTS.md` (screenshots checklist), and `docs/PORTFOLIO_NOTES.md` (portfolio narrative and design rationale).
- Updated navigation across all pages to include risks, controls and evidence.
- Prepared dynamic rendering functions for risks, controls, evidence and expenses to be implemented in Version 2.
- Updated the README to reflect Sprint 4 progress and plans for Version 2.

## Current stack

- HTML & CSS
- Vanilla JavaScript for Version 2 interactivity
- JSON files for local mock data
- No package manager, no build step, no backend – runs as a static site.

## Folder structure

```txt
/
├── assets/
│   ├── icons/
│   ├── images/
│   └── screenshots/
├── data/               # Mock JSON data files
├── docs/               # Architecture, roadmap, screenshots and portfolio notes
├── pages/              # Individual page templates
├── scripts/            # Data loader and utility scripts
├── styles/             # Token, base, layout and component styles
├── index.html
└── README.md
```

## Portfolio scope

Version 1 delivered the polished static hive-based interface. Version 2 will add lightweight JavaScript to compute due-date statuses, aggregate dashboard metrics, enable search and filters, calculate expense totals and render simple charts, highlight relationships between records, and generate print-ready reports. No external APIs or databases will be used – all data lives in local JSON.

## Run locally

Open `index.html` in a browser. Because the project is a static site, there is no install step.

## GitHub Pages readiness

This project is designed to run as a static site from the repository root. A `.nojekyll` file is included to ensure GitHub Pages serves the site correctly.

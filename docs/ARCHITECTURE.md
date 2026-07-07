# Governance Hub Architecture

## Purpose

Governance Hub is a static, local-first portfolio prototype for small business governance operations.

The project demonstrates how governance information can be organized across business identity, obligations, records, licenses, controls, evidence, risks, vendors, expenses, and roadmap intelligence.

## Build Choice

Version 2 uses vanilla HTML, CSS, and JavaScript with local JSON mock data.

Reasons:

- No dependency install required
- GitHub Pages friendly
- Easy for hiring managers to inspect
- Clear separation between pages, data, scripts, and styles
- Lightweight enough to evolve into React, Vite, or another app stack later

## App Layers

### 1. Presentation Layer

Static HTML files provide landing and internal page views.

Internal tracker pages use explicit `data-dynamic-table` anchors so JavaScript can hydrate the correct table instead of relying on whichever table appears first.

### 2. Styling Layer

CSS files are split by responsibility:

- `tokens.css` stores color, type, spacing, and radius variables
- `base.css` handles global defaults
- `layout.css` handles shell, sidebar, header, and grids
- `hive.css` handles governance health visual elements
- `cards.css` handles metrics and panels
- `tables.css` handles tracker-style tables, toolbars, and filter chips
- `badges.css` handles status tags
- `pages.css` handles page-specific patterns
- `responsive.css` handles mobile and tablet behavior

### 3. Data Layer

Mock JSON files in `/data` represent the future domain model.

Current data files:

- Business profile
- Obligations
- Documents
- Evidence
- Risks
- Controls
- Expenses
- Vendors
- Licenses
- Activity

The mock data uses IDs and relationship fields so obligations, documents, evidence, risks, controls, expenses, vendors, and licenses can be linked.

### 4. Behavior Layer

JavaScript files in `/scripts` support navigation, local JSON loading, stable demo date logic, dashboard metrics, dynamic tables, filters, search, and validation.

Current behavior scripts:

- `navigation.js` highlights active nav links and bootstraps the behavior layer
- `data.js` loads local JSON files
- `dates.js` calculates due status from a stable demo date
- `metrics.js` calculates dashboard metrics and governance health
- `tables.js` renders JSON-backed tables with quick filters, search, category filters, and status filters
- `app.js` hydrates the dashboard and table pages
- `validate-data.js` checks required files, JSON parsing, ID uniqueness, links, page navigation, and referenced assets

## Deployment

The project can be deployed as a static GitHub Pages site from the repository root.

No build command is required. For local development, use a static server so `fetch()` can load JSON data correctly.

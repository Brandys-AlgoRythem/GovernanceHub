# Governance Hub Architecture

## Purpose

Governance Hub is a static, local-first portfolio prototype for small business governance operations.

The project demonstrates how governance information can be organized across business identity, statutory obligations, records, controls, evidence, licenses, expenses, and roadmap intelligence.

## Build Choice

Version 1 uses vanilla HTML, CSS, and JavaScript.

Reasons:

- No dependency install required
- GitHub Pages friendly
- Easy for hiring managers to inspect
- Clear separation between pages, data, scripts, and styles
- Lightweight enough to evolve into React, Vite, or another app stack later

## App Layers

### 1. Presentation Layer

Static HTML files provide landing and internal page views.

### 2. Styling Layer

CSS files are split by responsibility:

- `tokens.css` stores color, type, spacing, and radius variables
- `base.css` handles global defaults
- `layout.css` handles shell, sidebar, header, and grids
- `hive.css` handles governance health visual elements
- `cards.css` handles metrics and panels
- `tables.css` handles tracker-style tables
- `badges.css` handles status tags
- `pages.css` handles page-specific patterns
- `responsive.css` handles mobile and tablet behavior

### 3. Data Layer

Mock JSON files in `/data` represent the future domain model.

Current data files:

- Business profile
- Obligations
- Risks
- Documents
- Evidence
- Expenses
- Controls
- Vendors
- Activity

### 4. Behavior Layer

JavaScript files in `/scripts` support navigation, filters, dashboard metrics, lightweight visualizations, and relationship mapping.

Version 1 keeps behavior intentionally simple so the project remains stable as a portfolio artifact.

## Deployment

The project can be deployed as a static GitHub Pages site from the repository root.

No build command is required.

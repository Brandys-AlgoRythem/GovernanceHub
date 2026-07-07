# Roadmap

Governance Hub evolves through iterative sprints. This roadmap outlines the planned versions and features.

## Version 1: Static hive portfolio (completed)

Goal: Create a polished static governance prototype with a strong visual identity, clear navigation, and realistic GRC content.

Delivered:

- Landing page, executive dashboard, business profile, obligations tracker, governance vault, risk register, controls library, evidence tracker, business expenses, and roadmap pages.
- Honeycomb design system with reusable components.
- Responsive layout and dark aesthetic.
- Static mock tables and cards.

## Version 2: Light logic demo (in progress)

Goal: Add lightweight JavaScript and mock JSON data to breathe life into the static pages.

Planned features:

- Load data from local JSON files and render tables for obligations, risks, controls, evidence and expenses.
- Compute due-date statuses (overdue, due soon, on track) from `dueDate` fields.
- Aggregate dashboard metrics (total obligations, upcoming deadlines, open risks, evidence coverage, expense totals).
- Implement simple table filters and free text search.
- Calculate monthly and quarterly expense summaries.
- Add simple charts (CSS/SVG or Chart.js) to visualise spending trends.
- Highlight relationships: hovering an obligation highlights linked evidence, documents, risks and controls.
- Export print‑ready report summarising governance health.

## Version 3: Future intelligence (conceptual)

Goal: Explore local governance intelligence without committing to backend infrastructure.

Aspirational capabilities:

- SOP conflict detection and gap analysis.
- Local LLM to summarise governance status and suggest next actions.
- Policy document classification and tagging.
- Evidence gap detection and automated reminders.
- Vendor risk scoring and integration with expense data.

## Hard scope boundaries

- Do not add authentication, real file uploads, payment systems, databases, external APIs or production AI features during the portfolio build.
- Keep all data local and anonymised.

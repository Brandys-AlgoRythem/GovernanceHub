# Architecture

Governance Hub is designed as a static, local-first prototype. It uses static HTML pages styled with CSS, a unified honeycomb aesthetic, and minimal JavaScript for Version 2 interactivity. No frameworks, build tools or servers are required.

## Structure

- **HTML pages** in `pages/` define each functional area of the prototype (dashboard, business profile, obligations, governance vault, risks, controls, evidence, expenses, roadmap).
- **Styles** in `styles/` define design tokens, base typography, layout grids, card components, badges, tables, honeycomb hexagons and responsive breakpoints.
- **Mock data** lives in `data/` as JSON files. Each file represents a core domain (obligations, risks, controls, evidence, expenses) and will be consumed by JavaScript in Version 2.
- **Scripts** in `scripts/` implement the data loader and page-specific render functions for Version 2. Each function fetches a JSON file, iterates over its items and populates a table or metric on the page.
- **Documentation** resides in `docs/` to describe architecture decisions, the roadmap of planned features, screenshot guidelines, and notes for portfolio storytelling.

## Design considerations

- **Local-first**: Everything runs in the browser with no external services, which makes the prototype easy to host on GitHub Pages.
- **Composable design system**: Shared CSS variables and components ensure consistency across pages.
- **Scalable data model**: JSON files store records with unique IDs and linked relationships to enable future relationship highlighting.
- **Progressive enhancement**: Version 1 uses static markup. Version 2 progressively enhances the same pages with JavaScript-driven interactivity without breaking the static experience.

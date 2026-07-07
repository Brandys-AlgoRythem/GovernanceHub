# Optional Screenshot Capture Guide

Screenshots are optional polish for Governance Hub.

The project is designed so the README, visual strategy notes, data relationships, validation workflow, and case study can explain the portfolio value without image files.

Use this guide only if screenshots are needed later for a portfolio site, LinkedIn post, or visual README preview.

## Local Preview

From the repository root:

```bash
python3 -m http.server 8000
```

Open:

```txt
http://localhost:8000
```

## Optional Screens

If screenshots are added later, save them in `assets/screenshots/`.

Optional file names:

- `landing-page.png`
- `dashboard.png`
- `obligations-filters.png`
- `evidence-tracker.png`
- `expenses-chart.png`
- `roadmap.png`

## Console Check

While clicking through the app, open browser developer tools and confirm there are no red console errors.

Suggested click path:

```txt
Dashboard → Obligations → Vault → Licenses → Risks → Controls → Evidence → Expenses → Roadmap
```

If the console stays clean, the demo is in good shape.

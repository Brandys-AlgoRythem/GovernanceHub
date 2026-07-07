# Screenshot Capture Guide

Use this guide to capture the portfolio screenshots for Governance Hub.

## Start the local server

From the repository root:

```bash
python3 -m http.server 8000
```

Open:

```txt
http://localhost:8000
```

## Capture these screens

Save the images in `assets/screenshots/` using these file names:

- `landing-page.png`
- `dashboard.png`
- `obligations-filters.png`
- `evidence-tracker.png`
- `expenses-chart.png`
- `roadmap.png`

## Recommended viewport

Use a desktop viewport around:

```txt
1440 x 1100
```

## Screenshot checklist

1. Landing page
2. Dashboard
3. Obligations page with filter chips visible
4. Evidence tracker with filter chips visible
5. Expenses page with chart visible
6. Roadmap page

## Console check

While clicking through the app, open browser developer tools and confirm there are no red console errors.

Click through this path:

```txt
Dashboard → Obligations → Vault → Licenses → Risks → Controls → Evidence → Expenses → Roadmap
```

If the console stays clean, the demo is in good shape.

# Governance Hub Architecture

Governance Hub is currently scoped as a static, GitHub Pages-compatible portfolio prototype.

## Current stack

- HTML
- CSS
- Vanilla JavaScript planned for Version 2
- Mock JSON data planned for Version 2
- No package manager
- No framework
- No backend
- No database

## Sprint 1 architecture decision

The repository starts as a static site so it can deploy cleanly without build tooling. This keeps the first portfolio version lightweight and easy to inspect.

## Planned structure

```txt
/
├── assets/
├── data/
├── docs/
├── pages/
├── scripts/
├── styles/
├── index.html
└── README.md
```

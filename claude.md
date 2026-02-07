# Project Rules

## Architecture

- This is a single-page application using React 18 (UMD/CDN), Tailwind CSS, and Babel for JSX transformation
- All apps are self-contained single HTML files with inline CSS/JS — no build step, no bundler
- The main portfolio is `index.html` at the repo root
- Integrated apps live in subdirectories (e.g. `engcalc-pwa/`, `lab-inventory-app/`)
- Dark zinc/amber terminal-inspired theme must be consistent across all apps

## Code Style

- Vanilla JavaScript for standalone apps, React (via UMD) for the main portfolio
- No npm/node dependencies — everything loads from CDN
- Keep apps as single HTML files; avoid splitting into separate JS/CSS unless already done (e.g. `resistor-colorcode-gen/`)
- Use `const` by default, `let` when reassignment is needed, never `var`

## Version Management

- `BUILD_COMMIT` and `BUILD_DATE` in `index.html` are auto-updated by `.githooks/pre-commit`
- `VERSION_HISTORY` array in `index.html` tracks release notes shown in the footer
- When adding new features, add an entry to `VERSION_HISTORY` and `RELEASES.md`
- Lab inventory has its own `GIT_HASH`, `BUILD_DATE`, and `VERSION_HISTORY` in `lab-inventory-app/index.html`

## Integrated Apps

- New apps are added via the `INTEGRATED_APPS` array in `index.html` CONFIG
- App directory names must also be added to `EXCLUDE_REPOS` to hide them from the portfolio project list
- Apps with `fullscreen: true` render without portfolio chrome
- PWA apps need `manifest.json` and `sw.js` for offline support

## Git Conventions

- Write concise commit messages describing the "what" and "why"
- Non-trivial changes should be reflected in `RELEASES.md` and `VERSION_HISTORY`
- The pre-commit hook at `.githooks/pre-commit` must be installed: `git config core.hooksPath .githooks`

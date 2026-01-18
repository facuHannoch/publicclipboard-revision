# Plan: SEO + Compliance

1. Review current Next.js app metadata setup and routing to locate where to add global metadata and per-route overrides.
2. Add Privacy Policy and Terms of Service pages with Appneft operator, indefinite retention, no email, and LATAM-based governing law language (pending your confirmation of exact jurisdiction wording).
3. Add SEO metadata (title/description/OG/Twitter/canonical), JSON-LD for WebSite, and route-level `noindex` for boards.
4. Add `robots.txt` and `sitemap.xml` via Next app routes; ensure boards are excluded or marked noindex.
5. Update landing page footer with links to Privacy/Terms and optional contact placeholder if desired.

Notes:
- Current layout uses Google Geist fonts; UI_DESIGN.md requires system fonts only. I will not change this unless you approve.
- I will keep all updates within this branch/workspace per instructions.


# Logs


## Catching bundler/module resolution errors

Jest does not surface bundler resolution issues. To catch errors like missing modules during CI, add:

- `npm run build` (or `next build`) in CI to validate module resolution.
- Optional: `npm run lint` + `eslint-plugin-import` (`import/no-unresolved`).
- Optional: `npm run typecheck` (`tsc --noEmit`) for type safety.

Suggested CI steps: lint -> typecheck -> build -> test.

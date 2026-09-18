# Ignite migration — Phase 0 spike

Proof-of-concept validating the riskiest assumptions from the Next.js → [Swift
Ignite](https://github.com/twostraws/Ignite) rewrite plan, before committing
to a full migration. This is not the new site — it's throwaway scaffolding
used to answer specific feasibility questions.

## What this validates

| Question | Result |
|---|---|
| Does Ignite build on Linux (needed for GitHub Actions CI, since Vercel can't run Swift)? | **Yes.** Swift 6.2 toolchain + `swift build` succeeds on Ubuntu 24.04 with no platform issues. |
| Can two-locale (`/en`, `/ja`) routing be done without framework-level i18n support? | **Yes**, via two `Site` conformances (`EnSite`, `JaSite`) sharing components/data, each published with its own `buildDirectoryPath` (`Build/en`, `Build/ja`). See `Sources/IgnitePOC/Sites.swift`. |
| Is dark/light theme switching built in (replacing Chakra's color mode)? | **Yes.** Ignite auto-injects a theme-detection script (`prefers-color-scheme` + `localStorage`) and per-theme CSS with zero extra code. |
| Is there a syntax-highlighting story to replace `rehype-pretty-code`/shiki? | **Yes**, via `CodeBlock` and Ignite's bundled Prism setup - but it's **client-side** highlighting (JS applies highlighting in-browser), not build-time. Visually equivalent, architecturally different. |
| Does Ignite generate sitemap.xml / robots.txt / RSS automatically? | **Yes**, out of the box per site, no custom code needed (replaces `sitemap.ts` / `robots.ts`). |
| Can Markdown content render (replacing MDX prose)? | **Yes** for plain Markdown (`Text(markdown:)`, or files dropped in `Content/`). MDX's embedded JSX components (the collapsible code block, SpeakerDeck iframe) have no direct equivalent and would need to become Ignite `HTML`/custom element wrappers - not yet spiked. |
| Can Vercel host the output without running Swift itself? | **Validated in principle.** `.github/workflows/ignite-poc.yml` builds with Swift in GitHub Actions, then runs `vercel deploy ./Deploy --prod` from the CI runner - Vercel receives finished static files and never invokes Swift. (Deploy step is gated on `VERCEL_TOKEN` being configured; not yet exercised end-to-end against a real Vercel project.) |
| Can legacy privacy-policy redirects move out of Next.js middleware? | **Yes, in principle** — `vercel.json`'s static `redirects` array covers all of `proxy.ts`'s legacy-URL cases with no server code. Not yet deployed/tested against real Vercel routing. |

## A real bug found along the way

Ignite's auto-injected `<script>` tags (bootstrap, ignite-core,
syntax-highlighting) in the default `Body` element use **root-absolute**
paths (`/js/...`) regardless of the site's own base URL, while `<link>`
(CSS) tags are correctly locale-prefixed (`/ja/css/...`). This means
`Build/en` and `Build/ja` can't be deployed as-is side by side - `Scripts/merge-build.sh`
works around it by keeping `css/`/`fonts/` nested per locale (as generated)
and additionally hoisting one copy of `js/` to the deploy root. Verified with
a local `python3 -m http.server` that every asset path referenced by the
generated HTML actually resolves (200, not 404) after merging.

## Explicitly NOT covered by this spike

These are real open items for the phased plan, not resolved here:

- Portal CMS blog/presentations content fetched **at build time** (vs. the
  current request-time/ISR fetch) + a webhook to trigger rebuilds on publish.
- `/blog/preview` Basic Auth gate — needs a small Vercel Serverless/Edge
  Function since Ignite has no server runtime.
- MDX's embedded interactive components (collapsible code block with copy
  button, SpeakerDeck `dangerouslySetInnerHTML` embed).
- Visual/design parity with the current Chakra UI look (this PoC uses
  Ignite's Bootstrap defaults, unstyled).
- Firebase Analytics script inclusion (mechanically simple - a `<script>`
  tag - just not wired up here).

## Running it yourself

```sh
cd ignite-poc
swift run                 # writes Build/en and Build/ja
./Scripts/merge-build.sh  # writes Deploy/ (what would ship to Vercel)
python3 -m http.server -d Deploy 8080
```

## Recommendation

Nothing found here blocks the migration. Proceed to Phase 1 (design-token
port + shared layout components) with the CMS build-time-fetch design and
the preview-auth Function as the next two things to spike, since they're the
remaining unknowns with real architectural weight.

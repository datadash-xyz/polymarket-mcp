# Datadash MCP page, React components

The approved `/mcp` page as React components for `apps/web` (Next.js App Router, React 19, Tailwind v4,
TypeScript strict). It renders the same page as the static prototype in `reference/` (serve that folder
and open `/mcp/` to compare side by side).

## What was checked (2026-09-18)

- TypeScript strict, with `noUnusedLocals` and `noUnusedParameters`: no errors.
- Server rendered and then hydrated outside the app, with no hydration or console errors.
- Compared with the approved static page at 1440px: identical visible text, headings, FAQ, hero scene,
  navbar and footer links, key links and their analytics slots, client tabs, all five setup snippets,
  copy-button labels, example questions and structured data.
- Computed styles of every element on the page (273 elements, 33 properties each) match the static page,
  with the extension page's stylesheet loaded last, the worst case for a clash (see "Styles" below).
- Behaviour in the hydrated page: a click and the arrow, Home and End keys switch the client tabs with one
  setup showing; each copy button puts its exact text on the clipboard and says "Copied" for two seconds;
  the FAQ opens.

## Install

1. Copy `src/mcp/` to `apps/web/src/feat/mcp/`.
2. Copy `public/mcp/` to `apps/web/public/mcp/`.
3. This page uses the home page package (`feat/landing`): its `theme.css` for the palette and its
   `landing.css` for the nav, hero, cards and FAQ. Both are already imported if the home page is in.
4. Add the route in the chrome-less `(landing)` group, next to the home and extension pages:

    ```tsx
    // apps/web/src/app/(landing)/mcp/page.tsx
    import {DM_Sans, Inter} from 'next/font/google';
    import {McpPage, seo} from '@datadash/web/feat/mcp';
    import {pageMetadata} from '@datadash/web/lib/pageMetadata';

    const dmSans = DM_Sans({subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-dm-sans'});
    const inter = Inter({subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter'});

    export const metadata = pageMetadata({
        title: seo.title,
        absoluteTitle: true,
        description: seo.description,
        path: '/mcp',
        images: [seo.ogImage],
    });

    export default function Page() {
        return (
            <div className={`${dmSans.variable} ${inter.variable}`}>
                <McpPage year={new Date().getFullYear()} />
            </div>
        );
    }
    ```

## Layout

```
src/mcp/
  McpPage.tsx              the page; a server component
  content.ts               every word, link, setup snippet, example question and FAQ entry, typed
  mcp.css                  GENERATED, scoped under .landing.mcp-page: the scene kit and this page's styles
  scenes.generated.ts      GENERATED: the hero scene as HTML
  components/
    ClientTabs.tsx    client   step 2's five setups: the tablist and one code block each
    CopyButton.tsx    client   copies the server address or a setup, with a fallback for old browsers
    Chrome.tsx        client   navbar (frosted on scroll) and footer
    shared.tsx        client   cn, icons, Reveal, ProductWindow (copies of the landing package's)
    Sections.tsx      server   hero, the three steps, FAQ, JSON-LD
    Scene.tsx         server   renders the generated scene
public/mcp/                  the scene's market icons and the logo
```

Only four files ship JavaScript. Everything else renders on the server.

## The hero scene

The picture in the hero is a drawn scene, not a screenshot: a chat with an assistant that has the server
connected. The question, the three tool calls (`list_cohorts`, `query_lookup`, `query_table`) and the answer
are one real exchange, pulled through the live server on 2026-09-18 and frozen in
`landing/data/mcp-scenes.json`. The answer is drawn as the app's own Signals table, because the rows are
Signals: the palette, sizes and number formats were measured on datadash.xyz/signals, and the Track button
is left out, since there is nothing to click in a chat. Tablets drop Rel. Size and Days Left; phones keep
Prediction, Score and Slippage.

`scenes.generated.ts` and `mcp.css` are generated from the prototype, so this package and the approved page
cannot drift:

```bash
node landing/tools/build-react-mcp.mjs
```

Edit the scene in `landing/scenes/mcp.mjs`, styles in `landing/src/mcp.css`, then run that. `<Scene />`
inserts the markup as HTML; it is build-time markup with no input of any kind, and the scene carries its own
`role="img"` and `aria-label`, so it reads as one picture to a screen reader.

## Styles

`mcp.css` is scoped under `.landing.mcp-page`, one class tighter than the extension package's `.landing`.
Both pages draw tables with the same class names (`.dd-table`, `.dd-tr` and the rest) in different palettes,
and in the app a stylesheet loaded for one route can stay loaded after a client-side navigation to the
other. The extra class makes this page's rules win on this page whichever file loads last, and one rule is
restated at the extension page's own specificity for the same reason. The extension page is unaffected:
nothing in `mcp.css` can match outside `.mcp-page`.

## Editing

- **Copy.** Change `content.ts`. The FAQ JSON-LD is built from the same array the page renders, so
  structured data cannot drift from the visible answers.
- **Setups.** The five client snippets are `docs.datadash.xyz/mcp-server` word for word. Change them with
  the docs, never alone. Each copy button copies exactly the string in `content.ts`.
- **Example questions.** Each one was run against the live server and answers with real rows. Run a new one
  the same way before adding it. The server's time filter takes day, week, month, quarter or year, not hour.
- **Claims.** The server needs a Datadash API key and the plan's limits apply, so the page never calls it
  free, quotes no tool-call numbers and carries no price in its structured data.
- **Search terms.** "Polymarket" stays out of the visible hero (founder's call). The phrases the page
  targets, "Polymarket MCP" and "Polymarket analytics", live in `seo` and the JSON-LD.
- **Navbar and footer.** The items match the home and extension pages on purpose; only the violet pill
  differs. `landing/tools/verify-pages.mjs` fails if the static pages drift apart.
- **Analytics.** The three links to the key page carry `data-analytics="mcp_key_click"` and a `data-slot`
  (`nav`, `hero`, `step`). Wire them where the app's analytics helper lives.

## Differences from the static page, all deliberate

- The two JSON-LD blocks are one `@graph`, as in the other packages, instead of two script tags.
- The FAQ keeps one item open with the native `name` attribute on `<details>` instead of script.
- A `<noscript>` block shows everything, hides the tab strip and stacks the five setups when JavaScript is off.
- Links are relative (`SITE_ORIGIN` is `''`), where the static page writes `https://datadash.xyz/...`.

## Before this page goes live

1. **The cohort link the server returns is dead.** Cohort results carry `https://app.datadash.xyz/cohorts/<id>`,
   and `app.datadash.xyz` does not resolve. The working link is `https://datadash.xyz/cohorts/<id>`, which is
   what the hero draws. Every assistant that creates a cohort hands users a dead link until the server is fixed.
2. **Plan limits are not enforced.** The pricing section sells 100, 10K and 1M tool calls a day, and nothing
   in the backend counts them. This page only says the plan's limits apply.
3. **"Biggest edge" answers need a floor.** Sorted by raw edge, `globalSmartMoney` puts single wallets with
   $0 at risk first. The web app hides markets under $5,000 at risk; the server does not, so an assistant
   asked the page's third example question may lead with noise until it applies the same floor.
4. **The server answers without a key.** Reads work anonymously today. If that is deliberate, the FAQ still
   holds for your own cohorts and plan limits; worth confirming either way.

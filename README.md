# polymarketmcp.com

The approved Datadash MCP page (datadash.xyz/mcp), served at [polymarketmcp.com](https://polymarketmcp.com). One
page, statically exported and deployed to GitHub Pages on every push to `main` (`.github/workflows/pages.yml`).
Every other path on the domain forwards to datadash.xyz.

```sh
pnpm install
pnpm dev           # http://localhost:3000
pnpm build         # static site in out/
pnpm check-types
```

`src/feat/mcp` and `public/mcp` are `datadash-mcp-page.zip` (2026-09-18) as delivered, with two changes:
`SITE_ORIGIN` in `content.ts` is `https://datadash.xyz`, as that file says to set it when the page is hosted
outside the app, and `Scene.tsx` joins its class names itself, because a server component cannot call `cn`
from the client module `shared.tsx`. `src/app/landing.css` is the zip's `reference/landing.css`, and the
tokens in `src/app/tailwind.css` are the ones in `reference/mcp/index.html`.

Checked against `reference/mcp/` at 1440px and 390px: identical text, height and element tree, and the computed
styles of all 370 elements match.

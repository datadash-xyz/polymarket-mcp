import {SITE_ORIGIN} from '@/feat/mcp/content';

/**
 * 404.html, which GitHub Pages serves for every path but `/`. The domain has one page, so the visitor goes on to the
 * same path on datadash.xyz, where the links people follow or guess (/pricing, /leaderboard, ...) live. Pages cannot
 * send a server redirect, so it is a script, with a link for when scripts are off. Next marks the page noindex.
 */
export default function NotFound() {
    const forward = `location.replace(${JSON.stringify(SITE_ORIGIN)} + location.pathname + location.search + location.hash)`;
    return (
        <main className="flex min-h-screen items-center justify-center px-6 text-center text-muted-foreground">
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: a fixed redirect, no user input */}
            <script dangerouslySetInnerHTML={{__html: forward}} />
            <p>
                Continue to{' '}
                <a href={SITE_ORIGIN} className="text-white underline">
                    datadash.xyz
                </a>
            </p>
        </main>
    );
}

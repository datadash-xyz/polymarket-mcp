import './mcp.css';
import {Footer, Navbar} from './components/Chrome';
import {Faq, Hero, JsonLd, Setup} from './components/Sections';

type McpPageProps = {
    /** Footer year. Pass it from the server so the first render and hydration agree. */
    year?: number;
};

/**
 * The marketing page for the Datadash MCP server, at /mcp. A server component: only the client tabs, the
 * copy buttons, the navbar and the hero window's tilt need the browser.
 *
 * `landing` scopes the home page package's palette (theme.css) and shared styling (landing.css: nav,
 * hero, cards, FAQ). `mcp-page` scopes this page's own rules (mcp.css), one class tighter than the
 * extension page's, so the two pages' same-named table styles can both be loaded without clashing.
 */
export function McpPage({year = new Date().getFullYear()}: McpPageProps) {
    return (
        <div className="landing mcp-page min-h-screen bg-background font-landing text-foreground">
            <Navbar />
            <main>
                <Hero />
                <Setup />
                <Faq />
            </main>
            <Footer year={year} />
            <JsonLd />
            {/* Without JavaScript nothing would ever get `is-visible`, and the client tabs cannot switch, so
                show everything, hide the tab strip and stack the five setups under their own headings. */}
            <noscript>
                <style>
                    {`[data-reveal]{opacity:1!important;transform:none!important}
                      .client-panel{display:block!important}
                      .client-panel + .client-panel{margin-top:28px}
                      .client-panel > .client-name{display:block!important}
                      .client-strip,.copy-btn{display:none!important}`}
                </style>
            </noscript>
        </div>
    );
}

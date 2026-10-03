/**
 * Every word, link, setup snippet and FAQ entry on the /mcp page lives here, so copy edits never touch a
 * component. Taken from the approved static page (landing/src/mcp.html) on 2026-09-18.
 *
 * Rules the copy follows (founder decisions, 2026-09-17 and 18):
 *  - The server needs a Datadash API key and the user's plan limits apply, so the page never calls it
 *    free, quotes no tool-call numbers and carries no price in its structured data.
 *  - The five setups are docs.datadash.xyz/mcp-server word for word. Change them together.
 *  - "Polymarket" stays out of the visible hero; the search terms "Polymarket MCP" and "Polymarket
 *    analytics" live in the title, description and JSON-LD.
 *  - Every example question has been run against the live server and answers with real rows.
 */
import type {SceneName} from './scenes.generated';

/** '' keeps links relative, which is right inside apps/web. Set to 'https://datadash.xyz' if hosted elsewhere. */
export const SITE_ORIGIN = 'https://datadash.xyz';
/** Where the images in `public/mcp/` are served from. */
export const ASSET_BASE = '/mcp';
export const asset = (file: string) => `${ASSET_BASE}/${file}`;

/** The server itself. Every setup below points here, with the key in the `X-Api-Key` header. */
export const MCP_URL = 'https://api.datadash.xyz/mcp';

export const links = {
    home: `${SITE_ORIGIN}/`,
    pricing: `${SITE_ORIGIN}/#pricing`,
    homeFeatures: `${SITE_ORIGIN}/#features`,
    extension: `${SITE_ORIGIN}/extension`,
    apiKeys: `${SITE_ORIGIN}/settings/api-keys`,
    docs: 'https://docs.datadash.xyz/',
    support: `${SITE_ORIGIN}/support`,
    terms: `${SITE_ORIGIN}/terms`,
    privacy: `${SITE_ORIGIN}/privacy`,
    telegram: 'https://t.me/datadashxyz',
    x: 'https://x.com/datadashxyz',
} as const;

export const seo = {
    title: 'Polymarket MCP: Polymarket Analytics for AI Agents | Datadash',
    description:
        'The Datadash Polymarket MCP server brings Polymarket analytics to Claude Code, Cursor, Codex and VS Code. Ask about traders and Smart Money in plain English.',
    canonical: 'https://datadash.xyz/mcp',
    ogImage: 'https://datadash.xyz/brand/og.png',
} as const;

/** The same three items as the home page, which `landing/tools/verify-pages.mjs` checks. */
export const nav = [
    {label: 'Features', href: '#setup'},
    {label: 'Pricing', href: links.pricing},
    {label: 'FAQs', href: '#faq'},
] as const;

/** The violet pill in the navbar, the hero's primary button and step 1's link all open the key page. */
export const keyCta = {
    label: 'Get your API key',
    href: links.apiKeys,
    /** Wire where the app's analytics helper lives, with the `slot` each link carries. */
    analytics: 'mcp_key_click',
} as const;

export const hero = {
    headline: 'Ask your AI agent',
    /** Resolves from a blur (`.hero-accent`). */
    headlineAccent: 'what Smart Money is doing',
    subheadline: {
        before: 'Add the Datadash MCP server to Claude Code, Cursor, Codex or ',
        /** Kept on one line, so the product name never splits. */
        unbroken: 'VS Code',
        after: '.',
        second: 'Ask in plain English; your assistant writes the queries.',
    },
    stepsCta: 'See the steps',
    scene: 'hero' satisfies SceneName,
} as const;

export const setupSection = {
    heading: 'Connect it in three steps',
    subheading: 'Datadash hosts the server, so there is nothing to install and nothing to run.',
} as const;

export const steps = {
    key: {
        title: 'Create an API key',
        body: 'Open Settings, then API Keys, and create one. It is shown once. Make a separate key for your assistant, so you can revoke that one on its own.',
        link: 'Open API Keys',
    },
    server: {
        title: 'Add the server to your client',
        body: {before: 'One address, over Streamable HTTP, with your key in the ', code: 'X-Api-Key', after: ' header.'},
        copyLabel: 'Copy the server address',
    },
    ask: {
        title: 'Ask your first question',
        body: 'Start a new chat and ask about the data. Your assistant works out the table, the fields and the filters itself.',
    },
} as const;

export type ClientSetup = {
    id: string;
    /** The tab. */
    label: string;
    /** The heading over the setup when the tabs are stacked (no JavaScript). */
    name: string;
    /** Where it goes: a file, the terminal, or any client. */
    file: string;
    code: string;
    copyLabel: string;
    note: string;
};

const lines = (...rows: string[]) => rows.join('\n');

/** docs.datadash.xyz/mcp-server, word for word. */
export const clients: ClientSetup[] = [
    {
        id: 'claude',
        label: 'Claude Code',
        name: 'Claude Code',
        file: 'Terminal',
        code: lines('claude mcp add --scope user --transport http datadash \\', '  https://api.datadash.xyz/mcp \\', '  --header "X-Api-Key: <your-api-key-here>"'),
        copyLabel: 'Copy the Claude Code command',
        note: 'Scope user makes it available in every project. Start a new session, open the MCP menu, and datadash is listed as connected.',
    },
    {
        id: 'cursor',
        label: 'Cursor',
        name: 'Cursor',
        file: '~/.cursor/mcp.json',
        code: lines(
            '{',
            '  "mcpServers": {',
            '    "datadash": {',
            '      "url": "https://api.datadash.xyz/mcp",',
            '      "headers": {',
            '        "X-Api-Key": "<your-api-key-here>"',
            '      }',
            '    }',
            '  }',
            '}'
        ),
        copyLabel: 'Copy the Cursor configuration',
        note: 'Use .cursor/mcp.json instead to limit it to one project. A green dot next to datadash in Cursor Settings means it is connected.',
    },
    {
        id: 'codex',
        label: 'Codex',
        name: 'Codex',
        file: '~/.codex/config.toml',
        code: lines('[mcp_servers.datadash]', 'url = "https://api.datadash.xyz/mcp"', 'http_headers = { "X-Api-Key" = "<your-api-key-here>" }'),
        copyLabel: 'Copy the Codex configuration',
        note: 'Codex cannot set a custom header from the command line, so it goes in the file. To keep the key out of it, use env_http_headers and export the key in your shell.',
    },
    {
        id: 'vscode',
        label: 'VS Code',
        name: 'VS Code',
        file: '.vscode/mcp.json',
        // `${input:...}` is VS Code's own placeholder, kept literal: these are plain strings, not templates.
        code: lines(
            '{',
            '  "inputs": [',
            '    {"type": "promptString", "id": "datadash-api-key", "description": "Datadash API key", "password": true}',
            '  ],',
            '  "servers": {',
            '    "datadash": {',
            '      "type": "http",',
            '      "url": "https://api.datadash.xyz/mcp",',
            '      "headers": {"X-Api-Key": "${input:datadash-api-key}"}',
            '    }',
            '  }',
            '}'
        ),
        copyLabel: 'Copy the VS Code configuration',
        note: 'The inputs entry has VS Code ask for the key once and store it, so it never sits in the file. Select Start above the datadash entry, then use Chat in agent mode.',
    },
    {
        id: 'other',
        label: 'Other',
        name: 'Other clients',
        file: 'Most clients',
        code: lines(
            '{',
            '  "mcpServers": {',
            '    "datadash": {',
            '      "type": "http",',
            '      "url": "https://api.datadash.xyz/mcp",',
            '      "headers": {"X-Api-Key": "<your-api-key-here>"}',
            '    }',
            '  }',
            '}'
        ),
        copyLabel: 'Copy the generic configuration',
        note: 'Any client that speaks Streamable HTTP and can send a custom header will work. The server is stateless: every request is authenticated on its own, and no session carries over between them.',
    },
];

/** Each one was run against the live server and answers with real rows. Check a new one the same way. */
export const prompts = [
    'Who are the top 10 wallets by realized PnL in crypto markets?',
    'What is smart money positioned on in the biggest active politics markets?',
    'Which markets resolving in the next 30 days have the biggest smart money edge among the top 1,000 traders?',
    'Build a cohort of wallets with over $100k in volume and a win rate above 60%, then tell me what they are holding.',
] as const;

export const faqSection = {
    heading: 'Your questions, answered',
    subheading: 'What the MCP server reaches, and what it does not.',
} as const;

/** Only questions about Datadash. The JSON-LD is built from this same array, so it cannot drift from the page. */
export const faq: {question: string; answer: string}[] = [
    {
        question: 'Do I need a Datadash account?',
        answer: 'Yes. The server authenticates with a Datadash API key, which you create under Settings, API Keys. The limits of your Datadash plan apply to tool calls too.',
    },
    {
        question: 'What can the assistant do with my key?',
        answer: 'Everything your account can do, including creating, changing and deleting your cohorts. Create a key just for your MCP client, so you can revoke it without affecting anything else.',
    },
    {
        question: 'Which AI tools can connect to it?',
        answer: 'Any client that speaks Streamable HTTP and can send a custom header. Claude Code, Cursor, Codex and VS Code all can, and each has its own tab in the setup above.',
    },
    {
        question: 'Is it the same data as the app?',
        answer: 'Yes. A tool call runs through the same filters, validation and authentication as the equivalent REST request, so anything you ask here you can reproduce with curl.',
    },
    {
        question: 'Where does the data come from?',
        answer: 'Datadash indexes Polymarket trades directly from the Polygon blockchain, and calculates PnL, ranks, Signals and Smart Money from them. Market names and images come from Polymarket.',
    },
    {
        question: 'Is it affiliated with Polymarket?',
        answer: 'No. Datadash is an independent company. The MCP server is not affiliated with or endorsed by Polymarket.',
    },
];

/** For the SoftwareApplication entry in the JSON-LD. */
export const software = {
    name: 'Datadash Polymarket MCP Server',
    alternateName: ['Polymarket MCP server by Datadash', 'Polymarket analytics MCP', 'DataDash Analytics MCP'],
    softwareRequirements: 'An MCP client that speaks Streamable HTTP and can send a custom header',
    featureList: [
        'Query fourteen Polymarket analytics tables in plain English',
        'Find markets, events and traders by name',
        'Create and update cohorts of wallets',
        'Read a cohort’s wallets',
        'Signals and Smart Money from an AI assistant',
    ],
    breadcrumb: 'Polymarket MCP server',
} as const;

export const footer = {
    tagline: 'The intelligence layer for prediction markets',
    /** The same two columns as the home page footer. */
    navigation: [
        {label: 'Features', href: links.homeFeatures},
        {label: 'Pricing', href: links.pricing},
        {label: 'Extension', href: links.extension},
        {label: 'MCP', href: '#hero'},
    ],
    information: [
        {label: 'FAQ', href: '#faq'},
        {label: 'Docs', href: links.docs},
        {label: 'Support', href: links.support},
        {label: 'Terms', href: links.terms},
        {label: 'Privacy', href: links.privacy},
    ],
    legal: 'All Rights Reserved. Not affiliated with or endorsed by Polymarket.',
} as const;

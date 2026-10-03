import {GoogleAnalytics} from '@next/third-parties/google';
import type {Metadata, Viewport} from 'next';
import {DM_Sans, Inter} from 'next/font/google';
import type {ReactNode} from 'react';
import './tailwind.css';
// The approved static page's own sheet: nav, hero, buttons, cards, reveals and FAQ. McpPage imports mcp.css.
import './landing.css';

// The weights the approved page loads from Google Fonts, self-hosted by next/font.
const dmSans = DM_Sans({subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-dm-sans'});
const inter = Inter({subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter'});

/** Site-wide metadata. The page's title, description, canonical and share card are in page.tsx. */
export const metadata: Metadata = {
    icons: {
        // Favicon assets carry a transparent safe-area margin so Google's circular crop (and browser tab
        // rounding) doesn't clip the full-bleed glyph.
        icon: [
            {url: '/brand/favicon.ico', sizes: '48x48', type: 'image/x-icon'},
            {url: '/brand/favicon.svg', type: 'image/svg+xml'},
            {url: '/brand/favicon-16.png', sizes: '16x16', type: 'image/png'},
            {url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png'},
            {url: '/brand/favicon-48.png', sizes: '48x48', type: 'image/png'},
        ],
        shortcut: '/brand/favicon.ico',
        apple: [{url: '/brand/apple-180.png', sizes: '180x180', type: 'image/png'}],
    },
    verification: {
        google: '-7eOZkDF_8YAZaXIqEnJHI5s3bjjSfrFBYq43EWGQn0',
    },
};

export const viewport: Viewport = {
    themeColor: '#030303',
};

export default function RootLayout({children}: Readonly<{children: ReactNode}>) {
    return (
        <html lang="en" className={`dark ${dmSans.variable} ${inter.variable}`} style={{colorScheme: 'dark'}}>
            <body className="bg-background font-sans text-foreground">
                {/* Only the Pages deploy builds in GitHub Actions, so local builds stay out of GA. */}
                {process.env.GITHUB_ACTIONS === 'true' && <GoogleAnalytics gaId="G-7FT8ZGTC63" />}
                {children}
            </body>
        </html>
    );
}

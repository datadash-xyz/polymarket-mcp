import type {Metadata} from 'next';
import {McpPage, seo} from '@/feat/mcp';

// Next replaces `openGraph` and `twitter` wholesale rather than merging them, so both are written out in full.
// The canonical is the package's own, datadash.xyz/mcp: this is the same page.
export const metadata: Metadata = {
    title: {absolute: seo.title},
    description: seo.description,
    alternates: {canonical: seo.canonical},
    openGraph: {
        title: seo.title,
        description: seo.description,
        url: seo.canonical,
        siteName: 'Datadash',
        type: 'website',
        images: [seo.ogImage],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@datadashxyz',
        creator: '@datadashxyz',
        title: seo.title,
        description: seo.description,
        images: [seo.ogImage],
    },
};

export default function Page() {
    return <McpPage year={new Date().getFullYear()} />;
}

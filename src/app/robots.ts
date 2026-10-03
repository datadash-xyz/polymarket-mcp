import type {MetadataRoute} from 'next';

export const dynamic = 'force-static';

/**
 * No sitemap: the page's canonical is datadash.xyz/mcp, which datadash.xyz's own sitemap lists, and listing
 * this copy as well would contradict it.
 */
export default function robots(): MetadataRoute.Robots {
    return {rules: {userAgent: '*', allow: '/'}};
}

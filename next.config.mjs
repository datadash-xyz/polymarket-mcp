/**
 * A static export: GitHub Pages serves `out/` (see .github/workflows/pages.yml). Pages has no server, so there are
 * no redirects here. It sends www to the apex itself, and every other path gets 404.html, which forwards to
 * datadash.xyz (src/app/not-found.tsx).
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;

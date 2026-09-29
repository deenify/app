import fs from "node:fs/promises";
import path from "node:path";

import type { clientEnv } from "@/env/client";

export async function generateSitemap(env: typeof clientEnv) {
    const now = new Date().toISOString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${env.APP_URL}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
`;

    await fs.writeFile(
        path.join(process.cwd(), "public", "sitemap.xml"),
        xml,
        "utf8",
    );

    console.log("✓ sitemap.xml");
}
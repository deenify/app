import fs from "node:fs/promises";
import path from "node:path";

import type { clientEnv } from "@/env/client";

export async function generateManifest(env: typeof clientEnv) {
    const manifest = {
        id: "/",

        name: env.APP_NAME,
        short_name: env.APP_NAME,

        description: env.APP_DESCRIPTION,

        lang: "en",
        dir: "ltr",

        start_url: "/",
        scope: "/",

        display: "standalone",
        orientation: "portrait-primary",

        background_color: "#ffffff",
        theme_color: "#10b981",

        icons: [
            {
                src: "/icons/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: "/icons/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };

    await fs.writeFile(
        path.join(process.cwd(), "public", "manifest.webmanifest"),
        JSON.stringify(manifest, null, 4),
        "utf8",
    );

    console.log("✓ manifest.webmanifest");
}
import fs from "node:fs/promises";
import path from "node:path";

import type { clientEnv } from "@/env/client";

export async function generateLlms(env: typeof clientEnv) {
    const content = `# ${env.APP_NAME}

${env.APP_DESCRIPTION}

Website: ${env.APP_URL}
Support: ${env.APP_SUPPORT_EMAIL}

## Overview

${env.APP_NAME} is an Islamic lifestyle platform that provides tools and educational resources for Muslims worldwide.

## Features

- Quran
- Hadith
- Prayer Times
- Adhan
- Qibla
- Islamic Guides

## Canonical URL

${env.APP_URL}
`;

    await fs.writeFile(
        path.join(process.cwd(), "public", "llms.txt"),
        content,
        "utf8",
    );

    console.log("✓ llms.txt");
}
import dotenv from "dotenv";
import path from "node:path";

// Load environment variables
dotenv.config({
    path: path.resolve(process.cwd(), ".env.local"),
});

async function main() {
    const { clientEnv } = await import("@/env/client");

    const { generateManifest } = await import("./manifest");
    const { generateSitemap } = await import("./sitemap");
    const { generateLlms } = await import("./llms");

    console.clear();

    console.log("");
    console.log("Generating static files...");
    console.log("");

    await generateManifest(clientEnv);
    await generateSitemap(clientEnv);
    await generateLlms(clientEnv);

    console.log("");
    console.log("✓ Static assets generated successfully.");
    console.log("");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
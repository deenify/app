import dotenv from "dotenv";
import path from "node:path";
import os from "node:os";
import { spawn } from "node:child_process";
import qrcode from "qrcode-terminal";

dotenv.config({
    path: path.resolve(process.cwd(), ".env.local"),
});

function getLocalIPAddress(): string {
    const interfaces = os.networkInterfaces();

    for (const interfaceName of Object.keys(interfaces)) {
        const networkInterface = interfaces[interfaceName];

        if (!networkInterface) continue;

        for (const network of networkInterface) {
            if (network.family === "IPv4" && !network.internal) {
                return network.address;
            }
        }
    }

    return "localhost";
}

async function main() {
    const { clientEnv } = await import("@/env/client");

    const PORT = clientEnv.APP_PORT;

    const ipAddress = getLocalIPAddress();
    const mobileURL = `http://${ipAddress}:${PORT}`;

    console.clear();

    console.log("");
    console.log("Next.js QR Development Server");
    console.log("");
    console.log(`Mobile   ${mobileURL}`);
    console.log("");

    qrcode.generate(mobileURL, {
        small: true,
    });

    console.log("");

    const nextProcess = spawn(
        "npx",
        [
            "next",
            "dev",
            "-H",
            "0.0.0.0",
            "-p",
            PORT.toString(),
            "--turbo",
        ],
        {
            stdio: "inherit",
            shell: true,
        }
    );

    nextProcess.on("close", (exitCode) => {
        process.exit(exitCode ?? 0);
    });
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
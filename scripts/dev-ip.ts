import os from "node:os";
import { spawn } from "node:child_process";
import { clientEnv } from "@/env/client";

const PORT = clientEnv.APP_PORT;

function getLocalIPAddress(): string {
    const interfaces = os.networkInterfaces();

    for (const interfaceName of Object.keys(interfaces)) {
        const networkInterface = interfaces[interfaceName];

        if (!networkInterface) continue

        for (const network of networkInterface) {
            const isIPv4 = network.family === "IPv4"

            if (isIPv4 && !network.internal) {
                return network.address;
            }
        }
    }

    return "localhost";
}

const ipAddress = getLocalIPAddress();

const localURL = `http://localhost:${PORT}`;
const mobileURL = `http://${ipAddress}:${PORT}`;

console.clear();

console.log("");
console.log("Next.js Development Server");
console.log("");
console.log(`Local    ${localURL}`);
console.log(`Mobile   ${mobileURL}`);
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

nextProcess.on("close", (exitCode) => { process.exit(exitCode ?? 0) });
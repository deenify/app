// src/env/client.ts
import { z } from "zod";


// Schema 
const clientEnvSchema = z.object({
    APP_PORT: z.string().min(4).default("1426"),
});

export const clientEnv = clientEnvSchema.parse({
    APP_PORT: process.env.NEXT_PUBLIC_APP_PORT,
});


export type ClientEnv = z.infer<typeof clientEnvSchema>;
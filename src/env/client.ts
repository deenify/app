// src/env/client.ts
import { z } from "zod";


// Schema 
const clientEnvSchema = z.object({
    // ApiBase: z.string().url(),
});



// Environmental Variables 
export const clientEnv = clientEnvSchema.parse({
    // ApiBase: process.env.NEXT_PUBLIC_API_BASE,
});



// Type 
export type ClientEnv = z.infer<typeof clientEnvSchema>;
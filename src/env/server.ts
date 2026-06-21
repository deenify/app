// src/env/server.ts
import { z } from "zod";

import "server-only";

if (typeof window !== "undefined") {
    throw new Error(
        `serverEnv imported in browser. Stack:\n${new Error().stack}`
    );
}


// Schema 
const serverEnvSchema = z.object({
    // App Configurations 
    APP_NAME: z.string().min(1),

    // Backend Configurations 
    API_URL: z.string().url(),
    API_KEY: z.string().min(1),
    SUPABASE_URL: z.string().url(),
    SUPABASE_KEY: z.string().min(1),
    ENCODING_SECRET: z.string().min(1),
    JWT_SECRET: z.string().min(1),
});


// Environmental Variables 
export const serverEnv = serverEnvSchema.parse({
    // App Configurations 
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,

    // Backend Configurations 
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    ENCODING_SECRET: process.env.ENCODING_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
});


export type ServerEnv = z.infer<typeof serverEnvSchema>;
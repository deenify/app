// src/env/client.ts
import { z } from "zod";


// Schema 
const clientEnvSchema = z.object({
    // App Configurations
    APP_PORT: z.string().min(4),
    APP_NAME: z.string().min(1),
    APP_DESCRIPTION: z.string().min(1),
    APP_URL: z.string().url(),
    APP_DASHBOARD_URL: z.string().url(),
    APP_LOGO: z.string().url(),
    APP_TWITTER: z.string().url(),
    APP_FACEBOOK: z.string().url(),
    APP_INSTAGRAM: z.string().url(),
    APP_YOUTUBE: z.string().url(),
    APP_LINKEDIN: z.string().url(),
    APP_PINTEREST: z.string().url(),
    APP_TIKTOK: z.string().url(),

    APP_SUPPORT_EMAIL: z.string().email(),

    // Backend Configurations 
    API_URL: z.string().url(),
    API_KEY: z.string().min(1),
});


// Environmental Variables 
export const clientEnv = clientEnvSchema.parse({
    // App Configurations
    APP_PORT: process.env.NEXT_PUBLIC_APP_PORT,
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_Description,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    APP_DASHBOARD_URL: process.env.NEXT_PUBLIC_APP_DASHBOARD_URL,
    APP_LOGO: process.env.NEXT_PUBLIC_APP_Logo,
    APP_TWITTER: process.env.NEXT_PUBLIC_APP_TWITTER,
    APP_FACEBOOK: process.env.NEXT_PUBLIC_APP_FACEBOOK,
    APP_INSTAGRAM: process.env.NEXT_PUBLIC_APP_INSTAGRAM,
    APP_YOUTUBE: process.env.NEXT_PUBLIC_APP_YOUTUBE,
    APP_LINKEDIN: process.env.NEXT_PUBLIC_APP_LINKEDIN,
    APP_PINTEREST: process.env.NEXT_PUBLIC_APP_PINTEREST,
    APP_TIKTOK: process.env.NEXT_PUBLIC_APP_TIKTOK,

    APP_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_APP_SUPPORT_EMAIL,

    // Backend Configurations 
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
});


export type ClientEnv = z.infer<typeof clientEnvSchema>;

// src/env/server.ts
import { z } from "zod";


// Schema 
const serverEnvSchema = z.object({
    // MongoUri: z.string().url(),
});



// Environmental Variables 
export const serverEnv = serverEnvSchema.parse({
    // MongoUri: process.env.MONGO_DB_URI,
});



// Type 
export type ServerEnv = z.infer<typeof serverEnvSchema>;
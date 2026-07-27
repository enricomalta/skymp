import { z } from "zod";

export const EnvironmentSchema = z.object({
    PORT: z.coerce.number().int().positive(),

    NODE_ENV: z.enum([
        "development",
        "production",
        "test"
    ]),

    MONGO_URI: z.string().min(1),

    JWT_SECRET: z.string().min(32)
});

export type Environment = z.infer<typeof EnvironmentSchema>;
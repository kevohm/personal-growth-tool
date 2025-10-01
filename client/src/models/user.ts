import z from "zod";
import { baseSchema } from ".";

/**
 * User schema
 */
export const userZodSchema = baseSchema.extend({
    email: z.email(),
    password: z.string(), // in real apps, store hashed passwords
    name: z.string(),
});
export type User = z.infer<typeof userZodSchema>;
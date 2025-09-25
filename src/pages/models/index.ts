import { createId } from "@paralleldrive/cuid2";
import z from "zod";

export const baseSchema = z.object({
     id: z.string().max(128).default(() => createId())
})
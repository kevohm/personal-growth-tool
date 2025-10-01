import { createId } from "@paralleldrive/cuid2";
import z from "zod";

export const baseSchema = z.object({
     id: z.string().max(128).default(() => createId())
})

export const dateSchema = z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Date must be a valid calendar date"
    )
export const amountSchema = z
      .union([z.number(), z.string()])
      .transform((val) => {
        const num = typeof val === "string" ? Number(val) : val;
        if (isNaN(num)) throw new Error("Amount must be a valid number");
        return num;
      })
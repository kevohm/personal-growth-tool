import z from "zod";

export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, must be YYYY-MM-DD")
  .transform((val) => new Date(val).toISOString());

export const baseSchema = z.object({
  id: z.string().optional(),
  isDeleted: z.boolean().default(false),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

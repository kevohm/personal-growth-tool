import toast from "react-hot-toast";
import { ZodError } from "zod";

export function handleError(err: unknown) {
  if (err instanceof ZodError) {
    // Show first validation issue
    toast.error(err.issues[0].message ?? "Invalid input");
  } else if (err instanceof Error) {
    toast.error(err.message || "Something went wrong");
  } else {
    toast.error("An unexpected error occurred");
  }
}
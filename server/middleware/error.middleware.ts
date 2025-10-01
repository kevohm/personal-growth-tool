import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    const errors = err.issues.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));

    return res.status(422).json({
      status: 422,
      errors,
    });
  }

  // JWT or auth errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: 401,
      message: "Invalid or expired token",
    });
  }

  // fallback for unexpected errors
  console.error("❌ Unexpected Error:", err);
  return res.status(500).json({
    status: 500,
    message: "Internal server error",
  });
}

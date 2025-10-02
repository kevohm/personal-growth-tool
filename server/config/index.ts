import dotenv from "dotenv";

dotenv.config(); // loads .env file into process.env use dotenvx for more flexibility

// Helper to enforce required env vars
function requireEnv(key: string, fallback?: string): string {
  const value = process.env[key] || fallback;
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}
export const ACCESS_SECRET = requireEnv("JWT_ACCESS_SECRET");
export const REFRESH_SECRET = requireEnv("JWT_REFRESH_SECRET");

export const ACCESS_EXP = process.env.ACCESS_TOKEN_EXPIRY || "15m"; // fallback
export const REFRESH_EXP_DAYS = Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS || 7);
export const RESET_TOKEN_EXP_MIN = Number(process.env.RESET_TOKEN_EXPIRY_MINUTES || 60);
export const APP_URL = process.env.APP_URL || "http://localhost:4000";

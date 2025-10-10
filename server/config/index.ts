import nodemailer from "nodemailer";

// Helper to enforce required env vars
function requireEnv(key: string, fallback?: string): string {
  const value = process.env[key] || fallback;
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

// ===== JWT CONFIG =====
export const ACCESS_SECRET = requireEnv("JWT_ACCESS_SECRET");
export const REFRESH_SECRET = requireEnv("JWT_REFRESH_SECRET");

export const ACCESS_EXP = process.env.ACCESS_TOKEN_EXPIRY || "15m"; // fallback
export const REFRESH_EXP_DAYS = Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS || 7);
export const RESET_TOKEN_EXP_MIN = Number(process.env.RESET_TOKEN_EXPIRY_MINUTES || 60);

// ===== APP CONFIG =====
export const APP_URL = process.env.APP_URL || "http://localhost:4000";

// ===== EMAIL CONFIG =====
export const SMTP_HOST = requireEnv("SMTP_HOST");
export const SMTP_PORT = Number(requireEnv("SMTP_PORT", "587"));
export const SMTP_USER = requireEnv("SMTP_USER");
export const SMTP_PASS = requireEnv("SMTP_PASS");

// Create reusable transporter object using SMTP
export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // use TLS (false for ports 587, true for 465)
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

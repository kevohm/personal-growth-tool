"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_URL = exports.RESET_TOKEN_EXP_MIN = exports.REFRESH_EXP_DAYS = exports.ACCESS_EXP = exports.REFRESH_SECRET = exports.ACCESS_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // loads .env file into process.env use dotenvx for more flexibility
// Helper to enforce required env vars
function requireEnv(key, fallback) {
    const value = process.env[key] || fallback;
    if (!value)
        throw new Error(`Missing environment variable: ${key}`);
    return value;
}
exports.ACCESS_SECRET = requireEnv("JWT_ACCESS_SECRET");
exports.REFRESH_SECRET = requireEnv("JWT_REFRESH_SECRET");
exports.ACCESS_EXP = process.env.ACCESS_TOKEN_EXPIRY || "15m"; // fallback
exports.REFRESH_EXP_DAYS = Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS || 7);
exports.RESET_TOKEN_EXP_MIN = Number(process.env.RESET_TOKEN_EXPIRY_MINUTES || 60);
exports.APP_URL = process.env.APP_URL || "http://localhost:4000";

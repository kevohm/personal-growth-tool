"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
function errorHandler(err, req, res, next) {
    if (err instanceof zod_1.ZodError) {
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

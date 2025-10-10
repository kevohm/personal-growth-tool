"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// POST /api/auth/signup
router.post("/signup", auth_controller_1.AuthController.signup);
// POST /api/auth/login
router.post("/login", auth_controller_1.AuthController.login);
// POST /api/auth/refresh
router.post("/refresh", auth_controller_1.AuthController.refresh);
// POST /api/auth/logout
router.post("/logout", auth_controller_1.AuthController.logout);
// POST /api/auth/forgot
router.post("/forgot", auth_controller_1.AuthController.requestPasswordReset);
// POST /api/auth/reset
router.post("/reset", auth_controller_1.AuthController.resetPassword);
router.get("/me", auth_middleware_1.requireAuth, auth_controller_1.AuthController.me);
exports.default = router;

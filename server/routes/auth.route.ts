import express from "express";
import {
 AuthController
} from "../controllers/auth.controller";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", AuthController.signup);

// POST /api/auth/login
router.post("/login", AuthController.login);

// POST /api/auth/refresh
router.post("/refresh", AuthController.refresh);

// POST /api/auth/logout
router.post("/logout", AuthController.logout);

// POST /api/auth/forgot
router.post("/forgot", AuthController.requestPasswordReset);

// POST /api/auth/reset
router.post("/reset", AuthController.resetPassword);

export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_validation_1 = require("../validations/auth.validation");
exports.AuthController = {
    signup: async (req, res) => {
        const parsed = auth_validation_1.signupSchema.safeParse(req.body);
        if (!parsed.success)
            return res.status(400).json(parsed.error.format());
        try {
            const { user, accessToken, refreshToken } = await auth_service_1.AuthService.signup(parsed.data.email, parsed.data.password, parsed.data.name);
            // res.cookie("refreshToken", refreshToken, {
            //   httpOnly: true,
            //   secure: process.env.NODE_ENV === "production",
            //   sameSite: "lax",
            //   maxAge: 7 * 24 * 60 * 60 * 1000,
            // });
            // optional send cookie ot tokens on sign up if you want user to have auto login on signup
            res.json({ user: { id: user.id, email: user.email, name: user.name }, tokens: { accessToken, refreshToken } });
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    login: async (req, res) => {
        const parsed = auth_validation_1.loginSchema.safeParse(req.body);
        if (!parsed.success)
            return res.status(400).json(parsed.error.format());
        try {
            const { user, accessToken, refreshToken } = await auth_service_1.AuthService.login(parsed.data.email, parsed.data.password);
            // res.cookie("refreshToken", refreshToken, {
            //   httpOnly: true,
            //   secure: process.env.NODE_ENV === "production",
            //   sameSite: "lax",
            //   maxAge: 7 * 24 * 60 * 60 * 1000,
            // });
            res.json({ user: { id: user.id, email: user.email, name: user.name }, tokens: { accessToken, refreshToken } });
        }
        catch (e) {
            res.status(401).json({ message: e.message });
        }
    },
    refresh: async (req, res) => {
        const parsed = auth_validation_1.refreshSchema.safeParse(req.body);
        const token = req.cookies?.refreshToken || parsed.data?.refreshToken;
        if (!token)
            return res.status(401).json({ message: "No refresh token" });
        try {
            const { accessToken, refreshToken } = await auth_service_1.AuthService.refresh(token);
            // res.cookie("refreshToken", refreshToken, {
            //   httpOnly: true,
            //   secure: process.env.NODE_ENV === "production",
            //   sameSite: "lax",
            //   maxAge: 7 * 24 * 60 * 60 * 1000,
            // });
            res.json({ tokens: { accessToken, refreshToken } });
        }
        catch (e) {
            res.status(401).json({ message: e.message });
        }
    },
    logout: async (req, res) => {
        const token = req.body.refreshToken;
        if (token)
            await auth_service_1.AuthService.logout(token);
        res.clearCookie("refreshToken");
        res.json({ ok: true });
    },
    requestPasswordReset: async (req, res) => {
        const parsed = auth_validation_1.requestResetSchema.safeParse(req.body);
        if (!parsed.success)
            return res.status(400).json(parsed.error.format());
        await auth_service_1.AuthService.requestPasswordReset(parsed.data.email);
        res.json({ ok: true });
    },
    resetPassword: async (req, res) => {
        const parsed = auth_validation_1.resetPasswordSchema.safeParse(req.body);
        if (!parsed.success)
            return res.status(400).json(parsed.error.format());
        try {
            await auth_service_1.AuthService.resetPassword(parsed.data.token, parsed.data.password);
            res.json({ ok: true });
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    me: async (req, res) => {
        try {
            const user = req.user;
            res.json({ user });
        }
        catch (e) {
            res.status(401).json({ message: e.message });
        }
    },
};

import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import {
  signupSchema,
  loginSchema,
  refreshSchema,
  requestResetSchema,
  resetPasswordSchema,
} from "../validations/auth.validation";

export const AuthController = {
  signup: async (req: Request, res: Response) => {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());

    try {
      const { user, accessToken, refreshToken } = await AuthService.signup(
        parsed.data.email,
        parsed.data.password,
        parsed.data.name
      );

      // res.cookie("refreshToken", refreshToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "lax",
      //   maxAge: 7 * 24 * 60 * 60 * 1000,
      // });
      // optional send cookie ot tokens on sign up if you want user to have auto login on signup

      res.json({ user: { id: user.id, email: user.email, name: user.name }, tokens: { accessToken, refreshToken } });
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  },

  login: async (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());

    try {
      const { user, accessToken, refreshToken } = await AuthService.login(
        parsed.data.email,
        parsed.data.password
      );

      // res.cookie("refreshToken", refreshToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "lax",
      //   maxAge: 7 * 24 * 60 * 60 * 1000,
      // });

      res.json({ user: { id: user.id, email: user.email, name: user.name }, tokens: { accessToken, refreshToken } });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  },

  refresh: async (req: Request, res: Response) => {
    const parsed = refreshSchema.safeParse(req.body);
    const token = req.cookies?.refreshToken || parsed.data?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    try {
      const { accessToken, refreshToken } = await AuthService.refresh(token);

      // res.cookie("refreshToken", refreshToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "lax",
      //   maxAge: 7 * 24 * 60 * 60 * 1000,
      // });

      res.json({ tokens: { accessToken, refreshToken } });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  },

  logout: async (req: Request, res: Response) => {
    const token = req.body.refreshToken;
    if (token) await AuthService.logout(token);
    res.clearCookie("refreshToken");
    res.json({ ok: true });
  },

  requestPasswordReset: async (req: Request, res: Response) => {
    const parsed = requestResetSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());

    await AuthService.requestPasswordReset(parsed.data.email);
    res.json({ ok: true });
  },

  resetPassword: async (req: Request, res: Response) => {
    const parsed = resetPasswordSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());

    try {
      await AuthService.resetPassword(parsed.data.token, parsed.data.password);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  },
   me: async (req: Request, res: Response) => {
    try {
      const user = req.user
      res.json({ user });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  },
};

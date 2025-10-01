import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// health
app.get("/health", (_, res) => res.json({ ok: true }));
// error handler (must be last)
app.use(errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Auth server listening on http://localhost:${PORT}`);
});

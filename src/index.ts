import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import gamesRoutes from "./routes/games";
import logsRoutes from "./routes/logs";
import statsRoutes from "./routes/stats";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: (origin: any, callback: any) => {
      // Allow all origins to support local network access (e.g. mobile phones, other PCs)
      callback(null, true);
    },
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/users/stats", statsRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`🚀 GameLog API server running on http://localhost:${PORT}`);
  console.log("📡 CORS enabled dynamically for all origins");
  console.log(
    `🎮 RAWG API: ${process.env.RAWG_API_KEY ? "Configured" : "Not configured (using local seed data)"}`
  );
});

export default app;

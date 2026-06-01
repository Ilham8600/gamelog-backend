import { Router, Response } from "express";
import axios from "axios";
import { prisma } from "../lib/prisma";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

// All routes in this file require authentication
router.use(authMiddleware);

// GET /api/users/stats - Get stats for current user
router.get("/", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;

    // Get all logs for the user
    const logs = await prisma.gameLog.findMany({
      where: { userId },
    });

    // Total games
    const totalGames = logs.length;

    // Total playtime
    const totalPlaytime = logs.reduce((sum, log) => sum + log.playtimeHours, 0);

    // Completed games
    const completedGames = logs.filter((log) => log.status === "COMPLETED").length;

    // Average rating (only rated games)
    const ratedLogs = logs.filter((log) => log.rating !== null && log.rating !== undefined);
    const averageRating =
      ratedLogs.length > 0
        ? Math.round(
            (ratedLogs.reduce((sum, log) => sum + (log.rating || 0), 0) / ratedLogs.length) * 10
          ) / 10
        : 0;

    // Status distribution
    const statusDistribution: Record<string, number> = {};
    for (const log of logs) {
      statusDistribution[log.status] = (statusDistribution[log.status] || 0) + 1;
    }

    // Genre distribution - use saved genres with self-healing cache fallback
    const genreCount: Record<string, number> = {};
    for (const log of logs) {
      const genres = await getGenresForLog(log);
      for (const genre of genres) {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      }
    }

    // Convert genre distribution to sorted array
    const genreDistribution = Object.entries(genreCount)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count);

    res.json({
      totalGames,
      totalPlaytime: Math.round(totalPlaytime * 10) / 10,
      completedGames,
      averageRating,
      statusDistribution,
      genreDistribution,
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ error: "Internal server error fetching stats." });
  }
});

// Helper: Get genres for a game log entry using self-healing cache strategy:
// 1. Use genres saved in DB (fastest)
// 2. Fallback to local seed data
// 3. Fallback to RAWG API + persist result back to DB (self-healing)
// 4. Last resort: "Uncategorized"
async function getGenresForLog(log: {
  id: string;
  rawgGameId: number;
  gameTitle: string;
  genres: string | null;
}): Promise<string[]> {
  // ── Priority 1: genres already saved in this log row ──
  if (log.genres && log.genres.trim() !== "") {
    return log.genres.split(",").map((g) => g.trim()).filter(Boolean);
  }

  // ── Priority 2: check local seed data ──
  const { seedGames } = await import("../data/seedGames");
  const lowerTitle = log.gameTitle.toLowerCase().trim();
  const seedMatch = seedGames.find((g) => g.title.toLowerCase() === lowerTitle);
  if (seedMatch && seedMatch.genres) {
    const genres = seedMatch.genres.split(",").map((g) => g.trim()).filter(Boolean);
    // Persist to DB so next call is instant (Priority 1)
    await prisma.gameLog.update({
      where: { id: log.id },
      data: { genres: genres.join(", ") },
    }).catch(() => {}); // fire-and-forget, non-fatal
    return genres;
  }

  // ── Priority 3: fetch from RAWG API and cache result ──
  const rawgApiKey = process.env.RAWG_API_KEY;
  if (rawgApiKey) {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${log.rawgGameId}`,
        { params: { key: rawgApiKey }, timeout: 8000 }
      );
      const rawgGenres: string[] = response.data.genres
        ? response.data.genres.map((g: any) => g.name as string)
        : [];

      if (rawgGenres.length > 0) {
        // Persist genres to DB (self-healing cache)
        await prisma.gameLog.update({
          where: { id: log.id },
          data: { genres: rawgGenres.join(", ") },
        }).catch(() => {}); // fire-and-forget, non-fatal
        return rawgGenres;
      }
    } catch {
      // RAWG call failed — fall through to default
    }
  }

  // ── Priority 4: give up gracefully ──
  return ["Uncategorized"];
}

export default router;


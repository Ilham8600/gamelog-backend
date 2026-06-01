import { Router, Request, Response } from "express";
import axios from "axios";
import { seedGames, SeedGame } from "../data/seedGames";

const router = Router();

const RAWG_BASE_URL = "https://api.rawg.io/api";

interface GameResult {
  id: number;
  title: string;
  coverUrl: string;
  genres: string;
  platforms: string;
  releaseYear: number;
  rating: number;
}

interface GameDetail extends GameResult {
  description: string;
  developer: string;
}

// Helper: transform seed game to API response format
function seedToResult(game: SeedGame): GameResult {
  return {
    id: game.id,
    title: game.title,
    coverUrl: game.coverUrl,
    genres: game.genres,
    platforms: game.platforms,
    releaseYear: game.releaseYear,
    rating: game.rating,
  };
}

function seedToDetail(game: SeedGame): GameDetail {
  return {
    id: game.id,
    title: game.title,
    coverUrl: game.coverUrl,
    description: game.description,
    genres: game.genres,
    platforms: game.platforms,
    developer: game.developer,
    releaseYear: game.releaseYear,
    rating: game.rating,
  };
}

// Helper: transform RAWG API game to our format
function rawgToResult(rawgGame: any): GameResult {
  return {
    id: rawgGame.id,
    title: rawgGame.name || "Unknown",
    coverUrl: rawgGame.background_image || "",
    genres: rawgGame.genres
      ? rawgGame.genres.map((g: any) => g.name).join(", ")
      : "",
    platforms: rawgGame.platforms
      ? rawgGame.platforms.map((p: any) => p.platform.name).join(", ")
      : "",
    releaseYear: rawgGame.released
      ? new Date(rawgGame.released).getFullYear()
      : 0,
    rating: rawgGame.rating ? Math.round(rawgGame.rating * 20) / 10 : 0, // Convert 0-5 to 0-10 scale
  };
}

function rawgToDetail(rawgGame: any): GameDetail {
  return {
    ...rawgToResult(rawgGame),
    description: rawgGame.description_raw || rawgGame.description || "",
    developer: rawgGame.developers
      ? rawgGame.developers.map((d: any) => d.name).join(", ")
      : "Unknown",
  };
}

// GET /api/games/search?q=keyword
router.get("/search", async (req: Request, res: Response): Promise<void> => {
  try {
    const query = (req.query.q as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.page_size as string) || 20;

    if (!query.trim()) {
      res.status(400).json({ error: "Search query parameter 'q' is required." });
      return;
    }

    const rawgApiKey = process.env.RAWG_API_KEY;

    // If RAWG API key is available, proxy to RAWG
    if (rawgApiKey) {
      try {
        const response = await axios.get(`${RAWG_BASE_URL}/games`, {
          params: {
            key: rawgApiKey,
            search: query,
            page,
            page_size: pageSize,
          },
          timeout: 10000,
        });

        const results: GameResult[] = response.data.results.map(rawgToResult);

        res.json({
          count: response.data.count,
          results,
          source: "rawg",
        });
        return;
      } catch (apiError) {
        console.warn("RAWG API request failed, falling back to local seed data:", apiError);
        // Fall through to seed data
      }
    }

    // Fallback: filter local seed data
    const lowerQuery = query.toLowerCase();
    const filtered = seedGames.filter(
      (game) =>
        game.title.toLowerCase().includes(lowerQuery) ||
        game.genres.toLowerCase().includes(lowerQuery) ||
        game.developer.toLowerCase().includes(lowerQuery)
    );

    // Apply pagination
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    res.json({
      count: filtered.length,
      results: paged.map(seedToResult),
      source: "local",
    });
  } catch (error) {
    console.error("Game search error:", error);
    res.status(500).json({ error: "Internal server error during game search." });
  }
});

// GET /api/games/detail/:id
router.get("/detail/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : (req.params.id ?? "");
    const gameId = parseInt(idParam);

    if (isNaN(gameId)) {
      res.status(400).json({ error: "Invalid game ID. Must be a number." });
      return;
    }

    const rawgApiKey = process.env.RAWG_API_KEY;

    // If RAWG API key is available, fetch from RAWG
    if (rawgApiKey) {
      try {
        const response = await axios.get(`${RAWG_BASE_URL}/games/${gameId}`, {
          params: { key: rawgApiKey },
          timeout: 10000,
        });

        res.json({
          game: rawgToDetail(response.data),
          source: "rawg",
        });
        return;
      } catch (apiError: any) {
        // If RAWG returns 404, try seed data
        if (apiError.response?.status !== 404) {
          console.warn("RAWG API request failed, falling back to local seed data:", apiError);
        }
        // Fall through to seed data
      }
    }

    // Fallback: find in local seed data
    const game = seedGames.find((g) => g.id === gameId);

    if (!game) {
      res.status(404).json({ error: "Game not found." });
      return;
    }

    res.json({
      game: seedToDetail(game),
      source: "local",
    });
  } catch (error) {
    console.error("Game detail error:", error);
    res.status(500).json({ error: "Internal server error fetching game details." });
  }
});

export default router;

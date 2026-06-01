import { Router, Response } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

// All routes in this file require authentication
router.use(authMiddleware);

const VALID_STATUSES = ["BACKLOG", "PLAYING", "COMPLETED", "ON_HOLD", "DROPPED"];

// GET /api/logs - Get all logs for current user
router.get("/", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;

    const logs = await prisma.gameLog.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });

    res.json({ logs });
  } catch (error) {
    console.error("Fetch logs error:", error);
    res.status(500).json({ error: "Internal server error fetching logs." });
  }
});

// POST /api/logs - Create or update a log entry (upsert by userId + rawgGameId)
router.post("/", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const {
      rawgGameId,
      gameTitle,
      gameCoverUrl,
      genres,
      status,
      rating,
      playtimeHours,
      review,
      startDate,
      endDate,
    } = req.body;

    // Validate required fields
    if (!rawgGameId || typeof rawgGameId !== "number") {
      res.status(400).json({ error: "rawgGameId is required and must be a number." });
      return;
    }

    if (!gameTitle || typeof gameTitle !== "string" || !gameTitle.trim()) {
      res.status(400).json({ error: "gameTitle is required." });
      return;
    }

    if (!status || !VALID_STATUSES.includes(status)) {
      res.status(400).json({
        error: `status is required and must be one of: ${VALID_STATUSES.join(", ")}`,
      });
      return;
    }

    // Validate optional fields
    if (rating !== undefined && rating !== null) {
      if (typeof rating !== "number" || rating < 0 || rating > 10) {
        res.status(400).json({ error: "rating must be a number between 0 and 10." });
        return;
      }
    }

    if (playtimeHours !== undefined && playtimeHours !== null) {
      if (typeof playtimeHours !== "number" || playtimeHours < 0) {
        res.status(400).json({ error: "playtimeHours must be a non-negative number." });
        return;
      }
    }

    // Build data object
    const data = {
      userId,
      rawgGameId,
      gameTitle: gameTitle.trim(),
      gameCoverUrl: gameCoverUrl || null,
      genres: genres || null,
      status,
      rating: rating ?? null,
      playtimeHours: playtimeHours ?? 0,
      review: review ?? null,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    };

    // Upsert: create if not exists, update if exists
    const log = await prisma.gameLog.upsert({
      where: {
        userId_rawgGameId: {
          userId,
          rawgGameId,
        },
      },
      create: data,
      update: {
        gameTitle: data.gameTitle,
        gameCoverUrl: data.gameCoverUrl,
        genres: data.genres,
        status: data.status,
        rating: data.rating,
        playtimeHours: data.playtimeHours,
        review: data.review,
        startDate: data.startDate,
        endDate: data.endDate,
      },
    });

    res.status(200).json({ log });
  } catch (error) {
    console.error("Create/update log error:", error);
    res.status(500).json({ error: "Internal server error creating/updating log." });
  }
});

// DELETE /api/logs/:id - Delete a log entry owned by current user
router.delete("/:id", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const logId = Array.isArray(req.params.id) ? req.params.id[0] : (req.params.id ?? "");

    // Verify ownership before deleting
    const log = await prisma.gameLog.findUnique({
      where: { id: logId },
    });

    if (!log) {
      res.status(404).json({ error: "Log entry not found." });
      return;
    }

    if (log.userId !== userId) {
      res.status(403).json({ error: "You are not authorized to delete this log entry." });
      return;
    }

    await prisma.gameLog.delete({
      where: { id: logId },
    });

    res.json({ message: "Log entry deleted successfully." });
  } catch (error) {
    console.error("Delete log error:", error);
    res.status(500).json({ error: "Internal server error deleting log." });
  }
});

export default router;

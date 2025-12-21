import { Router } from "express";
import { getLeaderBoard, saveScore } from "../controllers/playerController.js";
import { requireScore } from "../lib/auth.js";
import { validatePlayer } from "../validators/playerValidators.js";

const playerRouter = Router();

playerRouter.get("/", getLeaderBoard);

playerRouter.post("/", requireScore, validatePlayer, saveScore);

export default playerRouter;

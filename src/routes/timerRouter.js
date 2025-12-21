import { Router } from "express";
import { requireTimer } from "../lib/auth.js";
import {
  createTimer,
  getCurrentTime,
  stopTimer,
} from "../controllers/timerController.js";

const timerRouter = Router();

timerRouter.post("/", createTimer);

timerRouter.get("/", requireTimer, getCurrentTime);

timerRouter.delete("/", requireTimer, stopTimer);

export default timerRouter;

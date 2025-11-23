import { Router } from "express";
import { listCharacters } from "../controllers/characterController.js";

const characterRouter = Router();

characterRouter.get("/", listCharacters);

export default characterRouter;

import { Router } from "express";
import {
  listCharacters,
  placeMarker,
} from "../controllers/characterController.js";

const characterRouter = Router();

characterRouter.get("/", listCharacters);

characterRouter.post("/:characterId/markers", placeMarker);

export default characterRouter;

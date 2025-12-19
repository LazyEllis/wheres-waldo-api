import { Router } from "express";
import { validateMarker } from "../validators/characterValidators.js";
import {
  listCharacters,
  placeMarker,
} from "../controllers/characterController.js";

const characterRouter = Router();

characterRouter.get("/", listCharacters);

characterRouter.post("/:characterId/markers", validateMarker, placeMarker);

export default characterRouter;

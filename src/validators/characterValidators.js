import { body, param } from "express-validator";
import { validate } from "../lib/validate.js";

export const validateMarker = validate([
  param("characterId")
    .toInt()
    .isInt()
    .withMessage("The character ID must be an integer"),
  body("x")
    .toInt()
    .isInt()
    .withMessage("The x-coordinate of the marker must be an integer"),
  body("y")
    .toInt()
    .isInt()
    .withMessage("The y-coordinate of the marker must be an integer"),
]);

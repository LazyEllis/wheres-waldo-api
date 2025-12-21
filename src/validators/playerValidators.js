import { body } from "express-validator";
import { validate } from "../lib/validate.js";

export const validatePlayer = validate([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("You must enter a name for a place on the leaderboard."),
]);

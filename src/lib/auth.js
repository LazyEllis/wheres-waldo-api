import passport from "passport";
import { ForbiddenError } from "./errors.js";

export const requireTimer = passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});

export const requireScore = [
  requireTimer,
  (req, res, next) => {
    if (!req.user.score) {
      throw new ForbiddenError(
        "You must have completed the game to perform this action",
      );
    }

    next();
  },
];

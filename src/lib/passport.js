import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

const JWT_STRATEGY_CONFIG = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(JWT_STRATEGY_CONFIG, async (jwt_payload, done) => {
    try {
      return done(null, {
        start: jwt_payload.start,
        score: jwt_payload.score,
      });
    } catch (error) {
      done(error);
    }
  }),
);

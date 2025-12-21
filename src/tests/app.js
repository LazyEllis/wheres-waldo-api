import "dotenv/config";
import "../lib/passport.js";
import express from "express";
import characterRouter from "../routes/characterRouter.js";
import timerRouter from "../routes/timerRouter.js";
import playerRouter from "../routes/playerRouter.js";

const app = express();

app.use(express.json());

app.use("/characters", characterRouter);
app.use("/timers", timerRouter);
app.use("/players", playerRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

export default app;

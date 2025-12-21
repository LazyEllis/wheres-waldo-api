import { test, expect, afterAll } from "vitest";
import "dotenv/config";
import "../lib/passport.js";
import request from "supertest";
import express from "express";
import playerRouter from "./playerRouter.js";
import prisma from "../lib/prisma.js";
import timerRouter from "./timerRouter.js";

const app = express();

app.use(express.json());
app.use("/timers", timerRouter);
app.use("/players", playerRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

afterAll(async () => {
  await prisma.player.deleteMany();
});

test("POST route works correctly", async () => {
  const startResponse = await request(app).post("/timers");
  const startToken = startResponse.body.token;

  const stopResponse = await request(app)
    .delete("/timers")
    .auth(startToken, { type: "bearer" });
  const stopToken = stopResponse.body.token;

  const postResponse = await request(app)
    .post("/players")
    .auth(stopToken, { type: "bearer" })
    .send({ name: "John Doe" })
    .expect("Content-Type", /json/)
    .expect(200);

  expect(postResponse.body).toEqual({
    id: expect.any(Number),
    name: "John Doe",
    score: expect.any(Number),
  });

  const getResponse = await request(app)
    .get("/players")
    .expect("Content-Type", /json/)
    .expect(200);

  expect(getResponse.body).toEqual([
    { id: expect.any(Number), name: "John Doe", score: expect.any(Number) },
  ]);
});

test("POST route fails without authentication", async () => {
  await request(app).post("/players").expect(401);
});

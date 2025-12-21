import { test, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../tests/app.js";
import prisma from "../lib/prisma.js";

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

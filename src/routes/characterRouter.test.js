import { beforeAll, afterAll, describe, test } from "vitest";
import request from "supertest";
import express from "express";
import characterRouter from "./characterRouter.js";
import prisma from "../lib/prisma.js";

const app = express();

app.use(express.json());
app.use("/characters", characterRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

beforeAll(async () => {
  await prisma.character.create({
    data: {
      id: 1,
      name: "Waldo",
      image: "./img/waldo",
      x: 100,
      y: 200,
      width: 40,
      height: 100,
    },
  });
});

afterAll(async () => {
  await prisma.character.deleteMany();
});

describe("GET /characters", () => {
  test("returns characters without position fields", async () => {
    await request(app)
      .get("/characters")
      .expect("Content-Type", /json/)
      .expect([{ id: 1, name: "Waldo", image: "./img/waldo" }])
      .expect(200);
  });
});

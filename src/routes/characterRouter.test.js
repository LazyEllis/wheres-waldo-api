import { beforeAll, afterAll, describe, it } from "vitest";
import request from "supertest";
import app from "../tests/app.js";
import prisma from "../lib/prisma.js";

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
  it("returns characters without position fields", async () => {
    await request(app)
      .get("/characters")
      .expect("Content-Type", /json/)
      .expect([{ id: 1, name: "Waldo", image: "./img/waldo" }])
      .expect(200);
  });
});

describe("POST /characters/:characterId/markers", () => {
  it("returns the character ID when the provided point is within the character's target box", async () => {
    await request(app)
      .post("/characters/1/markers")
      .send({ x: 100, y: 200 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({ found: true, id: 1 })
      .expect(200);

    await request(app)
      .post("/characters/1/markers")
      .send({ x: 120, y: 250 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({ found: true, id: 1 })
      .expect(200);
  });

  it("returns a failing message if the provided point isn't within character's target box", async () => {
    await request(app)
      .post("/characters/1/markers")
      .send({ x: 200, y: 300 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({ found: false, message: "Waldo is not in this position" })
      .expect(200);
  });

  it("throws a 404 error if a character doesn't exist", async () => {
    await request(app)
      .post("/characters/2/markers")
      .send({ x: 200, y: 300 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({ message: "Character not found" })
      .expect(404);
  });
});

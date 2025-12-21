import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import "dotenv/config";
import "../lib/passport.js";
import timerRouter from "./timerRouter.js";

const app = express();

app.use(express.json());
app.use("/timers", timerRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

const startTimer = async () => {
  const response = await request(app)
    .post("/timers")
    .expect("Content-Type", /json/)
    .expect((res) => {
      expect(res.body).toEqual({ token: expect.any(String) });
    })
    .expect(200);

  return response.body.token;
};

const getTime = async (token) => {
  const response = await request(app)
    .get("/timers")
    .auth(token, { type: "bearer" })
    .expect("Content-Type", /json/)
    .expect((res) => {
      expect(res.body).toEqual({ time: expect.any(Number) });
    })
    .expect(200);

  return response.body.time;
};

describe("POST /timers", () => {
  it("starts a new timer", async () => {
    await request(app)
      .post("/timers")
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body).toEqual({ token: expect.any(String) });
      })
      .expect(200);
  });
});

describe("GET /timers", () => {
  it("returns increasing time for a running timer", async () => {
    const token = await startTimer();

    const t1 = await getTime(token);
    const t2 = await getTime(token);

    expect(t2).toBeGreaterThan(t1);
  });

  it("fails without authentication", async () => {
    await request(app).get("/timers").expect(401);
  });

  it("fails with invalid token", async () => {
    await request(app)
      .get("/timers")
      .auth("token", { type: "bearer" })
      .expect(401);
  });
});

describe("DELETE /timers", () => {
  it("stops a running timer", async () => {
    const token = await startTimer();

    const response = await request(app)
      .delete("/timers")
      .auth(token, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body).toEqual({ token: expect.any(String) });
      })
      .expect(200);

    const stoppedToken = response.body.token;

    const t1 = await getTime(stoppedToken);
    const t2 = await getTime(stoppedToken);

    expect(t1).toBe(t2);
  });

  it("fails if no timer is running", async () => {
    await request(app).delete("/timers").expect(401);
  });
});

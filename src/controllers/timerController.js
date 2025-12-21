import jwt from "jsonwebtoken";

export const createTimer = (req, res) => {
  const token = jwt.sign({ start: Date.now() }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.json({ token });
};

export const getCurrentTime = (req, res) => {
  const { start, score } = req.user;

  const time = score ?? Date.now() - start;

  res.json({ time });
};

export const stopTimer = (req, res) => {
  const { start, score } = req.user;

  const time = score ?? Date.now() - start;

  const token = jwt.sign({ score: time }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.json({ token });
};

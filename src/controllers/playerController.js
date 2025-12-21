import prisma from "../lib/prisma.js";

export const getLeaderBoard = async (req, res) => {
  const leaderboard = await prisma.player.findMany({
    orderBy: { score: "asc" },
  });

  res.json(leaderboard);
};

export const saveScore = async (req, res) => {
  const { score } = req.user;
  const { name } = req.body;

  const player = await prisma.player.create({
    data: {
      name,
      score,
    },
  });

  res.json(player);
};

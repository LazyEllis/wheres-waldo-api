import prisma from "../lib/prisma.js";

export const listCharacters = async (req, res) => {
  const characters = await prisma.character.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },
  });

  res.json(characters);
};

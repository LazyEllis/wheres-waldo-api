import { NotFoundError } from "../lib/errors.js";
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

export const placeMarker = async (req, res) => {
  const { characterId } = req.params;
  const { x, y } = req.body;

  const character = await prisma.character.findUnique({
    where: {
      id: Number(characterId),
    },
  });

  if (!character) {
    throw new NotFoundError("Character not found");
  }

  if (
    x < character.x ||
    x > character.x + character.width ||
    y < character.y ||
    y > character.y + character.height
  ) {
    res.json({
      found: false,
      message: `${character.name} is not in this position`,
    });
  }

  res.json({ found: true, id: character.id });
};

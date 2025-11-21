import prisma from "../src/lib/prisma.js";

const main = async () => {
  await prisma.character.createMany({
    data: [
      {
        name: "Waldo",
        image:
          "https://res.cloudinary.com/dnfnblwbh/image/upload/v1763834153/waldo_umx82m.png",
        x: 2525,
        y: 1343,
        width: 70,
        height: 130,
      },
      {
        name: "Wilma",
        image:
          "https://res.cloudinary.com/dnfnblwbh/image/upload/v1763834151/wilma_n4jf9p.jpg",
        x: 1450,
        y: 766,
        width: 33,
        height: 80,
      },
      {
        name: "Odlaw",
        image:
          "https://res.cloudinary.com/dnfnblwbh/image/upload/v1763834152/odlaw_jykuge.jpg",
        x: 933,
        y: 1190,
        width: 34,
        height: 47,
      },
      {
        name: "Wizard",
        image:
          "https://res.cloudinary.com/dnfnblwbh/image/upload/v1763943094/whitebeard_pw46w0.png",
        x: 180,
        y: 1406,
        width: 47,
        height: 76,
      },
    ],
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

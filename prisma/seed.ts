import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.candidate.createMany({
    data: [
      { name: "Marine Senechal", location: "Perpignan", position: "Développeuse", employer: "Kalent", status: "Retenue" },
      { name: "Jean Dupont", location: "Paris", position: "Designer", employer: "TechCorp", status: "En attente" },
      { name: "Claire Martin", location: "Lyon", position: "Développeuse", employer: "CodeFactory", status: "Disponible" },
      { name: "Sophie Lemoine", location: "Toulouse", position: "Développeuse", employer: "WebSmart", status: "Disponible" },
      { name: "Lucas Morel", location: "Bordeaux", position: "Développeur", employer: "TechBridge", status: "Disponible" },
      { name: "Emma Perrin", location: "Lille", position: "Développeuse", employer: "SoftCraft", status: "Disponible" },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

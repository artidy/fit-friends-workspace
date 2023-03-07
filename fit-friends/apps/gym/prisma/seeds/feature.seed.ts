import { PrismaClient } from '@prisma/client';

const FINISHED_MESSAGE = 'База была заполнена';
const FEATURES = [
  'бассейн',
  'бесплатная парковка',
  'детская комната',
  'массаж',
]

const prisma = new PrismaClient();

async function fillDb() {

  for (let i = 0; i < FEATURES.length; i++) {
    await prisma.feature.upsert({
      where: { id: i + 1 },
      update : {},
      create: {
        title: FEATURES[i]
      }
    });
  }

  console.info(FINISHED_MESSAGE);
}


fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })

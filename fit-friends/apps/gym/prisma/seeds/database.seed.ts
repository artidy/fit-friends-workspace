import { PrismaClient } from '@prisma/client';
import { createRandomGym } from '../helpers';

const FINISHED_MESSAGE = 'База была заполнена';
const FEATURES = [
  'бассейн',
  'бесплатная парковка',
  'детская комната',
  'массаж',
]

const GYMS_COUNT = 5;

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

  for (let i = 0; i < GYMS_COUNT; i++) {
    await prisma.gym.upsert({
      where: { id: i + 1 },
      update: {},
      create: createRandomGym()
    })
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

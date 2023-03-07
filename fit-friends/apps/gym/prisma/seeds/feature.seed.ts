import { PrismaClient } from '@prisma/client';

import { FEATURES } from '../../../../libs/shared-types/src';

const FINISHED_MESSAGE = 'База была заполнена';

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

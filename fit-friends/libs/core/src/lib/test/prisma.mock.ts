interface PrismaFunctions {
  findMany: Function;
  findFirst: Function;
  create: Function;
  update: Function;
  delete: Function;
  aggregate: Function;
  groupBy: Function;
}

export interface PrismaMock {
  application: PrismaFunctions;
  comment: PrismaFunctions;
  gym: PrismaFunctions;
  order: PrismaFunctions;
  training: PrismaFunctions;
}

function getPrismaFunction(): PrismaFunctions {
  return {
    findMany: () => {},
    findFirst: () => {},
    create: () => {},
    update: () => {},
    delete: () => {},
    aggregate: () => {},
    groupBy: () => {},
  }
}

export function generatePrismaMock(): PrismaMock {
  return {
    application: getPrismaFunction(),
    comment: getPrismaFunction(),
    gym: getPrismaFunction(),
    order: getPrismaFunction(),
    training: getPrismaFunction(),
  }
}

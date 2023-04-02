import { jest } from '@jest/globals';
import { Mock } from 'jest-mock';

type PrismaMockFunctionsType = {
  findMany: Mock;
  findFirst: Mock;
  create: Mock;
  update: Mock;
  delete: Mock;
  aggregate: Mock;
  groupBy: Mock;
}

export type PrismaMockType = {
  application: PrismaMockFunctionsType;
  comment: PrismaMockFunctionsType;
  gym: PrismaMockFunctionsType;
  order: PrismaMockFunctionsType;
  training: PrismaMockFunctionsType;
}

function getPrismaFunction(): PrismaMockFunctionsType {
  return {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    aggregate: jest.fn(),
    groupBy: jest.fn(),
  }
}

export const prismaMock: PrismaMockType = {
  application: getPrismaFunction(),
  comment: getPrismaFunction(),
  gym: getPrismaFunction(),
  order: getPrismaFunction(),
  training: getPrismaFunction(),
}

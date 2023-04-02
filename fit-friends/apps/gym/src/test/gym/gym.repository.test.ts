import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { prismaMock, PrismaMockType } from '@fit-friends/core';

import { PrismaService } from '../../app/prisma/prisma.service';
import { TEST_DATA } from './const';
import { GymRepository } from '../../app/gym/gym.repository';
import { GymEntity } from '../../app/gym/gym.entity';

describe('GymRepository', () => {
  let repository: GymRepository;
  let prismaService: PrismaMockType;
  let entity: DeepMockProxy<GymEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, GymRepository]
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    repository = module.get<GymRepository>(GymRepository);
    prismaService = module.get<PrismaMockType>(PrismaService);
    entity = mockDeep<GymEntity>();
  });

  describe('findAll', () => {
    it('should return all gyms', async () => {
      prismaService.gym.findMany.mockReturnValue([TEST_DATA]);
      const result = await repository.findAll();

      expect(result).toContain(TEST_DATA);
      expect(prismaService.gym.findMany).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return gym by id', async () => {
      prismaService.gym.findFirst.mockReturnValue(TEST_DATA);
      const result = await repository.findById(TEST_DATA.id);

      expect(result).toEqual(TEST_DATA);
      expect(prismaService.gym.findFirst).toHaveBeenCalledWith({
        where: {
          id: TEST_DATA.id
        }
      });
    });
  });
});

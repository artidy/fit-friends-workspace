import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { prismaMock, PrismaMockType } from '@fit-friends/core';

import { PrismaService } from '../../app/prisma/prisma.service';
import { TEST_DATA } from './const';
import { TrainingRepository } from '../../app/training/training.repository';
import { TrainingEntity } from '../../app/training/training.entity';

describe('TrainingRepository', () => {
  let repository: TrainingRepository;
  let prismaService: PrismaMockType;
  let entity: DeepMockProxy<TrainingEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, TrainingRepository]
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    repository = module.get<TrainingRepository>(TrainingRepository);
    prismaService = module.get<PrismaMockType>(PrismaService);
    entity = mockDeep<TrainingEntity>();
  });

  describe('findAll', () => {
    it('should return all trainings', async () => {
      prismaService.training.findMany.mockReturnValue([TEST_DATA]);
      const result = await repository.findAll();

      expect(result).toContain(TEST_DATA);
      expect(prismaService.training.findMany).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return training by id', async () => {
      prismaService.training.findFirst.mockReturnValue(TEST_DATA);
      const result = await repository.findById(TEST_DATA.id);

      expect(result).toEqual(TEST_DATA);
      expect(prismaService.training.findFirst).toHaveBeenCalledWith({
        where: {
          id: TEST_DATA.id
        }
      });
    });
  });

  describe('create', () => {
    it('should create and return new training', async () => {
      entity.toObject.mockReturnValue(TEST_DATA);
      prismaService.training.create.mockReturnValue(TEST_DATA);

      const result = await repository.create(entity);

      expect(result).toEqual(TEST_DATA);
      expect(prismaService.training.create).toHaveBeenCalledWith({
        data: { ...entity.toObject() },
        include: { comments: true }
      });
    });
  });

  describe('update', () => {
    it('should update and return updated training', async () => {
      entity.toObject.mockReturnValue(TEST_DATA);
      prismaService.training.update.mockReturnValue(TEST_DATA);

      const result = await repository.update(TEST_DATA.id, entity);

      expect(result).toEqual(TEST_DATA);
      expect(prismaService.training.update).toHaveBeenCalledWith({
        where: { id: TEST_DATA.id },
        data: { ...entity.toObject() },
        include: { comments: true }
      });
    });
  });

  describe('destroy', () => {
    it('should delete training', async () => {
      await repository.destroy(TEST_DATA.id);

      expect(prismaService.training.delete).toHaveBeenCalledWith({
        where: { id: TEST_DATA.id }
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { prismaMock, PrismaMockType } from '@fit-friends/core';

import { PrismaService } from '../../app/prisma/prisma.service';
import { OrderRepository } from '../../app/order/order.repository';
import { OrderEntity } from '../../app/order/order.entity';
import { TEST_DATA } from './const';

describe('OrderRepository', () => {
  let repository: OrderRepository;
  let prismaService: PrismaMockType;
  let entity: DeepMockProxy<OrderEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, OrderRepository]
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    repository = module.get<OrderRepository>(OrderRepository);
    prismaService = module.get<PrismaMockType>(PrismaService);
    entity = mockDeep<OrderEntity>();
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      prismaService.order.findMany.mockReturnValue([TEST_DATA]);
      const result = await repository.findAll();

      expect(result).toContain(TEST_DATA);
      expect(prismaService.order.findMany).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return order by id', async () => {
      prismaService.order.findFirst.mockReturnValue(TEST_DATA);
      const result = await repository.findById(TEST_DATA.id);

      expect(result).toEqual(TEST_DATA);
      expect(prismaService.order.findFirst).toHaveBeenCalledWith({
        where: {
          id: TEST_DATA.id
        }
      });
    });
  });

  describe('create', () => {
    it('should create and return new order', async () => {
      entity.toObject.mockReturnValue(TEST_DATA);
      prismaService.order.create.mockReturnValue(TEST_DATA);

      const result = await repository.create(entity);

      expect(result).toEqual(TEST_DATA);
      expect(prismaService.order.create).toHaveBeenCalledWith({
        data: { ...entity.toObject() }
      });
    });
  });

  describe('update', () => {
    it('should update and return updated order', async () => {
      entity.toObject.mockReturnValue(TEST_DATA);
      prismaService.order.update.mockReturnValue(TEST_DATA);

      const result = await repository.update(TEST_DATA.id, entity);

      expect(result).toEqual(TEST_DATA);
      expect(prismaService.order.update).toHaveBeenCalledWith({
        where: { id: TEST_DATA.id },
        data: { ...entity.toObject() }
      });
    });
  });

  describe('destroy', () => {
    it('should delete order', async () => {
      await repository.destroy(TEST_DATA.id);

      expect(prismaService.order.delete).toHaveBeenCalledWith({
        where: { id: TEST_DATA.id }
      });
    });
  });
});

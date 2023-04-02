import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { OrderType, PaymentType } from '@fit-friends/shared-types';

import { TEST_DATA } from './const';
import { OrderService } from '../../app/order/order.service';
import { OrderRepository } from '../../app/order/order.repository';
import { OrderEntity } from '../../app/order/order.entity';
import { CreateOrderDto } from '../../app/order/dto/create-order.dto';
import { UpdateOrderDto } from '../../app/order/dto/update-order.dto';

describe('OrderService', () => {
  let repository: DeepMockProxy<OrderRepository>;
  let service: OrderService;

  beforeEach(async () => {
    repository = mockDeep<OrderRepository>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderRepository, OrderService]
    })
      .overrideProvider(OrderRepository)
      .useValue(repository)
      .compile();

    service = module.get<OrderService>(OrderService);
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      repository.findAll.mockReturnValue(Promise.resolve([TEST_DATA]));
      const result = await service.findAll();

      expect(result).toContain(TEST_DATA);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return order by id', async () => {
      repository.findById.mockReturnValue(Promise.resolve(TEST_DATA));
      const result = await service.findById(TEST_DATA.id);

      expect(result).toEqual(TEST_DATA);
      expect(repository.findById).toHaveBeenCalledWith(TEST_DATA.id);
    });
  });

  describe('create', () => {
    it('should create and return new order', async () => {
      const dto: CreateOrderDto = {
        paymentType: TEST_DATA.paymentType as PaymentType,
        type: TEST_DATA.type as OrderType,
        count: TEST_DATA.count,
        price: TEST_DATA.price,
        serviceId: TEST_DATA.serviceId
      }

      repository.create.mockReturnValue(Promise.resolve(TEST_DATA));

      const result = await service.create(dto);

      expect(result).toEqual(TEST_DATA);
      expect(repository.create).toHaveBeenCalledWith(new OrderEntity({
        ...dto,
        createdAt: null,
        sum: 0,
      }));
    });
  });

  describe('update', () => {
    it('should update and return updated order', async () => {
      const dto: UpdateOrderDto = {
        paymentType: TEST_DATA.paymentType as PaymentType,
        count: TEST_DATA.count,
        price: TEST_DATA.price,
      }

      repository.update.mockReturnValue(Promise.resolve(TEST_DATA));
      repository.findById.mockReturnValue(Promise.resolve(TEST_DATA));

      const result = await service.update(TEST_DATA.id, dto);

      expect(result).toEqual(TEST_DATA);
      expect(repository.update).toHaveBeenCalledWith(TEST_DATA.id, new OrderEntity({
        ...TEST_DATA,
        ...dto
      }));
    });
  });

  describe('delete', () => {
    it('should delete order', async () => {
      await service.delete(TEST_DATA.id);

      expect(repository.destroy).toHaveBeenCalledWith(TEST_DATA.id);
    });
  });
});

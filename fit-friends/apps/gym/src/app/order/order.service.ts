import { Injectable } from '@nestjs/common';
import { Order } from '@fit-friends/shared-types';

import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  public async findById(id: number): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  public async create(dto: CreateOrderDto): Promise<Order> {

    return this.orderRepository.create(new OrderEntity({
      ...dto,
      createdAt: null,
      sum: 0
    }));
  }

  public async update(id: number, dto: UpdateOrderDto): Promise<Order | null> {
    const order = await this.orderRepository.findById(id);

    return this.orderRepository.update(id, new OrderEntity({
      ...order,
      ...dto
    }));
  }

  public async delete(id: number): Promise<void> {
    await this.orderRepository.destroy(id);
  }
}

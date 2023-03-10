import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@fit-friends/core';
import { Order } from '@fit-friends/shared-types';

import { PrismaService } from '../prisma/prisma.service';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderRepository implements CRUDRepository<OrderEntity, number, Order> {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  public async findById(id: number): Promise<Order | null> {
    return this.prisma.order.findFirst({ where: { id } });
  }

  public async create(orderEntity: OrderEntity): Promise<Order> {
    return this.prisma.order.create({ data: {
      ...orderEntity
    }});
  }

  public async update(id: number, orderEntity: OrderEntity): Promise<Order> {
    const order = orderEntity.toObject();

    return this.prisma.order.update({
      where: { id },
      data: { ...order }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.order.delete({ where: { id }});
  }
}

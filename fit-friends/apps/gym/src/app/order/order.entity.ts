import { Entity } from '@fit-friends/core';
import { Order, OrderType } from '@fit-friends/shared-types';

export class OrderEntity implements Entity<Order>, Order {
  id: number;
  type: string;
  serviceId?: number;
  gymId: number;
  trainingId: number;
  price: number;
  count: number;
  sum: number;
  paymentType: string;
  createdAt: Date;

  constructor(order: Order) {
    this.fillEntity(order);
  }

  fillEntity(entity: Order) {
    this.id = entity.id;
    this.type = entity.type;
    this.serviceId = entity.serviceId;
    this.price = entity.price;
    this.count = entity.count;
    this.sum = entity.price * entity.count;
    this.paymentType = entity.paymentType;
    this.createdAt = entity.createdAt;

    if (this.type === OrderType.Training) {
      this.trainingId = this.serviceId;
    }

    if (this.type === OrderType.Subscription) {
      this.gymId = this.serviceId;
    }
  }

  toObject(): Order {
    return { ...this };
  }
}

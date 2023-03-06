import { OrderType, PaymentType } from '@fit-friends/shared-types';

export interface Order {
  id?: number;
  type: OrderType;
  serviceId: number;
  price: number;
  count: number;
  sum: number;
  paymentType: PaymentType;
  createdAt: Date;
}

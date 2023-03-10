import { OrderType, PaymentType } from '@fit-friends/shared-types';

export interface Order {
  id?: number;
  type: string;
  serviceId?: number;
  price: number;
  count: number;
  sum: number;
  paymentType: string;
  createdAt: Date;
}

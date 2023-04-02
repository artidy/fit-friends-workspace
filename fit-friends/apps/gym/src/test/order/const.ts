import { Order, PaymentType } from '@fit-friends/shared-types';

const TEST_DATA: Order = {
  count: 2,
  createdAt: new Date('20230304'),
  paymentType: PaymentType.Mir,
  price: 3000,
  serviceId: 1,
  sum: 6000,
  type: '',
  id: 1
};

export {
  TEST_DATA
}

import { OrderEntity } from '../../app/order/order.entity';
import { TEST_DATA } from './const';

describe('OrderEntity', () => {
  const entity = new OrderEntity(TEST_DATA);

  it('should create an instance', () => {
    expect(entity).toBeTruthy();
  });

  it('should have correct properties', () => {
    expect(entity.id).toEqual(TEST_DATA.id);
    expect(entity.type).toEqual(TEST_DATA.type);
    expect(entity.serviceId).toEqual(TEST_DATA.serviceId);
    expect(entity.paymentType).toEqual(TEST_DATA.paymentType);
    expect(entity.price).toEqual(TEST_DATA.price);
  });

  it('should return correct object', () => {
    expect(entity.toObject()).toEqual(TEST_DATA);
  });
});

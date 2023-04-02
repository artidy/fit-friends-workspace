import { OrderEntity } from '../../app/order/order.entity';
import { TEST_DATA } from './const';
import { TrainingEntity } from '../../app/training/training.entity';

describe('OrderEntity', () => {
  const entity = new TrainingEntity(TEST_DATA);

  it('should create an instance', () => {
    expect(entity).toBeTruthy();
  });

  it('should have correct properties', () => {
    expect(entity.id).toEqual(TEST_DATA.id);
    expect(entity.title).toEqual(TEST_DATA.title);
    expect(entity.preview).toEqual(TEST_DATA.preview);
    expect(entity.level).toEqual(TEST_DATA.level);
    expect(entity.type).toEqual(TEST_DATA.type);
    expect(entity.duration).toEqual(TEST_DATA.duration);
    expect(entity.price).toEqual(TEST_DATA.price);
    expect(entity.calories).toEqual(TEST_DATA.calories);
    expect(entity.description).toEqual(TEST_DATA.description);
    expect(entity.gender).toEqual(TEST_DATA.gender);
    expect(entity.video).toEqual(TEST_DATA.video);
    expect(entity.coachId).toEqual(TEST_DATA.coachId);
    expect(entity.isSpecial).toEqual(TEST_DATA.isSpecial);
  });

  it('should return correct object', () => {
    expect(entity.toObject()).toEqual(TEST_DATA);
  });
});

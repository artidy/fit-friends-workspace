import { TEST_DATA } from './const';
import { GymEntity } from '../../app/gym/gym.entity';

describe('GymEntity', () => {
  const entity = new GymEntity(TEST_DATA);

  it('should create an instance', () => {
    expect(entity).toBeTruthy();
  });

  it('should have correct properties', () => {
    expect(entity.id).toEqual(TEST_DATA.id);
    expect(entity.title).toEqual(TEST_DATA.title);
    expect(entity.description).toEqual(TEST_DATA.description);
    expect(entity.isVerified).toEqual(TEST_DATA.isVerified);
    expect(entity.location).toEqual(TEST_DATA.location);
    expect(entity.price).toEqual(TEST_DATA.price);
  });

  it('should return correct object', () => {
    expect(entity.toObject()).toEqual(TEST_DATA);
  });
});

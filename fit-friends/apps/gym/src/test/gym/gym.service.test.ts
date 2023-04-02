import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { TEST_DATA } from './const';
import { GymRepository } from '../../app/gym/gym.repository';
import { GymService } from '../../app/gym/gym.service';

describe('GymService', () => {
  let repository: DeepMockProxy<GymRepository>;
  let service: GymService;

  beforeEach(async () => {
    repository = mockDeep<GymRepository>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [GymRepository, GymService]
    })
      .overrideProvider(GymRepository)
      .useValue(repository)
      .compile();

    service = module.get<GymService>(GymService);
  });

  describe('findAll', () => {
    it('should return all gyms', async () => {
      repository.findAll.mockReturnValue(Promise.resolve([TEST_DATA]));
      const result = await service.findAll();

      expect(result).toContain(TEST_DATA);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return gym by id', async () => {
      repository.findById.mockReturnValue(Promise.resolve(TEST_DATA));
      const result = await service.findById(TEST_DATA.id);

      expect(result).toEqual(TEST_DATA);
      expect(repository.findById).toHaveBeenCalledWith(TEST_DATA.id);
    });
  });
});

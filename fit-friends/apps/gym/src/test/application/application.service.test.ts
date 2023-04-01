import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ApplicationStatus } from '@fit-friends/shared-types';

import { ApplicationRepository } from '../../app/application/application.repository';
import { ApplicationService } from '../../app/application/application.service';
import { TEST_APPLICATION } from './const';
import { ApplicationEntity } from '../../app/application/application.entity';

describe('ApplicationService', () => {
  let applicationRepository: DeepMockProxy<ApplicationRepository>;
  let applicationService: ApplicationService;

  beforeEach(async () => {
    applicationRepository = mockDeep<ApplicationRepository>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationRepository, ApplicationService]
    })
      .overrideProvider(ApplicationRepository)
      .useValue(applicationRepository)
      .compile();

    applicationService = module.get<ApplicationService>(ApplicationService);
  });

  describe('findByUserId', () => {
    it('should return applications filtered by userId', async () => {
      applicationRepository.findByUserId.mockReturnValue(Promise.resolve([TEST_APPLICATION]));
      const result = await applicationService.findByUserId(TEST_APPLICATION.userId);

      expect(result).toContain(TEST_APPLICATION);
      expect(applicationRepository.findByUserId).toHaveBeenCalledWith(TEST_APPLICATION.userId);
    });
  });

  describe('findByCoachId', () => {
    it('should return applications filtered by сoachId', async () => {
      applicationRepository.findByCoachId.mockReturnValue(Promise.resolve([TEST_APPLICATION]));
      const result = await applicationService.findByCoachId(TEST_APPLICATION.coachId);

      expect(result).toContain(TEST_APPLICATION);
      expect(applicationRepository.findByCoachId).toHaveBeenCalledWith(TEST_APPLICATION.coachId);
    });
  });

  describe('create', () => {
    it('should create and return new application', async () => {
      applicationRepository.create.mockReturnValue(Promise.resolve(TEST_APPLICATION));

      const result = await applicationService.create(TEST_APPLICATION.userId,
        {
          coachId: TEST_APPLICATION.coachId
        });

      expect(result).toEqual(TEST_APPLICATION);
      expect(applicationRepository.create).toHaveBeenCalledWith(new ApplicationEntity({
        coachId: TEST_APPLICATION.coachId,
        userId: TEST_APPLICATION.userId,
        status: ApplicationStatus.Pending
      }));
    });
  });

  describe('update', () => {
    it('should update and return updated application', async () => {
      const updateStatus = ApplicationStatus.Accepted;
      applicationRepository.update.mockReturnValue(Promise.resolve({
        ...TEST_APPLICATION,
        status: updateStatus
      }));
      applicationRepository.findById.mockReturnValue(Promise.resolve(TEST_APPLICATION));

      const result = await applicationService.update(TEST_APPLICATION.id, {
        status: updateStatus,
      });

      expect(result).toEqual({
        ...TEST_APPLICATION,
        status: updateStatus
      });
      expect(applicationRepository.update).toHaveBeenCalledWith(TEST_APPLICATION.id, new ApplicationEntity({
        coachId: TEST_APPLICATION.coachId,
        userId: TEST_APPLICATION.userId,
        status: updateStatus,
        id: TEST_APPLICATION.id
      }));
    });
  });

  describe('destroy', () => {
    it('should delete application', async () => {
      await applicationService.delete(TEST_APPLICATION.id);

      expect(applicationRepository.destroy).toHaveBeenCalledWith(TEST_APPLICATION.id);
    });
  });
});

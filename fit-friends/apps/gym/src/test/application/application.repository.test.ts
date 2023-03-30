import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { prismaMock, PrismaMockType } from '@fit-friends/core';
import { Application, ApplicationStatus } from '@fit-friends/shared-types';

import { ApplicationRepository } from '../../app/application/application.repository';
import { PrismaService } from '../../app/prisma/prisma.service';
import { ApplicationEntity } from '../../app/application/application.entity';

describe('ApplicationRepository', () => {
  const application: Application = {
    id: 1,
    userId: '507f191e810c19729de860ea',
    coachId: '507f191e810c14359de860fr',
    status: ApplicationStatus.Pending
  };

  let applicationRepository: ApplicationRepository;
  let prismaService: PrismaMockType;
  let applicationEntity: DeepMockProxy<ApplicationEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ApplicationRepository]
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    applicationRepository = module.get<ApplicationRepository>(ApplicationRepository);
    prismaService = module.get<PrismaMockType>(PrismaService);
    applicationEntity = mockDeep<ApplicationEntity>();
  });

  describe('findByUserId', () => {
    it('should return applications filtered by userId', async () => {
      prismaService.application.findMany.mockReturnValue([application]);
      const result = await applicationRepository.findByUserId(application.userId);

      expect(result).toContain(application);
      expect(prismaService.application.findMany).toHaveBeenCalledWith({
        where: {
          userId: application.userId
        }
      });
    });
  });

  describe('findByCoachId', () => {
    it('should return applications filtered by сoachId', async () => {
      prismaService.application.findMany.mockReturnValue([application]);
      const result = await applicationRepository.findByCoachId(application.coachId);

      expect(result).toContain(application);
      expect(prismaService.application.findMany).toHaveBeenCalledWith({
        where: {
          coachId: application.coachId
        }
      });
    });
  });

  describe('findById', () => {
    it('should return application by id', async () => {
      prismaService.application.findFirst.mockReturnValue(application);
      const result = await applicationRepository.findById(application.id);

      expect(result).toEqual(application);
      expect(prismaService.application.findFirst).toHaveBeenCalledWith({
        where: {
          id: application.id
        }
      });
    });
  });

  describe('create', () => {
    it('should create and return new application', async () => {
      applicationEntity.toObject.mockReturnValue(application);
      prismaService.application.create.mockReturnValue(application);

      const result = await applicationRepository.create(applicationEntity);

      expect(result).toEqual(application);
      expect(prismaService.application.create).toHaveBeenCalledWith({
        data: { ...applicationEntity.toObject() }
      });
    });
  });

  describe('update', () => {
    it('should update and return updated application', async () => {
      applicationEntity.toObject.mockReturnValue(application);
      prismaService.application.update.mockReturnValue(application);

      const result = await applicationRepository.update(application.id, applicationEntity);

      expect(result).toEqual(application);
      expect(prismaService.application.update).toHaveBeenCalledWith({
        where: { id: application.id },
        data: { ...applicationEntity.toObject() }
      });
    });
  });

  describe('destroy', () => {
    it('should delete application', async () => {
      await applicationRepository.destroy(application.id);

      expect(prismaService.application.delete).toHaveBeenCalledWith({
        where: { id: application.id }
      });
    });
  });
});

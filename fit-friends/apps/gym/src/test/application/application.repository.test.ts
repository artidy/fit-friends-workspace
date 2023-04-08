import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { Application, ApplicationStatus } from '@fit-friends/shared-types';

import { ApplicationRepository } from '../../app/application/application.repository';
import { PrismaService } from '../../app/prisma/prisma.service';
import { ApplicationEntity } from '../../app/application/application.entity';

describe('ApplicationRepository', () => {
  const application: Application & { id: number, createdAt: Date, updatedAt: Date } = {
    id: 1,
    userId: '507f191e810c19729de860ea',
    coachId: '507f191e810c14359de860fr',
    status: ApplicationStatus.Pending,
    createdAt: new Date('20230101'),
    updatedAt: new Date('20230103'),
  };

  let applicationRepository: ApplicationRepository;
  let prismaService: DeepMockProxy<PrismaService>;
  let applicationEntity: DeepMockProxy<ApplicationEntity>;

  beforeEach(async () => {
    prismaService = mockDeep<PrismaService>();
    applicationEntity = mockDeep<ApplicationEntity>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ApplicationRepository]
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    applicationRepository = module.get<ApplicationRepository>(ApplicationRepository);
  });

  describe('findByUserId', () => {
    it('should return applications filtered by userId', async () => {
      prismaService.application.findMany.mockResolvedValue([application]);
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
      prismaService.application.findMany.mockResolvedValue([application]);
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
      prismaService.application.findFirst.mockResolvedValue(application);
      const result = await applicationRepository.findById(application.id ?? 0);

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
      prismaService.application.create.mockResolvedValue(application);

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
      prismaService.application.update.mockResolvedValue(application);

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

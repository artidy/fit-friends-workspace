import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@fit-friends/core';
import { CommandEvent, Duration, TrainingGender } from '@fit-friends/shared-types';

import { TEST_DATA } from './const';
import { TrainingRepository } from '../../app/training/training.repository';
import { TrainingService } from '../../app/training/training.service';
import { CreateTrainingDto } from '../../app/training/dto/create-training.dto';
import { TrainingEntity } from '../../app/training/training.entity';
import { UpdateTrainingDto } from '../../app/training/dto/update-training.dto';
import { RABBITMQ_SERVICE_NAME } from '../../app/app.constant';

describe('TrainingService', () => {
  let repository: DeepMockProxy<TrainingRepository>;
  let service: TrainingService;
  let rabbitClient: DeepMockProxy<ClientProxy>;

  beforeEach(async () => {
    rabbitClient = mockDeep<ClientProxy>();
    repository = mockDeep<TrainingRepository>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingRepository, TrainingService, {
        provide: RABBITMQ_SERVICE_NAME,
        useValue: rabbitClient
      }]
    })
      .overrideProvider(TrainingRepository)
      .useValue(repository)
      .compile();

    service = module.get<TrainingService>(TrainingService);
  });

  describe('findAll', () => {
    it('should return all trainings', async () => {
      repository.findAll.mockReturnValue(Promise.resolve([TEST_DATA]));
      const result = await service.findAll();

      expect(result).toContain(TEST_DATA);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return training by id', async () => {
      repository.findById.mockReturnValue(Promise.resolve(TEST_DATA));
      const result = await service.findById(TEST_DATA.id);

      expect(result).toEqual(TEST_DATA);
      expect(repository.findById).toHaveBeenCalledWith(TEST_DATA.id);
    });
  });

  describe('create', () => {
    it('should create and return new training', async () => {
      const dto: CreateTrainingDto = {
        ...TEST_DATA,
        duration: TEST_DATA.duration as Duration,
        gender: TEST_DATA.gender as TrainingGender
      }

      repository.create.mockReturnValue(Promise.resolve(TEST_DATA));

      const result = await service.create(dto, TEST_DATA.coachId);

      expect(result).toEqual(TEST_DATA);
      expect(repository.create).toHaveBeenCalledWith(new TrainingEntity({
        ...dto,
        coachId: TEST_DATA.coachId,
        preview: '',
        isSpecial: dto.isSpecial ?? false,
        createdAt: null
      }));
      expect(rabbitClient.emit).toHaveBeenCalledWith(
        createEvent(CommandEvent.AddNewTraining),
        {
          coachId: TEST_DATA.coachId,
          trainingName: dto.title
        }
      )
    });
  });

  describe('update', () => {
    it('should update and return updated training', async () => {
      const dto: UpdateTrainingDto = {
        ...TEST_DATA,
        duration: TEST_DATA.duration as Duration,
        gender: TEST_DATA.gender as TrainingGender
      }

      repository.update.mockReturnValue(Promise.resolve(TEST_DATA));
      repository.findById.mockReturnValue(Promise.resolve(TEST_DATA));

      const result = await service.update(TEST_DATA.id, dto);

      expect(result).toEqual(TEST_DATA);
      expect(repository.update).toHaveBeenCalledWith(TEST_DATA.id, new TrainingEntity({
        ...TEST_DATA,
        ...dto
      }));
    });
  });

  describe('delete', () => {
    it('should delete training', async () => {
      await service.delete(TEST_DATA.id);

      expect(repository.destroy).toHaveBeenCalledWith(TEST_DATA.id);
    });
  });
});

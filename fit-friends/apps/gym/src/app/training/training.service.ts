import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@fit-friends/core';
import { CommandEvent, Training } from '@fit-friends/shared-types';


import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { RABBITMQ_SERVICE_NAME } from '../app.constant';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    @Inject(RABBITMQ_SERVICE_NAME) private readonly rabbitClient: ClientProxy
  ) {}

  public async findAll(): Promise<Training[]> {
    return this.trainingRepository.findAll();
  }

  public async findById(id: number): Promise<Training | null> {
    return this.trainingRepository.findById(id);
  }

  public async create(dto: CreateTrainingDto, coachId: string): Promise<Training> {
    const training = await this.trainingRepository.create(new TrainingEntity({
      ...dto,
      coachId,
      preview: '',
      isSpecial: dto.isSpecial ?? false,
      createdAt: null
    }));

    await this.rabbitClient.emit(
      createEvent(CommandEvent.AddNewTraining),
      {
        coachId: coachId,
        trainingName: dto.title
      }
    )

    return training;
  }

  public async update(id: number, dto: UpdateTrainingDto): Promise<Training | null> {
    const training = await this.trainingRepository.findById(id);

    return this.trainingRepository.update(id, new TrainingEntity({
      ...training,
      ...dto
    }));
  }

  public async delete(id: number): Promise<void> {
    await this.trainingRepository.destroy(id);
  }
}

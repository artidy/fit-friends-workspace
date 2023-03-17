import { Injectable } from '@nestjs/common';
import { EntityNotFoundException, EntityType } from '@fit-friends/core';

import { TrainingDiaryRepository } from './training-diary.repository';
import { CreateTrainingDiaryDto } from './dto/create-training-diary.dto';
import { TrainingDiaryEntity } from './training-diary.entity';
import { UpdateTrainingDiaryDto } from './dto/update-training-diary.dto';

@Injectable()
export class TrainingDiaryService {
  constructor(private readonly trainingDiaryRepository: TrainingDiaryRepository) {}

  public async getByUserId(userId: string) {
    return this.trainingDiaryRepository.findByUserId(userId);
  }

  public async create(userId: string, dto: CreateTrainingDiaryDto) {
    const trainingDiaryEntity = new TrainingDiaryEntity({
      ...dto,
      userId
    });

    return this.trainingDiaryRepository.create(trainingDiaryEntity);
  }

  public async update(id: string, dto: UpdateTrainingDiaryDto) {
    const existTrainingDairy = await this.trainingDiaryRepository.findById(id);

    if (!existTrainingDairy) {
      throw new EntityNotFoundException(EntityType.TrainingDiary, id);
    }

    const trainingDiaryEntity = new TrainingDiaryEntity({
      ...existTrainingDairy,
      ...dto
    });

    return this.trainingDiaryRepository.update(id, trainingDiaryEntity);
  }

  public async delete(id: string) {
    await this.trainingDiaryRepository.destroy(id);
  }

  public async deleteByUserId(userId: string) {
    await this.trainingDiaryRepository.destroyByUserId(userId);
  }
}

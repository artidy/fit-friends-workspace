import { Injectable } from '@nestjs/common';
import { Training } from '@fit-friends/shared-types';

import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@Injectable()
export class TrainingService {
  constructor(private readonly trainingRepository: TrainingRepository) {}

  public async findAll(): Promise<Training[]> {
    return this.trainingRepository.findAll();
  }

  public async findById(id: number): Promise<Training | null> {
    return this.trainingRepository.findById(id);
  }

  public async create(dto: CreateTrainingDto, coachId: string): Promise<Training> {

    return this.trainingRepository.create(new TrainingEntity({
      ...dto,
      coachId,
      preview: '',
      isSpecial: dto.isSpecial ?? false,
      createdAt: null
    }));
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

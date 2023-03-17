import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@fit-friends/core';
import { TrainingDiary } from '@fit-friends/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TrainingDiaryEntity } from './training-diary.entity';
import { TrainingDiaryModel } from './training-diary.model';

@Injectable()
export class TrainingDiaryRepository implements CRUDRepository<TrainingDiaryEntity, string, TrainingDiary> {
  constructor(
    @InjectModel(TrainingDiaryModel.name) private readonly trainingDiaryModel: Model<TrainingDiaryModel>
  ) {}

  public async findById(id: string): Promise<TrainingDiary|null> {
    return this.trainingDiaryModel.findById(id);
  }

  public async findByUserId(userId: string): Promise<TrainingDiary[]> {
    return this.trainingDiaryModel.find({userId});
  }

  public async create(trainingDiary: TrainingDiaryEntity): Promise<TrainingDiary> {
    return (new this.trainingDiaryModel(trainingDiary)).save();
  }

  public async update(id: string, trainingDiary: TrainingDiaryEntity): Promise<TrainingDiary> {
    return this.trainingDiaryModel
      .findByIdAndUpdate(id, trainingDiary.toObject(), {new: true})
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.trainingDiaryModel.findByIdAndDelete(id);
  }

  public async destroyByUserId(userId: string): Promise<void> {
    await this.trainingDiaryModel.deleteMany({userId});
  }
}

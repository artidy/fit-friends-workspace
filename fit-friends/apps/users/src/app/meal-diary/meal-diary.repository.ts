import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@fit-friends/core';
import { MealDiary } from '@fit-friends/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MealDiaryEntity } from './meal-diary.entity';
import { MealDiaryModel } from './meal-diary.model';

@Injectable()
export class MealDiaryRepository implements CRUDRepository<MealDiaryEntity, string, MealDiary> {
  constructor(
    @InjectModel(MealDiaryModel.name) private readonly mealDiaryModel: Model<MealDiaryModel>
  ) {}

  public async findById(id: string): Promise<MealDiary|null> {
    return this.mealDiaryModel.findById(id);
  }

  public async findByUserId(userId: string): Promise<MealDiary[]> {
    return this.mealDiaryModel.find({userId});
  }

  public async create(mealDiary: MealDiaryEntity): Promise<MealDiary> {
    return (new this.mealDiaryModel(mealDiary)).save();
  }

  public async update(id: string, mealDiary: MealDiaryEntity): Promise<MealDiary> {
    return this.mealDiaryModel
      .findByIdAndUpdate(id, mealDiary.toObject(), {new: true})
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.mealDiaryModel.findByIdAndDelete(id);
  }

  public async destroyByUserId(userId: string): Promise<void> {
    await this.mealDiaryModel.deleteMany({userId});
  }
}

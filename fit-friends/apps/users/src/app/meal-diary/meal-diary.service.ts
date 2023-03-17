import { Injectable } from '@nestjs/common';
import { EntityNotFoundException, EntityType } from '@fit-friends/core';

import { MealDiaryRepository } from './meal-diary.repository';
import { CreateMealDiaryDto } from './dto/create-meal-diary.dto';
import { MealDiaryEntity } from './meal-diary.entity';
import { UpdateMealDiaryDto } from './dto/update-meal-diary.dto';

@Injectable()
export class MealDiaryService {
  constructor(private readonly mealDiaryRepository: MealDiaryRepository) {}

  public async getByUserId(userId: string) {
    return this.mealDiaryRepository.findByUserId(userId);
  }

  public async create(userId: string, dto: CreateMealDiaryDto) {
    const mealDiaryEntity = new MealDiaryEntity({
      ...dto,
      userId
    });

    return this.mealDiaryRepository.create(mealDiaryEntity);
  }

  public async update(id: string, dto: UpdateMealDiaryDto) {
    const existMealDiary = await this.mealDiaryRepository.findById(id);

    if (!existMealDiary) {
      throw new EntityNotFoundException(EntityType.MealDiary, id);
    }

    const mealDiaryEntity = new MealDiaryEntity({
      ...existMealDiary,
      ...dto
    });

    return this.mealDiaryRepository.update(id, mealDiaryEntity);
  }

  public async delete(id: string) {
    await this.mealDiaryRepository.destroy(id);
  }

  public async deleteByUserId(userId: string) {
    await this.mealDiaryRepository.destroyByUserId(userId);
  }
}

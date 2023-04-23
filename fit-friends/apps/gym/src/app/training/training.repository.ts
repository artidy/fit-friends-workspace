import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@fit-friends/core';
import { Training } from '@fit-friends/shared-types';

import { PrismaService } from '../prisma/prisma.service';
import { TrainingEntity } from './training.entity';
import { TrainingQuery } from './query/training.query';

@Injectable()
export class TrainingRepository implements CRUDRepository<TrainingEntity, number, Training> {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll({ limit, level, types, gender, duration, minPrice, maxPrice, calories, page }: TrainingQuery): Promise<Training[]> {
    console.log(limit, level, types, gender, duration, minPrice, maxPrice, calories, page);
    return this.prisma.training.findMany({
      where: {
        level,
        type: {
          in: types
        },
        gender,
        duration,
        price: {
          lte: minPrice,
          gte: maxPrice
        },
        calories
      },
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findById(id: number): Promise<Training | null> {
    return this.prisma.training.findFirst({ where: { id } });
  }

  public async create(trainingEntity: TrainingEntity): Promise<Training> {
    const training = trainingEntity.toObject();

    return this.prisma.training.create({
      data: { ...training },
      include: { comments: true }
    });
  }

  public async update(id: number, trainingEntity: TrainingEntity): Promise<Training> {
    const training = trainingEntity.toObject();

    return this.prisma.training.update({
      where: {
        id
      },
      data: { ...training },
      include: { comments: true }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.training.delete({ where: { id }});
  }
}

import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@fit-friends/core';
import { Training } from '@fit-friends/shared-types';

import { PrismaService } from '../prisma/prisma.service';
import { TrainingEntity } from './training.entity';

@Injectable()
export class TrainingRepository implements CRUDRepository<TrainingEntity, number, Training> {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<Training[]> {
    return this.prisma.training.findMany();
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

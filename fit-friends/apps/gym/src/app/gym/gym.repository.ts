import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@fit-friends/core';
import { Gym } from '@fit-friends/shared-types';

import { PrismaService } from '../prisma/prisma.service';
import { GymEntity } from './gym.entity';

@Injectable()
export class GymRepository implements CRUDRepository<GymEntity, number, Gym> {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<Gym[]> {
    return this.prisma.gym.findMany();
  }

  public async findById(id: number): Promise<Gym | null> {
    return this.prisma.gym.findFirst({ where: { id } });
  }

  public async create(gymEntity: GymEntity): Promise<Gym> {
    const gym = gymEntity.toObject();

    return this.prisma.gym.create({
      data: { ...gym },
      include: { futures: true, photos: true }
    });
  }

  public async update(id: number, gymEntity: GymEntity): Promise<Gym> {
    const gym = gymEntity.toObject();

    return this.prisma.gym.update({
      where: {
        id
      },
      data: { ...gym },
      include: { futures: true, photos: true }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.gym.delete({ where: { id }});
  }
}

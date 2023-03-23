import { Injectable } from '@nestjs/common';
import { Gym } from '@fit-friends/shared-types';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GymRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<Gym[]> {
    return this.prisma.gym.findMany();
  }

  public async findById(id: number): Promise<Gym | null> {
    return this.prisma.gym.findFirst({where: {id}});
  }
}

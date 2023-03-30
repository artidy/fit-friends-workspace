import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@fit-friends/core';
import { Application } from '@fit-friends/shared-types';

import { PrismaService } from '../prisma/prisma.service';
import { ApplicationEntity } from './application.entity';

@Injectable()
export class ApplicationRepository implements CRUDRepository<ApplicationEntity, number, Application> {
  constructor(private readonly prisma: PrismaService) {}

  public async findByUserId(userId: string): Promise<Application[]> {
    return this.prisma.application.findMany({ where: { userId }});
  }

  public async findByCoachId(coachId: string): Promise<Application[]> {
    return this.prisma.application.findMany({ where: { coachId }});
  }

  public async findById(id: number): Promise<Application | null> {
    return this.prisma.application.findFirst({ where: { id } });
  }

  public async create(applicationEntity: ApplicationEntity): Promise<Application> {
    const application = applicationEntity.toObject();

    return this.prisma.application.create({
      data: { ...application }
    });
  }

  public async update(id: number, applicationEntity: ApplicationEntity): Promise<Application> {
    const application = applicationEntity.toObject();

    return this.prisma.application.update({
      where: {id},
      data: { ...application }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.application.delete({ where: { id }});
  }
}

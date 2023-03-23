import { Injectable } from '@nestjs/common';
import { StatusSetException } from '@fit-friends/core';
import { Application, ApplicationStatus } from '@fit-friends/shared-types';

import { ApplicationRepository } from './application.repository';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationEntity } from './application.entity';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  public async findByUserId(userId: string): Promise<Application[]> {
    return this.applicationRepository.findByUserId(userId);
  }

  public async findByCoachId(coachId: string): Promise<Application[]> {
    return this.applicationRepository.findByCoachId(coachId);
  }

  public async create(userId: string, dto: CreateApplicationDto): Promise<Application> {

    return this.applicationRepository.create(new ApplicationEntity({
      ...dto,
      userId,
      status: ApplicationStatus.Pending
    }));
  }

  public async update(id: number, dto: UpdateApplicationDto): Promise<Application | null> {
    const application = await this.applicationRepository.findById(id);

    if (dto.status === application.status) {
      throw new StatusSetException(dto.status);
    }

    return this.applicationRepository.update(id, new ApplicationEntity({
      ...application,
      status: dto.status
    }));
  }

  public async delete(id: number): Promise<void> {
    await this.applicationRepository.destroy(id);
  }
}

import { Injectable } from '@nestjs/common';
import { EntityFoundException, EntityType, ProfileNotFoundException } from '@fit-friends/core';

import { CoachProfileRepository } from './coach-profile.repository';
import { CreateCoachProfileDto } from './dto/create-coach-profile.dto';
import { CoachProfileEntity } from './coach-profile.entity';
import { UpdateCoachProfileDto } from './dto/update-coach-profile.dto';

@Injectable()
export class CoachProfileService {
  constructor(private readonly coachProfileRepository: CoachProfileRepository) {}

  public async getAll() {
    return this.coachProfileRepository.findAll();
  }

  public async getById(userId: string) {
    return this.coachProfileRepository.findById(userId);
  }

  public async create(userId: string, dto: CreateCoachProfileDto) {
    const existProfileCoach = await this.coachProfileRepository.findById(userId);

    if (existProfileCoach) {
      throw new EntityFoundException(EntityType.CoachProfile, userId);
    }

    const coachProfileEntity = new CoachProfileEntity({
      ...dto,
      userId,
      certificate: ''
    });

    return this.coachProfileRepository.create(coachProfileEntity);
  }

  public async update(userId: string, dto: UpdateCoachProfileDto) {
    const existProfileCoach = await this.coachProfileRepository.findById(userId);

    if (!existProfileCoach) {
      throw new ProfileNotFoundException(userId);
    }

    const coachProfileEntity = new CoachProfileEntity({
      ...existProfileCoach,
      ...dto
    });

    return this.coachProfileRepository.update(existProfileCoach._id, coachProfileEntity);
  }

  public async delete(userId: string) {
    await this.coachProfileRepository.destroy(userId);
  }
}

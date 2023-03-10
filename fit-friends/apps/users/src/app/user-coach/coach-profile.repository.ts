import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CRUDRepository } from '@fit-friends/core';
import { CoachProfile } from '@fit-friends/shared-types';

import { CoachProfileEntity } from './coach-profile.entity';
import { CoachProfileModel } from './coach-profile.model';

@Injectable()
export class CoachProfileRepository implements CRUDRepository<CoachProfileEntity, string, CoachProfile> {
  constructor(
    @InjectModel(CoachProfileModel.name) private readonly coachProfileModel: Model<CoachProfileModel>
  ) {}

  public async findAll(): Promise<CoachProfile[]> {
    return this.coachProfileModel.find();
  }

  public async findById(userId: string): Promise<CoachProfile|null> {
    return this.coachProfileModel.findOne({userId}).exec();
  }

  public async create(coachProfile: CoachProfileEntity): Promise<CoachProfile> {
    return (new this.coachProfileModel(coachProfile)).save();
  }

  public async update(id: string, coachProfile: CoachProfileEntity): Promise<CoachProfile> {
    return this.coachProfileModel
      .findByIdAndUpdate(id, coachProfile.toObject(), {new: true})
      .exec();
  }

  public async destroy(userId: string): Promise<void> {
    await this.coachProfileModel.deleteOne({userId});
  }
}

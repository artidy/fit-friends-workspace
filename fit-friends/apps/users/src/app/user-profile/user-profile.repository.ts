import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CRUDRepository } from '@fit-friends/core';
import { UserProfile } from '@fit-friends/shared-types';

import { UserProfileModel } from './user-profile.model';
import { UserProfileEntity } from './user-profile.entity';

@Injectable()
export class UserProfileRepository implements CRUDRepository<UserProfileEntity, string, UserProfile> {
  constructor(
    @InjectModel(UserProfileModel.name) private readonly userProfileModel: Model<UserProfileModel>
  ) {}

  public async findAll(): Promise<UserProfile[]> {
    return this.userProfileModel.find();
  }

  public async findById(userId: string): Promise<UserProfile|null> {
    return this.userProfileModel.findOne({userId}).exec();
  }

  public async create(userProfile: UserProfileEntity): Promise<UserProfile> {
    return (new this.userProfileModel(userProfile)).save();
  }

  public async update(id: string, userProfile: UserProfileEntity): Promise<UserProfile> {
    return this.userProfileModel
      .findByIdAndUpdate(id, userProfile.toObject(), {new: true})
      .exec();
  }

  public async destroy(userId: string): Promise<void> {
    await this.userProfileModel.deleteOne({userId});
  }
}

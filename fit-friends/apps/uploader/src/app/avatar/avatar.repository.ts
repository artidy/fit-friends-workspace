import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CRUDRepository } from '@fit-friends/core';
import { Avatar } from '@fit-friends/shared-types';

import { AvatarEntity } from './avatar.entity';
import { AvatarModel } from './avatar.model';

@Injectable()
export class AvatarRepository implements CRUDRepository<AvatarEntity, string, Avatar> {
  constructor(
    @InjectModel(AvatarModel.name) private readonly avatarModel: Model<AvatarModel>
  ) {}

  public async create(avatar: AvatarEntity): Promise<Avatar> {
    return (new this.avatarModel(avatar)).save();
  }

  public async destroy(userId: string): Promise<void> {
    await this.avatarModel.deleteOne({ userId });
  }

  public async findById(id: string): Promise<Avatar | null> {
    return this.avatarModel.findOne({ id });
  }

  public async findByUserId(userId: string): Promise<Avatar | null> {
    return this.avatarModel.findOne({ userId });
  }

  public async update(userId: string, avatar: AvatarEntity): Promise<Avatar> {
    return this.avatarModel.findOneAndUpdate(
      { userId },
      { fileName: avatar.fileName }, { new: true }
    ).exec();
  }
}

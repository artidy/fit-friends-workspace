import { Injectable } from '@nestjs/common';
import { Friend } from '@fit-friends/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FriendEntity } from './friend.entity';
import { FriendModel } from './friend.model';

@Injectable()
export class FriendRepository {
  constructor(
    @InjectModel(FriendModel.name) private readonly friendModel: Model<FriendModel>
  ) {}

  public async findById(userId: string): Promise<Friend[]> {
    return this.friendModel.find({ userId }).populate('users');
  }

  public async getFriend(userId: string, friendId: string): Promise<Friend|null> {
    return this.friendModel.findOne({ userId, friendId });
  }

  public async create(friend: FriendEntity): Promise<Friend> {
    return (new this.friendModel(friend)).save();
  }

  public async destroy(userId: string, friendId: string): Promise<void> {
    await this.friendModel.deleteOne({ userId, friendId });
  }

  public async destroyAll(userId: string): Promise<void> {
    await this.friendModel.deleteMany({ userId });
  }
}

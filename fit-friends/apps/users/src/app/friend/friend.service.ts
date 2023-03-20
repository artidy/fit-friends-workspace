import { Injectable } from '@nestjs/common';
import { EntityFoundException, EntityType } from '@fit-friends/core';

import { FriendRepository } from './friend.repository';
import { FriendEntity } from './friend.entity';

@Injectable()
export class FriendService {
  constructor(private readonly friendRepository: FriendRepository) {}

  public async getFriendsById(userId: string) {
    return this.friendRepository.findById(userId);
  }

  public async create(userId: string, friendId: string) {
    const friendExist = await this.friendRepository.getFriend(userId, friendId);

    if (friendExist) {
      throw new EntityFoundException(EntityType.Friend, friendExist.userId);
    }

    const friendEntity = new FriendEntity({
      userId,
      friendId,
    });

    return this.friendRepository.create(friendEntity);
  }

  public async delete(userId: string, friendId: string) {
    await this.friendRepository.destroy(userId, friendId);
  }

  public async deleteAll(userId: string) {
    await this.friendRepository.destroyAll(userId);
  }
}

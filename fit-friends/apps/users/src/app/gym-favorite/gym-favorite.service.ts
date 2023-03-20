import { Injectable } from '@nestjs/common';
import { EntityFoundException, EntityType } from '@fit-friends/core';

import { GymFavoriteRepository } from './gym-favorite.repository';
import { GymFavoriteEntity } from './gym-favorite.entity';

@Injectable()
export class GymFavoriteService {
  constructor(private readonly gymFavoriteRepository: GymFavoriteRepository) {}

  public async getByUserId(userId: string) {
    return this.gymFavoriteRepository.findByUserId(userId);
  }

  public async create(userId: string, gymId: number) {
    const gymFavorite = await this.gymFavoriteRepository.findByGymId(gymId);

    if (gymFavorite) {
      throw new EntityFoundException(EntityType.Gym, gymId);
    }

    const gymFavoriteEntity = new GymFavoriteEntity({
      gymId,
      userId
    });

    return this.gymFavoriteRepository.create(gymFavoriteEntity);
  }

  public async delete(id: string) {
    await this.gymFavoriteRepository.destroy(id);
  }
}

import { Injectable } from '@nestjs/common';
import { GymFavorite } from '@fit-friends/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GymFavoriteEntity } from './gym-favorite.entity';
import { GymFavoriteModel } from './gym-favorite.model';

@Injectable()
export class GymFavoriteRepository {
  constructor(
    @InjectModel(GymFavoriteModel.name) private readonly gymFavoriteModel: Model<GymFavoriteModel>
  ) {}

  public async findByGymId(gymId: number): Promise<GymFavorite|null> {
    return this.gymFavoriteModel.findOne({gymId});
  }

  public async findByUserId(userId: string): Promise<GymFavorite[]> {
    return this.gymFavoriteModel.find({userId});
  }

  public async create(gymFavorite: GymFavoriteEntity): Promise<GymFavorite> {
    return (new this.gymFavoriteModel(gymFavorite)).save();
  }

  public async destroy(id: string): Promise<void> {
    await this.gymFavoriteModel.findByIdAndDelete(id);
  }
}

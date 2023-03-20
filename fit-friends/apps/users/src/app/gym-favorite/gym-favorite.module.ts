import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtStrategy } from '../user/strategies/jwt.strategy';
import { GymFavoriteModel, GymFavoriteSchema } from './gym-favorite.model';
import { GymFavoriteController } from './gym-favorite.controller';
import { GymFavoriteService } from './gym-favorite.service';
import { GymFavoriteRepository } from './gym-favorite.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GymFavoriteModel.name, schema: GymFavoriteSchema }
    ]),
  ],
  controllers: [GymFavoriteController],
  providers: [GymFavoriteService, GymFavoriteRepository, JwtStrategy]
})
export class GymFavoriteModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbOptions, mongodbConfig } from '@fit-friends/core';

import { ENV_FILE_PATH } from './app.constant';
import { jwtConfig } from '../config/jwt.config';
import { validateEnvironments } from './env.validation';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { CoachProfileModule } from './coach-profile/coach-profile.module';
import { FriendModule } from './friend/friend.module';
import { MealDiaryModule } from './meal-diary/meal-diary.module';
import { TrainingDiaryModule } from './training-dairy/training-diary.module';
import { GymFavoriteModule } from './gym-favorite/gym-favorite.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [mongodbConfig, jwtConfig],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(
      getMongoDbOptions()
    ),
    RefreshTokenModule,
    UserModule,
    AuthModule,
    UserProfileModule,
    CoachProfileModule,
    FriendModule,
    MealDiaryModule,
    TrainingDiaryModule,
    GymFavoriteModule,
  ]
})
export class AppModule {}

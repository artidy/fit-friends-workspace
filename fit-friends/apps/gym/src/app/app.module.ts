import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { authConfig } from '@fit-friends/core';

import { ENV_FILE_PATH } from './app.constant';
import { getHttpOptions, httpConfig } from '../config/http.config';
import { validateEnvironments } from './env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { GymModule } from './gym/gym.module';
import { TrainingModule } from './training/training.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [httpConfig, authConfig],
      validate: validateEnvironments,
    }),
    HttpModule.registerAsync(getHttpOptions()),
    PrismaModule,
    GymModule,
    TrainingModule
  ]
})
export class AppModule {}

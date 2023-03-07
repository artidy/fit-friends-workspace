import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { authConfig } from '@fit-friends/core';

import { ENV_FILE_PATH } from './app.constant';
import { httpConfig } from '../config/http.config';
import { validateEnvironments } from './env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { GymModule } from './gym/gym.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [httpConfig, authConfig],
      validate: validateEnvironments,
    }),
    PrismaModule,
    GymModule
  ]
})
export class AppModule {}

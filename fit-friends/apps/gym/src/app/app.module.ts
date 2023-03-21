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
import { OrderModule } from './order/order.module';
import { rabbitmqOptions } from '../config/rabbitmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [httpConfig, authConfig, rabbitmqOptions],
      validate: validateEnvironments,
    }),
    HttpModule.registerAsync(getHttpOptions()),
    PrismaModule,
    GymModule,
    TrainingModule,
    OrderModule,
  ]
})
export class AppModule {}

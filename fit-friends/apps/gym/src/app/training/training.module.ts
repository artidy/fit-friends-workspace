import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getRabbitmqConfig } from '@fit-friends/core';

import { TrainingController } from './training.controller';
import { TrainingRepository } from './training.repository';
import { TrainingService } from './training.service';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE_NAME } from '../app.constant';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE_NAME,
        useFactory: getRabbitmqConfig,
        inject: [ConfigService],
      }
    ])
  ],
  controllers: [TrainingController],
  providers: [TrainingRepository, TrainingService]
})
export class TrainingModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getMongoDbOptions, mongodbConfig } from '@fit-friends/core';

import { ENV_FILE_PATH } from './app.constant';
import { mailOptions } from '../config/mail.config';
import { rabbitmqOptions } from '../config/rabbitmq.config';
import { validateEnvironments } from './env.validation';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [ mailOptions, mongodbConfig, rabbitmqOptions ],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(
      getMongoDbOptions()
    )
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbOptions, mongodbConfig } from '@fit-friends/core';

import { ENV_FILE_PATH } from './app.constant';
import { mailOptions } from '../config/mail.config';
import { rabbitmqOptions } from '../config/rabbitmq.config';
import { validateEnvironments } from './env.validation';
import { MailModule } from './mail/mail.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { NotificationModule } from './notification/notification.module';

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
    ),
    MailModule,
    SubscriberModule,
    NotificationModule
  ],
})
export class AppModule {}

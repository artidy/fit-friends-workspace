import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubscriberModel, SubscriberSchema } from './subscriber.model';
import { MailModule } from '../mail/mail.module';
import { SubscriberController } from './subscriber.controller';
import { SubscriberService } from './subscriber.service';
import { SubscriberRepository } from './subscriber.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriberModel.name, schema: SubscriberSchema }
    ]),
    MailModule
  ],
  controllers: [SubscriberController],
  providers: [SubscriberService, SubscriberRepository]
})
export class SubscriberModule {}

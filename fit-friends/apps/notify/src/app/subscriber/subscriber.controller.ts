import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { fillObject } from '@fit-friends/core';
import { CommandEvent } from '@fit-friends/shared-types';


import { SubscriberService } from './subscriber.service';
import { MailService } from '../mail/mail.service';
import { SubscriberRdo } from './rdo/subscriber.rdo';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriber } from '../app.constant';

@Controller()
export class SubscriberController {
  constructor(
    private readonly subscriberService: SubscriberService,
    private readonly mailService: MailService
  ) {}

  @EventPattern({ cmd: CommandEvent.GetCoachSubscribers })
  public async getCoachSubscribers(coachId: string) {
    const subscribers = await this.subscriberService.findByCoachId(coachId);

    return fillObject(SubscriberRdo, subscribers);
  }

  @EventPattern({ cmd: CommandEvent.AddSubscriber })
  public async addSubscriber(newSubscriber: CreateSubscriberDto) {
    const subscriber = await this.subscriberService.add(newSubscriber);

    return fillObject(SubscriberRdo, subscriber);
  }

  @EventPattern({ cmd: CommandEvent.AddNewTraining })
  public async addNewTraining(coachId: string, trainingName: string) {
    const subscribers = await this.subscriberService.findByCoachId(coachId);

    for (const subscriber of subscribers) {
      await this.mailService.addNewTraining(subscriber, trainingName);
    }

    return EmailSubscriber.SuccessSend;
  }

  @EventPattern({ cmd: CommandEvent.DeleteSubscriber })
  public async delete(email: string, coachId: string) {
    return await this.subscriberService.delete(email, coachId);
  }
}

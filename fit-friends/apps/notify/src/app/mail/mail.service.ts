import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@fit-friends/shared-types';

import { EmailSubscriber } from '../app.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async addNewTraining(subscriber: Subscriber, trainingName: string): Promise<SentMessageInfo>
  {
    return this.mailerService.sendMail({
      to: subscriber.email,
      subject: EmailSubscriber.AddNewTraining,
      template: EmailSubscriber.AddNewTrainingTemplate,
      context: {
        trainingName: `${trainingName}`,
        user: `${subscriber.firstname}`
      }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@fit-friends/shared-types';

import { EmailSubscriber } from '../app.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNewNotify(subscriber: Subscriber): Promise<SentMessageInfo>
  {
    return this.mailerService.sendMail({
      to: subscriber.email,
      subject: EmailSubscriber.RegisteredSubject,
      template: EmailSubscriber.RegisteredTemplate,
      context: {
        user: `${subscriber.firstname}`,
        email: `${subscriber.email}`
      }
    });
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { Subscriber } from '@fit-friends/shared-types';
import { MailerService } from '@nestjs-modules/mailer';

import { MailService } from '../app/mail/mail.service';
import { EmailSubscriber } from '../app/app.constant';

describe('MailService', () => {
  let mailerService: DeepMockProxy<MailerService>;
  let service: MailService;

  beforeEach(async () => {
    mailerService = mockDeep<MailerService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerService, MailService]
    })
      .overrideProvider(MailerService)
      .useValue(mailerService)
      .compile();

    service = module.get<MailService>(MailService);
  });

  describe('addNewTraining', () => {
    it('should send email about new training was created', async () => {
      const testData: Subscriber = {
        _id: '1',
        email: 'test@mail.ru',
        firstname: 'TestName',
        coachId: '2',
      }
      const trainingName = 'TestTraining';
      mailerService.sendMail.mockReturnValue(Promise.resolve(testData));

      const result = await service.addNewTraining(testData, trainingName);

      expect(result).toEqual(testData);
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: testData.email,
        subject: EmailSubscriber.AddNewTraining,
        template: EmailSubscriber.AddNewTrainingTemplate,
        context: {
          trainingName: `${trainingName}`,
          user: `${testData.firstname}`
        }
      });
    });
  });
});

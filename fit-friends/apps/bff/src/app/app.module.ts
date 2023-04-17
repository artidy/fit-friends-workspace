import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from './const';
import { bffConfig } from '../config/bff.config';
import { validateEnvironments } from './env.validation';
import { UsersModule } from './users/users.module';
import { QuestionnaireCoachModule } from './questionnaire-coach/questionnaire-coach.module';
import { QuestionnaireUserModule } from './questionnaire-user/questionnaire-user.module';
import { TrainingsModule } from './trainings/trainings.module';
import { GymModule } from './gyms/gym.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [bffConfig],
      validate: validateEnvironments,
    }),
    UsersModule,
    QuestionnaireCoachModule,
    QuestionnaireUserModule,
    TrainingsModule,
    GymModule,
  ]
})
export class AppModule {}

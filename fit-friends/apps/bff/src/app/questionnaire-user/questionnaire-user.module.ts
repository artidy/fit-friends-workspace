import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';

import { QuestionnaireUserController } from './questionnaire-user.controller';
import { QuestionnaireUserService } from './questionnaire-user.service';

@Module({
  imports: [HttpModule],
  controllers: [QuestionnaireUserController],
  providers: [QuestionnaireUserService],
})
export class QuestionnaireUserModule {}

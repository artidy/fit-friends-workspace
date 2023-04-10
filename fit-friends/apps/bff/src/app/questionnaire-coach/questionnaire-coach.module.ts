import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';

import { QuestionnaireCoachController } from './questionnaire-coach.controller';
import { QuestionnaireCoachService } from './questionnaire-coach.service';

@Module({
  imports: [HttpModule],
  controllers: [QuestionnaireCoachController],
  providers: [QuestionnaireCoachService],
})
export class QuestionnaireCoachModule {}

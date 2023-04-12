import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';

import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';

@Module({
  imports: [HttpModule],
  controllers: [TrainingsController],
  providers: [TrainingsService],
})
export class TrainingsModule {}

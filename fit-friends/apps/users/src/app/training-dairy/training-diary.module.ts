import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtStrategy } from '../user/strategies/jwt.strategy';
import { TrainingDiaryModel, TrainingDiarySchema } from './training-diary.model';
import { TrainingDiaryController } from './training-diary.controller';
import { TrainingDiaryService } from './training-diary.service';
import { TrainingDiaryRepository } from './training-diary.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrainingDiaryModel.name, schema: TrainingDiarySchema }
    ]),
  ],
  controllers: [TrainingDiaryController],
  providers: [TrainingDiaryService, TrainingDiaryRepository, JwtStrategy]
})
export class TrainingDiaryModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtStrategy } from '../user/strategies/jwt.strategy';
import { MealDiaryModel, MealDiarySchema } from './meal-diary.model';
import { MealDiaryController } from './meal-diary.controller';
import { MealDiaryService } from './meal-diary.service';
import { MealDiaryRepository } from './meal-diary.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MealDiaryModel.name, schema: MealDiarySchema }
    ]),
  ],
  controllers: [MealDiaryController],
  providers: [MealDiaryService, MealDiaryRepository, JwtStrategy]
})
export class MealDiaryModule {}

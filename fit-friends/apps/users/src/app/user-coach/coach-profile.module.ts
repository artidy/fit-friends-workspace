import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtStrategy } from '../user/strategies/jwt.strategy';
import { CoachProfileModel, CoachProfileSchema } from './coach-profile.model';
import { CoachProfileController } from './coach-profile.controller';
import { CoachProfileService } from './coach-profile.service';
import { CoachProfileRepository } from './coach-profile.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CoachProfileModel.name, schema: CoachProfileSchema }
    ]),
  ],
  controllers: [CoachProfileController],
  providers: [CoachProfileService, CoachProfileRepository, JwtStrategy]
})
export class CoachProfileModule {}

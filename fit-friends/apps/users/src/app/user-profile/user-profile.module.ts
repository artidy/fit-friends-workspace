import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtStrategy } from '../user/strategies/jwt.strategy';
import { UserProfileModel, UserProfileSchema } from './user-profile.model';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';
import { UserProfileRepository } from './user-profile.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserProfileModel.name, schema: UserProfileSchema }
    ]),
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService, UserProfileRepository, JwtStrategy]
})
export class UserProfileModule {}

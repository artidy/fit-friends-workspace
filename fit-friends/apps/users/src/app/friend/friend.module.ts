import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FriendModel, FriendSchema } from './friend.model';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { FriendRepository } from './friend.repository';
import { JwtStrategy } from '../user/strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FriendModel.name, schema: FriendSchema }
    ]),
  ],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository, JwtStrategy],
  exports: [FriendRepository]
})
export class FriendModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FriendModel, FriendSchema } from './friend.model';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { FriendRepository } from './friend.repository';
import { JwtStrategy } from '../user/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FriendModel.name, schema: FriendSchema }
    ]),
    UserModule
  ],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository, JwtStrategy]
})
export class FriendModule {}

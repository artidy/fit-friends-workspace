import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModel, UserSchema } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository]
})
export class UserModule {}

import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { AvatarModel, AvatarSchema } from './avatar.model';
import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';
import { AvatarRepository } from './avatar.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AvatarModel.name, schema: AvatarSchema }
    ]),
  ],
  controllers: [AvatarController],
  providers: [AvatarService, AvatarRepository]
})
export class AvatarModule {}

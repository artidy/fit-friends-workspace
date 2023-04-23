import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';

import { AvatarsController } from './avatars.controller';
import { AvatarsService } from './avatars.service';

@Module({
  imports: [HttpModule],
  controllers: [AvatarsController],
  providers: [AvatarsService],
})
export class AvatarsModule {}

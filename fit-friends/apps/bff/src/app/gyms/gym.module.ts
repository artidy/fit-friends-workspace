import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';

import { GymController } from './gym.controller';
import { GymService } from './gym.service';

@Module({
  imports: [HttpModule],
  controllers: [GymController],
  providers: [GymService],
})
export class GymModule {}

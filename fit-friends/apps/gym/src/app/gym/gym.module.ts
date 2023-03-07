import { Module } from '@nestjs/common';

import { GymController } from './gym.controller';
import { GymRepository } from './gym.repository';
import { GymService } from './gym.service';

@Module({
  controllers: [GymController],
  providers: [GymRepository, GymService]
})
export class GymModule {}

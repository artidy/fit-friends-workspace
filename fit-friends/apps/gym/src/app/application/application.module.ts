import { Module } from '@nestjs/common';

import { ApplicationController } from './application.controller';
import { ApplicationRepository } from './application.repository';
import { ApplicationService } from './application.service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationRepository, ApplicationService]
})
export class ApplicationModule {}

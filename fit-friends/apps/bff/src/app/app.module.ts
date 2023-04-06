import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


import { ENV_FILE_PATH } from './const';
import { bffConfig } from '../config/bff.config';
import { validateEnvironments } from './env.validation';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [bffConfig],
      validate: validateEnvironments,
    }),
    UsersModule,
  ]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ASSETS_DIRECTORY, getMongoDbOptions, mongodbConfig } from '@fit-friends/core';
import { ServeStaticModule } from '@nestjs/serve-static';

import { validateEnvironments } from './env.validation';
import { getFullPathDirectory } from './helpers';
import { AvatarModule } from './avatar/avatar.module';
import { ENV_FILE_PATH } from './app.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [ mongodbConfig ],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(
      getMongoDbOptions()
    ),
    ServeStaticModule.forRoot({
      rootPath: getFullPathDirectory(''),
      serveRoot: `/${ASSETS_DIRECTORY}/`,
      exclude: ['/api*'],
    }),
    AvatarModule,
  ]
})
export class AppModule {}

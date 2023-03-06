import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString, MONGO_CONFIG_TOKEN, MongoOptionFields } from '@fit-friends/core';

export function getMongoDbOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      uri: getMongoConnectionString({
        username: configService.get<string>(`${MONGO_CONFIG_TOKEN}.${MongoOptionFields.User}`),
        password: configService.get<string>(`${MONGO_CONFIG_TOKEN}.${MongoOptionFields.Password}`),
        host: configService.get<string>(`${MONGO_CONFIG_TOKEN}.${MongoOptionFields.Host}`),
        port: configService.get<number>(`${MONGO_CONFIG_TOKEN}.${MongoOptionFields.Port}`),
        authDatabase: configService.get<string>(`${MONGO_CONFIG_TOKEN}.${MongoOptionFields.AuthBase}`),
        databaseName: configService.get<string>(`${MONGO_CONFIG_TOKEN}.${MongoOptionFields.Name}`),
      })
    }),
    inject: [ConfigService]
  }
}

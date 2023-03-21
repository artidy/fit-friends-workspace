import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { isObject } from 'class-validator';
import { MongoConnection } from '@fit-friends/core';

function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}: MongoConnection): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

function fillEntity<D, T>(dto: D, entity: T): void {
  if (!isObject(dto)) return;
  if (!isObject(entity)) return;

  const keys = Object.keys(dto);

  keys.forEach((field) => {
    const key: keyof object = field as keyof object;

    entity[key] = dto[key];
  });
}

function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

function getRabbitmqConfig(configService: ConfigService): RmqOptions {
  const user = configService.get<string>('rmq.user');
  const password = configService.get<string>('rmq.password');
  const host = configService.get<string>('rmq.host');
  const queue = configService.get<string>('rmq.queue');
  const url = `amqp://${user}:${password}@${host}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue,
      persistent: true,
      noAck: true,
      queueOptions: {
        durable: true,
      }
    }
  }
}

export {
  getMongoConnectionString,
  fillEntity,
  fillObject,
  getRabbitmqConfig,
}

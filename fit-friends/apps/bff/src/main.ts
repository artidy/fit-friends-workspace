/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DEFAULT_PORT, GLOBAL_PREFIX, HttpExceptionFilter } from '@fit-friends/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('The users service')
    .setDescription('Users service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const port = process.env.PORT || DEFAULT_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();

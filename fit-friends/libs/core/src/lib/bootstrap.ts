import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { BootstrapFunction, DEFAULT_PORT, GLOBAL_PREFIX, HttpExceptionFilter } from '@fit-friends/core';

export async function bootstrap(module, serviceName: string, ...cbs: BootstrapFunction[]) {
  const app = await NestFactory.create(module);
  const port = process.env.PORT || DEFAULT_PORT;

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(`The ${serviceName} service`)
    .setDescription(`${serviceName} service API`)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  for (const cb of cbs) {
    cb(app);
  }

  await app.listen(port);

  Logger.log(
    `🚀 Application ${serviceName} is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ExceptionLoggerFilter } from './utils/exception-logger.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new ExceptionLoggerFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe( { skipMissingProperties: true }));
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Wanango Shop API')
    .setDescription('The Shopping API description')
    .setVersion('1.0')
    .addTag('shopping')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3003);
}
bootstrap();

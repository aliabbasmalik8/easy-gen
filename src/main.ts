import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'], // Allowed origins
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
      allowedHeaders: 'Content-Type,Authorization', // Allowed headers
      credentials: true, // Enable cookies to be sent across origins
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
}
bootstrap();

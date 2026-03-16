import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Better CORS configuration for local development
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // Automatically transform payloads to DTO instances
    })
  );

  // Serve static files (like images) from an 'uploads' folder
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3001);
  console.log(`Application is running on: ${await app.url()}`);
}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions,
  SwaggerCustomOptions
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  /**
   * Swagger
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('Task management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    deepScanRoutes: true
  };

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerDocumentOptions
  );

  const swaggerSetupOptions: SwaggerCustomOptions = {
    explorer: true,
    swaggerOptions: {
      docExpansion: false,
      deepLinking: true
    }
  };
  SwaggerModule.setup('docs', app, document, swaggerSetupOptions);

  await app.listen(3000);
}
bootstrap();

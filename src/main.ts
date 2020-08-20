import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions,
  SwaggerCustomOptions
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());

    /**
   * Swagger
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Task documentation API')
    .setDescription('Task API description')
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

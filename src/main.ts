import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VercelRequest, VercelResponse } from '@vercel/node';  // Import these for serverless handler

async function createApp() {
  const app = await NestFactory.create(AppModule);
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  app.enableCors({
    origin: frontendUrl,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;

  const config = new DocumentBuilder()
    .setTitle('Charity app backend')
    .setDescription('This is the backend APIs for charity app which handles donations and other foundation things')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);

  return app;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  const app = await createApp();  // Initialize the NestJS app
  await app.init();
  return app.getHttpAdapter().getInstance()(req, res);  // Pass the request to the NestJS app
};

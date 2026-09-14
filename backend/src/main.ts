import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global Route Prefix (/api)
  app.setGlobalPrefix('api');

  // Cookie Parser Middleware
  app.use(cookieParser());

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global Exception Filter for standardized errors
  app.useGlobalFilters(new HttpExceptionFilter());

  // CORS Configuration
  const rawFrontendUrl = configService.get<string>('FRONTEND_URL', 'http://localhost:3000');
  const configuredOrigins = rawFrontendUrl
    .split(',')
    .map((url) => url.trim().replace(/\/+$/, ''))
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, server-to-server, curl, Postman)
      if (!origin) {
        return callback(null, true);
      }

      const cleanOrigin = origin.replace(/\/+$/, '');

      // Check if origin matches configured frontend URL(s) or standard local development URLs
      const isConfigured =
        configuredOrigins.includes(cleanOrigin) ||
        cleanOrigin === 'http://localhost:3000' ||
        cleanOrigin === 'http://127.0.0.1:3000' ||
        cleanOrigin === 'http://localhost:4000';

      // Allow any Vercel deployment (production, preview branch, or project deployment)
      const isVercel = /^https:\/\/[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.vercel\.app$/.test(cleanOrigin);

      // Allow Render domain
      const isRender = cleanOrigin.endsWith('.onrender.com');

      if (isConfigured || isVercel || isRender) {
        return callback(null, true);
      }

      logger.warn(`⚠️ CORS blocked request from unauthorized origin: ${origin}`);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
      'Cookie',
      'Set-Cookie',
    ],
    exposedHeaders: ['Set-Cookie'],
  });

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : configService.get<number>('PORT', 4000);
  await app.listen(port, '0.0.0.0');
  logger.log(`🚀 AnyBuy Backend Server running on port ${port} (/api)`);
  logger.log(`🔒 CORS origins configured: ${configuredOrigins.join(', ')} + *.vercel.app`);
}

bootstrap();

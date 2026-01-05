import { config } from 'dotenv';
config(); // Load .env file before anything else

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT ?? 3000;

  try {
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${port} is already in use.`);
      console.error(`💡 To fix this, run one of the following:`);
      console.error(`   1. Stop the existing process: taskkill /F /PID <process_id>`);
      console.error(`   2. Use a different port: PORT=3001 npm run start:dev`);
      console.error(`   3. Find and kill the process: netstat -ano | findstr :${port}`);
      process.exit(1);
    }
    throw error;
  }
}
void bootstrap();

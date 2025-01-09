import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envVarsConfig } from './common/config/envs/env.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  const envVars = envVarsConfig.app;
  await app.listen(envVars.port);
}
bootstrap();

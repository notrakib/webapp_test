import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cors from 'cors';
import { GlobalExceptionFilter } from './common/exceptions/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ミドルウェアの設定
  app.use(helmet());
  app.use(cors());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );
    
  await app.listen(3001);
  console.log('Example app listening on port 3001!');
}
bootstrap();

/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // אפשור CORS

  // הוספת צינור ולידציה גלובלי
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // מסיר שדות שאינם מוגדרים ב-DTO
      forbidNonWhitelisted: true, // מחזיר שגיאה אם נשלחו שדות שאינם מוגדרים
      transform: true, // המרה אוטומטית לטיפוס המבוקש
    }),
  );

  await app.listen(3000);
}
bootstrap();

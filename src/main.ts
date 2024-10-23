import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';  //
import { ClassSerializerInterceptor } from '@nestjs/common'; //
import { Reflector } from '@nestjs/core';  // Импортируем Reflector

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  // Добавляем глобальную валидацию для DTO через ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // Подключаем глобальный интерсептор для работы с class-transformer
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
}
bootstrap();

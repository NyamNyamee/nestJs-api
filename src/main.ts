import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 유효성검증 파이프
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // // 유효성검증 어노테이션이 안붙은 프로퍼티만 제외해버림
      forbidNonWhitelisted: true, // 유효성검증 어노테이션이 안붙은 프로퍼티가 있으면 400에러 던짐
      transform: true, // 요청받은 파라미터를 컨트롤러에 적은 파라미터 타입으로 변환해줌
    }),
  );
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Email Guesser API')
    .setDescription('An email guesser API created with Nest and TypeScript')
    .setVersion('1.0')
    .addTag('email-guesser')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  const PORT = process.env.API_PORT || 5000;
  await app.listen(PORT);
}
bootstrap();

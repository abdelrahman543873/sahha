import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AxiosExceptionFilter } from '../shared/exception-filters/axios-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().setTitle('🚀sahha').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);
  app.useGlobalFilters(new AxiosExceptionFilter());
  await app.listen(3000);
}
bootstrap();

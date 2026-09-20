import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';

const PORT = process.env.PORT || 3003;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    exposedHeaders: ['X-Total-Count', 'Custom-Header'],
  });

  await app.listen(PORT);
}

bootstrap()
  .then(() => {
    console.info('Inventory service is running on Port::' + PORT);
  })
  .catch((error) => {
    console.error('Error during inventory-service bootstrap:', error);
    process.exit(1);
  });
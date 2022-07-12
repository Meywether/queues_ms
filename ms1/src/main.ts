import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices/';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  const microserviceOptions: MicroserviceOptions = {
    // @ts-ignore
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
      password: 'asdf',
    },
  };
  app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservices();
  console.log(' Microservice is listening ....');
}

bootstrap();

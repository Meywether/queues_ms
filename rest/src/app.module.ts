import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  Transport,
  ClientProxyFactory,
  ClientOptions,
} from '@nestjs/microservices';
import { Client } from '@nestjs/microservices/external/nats-client.interface';
import { RedisOptions } from 'ioredis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioConsumer } from './audio.consumer';
import { AudioProducer } from './audio.producers';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        password: 'asdf',
      },
    }),
    BullModule.registerQueue({
      name: 'audio',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'SETTINGS_MICROSERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: 'localhost:6379',
            password: 'asdf',
          },
        });
      },
    },
    AudioProducer,
    AudioConsumer,
  ],
})
export class AppModule {}

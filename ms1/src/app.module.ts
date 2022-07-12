import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioConsumer } from './audio.consumer';
import { AudioProducer } from './audio.producers';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        password: 'asdf',
      },
    }),
    BullModule.registerQueue({
      name: 'audio_ms',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AudioProducer, AudioConsumer],
})
export class AppModule {}

import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';
import { AudioProducer } from './audio.producers';

@Injectable()
export class AppService {
  constructor(
    @Inject('SETTINGS_MICROSERVICE')
    private settingsClient: ClientProxy,
    private readonly audioProducer: AudioProducer,
  ) {}

  async runMS() {
    return await lastValueFrom(
      this.settingsClient.send<any, string>('runms', '').pipe(timeout(2000)),
    );
  }

  runRest() {
    return this.audioProducer.addJob();
  }
}

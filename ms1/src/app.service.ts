import { Injectable } from '@nestjs/common';
import { AudioProducer } from './audio.producers';

@Injectable()
export class AppService {
  constructor(private readonly audioProducer: AudioProducer) {}
  getHello() {
    return this.audioProducer.addJob();
    return 'Hello World! from ms 1';
  }
}

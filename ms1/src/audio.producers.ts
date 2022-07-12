import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AudioProducer {
  constructor(@InjectQueue('audio_ms') private audioQueue: Queue) {}

  public async addJob() {
    const job = await this.audioQueue.add({
      foo: 'bar',
    });
    return job;
  }
}

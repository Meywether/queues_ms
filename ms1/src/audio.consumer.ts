import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}...`);
  }

  @Process()
  async transcode(job: Job<unknown>) {
    await new Promise((r) => setTimeout(r, 5000));
  }
}

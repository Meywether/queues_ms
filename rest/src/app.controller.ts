import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  runJob() {
    return this.appService.runRest();
  }

  @Get('runms')
  runJobMS() {
    return this.appService.runMS();
  }
}

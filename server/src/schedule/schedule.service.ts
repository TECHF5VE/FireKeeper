import { Injectable, Logger } from '@nestjs/common';
import { Interval, NestSchedule } from 'nest-schedule';

@Injectable()
export class ScheduleService extends NestSchedule {
  @Interval(2000)
  intervalJob() {
    Logger.log('executing interval job');
    // if you want to cancel the job, you should return true;
    return true;
  }
}

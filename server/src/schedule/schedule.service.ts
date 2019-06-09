import { Injectable, Logger } from '@nestjs/common';
import { Interval, NestSchedule } from 'nest-schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../news/news.entity';

@Injectable()
export class ScheduleService extends NestSchedule {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
  ) {
    super();
  }

  @Interval(60000)
  async intervalJob() {
    Logger.log('executing interval job');
    // if you want to cancel the job, you should return true;
    const list = await this.newsRepository.find();
    list.forEach(item => (item.weight -= 0.02));
    this.newsRepository.save(list);
  }
}

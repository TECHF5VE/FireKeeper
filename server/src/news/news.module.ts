import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './news.entity';
import { Keys } from '../keys/keys.entity';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { EventsModule } from '../events/events.module';
import { ScheduleModule } from 'nest-schedule';
import { ScheduleService } from '../schedule/schedule.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([News, Keys]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    EventsModule,
    ScheduleModule.register(),
  ],
  providers: [NewsService, ScheduleService],
  controllers: [NewsController],
})
export class NewsModule {}

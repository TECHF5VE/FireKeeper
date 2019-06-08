import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './news.entity';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([News]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}

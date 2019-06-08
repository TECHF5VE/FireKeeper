import { Controller, Put, Body } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { Resp, success } from '../types/resp';
import { News } from './news.entity';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Put()
  async createNews(@Body() newsDto: CreateNewsDto): Promise<Resp<News>> {
    const res = await this.newsService.createNews(newsDto);
    if (res) {
      return await success(res);
    } else {
      return await fail('create fail');
    }
  }
}

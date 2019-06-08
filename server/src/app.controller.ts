import { Controller, Put, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { News } from './news/news.entity';
import { Resp, success } from './types/resp';
import { CreateNewsDto } from './news/dto/create-news.dto';

@Controller('news')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put()
  async createNews(@Body() newsDto: CreateNewsDto): Promise<Resp<News>> {
    const res = await this.appService.createNews(newsDto);
    if (res) {
      return await success(res);
    } else {
      return await fail('create fail');
    }
  }
}

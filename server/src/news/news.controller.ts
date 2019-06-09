import {
  Controller,
  Put,
  Body,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { Resp, success } from '../types/resp';
import { News } from './news.entity';
import { EventsGateway } from '../events/events.gateway';
import moment = require('moment');

@UseInterceptors(ClassSerializerInterceptor)
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Put()
  async createNews(@Body() newsDto: CreateNewsDto): Promise<Resp<News>> {
    const res = await this.newsService.createNews(newsDto);
    if (res) {
      res.createdAtFormat = moment(res.createdAt).format('YYYY-MM-DD HH:mm:ss');
      res.dismissAtFormat = moment(res.dismissAt).format('YYYY-MM-DD HH:mm:ss');
      return await success(res);
    } else {
      return await fail('create fail');
    }
  }

  @Get('list')
  async showNews(): Promise<Resp<News[]>> {
    const res = await this.newsService.listNews();
    if (res) {
      res.forEach(item => {
        item.createdAtFormat = moment(item.createdAt).format(
          'YYYY-MM-DD HH:mm:ss',
        );
        item.dismissAtFormat = moment(item.dismissAt).format(
          'YYYY-MM-DD HH:mm:ss',
        );
      });
      return await success(res);
    } else {
      return await fail('list fail');
    }
  }

  @Get('like/:id')
  async likeNews(@Param('id') id: string | number): Promise<Resp<News>> {
    const res = await this.newsService.likeNews(id);
    if (res) {
      res.createdAtFormat = moment(res.createdAt).format('YYYY-MM-DD HH:mm:ss');
      res.dismissAtFormat = moment(res.dismissAt).format('YYYY-MM-DD HH:mm:ss');
      return await success(res);
    } else {
      return await fail('like fail');
    }
  }

  @Get('dislike/:id')
  async disLikeNews(@Param('id') id: string | number): Promise<Resp<News>> {
    const res = await this.newsService.disLikeNews(id);
    if (res) {
      res.createdAtFormat = moment(res.createdAt).format('YYYY-MM-DD HH:mm:ss');
      res.dismissAtFormat = moment(res.dismissAt).format('YYYY-MM-DD HH:mm:ss');
      return await success(res);
    } else {
      return await fail('dislike fail');
    }
  }
}

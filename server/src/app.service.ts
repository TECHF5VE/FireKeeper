import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './news/dto/create-news.dto';
import { News } from './news/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
  ) {}

  async createNews(dto: CreateNewsDto): Promise<News> {
    const news = await this.newsRepository.create(dto);
    const now = new Date();
    news.createdAt = now;
    news.dismissAt = new Date(now.getTime() + 5 * 60 * 1000);
    news.keywords = '';
    news.sentiment = '';
    news.weight = 1;
    return await this.newsRepository.save(news);
  }
}

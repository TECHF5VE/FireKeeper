import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async createNews(dto: CreateNewsDto): Promise<News> {
    const news = await this.newsRepository.create(dto);
    const now = new Date();
    news.createdAt = now;
    news.dismissedAt = new Date(now.getTime() + 5 * 60 * 1000);
    news.keywords = '';
    news.sentiment = '';
    news.weight = 1;
    return await this.newsRepository.save(news);
  }
}

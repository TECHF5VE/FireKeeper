import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly httpService: HttpService,
  ) {}

  async createNews(dto: CreateNewsDto): Promise<News> {
    const news = await this.newsRepository.create(dto);
    const now = new Date();
    news.createdAt = now;
    news.dismissAt = new Date(now.getTime() + 5 * 60 * 1000);
    news.keywords = '';
    news.sentiment = '';
    news.weight = 1;
    // TODO:
    return await this.newsRepository.save(news);
  }

  async listNews(): Promise<News[]> {
    return await this.newsRepository.find({
      order: {
        weight: 'DESC',
      },
    });
  }
}

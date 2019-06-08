import { Injectable, HttpService, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { genReqHeader, KE_API, SA_API } from '../utils/constant';
import { isArray } from 'util';

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
    news.weight = 1;
    news.keywords = '';
    news.sentiment = '';
    const keRes = await this.httpService
      .post(
        KE_API,
        { text: news.content },
        {
          headers: genReqHeader(),
          transformRequest: data => {
            let ret = '';
            // tslint:disable-next-line: forin
            for (const i in data) {
              ret +=
                encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
            }
            return ret;
          },
        },
      )
      .toPromise()
      .then(res => res.data);
    const saRes = await this.httpService
      .post(
        SA_API,
        { text: news.content },
        {
          headers: genReqHeader(),
          transformRequest: data => {
            let ret = '';
            // tslint:disable-next-line: forin
            for (const i in data) {
              ret +=
                encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
            }
            return ret;
          },
        },
      )
      .toPromise()
      .then(res => res.data);
    Logger.log(keRes);
    Logger.log(saRes);
    if (keRes.data && keRes.data.ke) {
      let ke = keRes.data.ke;
      if (isArray(ke)) {
        ke = ke.slice(0, 5);
        news.keywords = ke.map(item => item.word).join(',');
      }
    }
    if (saRes.data && saRes.data.sa) {
      const sa = saRes.data.sa;
      news.sentiment = sa[0].sentiment;
    }
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

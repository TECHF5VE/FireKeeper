import { Injectable, HttpService, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { News } from './news.entity';
import { Keys } from '../keys/keys.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { genReqHeader, KE_API, SA_API } from '../utils/constant';
import { isArray } from 'util';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(Keys)
    private readonly keysRepository: Repository<Keys>,
    private readonly httpService: HttpService,
  ) {}

  async createNews(dto: CreateNewsDto): Promise<News> {
    const news = await this.newsRepository.create(dto);
    const now = new Date();
    news.createdAt = now;
    news.dismissAt = new Date(now.getTime() + 2 * 60 * 1000);
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
        ke = ke.slice(0, 8) as Array<{ word: string }>;
        news.keywords = ke.map(item => item.word).join(',');
        const keys = ke.map(item => {
          return this.keysRepository.create({
            name: item.word,
            content: news.content,
            createdAt: now,
          });
        });
        this.keysRepository.save(keys);
      }
    }
    if (saRes.data && saRes.data.sa) {
      const sa = saRes.data.sa;
      news.sentiment = sa[0].sentiment;
    }
    this.updateNews();
    return await this.newsRepository.save(news);
  }

  async likeNews(id: number | string): Promise<News> {
    const news = await this.newsRepository.findOneOrFail(id);
    news.star += 1;
    news.weight += 0.1;
    news.dismissAt = new Date(news.dismissAt.getTime() + 30 * 1000);
    return await this.newsRepository.save(news);
  }

  async disLikeNews(id: number | string): Promise<News> {
    const news = await this.newsRepository.findOneOrFail(id);
    news.star -= 1;
    news.weight -= 0.1;
    news.dismissAt = new Date(news.dismissAt.getTime() - 30 * 1000);
    return await this.newsRepository.save(news);
  }

  async updateNews(): Promise<void> {
    const now = new Date();
    const latestHour = new Date(now.getTime() - 20 * 60 * 1000);
    const news = await this.newsRepository.find({
      where: {
        dismissAt: MoreThanOrEqual(latestHour),
      },
    });
    const latestKeys = await this.keysRepository.findAndCount({
      where: {
        createdAt: MoreThanOrEqual(latestHour),
      },
    });
    // 计算词的出现频率
    const map: Map<string, number> = new Map();
    for (let i = 0, len = latestKeys[0].length; i < len; i++) {
      const item = latestKeys[0][i];
      if (map[item.name]) {
        map[item.name] += 1;
      } else {
        map[item.name] = 1;
      }
    }
    const weights = [];
    // tslint:disable-next-line: forin
    for (const k in map.keys()) {
      const value = map[k];
      // 每个词的词频
      weights.push({ weight: value / latestKeys[1], name: k });
    }

    // 批量更新 News 权重和消失时间
    news.forEach(v => {
      weights.forEach(v2 => {
        if (v.keywords.includes(v2.name)) {
          v.weight += v2.weight * 0.2;
        }
      });
    });

    this.newsRepository.save(news);
  }

  // findTopF5veKeys(
  //   kvPairs: Keys[],
  //   weights: Array<{ name: string; weight: number }>,
  //   topK: number,
  // ) {
  //   weights.sort((a, b) => b.weight - a.weight);
  //   const slicedNames = weights.slice(0, topK).map(item => item.name);

  //   const arrOfArr = [];
  //   kvPairs.forEach((v, index) => {
  //     arrOfArr[index] = [];
  //     if (slicedNames.includes(v.name)) {
  //       arrOfArr[index].push(v.content);
  //     }
  //   });

  //   const result = arrOfArr.reduce((pre: string[], next: string[]) => {
  //     return pre.filter(v => next.includes(v));
  //   });

  //   return result;
  // }

  async listNews(): Promise<News[]> {
    const now = new Date();
    const latestHour = new Date(now.getTime() - 20 * 60 * 1000);
    return await this.newsRepository.find({
      where: {
        dismissAt: MoreThanOrEqual(latestHour),
      },
      order: {
        weight: 'DESC',
      },
    });
  }
}

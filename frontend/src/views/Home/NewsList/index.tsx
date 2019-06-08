import * as React from 'react';
import * as style from "./style.scss";
import NewsItem from 'src/Components/NewsItem';

export default function NewsList() {
  return (
    <div className={style.newsList}>
      <div className={style.newsListContent}>
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </div>
    </div>
  )
}
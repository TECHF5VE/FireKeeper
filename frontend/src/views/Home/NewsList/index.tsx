import * as React from 'react';
import * as style from "./style.scss";
import NewsItem from 'src/Components/NewsItem';
import classnames from 'classnames';
import { FireDataContext } from 'src/context/fire';

export default function NewsList({ setToCenter }: { setToCenter: (position: string) => void }) {
  const fire = React.useContext(FireDataContext)
  return (
    <div className={classnames(style.newsList, { [style.close]: fire && !fire.data.listOpen })}>
      <div className={style.newsListContent}>
        {fire && fire.data.fires.map((v) => (
          <NewsItem fire={v} key={v.id} setToCenter={setToCenter} />
        ))}
      </div>
    </div>
  )
}
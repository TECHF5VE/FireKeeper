import * as React from 'react';
import { Icon } from 'antd';
import * as style from "./style.scss";

export default function LoadingPage() {
  return (
    <div className={style.loadingPage}>
      <Icon type="compass" style={{ fontSize: 45 }} theme="twoTone" spin={true} twoToneColor="#f01414" />
      <div className={style.title}>
        FireKeeper Loading
      </div>
      <div className={style.subtitle}>
        首次加载较慢，请耐心等待
      </div>
    </div >
  )
}
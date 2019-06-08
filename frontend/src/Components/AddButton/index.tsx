import * as React from 'react';
import * as style from "./style.scss";
import { Button } from 'antd';

export default function AddButton() {
  return (<div className={style.addButton}>
    <Button type="primary" shape="circle" icon="fire" size="large" />
  </div>)
}
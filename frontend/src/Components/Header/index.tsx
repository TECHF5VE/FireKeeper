import * as React from 'react';
import * as style from "./style.scss";

export default function Header() {
  return (
    <div className={style.headerBar}>
      <span className={style.fire}>Fire</span>Keeper
    </div>
  )
}
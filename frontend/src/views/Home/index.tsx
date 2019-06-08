import * as React from 'react';
import * as style from "./style.scss";
import bg from "./bg.svg"
import Header from 'src/Components/Header';
import AddButton from 'src/Components/AddButton';
import NewsList from './NewsList';

export default function Home() {
  return (
    <div className={style.homePage} style={{ backgroundImage: `url(${bg})` }}>
      <Header />
      <NewsList />
      <AddButton />
    </div>
  )
}
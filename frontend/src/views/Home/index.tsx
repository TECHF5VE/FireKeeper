import * as React from 'react';
import * as style from "./style.scss";
import bg from "./bg.svg"
import NewsList from './NewsList';
import { Switch, Route } from 'react-router';
import NewsMap from './NewsMap';
import Header from 'src/Components/Header';
import AddButton from 'src/Components/AddButton';

export default function Home() {
  return (
    <div className={style.homePage} style={{ backgroundImage: `url(${bg})` }}>
      <Header />
      <Switch>
        <Route path="/list" component={NewsList} />
        <Route component={NewsMap} />
      </Switch>
      <AddButton />
    </div>
  )
}
import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import './base.scss';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import IEWarning from './IEWarning';
import Home from './Home';

export default function App() {
  return (
    <LocaleProvider locale={zh_CN}>
      <BrowserRouter>
        <div>
          <IEWarning />
          <Switch>
            <Route component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </LocaleProvider>
  )
}
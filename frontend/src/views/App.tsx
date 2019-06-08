import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import './base.scss';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import IEWarning from './IEWarning';
import Home from './Home';
import FireProvider from './FireProvider';

export default function App() {
  return (
    <LocaleProvider locale={zh_CN}>
      <BrowserRouter>
        <FireProvider>
          <IEWarning />
          <Switch>
            <Route component={Home} />
          </Switch>
        </FireProvider>
      </BrowserRouter>
    </LocaleProvider>
  )
}
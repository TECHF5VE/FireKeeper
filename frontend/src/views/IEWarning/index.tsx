import { Alert } from 'antd';
import * as React from 'react';

function BrowserType() {
  const { userAgent } = navigator;
  const isOpera = userAgent.indexOf('Opera') > -1;
  const isIE = 'ActiveXObject' in window;
  const isEdge = userAgent.indexOf('Edge') > -1;
  const isFF = userAgent.indexOf('Firefox') > -1;
  const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1;
  const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 && !isEdge;
  return { isOpera, isIE, isEdge, isFF, isSafari, isChrome };
}

export default React.memo(function IEWarning() {
  const browserType = BrowserType();
  return browserType.isIE ? (
    <Alert
      banner={true}
      message={<div>使用IE浏览器浏览本页面会导致网站几乎所有功能瘫痪,请务必升级至<a href="//www.google.cn/chrome/">现代浏览器</a>再来访问本页面</div>}
    />
  ) : <></>;
}, () => true);
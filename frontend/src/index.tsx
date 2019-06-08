import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './views/App';
import LoadingPage from './views/LoadingPage';

ReactDOM.render(
  <React.Suspense fallback={<LoadingPage />}><App /></React.Suspense>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-virtualized/styles.css'
import 'antd/dist/antd.css'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();

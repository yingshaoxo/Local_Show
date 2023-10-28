import React from 'react'
import ReactDOM from 'react-dom/client'

import * as e6p from "es6-promise";
(e6p as any).polyfill();
import 'isomorphic-fetch';

import App from './App'

import './App.less'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

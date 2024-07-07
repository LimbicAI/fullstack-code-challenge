import React from 'react';
import ReactDOM from 'react-dom/client';

import login from './helpers/login'
import global from './global';
import './assets/css/index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';

if(!login.isLoggedIn() && window.location.pathname !== '/login') {
  global.redirectTo('/login');
}

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

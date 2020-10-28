import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './routing/AppRouter';
import GlobalProvider from './context/GlobalProvider';

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <AppRouter />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

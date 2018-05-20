import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { normalize } from 'polished';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import theme from './theme';
import App from './layouts/App';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

/* eslint-disable no-unused-expressions*/
injectGlobal`@import url('//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700');`;
injectGlobal`${normalize()}`;
injectGlobal`
  html {
    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  html * {
    box-sizing:border-box;
  }
  a {
    text-decoration: none;
  }

  ul {
    margin: 0;
    list-style: none;
  }
`;

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ThemeProvider theme={theme}><App /></ThemeProvider>
  </Router>,
  document.getElementById('root')
);

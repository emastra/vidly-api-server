import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.min.css';
import './css/style.css'

import App from './App';

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

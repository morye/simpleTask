require('../scss/main.scss');

import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render } from 'react-dom';

import todo from './stores/stores';
import App from './containers/app.jsx';

const store = createStore(todo)

render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));
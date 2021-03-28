import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './routers';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './store/reducers';
import ErrorBoundary from './components/errorBoundary';
import './style/index.less';

const store = createStore(reducers, applyMiddleware(thunk));

//const unsubscribe = store.subscribe(() => console.log('store: ', store.getState()));

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <Routers />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
);

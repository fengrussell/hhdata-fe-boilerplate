import React from 'react';
import {render} from 'react-dom';
import App from './App';
import common from 'svc2Src/util/js/common';
import { Provider } from 'react-redux';
import { createStore, compose ,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducers';
import DevTools from 'svc2Src/util/js/DevTools'

import 'svc2Src/util/css/index.scss';

// 把多个 store 增强器从右到左来组合起来，依次执行
// 这个地方完全可以不用compose，演示一下compose的使用
const enhancer = compose(
  DevTools.instrument()
);

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

let store;
if (__DEBUG__) {
  // store = applyMiddleware(thunk)(createStore(reducer,enhancer));
  store = createStoreWithMiddleware(reducer,enhancer)
}else {
  store = createStoreWithMiddleware(reducer);
}

render(
  <div>
    <Provider store={store}>
      <div>
        <App />
        <DevTools />
      </div>
    </Provider>
  </div>
  ,
  document.getElementById('app')
);

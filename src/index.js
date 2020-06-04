import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";

import saga from './sagas';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import {combineReducers} from 'redux';
import {reducer as login} from './login/redux/loginReducer';
import {reducer as products} from './order/redux/productsReducer';
import {reducer as order} from './order/redux/orderReducer';

let cr =  combineReducers({
  login,
  products,
  order
});

const sagaMiddleware = createSagaMiddleware();

//for redux plugin
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(cr, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(saga);


ReactDOM.render(
  <Provider store={store}>
    <App/>,
  </Provider>,
  document.getElementById('root')
);



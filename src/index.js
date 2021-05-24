import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";




import saga from './sagas';

import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {combineReducers} from 'redux';
import {reducer as login} from './login/redux/loginReducer';
import {reducer as products} from './order/redux/productsReducer';
import {reducer as order} from './order/redux/orderReducer';
import {reducer as admin} from './admin/redux/adminReducer';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import LoadingView from "./misc/LoadingView";
import { PersistGate } from 'redux-persist/lib/integration/react';
import {CACHE} from "./constants";

const sessionKey = 'wee3.0';
export const persistConfig = {
	key: sessionKey,
	storage,
	whitelist: ['login'],
};




let reducers = combineReducers({
	login,
	products,
	order,
	admin
});

const pReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

//for redux plugin
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(pReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
// const store = createStore(cr, composeEnhancers(applyMiddleware(sagaMiddleware)));
const persistor = persistStore(store);

if (window.location.search.includes('purgeCache')) {
	persistor.purge();
	window.location.replace(`${window.location.protocol}//${window.location.host}${window.location.pathname}`);
}

if (!CACHE) {
	persistor.purge();
}

sagaMiddleware.run(saga);

ReactDOM.render(
	<Provider store={store}>
	<PersistGate loading={<LoadingView />} persistor={persistor}>
		<Router>
			<App/>
		</Router>
	</PersistGate>
	</Provider>,
	document.getElementById('root')
);



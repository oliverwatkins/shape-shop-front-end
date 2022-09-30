import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";

import sagas from './sagas';

import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {combineReducers} from 'redux';
import {reducer as login} from './login/redux/loginReducer';
import {productsReducer as products} from './admin/redux/productsReducer';
import {reducer as order} from './admin/redux/orderReducer';
import {reducer as admin} from './admin/redux/adminReducer';
import {BrowserRouter as Router} from "react-router-dom";

import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {LoadingView} from "./misc/LoadingView";
import {CACHE} from "./constants";

const sessionKey = 'shapeshop1.0';
export const persistConfig = {
	key: sessionKey,
	storage,
	whitelist: ['login'],
};

let reducers = combineReducers({
	login: login,
	products: products,
	order: order,
	admin: admin
});

const pReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

//for redux plugin
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(pReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

const persistor = persistStore(store);

// if (window.location.search.includes('purgeCache')) {
// 	persistor.purge();
// 	window.location.replace(`${window.location.protocol}//${window.location.host}${window.location.pathname}`);
// }

if (!CACHE) {
	persistor.purge();
}

sagaMiddleware.run(sagas);

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



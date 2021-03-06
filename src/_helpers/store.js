import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import { createLogger } from "redux-logger";
import rootReducer from "../_reducers";

import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import config from '../firebase';


const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }), sagaMiddleware,loggerMiddleware),
    reduxFirestore(config),
    reactReduxFirebase(config, { useFirestoreForProfile: true, userProfile: 'users', enableLogging: false, attachAuthIsReady: true })
  )
);

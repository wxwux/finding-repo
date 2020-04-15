import rootReducer from "./reducer";
import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import createSaga from "redux-saga";
import rootSaga from "./saga";

const sagaMiddleware = createSaga();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

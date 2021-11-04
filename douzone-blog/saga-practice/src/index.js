import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import App, { authSaga } from "./App";
import { Provider } from "react-redux";
import { auth } from "./App";

import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(auth, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(authSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

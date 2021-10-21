import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider, } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "../node_modules/redux-devtools-extension/index";
import App from "./App";
import rootReducer from "./modules/index";
import { createStore } from 'redux';


const store =createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store ={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


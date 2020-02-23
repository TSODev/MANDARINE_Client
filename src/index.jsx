import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import genericReducer from './MainStore/reducers/reducer';
import authReducer from './MainStore/reducers/Auth';
import errorReducer from './MainStore/reducers/Error';
import userReducer from './MainStore/reducers/User';
import './index.css';
import App from './App';
import theme from './theme';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
    generic: genericReducer,
    auth: authReducer,
    error: errorReducer,
    user: userReducer,
});

// declare global {
//     interface Window {
//       __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
//   }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <App />
        </ConfirmProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
ReactDOM.render( app, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

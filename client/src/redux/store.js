import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const initialState = {};

let composeEnhancer;

if (process.env.NODE_ENV === 'development') {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancer = compose;
}

// //remove redux dev tools when in prodcution mode
// composeEnhancer = process.env.NODE_ENV !== 'development' && compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

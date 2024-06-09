import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; 
import productsReducer from './reducers/productsReducer';
import categoriesReducer from './reducers/categoriesReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  product: productReducer,
  cart: cartReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;

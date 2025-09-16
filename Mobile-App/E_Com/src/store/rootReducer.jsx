import { combineReducers } from "redux";
import homeReducer from '../modules/Home/api/slice'

// Placeholder reducers for cart and account (to be implemented)
const cartReducer = (state = { items: [], total: 0 }, action) => {
  return state;
};

const accountReducer = (state = { user: null, isLoggedIn: false }, action) => {
  return state;
};

export default combineReducers({
  home: homeReducer,
  cart: cartReducer,
  account: accountReducer
})
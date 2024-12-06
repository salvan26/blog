import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducers";

const defaultState =  {
  cash: 0
}

const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_CASH':
        return {...state, cash: state.cash + action.payload}
      default:
        return state
    }
}

const store = configureStore({reducer});

export default store;
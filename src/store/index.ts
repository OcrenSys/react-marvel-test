import { configureStore } from "@reduxjs/toolkit";
import appReducer from './reducers'
import { TMenuSelected } from "./states/menu.state";

const store = configureStore({
    reducer: appReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
  
  export type TAppState = {
    menuSelected: TMenuSelected;
};

export default store;

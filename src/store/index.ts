import { configureStore } from "@reduxjs/toolkit";
import { TMenuSelected } from "../types/menu";
import { TData } from "../types/Response";
import appReducer from './reducers'

const store = configureStore({
    reducer: appReducer,
    // devTools: process.env.NODE_ENV !== 'production',
  });
  
  export type TAppState = {
    menuSelected: TMenuSelected,
    characters: TData
};

export default store;

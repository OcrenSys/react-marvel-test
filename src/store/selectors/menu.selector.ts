import { createSelector } from "@reduxjs/toolkit";
import { TAppState } from "..";



const getMenuSelected = (state: TAppState) => state.menuSelected;

export const SELECT_MENU_SELECTED = createSelector(
    getMenuSelected, 
    (state) => state.menuSelected
);
import { createSelector } from "@reduxjs/toolkit";
import { TAppState } from "..";

const getFavorites = (state: TAppState) => state.favorites;

export const GET_FAVORITES_SELECTOR = createSelector(getFavorites, (state) => state);
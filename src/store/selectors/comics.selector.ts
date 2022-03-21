import { createSelector } from "@reduxjs/toolkit";
import { TAppState } from "..";

const getComics = (state: TAppState) => state.comics;

export const GET_COMICS_SELECTOR = createSelector(
  getComics,
  (state) => state
);

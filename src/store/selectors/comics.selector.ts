import { createSelector } from "@reduxjs/toolkit";
import { TAppState } from "..";

const getComics = (state: TAppState) => state.comics;
const getComicDetails = (state: TAppState) => state.comicDetails;

export const GET_COMICS_SELECTOR = createSelector(
  getComics,
  (state) => state
);

export const GET_COMICS_DETAILS_SELECTOR = createSelector(
  getComicDetails,
  (state) => state
);

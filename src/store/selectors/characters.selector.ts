import { createSelector } from "@reduxjs/toolkit";
import { TAppState } from "..";

const getCharacters = (state: TAppState) => state.characters;
const getCharacterDetails = (state: TAppState) => state.characterDetails;
const getCharacterComics = (state: TAppState) => state.characterComics;

export const GET_CHARACTERS_SELECTOR = createSelector(
  getCharacters,
  (state) => state
);
export const GET_CHARACTERS_DETAILS_SELECTOR = createSelector(
  getCharacterDetails,
  (state) => state
);
export const GET_CHARACTERS_COMICS_SELECTOR = createSelector(
  getCharacterComics,
  (state) => state
);

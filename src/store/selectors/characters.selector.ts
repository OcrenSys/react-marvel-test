import { createSelector } from "@reduxjs/toolkit";
import { TAppState } from "..";

const getCharacters = (state: TAppState) => state.characters;

export const GET_CHARACTERS_STATE = createSelector(
  getCharacters,
  (state) => state
);

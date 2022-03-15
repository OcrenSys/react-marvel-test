import { createSelector } from "@reduxjs/toolkit";
import { TAppState } from "..";

const getCharacters = (state: TAppState) => state.characters;

export const SELECT_GET_CHARACTERS = createSelector(
    getCharacters,
    (state) => state.results
);
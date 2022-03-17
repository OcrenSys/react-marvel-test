import { createReducer } from "@reduxjs/toolkit";
import { RETRIEVE_CHARACTERS } from "../actions/characters.action";
import CharactersInitialState from "../states/characters.state";

const charactersReducer = createReducer(CharactersInitialState, (builder) => {
  builder.addCase(RETRIEVE_CHARACTERS.pending, (state) => ({
    ...state,
    loading: true,
    error: false,
    results: [],
  }));
  builder.addCase(RETRIEVE_CHARACTERS.rejected, (state) => ({
    ...state,
    loading: false,
    error: true,
    results: [],
  }));
  builder.addCase(RETRIEVE_CHARACTERS.fulfilled, (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false,
    error: false,
  }));
});

export default charactersReducer;

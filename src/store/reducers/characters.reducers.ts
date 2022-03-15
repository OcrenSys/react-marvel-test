import { createReducer } from "@reduxjs/toolkit";
import { RETRIEVE_CHARACTERS } from "../actions/characters.action";
import CharactersInitialState from "../states/characters.state";

const charactersReducer = createReducer(CharactersInitialState, (builder) => {
  builder.addCase(RETRIEVE_CHARACTERS.pending, (state) => ({
    ...state,
    data: {
      loading: true,
      error: false,
      characters: {},
    },
  }));
  builder.addCase(RETRIEVE_CHARACTERS.rejected, (state) => ({
    ...state,
    data: {
      loading: false,
      error: true,
      characters: {},
    },
  }));
  builder.addCase(RETRIEVE_CHARACTERS.fulfilled, (state, { payload }) => ({
    ...state,
    data: {
      loading: true,
      error: false,
      characters: payload,
    },
  }));
});


export default charactersReducer

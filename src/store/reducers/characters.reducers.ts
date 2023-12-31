import { createReducer } from "@reduxjs/toolkit";
import { RETRIEVE_CHARACTERS, RETRIEVE_CHARACTER_COMICS, RETRIEVE_CHARACTER_DETAILS, RETRIEVE_CHARACTER_STORIES } from "../actions/characters.action";
import DataInitialState from "../states/data.state";

const charactersReducer = createReducer(DataInitialState, (builder) => {
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

export const characterDetailsReducer = createReducer(
  DataInitialState,
  (builder) => {
    builder.addCase(RETRIEVE_CHARACTER_DETAILS.pending, (state) => ({
      ...state,
      loading: true,
      error: false,
      results: [],
    }));
    builder.addCase(RETRIEVE_CHARACTER_DETAILS.rejected, (state) => ({
      ...state,
      loading: false,
      error: true,
      results: [],
    }));
    builder.addCase(RETRIEVE_CHARACTER_DETAILS.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
      loading: false,
      error: false,
    }));
  }
);

export const characterComicsReducer = createReducer(
  DataInitialState,
  (builder) => {
    builder.addCase(RETRIEVE_CHARACTER_COMICS.pending, (state) => ({
      ...state,
      loading: true,
      error: false,
      results: [],
    }));
    builder.addCase(RETRIEVE_CHARACTER_COMICS.rejected, (state) => ({
      ...state,
      loading: false,
      error: true,
      results: [],
    }));
    builder.addCase(RETRIEVE_CHARACTER_COMICS.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
      loading: false,
      error: false,
    }));
  }
);
export const characterStoriesReducer = createReducer(
  DataInitialState,
  (builder) => {
    builder.addCase(RETRIEVE_CHARACTER_STORIES.pending, (state) => ({
      ...state,
      loading: true,
      error: false,
      results: [],
    }));
    builder.addCase(RETRIEVE_CHARACTER_STORIES.rejected, (state) => ({
      ...state,
      loading: false,
      error: true,
      results: [],
    }));
    builder.addCase(RETRIEVE_CHARACTER_STORIES.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
      loading: false,
      error: false,
    }));
  }
);


export default charactersReducer;

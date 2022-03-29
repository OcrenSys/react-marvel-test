import { createReducer } from "@reduxjs/toolkit";
import { RETRIEVE_COMICS, RETRIEVE_COMIC_DETAILS } from "../actions/comic.actions";
import DataInitialState from "../states/data.state";

const comicsReducer = createReducer(DataInitialState, (builder) => {
  builder.addCase(RETRIEVE_COMICS.pending, (state) => ({
    ...state,
    loading: true,
    error: false,
    results: [],
  }));
  builder.addCase(RETRIEVE_COMICS.rejected, (state) => ({
    ...state,
    loading: false,
    error: true,
    results: [],
  }));
  builder.addCase(RETRIEVE_COMICS.fulfilled, (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false,
    error: false,
  }));
});

export const comicDetailsReducer = createReducer(DataInitialState, (builder) => {
  builder.addCase(RETRIEVE_COMIC_DETAILS.pending, (state) => ({
    ...state,
    loading: true,
    error: false,
    results: [],
  }));
  builder.addCase(RETRIEVE_COMIC_DETAILS.rejected, (state) => ({
    ...state,
    loading: false,
    error: true,
    results: [],
  }));
  builder.addCase(RETRIEVE_COMIC_DETAILS.fulfilled, (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false,
    error: false,
  }));
});

export default comicsReducer;

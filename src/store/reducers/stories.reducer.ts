import { createReducer } from "@reduxjs/toolkit";
import { RETRIEVE_STORIES, RETRIEVE_STORY_DETAILS } from "../actions/stories.actions";
import DataInitialState from "../states/data.state";

const storiesReducer = createReducer(DataInitialState, (builder) => {
  builder.addCase(RETRIEVE_STORIES.pending, (state) => ({
    ...state,
    loading: true,
    error: false,
    results: [],
  }));

  builder.addCase(RETRIEVE_STORIES.rejected, (state) => ({
    ...state,
    loading: true,
    error: true,
    results: [],
  }));

  builder.addCase(RETRIEVE_STORIES.fulfilled, (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false,
    error: false,
  }));
});

export const storyDetailsReducer = createReducer(DataInitialState, (builder) => {
  builder.addCase(RETRIEVE_STORY_DETAILS.pending, (state) => ({
    ...state,
    loading: true,
    error: false,
    results: [],
  }));

  builder.addCase(RETRIEVE_STORY_DETAILS.rejected, (state) => ({
    ...state,
    loading: true,
    error: true,
    results: [],
  }));

  builder.addCase(RETRIEVE_STORY_DETAILS.fulfilled, (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false,
    error: false,
  }));
});




export default storiesReducer;

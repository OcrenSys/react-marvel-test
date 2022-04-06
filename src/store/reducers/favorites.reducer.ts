import { createReducer } from "@reduxjs/toolkit";
import { GET_FAVORITES_ACTION, SET_FAVORITES_ACTION } from "../actions/favorite.action";
import { FavoritesIntialState } from "../states/favorites.state";

const favoriteReducer = createReducer(FavoritesIntialState, (builder) => {
  builder.addCase(GET_FAVORITES_ACTION, (state, { payload }) => ({
    ...state,
    list: payload.list || [],
  }));

  builder.addCase(SET_FAVORITES_ACTION, (state, { payload }) => ({
    ...state,
    list: payload.list || [],
  }));
});

export default favoriteReducer;

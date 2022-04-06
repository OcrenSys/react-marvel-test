import { createAction } from "@reduxjs/toolkit";
import TFavorites, { TFavorite } from "../../types/favorite";
import { getStoragedFavorites } from "../../utils/helpers";

export const GET_FAVORITES_ACTION = createAction(
  "FAVORITES/GET_FAVORITES_ACTION",
  ({ userId, type }: TFavorites) => {
    const favorites: TFavorite[] = getStoragedFavorites(userId, type);

    return {
      payload: {
        userId,
        type,
        list: favorites,
      },
    };
  }
);

export const SET_FAVORITES_ACTION = createAction(
  "FAVORITES/SET_FAVORITES_ACTION",
  ({ userId, type }: TFavorites, favorite: TFavorite) => {
    let favorites: TFavorite[] = getStoragedFavorites(userId, type);
    let exist: boolean = favorites.some(
      ({ id }: TFavorite) => id === favorite.id
    );

    if (exist)
      favorites = [
        ...favorites.filter(({ id }: TFavorite) => id !== favorite.id),
      ];
    else favorites = [...favorites, favorite];

    localStorage.setItem(`${userId}-${type}`, JSON.stringify(favorites));

    return {
      payload: {
        userId,
        type,
        list: favorites,
      },
    };
  }
);

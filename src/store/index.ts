import { configureStore } from "@reduxjs/toolkit";
import TCharacter from "../types/character";
import TComic from "../types/comic";
import TFavorites from "../types/favorite";
import { TData } from "../types";
import TStory from "../types/story";
import appReducer from './reducers'

const store = configureStore({
    reducer: appReducer,
    // devTools: process.env.NODE_ENV !== 'production',
  });
  
  export type TAppState = {
    /* CHARACTERS SECTION */
    characters: TData<TCharacter>,
    characterDetails: TData<TCharacter>,
    characterComics: TData<TComic>,
    characterStories: TData<TComic>,
    /* COMICS SECTION */
    comics: TData<TComic>,
    comicDetails: TData<TComic>,
    comicCharacters: TData<TComic>,
    /* STORIES SECTION */
    stories: TData<TStory>,
    storyDetails: TData<TStory>,
    storyCharacters: TData<TStory>,
    favorites: TFavorites
};

export default store;

import { configureStore } from "@reduxjs/toolkit";
import TCharacter from "../types/character";
import TComic from "../types/comic";
import { TData } from "../types/Response";
import TStory from "../types/stories";
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
    /* COMICS SECTION */
    comics: TData<TComic>,
    comicDetails: TData<TComic>,
    comicCharacters: TData<TComic>,
    /* STORIES SECTION */
    stories: TData<TStory>,
    storyDetails: TData<TStory>,
};

export default store;

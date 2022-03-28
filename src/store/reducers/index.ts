import { combineReducers } from "redux";
import charactersReducer, { characterComicsReducer, characterDetailsReducer } from "./characters.reducers";
import comicsReducer, { comicDetailsReducer } from "./comics.reducer";
import storiesReducer, { storyDetailsReducer } from "./stories.reducer";

export default combineReducers({
  /* CHARACTER SECTION */
  characters: charactersReducer,
  characterDetails: characterDetailsReducer,
  characterComics: characterComicsReducer,
  /* COMIC SECTION */
  comics: comicsReducer,
  comicDetails: comicDetailsReducer,
  /* STORIES SECTION */
  stories: storiesReducer,
  storyDetails: storyDetailsReducer,
});

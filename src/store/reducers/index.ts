import { combineReducers } from "redux";
import charactersReducer, {
  characterComicsReducer,
  characterDetailsReducer,
  characterStoriesReducer,
} from "./characters.reducers";
import comicsReducer, {
  comicCharactersReducer,
  comicDetailsReducer,
} from "./comics.reducer";
import storiesReducer, {
  storyCharactersReducer,
  storyDetailsReducer,
} from "./stories.reducer";

export default combineReducers({
  /* CHARACTER SECTION */
  characters: charactersReducer,
  characterDetails: characterDetailsReducer,
  characterComics: characterComicsReducer,
  characterStories: characterStoriesReducer,
  /* COMIC SECTION */
  comics: comicsReducer,
  comicDetails: comicDetailsReducer,
  comicCharacters: comicCharactersReducer,
  /* STORIES SECTION */
  stories: storiesReducer,
  storyDetails: storyDetailsReducer,
  storyCharacters: storyCharactersReducer,
});

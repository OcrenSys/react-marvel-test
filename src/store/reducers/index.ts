import { combineReducers } from 'redux';
import {characterComicsReducer, characterDetailsReducer, charactersReducer} from './characters.reducers';
import comicsReducer from './comics.reducer';
import menuReducer from './menu.reducer';

export default combineReducers({
    menu: menuReducer,
    characters: charactersReducer,
    characterDetails: characterDetailsReducer,
    characterComics: characterComicsReducer,
    comics: comicsReducer,
})
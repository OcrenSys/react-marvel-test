import { combineReducers } from 'redux';
import charactersReducer from './characters.reducers';
import comicsReducer from './comics.reducer';
import menuReducer from './menu.reducer';

export default combineReducers({
    menu: menuReducer,
    characters: charactersReducer,
    comics: comicsReducer,
})
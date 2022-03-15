import { combineReducers } from 'redux';
import { Characters } from '../../components/characters';
import charactersReducer from './characters.reducers';
import menuReducer from './menu.reducer';

export default combineReducers({
    menu: menuReducer,
    characters: charactersReducer,
})
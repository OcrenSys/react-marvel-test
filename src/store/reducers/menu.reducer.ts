import {createReducer} from "@reduxjs/toolkit";
import {MENU_SELECT_ACTION} from "../actions/menu.action";
import menuInitialState from "../states/menu.state";

const menuReducer = createReducer(menuInitialState, (builder) => {
    builder.addCase(MENU_SELECT_ACTION, (state, action) => ({
        ...state,
        menuSelected: action.payload
    }));
});

export default menuReducer;
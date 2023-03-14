import { createAction, createReducer } from "@reduxjs/toolkit";

export const setType = createAction("SET_TYPE");

const reducer = createReducer("", {
  [setType]: (state, action) => {
    return action.payload;
  },
});

export default reducer;

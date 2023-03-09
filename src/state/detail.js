import { createAction, createReducer } from "@reduxjs/toolkit";

export const setDetail = createAction("SET_DETAIL");

const reducer = createReducer(
  {},
  {
    [setDetail]: (state, action) => action.payload,
  }
);

export default reducer;
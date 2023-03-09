import { createAction, createReducer } from "@reduxjs/toolkit";

export const setCart = createAction("SET_CART");
export const dropCart = createAction("DROP_CART");

const reducer = createReducer([], {
  [setCart]: (state, action) => [...state,action.payload],
  [dropCart]: (state, action) => state.filter(el=>el!==action.payload),
});

export default reducer;

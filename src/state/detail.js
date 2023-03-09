import { createAction, createReducer } from "@reduxjs/toolkit";

export const setDetail = createAction("SET_DETAIL");

const reducer = createReducer(
  {
    img: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/436535/796067/main-image",
    title: "Rosanna",
  },
  {
    [setDetail]: (state, action) => action.payload,
  }
);

export default reducer;

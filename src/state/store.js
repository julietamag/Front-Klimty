import { configureStore } from "@reduxjs/toolkit";


import uidReducer from "./uid";
import detailReducer from "./detail";
import photoReducer from "./photo";
import cartReducer from "./cart";

const store = configureStore({
    reducer: {
        uid: uidReducer,
        detail: detailReducer,
        photo:photoReducer,
        cart: cartReducer,
    }
})

export default store; 
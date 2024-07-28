import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./slices/stockSlice";
import brandsReducer from "./slices/brandsSlice";

const store = configureStore({
  reducer: {
    stock: stockReducer,
    brands: brandsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

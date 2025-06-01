import { configureStore } from "@reduxjs/toolkit";
import OrderSlice from "./OrderSlice";

export const store = configureStore({
  reducer: {
    order: OrderSlice,
  },
});

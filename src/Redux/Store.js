import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./Slice";

export const store = configureStore({
  reducer: {
    dataSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

 
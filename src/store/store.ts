import { configureStore } from "@reduxjs/toolkit";
import tableApi from "src/api/tableApi";

export const store = configureStore({
  reducer: {
    [tableApi.reducerPath]: tableApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tableApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

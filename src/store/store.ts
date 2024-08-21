import { configureStore } from "@reduxjs/toolkit";
import tableApi from "src/api/tableApi";
import entityIdReducer from "./slices/entityId";
import tableDataReducer from "./slices/tableData";
import tableOriginalDataReducer from "./slices/tableOriginalData";

export const store = configureStore({
  reducer: {
    [tableApi.reducerPath]: tableApi.reducer,
    entityId: entityIdReducer,
    tableData: tableDataReducer,
    tableOriginalData: tableOriginalDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tableApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

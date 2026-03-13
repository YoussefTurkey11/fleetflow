import { configureStore } from "@reduxjs/toolkit";
import { api } from "./baseApi";
import { useDispatch, useSelector } from "react-redux";
import uiSlice from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    uiSlice: uiSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

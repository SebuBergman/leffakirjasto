import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./combinedReducers";

const store = configureStore({
  reducer: rootReducer,
});

// Define `AppDispatch` as the type for dispatch that can handle Thunks
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; // Type for your store state
export default store;

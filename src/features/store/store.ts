import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "features/movieList/actions/MovieReducer";

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

// Define `AppDispatch` as the type for dispatch that can handle Thunks
export type AppDispatch = typeof store.dispatch;
export default store;

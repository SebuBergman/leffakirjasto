import { configureStore, combineReducers } from "@reduxjs/toolkit";
import movieReducer from "features/movieList/actions/MovieSlice"; // Import the reducer
import tvShowReducer from "features/tvShowList/actions/TvShowSlice"; // Import the reducer

const rootReducer = combineReducers({
  movies: movieReducer, // Use the reducer directly
  tvshows: tvShowReducer, // Use the reducer directly
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

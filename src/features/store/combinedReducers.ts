import { combineReducers } from "@reduxjs/toolkit";
import { movieReducer } from "features/movieList/actions/MovieReducer";
import { tvShowReducer } from "features/tvShowList/actions/TvShowReducer";

const rootReducer = combineReducers({
  movies: movieReducer,
  tvshows: tvShowReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // This will give you the type for the entire state tree
export default rootReducer;

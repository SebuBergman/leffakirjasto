import { combineReducers } from "@reduxjs/toolkit";
import { movieSlice } from "features/movieList/actions/MovieSlice";
import { tvShowSlice } from "features/tvShowList/actions/TvShowSlice";

const rootReducer = combineReducers({
  movies: movieSlice,
  tvshows: tvShowSlice,
});

export type RootState = ReturnType<typeof rootReducer>; // This will give you the type for the entire state tree
export default rootReducer;

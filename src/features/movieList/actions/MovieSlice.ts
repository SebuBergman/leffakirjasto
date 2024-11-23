import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResults, MovieList } from "../types";

interface MovieState {
  movieList: MovieList[];
  unfilteredMovieList: MovieList[];
  filteredMovieList: MovieList[];
  searchResults: SearchResults[];
  error: string | null | unknown | undefined;
}

const initialState: MovieState = {
  movieList: [],
  unfilteredMovieList: [],
  filteredMovieList: [],
  searchResults: [
    {
      original_title: "",
      release_date: "",
      id: 0,
      poster_path: "",
      overview: "",
      isExpanded: false,
    },
  ],
  error: null,
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchMoviesSuccess: (state, action: PayloadAction<MovieList[]>) => {
      state.movieList = action.payload;
      state.unfilteredMovieList = action.payload;
    },
    fetchMoviesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    deleteMovieSuccess: (state, action: PayloadAction<number>) => {
      state.movieList = state.movieList.filter(
        (movie) => movie.id !== action.payload
      );
    },
    deleteMovieFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    searchMovies: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload.toLowerCase();
      state.filteredMovieList = state.movieList.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery)
      );
    },
    editMovieFunction: (
      state,
      action: PayloadAction<{ id: string; newTitle: string }>
    ) => {
      const { id, newTitle } = action.payload;
      state.movieList = state.movieList.map((movie) =>
        movie.id === id ? { ...movie, title: newTitle } : movie
      );
    },
    addMovieSuccess: (state, action: PayloadAction<MovieList>) => {
      state.movieList.push(action.payload);
      state.unfilteredMovieList.push(action.payload);
    },
    addMovieFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    searchMovieDbSuccess: (state, action: PayloadAction<SearchResults[]>) => {
      state.searchResults = action.payload;
      state.error = null;
    },
    searchMovieDbFailure: (state, action: PayloadAction<unknown>) => {
      state.error = action.payload;
    },
    toggleExpanded: (state, action: PayloadAction<number>) => {
      state.searchResults = state.searchResults.map((movie) =>
        movie.id === action.payload
          ? { ...movie, isExpanded: !movie.isExpanded }
          : movie
      );
    },
  },
});

export const {
  fetchMoviesSuccess,
  fetchMoviesFailure,
  deleteMovieSuccess,
  deleteMovieFailure,
  searchMovies,
  editMovieFunction,
  addMovieSuccess,
  addMovieFailure,
  searchMovieDbSuccess,
  searchMovieDbFailure,
  toggleExpanded,
} = movieSlice.actions;

export default movieSlice.reducer;

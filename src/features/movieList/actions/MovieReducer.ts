import {
  DELETE_MOVIE_FAILURE,
  DELETE_MOVIE_SUCCESS,
  EDIT_MOVIE,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_SUCCESS,
  SEARCH_MOVIE,
} from "./actionTypes";

const initialState = {
  movieList: [],
  tvShowList: [],
  unfilteredMovieList: [],
  filteredMovieList: [],
  error: null,
};

export const movieReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movieList: action.payload,
        unfilteredMovieList: action.payload,
      };
    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_MOVIE_SUCCESS:
      return {
        ...state,
        movieList: state.movieList.filter(
          (movie: any) => movie.id !== action.payload
        ),
      };
    case DELETE_MOVIE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SEARCH_MOVIE:
      const searchQuery = action.payload.toLowerCase();
      const filteredMovies = state.movieList.filter((movie: any) =>
        movie.title.toLowerCase().includes(searchQuery)
      );
      return {
        ...state,
        filteredMovieList: filteredMovies, // Update the filtered movie list
      };
    case EDIT_MOVIE:
      const { id, newTitle } = action.payload;
      return {
        ...state,
        movieList: state.movieList.map((movie: any) =>
          movie.id === id ? { ...movie, title: newTitle } : movie
        ),
      };
    default:
      return state;
  }
};

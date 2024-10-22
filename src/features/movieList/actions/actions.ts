import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAILURE,
  SEARCH_MOVIE,
  EDIT_MOVIE,
} from "./actionTypes";

export const fetchMoviesSuccess = (movies: any[]) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});

export const fetchMoviesFailure = (error: any) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});

export const deleteMovieSuccess = (id: string) => ({
  type: DELETE_MOVIE_SUCCESS,
  payload: id,
});

export const deleteMovieFailure = (error: any) => ({
  type: DELETE_MOVIE_FAILURE,
  payload: error,
});

export const searchMovie = (query: string) => {
  return {
    type: SEARCH_MOVIE,
    payload: query,
  };
};

export const editMovieSuccess = (newTitle: string, id: string) => {
  return {
    type: EDIT_MOVIE,
    payload: { newTitle, id },
  };
};
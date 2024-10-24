import { MovieList, SearchResults } from "../types";
import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAILURE,
  EDIT_MOVIE,
  ADD_MOVIE_SUCCESS,
  ADD_MOVIE_FAILURE,
  UPDATE_MOVIES_SUCCESS,
  UPDATE_MOVIES_FAILURE,
  SEARCH_MOVIES_FAILURE,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES,
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

export const searchMovieList = (query: string) => {
  return {
    type: SEARCH_MOVIES,
    payload: query,
  };
};

export const editMovieSuccess = (newTitle: string, id: string) => {
  return {
    type: EDIT_MOVIE,
    payload: { newTitle, id },
  };
};

export const addMovieSuccess = (movie: MovieList) => {
  return {
    type: ADD_MOVIE_SUCCESS,
    payload: movie,
  };
};

export const addMovieFailure = (error: any) => ({
  type: ADD_MOVIE_FAILURE,
  payload: error,
});

export const searchMoviesSuccess = (movies: SearchResults[]) => ({
  type: SEARCH_MOVIES_SUCCESS,
  payload: movies,
});

export const searchMoviesFailure = (error: any) => ({
  type: SEARCH_MOVIES_FAILURE,
  payload: error,
});

export const updateMoviesSuccess = (movies: MovieList[]) => ({
  type: UPDATE_MOVIES_SUCCESS,
  payload: movies,
});

export const updateMoviesFailure = (error: any) => ({
  type: UPDATE_MOVIES_FAILURE,
  payload: error,
});

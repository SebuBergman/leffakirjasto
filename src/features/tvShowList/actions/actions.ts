import { Season, TvShowList } from "../types";
import {
  UPDATE_TVSHOW_SEASON,
  FETCH_TVSHOWS_SUCCESS,
  ADD_TVSHOW_SUCCESS,
  FETCH_TVSHOWS_FAILURE,
  DELETE_TVSHOW_FAILURE,
  DELETE_TVSHOW_SUCCESS,
  EDIT_TVSHOW,
  SEARCH_TVSHOWS,
  UPDATE_TVSHOWS_SUCCESS,
  UPDATE_TVSHOWS_FAILURE,
  ADD_TVSHOW_FAILURE,
  EDIT_TVSHOW_TITLE_SUCCESS,
  EDIT_TVSHOW_TITLE_FAILURE,
} from "./actionTypes";

export const fetchTvShowSuccess = (tvshows: any[]) => ({
  type: FETCH_TVSHOWS_SUCCESS,
  payload: tvshows,
});

export const fetchTvShowFailure = (error: any) => ({
  type: FETCH_TVSHOWS_FAILURE,
  payload: error,
});

export const updateTvShowSeason = (
  tvShowId: string | number[],
  season: Season
) => {
  return {
    type: UPDATE_TVSHOW_SEASON,
    payload: { tvShowId, season },
  };
};

export const deleteTvShowSuccess = (id: string) => ({
  type: DELETE_TVSHOW_SUCCESS,
  payload: id,
});

export const deleteTvShowFailure = (error: any) => ({
  type: DELETE_TVSHOW_FAILURE,
  payload: error,
});

export const searchTvShowList = (query: string) => {
  return {
    type: SEARCH_TVSHOWS,
    payload: query,
  };
};

export const editTvShowSuccess = (
  newTvShow: string,
  id: string,
  updatedSeasons: any
) => {
  return {
    type: EDIT_TVSHOW,
    payload: { newTvShow, id, updatedSeasons },
  };
};

export const addTvShowSuccess = (movie: TvShowList) => {
  return {
    type: ADD_TVSHOW_SUCCESS,
    payload: movie,
  };
};

export const addTvShowFailure = (error: any) => ({
  type: ADD_TVSHOW_FAILURE,
  payload: error,
});

export const updateTvShowSuccess = (tvshows: TvShowList[]) => ({
  type: UPDATE_TVSHOWS_SUCCESS,
  payload: tvshows,
});

export const updateTvShowFailure = (error: any) => ({
  type: UPDATE_TVSHOWS_FAILURE,
  payload: error,
});

export const editTvShowTitleSuccess = (newTitle: string, id: string) => {
  return {
    type: EDIT_TVSHOW_TITLE_SUCCESS,
    payload: { newTitle, id },
  };
};

export const editTvShowTitleFailure = (error: any) => {
  return {
    type: EDIT_TVSHOW_TITLE_FAILURE,
    payload: error,
  };
};

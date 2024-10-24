import { TvShowList } from "../types";
import {
  DELETE_TVSHOW_FAILURE,
  DELETE_TVSHOW_SUCCESS,
  EDIT_TVSHOW,
  FETCH_TVSHOWS_FAILURE,
  FETCH_TVSHOWS_SUCCESS,
  SEARCH_TVSHOWS,
  UPDATE_TVSHOW_SEASON,
} from "./actionTypes";

const initialState = {
  tvShowList: [],
  unfilteredTVShowList: [],
  filteredTvShowList: [],
  error: null, // Add error state for proper error handling
};

export const tvShowReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_TVSHOWS_SUCCESS:
      return {
        ...state,
        tvShowList: action.payload,
        unfilteredtvshowList: action.payload,
      };
    case FETCH_TVSHOWS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_TVSHOW_SUCCESS:
      return {
        ...state,
        tvShowList: state.tvShowList.filter(
          (tvshow: any) => tvshow.id !== action.payload
        ),
      };
    case DELETE_TVSHOW_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SEARCH_TVSHOWS:
      const searchQuery = action.payload.toLowerCase();
      const filteredTvShows = state.tvShowList.filter((tvshow: any) =>
        tvshow.title.toLowerCase().includes(searchQuery)
      );
      return {
        ...state,
        filteredTvShowList: filteredTvShows, // Update the filtered tvshow list
      };
    case EDIT_TVSHOW:
      const { id, newTitle } = action.payload;
      return {
        ...state,
        tvshowList: state.tvShowList.map((tvshow: any) =>
          tvshow.id === id ? { ...tvshow, title: newTitle } : tvshow
        ),
      };
    case UPDATE_TVSHOW_SEASON:
      const { tvShowId, season } = action.payload;
      return {
        ...state,
        tvShowList: state.tvShowList.map((tvShow: TvShowList) =>
          tvShow.id === tvShowId
            ? { ...tvShow, seasons: [...tvShow.seasons, season] }
            : tvShow
        ),
      };
    default:
      return state;
  }
};

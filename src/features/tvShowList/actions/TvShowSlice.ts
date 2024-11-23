import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Season, TvShowList } from "../types";

interface TvShowState {
  tvShowList: TvShowList[];
  unfilteredTvShowList: TvShowList[];
  filteredTvShowList: TvShowList[];
  error: string | null;
}

const initialState: TvShowState = {
  tvShowList: [],
  unfilteredTvShowList: [],
  filteredTvShowList: [],
  error: null,
};

export const tvShowSlice = createSlice({
  name: "tvShows",
  initialState,
  reducers: {
    fetchTvShowsSuccess: (state, action: PayloadAction<TvShowList[]>) => {
      state.tvShowList = action.payload;
      state.unfilteredTvShowList = action.payload;
    },
    fetchTvShowsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    deleteTvShowSuccess: (state, action: PayloadAction<number>) => {
      state.tvShowList = state.tvShowList.filter(
        (tvShow) => tvShow.id !== action.payload
      );
    },
    deleteTvShowFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    searchTvShows: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload.toLowerCase();
      state.filteredTvShowList = state.tvShowList.filter((tvShow) =>
        tvShow.title.toLowerCase().includes(searchQuery)
      );
    },
    editTvShow: (
      state,
      action: PayloadAction<{ id: number; newTitle: string }>
    ) => {
      const { id, newTitle } = action.payload;
      state.tvShowList = state.tvShowList.map((tvShow) =>
        tvShow.id === id ? { ...tvShow, title: newTitle } : tvShow
      );
    },
    updateTvShowSeason: (
      state,
      action: PayloadAction<{ tvShowId: number; season: Season }>
    ) => {
      const { tvShowId, season } = action.payload;
      state.tvShowList = state.tvShowList.map((tvShow) =>
        tvShow.id === tvShowId
          ? { ...tvShow, seasons: [...(tvShow.seasons || []), season] }
          : tvShow
      );
    },
  },
});

export const {
  fetchTvShowsSuccess,
  fetchTvShowsFailure,
  deleteTvShowSuccess,
  deleteTvShowFailure,
  searchTvShows,
  editTvShow,
  updateTvShowSeason,
} = tvShowSlice.actions;

export const { actions: tvShowActions } = tvShowSlice;
export default tvShowSlice.reducer;


export interface TvShow {
  tvShowList: TvShowList[];
  unfilteredTvShowList: UnfilteredTvShowList[];
  filteredTvShowList: FilteredTvShowList[];
}

// TV Show Interfaces
export interface TvShowList {
  title: string; // Title of the TV show
  id: string | number | number[]; // Unique identifier for the TV show
  seasons: Season[]; // Map of seasons related to the TV show
}

// Define the type for the seasons map
export type SeasonsMap = {
  [seasonNumber: number]: Season; // Key is seasonNumber, value is Season
};

export interface Season {
  seasonNumber: number; // The number of the season
  owned: boolean; // Whether the season is owned
  id: string | number[]; // Unique identifier for the season
}

export interface UnfilteredTvShowList {
  title: string;
  id: string | number[];
  imageSrc: string;
  alt?: string;
}

export interface FilteredTvShowList {
  title: string;
  id: string | number[];
  imageSrc: string;
  alt?: string;
}

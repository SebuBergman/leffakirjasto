export interface Movie {
  movieList: MovieList[];
  UnfilteredMovieList: UnfilteredMovieList[];
  filteredMovieList: FilteredMovieList[];
  searchResults: SearchResults[];
}

export interface MovieList {
  title: string;
  id: number;
  imageSrc: string;
  releaseDate: string | undefined;
}

export interface UnfilteredMovieList {
  title: string;
  id: number;
  imageSrc: string;
  alt?: string;
}

export interface FilteredMovieList {
  title: string;
  id: number;
  imageSrc: string;
  alt?: string;
}

export interface SearchResults {
  original_title: string | any;
  id: number;
  poster_path: string;
  release_date: string;
  overview: string;
  isExpanded: boolean;
}
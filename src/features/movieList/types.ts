export interface Movie {
  movieList: MovieList[];
  UnfilteredMovieList: UnfilteredMovieList[];
  filteredMovieList: FilteredMovieList[];
}

export interface MovieList {
  title: string;
  id: string | number[];
  imageSrc: string;
  alt?: string;
}

export interface UnfilteredMovieList {
  title: string;
  id: string | number[];
  imageSrc: string;
  alt?: string;
}

export interface FilteredMovieList {
  title: string;
  id: string | number[];
  imageSrc: string;
  alt?: string;
}